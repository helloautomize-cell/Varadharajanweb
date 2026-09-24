'use client';

import { siteConfig } from '@/config/site';
import { Phone, MessageCircle } from 'lucide-react';

export default function MobileStickyBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
      style={{ backgroundColor: 'var(--color-primary-dark)' }}
    >
      <div className="flex">
        <a
          href="/#location"
          className="flex-1 flex flex-col items-center justify-center py-3 text-white overflow-hidden"
        >
          <Phone size={20} />
          <span className="text-[10px] mt-1">Book Now</span>
        </a>
        <a
          href={`tel:${siteConfig.phone}`}
          className="flex-1 flex flex-col items-center justify-center py-3 text-white border-l overflow-hidden"
          style={{ borderColor: 'rgba(255,255,255,0.2)' }}
        >
          <Phone size={20} />
          <span className="text-[10px] mt-1">Call Now</span>
        </a>
        <a
          href={`https://wa.me/${siteConfig.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-3 text-white border-l overflow-hidden"
          style={{ borderColor: 'rgba(255,255,255,0.2)' }}
        >
          <MessageCircle size={20} />
          <span className="text-[11px] mt-1 whitespace-nowrap">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}