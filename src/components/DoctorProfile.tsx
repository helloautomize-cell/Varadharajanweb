'use client';

import { siteConfig } from '@/config/site';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Video, User } from 'lucide-react';

export default function DoctorProfile() {
  return (
    <section
      id="meet_doctor"
      className="reveal w-full"
      style={{
        padding: 'var(--section-padding-y) 0',
        backgroundColor: 'var(--color-off-white)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Photo and Info */}
          <div className="space-y-6">
            <div
              className="relative"
              style={{ width: '400px', height: '400px' }}
            >
              {/* Blurred background circle */}
              <div
                className="absolute rounded-full blur-3xl opacity-50"
                style={{
                  width: '500px',
                  height: '500px',
                  backgroundColor: 'var(--color-accent-tint)',
                  top: '-50px',
                  left: '-50px',
                }}
              />
              
              {/* Doctor Portrait Image */}
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{
                  boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
                  borderRadius: '24px',
                }}
              >
                <Image
                  src="/images/doctor/bio-photo.webp"
                  alt="Dr. Varadharajan V, Surgical Oncologist"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div
              className="p-6 rounded-2xl"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: '16px',
              }}
            >
              <div className="space-y-4">
                <div>
                  <h4
                    className="text-sm font-semibold mb-1"
                    style={{ color: 'var(--color-primary-dark)' }}
                  >
                    Qualification
                  </h4>
                  <p
                    className="text-sm"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {siteConfig.qualifications}
                  </p>
                </div>
                <div>
                  <h4
                    className="text-sm font-semibold mb-1"
                    style={{ color: 'var(--color-primary-dark)' }}
                  >
                    Experience
                  </h4>
                  <p
                    className="text-sm"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {siteConfig.experienceYears}+ Years
                  </p>
                </div>
                <div>
                  <h4
                    className="text-sm font-semibold mb-1"
                    style={{ color: 'var(--color-primary-dark)' }}
                  >
                    Licence No.
                  </h4>
                  <p
                    className="text-sm"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {siteConfig.licenceNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Bio and Actions */}
          <div className="space-y-6">
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{ color: 'var(--color-primary-dark)' }}
            >
              Meet {siteConfig.doctorName}
            </h2>
            <p
              className="text-lg leading-relaxed"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {siteConfig.bioLongForm}
            </p>
            <p
              className="text-lg leading-relaxed"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {siteConfig.visionLongForm}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: '#ffffff',
                  borderRadius: 'var(--radius-button)',
                }}
              >
                <Phone size={20} />
                Call
              </a>
              <Link
                href="?mode=video#location"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent('consult-mode', { detail: 'video' }))
                }
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium border-2 transition-colors"
                style={{
                  borderColor: 'var(--color-primary)',
                  color: 'var(--color-primary)',
                  borderRadius: 'var(--radius-button)',
                }}
              >
                <Video size={20} />
                Video Call
              </Link>
              <Link
                href="#location"
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium border-2 transition-colors"
                style={{
                  borderColor: 'var(--color-primary)',
                  color: 'var(--color-primary)',
                  borderRadius: 'var(--radius-button)',
                }}
              >
                <User size={20} />
                In Person
              </Link>
            </div>

            <Link
              href="#location"
              className="block w-full px-8 py-4 text-white font-medium mt-4 text-center"
              style={{
                backgroundColor: 'var(--color-primary)',
                borderRadius: 'var(--radius-button)',
              }}
            >
              Book an appointment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}