import { siteConfig } from '@/config/site';

const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING !== 'false';

const aiCrawlers = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Bingbot',
];

const creditComment =
  '# Website by Automize Media Labs - https://www.automizemedialabs.com/';

export function GET() {
  if (!allowIndexing) {
    return new Response(`${creditComment}\nUser-agent: *\nDisallow: /\n`, {
      headers: { 'Content-Type': 'text/plain' },
    });
  }
  const lines = [
    creditComment,
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
