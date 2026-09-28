# SITE FACTS — Dr. Varadharajan V website audit

Audit date: 2026-09-28 · Repo: github.com/helloautomize-cell/Varadharajanweb (main) · Commit audited: 24af849

## Entity facts (from src/config/site.ts unless noted)

| Field | Value |
|---|---|
| Name | Dr. Varadharajan V |
| Credentials line | Surgical Oncologist, Breast Oncologist, Head & Neck Oncologist |
| Qualifications | M.Ch Surgical Oncology, Fellowships (FIAGES, FALS, FMAS), M.S General Surgery, MBBS |
| Experience | 14 years (rendered as "14+ Years") |
| Registration | 90663-TNMC (in config + Physician schema `identifier`; NOT visible on any rendered page) |
| Specialty | Surgical Oncology |
| Phone | 9444264315 |
| WhatsApp | 919444264315 (wa.me) |
| Email | dr.varadharajan@gmail.com |
| Hospital | Iswarya Hospital |
| Address | 110, Rajiv Gandhi Salai, OMR, Tharamani, Chennai 600041, Tamil Nadu |
| Geo | 12.9803155, 80.2529862 |
| Hours | Mon–Sat 9:00 AM–5:00 PM, Sunday Closed |
| Canonical domain | https://drvaradharajan.com (marked "PLACEHOLDER" in code comments, but matches the real live old site — see below) |
| Google Business | https://share.google/BGRsV105dewQtEwIf |
| Socials | facebook.com/dr.varadharajan/, linkedin.com/in/dr-varadharajan-vijayakumar-9b205224/, instagram.com/answers.to.cancer |
| Languages | NOT stated anywhere — missing |

## Training/affiliations mentioned in bio
Sri Ramachandra Institute of Higher Education; Gleneagles Global Health City (senior oncology roles); conferences ASCO, ESMO, ESSO, IFHNOS, NATCON; journals Indian J Surgical Oncology, BMJ Case Reports, Frontiers in Health Informatics, Diagnostic Pathology.

## Old website
- **Live at https://www.drvaradharajan.com** — an iCareHeal-platform Next.js microsite (CID 1390, doctorId 1879), assets served from `uat-icareheal.s3.ap-south-1.amazonaws.com` (a UAT bucket, ironically).
- Single-page site: all nav is in-page anchors; one extra URL found: `/website-doctor-profile/dr-varadharajan-v-dr-varadharajan-v-in-chennai?doctorId=1879`. No real XML sitemap (sitemap.xml returns the SPA HTML shell).
- Old-site stats shown: 14+ years, 5K+ breast cancer surgeries, 3.5K+ minimally invasive surgeries, 25K+ lives touched.
- Old-site testimonial text references "**Iswarya Cancer Centre**" — new site says "**Iswarya Hospital**" — NAP/name conflict to confirm.
- Old-site map embed pointed to lat 26.4586, lng 74.6049 — **Ajmer, Rajasthan**, wrong city entirely (old-site bug; new site uses correct Chennai coords).
- Domain note: since drvaradharajan.com is the real domain, SITE_URL is actually correct — only the "PLACEHOLDER" comments are stale.

## Stack
- Next.js 16.3.5 (App Router, Turbopack), React 19.2.8, Tailwind 4.3.3, TypeScript 5.9, lucide-react. `next/font/google` (Figtree, self-hosted at runtime).
- 21 static routes: `/`, `/specialities`, 14×`/services/[slug]` (SSG via generateStaticParams), `/sitemap.xml`, `/robots.txt`, `/_not-found`, favicon.
- Metadata via `export const metadata` in layout + per-route `generateMetadata`. Sitewide JSON-LD `@graph` (Physician + MedicalOrganization) in layout `<body>`; service pages add `MedicalProcedure` + per-page `FAQPage`.
- Form: Web3Forms POST (`api.web3forms.com/submit`), `WEB3FORMS_ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY'` — **still placeholder; submissions currently fail** (error state shown to user).

## NAP / entity-consistency findings
1. **"Iswarya Hospital" (new) vs "Iswarya Cancer Centre" (old site testimonials)** — confirm correct legal/brand name.
2. Phone rendered as bare `9444264315` everywhere (no +91, no formatting) — consistent but not E.164; schema `telephone` same.
3. Name written "Dr. Varadharajan V" in config; titles use "Dr Varadharajan V" (no period) and "Dr. Varadharajan V" inconsistently across title strings.
4. Experience "14"/"14+" consistent; qualification order identical everywhere (single source).
5. No conflicting phone/address/email variants found in the codebase.
