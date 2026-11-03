'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ClickTracker from '@/components/analytics/ClickTracker';
import { CONSENT_KEY, GA_ID, type AnalyticsConsent } from '@/lib/analytics';

/**
 * GA4 with Consent Mode v2 advanced, mounted client-only via AnalyticsLoader.
 * The tag loads for every visitor with analytics_storage denied by default,
 * so before consent Google receives only cookieless pings (no cookies are
 * set, matching the banner wording). Accept grants analytics_storage;
 * an explicit Decline disables the tag entirely. Ad signals stay denied.
 */
type GtagWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void } & Record<string, unknown>;

function gtagStub(w: GtagWindow) {
 w.dataLayer = w.dataLayer || [];
 if (typeof w.gtag !== 'function') {
  w.gtag = function gtag() {
   // eslint-disable-next-line prefer-rest-params
   w.dataLayer!.push(arguments);
  };
 }
 return w.gtag!;
}

export default function Analytics() {
 const [consent, setConsent] = useState<AnalyticsConsent | null>(() => {
  if (typeof window === 'undefined') return null;
  const stored = window.localStorage.getItem(CONSENT_KEY);
  return stored === 'accepted' || stored === 'declined' ? stored : null;
 });

 // Load once: denied defaults (granted if already accepted), then the tag.
 useEffect(() => {
  if (!GA_ID) return;
  const w = window as unknown as GtagWindow;
  if (consent === 'declined') {
   w[`ga-disable-${GA_ID}`] = true;
   return;
  }
  w[`ga-disable-${GA_ID}`] = false;
  const gtag = gtagStub(w);
  if (!w.__gaBooted) {
   w.__gaBooted = true;
   gtag('consent', 'default', {
    analytics_storage: consent === 'accepted' ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
   });
   gtag('js', new Date());
   gtag('config', GA_ID);
   const s = document.createElement('script');
   s.async = true;
   s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
   document.head.appendChild(s);
  } else if (consent === 'accepted') {
   gtag('consent', 'update', { analytics_storage: 'granted' });
  }
 }, [consent]);

 if (!GA_ID) return null;
 if (consent) return <ClickTracker />;

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
