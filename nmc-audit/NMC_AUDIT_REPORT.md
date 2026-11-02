# NMC Advertising Compliance Audit — Dr. Varadharajan V (drvaradharajan.com)

Audit date: 26 October 2026
Scope: this repository (Next.js 16 site) + live site at https://drvaradharajan.com (verified live on 26 Oct 2026; live HTML matches the repo for all items cited below).
Method: source review of all pages, components, data files, schema, routes and public assets; raw-HTML fetch of the live homepage; no code or content was changed.

---

## 1. Practice profile

| Item | Finding | Evidence |
|---|---|---|
| Practice type | **P2 — Solo surgeon who also operates.** One named RMP consulting and operating at a hospital he does not own the brand of. | Single doctor throughout; `clinicName: "Iswarya Hospital"` in `src/config/site.ts:252`; no doctor directory. |
| State / State Medical Council | Tamil Nadu — Tamil Nadu Medical Council | `src/config/site.ts:253` (Chennai address), `:258` |
| Doctors named on the site | Dr. Varadharajan V — M.Ch Surgical Oncology, FIAGES, FALS, FMAS, M.S General Surgery, MBBS. Registration number **shown**: "Tamil Nadu Medical Council Reg. No. 90663" (display + schema `identifier`). | `src/config/site.ts:242-258`; `src/lib/schema.ts:55-59` |
| Procedures/surgeries described? | **Yes** — 14 service pages (breast, oncoplasty, GI, HIPEC, robotic/laparoscopic, retroperitoneal, minimal access, gynae, thoracic, VATS, head & neck, complex resection, surgical oncology) plus 60 educational articles. | `src/config/site.ts:115-228`, `src/app/services/[slug]/page.tsx`, `src/data/blog-posts.json` |

---

## 2. Feature inventory

