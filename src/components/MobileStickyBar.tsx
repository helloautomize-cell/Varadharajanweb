'use client';

import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Phone, MessageCircle } from 'lucide-react';

export default function MobileStickyBar() {
 return (
  <div
   className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
   style={{ backgroundColor: 'var(--color-primary-dark)' }}
   data-ga-cta-location="sticky_mobile"
  >
   <div className="flex">
    <Link
     href="/#location"
     className="flex-1 flex flex-col items-center justify-center py-3 text-white overflow-hidden"
     data-ga-event="book_appointment_click"
     data-ga-cta-text="Book Now"
    >
     <Phone size={20} />
     <span className="text-[10px] mt-1">Book Now</span>
    </Link>
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