import { siteConfig } from '@/config/site';

// TODO(dr-review): domain cutover date from old iCareHeal site
const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true';

const aiCrawlers = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
  'Bingbot',
];

export function GET() {
  if (!allowIndexing) {
    return new Response('User-agent: *\nDisallow: /\n', {
      headers: { 'Content-Type': 'text/plain' },
    });
  }
  const lines = [
    '# Machine-readable site summaries for AI assistants:',
    `# ${siteConfig.url}/llms.txt`,
    `# ${siteConfig.url}/llms-full.txt`,
    '',
    ...aiCrawlers.flatMap((ua) => [`User-agent: ${ua}`, 'Allow: /', 'Disallow: /api/', '']),
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    '',
    `Sitemap: ${siteConfig.url}/sitemap.xml`,
  ];
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain' },
  });
}
