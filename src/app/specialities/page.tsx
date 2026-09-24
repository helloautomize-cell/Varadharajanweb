import type { Metadata } from 'next';
import { allTreatments, treatmentCategories, categoryAnchor } from '@/config/site';
import TreatmentCard from '@/components/TreatmentCard';
import TreatmentPhotoBand from '@/components/TreatmentPhotoBand';

export const metadata: Metadata = {
  title: { absolute: 'Our Specialities - Dr. Varadharajan V | Chennai' },
  description: 'Explore the full range of surgical oncology specialities offered by Dr. Varadharajan V in Chennai.',
  alternates: {
    canonical: '/specialities',
  },
};

export default function SpecialitiesPage() {
  return (
    <section
      className="reveal w-full flex-1"
      style={{
        padding: 'var(--section-padding-y) 0',
        backgroundColor: 'var(--color-off-white)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          className="text-3xl sm:text-4xl font-bold text-center mb-12"
          style={{ color: 'var(--color-primary-dark)' }}
        >
          Our Specialities
        </h1>
      </div>

      <div className="mb-12">
        <TreatmentPhotoBand
          src="/images/hospital/hospital-exterior-banner.webp"
          caption="Iswarya Hospital, OMR, Chennai"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {treatmentCategories.map((category) => {
          const items = allTreatments.filter((t) => t.category === category.id);
          return (
            <div key={category.id} id={categoryAnchor(category.id)} className="mb-12 last:mb-0 scroll-mt-24">
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: 'var(--color-primary-dark)' }}
              >
                {category.label}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((treatment) => (
                  <TreatmentCard key={treatment.slug} treatment={treatment} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
