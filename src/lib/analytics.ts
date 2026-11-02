/**
 * Central GA4 event tracking.
 *
 * Event names and parameter keys live here so no hardcoded strings are
 * scattered through components. `trackEvent` is SSR-safe, never throws, and
 * queues onto window.dataLayer so clicks that happen before gtag.js loads
 * are still delivered once it initialises.
 */

export const GA_EVENTS = {
 bookAppointmentClick: 'book_appointment_click',
 phoneCallClick: 'phone_call_click',
 whatsappClick: 'whatsapp_click',
 emailClick: 'email_click',
 getDirectionsClick: 'get_directions_click',
 socialClick: 'social_click',
 ctaClick: 'cta_click',
 generateLead: 'generate_lead',
 formSubmitError: 'form_submit_error',
 newsletterSignup: 'newsletter_signup',
} as const;

export type GAEventName = (typeof GA_EVENTS)[keyof typeof GA_EVENTS];

/** Data attributes read by components/analytics/ClickTracker. */
export const GA_ATTR = {
 event: 'data-ga-event',
 ctaText: 'data-ga-cta-text',
 ctaLocation: 'data-ga-cta-location',
} as const;

export interface GAEventParams {
 cta_text?: string;
 cta_location?: string;
 link_url?: string;
 page_path?: string;
 social_platform?: string;
 form_name?: string;
 form_location?: string;
 error_type?: string;
}

type DataLayerWindow = Window & {
 dataLayer?: unknown[];
 gtag?: (...args: unknown[]) => void;
};

export function trackEvent(name: GAEventName, params: GAEventParams = {}): void {
 if (typeof window === 'undefined') return;
 try {
  const w = window as DataLayerWindow;
  // Mirror the standard gtag snippet so pre-load events are queued in the
  // same format gtag.js expects when it drains dataLayer on init.
  w.dataLayer = w.dataLayer || [];
  if (typeof w.gtag !== 'function') {
   w.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
   };
  }
  w.gtag('event', name, params);
 } catch {
  // Analytics must never break the page.
 }
}

/**
 * GA4 measurement ID. The live property ID is the default; set
 * NEXT_PUBLIC_GA_ID to override (e.g. a staging property). When empty,
 * no analytics code or consent banner is rendered.
 */
export const GA_ID =
 process.env.NEXT_PUBLIC_GA_ID ?? 'G-C0LQSLHZE2';

/** localStorage key recording the visitor's analytics-cookie choice. */
export const CONSENT_KEY = 'drvaradharajan.analytics-consent';

export type AnalyticsConsent = 'accepted' | 'declined';
