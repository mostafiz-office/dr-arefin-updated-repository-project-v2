/**
 * Central FAQ registry — single source of truth for all site-wide FAQs.
 *
 * Each entry has a unique `slug` (URL: /faq/<slug>/) and is grouped by
 * `category` so individual pages can pull a relevant subset.
 *
 * To add a new FAQ:
 *  1. Append a new entry below with a unique slug.
 *  2. Add the slug to the appropriate page's `slugs` array in
 *     `getFaqsForPage()` or call `getFaqsByCategory()` from your page.
 *  3. The /faq/<slug>/ route is generated automatically.
 */

import type { FAQItem } from "@/components/arefin/FAQAccordion";
import { slugifyQuestion } from "@/components/arefin/FAQAccordion";

export type FAQCategory = "general" | "about" | "treatment" | "consultation";

export interface FAQEntry extends FAQItem {
  slug: string;
  /** Plain-text answer used for FAQPage JSON-LD AND the dedicated /faq/<slug>/ page body. */
  aText: string;
  /** Categories this FAQ belongs to (a single FAQ can appear on multiple pages). */
  categories: FAQCategory[];
  /** Optional H1 / page title override for the dedicated FAQ page. */
  pageTitle?: string;
  /** Optional meta description override (≤160 chars). */
  metaDesc?: string;
}

