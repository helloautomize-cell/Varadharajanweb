'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs, type FaqItem } from '@/data/faqs';

interface FAQProps {
 items?: FaqItem[];
 id?: string;
}

export default function FAQ({ items = faqs, id = 'faq' }: FAQProps) {
 const [openIndex, setOpenIndex] = useState<number | null>(null);

 return (
  <section
   id={id}
   className="reveal w-full"
   style={{ padding: 'var(--section-padding-y) 0' }}
  >
   <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2
     className="text-3xl sm:text-4xl font-bold text-center mb-4"
     style={{ color: 'var(--color-primary-dark)' }}
    >
     Frequently Asked Questions
    </h2>
    <p
     className="text-center mb-12"
     style={{ color: 'var(--color-text-muted)' }}
    >
     Need answers? Find them here...
    </p>

    <div className="space-y-4">
     {items.map((faq, index) => (
      <div
       key={index}
       className="rounded-2xl overflow-hidden"
       style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
       }}
      >
       <button
        className="w-full p-6 flex items-center justify-between text-left"
        aria-expanded={openIndex === index}
        aria-controls={`${id}-panel-${index}`}
        onClick={() => setOpenIndex(openIndex === index ? null : index)}
       >
        <h3
         className="font-semibold pr-4"
         style={{ color: 'var(--color-primary-dark)' }}
        >
         {faq.question}
        </h3>
        <ChevronDown
         size={20}
         style={{
          color: 'var(--color-primary)',
          transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
         }}
        />
       </button>
       <div
        id={`${id}-panel-${index}`}
        role="region"
        className={openIndex === index ? 'px-6 pb-6' : 'hidden px-6 pb-6'}
       >
         <p
          className="leading-relaxed"
          style={{ color: 'var(--color-text-muted)', fontSize: '15px', lineHeight: '1.6' }}
         >
          {faq.answer}
         </p>
        </div>
      </div>
     ))}
    </div>
   </div>
  </section>
 );
}