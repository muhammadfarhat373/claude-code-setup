# Security rules (all projects)

These add to the security basics in general.md.

## Authentication
- Use short-lived access tokens (for example 15 minutes) and refresh tokens that can be revoked.
- Store tokens in httpOnly, Secure, SameSite cookies. Never in localStorage.
- Verify the JWT signature, expiry, issuer, and audience. Never accept the `none` algorithm.
- Show the same error for "wrong email" and "wrong password".
- Password reset and email verification links must expire and work only once.

## Authorization
- Check that the user can access the exact record, not only that they are logged in (avoid IDOR).
- Deny by default. Allow only the roles that need access.
- Never trust role, userId, price, or other sensitive values sent from the client.

## Input and output
- Use allow-lists for sort fields, filters, and file types.
- Do not pass the request body directly to the ORM (mass assignment). Pick the allowed fields.
- MongoDB: block operator injection (`$gt`, `$ne`, `$where`) in user input.
- Do not show stack traces or database errors to users.
- Avoid `dangerouslySetInnerHTML` and `v-html` with user data. Sanitize it if there is no other way.

## File uploads
- Check the file type by its content, not only the extension. Limit the file size.
- Store uploads in private S3 buckets and share them with signed URLs.
- Generate new file names. Never use the user's file name as a path.

## External requests and redirects
- Do not fetch URLs given by users without an allow-list (avoid SSRF).
- Only redirect to allowed URLs (avoid open redirects).

## Dependencies
- Run `npm audit` or `pnpm audit` after adding packages. Tell me about high or critical issues.
- Prefer well-known, maintained packages. Do not add a package for a few lines of code.

## AWS
- IAM roles with least privilege. No `*` actions or resources unless there is no other way; explain why.
- S3 buckets are private by default. Encrypt data at rest.
- For production, prefer Secrets Manager or SSM Parameter Store over plain environment variables.
