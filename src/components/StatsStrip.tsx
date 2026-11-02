import { siteConfig } from '@/config/site';

export default function StatsStrip() {
 return (
  <section
   aria-label="Credentials"
   className="reveal w-full"
   style={{
    backgroundColor: 'var(--color-primary-dark)',
    padding: '40px 0',
   }}
  >
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
     {siteConfig.stats.map((s) => (
      <div key={s.label}>
       <p className="text-3xl sm:text-4xl font-bold text-white mb-1">{s.value}</p>
       <p className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
        {s.label}
       </p>
      </div>
     ))}
    </div>
   </div>
  </section>
 );
}
