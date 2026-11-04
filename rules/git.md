# Git rules (all projects)

## Branches
- Never work directly on `main` or `develop`. Create a branch first.
- Branch name format: `<type>/SE-<ticket>-<short-description>`, for example `feat/SE-123-user-login`.
- Types: feat, fix, chore, refactor, test, docs.

## Commits
- Do not commit or push unless I ask.
- Use conventional commit messages: `feat: add user login`. Subject line max 72 characters.
- Add the Jira ticket number (SE-123) in the commit body when there is one.
- One logical change per commit. Do not mix a refactor with a feature.
- Check `git status` and `git diff --staged` before committing.
- Never commit `.env` files, secrets, build output, or `node_modules`.

## Safety
- Never force push to `main`, `develop`, or any shared branch.
- Never run `git reset --hard`, `git clean -fd`, or delete branches without asking me.
- Do not rewrite history that is already pushed.
- For merge conflicts, show me the conflict and your suggested fix before resolving it.

## Pull requests
- Keep PRs small and focused on one ticket.
- PR title format: `SE-123: short description`.
- PR description: what changed, why, how to test, and any risks.
- Lint, type check, and tests must pass before opening a PR.

## .gitignore
- Make sure these are ignored: `.env`, `.env.*` (except `.env.example`), `node_modules`, `dist`, `build`, `.next`, `coverage`, and log files.
