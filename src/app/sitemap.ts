import type { MetadataRoute } from 'next';
import { allTreatments, siteConfig } from '@/config/site';
import { posts, POSTS_DATE_REVIEWED } from '@/lib/blog';

// TODO(dr-review): domain cutover date from old iCareHeal site
const SITE_URL = siteConfig.url;
const LAST_MODIFIED = new Date(siteConfig.lastReviewed);

export default function sitemap(): MetadataRoute.Sitemap {
 return [
  {
   url: `${SITE_URL}/`,
   lastModified: LAST_MODIFIED,
   changeFrequency: 'monthly',
   priority: 1,
  },
  {
   url: `${SITE_URL}/specialities`,
   lastModified: LAST_MODIFIED,
   changeFrequency: 'monthly',
   priority: 0.8,
  },
  {
   url: `${SITE_URL}/patients-from-outside-chennai`,
   lastModified: LAST_MODIFIED,
   changeFrequency: 'monthly',
   priority: 0.7,
  },
  ...allTreatments.map((treatment) => ({
   url: `${SITE_URL}/services/${treatment.slug}`,
   lastModified: LAST_MODIFIED,
   changeFrequency: 'monthly' as const,
   priority: 0.9,
  })),
  {
   url: `${SITE_URL}/blog`,
   lastModified: new Date(POSTS_DATE_REVIEWED),
   changeFrequency: 'weekly' as const,
   priority: 0.8,
  },
  ...posts.map((post) => ({
   url: `${SITE_URL}/blog/${post.slug}`,
   lastModified: new Date(POSTS_DATE_REVIEWED),
   changeFrequency: 'monthly' as const,
   priority: post.type === 'pillar' ? 0.8 : 0.7,
  })),
  {
   url: `${SITE_URL}/privacy`,
   lastModified: LAST_MODIFIED,
   changeFrequency: 'yearly',
   priority: 0.5,
  },
  {
   url: `${SITE_URL}/terms`,
   lastModified: LAST_MODIFIED,
   changeFrequency: 'yearly',
   priority: 0.5,
  },
 ];
}
