import rawPosts from '@/data/blog-posts.json';

export type BlogBlock =
 | { t: 'h2'; text: string }
 | { t: 'h3'; text: string }
 | { t: 'p'; text: string }
 | { t: 'ul' | 'ol'; items: string[] };

export interface BlogFaq {
 q: string;
 a: string;
}

export interface BlogPost {
 slug: string;
 type: 'pillar' | 'support';
 cluster: number;
 category: string;
 title: string;
 seoTitle: string;
 description: string;
 readTime: string;
 primaryKeyword: string;
 secondaryKeywords: string[];
 about: { t: string; n: string };
 imageAlt: string;
 quickAnswer: string;
 body: BlogBlock[];
 faqs: BlogFaq[];
 suggested: string[];
 citations: { name: string; url: string }[];
 wordCount: number;
 datePublished: string;
}

export const posts = rawPosts as BlogPost[];

export const postBySlug = new Map(posts.map((p) => [p.slug, p]));

export const pillars = posts.filter((p) => p.type === 'pillar');
export const supports = posts.filter((p) => p.type === 'support');

export function pillarOf(post: BlogPost): BlogPost {
 return posts.find((p) => p.type === 'pillar' && p.cluster === post.cluster)!;
}

export function supportsOf(post: BlogPost): BlogPost[] {
 return posts.filter((p) => p.type === 'support' && p.cluster === post.cluster);
}

export interface Cluster {
 n: number;
 name: string;
 slug: string;
 title: string;
 anchor: string;
}

export const clusters: Cluster[] = pillars.map((p) => ({
 n: p.cluster,
 name: p.category,
 slug: p.slug,
 title: p.title,
 anchor: `cluster-${p.cluster}`,
}));

export const POSTS_DATE_REVIEWED = '2026-10-22';
export const POSTS_REVIEWED_LABEL = 'October 2026';

export function formatDate(iso: string): string {
 return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
 });
}

/** Card meta date: "2 October 2026". Parsed in UTC so the day never shifts. */
export function formatCardDate(iso: string): string {
 return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
 });
}

/** Read-time label for cards; falls back to ~200 wpm when data lacks one. */
export function readTimeLabel(post: BlogPost): string {
 if (post.readTime) return post.readTime;
 return `${Math.max(1, Math.ceil(post.wordCount / 200))} min read`;
}

/** Cross-cluster pillar links from the content calendar link map. */
const CROSS: Record<number, number[]> = {
 1: [6, 8, 10],
 2: [9, 10],
 3: [5, 9],
 4: [9, 10],
 5: [8, 7, 3],
 6: [1, 7],
 7: [9, 5, 6],
 8: [1],
 9: [2, 3, 4, 7],
 10: [1, 2, 4],
};

export function siblingPillars(post: BlogPost): BlogPost[] {
 return (CROSS[post.cluster] ?? [])
  .map((n) => pillars.find((p) => p.cluster === n)!)
  .filter(Boolean);
}

