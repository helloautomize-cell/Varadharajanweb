# GA4 Analytics Tracking

Measurement ID: **G-C0LQSLHZE2** (default; override with `NEXT_PUBLIC_GA_ID`).
If the variable is set to an empty value no analytics code is rendered.

## Base tag

- Consent-gated: `src/components/Analytics.tsx` shows a cookie-consent banner
  (Accept / Decline, stored in localStorage under
  `drvaradharajan.analytics-consent`). Only after "Accept" does it mount
  `@next/third-parties/google` `<GoogleAnalytics />` and `ClickTracker`, so
  the tag loads on every route once consent exists and never before it. The
  component is mounted client-only via `AnalyticsLoader.tsx` in the root
  layout.
- Page views (including client-side navigation) are handled by GA4 Enhanced
  Measurement. Do **not** add manual `page_view` events or they double count.
- Enhanced Measurement also already covers outbound clicks, scrolls, file
  downloads and YouTube video starts — do not duplicate those.

## Architecture

- `src/lib/analytics.ts` — `trackEvent(name, params)`, `GA_EVENTS` constants,
  `GAEventParams` type. SSR-safe, never throws; queues onto `window.dataLayer`
  so clicks before gtag.js loads are still delivered.
- `src/components/analytics/ClickTracker.tsx` — client component mounted by
  `Analytics.tsx` once the visitor has accepted analytics cookies. One
  delegated `document` click listener.

How a click is resolved (first match wins, no double events):

1. Element (or ancestor) has `data-ga-event` → fire that event only, with
   `cta_text`, `cta_location`, `link_url`, `page_path`.
2. Otherwise, if the click is inside `a[href]`:
   - `tel:` → `phone_call_click`
   - `mailto:` → `email_click`
   - `wa.me` / `api.whatsapp.com` / `whatsapp:` → `whatsapp_click`
   - Google Maps domains → `get_directions_click`
   - facebook / instagram / youtube / linkedin / x / twitter → `social_click`
     (adds `social_platform`)

`cta_location` comes from the nearest ancestor `data-ga-cta-location`,
falling back to `"body"`. `page_path` is `window.location.pathname`.

## Events

| Event | Trigger | Parameters |
|---|---|---|
| `book_appointment_click` | Book/consult CTA click | `cta_text`, `cta_location`, `link_url`, `page_path` |
| `phone_call_click` | `tel:` link click | `cta_location`, `page_path` |
| `whatsapp_click` | WhatsApp link click | `cta_location`, `page_path` |
| `email_click` | `mailto:` link click | `cta_location`, `page_path` |
| `get_directions_click` | Google Maps link click | `cta_location`, `page_path` |
| `social_click` | Social profile link click | `social_platform`, `cta_location`, `page_path` |
| `cta_click` | Other meaningful CTAs | `cta_text`, `cta_location`, `link_url`, `page_path` |
| `generate_lead` | Confirmed successful lead-form submit | `form_name`, `form_location`, `page_path` |
| `form_submit_error` | Lead-form submit fails | `form_name`, `error_type` (`server`/`network`), `page_path` |
| `newsletter_signup` | Newsletter subscribe (none exists today) | `form_location`, `page_path` |

`generate_lead` fires only after the Web3Forms API returns `success: true` —
never on button click or validation failure.

## CTA inventory

