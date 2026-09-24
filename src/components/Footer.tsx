import Link from 'next/link';
import { allTreatments, siteConfig, treatmentCategories, categoryAnchor } from '@/config/site';
import { Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      className="w-full"
      style={{
        backgroundColor: 'var(--color-primary-dark)',
        color: '#ffffff',
        padding: '64px 0 32px',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Specialities */}
          <div>
            <h3 className="text-lg font-bold mb-4">Specialities</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/specialities" className="hover:opacity-80 transition-opacity">
                  All Specialities
                </Link>
              </li>
              {treatmentCategories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/specialities#${categoryAnchor(category.id)}`}
                    className="hover:opacity-80 transition-opacity"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Treatments */}
          <div>
            <h3 className="text-lg font-bold mb-4">Treatments</h3>
            <ul className="space-y-2">
              {allTreatments.map((treatment) => (
                <li key={treatment.slug}>
                  <Link
                    href={`/services/${treatment.slug}`}
                    className="hover:opacity-80 transition-opacity"
                  >
                    {treatment.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <Mail size={16} />
                {siteConfig.email}
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <Phone size={16} />
                {siteConfig.phone}
              </a>
              <Link href="/#location" className="block hover:opacity-80 transition-opacity">
                Location
              </Link>
              <Link href="/#location" className="block hover:opacity-80 transition-opacity">
                Book an Appointment
              </Link>
            </div>
          </div>

          {/* Policy — PLACEHOLDER: Terms and Privacy pages do not exist yet.
              Replace these "#" links with real pages/content before launch. */}
          <div>
            <h3 className="text-lg font-bold mb-4">Policy</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  Privacy
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-4">Social Media</h3>
            <div className="flex gap-4 mb-4">
              {siteConfig.socialLinks.map((link) => {
                return link.url ? (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity capitalize"
                  >
                    {link.platform}
                  </a>
                ) : null;
              })}
            </div>
            <Link
              href="/#location"
              className="block w-full px-6 py-3 text-white font-medium text-center"
              style={{
                backgroundColor: 'var(--color-primary)',
                borderRadius: 'var(--radius-button)',
              }}
            >
              Book an appointment
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <p className="text-center text-sm opacity-80">
            © Dr. Varadharajan V 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
