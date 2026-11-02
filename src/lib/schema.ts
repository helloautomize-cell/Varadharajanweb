import { siteConfig, allTreatments } from '@/config/site';
import { areaServedSchema } from '@/lib/areas';

const url = () => siteConfig.url;

const postalAddress = {
 '@type': 'PostalAddress',
 streetAddress: '110, Rajiv Gandhi Salai, OMR, Tharamani',
 addressLocality: 'Chennai',
 addressRegion: 'Tamil Nadu',
 postalCode: '600041',
 addressCountry: 'IN',
};

const geo = {
 '@type': 'GeoCoordinates',
 latitude: siteConfig.mapLat,
 longitude: siteConfig.mapLng,
};

const languages = siteConfig.languages.map((l) => ({
 '@type': 'Language',
 name: l.name,
 alternateName: l.code,
}));

const qualificationCredentials = [
 'M.Ch Surgical Oncology',
 'FIAGES',
 'FALS',
 'FMAS',
 'M.S General Surgery',
 'MBBS',
].map((name) => ({
 '@type': 'EducationalOccupationalCredential',
 credentialCategory: 'degree',
 name,
}));

function physicianNode() {
 return {
  '@type': 'Physician',
  '@id': `${url()}/#physician`,
  name: siteConfig.doctorName,
  honorificPrefix: 'Dr.',
  honorificSuffix: siteConfig.qualifications,
  description: siteConfig.credentials,
  medicalSpecialty: ['Oncologic', 'Surgical'],
  qualifications: siteConfig.qualifications,
  hasCredential: qualificationCredentials,
  alumniOf: [
   { '@type': 'CollegeOrUniversity', name: 'Sri Ramachandra Institute of Higher Education' },
   { '@type': 'Hospital', name: 'Gleneagles Global Health City' },
  ],
  identifier: {
   '@type': 'PropertyValue',
   propertyID: 'Tamil Nadu Medical Council Registration',
   value: '90663',
  },
  knowsLanguage: languages,
  memberOf: siteConfig.memberships.map((m) => ({
   '@type': 'Organization',
   name: m.name,
   alternateName: m.abbr,
  })),
  telephone: `+${siteConfig.phone}`,
  email: siteConfig.email,
  image: `${url()}/images/doctor/bio-photo.webp`,
  url: `${url()}/about`,
  worksFor: { '@id': `${url()}/#organization` },
  hospitalAffiliation: { '@id': `${url()}/#organization` },
  areaServed: areaServedSchema(),
  availableService: allTreatments.map((t) => ({
   '@id': `${url()}/services/${t.slug}#procedure`,
  })),
  contactPoint: [
   {
    '@type': 'ContactPoint',
    contactType: 'appointments',
    telephone: `+${siteConfig.phone}`,
   },
   {
    '@type': 'ContactPoint',
    contactType: 'video consultation',
    url: `https://wa.me/${siteConfig.whatsapp}`,
   },
  ],
  sameAs: [
   ...siteConfig.socialLinks.filter((s) => s.url).map((s) => s.url),
   siteConfig.googleBusinessProfile,
  ].filter(Boolean),
  address: postalAddress,
  geo,
 };
}

function organizationNode() {
 return {
  '@type': ['MedicalClinic', 'MedicalOrganization'],
  '@id': `${url()}/#organization`,
  name: siteConfig.clinicName,
  url: url(),
  logo: `${url()}/images/logo.png`,
  image: `${url()}/images/hospital/hospital-exterior.webp`,
  telephone: `+${siteConfig.phone}`,
  email: siteConfig.email,
  address: postalAddress,
  geo,
  hasMap: `https://www.google.com/maps/search/?api=1&query=${siteConfig.mapLat},${siteConfig.mapLng}`,
  openingHoursSpecification: {
   '@type': 'OpeningHoursSpecification',
   dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
   opens: '09:00',
   closes: '17:00',
  },
  medicalSpecialty: 'Oncologic',
  availableLanguage: languages,
  areaServed: areaServedSchema(),
  employee: { '@id': `${url()}/#physician` },
 };
}

