---
description: Review my current changes (bugs, security, performance, readability, best practices)
argument-hint: [optional file or folder]
---
Review the code changes in this project. If I gave a path, review only this: $ARGUMENTS
If no path is given, review the uncommitted changes from `git diff` and `git diff --staged`.

Check in this order:
1. Bugs and logic errors (including edge cases and error handling)
2. Security (SQL injection, XSS, auth and permission checks, secrets in code)
3. Performance (N+1 queries, missing indexes, extra React re-renders, heavy loops)
4. Readability (naming, function size, clear structure)
5. Best practices (TypeScript types, project structure, CLAUDE.md rules)

For each issue, show:
- File and line
- The problem
- Why it matters
- The fixed code

Group issues by severity: Critical, Important, Minor.
Do not edit any files. Only report. End with a short summary.
Use simple, clear English.
