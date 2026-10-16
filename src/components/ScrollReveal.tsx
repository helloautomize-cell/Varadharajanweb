'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ScrollReveal() {
 const pathname = usePathname();
 useEffect(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const els = document.querySelectorAll<HTMLElement>('section.reveal');
  const io = new IntersectionObserver(
   (entries) => {
    entries.forEach((entry) => {
     if (entry.isIntersecting) {
      entry.target.classList.add('reveal-visible');
      io.unobserve(entry.target);
     }
    });
   },
   { threshold: 0.05 }
  );
  els.forEach((el) => io.observe(el));
  return () => io.disconnect();
 }, [pathname]);
 return null;
}
