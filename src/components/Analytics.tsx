'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GoogleAnalytics } from '@next/third-parties/google';
import ClickTracker from '@/components/analytics/ClickTracker';
import { CONSENT_KEY, GA_ID, type AnalyticsConsent } from '@/lib/analytics';

/**
 * Consent-gated GA4 loader, mounted client-only via AnalyticsLoader.
 * Renders nothing when GA_ID is unset. The GA4 tag and click tracking mount
 * only after the visitor accepts analytics cookies; the choice is kept in
 * localStorage, so nothing is captured before consent.
 */
export default function Analytics() {
 const [consent, setConsent] = useState<AnalyticsConsent | null>(() => {
  if (typeof window === 'undefined') return null;
  const stored = window.localStorage.getItem(CONSENT_KEY);
  return stored === 'accepted' || stored === 'declined' ? stored : null;
 });

 if (!GA_ID) return null;
 if (consent === 'accepted') {
  return (
   <>
    <GoogleAnalytics gaId={GA_ID} />
    <ClickTracker />
   </>
  );
 }
 if (consent) return null;

 const choose = (value: AnalyticsConsent) => {
  window.localStorage.setItem(CONSENT_KEY, value);
  setConsent(value);
 };

 return (
  <div
   role="dialog"
   aria-label="Cookie consent"
   className="fixed bottom-0 inset-x-0 z-[60] px-4 pb-4"
  >
   <div
    className="max-w-3xl mx-auto p-4 flex flex-col sm:flex-row items-center gap-4"
    style={{
     backgroundColor: '#ffffff',
     borderRadius: '16px',
     boxShadow: '0 8px 30px rgba(0,0,0,0.18)',
     border: '1px solid rgba(0,0,0,0.1)',
    }}
   >
    <p className="text-sm flex-1" style={{ color: 'var(--color-text-muted)' }}>
     We use analytics cookies only if you accept, to understand which pages
     are useful. Declining changes nothing about how the site works. See our{' '}
     <Link href="/privacy" className="underline" style={{ color: 'var(--color-primary)' }}>
      Privacy Policy
     </Link>
     .
    </p>
    <div className="flex gap-3 flex-shrink-0">
     <button
      type="button"
      onClick={() => choose('declined')}
      className="px-5 py-2 text-sm font-medium border-2"
      style={{
       borderColor: 'var(--color-primary)',
       color: 'var(--color-primary)',
       borderRadius: 'var(--radius-button)',
      }}
     >
      Decline
     </button>
     <button
      type="button"
      onClick={() => choose('accepted')}
      className="px-5 py-2 text-sm font-medium text-white"
      style={{
       backgroundColor: 'var(--color-primary)',
       borderRadius: 'var(--radius-button)',
      }}
     >
      Accept
     </button>
    </div>
   </div>
  </div>
 );
}
