/**
 * Satellite Matrix — programmatic SEO data layer for Dr. Arefin.
 *
 * Multiplies (service × area × intent) into ready-to-render SatellitePage
 * objects, reusing the existing SatellitePageTemplate so design + schema
 * stay in sync with the hand-authored Tier-1 pages.
 *
 * Strategy reference: see chat — "Satellite strategy 2.0".
 *
 * Usage:
 *   import { generateMatrixPages } from "@/data/satelliteMatrix";
 *   const pages = generateMatrixPages(MATRIX_PILOT);  // pilot: 1 svc × 1 area
 *
 * To bulk-launch later:
 *   const pages = generateMatrixPages(MATRIX_FULL);   // full 12 × 15 grid
 *
 * Authoring rule: per-page copy MUST mix area-specific facts (areas[].context)
 * with service-specific facts (services[].clinical) so generated bodies are
 * unique enough to avoid Google's thin-content filter (>500 unique words).
 */

import type { SatellitePage } from "./satellitePages";

/* ───────────────────────── Service catalog (12) ───────────────────────── */

export interface MatrixService {
  /** URL slug fragment (kebab-case, no leading slash) */
  slug: string;
  /** Lower-case noun for inline copy: "liver surgery" */
  noun: string;
  /** Title-Case display name: "Liver Surgery" */
  display: string;
  /** Most common patient symptoms / pain (used in objection + why-required copy) */
  symptoms: string[];
  /** Conditions this service treats */
  conditions: string[];
  /** Hero image path (under /src/assets/gallery) */
  heroImage: string;
  /** "Surgeon" noun used in best-in-area pages: "liver surgeon" */
  surgeonNoun: string;
  /** 2–3 sentence clinical paragraph reused across templates (HTML allowed) */
  clinical: string;
}

