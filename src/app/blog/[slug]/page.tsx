import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ExternalLink } from 'lucide-react';
import { siteConfig } from '@/config/site';
import {
 postBySlug,
 posts,
 pillarOf,
 supportsOf,
 siblingPillars,
 resolveSuggested,
 bodyLinkCandidates,
 bodyContainsKeyword,
 clusters,
 formatDate,
 POSTS_DATE_REVIEWED,
 POSTS_REVIEWED_LABEL,
 type BlogPost,
} from '@/lib/blog';
import { articleGraph } from '@/lib/schema';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQ from '@/components/FAQ';
import Location from '@/components/Location';
import LinkedText, { type LinkTracker } from '@/components/blog/LinkedText';
import AuthorBox from '@/components/blog/AuthorBox';

export const dynamicParams = false;

export function generateStaticParams() {
 return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
 params,
}: {
 params: Promise<{ slug: string }>;
}): Promise<Metadata> {
 const { slug } = await params;
 const post = postBySlug.get(slug);
 if (!post) return {};
 return {
  title: { absolute: post.seoTitle },
  description: post.description,
  alternates: { canonical: `/blog/${slug}` },
  openGraph: {
   type: 'article',
   title: post.seoTitle,
   description: post.description,
   images: [
    { url: `/blog/${slug}.webp`, width: 1280, height: 720, alt: post.imageAlt },
   ],
   publishedTime: post.datePublished,
   modifiedTime: POSTS_DATE_REVIEWED,
   authors: [siteConfig.doctorName],
   section: post.category,
  },
  twitter: {
   card: 'summary_large_image',
   title: post.seoTitle,
   description: post.description,
   images: [`/blog/${slug}.webp`],
  },
 };
}

function RelatedBlock({ post }: { post: BlogPost }) {
 const pillar = pillarOf(post);
 const isPillar = post.type === 'pillar';
 const suggested = resolveSuggested(post).filter((p) => p.slug !== pillar.slug);
 const pillarInBody =
  !isPillar && bodyContainsKeyword(post, pillar.primaryKeyword);

 return (
  <section
   className="reveal w-full"
   style={{ padding: 'var(--section-padding-y) 0', backgroundColor: 'var(--color-off-white)' }}
  >
   <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    {!isPillar && (
     <>
      <h2
       className="text-2xl font-bold mb-3"
       style={{ color: 'var(--color-primary-dark)' }}
      >
       Part of the {post.category} guide
      </h2>
      {!pillarInBody ? (
       <p
        className="mb-8"
        style={{ color: 'var(--color-text-muted)', lineHeight: '1.7' }}
       >
        This article is part of our complete guide to{' '}
        <Link
         href={`/blog/${pillar.slug}`}
         className="underline underline-offset-2 font-medium"
         style={{ color: 'var(--color-primary)' }}
        >
         {pillar.primaryKeyword}
        </Link>
        , which explains the bigger picture and links to every related topic.
       </p>
      ) : (
       <p
        className="mb-8"
        style={{ color: 'var(--color-text-muted)', lineHeight: '1.7' }}
       >
        This article is part of our complete {post.category} guide, linked
        above, which explains the bigger picture and every related topic.
       </p>
      )}
     </>
    )}

    {isPillar && (
     <>
      <h2
       className="text-2xl font-bold mb-3"
       style={{ color: 'var(--color-primary-dark)' }}
      >
       Detailed guides in this series
      </h2>
      <ul className="space-y-2 mb-10">
       {supportsOf(post).map((s) => (
        <li key={s.slug}>
         <Link
          href={`/blog/${s.slug}`}
          className="underline underline-offset-2 font-medium"
          style={{ color: 'var(--color-primary)' }}
         >
          {s.title}
         </Link>
         <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          {' '}
          · {s.primaryKeyword}
         </span>
        </li>
       ))}
      </ul>
      <h2
       className="text-2xl font-bold mb-3"
       style={{ color: 'var(--color-primary-dark)' }}
      >
       Related guides
      </h2>
      <ul className="space-y-2 mb-10">
       {siblingPillars(post).map((sib) => (
        <li key={sib.slug}>
         <Link
          href={`/blog/${sib.slug}`}
          className="underline underline-offset-2 font-medium"
          style={{ color: 'var(--color-primary)' }}
         >
          {sib.title}
         </Link>
        </li>
       ))}
      </ul>
     </>
    )}

    {suggested.length > 0 && (
     <>
      <h2
       className="text-2xl font-bold mb-3"
       style={{ color: 'var(--color-primary-dark)' }}
      >
       Related reading
      </h2>
      <ul className="space-y-2">
       {suggested.map((s) => (
        <li key={s.slug}>
         <Link
          href={`/blog/${s.slug}`}
          className="underline underline-offset-2 font-medium"
          style={{ color: 'var(--color-primary)' }}
         >
          {s.title}
         </Link>
        </li>
       ))}
      </ul>
     </>
    )}
   </div>
  </section>
 );
}

