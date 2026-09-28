export interface Specialization {
 id: string;
 title: string;
 description: string;
 icon?: string;
 image?: string;
}

export interface Service {
 id: string;
 title: string;
 description: string;
 image?: string;
 price?: string;
}

export interface DoctorStat {
 id: string;
 label: string;
 value: string | number;
 icon?: string;
}

export interface Review {
 id: string;
 patientName: string;
 rating: number;
 comment: string;
 date?: string;
 treatment?: string;
}

export interface Update {
 id: string;
 title: string;
 description: string;
 image?: string;
 date?: string;
 type?: 'offer' | 'news' | 'event';
}

export interface FAQ {
 id: string;
 question: string;
 answer: string;
 category?: string;
}

export interface GalleryImage {
 id: string;
 src: string;
 alt: string;
 caption?: string;
 category?: string;
}

export interface SocialLink {
 platform: 'facebook' | 'linkedin' | 'instagram' | 'twitter' | 'youtube';
 url: string;
}

export interface SiteConfig {
 doctorName: string;
 credentials: string;
 qualifications: string;
 licenceNumber: string;
 specialty: string;
 phone: string;
 displayPhone: string;
 email: string;
 whatsapp: string;
 googleBusinessProfile: string;
 clinicName: string;
 address: string;
 mapLat: number;
 mapLng: number;
 workingHours: string;
 url: string;
 registrationDisplay: string;
 languages: { code: string; name: string }[];
 memberships: { abbr: string; name: string }[];
 stats: { value: string; label: string }[];
 reviewerLine: string;
 lastReviewed: string;
 heroHeadline: string;
 heroSubheading: string;
 bioLongForm: string;
 visionLongForm: string;
 socialLinks: SocialLink[];
 specializations: Specialization[];
 services: Service[];
 doctorStats: DoctorStat[];
 reviews: Review[];
 updates: Update[];
 faqs: FAQ[];
 galleryImages: GalleryImage[];
}

export type TreatmentCategory =
 | 'General'
 | 'Breast'
 | 'GI & Abdominal'
 | 'Gynae, Thoracic & Head-Neck';

export interface Treatment {
 slug: string;
 title: string;
 category: TreatmentCategory;
 shortDescription: string;
 tagline: string;
 hasFullContent: boolean;
}

