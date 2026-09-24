export interface IntroSection {
  heading: string;
  body: string;
}

export interface BulletBlock {
  heading: string;
  subheading: string;
  items: string[];
}

export interface TreatmentContent {
  introSections: IntroSection[];
  bulletBlocks: BulletBlock[];
}

export const treatmentContent: Record<string, TreatmentContent> = {
  'surgical-oncology': {
    introSections: [
      {
        heading: 'Comprehensive Cancer Surgery Across Multiple Organs',
        body: 'Surgical oncology is the branch of cancer care that focuses on removing tumours through operation, whether the goal is a complete cure, disease control, or relief from symptoms. It sits at the centre of most cancer treatment plans, often working alongside chemotherapy, radiation, and targeted therapy rather than replacing them. Dr. Varadharajan V brings this expertise across breast, gastrointestinal, gynaecological, thoracic, and peritoneal cancers, which means patients don\'t need to be referred between multiple surgeons as their diagnosis becomes clearer. Every case starts with a careful review of imaging, biopsy results, and overall health before any surgical plan is proposed.',
      },
      {
        heading: 'A Modern, Minimally Invasive Approach Where Possible',
        body: 'Cancer surgery has changed a great deal over the past two decades. Where older techniques required large open incisions, many procedures today can be done laparoscopically or robotically through small ports, which usually means less pain, a shorter hospital stay, and a faster return to normal life. That said, minimally invasive surgery isn\'t right for every tumour or every patient. Part of the surgeon\'s job is judging, case by case, whether a keyhole approach will achieve the same oncologic result as open surgery, and being honest when it won\'t.',
      },
      {
        heading: 'How Surgery Fits Into the Wider Treatment Plan',
        body: 'An operation is rarely the whole answer on its own. Depending on the cancer, surgery may come first, follow a course of chemotherapy to shrink the tumour, or be combined afterward with radiation or further drug treatment. The sequencing is decided at a multidisciplinary tumour board, where surgeons, medical oncologists, radiation oncologists, radiologists, and pathologists review each case together. Dr. Varadharajan V works within this structure so that the timing and extent of surgery support, rather than complicate, everything else the patient\'s treatment requires.',
      },
    ],
    bulletBlocks: [
      {
        heading: 'What Surgical Oncology Involves',
        subheading: 'The role surgery plays in a cancer diagnosis',
        items: [
          'Removing the primary tumour along with a safety margin of healthy tissue',
          'Assessing and often removing nearby lymph nodes to check for spread',
          'Performing staging procedures to guide the rest of the treatment plan',
          'Reconstructive work where removing a tumour affects appearance or function',
          'Coordinating timing with chemotherapy or radiation when combined treatment is needed',
        ],
      },
      {
        heading: 'When Surgery Is the Right Next Step',
        subheading: 'Common situations where a surgical opinion is sought',
        items: [
          'A biopsy has confirmed cancer and the tumour appears operable on imaging',
          'A tumour is causing symptoms such as bleeding, obstruction, or pain',
          'Surgery is needed to confirm diagnosis or staging that scans alone cannot answer',
          'A patient has completed chemotherapy and surgery is the next planned step',
          'A second opinion is being sought on whether an operation is advisable at all',
        ],
      },
      {
        heading: 'What to Expect From a Consultation',
        subheading: 'How a first visit typically works',
        items: [
          'A detailed review of existing scans, biopsy reports, and medical history',
          'An honest discussion of whether surgery is appropriate, and what the alternatives are',
          'Clear explanation of the proposed procedure, its risks, and expected recovery',
          'Time to ask questions before any decision needs to be made',
          'A written plan that can be shared with family or other doctors involved in care',
        ],
      },
      {
        heading: 'The Role of Minimally Invasive Techniques',
        subheading: 'How laparoscopic and robotic surgery fit into cancer care',
        items: [
          'Smaller incisions mean less postoperative pain and smaller scars',
          'Magnified camera views aid precise work around major blood vessels',
          'Robotic instruments add dexterity in confined spaces like the pelvis',
          'Hospital stays and return to normal activity are generally shorter',
          'Oncologic standards are identical to open surgery — completeness first',
        ],
      },
      {
        heading: 'How Candidacy for Surgery Is Assessed',
        subheading: 'What determines whether an operation is advisable',
        items: [
          'Staging scans and biopsy confirming the tumour is technically removable',
          'Overall fitness for anaesthesia and a major operation',
          'Whether removing the tumour would meaningfully improve the outcome',
          'Review by a multidisciplinary tumour board before major decisions',
          'Consideration of non-surgical alternatives where surgery offers little benefit',
        ],
      },
    ],
  },
  'head-and-neck-cancer': {
    introSections: [
      {
        heading: 'Cancers in an Area Central to Daily Life',
        body: 'Head and neck cancers affect areas most people don\'t think about until something goes wrong with them: the mouth, tongue, throat, voice box, and salivary glands. Because these structures are involved in speaking, swallowing, and breathing, surgery here has to weigh cancer removal against the very real impact on how a patient lives afterward. Early-stage cancers can sometimes be treated with more limited surgery, while advanced cases may need more extensive resection, which is why accurate staging before treatment matters so much.',
      },
      {
        heading: 'When Reconstruction Becomes Part of the Plan',
        body: 'For more advanced head and neck cancers, removing the tumour may leave a defect that affects appearance or function, and reconstructive techniques, including microvascular free-flap surgery, are used to rebuild what\'s been removed. This is a more detailed procedure that\'s covered on its own page, but it\'s worth knowing upfront that reconstruction isn\'t an afterthought here; it\'s planned alongside the cancer surgery from the beginning for cases where it will be needed.',
      },
      {
        heading: 'Treatment That Protects Speech, Swallowing, and Appearance',
        body: 'Because head and neck structures govern how a person eats, speaks, and looks, the surgical plan weighs function alongside cancer clearance from the very start. Neck lymph node removal may be combined with the primary operation when there is risk of spread, and the surgical team plans airway and nutrition support for the recovery period in advance. The aim throughout is a complete cancer removal that leaves the patient able to swallow, speak, and return to normal social life with the least possible long-term impact.',
      },
    ],
    bulletBlocks: [
      {
        heading: 'Areas and Conditions Treated',
        subheading: 'Sites within head and neck cancer surgery',
        items: [
          'Oral cavity cancers, including tongue and floor of mouth',
          'Throat (oropharyngeal and laryngeal) cancers',
          'Thyroid cancer',
          'Salivary gland tumours',
          'Neck lumps requiring surgical diagnosis or treatment',
        ],
      },
      {
        heading: 'Who Should Get Evaluated',
        subheading: 'Symptoms that warrant a specialist opinion',
        items: [
          'A persistent mouth ulcer or sore that hasn\'t healed in a few weeks',
          'A lump in the neck that isn\'t going away',
          'Difficulty or pain swallowing that continues beyond a short illness',
          'Hoarseness lasting more than two to three weeks',
          'A confirmed diagnosis needing surgical treatment planning',
        ],
      },
      {
        heading: 'How Treatment Is Approached',
        subheading: 'What patients can generally expect',
        items: [
          'Thorough examination, often including endoscopy of the throat',
          'Imaging (CT, MRI, or PET) to determine the extent of disease',
          'Discussion of surgical options ranging from limited to more extensive resection',
          'Reconstruction planning where the tumour size or location requires it',
          'Coordination with speech and swallowing therapists as part of recovery',
        ],
      },
      {
        heading: 'Why Surgery Here Requires Specialist Planning',
        subheading: 'What makes head and neck operations complex',
        items: [
          'Tumours sit close to structures controlling speech, swallowing, and breathing',
          'Neck lymph node removal is often combined with the primary surgery',
          'Major resections may need microvascular reconstruction to restore function',
          'Airway and feeding plans are arranged before the operation',
          'Rehabilitation begins early to protect long-term function',
        ],
      },
      {
        heading: 'The Team Behind Recovery',
        subheading: 'Support that continues well beyond the operation',
        items: [
          'Speech and swallowing therapy started gradually after surgery',
          'Nutritional support until normal eating is safely restored',
          'Dental and jaw care where treatment involves the mouth',
          'Coordination with medical and radiation oncology for further treatment',
          'Regular surveillance to monitor healing and watch for recurrence',
        ],
      },
    ],
  },
  hipec: {
    introSections: [
      {
        heading: 'Advanced HIPEC Cancer Therapy',
        body: 'HIPEC (Heated Intraperitoneal Chemotherapy) is an advanced treatment performed immediately after cytoreductive surgery to eliminate microscopic tumour cells remaining in the abdominal cavity. During the procedure, a heated chemotherapy solution is circulated for a fixed duration to enhance drug penetration and maximise cancer cell destruction. The heat improves the effectiveness of the chemotherapy while keeping systemic toxicity low because the drug remains confined within the abdomen. This combined surgical and chemotherapeutic approach offers significantly better disease control for selected abdominal cancers, particularly when complete or near-complete tumour removal is achieved during cytoreductive surgery.',
      },
      {
        heading: 'Precision HIPEC for Abdominal Cancers',
        body: 'HIPEC offers a focused and highly localised treatment option for cancers involving the peritoneal lining. After surgically removing visible disease, the abdomen is filled with heated chemotherapy to target remaining microscopic tumour cells that cannot be seen or safely resected. This heat-enhanced delivery improves tissue absorption and drug effectiveness, reducing the risk of recurrence. HIPEC has shown meaningful survival benefits in well-selected patients with ovarian, colorectal, gastric, appendiceal cancers, and peritoneal surface malignancies. When combined with optimal cytoreductive surgery, it provides a powerful therapeutic strategy that improves long-term outcomes and disease control.',
      },
      {
        heading: 'Targeted Intra-Abdominal Chemotherapy',
        body: 'HIPEC allows surgeons to deliver chemotherapy directly to the source of disease at higher concentrations than traditional intravenous methods, without exposing the entire body to high drug levels. Because the heated chemotherapy remains within the abdominal cavity, patients experience fewer systemic side effects, improved tolerance, and enhanced treatment precision. This approach is especially effective for cancers that spread within the peritoneal cavity, where microscopic deposits are difficult to detect or remove surgically. HIPEC significantly improves local tumour control, reduces recurrence rates, and offers selected patients a meaningful improvement in long-term survival when paired with cytoreductive surgery.',
      },
    ],
    bulletBlocks: [
      {
        heading: 'Why HIPEC Is Used',
        subheading: 'Enhancing cancer control with focused heated chemotherapy.',
        items: [
          'Provides high-concentration chemotherapy directly to the abdominal cavity',
          'Heat improves drug penetration and increases cancer cell destruction',
          'Reduces systemic toxicity compared to intravenous chemotherapy',
          'Targets microscopic tumour cells left behind after CRS',
          'Lowers recurrence risk in selected abdominal cancers',
        ],
      },
      {
        heading: 'Who Are Suitable Candidates',
        subheading: 'For patients with specific peritoneal-based cancers.',
        items: [
          'Those diagnosed with peritoneal surface malignancies (PSM)',
          'Patients with ovarian, colorectal, gastric, or appendiceal cancers',
          'Individuals with pseudomyxoma peritonei or peritoneal mesothelioma',
          'Patients medically fit for major cytoreductive surgery',
          'Candidates evaluated and approved by a multidisciplinary tumour board',
        ],
      },
      {
        heading: 'Advantages of HIPEC',
        subheading: 'Improved outcomes with heat-enhanced chemotherapy delivery.',
        items: [
          'Higher local drug concentration without systemic side effects',
          'Better local disease control and reduced recurrence rates',
          'Proven survival benefit in well-selected patients',
          'Minimises exposure to whole-body chemotherapy toxicity',
          'Complements cytoreductive surgery for superior overall outcomes',
        ],
      },
    ],
  },
  'complex-head-neck-resection': {
    introSections: [
      {
        heading: 'Advanced Head & Neck Resection with Reconstruction',
        body: 'Complex Head and Neck Resection with Microvascular Reconstruction involves removing cancerous tumours in critical areas—oral cavity, throat, jaw, or neck—while restoring function and appearance using advanced free-flap techniques. After tumour removal, tissue from the forearm, thigh, or fibula is transferred with its blood vessels and connected to neck vessels using microsurgery. This allows restoration of speech, swallowing, chewing, and facial structure. The procedure is essential for achieving oncologic safety while preserving quality of life, especially in extensive or anatomically challenging head and neck cancers.',
      },
      {
        heading: 'Precision Oncologic Resection & Microvascular Free-Flap Surgery',
        body: 'This surgery combines aggressive cancer clearance with delicate reconstructive techniques to rebuild structures affected by tumour removal. Microvascular reconstruction ensures transplanted tissue receives stable blood supply, enabling better healing and long-term function. It is used for cancers affecting the tongue, jawbone, buccal mucosa, larynx, and extensive soft-tissue areas. By integrating oncology and reconstructive expertise, the procedure helps patients regain vital functions like swallowing and speech, supports aesthetics, and reduces long-term disability. It is a cornerstone treatment for large, invasive, or recurrent head and neck tumours.',
      },
      {
        heading: 'Functional Reconstruction After Advanced Head & Neck Surgery',
        body: 'This approach focuses on restoring both structure and function after complex tumour removal. Microvascular free-flap reconstruction uses living tissue to rebuild areas critical for breathing, speaking, and eating. Surgeons precisely reconnect tiny arteries and veins to maintain optimal tissue viability. This technique is particularly beneficial after major resections involving the mandible, tongue, or pharynx. The result is improved oncologic outcomes, enhanced functional recovery, and significantly better cosmetic results. Patients experience improved quality of life, reduced complications, and higher long-term satisfaction after comprehensive surgical management.',
      },
    ],
    bulletBlocks: [
      {
        heading: 'Why This Surgery Is Needed',
        subheading: 'For complete tumour removal with functional restoration.',
        items: [
          'Required for large, invasive, or recurrent head and neck cancers',
          'Ensures safe removal of tumours near critical structures',
          'Prevents cancer spread to deeper tissues or lymph nodes',
          'Restores essential functions like swallowing and speech',
          'Provides better long-term outcomes compared to basic resections',
        ],
      },
      {
        heading: 'Who Are Suitable Candidates',
        subheading: 'Patients needing reconstruction after extensive tumour removal.',
        items: [
          'Individuals with advanced oral cavity, jaw, tongue, or throat cancers',
          'Patients requiring mandibulectomy or large soft-tissue resections',
          'Those needing functional reconstruction for speech or swallowing',
          'Patients medically fit for microvascular free-flap surgery',
          'Individuals advised by a multidisciplinary tumour board',
        ],
      },
      {
        heading: 'Benefits of Microvascular Reconstruction',
        subheading: 'Superior healing, function, and aesthetics after major surgery.',
        items: [
          'Provides living tissue with its own blood supply for stable healing',
          'Improves speech, swallowing, chewing, and facial structure',
          'Allows precise anatomical reconstruction for better outcomes',
          'Minimises long-term disability and improves daily functioning',
          'Offers more natural appearance and better cosmetic results',
        ],
      },
      {
        heading: 'Types of Microvascular Flaps Used',
        subheading: 'Advanced tissue options tailored to defect size and location.',
        items: [
          'Radial forearm free flap for tongue and soft tissue reconstruction',
          'Anterolateral thigh (ALT) flap for large soft-tissue defects',
          'Fibula flap for jawbone (mandibular) reconstruction',
          'Scapular/parascapular flap for combined bone and tissue needs',
          'Jejunal flap in rare cases for complex pharyngeal reconstruction',
        ],
      },
      {
        heading: 'What to Expect After Surgery',
        subheading: 'Smooth recovery with specialised rehabilitation support.',
        items: [
          'Hospital stay includes close monitoring of blood flow to the flap',
          'Early rehabilitation for speech and swallowing begins gradually',
          'Nutrition support may be needed until swallowing improves',
          'Visible swelling reduces over weeks as healing progresses',
          'Regular follow-ups ensure optimal flap function and cancer surveillance',
        ],
      },
      {
        heading: 'Multidisciplinary Care Involved',
        subheading: 'Complete support from diagnosis to recovery.',
        items: [
          'Head and neck surgical oncologists for tumour removal',
          'Microvascular reconstructive surgeons for precision rebuilding',
          'Speech and swallowing therapists for rehabilitation',
          'Nutritionists for maintaining adequate postoperative nutrition',
          'Medical and radiation oncologists for complementary treatments',
        ],
      },
    ],
  },
  'laparoscopic-robotic-gi-surgery': {
    introSections: [
      {
        heading: 'Advanced Laparoscopic & Robotic GI Surgery',
        body: 'Laparoscopic and robotic GI surgery are minimally invasive techniques used to treat a wide range of gastrointestinal conditions, including stomach, colorectal, hepatobiliary, and small bowel diseases. Surgeons operate through tiny keyhole incisions using a high-definition camera for magnified views. Robotic systems further enhance precision with wristed instruments and 3D visualisation, enabling safer and more controlled movements. These approaches reduce blood loss, pain, hospital stay, and complications while maintaining excellent surgical accuracy. They are now standard for many GI cancers, benign diseases, and reconstructive procedures.',
      },
      {
        heading: 'Precision GI Surgery With Minimally Invasive Technology',
        body: 'Minimally invasive GI surgery allows surgeons to access complex abdominal structures with exceptional clarity and precision. Laparoscopy offers enhanced visualisation, while robotic systems provide superior dexterity, making it easier to perform complex dissections around critical vessels and organs. These methods improve patient comfort, preserve organ function, and accelerate return to normal activity. They are highly effective for colorectal cancers, gastric tumours, gallbladder issues, hernias, and several benign and malignant GI conditions. When used in the right patient, these techniques significantly enhance outcomes and long-term recovery.',
      },
      {
        heading: 'Modern Gastrointestinal Surgery for Faster Recovery',
        body: 'Robotic and laparoscopic GI surgery are designed to reduce the physical impact of surgery without compromising oncologic or functional results. By avoiding large incisions, these methods lead to quicker mobilisation, reduced wound complications, and minimal scarring. They allow surgeons to perform intricate tasks through small ports using advanced instruments, making them ideal for complex colorectal, gastric, pancreatic, and hernia surgeries. Patients benefit from less postoperative discomfort, lower infection rates, and shorter hospital stays, all contributing to improved recovery, better quality of life, and excellent surgical precision.',
      },
    ],
    bulletBlocks: [
      {
        heading: 'Why Laparoscopic / Robotic GI Surgery Is Used',
        subheading: 'Safe, effective, and precise management of GI diseases.',
        items: [
          'Enables accurate cancer removal with minimal trauma',
          'Reduces complications compared to open abdominal surgery',
          'Improves visibility around delicate vessels and organs',
          'Supports organ-preserving approaches when possible',
          'Enhances long-term outcomes for both benign and malignant conditions',
        ],
      },
      {
        heading: 'Who Are Suitable Candidates',
        subheading: 'Patients selected based on disease type and surgical complexity.',
        items: [
          'Individuals with stomach, colorectal, liver, or small-bowel diseases',
          'Patients with early-stage or selected advanced GI cancers',
          'People requiring hernia, gallbladder, or reflux surgery',
          'Patients medically fit for laparoscopic or robotic anesthesia',
          'Individuals assessed by a multidisciplinary GI or oncology team',
        ],
      },
      {
        heading: 'Advantages',
        subheading: 'Faster recovery, better comfort, and excellent surgical precision.',
        items: [
          'Smaller incisions and reduced postoperative pain',
          'Quicker return to daily activities and work',
          'Lower infection and wound complication rates',
          'Greater precision in complex dissections with robotic systems',
          'Improved cosmetic results with minimal scarring',
        ],
      },
      {
        heading: 'What to Expect After Surgery',
        subheading: 'Smooth recovery supported by enhanced care protocols.',
        items: [
          'Early walking encouraged within hours of surgery',
          'Minimal wound discomfort due to small port incisions',
          'Faster bowel recovery compared to open surgery',
          'Most patients discharged earlier than traditional surgery',
          'Regular follow-ups ensure good healing and long-term outcomes',
        ],
      },
      {
        heading: 'Conditions Treated',
        subheading: 'Effective for a wide range of gastrointestinal diseases.',
        items: [
          'Stomach and colorectal cancers requiring precise resection',
          'Gallbladder stones and biliary tract conditions',
          'Hernias including inguinal, ventral, and hiatal',
          'Liver, pancreas, and small bowel tumours',
          'Reflux disease, obesity-related GI issues, and benign masses',
        ],
      },
    ],
  },
  'breast-cancer-surgeries': {
    introSections: [
      {
        heading: 'Tailoring Surgery to the Individual, Not Just the Tumour',
        body: 'Breast cancer surgery has moved a long way from the idea that removing the whole breast is always the safest option. Today, the choice between breast-conserving surgery (removing the tumour with a margin of healthy tissue) and mastectomy (removing the whole breast) depends on tumour size, location, type, and the patient\'s own preferences, not a single fixed rule. Dr. Varadharajan V works through this decision with each patient individually, explaining what each option means for cancer control, appearance, and recovery, so the final choice is genuinely informed rather than assumed.',
      },
      {
        heading: 'Oncoplastic Techniques for Better Cosmetic Outcomes',
        body: 'Where breast-conserving surgery is appropriate, oncoplastic techniques can reshape the breast at the same time the tumour is removed, which often gives a better cosmetic result than removing the tumour alone. Sentinel lymph node biopsy, a technique that checks only the first draining lymph node rather than removing many nodes automatically, has also reduced the risk of long-term arm swelling for many patients. These are not exotic add-ons; they are now a standard part of planning breast cancer surgery whenever they are clinically appropriate.',
      },
      {
        heading: 'What Guides the Final Surgical Plan',
        body: 'Before any operation, the full picture is assembled: biopsy results confirming the cancer type, imaging to map tumour size and position, and receptor status that predicts how the tumour behaves. Surgery is then sequenced within the wider treatment plan; some patients benefit from chemotherapy before the operation to shrink a larger tumour, while others proceed straight to surgery. Dr. Varadharajan V reviews each case through a multidisciplinary lens so that the operation recommended is the one most likely to achieve clear margins with the least possible impact on the patient\'s life.',
      },
    ],
    bulletBlocks: [
      {
        heading: 'Surgical Options Available',
        subheading: 'Approaches used depending on the specific case',
        items: [
          'Breast-conserving surgery (lumpectomy) with oncoplastic reshaping',
          'Mastectomy, with or without immediate reconstruction',
          'Sentinel lymph node biopsy to minimise unnecessary node removal',
          'Axillary lymph node dissection when more extensive spread is confirmed',
          'Nipple-sparing techniques where oncologically appropriate',
        ],
      },
      {
        heading: 'Who Typically Needs This Surgery',
        subheading: 'Situations that call for a surgical consultation',
        items: [
          'A confirmed breast cancer diagnosis from biopsy',
          'A suspicious finding on mammogram or ultrasound requiring further workup',
          'Recurrent disease after previous breast cancer treatment',
          'Genetic risk factors (such as BRCA mutations) considering preventive surgery',
          'Patients who have completed chemotherapy and are ready for surgical treatment',
        ],
      },
      {
        heading: 'What Influences the Surgical Plan',
        subheading: 'Factors weighed before recommending an approach',
        items: [
          'Tumour size relative to overall breast size',
          'Whether the cancer is in one location or multiple areas of the breast',
          'Hormone receptor and genetic status of the tumour',
          'Patient preference regarding breast conservation versus removal',
          'Whether radiation or chemotherapy will be needed before or after surgery',
        ],
      },
      {
        heading: 'Signs That Warrant Prompt Evaluation',
        subheading: 'Breast changes that should not be ignored',
        items: [
          'A new lump or area of thickening in the breast or underarm',
          'A change in the size, shape, or contour of one breast',
          'Nipple discharge, particularly if blood-stained or one-sided',
          'Skin dimpling, redness, or an orange-peel texture over the breast',
          'A nipple that has recently turned inward without explanation',
        ],
      },
      {
        heading: 'Recovery After Breast Cancer Surgery',
        subheading: 'What the healing period generally involves',
        items: [
          'Most patients return home within a day or two after breast-conserving surgery',
          'A temporary drain may be placed after larger operations to prevent fluid collection',
          'Gentle arm and shoulder exercises begin early to protect mobility',
          'The pathology report on the removed tissue guides any further treatment',
          'Follow-up visits monitor healing and plan radiation or additional therapy where needed',
        ],
      },
    ],
  },
  'breast-oncoplasty': {
    introSections: [
      {
        heading: 'Cancer Removal With Cosmetic Preservation',
        body: 'Breast oncoplasty combines cancer removal with plastic surgical techniques to preserve the breast\'s shape, symmetry, and cosmetic appearance. It is performed during breast-conserving surgery to remove the tumour with safe margins while maintaining optimal aesthetic outcomes. Modern oncoplastic methods allow larger tumours to be removed without deformity, reducing the need for mastectomy in many cases. This approach benefits women by improving confidence, emotional wellbeing, and long-term quality of life, while ensuring oncologic safety remains uncompromised through precise surgical planning and multidisciplinary evaluation.',
      },
      {
        heading: 'Integrating Oncology and Reconstructive Principles',
        body: 'Oncoplastic breast surgery integrates the principles of oncology and reconstructive surgery, giving women better functional and cosmetic results after tumour removal. Techniques include glandular rearrangement, volume replacement, and symmetry procedures on the opposite breast when required. These methods allow surgeons to achieve clear surgical margins without compromising appearance. Breast oncoplasty is especially beneficial for moderate to large tumours in cosmetically sensitive areas, helping maintain natural breast contour while reducing complications like deformities or asymmetry. This approach enhances both cancer control and patient satisfaction.',
      },
      {
        heading: 'Modern Techniques for Better Surgical Outcomes',
        body: 'Modern oncoplasty allows surgeons to perform breast-conserving surgery with greater flexibility and cosmetic predictability. By combining tumour excision with immediate reshaping, surgeons can restore breast form, avoid visible defects, and improve long-term appearance. This technique is ideal for patients with larger tumours, small breast volumes, or lesions in challenging quadrants. With careful planning and multidisciplinary coordination, oncoplasty provides excellent oncologic safety while significantly improving post-surgical aesthetics.',
      },
    ],
    bulletBlocks: [
      {
        heading: 'Breast Cancer Symptoms',
        subheading: 'Early warning signs that need prompt evaluation.',
        items: [
          'A new lump or thickening in the breast or underarm',
          'Changes in breast size, shape, or overall appearance',
          'Persistent breast pain on one side that does not resolve',
          'Nipple discharge, especially if blood-stained',
          'Skin changes such as dimpling, redness, peeling, or scaling',
          'Nipple inversion or recent inward turning of the nipple',
        ],
      },
      {
        heading: 'Breast Cancer Red Flags',
        subheading: 'Serious signs that need urgent medical attention.',
        items: [
          'A hard, fixed breast lump that does not move',
          'Rapidly enlarging swelling in the breast or underarm',
          'Sudden skin thickening or "peau d\'orange" (orange peel) appearance',
          'Bloody or persistent unilateral nipple discharge',
          'Severe breast skin redness or warmth suggestive of inflammation',
          'Sudden new nipple inversion in adults',
        ],
      },
      {
        heading: 'Breast Cancer Risk Factors',
        subheading: 'Conditions or traits that increase cancer likelihood.',
        items: [
          'Family history of breast or ovarian cancer',
          'BRCA1/BRCA2 or other genetic mutations',
          'Long-term hormone replacement therapy',
          'Early menstruation or late menopause',
          'Obesity, alcohol consumption, and unhealthy lifestyle',
          'Prior chest radiation exposure',
        ],
      },
      {
        heading: 'When to See a Doctor',
        subheading: 'Seek prompt evaluation for any concerning breast change.',
        items: [
          'A new or persistent breast or underarm lump',
          'Visible change in size, contour, or nipple orientation',
          'Any breast skin change that does not resolve',
          'Unexplained pain lasting more than a few weeks',
          'Spontaneous nipple discharge, especially if bloody',
          'Family history of breast cancer plus new symptoms',
        ],
      },
    ],
  },
  'benign-breast-condition-surgery': {
    introSections: [
      {
        heading: 'Not Every Breast Lump Is Cancer',
        body: 'Most breast lumps and changes that bring women in for a consultation turn out to be benign, meaning they are not cancerous. Conditions like fibroadenomas, cysts, fibrocystic changes, and duct-related issues are common at different life stages and usually treatable with straightforward, low-risk procedures. Even so, any new lump, pain, or nipple discharge deserves a proper clinical examination and imaging rather than being dismissed, because the only way to be certain something is benign is to actually check.',
      },
      {
        heading: 'Minimally Invasive Options for Non-Cancerous Conditions',
        body: 'Where a benign lump needs to be removed, whether because it\'s growing, causing discomfort, or simply for peace of mind, the surgical approach is usually far less involved than cancer surgery. Many fibroadenomas and cysts can be managed with a small incision or even a needle-based procedure, leaving minimal scarring. The aim throughout is to resolve the concern with the least disruption to the breast\'s natural shape and function, while still sending any removed tissue for pathology to confirm it is indeed benign.',
      },
      {
        heading: 'When Watchful Waiting Makes Sense',
        body: 'Removal is not always the right answer. Small, stable fibroadenomas and simple cysts that cause no symptoms can often be observed safely with periodic examination and imaging, avoiding an operation altogether. Surgery tends to be recommended when a lump is enlarging, causing persistent discomfort, producing uncertain biopsy results, or when the patient simply prefers the reassurance of having it taken out. The decision is made together, weighing the small risks of a minor procedure against the value of a definitive answer.',
      },
    ],
    bulletBlocks: [
      {
        heading: 'Common Conditions Treated',
        subheading: 'Benign breast changes seen in regular practice',
        items: [
          'Fibroadenomas, the most common solid lump in younger women',
          'Breast cysts, which are fluid-filled and often simple to drain or remove',
          'Fibrocystic breast changes causing lumpiness or cyclical pain',
          'Duct-related conditions such as intraductal papillomas',
          'Breast abscesses and infections requiring drainage',
        ],
      },
      {
        heading: 'Who Should Get Evaluated',
        subheading: 'Signs worth bringing to a specialist',
        items: [
          'A new lump that feels different from the surrounding breast tissue',
          'A lump that is growing or changing over a few menstrual cycles',
          'Persistent breast pain not clearly tied to the menstrual cycle',
          'Nipple discharge, especially if bloodstained or from one duct only',
          'Family history of breast cancer, which may lower the threshold for a biopsy',
        ],
      },
      {
        heading: 'What Treatment Usually Looks Like',
        subheading: 'How these conditions are typically managed',
        items: [
          'Clinical examination followed by ultrasound or mammogram as appropriate',
          'Needle biopsy to confirm the nature of a lump before any surgery is planned',
          'Simple excision under local or short general anaesthesia for most cases',
          'Cyst aspiration as a same-day, minimally invasive option',
          'Follow-up imaging to confirm resolution and rule out recurrence',
        ],
      },
      {
        heading: 'When a Lump Still Needs Checking',
        subheading: 'Features that lower the threshold for biopsy or removal',
        items: [
          'A lump that feels hard or fixed rather than soft and mobile',
          'Any lump that keeps growing over successive checks',
          'Blood-stained or persistent single-duct nipple discharge',
          'Skin dimpling or texture change over the area of a lump',
          'A strong family history of breast cancer alongside a new lump',
        ],
      },
      {
        heading: 'What Happens After Removal',
        subheading: 'The typical course once a benign lump is excised',
        items: [
          'Most excisions are day procedures with a small, well-placed incision',
          'Removed tissue always goes for pathology to confirm the benign diagnosis',
          'Normal activity usually resumes within a few days',
          'The scar fades gradually and is often barely noticeable',
          'Routine follow-up confirms complete resolution',
        ],
      },
    ],
  },
  'gi-oncology': {
    introSections: [
      {
        heading: 'A Wide Field Covering Several Organ Systems',
        body: 'GI oncology covers cancers of the stomach, colon, rectum, liver, pancreas, and bile ducts, each with its own patterns of growth, spread, and treatment. What they share is that surgery, when the disease is caught at an operable stage, remains one of the most effective ways to achieve long-term control or cure. Because these organs sit close together and share blood supply, GI cancer surgery often requires careful planning around vessels and adjacent structures, which is why experience with this specific anatomy matters.',
      },
      {
        heading: 'Balancing Aggressive Treatment With Recovery',
        body: 'GI cancers are frequently diagnosed at a stage where the tumour is large or has begun to spread locally, which means surgery can be extensive. The goal is always to remove the disease completely while preserving as much normal digestive function as possible, since procedures on the stomach, bowel, or liver directly affect how a patient eats and digests afterward. Where minimally invasive techniques are suitable, they\'re used to reduce recovery time, but the priority is always a complete and safe cancer removal first.',
      },
      {
        heading: 'Minimally Invasive Surgery in GI Cancers',
        body: 'For suitable GI cancers, laparoscopic and robotic techniques allow the same thorough removal through small port incisions instead of a large abdominal cut. The magnified view is particularly useful in GI anatomy, where tumours often sit close to major vessels and neighbouring organs, and robotic instruments add controlled, wristed movement for delicate dissection. Patients who qualify for these approaches typically experience less pain, fewer wound complications, and an earlier return to eating and normal activity, without any compromise in the completeness of the cancer removal.',
      },
    ],
    bulletBlocks: [
      {
        heading: 'Cancers and Conditions Treated',
        subheading: 'GI cancers commonly seen in practice',
        items: [
          'Stomach (gastric) cancer',
          'Colorectal cancer, including colon and rectal tumours',
          'Liver tumours, both primary and cancers that have spread to the liver',
          'Pancreatic cancer',
          'Bile duct and gallbladder cancers',
        ],
      },
      {
        heading: 'Who Should Seek a Surgical Opinion',
        subheading: 'Common reasons for referral',
        items: [
          'A confirmed GI cancer diagnosis from endoscopy or biopsy',
          'Unexplained weight loss, persistent abdominal pain, or changes in bowel habit',
          'Abnormal findings on CT or MRI requiring surgical assessment',
          'Cancer that has been treated with chemotherapy and is now being reassessed for surgery',
          'A second opinion on whether a tumour is safely operable',
        ],
      },
      {
        heading: 'What the Treatment Path Often Involves',
        subheading: 'How GI cancer care is typically sequenced',
        items: [
          'Detailed staging with CT, MRI, or endoscopic ultrasound before any surgery',
          'Multidisciplinary tumour board review to confirm the best treatment order',
          'Surgery alone, or surgery combined with chemotherapy before or after',
          'Minimally invasive or robotic techniques where the tumour and anatomy allow',
          'Structured follow-up to monitor for recurrence after treatment',
        ],
      },
      {
        heading: 'Advantages of a Minimally Invasive Approach',
        subheading: 'What keyhole techniques offer GI cancer patients',
        items: [
          'Smaller incisions with less postoperative pain',
          'Lower rates of wound infection and hernia at the incision site',
          'Earlier return of bowel function and resumption of eating',
          'Shorter hospital stay and quicker return to daily life',
          'The same standard of cancer clearance as open surgery',
        ],
      },
      {
        heading: 'What to Expect After GI Cancer Surgery',
        subheading: 'The typical recovery path',
        items: [
          'Gradual reintroduction of diet as bowel function returns',
          'Early walking encouraged from the first day after surgery',
          'The pathology report guides whether further chemotherapy is advised',
          'Temporary or, rarely, permanent stoma in some bowel operations',
          'Scheduled scans and blood tests to watch for recurrence',
        ],
      },
    ],
  },
  'retroperitoneal-tumor-surgery': {
    introSections: [
      {
        heading: 'A Less Common but Technically Demanding Area',
        body: 'The retroperitoneum is the space at the back of the abdominal cavity, behind the intestines, where major blood vessels, the kidneys, and other structures sit. Tumours here, whether sarcomas or other rare growths, are less common than breast or GI cancers, but they tend to be technically demanding to remove because of how closely they sit against vital structures. These tumours often grow silently for a long time before causing symptoms, which means many are found larger than expected by the time they\'re diagnosed.',
      },
      {
        heading: 'Why Experience With This Anatomy Matters',
        body: 'Because retroperitoneal tumours can involve or sit right against major blood vessels, kidneys, or other organs, surgery here requires meticulous planning, often with input from vascular or urologic colleagues depending on what the tumour is touching. The goal is always complete removal with clear margins, since incomplete removal significantly increases the chance of the tumour returning. This isn\'t surgery to approach casually, and getting an accurate pre-operative picture through imaging is essential before any operation is planned.',
      },
      {
        heading: 'Complete Removal Is the Priority',
        body: 'For retroperitoneal tumours, particularly sarcomas, the best protection against recurrence is removing the tumour completely with a margin of healthy tissue — often called an en bloc resection. Because these growths can wrap around or press against neighbouring structures, surgery sometimes means removing an adjacent organ, such as a kidney or part of the bowel, in the same operation to achieve clear margins. This is why detailed cross-sectional imaging and honest pre-operative discussion matter so much: patients need to understand beforehand what the operation may involve and why thoroughness at the first surgery offers the strongest long-term protection.',
      },
    ],
    bulletBlocks: [
      {
        heading: 'What This Surgery Addresses',
        subheading: 'Types of tumours managed in this space',
        items: [
          'Retroperitoneal sarcomas',
          'Tumours involving or adjacent to the kidney',
          'Tumours near major abdominal blood vessels',
          'Recurrent retroperitoneal disease after previous surgery',
          'Rare retroperitoneal growths requiring specialist surgical assessment',
        ],
      },
      {
        heading: 'Who Typically Needs This Surgery',
        subheading: 'Situations leading to a referral',
        items: [
          'A retroperitoneal mass identified incidentally or through imaging for another reason',
          'Vague abdominal or back discomfort that led to a scan showing a mass',
          'A biopsy-confirmed retroperitoneal tumour requiring surgical planning',
          'Recurrence after a previous retroperitoneal tumour removal',
          'A second opinion on whether a tumour is safely operable',
        ],
      },
      {
        heading: 'How These Cases Are Approached',
        subheading: 'What careful planning looks like here',
        items: [
          'Detailed CT or MRI imaging to map the tumour against surrounding structures',
          'Multidisciplinary input, including vascular or urologic surgery where needed',
          'Planning for potential involvement of major vessels or the kidney before surgery',
          'Complete surgical removal aimed at clear margins to reduce recurrence risk',
          'Long-term follow-up imaging given the possibility of late recurrence',
        ],
      },
      {
        heading: 'What the Operation May Involve',
        subheading: 'Elements of a typical retroperitoneal resection',
        items: [
          'En bloc removal of the tumour with a margin of surrounding tissue',
          'Removal of an adjacent organ (such as a kidney) when the tumour involves it',
          'Coordination with vascular surgery if major vessels are affected',
          'Careful reconstruction of normal anatomy after the tumour is out',
          'Pathology assessment of margins to confirm complete removal',
        ],
      },
      {
        heading: 'What to Expect After Surgery',
        subheading: 'Recovery following major retroperitoneal surgery',
        items: [
          'Close monitoring in the early days, sometimes in a high-dependency unit',
          'A longer hospital stay than for standard abdominal operations',
          'Gradual return to eating and activity over several weeks',
          'Regular cross-sectional imaging to watch for recurrence',
          'Multidisciplinary review of the final pathology before discharge planning',
        ],
      },
    ],
  },
  'minimal-access-surgery': {
    introSections: [
      {
        heading: 'Smaller Incisions, Same Surgical Goal',
        body: 'Minimal access surgery, commonly known as laparoscopic or keyhole surgery, uses small incisions and a camera to perform operations that once required a large open cut. In cancer surgery specifically, this approach has to meet the same standard as open surgery: complete removal of the tumour with clear margins. It isn\'t chosen because it\'s easier; it\'s chosen when it can achieve the identical oncologic outcome while giving the patient a faster, less painful recovery.',
      },
      {
        heading: 'Where Robotic Systems Add Further Precision',
        body: 'Robotic-assisted surgery takes minimal access techniques a step further, giving the surgeon a magnified 3D view and wristed instruments that move with more range than the human hand. This is particularly useful in tight anatomical spaces, such as around the pelvis or deep in the abdomen, where precision around blood vessels and nerves matters. Not every case needs robotic assistance, but where it\'s available and appropriate, it can meaningfully improve accuracy.',
      },
      {
        heading: 'Laparoscopic or Robotic — How the Choice Is Made',
        body: 'Standard laparoscopy suits most routine keyhole procedures and is widely available. Robotic assistance tends to earn its place in more demanding territory: deep pelvic work, fine dissection close to major vessels, or reconstruction steps where the extra instrument control genuinely changes what can be done safely through small ports. The decision is made on the specifics of the case, not on the novelty of the technology — the goal is always the safest route to a complete operation, whichever platform delivers it.',
      },
    ],
    bulletBlocks: [
      {
        heading: 'Where Minimal Access Techniques Are Used',
        subheading: 'Procedures commonly performed this way',
        items: [
          'Laparoscopic and robotic GI cancer surgery',
          'Minimally invasive gynaecological cancer surgery',
          'Hernia repair and gallbladder removal',
          'Selected thoracic procedures via small port incisions',
          'Diagnostic laparoscopy to assess extent of disease before major surgery',
        ],
      },
      {
        heading: 'Benefits Compared to Open Surgery',
        subheading: 'What patients typically experience',
        items: [
          'Smaller incisions and noticeably less scarring',
          'Reduced post-operative pain in most cases',
          'Shorter hospital stays and quicker return to daily activities',
          'Lower rates of wound infection compared to large open incisions',
          'Faster recovery of bowel function after abdominal procedures',
        ],
      },
      {
        heading: 'When This Approach May Not Be Suitable',
        subheading: 'Honest limitations worth knowing',
        items: [
          'Very large tumours where safe removal needs open access',
          'Extensive disease involving multiple organs or structures',
          'Certain prior surgeries that make keyhole access more difficult',
          'Emergency situations requiring immediate open surgery',
          'Cases where converting to open surgery mid-procedure is the safer choice',
        ],
      },
      {
        heading: 'Who Is a Good Candidate',
        subheading: 'Factors that favour a keyhole approach',
        items: [
          'Localised disease that can be fully removed through port access',
          'Tumour size and position compatible with safe minimally invasive removal',
          'Reasonable fitness for general anaesthesia',
          'Limited prior abdominal surgery or scarring in the operative area',
          'Cases where faster recovery meaningfully benefits the patient',
        ],
      },
      {
        heading: 'What to Expect After Keyhole Surgery',
        subheading: 'The recovery experience most patients report',
        items: [
          'Walking within hours and discharge earlier than open surgery',
          'Small dressings over port sites rather than a large wound',
          'Less need for strong pain medication during recovery',
          'Quicker return to work and normal daily activity',
          'The same cancer surveillance schedule as after open surgery',
        ],
      },
    ],
  },
  'gynaecological-malignancies': {
    introSections: [
      {
        heading: 'Cancers That Need a Coordinated, Careful Approach',
        body: 'Gynaecological cancers, including those of the ovary, uterus, cervix, and vulva, often present differently from one another and require different surgical strategies. Ovarian cancer, for instance, is frequently diagnosed at a more advanced stage and may involve extensive surgery to remove disease from multiple areas of the abdomen, while early cervical or uterine cancers can sometimes be treated with more limited, fertility-preserving procedures depending on the stage and the patient\'s wishes. Getting the diagnosis and staging right before surgery is especially important in this field, since it directly shapes what kind of operation makes sense.',
      },
      {
        heading: 'Considering the Whole Patient, Not Just the Cancer',
        body: 'For younger women, especially those who haven\'t completed their families, fertility preservation is a real consideration that gets discussed openly wherever it\'s medically appropriate. For others, the priority may be complete surgical clearance, sometimes combined with chemotherapy before or after the operation. Every plan starts with an honest conversation about what the cancer stage allows for, rather than assuming one approach fits everyone.',
      },
      {
        heading: 'Minimally Invasive Options in Gynaecological Cancer Surgery',
        body: 'For early-stage uterine and cervical cancers, laparoscopic and robotic techniques allow complete surgical staging — removal of the uterus, and assessment of lymph nodes where needed — through small incisions, with the magnified view proving especially useful in the confined anatomy of the pelvis. Advanced ovarian cancer is a different situation: it often requires open surgery to remove disease thoroughly from multiple areas of the abdomen, and occasionally heated intraperitoneal chemotherapy (HIPEC) in selected cases. The approach is matched to what the stage and spread of disease genuinely demand, not applied uniformly.',
      },
    ],
    bulletBlocks: [
      {
        heading: 'Cancers Treated',
        subheading: 'Gynaecological malignancies commonly managed',
        items: [
          'Ovarian cancer',
          'Uterine (endometrial) cancer',
          'Cervical cancer',
          'Vulvar cancer',
          'Peritoneal cancers originating from gynaecological organs',
        ],
      },
      {
        heading: 'Who Should Seek a Surgical Opinion',
        subheading: 'Reasons patients are typically referred',
        items: [
          'Abnormal vaginal bleeding, especially after menopause',
          'A pelvic mass identified on ultrasound or CT',
          'An abnormal Pap smear requiring further evaluation',
          'A confirmed gynaecological cancer diagnosis needing surgical staging or treatment',
          'Persistent pelvic pain or bloating that hasn\'t been explained',
        ],
      },
      {
        heading: 'What the Treatment Process Involves',
        subheading: 'How care is usually structured',
        items: [
          'Imaging and, where needed, biopsy to confirm diagnosis before surgery',
          'Surgical staging to determine exactly how far the cancer has spread',
          'Complete surgical removal of disease where achievable',
          'Coordination with medical oncology for chemotherapy before or after surgery',
          'Fertility-preserving options discussed where the stage and patient\'s wishes allow',
        ],
      },
      {
        heading: 'Surgical Approaches Used',
        subheading: 'How operations are matched to the cancer and stage',
        items: [
          'Laparoscopic or robotic hysterectomy and staging for early uterine cancer',
          'Radical surgery for cervical cancer where stage requires it',
          'Open cytoreductive surgery for advanced ovarian cancer',
          'Lymph node assessment to establish accurate staging',
          'Fertility-sparing procedures in carefully selected early cases',
        ],
      },
      {
        heading: 'What to Expect After Surgery',
        subheading: 'Recovery following gynaecological cancer surgery',
        items: [
          'Shorter hospital stay and quicker recovery after keyhole procedures',
          'Longer recuperation after extensive open surgery for advanced disease',
          'The final pathology and staging determine whether chemotherapy follows',
          'Discussion of hormonal and menopause-related effects where relevant',
          'Structured follow-up for surveillance and symptom review',
        ],
      },
    ],
  },
  'thoracic-cancer': {
    introSections: [
      {
        heading: 'Operating in a Complex, Vital Part of the Body',
        body: 'Thoracic cancer surgery deals with tumours in the lungs, chest wall, and surrounding structures, an area where the heart, major blood vessels, and airways all sit close together. Lung cancer is the most common condition treated here, and surgical removal, when the disease is caught early enough, remains one of the best chances for long-term cure. The chest\'s anatomy demands a surgeon who\'s comfortable working precisely in a confined space with very little room for error.',
      },
      {
        heading: 'Video-Assisted and Minimally Invasive Techniques',
        body: 'Traditional chest surgery required opening the ribcage widely, which came with significant pain and a long recovery. VATS (video-assisted thoracoscopic surgery) has changed that for many patients, allowing lung tissue to be removed through small incisions with camera guidance instead. This isn\'t right for every case, particularly larger or more centrally located tumours, but where it\'s appropriate, it makes a real difference to how quickly a patient gets back on their feet.',
      },
      {
        heading: 'Matching the Operation to the Disease',
        body: 'The extent of thoracic surgery depends on the tumour\'s size, position, and stage. Early peripheral lung cancers can often be treated by removing a single lobe through keyhole incisions, with lymph nodes sampled at the same time for accurate staging. Larger or centrally placed tumours may call for open surgery, and occasionally removal of more than one lobe. Before anything is decided, lung function testing confirms the patient can safely tolerate the planned resection — an assessment that shapes the recommendation as much as the scans do.',
      },
    ],
    bulletBlocks: [
      {
        heading: 'Conditions Treated',
        subheading: 'Thoracic cancers commonly managed',
        items: [
          'Lung cancer, both early and locally advanced stages',
          'Chest wall tumours',
          'Mediastinal (central chest) tumours',
          'Cancers that have spread to the lung from elsewhere in the body',
          'Pleural conditions requiring surgical diagnosis or treatment',
        ],
      },
      {
        heading: 'Who Should Seek an Evaluation',
        subheading: 'Symptoms and situations that warrant referral',
        items: [
          'A lung nodule or mass found on chest X-ray or CT scan',
          'Persistent cough, chest pain, or coughing up blood',
          'Unexplained weight loss alongside respiratory symptoms',
          'A confirmed lung cancer diagnosis being assessed for surgery',
          'Smoking history combined with new or worsening respiratory symptoms',
        ],
      },
      {
        heading: 'What Treatment Typically Involves',
        subheading: 'How thoracic cancer care is approached',
        items: [
          'Detailed imaging, including CT and often PET scan, before any surgery',
          'Lung function testing to confirm a patient can safely tolerate surgery',
          'VATS (minimally invasive) surgery where the tumour and location allow',
          'Open thoracic surgery for larger or more complex cases',
          'Multidisciplinary planning with medical and radiation oncology when needed',
        ],
      },
      {
        heading: 'Why Minimally Invasive Surgery Is Preferred Where Possible',
        subheading: 'The advantages of avoiding an open thoracotomy',
        items: [
          'Small incisions spare the ribs and chest wall muscles from being spread',
          'Considerably less postoperative pain than open chest surgery',
          'Earlier walking and deep breathing, reducing chest infection risk',
          'Shorter hospital stay and faster return to normal activity',
          'Oncologic outcomes comparable to open surgery in suitable cases',
        ],
      },
      {
        heading: 'What to Expect After Chest Surgery',
        subheading: 'The typical recovery course',
        items: [
          'A temporary chest drain while the remaining lung re-expands',
          'Breathing exercises and early walking from the first day',
          'Most keyhole-surgery patients home within three to five days',
          'Gradual return to full activity over the following weeks',
          'Scheduled scans and reviews to monitor recovery and check for recurrence',
        ],
      },
    ],
  },
  'vats-lobectomy': {
    introSections: [
      {
        heading: 'Minimally Invasive Lung Lobe Removal',
        body: 'VATS Lobectomy (Video-Assisted Thoracoscopic Surgery) is a minimally invasive procedure used to remove a diseased lobe of the lung using small keyhole incisions. This technique allows surgeons to access the lung with a camera and specialised instruments, avoiding the large cuts used in traditional open surgery. VATS improves surgical precision, reduces postoperative pain, shortens hospital stay, and enhances recovery. It is routinely performed for early-stage lung cancer, selected benign lung lesions, and certain infections, offering excellent long-term oncologic outcomes and faster return to normal activities.',
      },
      {
        heading: 'A Safer Alternative to Open Thoracotomy',
        body: 'VATS Lobectomy provides a safe and effective alternative to open thoracotomy for many patients with lung cancer. By using a high-definition thoracoscopic camera, surgeons achieve better visualisation of lung structures while causing minimal trauma to muscles and ribs. This reduces complications such as bleeding, infections, and prolonged pain. Patients benefit from improved breathing, quicker mobilisation, and smaller scars. VATS is widely accepted as the gold standard for early-stage lung cancer in suitable candidates and offers survival outcomes comparable to open surgery with significantly better postoperative comfort.',
      },
      {
        heading: 'Precise Tumour Removal With Minimal Chest Wall Trauma',
        body: 'VATS Lobectomy enables precise removal of lung tumours with minimal chest wall disruption. Lymph node dissection is performed through the same incisions, ensuring accurate cancer staging and complete surgical removal. Patients undergoing VATS typically experience less need for pain medication, improved lung expansion, and faster rehabilitation. This technique is ideal for patients who value quicker recovery without compromising oncologic safety.',
      },
    ],
    bulletBlocks: [
      {
        heading: 'What VATS Lobectomy Is',
        subheading: 'Minimally invasive lung surgery using keyhole thoracoscopic access.',
        items: [
          'Uses 2–3 small incisions instead of a large chest cut',
          'A camera (thoracoscope) provides magnified internal views',
          'Specialised instruments remove the affected lung lobe safely',
          'Includes lymph node sampling or dissection for accurate staging',
          'Ensures complete tumour removal with minimal trauma',
        ],
      },
      {
        heading: 'Why VATS Lobectomy Is Used',
        subheading: 'Safe, effective treatment for early and select advanced lung diseases.',
        items: [
          'Standard treatment for early-stage non-small cell lung cancer',
          'Reduces pain, complications, and long recovery associated with open surgery',
          'Allows precise dissection and superior visualisation',
          'Minimises lung trauma and preserves remaining lung function',
          'Suitable for benign lung lesions, infections, and selected tumours',
        ],
      },
      {
        heading: 'Who Are Suitable Candidates',
        subheading: 'Patients selected based on tumour location, stage, and lung function.',
        items: [
          'Individuals with early-stage non-small cell lung cancer',
          'Patients with peripheral lung tumours accessible through VATS',
          'Those medically fit for general anesthesia and single-lung ventilation',
          'Patients with benign lung conditions requiring lobectomy',
          'Individuals assessed and approved by a thoracic surgery team',
        ],
      },
      {
        heading: 'Advantages of VATS Lobectomy',
        subheading: 'Better recovery and equal oncologic outcomes compared to open surgery.',
        items: [
          'Less postoperative pain and quicker return to daily activities',
          'Smaller incisions and better cosmetic results',
          'Lower risk of bleeding, infection, and lung complications',
          'Shorter hospital stay and faster rehabilitation',
          'Excellent cancer control with full lymph node removal',
        ],
      },
      {
        heading: 'What to Expect After Surgery',
        subheading: 'Smooth recovery supported by enhanced recovery protocols.',
        items: [
          'Chest drain initially placed to remove air and fluid',
          'Patients encouraged to walk within 24 hours',
          'Breathing exercises help lung expansion and healing',
          'Most patients go home within 3–5 days',
          'Follow-up evaluations ensure good lung function and cancer surveillance',
        ],
      },
    ],
  },
};
