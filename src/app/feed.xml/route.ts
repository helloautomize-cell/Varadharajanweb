import { siteConfig } from '@/config/site';
import { posts, POSTS_DATE_PUBLISHED } from '@/lib/blog';

export const dynamic = 'force-static';

const esc = (s: string) =>
 s
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

export function GET() {
 const pubDate = new Date(POSTS_DATE_PUBLISHED).toUTCString();
 const items = posts
  .map(
   (p) => `  <item>
   <title>${esc(p.title)}</title>
   <link>${siteConfig.url}/blog/${p.slug}</link>
   <guid isPermaLink="true">${siteConfig.url}/blog/${p.slug}</guid>
   <description>${esc(p.description)}</description>
   <pubDate>${pubDate}</pubDate>
   <category>${esc(p.category)}</category>
   <author>${siteConfig.email} (${esc(siteConfig.doctorName)})</author>
  </item>`
  )
  .join('\n');

 const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
 <channel>
  <title>${esc(siteConfig.doctorName)}: Cancer Surgery Blog</title>
  <link>${siteConfig.url}/blog</link>
  <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml"/>
  <description>Medically reviewed articles on cancer surgery, screening and recovery by ${esc(siteConfig.doctorName)}, surgical oncologist in Chennai.</description>
  <language>en-in</language>
  <lastBuildDate>${pubDate}</lastBuildDate>
${items}
 </channel>
</rss>`;

 return new Response(xml, {
  headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
 });
}
