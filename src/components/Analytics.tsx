'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CONSENT_KEY, GA_ID, trackEvent, type AnalyticsConsent } from '@/lib/analytics';

function loadGa() {
 if (document.getElementById('ga4-script')) return;
 const script = document.createElement('script');
 script.id = 'ga4-script';
 script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
 script.async = true;
 document.head.appendChild(script);
 window.dataLayer = window.dataLayer || [];
 window.gtag = (...args: unknown[]) => {
  window.dataLayer?.push(args);
 };
 window.gtag('js', new Date());
 window.gtag('config', GA_ID, { anonymize_ip: true });
}

function onDocumentClick(e: MouseEvent) {
 const anchor = (e.target as Element | null)?.closest?.('a[href]');
 if (!anchor) return;
 const href = anchor.getAttribute('href') ?? '';
 if (href.startsWith('tel:')) {
  trackEvent('call_click', { link_url: href });
 } else if (href.includes('wa.me') || href.includes('whatsapp')) {
  trackEvent('whatsapp_click', { link_url: href });
 } else if (href.includes('#location') || href.endsWith('/contact')) {
  trackEvent('booking_click', { link_url: href });
 }
}

/**
 * Consent-gated GA4 loader, mounted client-only via AnalyticsLoader.
 * Renders nothing when NEXT_PUBLIC_GA_ID is unset. Analytics cookies load
 * only after the visitor accepts; the choice is kept in localStorage.
 */
export default function Analytics() {
 const [consent, setConsent] = useState<AnalyticsConsent | null>(() => {
  const stored = window.localStorage.getItem(CONSENT_KEY);
  return stored === 'accepted' || stored === 'declined' ? stored : null;
 });

 useEffect(() => {
  if (consent !== 'accepted') return;
  loadGa();
  document.addEventListener('click', onDocumentClick);
  return () => document.removeEventListener('click', onDocumentClick);
 }, [consent]);

 if (!GA_ID || consent) return null;

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
