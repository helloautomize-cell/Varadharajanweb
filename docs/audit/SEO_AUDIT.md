# SEO / AEO / GEO + Quality Audit — Dr. Varadharajan V

Date: 2026-09-28 · Commit: `24af849` · Method: production build + `next start` on :4400 + Node fetch + cheerio (`scripts/audit-site.ts`). Raw data: `pages.csv`, `raw.json`. 17 URLs crawled (16 indexable + 404 probe).

> **Update (fix pass, commit range after `75319eb`):** all P0, P1 and P2 items addressed.
> Re-audit on :4300, 19 URLs crawled (18 indexable + 404 probe). See `FIX_REPORT.md`.

## BEFORE / AFTER SCORECARD

| Area | Before | After | What changed |
|---|---|---|---|
| Technical SEO | 7/10 | 9/10 | Security headers + CSP added, x-powered-by off, indexing guard via NEXT_PUBLIC_ALLOW_INDEXING, AI-crawler robots, icons/manifest, 308 redirect for the old profile URL, noindex 404 |
| On-page | 8/10 | 9/10 | All titles <=60 chars, all descriptions 130-155, heading skips fixed, one H1 per page |
| Structured data | 7/10 | 9/10 | Single @graph model with stable @ids; Physician (credentials, reg. no., languages, memberships, contactPoint), MedicalClinic (geo, hours, hasMap, areaServed), MedicalWebPage (reviewedBy, lastReviewed), BreadcrumbList on all inner pages; validate-schema.ts passes |
| Content depth | 8/10 | 9/10 | Every service page now 938-1215 words; /specialities 157 to 500; new travel page 375 words |
| E-E-A-T/YMYL | 5/10 | 9/10 | Visible reviewer line + reg. no. on every medical page, credentials/memberships/languages block, approved stats, medical disclaimer sitewide and per service page |
| AEO/GEO | 6/10 | 9/10 | llms.txt + llms-full.txt (text/plain, generated), AI crawlers explicitly allowed, key-facts boxes, question-style sections, travel page |
| Local SEO | 7/10 | 9/10 | areaServed (Tamil Nadu cities, neighbouring states, medical-travel countries), openingHoursSpecification, hasMap, /patients-from-outside-chennai, NAP identical from siteConfig |
| Performance | 6/10 | 9/10 | 2.1MB JPG converted to 169KB WebP; no /public image over 300KB; all raw img replaced by next/image with sizes/priority |
| Accessibility basics | 7/10 | 9/10 | Dead href="#" removed, real /privacy and /terms, form labels with htmlFor + autocomplete + inputmode, FAQ aria-expanded/aria-controls, skip link, focus-visible rings, lang="en-IN" |
| Conversion | 7/10 | 8/10 | Form uses NEXT_PUBLIC_WEB3FORMS_KEY with call/WhatsApp fallback when unset, honeypot, consent checkbox, aria-live states; WhatsApp video-consult path on contact, footer, travel page and service CTAs |

## SCORECARD

| Area | Score | Key reason |
|---|---|---|
| Technical SEO | 7/10 | Sitemap+robots+canonicals+404+noindex all correct; no security headers, X-Powered-By exposed, no apple-touch-icon/manifest |
| On-page | 8/10 | Unique titles/descriptions everywhere, one H1/page; a few descriptions <70 chars, one h2→h4 skip |
| Structured data | 7/10 | Physician+MedicalOrganization+MedicalProcedure+FAQPage all valid and visible-matched; missing MedicalWebPage, BreadcrumbList, openingHours, knowsLanguage, hasMap |
| Content depth | 8/10 | 668–877 main-content words per service page, zero duplicate paragraphs, all FAQ answers server-rendered |
| E-E-A-T/YMYL | 5/10 | reviewedBy in schema but no visible reviewer/medical disclaimer/last-reviewed; reg. number only in schema, not on page |
| AEO/GEO | 6/10 | Q&A blocks + visible FAQ answers excellent; no llms.txt, no areaServed, no "patients from other cities" guidance |
| Local SEO | 7/10 | NAP consistent, map embed + geo schema + GBP link; hours not in schema (openingHoursSpecification missing) |
| Performance | 6/10 | Pages 87–147KB HTML fine; one 2.1MB raw `<img>` (update-1.jpg); plain `<img>` in Gallery/Updates bypass next/image |
| Accessibility basics | 7/10 | 100% alt coverage, semantic headings mostly clean; dead `href="#"` links, form labels not `for`-linked |
| Conversion | 7/10 | CTAs uniform, video/in-person mode routing, confirmation state — but form dead until Web3Forms key; no spam protection configured |

