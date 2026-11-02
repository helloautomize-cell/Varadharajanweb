import type { Metadata } from 'next';
import Link from 'next/link';
import { allTreatments, treatmentCategories, categoryAnchor, siteConfig } from '@/config/site';
import TreatmentCard from '@/components/TreatmentCard';
import TreatmentPhotoBand from '@/components/TreatmentPhotoBand';
import Breadcrumbs from '@/components/Breadcrumbs';
import ReviewerLine from '@/components/ReviewerLine';
import FAQ from '@/components/FAQ';
import { pageGraph, faqNode } from '@/lib/schema';
import { Phone, MessageCircle } from 'lucide-react';

const specialitiesFaqs = [
 {
  question: 'Which speciality should I consult for my diagnosis?',
  answer: 'Match the speciality to the organ involved: breast surgery for breast tumours, GI oncology for stomach or bowel cancers, and so on. If you are unsure, share your reports by phone or WhatsApp and we will point you to the right consultation.',
 },
 {
  question: 'Are all these surgeries done by one surgeon?',
  answer: 'Yes. Dr. Varadharajan V is a surgical oncologist covering breast, GI, gynaecological, thoracic, head and neck, and peritoneal cancers, so patients are not passed between multiple surgeons as the diagnosis becomes clearer.',
 },
 {
  question: 'Do you offer laparoscopic or robotic surgery for all specialities?',
  answer: 'Keyhole techniques are used wherever they can achieve the same complete removal as open surgery. Suitability depends on the tumour, its position and stage, and is decided case by case after reviewing your scans.',
 },
 {
  question: 'How do I book a consultation for a speciality?',
  answer: 'Call +91 94442 64315 or message on WhatsApp to request an appointment. Consultations run Monday to Saturday, 9 AM to 5 PM at Iswarya Hospital, Tharamani, Chennai.',
 },
];

export const metadata: Metadata = {
  title: { absolute: 'Cancer Surgery Specialities in Chennai | Dr Varadharajan V' },
  description:
    'All surgical oncology specialities at Iswarya Hospital, Chennai: breast, GI, gynaecological, thoracic, head and neck, HIPEC and minimal access surgery.',
  alternates: {
    canonical: '/specialities',
  },
};

const graph = pageGraph({
  path: '/specialities',
  name: 'Our Specialities',
  description:
    'Surgical oncology specialities at Iswarya Hospital, Chennai: breast, GI, gynaecological, thoracic, head and neck, HIPEC and minimal access surgery.',
  breadcrumbs: [{ name: 'Specialities', path: '/specialities' }],
  extra: [faqNode(`${siteConfig.url}/specialities`, specialitiesFaqs)],
});