export const allTreatments: Treatment[] = [
 {
  slug: 'surgical-oncology',
  title: 'Surgical Oncology',
  category: 'General',
  shortDescription: 'General surgical oncology care spanning breast, GI, gynaecological, thoracic and peritoneal cancers.',
  tagline: 'Comprehensive surgical treatment across all major cancer types.',
  hasFullContent: true,
 },
 {
  slug: 'breast-cancer-surgeries',
  title: 'Breast Cancer Surgeries',
  category: 'Breast',
  shortDescription: 'Surgical removal of breast tumours with focus on preservation and aesthetics.',
  tagline: 'Surgical treatment planned around both cure and quality of life',
  hasFullContent: true,
 },
 {
  slug: 'breast-oncoplasty',
  title: 'Breast Oncoplasty',
  category: 'Breast',
  shortDescription: 'Combines cancer removal with cosmetic reconstruction for optimal appearance.',
  tagline: 'Removing the tumour while preserving the natural shape of the breast',
  hasFullContent: true,
 },
 {
  slug: 'benign-breast-condition-surgery',
  title: 'Benign Breast Condition Surgery',
  category: 'Breast',
  shortDescription: 'Treatment of non-cancerous breast conditions using minimally invasive techniques.',
  tagline: 'Careful evaluation and treatment for non-cancerous breast changes',
  hasFullContent: true,
 },
 {
  slug: 'gi-oncology',
  title: 'GI Oncology',
  category: 'GI & Abdominal',
  shortDescription: 'Comprehensive surgical treatment for gastrointestinal cancers and tumors.',
  tagline: 'Surgical management of stomach, colorectal, liver, and pancreatic cancers',
  hasFullContent: true,
 },
 {
  slug: 'hipec',
  title: 'HIPEC',
  category: 'GI & Abdominal',
  shortDescription: 'Advanced heated chemotherapy delivered directly during abdominal surgery.',
  tagline: 'Heated chemotherapy delivered directly where microscopic disease remains.',
  hasFullContent: true,
 },
 {
  slug: 'laparoscopic-robotic-gi-surgery',
  title: 'Laparoscopic & Robotic GI Surgery',
  category: 'GI & Abdominal',
  shortDescription: 'Minimally invasive cancer surgery using advanced robotic technology.',
  tagline: 'Minimally invasive GI surgery with enhanced precision and faster recovery.',
  hasFullContent: true,
 },
 {
  slug: 'retroperitoneal-tumor-surgery',
  title: 'Retroperitoneal Tumor Surgery',
  category: 'GI & Abdominal',
  shortDescription: 'Specialized surgery for tumors located in the retroperitoneal space.',
  tagline: 'Specialised surgery for tumours in a technically demanding part of the abdomen',
  hasFullContent: true,
 },
 {
  slug: 'minimal-access-surgery',
  title: 'Minimal Access Surgery',
  category: 'GI & Abdominal',
  shortDescription: 'Less invasive cancer surgery with faster recovery and smaller incisions.',
  tagline: 'Keyhole techniques that reduce trauma without compromising cancer care',
  hasFullContent: true,
 },
 {
  slug: 'gynaecological-malignancies',
  title: 'Gynaecological Malignancies',
  category: 'Gynae, Thoracic & Head-Neck',
  shortDescription: 'Surgical treatment for cancers of the female reproductive system.',
  tagline: 'Surgical care for cancers of the female reproductive system',
  hasFullContent: true,
 },
 {
  slug: 'thoracic-cancer',
  title: 'Thoracic Cancer',
  category: 'Gynae, Thoracic & Head-Neck',
  shortDescription: 'Comprehensive surgery for lung and chest cavity cancers.',
  tagline: 'Surgical treatment for cancers of the lungs and chest cavity',
  hasFullContent: true,
 },
 {
  slug: 'vats-lobectomy',
  title: 'VATS Lobectomy',
  category: 'Gynae, Thoracic & Head-Neck',
  shortDescription: 'Minimally invasive lung surgery using video-assisted techniques.',
  tagline: 'Removing a diseased lung lobe through small incisions, guided by camera',
  hasFullContent: true,
 },
 {
  slug: 'head-and-neck-cancer',
  title: 'Head and Neck Cancer',
  category: 'Gynae, Thoracic & Head-Neck',
  shortDescription: 'Surgical treatment for oral, throat, thyroid, and neck cancers, from early-stage to advanced disease.',
  tagline: 'Complete surgical care for cancers of the mouth, throat, and neck.',
  hasFullContent: true,
 },
 {
  slug: 'complex-head-neck-resection',
  title: 'Complex Head & Neck Resection',
  category: 'Gynae, Thoracic & Head-Neck',
  shortDescription: 'Advanced surgery for head and neck cancers with functional preservation.',
  tagline: 'Advanced resection and microvascular reconstruction preserving function and appearance.',
  hasFullContent: true,
 },
];

export const treatmentCategories: { id: TreatmentCategory; label: string }[] = [
 { id: 'General', label: 'General' },
 { id: 'Breast', label: 'Breast' },
 { id: 'GI & Abdominal', label: 'GI & Abdominal' },
 { id: 'Gynae, Thoracic & Head-Neck', label: 'Gynae, Thoracic & Head-Neck' },
];

