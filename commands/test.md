---
description: Write tests for a file or feature using the project's test tool
argument-hint: <file or feature>
---
Write tests for: $ARGUMENTS

Steps:
1. Check package.json to find the test tool used in this project (Jest or Vitest, Playwright or Cypress). Follow the existing test style and folder structure.
2. List the test cases first: normal case, edge cases (empty, null, large data), and error cases.
3. Write the tests. Mock external services (database, HTTP, AWS) where needed.
4. Run the tests and fix any failing test that is caused by the test itself.
5. If a test fails because of a real bug in the code, do not change the code. Tell me about the bug.