function websiteNode() {
 return {
  '@type': 'WebSite',
  '@id': `${url()}/#website`,
  name: siteConfig.doctorName,
  url: url(),
  inLanguage: 'en-IN',
  publisher: { '@id': `${url()}/#organization` },
 };
}

export interface PageGraphOpts {
 path: string;
 name: string;
 description: string;
 image?: string;
 /** Breadcrumb labels; omit for home. */
 breadcrumbs?: { name: string; path: string }[];
 /** @id the page is "about", e.g. `${pageUrl}#procedure` on service pages. */
 aboutId?: string;
 /** Source/citation URLs the page content draws on. */
 citations?: string[];
 /** Extra nodes, e.g. MedicalProcedure, FAQPage. */
 extra?: object[];
 /** Include WebSite+Physician+Clinic nodes (default true, one graph per page). */
 includeSite?: boolean;
}

/**
 * The single JSON-LD @graph for a page: WebSite + Physician + Organization +
 * MedicalWebPage (+ BreadcrumbList) + any extras, all linked by stable @ids.
 */
export function pageGraph({
 path,
 name,
 description,
 image,
 breadcrumbs,
 aboutId,
 citations,
 extra = [],
 includeSite = true,
}: PageGraphOpts) {
 const pageUrl = `${url()}${path === '/' ? '' : path}`;
 const graph: object[] = [];
 if (includeSite) {
  graph.push(websiteNode(), physicianNode(), organizationNode());
 }
 graph.push({
  '@type': 'MedicalWebPage',
  '@id': `${pageUrl}/#webpage`,
  name,
  url: pageUrl || url(),
  description,
  isPartOf: { '@id': `${url()}/#website` },
  ...(aboutId ? { about: { '@id': aboutId } } : {}),
  audience: { '@type': 'PeopleAudience', audienceType: 'patients and caregivers' },
  author: { '@id': `${url()}/#physician` },
  reviewedBy: { '@id': `${url()}/#physician` },
  publisher: { '@id': `${url()}/#organization` },
  datePublished: siteConfig.firstPublished,
  dateModified: siteConfig.lastReviewed,
  lastReviewed: siteConfig.lastReviewed,
  inLanguage: 'en-IN',
  ...(image ? { primaryImageOfPage: `${url()}${image}` } : {}),
  ...(breadcrumbs ? { breadcrumb: { '@id': `${pageUrl}/#breadcrumb` } } : {}),
  ...(citations && citations.length > 0 ? { citation: citations } : {}),
 });
 if (breadcrumbs && breadcrumbs.length > 0) {
  graph.push({
   '@type': 'BreadcrumbList',
   '@id': `${pageUrl}/#breadcrumb`,
   itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: url() },
    ...breadcrumbs.map((b, i) => ({
     '@type': 'ListItem',
     position: i + 2,
     name: b.name,
     item: `${url()}${b.path}`,
    })),
   ],
  });
 }
 graph.push(...extra);
 return { '@context': 'https://schema.org', '@graph': graph };
}

/** Standalone graph with just the site entity nodes (e.g. for not-found). */
export function siteGraph() {
 return {
  '@context': 'https://schema.org',
  '@graph': [websiteNode(), physicianNode(), organizationNode()],
 };
}

export function procedureNode(
 slug: string,
 name: string,
 description: string,
 bodyLocation?: string,
 sameAs?: string[],
) {
 return {
  '@type': 'MedicalProcedure',
  '@id': `${url()}/services/${slug}#procedure`,
  name,
  description,
  procedureType: 'Surgical',
  ...(bodyLocation ? { bodyLocation } : {}),
  url: `${url()}/services/${slug}`,
  provider: { '@id': `${url()}/#physician` },
  ...(sameAs && sameAs.length > 0 ? { sameAs } : {}),
 };
}

