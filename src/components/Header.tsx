'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, Menu, X } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function Header() {
 const [isMenuOpen, setIsMenuOpen] = useState(false);

 const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/#why_choose' },
  { label: 'Our Specialities', href: '/specialities' },
  { label: 'Healthcare Services', href: '/#specialities' },
  { label: 'Meet Doctor', href: '/#meet_doctor' },
  { label: 'Updates', href: '/#updates' },
  { label: 'Testimonial', href: '/#testimonials' },
  { label: 'Contact Us', href: '/#location' },
 ];

 return (
  <>
   {/* Top Bar - Desktop Only */}
   <div className="hidden md:block" style={{ backgroundColor: 'var(--color-off-white)' }}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     <div className="flex justify-end items-center py-2 space-x-6">
      <a
       href={`mailto:${siteConfig.email}`}
       className="flex items-center space-x-2 text-sm"
       style={{ color: 'var(--color-text-muted)' }}
      >
       <Mail size={14} />
       <span>{siteConfig.email}</span>
      </a>
      <a
       href={`tel:${siteConfig.phone}`}
       className="flex items-center space-x-2 text-sm"
       style={{ color: 'var(--color-text-muted)' }}
      >
       <Phone size={14} />
       <span>{siteConfig.displayPhone}</span>
      </a>
     </div>
    </div>
   </div>

   {/* Main Header */}
   <header
    className="sticky top-0 z-50"
    style={{
     backgroundColor: '#ffffff',
     borderBottom: '1px solid rgba(0,0,0,0.1)',
     boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    }}
   >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     <div className="flex justify-between items-center h-16">
      {/* Logo */}
      <Link href="/" className="flex-shrink-0">
       <Image
        src="/images/logo.png"
        alt={siteConfig.clinicName}
        width={625}
        height={125}
        className="h-10 w-auto"
        priority
       />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden xl:flex items-center space-x-4 2xl:space-x-6 min-w-0">
       {navLinks.map((link) => (
        <Link
         key={link.href + link.label}
         href={link.href}
         className="text-sm font-medium whitespace-nowrap hover:opacity-80 transition-opacity"
         style={{ color: '#171717' }}
        >
         {link.label}
        </Link>
       ))}
      </nav>

      {/* CTA Button - Desktop */}
      <div className="hidden xl:block flex-shrink-0">
       <Link
        href="/#location"
        className="inline-block px-6 py-2.5 text-white font-medium whitespace-nowrap"
        style={{
         backgroundColor: 'var(--color-primary)',
         borderRadius: 'var(--radius-button)',
        }}
       >
        Book an appointment
       </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
       className="xl:hidden"
       onClick={() => setIsMenuOpen(!isMenuOpen)}
       aria-label="Toggle menu"
      >
       {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
     </div>
    </div>
   </header>

   {/* Mobile Menu Drawer */}
   {isMenuOpen && (
    <div
     className="fixed inset-0 z-50 xl:hidden"
     style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
     onClick={() => setIsMenuOpen(false)}
    >
     <div
      className="fixed right-0 top-0 h-full w-80 p-6"
      style={{
       backgroundColor: '#ffffff',
      }}
      onClick={(e) => e.stopPropagation()}
     >
      <div className="flex justify-end mb-8">
       <button
        onClick={() => setIsMenuOpen(false)}
        aria-label="Close menu"
       >
        <X size={24} />
       </button>
      </div>

      <nav className="flex flex-col space-y-4">
       {navLinks.map((link) => (
        <Link
         key={link.href + link.label}
         href={link.href}
         className="text-lg font-medium py-2 border-b"
         style={{ color: '#171717', borderColor: 'rgba(0,0,0,0.1)' }}
         onClick={() => setIsMenuOpen(false)}
        >
         {link.label}
        </Link>
       ))}
      </nav>

      <div className="mt-8">
       <Link
        href="/#location"
        className="block w-full px-6 py-3 text-white font-medium text-center"
        style={{
         backgroundColor: 'var(--color-primary)',
         borderRadius: 'var(--radius-button)',
        }}
        onClick={() => setIsMenuOpen(false)}
       >
        Book an appointment
       </Link>
      </div>
     </div>
    </div>
   )}
  </>
 );
}