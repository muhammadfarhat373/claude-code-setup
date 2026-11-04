---
paths:
  - "**/*.controller.ts"
  - "**/*.service.ts"
  - "**/*.module.ts"
  - "**/*.guard.ts"
  - "**/*.middleware.ts"
  - "**/*.interceptor.ts"
  - "**/*.dto.ts"
  - "**/routes/**"
  - "**/api/**"
  - "**/server/**"
  - "**/handlers/**"
  - "**/lambda/**"
  - "**/functions/**"
---
# Backend rules (Node.js, Express, NestJS, AWS Lambda)

## Structure
- Controllers/routes only handle HTTP: read input, call a service, return a response.
- Business logic lives in services. Database access lives in repositories or the ORM layer.
- NestJS: one module per feature. Use dependency injection, not manual `new`.
- Express: use a router per feature and central error-handling middleware.

## Validation
- Validate every request body, query, and param.
- NestJS: DTOs with class-validator and a global ValidationPipe (whitelist: true).
- Express and Lambda: Zod or the project's validation library.
- Never trust data from the client.

## API design
- RESTful routes with correct HTTP methods and status codes.
- One consistent error response format across the API.
- Paginate list endpoints. Never return unlimited data.
- Do not return internal fields (passwords, internal IDs, stack traces).
- Version public APIs if breaking changes are possible.

## Auth and security
- Check authentication and authorization on every protected route (guards or middleware).
- Hash passwords with bcrypt or argon2. Never store plain passwords.
- Use rate limiting on login, signup, and public endpoints.
- Set CORS to allowed origins only. Use security headers (helmet).
- Keep secrets in environment variables or AWS Secrets Manager / SSM.

## Errors and logging
- Use the framework's error handling (NestJS exception filters, Express error middleware).
- Structured logs (JSON) with a request ID. Use the project's logger, not console.log.
- Log errors with context, but never log tokens, passwords, or personal data.

## Async and performance
- Always await promises. Handle rejections. No floating promises.
- Run independent async calls in parallel (Promise.all).
- Set timeouts on external API calls. Add retries only for safe operations.
- Cache expensive results when it makes sense.

## AWS Lambda
- Keep handlers thin. Initialize clients outside the handler to reuse connections.
- Keep functions small and set correct timeout and memory.
- Make handlers idempotent when events can be retried.

## Configuration
- Validate environment variables at startup and fail fast if one is missing.
- Add every new variable to `.env.example`.