export function categoryAnchor(category: TreatmentCategory): string {
 return category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export const siteConfig: SiteConfig = {
 doctorName: "Dr. Varadharajan V",
 credentials: "Surgical Oncologist, Breast Oncologist, Head & Neck Oncologist",
 qualifications: "M.Ch Surgical Oncology, FIAGES, FALS, FMAS, M.S General Surgery, MBBS",
 licenceNumber: "90663-TNMC",
 specialty: "Surgical Oncology",
 phone: "919444264315",
 displayPhone: "+91 94442 64315",
 email: "dr.varadharajan@gmail.com",
 whatsapp: "919444264315",
 googleBusinessProfile: "https://share.google/BGRsV105dewQtEwIf",
 clinicName: "Iswarya Hospital",
 address: "110, Rajiv Gandhi Salai, OMR, Tharamani, Chennai 600041, Tamil Nadu",
 mapLat: 12.9803155,
 mapLng: 80.2529862,
 workingHours: "Mon to Sat, 9:00 AM to 5:00 PM · Sunday closed",
 // TODO(dr-review): domain cutover date from old iCareHeal site
 url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://drvaradharajan.com",
 registrationDisplay: "Tamil Nadu Medical Council Reg. No. 90663",
 languages: [
  { code: "en", name: "English" },
  { code: "ta", name: "Tamil" },
  { code: "hi", name: "Hindi" },
  { code: "te", name: "Telugu" },
  { code: "kn", name: "Kannada" },
 ],
 memberships: [
  { abbr: "IAGES", name: "Indian Association of Gastrointestinal Endoscopic Surgeons" },
  { abbr: "AMASI", name: "Association of Minimal Access Surgeons of India" },
  { abbr: "IASO", name: "Indian Association of Surgical Oncology" },
  { abbr: "SSO", name: "Society of Surgical Oncology" },
 ],
 stats: [
  { value: "5,000+", label: "breast surgeries" },
  { value: "3,500+", label: "minimal access surgeries" },
  { value: "25,000+", label: "lives touched" },
 ],
 reviewerLine:
  "Medically reviewed by Dr. Varadharajan V, Surgical Oncologist (M.Ch Surgical Oncology), Iswarya Hospital, Chennai, Tamil Nadu, India · Tamil Nadu Medical Council Reg. No. 90663 · Last reviewed:",
 lastReviewed: "2026-09-28",
 heroHeadline: "Integrated Oncosurgical Care in Chennai",
 heroSubheading: "Multi-organ cancer care with advanced robotic and minimally invasive techniques.",
 bioLongForm: "Dr. Varadharajan V is a highly trained Surgical Oncologist committed to delivering ethical, patient-centric, and evidence-based cancer care. With strong academic credentials and extensive hands-on experience across multiple oncological subspecialties, he is skilled in managing a wide spectrum of malignancies, including breast, gastrointestinal, gynecologic, and peritoneal surface cancers. His clinical foundation comes from institutions such as Sri Ramachandra Institute of Higher Education and Gleneagles Global Health City, where he has served in senior oncology roles. His professional journey reflects a blend of clinical expertise, academic dedication, and surgical excellence. He has presented numerous papers at national and international oncology conferences including ASCO, ESMO, ESSO, IFHNOS, and NATCON, demonstrating his commitment to advancing oncologic knowledge. His publications in reputed indexed journals like the Indian Journal of Surgical Oncology, BMJ Case Reports, Frontiers in Health Informatics, and Diagnostic Pathology highlight his contributions to research and innovation. Known for his meticulous approach, integrity, and compassionate patient care, Dr. Varadharajan consistently strives to improve patient outcomes through evidence-based practice and advanced surgical techniques. He remains deeply committed to continuous learning, innovation, and contributing to the global oncology community.",
 visionLongForm: "Dr. Varadharajan's vision is rooted in delivering oncology care that is ethical, precise, and centred around the patient's holistic wellbeing. He believes that modern surgical oncology must combine scientific rigor with compassion, ensuring that every individual receives personalised, evidence-based treatment tailored to their diagnosis and clinical needs. His commitment extends beyond surgery, focusing on early detection, multidisciplinary planning, and long-term survivorship support. His expertise covers a wide range of cancers, with strong proficiency in breast oncology, gastrointestinal malignancies, gynecological oncology, and peritoneal surface cancers. He has trained extensively in minimally invasive and robotic oncosurgical techniques, which allow for faster recovery, better cosmetic outcomes, and reduced surgical morbidity. His fellowship training with FIAGES, FALS, and FMAS further strengthens his operative skillset in advanced laparoscopic and endoscopic procedures. Dr. Varadharajan remains actively involved in academic oncology, contributing through research publications, international conference presentations, and collaborative studies. His work reflects a dedication to innovation and continual improvement in cancer care. Guided by integrity, professionalism, and empathy, he aims to empower patients and their families with clarity, confidence, and the highest quality of oncologic treatment.",
 socialLinks: [
  { platform: 'facebook', url: 'https://www.facebook.com/dr.varadharajan/' },
  { platform: 'linkedin', url: 'https://www.linkedin.com/in/dr-varadharajan-vijayakumar-9b205224/' },
  { platform: 'instagram', url: 'https://www.instagram.com/answers.to.cancer?utm_source=qr&igsh=MXI1ZHhlZndtcHZoZg%3D%3D' },
 ],
 specializations: [],
 services: [],
 doctorStats: [],
 reviews: [],
 updates: [],
 faqs: [],
 galleryImages: [],
};