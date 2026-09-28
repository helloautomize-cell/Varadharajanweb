import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { pageGraph } from '@/lib/schema';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Phone, MessageCircle, Plane, Train } from 'lucide-react';

export const metadata: Metadata = {
  title: { absolute: 'Patients from Outside Chennai | Dr Varadharajan V' },
  description:
    'Guidance for patients travelling to Iswarya Hospital, Chennai for cancer surgery: WhatsApp video consults, what to bring, travel and stay information.',
  alternates: { canonical: '/patients-from-outside-chennai' },
};

const graph = pageGraph({
  path: '/patients-from-outside-chennai',
  name: 'Patients from Outside Chennai',
  description:
    'Guidance for patients travelling to Iswarya Hospital, Tharamani, Chennai for surgical oncology care.',
  breadcrumbs: [{ name: 'Patients from Outside Chennai', path: '/patients-from-outside-chennai' }],
});

const waLink = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
  'Hello Doctor, I would like to book a video consultation.'
)}`;

const sections: { heading: string; body: string[] }[] = [
  {
    heading: 'Start with a WhatsApp consultation',
    body: [
      'You do not need to travel to Chennai for a first opinion. Send your reports, such as biopsy results, scan reports and discharge summaries, to us on WhatsApp, and a video consultation with Dr. Varadharajan V can be arranged on WhatsApp itself.',
      'This first step helps decide whether travelling for surgery is the right plan and what to prepare before the visit.',
    ],
  },
  {
    heading: 'What to bring',
    body: [
      'Biopsy or pathology reports, and the slides or blocks if your doctor asks for a review',
      'Scans such as CT, MRI or PET-CT, on CD or as shareable links',
      'Previous discharge summaries and operation notes, if any',
      'A list of medicines you currently take',
      'Reports in any language are acceptable; consultations are in English, Tamil, Hindi, Telugu and Kannada.',
    ],
  },
  {
    heading: 'Reaching Iswarya Hospital, Tharamani',
    body: [
      'The hospital is at 110, Rajiv Gandhi Salai (OMR), Tharamani, Chennai 600041, on the IT corridor.',
      'Chennai International Airport (MAA) is approx. 15 km away by road.',
      'Chennai Egmore and Chennai Central railway stations are approx. 15 to 18 km away by road.',
      'App-based cabs, prepaid airport taxis and autos are the simplest ways to reach the hospital from either arrival point.',
    ],
  },
  {
    heading: 'Where to stay',
    body: [
      'The Tharamani and OMR area has hotels and serviced apartments across a range of budgets, and the hospital team can point you toward options nearby. Patients coming for longer treatments often choose serviced apartments so attenders can cook.',
    ],
  },
  {
    heading: 'International patients',
    body: [
      'Patients travelling to India for treatment generally need an e-Medical Visa, and accompanying attendants an e-Medical Attendant Visa. Depending on the visa and length of stay, FRRO registration may be required after arrival.',
      'Apply through the official portal at indianvisaonline.gov.in, and carry printed copies of your visa and medical documents.',
    ],
  },
  {
    heading: 'Planning your visit',
    body: [
      `OPD consultations run ${siteConfig.workingHours}. Sharing reports on WhatsApp before you travel helps us plan your visit so tests and consultations are not repeated unnecessarily.`,
      `If anything is urgent, call ${siteConfig.displayPhone} rather than waiting for a reply.`,
    ],
  },
];

export default function PatientsTravelPage() {
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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[{ name: 'Patients from Outside Chennai', path: '/patients-from-outside-chennai' }]}
          />
          <h1
            className="text-3xl sm:text-4xl font-bold mb-6"
            style={{ color: 'var(--color-primary-dark)' }}
          >
            Coming to Chennai for Treatment
          </h1>
          <p
            className="text-lg leading-relaxed mb-10"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Patients visit Dr. Varadharajan V at Iswarya Hospital, Tharamani from across Tamil
            Nadu, neighbouring states and overseas. This page explains how to get a first
            opinion without travelling, what to bring, and how to plan the trip.
          </p>

          {sections.map((s) => (
            <div key={s.heading} className="mb-10">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: 'var(--color-primary-dark)' }}
              >
                {s.heading}
              </h2>
              {s.body.map((p, i) => (
                <p
                  key={i}
                  className="leading-relaxed mb-3"
                  style={{ color: 'var(--color-text-muted)', lineHeight: '1.8' }}
                >
                  {p}
                </p>
              ))}
            </div>
          ))}

          <div
            className="p-8 rounded-2xl text-center"
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
              Send your reports first
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 font-medium text-white"
                style={{ backgroundColor: '#25D366', borderRadius: 'var(--radius-button)' }}
              >
                <MessageCircle size={18} />
                WhatsApp Video Consult
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 font-medium text-white"
                style={{ backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-button)' }}
              >
                <Phone size={18} />
                Call {siteConfig.displayPhone}
              </a>
            </div>
            <p className="text-sm mt-4" style={{ color: 'var(--color-text-muted)' }}>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${siteConfig.mapLat},${siteConfig.mapLng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 underline underline-offset-2"
                style={{ color: 'var(--color-primary)' }}
              >
                <Plane size={14} />
                Get directions to Iswarya Hospital
              </a>
              {' · '}
              <a
                href="https://indianvisaonline.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 underline underline-offset-2"
                style={{ color: 'var(--color-primary)' }}
              >
                <Train size={14} />
                Official India e-Visa portal
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
