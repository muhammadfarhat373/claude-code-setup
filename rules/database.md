---
paths:
  - "**/prisma/**"
  - "**/*.prisma"
  - "**/migrations/**"
  - "**/models/**"
  - "**/*.model.ts"
  - "**/*.schema.ts"
  - "**/*.entity.ts"
  - "**/*.repository.ts"
  - "**/repositories/**"
  - "**/seeders/**"
  - "**/*.sql"
---
# Database rules (PostgreSQL, MongoDB, Prisma, Sequelize, Mongoose)

## General
- Use the ORM or query builder the project already uses.
- Never build queries with string concatenation. Use parameters.
- Select only the fields you need. Do not return full records by default.
- Paginate large results. Never load a full table into memory.

## Performance
- Avoid N+1 queries. Use include/populate/joins or batch queries.
- Add indexes for fields used in WHERE, ORDER BY, JOIN, and unique checks.
- Use transactions when several writes must succeed or fail together.
- For slow queries, check the query plan (EXPLAIN) before adding complexity.

## Prisma
- Use `select` or `include` on purpose. Avoid deep nested includes.
- Use `prisma.$transaction` for related writes.
- Reuse one PrismaClient instance (singleton), especially in serverless and Next.js dev.
- After schema changes, run `prisma migrate dev` and `prisma generate`.

## Sequelize
- Use migrations, never `sync({ force: true })` outside local development.
- Define associations clearly and use `include` with `attributes`.

## Mongoose and MongoDB
- Define schemas with types, required fields, and validation.
- Use `.lean()` for read-only queries.
- Add indexes in the schema. Avoid unbounded arrays inside documents.
- Use `populate` carefully; it can cause N+1 style problems.

## Migrations
- Never edit a migration that already ran in production. Create a new one.
- Make migrations safe for live data: add nullable columns first, backfill, then make them required.
- Warn me about destructive changes: dropping columns or tables, renaming, or changing types.
- Every migration should be reversible when possible.

## Data safety
- Soft delete when data may be needed later.
- Store timestamps (createdAt, updatedAt) in UTC.
- Never store passwords, tokens, or card data in plain text.
