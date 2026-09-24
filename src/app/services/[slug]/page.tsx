import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { CheckCircle2 } from 'lucide-react';
import { allTreatments, siteConfig } from '@/config/site';
import { treatmentContent } from '@/data/treatment-content';
import { treatmentFaqs } from '@/data/treatment-faqs';
import FAQ from '@/components/FAQ';
import Location from '@/components/Location';

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
  const title = `${treatment.title} - Dr. Varadharajan V | Chennai`;
  return {
    // absolute bypasses the layout title template so this exact format is kept
    title: { absolute: title },
    description: treatment.shortDescription,
    alternates: {
      canonical: `/services/${slug}`,
    },
    openGraph: {
      title,
      description: treatment.shortDescription,
      // PLACEHOLDER: bio-photo is used as the OG image fallback for all service
      // pages because no treatment-specific images exist yet — swap per
      // treatment once real images are available.
      images: ['/images/doctor/bio-photo.webp'],
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
  const photo = treatmentPhotos[slug];

  const pageFaqs = treatmentFaqs[slug] ?? [];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pageFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const procedureSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: treatment.title,
    description: treatment.shortDescription,
    author: {
      '@type': 'Physician',
      name: siteConfig.doctorName,
      description: siteConfig.credentials,
    },
    reviewedBy: {
      '@type': 'Physician',
      name: siteConfig.doctorName,
      description: siteConfig.credentials,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(procedureSchema) }}
      />
      {pageFaqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {/* Hero */}
      <section
        className="reveal w-full"
        style={{
          padding: 'var(--section-padding-y) 0',
          background: 'linear-gradient(135deg, var(--color-accent-tint) 0%, white 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            {/* Mobile-only CTA — after the photo on <lg */}
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
            </div>
          </div>
        </div>
      </section>

      {/* Intro Sections - alternating backgrounds */}
      {content?.introSections.map((section, index) => (
        <section
          key={index}
          className="reveal w-full"
          style={{
            padding: 'var(--section-padding-y) 0',
            backgroundColor: index % 2 === 0 ? '#ffffff' : 'var(--color-off-white)',
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-2xl sm:text-3xl font-bold mb-6"
              style={{ color: 'var(--color-primary-dark)' }}
            >
              {section.heading}
            </h2>
            <p
              className="text-lg leading-relaxed"
              style={{ color: 'var(--color-text-muted)', lineHeight: '1.8' }}
            >
              {section.body}
            </p>
          </div>
        </section>
      ))}

      {/* Bullet Blocks */}
      {content && content.bulletBlocks.length > 0 && (
        <section
          className="reveal w-full"
          style={{
            padding: 'var(--section-padding-y) 0',
            backgroundColor: content.introSections.length % 2 === 0 ? '#ffffff' : 'var(--color-off-white)',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.bulletBlocks.map((block, index) => (
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
                  <p
                    className="text-sm mb-5"
                    style={{ color: 'var(--color-primary)' }}
                  >
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
                          style={{ color: 'var(--color-text-muted)', fontSize: '15px', lineHeight: '1.6' }}
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
      )}

      {/* About the Doctor */}
      <section
        className="reveal w-full"
        style={{ padding: 'var(--section-padding-y) 0' }}
      >
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
              <h3
                className="text-xl font-bold"
                style={{ color: 'var(--color-primary-dark)' }}
              >
                {siteConfig.doctorName}
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {siteConfig.specialty}
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

      {/* Location & Contact */}
      <Location />
    </>
  );
}
