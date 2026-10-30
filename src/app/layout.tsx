import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import ClickTracker from "@/components/analytics/ClickTracker";
import { siteConfig } from "@/config/site";

const figtree = Figtree({
 variable: "--font-figtree",
 subsets: ["latin"],
 weight: ["400", "500", "600", "700"],
 display: "swap",
});

const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "false";

export const metadata: Metadata = {
 metadataBase: new URL(siteConfig.url),
 title: {
  template: "%s | Dr. Varadharajan V",
  default: "Surgical Oncologist in Chennai | Dr Varadharajan V",
 },
 description:
  "Surgical oncologist in Chennai for breast, GI, gynecologic, thoracic and peritoneal cancers. Laparoscopic, robotic and HIPEC surgery at Iswarya Hospital, Tharamani.",
 openGraph: {
  siteName: "Dr. Varadharajan V",
  type: "website",
  locale: "en_IN",
  images: [{ url: "/og/og-default.webp", width: 1200, height: 630 }],
 },
 twitter: {
  card: "summary_large_image",
 },
 ...(allowIndexing ? {} : { robots: { index: false, follow: false } }),
};

export const viewport: Viewport = {
 themeColor: "#2e6f8e",
};

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
  <html
   lang="en-IN"
   className={`${figtree.variable} h-full antialiased`}
  >
   <body className="min-h-full flex flex-col">
    <a
     href="#main-content"
     className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black"
    >
     Skip to content
    </a>
    <Header />
    <main id="main-content" className="flex-1 flex flex-col">{children}</main>
    <Footer />
    <MobileStickyBar />
    <ClickTracker />
   </body>
   <GoogleAnalytics gaId="G-C0LQSLHZE2" />
  </html>
 );
}
