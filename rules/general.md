# General rules (all projects, all files)

## TypeScript
- Use TypeScript in strict mode. Avoid `any`; use `unknown` and narrow it, or write a proper type.
- If `any` is really needed, add a short comment explaining why.
- Prefer `type` for unions and simple shapes, `interface` for objects that may be extended.
- No non-null assertions (`!`) unless the value is guaranteed; explain why in a comment.
- Export shared types from a shared/types folder. Do not duplicate types.

## Naming
- camelCase for variables and functions.
- PascalCase for components, classes, types, and interfaces.
- kebab-case for file and folder names (unless the framework requires another style).
- UPPER_SNAKE_CASE for constants and environment variable names.
- Use clear names: `getUserById`, not `getData`. Booleans start with is/has/can/should.

## Code quality
- Small functions with one job. Early returns instead of deep nesting.
- No magic numbers or strings; use named constants.
- No dead code, commented-out code, or console.log in final code (use a logger).
- Follow the existing style and folder structure of the project.
- Do not add a new library if the project already has one that does the same job.

## Error handling
- Never swallow errors silently. Handle them or pass them up with context.
- Show user-friendly messages to users; log technical details for developers.
- Always handle failed API calls, timeouts, and empty or null data.

## Security basics
- Never hardcode secrets, API keys, tokens, or passwords. Use environment variables.
- Validate all input from users, URLs, forms, and external APIs.
- Never log passwords, tokens, or personal user data.
- Use parameterized queries or the ORM. Never build SQL with string concatenation.
- Check auth and permissions on the server, never only in the UI.

## Dependencies and environment
- Check the lock file to know if the project uses npm or pnpm. Do not mix them.
- Check `.nvmrc` or `package.json` "engines" for the Node.js version.
- When adding a package, environment variable, or migration, tell me clearly.
