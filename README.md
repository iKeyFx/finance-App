# Personal Finance App

A full-stack personal finance tracker built with Next.js 16, React 19, and Supabase. Track your balance, manage budgets, monitor savings pots, browse transactions, and stay on top of recurring bills — all in one place.

## Test Account

| Field    | Value                |
|----------|----------------------|
| Email    | testDsam12@gmail.com |
| Password | 12345678             |

## Features

- **Overview** — snapshot of your current balance, income, expenses, recent transactions, budget spend, pot savings, and recurring bill summary
- **Transactions** — full transaction history with search, category filter, and sort controls
- **Budgets** — create, edit, and delete spending budgets per category; see real spend vs limit
- **Pots** — savings pots with add/withdraw money flows and color-coded themes
- **Recurring Bills** — deduplicated view of monthly recurring transactions with paid/due-soon/upcoming status

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS v4 |
| Auth & Database | Supabase (SSR client) |
| Charts | Recharts |
| Font | Public Sans (variable, self-hosted) |
| Language | TypeScript |

## Project Structure

```
app/
├── (auth)/           # Login and sign-up pages (no sidebar)
├── actions/          # Server actions (budgets, pots)
├── api/              # Route handlers
├── budgets/          # Budgets page
├── components/       # Shared UI components
│   ├── auth/         # Auth forms, logout modal
│   ├── budgets/      # Budget cards, modals
│   ├── overviews/    # Overview section widgets
│   ├── pots/         # Pot cards, modals
│   ├── recurring-bills/
│   └── transactions/
├── overview/         # Overview page
├── pots/             # Pots page
├── recurring-bills/  # Recurring bills page
├── transactions/     # Transactions page
├── error.tsx         # Route-level error boundary
├── global-error.tsx  # Root layout error boundary
├── global-not-found.tsx  # Full-page 404 (no sidebar)
└── layout.tsx        # Root layout
proxy.ts              # Auth middleware (Next.js 16)
utils/supabase/       # Supabase server/client helpers
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env.local` file at the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

Both values are available in your Supabase project under **Settings → API**.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Unauthenticated users are redirected to `/login` automatically.

## Database

The app expects the following tables in Supabase (with `user_id` RLS policies):

| Table | Key columns |
|---|---|
| `balances` | `user_id`, `current`, `income`, `expenses`, `recurring_paid`, `recurring_upcoming`, `recurring_due_soon` |
| `transactions` | `user_id`, `name`, `avatar`, `category`, `amount`, `date`, `recurring` |
| `budgets` | `user_id`, `category`, `maximum`, `theme` |
| `pots` | `user_id`, `name`, `target`, `total`, `theme` |

## Scripts

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Auth Flow

Route protection is handled by `proxy.ts` (Next.js 16 middleware). Public paths are `/login` and `/sign-up` — all other routes require an authenticated Supabase session. Logged-in users visiting public paths are redirected to `/overview`.