export default async function BlogPostPage({
 params,
}: {
 params: Promise<{ slug: string }>;
}) {
 const { slug } = await params;
 const post = postBySlug.get(slug);
 if (!post) notFound();

 const cluster = clusters.find((c) => c.n === post.cluster)!;
 const image = `/blog/${post.slug}.webp`;
 const tracker: LinkTracker = new Set<string>();
 tracker.add(`/blog/${post.slug}`); // never self-link

 const candidates = bodyLinkCandidates(post);
 const graph = articleGraph({
  path: `/blog/${post.slug}`,
  title: post.title,
  description: post.description,
  image,
  section: post.category,
  keywords: [post.primaryKeyword, ...post.secondaryKeywords],
  wordCount: post.wordCount,
  datePublished: post.datePublished,
  dateModified: POSTS_DATE_REVIEWED,
  lastReviewed: POSTS_DATE_REVIEWED,
  about: { type: post.about.t, name: post.about.n },
  citations: post.citations,
  faqs: post.faqs,
  breadcrumbs: [
   { name: 'Blog', path: '/blog' },
   { name: post.category, path: `/blog#${cluster.anchor}` },
   { name: post.title, path: `/blog/${post.slug}` },
  ],
 });

 const faqItems = post.faqs.map((f) => ({
  id: f.q,
  question: f.q,
  answer: f.a,
 }));

 return (
  <>
   <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
   />

   {/* Hero */}
   <section
    className="w-full"
    style={{
     padding: 'var(--section-padding-y) 0',
     background: 'linear-gradient(135deg, var(--color-accent-tint) 0%, white 100%)',
    }}
   >
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
     <Breadcrumbs
      items={[
       { name: 'Blog', path: '/blog' },
       { name: post.category, path: `/blog#${cluster.anchor}` },
       { name: post.title, path: `/blog/${post.slug}` },
      ]}
     />
     <p
      className="text-sm font-medium mb-3 uppercase tracking-wide"
      style={{ color: 'var(--color-primary)' }}
     >
      {post.category}
     </p>
     <h1
      className="text-3xl sm:text-4xl font-bold leading-tight mb-4"
      style={{ color: 'var(--color-primary-dark)' }}
     >
      {post.title}
     </h1>
     <p className="text-sm mb-2" style={{ color: 'var(--color-text-muted)' }}>
      Written by{' '}
      <Link
       href="/about"
       className="underline underline-offset-2 font-medium"
       style={{ color: 'var(--color-primary)' }}
      >
       Dr. Varadharajan V, Surgical Oncologist, Chennai
      </Link>
     </p>
     <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
      Published{' '}
      <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
      {' · '}
      Updated{' '}
      <time dateTime={POSTS_DATE_REVIEWED}>22 October 2026</time>
      {' · '}
      Medically reviewed by Dr. Varadharajan V
      {' · '}
      Last reviewed:{' '}
      <time dateTime={POSTS_DATE_REVIEWED}>{POSTS_REVIEWED_LABEL}</time>
      {' · '}
      {post.readTime}
     </p>
     <div
      className="w-full overflow-hidden mb-8"
      style={{
       borderRadius: '16px',
       boxShadow: '0 10px 30px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.04)',
      }}
     >
      <Image
       src={image}
       alt={post.imageAlt}
       width={1280}
       height={720}
       priority
       sizes="(max-width: 1024px) 100vw, 896px"
       className="object-cover w-full h-auto"
      />
     </div>

     {/* Quick Answer callout directly under the H1 */}
     <div
      className="p-6 mb-2"
      style={{
       backgroundColor: 'var(--color-accent-tint)',
       borderRadius: '16px',
       border: '1px solid rgba(46,111,142,0.25)',
      }}
     >
      <p
       className="text-sm font-semibold uppercase tracking-wide mb-2"
       style={{ color: 'var(--color-primary)' }}
      >
       Quick Answer
      </p>
      <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.75' }}>
       {post.quickAnswer}
      </p>
     </div>
    </div>
   </section>

   {/* Body */}
   <article className="w-full">
    {(() => {
     let sectionIndex = 0;
     const sectionBg = () =>
      sectionIndex++ % 2 === 0 ? '#ffffff' : 'var(--color-off-white)';
     const sections: { bg: string; nodes: React.ReactNode[] }[] = [];
     let cur: React.ReactNode[] = [];
     const pushSection = () => {
      if (cur.length) {
       sections.push({ bg: sectionBg(), nodes: cur });
       cur = [];
      }
     };
     post.body.forEach((b, i) => {
      if (b.t === 'h2') {
       pushSection();
       cur.push(
        <h2
         key={i}
         className="text-2xl sm:text-3xl font-bold mb-5"
         style={{ color: 'var(--color-primary-dark)' }}
        >
         {b.text}
        </h2>
       );
      } else if (b.t === 'h3') {
       cur.push(
        <h3
         key={i}
         className="text-xl font-bold mt-6 mb-3"
         style={{ color: 'var(--color-primary-dark)' }}
        >
         {b.text}
        </h3>
       );
      } else if (b.t === 'p') {
       cur.push(
        <p
         key={i}
         className="text-lg mb-5"
         style={{ color: 'var(--color-text-muted)', lineHeight: '1.8' }}
        >
         <LinkedText text={b.text} candidates={candidates} tracker={tracker} />
        </p>
       );
      } else {
       const Tag = b.t;
       cur.push(
        <Tag
         key={i}
         className={`mb-5 space-y-2 ${b.t === 'ol' ? 'list-decimal' : 'list-disc'} pl-6`}
         style={{ color: 'var(--color-text-muted)' }}
        >
         {b.items.map((item, j) => (
          <li key={j} style={{ lineHeight: '1.7' }}>
           <LinkedText text={item} candidates={candidates} tracker={tracker} />
          </li>
         ))}
        </Tag>
       );
      }
     });
     pushSection();
     return sections.map((s, i) => (
      <section
       key={i}
       className="w-full"
       style={{ padding: 'var(--section-padding-y) 0', backgroundColor: s.bg }}
      >
       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">{s.nodes}</div>
      </section>
     ));
    })()}
   </article>

   {/* Next steps: booking + location links */}
   <section
    className="w-full"
    style={{ padding: 'var(--section-padding-y) 0', backgroundColor: 'var(--color-accent-tint)' }}
    data-ga-cta-location="blog_next_steps"
   >
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
     <h2
      className="text-2xl font-bold mb-4"
      style={{ color: 'var(--color-primary-dark)' }}
     >
      Discuss this with a specialist
     </h2>
     <p className="mb-3" style={{ color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
      If you or a family member is dealing with {post.category.toLowerCase()},
      the safest next step is a personal evaluation.{' '}
      <Link
       href="/contact"
       className="underline underline-offset-2 font-medium"
       style={{ color: 'var(--color-primary)' }}
       data-ga-event="book_appointment_click"
       data-ga-cta-text="Book an appointment"
      >
       Book an appointment with Dr. Varadharajan
      </Link>{' '}
      to review your reports and options.
     </p>
     <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
      <Link
       href="/contact"
       className="underline underline-offset-2 font-medium"
       style={{ color: 'var(--color-primary)' }}
       data-ga-event="cta_click"
       data-ga-cta-text="Clinic location and directions"
      >
       Find the clinic location, hours and directions
      </Link>{' '}
      at {siteConfig.clinicName}, Tharamani, Chennai.
     </p>
    </div>
   </section>

   {/* Sources */}
   <section
    className="w-full"
    style={{ padding: 'var(--section-padding-y) 0', backgroundColor: '#ffffff' }}
   >
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
     <h2
      className="text-2xl font-bold mb-4"
      style={{ color: 'var(--color-primary-dark)' }}
     >
      Sources and further reading
     </h2>
     <ul className="space-y-2">
      {post.citations.map((c) => (
       <li key={c.url}>
        <a
         href={c.url}
         target="_blank"
         rel="noopener"
         className="inline-flex items-center gap-1 underline underline-offset-2"
         style={{ color: 'var(--color-primary)' }}
        >
         {c.name}
         <ExternalLink size={13} aria-hidden="true" />
        </a>
       </li>
      ))}
     </ul>
    </div>
   </section>

   <FAQ items={faqItems} id="article-faq" />

   <RelatedBlock post={post} />

   <AuthorBox />

   {/* Disclaimer + red-flag line */}
   <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
    <p
     className="text-xs mb-3"
     style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}
    >
     <strong>Seek urgent medical care</strong> for severe bleeding, fever above
     100.4 F, breathing difficulty, chest pain, uncontrolled vomiting, a wound
     that opens or leaks, or any sudden worsening after surgery.
    </p>
    <p
     className="text-xs"
     style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}
    >
     This article is general medical information only. It is not a diagnosis
     and does not replace a consultation with your own oncologist or with Dr.
     Varadharajan V. Diagnosis, stage and fitness decide the right treatment
     for each person. In an emergency, go to the nearest hospital.
    </p>
   </div>

   <Location />
  </>
 );
}
