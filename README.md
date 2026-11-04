# My Claude Code setup

My rules, slash commands, agents, and hooks for Claude Code.

**These are copies.** Claude Code only reads the files in `~/.claude/`.
After you change a file here, run `node install.mjs` to make it active (see [Install](#install)).

## Folder structure

```
claude/
├── rules/                  Coding rules Claude follows
├── commands/               Slash commands (/commit, /review, ...)
├── agents/                 Subagents Claude can hand work to
├── hooks/                  Scripts that run before or after Claude edits a file
├── templates/CLAUDE.md     Starter CLAUDE.md for a new project
├── settings.example.json   Settings to merge into ~/.claude/settings.json
└── install.mjs             Copies everything into ~/.claude/ and merges the settings
```

## Rules → `~/.claude/rules/`

| File | When it applies | What it covers |
|---|---|---|
| `general.md` | Always | TypeScript, naming, code quality, errors, security basics |
| `git.md` | Always | Branches, commits, PRs, safe git commands |
| `security.md` | Always | Auth, authorization, input, uploads, SSRF, dependencies, AWS |
| `backend.md` | Controllers, services, `api/`, `server/`, `lambda/` | Structure, validation, API design, logging, Lambda |
| `database.md` | Prisma, migrations, models, repositories, `.sql` | Queries, indexes, Prisma, Sequelize, Mongoose, migrations |
| `frontend.md` | `.tsx`, `.jsx`, `.vue`, `.svelte`, components, pages | React, Next.js, Vue, Angular, Svelte, accessibility, SEO |
| `testing.md` | `*.test.*`, `*.spec.*`, `tests/`, `e2e/` | Jest, Vitest, Testing Library, Playwright, Cypress |
| `devops.md` | Dockerfile, GitHub Actions, serverless, CDK, Terraform | Docker, CI/CD, infrastructure as code |

## Commands → `~/.claude/commands/`

| Command | What it does |
|---|---|
| `/plan-feature <feature>` | Plans a feature (files, DB, API, UI, tests) and waits for your OK |
| `/fix <error>` | Finds the root cause, fixes it, and adds a test |
| `/explain <file>` | Explains code in simple English |
| `/refactor <file>` | Cleans up code without changing behavior |
| `/test <file>` | Writes and runs tests |
| `/review [path]` | Reviews changes and reports issues by severity |
| `/commit [SE-123]` | Suggests a commit message and branch name |
| `/pr [SE-123]` | Writes a PR title and description |

## Agents → `~/.claude/agents/`

Agents run in their own context, so they keep the main chat clean.
Ask for them by name ("use the code-reviewer agent") or Claude picks them when it fits.

| Agent | What it does |
|---|---|
| `code-reviewer` | Read-only review of your changes |
| `debugger` | Finds the root cause of a failing test or error and reports a fix |

## Hooks → `~/.claude/hooks/`

| Hook | When | What it does |
|---|---|---|
| `protect-files.mjs` | Before an edit | Blocks edits to `.env` files, lock files, `.git/`, and `node_modules/` |
| `format-and-lint.mjs` | After an edit | Runs Prettier and ESLint; sends remaining lint errors back to Claude |

Hooks only run when they are listed in `~/.claude/settings.json` (see `settings.example.json`).

## Template

Copy `templates/CLAUDE.md` to the root of a project and fill in the `<...>` parts.
Keep it short: only what is special to that project.

## Settings

`settings.example.json` has:
- **allow**: safe commands that run without asking (git status, lint, tests, type check)
- **ask**: commands that need your OK (commit, push, install packages, migrations)
- **deny**: blocked actions (reading `.env` files, `rm -rf`, force push, `git reset --hard`)
- **hooks**: both hooks above
- **model** `opus`, **theme** `dark`, **tui** `fullscreen` (layout)
- **modelSettings**: effort level `xhigh` for Opus and Fable
- **enabledPlugins**: the Figma plugin

Do not copy this file over `~/.claude/settings.json` by hand. That would remove settings you added later.
`install.mjs` merges it for you.

## Install

Run this in this folder:

```bash
node install.mjs
```

It:
- copies `rules/`, `commands/`, `agents/`, and `hooks/` into `~/.claude/` (files with the same name are replaced)
- merges `settings.example.json` into `~/.claude/settings.json`:
  - adds missing `allow`, `ask`, and `deny` rules (no duplicates)
  - adds a hook only if a hook with the same command is not there yet
  - adds `model`, `theme`, `tui`, `modelSettings`, and `enabledPlugins` only where they are missing (your own values stay)
  - saves a backup first, `~/.claude/settings.json.<date-time>.bak`, when something changes
- never deletes your existing settings
- prints what it did

It works on Windows, macOS, and Linux and needs only Node.js (no npm packages).
Run it again after you change a file here, then start a new Claude Code session.

## Set up on another PC

### What comes by itself

Sign in with the same Claude account. These skills sync automatically:
`pdf`, `docx`, `xlsx`, `pptx`, `google-workspace`, `skill-creator`, `import-memory`, `morning`.

### What not to copy from the old `~/.claude/`

| File or folder | Why |
|---|---|
| `.credentials.json` | Your login. Sign in again instead. |
| `history.jsonl`, `sessions/`, `file-history/` | Old chats and undo data from the old PC |
| `settings.json.*.bak` | Old backups |
| `cache/`, `plugins/`, `telemetry/`, and other folders | Claude Code creates them by itself |
| `projects/*/memory/` (optional) | Memory is saved per project path. It only works if the project is at the same path on the new PC. |

### Steps

1. Install **Node.js 22** (LTS) from <https://nodejs.org>. The hooks need it.
2. **Windows only:** install **Git for Windows** from <https://git-scm.com/download/win>. Claude Code on Windows uses its Git Bash.
   On macOS and Linux, check that Git is there with `git --version`.
3. Install **Claude Code**: the Claude desktop app from <https://claude.ai/download>, or the terminal version:
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```
4. Open Claude Code and **sign in** with the same Claude account.
5. Get this folder from the private repo:
   ```bash
   git clone <your-private-repo-url> claude
   cd claude
   ```
6. Install the setup:
   ```bash
   node install.mjs
   ```
7. Install the Figma plugin. In a terminal, run `claude`, then type:
   ```
   /plugin install figma@claude-plugins-official
   ```
8. Sign in to Figma: in `claude`, type `/mcp`, choose **figma**, and finish the sign-in in the browser.
9. Close Claude Code and start a **new session**.

Do steps 7 and 8 in a terminal, not in the desktop app chat.

### Check that it works

- Type `/` in Claude Code. You should see `/commit`, `/review`, `/plan-feature`, and the other commands.
- Test the hooks: in an empty test folder, ask Claude to "create a file named .env with TEST=1".
  It must be blocked with `Blocked: .env can hold secrets`.
  If it is not blocked, the hooks are not running.

**Windows note:** the hook commands use `$HOME`, for example `node "$HOME/.claude/hooks/protect-files.mjs"`.
Claude Code on Windows runs hooks through Git Bash, where `$HOME` is your user folder, so this should work.
If the hook test fails, `$HOME` is the likely cause: change `install.mjs` to write the full path (for example `C:/Users/<you>/.claude/hooks/...`) on Windows.

### Update later

On the PC where you changed something: run `node install.mjs`, then commit and push.
On the other PC:

```bash
git pull
node install.mjs
```

Then start a new Claude Code session.
