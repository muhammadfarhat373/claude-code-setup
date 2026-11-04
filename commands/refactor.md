---
description: Refactor code to be cleaner without changing what it does
argument-hint: <file or function>
---
Refactor this code: $ARGUMENTS

Rules:
- Do not change behavior. Inputs, outputs, and side effects must stay the same.
- Do not change public APIs (exported functions, routes, props) unless I ask.

Steps:
1. Run the existing tests first. If this code has no tests, tell me and suggest writing them first with /test.
2. List the problems you see (long functions, duplicate code, bad names, deep nesting, missing types, magic numbers).
3. Show me the plan and wait for my OK.
4. Refactor in small steps. Follow the project rules.
5. Run lint, type check, and tests again. They must pass.
6. Summarize what changed and why.
