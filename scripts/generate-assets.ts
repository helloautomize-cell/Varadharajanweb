/* Generates apple-touch-icon, PWA icons, and the default OG image from the
   existing logo and doctor portrait. Run: npx tsx scripts/generate-assets.ts */
import sharp from 'sharp';
import { mkdirSync } from 'fs';

const PRIMARY = '#2e6f8e';
const PRIMARY_DARK = '#1e3a5f';

async function icon(src: string, size: number, out: string, pad = 0.12) {
  const logo = await sharp(src)
    .resize(Math.round(size * (1 - pad * 2)), Math.round(size * (1 - pad * 2)), {
      fit: 'inside',
    })
    .toBuffer();
  await sharp({
    create: { width: size, height: size, channels: 4, background: '#ffffff' },
  })
    .composite([{ input: logo, gravity: 'centre' }])
    .png()
    .toFile(out);
  console.log('wrote', out);
}

async function og() {
  mkdirSync('public/og', { recursive: true });
  const size = { w: 1200, h: 630 };
  // portrait panel on the right
  const portrait = await sharp('public/images/doctor/hero-photo.webp')
    .resize(420, 630, { fit: 'cover', position: 'top' })
    .toBuffer();
  const svg = `<svg width="${size.w}" height="${size.h}" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="${PRIMARY_DARK}"/>
    <rect width="1200" height="630" fill="url(#g)"/>
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${PRIMARY_DARK}"/>
        <stop offset="1" stop-color="${PRIMARY}"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="8" height="630" fill="#ffffff" opacity="0.9"/>
    <text x="80" y="240" font-family="Georgia, serif" font-size="64" font-weight="bold" fill="#ffffff">Dr. Varadharajan V</text>
    <text x="80" y="310" font-family="Georgia, serif" font-size="36" fill="#cfe6f2">Surgical Oncologist, Chennai</text>
    <text x="80" y="370" font-family="Georgia, serif" font-size="26" fill="#9fc4d8">Iswarya Hospital, Tharamani</text>
    <text x="80" y="520" font-family="Georgia, serif" font-size="22" fill="#ffffff" opacity="0.85">Breast | GI | Gynaecological | Thoracic | Head and Neck</text>
  </svg>`;
  await sharp(Buffer.from(svg))
    .composite([{ input: portrait, left: size.w - 420, top: 0 }])
    .webp({ quality: 82 })
    .toFile('public/og/og-default.webp');
  console.log('wrote public/og/og-default.webp');
}

async function main() {
  await icon('public/images/logo.png', 180, 'public/apple-touch-icon.png');
  await icon('public/images/logo.png', 192, 'public/icon-192.png');
  await icon('public/images/logo.png', 512, 'public/icon-512.png');
  await og();
}
main().catch((e) => { console.error(e); process.exit(1); });