| # | Feature | Present? | Evidence |
|---|---|---|---|
| F1 | Patient testimonials / reviews / "What patients say" | **Yes** | `src/components/Testimonials.tsx:4-17` — 3 named testimonials ("Narayani", "Anish", "Vinoth"), section "What Our Patients Say"; nav item "Testimonial" `src/components/Header.tsx:19`; confirmed live. |
| F2 | Review/rating schema (AggregateRating, Review) | No | `src/lib/schema.ts` — no rating types. |
| F3 | Case studies / patient stories | No | None found. |
| F4 | Before/after or clinical patient photos | No | `public/images/` — facility, doctor, conference, illustration images only; prior audit removed an intraoperative photo (`docs/audit/FIX_REPORT.md`). |
| F5 | Patient or surgery videos | No | `src/components/Videos.tsx:7-11` — 3 YouTube embeds are the doctor's media/educational talks (Polimer News, Iswarya), not patient or surgery footage. |
| F6 | Doctor photographs | **Yes** | Hero `Hero.tsx:83`, About `about/page.tsx:62`, ConsultCTA `consult-photo` `ConsultCTA.tsx:28`, author boxes `AuthorBox.tsx:43`, OG share card `public/og/og-default.webp`, gallery event photo `gallery-03.jpg`, conference photos ×4, composite banner inside every service-page image `public/images/treatments/photos/v2/*.webp`. |
| F7 | Numbers: patients treated / surgeries / counters | **Yes** | `siteConfig.stats`: "5,000+ breast surgeries", "3,500+ minimal access surgeries", "25,000+ lives touched" (`src/config/site.ts:272-276`) rendered on home StatsStrip, hero floating card, DoctorProfile "Experience", About "Credentials", /specialities intro, llms.txt; plus per-service keyFacts "More than 5,000 breast surgeries performed" (`src/data/treatment-content.ts:1053,1106`) and "More than 3,500 minimal access surgeries performed" (`:1280,1384`). Confirmed live. |
| F8 | Awards / media / recognition | **Yes (mild)** | "Conferences & Global Recognition" section `Conferences.tsx`; YouTube media appearances `Videos.tsx`; CHET SURGICON faculty plaque photo in Updates `update-1.webp`. No "top doctor" badges or logo walls. |
| F9 | Equipment / technology / facility | Yes | Facility gallery incl. CT scanner (`Gallery.tsx:6`); robotic/HIPEC technique descriptions. Factual. |
| F10 | Fees / packages / cost | Yes — cost question only | `costFaq` on every service page, deliberately non-numeric (`src/data/treatment-faqs.ts:263-267`). No price list. |
| F11 | Offers / discounts / free camps / coupons | No | None found. `updates` data holds only CME news (`src/components/Updates.tsx:4-15`). |
| F12 | Educational content | **Yes** | 60-article blog, FAQs on every page, service-page education sections. |
| F13 | Appointment forms / WhatsApp / widgets | **Yes** | Web3Forms appointment form with unticked consent checkbox + privacy link `src/components/Location.tsx:477-497`; WhatsApp links sitewide; sticky mobile bar `MobileStickyBar.tsx`. No pop-ups, countdowns or auto-opening widgets. |
| F14 | AI content | **Yes — AI-generated images** | Blog heroes `public/blog/*.webp` (60), service images `public/images/treatments/photos/v2/*.webp` (14), `update-2.jpg` — clearly generative (garbled in-image text e.g. "M.S GEneral Surgery , MBBS", "Enlarged Lymph Nod"). Several depict an AI-generated surgeon figure. No AI labels or editorial disclosure anywhere. |
| F15 | Analytics / pixels / cookies / tracking | Limited | No analytics or ad pixels (verified — none in source). Third-party embeds: YouTube iframes (`Videos.tsx`, load on click) and Google Maps iframe (`Location.tsx:550`); both set third-party cookies on interaction. Privacy policy claims Maps is the *only* embed — inaccurate. |
| F16 | Third-party credits / platform links | **Yes** | "Built & Marketed by Automize Media Labs" footer credit `Footer.tsx:176-187`, repeated in `robots.txt` comment and `llms.txt`; Web3Forms processor; Google Business Profile link. |
| F17 | Announcements / greetings | Yes | Updates section — CME faculty participation and an educational post (`Updates.tsx`). Factual, no festival posts. |
| F18 | Doctor directory | No | Single-doctor site. |
| F19 | Social media links | **Yes** | Facebook, LinkedIn, Instagram (`siteConfig.socialLinks` `site.ts:286-290`) + Google Business Profile `site.ts:251`. |

---

## 3. Applicability

### Must-haves

| Check | Applies? | Status |
|---|---|---|
| M1 Registration disclosure | Always | **Met** — name, qualifications, "Tamil Nadu Medical Council Reg. No. 90663" shown on About, DoctorProfile card, every ReviewerLine/byline, and in Physician schema (`identifier` PropertyValue). |
| M2 Privacy notice & consent (7.6, DPDP) | Yes (F13/F15) | **Partially met — LOW finding NMC-09.** Unticked required consent checkbox + linked privacy policy exist; the linked policy covers what/why/retention/grievance, but the form itself gives no point-of-collection notice beyond "I agree to be contacted". |
| M3 Risks & limitations (8.1 vi) | Yes (procedures described) | **Partially met — MEDIUM finding NMC-06.** Service pages describe benefits, candidacy, preparation and recovery but no page states the risks of the procedure; only a generic "outcomes depend on the person" disclaimer sits at page foot. |
| M4 AI disclosure (7.2 c) | Yes (F14) | **MISSING — MEDIUM finding NMC-05.** ~75 AI-generated images carry no "AI-generated" label; editorial policy has no AI-assistance disclosure. |
| M5 Medical disclaimer (educational content) | Yes (F12) | **Met** — per-article disclaimer + urgent-care line on every blog post, per-service disclaimer, `/medical-disclaimer` page, footer line. |

### Prohibition modules

