import type { NextConfig } from "next";

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self'",
      "frame-src https://maps.google.com https://www.google.com https://www.youtube.com https://www.youtube-nocookie.com",
      "connect-src 'self' https://api.web3forms.com",
      "form-action 'self' https://api.web3forms.com",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // Apex is canonical: www host must 308 to it
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.drvaradharajan.com" }],
        destination: "https://drvaradharajan.com/:path*",
        permanent: true,
      },
      // Old iCareHeal single-page site URLs
      {
        source: "/website-doctor-profile/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
