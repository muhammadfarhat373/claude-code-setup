#!/usr/bin/env node
// Runs after Claude edits a file.
// Formats it with Prettier and fixes it with ESLint.
// If lint errors remain, exit code 2 sends them back to Claude so it fixes them.
// Uses Node (not bash) so it works on Windows, macOS, and Linux.
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';

const SUPPORTED_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs']);
const isWindows = process.platform === 'win32';
const projectDir = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();

let raw = '';
for await (const chunk of process.stdin) raw += chunk;

let filePath;
try {
  filePath = JSON.parse(raw)?.tool_input?.file_path;
} catch {
  process.exit(0); // Bad input: do nothing, never block Claude.
}

if (!filePath || !existsSync(filePath) || !SUPPORTED_EXTENSIONS.has(path.extname(filePath))) {
  process.exit(0);
}

// Use the project's own tool versions from node_modules/.bin (works with npm and pnpm).
function localBin(name) {
  const bin = path.join(projectDir, 'node_modules', '.bin', isWindows ? `${name}.cmd` : name);
  return existsSync(bin) ? bin : null;
}

function run(bin, args) {
  // Windows needs a shell to run .cmd files, so quote the arguments there.
  const finalArgs = isWindows ? args.map((a) => `"${a}"`) : args;
  return execFileSync(isWindows ? `"${bin}"` : bin, finalArgs, {
    cwd: projectDir,
    encoding: 'utf8',
    stdio: 'pipe',
    shell: isWindows,
  });
}

const prettier = localBin('prettier');
if (prettier) {
  try {
    run(prettier, ['--write', filePath]);
  } catch {
    // Formatting problems should not block Claude.
  }
}

const eslint = localBin('eslint');
if (eslint) {
  try {
    run(eslint, ['--fix', filePath]);
  } catch (error) {
    const output = `${error.stdout ?? ''}${error.stderr ?? ''}`.trim();
    if (error.status === 1) {
      // Lint errors that --fix could not solve: send them to Claude.
      console.error(`ESLint found problems in ${filePath}. Please fix them:\n${output}`);
      process.exit(2);
    }
    // Status 2 = ESLint config or crash problem: show to the user, do not block Claude.
    console.error(`ESLint could not run: ${output}`);
    process.exit(1);
  }
}

process.exit(0);
