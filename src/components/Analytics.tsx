'use client';

import { useEffect, useState } from 'react';
import ClickTracker from '@/components/analytics/ClickTracker';
import { CONSENT_KEY, GA_ID, type AnalyticsConsent } from '@/lib/analytics';

/**
 * GA4 for every visitor (analytics_storage granted, ad signals denied).
 * No cookie banner. A visitor who previously chose Decline stays excluded.
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
 const [consent] = useState<AnalyticsConsent | null>(() => {
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
    analytics_storage: 'granted',
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
 return <ClickTracker />;
}
