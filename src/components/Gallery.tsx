import MobileCarousel from '@/components/MobileCarousel';

const galleryImages = [
  { src: '/images/gallery/gallery-01.jpg', alt: 'Iswarya Hospital reception area' },
  { src: '/images/gallery/gallery-02.jpg', alt: 'CT scanner at Iswarya Hospital' },
  { src: '/images/gallery/gallery-03.jpg', alt: 'Dr. Varadharajan at cancer centre event' },
  { src: '/images/gallery/gallery-04.jpg', alt: 'Patient room at Iswarya Hospital' },
  { src: '/images/gallery/gallery-05.jpg', alt: 'Private patient suite at Iswarya Hospital' },
  { src: '/images/gallery/gallery-06.jpg', alt: 'Iswarya Hospital front desk' },
  { src: '/images/gallery/gallery-07.jpg', alt: 'Operating theatre at Iswarya Hospital' },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="reveal w-full"
      style={{
        padding: 'var(--section-padding-y) 0',
        backgroundColor: 'var(--color-off-white)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-3xl sm:text-4xl font-bold text-center mb-12"
          style={{ color: 'var(--color-primary-dark)' }}
        >
          Media Gallery
        </h2>

        <MobileCarousel desktopClassName="sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="rounded-2xl overflow-hidden"
              style={{
                aspectRatio: '4/3',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                borderRadius: '16px',
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </MobileCarousel>
      </div>
    </section>
  );
}