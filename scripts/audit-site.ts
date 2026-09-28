/* SEO/AEO/GEO audit crawler — read-only. Run: npx tsx scripts/audit-site.ts */
import * as cheerio from 'cheerio';
import { writeFileSync, mkdirSync } from 'fs';

async function main() {
const BASE = 'http://localhost:4400';
const ROUTES = [
  '/', '/specialities',
  '/services/surgical-oncology', '/services/breast-cancer-surgeries',
  '/services/breast-oncoplasty', '/services/benign-breast-condition-surgery',
  '/services/gi-oncology', '/services/hipec',
  '/services/laparoscopic-robotic-gi-surgery', '/services/retroperitoneal-tumor-surgery',
  '/services/minimal-access-surgery', '/services/gynaecological-malignancies',
  '/services/thoracic-cancer', '/services/vats-lobectomy',
  '/services/head-and-neck-cancer', '/services/complex-head-neck-resection',
  '/nonexistent-404-test',
];

async function get(url: string) {
  const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
  return { status: res.status, headers: res.headers, body: await res.text() };
}

const NMC = [/\bbest\b/i, /no\.?\s*1\b/i, /\btop\b/i, /\bleading\b/i, /guarantee/i,
  /100\s?%/i, /painless/i, /permanent cure/i, /india'?s\b/i, /world.?class/i];

interface Row {
  route: string; status: number; title: string; titleLen: number;
  desc: string; descLen: number; h1: string; h1count: number; words: number;
  imgs: number; imgsNoAlt: number; bigImgs: string[]; linksOut: number;
  linksIn: number; ldTypes: string; canonical: string; robotsMeta: string;
  og: boolean; tw: boolean; htmlKB: number; headingSkips: string;
  nmc: string; faqSchema: number; faqVisible: number; placeholders: string;
}

const pages: Row[] = [];
const inbound: Record<string, number> = {};
const allParagraphs: Record<string, string[]> = {};
const brokenLinks: { from: string; to: string }[] = [];
const brokenAnchors: { from: string; to: string }[] = [];
const internalHrefs = new Set<string>();
const externalLinks: { from: string; to: string; rel: string; target: string }[] = [];

for (const route of ROUTES) {
  const { status, headers, body } = await get(BASE + route).catch(() => ({ status: 0, headers: new Headers(), body: '' }));
  const $ = cheerio.load(body);

  const title = $('title').first().text().trim();
  const desc = $('meta[name="description"]').attr('content') ?? '';
  const canonical = $('link[rel="canonical"]').attr('href') ?? '';
  const robotsMeta = $('meta[name="robots"]').attr('content') ?? '';
  const og = !!$('meta[property="og:title"]').length && !!$('meta[property="og:image"]').length;
  const tw = !!$('meta[name="twitter:title"],meta[name="twitter:card"]').length;

  // JSON-LD
  const ldTypes: string[] = [];
  let faqSchema = 0;
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const json = JSON.parse($(el).html() ?? '');
      const nodes = json['@graph'] ?? [json];
      for (const n of nodes) {
        const t = Array.isArray(n['@type']) ? n['@type'].join('+') : n['@type'];
        if (t) ldTypes.push(t);
        if (t === 'FAQPage') faqSchema = (n.mainEntity ?? []).length;
      }
    } catch { ldTypes.push('PARSE_ERROR'); }
  });

  // visible FAQ count (buttons in FAQ section)
  const faqVisible = $('section#faq button, .faq button').length || $('section').filter((_, s) => /frequently asked/i.test($(s).text())).find('button').length;

  // main-content words: strip header/footer/nav/sticky
  const clone = cheerio.load(body);
  clone('header, footer, nav, script, style, noscript, [class*="sticky"], form').remove();
  const mainText = clone('main').length ? clone('main').text() : clone('body').text();
  const words = mainText.replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).length;

  // headings
  const h1s = $('h1').map((_, e) => $(e).text().trim()).get();
  const levels = $('h1,h2,h3,h4,h5,h6').map((_, e) => parseInt(e.tagName[1])).get();
  const skips: string[] = [];
  for (let i = 1; i < levels.length; i++)
    if (levels[i] > levels[i - 1] + 1) skips.push(`h${levels[i - 1]}→h${levels[i]}`);

  // images
  const imgs = $('img');
  const noAlt = imgs.filter((_, e) => !$(e).attr('alt')).length;
  const bigImgs: string[] = [];
  for (const el of imgs.get()) {
    const src = $(el).attr('src') ?? '';
    if (!src || src.startsWith('data:')) continue;
    try {
      const r = await fetch(src.startsWith('http') ? src : BASE + src, { method: 'HEAD', signal: AbortSignal.timeout(5000) });
      const len = parseInt(r.headers.get('content-length') ?? '0');
      if (len > 300 * 1024) bigImgs.push(`${src.split('?')[0]}(${Math.round(len / 1024)}KB)`);
    } catch { /* skip */ }
  }

  // links
  let linksOut = 0;
  const pageIds = new Set($('[id]').map((_, e) => $(e).attr('id')).get());
  for (const el of $('a[href]').get()) {
    const href = ($(el).attr('href') ?? '').trim();
    if (!href || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('javascript')) continue;
    if (href.startsWith('#')) {
      if (!pageIds.has(href.slice(1))) brokenAnchors.push({ from: route, to: href });
      continue;
    }
    if (/^https?:/.test(href) && !href.includes('localhost')) {
      externalLinks.push({ from: route, to: href, rel: $(el).attr('rel') ?? '', target: $(el).attr('target') ?? '' });
      continue;
    }
    linksOut++;
    const path = href.split('#')[0] || '/';
    const anchor = href.split('#')[1];
    internalHrefs.add(path);
    inbound[path] = (inbound[path] ?? 0) + 1;
    if (anchor && path === route.replace(/\/$/, '') || (path === '' && anchor)) {
      if (!pageIds.has(anchor)) brokenAnchors.push({ from: route, to: href });
    }
  }

  // main-content paragraphs for dup detection
  allParagraphs[route] = clone('p').map((_, e) => $(e).text().replace(/\s+/g, ' ').trim()).get().filter(t => t.length > 120);

  // placeholder / NMC text on rendered page
  const visible = clone('body').text();
  const placeholders = (visible.match(/YOUR_[A-Z_]+|lorem ipsum|TODO:|FIXME/gi) ?? []).join(';');
  const nmc = NMC.map(r => (visible.match(r)?.[0] ?? '')).filter(Boolean);

  pages.push({
    route, status, title, titleLen: title.length, desc, descLen: desc.length,
    h1: h1s.join(' | '), h1count: h1s.length, words,
    imgs: imgs.length, imgsNoAlt: noAlt, bigImgs, linksOut,
    linksIn: 0, ldTypes: ldTypes.join('+'), canonical, robotsMeta,
    og, tw, htmlKB: Math.round(body.length / 1024), headingSkips: skips.join(';'),
    nmc: [...new Set(nmc)].join(';'), faqSchema, faqVisible, placeholders,
  });
  console.log(`crawled ${route} (${status}, ${words}w)`);
}