| CTA | File / component | `cta_location` | Event |
|---|---|---|---|
| Book an appointment (desktop nav) | `Header.tsx` | `header` | `book_appointment_click` |
| Book an appointment (mobile drawer) | `Header.tsx` | `mobile_menu` | `book_appointment_click` |
| Email / phone (top bar) | `Header.tsx` | `header` | `email_click` / `phone_call_click` |
| Book Now / Call Now / WhatsApp | `MobileStickyBar.tsx` | `sticky_mobile` | `book_appointment_click` / `phone_call_click` / `whatsapp_click` |
| Book an appointment / Call Now | `Hero.tsx` | `hero` | `book_appointment_click` / `phone_call_click` |
| Call / Video Consult / In Person / Book | `DoctorProfile.tsx` | `doctor_profile` | `phone_call_click` / `whatsapp_click` / `book_appointment_click` |
| Book an appointment | `ConsultCTA.tsx` | `consult_cta` | `book_appointment_click` |
| Call Us (update cards) | `Updates.tsx` | `updates` | `phone_call_click` |
| Play video | `Videos.tsx` | `videos` | `cta_click` |
| Treatment cards | `TreatmentCard.tsx` | `treatment_card` (`related_treatments` on service pages) | `cta_click` |
| Phone, email, WhatsApp, Get Directions | `Location.tsx` contact card | `contact_info` | `phone_call_click` / `email_click` / `whatsapp_click` / `get_directions_click` |
| Travelling for treatment? | `Location.tsx`, `specialities/page.tsx`, `services/[slug]/page.tsx` | `contact_info` / `cta_block` / `related_treatments` | `cta_click` |
| Call / WhatsApp fallback + success buttons | `Location.tsx` form card | `form` | `phone_call_click` / `whatsapp_click` |
| Appointment request form | `Location.tsx` | `form` | `generate_lead` / `form_submit_error` |
| Book / Call / WhatsApp (service hero, desktop + mobile) | `services/[slug]/page.tsx` | `service_hero` | `book_appointment_click` / `whatsapp_click` |
| Book Appointment (doctor card) | `services/[slug]/page.tsx` | `doctor_card` | `book_appointment_click` |
| Call / Video Consult (page CTA) | `specialities/page.tsx` | `cta_block` | `phone_call_click` / `whatsapp_click` |
| Call / Video Consult (page CTA) | `about/page.tsx` | `cta_block` | `phone_call_click` / `whatsapp_click` |
| WhatsApp / Call / Directions / e-Visa | `patients-from-outside-chennai/page.tsx` | `cta_block` | `whatsapp_click` / `phone_call_click` / `get_directions_click` (e-Visa is an outbound click — Enhanced Measurement) |
| Phone number link | `contact/page.tsx` | `contact_intro` | `phone_call_click` |
| Book / clinic link ("Discuss this with a specialist") | `blog/[slug]/page.tsx` | `blog_next_steps` | `book_appointment_click` / `cta_click` |
| Meet Dr. Varadharajan / Book Appointment | `blog/AuthorBox.tsx` | `author_box` | `cta_click` / `book_appointment_click` |
| Email, phone, WhatsApp, Book, social links | `Footer.tsx` | `footer` | `email_click` / `phone_call_click` / `whatsapp_click` / `book_appointment_click` / `social_click` |
| Call (404 page) | `not-found.tsx` | `body` | `phone_call_click` |

Plain nav links (logo, menu items, breadcrumbs, blog/source citation links)
are intentionally untracked.

## Tracking a new CTA

Add attributes to the element — no other code needed:

```tsx
<Link
  href="/contact"
  data-ga-event="book_appointment_click"   // or "cta_click"
  data-ga-cta-text="Book an appointment"   // short label
  data-ga-cta-location="hero"              // optional; or set on an ancestor
>
```

Rules:

- An element with `data-ga-event` fires **only** that event — it will not also
  fire the automatic link-type event.
- For forms, call `trackEvent(GA_EVENTS.generateLead, { form_name, form_location,
  page_path })` only after a confirmed successful submission, and
  `GA_EVENTS.formSubmitError` on failure.
- **Never** send user-entered values (names, phones, emails, messages, medical
  details) as parameters. `form_name`/`cta_text` are fixed labels only.

## Privacy

- No PII or health information is sent to GA4. Event params are fixed labels
  (`cta_location`, `form_name`, …), never field values.
- A cookie-consent banner (`Analytics.tsx`) gates the whole tag: no
  gtag.js, no ClickTracker and no dataLayer events reach Google before the
  visitor accepts. The choice persists in localStorage; declining never
  loads analytics.
