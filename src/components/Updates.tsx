import { siteConfig } from '@/config/site';

const updates = [
  {
    image: '/images/update-1.jpg',
    title: 'Participated as faculty in the CHET SURGICON CME',
    date: 'July 17, 2026',
  },
  {
    image: '/images/update-2.jpg',
    title: 'Thyroid cancer treatment depends on the type and stage of disease',
    date: 'April 18, 2026',
  },
];

export default function Updates() {
  return (
    <section
      id="updates"
      className="reveal w-full"
      style={{ padding: 'var(--section-padding-y) 0' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-3xl sm:text-4xl font-bold text-center mb-4"
          style={{ color: 'var(--color-primary-dark)' }}
        >
          Updates
        </h2>
        <p
          className="text-center mb-12"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Stay informed with our latest updates, posts and healthcare news.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {updates.map((update, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              }}
            >
              <div className="relative h-48">
                <img
                  src={update.image}
                  alt={update.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: 'var(--color-primary-dark)' }}
                >
                  {update.title}
                </h3>
                <p
                  className="text-sm mb-4"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {update.date}
                </p>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="inline-flex items-center gap-2 font-medium"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Call Us
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}