// verify internal link targets return 200
for (const path of internalHrefs) {
  if (!path || path === '/') continue;
  const clean = path.startsWith('/') ? path : '/' + path;
  if (clean.startsWith('/_next') || clean.startsWith('/images')) continue;
  const { status } = await get(BASE + clean).catch(() => ({ status: 0 }));
  if (status !== 200) brokenLinks.push({ from: 'crawl', to: `${clean} → ${status}` });
}

// Jaccard near-dup paragraphs across pages
const dupPairs: string[] = [];
const seen = new Set<string>();
const paraMap: Record<string, string[]> = {};
for (const [route, paras] of Object.entries(allParagraphs))
  for (const p of paras) (paraMap[p] ??= []).push(route);
for (const [p, routes] of Object.entries(paraMap)) {
  const uniq = [...new Set(routes)];
  if (uniq.length > 1 && !seen.has(p)) {
    seen.add(p);
    dupPairs.push(`"${p.slice(0, 80)}…" on ${uniq.join(', ')}`);
  }
}

for (const p of pages) p.linksIn = inbound[p.route] ?? 0;

// headers check on home
const home = await get(BASE + '/');
const secHeaders = ['x-content-type-options', 'referrer-policy', 'permissions-policy', 'x-frame-options', 'x-powered-by']
  .map(h => `${h}: ${home.headers.get(h) ?? 'MISSING'}`).join('\n');

// CSV
mkdirSync('docs/audit', { recursive: true });
const csvHead = 'route,status,title,titleLen,descLen,h1,h1count,words,imgs,imgsNoAlt,bigImgs,linksOut,linksIn,ldTypes,canonical,robotsMeta,og,tw,htmlKB,headingSkips,nmc,faqSchema,faqVisible,placeholders';
const csv = [csvHead, ...pages.map(p =>
  [p.route, p.status, `"${p.title.replace(/"/g, '""')}"`, p.titleLen, p.descLen, `"${p.h1}"`, p.h1count, p.words,
   p.imgs, p.imgsNoAlt, `"${p.bigImgs.join('; ')}"`, p.linksOut, p.linksIn, `"${p.ldTypes}"`, p.canonical, p.robotsMeta,
   p.og, p.tw, p.htmlKB, `"${p.headingSkips}"`, `"${p.nmc}"`, p.faqSchema, p.faqVisible, `"${p.placeholders}"`].join(',')
)].join('\n');
writeFileSync('docs/audit/pages.csv', csv);

writeFileSync('docs/audit/raw.json', JSON.stringify({
  pages, inbound, brokenLinks, brokenAnchors, externalLinks, dupPairs, secHeaders,
}, null, 2));

console.log('\n=== SECURITY HEADERS ===\n' + secHeaders);
console.log('=== BROKEN LINKS ===', JSON.stringify(brokenLinks));
console.log('=== BROKEN ANCHORS ===', JSON.stringify(brokenAnchors.slice(0, 20)));
console.log('=== DUP PARAGRAPHS ===', dupPairs.length, dupPairs.slice(0, 10));
console.log('=== EXTERNAL LINKS ===', externalLinks.length);
console.log('Done → docs/audit/pages.csv, docs/audit/raw.json');

}
main().catch(e => { console.error(e); process.exit(1); });