/* ── Registry ── */
export const faqRegistry: FAQEntry[] = [
  {
    slug: "where-does-dr-arefin-see-patients",
    q: "Where does Dr. Arefin see patients?",
    aText:
      "Dr. Murshidul Arefin consults at Popular Medical College Hospital, Dhanmondi, Dhaka. You can book an appointment by phone or WhatsApp at +880 1311 487 592.",
    a: "Dr. Murshidul Arefin consults at Popular Medical College Hospital, Dhanmondi, Dhaka. You can book an appointment by phone or WhatsApp at +880 1311 487 592.",
    categories: ["general", "consultation"],
  },
  {
    slug: "what-conditions-does-dr-arefin-treat",
    q: "What conditions does Dr. Arefin treat?",
    aText:
      "He specializes in hepatobiliary, liver, gallbladder, biliary tract and pancreatic diseases — including liver cancer, gallstones, bile duct strictures, pancreatic tumors, and laparoscopic cholecystectomy. He also performs liver resections and transplant evaluations.",
    a: "He specializes in hepatobiliary, liver, gallbladder, biliary tract and pancreatic diseases — including liver cancer, gallstones, bile duct strictures, pancreatic tumors, and laparoscopic cholecystectomy. He also performs liver resections and transplant evaluations.",
    categories: ["general", "treatment"],
  },
  {
    slug: "how-can-i-book-a-consultation",
    q: "How can I book a consultation?",
    aText:
      "Call +880 1311 487 592, message on WhatsApp, or use the contact page. Please bring all previous reports, imaging (USG, CT, MRI, MRCP) and prescriptions to your first visit so the consultation can be focused and efficient.",
    a: "Call +880 1311 487 592, message on WhatsApp, or use the contact page. Please bring all previous reports, imaging (USG, CT, MRI, MRCP) and prescriptions to your first visit so the consultation can be focused and efficient.",
    categories: ["general", "about", "consultation"],
  },
  {
    slug: "does-dr-arefin-perform-laparoscopic-surgery",
    q: "Does Dr. Arefin perform laparoscopic (key-hole) surgery?",
    aText:
      "Yes. Whenever clinically appropriate, surgeries such as gallbladder removal and selected liver and biliary procedures are performed laparoscopically — meaning smaller incisions, less pain, and faster recovery.",
    a: "Yes. Whenever clinically appropriate, surgeries such as gallbladder removal and selected liver and biliary procedures are performed laparoscopically — meaning smaller incisions, less pain, and faster recovery.",
    categories: ["general", "treatment"],
  },
  {
    slug: "do-you-offer-second-opinions",
    q: "Do you offer second opinions on existing reports?",
    aText:
      "Yes. Patients are welcome to bring outside imaging and biopsy reports for a second opinion before deciding on surgery. Honest, evidence-based guidance is part of every consultation.",
    a: "Yes. Patients are welcome to bring outside imaging and biopsy reports for a second opinion before deciding on surgery. Honest, evidence-based guidance is part of every consultation.",
    categories: ["general", "consultation"],
  },
  {
    slug: "is-financial-assistance-available",
    q: "Is financial assistance available for major surgery?",
    aText:
      "Through our patient initiatives, support is available for selected complex liver and hepatobiliary surgeries for patients in genuine need. Please discuss your case during the initial consultation.",
    a: "Through our patient initiatives, support is available for selected complex liver and hepatobiliary surgeries for patients in genuine need. Please discuss your case during the initial consultation.",
    categories: ["general"],
  },
  {
    slug: "what-is-dr-arefin-specialty",
    q: "What is Dr. Arefin's specialty?",
    aText:
      "Dr. Murshidul Arefin is a hepatobiliary and liver transplant surgeon — focusing on liver, gallbladder, biliary tract and pancreatic disease, with both open and laparoscopic surgical expertise.",
    a: "Dr. Murshidul Arefin is a hepatobiliary and liver transplant surgeon — focusing on liver, gallbladder, biliary tract and pancreatic disease, with both open and laparoscopic surgical expertise.",
    categories: ["about"],
  },
  {
    slug: "where-does-dr-arefin-practice",
    q: "Where does Dr. Arefin practice?",
    aText:
      "He is Associate Professor at Popular Medical College Hospital, Dhanmondi, Dhaka, where he sees patients and performs surgery.",
    a: "He is Associate Professor at Popular Medical College Hospital, Dhanmondi, Dhaka, where he sees patients and performs surgery.",
    categories: ["about"],
  },
  {
    slug: "what-are-his-qualifications",
    q: "What are his qualifications?",
    aText:
      "MBBS, MS in Hepatobiliary Surgery, with over a decade of focused surgical experience and 1,000+ successful procedures across hepatobiliary and upper-GI care.",
    a: "MBBS, MS in Hepatobiliary Surgery, with over a decade of focused surgical experience and 1,000+ successful procedures across hepatobiliary and upper-GI care.",
    categories: ["about"],
  },
  {
    slug: "does-he-handle-complex-liver-transplant-cases",
    q: "Does he handle complex liver transplant cases?",
    aText:
      "Yes. Dr. Arefin has dedicated training and case experience in liver transplant evaluation, complex hepatic resection and post-transplant follow-up coordination.",
    a: "Yes. Dr. Arefin has dedicated training and case experience in liver transplant evaluation, complex hepatic resection and post-transplant follow-up coordination.",
    categories: ["about", "treatment"],
  },
  {
    slug: "best-hepatobiliary-surgeon-in-dhanmondi-dhaka",
    q: "Who is the best hepatobiliary surgeon in Dhanmondi, Dhaka?",
    aText:
      "Dr. Murshidul Arefin is widely recognised as a leading hepatobiliary surgeon in Dhanmondi, Dhaka — Associate Professor at Popular Medical College Hospital with 1,000+ liver, gallbladder, biliary and pancreatic procedures and dedicated training in liver transplant evaluation.",
    a: "Dr. Murshidul Arefin is widely recognised as a leading hepatobiliary surgeon in Dhanmondi, Dhaka — Associate Professor at Popular Medical College Hospital with 1,000+ liver, gallbladder, biliary and pancreatic procedures and dedicated training in liver transplant evaluation.",
    categories: ["about"],
  },
  {
    slug: "chamber-address-and-visiting-hours-dhanmondi",
    q: "What is Dr. Arefin's chamber address and visiting hours in Dhanmondi?",
    aText:
      "Dr. Arefin sees patients at Popular Medical College Hospital, House 25, Road 2, Dhanmondi, Dhaka 1205. Chamber visits run on scheduled afternoons and evenings; please call +880 1311 487 592 or message on WhatsApp to confirm the next available slot.",
    a: "Dr. Arefin sees patients at Popular Medical College Hospital, House 25, Road 2, Dhanmondi, Dhaka 1205. Chamber visits run on scheduled afternoons and evenings; please call +880 1311 487 592 or message on WhatsApp to confirm the next available slot.",
    categories: ["about", "consultation"],
  },
  {
    slug: "appointment-fees-and-payment-dhaka",
    q: "What are Dr. Arefin's consultation fees in Dhaka and how do I pay?",
    aText:
      "Standard chamber consultation fees follow Popular Medical College Hospital's published rates for senior consultants. Surgical case quotes are shared transparently after review of imaging and reports. Payment is accepted in cash, card and bKash at the hospital reception.",
    a: "Standard chamber consultation fees follow Popular Medical College Hospital's published rates for senior consultants. Surgical case quotes are shared transparently after review of imaging and reports. Payment is accepted in cash, card and bKash at the hospital reception.",
    categories: ["about", "consultation"],
  },
  {
    slug: "international-and-out-of-dhaka-patients",
    q: "Can patients from outside Dhaka or abroad consult Dr. Arefin?",
    aText:
      "Yes. Patients travelling from across Bangladesh, and from cities such as Melbourne, Dubai and Riyadh, regularly consult Dr. Arefin in Dhanmondi. Imaging and biopsy reports can be reviewed in advance over WhatsApp so that in-person visits and surgery scheduling are efficient.",
    a: "Yes. Patients travelling from across Bangladesh, and from cities such as Melbourne, Dubai and Riyadh, regularly consult Dr. Arefin in Dhanmondi. Imaging and biopsy reports can be reviewed in advance over WhatsApp so that in-person visits and surgery scheduling are efficient.",
    categories: ["about", "consultation"],
  },

  /* ── Liver Surgery — Dhanmondi/Dhaka SEO set (T25) ────────────────────── */
  {
    slug: "how-much-does-liver-surgery-cost-in-dhaka",
    q: "How much does liver surgery cost in Dhaka?",
    aText:
      "Liver surgery costs in Dhaka vary by procedure complexity — laparoscopic resections are typically less expensive than open major resections or transplant work-up. Dr. Arefin's team at Popular Medical College Hospital, Dhanmondi shares a transparent written quote after reviewing your imaging and reports.",
    a: "Liver surgery costs in Dhaka vary by procedure complexity — laparoscopic resections are typically less expensive than open major resections or transplant work-up. Dr. Arefin's team at Popular Medical College Hospital, Dhanmondi shares a transparent written quote after reviewing your imaging and reports.",
    categories: ["treatment"],
  },
  {
    slug: "who-is-the-best-liver-surgeon-in-dhanmondi-dhaka",
    q: "Who is the best liver surgeon in Dhanmondi, Dhaka?",
    aText:
      "Dr. Murshidul Arefin is widely regarded as a leading liver surgeon in Dhanmondi, Dhaka — Associate Professor at Popular Medical College Hospital with sub-specialty training in hepatobiliary and liver transplant surgery and 1,000+ procedures performed.",
    a: "Dr. Murshidul Arefin is widely regarded as a leading liver surgeon in Dhanmondi, Dhaka — Associate Professor at Popular Medical College Hospital with sub-specialty training in hepatobiliary and liver transplant surgery and 1,000+ procedures performed.",
    categories: ["treatment"],
  },
  {
    slug: "where-is-liver-transplant-surgery-available-in-dhaka",
    q: "Where is liver transplant surgery available in Dhaka?",
    aText:
      "Liver transplant evaluation and post-transplant follow-up with Dr. Arefin are based at Popular Medical College Hospital, Dhanmondi, Dhaka. Donor-recipient assessment, imaging review and multidisciplinary discussion are coordinated through this single chamber to keep the pathway simple for families.",
    a: "Liver transplant evaluation and post-transplant follow-up with Dr. Arefin are based at Popular Medical College Hospital, Dhanmondi, Dhaka. Donor-recipient assessment, imaging review and multidisciplinary discussion are coordinated through this single chamber to keep the pathway simple for families.",
    categories: ["treatment"],
  },
  {
    slug: "success-rate-of-liver-surgery-at-popular-medical-college-hospital",
    q: "What is the success rate of liver surgery at Popular Medical College Hospital?",
    aText:
      "Outcomes for liver surgery at Popular Medical College Hospital under Dr. Arefin's team are in line with international hepatobiliary benchmarks. Realistic, case-specific figures — including risk, recovery time and recurrence — are explained at consultation rather than promised in advance.",
    a: "Outcomes for liver surgery at Popular Medical College Hospital under Dr. Arefin's team are in line with international hepatobiliary benchmarks. Realistic, case-specific figures — including risk, recovery time and recurrence — are explained at consultation rather than promised in advance.",
    categories: ["treatment"],
  },
  {
    slug: "how-long-does-recovery-after-liver-resection-take-in-dhaka",
    q: "How long does recovery after liver resection take in Dhaka?",
    aText:
      "Most patients in Dhaka stay 5–7 days in hospital after laparoscopic liver resection and 7–14 days after open resection. Home recovery typically runs 4–6 weeks, with structured follow-up visits at the Dhanmondi chamber to monitor liver function and wound healing.",
    a: "Most patients in Dhaka stay 5–7 days in hospital after laparoscopic liver resection and 7–14 days after open resection. Home recovery typically runs 4–6 weeks, with structured follow-up visits at the Dhanmondi chamber to monitor liver function and wound healing.",
    categories: ["treatment"],
  },
  {
    slug: "is-laparoscopic-liver-surgery-available-in-dhanmondi",
    q: "Is laparoscopic liver surgery available in Dhanmondi?",
    aText:
      "Yes. Dr. Arefin performs minimally-invasive (laparoscopic) liver surgery at Popular Medical College Hospital, Dhanmondi for selected lesions and segmental resections. Smaller incisions, less pain and faster return to work are the typical benefits when laparoscopic access is clinically safe.",
    a: "Yes. Dr. Arefin performs minimally-invasive (laparoscopic) liver surgery at Popular Medical College Hospital, Dhanmondi for selected lesions and segmental resections. Smaller incisions, less pain and faster return to work are the typical benefits when laparoscopic access is clinically safe.",
    categories: ["treatment"],
  },
  {
    slug: "pre-operative-tests-needed-before-liver-surgery-in-dhaka",
    q: "What pre-operative tests are needed before liver surgery in Dhaka?",
    aText:
      "Standard work-up before liver surgery in Dhaka includes liver function tests, viral hepatitis markers, coagulation profile, triple-phase CT or MRI of the liver, and cardiac/pulmonary fitness review. Dr. Arefin's chamber issues a single consolidated checklist after the first consultation.",
    a: "Standard work-up before liver surgery in Dhaka includes liver function tests, viral hepatitis markers, coagulation profile, triple-phase CT or MRI of the liver, and cardiac/pulmonary fitness review. Dr. Arefin's chamber issues a single consolidated checklist after the first consultation.",
    categories: ["treatment"],
  },
  {
    slug: "does-dr-arefin-treat-liver-cancer-at-popular-medical-college-hospital",
    q: "Does Dr. Arefin treat liver cancer at Popular Medical College Hospital?",
    aText:
      "Yes. Dr. Arefin manages primary and secondary liver cancer at Popular Medical College Hospital, Dhanmondi — including hepatocellular carcinoma, colorectal liver metastases and selected biliary tract tumours. Multidisciplinary input from radiology and oncology is built into every plan.",
    a: "Yes. Dr. Arefin manages primary and secondary liver cancer at Popular Medical College Hospital, Dhanmondi — including hepatocellular carcinoma, colorectal liver metastases and selected biliary tract tumours. Multidisciplinary input from radiology and oncology is built into every plan.",
    categories: ["treatment"],
  },

  /* ── Gallbladder Surgery — Dhanmondi/Dhaka SEO set (T26) ──────────────── */
  {
    slug: "best-gallbladder-surgeon-in-dhanmondi-dhaka",
    q: "Who is the best gallbladder surgeon in Dhanmondi, Dhaka?",
    aText:
      "Dr. Murshidul Arefin is widely regarded as one of Dhanmondi's leading gallbladder surgeons — Associate Professor at Popular Medical College Hospital, with extensive experience in laparoscopic cholecystectomy, complicated gallstone disease and gallbladder cancer surgery.",
    a: "Dr. Murshidul Arefin is widely regarded as one of Dhanmondi's leading gallbladder surgeons — Associate Professor at Popular Medical College Hospital, with extensive experience in laparoscopic cholecystectomy, complicated gallstone disease and gallbladder cancer surgery.",
    categories: ["treatment"],
  },
  {
    slug: "how-much-does-gallbladder-stone-surgery-cost-in-dhaka",
    q: "How much does gallbladder stone surgery cost in Dhaka?",
    aText:
      "Gallbladder stone surgery costs in Dhaka depend on whether the operation is laparoscopic or open and on the length of hospital stay. Dr. Arefin's chamber at Popular Medical College Hospital, Dhanmondi shares a clear written estimate after reviewing your ultrasound and reports.",
    a: "Gallbladder stone surgery costs in Dhaka depend on whether the operation is laparoscopic or open and on the length of hospital stay. Dr. Arefin's chamber at Popular Medical College Hospital, Dhanmondi shares a clear written estimate after reviewing your ultrasound and reports.",
    categories: ["treatment"],
  },
  {
    slug: "is-laparoscopic-cholecystectomy-available-in-dhanmondi",
    q: "Is laparoscopic cholecystectomy available in Dhanmondi?",
    aText:
      "Yes. Dr. Arefin performs laparoscopic cholecystectomy at Popular Medical College Hospital, Dhanmondi using modern Storz laparoscopic systems — typically through three or four small incisions, with most patients going home within 24–48 hours.",
    a: "Yes. Dr. Arefin performs laparoscopic cholecystectomy at Popular Medical College Hospital, Dhanmondi using modern Storz laparoscopic systems — typically through three or four small incisions, with most patients going home within 24–48 hours.",
    categories: ["treatment"],
  },
  {
    slug: "how-long-does-recovery-after-gallbladder-surgery-take-in-dhaka",
    q: "How long does recovery after gallbladder surgery take in Dhaka?",
    aText:
      "After laparoscopic gallbladder removal in Dhaka, most patients return to light activity in 1–2 weeks and to normal work in 2–3 weeks. Open cholecystectomy needs 4–6 weeks of recovery, with structured follow-up at the Dhanmondi chamber.",
    a: "After laparoscopic gallbladder removal in Dhaka, most patients return to light activity in 1–2 weeks and to normal work in 2–3 weeks. Open cholecystectomy needs 4–6 weeks of recovery, with structured follow-up at the Dhanmondi chamber.",
    categories: ["treatment"],
  },
  {
    slug: "treatment-for-empyema-of-the-gallbladder-in-dhaka",
    q: "What is the treatment for empyema of the gallbladder in Dhaka?",
    aText:
      "Empyema of the gallbladder is a surgical emergency. Dr. Arefin's team at Popular Medical College Hospital, Dhanmondi treats it with urgent drainage and cholecystectomy — laparoscopic where safe, open if anatomy or sepsis demands — alongside targeted intravenous antibiotics.",
    a: "Empyema of the gallbladder is a surgical emergency. Dr. Arefin's team at Popular Medical College Hospital, Dhanmondi treats it with urgent drainage and cholecystectomy — laparoscopic where safe, open if anatomy or sepsis demands — alongside targeted intravenous antibiotics.",
    categories: ["treatment"],
  },
  {
    slug: "does-dr-arefin-perform-gallbladder-cancer-surgery-in-dhaka",
    q: "Does Dr. Arefin perform gallbladder cancer surgery in Dhaka?",
    aText:
      "Yes. Dr. Arefin performs oncologic gallbladder and bile-duct cancer resections at Popular Medical College Hospital, Dhanmondi, including extended cholecystectomy with liver-bed resection and lymphadenectomy, with multidisciplinary input from radiology and oncology.",
    a: "Yes. Dr. Arefin performs oncologic gallbladder and bile-duct cancer resections at Popular Medical College Hospital, Dhanmondi, including extended cholecystectomy with liver-bed resection and lymphadenectomy, with multidisciplinary input from radiology and oncology.",
    categories: ["treatment"],
  },
  {
    slug: "do-gallbladder-polyps-need-surgery-in-dhaka",
    q: "Do gallbladder polyps need surgery in Dhaka?",
    aText:
      "Not all gallbladder polyps need surgery. Dr. Arefin reviews ultrasound size, growth on follow-up scans and patient symptoms; polyps over about 10 mm, rapidly growing polyps or symptomatic polyps are typically removed by laparoscopic cholecystectomy at Popular Medical College Hospital, Dhanmondi.",
    a: "Not all gallbladder polyps need surgery. Dr. Arefin reviews ultrasound size, growth on follow-up scans and patient symptoms; polyps over about 10 mm, rapidly growing polyps or symptomatic polyps are typically removed by laparoscopic cholecystectomy at Popular Medical College Hospital, Dhanmondi.",
    categories: ["treatment"],
  },
  {
    slug: "how-to-book-a-gallbladder-surgery-consultation-in-dhanmondi",
    q: "How do I book a gallbladder surgery consultation in Dhanmondi?",
    aText:
      "To consult Dr. Arefin for gallbladder surgery in Dhanmondi, call +880 1311 487 592 or message on WhatsApp. The chamber at Popular Medical College Hospital, House 25, Road 2, Dhanmondi 1205 will share the next available afternoon or evening slot.",
    a: "To consult Dr. Arefin for gallbladder surgery in Dhanmondi, call +880 1311 487 592 or message on WhatsApp. The chamber at Popular Medical College Hospital, House 25, Road 2, Dhanmondi 1205 will share the next available afternoon or evening slot.",
    categories: ["treatment", "consultation"],
  },

  /* ── Pancreatic Surgery — Dhanmondi/Dhaka SEO set (T27) ──────────────── */
  {
    slug: "best-pancreatic-surgeon-in-dhanmondi-dhaka",
    q: "Who is the best pancreatic surgeon in Dhanmondi, Dhaka?",
    aText:
      "Dr. Murshidul Arefin is widely regarded as one of Dhanmondi's leading pancreatic surgeons — Associate Professor at Popular Medical College Hospital, with focused training in hepatopancreatobiliary surgery and experience in Whipple, distal pancreatectomy and complex pancreatic resections.",
    a: "Dr. Murshidul Arefin is widely regarded as one of Dhanmondi's leading pancreatic surgeons — Associate Professor at Popular Medical College Hospital, with focused training in hepatopancreatobiliary surgery and experience in Whipple, distal pancreatectomy and complex pancreatic resections.",
    categories: ["treatment"],
  },
  {
    slug: "how-much-does-whipple-surgery-cost-in-dhaka",
    q: "How much does Whipple surgery cost in Dhaka?",
    aText:
      "Whipple surgery (pancreaticoduodenectomy) costs in Dhaka depend on hospital stay, ICU care and case complexity. Dr. Arefin's chamber at Popular Medical College Hospital, Dhanmondi shares a transparent written quote after reviewing CT/MRI scans and biopsy reports.",
    a: "Whipple surgery (pancreaticoduodenectomy) costs in Dhaka depend on hospital stay, ICU care and case complexity. Dr. Arefin's chamber at Popular Medical College Hospital, Dhanmondi shares a transparent written quote after reviewing CT/MRI scans and biopsy reports.",
    categories: ["treatment"],
  },
  {
    slug: "where-is-whipple-surgery-performed-in-dhaka",
    q: "Where is Whipple surgery performed in Dhaka?",
    aText:
      "Dr. Arefin performs Whipple surgery (pancreaticoduodenectomy) at Popular Medical College Hospital, Dhanmondi, Dhaka — a tertiary centre with dedicated HPB anaesthesia, ICU and interventional radiology support that is essential for safe pancreatic surgery.",
    a: "Dr. Arefin performs Whipple surgery (pancreaticoduodenectomy) at Popular Medical College Hospital, Dhanmondi, Dhaka — a tertiary centre with dedicated HPB anaesthesia, ICU and interventional radiology support that is essential for safe pancreatic surgery.",
    categories: ["treatment"],
  },
  {
    slug: "how-long-does-recovery-after-whipple-surgery-take-in-dhaka",
    q: "How long does recovery after Whipple surgery take in Dhaka?",
    aText:
      "After Whipple surgery in Dhaka, hospital stay is typically 10–14 days, with a further 6–8 weeks of home recovery. Dr. Arefin's Dhanmondi chamber coordinates structured follow-up for diet, pancreatic enzyme replacement and blood-sugar monitoring.",
    a: "After Whipple surgery in Dhaka, hospital stay is typically 10–14 days, with a further 6–8 weeks of home recovery. Dr. Arefin's Dhanmondi chamber coordinates structured follow-up for diet, pancreatic enzyme replacement and blood-sugar monitoring.",
    categories: ["treatment"],
  },
  {
    slug: "does-dr-arefin-treat-pancreatic-cancer-in-dhaka",
    q: "Does Dr. Arefin treat pancreatic cancer in Dhaka?",
    aText:
      "Yes. Dr. Arefin manages pancreatic cancer at Popular Medical College Hospital, Dhanmondi — including head-of-pancreas tumours treated by Whipple resection and body/tail tumours treated by distal pancreatectomy, with multidisciplinary input from oncology and radiology.",
    a: "Yes. Dr. Arefin manages pancreatic cancer at Popular Medical College Hospital, Dhanmondi — including head-of-pancreas tumours treated by Whipple resection and body/tail tumours treated by distal pancreatectomy, with multidisciplinary input from oncology and radiology.",
    categories: ["treatment"],
  },
  {
    slug: "treatment-for-acute-and-chronic-pancreatitis-in-dhaka",
    q: "What is the treatment for acute and chronic pancreatitis in Dhaka?",
    aText:
      "Acute pancreatitis is managed conservatively in most cases, with surgical necrosectomy or drainage reserved for infected necrosis or complications. Chronic pancreatitis with intractable pain or duct obstruction is treated by drainage or resection at Dr. Arefin's Dhanmondi chamber.",
    a: "Acute pancreatitis is managed conservatively in most cases, with surgical necrosectomy or drainage reserved for infected necrosis or complications. Chronic pancreatitis with intractable pain or duct obstruction is treated by drainage or resection at Dr. Arefin's Dhanmondi chamber.",
    categories: ["treatment"],
  },
  {
    slug: "do-pancreatic-cysts-need-surgery-in-dhaka",
    q: "Do pancreatic cysts need surgery in Dhaka?",
    aText:
      "Not all pancreatic cysts need surgery. Dr. Arefin reviews MRI/MRCP and EUS findings; mucinous cysts, IPMNs with high-risk features and symptomatic cysts are typically resected at Popular Medical College Hospital, Dhanmondi, while simple serous cysts are usually monitored.",
    a: "Not all pancreatic cysts need surgery. Dr. Arefin reviews MRI/MRCP and EUS findings; mucinous cysts, IPMNs with high-risk features and symptomatic cysts are typically resected at Popular Medical College Hospital, Dhanmondi, while simple serous cysts are usually monitored.",
    categories: ["treatment"],
  },
  {
    slug: "how-to-book-a-pancreatic-surgery-consultation-in-dhanmondi",
    q: "How do I book a pancreatic surgery consultation in Dhanmondi?",
    aText:
      "To consult Dr. Arefin for pancreatic surgery in Dhanmondi, call +880 1311 487 592 or message on WhatsApp. Bring your CT/MRI, MRCP and biopsy reports to the chamber at Popular Medical College Hospital, House 25, Road 2, Dhanmondi 1205.",
    a: "To consult Dr. Arefin for pancreatic surgery in Dhanmondi, call +880 1311 487 592 or message on WhatsApp. Bring your CT/MRI, MRCP and biopsy reports to the chamber at Popular Medical College Hospital, House 25, Road 2, Dhanmondi 1205.",
    categories: ["treatment", "consultation"],
  },

  /* ── Biliary Tract Surgery — Dhanmondi/Dhaka SEO set (T28) ───────────── */
  {
    slug: "best-biliary-tract-surgeon-in-dhanmondi-dhaka",
    q: "Who is the best biliary tract surgeon in Dhanmondi, Dhaka?",
    aText:
      "Dr. Murshidul Arefin is widely regarded as one of Dhanmondi's leading biliary tract surgeons — Associate Professor at Popular Medical College Hospital, with sub-specialty training in hepatobiliary surgery and experience in bile duct reconstruction, hepaticojejunostomy and cholangiocarcinoma resection.",
    a: "Dr. Murshidul Arefin is widely regarded as one of Dhanmondi's leading biliary tract surgeons — Associate Professor at Popular Medical College Hospital, with sub-specialty training in hepatobiliary surgery and experience in bile duct reconstruction, hepaticojejunostomy and cholangiocarcinoma resection.",
    categories: ["treatment"],
  },
  {
    slug: "how-much-does-bile-duct-surgery-cost-in-dhaka",
    q: "How much does bile duct surgery cost in Dhaka?",
    aText:
      "Bile duct surgery costs in Dhaka depend on whether the operation is exploration, reconstruction or oncologic resection, and on hospital and ICU stay. Dr. Arefin's chamber at Popular Medical College Hospital, Dhanmondi shares a transparent written quote after reviewing MRCP, CT and lab reports.",
    a: "Bile duct surgery costs in Dhaka depend on whether the operation is exploration, reconstruction or oncologic resection, and on hospital and ICU stay. Dr. Arefin's chamber at Popular Medical College Hospital, Dhanmondi shares a transparent written quote after reviewing MRCP, CT and lab reports.",
    categories: ["treatment"],
  },
  {
    slug: "treatment-for-bile-duct-stricture-in-dhaka",
    q: "What is the treatment for bile duct stricture in Dhaka?",
    aText:
      "Benign bile duct strictures in Dhaka are typically managed with endoscopic stenting first; long, complex or post-surgical strictures often need hepaticojejunostomy. Dr. Arefin's team at Popular Medical College Hospital, Dhanmondi reviews MRCP and prior surgical notes before deciding the safest reconstruction.",
    a: "Benign bile duct strictures in Dhaka are typically managed with endoscopic stenting first; long, complex or post-surgical strictures often need hepaticojejunostomy. Dr. Arefin's team at Popular Medical College Hospital, Dhanmondi reviews MRCP and prior surgical notes before deciding the safest reconstruction.",
    categories: ["treatment"],
  },
  {
    slug: "does-dr-arefin-treat-cholangiocarcinoma-in-dhaka",
    q: "Does Dr. Arefin treat cholangiocarcinoma (bile duct cancer) in Dhaka?",
    aText:
      "Yes. Dr. Arefin manages cholangiocarcinoma at Popular Medical College Hospital, Dhanmondi — including hilar (Klatskin), distal and intrahepatic bile duct cancers — combining radical resection, vascular reconstruction and multidisciplinary input from oncology and radiology.",
    a: "Yes. Dr. Arefin manages cholangiocarcinoma at Popular Medical College Hospital, Dhanmondi — including hilar (Klatskin), distal and intrahepatic bile duct cancers — combining radical resection, vascular reconstruction and multidisciplinary input from oncology and radiology.",
    categories: ["treatment"],
  },
  {
    slug: "where-is-choledochal-cyst-surgery-performed-in-dhaka",
    q: "Where is choledochal cyst surgery performed in Dhaka?",
    aText:
      "Dr. Arefin performs choledochal cyst excision with Roux-en-Y hepaticojejunostomy at Popular Medical College Hospital, Dhanmondi, Dhaka. Surgery is recommended for almost all choledochal cysts because of the long-term risk of biliary cancer if left untreated.",
    a: "Dr. Arefin performs choledochal cyst excision with Roux-en-Y hepaticojejunostomy at Popular Medical College Hospital, Dhanmondi, Dhaka. Surgery is recommended for almost all choledochal cysts because of the long-term risk of biliary cancer if left untreated.",
    categories: ["treatment"],
  },
  {
    slug: "how-long-does-recovery-after-bile-duct-surgery-take-in-dhaka",
    q: "How long does recovery after bile duct surgery take in Dhaka?",
    aText:
      "After bile duct exploration most patients in Dhaka stay 5–7 days in hospital; major reconstructions such as hepaticojejunostomy or cholangiocarcinoma resection need 10–14 days, with 6–8 weeks of home recovery and structured follow-up at the Dhanmondi chamber.",
    a: "After bile duct exploration most patients in Dhaka stay 5–7 days in hospital; major reconstructions such as hepaticojejunostomy or cholangiocarcinoma resection need 10–14 days, with 6–8 weeks of home recovery and structured follow-up at the Dhanmondi chamber.",
    categories: ["treatment"],
  },
  {
    slug: "treatment-for-bile-duct-injury-after-gallbladder-surgery-in-dhaka",
    q: "What is the treatment for bile duct injury after gallbladder surgery in Dhaka?",
    aText:
      "Bile duct injuries after gallbladder surgery need specialist hepatobiliary repair. Dr. Arefin's team at Popular Medical College Hospital, Dhanmondi assesses the level of injury on MRCP and performs Roux-en-Y hepaticojejunostomy or end-to-end repair, often after a controlled drainage period.",
    a: "Bile duct injuries after gallbladder surgery need specialist hepatobiliary repair. Dr. Arefin's team at Popular Medical College Hospital, Dhanmondi assesses the level of injury on MRCP and performs Roux-en-Y hepaticojejunostomy or end-to-end repair, often after a controlled drainage period.",
    categories: ["treatment"],
  },
  {
    slug: "how-to-book-a-biliary-tract-surgery-consultation-in-dhanmondi",
    q: "How do I book a biliary tract surgery consultation in Dhanmondi?",
    aText:
      "To consult Dr. Arefin for biliary tract surgery in Dhanmondi, call +880 1311 487 592 or message on WhatsApp. Bring your MRCP, CT and prior operative notes (if any) to the chamber at Popular Medical College Hospital, House 25, Road 2, Dhanmondi 1205.",
    a: "To consult Dr. Arefin for biliary tract surgery in Dhanmondi, call +880 1311 487 592 or message on WhatsApp. Bring your MRCP, CT and prior operative notes (if any) to the chamber at Popular Medical College Hospital, House 25, Road 2, Dhanmondi 1205.",
    categories: ["treatment", "consultation"],
  },
];

