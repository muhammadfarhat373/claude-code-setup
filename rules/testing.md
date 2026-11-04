---
paths:
  - "**/*.test.*"
  - "**/*.spec.*"
  - "**/__tests__/**"
  - "**/tests/**"
  - "**/test/**"
  - "**/e2e/**"
  - "**/cypress/**"
  - "**/playwright/**"
---
# Testing rules (Jest, Vitest, Playwright, Cypress)

## General
- Check package.json to see which test tools the project uses. Follow the existing test style.
- Test behavior, not implementation details.
- Use clear test names: "should return 404 when user does not exist".
- Use the Arrange, Act, Assert structure.
- Each test is independent. No shared state between tests.

## What to test
- Normal case, edge cases (empty, null, large data), and error cases.
- Business logic in services gets the most unit tests.
- Every bug fix gets a test that would have caught the bug.

## Unit tests (Jest, Vitest)
- Mock external things: database, HTTP calls, AWS, time, and random values.
- Do not mock the code you are testing.
- Reset mocks between tests.
- NestJS: use Test.createTestingModule with mocked providers.

## Frontend component tests
- Use Testing Library (React, Vue, Angular, Svelte versions).
- Find elements by role, label, or text, like a user would. Avoid test IDs unless needed.
- Test loading, error, and empty states.

## API and integration tests
- Use Supertest (or the project's tool) for HTTP endpoints.
- Use a separate test database. Clean the data between tests.

## E2E tests (Playwright, Cypress)
- Cover the most important user flows only (login, checkout, main features).
- Use stable selectors (role, label, data-testid). Never rely on CSS classes.
- No fixed waits (sleep). Wait for elements or network responses.

## Rules
- If a test fails because of a real bug, do not change the test to pass. Tell me about the bug.
- Do not remove or skip existing tests without asking.
