import type { MetadataRoute } from 'next';
import { allTreatments } from '@/config/site';

// PLACEHOLDER DOMAIN: must match metadataBase in layout.tsx — confirm the real
// final domain before deploy.
const SITE_URL = 'https://drvaradharajan.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/specialities`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...allTreatments.map((treatment) => ({
      url: `${SITE_URL}/services/${treatment.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
