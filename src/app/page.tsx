import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import WhyChooseUs from '@/components/WhyChooseUs';
import DoctorProfile from '@/components/DoctorProfile';
import Conferences from '@/components/Conferences';
import Treatments from '@/components/Treatments';
import Testimonials from '@/components/Testimonials';
import Updates from '@/components/Updates';
import Videos from '@/components/Videos';
import Gallery from '@/components/Gallery';
import FAQ from '@/components/FAQ';
import Location from '@/components/Location';
import ConsultCTA from '@/components/ConsultCTA';
import { faqs } from '@/data/faqs';

export const metadata: Metadata = {
  // absolute is required: the layout title.template only applies to nested
  // child segments, not to the page in the layout's own segment.
  title: { absolute: 'Surgical Oncologist in Chennai | Dr Varadharajan V' },
  description:
    'Expert surgical oncologist in Chennai specializing in breast, GI, gynecologic, thoracic and peritoneal cancers with advanced robotic and minimally invasive care.',
  alternates: {
    canonical: '/',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <WhyChooseUs />
      <DoctorProfile />
      <Conferences />
      <Treatments />
      <Testimonials />
      <Updates />
      <Videos />
      <Gallery />
      <FAQ />
      <Location />
      <ConsultCTA />
    </div>
  );
}
