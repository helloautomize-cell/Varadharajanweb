# SEO / AEO / GEO Audit Report — Dr. Varadharajan V (drvaradharajan.com)

Audit date: 24 Oct 2026 · Method: production build (`next build` + `next start`, Next.js 16.3.5) + live domain checks · Crawl UAs tested: Googlebot, Bingbot, GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot (all returned 200 with full HTML on localhost and on the live domain)

Scope: all 19 indexable routes — `/`, `/specialities`, `/patients-from-outside-chennai`, `/privacy`, `/terms`, 14× `/services/[slug]`, plus `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`, `manifest.webmanifest`.

---

## 1. Scores

| Area | Score /100 |
|---|---|
| Crawling & AI-bot access | **88** |
| Technical | **74** |
| Schema | **72** |
| E-E-A-T | **52** |
| Pillar linking | **58** |
| FAQs | **76** |
| Entities & semantics | **55** |
| Keywords | **66** |
| Content humanness | **58** |
| AEO/GEO readiness | **52** |
| **OVERALL** | **65** |

The foundation is unusually good: AI crawlers are explicitly allowed, `llms.txt` and `llms-full.txt` exist, all content is server-rendered, and the Physician/MedicalClinic schema is richer than most medical sites. The score is dragged down by four things: 14 broken treatment images, no informational/article layer for AI engines to quote, missing E-E-A-T page infrastructure (no doctor page, no About/Contact/Editorial Policy/Medical Disclaimer pages, zero citations), and a live duplicate www host.

---

## 2. Checklist

