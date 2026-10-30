import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { pageGraph } from '@/lib/schema';
import Breadcrumbs from '@/components/Breadcrumbs';
import ReviewerLine from '@/components/ReviewerLine';
import { Phone, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
 title: { absolute: 'About Dr. Varadharajan V | Surgical Oncologist, Chennai' },
 description:
  'Dr. Varadharajan V, M.Ch Surgical Oncology, is a surgical oncologist at Iswarya Hospital, Tharamani, Chennai. Tamil Nadu Medical Council Reg. No. 90663.',
 alternates: { canonical: '/about' },
};

const graph = pageGraph({
 path: '/about',
 name: `About ${siteConfig.doctorName}`,
 description:
  'Profile of Dr. Varadharajan V, surgical oncologist at Iswarya Hospital, Tharamani, Chennai.',
 image: '/images/doctor/bio-photo.webp',
 breadcrumbs: [{ name: 'About', path: '/about' }],
 aboutId: `${siteConfig.url}/#physician`,
});

const facts: { label: string; value: string }[] = [
 { label: 'Speciality', value: 'Surgical Oncology' },
 { label: 'Qualifications', value: siteConfig.qualifications },
 { label: 'Registration', value: siteConfig.registrationDisplay },
 { label: 'Practises at', value: `${siteConfig.clinicName}, Tharamani, Chennai` },
 { label: 'Languages', value: siteConfig.languages.map((l) => l.name).join(', ') },
 {
  label: 'Memberships',
  value: siteConfig.memberships.map((m) => `${m.abbr} (${m.name})`).join(', '),
 },
 {
  label: 'Experience',
  value: siteConfig.stats.map((s) => `${s.value} ${s.label}`).join(', '),
 },
];

export default function AboutPage() {
 return (
  <>
   <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
   />
   <section
    className="reveal w-full flex-1"
    style={{ padding: 'var(--section-padding-y) 0', backgroundColor: 'var(--color-off-white)' }}
   >
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
     <Breadcrumbs items={[{ name: 'About', path: '/about' }]} />
     <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-10">
      <div
       className="rounded-3xl overflow-hidden flex-shrink-0"
       style={{ width: '220px', height: '220px', boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
      >
       <Image
        src="/images/doctor/bio-photo.webp"
        alt={`${siteConfig.doctorName}, Surgical Oncologist, Chennai`}
        width={220}
        height={220}
        className="w-full h-full object-cover"
        sizes="(min-width: 252px) 220px, calc(100vw - 32px)"
        preload
       />
      </div>
      <div>
       <h1
        className="text-3xl sm:text-4xl font-bold mb-3"
        style={{ color: 'var(--color-primary-dark)' }}
       >
        About {siteConfig.doctorName}
       </h1>
       <p className="text-lg mb-2" style={{ color: 'var(--color-text-muted)' }}>
        {siteConfig.credentials}
       </p>
       <p style={{ color: 'var(--color-text-muted)' }}>
        {siteConfig.clinicName}, Tharamani, Chennai ·{' '}
        {siteConfig.registrationDisplay}
       </p>
      </div>
     </div>

     <p className="text-lg leading-relaxed mb-4" style={{ color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
      {siteConfig.bioLongForm}
     </p>
     <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
      {siteConfig.visionLongForm}
     </p>

     <div
      className="p-8 rounded-2xl mb-10"
      style={{ backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
     >
      <h2 className="text-2xl font-bold mb-5" style={{ color: 'var(--color-primary-dark)' }}>
       Credentials at a glance
      </h2>
      <dl className="space-y-4">
       {facts.map((f) => (
        <div key={f.label}>
         <dt className="text-sm font-semibold mb-1" style={{ color: 'var(--color-primary-dark)' }}>
          {f.label}
         </dt>
         <dd className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          {f.value}
         </dd>
        </div>
       ))}
      </dl>
     </div>

     <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-primary-dark)' }}>
      Treatments offered
     </h2>
     <p className="mb-4" style={{ color: 'var(--color-text-muted)' }}>
      Dr. Varadharajan V performs surgical treatment across breast,
      gastrointestinal, gynaecological, thoracic, head and neck, and peritoneal
      surface cancers. The full list of procedures is on the{' '}
      <Link href="/specialities" className="underline underline-offset-2" style={{ color: 'var(--color-primary)' }}>
       specialities page
      </Link>
      .
     </p>

     <ReviewerLine />

     <div
      className="p-8 rounded-2xl text-center"
      style={{ backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
      data-ga-cta-location="cta_block"
     >
      <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-primary-dark)' }}>
       Book a consultation
      </h2>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
       <a
        href={`tel:${siteConfig.phone}`}
        className="inline-flex items-center justify-center gap-2 px-8 py-3 text-white font-medium"
        style={{ backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-button)' }}
       >
        <Phone size={18} />
        Call {siteConfig.displayPhone}
       </a>
       <a
        href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent('Hello Doctor, I would like to book a video consultation.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-8 py-3 font-medium text-white"
        style={{ backgroundColor: '#25D366', borderRadius: 'var(--radius-button)' }}
       >
        <MessageCircle size={18} />
        Video Consult on WhatsApp
       </a>
      </div>
     </div>
    </div>
   </section>
  </>
 );
}
