/* Validates JSON-LD on every built page. Run: npx tsx scripts/validate-schema.ts */
import * as cheerio from 'cheerio';

type SchemaNode = {
  '@id'?: string;
  '@type'?: string | string[];
  [key: string]: unknown;
};

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

const BANNED = [/\bbest\b/i, /no\.?\s*1\b/i, /\btop\b/i, /\bleading\b/i, /world.?class/i, /guarantee/i, /renowned/i, /painless/i];

let failures = 0;
const fail = (route: string, msg: string) => { failures++; console.log(`FAIL ${route}: ${msg}`); };

async function main() {
  // pass 1: collect every @id across all pages (cross-page refs are valid JSON-LD)
  const globalIds = new Set<string>();
  const bodies = new Map<string, string>();
  for (const route of ROUTES) {
    const res = await fetch(BASE + route, { signal: AbortSignal.timeout(10000) });
    const body = await res.text();
    bodies.set(route, body);
    const $ = cheerio.load(body);
    $('script[type="application/ld+json"]').each((_, el) => {
      try {
        const json = JSON.parse($(el).html() ?? '') as { '@graph'?: SchemaNode[] } & SchemaNode;
        for (const n of json['@graph'] ?? [json]) if (n['@id']) globalIds.add(n['@id']);
      } catch { /* reported in pass 2 */ }
    });
  }

  for (const route of ROUTES) {
    const $ = cheerio.load(bodies.get(route)!);

    const nodes: SchemaNode[] = [];
    $('script[type="application/ld+json"]').each((_, el) => {
      const raw = $(el).html() ?? '';
      try {
        const json = JSON.parse(raw) as { '@graph'?: SchemaNode[] } & SchemaNode;
        nodes.push(...(json['@graph'] ?? [json]));
      } catch (e) {
        fail(route, `invalid JSON-LD: ${e}`);
      }
    });

    // @id ref resolution
    const ids = new Set(nodes.map((n) => n['@id']).filter(Boolean));
    const idTypeMap = new Map<string, string>();
    for (const n of nodes) {
      if (!n['@id']) continue;
      const t = Array.isArray(n['@type']) ? n['@type'].join('+') : String(n['@type']);
      if (idTypeMap.has(n['@id']) && idTypeMap.get(n['@id']) !== t)
        fail(route, `conflicting @id ${n['@id']}: ${idTypeMap.get(n['@id'])} vs ${t}`);
      idTypeMap.set(n['@id'], t);
    }
    const checkRefs = (obj: unknown) => {
      if (Array.isArray(obj)) return obj.forEach(checkRefs);
      if (obj && typeof obj === 'object') {
        const o = obj as Record<string, unknown>;
        if (typeof o['@id'] === 'string' && Object.keys(o).length === 1 && !ids.has(o['@id']) && !globalIds.has(o['@id']))
          fail(route, `unresolved @id ref ${o['@id']}`);
        for (const v of Object.values(o)) checkRefs(v);
      }
    };
    checkRefs(nodes);

    // MedicalWebPage has reviewedBy + lastReviewed
    for (const n of nodes.filter((x) => x['@type'] === 'MedicalWebPage')) {
      if (!n.reviewedBy) fail(route, 'MedicalWebPage missing reviewedBy');
      if (!n.lastReviewed) fail(route, 'MedicalWebPage missing lastReviewed');
    }

    // FAQ schema count == visible accordion buttons
    const faqSchema = nodes.find((n) => n['@type'] === 'FAQPage');
    const faqVisible = $('section')
      .filter((_, s) => /frequently asked/i.test($(s).text()))
      .find('button[aria-controls]').length;
    if (faqSchema) {
      const n = Array.isArray(faqSchema.mainEntity) ? faqSchema.mainEntity.length : 0;
      if (n !== faqVisible) fail(route, `FAQ schema ${n} vs visible ${faqVisible}`);
    } else if (faqVisible > 0) {
      fail(route, `visible FAQ (${faqVisible}) but no FAQPage schema`);
    }

    // banned superlatives in schema
    const schemaText = JSON.stringify(nodes);
    for (const r of BANNED) {
      const m = schemaText.match(r);
      if (m) fail(route, `banned term "${m[0]}" in schema`);
    }

    // clinic name exact
    const clinic = nodes.find((n) => String(n['@id'] ?? '').endsWith('#organization'));
    if (clinic && clinic.name !== 'Iswarya Hospital')
      fail(route, `clinic name "${clinic.name}"`);

    // languages in schema
    const phys = nodes.find((n) => String(n['@id'] ?? '').endsWith('#physician'));
    if (phys && (!Array.isArray(phys.knowsLanguage) || phys.knowsLanguage.length !== 5))
      fail(route, 'physician knowsLanguage count wrong');

    console.log(`ok ${route} (${nodes.length} nodes)`);
  }
  console.log(failures ? `\n${failures} FAILURES` : '\nALL PASS');
  process.exit(failures ? 1 : 0);
}
main().catch((e) => { console.error(e); process.exit(1); });
