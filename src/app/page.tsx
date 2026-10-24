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
import { siteConfig } from '@/config/site';
import { pageGraph, faqNode } from '@/lib/schema';
import StatsStrip from '@/components/StatsStrip';
import ReviewerLine from '@/components/ReviewerLine';

export const metadata: Metadata = {
 // absolute is required: the layout title.template only applies to nested
 // child segments, not to the page in the layout's own segment.
 title: { absolute: 'Surgical Oncologist in Chennai | Dr Varadharajan V' },
 description:
  'Surgical oncologist in Chennai for breast, GI, gynecologic, thoracic and peritoneal cancers. Robotic, laparoscopic and HIPEC surgery at Iswarya Hospital.',
 alternates: {
  canonical: '/',
 },
};

const graph = pageGraph({
 path: '/',
 name: siteConfig.doctorName,
 description:
  'Surgical oncologist in Chennai for breast, GI, gynaecological, thoracic and peritoneal cancers at Iswarya Hospital, Tharamani.',
 image: '/og/og-default.webp',
 aboutId: `${siteConfig.url}/#physician`,
 extra: [faqNode(siteConfig.url, faqs)],
});

export default function Home() {
 return (
  <div className="flex flex-col flex-1">
   <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
   />
   <Hero />
   <StatsStrip />
   <WhyChooseUs />
   <DoctorProfile />
   <Conferences />
   <Treatments />
   <Testimonials />
   <Updates />
   <Videos />
   <Gallery />
   <ReviewerLine />
   <FAQ />
   <Location />
   <ConsultCTA />
  </div>
 );
}
