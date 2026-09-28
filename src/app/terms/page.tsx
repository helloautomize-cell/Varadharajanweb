import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { pageGraph } from '@/lib/schema';

export const metadata: Metadata = {
 title: { absolute: 'Terms of Use | Dr. Varadharajan V, Chennai' },
 description:
  'Terms of use for this website: informational content, appointment requests, WhatsApp video consultations, and medical emergency guidance.',
 alternates: { canonical: '/terms' },
};

const graph = pageGraph({
 path: '/terms',
 name: 'Terms of Use',
 description:
  'Terms of use for the website of Dr. Varadharajan V, Surgical Oncologist at Iswarya Hospital, Chennai.',
 breadcrumbs: [{ name: 'Terms of Use', path: '/terms' }],
});

const sections: { heading: string; body: string[] }[] = [
 {
  heading: 'Informational purpose',
  body: [
   'This website provides general educational information about surgical oncology services offered by Dr. Varadharajan V at Iswarya Hospital, Tharamani, Chennai. It is not a substitute for a personal medical consultation, diagnosis, or treatment plan.',
  ],
 },
 {
  heading: 'No doctor-patient relationship through the site',
  body: [
   'Browsing this website or submitting an appointment request does not create a doctor-patient relationship. That relationship begins only once a consultation takes place, in person or by video.',
  ],
 },
 {
  heading: 'Appointment requests',
  body: [
   'Submitting the appointment form sends a request, not a confirmed booking. Our team contacts you to confirm a time. Please do not share detailed medical records through the website form.',
  ],
 },
 {
  heading: 'Video consultations on WhatsApp',
  body: [
   'Video consultations are offered on WhatsApp only. They are intended for advice, report review, and follow-up, and do not replace an in-person examination where one is clinically needed.',
  ],
 },
 {
  heading: 'Emergencies',
  body: [
   'This website, the form, email, and WhatsApp are not monitored for emergencies. If you have a medical emergency, go to the nearest hospital or call local emergency services immediately.',
  ],
 },
 {
  heading: 'Accuracy of content',
  body: [
   'Medical content on this website is reviewed by Dr. Varadharajan V. While we aim for accuracy, medical knowledge evolves and individual cases differ, so personal advice always takes precedence over general information here.',
  ],
 },
 {
  heading: 'Intellectual property',
  body: [
   'All text, images, and design on this website belong to Dr. Varadharajan V unless credited otherwise. Content may not be reproduced without permission.',
  ],
 },
 {
  heading: 'External links',
  body: [
   'Links to external sites such as Google Maps and WhatsApp are provided for convenience. Their content and policies are governed by those services.',
  ],
 },
 {
  heading: 'Contact',
  body: [
   `Questions about these terms can be sent to ${siteConfig.email} or by calling ${siteConfig.displayPhone}.`,
  ],
 },
];

export default function TermsPage() {
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
     <h1
      className="text-3xl sm:text-4xl font-bold mb-3"
      style={{ color: 'var(--color-primary-dark)' }}
     >
      Terms of Use
     </h1>
     <p className="text-sm mb-10" style={{ color: 'var(--color-text-muted)' }}>
      Last updated: September 2026
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
