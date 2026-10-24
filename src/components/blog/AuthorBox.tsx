import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';

/**
 * Doctor author box for article pages. Bio is sourced from the site config,
 * excluding any sentence that uses disallowed editorial wording.
 */
export default function AuthorBox() {
 const bio = siteConfig.bioLongForm
  .split(/(?<=[.!?])\s+/)
  .filter((s) => !/\bjourney\b/i.test(s))
  .slice(0, 4)
  .join(' ');

 return (
  <section
   className="reveal w-full"
   style={{ padding: 'var(--section-padding-y) 0' }}
   aria-label="About the author"
  >
   <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div
     className="p-8 rounded-2xl"
     style={{
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
     }}
    >
     <h2
      className="text-2xl font-bold mb-6"
      style={{ color: 'var(--color-primary-dark)' }}
     >
      About the Author
     </h2>
     <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
      <div
       className="rounded-full overflow-hidden flex-shrink-0"
       style={{ width: '110px', height: '110px', borderRadius: '50%' }}
      >
       <Image
        src="/images/doctor/bio-photo.webp"
        alt={`${siteConfig.doctorName}, ${siteConfig.specialty}`}
        width={110}
        height={110}
        className="w-full h-full object-cover"
       />
      </div>
      <div className="flex-1">
       <p
        className="text-xl font-bold"
        style={{ color: 'var(--color-primary-dark)' }}
       >
        {siteConfig.doctorName}
       </p>
       <p className="text-sm mb-1" style={{ color: 'var(--color-primary)' }}>
        {siteConfig.credentials}
       </p>
       <p className="text-sm mb-1" style={{ color: 'var(--color-text-muted)' }}>
        {siteConfig.qualifications}
       </p>
       <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
        {siteConfig.clinicName}, Chennai
       </p>
       <p
        className="text-sm mb-5"
        style={{ color: 'var(--color-text-muted)', lineHeight: '1.7' }}
       >
        {bio}
       </p>
       <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
        <Link
         href="/#meet_doctor"
         className="px-6 py-2.5 font-medium text-sm border"
         style={{
          color: 'var(--color-primary)',
          borderColor: 'var(--color-primary)',
          borderRadius: 'var(--radius-button)',
         }}
        >
         Meet Dr. Varadharajan
        </Link>
        <Link
         href="/#location"
         className="px-6 py-2.5 text-white font-medium text-sm"
         style={{
          backgroundColor: 'var(--color-primary)',
          borderRadius: 'var(--radius-button)',
         }}
        >
         Book Appointment
        </Link>
       </div>
      </div>
     </div>
    </div>
   </div>
  </section>
 );
}