export const SERVICES: MatrixService[] = [
  {
    slug: "liver-surgery",
    noun: "liver surgery",
    display: "Liver Surgery",
    surgeonNoun: "liver surgeon",
    symptoms: ["right upper-quadrant pain", "jaundice", "unexplained weight loss", "abdominal swelling"],
    conditions: ["liver tumours", "liver cysts", "hepatocellular carcinoma", "liver abscess"],
    heroImage: "/src/assets/gallery/liver-surgery-team-closeup-hepatobiliary-surgeon-dhaka.webp",
    clinical:
      "Modern liver surgery requires precise pre-operative imaging, vascular control during resection, and a multidisciplinary HPB team. Dr. Arefin performs both minimally invasive and open hepatectomies tailored to tumour location and remnant liver volume.",
  },
  {
    slug: "gallbladder-surgery",
    noun: "gallbladder surgery",
    display: "Gallbladder Surgery",
    surgeonNoun: "gallbladder surgeon",
    symptoms: ["biliary colic", "indigestion after fatty meals", "right upper-quadrant pain", "jaundice"],
    conditions: ["gallstones", "acute cholecystitis", "gallbladder polyps", "empyema"],
    heroImage: "/src/assets/gallery/gallbladder-surgery-operating-room-panoramic-dhaka.webp",
    clinical:
      "Laparoscopic cholecystectomy is the gold-standard for symptomatic gallstone disease. Dr. Arefin uses the critical view of safety technique to identify the cystic duct and artery before division — minimising the risk of bile-duct injury.",
  },
  {
    slug: "bile-duct-surgery",
    noun: "bile duct surgery",
    display: "Bile Duct Surgery",
    surgeonNoun: "bile duct surgeon",
    symptoms: ["jaundice", "itching", "fever with chills", "pale stools and dark urine"],
    conditions: ["CBD stones", "biliary stricture", "choledochal cyst", "cholangiocarcinoma"],
    heroImage: "/src/assets/gallery/hepatobiliary-open-surgery-best-surgeon-team-dhaka.webp",
    clinical:
      "Bile-duct surgery demands meticulous reconstruction — Roux-en-Y hepaticojejunostomy, choledochoduodenostomy, or resection for malignancy. Each case is planned with MRCP and, when indicated, ERCP-guided stenting before definitive surgery.",
  },
  {
    slug: "pancreatic-surgery",
    noun: "pancreatic surgery",
    display: "Pancreatic Surgery",
    surgeonNoun: "pancreatic surgeon",
    symptoms: ["epigastric pain radiating to the back", "weight loss", "new-onset diabetes", "painless jaundice"],
    conditions: ["pancreatic cancer", "chronic pancreatitis", "IPMN", "pancreatic pseudocysts"],
    heroImage: "/src/assets/gallery/liver-pancreatic-open-surgery-specialist-team-dhaka.webp",
    clinical:
      "Pancreatic resection — Whipple's pancreaticoduodenectomy, distal pancreatectomy, or total pancreatectomy — is high-complexity surgery best done by a high-volume HPB team with ICU backup and 24/7 interventional radiology support.",
  },
  {
    slug: "hepatobiliary-surgery",
    noun: "hepatobiliary surgery",
    display: "Hepatobiliary Surgery",
    surgeonNoun: "hepatobiliary surgeon",
    symptoms: ["jaundice", "abdominal pain", "abnormal liver function tests", "biliary obstruction"],
    conditions: ["liver tumours", "bile-duct cancer", "complex gallstone disease", "biliary strictures"],
    heroImage: "/src/assets/gallery/hepatobiliary-open-surgery-best-surgeon-team-dhaka.webp",
    clinical:
      "Hepatobiliary surgery covers the liver, gallbladder, bile ducts, and pancreas — organs whose anatomy is intertwined. A unified HPB approach means one surgeon can plan and execute multi-organ procedures safely.",
  },
  {
    slug: "laparoscopic-surgery",
    noun: "laparoscopic surgery",
    display: "Laparoscopic Surgery",
    surgeonNoun: "laparoscopic surgeon",
    symptoms: ["chronic abdominal pain", "biliary colic", "hernia bulge", "appendicitis"],
    conditions: ["gallstones", "appendicitis", "abdominal hernias", "small bowel obstruction"],
    heroImage: "/src/assets/gallery/laparoscopic-cholecystectomy-storz-screen-best-surgeon-dhaka.webp",
    clinical:
      "Minimally invasive surgery means smaller incisions, less pain, and faster recovery. Most laparoscopic procedures send patients home within 24–48 hours with same-week return to light activity.",
  },
  {
    slug: "liver-transplant-coordination",
    noun: "liver transplant coordination",
    display: "Liver Transplant Coordination",
    surgeonNoun: "transplant coordinator",
    symptoms: ["decompensated cirrhosis", "ascites", "hepatic encephalopathy", "variceal bleeding"],
    conditions: ["end-stage liver disease", "hepatocellular carcinoma within Milan criteria", "acute liver failure"],
    heroImage: "/src/assets/gallery/dr-murshidul-arefin-hepatobiliary-pancreatic-liver-transplant-surgeon.webp",
    clinical:
      "Liver transplant requires a coordinated workup — MELD scoring, donor evaluation, multidisciplinary listing, and lifelong post-transplant care. Dr. Arefin manages pre- and post-transplant surgical needs in collaboration with international transplant centres.",
  },
  {
    slug: "fatty-liver-management",
    noun: "fatty liver treatment",
    display: "Fatty Liver Management",
    surgeonNoun: "liver specialist",
    symptoms: ["fatigue", "right-sided abdominal discomfort", "abnormal LFTs", "metabolic syndrome"],
    conditions: ["NAFLD", "NASH", "alcoholic liver disease", "early cirrhosis"],
    heroImage: "/src/assets/gallery/laparoscopic-gallbladder-surgery-full-ot-team-popular-medical-dhaka.webp",
    clinical:
      "Fatty liver is largely reversible when caught early. Management combines weight loss, glycaemic control, lipid management, and screening for fibrosis — with surgical referral only if complications develop.",
  },
  {
    slug: "gallstone-removal",
    noun: "gallstone removal",
    display: "Gallstone Removal",
    surgeonNoun: "gallstone surgeon",
    symptoms: ["biliary colic", "fatty-food intolerance", "right shoulder-tip pain", "nausea"],
    conditions: ["symptomatic cholelithiasis", "biliary pancreatitis", "choledocholithiasis"],
    heroImage: "/src/assets/gallery/gallbladder-stone-laparoscopic-removal-surgery-dhaka.webp",
    clinical:
      "Stones in the gallbladder need surgery only when symptomatic; stones in the bile duct almost always need removal — endoscopically (ERCP) or surgically. Choosing the right pathway prevents pancreatitis and cholangitis.",
  },
  {
    slug: "hpb-cancer-surgery",
    noun: "HPB cancer surgery",
    display: "HPB Cancer Surgery",
    surgeonNoun: "HPB cancer surgeon",
    symptoms: ["painless jaundice", "weight loss", "palpable mass", "anaemia"],
    conditions: ["liver cancer", "pancreatic cancer", "gallbladder cancer", "cholangiocarcinoma"],
    heroImage: "/src/assets/gallery/dr-murshidul-arefin-open-surgery-suturing-popular-medical-dhaka.webp",
    clinical:
      "HPB cancers carry the best outcomes when resected with negative margins by a high-volume surgeon. Multidisciplinary review — surgeon, oncologist, radiologist, pathologist — is non-negotiable for every case.",
  },
  {
    slug: "hernia-surgery",
    noun: "hernia surgery",
    display: "Hernia Surgery",
    surgeonNoun: "hernia surgeon",
    symptoms: ["bulge in groin or abdomen", "pain on coughing or lifting", "discomfort after meals"],
    conditions: ["inguinal hernia", "umbilical hernia", "incisional hernia", "hiatus hernia"],
    heroImage: "/src/assets/gallery/dr-murshidul-arefin-laparoscopic-team-operation-theater-dhaka.webp",
    clinical:
      "Modern hernia repair is mesh-based and increasingly laparoscopic — smaller incisions, lower recurrence, faster return to work. Dr. Arefin tailors the technique (TEP, TAPP, open Lichtenstein) to the hernia type and patient lifestyle.",
  },
  {
    slug: "appendix-surgery",
    noun: "appendix surgery",
    display: "Appendix Surgery",
    surgeonNoun: "general surgeon",
    symptoms: ["right lower-quadrant pain", "fever", "loss of appetite", "vomiting"],
    conditions: ["acute appendicitis", "appendicular abscess", "appendix mass"],
    heroImage: "/src/assets/gallery/dr-murshidul-arefin-laparoscopic-surgery-duo-popular-medical-dhaka.webp",
    clinical:
      "Appendicitis is a surgical emergency in most cases. Laparoscopic appendicectomy gives quicker recovery than open surgery and is the default approach unless complications require conversion.",
  },
];

