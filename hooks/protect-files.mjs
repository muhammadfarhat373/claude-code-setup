#!/usr/bin/env node
// Runs before Claude writes or edits a file.
// Blocks changes to secret .env files, lock files, and the .git and node_modules folders.
// Exit code 2 blocks the edit and sends the reason back to Claude.
// Uses Node (not bash) so it works on Windows, macOS, and Linux.
import path from 'node:path';

const ALLOWED_ENV_FILES = new Set(['.env.example', '.env.sample', '.env.template']);
const LOCK_FILES = new Set(['package-lock.json', 'pnpm-lock.yaml', 'yarn.lock']);
const PROTECTED_FOLDERS = ['.git', 'node_modules'];
const BLOCK_EXIT_CODE = 2;

let raw = '';
for await (const chunk of process.stdin) raw += chunk;

let filePath;
try {
  filePath = JSON.parse(raw)?.tool_input?.file_path;
} catch {
  process.exit(0); // Bad input: do nothing, never block Claude.
}

if (!filePath) process.exit(0);

function isSecretEnvFile(fileName) {
  const isEnvFile = fileName === '.env' || fileName.startsWith('.env.');
  return isEnvFile && !ALLOWED_ENV_FILES.has(fileName);
}

function isInProtectedFolder(targetPath) {
  const parts = path.normalize(targetPath).split(/[\\/]/);
  return PROTECTED_FOLDERS.some((folder) => parts.includes(folder));
}

function getBlockReason(targetPath) {
  const fileName = path.basename(targetPath);
  if (isSecretEnvFile(fileName)) {
    return `${fileName} can hold secrets. Update .env.example instead and tell me which variable to add.`;
  }
  if (LOCK_FILES.has(fileName)) {
    return `${fileName} is a lock file. Change package.json and run the package manager instead.`;
  }
  if (isInProtectedFolder(targetPath)) {
    return `${targetPath} is inside a protected folder (.git or node_modules).`;
  }
  return null;
}

const reason = getBlockReason(filePath);
if (reason) {
  console.error(`Blocked: ${reason}`);
  process.exit(BLOCK_EXIT_CODE);
}

process.exit(0);
