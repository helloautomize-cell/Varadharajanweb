'use client';

import { useState } from 'react';
import { allTreatments, treatmentCategories, type TreatmentCategory } from '@/config/site';
import TreatmentCard from './TreatmentCard';

export default function Treatments() {
 const [activeTab, setActiveTab] = useState<TreatmentCategory>('General');

 const filtered = allTreatments.filter((t) => t.category === activeTab);

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

    {/* Tab Buttons */}
    <div className="flex flex-wrap justify-center gap-4 mb-12">
     {treatmentCategories.map((tab) => (
      <button
       key={tab.id}
       onClick={() => setActiveTab(tab.id)}
       className="px-6 py-3 rounded-lg font-medium transition-colors"
       style={{
        backgroundColor: activeTab === tab.id ? 'var(--color-primary)' : '#ffffff',
        color: activeTab === tab.id ? '#ffffff' : 'var(--color-primary-dark)',
        border: activeTab === tab.id ? 'none' : '2px solid var(--color-primary)',
        borderRadius: 'var(--radius-button)',
       }}
      >
       {tab.label}
      </button>
     ))}
    </div>

    {/* Treatment Cards */}
    <div
     className={`grid gap-6 ${
      filtered.length === 4
       ? 'grid-cols-1 md:grid-cols-2'
       : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
     }`}
    >
     {filtered.map((treatment) => (
      <TreatmentCard key={treatment.slug} treatment={treatment} imageSize={60} />
     ))}
    </div>
   </div>
  </section>
 );
}
