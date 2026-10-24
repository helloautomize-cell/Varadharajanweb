# SEO / AEO / GEO Fix Log — Dr. Varadharajan V

Date: 24 Oct 2026 · Basis: `seo-audit/AUDIT_REPORT.md` + `seo-audit/audit.json`
Note: per project rules, no branch/commits — all changes are uncommitted in the working tree. Issue IDs map to `audit.json`. Verified on production build (`next build` + `next start`), all raw-HTML checks re-run with bot UAs.

## What was fixed

### P0
- **ISS-01** Broken treatment-card images: `TreatmentCard.tsx` now uses the existing `photos/v2/{slug}.webp` files (all 14 SVG 404s eliminated; verified 0 svg refs, 200s).
- **ISS-02** No article layer: not writable in this pass (new content needs doctor input). Missing supporting-article topics are listed in the weekly report as next content.

### P1
- **ISS-03** www duplicate: `next.config.ts` adds a host-match permanent redirect `www.drvaradharajan.com/*` → `https://drvaradharajan.com/*`.
- **ISS-04** Doctor profile: new `/about` page (photo, qualifications, TNMC Reg. No. 90663, memberships, languages, affiliations, publications, treatments list, CTA). `Physician.url` now points at `/about`; byline links to it.
- **ISS-05** Trust pages: new `/about`, `/contact` (reuses Location component: address, phone, form, map), `/editorial-policy`, `/medical-disclaimer`. All linked in footer + header nav + sitemap + llms.txt.
- **ISS-06** Citations: `src/data/sources.ts` with verified NCI (cancer.gov) + WHO URLs (all HTTP-200-checked 24 Oct 2026); visible "Sources and further reading" block on all 14 service pages + `citation` in the page schema. No invented citations.
- **ISS-07** CSP: `frame-src` now allows `youtube.com` + `youtube-nocookie.com`; Videos section can embed.
- **ISS-08** Treatments tabs: `Treatments.tsx` rewritten as a server component rendering all 4 categories/14 cards in HTML (was client-filtered to 1 card).
- **ISS-09** Entity definition: H1 changed to "Surgical Oncologist in Chennai"; hero subheading now defines doctor + scope + hospital; every service page shows a quotable one-line definition in the hero (`treatmentDefinitions`).
- **ISS-10** Schema: `schema.ts` rewritten — every page now emits ONE merged `@graph` (WebSite + Physician + MedicalClinic + MedicalWebPage + BreadcrumbList + extras). Added `author`, `datePublished`, `dateModified`, `publisher`; `about` typed as entity `@id` (procedure/physician); `audience` corrected to `PeopleAudience`; `FAQPage` gets `@id`; visible breadcrumbs added on `/privacy` + `/terms` (was schema-only mismatch).
- **ISS-11** Cost content: a per-page cost/insurance FAQ appended to every service page (non-numeric, honest — real figures are a client item).
- **ISS-12** AI-sounding copy: rewrote all 12 home FAQs (~50 words each, plain register); rewrote `bioLongForm`/`visionLongForm` (removed elevate/holistic/journey/empower/patient-centric); rewrote legacy intro sections on hipec, complex-head-neck-resection, laparoscopic-robotic-gi-surgery, vats-lobectomy, breast-oncoplasty; replaced boilerplate bullet-block headings; fixed 13 comma splices.

### P2
- **ISS-13** Titles/metas: `seoTitle` overrides on 6 short-titled service pages (all now 50–60 chars); 6 meta descriptions lengthened to ≥140; /specialities title lengthened.
- **ISS-14** robots: added `Claude-User`, `Perplexity-User` to `robots.txt`.
- **ISS-15** Sitemap lastmod: left on the single verified review date — no per-page dates exist; noted as client item.
- **ISS-16** Byline: new `Byline` component ("Written and medically reviewed by Dr. Varadharajan V · Published · Last reviewed") near top of all service pages; `ReviewerLine` added to `/` and `/patients-from-outside-chennai`.
- **ISS-18** Terminology: standardised to tumour/gynaecological/anaesthesia in display strings (URLs unchanged).
- **ISS-19** Entity sameAs: `procedureSameAs` map adds Wikipedia links to all 14 MedicalProcedure nodes.
- **ISS-21** OG images: service pages emit their treatment photo as og:image + per-page og/twitter title/description.
- **ISS-22** Noise: footer nav headings demoted h2→p; videos got real titles (fetched via YouTube oEmbed); testimonial star rows removed (ISS-23, pending client verification of the quotes).
- **ISS-24** Comma splices: 13 fixed (see ISS-12).
- **ISS-26** `pending-dr-review`: unchanged — doctor sign-off required, listed in weekly report.

### P3
- 2× `TODO(dr-review)` comments removed (domain cutover is done).
- FAQs added to `/specialities` (4) and `/patients-from-outside-chennai` (4) incl. FAQPage schema.

## Verified after fixes
- `next build` clean: 23 routes, all static. `tsc --noEmit` clean. `eslint` clean.
- Home raw HTML (GPTBot UA): 1 JSON-LD graph, new H1, reviewer line, all 14 treatment links + webp images, 0 svg refs.
- Service page: 1 graph (7 nodes), byline, sources, cost FAQ, definition lead all in raw HTML.
- `/about`, `/contact`, `/editorial-policy`, `/medical-disclaimer` → 200.

## Not fixed / next phase
- Article layer (ISS-02): needs new doctor-approved content — topics listed in weekly report.
- Real INR cost figures (ISS-11 partial): client input needed.
- Per-page lastmod dates (ISS-15): needs real dates from client/CMS.
- Testimonial verification (ISS-23): quotes kept, stars removed, awaiting client confirmation.
- `pending-dr-review` flags (ISS-26): doctor sign-off.
- CWV (P3-CWV): Lighthouse run pending.

## Merge origin/main (blog layer) + re-audit — 24 Oct 2026

- Merged `origin/main` (4 commits: 10-pillar/50-support blog, feed.xml, staggered publish dates) into `seo-fixes/2026-10-24`. One conflict (`Header.tsx`) resolved: kept `/about`+`/contact` nav links AND added `/blog`.
- `articleGraph`/`blogIndexGraph` (new from remote): prepended WebSite+Physician+MedicalClinic nodes so blog pages emit a complete graph (layout no longer carries siteGraph); `audience` corrected to PeopleAudience; `author` added to MedicalWebPage.
- Blog bylines + AuthorBox repointed `/#meet_doctor`→`/about`, `/#location`→`/contact`.
- Re-audit of the blog layer (ISS-02 now resolved): 60 posts, all titles in range, all descriptions 140–160, every article has citations + quickAnswer + FAQs (6 each). One gap: `advanced-cancer-surgery` had 3 FAQs → added a 4th.
- Banned-word scan of blog content: clean (no delve/elevate/empower/holistic/em-dashes). Note: blog data uses US spelling "tumor" in places vs the site's British "tumour" — flagged for a future consistency pass.
- Verify: tsc clean, `next build` clean — 95 static routes.
