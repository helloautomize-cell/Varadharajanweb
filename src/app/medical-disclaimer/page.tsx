import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { pageGraph } from '@/lib/schema';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
 title: { absolute: 'Medical Disclaimer | Dr. Varadharajan V, Chennai' },
 description:
  'Medical disclaimer for this website: educational information only, not a substitute for a personal consultation or emergency care.',
 alternates: { canonical: '/medical-disclaimer' },
};

const graph = pageGraph({
 path: '/medical-disclaimer',
 name: 'Medical Disclaimer',
 description:
  'Medical disclaimer for the website of Dr. Varadharajan V, Surgical Oncologist at Iswarya Hospital, Chennai.',
 breadcrumbs: [{ name: 'Medical Disclaimer', path: '/medical-disclaimer' }],
});

const sections: { heading: string; body: string[] }[] = [
 {
  heading: 'Educational information only',
  body: [
   'The content on this website explains surgical oncology procedures and conditions in general terms. It is written for patient education and is not personal medical advice, a diagnosis, or a treatment plan.',
   'Every cancer is different. What is described on these pages may not apply to your situation, and the right decision for you can only be made after your reports, scans and medical history are reviewed in a consultation.',
  ],
 },
 {
  heading: 'No substitute for consultation',
  body: [
   `Reading this site does not create a doctor-patient relationship with ${siteConfig.doctorName}. Do not start, stop or change any treatment based on what you read here without discussing it with your own doctor.`,
   'If you are unsure about a symptom or a report, please consult a qualified oncologist rather than relying on general information.',
  ],
 },
 {
  heading: 'Emergencies',
  body: [
   'This website, its contact form, email and WhatsApp are not monitored for emergencies. If you have a medical emergency, go to the nearest hospital or call local emergency services immediately.',
  ],
 },
 {
  heading: 'Accuracy',
  body: [
   `Medical content on this site is reviewed by ${siteConfig.doctorName} (Tamil Nadu Medical Council Reg. No. 90663). Medical knowledge changes over time, so information here may be updated or corrected. Where a page lists sources, they are provided for further reading.`,
  ],
 },
];

export default function MedicalDisclaimerPage() {
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
     <Breadcrumbs items={[{ name: 'Medical Disclaimer', path: '/medical-disclaimer' }]} />
     <h1
      className="text-3xl sm:text-4xl font-bold mb-3"
      style={{ color: 'var(--color-primary-dark)' }}
     >
      Medical Disclaimer
     </h1>
     <p className="text-sm mb-10" style={{ color: 'var(--color-text-muted)' }}>
      Last updated: October 2026
     </p>
     {sections.map((s) => (
      <div key={s.heading} className="mb-8">
       <h2
        className="text-xl font-bold mb-3"
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
    </div>
   </section>
  </>
 );
}
