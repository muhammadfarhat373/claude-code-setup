---
paths:
  - "**/Dockerfile*"
  - "**/docker-compose*.yml"
  - "**/docker-compose*.yaml"
  - "**/.dockerignore"
  - "**/.github/workflows/**"
  - "**/serverless.yml"
  - "**/serverless.ts"
  - "**/template.yaml"
  - "**/cdk/**"
  - "**/infra/**"
  - "**/terraform/**"
  - "**/*.tf"
---
# DevOps rules (Docker, GitHub Actions, AWS, Serverless, CDK, Terraform)

## Docker
- Use small official base images with a fixed version that matches `.nvmrc` (for example `node:24-alpine`, never `node:latest`).
- Multi-stage builds: build in one stage, copy only production files to the final stage.
- Run the app as a non-root user.
- Add a `.dockerignore` (node_modules, .git, .env, dist, coverage).
- Copy package.json and the lock file first, install, then copy the code (better layer caching).
- Install with `npm ci` or `pnpm install --frozen-lockfile`.
- Never put secrets in the image or in build args.
- Add a health check for long-running services.

## CI/CD (GitHub Actions)
- Run on every PR: install, lint, type check, tests, and build.
- Use the Node version from `.nvmrc`. Cache dependencies.
- Keep secrets in GitHub Secrets. Never print them in logs.
- Pin actions to a major version or commit SHA.
- Give the workflow token minimal `permissions`.
- Use OIDC to access AWS, not long-lived access keys.
- Deploy to production only from `main`, and only after all checks pass.

## Infrastructure as code (Serverless, CDK, SAM, Terraform)
- All infrastructure lives in code. No manual changes in the AWS console.
- No hardcoded account IDs, ARNs, or regions. Use variables or parameters per stage.
- Separate stages: dev, staging, production.
- Least-privilege IAM role per function or service.
- Tag resources with project, environment, and owner.
- Set log retention on CloudWatch log groups.
- Warn me before any change that deletes or replaces a database, bucket, or other resource that holds data.

## Environments
- Same code in every environment; only the config changes.
- Keep `.env.example` up to date with every variable (no real values).
