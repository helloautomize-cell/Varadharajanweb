import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function manifest(): MetadataRoute.Manifest {
 return {
  name: `${siteConfig.doctorName} | Surgical Oncologist, Chennai`,
  short_name: 'Dr. Varadharajan V',
  description: `Surgical oncologist at ${siteConfig.clinicName}, Tharamani, Chennai.`,
  start_url: '/',
  display: 'standalone',
  background_color: '#ffffff',
  theme_color: '#2e6f8e',
  icons: [
   { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
   { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
  ],
 };
}
