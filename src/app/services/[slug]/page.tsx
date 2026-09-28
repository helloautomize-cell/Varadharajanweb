import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import { allTreatments, siteConfig } from '@/config/site';
import { treatmentContent, treatmentExtras } from '@/data/treatment-content';
import { treatmentFaqs } from '@/data/treatment-faqs';
import { pageGraph, procedureNode, faqNode } from '@/lib/schema';
import FAQ from '@/components/FAQ';
import Location from '@/components/Location';
import Breadcrumbs from '@/components/Breadcrumbs';
import LinkedParagraph from '@/components/LinkedParagraph';
import ReviewerLine from '@/components/ReviewerLine';
import TreatmentCard from '@/components/TreatmentCard';

export const dynamicParams = false;

const treatmentPhotos: Record<string, string> = {
 'breast-cancer-surgeries': '/images/treatments/photos/v2/breast-cancer-surgeries.webp',
 'breast-oncoplasty': '/images/treatments/photos/v2/breast-oncoplasty.webp',
 'benign-breast-condition-surgery': '/images/treatments/photos/v2/benign-breast-condition-surgery.webp',
 'gi-oncology': '/images/treatments/photos/v2/gi-oncology.webp',
 'laparoscopic-robotic-gi-surgery': '/images/treatments/photos/v2/laparoscopic-robotic-gi-surgery.webp',
 'minimal-access-surgery': '/images/treatments/photos/v2/minimal-access-surgery.webp',
 'retroperitoneal-tumor-surgery': '/images/treatments/photos/v2/retroperitoneal-tumor-surgery.webp',
 hipec: '/images/treatments/photos/v2/hipec.webp',
 'thoracic-cancer': '/images/treatments/photos/v2/thoracic-cancer.webp',
 'vats-lobectomy': '/images/treatments/photos/v2/vats-lobectomy.webp',
 'head-and-neck-cancer': '/images/treatments/photos/v2/head-and-neck-cancer.webp',
 'complex-head-neck-resection': '/images/treatments/photos/v2/complex-head-neck-resection.webp',
 'gynaecological-malignancies': '/images/treatments/photos/v2/gynaecological-malignancies.webp',
 'surgical-oncology': '/images/treatments/photos/v2/surgical-oncology.webp',
};

export function generateStaticParams() {
 return allTreatments.map((treatment) => ({ slug: treatment.slug }));
}

export async function generateMetadata({
 params,
}: {
 params: Promise<{ slug: string }>;
}): Promise<Metadata> {
 const { slug } = await params;
 const treatment = allTreatments.find((t) => t.slug === slug);
 if (!treatment) return {};
 const extra = treatmentExtras[slug];
 const fullTitle = `${treatment.title} in Chennai | Dr Varadharajan V`;
 // keep titles under 60 chars; drop the city qualifier only when needed
 const title = fullTitle.length <= 60 ? fullTitle : `${treatment.title} | Dr Varadharajan V`;
 return {
  // absolute bypasses the layout title template so this exact format is kept
  title: { absolute: title },
  description: extra?.metaDescription ?? treatment.shortDescription,
  alternates: {
   canonical: `/services/${slug}`,
  },
 };
}

