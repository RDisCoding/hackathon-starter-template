# 🚀 Next.js + Supabase Starter

A production-ready boilerplate that ships with:

* **Next.js 15** (App Router, Server Actions, React 19)
* **Supabase Postgres** & Auth (email + Google + GitHub OAuth)
* **Prisma ORM**
* **TailwindCSS 3** dark-mode design system (purple/blue/red gradients)
* **Role-based Admin panel**
* **Stripe Checkout** stub
* **Docker** dev stack

Clone, add your environment keys, and you can start coding features ☕️.

---

## 1 · Project Bootstrap

```bash
# 1. Clone your fork
$ git clone https://github.com/<you>/<repo>.git my-app
$ cd my-app

# 2. Install deps (pick one)
$ pnpm install   # ↖ best speed
# npm install
# yarn install

# 3. Copy env template → fill secrets
$ cp .env.example .env.local

# 4. Start the stack
$ npm run dev            # Next.js dev server @ http://localhost:3000
# OR full docker (Next + Postgres)
$ docker compose up -d   # then http://localhost:3000
```

### What you should see

* `/`          → Dark-theme landing page
* `/auth`      → Email / Google / GitHub login
* `/dashboard` → User dashboard (clean URL; no `?code=` params)
* `/admin`     → Admin panel (only if `is_admin = true`)

---

## 2 · Required Environment Variables

Create **.env.local** in the project root (never commit it!).

| Key | Example | Required For |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xyz.supabase.co` | Supabase client |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOi...` | Supabase client |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJh...` | Server actions that write RLS-protected tables (optional) |
| `DATABASE_URL` | `postgresql://postgres:password@localhost:5432/mydb` | Prisma local dev |
| `STRIPE_SECRET_KEY` | `sk_test_...` | Payments (optional) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_...` | Payments (optional) |
| `GOOGLE_CLIENT_ID` | `123.apps.googleusercontent.com` | Google OAuth |
| `GOOGLE_CLIENT_SECRET` | `abc` | Google OAuth |
| `GITHUB_CLIENT_ID` | `Iv1.abc` | GitHub OAuth |
| `GITHUB_CLIENT_SECRET` | `def` | GitHub OAuth |

> For Vercel: **Settings → Environment Variables → Import from .env.local**.

---

## 3 · Database & Auth Setup

1. Create a **new project** on Supabase → grab the `Project URL` & `anon` key.
2. In **Authentication → Providers** enable *Google* & *GitHub*; paste their client IDs + secrets.
3. Go to **SQL Editor** and run the migrations in `supabase/sql/init.sql` to create the `profiles` table, RLS policies, and the `is_admin_user()` helper.
4. Mark your own row `is_admin = true` in the `profiles` table to unlock the admin panel.

---

## 4 · Available npm Scripts

| Script | What it does |
| ------ | ------------ |
| `dev` | Runs **Next.js** in dev mode (hot reload) |
| `lint` | ESLint + Prettier |
| `typecheck` | `tsc --noEmit` |
| `build` | Production build (Next.js) |
| `start` | Start the built app |
| `docker:dev` | Compose up Postgres + Next in watch mode |

---

## 5 · Docker Workflow

```bash
# one-liner
$ docker compose up -d            # postgres:16 + next
# rebuild after dep change
$ docker compose build --no-cache
# stop
$ docker compose down
```

* Database credentials inside the container match **DATABASE_URL**.
* Data volume persists between restarts (`pgdata`).

---

## 6 · Deploying to Vercel

```bash
# 1. Login & link
$ vercel login
$ vercel link

# 2. Pull envs (or set through dashboard)
$ vercel env pull .env.production

# 3. Deploy
$ vercel --prod
```

Vercel automatically installs deps, runs `next build`, and serves the **./out** directory.

---

## 7 · Common Issues & Fixes

| Symptom | Likely Cause | Fix |
| ------- | ------------ | --- |
| `Unknown utility class border-dark-600` | Custom colours missing | Add the `dark` palette to `tailwind.config.js` or use `dark:border-gray-600` |
| Logged-in after `npm run dev` restart | Dev cookie persisted | Middleware deletes `sb-access-token`/`sb-refresh-token` when `NODE_ENV=development` |
| `/dashboard?code=...` shows wrong admin status | OAuth code still in URL | `SanitizeURL` component cleans the query + `exchangeCodeForSession()` in `/auth/callback` |
| 500 from `/admin` | RLS recursion | Ensure you ran `supabase/sql/init.sql`—it creates `SECURITY DEFINER` helper functions |

---

## 8 · Project Structure

```
├─ app/              # Next.js App Router
│  ├─ auth/          # Email & OAuth flows
│  ├─ admin/         # Admin panel (client components)
│  └─ api/           # Route Handlers (e.g., checkout.ts)
├─ components/       # Shared UI (Navbar, buttons)
├─ contexts/         # AuthContext provider
├─ lib/              # supabase/, prisma/, utils
├─ prisma/           # schema.prisma + migrations
├─ public/
├─ styles/           # tailwind/globals.css
└─ docker-compose.yml
```

---

## 9 · Next Steps

* Add domain-specific models to `prisma/schema.prisma` → `npx prisma migrate dev`
* Extend the admin panel by adding <Resource /> entries (React-Admin style)
* Configure a Stripe price in Supabase `stripe_products` table → hook `/api/checkout`.
* Swap out the gradient palette to your brand colours in **tailwind.config.js**.

Happy shipping! 🥳

---

© 2025 MIT License
