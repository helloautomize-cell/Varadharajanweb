import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { pageGraph } from '@/lib/schema';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
 title: { absolute: 'Editorial Policy | Dr. Varadharajan V, Chennai' },
 description:
  'How the medical content on this website is written, reviewed and updated, and who is responsible for it.',
 alternates: { canonical: '/editorial-policy' },
};

const graph = pageGraph({
 path: '/editorial-policy',
 name: 'Editorial Policy',
 description:
  'Editorial policy for the medical content on the website of Dr. Varadharajan V, Surgical Oncologist, Chennai.',
 breadcrumbs: [{ name: 'Editorial Policy', path: '/editorial-policy' }],
});

const sections: { heading: string; body: string[] }[] = [
 {
  heading: 'Who writes and reviews this content',
  body: [
   `Content on this site is prepared under the direction of ${siteConfig.doctorName}, Surgical Oncologist at ${siteConfig.clinicName}, Chennai (${siteConfig.registrationDisplay}). Every medical page is reviewed by him before it is treated as current.`,
   `Each page that covers a treatment or condition shows a "medically reviewed by" line with the date of the most recent review.`,
  ],
 },
 {
  heading: 'What the content is for',
  body: [
   'The pages on this site explain surgical oncology procedures and conditions for patients and families. They are written in plain language so that someone without a medical background can follow them.',
   'Content is educational. It is not personal medical advice and does not replace a consultation.',
  ],
 },
 {
  heading: 'Sources',
  body: [
   'Pages that describe treatments or conditions link to authoritative sources such as the National Cancer Institute (cancer.gov) and the World Health Organization for further reading. No medical claim is added without a basis in established clinical practice.',
   'Statistics about surgical volumes refer to Dr. Varadharajan V\'s own recorded experience at the institutions where he has worked.',
  ],
 },
 {
  heading: 'What is not allowed on this site',
  body: [
   'No guaranteed outcomes, cure claims, or "best doctor" claims. No paid or sponsored medical claims. No invented patient testimonials.',
   'Advertising and sponsorship, if ever present, would be clearly labelled.',
  ],
 },
 {
  heading: 'Corrections',
  body: [
   `If you spot an error on any page, write to ${siteConfig.email} or call ${siteConfig.displayPhone} and it will be reviewed and corrected.`,
  ],
 },
];

export default function EditorialPolicyPage() {
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
     <Breadcrumbs items={[{ name: 'Editorial Policy', path: '/editorial-policy' }]} />
     <h1
      className="text-3xl sm:text-4xl font-bold mb-3"
      style={{ color: 'var(--color-primary-dark)' }}
     >
      Editorial Policy
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
