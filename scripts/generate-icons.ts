/* Generates favicon, app icons, and PWA icons from the logo emblem
   (shield mark only, no text). Run: npx tsx scripts/generate-icons.ts */
import sharp from 'sharp';
import { writeFileSync } from 'fs';

const SRC = 'public/images/logo.png';
// Left region of the logo containing only the shield/caduceus mark.
const EMBLEM = { left: 0, top: 0, width: 134, height: 125 };

async function emblem() {
  const crop = await sharp(SRC).extract(EMBLEM).png().toBuffer();
  return sharp(crop).trim().png().toBuffer();
}

async function square(mark: Buffer, size: number, pad = 0.1) {
  const inner = Math.round(size * (1 - pad * 2));
  const scaled = await sharp(mark)
    .resize(inner, inner, { fit: 'inside' })
    .toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 4, background: '#ffffff' },
  })
    .composite([{ input: scaled, gravity: 'centre' }])
    .png()
    .toBuffer();
}

// ICO container with PNG-compressed entries (supported by all modern browsers).
function pngToIco(pngs: { size: number; data: Buffer }[]) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(pngs.length, 4);
  const entries = Buffer.alloc(16 * pngs.length);
  let offset = 6 + 16 * pngs.length;
  pngs.forEach((p, i) => {
    const o = 16 * i;
    entries.writeUInt8(p.size, o); // width
    entries.writeUInt8(p.size, o + 1); // height
    entries.writeUInt16LE(1, o + 4); // planes
    entries.writeUInt16LE(32, o + 6); // bpp
    entries.writeUInt32LE(p.data.length, o + 8);
    entries.writeUInt32LE(offset, o + 12);
    offset += p.data.length;
  });
  return Buffer.concat([header, entries, ...pngs.map((p) => p.data)]);
}

async function main() {
  const mark = await emblem();
  writeFileSync('src/app/icon.png', await square(mark, 512));
  writeFileSync('src/app/apple-icon.png', await square(mark, 180));
  writeFileSync('public/icon-192.png', await square(mark, 192));
  writeFileSync('public/icon-512.png', await square(mark, 512));
  writeFileSync('public/apple-touch-icon.png', await square(mark, 180));
  const ico = await Promise.all(
    [16, 32, 48].map(async (s) => ({ size: s, data: await square(mark, s, 0.04) })),
  );
  writeFileSync('src/app/favicon.ico', pngToIco(ico));
  console.log('wrote favicon.ico, icon.png, apple-icon.png + public icons');
}
main().catch((e) => { console.error(e); process.exit(1); });
