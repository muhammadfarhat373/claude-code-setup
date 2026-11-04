---
description: Write a pull request title and description for my branch
argument-hint: [Jira ticket number, for example SE-123]
---
Write a pull request description for the current branch.
Jira ticket: $ARGUMENTS

1. Find the base branch (main or develop). Read `git log <base>..HEAD` and `git diff <base>...HEAD`.
2. If I did not give a ticket number, read it from the branch name (for example `feat/SE-123-user-login`).

Give me:
- Title: `SE-123: short description`
- Summary: what this PR does and why (2–3 sentences)
- Changes: bullet list of the main changes
- How to test: steps a reviewer can follow
- Screenshots: a placeholder if the UI changed
- Risks and notes: migrations, new environment variables, new packages, breaking changes
- Checklist: lint, type check, tests, docs updated

Do not create the PR or push. Only give me the text in Markdown.
