import { siteConfig } from '@/config/site';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
 return (
  <section
   id="home"
   className="relative w-full"
   style={{
    padding: 'var(--section-padding-y) 0',
    background: 'linear-gradient(135deg, var(--color-accent-tint) 0%, white 100%)',
   }}
   data-ga-cta-location="hero"
  >
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 lg:items-center">
     {/* Text column, display:contents on mobile so its children become
       grid items and can be reordered around the photo */}
     <div className="contents lg:block lg:space-y-6">
      <div className="space-y-6 order-1">
       <h1
        className="hero-stagger text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
        style={{ color: 'var(--color-primary-dark)' }}
       >
        {siteConfig.heroHeadline}
       </h1>
       <p
        className="hero-stagger hero-stagger-2 text-lg sm:text-xl"
        style={{ color: 'var(--color-text-muted)' }}
       >
        {siteConfig.heroSubheading}
       </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 pt-4 lg:pt-0 order-3">
       <Link
        href="#location"
        className="px-8 py-3 text-white font-medium"
        style={{
         backgroundColor: 'var(--color-primary)',
         borderRadius: 'var(--radius-button)',
        }}
        data-ga-event="book_appointment_click"
        data-ga-cta-text="Book an appointment"
       >
        Book an appointment
       </Link>
       <a
        href={`tel:${siteConfig.phone}`}
        className="px-8 py-3 font-medium text-center border-2"
        style={{
         borderColor: 'var(--color-primary)',
         color: 'var(--color-primary)',
         borderRadius: 'var(--radius-button)',
        }}
       >
        Call Now
       </a>
      </div>
     </div>

     {/* Right Column - Doctor Photo */}
     <div className="relative flex justify-center lg:justify-end order-2 lg:order-none">
      <div className="relative w-full max-w-[400px] aspect-square hero-stagger hero-stagger-3">
       {/* Blurred background circle */}
       <div
        className="absolute rounded-full blur-3xl opacity-50"
        style={{
         width: '500px',
         height: '500px',
         backgroundColor: 'var(--color-accent-tint)',
         top: '-50px',
         left: '-50px',
        }}
       />

       {/* Doctor Portrait Image */}
       <div
        className="relative rounded-3xl overflow-hidden h-full"
        style={{
         boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
         borderRadius: '24px',
        }}
       >
        <Image
         src="/images/doctor/hero-photo.webp"
         alt="Dr. Varadharajan V, Surgical Oncologist at Iswarya Hospital, Chennai"
         width={400}
         height={400}
         className="w-full h-full object-cover"
         sizes="(min-width: 432px) 400px, calc(100vw - 32px)"
         preload
        />
       </div>

       {/* Floating Stat Card, inset on mobile so it can't slide under
         the sticky bottom bar; floats off the corner on desktop */}
       <div
        className="absolute bottom-3 left-3 sm:bottom-0 sm:left-0 sm:-translate-x-[10%] sm:translate-y-[10%] bg-white p-4"
        style={{
         boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
         border: '1px solid rgba(0, 0, 0, 0.1)',
         borderRadius: 'var(--radius-button)',
        }}
       >
        <div className="text-center">
         <div
          className="text-2xl font-bold"
          style={{ color: 'var(--color-primary)' }}
         >
          {siteConfig.stats[0].value}
         </div>
         <div
          className="text-sm"
          style={{ color: 'var(--color-text-muted)' }}
         >
          {siteConfig.stats[0].label}
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </section>
 );
}