# Kedi Tech

Company website for Kedi Tech (Next.js 16, App Router, Tailwind 4, shadcn/ui). Bilingual: French (default) and English.

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `WEBHOOK_URL` | Yes | Make.com webhook receiving contact-form and newsletter submissions |
| `NEXT_PUBLIC_PORTAL_ENABLED` | No | `true` unlocks the client portal demo. It has **no real authentication** and only shows mock data, so never enable it in production |

## Structure

- `src/app/[locale]/(public)`: marketing pages
- `src/app/[locale]/(auth)`: login / signup / forgot-password (UI only, no backend yet)
- `src/app/[locale]/portal`: client portal (mock data from `src/data/`, locked by default)
- `src/app/api`: contact + newsletter endpoints (validated, rate-limited, honeypot)
- `src/i18n/dictionaries`: `fr.json`, `en.json`
- `src/proxy.ts`: locale redirects and portal lock

## Scripts

- `npm run dev`: dev server
- `npm run build`: production build
- `npm run lint`: ESLint

## Docker

```bash
docker build -t kedi-tech .
docker run -p 3000:3000 -e WEBHOOK_URL=... kedi-tech
```
