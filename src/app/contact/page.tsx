import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { pageGraph } from '@/lib/schema';
import Breadcrumbs from '@/components/Breadcrumbs';
import Location from '@/components/Location';

export const metadata: Metadata = {
 title: { absolute: 'Contact | Dr. Varadharajan V, Iswarya Hospital Chennai' },
 description:
  'Contact Dr. Varadharajan V at Iswarya Hospital, 110 Rajiv Gandhi Salai (OMR), Tharamani, Chennai 600041. Phone, WhatsApp video consults, directions and hours.',
 alternates: { canonical: '/contact' },
};

const graph = pageGraph({
 path: '/contact',
 name: 'Contact',
 description:
  'Contact and location details for Dr. Varadharajan V at Iswarya Hospital, Tharamani, Chennai.',
 breadcrumbs: [{ name: 'Contact', path: '/contact' }],
});

export default function ContactPage() {
 return (
  <>
   <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
   />
   <section
    className="reveal w-full"
    style={{ padding: 'var(--section-padding-y) 0 var(--section-padding-y) 0' }}
   >
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
     <Breadcrumbs items={[{ name: 'Contact', path: '/contact' }]} />
     <h1
      className="text-3xl sm:text-4xl font-bold mb-4"
      style={{ color: 'var(--color-primary-dark)' }}
     >
      Contact and Directions
     </h1>
     <p
      className="text-lg leading-relaxed"
      style={{ color: 'var(--color-text-muted)' }}
     >
      Dr. Varadharajan V consults at {siteConfig.clinicName},{' '}
      {siteConfig.address}. Outpatient hours are {siteConfig.workingHours}.
      Call{' '}
      <a href={`tel:${siteConfig.phone}`} className="underline underline-offset-2" style={{ color: 'var(--color-primary)' }}>
       {siteConfig.displayPhone}
      </a>{' '}
      to book, or request a video consultation on WhatsApp.
     </p>
    </div>
   </section>
   <Location />
  </>
 );
}
