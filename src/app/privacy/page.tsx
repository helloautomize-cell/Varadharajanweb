import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { pageGraph } from '@/lib/schema';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
 title: { absolute: 'Privacy Policy | Dr. Varadharajan V, Chennai' },
 description:
  'How this website collects, uses and protects your personal information, including appointment form details and WhatsApp communication.',
 alternates: { canonical: '/privacy' },
};

const graph = pageGraph({
 path: '/privacy',
 name: 'Privacy Policy',
 description:
  'Privacy policy for the website of Dr. Varadharajan V, Surgical Oncologist at Iswarya Hospital, Chennai.',
 breadcrumbs: [{ name: 'Privacy Policy', path: '/privacy' }],
});

const sections: { heading: string; body: string[] }[] = [
 {
  heading: 'What we collect',
  body: [
   'When you submit the appointment form on this website, we collect your name, phone number, email address (if you choose to share it), preferred consultation type, and the message you write. If you contact us by phone or WhatsApp directly, we receive the number and details you share in that conversation.',
   'This website does not collect health records through the form. Please do not attach or send medical reports through the website form; reports can be shared on WhatsApp when requested.',
  ],
 },
 {
  heading: 'Why we collect it',
  body: [
   'Your details are used for one purpose: to contact you about your appointment or consultation request. We may call you or reply on WhatsApp to confirm timing, answer questions, or share directions.',
   'Your information is not used for marketing lists, is not sold, and is not shared with third parties other than as described below.',
  ],
 },
 {
  heading: 'How the form is delivered',
  body: [
   'Form submissions are delivered to us by email through Web3Forms, a form-relay service that processes the submission only to send it to our inbox. Web3Forms acts as a processor for this delivery step.',
   'Video consultations and messaging take place on WhatsApp, which operates under WhatsApp\'s own privacy policy and encryption terms.',
  ],
 },
 {
  heading: 'Cookies and analytics',
  body: [
   'This site does not use advertising trackers or profiling tools. Third-party embeds are a Google Maps frame on the contact section and YouTube video players on the homepage, each covered by Google\'s privacy policy; the YouTube player loads only when a video is clicked.',
   'Analytics cookies (Google Analytics) are used only with your consent. If you decline in the cookie notice, no analytics runs; if you accept, anonymised usage statistics help us understand which pages are useful.',
  ],
 },
 {
  heading: 'Retention and your rights',
  body: [
   'Appointment enquiries are kept only as long as needed to respond and coordinate your visit. You may ask us to delete your details at any time by writing to us from the same email address or phone number.',
   `To request deletion or ask any privacy question, email ${siteConfig.email} or call ${siteConfig.displayPhone}.`,
  ],
 },
 {
  heading: 'Governing law',
  body: [
   'This policy is governed by the laws of India, including the Digital Personal Data Protection Act, 2023.',
  ],
 },
];

export default function PrivacyPage() {
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
     <Breadcrumbs items={[{ name: 'Privacy Policy', path: '/privacy' }]} />
     <h1
      className="text-3xl sm:text-4xl font-bold mb-3"
      style={{ color: 'var(--color-primary-dark)' }}
     >
      Privacy Policy
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