/* ───────────────────────── Area catalog (15) ───────────────────────── */

export interface MatrixArea {
  /** URL slug fragment */
  slug: string;
  /** Display name: "Dhanmondi" */
  display: string;
  /** City: "Dhaka" or "Rangpur" etc. */
  city: string;
  /** Nearest major landmark hospitals/areas (string) */
  landmark: string;
  /** Travel time minutes from area to Dr. Arefin's main chamber */
  travelMinutes: number;
  /** 2–3 sentences of area-unique context (transit, demographics, healthcare landscape) */
  context: string;
}

export const AREAS: MatrixArea[] = [
  // Dhaka — Top 10
  { slug: "dhanmondi",   display: "Dhanmondi",   city: "Dhaka", landmark: "Popular Medical College Hospital", travelMinutes: 0,  context: "Dhanmondi is one of Dhaka's premier medical hubs, home to multiple tertiary hospitals and specialist chambers along Road 2 and the Mirpur Road corridor. Most residents reach Popular Medical College within 5 minutes by rickshaw or car." },
  { slug: "gulshan",     display: "Gulshan",     city: "Dhaka", landmark: "Gulshan-1 and Gulshan-2 circles",  travelMinutes: 35, context: "Gulshan is Dhaka's diplomatic and corporate zone. Patients here typically value evening chamber hours and English-language consultation — both available at Dr. Arefin's Popular Medical chamber." },
  { slug: "uttara",      display: "Uttara",      city: "Dhaka", landmark: "Uttara Sectors 4–13",              travelMinutes: 55, context: "Uttara's growing population is served by several mid-size hospitals, but complex hepatobiliary cases still travel south to Dhanmondi for higher-volume HPB centres." },
  { slug: "mirpur",      display: "Mirpur",      city: "Dhaka", landmark: "Mirpur-1, Mirpur-10, Pallabi",     travelMinutes: 30, context: "Mirpur is well-connected to Dhanmondi via the Mirpur Road and the Metro Rail (MRT-6) — a 15-minute ride from Mirpur-10 to Shewrapara, then 10 minutes by ride-share." },
  { slug: "mohakhali",   display: "Mohakhali",   city: "Dhaka", landmark: "Mohakhali DOHS and the bus terminal", travelMinutes: 25, context: "Mohakhali sits on Dhaka's primary north–south medical corridor. Multiple ICDDR,B and corporate clinics refer complex HPB cases onward to specialist surgeons in Dhanmondi." },
  { slug: "banani",      display: "Banani",      city: "Dhaka", landmark: "Banani Road 11 and Kemal Ataturk Avenue", travelMinutes: 30, context: "Banani residents are typically affluent professionals with private health insurance. They prefer surgeons with international fellowship training and English-language consultations." },
  { slug: "bashundhara", display: "Bashundhara", city: "Dhaka", landmark: "Bashundhara R/A and Apollo Hospital", travelMinutes: 45, context: "Although Bashundhara R/A has Apollo (Evercare) within reach, many patients seek a second opinion in Dhanmondi where consultation fees are lower and surgical volumes higher for HPB work." },
  { slug: "old-dhaka",   display: "Old Dhaka",   city: "Dhaka", landmark: "Wari, Sutrapur, Lalbagh",          travelMinutes: 40, context: "Old Dhaka has dense, multi-generational households where gallstone and hepatobiliary disease are common. Affordability and proximity to specialist surgeons in Dhanmondi matter most." },
  { slug: "wari",        display: "Wari",        city: "Dhaka", landmark: "Wari and Tipu Sultan Road",        travelMinutes: 40, context: "Wari residents reach Dhanmondi in 40 minutes via the Mayor Hanif Flyover. The route is reliable outside peak office hours." },
  { slug: "tejgaon",     display: "Tejgaon",     city: "Dhaka", landmark: "Tejgaon Industrial Area and Farmgate", travelMinutes: 20, context: "Tejgaon and Farmgate sit just north of Dhanmondi — a 20-minute commute even in peak traffic, making it one of the most accessible areas to Popular Medical College Hospital." },

  // Other cities — 5
  { slug: "rangpur-sadar", display: "Rangpur Sadar", city: "Rangpur",    landmark: "Rangpur Medical College Hospital", travelMinutes: 360, context: "Rangpur Sadar is the northern divisional hub. For complex hepatobiliary surgery, patients often travel south to Dhaka or to Dr. Arefin's Rangpur visit days at affiliated chambers." },
  { slug: "chattogram",   display: "Chattogram",   city: "Chattogram",  landmark: "Chittagong Medical College Hospital", travelMinutes: 360, context: "Chattogram has its own tertiary hospitals, but for second opinions on complex HPB or pancreatic surgery, patients frequently consult Dr. Arefin via tele-consultation followed by surgery in Dhaka." },
  { slug: "sylhet",       display: "Sylhet",       city: "Sylhet",      landmark: "Sylhet MAG Osmani Medical College", travelMinutes: 300, context: "Sylhet's strong UK-diaspora population often seeks UK-trained or fellowship-credentialed surgeons — a fit with Dr. Arefin's international training profile." },
  { slug: "khulna",       display: "Khulna",       city: "Khulna",      landmark: "Khulna Medical College Hospital", travelMinutes: 360, context: "Khulna patients with complex hepatobiliary diagnoses are commonly referred north to Dhaka for definitive HPB surgery." },
  { slug: "rajshahi",     display: "Rajshahi",     city: "Rajshahi",    landmark: "Rajshahi Medical College Hospital", travelMinutes: 300, context: "Rajshahi has a strong public hospital network. Private specialist HPB care still concentrates in Dhaka, with Dhanmondi being the most common destination." },
];

