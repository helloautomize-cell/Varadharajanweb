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
  url: url(),
  worksFor: { '@id': `${url()}/#clinic` },
  hospitalAffiliation: { '@id': `${url()}/#clinic` },
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

function clinicNode() {
 return {
  '@type': ['MedicalClinic', 'MedicalOrganization'],
  '@id': `${url()}/#clinic`,
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
  publisher: { '@id': `${url()}/#physician` },
 };
}

/** Sitewide @graph emitted from the root layout: WebSite + Physician + Clinic. */
export function siteGraph() {
 return {
  '@context': 'https://schema.org',
  '@graph': [websiteNode(), physicianNode(), clinicNode()],
 };
}

export interface PageGraphOpts {
 path: string;
 name: string;
 description: string;
 image?: string;
 /** Breadcrumb labels; omit for home. */
 breadcrumbs?: { name: string; path: string }[];
 /** Extra nodes, e.g. MedicalProcedure, FAQPage. */
 extra?: object[];
}

/** Per-page @graph: MedicalWebPage (+ BreadcrumbList on inner pages) + extras. */
export function pageGraph({ path, name, description, image, breadcrumbs, extra = [] }: PageGraphOpts) {
 const pageUrl = `${url()}${path}`;
 const graph: object[] = [
  {
   '@type': 'MedicalWebPage',
   '@id': `${pageUrl}#webpage`,
   name,
   url: pageUrl,
   description,
   isPartOf: { '@id': `${url()}/#website` },
   about: name,
   audience: { '@type': 'Patient' },
   reviewedBy: { '@id': `${url()}/#physician` },
   lastReviewed: siteConfig.lastReviewed,
   inLanguage: 'en-IN',
   ...(image ? { primaryImageOfPage: `${url()}${image}` } : {}),
   ...(breadcrumbs ? { breadcrumb: { '@id': `${pageUrl}#breadcrumb` } } : {}),
  },
 ];
 if (breadcrumbs && breadcrumbs.length > 0) {
  graph.push({
   '@type': 'BreadcrumbList',
   '@id': `${pageUrl}#breadcrumb`,
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

export function procedureNode(slug: string, name: string, description: string, bodyLocation?: string) {
 return {
  '@type': 'MedicalProcedure',
  '@id': `${url()}/services/${slug}#procedure`,
  name,
  description,
  procedureType: 'Surgical',
  ...(bodyLocation ? { bodyLocation } : {}),
  url: `${url()}/services/${slug}`,
  provider: { '@id': `${url()}/#physician` },
 };
}

export function faqNode(faqs: { question: string; answer: string }[]) {
 return {
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
   '@type': 'Question',
   name: faq.question,
   acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
 };
}
