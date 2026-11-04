---
description: Suggest a conventional commit message and branch name for my changes
argument-hint: [Jira ticket number, for example SE-123]
---
Look at my staged changes (`git diff --staged`). If nothing is staged, use `git diff`.
Jira ticket: $ARGUMENTS

Give me:
1. A conventional commit message (feat:, fix:, chore:, refactor:, test:, docs:).
   - Short subject line (max 72 characters)
   - A short body with the main changes as bullet points
   - Add the Jira ticket number in the body if I gave one
2. A branch name in this format: <type>/SE-<ticket>-<short-description>

Do not run git commit. Only suggest the text.