/* ───────────────────────── Intent templates ───────────────────────── */

export type MatrixIntent =
  | "service-in-area"      // /treatment/{svc}-in-{area}/
  | "why-required"         // /why-{svc}-is-required/
  | "why-required-in-area" // /why-{svc}-is-required-in-{area}/
  | "best-in-area"         // /best-{surgeon}-in-{area}/
  | "objection";           // /why-{svc}-is-hard-in-{city}/

/* ───────────────────────── Pair definition ───────────────────────── */

export interface MatrixPair {
  serviceSlug: string;
  areaSlug: string;
  /** Which intents to generate for this pair. Defaults to all 4 location-aware. */
  intents?: MatrixIntent[];
}

/** PILOT — only generate this pair (validate design + content quality). */
export const MATRIX_PILOT: MatrixPair[] = [
  { serviceSlug: "liver-surgery", areaSlug: "dhanmondi" },
];

/** FULL — every service × every area (call once pilot is approved). */
export const MATRIX_FULL: MatrixPair[] = SERVICES.flatMap((s) =>
  AREAS.map((a) => ({ serviceSlug: s.slug, areaSlug: a.slug })),
);

/* ───────────────────────── Generator ───────────────────────── */

const ALL_INTENTS: MatrixIntent[] = [
  "service-in-area",
  "why-required-in-area",
  "best-in-area",
  "objection",
];

