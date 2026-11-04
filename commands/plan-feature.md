---
description: Plan a feature or Jira ticket before writing any code
argument-hint: <feature description or Jira ticket details>
---
Plan this feature: $ARGUMENTS

Do not write or edit any code yet.

1. Read the related code to understand the current structure.
2. Ask me questions if anything in the requirements is unclear.
3. Give me a plan:
   - Goal: what the feature does, in 1–2 sentences
   - Approach: how you will build it and why
   - Files to create or change, with a short note for each
   - Database changes (tables, columns, indexes, migrations)
   - API changes (new or changed endpoints, request and response shapes)
   - UI changes (pages, components, loading/error/empty states)
   - New packages or environment variables, if any
   - Tests to write
   - Risks and edge cases
   - Steps in order, each small enough to review
4. Wait for my OK before starting.
