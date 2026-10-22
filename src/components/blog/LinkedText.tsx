import Link from 'next/link';
import type { LinkCandidate } from '@/lib/blog';

export type LinkTracker = Set<string>;

/**
 * Renders text with contextual internal links: the first natural mention of
 * each candidate phrase links to its href. Each href is linked at most once
 * per page (tracked across paragraphs), and at most `maxLinks` per text.
 * Server component, no client JS.
 */
export default function LinkedText({
 text,
 candidates,
 tracker,
 maxLinks = 2,
}: {
 text: string;
 candidates: LinkCandidate[];
 tracker: LinkTracker;
 maxLinks?: number;
}) {
 const nodes: React.ReactNode[] = [];
 let rest = text;
 let key = 0;
 let used = 0;

 while (rest.length > 0 && used < maxLinks) {
  let earliest: { idx: number; c: LinkCandidate } | null = null;
  for (const c of candidates) {
   if (tracker.has(c.href)) continue;
   const re = new RegExp(
    `\\b${c.phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`,
    'i'
   );
   const m = re.exec(rest);
   if (m && (earliest === null || m.index < earliest.idx))
    earliest = { idx: m.index, c };
  }
  if (!earliest) break;
  const { idx, c } = earliest;
  if (idx > 0) nodes.push(rest.slice(0, idx));
  const label = rest.slice(idx, idx + c.phrase.length);
  nodes.push(
   <Link
    key={key++}
    href={c.href}
    className="underline underline-offset-2 hover:opacity-80"
    style={{ color: 'var(--color-primary)' }}
   >
    {label}
   </Link>
  );
  tracker.add(c.href);
  used++;
  rest = rest.slice(idx + c.phrase.length);
 }
 nodes.push(rest);
 return <>{nodes}</>;
}
