# Dr. Varadharajan V — Surgical Oncologist, Chennai

Marketing/content site for **Dr. Varadharajan V** (M.Ch Surgical Oncology, FIAGES, FALS, FMAS),
Surgical, Breast and Head & Neck Oncologist at Iswarya Hospital, Tharamani, Chennai.

**Live site:** https://drvaradharajan.com

## Stack

- **Next.js 16** (App Router) + React 19 + TypeScript
- **Tailwind CSS v4** via `@tailwindcss/postcss`
- **pnpm** (see `pnpm-workspace.yaml` — `package-lock.json` is not the source of truth)
- **sharp + tsx** for asset/audit scripts in `scripts/`
- Forms submit through [Web3Forms](https://web3forms.com)

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build && pnpm start
pnpm lint
```

## Environment variables

Copy `.env.example` — all vars are optional for local dev:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Enables the appointment form; without it the form shows a call/WhatsApp fallback |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL override; defaults to `https://drvaradharajan.com` |
| `NEXT_PUBLIC_ALLOW_INDEXING` | Indexing is **on by default** (site is live). Set to `false` on staging/preview deploys to emit `noindex` + `robots.txt` disallow |

## Project layout

| Path | Contents |
| --- | --- |
| `src/config/site.ts` | Single source of truth: doctor info, contact details, treatments list |
| `src/data/` | Page copy: FAQs, per-treatment content and FAQs |
| `src/lib/` | `schema.ts` (JSON-LD graph builders), `areas.ts` (areaServed) |
| `src/components/` | Homepage sections + shared components |
| `src/app/` | Routes below, plus `manifest.ts`, `sitemap.ts`, `robots.txt`, `llms.txt`, `llms-full.txt` |
| `scripts/` | Maintenance scripts (run with `npx tsx`) |
| `docs/audit/` | SEO audit findings and fix report |
| `_reference/` | Assets scraped from the old site (source material, not served) |

## Routes

`/` · `/specialities` · `/services/[slug]` (14 treatment pages) · `/patients-from-outside-chennai` · `/privacy` · `/terms`

Old iCareHeal URLs redirect home via `next.config.ts` (`/website-doctor-profile/*`).

## Scripts

| Command | Purpose |
| --- | --- |
| `npx tsx scripts/generate-icons.ts` | Regenerate favicon + app/PWA icons from the logo emblem |
| `npx tsx scripts/generate-assets.ts` | Regenerate `public/og/og-default.webp` |
| `npx tsx scripts/optimize-images.ts` | Convert oversized images in `public/` to WebP |
| `npx tsx scripts/audit-site.ts` | Full SEO/AEO/GEO crawl (expects dev server on `:4300` or `AUDIT_BASE`) |
| `npx tsx scripts/check-links.ts` | Internal link check (no broken/self links) |
| `npx tsx scripts/check-redirects.ts` | Verify legacy redirects |
| `npx tsx scripts/validate-schema.ts` | Validate JSON-LD on built pages |

## SEO notes

- `robots.txt` allows all crawlers (incl. AI bots) and points at `sitemap.xml`
- Every page emits a JSON-LD `@graph` (physician, hospital, breadcrumbs, FAQ/procedure nodes)
- `llms.txt` / `llms-full.txt` provide machine-readable site summaries
- After deploys, submit `https://drvaradharajan.com/sitemap.xml` in Google Search Console

Built and marketed by Automize Media Labs - https://www.automizemedialabs.com/
