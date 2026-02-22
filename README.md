# Research & Employability Corner (REC)

A conference management web application for the Research and Employability Corner initiative at the University of Wolverhampton. Built with React + TypeScript, backed by Supabase (PostgreSQL), and deployed to GitHub Pages.

## Live Site

https://greenconsult.github.io/connect-innovate-share/

## Features

- **Public pages** — Home, Speakers, Schedule, Proceedings, Committee, Venue, Contact, Flyer (downloadable as PNG)
- **Admin dashboard** — Create, edit, and delete events; manage speakers, schedule, committee, topics, and more
- **Supabase backend** — PostgreSQL database with Row Level Security (public read, authenticated write)
- **Supabase Auth** — Email/password authentication for the admin panel
- **GitHub Pages deployment** — Automated via GitHub Actions on push to `main`

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, TanStack React Query, Framer Motion
- **Backend**: Supabase (PostgreSQL + Auth + RLS)
- **Deployment**: GitHub Pages via GitHub Actions

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A [Supabase](https://supabase.com) project

### Setup

```sh
# Clone the repository
git clone https://github.com/Greenconsult/connect-innovate-share.git
cd connect-innovate-share

# Install dependencies
npm install

# Copy the environment template and fill in your Supabase credentials
cp .env.example .env

# Start the development server
npm run dev
```

### Database Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL in `supabase/migration.sql` via the Supabase SQL Editor — this creates all tables, RLS policies, and seeds the default REC 2026 event
3. Create an admin user in Supabase Dashboard → Authentication → Users → Add User
4. Copy your project URL and anon key into `.env`

### Deployment

The app auto-deploys to GitHub Pages on every push to `main`. To set it up:

1. In your GitHub repo → Settings → Pages → Source: **GitHub Actions**
2. Add repository secrets: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
3. Push to `main` — the workflow in `.github/workflows/deploy.yml` handles the rest

## Project Structure

```
src/
  components/       # UI components (Navbar, Layout, admin forms, shadcn/ui)
  contexts/         # AuthContext (Supabase Auth provider)
  hooks/            # useEvents (React Query), useAuth, use-toast
  lib/              # eventStore (Supabase CRUD), supabase client, utils
  pages/            # Route pages (Home, Speakers, Admin*, etc.)
supabase/
  migration.sql     # Database schema, RLS policies, and seed data
.github/workflows/
  deploy.yml        # GitHub Actions CI/CD for GitHub Pages
```

## License

This project is proprietary to the University of Wolverhampton.