const findService = (slug: string) => SERVICES.find((s) => s.slug === slug);
const findArea = (slug: string) => AREAS.find((a) => a.slug === slug);

const buildSlug = (intent: MatrixIntent, svc: MatrixService, area: MatrixArea): string => {
  switch (intent) {
    case "service-in-area":
      return `/treatment/${svc.slug}-in-${area.slug}`;
    case "why-required":
      return `/why-${svc.slug}-is-required`;
    case "why-required-in-area":
      return `/why-${svc.slug}-is-required-in-${area.slug}`;
    case "best-in-area":
      return `/best-${svc.surgeonNoun.replace(/\s+/g, "-")}-in-${area.slug}`;
    case "objection":
      return `/why-${svc.slug}-is-hard-in-${area.city.toLowerCase()}`;
  }
};

const buildPage = (intent: MatrixIntent, svc: MatrixService, area: MatrixArea): SatellitePage => {
  const slug = buildSlug(intent, svc, area);
  const symptomList = svc.symptoms.slice(0, 3).join(", ");
  const conditionList = svc.conditions.slice(0, 3).join(", ");

  switch (intent) {
    case "service-in-area":
      return {
        slug,
        kicker: `${svc.display} in ${area.display}`,
        title: `${svc.display} in ${area.display}, ${area.city} — Dr. Murshidul Arefin`,
        metaDesc: `${svc.display} for patients in ${area.display}, ${area.city}. Specialist HPB care by Dr. Arefin at Popular Medical College Hospital. Book a consultation.`,
        h1: `${svc.display} in ${area.display}, ${area.city}`,
        intro: `<p>If you live in <strong>${area.display}</strong> and are looking for specialist <strong>${svc.noun}</strong>, Dr. Murshidul Arefin offers consultations and surgery at Popular Medical College Hospital — approximately ${area.travelMinutes} minutes from ${area.landmark}.</p>`,
        heroImage: svc.heroImage,
        heroAlt: `${svc.display} specialist for patients from ${area.display}, ${area.city}`,
        sections: [
          {
            heading: `Why patients from ${area.display} choose Dr. Arefin`,
            body: `<p>${area.context}</p><p>${svc.clinical}</p>`,
          },
          {
            heading: `When you need ${svc.noun}`,
            body: `<p>Common signs that warrant a specialist consultation include <strong>${symptomList}</strong>. We treat conditions such as <strong>${conditionList}</strong>, with the exact procedure tailored to your imaging and clinical findings.</p>`,
          },
          {
            heading: `Getting to the chamber from ${area.display}`,
            body: `<p>The main chamber is at Popular Medical College Hospital, Dhanmondi — about <strong>${area.travelMinutes} minutes</strong> from ${area.landmark}. Evening chamber hours and tele-consultation options are available for patients travelling from outside Dhaka.</p>`,
          },
        ],
        faq: [
          { q: `Does Dr. Arefin see ${area.display} patients?`, a: `Yes — patients from ${area.display}, ${area.city} regularly consult at the Popular Medical College Hospital chamber. Tele-consultation is available before travel.` },
          { q: `How long is the recovery after ${svc.noun}?`, a: `Most laparoscopic patients return home within 24–48 hours and resume light activity within a week. Open and complex resections need 5–7 days of inpatient stay followed by 4–6 weeks of recovery.` },
          { q: `What's the typical cost of ${svc.noun} in Dhaka?`, a: `Cost depends on procedure complexity, hospital category, and inpatient stay. Dr. Arefin's chamber team provides a written estimate after your initial consultation.` },
        ],
        related: [
          { to: `/treatment/${svc.slug}/`, label: `${svc.display} overview`, title: `${svc.display} overview by Dr. Arefin` },
          { to: `/best-${svc.surgeonNoun.replace(/\s+/g, "-")}-in-${area.slug}/`, label: `Best ${svc.surgeonNoun} in ${area.display}`, title: `Best ${svc.surgeonNoun} in ${area.display}` },
          { to: `/why-${svc.slug}-is-required-in-${area.slug}/`, label: `Why ${svc.noun} is required`, title: `Understand when ${svc.noun} is needed` },
          { to: `/contact/`, label: "Book consultation", title: "Contact and book appointment with Dr. Arefin" },
        ],
      };

    case "why-required":
      return {
        slug,
        kicker: `Why ${svc.display} is required`,
        title: `Why ${svc.display} is Required — Symptoms & Indications | Dr. Arefin`,
        metaDesc: `Understand when ${svc.noun} becomes necessary, the warning symptoms, and the risks of delay. Specialist guidance from Dr. Murshidul Arefin.`,
        h1: `Why ${svc.display} is Required`,
        intro: `<p>${svc.noun.charAt(0).toUpperCase() + svc.noun.slice(1)} is recommended only when conservative treatment fails or the condition itself becomes dangerous. This page explains the symptoms, the indications, and what happens if surgery is delayed.</p>`,
        heroImage: svc.heroImage,
        heroAlt: `Indications for ${svc.display}`,
        sections: [
          { heading: "Warning symptoms", body: `<p>The most common symptoms that prompt a surgical consultation are <strong>${svc.symptoms.join(", ")}</strong>. Any persistent or severe presentation warrants imaging and a specialist review.</p>` },
          { heading: "Conditions that require surgery", body: `<p>${svc.noun.charAt(0).toUpperCase() + svc.noun.slice(1)} is indicated for <strong>${svc.conditions.join(", ")}</strong>. The decision is always individualised based on imaging, fitness for anaesthesia, and patient preference.</p>` },
          { heading: "Clinical approach", body: `<p>${svc.clinical}</p>` },
          { heading: "Risks of delaying surgery", body: `<p>Delayed surgery in established disease can lead to emergency presentation, more complex procedures, longer hospital stays, and worse long-term outcomes. Early specialist review prevents most of these complications.</p>` },
        ],
        faq: [
          { q: `Is ${svc.noun} always necessary if I have symptoms?`, a: `Not always. Some conditions can be observed or managed medically. A specialist consultation with imaging is the only way to know.` },
          { q: `What happens if I delay surgery?`, a: `Delay risks emergency presentation, more complex surgery, and worse outcomes. We always discuss the trade-offs honestly during consultation.` },
          { q: `Are there non-surgical alternatives?`, a: `For some conditions yes — diet, medication, or endoscopic procedures may suffice. Dr. Arefin always presents the full range of options.` },
        ],
        related: [
          { to: `/treatment/${svc.slug}/`, label: `${svc.display} overview`, title: `${svc.display} overview` },
          { to: "/contact/", label: "Book a consultation", title: "Contact Dr. Arefin" },
        ],
      };

    case "why-required-in-area":
      return {
        slug,
        kicker: `Why ${svc.display} is required — ${area.display}`,
        title: `Why ${svc.display} is Required for ${area.display} Patients | Dr. Arefin`,
        metaDesc: `${area.display}, ${area.city} patients: when ${svc.noun} becomes unavoidable, what local options exist, and how to choose a specialist. Guidance from Dr. Arefin.`,
        h1: `Why ${svc.display} is Required — A Guide for ${area.display} Patients`,
        intro: `<p>This page is written specifically for patients living in <strong>${area.display}, ${area.city}</strong>. We explain when ${svc.noun} becomes unavoidable, what your local healthcare options look like, and how to choose the right specialist.</p>`,
        heroImage: svc.heroImage,
        heroAlt: `${svc.display} guidance for ${area.display} patients`,
        sections: [
          { heading: `Symptoms ${area.display} patients commonly present with`, body: `<p>${svc.symptoms.join(", ").charAt(0).toUpperCase() + svc.symptoms.join(", ").slice(1)} — these are the most frequent presenting complaints. In ${area.display}, lifestyle and dietary patterns can accelerate the underlying disease.</p>` },
          { heading: `Local healthcare landscape in ${area.display}`, body: `<p>${area.context}</p>` },
          { heading: `When local options aren't enough`, body: `<p>Routine cases can be managed locally, but complex hepatobiliary disease benefits from a high-volume specialist. ${svc.clinical}</p>` },
          { heading: `Travel and logistics from ${area.display} to the chamber`, body: `<p>The Popular Medical College Hospital chamber in Dhanmondi is approximately <strong>${area.travelMinutes} minutes</strong> from ${area.landmark}. Evening hours and pre-consultation imaging review are available.</p>` },
        ],
        faq: [
          { q: `Why travel from ${area.display} for ${svc.noun}?`, a: `Complex HPB cases benefit from high-volume specialists. The travel time is a small investment for better outcomes.` },
          { q: `Is tele-consultation available before I travel?`, a: `Yes. We can review your imaging and reports remotely and confirm whether an in-person visit is warranted.` },
          { q: `What documents should I bring?`, a: `All recent imaging (CT, MRI, ultrasound), blood tests including LFTs, prior endoscopy or biopsy reports, and a list of current medications.` },
        ],
        related: [
          { to: `/treatment/${svc.slug}-in-${area.slug}/`, label: `${svc.display} in ${area.display}`, title: `${svc.display} in ${area.display}` },
          { to: `/best-${svc.surgeonNoun.replace(/\s+/g, "-")}-in-${area.slug}/`, label: `Best ${svc.surgeonNoun} in ${area.display}`, title: `Best ${svc.surgeonNoun} in ${area.display}` },
          { to: `/why-${svc.slug}-is-required/`, label: `Indications for ${svc.noun}`, title: `Why ${svc.noun} is required` },
          { to: "/contact/", label: "Book consultation", title: "Contact Dr. Arefin" },
        ],
      };

    case "best-in-area":
      return {
        slug,
        kicker: `Best ${svc.surgeonNoun} in ${area.display}`,
        title: `Best ${svc.display.replace(" Surgery", "")} Surgeon in ${area.display}, ${area.city} | Dr. Arefin`,
        metaDesc: `Looking for the best ${svc.surgeonNoun} in ${area.display}? Dr. Murshidul Arefin — international fellowship-trained HPB surgeon with verified credentials and high case volume.`,
        h1: `Best ${svc.surgeonNoun.replace(/\b\w/g, (c) => c.toUpperCase())} in ${area.display}, ${area.city}`,
        intro: `<p>Choosing the right ${svc.surgeonNoun} in <strong>${area.display}</strong> matters. This page explains Dr. Arefin's credentials, case volume, fellowship training, and why patients in ${area.display} consistently choose his chamber for ${svc.noun}.</p>`,
        heroImage: svc.heroImage,
        heroAlt: `Dr. Arefin — ${svc.surgeonNoun} for ${area.display} patients`,
        sections: [
          { heading: "Credentials & fellowship training", body: `<p>Dr. Murshidul Arefin holds <strong>FCPS (Surgery)</strong> and international hepatobiliary fellowship training. Certificate verification is shared on request and during consultation — transparency that few specialists offer.</p>` },
          { heading: "Case volume and outcomes", body: `<p>${svc.clinical} High-volume specialists demonstrably achieve better outcomes for complex HPB surgery — a pattern documented in international literature.</p>` },
          { heading: `What ${area.display} patients say`, body: `<p>${area.context} Patient testimonials are available on the main site, with verified before-and-after recovery accounts.</p>` },
          { heading: "How to evaluate any HPB surgeon", body: `<p>Ask about: fellowship training, annual case volume for your specific procedure, complication rates, the supporting team (anaesthesia, ICU, interventional radiology), and willingness to share certificate verification.</p>` },
        ],
        faq: [
          { q: `What makes a specialist the "best" ${svc.surgeonNoun}?`, a: `Fellowship training in HPB surgery, high annual case volume for the specific procedure, transparent outcome reporting, and a strong supporting team.` },
          { q: `Can I verify Dr. Arefin's certificates?`, a: `Yes. Verification documents (FCPS, fellowship certificates) are shared during consultation on request.` },
          { q: `Does Dr. Arefin operate at multiple hospitals?`, a: `Primary chamber is Popular Medical College Hospital, Dhanmondi. Surgery is performed there and at affiliated centres depending on case complexity.` },
        ],
        related: [
          { to: `/treatment/${svc.slug}-in-${area.slug}/`, label: `${svc.display} in ${area.display}`, title: `${svc.display} in ${area.display}` },
          { to: "/about/", label: "About Dr. Arefin", title: "Credentials and philosophy" },
          { to: `/treatment/${svc.slug}/`, label: `${svc.display} overview`, title: `${svc.display} overview` },
          { to: "/contact/", label: "Book consultation", title: "Contact Dr. Arefin" },
        ],
      };

    case "objection":
      return {
        slug,
        kicker: `Why ${svc.display} is hard in ${area.city}`,
        title: `Why ${svc.display} is Hard to Find in ${area.city} — Honest Guide | Dr. Arefin`,
        metaDesc: `Honest discussion of why high-quality ${svc.noun} is scarce in ${area.city}, the cost picture, and how to choose a credible specialist. By Dr. Arefin.`,
        h1: `Why ${svc.display} is Hard to Find in ${area.city}`,
        intro: `<p>Patients often ask why high-quality <strong>${svc.noun}</strong> is hard to find in ${area.city}. This page is honest — it covers the supply gap, the cost picture, and the specific things to look for when you choose a specialist.</p>`,
        heroImage: svc.heroImage,
        heroAlt: `Why ${svc.display} is challenging in ${area.city}`,
        sections: [
          { heading: "The specialist supply gap", body: `<p>Bangladesh has a small number of fellowship-trained HPB surgeons relative to the population. Most concentrate in Dhaka — and within Dhaka, in a handful of tertiary chambers.</p>` },
          { heading: "What this means for you", body: `<p>Patients with complex hepatobiliary disease often need to travel for definitive surgery. ${svc.clinical}</p>` },
          { heading: "Cost — an honest picture", body: `<p>HPB surgery costs in Bangladesh are a fraction of regional medical-tourism destinations (India, Thailand). Dr. Arefin's team provides a written cost estimate after consultation — no hidden fees.</p>` },
          { heading: "How to evaluate a surgeon honestly", body: `<p>Ask about training, case volume, complication rates, ICU and blood-bank backup, and willingness to share certificate verification. A surgeon unwilling to discuss any of these openly is a red flag.</p>` },
        ],
        faq: [
          { q: `Why is HPB surgery scarce in ${area.city}?`, a: `Sub-specialty fellowship training is limited and most fellowship-trained surgeons concentrate in Dhaka.` },
          { q: `Should I consider going abroad?`, a: `For most cases, in-country surgery by a credentialed HPB specialist offers comparable outcomes at a fraction of the cost. We're happy to discuss your specific case.` },
          { q: `How can I verify a surgeon's credentials?`, a: `Ask for FCPS and fellowship certificates. Reputable specialists, including Dr. Arefin, share these on request.` },
        ],
        related: [
          { to: `/treatment/${svc.slug}/`, label: `${svc.display} overview`, title: `${svc.display} overview` },
          { to: "/about/", label: "About Dr. Arefin", title: "Credentials" },
          { to: "/contact/", label: "Book consultation", title: "Contact Dr. Arefin" },
        ],
      };
  }
};

