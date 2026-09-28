import Image from 'next/image';
import MobileCarousel from '@/components/MobileCarousel';

const conferences = [
 {
  src: '/images/conferences/conference-esso-antwerp-2024.webp',
  alt: 'Dr. Varadharajan V at the ESSO 43rd Congress in Antwerp',
  caption: '43rd Congress of the European Society of Surgical Oncology, Antwerp, Belgium (2024)',
 },
 {
  src: '/images/conferences/conference-iaso-hubballi-2024.webp',
  alt: 'Dr. Varadharajan V at the IASO Midterm Conference in Hubballi',
  caption: 'Indian Association of Surgical Oncology, Midterm Conference, Hubballi (2024)',
 },
 {
  src: '/images/conferences/conference-absicon-madurai-2026.webp',
  alt: 'Dr. Varadharajan V at the ABSICON 14th Annual Conference in Madurai',
  caption: '14th Annual Conference, Association of Breast Surgeons of India, Madurai (2026)',
 },
 {
  src: '/images/conferences/jj-institute-training.webp',
  alt: 'Dr. Varadharajan V at a J&J Institute surgical training session',
  caption: 'Surgical training, J&J Institute',
 },
];

export default function Conferences() {
 return (
  <section
   id="conferences"
   className="reveal w-full"
   style={{
    padding: 'var(--section-padding-y) 0',
    backgroundColor: 'var(--color-off-white)',
   }}
  >
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2
     className="text-3xl sm:text-4xl font-bold text-center mb-4"
     style={{ color: 'var(--color-primary-dark)' }}
    >
     Conferences &amp; Global Recognition
    </h2>
    <p
     className="text-center text-lg mb-12 max-w-2xl mx-auto"
     style={{ color: 'var(--color-text-muted)' }}
    >
     Regular participation in national and international surgical oncology
     conferences and training programmes.
    </p>

    <MobileCarousel desktopClassName="sm:grid-cols-2 sm:gap-6">
     {conferences.map((item) => (
      <div
       key={item.src}
       className="overflow-hidden"
       style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
       }}
      >
       <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
        <Image
         src={item.src}
         alt={item.alt}
         fill
         sizes="(max-width: 640px) 100vw, 50vw"
         className="object-cover"
        />
       </div>
       <p
        className="px-5 py-4 text-sm"
        style={{ color: 'var(--color-text-muted)' }}
       >
        {item.caption}
       </p>
      </div>
     ))}
    </MobileCarousel>
   </div>
  </section>
 );
}
