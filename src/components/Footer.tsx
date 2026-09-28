import Link from 'next/link';
import { allTreatments, siteConfig, treatmentCategories, categoryAnchor } from '@/config/site';
import { Mail, Phone, MessageCircle } from 'lucide-react';

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
      <h2 className="text-lg font-bold mb-4">Specialities</h2>
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
      <h2 className="text-lg font-bold mb-4">Treatments</h2>
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
      <h2 className="text-lg font-bold mb-4">Contact Us</h2>
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
        {siteConfig.displayPhone}
       </a>
       <Link href="/#location" className="block hover:opacity-80 transition-opacity">
        Location
       </Link>
       <Link href="/#location" className="block hover:opacity-80 transition-opacity">
        Book an Appointment
       </Link>
       <a
        href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent('Hello Doctor, I would like to book a video consultation.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
       >
        <MessageCircle size={16} />
        Video consultation on WhatsApp
       </a>
       <p className="text-sm opacity-80">{siteConfig.workingHours}</p>
      </div>
     </div>

     {/* Policy */}
     <div>
      <h2 className="text-lg font-bold mb-4">Policy</h2>
      <ul className="space-y-2">
       <li>
        <Link href="/terms" className="hover:opacity-80 transition-opacity">
         Terms of Use
        </Link>
       </li>
       <li>
        <Link href="/privacy" className="hover:opacity-80 transition-opacity">
         Privacy Policy
        </Link>
       </li>
       <li>
        <Link
         href="/patients-from-outside-chennai"
         className="hover:opacity-80 transition-opacity"
        >
         Travelling for Treatment
        </Link>
       </li>
      </ul>
     </div>

     {/* Social Media */}
     <div>
      <h2 className="text-lg font-bold mb-4">Social Media</h2>
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
     <p className="text-center text-xs opacity-70 mb-3 max-w-3xl mx-auto">
      Information on this website is for general education and does not replace a
      personal consultation. In an emergency, go to the nearest hospital.
     </p>
     <p className="text-center text-sm opacity-80">
      © Dr. Varadharajan V 2026 · {siteConfig.clinicName}, Chennai
     </p>
    </div>
   </div>
  </footer>
 );
}
