# SEO / AEO / GEO Fix Report — Dr. Varadharajan V

Date: 2026-09-28 · Branch: `main` · Base commits: `24af849` (site), `75319eb` (audit)
Method: `next build` + `next start -p 4300`, verified with `scripts/audit-site.ts`,
`validate-schema.ts`, `check-links.ts`, `check-redirects.ts` (Node fetch, 10s timeouts).

## Scripts: pass/fail

| Script | Result |
|---|---|
| `pnpm lint` (eslint) | PASS, 0 errors, 0 warnings |
| `pnpm tsc --noEmit` | PASS, 0 errors |
| `pnpm build` | PASS, 26 routes |
| `scripts/audit-site.ts` | PASS, 19 URLs, 0 broken links, 0 broken anchors, 100% alt coverage |
| `scripts/validate-schema.ts` | PASS, all @id refs resolve globally, FAQ schema == visible FAQ counts, no banned terms |
| `scripts/check-links.ts` | PASS, no body self-links, every page >=3 inbound internal links |
| `scripts/check-redirects.ts` | PASS, `/website-doctor-profile/*` 308s to `/`, no loops |
| Indexing guard OFF (unset) | PASS, robots.txt = `Disallow: /` + global `noindex, nofollow` meta |
| Indexing guard ON (true) | PASS, robots.txt allows all + AI crawlers + sitemap line; no noindex meta |

The one "duplicate paragraph" flagged by the audit is the medically-reviewed line,
which is intentionally identical on every medical page (spec requirement).

## Word counts (main content), before -> after

| Route | Before | After |
|---|---|---|
| / | 1,627 | 1,712 |
| /specialities | 157 | 500 |
| /patients-from-outside-chennai | (new) | 375 |
| /privacy | (new) | 300 |
| /terms | (new) | 254 |
| /services/surgical-oncology | 877 | 1,072 |
| /services/breast-cancer-surgeries | 823 | 1,215 |
| /services/breast-oncoplasty | 690 | 1,055 |
| /services/benign-breast-condition-surgery | 777 | 963 |
| /services/gi-oncology | 781 | 1,150 |
| /services/hipec | 668 | 1,044 |
| /services/laparoscopic-robotic-gi-surgery | 739 | 1,103 |
| /services/retroperitoneal-tumor-surgery | 788 | 1,150 |
| /services/minimal-access-surgery | 724 | 1,090 |
| /services/gynaecological-malignancies | 719 | 1,067 |
| /services/thoracic-cancer | 758 | 947 |
| /services/vats-lobectomy | 725 | 1,069 |
| /services/head-and-neck-cancer | 747 | 938 |
| /services/complex-head-neck-resection | 804 | 1,178 |

## Images removed for consent

- `public/images/doctor/hero-intraoperative.webp` — intraoperative/operative photo,
  no patient consent. Removed from the hero and deleted from `/public`.
  Replacement hero: `public/images/doctor/hero-photo.webp` (doctor portrait).
- `public/images/update-1.jpg` (2.1MB) — replaced by `public/images/update-1.webp`
  (~169KB). Not a consent issue, a size fix.
- Gallery and remaining imagery reviewed: all facility, event and portrait photos;
  no identifiable patients or surgery-in-progress images remain.

Largest JS chunks after build: 224K, 164K, 112K (framework + shared runtime).
Third-party runtime requests: Google Maps iframe (lazy) and Web3Forms on submit only.

## Vercel environment variables

- `NEXT_PUBLIC_SITE_URL` = `https://drvaradharajan.com`
- `NEXT_PUBLIC_WEB3FORMS_KEY` = (public key from web3forms.com for dr.varadharajan@gmail.com)
- `NEXT_PUBLIC_ALLOW_INDEXING` = `false` until domain cutover, then `true`

## Remaining TODO(dr-review)

- `src/app/sitemap.ts:4`, `src/app/robots.txt/route.ts:3` — domain cutover date from the
  old iCareHeal site (open question, intentionally kept).
- `src/data/treatment-content.ts` — entries flagged `reviewStatus: 'pending-dr-review'`
  mark the newly added "Who may need this / Preparing / Recovery / Questions to ask"
  sections for doctor review before long-term publication.
