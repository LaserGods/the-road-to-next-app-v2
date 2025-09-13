# Copilot Instructions for this Repo

Purpose: concise, project-specific guidance for AI agents in this Next.js 15 app using Prisma, Inngest, Resend, React Query, Zod, nuqs.

## Architecture

- App Router at `src/app/**`. Authenticated area: `src/app/(authenticated)/**` guarded by `getAuthOrRedirect()`.
- Data: PostgreSQL via Prisma (`prisma/schema.prisma`). Core models: `User`, `Session`, `Organization`, `Membership`, `Ticket`, `Comment`, plus token tables.
- Libs: Prisma client (`src/lib/prisma.ts`), sessions (`src/lib/session.ts`), Inngest (`src/lib/inngest.ts`), Resend (`src/lib/resend.ts`). Path alias `@/*` from `tsconfig.json`.

## Auth & Tokens

- Session cookie: httpOnly `session` set via `features/auth/utils/session-cookie.ts`; DB row created via `createSessionToken()` hashing the token (`utils/crypto.ts`). Read with `getAuth()`; enforce with `getAuthOrRedirect({ checkEmailVerified, checkOrganization, checkActiveOrganization })`.
- Email verification: 8-char code, 15 min TTL (`features/auth/utils/generate-email-verification-code.ts`).
- Password reset: link `/password-reset/[tokenId]`, 2h TTL (`features/password/utils/generate-password-reset-link.ts`).

## Background Jobs & Email

- Inngest HTTP handler: `src/app/api/inngest/route.ts`. Events in `src/lib/inngest.ts`:
  - `app/auth.sign-up` → `features/auth/events/*` (welcome + verification).
  - `app/password.password-reset` → `features/password/events/event-password-reset.ts`.
- Emails: React Email templates `src/emails/**`; send with `resend.emails.send` from `features/**/emails/*` using `no-reply@app.ticketbounty.com`.

## Server Actions & Patterns

- Actions: `src/features/**/actions/*.ts` with "use server"; validate with Zod; return `ActionState` via `toActionState/fromErrorToActionState` (`src/components/form/utils/to-action-state.ts`); `redirect()` on success. See `features/auth/actions/sign-in.ts` & `sign-up.ts`.
- Tickets: queries compute ownership and permissions by organization membership (`features/ticket/queries/*`); search params via `nuqs/server` cache (`features/ticket/search-params.ts`).
- React Query provider at `src/app/_providers/react-query/react-query-provider.tsx`.

## Dev Workflows

- Install: `pnpm install` (Prisma generates on postinstall). Start: `pnpm run dev`. Build/Prod: `pnpm run build && pnpm run start`.
- Lint/typecheck: `pnpm run lint` (or `lint-fix`), `pnpm run type`. Seed: `pnpm run prisma-seed`. Email preview: `pnpm run email`.
- Required env: `DATABASE_URL`, `DIRECT_URL`, `RESEND_API_KEY`, and in prod `NEXT_PUBLIC_VERCEL_URL`. Type definitions for AWS keys exist in `environment.d.ts` if S3 is used.

## Extend

- New feature: add model/migration → create `src/features/<name>/{actions,queries,components,utils}` → validate (Zod) → return `ActionState` → `redirect()`.
- New job: add event to `src/lib/inngest.ts`, implement under `src/features/<name>/events/*`, include in `api/inngest/route.ts`.
- Gotchas: `src/app/(authenticated)/layout.tsx` is only the first layer of authentication. A layout should never be the main layer of authentication. Prisma is cached globally in dev.