export default function SpecialitiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      <section
        className="reveal w-full flex-1"
        style={{
          padding: 'var(--section-padding-y) 0',
          backgroundColor: 'var(--color-off-white)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: 'Specialities', path: '/specialities' }]} />
          <h1
            className="text-3xl sm:text-4xl font-bold mb-6"
            style={{ color: 'var(--color-primary-dark)' }}
          >
            Our Specialities
          </h1>
          <p
            className="text-lg leading-relaxed mb-4 max-w-4xl"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Dr. Varadharajan V is a surgical oncologist at Iswarya Hospital, Tharamani,
            Chennai, treating cancers of the breast, gastrointestinal tract, gynaecological
            system, chest, head and neck, and peritoneal surface. Surgery is planned case by
            case, using open, laparoscopic or robotic techniques, with every major decision
            reviewed by a multidisciplinary tumour board. Each speciality below links to a
            page describing what the treatment involves, who it may suit, and what recovery
            generally looks like.
          </p>
          <p
            className="text-lg leading-relaxed mb-4 max-w-4xl"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Senior oncology roles at Sri Ramachandra Institute of Higher Education
            and Gleneagles Global Health City. For patients unsure of the
            next step, an in-person consultation or a first opinion by video consultation on
            WhatsApp is available, and patients travelling from other cities can find practical
            guidance on this site.
          </p>
          <p className="text-sm mb-12" style={{ color: 'var(--color-text-muted)' }}>
            Consults in {siteConfig.languages.map((l) => l.name).join(', ')}.{' '}
            <Link
              href="/patients-from-outside-chennai"
              className="underline underline-offset-2"
              style={{ color: 'var(--color-primary)' }}
            >
              Travelling for treatment?
            </Link>
          </p>
        </div>

        <div className="mb-12">
          <TreatmentPhotoBand
            src="/images/hospital/hospital-exterior-banner.webp"
            caption="Iswarya Hospital, OMR, Chennai"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {treatmentCategories.map((category) => {
            const items = allTreatments.filter((t) => t.category === category.id);
            return (
              <div key={category.id} id={categoryAnchor(category.id)} className="mb-12 last:mb-0 scroll-mt-24">
                <h2
                  className="text-2xl font-bold mb-6"
                  style={{ color: 'var(--color-primary-dark)' }}
                >
                  {category.label}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((treatment) => (
                    <TreatmentCard key={treatment.slug} treatment={treatment} />
                  ))}
                </div>
              </div>
            );
          })}

          {/* Planning your visit */}
          <div className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div
              className="p-8 rounded-2xl"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              }}
            >
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: 'var(--color-primary-dark)' }}
              >
                How care is planned
              </h2>
              <p className="leading-relaxed mb-3" style={{ color: 'var(--color-text-muted)' }}>
                Every case is reviewed with a multidisciplinary team, so surgical
                decisions are coordinated with medical and radiation oncology where
                they are needed. Where a minimally invasive or robotic approach is
                appropriate, it is discussed openly alongside the open surgical
                option, with the choice guided by the stage of disease, prior
                treatment and overall health.
              </p>
              <p className="leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                Consultations are in{' '}
                {siteConfig.languages.map((l) => l.name).join(', ')}, so patients
                and families can discuss their diagnosis in the language they are
                most comfortable with.
              </p>
            </div>
            <div
              className="p-8 rounded-2xl"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              }}
            >
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: 'var(--color-primary-dark)' }}
              >
                Planning your visit
              </h2>
              <ul
                className="list-disc pl-5 space-y-2 leading-relaxed"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <li>Outpatient consultations run {siteConfig.workingHours}.</li>
                <li>
                  Book by phone on {siteConfig.displayPhone}, or message on WhatsApp
                  to request an appointment.
                </li>
                <li>
                  A video consultation on WhatsApp can be arranged if you are
                  travelling from outside Chennai.
                </li>
                <li>
                  Bring previous biopsy reports, scans and discharge summaries so
                  the consultation is productive.
                </li>
              </ul>
            </div>
          </div>

          <ReviewerLine />

          <FAQ items={specialitiesFaqs} id="specialities-faq" />

          {/* CTA */}
          <div
            className="p-8 rounded-2xl text-center"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            }}
          >
            <h2
              className="text-2xl font-bold mb-3"
              style={{ color: 'var(--color-primary-dark)' }}
            >
              Not sure which speciality fits your diagnosis?
            </h2>
            <p className="mb-6" style={{ color: 'var(--color-text-muted)' }}>
              Share your reports on WhatsApp or by phone and we will guide you to the
              right consultation. Bring your biopsy report, scans and any previous
              discharge summaries so the first visit is as productive as possible.
              Second opinions on a planned surgery are welcome too.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 text-white font-medium"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  borderRadius: 'var(--radius-button)',
                }}
              >
                <Phone size={18} />
                Call {siteConfig.displayPhone}
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent('Hello Doctor, I would like to book a video consultation.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 font-medium text-white"
                style={{
                  backgroundColor: '#25D366',
                  borderRadius: 'var(--radius-button)',
                }}
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
