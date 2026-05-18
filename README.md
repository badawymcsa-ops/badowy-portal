# Badowy Portal

Premium Arabic-first client portal for Badowy for Marketing & Software Solutions. The app includes a public agency website, client onboarding, brand profiles, products/services, campaign requests, admin request management, deliverables, comments, revisions, and approval workflows.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- Auth.js / NextAuth
- Server Actions

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Set `DATABASE_URL`, `AUTH_SECRET`, and `AUTH_URL` in `.env`.
4. Run migrations:

```bash
npx prisma migrate dev
```

5. Optional development seed:

```bash
npm run db:seed
```

6. Start development:

```bash
npm run dev
```

## Required Environment Variables

```bash
DATABASE_URL=
AUTH_SECRET=
AUTH_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```

- `DATABASE_URL`: PostgreSQL connection string.
- `AUTH_SECRET`: required by the current Auth.js setup.
- `AUTH_URL`: app URL for Auth.js.
- `NEXTAUTH_SECRET` and `NEXTAUTH_URL`: compatibility aliases; use the same values as `AUTH_SECRET` and `AUTH_URL`.

## Deployment

Production deployment target:

- Vercel hosts the full Next.js app.
- Railway hosts PostgreSQL only.
- Vercel Build Command:

```bash
npm run vercel-build
```

This runs production migrations with `prisma migrate deploy` before `next build`.

Full Arabic deployment guide: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

## Useful Scripts

```bash
npm run lint
npm run typecheck
npm run build
npm run db:deploy
npm run db:seed
npx prisma validate
npx prisma generate
```
