'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { GA_EVENTS, trackEvent } from '@/lib/analytics';
import { MapPin, Clock, Mail, Phone, CheckCircle2, MessageCircle } from 'lucide-react';

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

export default function Location() {
 const [formData, setFormData] = useState({
  name: '',
  phone: '',
  email: '',
  mode: 'in-person',
  message: '',
  botcheck: '',
  consent: false,
 });
 const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

 useEffect(() => {
  const setMode = (mode: string) => setFormData((d) => ({ ...d, mode }));
  const onEvent = (e: Event) => setMode((e as CustomEvent).detail);
  if (new URLSearchParams(window.location.search).get('mode') === 'video') {
   setMode('video');
  }
  window.addEventListener('consult-mode', onEvent);
  return () => window.removeEventListener('consult-mode', onEvent);
 }, []);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus('sending');
  try {
   const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
     access_key: WEB3FORMS_ACCESS_KEY,
     subject: `New ${formData.mode === 'video' ? 'Video' : 'In-Person'} Consultation Request: ${formData.name}`,
     from_name: 'Dr. Varadharajan Website',
     name: formData.name,
     phone: formData.phone,
     email: formData.email,
     consultation_mode: formData.mode === 'video' ? 'Video Consultation' : 'In-Person Consultation',
     message: formData.message,
     botcheck: formData.botcheck,
    }),
   });
   const data = await res.json();
   if (data.success) {
    setStatus('sent');
    trackEvent(GA_EVENTS.generateLead, {
     form_name: 'appointment_form',
     form_location: 'form',
     page_path: window.location.pathname,
    });
   } else {
    setStatus('error');
    trackEvent(GA_EVENTS.formSubmitError, {
     form_name: 'appointment_form',
     error_type: 'server',
     page_path: window.location.pathname,
    });
   }
  } catch {
   setStatus('error');
   trackEvent(GA_EVENTS.formSubmitError, {
    form_name: 'appointment_form',
    error_type: 'network',
    page_path: window.location.pathname,
   });
  }
 };

 return (
  <section
   id="location"
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
     Location & Contact
    </h2>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
     {/* Contact Information */}
     <div
      className="p-8 rounded-2xl"
      style={{
       backgroundColor: '#ffffff',
       borderRadius: '16px',
       boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
      }}
      data-ga-cta-location="contact_info"
     >
      <h3
       className="text-xl font-bold mb-6"
       style={{ color: 'var(--color-primary-dark)' }}
      >
       Contact Information
      </h3>

      <div className="space-y-6">
       <div className="flex items-start gap-4">
        <MapPin
         size={20}
         style={{ color: 'var(--color-primary)', marginTop: '2px' }}
        />
        <div>
         <h4
          className="font-semibold mb-1"
          style={{ color: 'var(--color-primary-dark)' }}
         >
          Address
         </h4>
         <p
          className="text-sm"
          style={{ color: 'var(--color-text-muted)' }}
         >
          {siteConfig.address}
         </p>
        </div>
       </div>

       <div className="flex items-start gap-4">
        <Clock
         size={20}
         style={{ color: 'var(--color-primary)', marginTop: '2px' }}
        />
        <div>
         <h4
          className="font-semibold mb-1"
          style={{ color: 'var(--color-primary-dark)' }}
         >
          Working Hours
         </h4>
         <p
          className="text-sm"
          style={{ color: 'var(--color-text-muted)' }}
         >
          {siteConfig.workingHours}
         </p>
        </div>
       </div>

       <div className="flex items-start gap-4">
        <Phone
         size={20}
         style={{ color: 'var(--color-primary)', marginTop: '2px' }}
        />
        <div>
         <h4
          className="font-semibold mb-1"
          style={{ color: 'var(--color-primary-dark)' }}
         >
          Phone
         </h4>
         <a
          href={`tel:${siteConfig.phone}`}
          className="text-sm"
          style={{ color: 'var(--color-primary)' }}
         >
          {siteConfig.displayPhone}
         </a>
        </div>
       </div>

       <div className="flex items-start gap-4">
        <Mail
         size={20}
         style={{ color: 'var(--color-primary)', marginTop: '2px' }}
        />
        <div>
         <h4
          className="font-semibold mb-1"
          style={{ color: 'var(--color-primary-dark)' }}
         >
          Email
         </h4>
         <a
          href={`mailto:${siteConfig.email}`}
          className="text-sm"
          style={{ color: 'var(--color-primary)' }}
         >
          {siteConfig.email}
         </a>
        </div>
       </div>
      </div>

      <div className="flex flex-col gap-3 mt-6 items-start">
       <a
        href={`https://www.google.com/maps/search/?api=1&query=${siteConfig.mapLat},${siteConfig.mapLng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium"
        style={{
         backgroundColor: 'var(--color-primary)',
         color: '#ffffff',
         borderRadius: 'var(--radius-button)',
        }}
       >
        Get Directions
       </a>
       <a
        href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent('Hello Doctor, I would like to book a video consultation.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm underline underline-offset-2"
        style={{ color: 'var(--color-primary)' }}
       >
        <MessageCircle size={16} />
        Video consultation available on WhatsApp
       </a>
       <Link
        href="/patients-from-outside-chennai"
        className="text-sm underline underline-offset-2"
        style={{ color: 'var(--color-primary)' }}
        data-ga-event="cta_click"
        data-ga-cta-text="Travelling for treatment?"
       >
        Travelling for treatment?
       </Link>
      </div>
     </div>

     {/* Contact Form */}
     <div
      className="p-8 rounded-2xl"
      style={{
       backgroundColor: '#ffffff',
       borderRadius: '16px',
       boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
      }}
      data-ga-cta-location="form"
     >
      {!WEB3FORMS_ACCESS_KEY ? (
       <div className="text-center py-8" role="status">
        <h3
         className="text-xl font-bold mb-3"
         style={{ color: 'var(--color-primary-dark)' }}
        >
         Book an Appointment
        </h3>
        <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
         Online booking is temporarily unavailable. Please call{' '}
         {siteConfig.displayPhone} or message us on WhatsApp.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
         <a
          href={`tel:${siteConfig.phone}`}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-white"
          style={{
           backgroundColor: 'var(--color-primary)',
           borderRadius: 'var(--radius-button)',
          }}
         >
          <Phone size={18} />
          Call {siteConfig.displayPhone}
         </a>
         <a
          href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent('Hello Doctor, I would like to book an appointment.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-white"
          style={{
           backgroundColor: '#25D366',
           borderRadius: 'var(--radius-button)',
          }}
         >
          <MessageCircle size={18} />
          WhatsApp Us
         </a>
        </div>
       </div>
      ) : status === 'sent' ? (
       <div className="text-center py-8" aria-live="polite">
        <CheckCircle2
         size={48}
         className="mx-auto mb-4"
         style={{ color: 'var(--color-primary)' }}
        />
        <h3
         className="text-xl font-bold mb-3"
         style={{ color: 'var(--color-primary-dark)' }}
        >
         Thank you, {formData.name}
        </h3>
        <p className="text-sm mb-2" style={{ color: 'var(--color-text-muted)' }}>
         Your request for a{' '}
         <strong>
          {formData.mode === 'video' ? 'video' : 'in-person'} consultation
         </strong>{' '}
         has been received.
        </p>
        <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
         Dr. Varadharajan&apos;s team will contact you shortly to confirm your
         appointment.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
         <a
          href={`tel:${siteConfig.phone}`}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-white"
          style={{
           backgroundColor: 'var(--color-primary)',
           borderRadius: 'var(--radius-button)',
          }}
         >
          <Phone size={18} />
          Call {siteConfig.displayPhone}
         </a>
         <a
          href={`https://wa.me/${siteConfig.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-white"
          style={{
           backgroundColor: '#25D366',
           borderRadius: 'var(--radius-button)',
          }}
         >
          <MessageCircle size={18} />
          WhatsApp Us
         </a>
        </div>
       </div>
      ) : (
       <>
        <h3
         className="text-xl font-bold mb-6"
         style={{ color: 'var(--color-primary-dark)' }}
        >
         Book an Appointment
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
         <div>
          <label
           className="block text-sm font-medium mb-2"
           style={{ color: 'var(--color-primary-dark)' }}
          >
           Consultation Type
          </label>
          <div className="grid grid-cols-2 gap-3">
           {[
            { value: 'in-person', label: 'In-Person Visit' },
            { value: 'video', label: 'Video Consultation' },
           ].map((opt) => (
            <button
             key={opt.value}
             type="button"
             onClick={() => setFormData({ ...formData, mode: opt.value })}
             className="px-4 py-3 rounded-lg border-2 font-medium text-sm transition-colors"
             style={{
              borderColor:
               formData.mode === opt.value
                ? 'var(--color-primary)'
                : 'rgba(0,0,0,0.1)',
              backgroundColor:
               formData.mode === opt.value
                ? 'var(--color-primary)'
                : '#ffffff',
              color:
               formData.mode === opt.value
                ? '#ffffff'
                : 'var(--color-primary-dark)',
              borderRadius: 'var(--radius-button)',
             }}
            >
             {opt.label}
            </button>
           ))}
          </div>
          {formData.mode === 'video' && (
           <p
            className="text-xs mt-2"
            style={{ color: 'var(--color-text-muted)' }}
           >
            Video consultations take place on WhatsApp. We will message you on
            your number to arrange a time.
           </p>
          )}
         </div>

         <div>
          <label
           htmlFor="appt-name"
           className="block text-sm font-medium mb-2"
           style={{ color: 'var(--color-primary-dark)' }}
          >
           Name
          </label>
          <input
           id="appt-name"
           name="name"
           type="text"
           autoComplete="name"
           value={formData.name}
           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
           required
           className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
           style={{
            borderColor: 'rgba(0,0,0,0.1)',
            borderRadius: 'var(--radius-button)',
           }}
          />
         </div>

         <div>
          <label
           htmlFor="appt-phone"
           className="block text-sm font-medium mb-2"
           style={{ color: 'var(--color-primary-dark)' }}
          >
           Phone
          </label>
          <input
           id="appt-phone"
           name="phone"
           type="tel"
           inputMode="tel"
           autoComplete="tel"
           value={formData.phone}
           onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
           required
           className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
           style={{
            borderColor: 'rgba(0,0,0,0.1)',
            borderRadius: 'var(--radius-button)',
           }}
          />
         </div>

         <div>
          <label
           htmlFor="appt-email"
           className="block text-sm font-medium mb-2"
           style={{ color: 'var(--color-primary-dark)' }}
          >
           Email <span style={{ color: 'var(--color-text-muted)' }}>(optional)</span>
          </label>
          <input
           id="appt-email"
           name="email"
           type="email"
           autoComplete="email"
           value={formData.email}
           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
           className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
           style={{
            borderColor: 'rgba(0,0,0,0.1)',
            borderRadius: 'var(--radius-button)',
           }}
          />
         </div>

         <div>
          <label
           htmlFor="appt-message"
           className="block text-sm font-medium mb-2"
           style={{ color: 'var(--color-primary-dark)' }}
          >
           Message
          </label>
          <textarea
           id="appt-message"
           name="message"
           value={formData.message}
           onChange={(e) => setFormData({ ...formData, message: e.target.value })}
           rows={4}
           className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none resize-none"
           style={{
            borderColor: 'rgba(0,0,0,0.1)',
            borderRadius: 'var(--radius-button)',
           }}
          />
         </div>

         <input
          type="text"
          name="botcheck"
          value={formData.botcheck}
          onChange={(e) => setFormData({ ...formData, botcheck: e.target.value })}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
         />

         <div className="flex items-start gap-3">
          <input
           id="appt-consent"
           type="checkbox"
           required
           checked={formData.consent}
           onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
           className="mt-1"
          />
          <label
           htmlFor="appt-consent"
           className="text-sm"
           style={{ color: 'var(--color-text-muted)' }}
          >
           I agree to be contacted about my appointment request. See our{' '}
           <a href="/privacy" className="underline" style={{ color: 'var(--color-primary)' }}>
            Privacy Policy
           </a>
           .
          </label>
         </div>

         {status === 'error' && (
          <p className="text-sm" role="alert" style={{ color: '#b91c1c' }}>
           Something went wrong. Please call or WhatsApp us directly instead.
          </p>
         )}

         <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full px-6 py-3 text-white font-medium disabled:opacity-60"
          style={{
           backgroundColor: 'var(--color-primary)',
           borderRadius: 'var(--radius-button)',
          }}
         >
          {status === 'sending' ? 'Sending…' : 'Request Appointment'}
         </button>
        </form>
       </>
      )}
     </div>
    </div>

    {/* Hospital photo + Google Map */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
     <div
      className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto"
      style={{
       borderRadius: '16px',
       boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
       minHeight: '0',
      }}
     >
      <Image
       src="/images/hospital/hospital-exterior.webp"
       alt="Iswarya Hospital exterior, OMR, Chennai"
       width={1036}
       height={776}
       sizes="(max-width: 1024px) 100vw, 50vw"
       className="object-cover w-full h-full"
      />
     </div>
     <div
      className="rounded-2xl overflow-hidden"
      style={{
       height: '450px',
       borderRadius: '16px',
       boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
      }}
     >
      <iframe
       src={`https://maps.google.com/maps?q=${siteConfig.mapLat},${siteConfig.mapLng}&z=16&output=embed`}
       width="100%"
       height="100%"
       style={{ border: 0 }}
       allowFullScreen
       loading="lazy"
       title="Map: Iswarya Hospital, Tharamani, Chennai"
      />
     </div>
    </div>
   </div>
  </section>
 );
}