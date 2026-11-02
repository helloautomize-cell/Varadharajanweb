/**
 * GA4 wiring. The measurement ID comes from NEXT_PUBLIC_GA_ID; when it is
 * unset the site ships no analytics code at all.
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
export const CONSENT_KEY = 'drvaradharajan.analytics-consent';

export type AnalyticsConsent = 'accepted' | 'declined';

declare global {
 interface Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
 }
}

/** Fire a GA4 event; a no-op when analytics is not loaded (no consent or no ID). */
export function trackEvent(event: string, params?: Record<string, unknown>) {
 if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
  window.gtag('event', event, params);
 }
}
