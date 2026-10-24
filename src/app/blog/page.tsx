import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { posts, clusters, supportsOf, pillars, type BlogPost } from '@/lib/blog';
import { blogIndexGraph } from '@/lib/schema';
import { siteConfig } from '@/config/site';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
 title: { absolute: 'Blog: Cancer Surgery Guides | Dr Varadharajan V' },
 description:
  'Clear, medically reviewed guides on cancer surgery, screening and recovery by Dr. Varadharajan V, surgical oncologist in Chennai.',
 alternates: { canonical: '/blog' },
 openGraph: {
  type: 'website',
  title: 'Blog: Cancer Surgery Guides | Dr Varadharajan V',
  description:
   'Clear, medically reviewed guides on cancer surgery, screening and recovery by Dr. Varadharajan V, surgical oncologist in Chennai.',
  images: [{ url: '/og/og-default.webp', width: 1200, height: 630 }],
 },
};

function PostCard({ post }: { post: BlogPost }) {
 return (
  <Link
   href={`/blog/${post.slug}`}
   className="block rounded-2xl overflow-hidden card-hover h-full"
   style={{
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
   }}
  >
   <div className="w-full overflow-hidden">
    <Image
     src={`/blog/${post.slug}.webp`}
     alt={post.imageAlt}
     width={1280}
     height={720}
     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
     className="object-cover w-full h-auto"
    />
   </div>
   <div className="p-5">
    <p
     className="text-xs font-medium uppercase tracking-wide mb-2"
     style={{ color: 'var(--color-primary)' }}
    >
     {post.type === 'pillar' ? 'Complete guide' : post.category}
    </p>
    <h3
     className="font-bold mb-2 leading-snug"
     style={{ color: 'var(--color-primary-dark)' }}
    >
     {post.title}
    </h3>
    <p
     className="text-sm"
     style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}
    >
     {post.description}
    </p>
   </div>
  </Link>
 );
}

export default function BlogIndex() {
 const graph = blogIndexGraph(posts.map((p) => ({ slug: p.slug, title: p.title })));

 return (
  <>
   <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
   />
   <section
    className="w-full"
    style={{
     padding: 'var(--section-padding-y) 0',
     background: 'linear-gradient(135deg, var(--color-accent-tint) 0%, white 100%)',
    }}
   >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     <Breadcrumbs items={[{ name: 'Blog', path: '/blog' }]} />
     <h1
      className="text-4xl sm:text-5xl font-bold leading-tight mb-4"
      style={{ color: 'var(--color-primary-dark)' }}
     >
      Cancer Surgery Blog
     </h1>
     <p
      className="text-lg max-w-2xl"
      style={{ color: 'var(--color-text-muted)', lineHeight: '1.7' }}
     >
      Medically reviewed guides on cancer surgery, screening and recovery,
      written by {siteConfig.doctorName}, {siteConfig.specialty} at{' '}
      {siteConfig.clinicName}, Chennai. Each cluster starts with a complete
      guide followed by focused articles.
     </p>
    </div>
   </section>

   {clusters.map((cluster, i) => {
    const pillar = pillars.find((p) => p.cluster === cluster.n)!;
    const subs = supportsOf(pillar);
    return (
     <section
      key={cluster.n}
      id={cluster.anchor}
      className="w-full"
      style={{
       padding: 'var(--section-padding-y) 0',
       backgroundColor: i % 2 === 0 ? '#ffffff' : 'var(--color-off-white)',
      }}
     >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <h2
        className="text-2xl sm:text-3xl font-bold mb-8"
        style={{ color: 'var(--color-primary-dark)' }}
       >
        {cluster.name}
       </h2>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[pillar, ...subs].map((p) => (
         <PostCard key={p.slug} post={p} />
        ))}
       </div>
      </div>
     </section>
    );
   })}
  </>
 );
}