---

## A. PAGE INVENTORY

See `pages.csv` for the full machine-readable table. Summary:

| Route | Words | Title len | Desc len | Notes |
|---|---|---|---|---|
| / | 1627 | 50 | 161 | og:image MISSING |
| /specialities | 157 | 47 | 98 | thin (card grid); og:image MISSING |
| 14× /services/* | 668–877 | 36–64 | 56–101 | all og:image present, all FAQPage+MedicalProcedure |
| /nonexistent-404-test | — | — | — | 404 + noindex ✓ |

- Titles: all unique, all within bounds. Descriptions: unique; shortest are `/services/thoracic-cancer` (56), `vats-lobectomy` (64), `gynaecological-malignancies` (65) — expand to ~120–155.
- H1: exactly 1 per page on all 17 URLs. One heading skip on `/` (h2→h4 in DoctorProfile stat labels).
- Canonicals: absolute, correct domain on all pages. Robots meta: absent on indexable pages (fine — defaults index), `noindex` on 404 ✓.

## B. THIN / DUPLICATE CONTENT

- **Zero near-duplicate paragraphs** (>120 chars) across all pages — Jaccard check clean.
- **Zero placeholder/TODO/YOUR_/lorem** in rendered output (the Web3Forms placeholder is a constant, never rendered).
- Thin spots:
  - `/specialities` — 157 words main content (card grid only; needs intro copy + per-category context).
  - Service pages 668–877 words — below the informal 1500 target but substantive; the 5 core pages (hipec 668, breast-oncoplasty 690, vats-lobectomy 725) are the thinnest despite being "core."
  - Homepage 1627 — fine.
- `href="#"` dead links: Footer "Terms" and "Privacy" — 2 per page ×17 pages (also a compliance gap — no privacy policy page exists).

## C. TECHNICAL CHECKLIST

| Check | Status | Evidence |
|---|---|---|
| sitemap.xml | ✅ | 200, all 16 indexable URLs, lastmod present |
| robots.txt | ✅ | `Allow: /`, sitemap line; **no AI-crawler rules** (GPTBot/ClaudeBot/PerplexityBot/Google-Extended unaddressed — neutral, decide policy) |
| llms.txt / llms-full.txt | ❌ | 404 |
| Unique titles/descriptions | ✅ | all 16 unique |
| Absolute canonicals | ✅ | drvaradharajan.com on all |
| Trailing-slash consistency | ✅ | all clean |
| lang/hreflang | ⚠️ partial | `lang="en"` ✓; no hreflang (acceptable — single-language site) |
| OG + Twitter per page | ⚠️ partial | og:title/desc/site_name/locale everywhere; **og:image MISSING on `/` and `/specialities`**; twitter card ✓ |
| favicon / apple-touch / manifest | ⚠️ partial | favicon.ico ✓; **no apple-touch-icon.png, no site.webmanifest** |
| One H1, no skipped levels | ⚠️ | one H1 everywhere; h2→h4 skip on homepage |
| Image alt coverage | ✅ | 0 missing alt (100%) |
| next/image usage | ⚠️ | Gallery + Updates use raw `<img>` — bypasses optimization; `update-1.jpg` = **2,105KB served raw** |
| Image weights >300KB | ⚠️ | only update-1.jpg (2.1MB) |
| Breadcrumbs UI + BreadcrumbList | ❌ | neither present |
| 404 page | ✅ | status 404 + noindex |
| Broken internal links | ✅ | 0 |
| Broken #anchors | ⚠️ | 2 per page (`href="#"` — Footer Terms/Privacy dead links) |
| External links rel/target | ✅ | all `_blank` links carry `noopener noreferrer` |
| Redirects from old-site URLs | n/a | old site was single-page; only `/` matters — domain is the same |
| Security headers | ❌ | X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-Frame-Options ALL MISSING; `X-Powered-By: Next.js` exposed |
| Indexing guard for previews | ❌ | none (Vercel preview deployments will be indexable if discovered) |
| HTML size | ✅ | 87–147KB — fine |

## D. STRUCTURED DATA AUDIT

All JSON-LD blocks parse cleanly on all 17 URLs. Per-page types:

- `/`, `/specialities`, all services: `Physician` + `MedicalOrganization` (sitewide graph in layout)
- `/`: + `FAQPage` (12 Q) — visible Q&A count matches exactly ✓
- 14× `/services/*`: + `MedicalProcedure` + `FAQPage` (4 Q each) — all match visible accordions ✓
- No FAQPage/schema-vs-visible mismatches anywhere.

Physician schema includes: name, description(credentials), medicalSpecialty, qualifications, identifier (90663-TNMC), telephone, email, image, url, worksFor→clinic, address, geo, sameAs (FB/LI/IG + GBP). **Gaps:** `honorificSuffix`, `alumniOf`, `knowsLanguage`, `memberOf`, `availableService`.

MedicalOrganization includes: name, telephone, address, geo. **Gaps:** `openingHoursSpecification` (hours exist as text), `hasMap`, `areaServed`, `url`, `logo`, `medicalSpecialty`.

MedicalProcedure: name, description, author, reviewedBy. **Nonstandard:** `author`/`reviewedBy` are CreativeWork properties (harmless but not validated for MedicalProcedure); missing `procedureType`, `bodyLocation`, `url`.

**Missing types vs medical best practice:** MedicalWebPage (with reviewedBy + lastReviewed) per page, BreadcrumbList on services, WebSite, MedicalClinic (richer than MedicalOrganization for GBP alignment). No Article (no blog — fine).

**Schema-vs-page honesty:** all schema claims are visible on-page except `identifier: 90663-TNMC` (reg number in schema but never shown to users — also an E-E-A-T gap).

## E. YMYL / E-E-A-T / MEDICAL COMPLIANCE (India)

- Reviewer attribution: in MedicalProcedure schema only; **not visible on any page**. No "Medically reviewed by" line, no last-reviewed dates anywhere.
- Registration number 90663-TNMC: in schema, never rendered — should appear near credentials.
- **No medical disclaimer** anywhere on the site.
- No privacy policy or terms pages (dead footer links), while the form collects name+phone+email — compliance gap.
- NMC-risk wording scan (rendered text): no superlative outcome claims. Contexts found are benign general usage: "the best protection against recurrence" (retroperitoneal), "best chances for long-term cure" (thoracic), "leading institutions" (bio, factual). **Exception: meta keywords contain "best surgical oncologist in Chennai"** — a superlative self-claim in machine-readable metadata; NMC risk + keywords meta is obsolete anyway. Old site carried the same pattern.
- Testimonials: rendered as quotes with names, not framed as guaranteed outcomes — acceptable; no before/after photos, no price claims.
- Patient photos: gallery/treatment images show facilities and surgical scenes; no identifiable patient faces detected in reviewed imagery (verify consent for the intraoperative hero photo before launch).

## F. AEO/GEO READINESS

- ✅ Question-format H2s/FAQs with concise direct answers, all server-rendered (crawlable without JS).
- ✅ Entity consistency: single source of truth (siteConfig), identical NAP everywhere.
- ❌ No llms.txt/llms-full.txt.
- ❌ No `areaServed` in schema; no "patients travelling from other cities/states" guidance (relevant for a specialty surgeon drawing out-of-city patients).
- ✅ Local signals: Google Maps embed + Get Directions on every page via Location section, city name in titles, geo coords in schema.
- ⚠️ No key-facts/summary box at top of service pages ("at a glance" block would help AI citation).

## G. PERFORMANCE & UX (no Lighthouse)

- Largest JS chunks: 224KB + 164KB + 112KB (shared framework/router chunks) — acceptable for a content site.
- Third-party requests per page: Google Maps iframe + Google Fonts (self-hosted by next/font in prod) + none else — clean, no analytics/GTM yet.
- Raw `<img>` usage: Updates (2.1MB source!) + Gallery — switch to next/image.
- Mobile sticky bar (call/WhatsApp/book) renders sitewide via layout ✓; forms present on every page via Location.
- Form: endpoint wired but **key is placeholder → all submissions fail**; no spam protection (Web3Forms honeypot available, not configured); consent line absent; success/error states implemented.
- Client components that could be server: ScrollReveal/MobileCarousel wrappers are inherently client; fine.

## H. INTERNAL LINKING

- Every service page: 18 inbound links (footer + treatments grid + specialities) — **no orphans**.
- Homepage 221 inbound, /specialities 102 — healthy hub structure.
- Anchor text quality: descriptive (treatment names, "Book an appointment") — no "click here".
- Self-links / dead `#` — only Footer Terms/Privacy.
- Contextual cross-links between related service pages (e.g., VATS ↔ thoracic) are absent — opportunity.

## I. REPO HYGIENE

- `_reference/` (56 files, 14MB old-site archive): **not inside public/, not routed — not servable or indexable.** Safe to keep in repo.
- Largest repo files: update-1.jpg 2.1MB (only file >2MB; nothing >5MB).
- No `.env*` files present; no `.env.example`. Web3Forms key confirmed placeholder-only; secret scan clean.
- No analytics, no indexing-guard env var for preview deployments.

---

## PRIORITISED FIX LIST

### P0 — blocks launch / legal risk
1. **Form dead in production** — `WEB3FORMS_ACCESS_KEY` placeholder (`src/components/Location.tsx:8`). Every submission errors. Needs the real key. Effort: S (blocked on key).
2. **Placeholder-domain comments vs reality** — SITE_URL *is* the real domain (drvaradharajan.com resolves to old live site), but comments say "PLACEHOLDER"; confirm ownership will transfer, then strip comments. Effort: S.
3. **No privacy policy** — form collects name/phone/email; footer links are `href="#"` dead ends. Add /privacy + /terms or remove links. Effort: M.
4. **Meta keywords superlative** — "best surgical oncologist in Chennai" in `layout.tsx` keywords; NMC-risk phrasing in machine-readable output; drop keywords array or clean it. Effort: S.
5. **Commit author ≠ Vercel account owner** — commits authored `clauxagent-amz <clauxagent@gmail.com>`; Vercel Hobby may block deploys. Effort: S (config change, reported not fixed).

### P1 — high SEO impact
6. og:image missing on `/` and `/specialities` (S)
7. `update-1.jpg` 2.1MB served via raw `<img>`; convert to WebP + next/image (S) — also convert Gallery `<img>`s (S)
8. Security headers + remove X-Powered-By via next.config headers() + poweredByHeader:false (S)
9. MedicalOrganization schema: add openingHoursSpecification, hasMap, areaServed, url, logo (S)
10. Physician schema: add honorificSuffix, alumniOf, knowsLanguage, memberOf (S)
11. Visible E-E-A-T: render reg. no. + "Medically reviewed by Dr. Varadharajan V, last reviewed {date}" on service pages; add MedicalWebPage type (M)
12. Medical disclaimer line in footer (S)
13. `/specialities` thin (157 words) — add intro + category descriptions (S)
14. llms.txt (S)
15. BreadcrumbList schema + visible breadcrumbs on service pages (M)
16. Short meta descriptions on ~6 service pages — expand to 120–155 chars (S)

### P2 — polish
17. h2→h4 skip on homepage (DoctorProfile stat labels → non-heading elements) (S)
18. AI-crawler policy in robots.txt — decide allow/block explicitly (S)
19. Contextual cross-links between related service pages (S)
20. apple-touch-icon.png + site.webmanifest (S)
21. "Patients travelling from outside Chennai" section + areaServed markup (M)
22. Indexing guard for preview deployments (robots noindex when not production) (S)
23. Phone number display formatting (+91 94442 64315) — cosmetic (S)
24. Footer Terms/Privacy dead links — resolve with P0 item 3 or remove (S)
25. Key-facts "at a glance" box on service pages for AI extraction (M)

## QUESTIONS FOR THE DOCTOR

1. Confirm the hospital brand name on the site: **"Iswarya Hospital" vs "Iswarya Cancer Centre"** (old-site testimonials say Cancer Centre).
2. Registration number **90663-TNMC** — confirm exact format for display (e.g., "Tamil Nadu Medical Council Reg. No. 90663").
3. Qualification order/format for display: "M.Ch Surgical Oncology, Fellowships (FIAGES, FALS, FMAS), M.S General Surgery, MBBS" — is this the preferred order/labels?
4. Languages spoken (for `knowsLanguage` + patient-facing info) — Tamil/English/others?
5. Are the old-site stats accurate to reuse — **5K+ breast cancer surgeries, 3.5K+ minimally invasive, 25K+ lives touched**? (New site only shows 14+ years.)
6. Working hours — "Mon–Sat 9:00 AM–5:00 PM" — still accurate? Any OPD-specific timings?
7. Do you consult at any additional hospitals/clinics besides Iswarya Hospital, Tharamani?
8. Confirm drvaradharajan.com will point to this new site (currently resolves to the old iCareHeal site) — and whether the old site should be taken down or redirected at launch.
9. Any professional memberships to add (IAGES, AMASI, IASO, SSO etc.) for schema `memberOf`?
10. Is there a preferred privacy-policy/data-handling statement, or should a standard medical-practice policy be drafted for review?
11. Confirm consent for the intraoperative hero photo (any patient-visible content)?
12. Video consultations — which platform do you use (so the video-consult confirmation can set expectations)?