/** Loose title matcher for the SUGGESTED INTERNAL BLOGS lists. */
function normalizeTitle(s: string): string {
 return s
  .toLowerCase()
  .replace(/&/g, ' and ')
  .replace(/[^a-z0-9 ]+/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();
}

export function resolveSuggested(post: BlogPost): BlogPost[] {
 const out: BlogPost[] = [];
 const seen = new Set<string>([post.slug]);
 for (const s of post.suggested) {
  const ns = normalizeTitle(s);
  let best: BlogPost | null = null;
  let bestScore = 0;
  for (const p of posts) {
   if (seen.has(p.slug)) continue;
   const nt = normalizeTitle(p.title);
   const score =
    nt === ns
     ? 1
     : nt.includes(ns) || ns.includes(nt)
      ? 0.9
      : (() => {
         const a = new Set(ns.split(' '));
         const b = new Set(nt.split(' '));
         const inter = [...a].filter((w) => b.has(w)).length;
         return inter / Math.max(a.size, 1);
        })();
   if (score > bestScore) {
    bestScore = score;
    best = p;
   }
  }
  if (best && bestScore >= 0.6) {
   seen.add(best.slug);
   out.push(best);
  }
 }
 return out;
}

/**
 * Phrases that link to blog articles when they appear naturally in body text.
 * Longest match wins; each href is linked at most once per page.
 */
export const BLOG_PHRASES: { phrase: string; slug: string }[] = [
 { phrase: 'whipple procedure', slug: 'whipple-procedure-pancreatic-cancer' },
 { phrase: 'pancreaticoduodenectomy', slug: 'whipple-procedure-pancreatic-cancer' },
 { phrase: 'sentinel lymph node biopsy', slug: 'sentinel-lymph-node-biopsy-breast-cancer' },
 { phrase: 'sentinel node', slug: 'sentinel-lymph-node-biopsy-breast-cancer' },
 { phrase: 'neck dissection', slug: 'neck-dissection-lymph-nodes-removed' },
 { phrase: 'staging laparoscopy', slug: 'staging-laparoscopy-cancer' },
 { phrase: 'diagnostic laparoscopy', slug: 'staging-laparoscopy-cancer' },
 { phrase: 'peritoneal cancer index', slug: 'what-is-pci-score-peritoneal-cancer' },
 { phrase: 'pseudomyxoma peritonei', slug: 'pseudomyxoma-peritonei-symptoms-treatment' },
 { phrase: 'peritoneal metastasis', slug: 'what-is-peritoneal-metastasis' },
 { phrase: 'peritoneal metastases', slug: 'what-is-peritoneal-metastasis' },
 { phrase: 'tumour board', slug: 'what-is-a-tumour-board' },
 { phrase: 'tumor board', slug: 'what-is-a-tumour-board' },
 { phrase: 'neoadjuvant chemotherapy', slug: 'neoadjuvant-chemotherapy-before-surgery' },
 { phrase: 'neoadjuvant therapy', slug: 'neoadjuvant-chemotherapy-before-surgery' },
 { phrase: 'lymphedema', slug: 'recovery-after-breast-cancer-surgery-lymphedema' },
 { phrase: 'mammogram', slug: 'breast-cancer-screening-self-exam-mammogram' },
 { phrase: 'mammography', slug: 'breast-cancer-screening-self-exam-mammogram' },
 { phrase: 'pap smear', slug: 'pap-smear-hpv-test-cervical-screening' },
 { phrase: 'pap test', slug: 'pap-smear-hpv-test-cervical-screening' },
 { phrase: 'hpv test', slug: 'pap-smear-hpv-test-cervical-screening' },
 { phrase: 'colonoscopy', slug: 'colonoscopy-preparation-what-to-expect' },
 { phrase: 'tumour marker', slug: 'tumour-markers-what-they-tell-you' },
 { phrase: 'tumor marker', slug: 'tumour-markers-what-they-tell-you' },
 { phrase: 'oral cancer screening', slug: 'oral-cancer-screening' },
 { phrase: 'palliative surgery', slug: 'palliative-surgery-goals-expectations' },
 { phrase: 'recurrent cancer', slug: 'recurrent-cancer-surgery-option' },
 { phrase: 'oligometastatic', slug: 'can-stage-4-cancer-be-operated' },
 { phrase: 'oligometastatic disease', slug: 'can-stage-4-cancer-be-operated' },
 { phrase: 'colostomy', slug: 'living-with-colostomy-ileostomy' },
 { phrase: 'ileostomy', slug: 'living-with-colostomy-ileostomy' },
 { phrase: 'oncoplastic breast surgery', slug: 'what-is-oncoplastic-breast-surgery' },
 { phrase: 'radical hysterectomy', slug: 'radical-hysterectomy-what-it-involves' },
 { phrase: 'thyroidectomy', slug: 'thyroid-cancer-surgery-types-recovery' },
 { phrase: 'esophagectomy', slug: 'esophageal-cancer-surgery-procedure-recovery' },
 { phrase: 'gastrectomy', slug: 'stomach-cancer-surgery-partial-total-gastrectomy' },
 { phrase: 'sphincter', slug: 'rectal-cancer-sphincter-saving-surgery' },
 { phrase: 'gutka', slug: 'tobacco-gutka-head-neck-cancer-risk' },
 { phrase: 'leukoplakia', slug: 'mouth-cancer-early-signs' },
 { phrase: 'lumpectomy', slug: 'lumpectomy-vs-mastectomy' },
 { phrase: 'mastectomy', slug: 'lumpectomy-vs-mastectomy' },
 { phrase: 'robotic surgery', slug: 'robotic-cancer-surgery-benefits-limits' },
 { phrase: 'robotic', slug: 'robotic-cancer-surgery-benefits-limits' },
 { phrase: 'cancer screening', slug: 'cancer-screening-early-detection' },
 { phrase: 'survivorship', slug: 'cancer-surgery-recovery-survivorship' },
 { phrase: 'hipec', slug: 'crs-hipec' },
];

/** Service-page phrases, carried over from LinkedParagraph. */
export const SERVICE_PHRASES: { phrase: string; href: string }[] = [
 { phrase: 'breast cancer surgery', href: '/services/breast-cancer-surgeries' },
 { phrase: 'breast cancer surgeries', href: '/services/breast-cancer-surgeries' },
 { phrase: 'oncoplasty', href: '/services/breast-oncoplasty' },
 { phrase: 'oncoplastic', href: '/services/breast-oncoplasty' },
 { phrase: 'benign breast', href: '/services/benign-breast-condition-surgery' },
 { phrase: 'GI oncology', href: '/services/gi-oncology' },
 { phrase: 'gastrointestinal cancer', href: '/services/gi-oncology' },
 { phrase: 'HIPEC', href: '/services/hipec' },
 { phrase: 'robotic GI surgery', href: '/services/laparoscopic-robotic-gi-surgery' },
 { phrase: 'laparoscopic GI surgery', href: '/services/laparoscopic-robotic-gi-surgery' },
 { phrase: 'retroperitoneal', href: '/services/retroperitoneal-tumor-surgery' },
 { phrase: 'minimal access surgery', href: '/services/minimal-access-surgery' },
 { phrase: 'gynaecological cancer', href: '/services/gynaecological-malignancies' },
 { phrase: 'gynecologic cancer', href: '/services/gynaecological-malignancies' },
 { phrase: 'thoracic cancer', href: '/services/thoracic-cancer' },
 { phrase: 'VATS', href: '/services/vats-lobectomy' },
 { phrase: 'head and neck cancer', href: '/services/head-and-neck-cancer' },
 { phrase: 'complex head and neck', href: '/services/complex-head-neck-resection' },
 { phrase: 'surgical oncology', href: '/services/surgical-oncology' },
];

export interface LinkCandidate {
 phrase: string;
 href: string;
}

/**
 * Ordered link candidates for a post's body text. The first occurrence of a
 * phrase becomes a link; each href is used at most once across the page.
 */
export function bodyLinkCandidates(post: BlogPost): LinkCandidate[] {
 const self = `/blog/${post.slug}`;
 const out: LinkCandidate[] = [];

 if (post.type === 'support') {
  const pillar = pillarOf(post);
  out.push({ phrase: pillar.primaryKeyword, href: `/blog/${pillar.slug}` });
 }

 // sibling pillar titles/keywords for pillars (cross-cluster)
 if (post.type === 'pillar') {
  for (const sib of siblingPillars(post)) {
   out.push({ phrase: sib.primaryKeyword, href: `/blog/${sib.slug}` });
  }
 }

 const pillarHref = `/blog/${pillarOf(post).slug}`;
 for (const bp of BLOG_PHRASES) {
  const href = `/blog/${bp.slug}`;
  if (href === self) continue;
  // a support must link to its own pillar exactly once, anchored on the
  // pillar's primary keyword: skip other phrases that also target the pillar
  if (post.type === 'support' && href === pillarHref) continue;
  out.push({ phrase: bp.phrase, href });
 }
 for (const sp of SERVICE_PHRASES) out.push({ phrase: sp.phrase, href: sp.href });

 // dedupe phrase+href and order longest-first so specific phrases win
 const seen = new Set<string>();
 return out
  .filter((c) => {
   const k = `${c.phrase}|${c.href}`;
   if (seen.has(k)) return false;
   seen.add(k);
   return true;
  })
  .sort((a, b) => b.phrase.length - a.phrase.length);
}

/** Does the body text already contain the pillar's primary keyword? */
export function bodyContainsKeyword(post: BlogPost, keyword: string): boolean {
 const re = new RegExp(
  `\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`,
  'i'
 );
 return post.body.some((b) => {
  const text = b.t === 'p' || b.t === 'h2' || b.t === 'h3' ? b.text : b.items.join(' ');
  return re.test(text);
 });
}
