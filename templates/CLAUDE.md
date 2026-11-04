# <Project name>

<One or two sentences: what this app does and who uses it.>

## Tech stack
- Language: TypeScript (strict mode)
- Backend: <NestJS | Express | AWS Lambda>
- Frontend: <Next.js App Router | React + Vite | Vue/Nuxt | Angular>
- Database: <PostgreSQL + Prisma | MongoDB + Mongoose | Sequelize>
- Tests: <Jest | Vitest>, <Playwright | Cypress>
- Package manager: <npm | pnpm>
- Node version: see `.nvmrc`

## Commands
| Task | Command |
|---|---|
| Install | `pnpm install` |
| Dev server | `pnpm dev` |
| Build | `pnpm build` |
| Lint | `pnpm lint` |
| Type check | `pnpm tsc --noEmit` |
| Unit tests | `pnpm test` |
| One test file | `pnpm test -- path/to/file.test.ts` |
| E2E tests | `pnpm test:e2e` |
| New migration | `pnpm prisma migrate dev --name <name>` |

## Folder structure
<Replace with the real structure. Keep it short.>
- `src/modules/<feature>/` – controller, service, DTOs, and tests for one feature
- `src/common/` – shared guards, filters, pipes, and utils
- `src/shared/types/` – shared TypeScript types
- `prisma/` – schema and migrations

## Project conventions
<Only things special to this project that are not already in ~/.claude/rules.>
- API responses use the shape `{ data, error, meta }`.
- Dates are stored in UTC and shown in the user's time zone.

## Environment variables
- Every variable is listed in `.env.example`. Never read or edit `.env`.
- Tell me when a new variable is needed.

## Before you finish a task
1. Run lint, type check, and tests for the changed code.
2. Check that loading, error, and empty states are handled.
3. Summarize what changed and anything I need to do (migrations, new environment variables, new packages).

## Do not
- Do not change files in `<generated or legacy folder>`.
- Do not commit or push unless I ask.