export function faqNode(pageUrl: string, faqs: { question: string; answer: string }[]) {
 return {
  '@type': 'FAQPage',
  '@id': `${pageUrl}/#faq`,
  mainEntity: faqs.map((faq) => ({
   '@type': 'Question',
   name: faq.question,
   acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
 };
}

export interface ArticleGraphOpts {
 path: string;
 title: string;
 description: string;
 image: string;
 section: string;
 keywords: string[];
 wordCount: number;
 datePublished: string;
 dateModified: string;
 lastReviewed: string;
 about: { type: string; name: string };
 citations: { name: string; url: string }[];
 faqs: { q: string; a: string }[];
 breadcrumbs: { name: string; path: string }[];
}

/**
 * Blog article @graph: MedicalWebPage + BlogPosting + FAQPage + BreadcrumbList.
 * All @id values reuse the sitewide physician and clinic entities.
 */
export function articleGraph(o: ArticleGraphOpts) {
 const pageUrl = `${url()}${o.path}`;
 const imageUrl = `${url()}${o.image}`;
 const graph: object[] = [
  websiteNode(),
  physicianNode(),
  organizationNode(),
  {
   '@type': 'MedicalWebPage',
   '@id': `${pageUrl}#webpage`,
   name: o.title,
   url: pageUrl,
   description: o.description,
   isPartOf: { '@id': `${url()}/#website` },
   about: { '@id': `${pageUrl}#topic` },
   audience: { '@type': 'PeopleAudience', audienceType: 'patients and caregivers' },
   author: { '@id': `${url()}/#physician` },
   reviewedBy: { '@id': `${url()}/#physician` },
   publisher: { '@id': `${url()}/#organization` },
   lastReviewed: o.lastReviewed,
   inLanguage: 'en-IN',
   primaryImageOfPage: imageUrl,
   breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
  },
  {
   '@type': o.about.type,
   '@id': `${pageUrl}#topic`,
   name: o.about.name,
  },
  {
   '@type': 'BlogPosting',
   '@id': `${pageUrl}#article`,
   headline: o.title,
   description: o.description,
   image: imageUrl,
   author: { '@id': `${url()}/#physician` },
   publisher: { '@id': `${url()}/#organization` },
   datePublished: o.datePublished,
   dateModified: o.dateModified,
   mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
   inLanguage: 'en-IN',
   wordCount: o.wordCount,
   articleSection: o.section,
   keywords: o.keywords.join(', '),
   citation: o.citations.map((c) => ({
    '@type': 'CreativeWork',
    name: c.name,
    url: c.url,
   })),
  },
  {
   '@type': 'BreadcrumbList',
   '@id': `${pageUrl}#breadcrumb`,
   itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: url() },
    ...o.breadcrumbs.map((b, i) => ({
     '@type': 'ListItem',
     position: i + 2,
     name: b.name,
     item: `${url()}${b.path}`,
    })),
   ],
  },
  {
   '@type': 'FAQPage',
   '@id': `${pageUrl}#faq`,
   mainEntity: o.faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
   })),
  },
 ];
 return { '@context': 'https://schema.org', '@graph': graph };
}

/** /blog index @graph: CollectionPage + ItemList of all articles. */
export function blogIndexGraph(items: { slug: string; title: string }[]) {
 const pageUrl = `${url()}/blog`;
 return {
  '@context': 'https://schema.org',
  '@graph': [
   websiteNode(),
   physicianNode(),
   organizationNode(),
   {
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#webpage`,
    name: 'Blog: Cancer Surgery Guides and Patient Resources',
    url: pageUrl,
    isPartOf: { '@id': `${url()}/#website` },
    about: { '@id': `${url()}/#physician` },
    inLanguage: 'en-IN',
    mainEntity: { '@id': `${pageUrl}#itemlist` },
   },
   {
    '@type': 'ItemList',
    '@id': `${pageUrl}#itemlist`,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
     '@type': 'ListItem',
     position: i + 1,
     name: it.title,
     url: `${url()}/blog/${it.slug}`,
    })),
   },
   {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: [
     { '@type': 'ListItem', position: 1, name: 'Home', item: url() },
     { '@type': 'ListItem', position: 2, name: 'Blog', item: pageUrl },
    ],
   },
  ],
 };
}
