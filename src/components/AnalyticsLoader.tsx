'use client';

import dynamic from 'next/dynamic';

/**
 * Client-only mount for the consent banner / GA4 loader so the stored
 * consent choice can be read on first render without hydration mismatch.
 */
const Analytics = dynamic(() => import('@/components/Analytics'), { ssr: false });

export default Analytics;