### Crawling and indexing

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | robots.txt exists, links sitemap, doesn't block assets | **PASS** | `src/app/robots.txt/route.ts` — `Allow: /`, `Disallow: /api/` only, `Sitemap: https://drvaradharajan.com/sitemap.xml` |
| 2 | AI bots allowed | **PARTIAL** | GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Applebot-Extended, Bingbot all explicitly allowed. **Missing: `Claude-User` and `Perplexity-User`** (they still pass via `User-agent: *` but are not named). |
| 3 | No 403/429/challenge for bots | **PASS** | Live test 24 Oct 2026: GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Googlebot all → 200. No middleware exists. |
| 4 | sitemap.xml complete, real lastmod | **PARTIAL** | All 19 indexable URLs present with absolute prod URLs, nothing that redirects/404s. **Same `lastmod` (2026-09-28) on every URL** — it's the global review date, not per-page modification (`src/app/sitemap.ts:6`). |
| 5 | llms.txt exists | **PASS** | `/llms.txt` and `/llms-full.txt` (101 KB) — doctor, credentials, services, links, FAQs all present. |
| 6 | No accidental noindex | **PASS (note)** | No noindex in output. Indexing is gated by `NEXT_PUBLIC_ALLOW_INDEXING` at **build time** (`layout.tsx:18`) — preview deployments must have the env set to `false` at build; nothing auto-protects a `vercel.app` preview built with indexing on. |
| 7 | metadataBase + absolute self-canonical | **PASS** | `layout.tsx:21`; verified in raw HTML: `<link rel="canonical" href="https://drvaradharajan.com/services/breast-cancer-surgeries"/>` etc. on every page. |
| 8 | One site version, others 301/308 | **PARTIAL** | Trailing-slash → 308 ✓ (`/specialities/` → `/specialities`), http→https ✓ (Vercel 308). **`https://www.drvaradharajan.com` serves the full site with 200 and does NOT redirect to apex** — duplicate live host (canonical tag mitigates but doesn't replace the redirect). |
| 9 | Real 404s | **PASS** | `/nonexistent-page-xyz` → 404 with `robots: noindex` (`not-found.tsx:7`). |

### Every word visible to Google and AI bots

| # | Check | Result | Evidence |
|---|---|---|---|
| 10 | Content, headings, FAQs, byline, dates, links, schema in raw HTML | **PASS** | Verified via curl + GPTBot UA: FAQ answers render inside `id="service-faq-panel-*"` divs, reviewer line, breadcrumbs, both JSON-LD blocks all present in server HTML. Identical bytes across all bot UAs (no cloaking). |
| 11 | No client-only content | **PARTIAL** | `Treatments.tsx` uses `useState('General')` — **only the 1 General-category card is in raw HTML; the other 13 treatment cards never reach bots** (footer links cover crawlability). Mobile nav drawer is client-only (desktop nav present, so links still crawlable). FAQ answers are in DOM — good. |
| 12 | Internal links are real `<a href>` / next/link | **PASS** | All nav, cards, breadcrumbs use `next/link`; tab buttons are filters, not navigation. |

### On-page

| # | Check | Result | Evidence |
|---|---|---|---|
| 13 | Unique title 50–60, meta 140–160 | **PARTIAL** | All unique. Titles <50 chars on 6 pages: HIPEC 36, GI Oncology 42, VATS 45, Thoracic 46, Surgical Oncology 48, Breast Oncoplasty 48; /specialities 47, /patients 49, /privacy 44, /terms 42. Meta <140 on 6 pages: breast-cancer-surgeries 133, minimal-access 136, thoracic 132, vats 137, head-and-neck 133, complex-head-neck 139. |
| 14 | One H1, clean H2/H3 | **PARTIAL** | Exactly 1 H1 per page everywhere. Noise: footer nav groups are `<h2>` ("Specialities", "Treatments", "Contact Us", "Policy", "Social Media") on every page — pollutes the outline. |
| 15 | Clean descriptive URLs | **PASS** | `/services/<kebab-slug>`, hub `/specialities`. |
| 16 | Descriptive alt, width/height, next/image | **PARTIAL** | All images have alt and use next/image. **All 14 treatment card icons 404**: `TreatmentCard.tsx` renders `/images/treatments/{slug}.svg` but `public/images/treatments/` contains only `photos/` — verified `GET /images/treatments/surgical-oncology.svg` → 404 on the production build. |
| 17 | OG + Twitter tags | **PASS** | `og:title/description/image/site_name/locale/type` + `twitter:card/title/description/image` verified in raw HTML on all page types. Per-page OG images not set (all share `/og/og-default.webp`). |
| 18 | Visible breadcrumbs on every inner page | **PARTIAL** | Present on `/specialities`, `/patients-from-outside-chennai`, all `/services/*`. **Missing on `/privacy` and `/terms`** — yet BreadcrumbList schema is emitted there (schema/content mismatch). |
| 19 | CWV mobile (LCP<2.5, INP<200, CLS<0.1) | **UNVERIFIED** | No Lighthouse in this environment. Proxy signals are decent: static SSG, `next/font` Figtree, hero image `priority`, one custom font, minimal client JS. **Must be measured** — flagged P3. |
| 20 | No broken internal links / links to redirects | **PASS** | All internal hrefs resolve to the 19 live routes or same-page anchors. One permanent redirect exists for legacy `/website-doctor-profile/*` → `/` and no internal link points at it. (Broken *images* tracked under #16.) |

### Schema

| # | Check | Result | Evidence |
|---|---|---|---|
| 21 | One connected @graph, stable @ids | **PARTIAL** | Each page emits **two separate** `ld+json` blocks — layout `siteGraph()` (WebSite+Physician+Clinic) and page `pageGraph()` (MedicalWebPage+BreadcrumbList+extras). They're connected by `@id` references (`#physician`, `#clinic`, `#website`) but emitted as 2 graphs, not one. |
| 22 | Article schema fields | **PARTIAL** | `MedicalWebPage` has `reviewedBy` + `lastReviewed` ✓ but **no `author`, `datePublished`, `dateModified`, `citation`**; `about` is a plain string (page name), not a MedicalCondition/MedicalProcedure entity. |
| 23 | Physician schema | **PASS** | `schema.ts:40-95` — qualifications as EducationalOccupationalCredential, TNMC reg `90663` via `identifier`, medicalSpecialty, hospitalAffiliation, image, sameAs (FB/LinkedIn/IG/GBP). Best part of the markup. |
| 24 | MedicalProcedure / Service on service pages | **PASS** | `procedureNode()` on all 14, with `bodyLocation` on 10, `provider → #physician`. |
| 25 | BreadcrumbList inner pages, FAQPage where FAQs | **PASS** | BreadcrumbList on all inner pages; FAQPage on home (12 Q) + all 14 service pages (4 Q each), generated from the same data that renders the visible FAQs. |
| 26 | Schema matches content, valid, no duplicates | **PARTIAL** | Valid JSON, no dupes. Mismatches: BreadcrumbList on /privacy + /terms with no visible breadcrumb; `audience: {'@type': 'Patient'}` — `audience` expects an `Audience` type; `FAQPage` nodes lack `@id`. |

### YMYL and E-E-A-T

| # | Check | Result | Evidence |
|---|---|---|---|
| 27 | Dedicated crawlable doctor page | **PARTIAL** | All the facts exist (photo, quals, TNMC reg, memberships, languages, affiliations) but only as a homepage section (`#meet_doctor`) — **no dedicated `/doctor` or `/about` URL** for articles/bylines to point to. |
| 28 | "Written by" + "Medically reviewed by" + dates near top | **PARTIAL** | `ReviewerLine` ("Medically reviewed by … Reg. No. 90663 · Last reviewed: September 2026") on all 14 service pages + /specialities. **No "Written by", no published date**; the line sits mid-page, not "near the top"; **absent on `/` and `/patients-from-outside-chennai`**. |
| 29 | Trust pages in footer | **PARTIAL** | Privacy + Terms exist and are footer-linked. **Missing: About page, Contact page, Editorial Policy, Medical Disclaimer** (About/Contact are homepage anchors `/​#why_choose`, `/​#location`; disclaimer exists as a paragraph on service pages + footer, not a page). |
| 30 | Authoritative citations | **FAIL** | Zero external medical citations anywhere — no PubMed/WHO/ICMR/NIH/guideline links in any data file. |
| 31 | No risky claims | **PASS (borderline)** | No "100%/guaranteed/painless/best doctor". Borderline, unsourced: "improves survival outcomes" (HIPEC intro), "gold standard for early-stage lung cancer" (VATS), "without compromising oncologic safety or cure rates" (home FAQ). |
| 32 | "When to see a doctor" guidance | **PARTIAL** | Explicit section only on breast-oncoplasty ("When to See a Doctor"); most pages have an equivalent "Who Should Seek a Surgical Opinion"/"Signs That Warrant Prompt Evaluation" block — service pages only, and surgical-oncology/hipec/vats/complex-hn lack one. |
| 33 | First-hand experience + Indian context | **PARTIAL** | Stats (5,000+ surgeries etc.), tumour-board workflow, languages, travel/visa guidance all give real context. **No INR costs, no insurance/TPA info, no hospital-stay specifics** — the exact quotables patients and AI answers need. |
| 34 | NAP identical everywhere | **PASS** | `siteConfig` single source: Iswarya Hospital, 110 Rajiv Gandhi Salai OMR Tharamani Chennai 600041, +91 94442 64315 — identical in header/footer/schema/llms.txt. |

### Pillar and supporting content

| # | Check | Result | Evidence |
|---|---|---|---|
| 35 | Every pillar has 5 supporting articles | **FAIL** | **The site has no article layer at all.** Architecture is `/specialities` hub → 14 service pages (1 hub, not pillar→5-articles). There is nothing for the pillar-supporting model to attach to. |
| 36 | Pillar links to supporting in body copy | **PARTIAL** | `/specialities` links all 14 service pages as cards inside body content (functional equivalent for this architecture). |
| 37 | Supporting links back to pillar early + 2 siblings | **PARTIAL** | Service pages reach `/specialities` only via breadcrumbs (not body copy); `related:` blocks link 2–3 sibling services; `LinkedParagraph` auto-links ≤2 entity phrases per paragraph. |
| 38 | Links to relevant service + doctor page | **PARTIAL** | Service↔service interlinking works. **No doctor page to link to** — the "About the Doctor" card links only to `#location`. |
| 39 | Descriptive, varied anchors | **PASS** | Entity-name anchors via `LinkedParagraph`, descriptive card titles, "Travelling for treatment?" — no click-here/read-more found. |
| 40 | No orphans, ≤3 clicks | **PASS** | Footer links every service page; deepest page is 2 clicks from home. |

### FAQs

| # | Check | Result | Evidence |
|---|---|---|---|
| 41 | 4–8 unique real FAQs per content page | **PARTIAL** | All 14 service pages: 4 unique, genuinely patient-like questions each ✓. Home: 12. **None on /specialities, /patients-from-outside-chennai** (both could carry them). |
| 42 | Direct answer first, 40–60 words | **PARTIAL** | Answers open with a direct answer but run ~60–110 words — home FAQ answers are the worst (80–110). |
| 43 | FAQs in raw HTML + match schema verbatim | **PASS** | Same data source renders both the accordion (in DOM, CSS-hidden) and FAQPage JSON — verified identical text. |

### Entities, keywords and semantic writing

| # | Check | Result | Evidence |
|---|---|---|---|
| 44 | Entity coverage per page | **PARTIAL** | Missing per page — see §4 table. Universal gap: **cost**. Most pages lack dedicated symptoms/tests sections (exceptions: breast-oncoplasty has symptoms+red flags+risk factors; thoracic/gynae/benign-breast have who-should-seek). |
| 45 | Entity defined in first 100 words | **PARTIAL** | Hero = category label + H1 + tagline (e.g. "Surgical treatment planned around both cure and quality of life") then "Key Facts" — no direct, quotable definition sentence. VATS page does define it in the body ("VATS Lobectomy (Video-Assisted Thoracoscopic Surgery) is a minimally invasive procedure…") but after the hero block. |
| 46 | H2 answers one question, names entity | **PARTIAL** | Mostly descriptive headings ("Tailoring Surgery to the Individual, Not Just the Tumour") — readable but not quotable Q&A; some marketing-style ("Advanced HIPEC Cancer Therapy", "Precision GI Surgery With Minimally Invasive Technology"). |
| 47 | Medical + plain term paired on first mention | **PASS** | "HIPEC (Heated Intraperitoneal Chemotherapy)", "VATS (video-assisted thoracoscopic surgery)", "lumpectomy", "en bloc" explained, "peau d'orange (orange peel)". |
| 48 | Primary keyword in title/H1/URL/first-100/one-H2/meta | **PARTIAL** | Service pages mostly fine. **Homepage H1 "Integrated Oncosurgical Care in Chennai" never says "surgical oncologist"** — the primary keyword is in the title but not the H1 or first 100 words. |
| 49 | No cannibalisation | **PARTIAL** | Risk pairs: `minimal-access-surgery` vs `laparoscopic-robotic-gi-surgery` (both target "keyhole/minimally invasive surgery"); `thoracic-cancer` vs `vats-lobectomy` (both cover keyhole lung surgery). Differentiated in copy but keyword targets overlap. |
| 50 | Quotable specifics (numbers, INR costs, timelines, tables) | **PARTIAL** | Numbers exist (5,000+/3,500+/25,000+, 3–5 day stays, 15 km airport) — all unsourced. **No INR costs, no comparison tables, no step-by-step numbered guides.** |

### AI writing and agent fingerprints

| # | Check | Result | Evidence |
|---|---|---|---|
| 51 | ChatGPT tells | **PARTIAL** | Home FAQ answers + bio/vision blocks contain: "elevate", "holistically", "journey", "empower", "patient-centric", "comprehensive", groups-of-three ("diagnosis, treatment, recovery, and ongoing follow-up"), "precision-driven". Legacy intro sections: "significantly enhance outcomes", "excellent surgical precision", "a powerful therapeutic strategy", "cornerstone treatment". |
| 52 | Claude tells | **PASS (note)** | Zero em dashes anywhere — but dozens of **comma splices where dashes were mechanically removed** ("…the safer choice, the recommendation is always based on your specific case") — a visible editing artifact. |
| 53 | General AI tells | **PARTIAL** | **All 14 service pages use the identical template**: Key Facts → 3–4 intro paragraphs → bullet blocks ("Preparing for…" / "Recovery and Follow-Up" / "Questions to Ask Your Surgeon") → reviewer → doctor card → 4 FAQs → related → disclaimer → contact. Mixed spellings: `tumour`/`tumor`, `gynaecological`/`gynecologic`, `anaesthesia`/`anesthesia`. |
| 54 | Agent fingerprints | **PARTIAL** | 2× `TODO(dr-review)` comments (site.ts:256, sitemap.ts:4); 9/14 `treatmentExtras` entries flagged `reviewStatus: 'pending-dr-review'`; 14 missing SVG assets (broken images). No lorem/console.log/default metadata/test pages found. |

### Extra checks

| # | Check | Result | Evidence |
|---|---|---|---|
| 55 | lang, favicon, manifest, HTTPS, no mixed content | **PASS** | `lang="en-IN"`; favicon.ico + icon.png + apple-icon.png routes; manifest.webmanifest; HTTPS live; only embed is https Google Maps. |
| 56 | Unique local/service pages, GBP NAP match | **PARTIAL** | Single-location site, one consistent NAP + GBP link. **Cannot verify GBP listing fields match** — client check. Note: old site testimonials said "**Iswarya Cancer Centre**" vs new "Iswarya Hospital" — confirm legal name. |
| 57 | Entity sameAs + consistent terms | **PARTIAL** | No Wikipedia/Wikidata/MeSH `sameAs` on any medical entity. Term drift per #53. |
| 58 | PAA + cost + vs coverage | **PARTIAL** | "vs" partly covered (lap vs robotic FAQ, VATS vs open, mastectomy vs conservation). **Cost questions: zero coverage.** Missing PAAs listed per page in §4. |
| 59 | Grade 7–9 reading level, flag outdated facts | **PASS (flags)** | Reads at roughly grade 8–9, plain-English. Flag for doctor: "VATS is widely accepted as the gold standard", "significantly improves survival" claims, and the "5,000+/3,500+/25,000+" stats (need a verifiable basis). |
| 60 | No self-serving ratings/fake testimonials | **PARTIAL** | No review/rating schema ✓. But 3 hardcoded testimonials (first names only, fixed 5-star icons, no source) — **unverifiable; needs client confirmation they're real patient quotes**. |
| 61 | NMC ethics / Drugs & Magic Remedies compliance | **PASS** | No cure guarantees or outcome promises; disclaimers present on every service page and footer. |
| 62 | External links, correct rel | **PASS** | wa.me/maps/socials all `noopener noreferrer`; agency link `noopener nofollow`; no sponsored links. |
| 63 | AI-answer readiness for top-5 queries | **See §6** | Missing: quotable definitions, cost data, dedicated doctor page, citations. |

---

## 3. Issues (by priority)

### P0 — Critical

**ISS-01 — All 14 treatment-card images return 404**
- Affected: `src/components/TreatmentCard.tsx:12` (renders `/images/treatments/{slug}.svg`); all cards on `/specialities`, the Treatments section on `/`, and Related Treatments on all 14 service pages.
- Evidence: `GET /images/treatments/surgical-oncology.svg` → **404** on production build; `public/images/treatments/` contains only `photos/v2/*.webp`.
- Fix: generate/export the 14 SVG icons to `public/images/treatments/`, or point `TreatmentCard` at the existing `photos/v2/{slug}.webp` files.

**ISS-02 — No informational content layer (nothing for AI engines to quote)**
- Affected: site-wide. There is no blog, no condition/symptom/cost guide, no patient-education article — only service descriptions.
- Evidence: `src/app/` contains no article routes; `data/` has only service content.
- Fix: build the pillar→article architecture the brief assumes (e.g. `/services/breast-cancer-surgeries` pillar + articles on symptoms, biopsy/tests, lumpectomy-vs-mastectomy, cost in Chennai, recovery week-by-week). Start with one cluster per category.

### P1 — High

**ISS-03 — Duplicate live host: www serves 200, no redirect to apex**
- Evidence: `curl -I https://www.drvaradharajan.com` → 200, same app (canonical points to apex but the host doesn't 301). http→https and trailing-slash 308s are correct.
- Fix: in Vercel, redirect `www.drvaradharajan.com` → `https://drvaradharajan.com` (308) at the domain level.

**ISS-04 — No dedicated doctor profile page**
- Evidence: credentials/photo/reg no. exist only in `DoctorProfile` (homepage `#meet_doctor`) and Physician schema; `services/[slug]/page.tsx` "About the Doctor" card links only to `#location`.
- Fix: create `/dr-varadharajan-v` (or `/about`) with the existing data — photo, quals, TNMC 90663, memberships, languages, affiliations, publication/conference list — and point every byline/`Physician.url` at it.

**ISS-05 — Missing trust pages**
- Missing: About, Contact (dedicated), Editorial Policy, Medical Disclaimer.
- Evidence: footer "Policy" column has only Terms/Privacy/Travelling (`Footer.tsx:94-115`); header "About Us" → `/#why_choose` anchor.
- Fix: create the four pages using existing site data (disclaimer text already exists inline on service pages — promote it to a page and link it).

**ISS-06 — Zero medical citations**
- Evidence: `grep -i pubmed|who.int|icmr|nih` over `src/data/` → nothing; no Sources section component.
- Fix: add a per-page Sources section citing guidelines/indices for claims (e.g. sentinel-node biopsy, VATS equivalence to open surgery, HIPEC selection criteria).

**ISS-07 — YouTube embeds blocked by the site's own CSP**
- Evidence: `next.config.ts` `frame-src https://maps.google.com https://www.google.com` — `youtube.com`/`youtube-nocookie.com` absent; Videos section iframe (Videos.tsx) will be refused by the browser on click.
- Fix: add `https://www.youtube.com https://www.youtube-nocookie.com` to `frame-src` (prefer nocookie + facade, already facade'd).

**ISS-08 — Treatments tabs hide 13 of 14 cards from raw HTML**
- Evidence: `Treatments.tsx` `useState('General')` — server HTML contains only the General card; other category cards render only after client JS.
- Fix: render all categories server-side (grouped sections like `/specialities`, or CSS-only tabs), keep JS only for optional filtering.

**ISS-09 — Homepage H1/first-100-words don't define the entity**
- Evidence: H1 = "Integrated Oncosurgical Care in Chennai"; subheading "Multi-organ cancer care with advanced robotic and minimally invasive techniques." — "surgical oncologist" appears nowhere above the fold in HTML.
- Fix: H1 to include the entity ("Surgical Oncologist in Chennai …") and a lead sentence defining who/what/where, e.g. "Dr. Varadharajan V is a surgical oncologist in Chennai who performs …".

**ISS-10 — Schema gaps**
- Two separate `@graph` blocks instead of one merged graph per page (minor); `MedicalWebPage` missing `author`, `datePublished`, `dateModified`; `about` is a bare string not a typed entity; `audience` mis-typed as `Patient`; `FAQPage` lacks `@id`; BreadcrumbList emitted on /privacy + /terms with no visible breadcrumb.
- Evidence: `src/lib/schema.ts:154-189`, raw HTML shows 2 `ld+json` blocks/page.
- Fix: merge graphs per page; add `author: #physician`, `datePublished`, `dateModified`; type `about` as MedicalProcedure/MedicalCondition `@id`; fix `audience` to `PatientsAudience`-style typing or drop it; give FAQPage a stable `@id`; render `Breadcrumbs` on privacy/terms.

**ISS-11 — No cost/insurance/comparison content**
- Evidence: `grep -i '₹|INR|cost|fee|insurance'` → nothing anywhere.
- Fix: add cost guidance (ranges, what's included, insurance/TPA reality at Iswarya) — at minimum a "cost in Chennai" section per major service + FAQ; add 1–2 comparison tables (open vs laparoscopic vs robotic).

**ISS-12 — AI-flavored legacy copy on high-traffic pages**
- Affected: home FAQs (`data/faqs.ts` — "elevate", "holistically", "journey", "empower", "patient-centric", triplets), `bioLongForm`/`visionLongForm` (`config/site.ts:282-283`), and old-template intro sections on hipec, complex-head-neck-resection, laparoscopic-robotic-gi-surgery, vats-lobectomy, breast-oncoplasty ("Advanced X / Precision X / Modern X" pattern, "significantly enhance outcomes", "cornerstone treatment").
- Fix: rewrite flagged blocks to the site's newer plain-spoken register (the gi-oncology/benign-breast style is the house style); remove banned vocabulary; fix comma splices left from dash removal.

### P2 — Medium

**ISS-13 — Title/meta length misses** — titles <50 on 6 service pages (HIPEC 36, GI Onc 42, VATS 45, Thoracic 46, Surg Onc 48, Oncoplasty 48) and metas <140 on 6 pages (see checklist #13).
**ISS-14 — robots.txt missing `Claude-User`, `Perplexity-User`** named rules (`robots.txt/route.ts:5-15`).
**ISS-15 — Sitemap uniform lastmod** — same 2026-09-28 on all 19 URLs (`sitemap.ts:6`); track per-page modified dates.
**ISS-16 — Byline/date gaps** — no "Written by" or `datePublished` anywhere; ReviewerLine missing on `/` and `/patients-from-outside-chennai`; sits mid-page not "near top".
**ISS-17 — No visible breadcrumbs on /privacy, /terms** (schema exists → mismatch).
**ISS-18 — Terminology drift** — `tumour`/`tumor`, `gynaecological`/`gynecologic`, `anaesthesia`/`anesthesia` mixed across titles, FAQs and body (`config/site.ts:151,172-176`, `treatment-content.ts:1005`).
**ISS-19 — No entity `sameAs`** to Wikipedia/Wikidata/MeSH on conditions/procedures.
**ISS-20 — Cannibalisation risk** — `minimal-access-surgery` vs `laparoscopic-robotic-gi-surgery`; `thoracic-cancer` vs `vats-lobectomy`.
**ISS-21 — Per-page OG images not set** (every page shares `og-default.webp`; service pages should use their treatment photo).
**ISS-22 — Structural noise** — footer nav groups use `<h2>`; video titles are "Video 1/2/3" (also feeds embed `title`); Updates cards are unlinked dead cards with a "Call Us" CTA.
**ISS-23 — Unverified testimonials** — 3 hardcoded, first-name-only, fixed 5-star icons (`Testimonials.tsx:4-17`); either verify real quotes or attribute source.
**ISS-24 — Comma-splice artifacts** — dozens in `treatment-faqs.ts`/intro bodies where dashes were stripped (e.g. "…there is no single rule. Many patients are suitable…" reads fine, but "…the safer choice, the recommendation is always based on your specific case" doesn't).
**ISS-25 — Preview-indexing gap** — `NEXT_PUBLIC_ALLOW_INDEXING` evaluated at build; a Vercel preview built without the env serves indexable pages.
**ISS-26 — 9/14 service extras marked `reviewStatus: 'pending-dr-review'`** — keyFacts/extraIntro/extraBullets content not yet doctor-signed-off (breast-cancer-surgeries, breast-oncoplasty, gi-oncology, hipec, laparoscopic-robotic-gi-surgery, retroperitoneal-tumor-surgery, minimal-access-surgery, gynaecological-malignancies, vats-lobectomy, complex-head-neck-resection).

### P3 — Low / needs client input

- **NEEDS-CLIENT-01**: Confirm the 3 testimonials are real patient quotes (and can they be attributed, e.g. to Google reviews?). If not, replace or remove.
- **NEEDS-CLIENT-02**: Confirm clinic legal name — site says "Iswarya Hospital"; old-site testimonials referenced "Iswarya Cancer Centre" (see `docs/audit/SITE_FACTS.md`).
- **NEEDS-CLIENT-03**: Old site claimed "14+ years experience" — absent from the new site; confirm figure and whether to state it.
- **NEEDS-CLIENT-04**: GBP listing name/address/phone/categories — verify they match the site's NAP exactly.
- **NEEDS-CLIENT-05**: Cost ranges the doctor is comfortable publishing (consult fee, indicative surgery ranges, insurance handling).
- **P3-06**: 2× `TODO(dr-review)` comments to resolve (domain cutover note).
- **P3-07**: Run Lighthouse mobile on `/`, `/specialities`, one `/services/*` page — CWV unmeasured in this audit.

---

## 4. Page-by-page table

Byline = visible reviewer line (none show "Written by" anywhere). Links in/out from prior crawl (`docs/audit/pages.csv`) — home links-out counts include nav+footer. AI score = AI-likeness 0–100 (higher = sounds more AI-written).

| URL | Type | Cluster | Primary keyword | Byline | Dates | FAQ | Schema | Links out | AI score |
|---|---|---|---|---|---|---|---|---|---|
| / | Home | — | surgical oncologist in chennai | ✗ | ✗ | 12 | MedicalWebPage+FAQPage+Physician+Clinic+WebSite | 38 | **65** |
| /specialities | Hub | all | surgical oncology specialities chennai | ✓ | review | ✗ | MedicalWebPage+Breadcrumb | 52 | 30 |
| /patients-from-outside-chennai | Guide | — | cancer treatment chennai outstation | ✗ | ✗ | ✗ | MedicalWebPage+Breadcrumb | 37 | 25 |
| /privacy | Legal | — | — | ✗ | ✗ | ✗ | MedicalWebPage+Breadcrumb | 36 | 15 |
| /terms | Legal | — | — | ✗ | ✗ | ✗ | MedicalWebPage+Breadcrumb | 36 | 15 |
| /services/surgical-oncology | Service (pseudo-pillar) | General | surgical oncology chennai | ✓ | review | 4 | +MedicalProcedure+FAQPage | 43 | 40 |
| /services/breast-cancer-surgeries | Service | Breast | breast cancer surgery chennai | ✓ | review | 4 | same | 44 | 40 |
| /services/breast-oncoplasty | Service | Breast | breast oncoplasty chennai | ✓ | review | 4 | same | 42 | **60** |
| /services/benign-breast-condition-surgery | Service | Breast | benign breast lump surgery chennai | ✓ | review | 4 | same | 42 | 35 |
| /services/gi-oncology | Service | GI & Abdominal | gi cancer surgery chennai | ✓ | review | 4 | same | 43 | 35 |
| /services/hipec | Service | GI & Abdominal | hipec treatment chennai | ✓ | review | 4 | same | 43 | **65** |
| /services/laparoscopic-robotic-gi-surgery | Service | GI & Abdominal | robotic gi surgery chennai | ✓ | review | 4 | same | 44 | **60** |
| /services/retroperitoneal-tumor-surgery | Service | GI & Abdominal | retroperitoneal tumour surgery | ✓ | review | 4 | same | 44 | 35 |
| /services/minimal-access-surgery | Service | GI & Abdominal | minimal access surgery chennai | ✓ | review | 4 | same | 43 | 40 |
| /services/gynaecological-malignancies | Service | Gynae/Thoracic/H&N | gynaecological cancer surgery | ✓ | review | 4 | same | 44 | 40 |
| /services/thoracic-cancer | Service | Gynae/Thoracic/H&N | thoracic cancer surgery chennai | ✓ | review | 4 | same | 44 | 40 |
| /services/vats-lobectomy | Service | Gynae/Thoracic/H&N | vats lobectomy chennai | ✓ | review | 4 | same | 42 | **55** |
| /services/head-and-neck-cancer | Service | Gynae/Thoracic/H&N | head and neck cancer surgery | ✓ | review | 4 | same | 42 | 40 |
| /services/complex-head-neck-resection | Service | Gynae/Thoracic/H&N | complex head neck resection | ✓ | review | 4 | same | 43 | **65** |

### Worst sentences per page (AI-likeness evidence)

**/` — 65**
1. "The vision of Dr. Varadharajan V in Chennai is to elevate surgical oncology through ethical, precise, and compassionate care." (banned word *elevate*)
2. "He aims to treat each patient holistically, addressing physical, emotional, and long-term needs." (*holistically* + group of three)
3. "His professional journey reflects a blend of clinical expertise, academic dedication, and surgical excellence." (*journey* + triplet)
4. "…he aims to empower patients and their families with clarity, confidence, and the highest quality of oncologic treatment." (*empower* + triplet)
5. "…guiding patients and families with clarity and confidence. His evidence-based practice and holistic support make him a trusted choice for comprehensive cancer treatment." (*holistic*, *comprehensive*)

**/services/hipec — 65**
1. "…it provides a powerful therapeutic strategy that improves long-term outcomes and disease control."
2. "HIPEC significantly improves local tumour control, reduces recurrence rates, and offers selected patients a meaningful improvement in long-term survival…" (strong claim, no citation)
3. "…patients experience fewer systemic side effects, improved tolerance, and enhanced treatment precision." (marketing triplet)
4. Heading set "Advanced HIPEC Cancer Therapy / Precision HIPEC for Abdominal Cancers / Targeted Intra-Abdominal Chemotherapy" — three near-identical marketing H2s.
5. "Improved outcomes with heat-enhanced chemotherapy delivery." (subheading boilerplate)

**/services/complex-head-neck-resection — 65**
1. "It is a cornerstone treatment for large, invasive, or recurrent head and neck tumours." (*cornerstone*)
2. "Patients experience improved quality of life, reduced complications, and higher long-term satisfaction after comprehensive surgical management." (triplet + *comprehensive*)
3. "The result is improved oncologic outcomes, enhanced functional recovery, and significantly better cosmetic results." (triplet, *significantly*)
4. "…restoring function and appearance using advanced free-flap techniques." (boilerplate)
5. "Superior healing, function, and aesthetics after major surgery." (subheading boilerplate)

**/services/laparoscopic-robotic-gi-surgery — 60**
1. "These methods improve patient comfort, preserve organ function, and accelerate return to normal activity." (triplet)
2. "When used in the right patient, these techniques significantly enhance outcomes and long-term recovery."
3. "…all contributing to improved recovery, better quality of life, and excellent surgical precision." (triplet + *excellent*)
4. Headings "Advanced… / Precision GI Surgery With Minimally Invasive Technology / Modern Gastrointestinal Surgery for Faster Recovery" — template.
5. "They are now standard for many GI cancers, benign diseases, and reconstructive procedures." (unsourced scope claim)

**/services/breast-oncoplasty — 60**
1. "It is performed during breast-conserving surgery to remove the tumour with safe margins while maintaining optimal aesthetic outcomes." (*optimal*)
2. "This approach benefits women by improving confidence, emotional wellbeing, and long-term quality of life…" (triplet)
3. "This approach enhances both cancer control and patient satisfaction."
4. "…oncoplasty provides excellent oncologic safety while significantly improving post-surgical aesthetics." (*excellent* + *significantly*)
5. "Modern Techniques for Better Surgical Outcomes" (generic H2)

**/services/vats-lobectomy — 55**
1. "VATS improves surgical precision, reduces postoperative pain, shortens hospital stay, and enhances recovery." (quad list)
2. "…offering excellent long-term oncologic outcomes and faster return to normal activities."
3. "VATS is widely accepted as the gold standard for early-stage lung cancer in suitable candidates…" (strong claim, no citation)
4. "This technique is ideal for patients who value quicker recovery without compromising oncologic safety."
5. "Smooth recovery supported by enhanced recovery protocols." (tautological subheading)

**/services/surgical-oncology — 40**
1. "…which means patients don't need to be referred between multiple surgeons as their diagnosis becomes clearer." (long, loose)
2. "Comprehensive surgical treatment across all major cancer types." (tagline overclaim)
3. "Oncologic standards are identical to open surgery, completeness first" (comma splice)
4. "A Modern, Minimally Invasive Approach Where Possible" (Title Case H2)
5. Generally the cleanest service page — remaining items are template repetition rather than wording.

**/services/breast-cancer-surgeries — 40**
1. "…so the final choice is genuinely informed rather than assumed." (filler adverb)
2. "Approaches used depending on the specific case" (vague subheading)
3. "Situations that call for a surgical consultation" (vague)
4. "Careful evaluation and treatment for non-cancerous breast changes" (boilerplate)
5. Template-identical "Preparing for Surgery / Recovery and Follow-Up / Questions to Ask Your Surgeon" blocks as every other page.

**/services/benign-breast-condition-surgery — 35**
1. "…leaving minimal scarring. The aim throughout is to resolve the concern with the least disruption to the breast's natural shape and function…" (wordy)
2. "…simply for peace of mind" (fine but informal filler)
3. "Treatment of non-cancerous breast conditions using minimally invasive techniques." (boilerplate description)
4. "The decision is made together, weighing the small risks of a minor procedure against the value of a definitive answer." (good sentence, kept for contrast)
5. Low flag — page reads naturally.

**/services/gi-oncology — 35**
1. "…surgery, when the disease is caught at an operable stage, remains one of the most effective ways to achieve long-term control or cure." (unsourced strength)
2. "…which is why experience with this specific anatomy matters." (assertion)
3. "The magnified view is particularly useful in GI anatomy, where tumours often sit close to major vessels…" (fine)
4. "Comprehensive surgical treatment for gastrointestinal cancers and tumors." (*tumors* — US spelling in `shortDescription` vs `tumour` elsewhere)
5. Low flag overall.

**/services/retroperitoneal-tumor-surgery — 35**
1. Title/URL "Tumor" vs body "tumours" — same page, two spellings.
2. "…but they tend to be technically demanding to remove because of how closely they sit against vital structures." (wordy)
3. "This isn't surgery to approach casually" (good)
4. "Specialized surgery for tumors located in the retroperitoneal space." (US spelling boilerplate)
5. Low flag.

**/services/minimal-access-surgery — 40**
1. "…the goal is always the safest route to a complete operation, whichever platform delivers it." (comma splice)
2. "…it can meaningfully improve accuracy." (hedged filler)
3. "Less invasive cancer surgery with faster recovery and smaller incisions." (boilerplate)
4. "The recovery experience most patients report" (vague)
5. Template repetition with laparoscopic page (cannibalisation overlap).

**/services/gynaecological-malignancies — 40**
1. "Surgical treatment for cancers of the female reproductive system." (boilerplate description)
2. "…and occasionally heated intraperitoneal chemotherapy (HIPEC) in selected cases. The approach is matched to what the stage and spread of disease genuinely demand, not applied uniformly." (good — kept; page is largely clean)
3. "Considering the Whole Patient, Not Just the Cancer" (Title Case H2)
4. "Gynaecological malignancies commonly managed" (stiff subheading)
5. Template repetition.

**/services/thoracic-cancer — 40**
1. "…surgical removal, when the disease is caught early enough, remains one of the strongest chances of long-term cure." (*cure* claim, uncited)
2. "…an area where the heart, major blood vessels, and airways all sit close together." (fine)
3. "Comprehensive surgery for lung and chest cavity cancers." (boilerplate)
4. "…makes a real difference to how quickly a patient gets back on their feet." (good)
5. Template repetition.

**/services/head-and-neck-cancer — 40**
1. "Head and neck cancers affect areas most people don't think about until something goes wrong with them…" (long lead, ok)
2. "Surgical treatment for oral, throat, thyroid, and neck cancers, from early-stage to advanced disease." (boilerplate)
3. "The aim throughout is a complete cancer removal that leaves the patient able to swallow, speak, and return to normal social life with the least possible long-term impact." (wordy triplet)
4. "Complete surgical care for cancers of the mouth, throat, and neck." (tagline fine)
5. Template repetition.

**/specialities — 30, /patients-from-outside-chennai — 25, /privacy — 15, /terms — 15** — all read naturally; worst items are generic subheads ("How care is planned", "Planning your visit") rather than AI wording.

---

## 5. Cluster table

The site has **one hub** (`/specialities`, grouping into 4 category anchors) → 14 service pages. There are **no pillar articles and no supporting articles** — the required pillar→5-article structure does not exist anywhere.

| Hub / pseudo-pillar | Service pages (existing) | Missing links per audit model |
|---|---|---|
| `/specialities` (hub) → category anchors | All 14 reachable as cards in body | Service pages reach the hub only via breadcrumbs, not body copy; no supporting articles exist under any service |
| `/services/surgical-oncology` (de-facto pillar) | related: breast-cancer-surgeries, gi-oncology, minimal-access-surgery | No link to 11 other services; no body-copy link back to /specialities; 0 supporting articles (needs 5: e.g. "what does a surgical oncologist do", "second opinion before cancer surgery", "open vs laparoscopic vs robotic", "questions to ask your cancer surgeon", "cancer surgery cost in Chennai") |
| Breast cluster | breast-cancer-surgeries ↔ breast-oncoplasty ↔ benign-breast-condition-surgery (interlinked ✓) | 0 supporting articles (missing: breast lump symptoms, biopsy/frozen section, lumpectomy vs mastectomy, breast surgery cost in Chennai, recovery after mastectomy) |
| GI & Abdominal cluster | gi-oncology ↔ hipec ↔ laparoscopic-robotic-gi-surgery ↔ retroperitoneal-tumor-surgery ↔ minimal-access-surgery | 0 supporting articles (missing: colon cancer surgery, stomach cancer signs, HIPEC eligibility, cost, recovery after bowel surgery) |
| Gynae/Thoracic/Head-Neck cluster | gynaecological-malignancies, thoracic-cancer ↔ vats-lobectomy, head-and-neck-cancer ↔ complex-head-neck-resection | 0 supporting articles per group (missing: postmenopausal bleeding, lung nodule what-next, oral cancer early signs, thyroid lump evaluation, costs) |

Orphans: none — every page is ≤2 clicks from home.

---

## 6. Top-5 AI queries — readiness (checklist #63)

1. **"surgical oncologist in Chennai"** — needs: doctor entity page, definition in first 100 words, NAP + credentials quotable. Missing: dedicated doctor page (ISS-04), entity-defining H1/lead (ISS-09).
2. **"breast cancer surgery cost in Chennai"** — needs: INR ranges, what's included, insurance. Missing entirely (ISS-11). An AI can only quote this site's *existence*, not an answer.
3. **"lumpectomy vs mastectomy — which is better"** — page covers the decision logic well and is quotable in parts; missing a comparison table + sourced outcome numbers (ISS-11, ISS-06).
4. **"what is HIPEC / who is eligible for HIPEC"** — content exists; the definition is buried mid-page (ISS-09 pattern), eligibility is in FAQ but no cited guideline (ISS-06).
5. **"is VATS better than open lung surgery"** — answer exists but as unsourced claims ("gold standard", "comparable survival"); needs citations + a compact quotable answer up top (ISS-06, ISS-09).

Common thread: the site describes services well but offers almost no **answer-shaped, citeable, first-100-words content** — the exact artifacts AEO/GEO needs.

---

## 7. Needs from client (lowest priority)

1. Confirm the 3 homepage testimonials are real patient quotes (source/attribution?).
2. Confirm clinic legal name — "Iswarya Hospital" vs old site's "Iswarya Cancer Centre".
3. Confirm years of experience figure (old site said 14+ years — currently absent).
4. Confirm GBP listing name/address/phone/categories match site NAP.
5. Publishable cost guidance (consult fee, indicative surgery ranges, insurance/TPA notes).
6. Whether a dedicated doctor page should also list publications/conference talks (data exists in bio text).
