import { siteConfig } from '@/config/site';
import { ShieldCheck } from 'lucide-react';

export default function ReviewerLine() {
 const lastReviewed = new Date(siteConfig.lastReviewed).toLocaleDateString('en-IN', {
  month: 'long',
  year: 'numeric',
 });
 return (
  <div
   className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 mb-8"
   aria-label="Medical review information"
  >
   <div
    className="flex items-start gap-3 p-4 rounded-xl text-sm"
    style={{
     backgroundColor: 'var(--color-accent-tint)',
     border: '1px solid rgba(46,111,142,0.25)',
     color: 'var(--color-text-muted)',
     borderRadius: '12px',
    }}
   >
    <ShieldCheck
     size={18}
     className="flex-shrink-0 mt-0.5"
     style={{ color: 'var(--color-primary)' }}
    />
    <p>
     {siteConfig.reviewerLine} {lastReviewed}
    </p>
   </div>
  </div>
 );
}