| Module | Applies? | Result |
|---|---|---|
| C1 Claims & wording | Always | Findings NMC-07 (MEDIUM) |
| C2 Testimonials & reviews | F1 | Finding NMC-01 (HIGH) |
| C3 Cases & patient stories | F3 → **N/A** | — |
| C4 Patient images & video | F4/F5 → **N/A** | — |
| C5 Doctor photos | F6 | Finding NMC-04 (HIGH) |
| C6 Numbers, awards, media | F7/F8 | Findings NMC-02 (HIGH), NMC-10 (LOW) |
| C7 Equipment & facilities | F9 | Compliant — factual descriptions only. |
| C8 Fees & offers | F10 (F11 no) | Compliant — non-numeric cost FAQ is the right pattern; no offers exist. |
| C9 Educational content | F12 | Compliant — 60 articles are genuinely educational, hedged, cited, no in-body sales CTAs (the only in-body mentions of the doctor are factual consult pointers). |
| C10 Solicitation & CTAs | F13 | Compliant — CTA density is moderate; CTAs are factual ("Book an appointment", call, WhatsApp). No pop-ups/countdowns/fear headings. |
| C11 AI | F14 | Finding NMC-05 (MEDIUM) |
| C12 Data protection | F13/F15 | Findings NMC-08 (MEDIUM), NMC-09 (LOW) |
| C13 Third parties & agency | F16 | Finding NMC-03 (HIGH) |
| C14 Announcements | F17 | Compliant — Updates are factual CME/education posts with dates. |
| C15 Institution rules | P2, no directory → **N/A** | — |
| C16 Off-site checklist | F19 | See section 6. |

---

## 4. Executive summary

**Overall risk level: HIGH** (moderate-to-high; would reach Severe only if the testimonials prove to be fabricated — see NMC-01 client input).

Counts by severity: **HIGH 4 · MEDIUM 5 · LOW 3 · CRITICAL 0**

The site's editorial spine is unusually compliant — educational articles, disclaimers, registration disclosure, honest cost FAQ and restrained CTAs are all in good shape. The exposure is concentrated in the promotional layer added around it: named patient testimonials, surgery/patient volume numbers in seven locations, an agency "Marketed by" credit, and doctor photos in promotional placements — each a clear prohibited item under the new NMC advertising guidelines. A second tier of issues covers unlabeled AI-generated illustrations, missing per-procedure risk statements, and a privacy-policy inaccuracy about YouTube embeds.

Top 5 fixes:
1. Remove the testimonials section and its nav item (NMC-01).
2. Remove/replace all patient and surgery volume numbers everywhere they appear (NMC-02).
3. Remove or neutralise the "Built & Marketed by" agency credit in footer, robots.txt and llms.txt (NMC-03).
4. Restrict the doctor's photo to the plain profile/author use; remove it from the hero, OG share card, CTA banner and service-page composites (NMC-04).
5. Add AI disclosure to the editorial policy and label AI-generated illustrations; replace AI images that depict a surgeon/person (NMC-05).

---

## 5. Findings

### HIGH

---

**NMC-01 — Patient testimonials section ("What Our Patients Say")**