/** Generate the full set of SatellitePage objects from a list of pairs. */
export const generateMatrixPages = (pairs: MatrixPair[]): SatellitePage[] => {
  const out: SatellitePage[] = [];
  const seen = new Set<string>();

  // Per-pair location-aware pages
  for (const pair of pairs) {
    const svc = findService(pair.serviceSlug);
    const area = findArea(pair.areaSlug);
    if (!svc || !area) continue;
    const intents = pair.intents ?? ALL_INTENTS;
    for (const intent of intents) {
      const page = buildPage(intent, svc, area);
      if (!seen.has(page.slug)) {
        seen.add(page.slug);
        out.push(page);
      }
    }
  }

  // Per-service "why-required" hub (location-agnostic) — emit once per unique
  // service touched by the pair list.
  const servicesTouched = new Set(pairs.map((p) => p.serviceSlug));
  for (const sslug of servicesTouched) {
    const svc = findService(sslug);
    const anyArea = AREAS[0]; // unused slug-wise but required by signature
    if (!svc) continue;
    const page = buildPage("why-required", svc, anyArea);
    if (!seen.has(page.slug)) {
      seen.add(page.slug);
      out.push(page);
    }
  }

  return out;
};

/** Convenience export — pilot pages, ready to register in App.tsx. */
export const MATRIX_PAGES_PILOT: SatellitePage[] = generateMatrixPages(MATRIX_PILOT);

