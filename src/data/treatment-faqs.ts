import type { FaqItem } from './faqs';

export const treatmentFaqs: Record<string, FaqItem[]> = {
 'surgical-oncology': [
  {
   question: 'How do I know if my cancer can be treated with surgery?',
   answer: 'Operability is determined through staging scans, biopsy results, and your overall fitness for an operation. Dr. Varadharajan V reviews all imaging and reports, and major decisions are confirmed through a multidisciplinary tumour board before any procedure is recommended. If surgery is not the right option, that is discussed honestly along with the alternatives.',
  },
  {
   question: 'Will surgery be my only treatment?',
   answer: 'Not usually. Most cancer treatment plans combine surgery with chemotherapy, radiation, or other therapies, sequenced according to your diagnosis. Surgery may come first, follow chemotherapy given to shrink a tumour, or be paired with radiation afterward. Your plan is decided at a multidisciplinary review so every treatment step supports the others.',
  },
  {
   question: 'Will my operation be open or minimally invasive?',
   answer: 'It depends on the tumour, its location, and your overall health. Laparoscopic and robotic techniques are used wherever they can achieve the same complete removal as open surgery, offering smaller incisions and faster recovery. For very large or complex tumours, open surgery may still be the safer choice. The recommendation is always based on your specific case.',
  },
  {
   question: 'What happens at a first surgical consultation?',
   answer: 'Your scans, biopsy reports, and medical history are reviewed in detail. Dr. Varadharajan V explains whether surgery is appropriate, what the procedure involves, and what recovery looks like, with time for your questions. You leave with a clear written plan you can share with family or other doctors involved in your care.',
  },
 ],
 'breast-cancer-surgeries': [
  {
   question: 'Will I need a mastectomy, or can my breast be conserved?',
   answer: 'The choice depends on tumour size, location, type, and your own preference. There is no single rule. Many patients are suitable for breast-conserving surgery (lumpectomy), sometimes with oncoplastic reshaping for a better cosmetic result. Mastectomy is recommended only when conservation would compromise safe margins or when you prefer it. Both options are explained fully before you decide.',
  },
  {
   question: 'What is a sentinel lymph node biopsy?',
   answer: 'It is a technique that checks only the first lymph node the cancer would drain to, rather than removing many nodes automatically. If that node is clear, further node removal is usually unnecessary, which significantly lowers the risk of long-term arm swelling (lymphoedema). It has become a standard part of breast cancer surgery where appropriate.',
  },
  {
   question: 'Can chemotherapy be given before breast surgery?',
   answer: 'Yes. For some larger tumours, chemotherapy first (neoadjuvant therapy) can shrink the cancer, sometimes making breast conservation possible where it otherwise would not be. Whether this applies to you depends on tumour type and stage, and it is decided through multidisciplinary review before your operation is scheduled.',
  },
  {
   question: 'How long is recovery after breast cancer surgery?',
   answer: 'Most patients go home within a day or two after breast-conserving surgery; mastectomy may mean a slightly longer stay. A temporary drain is sometimes placed after larger operations, and gentle arm exercises begin early to protect shoulder mobility. The pathology report on the removed tissue then guides whether radiation or further treatment is needed.',
  },
 ],
 'benign-breast-condition-surgery': [
  {
   question: 'Does a breast lump mean I have cancer?',
   answer: 'No, most breast lumps turn out to be benign conditions such as fibroadenomas, cysts, or fibrocystic change. However, no lump can be confirmed as benign without proper evaluation, so any new lump, persistent pain, or nipple discharge deserves a clinical examination and imaging rather than being assumed harmless.',
  },
  {
   question: 'Do all benign lumps need to be removed?',
   answer: 'Not necessarily. Small, stable lumps that cause no symptoms can often be observed safely with periodic examination and imaging. Removal is recommended when a lump is enlarging, causing persistent discomfort, producing uncertain biopsy results, or when you would simply prefer the reassurance of having it taken out.',
  },
  {
   question: 'Is removing a benign lump a major operation?',
   answer: 'Usually not. Most benign breast excisions are day procedures done through a small, well-placed incision under local or short general anaesthesia. Normal activity typically resumes within a few days, and the scar fades gradually. The removed tissue is always sent for pathology to confirm the benign diagnosis.',
  },
  {
   question: 'Will the lump come back after it is removed?',
   answer: 'Most benign lumps do not recur after complete excision. The pathology report confirms the diagnosis and that the lump was fully removed, and routine follow-up checks that the area has settled. Any new lump that appears later should still be evaluated on its own merits.',
  },
 ],
 'breast-oncoplasty': [
  {
   question: 'Who is a good candidate for breast oncoplasty?',
   answer: 'Oncoplasty is especially useful for moderate to large tumours relative to breast size, tumours in cosmetically sensitive areas, and patients who want to avoid mastectomy. Suitability depends on achieving clear cancer margins, the tumour removal always takes priority, and reshaping is built around whatever margin is required.',
  },
  {
   question: 'Does choosing a better cosmetic result weaken the cancer treatment?',
   answer: 'No. Oncoplastic surgery follows the same clear-margin standard as standard breast-conserving surgery. The reshaping is planned around the cancer removal, never instead of it. Studies support comparable cancer control when margins are clear. Oncology leads; the plastic surgical technique follows.',
  },
  {
   question: 'Will my other breast be operated on too?',
   answer: 'Sometimes. When reshaping one breast would leave a noticeable difference, a symmetry procedure such as a lift or reduction on the opposite breast can be done in the same operation for a balanced result. This is optional and is discussed during planning so you can decide what matters most to you.',
  },
  {
   question: 'What is recovery like after oncoplastic surgery?',
   answer: 'Recovery is similar to standard breast-conserving surgery, most patients go home within a day or two. There may be more swelling initially because of the reshaping, settling over the following weeks. The pathology report confirms margins, and radiation therapy usually follows as part of breast conservation.',
  },
 ],
 'gi-oncology': [
  {
   question: 'Can gastrointestinal cancers be removed with keyhole surgery?',
   answer: 'Many can. For suitable stomach, colorectal, and other GI tumours, laparoscopic or robotic techniques achieve the same thorough removal through small port incisions, with less pain and faster recovery. Larger or more complex tumours may still need open surgery. The decision is based on staging and your specific anatomy.',
  },
  {
   question: 'How is it decided whether my GI tumour is operable?',
   answer: 'Detailed staging with CT, MRI, or endoscopic ultrasound maps the tumour and any spread, and a multidisciplinary tumour board reviews the case. Surgery is recommended when complete removal is achievable and would meaningfully improve your outcome, sometimes after chemotherapy first to bring a borderline tumour within reach.',
  },
  {
   question: 'Will I need a stoma bag after bowel cancer surgery?',
   answer: 'Some bowel operations require a temporary stoma to protect healing, and a small number need a permanent one. Many patients need no stoma at all. It depends on tumour position and how the bowel is rejoined. If a stoma is a possibility for your operation, it is explained and planned for well in advance.',
  },
  {
   question: 'What happens to my digestion after GI cancer surgery?',
   answer: 'Diet is reintroduced gradually as bowel function returns, usually over days. Surgery aims to preserve as much normal digestive function as possible, and most patients adapt well over the following weeks. Early walking and enhanced recovery protocols support faster bowel recovery after the operation.',
  },
 ],
 hipec: [
  {
   question: 'Is HIPEC just another type of chemotherapy drip?',
   answer: 'No. Unlike intravenous chemotherapy, HIPEC delivers a heated chemotherapy solution directly into the abdominal cavity during surgery, immediately after visible tumour is removed. The heat improves drug penetration and the drug stays confined to the abdomen, so it targets microscopic residual disease with far less whole-body exposure.',
  },
  {
   question: 'Who is a suitable candidate for HIPEC?',
   answer: 'Patients with peritoneal surface malignancies, including selected ovarian, colorectal, gastric, and appendiceal cancers, pseudomyxoma peritonei, or peritoneal mesothelioma, may be candidates. You must be medically fit for major cytoreductive surgery, and every case is evaluated and approved by a multidisciplinary tumour board.',
  },
  {
   question: 'Does HIPEC have fewer side effects than regular chemotherapy?',
   answer: 'Because the heated chemotherapy remains within the abdominal cavity rather than circulating through the whole body, systemic toxicity and whole-body side effects are reduced while drug concentration at the disease site is higher. It is still a major operation, so recovery is significant, but the chemotherapy component is far more targeted.',
  },
  {
   question: 'What is recovery like after cytoreductive surgery with HIPEC?',
   answer: 'This is a major abdominal operation, so recovery is longer than standard surgery, hospital stay and close monitoring extend over days, with gradual return to eating and activity. Follow-up imaging and reviews continue afterward to monitor healing and watch for any recurrence of disease.',
  },
 ],
 'laparoscopic-robotic-gi-surgery': [
  {
   question: 'Does the robot perform the surgery on its own?',
   answer: 'No. The robotic system is entirely controlled by the surgeon at every moment. It cannot act independently. It translates the surgeon\'s hand movements into precise, wristed instrument motion inside the body with a magnified 3D view, which is what makes delicate dissection around vessels and organs safer.',
  },
  {
   question: 'Which GI conditions can be treated with laparoscopic or robotic surgery?',
   answer: 'A wide range, stomach and colorectal cancers, gallbladder and biliary conditions, hernias, liver, pancreas and small-bowel tumours, reflux disease, and benign masses. Suitability depends on the specific condition, its stage, and whether a minimally invasive approach can achieve the same complete result as open surgery.',
  },
  {
   question: 'Am I a suitable candidate for robotic GI surgery?',
   answer: 'Candidates typically include patients with early-stage or selected advanced GI cancers, or those needing hernia, gallbladder, or reflux surgery, who are medically fit for anaesthesia. Your imaging, disease type, and surgical complexity are assessed, often by a multidisciplinary team, before a minimally invasive approach is confirmed.',
  },
  {
   question: 'How soon can I eat and walk after the operation?',
   answer: 'Walking is encouraged within hours of surgery, and bowel function typically returns faster than after open surgery. Most patients resume diet progressively and are discharged earlier than with traditional surgery. Small port incisions also mean less wound discomfort during the recovery period.',
  },
 ],
 'retroperitoneal-tumor-surgery': [
  {
   question: 'Why are retroperitoneal tumours difficult to remove?',
   answer: 'The retroperitoneum sits behind the intestines and contains major blood vessels, the kidneys, and other vital structures. Tumours here often grow silently until they are large and sit against or around these structures, making complete removal technically demanding and requiring meticulous planning, sometimes with vascular or urologic colleagues.',
  },
  {
   question: 'Will other organs need to be removed along with the tumour?',
   answer: 'Sometimes. When a tumour involves or presses against a neighbouring organ, such as a kidney or part of the bowel, removing that organ together with the tumour (en bloc resection) may be the only way to achieve clear margins. This possibility is assessed on imaging and discussed with you before surgery, not decided in theatre.',
  },
  {
   question: 'What happens if the tumour cannot be removed completely?',
   answer: 'Incomplete removal significantly raises the risk of the tumour returning, which is why complete resection with clear margins is the priority from the start. Detailed imaging maps the tumour against surrounding structures before any operation, and a second opinion is always reasonable where operability is uncertain.',
  },
  {
   question: 'What is recovery like after retroperitoneal surgery?',
   answer: 'Recovery is typically longer than for standard abdominal operations. The early days involve close monitoring, sometimes in a high-dependency unit, with gradual return to eating and activity over several weeks. Regular cross-sectional imaging continues afterward because these tumours can recur late.',
  },
 ],
 'minimal-access-surgery': [
  {
   question: 'Is keyhole surgery as effective as open surgery for cancer?',
   answer: 'When chosen appropriately, yes, the oncologic standard is identical: complete tumour removal with clear margins. Minimal access surgery is selected only where it can achieve that same result, not because it is easier. Where a keyhole approach would compromise completeness, open surgery is recommended instead.',
  },
  {
   question: 'When would a surgeon recommend open surgery instead?',
   answer: 'Very large tumours, disease involving multiple organs, extensive scarring from previous operations, and emergencies are situations where open access is safer. Occasionally a planned keyhole procedure converts to open mid-surgery if that becomes the safer course. This is a safety decision, not a failure.',
  },
  {
   question: 'What is the difference between laparoscopic and robotic surgery?',
   answer: 'Both use small incisions and a camera. Standard laparoscopy suits most routine keyhole procedures, while robotic systems add wristed instruments and a magnified 3D view that help in demanding territory, deep pelvic work or fine dissection near major vessels. The platform is chosen on the specifics of the case.',
  },
  {
   question: 'How much faster is recovery after minimal access surgery?',
   answer: 'Most patients walk within hours and are discharged earlier than after open surgery, with less pain, smaller scars, and lower wound infection rates. Return to work and normal activity is typically quicker. Cancer surveillance afterward follows the same schedule regardless of the approach used.',
  },
 ],
 'gynaecological-malignancies': [
  {
   question: 'Can my gynaecological cancer be treated with keyhole surgery?',
   answer: 'Often, yes for early-stage disease. Early uterine and cervical cancers are commonly managed with laparoscopic or robotic hysterectomy and staging through small incisions. Advanced ovarian cancer usually requires open surgery to remove disease thoroughly from multiple areas of the abdomen. The approach is matched to your stage.',
  },
  {
   question: 'Will surgery affect my ability to have children?',
   answer: 'It can, which is why fertility preservation is discussed openly wherever it is medically appropriate. In carefully selected early-stage cases, fertility-sparing procedures may be possible. For other stages, complete surgical clearance takes priority, the options are reviewed honestly before any decision is made.',
  },
  {
   question: 'Will I need chemotherapy after gynaecological cancer surgery?',
   answer: 'It depends on the final pathology and staging. Some early cancers need nothing further after complete surgical removal; others, particularly ovarian cancer, are followed by chemotherapy. The removed tissue determines the stage, and the stage determines what comes next, and this is decided through multidisciplinary review.',
  },
  {
   question: 'Does abnormal bleeding always mean cancer?',
   answer: 'No, abnormal vaginal bleeding has many benign causes. However, bleeding after menopause, or persistent unexplained bleeding, always warrants proper evaluation with examination and imaging. Most women investigated for these symptoms do not have cancer, but checking is the only way to be certain.',
  },
 ],
 'thoracic-cancer': [
  {
   question: 'Can all lung tumours be removed with keyhole surgery?',
   answer: 'No, suitability depends on the tumour. Early peripheral lung cancers are often well suited to VATS (video-assisted) removal through small incisions, while larger or centrally located tumours may require open surgery. The decision is based on size, position, and stage shown on your scans.',
  },
  {
   question: 'How do doctors check I am fit enough for lung surgery?',
   answer: 'Lung function testing measures whether you can safely tolerate removal of part of the lung, alongside cardiac assessment and evaluation of your overall fitness for anaesthesia. This testing shapes the surgical recommendation as much as the scans do. An operation is only planned within what your remaining lung can support.',
  },
  {
   question: 'Will I be able to breathe normally after part of my lung is removed?',
   answer: 'For most patients, the remaining lung adapts well, especially when the resection is planned within tested lung function limits. Breathing exercises begin from the first day after surgery to help lung expansion, and recovery protocols support a steady return to normal activity over the following weeks.',
  },
  {
   question: 'What does recovery after thoracic surgery involve?',
   answer: 'A temporary chest drain is placed while the lung re-expands, with early walking and breathing exercises from day one. Keyhole-surgery patients typically go home within three to five days; open surgery takes longer. Scheduled scans and reviews afterward monitor healing and watch for recurrence.',
  },
 ],
 'vats-lobectomy': [
  {
   question: 'How is VATS different from open chest surgery?',
   answer: 'VATS uses 2–3 small incisions with a camera and specialised instruments instead of a large chest cut with rib spreading. The same lobe and lymph nodes are removed, but with far less chest wall trauma, meaning less pain, smaller scars, shorter hospital stay, and faster recovery.',
  },
  {
   question: 'Am I a candidate for VATS lobectomy?',
   answer: 'Candidates typically have early-stage non-small cell lung cancer, a peripheral tumour accessible through keyhole incisions, adequate lung function confirmed by testing, and fitness for general anaesthesia and single-lung ventilation. A thoracic surgical assessment confirms whether VATS is appropriate for your case.',
  },
  {
   question: 'Does VATS remove the cancer as completely as open surgery?',
   answer: 'Yes. The entire lobe is removed along with lymph node dissection for accurate staging. That is the same oncologic standard as open thoracotomy. VATS is widely accepted as the gold standard for early-stage lung cancer in suitable patients, with survival outcomes comparable to open surgery.',
  },
  {
   question: 'When can I go home after a VATS lobectomy?',
   answer: 'Most patients go home within 3–5 days. A chest drain is placed initially to manage air and fluid, walking is encouraged within 24 hours, and breathing exercises support lung expansion. Follow-up evaluations then monitor lung function and provide ongoing cancer surveillance.',
  },
 ],
 'head-and-neck-cancer': [
  {
   question: 'Will surgery affect my speech or swallowing?',
   answer: 'Function is weighed alongside cancer clearance from the very start of planning. Where speech or swallowing may be affected, rehabilitation with specialist therapists begins gradually after surgery, and nutrition support is arranged until normal eating is restored. The goal is a complete removal with the least possible long-term impact.',
  },
  {
   question: 'Do all head and neck cancers need a big operation?',
   answer: 'No. Early-stage cancers can sometimes be treated with more limited surgery, while advanced tumours may need extensive resection, and reconstruction where removal affects appearance or function. Accurate staging before treatment determines how much surgery is genuinely needed for your case.',
  },
  {
   question: 'Will lymph nodes in my neck need to be removed?',
   answer: 'When there is a risk the cancer has spread to neck nodes, their removal is combined with the primary operation. This both treats existing spread and gives accurate staging information. Whether it is needed in your case is decided from imaging and examination before surgery.',
  },
  {
   question: 'What support is available during recovery?',
   answer: 'Recovery is supported by a team, not just the surgeon: speech and swallowing therapists, nutritionists, and medical and radiation oncologists where further treatment is needed. Airway and feeding plans are arranged before the operation, and regular surveillance continues afterward to monitor healing and check for recurrence.',
  },
 ],
 'complex-head-neck-resection': [
  {
   question: 'What is a free flap, and why is it needed?',
   answer: 'A free flap is living tissue, skin, muscle, or bone, transferred with its own blood vessels from another part of the body to rebuild what tumour removal takes away. Connected to neck vessels using microsurgery, it restores structures critical for speech, swallowing, chewing, and facial appearance after major resections.',
  },
  {
   question: 'Where does the reconstruction tissue come from?',
   answer: 'Common donor sites include the forearm (for tongue and soft tissue), the thigh (ALT flap for larger soft-tissue defects), the fibula (for jawbone reconstruction), and the scapular region for combined bone and tissue needs. The flap is chosen based on the size and location of the defect being rebuilt.',
  },
  {
   question: 'How long is recovery after resection with reconstruction?',
   answer: 'Hospital recovery includes close monitoring of blood flow to the flap in the early days, with speech and swallowing rehabilitation beginning gradually. Nutrition support may be needed until swallowing improves, and swelling reduces over weeks. Regular follow-ups track flap function and provide cancer surveillance.',
  },
  {
   question: 'Will I look normal after reconstruction?',
   answer: 'Microvascular reconstruction aims for the most natural appearance and function achievable. It uses living tissue precisely matched to the defect, giving considerably better cosmetic and functional results than basic repair. Complete invisibility of surgery is not always possible, but the goal is a return to normal social life.',
  },
 ],
};

/**
 * A cost/insurance question appended to every service page's FAQ list.
 * The answer is deliberately non-numeric: real fee figures are a
 * NEEDS-CLIENT item in the audit, so nothing is invented here.
 */
export function costFaq(treatmentTitle: string): { question: string; answer: string } {
 return {
  question: `How much does ${treatmentTitle.toLowerCase()} cost in Chennai?`,
  answer:
   'The cost depends on the specific procedure, hospital stay and your overall treatment plan, so a figure is only fair after your reports are reviewed. A written estimate is provided after consultation, and the hospital billing desk assists with insurance and TPA claims.',
 };
}