export default async function ServicePage({
 params,
}: {
 params: Promise<{ slug: string }>;
}) {
 const { slug } = await params;
 const treatment = allTreatments.find((t) => t.slug === slug);
 if (!treatment) notFound();

 const content = treatmentContent[slug];
 const extra = treatmentExtras[slug];
 const photo = treatmentPhotos[slug];

 const pageFaqs = treatmentFaqs[slug] ?? [];

 const graph = pageGraph({
  path: `/services/${slug}`,
  name: treatment.title,
  description: extra?.metaDescription ?? treatment.shortDescription,
  image: photo,
  breadcrumbs: [
   { name: 'Specialities', path: '/specialities' },
   { name: treatment.title, path: `/services/${slug}` },
  ],
  extra: [
   procedureNode(slug, treatment.title, treatment.shortDescription, extra?.bodyLocation),
   ...(pageFaqs.length > 0 ? [faqNode(pageFaqs)] : []),
  ],
 });

 const relatedTreatments = (extra?.related ?? [])
  .map((s) => allTreatments.find((t) => t.slug === s))
  .filter((t): t is NonNullable<typeof t> => Boolean(t));

 let sectionIndex = 0;
 const sectionBg = () =>
  sectionIndex++ % 2 === 0 ? '#ffffff' : 'var(--color-off-white)';

 return (
  <>
   <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
   />
   {/* Hero */}
   <section
    className="reveal w-full"
    style={{
     padding: 'var(--section-padding-y) 0',
     background: 'linear-gradient(135deg, var(--color-accent-tint) 0%, white 100%)',
    }}
   >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     <Breadcrumbs
      items={[
       { name: 'Specialities', path: '/specialities' },
       { name: treatment.title, path: `/services/${slug}` },
      ]}
     />
     <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">
      <div className="flex-1 text-center lg:text-left">
       <p
        className="text-sm font-medium mb-2 uppercase tracking-wide"
        style={{ color: 'var(--color-primary)' }}
       >
        {treatment.category}
       </p>
       <h1
        className="text-4xl sm:text-5xl font-bold leading-tight mb-4"
        style={{ color: 'var(--color-primary-dark)' }}
       >
        {treatment.title}
       </h1>
       <p
        className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto lg:mx-0"
        style={{ color: 'var(--color-text-muted)' }}
       >
        {treatment.tagline}
       </p>
       <Link
        href="#location"
        className="hidden lg:inline-block px-8 py-3 text-white font-medium"
        style={{
         backgroundColor: 'var(--color-primary)',
         borderRadius: 'var(--radius-button)',
        }}
       >
        Book an appointment
       </Link>
       <p className="hidden lg:block mt-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
        <a
         href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent('Hello Doctor, I would like to book a video consultation.')}`}
         target="_blank"
         rel="noopener noreferrer"
         className="inline-flex items-center gap-1 underline underline-offset-2"
         style={{ color: 'var(--color-primary)' }}
        >
         <MessageCircle size={14} />
         Video consultation available on WhatsApp
        </a>
       </p>
      </div>
      {photo && (
       <div className="w-full lg:w-[46%] flex-shrink-0">
        <div
         className="relative w-full overflow-hidden aspect-[4/3]"
         style={{
          borderRadius: '16px',
          boxShadow:
           '0 10px 30px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.04)',
         }}
        >
         <Image
          src={photo}
          alt={treatment.title}
          fill
          sizes="(max-width: 1024px) 100vw, 560px"
          className="object-cover"
         />
        </div>
       </div>
      )}
      {/* Mobile-only CTA, after the photo on <lg */}
      <div className="lg:hidden w-full text-center">
       <Link
        href="#location"
        className="inline-block px-8 py-3 text-white font-medium"
        style={{
         backgroundColor: 'var(--color-primary)',
         borderRadius: 'var(--radius-button)',
        }}
       >
        Book an appointment
       </Link>
       <p className="mt-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
        <a
         href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent('Hello Doctor, I would like to book a video consultation.')}`}
         target="_blank"
         rel="noopener noreferrer"
         className="inline-flex items-center gap-1 underline underline-offset-2"
         style={{ color: 'var(--color-primary)' }}
        >
         <MessageCircle size={14} />
         Video consultation available on WhatsApp
        </a>
       </p>
      </div>
     </div>
    </div>
   </section>

   {/* Key facts */}
   {extra?.keyFacts && extra.keyFacts.length > 0 && (
    <section
     className="reveal w-full"
     style={{ padding: 'var(--section-padding-y) 0', backgroundColor: '#ffffff' }}
    >
     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
       className="p-8 rounded-2xl"
       style={{
        backgroundColor: 'var(--color-accent-tint)',
        borderRadius: '16px',
        border: '1px solid rgba(46,111,142,0.2)',
       }}
      >
       <h2
        className="text-2xl font-bold mb-5"
        style={{ color: 'var(--color-primary-dark)' }}
       >
        {treatment.title}: Key Facts
       </h2>
       <ul className="space-y-3">
        {extra.keyFacts.map((fact, i) => (
         <li key={i} className="flex items-start gap-3">
          <CheckCircle2
           size={20}
           className="flex-shrink-0"
           style={{ color: 'var(--color-primary)', marginTop: '2px' }}
          />
          <span
           className="text-sm"
           style={{ color: 'var(--color-text-muted)', fontSize: '15px', lineHeight: '1.6' }}
          >
           {fact}
          </span>
         </li>
        ))}
       </ul>
      </div>
     </div>
    </section>
   )}

   {/* Intro Sections */}
   {[...(content?.introSections ?? []), ...(extra?.extraIntro ?? [])].map(
    (section, index) => (
     <section
      key={index}
      className="reveal w-full"
      style={{ padding: 'var(--section-padding-y) 0', backgroundColor: sectionBg() }}
     >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
       <h2
        className="text-2xl sm:text-3xl font-bold mb-6"
        style={{ color: 'var(--color-primary-dark)' }}
       >
        {section.heading}
       </h2>
       <LinkedParagraph
        text={section.body}
        currentSlug={slug}
        className="text-lg leading-relaxed"
        style={{ color: 'var(--color-text-muted)', lineHeight: '1.8' }}
       />
      </div>
     </section>
    )
   )}

   {/* Bullet Blocks */}
   {(() => {
    const blocks = [...(content?.bulletBlocks ?? []), ...(extra?.extraBullets ?? [])];
    if (blocks.length === 0) return null;
    return (
     <section
      className="reveal w-full"
      style={{ padding: 'var(--section-padding-y) 0', backgroundColor: sectionBg() }}
     >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blocks.map((block, index) => (
         <div
          key={index}
          className="p-8 rounded-2xl card-hover"
          style={{
           backgroundColor: '#ffffff',
           borderRadius: '16px',
           boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
          }}
         >
          <h3
           className="text-xl font-bold mb-1"
           style={{ color: 'var(--color-primary-dark)' }}
          >
           {block.heading}
          </h3>
          <p className="text-sm mb-5" style={{ color: 'var(--color-primary)' }}>
           {block.subheading}
          </p>
          <ul className="space-y-3">
           {block.items.map((item, itemIndex) => (
            <li key={itemIndex} className="flex items-start gap-3">
             <CheckCircle2
              size={20}
              className="flex-shrink-0"
              style={{ color: 'var(--color-primary)', marginTop: '2px' }}
             />
             <span
              className="text-sm"
              style={{
               color: 'var(--color-text-muted)',
               fontSize: '15px',
               lineHeight: '1.6',
              }}
             >
              {item}
             </span>
            </li>
           ))}
          </ul>
         </div>
        ))}
       </div>
      </div>
     </section>
    );
   })()}

   <ReviewerLine />

   {/* About the Doctor */}
   <section className="reveal w-full" style={{ padding: 'var(--section-padding-y) 0' }}>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
     <div
      className="p-8 rounded-2xl flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left"
      style={{
       backgroundColor: '#ffffff',
       borderRadius: '16px',
       boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
      }}
     >
      <div
       className="rounded-full overflow-hidden flex-shrink-0"
       style={{
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
       }}
      >
       <Image
        src="/images/doctor/bio-photo.webp"
        alt={siteConfig.doctorName}
        width={100}
        height={100}
        className="w-full h-full object-cover"
       />
      </div>
      <div className="flex-1">
       <p
        className="text-xl font-bold"
        style={{ color: 'var(--color-primary-dark)' }}
       >
        {siteConfig.doctorName}
       </p>
       <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
        {siteConfig.specialty} · {siteConfig.clinicName}
       </p>
      </div>
      <Link
       href="#location"
       className="px-6 py-3 text-white font-medium flex-shrink-0"
       style={{
        backgroundColor: 'var(--color-primary)',
        borderRadius: 'var(--radius-button)',
       }}
      >
       Book Appointment
      </Link>
     </div>
    </div>
   </section>

   {/* Page-specific FAQs */}
   {pageFaqs.length > 0 && <FAQ items={pageFaqs} id="service-faq" />}

   {/* Related treatments */}
   {relatedTreatments.length > 0 && (
    <section
     className="reveal w-full"
     style={{ padding: 'var(--section-padding-y) 0', backgroundColor: 'var(--color-off-white)' }}
    >
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2
       className="text-2xl font-bold mb-6"
       style={{ color: 'var(--color-primary-dark)' }}
      >
       Related Treatments
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       {relatedTreatments.map((t) => (
        <TreatmentCard key={t.slug} treatment={t} />
       ))}
      </div>
      <p className="mt-6 text-sm" style={{ color: 'var(--color-text-muted)' }}>
       <Link
        href="/patients-from-outside-chennai"
        className="underline underline-offset-2"
        style={{ color: 'var(--color-primary)' }}
       >
        Travelling for treatment?
       </Link>{' '}
       See guidance for patients coming from outside Chennai.
      </p>
     </div>
    </section>
   )}

   {/* Medical disclaimer */}
   <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
    <p
     className="text-xs"
     style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}
    >
     This page is general education about {treatment.title.toLowerCase()} and is not
     personal medical advice. Diagnosis, stage and fitness decide the right treatment
     for each person. Please consult Dr. Varadharajan V or your own oncologist for advice
     on your situation. In an emergency, go to the nearest hospital.
    </p>
   </div>

   {/* Location & Contact */}
   <Location />
  </>
 );
}
