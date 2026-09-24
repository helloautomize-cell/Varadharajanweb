'use client';

import { Stethoscope, ShieldCheck, HeartHandshake, Microscope, Users, Award } from 'lucide-react';

const features = [
  {
    icon: Stethoscope,
    title: "14+ Years of Expertise",
    description: "Extensive experience in surgical oncology across breast, GI, gynecologic, thoracic and peritoneal cancers."
  },
  {
    icon: ShieldCheck,
    title: "Robotic & Minimally Invasive Surgery",
    description: "Advanced techniques that reduce pain, speed recovery and minimise scarring."
  },
  {
    icon: HeartHandshake,
    title: "Multidisciplinary Approach",
    description: "Coordinated care with medical and radiation oncology for a complete treatment plan."
  },
  {
    icon: Users,
    title: "Ethical, Patient-First Care",
    description: "Clear communication and honest guidance at every step of the journey."
  },
  {
    icon: Award,
    title: "Specialised Fellowship Training",
    description: "FIAGES, FALS and FMAS fellowships in advanced laparoscopic and endoscopic oncology."
  },
  {
    icon: Microscope,
    title: "Academic & Research Active",
    description: "Regular presenter at ASCO, ESMO, ESSO and IFHNOS with published research."
  }
];

export default function WhyChooseUs() {
  return (
    <section
      id="why_choose"
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
          Why Choose Dr. Varadharajan V for Cancer Care
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-2xl card-hover"
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: 'var(--color-accent-tint)' }}
                >
                  <Icon
                    size={28}
                    style={{ color: 'var(--color-primary)' }}
                  />
                </div>
                <h3
                  className="text-lg font-bold mb-3"
                  style={{ color: 'var(--color-primary-dark)', fontSize: '18px' }}
                >
                  {feature.title}
                </h3>
                <p
                  className="leading-relaxed"
                  style={{ 
                    color: 'var(--color-text-muted)',
                    fontSize: '15px',
                    lineHeight: '1.6'
                  }}
                >
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}