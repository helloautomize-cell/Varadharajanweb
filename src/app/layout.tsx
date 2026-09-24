import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import ScrollReveal from "@/components/ScrollReveal";
import { siteConfig } from "@/config/site";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// PLACEHOLDER DOMAIN: drvaradharajan.com is assumed — confirm the real final
// domain with the site owner before deploy and update everywhere it appears.
const SITE_URL = "https://drvaradharajan.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Dr. Varadharajan V",
    default: "Surgical Oncologist in Chennai | Dr Varadharajan V",
  },
  description:
    "Expert surgical oncologist in Chennai specializing in breast, GI, gynecologic, thoracic and peritoneal cancers with advanced robotic and minimally invasive care.",
  keywords: [
    "surgical oncologist",
    "surgical oncologist in Chennai",
    "breast oncologist",
    "head and neck oncologist",
    "gynecologic oncology specialist",
    "gastrointestinal cancer specialist",
    "HIPEC specialist",
    "thoracic cancer surgeon",
    "minimally invasive cancer surgeon",
    "robotic oncosurgeon",
    "best surgical oncologist in Chennai",
  ],
  openGraph: {
    siteName: "Dr. Varadharajan V",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
  },
};

// Site-wide JSON-LD structured data (Physician + MedicalOrganization).
// Rendered inside <body> because the App Router manages <head> via the
// metadata API; search engines read JSON-LD from body equally well.
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Physician",
      "@id": `${SITE_URL}/#physician`,
      name: siteConfig.doctorName,
      description: siteConfig.credentials,
      medicalSpecialty: siteConfig.specialty,
      qualifications: siteConfig.qualifications,
      identifier: siteConfig.licenceNumber,
      telephone: siteConfig.phone,
      email: siteConfig.email,
      image: `${SITE_URL}/images/doctor/bio-photo.webp`,
      url: SITE_URL,
      worksFor: { "@id": `${SITE_URL}/#clinic` },
      address: {
        "@type": "PostalAddress",
        streetAddress: "110, Rajiv Gandhi Salai, OMR, Tharamani",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        postalCode: "600041",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: siteConfig.mapLat,
        longitude: siteConfig.mapLng,
      },
      ...([
        ...siteConfig.socialLinks.filter((s) => s.url).map((s) => s.url),
        siteConfig.googleBusinessProfile,
      ].filter(Boolean).length
        ? {
            sameAs: [
              ...siteConfig.socialLinks.filter((s) => s.url).map((s) => s.url),
              ...(siteConfig.googleBusinessProfile ? [siteConfig.googleBusinessProfile] : []),
            ],
          }
        : {}),
    },
    {
      "@type": "MedicalOrganization",
      "@id": `${SITE_URL}/#clinic`,
      name: siteConfig.clinicName,
      telephone: siteConfig.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: "110, Rajiv Gandhi Salai, OMR, Tharamani",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        postalCode: "600041",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: siteConfig.mapLat,
        longitude: siteConfig.mapLng,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Header />
        {children}
        <Footer />
        <MobileStickyBar />
        <ScrollReveal />
      </body>
    </html>
  );
}