/* ── Validation: every entry's slug must match the canonical slugify of its question
   (keeps the data file honest; throws in dev only). ── */
if (typeof import.meta !== "undefined" && (import.meta as { env?: { DEV?: boolean } }).env?.DEV) {
  const seen = new Set<string>();
  for (const f of faqRegistry) {
    if (seen.has(f.slug)) {
      console.error(`[faqRegistry] Duplicate slug: ${f.slug}`);
    }
    seen.add(f.slug);
    const expected = slugifyQuestion(f.q);
    if (f.slug !== expected) {
      console.warn(
        `[faqRegistry] Slug "${f.slug}" does not match slugify("${f.q}") = "${expected}"`
      );
    }
  }
}

/* ── Lookup helpers ── */
export const findFAQBySlug = (slug: string): FAQEntry | undefined =>
  faqRegistry.find((f) => f.slug === slug);

export const getFaqsByCategory = (category: FAQCategory): FAQEntry[] =>
  faqRegistry.filter((f) => f.categories.includes(category));

export const getFaqsBySlugs = (slugs: string[]): FAQEntry[] =>
  slugs
    .map((s) => findFAQBySlug(s))
    .filter((f): f is FAQEntry => Boolean(f));

/** Pick a small "related questions" set excluding the given slug. */
export const getRelatedFaqs = (excludeSlug: string, limit = 4): FAQEntry[] => {
  const current = findFAQBySlug(excludeSlug);
  const sameCategory = current
    ? faqRegistry.filter(
        (f) =>
          f.slug !== excludeSlug &&
          f.categories.some((c) => current.categories.includes(c))
      )
    : faqRegistry.filter((f) => f.slug !== excludeSlug);
  return sameCategory.slice(0, limit);
};
