'use client';

import { useEffect } from 'react';
import { GA_ATTR, GA_EVENTS, trackEvent, type GAEventName } from '@/lib/analytics';

const SOCIAL_PLATFORMS: Record<string, string> = {
 'facebook.com': 'facebook',
 'fb.com': 'facebook',
 'instagram.com': 'instagram',
 'youtube.com': 'youtube',
 'youtu.be': 'youtube',
 'linkedin.com': 'linkedin',
 'twitter.com': 'twitter',
 'x.com': 'twitter',
};

function socialPlatform(hostname: string): string | null {
 const host = hostname.replace(/^www\./, '').toLowerCase();
 for (const [domain, platform] of Object.entries(SOCIAL_PLATFORMS)) {
  if (host === domain || host.endsWith(`.${domain}`)) return platform;
 }
 return null;
}

function ctaLocation(el: Element): string {
 return (
  el.closest(`[${GA_ATTR.ctaLocation}]`)?.getAttribute(GA_ATTR.ctaLocation) ||
  'body'
 );
}

function linkUrl(el: Element): string | undefined {
 const anchor = el.closest('a[href]');
 return anchor?.getAttribute('href') ?? undefined;
}

/**
 * Single delegated click listener mounted once in the root layout.
 *
 * Priority: an element carrying data-ga-event fires ONLY that explicit event;
 * otherwise the click falls through to link-type detection so nothing double
 * counts. No page_view logic here — GA4 Enhanced Measurement covers history
 * changes, outbound clicks, scrolls, downloads and video.
 */
export default function ClickTracker() {
 useEffect(() => {
  const onClick = (e: MouseEvent) => {
   const target = e.target;
   if (!(target instanceof Element)) return;

   const explicit = target.closest(`[${GA_ATTR.event}]`);
   if (explicit) {
    const name = explicit.getAttribute(GA_ATTR.event) as GAEventName | null;
    if (!name) return;
    trackEvent(name, {
     cta_text:
      explicit.getAttribute(GA_ATTR.ctaText) ||
      explicit.textContent?.trim().slice(0, 60) ||
      undefined,
     cta_location: ctaLocation(explicit),
     link_url: linkUrl(explicit),
     page_path: window.location.pathname,
    });
    return;
   }

   const anchor = target.closest('a[href]');
   if (!anchor) return;
   const href = anchor.getAttribute('href') || '';
   const base = {
    cta_location: ctaLocation(anchor),
    page_path: window.location.pathname,
   };

   if (href.startsWith('tel:')) {
    trackEvent(GA_EVENTS.phoneCallClick, base);
    return;
   }
   if (href.startsWith('mailto:')) {
    trackEvent(GA_EVENTS.emailClick, base);
    return;
   }
   if (
    href.startsWith('whatsapp:') ||
    href.includes('wa.me') ||
    href.includes('api.whatsapp.com')
   ) {
    trackEvent(GA_EVENTS.whatsappClick, base);
    return;
   }
   if (
    /google\.[^/]+\/maps|maps\.google\.|goo\.gl\/maps|maps\.app\.goo\.gl/.test(href)
   ) {
    trackEvent(GA_EVENTS.getDirectionsClick, base);
    return;
   }
   try {
    const platform = socialPlatform(new URL(href, window.location.origin).hostname);
    if (platform) {
     trackEvent(GA_EVENTS.socialClick, { ...base, social_platform: platform });
    }
   } catch {
    // malformed href — nothing to track
   }
  };

  document.addEventListener('click', onClick);
  return () => document.removeEventListener('click', onClick);
 }, []);

 return null;
}