- **Severity:** HIGH (escalates to CRITICAL if the quotes are not genuine patient statements — client to confirm provenance)
- **Clause:** 8.1(ii), 8.1(xi), Explanation V; 6.2 (consent does not cure a prohibited item)
- **Location:** https://drvaradharajan.com/ + `src/components/Testimonials.tsx:4-17`; nav link `src/components/Header.tsx:19`; rendered on home `src/app/page.tsx:54`
- **Quoted:** "A very good and ethical surgical oncologist… the outcomes exceeded our expectations." — "Vinoth"; identical pattern for "Narayani", "Anish". Heading: "What Our Patients Say".
- **Why it breaches:** Patient testimonials are prohibited for promotion in any form; named first-person praise on the homepage is a direct breach, and unverifiable praise risks being treated as fabricated reviews (CRITICAL) — the site's own editorial policy even states "No invented patient testimonials" (`src/app/editorial-policy/page.tsx:46`).
- **Compliant alternative:** Remove the `<Testimonials />` render from `src/app/page.tsx`, delete the "Testimonial" entry in `Header.tsx:19`, and remove `Testimonials.tsx`. Do not paraphrase the praise into the doctor's voice anywhere. If any quote describes a case with real teaching value and written consent exists, it may only reappear as an anonymised clinical case (age band, problem, findings, procedure, typical recovery, risks, "outcomes vary"), with no praise and no quotes — otherwise drop it entirely.
- **SEO/AEO note:** No review schema exists, so removal costs no rich-result eligibility. E-E-A-T is preserved through the bylines, reviewer lines, citations and registration disclosure already in place.
- **Client input needed:** Confirm whether the three quotes came from real patients and whether they exist elsewhere (e.g. Google reviews) — they must also not be solicited or republished off-site.
- **Effort:** S

---

**NMC-02 — Patient/surgery volume numbers ("5,000+", "3,500+", "25,000+ lives touched")**

