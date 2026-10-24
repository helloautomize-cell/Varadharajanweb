import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { PenLine } from 'lucide-react';

const published = new Date(siteConfig.firstPublished).toLocaleDateString('en-IN', {
 month: 'long',
 year: 'numeric',
});
const reviewed = new Date(siteConfig.lastReviewed).toLocaleDateString('en-IN', {
 month: 'long',
 year: 'numeric',
});

export default function Byline() {
 return (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 mb-2">
   <p
    className="flex items-center gap-2 text-sm"
    style={{ color: 'var(--color-text-muted)' }}
   >
    <PenLine size={16} style={{ color: 'var(--color-primary)' }} />
    <span>
     Written and medically reviewed by{' '}
     <Link
      href="/about"
      className="font-medium underline underline-offset-2"
      style={{ color: 'var(--color-primary)' }}
     >
      {siteConfig.doctorName}
     </Link>
     , Surgical Oncologist · Published {published} · Last reviewed {reviewed}
    </span>
   </p>
  </div>
 );
}
