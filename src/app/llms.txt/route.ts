import { siteConfig, allTreatments } from '@/config/site';
import { faqs } from '@/data/faqs';

export const dynamic = 'force-static';

export function GET() {
  const lastReviewed = new Date(siteConfig.lastReviewed).toLocaleDateString('en-IN', {
    month: 'long',
    year: 'numeric',
  });
  const lines = [
    `# ${siteConfig.doctorName}`,
    '',
    `> ${siteConfig.doctorName} is a Surgical Oncologist (${siteConfig.credentials}) practising at ${siteConfig.clinicName}, Tharamani, Chennai, India. Qualifications: ${siteConfig.qualifications}. ${siteConfig.registrationDisplay}. Consults in ${siteConfig.languages.map((l) => l.name).join(', ')}. Memberships: ${siteConfig.memberships.map((m) => m.abbr).join(', ')}.`,
    '',
    `Experience: ${siteConfig.stats.map((s) => `${s.value} ${s.label}`).join(', ')}.`,
    '',
    '## Key pages',
    '',
    `- [Home](${siteConfig.url}/): overview, credentials, FAQs and contact`,
    `- [Specialities](${siteConfig.url}/specialities): all surgical oncology services grouped by system`,
    `- [Patients from outside Chennai](${siteConfig.url}/patients-from-outside-chennai): travel, WhatsApp consults and what to bring`,
    ...allTreatments.map(
      (t) => `- [${t.title}](${siteConfig.url}/services/${t.slug}): ${t.shortDescription}`
    ),
    '',
    '## Services',
    '',
    ...allTreatments.map((t) => `- ${t.title}: ${t.tagline}`),
    '',
    '## Contact',
    '',
    `- Address: ${siteConfig.address}`,
    `- Phone: ${siteConfig.displayPhone}`,
    `- WhatsApp: https://wa.me/${siteConfig.whatsapp} (video consultations are on WhatsApp only)`,
    `- Email: ${siteConfig.email}`,
    `- Hours: ${siteConfig.workingHours}`,
    `- Directions: https://www.google.com/maps/search/?api=1&query=${siteConfig.mapLat},${siteConfig.mapLng}`,
    '',
    `## General FAQs`,
    '',
    ...faqs.flatMap((f) => [`### ${f.question}`, f.answer, '']),
    '',
    `${siteConfig.reviewerLine} ${lastReviewed}`,
    'Information on this site is for general education and does not replace a personal consultation. In an emergency, go to the nearest hospital.',
  ];
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