/**
 * MENU SET — the services shown in the header mega menu rail
 * (plan: .lovable/plan/mega-menu-atto-style-2026-10-21.md, decisions D1/D2).
 * For these services, the "service-in-area" page is generated for EVERY
 * area in AREAS, so every link in the menu's areas grid resolves.
 * Pages already emitted by the pilot are filtered out (no duplicates).
 */
export const MATRIX_MENU_SERVICE_SLUGS: string[] = [
  "liver-surgery",
  "gallbladder-surgery",
  "bile-duct-surgery",
  "pancreatic-surgery",
  "hepatobiliary-surgery",
  "laparoscopic-surgery",
  "liver-transplant-coordination",
  "fatty-liver-management",
];

export const MATRIX_PAGES_MENU: SatellitePage[] = (() => {
  const pilotSlugs = new Set(MATRIX_PAGES_PILOT.map((p) => p.slug));
  const pairs: MatrixPair[] = MATRIX_MENU_SERVICE_SLUGS.flatMap((serviceSlug) =>
    AREAS.map((area) => ({
      serviceSlug,
      areaSlug: area.slug,
      intents: ["service-in-area" as MatrixIntent],
    })),
  );
  return generateMatrixPages(pairs).filter((p) => !pilotSlugs.has(p.slug));
})();
