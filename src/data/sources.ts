// Authoritative external references per service page. Every URL verified live
// (HTTP 200) on 24 Oct 2026. NCI = US National Cancer Institute, WHO fact sheet.

export const WHO_CANCER_FACT_SHEET =
 'https://www.who.int/news-room/fact-sheets/detail/cancer';

const NCI = {
 breast: 'https://www.cancer.gov/types/breast/treatment',
 colon: 'https://www.cancer.gov/types/colorectal/patient/colon-treatment-pdq',
 stomach: 'https://www.cancer.gov/types/stomach/treatment',
 ovarian:
  'https://www.cancer.gov/types/ovarian/patient/ovarian-epithelial-treatment-pdq',
 nsclc:
  'https://www.cancer.gov/types/lung/patient/non-small-cell-lung-treatment-pdq',
 headNeck:
  'https://www.cancer.gov/types/head-and-neck/head-neck-fact-sheet',
 cervical: 'https://www.cancer.gov/types/cervical/treatment',
 endometrial: 'https://www.cancer.gov/types/uterine/endometrial/treatment',
 sarcoma: 'https://www.cancer.gov/types/soft-tissue-sarcoma',
 hipecDef:
  'https://www.cancer.gov/publications/dictionaries/cancer-terms/def/hyperthermic-intraperitoneal-chemotherapy',
};

/** External sources shown in the "Sources and further reading" block per page. */
export const treatmentSources: Record<string, string[]> = {
 'surgical-oncology': [WHO_CANCER_FACT_SHEET],
 'breast-cancer-surgeries': [NCI.breast, WHO_CANCER_FACT_SHEET],
 'breast-oncoplasty': [NCI.breast, WHO_CANCER_FACT_SHEET],
 'benign-breast-condition-surgery': [NCI.breast],
 'gi-oncology': [NCI.colon, NCI.stomach, WHO_CANCER_FACT_SHEET],
 hipec: [NCI.hipecDef, NCI.ovarian, NCI.colon],
 'laparoscopic-robotic-gi-surgery': [NCI.colon, NCI.stomach],
 'retroperitoneal-tumor-surgery': [NCI.sarcoma],
 'minimal-access-surgery': [WHO_CANCER_FACT_SHEET],
 'gynaecological-malignancies': [NCI.ovarian, NCI.cervical, NCI.endometrial],
 'thoracic-cancer': [NCI.nsclc, WHO_CANCER_FACT_SHEET],
 'vats-lobectomy': [NCI.nsclc],
 'head-and-neck-cancer': [NCI.headNeck, WHO_CANCER_FACT_SHEET],
 'complex-head-neck-resection': [NCI.headNeck],
};

/** Wikipedia entity links for MedicalProcedure schema sameAs. */
export const procedureSameAs: Record<string, string[]> = {
 'surgical-oncology': ['https://en.wikipedia.org/wiki/Surgical_oncology'],
 'breast-cancer-surgeries': ['https://en.wikipedia.org/wiki/Breast_cancer'],
 'breast-oncoplasty': ['https://en.wikipedia.org/wiki/Breast_reconstruction'],
 'benign-breast-condition-surgery': ['https://en.wikipedia.org/wiki/Fibroadenoma'],
 'gi-oncology': ['https://en.wikipedia.org/wiki/Gastrointestinal_cancer'],
 hipec: [
  'https://en.wikipedia.org/wiki/Hyperthermic_intraperitoneal_chemotherapy',
 ],
 'laparoscopic-robotic-gi-surgery': ['https://en.wikipedia.org/wiki/Laparoscopy'],
 'retroperitoneal-tumor-surgery': ['https://en.wikipedia.org/wiki/Retroperitoneum'],
 'minimal-access-surgery': [
  'https://en.wikipedia.org/wiki/Minimally_invasive_procedure',
 ],
 'gynaecological-malignancies': [
  'https://en.wikipedia.org/wiki/Gynaecologic_oncology',
 ],
 'thoracic-cancer': ['https://en.wikipedia.org/wiki/Lung_cancer'],
 'vats-lobectomy': [
  'https://en.wikipedia.org/wiki/Video-assisted_thoracoscopic_surgery',
 ],
 'head-and-neck-cancer': ['https://en.wikipedia.org/wiki/Head_and_neck_cancer'],
 'complex-head-neck-resection': ['https://en.wikipedia.org/wiki/Free_flap'],
};

/** Short label for a source URL, for the visible Sources list. */
export function sourceLabel(url: string): string {
 if (url.includes('who.int')) return 'WHO cancer fact sheet';
 if (url.includes('cancer.gov')) {
  return 'National Cancer Institute (cancer.gov)';
 }
 if (url.includes('wikipedia.org')) return 'Wikipedia';
 return url;
}
