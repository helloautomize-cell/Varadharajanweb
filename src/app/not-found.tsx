import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
 title: { absolute: 'Page Not Found | Dr Varadharajan V' },
 robots: { index: false, follow: false },
};

export default function NotFound() {
 return (
  <section
   className="flex-1 flex items-center justify-center w-full"
   style={{ padding: 'var(--section-padding-y) 0' }}
  >
   <div className="max-w-xl mx-auto px-4 text-center">
    <h1
     className="text-4xl font-bold mb-4"
     style={{ color: 'var(--color-primary-dark)' }}
    >
     Page not found
    </h1>
    <p className="mb-8" style={{ color: 'var(--color-text-muted)' }}>
     The page you are looking for does not exist or may have moved.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
     <Link
      href="/"
      className="px-8 py-3 text-white font-medium"
      style={{
       backgroundColor: 'var(--color-primary)',
       borderRadius: 'var(--radius-button)',
      }}
     >
      Back to home
     </Link>
     <a
      href={`tel:${siteConfig.phone}`}
      className="px-8 py-3 font-medium border-2"
      style={{
       borderColor: 'var(--color-primary)',
       color: 'var(--color-primary)',
       borderRadius: 'var(--radius-button)',
      }}
     >
      Call {siteConfig.displayPhone}
     </a>
    </div>
   </div>
  </section>
 );
}
