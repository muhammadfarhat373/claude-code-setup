---
description: Find the root cause of a bug or error and fix it
argument-hint: <error message, failing test, or bug description>
---
Fix this problem: $ARGUMENTS

Steps:
1. Understand the problem. If I gave an error, find where it comes from in the code.
2. Reproduce it if possible (run the failing test or command).
3. Find the root cause. Do not only fix the symptom.
4. Explain the root cause to me in simple words before changing code.
5. Make the smallest fix that solves the root cause. Follow the project rules.
6. Add a test that would have caught this bug.
7. Run lint, type check, and the related tests. Make sure they pass.
8. End with a short summary: cause, fix, files changed, and test added.

If the fix needs a big change, a new package, or a database migration, stop and ask me first.
