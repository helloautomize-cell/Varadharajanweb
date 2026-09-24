import type { MetadataRoute } from 'next';

// PLACEHOLDER DOMAIN: must match metadataBase in layout.tsx — confirm the real
// final domain before deploy.
const SITE_URL = 'https://drvaradharajan.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
