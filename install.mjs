#!/usr/bin/env node
// Installs this setup into ~/.claude/ on Windows, macOS, and Linux.
// Copies rules, commands, agents, and hooks, then merges settings.example.json
// into ~/.claude/settings.json. It only adds things: your existing settings stay.
// Safe to run again after an update. Usage: node install.mjs
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SOURCE_DIR = path.dirname(fileURLToPath(import.meta.url));
const CLAUDE_DIR = path.join(homedir(), '.claude');
const SETTINGS_FILE = path.join(CLAUDE_DIR, 'settings.json');
const EXAMPLE_SETTINGS_FILE = path.join(SOURCE_DIR, 'settings.example.json');
const FOLDERS_TO_COPY = ['rules', 'commands', 'agents', 'hooks'];
const PERMISSION_LISTS = ['allow', 'ask', 'deny'];
const JSON_INDENT = 2;
const BYTE_ORDER_MARK = /^﻿/; // Windows Notepad can add this; JSON.parse fails on it.

function isPlainObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function requireObject(value, name) {
  if (!isPlainObject(value)) throw new Error(`"${name}" in ${SETTINGS_FILE} must be an object.`);
}

function requireArray(value, name) {
  if (!Array.isArray(value)) throw new Error(`"${name}" in ${SETTINGS_FILE} must be a list.`);
}

function readJsonObject(file) {
  const text = readFileSync(file, 'utf8').replace(BYTE_ORDER_MARK, '');
  if (text.trim() === '') return {};
  let data;
  try {
    data = JSON.parse(text);
  } catch (error) {
    throw new Error(`${file} is not valid JSON (${error.message}). Fix it and run again.`);
  }
  if (!isPlainObject(data)) throw new Error(`${file} must contain a JSON object.`);
  return data;
}

function copyFolder(name) {
  const from = path.join(SOURCE_DIR, name);
  const to = path.join(CLAUDE_DIR, name);
  mkdirSync(to, { recursive: true });
  const files = readdirSync(from, { withFileTypes: true })
    .filter((entry) => entry.isFile() && !entry.name.startsWith('.'))
    .map((entry) => entry.name);
  for (const file of files) copyFileSync(path.join(from, file), path.join(to, file));
  return `${name}/: copied ${files.length} files`;
}

function mergePermissions(settings, example, summary) {
  if (!isPlainObject(example.permissions)) return;
  settings.permissions ??= {};
  requireObject(settings.permissions, 'permissions');
  for (const list of PERMISSION_LISTS) {
    const current = settings.permissions[list] ?? [];
    requireArray(current, `permissions.${list}`);
    const wanted = [...new Set(example.permissions[list] ?? [])];
    const missing = wanted.filter((rule) => !current.includes(rule));
    if (missing.length === 0) continue;
    settings.permissions[list] = [...current, ...missing];
    summary.added.push(`permissions.${list}: ${missing.length} rules`);
  }
}

function hasHookCommand(groups, command) {
  return groups.some((group) => Array.isArray(group?.hooks) && group.hooks.some((hook) => hook?.command === command));
}

function addHook(groups, matcher, hook) {
  const sameMatcher = groups.find((group) => group?.matcher === matcher && Array.isArray(group.hooks));
  if (sameMatcher) {
    sameMatcher.hooks.push(structuredClone(hook));
    return;
  }
  groups.push({ matcher, hooks: [structuredClone(hook)] });
}

// A hook is added only if no hook with the same command exists for that event.
function mergeHooks(settings, example, summary) {
  if (!isPlainObject(example.hooks)) return;
  settings.hooks ??= {};
  requireObject(settings.hooks, 'hooks');
  for (const [event, exampleGroups] of Object.entries(example.hooks)) {
    settings.hooks[event] ??= [];
    const groups = settings.hooks[event];
    requireArray(groups, `hooks.${event}`);
    for (const group of exampleGroups) {
      for (const hook of group.hooks ?? []) {
        if (hasHookCommand(groups, hook.command)) continue;
        addHook(groups, group.matcher, hook);
        summary.added.push(`hooks.${event}: ${hook.command}`);
      }
    }
  }
}

// Adds keys that are missing (also inside objects). Never changes a value that is already set.
function addMissingKeys(target, source, parentPath, summary) {
  for (const [key, value] of Object.entries(source)) {
    const keyPath = parentPath ? `${parentPath}.${key}` : key;
    const current = target[key];
    if (!Object.hasOwn(target, key)) {
      target[key] = structuredClone(value);
      summary.added.push(keyPath);
    } else if (isPlainObject(current) && isPlainObject(value)) {
      addMissingKeys(current, value, keyPath, summary);
    } else if (!Array.isArray(current) && JSON.stringify(current) !== JSON.stringify(value)) {
      summary.kept.push(`${keyPath} = ${JSON.stringify(current)}`);
    }
  }
}

// Local time, without ":" because Windows does not allow it in file names.
function getTimestamp() {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, '0');
  const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  return `${date}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
}

function backUpSettings() {
  const backupFile = `${SETTINGS_FILE}.${getTimestamp()}.bak`;
  copyFileSync(SETTINGS_FILE, backupFile);
  return backupFile;
}

function installSettings() {
  const example = readJsonObject(EXAMPLE_SETTINGS_FILE);
  const hasSettings = existsSync(SETTINGS_FILE);
  const settings = hasSettings ? readJsonObject(SETTINGS_FILE) : {};
  const summary = { added: [], kept: [] };

  mergePermissions(settings, example, summary);
  mergeHooks(settings, example, summary);
  addMissingKeys(settings, example, '', summary);

  const lines = summary.kept.map((item) => `kept your value: ${item}`);
  if (summary.added.length === 0) return ['settings.json: already up to date, not changed', ...lines];

  if (hasSettings) lines.unshift(`settings.json: backup saved to ${backUpSettings()}`);
  writeFileSync(SETTINGS_FILE, `${JSON.stringify(settings, null, JSON_INDENT)}\n`);
  return [...lines, ...summary.added.map((item) => `added: ${item}`)];
}

function main() {
  mkdirSync(CLAUDE_DIR, { recursive: true });
  console.log(`Installing into ${CLAUDE_DIR}\n`);
  for (const folder of FOLDERS_TO_COPY) console.log(`  ${copyFolder(folder)}`);
  for (const line of installSettings()) console.log(`  ${line}`);
  console.log('\nDone. Start a new Claude Code session to use the new setup.');
  console.log('New PC? In a terminal, run `claude`, then `/plugin install figma@claude-plugins-official` and `/mcp`.');
}

try {
  main();
} catch (error) {
  console.error(`\nInstall failed: ${error.message}`);
  process.exit(1);
}
