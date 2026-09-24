import { Quote, Star } from 'lucide-react';
import MobileCarousel from '@/components/MobileCarousel';

const testimonials = [
  {
    name: "Narayani",
    text: "From the moment I met him, he made the entire process feel comfortable and stress-free. He patiently listened to my concerns and clearly explained why cancer screening and regular health check-ups are so important for early detection. Instead of rushing through the consultation, he took time to go through my reports one by one and explained everything in very simple and understandable language. What I appreciated most was his detailed counselling about lifestyle changes, warning signs to watch for, and how regular screening can help detect cancer at an early and treatable stage.",
  },
  {
    name: "Anish",
    text: "A very good and ethical surgical oncologist. The breast-conserving surgery was performed with excellent results. Dr. Varadharajan's expertise and compassion throughout the treatment process were remarkable. He explained everything clearly and the post-operative care was exceptional.",
  },
  {
    name: "Vinoth",
    text: "My mother received excellent care under Dr. Varadharajan. His compassionate approach and thorough explanations made a difficult time much easier. The treatment was handled with great professionalism and the outcomes exceeded our expectations. We are grateful for his dedication and patient-centered care.",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
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
          What Our Patients Say
        </h2>

        <MobileCarousel until="md" desktopClassName="md:grid-cols-3 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              }}
            >
              <Quote
                size={32}
                className="mb-4"
                style={{ color: 'var(--color-primary)' }}
              />
              <p
                className="mb-6 leading-relaxed"
                style={{ color: 'var(--color-text-muted)', fontSize: '15px', lineHeight: '1.6' }}
              >
                {testimonial.text}
              </p>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill="#FBBF24"
                    style={{ color: '#FBBF24' }}
                  />
                ))}
              </div>
              <h4
                className="font-semibold"
                style={{ color: 'var(--color-primary-dark)' }}
              >
                {testimonial.name}
              </h4>
            </div>
          ))}
        </MobileCarousel>
      </div>
    </section>
  );
}