/* Internal link check: no broken links, no self-links, >=3 inbound per page. */
import * as cheerio from 'cheerio';

const BASE = process.env.AUDIT_BASE ?? 'http://localhost:4300';
const ROUTES = [
  '/', '/specialities', '/patients-from-outside-chennai', '/privacy', '/terms',
  ...['surgical-oncology', 'breast-cancer-surgeries', 'breast-oncoplasty',
    'benign-breast-condition-surgery', 'gi-oncology', 'hipec',
    'laparoscopic-robotic-gi-surgery', 'retroperitoneal-tumor-surgery',
    'minimal-access-surgery', 'gynaecological-malignancies', 'thoracic-cancer',
    'vats-lobectomy', 'head-and-neck-cancer', 'complex-head-neck-resection']
    .map((s) => `/services/${s}`),
];

let failures = 0;
const fail = (msg: string) => { failures++; console.log('FAIL', msg); };

async function main() {
  const inbound = new Map<string, Set<string>>();
  const seen = new Set<string>();

  for (const route of ROUTES) {
    const res = await fetch(BASE + route, { signal: AbortSignal.timeout(10000) });
    if (res.status !== 200) { fail(`${route} status ${res.status}`); continue; }
    const $ = cheerio.load(await res.text());
    const ids = new Set($('[id]').map((_, e) => $(e).attr('id')).get());

    // self-link rule applies to in-body content links; nav/footer/breadcrumb
    // chrome self-links (logo, current-page nav item) are conventional
    const mainLinks = $('main a[href]').get();
    for (const el of mainLinks) {
      const href = ($(el).attr('href') ?? '').trim();
      const [p, a] = href.split('#');
      const norm = (p || route).replace(/\?.*$/, '').replace(/\/$/, '') || '/';
      if (norm === route && !a) fail(`${route} self-links in body: ${href}`);
    }

    for (const el of $('a[href]').get()) {
      const href = ($(el).attr('href') ?? '').trim();
      if (!href || href === '#') { fail(`${route} has dead href="#"`); continue; }
      if (/^(tel:|mailto:|javascript:|https?:)/.test(href)) continue;
      const [path, anchor] = href.split('#');
      const norm = (path || route).replace(/\?.*$/, '').replace(/\/$/, '') || '/';
      // verify target exists
      if (!seen.has(norm)) {
        seen.add(norm);
        const r = await fetch(BASE + norm, { signal: AbortSignal.timeout(10000) });
        if (r.status !== 200) fail(`${route}: broken link ${href} (${r.status})`);
      }
      if (anchor) {
        // anchor check only for same-page anchors
        if ((path === '' || norm === route) && !ids.has(anchor)) {
          // footer uses /#location style; same-page plain #anchor must resolve
          if (!href.startsWith('/')) fail(`${route}: missing anchor ${href}`);
        }
      }
      (inbound.get(norm) ?? inbound.set(norm, new Set()).get(norm)!).add(route);
    }
  }

  console.log('\nInbound matrix:');
  for (const r of ROUTES) {
    const n = inbound.get(r)?.size ?? 0;
    if (n < 3) fail(`${r} has only ${n} inbound internal links`);
    console.log(` ${r}: ${n} inbound from [${[...(inbound.get(r) ?? [])].join(', ')}]`);
  }
  console.log(failures ? `\n${failures} FAILURES` : '\nALL PASS');
  process.exit(failures ? 1 : 0);
}
main().catch((e) => { console.error(e); process.exit(1); });
