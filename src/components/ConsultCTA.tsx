import Image from 'next/image';
import Link from 'next/link';

export default function ConsultCTA() {
  return (
    <section
      className="reveal w-full"
      style={{
        backgroundColor: 'var(--color-primary-dark)',
        color: '#ffffff',
        padding: 'var(--section-padding-y) 0',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Photo */}
          <div className="flex-shrink-0">
            <div
              className="rounded-full overflow-hidden"
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              <Image
                src="/images/doctor/consult-photo.webp"
                alt="Dr. Varadharajan V"
                width={120}
                height={120}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text and Button */}
          <div className="flex-1 text-center md:text-left">
            <h2
              className="text-2xl sm:text-3xl font-bold mb-3"
              style={{ color: '#ffffff' }}
            >
              Ready to Take the Next Step?
            </h2>
            <p
              className="text-base mb-6"
              style={{ color: 'rgba(255,255,255,0.8)' }}
            >
              Book a consultation with Dr. Varadharajan V and get expert guidance on your treatment options.
            </p>
            <Link
              href="#location"
              className="inline-block px-8 py-3 font-medium"
              style={{
                backgroundColor: '#ffffff',
                color: 'var(--color-primary-dark)',
                borderRadius: 'var(--radius-button)',
              }}
            >
              Book an appointment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}