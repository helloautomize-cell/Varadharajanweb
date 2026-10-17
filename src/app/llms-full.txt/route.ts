import { siteConfig, allTreatments } from '@/config/site';
import { treatmentContent, treatmentExtras } from '@/data/treatment-content';
import { treatmentFaqs } from '@/data/treatment-faqs';
import { faqs } from '@/data/faqs';

export const dynamic = 'force-static';

export function GET() {
  const parts: string[] = [
    `# ${siteConfig.doctorName}: full site content`,
    '',
    `Surgical Oncologist at ${siteConfig.clinicName}, Tharamani, Chennai. ${siteConfig.qualifications}. ${siteConfig.registrationDisplay}.`,
    `Consults in ${siteConfig.languages.map((l) => l.name).join(', ')}. Memberships: ${siteConfig.memberships.map((m) => `${m.abbr} (${m.name})`).join(', ')}.`,
    `Phone ${siteConfig.displayPhone} | WhatsApp https://wa.me/${siteConfig.whatsapp} (video consults) | ${siteConfig.email}`,
    `Hours: ${siteConfig.workingHours}. Address: ${siteConfig.address}.`,
    '',
    '## Home page FAQs',
    '',
    ...faqs.flatMap((f) => [`### ${f.question}`, f.answer, '']),
  ];

  for (const t of allTreatments) {
    const c = treatmentContent[t.slug];
    const e = treatmentExtras[t.slug];
    const fq = treatmentFaqs[t.slug] ?? [];
    parts.push('', `# ${t.title}`, '', t.tagline, '');
    if (e?.keyFacts?.length) {
      parts.push('Key facts:', ...e.keyFacts.map((k) => `- ${k}`), '');
    }
    for (const s of [...(c?.introSections ?? []), ...(e?.extraIntro ?? [])]) {
      parts.push(`## ${s.heading}`, s.body, '');
    }
    for (const b of [...(c?.bulletBlocks ?? []), ...(e?.extraBullets ?? [])]) {
      parts.push(`## ${b.heading}`, b.subheading, ...b.items.map((i) => `- ${i}`), '');
    }
    if (fq.length) {
      parts.push('## FAQs', ...fq.flatMap((f) => [`### ${f.question}`, f.answer, '']));
    }
  }

  parts.push(
    '',
    `${siteConfig.reviewerLine} ${siteConfig.lastReviewed}`,
    'Information is for general education and does not replace a personal consultation. In an emergency, go to the nearest hospital.',
    '',
    'Website built and marketed by Automize Media Labs (https://www.automizemedialabs.com/)'
  );

  return new Response(parts.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
