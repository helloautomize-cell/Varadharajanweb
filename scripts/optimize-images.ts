/* Optimise images in /public: convert anything >300KB to WebP,
   max 2000px on the long edge, quality 78. Run: npx tsx scripts/optimize-images.ts */
import sharp from 'sharp';
import { readdirSync, statSync, renameSync, existsSync } from 'fs';
import { join } from 'path';

const ROOT = 'public/images';
const LIMIT = 300 * 1024;

function* walk(dir: string): Generator<string> {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) yield* walk(p);
    else yield p;
  }
}

async function main() {
  for (const file of walk(ROOT)) {
    const size = statSync(file).size;
    if (size <= LIMIT) continue;
    const ext = file.toLowerCase().split('.').pop();
    if (!['jpg', 'jpeg', 'png', 'webp'].includes(ext ?? '')) continue;
    const out = file.replace(/\.(jpe?g|png|webp)$/i, '.webp');
    const img = sharp(file).resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true });
    const buf = await img.webp({ quality: 78 }).toBuffer();
    if (file === out) {
      const tmp = file + '.tmp';
      await sharp(buf).toFile(tmp);
      renameSync(tmp, file);
      console.log(`recompressed ${file}: ${size >> 10}KB -> ${buf.length >> 10}KB`);
    } else {
      await sharp(buf).toFile(out);
      console.log(`converted ${file} -> ${out}: ${size >> 10}KB -> ${buf.length >> 10}KB`);
      if (!existsSync('_reference')) continue;
    }
  }
  console.log('done');
}
main().catch((e) => { console.error(e); process.exit(1); });