- **Severity:** HIGH
- **Clause:** 8.1(iii), 8.1(ix) — numbers of patients treated, surgeries performed and success/volume claims are prohibited.
- **Location & quoted evidence:**
  - `src/config/site.ts:272-276` — `stats`: "5,000+ breast surgeries", "3,500+ minimal access surgeries", "25,000+ lives touched" (drives all renders below)
  - Homepage StatsStrip — `src/components/StatsStrip.tsx:15-22`
  - Homepage hero floating card — `src/components/Hero.tsx:94-116` ("5,000+ breast surgeries" card beside the doctor's photo)
  - DoctorProfile "Experience" row — `src/components/DoctorProfile.tsx:89-91`
  - About "Credentials at a glance → Experience" — `src/app/about/page.tsx:38-40`
  - Specialities intro — `src/app/specialities/page.tsx:87-89`
  - llms.txt — `src/app/llms.txt/route.ts` (`Experience: …` line)
  - Service-page Key Facts — `src/data/treatment-content.ts:1053, 1106` ("More than 5,000 breast surgeries performed" on /services/breast-cancer-surgeries and /services/breast-oncoplasty) and `:1280, 1384` ("More than 3,500 minimal access surgeries performed" on /services/laparoscopic-robotic-gi-surgery and /services/minimal-access-surgery)
  - Confirmed in live HTML (5× "5,000+", 3× "3,500+", 4× "lives touched" on the homepage alone).
- **Why it breaches:** The guideline expressly prohibits stating numbers of patients treated or procedures performed; "lives touched" is the same claim softened, not a different claim.
- **Compliant alternative:** Replace the numbers with verifiable credentials (the playbook swap):
  - `siteConfig.stats` → e.g. `{ value: 'M.Ch', label: 'Surgical Oncology' }`, `{ value: 'FIAGES · FALS · FMAS', label: 'fellowships in minimal access surgery' }`, `{ value: '15+ yrs', label: 'in surgical practice' }` (only if the client confirms the year count — otherwise use "ASCO · ESMO · ESSO", label "conference presentations").
  - Remove the floating stat card from `Hero.tsx` entirely (it doubles the NMC-04 photo problem).
  - Replace the "Experience" rows in `DoctorProfile.tsx`/`about`/`specialities` with "Senior oncology roles at Sri Ramachandra Institute and Gleneagles Global Health City" or years in practice once confirmed.
  - Service-page keyFacts → drop the count lines; the surrounding factual bullets already carry the page.
  - Remove the `Experience:` line from `llms.txt`.
- **SEO/AEO note:** The numbers were functioning as a trust signal; the replacement preserves E-E-A-T through qualifications, named institutions, society memberships and the published-work record in the bio — all of which are verifiable and allowed.
- **Client input needed:** Years in surgical/oncology practice; whether any credential years (e.g. M.Ch year) should be displayed instead.
- **Effort:** M

---

**NMC-03 — "Built & Marketed by Automize Media Labs" agency credit**

- **Severity:** HIGH
- **Clause:** 8.1(ii) — an RMP shall not engage a third party for marketing medical services; a public "Marketed by" credit states that engagement openly. Also 8.1(xi)/4.4 (nothing indirectly that is prohibited directly).
- **Location & quoted:**
  - Footer, every page — `src/components/Footer.tsx:176-187`: "Built & Marketed by [Automize Media Labs]" (live: 2 occurrences)
  - robots.txt comment — `src/app/robots.txt/route.ts`: "# Website built and marketed by Automize Media Labs"
  - llms.txt last line — `src/app/llms.txt/route.ts`: "Website built and marketed by Automize Media Labs"
- **Why it breaches:** "Marketed" is the operative word — it publicly declares a third-party marketing arrangement for an RMP's services, exactly what 8.1(ii) prohibits.
- **Compliant alternative:** Remove the credit line entirely, or reduce to a neutral attribution: "Website: Automize Media Labs" (no "marketed"). Apply the same removal in the robots.txt comment and the llms.txt closing line.
- **SEO/AEO note:** None — the link is `rel="noopener nofollow"` and carries no ranking value.
- **Client input needed:** None (agency-side wording change).
- **Effort:** S

---

**NMC-04 — Doctor's photo in promotional placements**

- **Severity:** HIGH (JUDGEMENT on the hero per 9.2, but the pattern — photo beside stats/CTAs plus promotional share card — is over the line; recommend the low-risk option)
- **Clause:** 9.2 — photographs not permitted where the use is self-advertisement or promotional publicity.
- **Location & evidence:**
  - Homepage hero: portrait beside "Book an appointment"/"Call Now" CTAs **plus** the floating "5,000+ breast surgeries" card — `src/components/Hero.tsx:60-116`
  - Sitewide OG/share card: portrait + name + "Surgical Oncologist, Chennai" on a branded card — `public/og/og-default.webp`, wired in `src/app/layout.tsx:31`
  - CTA banner: `consult-photo` beside "Ready to Take the Next Step? Book a consultation…" — `src/components/ConsultCTA.tsx:27-49`
  - Every service page hero **and** OG image: composite illustration embedding the doctor's photo + name + full credentials — `public/images/treatments/photos/v2/*.webp`, used by `src/app/services/[slug]/page.tsx:21-36,64,200-207`
  - Media Gallery includes "Dr. Varadharajan speaking at an Iswarya Hospital event" — `src/components/Gallery.tsx:7` (JUDGEMENT — factual event photo, acceptable if the promotional placements are removed)
- **Why it breaches:** The guideline permits one plain identification photo on the profile page; using the portrait as conversion furniture in the hero (with a stats card), in a share-promo card, in a CTA banner and inside every service banner converts it into advertising material.
- **Compliant alternative:**
  - Keep `bio-photo.webp` on the About page, DoctorProfile card and blog AuthorBox only.
  - Hero: remove the portrait (and the stat card per NMC-02); a hospital-exterior or no image is the low-risk layout — headline already says what/where/how to book.
  - OG card: regenerate `og-default.webp` without the portrait (text + clinic name only), or reuse the hospital exterior.
  - ConsultCTA: remove `consult-photo.webp` or replace with the clinic photo.
  - Service composites: regenerate the v2 images without the doctor inset/credential banner (see also NMC-05 — same regeneration pass).
- **SEO/AEO note:** OG cards still get a compliant branded image; AuthorBox keeps the E-E-A-T "person behind the content" signal where it belongs.
- **Client input needed:** A plain portrait for the profile page is already present — none.
- **Effort:** M

---

### MEDIUM

---

**NMC-05 — AI-generated images without disclosure or labels (includes AI depictions of a surgeon)**

- **Severity:** MEDIUM
- **Clause:** 7.2(c) — material AI assistance must be disclosed (editorial-policy disclosure + "AI-generated" labels); 7.2 — no misleading AI content and no AI images of doctors/patients.
- **Location & evidence:**
  - `public/blog/*.webp` — all 60 article heroes are AI-style illustrations; several depict an AI-generated surgeon/person (e.g. `gi-cancer-surgery.webp` — masked surgeon figure beside stylised organs)
  - `public/images/treatments/photos/v2/*.webp` — 14 service images; generative artifacts visible (e.g. `breast-cancer-surgeries.webp` renders credentials as "M.S GEneral Surgery , MBBS")
  - `public/images/update-2.jpg` — AI anatomical illustration ("Enlarged Lymph Nod" truncated text) presented in the Updates/news section
  - No AI disclosure exists: `src/app/editorial-policy/page.tsx` has no AI clause; no image carries an "AI-generated" label.
- **Why it breaches:** Undisclosed AI imagery on a medical site is misleading by omission; AI-generated human figures in surgical dress can be mistaken for the treating doctor or for patients, which 7.2 does not allow.
- **Compliant alternative:**
  - Add an editorial-policy section: "Illustrations on this site are AI-generated for education and are reviewed by Dr. Varadharajan V before publication. They do not depict real patients, staff or procedures."
  - Label the images — either in alt text (`"Illustration of …"`) or a small caption.
  - Replace the subset depicting people (surgeon/patient figures, e.g. `gi-cancer-surgery.webp`) with organ/anatomy-only illustrations, and regenerate `update-2.jpg` and the service composites (with NMC-04, drop the doctor inset at the same time).
- **SEO/AEO note:** AI labeling is increasingly expected by answer engines for YMYL imagery; disclosure also fixes the mismatch between the site's stated editorial standards and its assets.
- **Client input needed:** Confirm the image set was AI-generated (asset provenance) so the disclosure wording is accurate.
- **Effort:** M

---

**NMC-06 — Procedure descriptions lack risks-and-limitations statements**

- **Severity:** MEDIUM
- **Clause:** 8.1(vi) — descriptions of procedures/treatments must state risks and that outcomes vary.
- **Location:** all 14 `/services/*` pages — `src/data/treatment-content.ts` (keyFacts/intro/bullet blocks carry benefits and recovery but no risks) + `src/app/services/[slug]/page.tsx:488-499` (generic disclaimer only).
- **Quoted:** e.g. breast-cancer-surgeries Key Facts list conservation, volumes and venue but nothing on surgical risk; the only qualifier sitewide is "Diagnosis, stage and fitness decide the right treatment for each person."
- **Why it breaches:** Content describes procedures in promotional-adjacent framing without the required counterweight of risks/limitations.
- **Compliant alternative:** Add one "Risks and limitations" paragraph (or a Key Facts bullet) per service page, e.g. for VATS: "As with any lung operation, VATS carries risks such as bleeding, infection, prolonged air leak and the possibility of converting to open surgery; recovery and results vary with the tumour, stage and the patient's fitness." Draft once, review medically, reuse the pattern sitewide.
- **SEO/AEO note:** A risks block strengthens AEO (it answers a real PAA pattern) and YMYL completeness; keep it concise so pages stay direct.
- **Client input needed:** Doctor sign-off on the risk wording per procedure family.
- **Effort:** M

---

**NMC-07 — Promotional framing and unverifiable superlative-style claims**

- **Severity:** MEDIUM
- **Clause:** 8.1(iii), 8.1(ix), Explanation II — superlatives/comparisons allowed only if objectively verifiable; outcome-flavoured claims need restraint.
- **Location & quoted:**
  - "Why Choose Dr. Varadharajan V for Cancer Care" section title — `src/components/WhyChooseUs.tsx:53`
  - "Advanced techniques that reduce pain, speed recovery and minimise scarring." — `WhyChooseUs.tsx:14`
  - "Conferences & Global Recognition" — `src/components/Conferences.tsx:42`
  - "Proven survival benefit in well-selected patients" — `src/data/treatment-content.ts:220` (HIPEC keyFacts)
  - "Extensive experience in surgical oncology…" — `WhyChooseUs.tsx:9`
- **Why it breaches:** "Why choose", "Global Recognition" and "proven benefit" are superiority/outcome framing rather than factual description; "reduce pain, speed recovery and minimise scarring" reads as an outcome promise without the "for suitable patients" qualifier used elsewhere.
- **Compliant alternative:**
  - Retitle the section factually, e.g. "How treatment is planned here" (the six factual tiles can stay).
  - "…techniques that may reduce pain and shorten recovery for suitable cases, when they can match open surgery's result."
  - "Conferences & Global Recognition" → "Conferences and continuing education" (the conference photos and captions are themselves compliant).
  - "Proven survival benefit…" → "Survival benefit reported in well-selected patients — suitability is decided at the tumour board."
- **SEO/AEO note:** Neutral headings keep the keywords; the hedged wording is the same register the rest of the site already uses successfully.
- **Client input needed:** None.
- **Effort:** S

---

**NMC-08 — Privacy policy inaccurately claims Google Maps is the only third-party embed**

- **Severity:** MEDIUM (accuracy of a statutory notice under DPDP)
- **Clause:** 7.6, DPDP Act 2023 — the notice must be accurate about data sharing/processors.
- **Location & quoted:** `src/app/privacy/page.tsx:46` — "The only third-party embed is a Google Maps frame on the contact section" — while `src/components/Videos.tsx:42-44` embeds `youtube.com/embed/*` iframes (and `img.youtube.com` thumbnails), which set Google/YouTube cookies on interaction.
- **Why it breaches:** The notice understates third-party data exposure; YouTube is a separate Google service the policy never mentions (nor does it name Web3Forms' role beyond "delivered by email" — that part is adequately described).
- **Compliant alternative:** Update the cookies/analytics section to: "This site does not use analytics cookies, advertising trackers or profiling tools. Third-party embeds are a Google Maps frame on the contact section and YouTube video players on the homepage, each covered by Google's privacy policy; the YouTube player loads only when a video is clicked." Optionally switch embeds to `youtube-nocookie.com`.
- **SEO/AEO note:** None; policy accuracy is the point.
- **Client input needed:** None.
- **Effort:** S

---

### LOW

---

**NMC-09 — Point-of-collection notice on the appointment form is minimal**

- **Severity:** LOW
- **Clause:** 7.6, DPDP — a notice of what/why/retention/grievance is expected at collection.
- **Location:** `src/components/Location.tsx:477-497` — consent checkbox "I agree to be contacted about my appointment request. See our Privacy Policy."
- **Why it's flagged:** Checkbox and link are correct; the linked policy covers all four notice elements, but nothing at the form itself summarises them.
- **Compliant alternative:** One line above the checkbox: "We use your name, phone and message only to arrange this consultation. They are not used for marketing and are deleted on request — see our Privacy Policy."
- **SEO/AEO note:** None.
- **Client input needed:** None.
- **Effort:** S

---

**NMC-10 — "Global Recognition" wording on the conferences section**

- **Severity:** LOW
- **Clause:** 8.1(ix) — implied international acclaim is an unverifiable superlative.
- **Location:** `src/components/Conferences.tsx:42` — "Conferences & Global Recognition".
- **Compliant alternative:** "Conferences and continuing education" (folded into NMC-07's fix; listed separately so the wording change isn't missed).
- **Effort:** S

---

**NMC-11 — Hospital branding on a personal-RMP site (JUDGEMENT)**

- **Severity:** LOW
- **Clause:** 8.3/9.1 boundary — the site presents itself as the doctor's but uses the Iswarya Hospital logo and name as the brand (`Header.tsx:63-71`, clinic schema `src/lib/schema.ts:97-121`).
- **Why it's flagged:** If this is the doctor's personal site, hospital branding blurs who is advertising; if it is the hospital's own micro-site for the doctor, institution rules (factual info only, no promotional portrayal of an individual doctor) apply and items like testimonials/numbers are even more clearly out.
- **Compliant alternative:** Low-risk option is to clarify the relationship in the footer/about — e.g. keep the clinic name but brand the site "Dr. Varadharajan V — Surgical Oncology, at Iswarya Hospital". Confirm with the client which entity the site represents.
- **Client input needed:** Whether the site is the doctor's property or the hospital's.
- **Effort:** S

---

## 6. Off-site checklist (C16) — linked profiles to review manually

The site links to: **Facebook** (facebook.com/dr.varadharajan), **LinkedIn** (dr-varadharajan-vijayakumar-9b205224), **Instagram** (@answers.to.cancer), **Google Business Profile** (share.google/BGRsV105dewQtEwIf) and **WhatsApp Business** (+91 94442 64315). YouTube content comes via third-party channels (Polimer News, Iswarya Hospital). Apply the same rules on each:

| Profile | What to check |
|---|---|
| Google Business Profile | Reviews are allowed to exist on the platform but must not be solicited ("rate us" posts), incentivised, or quoted onto the site; no offers/testimonials/before-after in posts or photos; profile name, address, phone match the site exactly; registration number in the description is good practice. |
| Instagram @answers.to.cancer | No testimonials/reposts of patient praise, no before/after or operative imagery, no offers or "book now" urgency captions, no superlatives ("best", "No.1"), add "AI-generated" to AI visuals; reg. number in bio is good practice. |
| Facebook page | Same checks: pinned offers, boosted posts, testimonial graphics and review-CTA posts must come down; health-talk posts in the doctor's own name are fine (8.2 iii). |
| LinkedIn | Academic posts, conference photos and publications are fine; remove endorsement-style reposts or "top surgeon" claims. |
| WhatsApp Business | No broadcast offers/camps framed as promotions; catalogue/away messages factual only. |
| Any paid ads (Google/Meta) | If any exist, the same prohibitions apply — check for superlatives, offers, testimonials, numbers. (None seen on-site.) |
| Practo/Justdial/third-party listings | If the practice is listed anywhere with ratings or "top doctor" badges, those are the platform's; the practice must not pay for ranking or embed such badges (9.4). |

---

## 7. What is already compliant (for the record)

- Registration disclosure (M1) — done properly and consistently, including schema.
- Medical disclaimers (M5) — per-article, per-service, dedicated page and footer.
- Educational blog (C9) — 60 articles are genuinely educational: hedged claims ("cannot guarantee", "outcomes vary"), cited sources, no sales CTAs inside article bodies.
- Cost FAQ (C8) — non-numeric, honest "estimate after consultation" pattern.
- Form consent mechanics (M2 partial) — unticked required checkbox + linked policy; Web3Forms named as processor.
- CTAs (C10) — factual, no pop-ups, countdowns, exit-intent or fear headlines.
- No review schema, no before/after or clinical patient images, no patient/surgery videos, no offers, no paid-ranking badges, no directory.
- Updates/announcements (C14) — factual CME and education posts.
- No analytics/ad pixels (C12) — only Maps/YouTube embeds.

## Self-check

- No finding concerns a feature the site does not have; every finding quotes real evidence (file:line and/or live HTML).
- No recommendation adds a new feature; the only additions are the must-have disclosures (M3 risks line, M4 AI label, M2-style form notice).
- Every alternative complies with 8.1(i)–(xii) and 6.2 — removals where the item cannot be made compliant, nature-changing rewording elsewhere.
- No code or content was changed; outputs written to `/nmc-audit/` only.
