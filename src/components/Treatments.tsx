import { allTreatments, treatmentCategories, categoryAnchor } from '@/config/site';
import TreatmentCard from './TreatmentCard';

export default function Treatments() {
 return (
  <section
   id="specialities"
   className="reveal w-full"
   style={{ padding: 'var(--section-padding-y) 0' }}
  >
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2
     className="text-3xl sm:text-4xl font-bold text-center mb-12"
     style={{ color: 'var(--color-primary-dark)' }}
    >
     Our Specialities
    </h2>

    {/* All categories render server-side so every treatment link is in the
      HTML for crawlers; category anchors match /specialities deep links. */}
    {treatmentCategories.map((category) => {
     const items = allTreatments.filter((t) => t.category === category.id);
     if (items.length === 0) return null;
     return (
      <div key={category.id} id={categoryAnchor(category.id)} className="mb-12 last:mb-0 scroll-mt-24">
       <h3
        className="text-xl font-bold mb-6"
        style={{ color: 'var(--color-primary-dark)' }}
       >
        {category.label}
       </h3>
       <div
        className={`grid gap-6 ${
         items.length === 4
          ? 'grid-cols-1 md:grid-cols-2'
          : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}
       >
        {items.map((treatment) => (
         <TreatmentCard key={treatment.slug} treatment={treatment} imageSize={60} />
        ))}
       </div>
      </div>
     );
    })}
   </div>
  </section>
 );
}
