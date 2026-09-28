import Link from 'next/link';
import { allTreatments } from '@/config/site';

// Phrases that map to a service page for contextual linking. The first
// occurrence of any phrase becomes a link to that service page.
const PHRASE_MAP: Record<string, string[]> = {
 'breast-cancer-surgeries': ['breast cancer surgery', 'breast cancer surgeries'],
 'breast-oncoplasty': ['oncoplasty', 'oncoplastic'],
 'benign-breast-condition-surgery': ['benign breast'],
 'gi-oncology': ['GI cancer', 'gastrointestinal cancer', 'GI cancers'],
 hipec: ['HIPEC'],
 'laparoscopic-robotic-gi-surgery': ['robotic GI surgery', 'laparoscopic GI surgery'],
 'retroperitoneal-tumor-surgery': ['retroperitoneal'],
 'minimal-access-surgery': ['minimal access surgery'],
 'gynaecological-malignancies': ['gynaecological cancer', 'gynecologic cancer'],
 'thoracic-cancer': ['thoracic cancer'],
 'vats-lobectomy': ['VATS', 'video-assisted'],
 'head-and-neck-cancer': ['head and neck cancer'],
 'complex-head-neck-resection': ['complex head and neck'],
 'surgical-oncology': ['surgical oncology'],
};

/**
 * Renders paragraph text, linking the first natural mention of each related
 * service. Server component, no client JS.
 */
export default function LinkedParagraph({
 text,
 currentSlug,
 maxLinks = 2,
 style,
 className,
}: {
 text: string;
 currentSlug: string;
 maxLinks?: number;
 style?: React.CSSProperties;
 className?: string;
}) {
 // Build candidate phrases for other pages, longest phrase first.
 const candidates: { phrase: string; slug: string; title: string }[] = [];
 for (const [slug, phrases] of Object.entries(PHRASE_MAP)) {
  if (slug === currentSlug) continue;
  if (!allTreatments.some((t) => t.slug === slug)) continue;
  for (const p of phrases) candidates.push({ phrase: p, slug, title: allTreatments.find(t => t.slug === slug)!.title });
 }
 candidates.sort((a, b) => b.phrase.length - a.phrase.length);

 const usedSlugs = new Set<string>();
 const nodes: React.ReactNode[] = [];
 let rest = text;
 let key = 0;

 while (rest.length > 0 && usedSlugs.size < maxLinks) {
  // find earliest match among remaining candidates
  let earliest: { idx: number; c: (typeof candidates)[0] } | null = null;
  for (const c of candidates) {
   if (usedSlugs.has(c.slug)) continue;
   const idx = rest.toLowerCase().indexOf(c.phrase.toLowerCase());
   if (idx !== -1 && (earliest === null || idx < earliest.idx)) earliest = { idx, c };
  }
  if (!earliest) break;
  const { idx, c } = earliest;
  if (idx > 0) nodes.push(rest.slice(0, idx));
  const label = rest.slice(idx, idx + c.phrase.length);
  nodes.push(
   <Link
    key={key++}
    href={`/services/${c.slug}`}
    className="underline underline-offset-2"
    style={{ color: 'var(--color-primary)' }}
   >
    {label}
   </Link>
  );
  usedSlugs.add(c.slug);
  rest = rest.slice(idx + c.phrase.length);
 }
 nodes.push(rest);

 return (
  <p className={className} style={style}>
   {nodes}
  </p>
 );
}
