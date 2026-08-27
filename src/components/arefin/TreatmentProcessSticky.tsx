import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";

/**
 * TreatmentProcessSticky — DesignMonks "Our Work Process" replica.
 *
 * Mechanics:
 *  - Outer .tp-stack is tall (one viewport per card) — provides scroll distance.
 *  - Each .tp-card-outer is position:sticky with the SAME top offset, so as the
 *    page scrolls, each next card slides up and perfectly covers the previous.
 *  - Left rail: progress fill height tracks scroll progress through the stack.
 *  - Right side: per-step glassmorphism visual themed to hepatobiliary content.
 *  - Mobile: no sticky, no rail, normal vertical flow.
 */

export type GlassKind = "diagnosis" | "planning" | "surgery" | "recovery";

export interface TreatmentProcessStep {
  badge: string;
  title: string;
  description: string;
  tasks: string[];
  glass: GlassKind;
  /** Optional per-step rail icon component. Falls back to variant defaults. */
  icon?: () => JSX.Element;
  /** Optional internal route — when present, the title renders as a <Link>. */
  href?: string;
  /** Optional title attribute / aria-label override for the title link. */
  linkTitle?: string;
}

// Internal alias so the rest of the file keeps using `Step`.
type Step = TreatmentProcessStep;

export interface TreatmentProcessHeader {
  label: string;
  headingLead: string;
  headingAccent: string;
  ariaLabel: string;
}

export type TreatmentProcessVariant = "liver" | "gallbladder" | "pancreatic" | "biliary" | "mentorship";

const STEPS_BY_VARIANT: Record<TreatmentProcessVariant, Step[]> = {
  liver: [
    {
      badge: "Step 1",
      title: "Consultation & Diagnosis",
      description:
        "Your journey begins with a thorough initial assessment. We review your complete medical history, conduct advanced diagnostic imaging, liver function tests, and clinical evaluation to build a precise diagnosis and determine the optimal treatment pathway.",
      tasks: ["Medical History Review", "Diagnostic Imaging", "Lab Work Analysis", "Risk Assessment"],
      glass: "diagnosis",
      href: "/treatment/liver-surgeon-dhaka/",
      linkTitle: "Liver surgeon consultation in Dhaka by Dr. Arefin",
    },
    {
      badge: "Step 2",
      title: "Treatment Planning",
      description:
        "Dr. Arefin and his multidisciplinary team craft a detailed, evidence-based treatment plan tailored to your unique clinical needs — selecting the optimal surgical approach and preparing you for what lies ahead.",
      tasks: ["Multidisciplinary Review", "Surgical Approach Selection", "Pre-op Preparation", "Patient Counseling"],
      glass: "planning",
      href: "/treatment/liver-tumor-cancer-surgery-dhaka/",
      linkTitle: "Liver tumor and cancer surgery planning in Dhaka by Dr. Arefin",
    },
    {
      badge: "Step 3",
      title: "Surgical Procedure",
      description:
        "Precision hepatobiliary surgery performed with advanced techniques in a state-of-the-art operating theatre. Minimally invasive options are prioritized when possible, with real-time monitoring and an expert surgical team.",
      tasks: ["Advanced Surgical Techniques", "Minimally Invasive Options", "Intraoperative Monitoring", "Expert Surgical Team"],
      glass: "surgery",
      href: "/treatment/minimally-invasive-liver-surgery-dhaka/",
      linkTitle: "Minimally invasive liver surgery in Dhaka by Dr. Arefin",
    },
    {
      badge: "Step 4",
      title: "Recovery & Follow-Up",
      description:
        "Comprehensive post-operative care with structured recovery protocols, pain management, nutritional guidance, and regular follow-up visits. Dr. Arefin monitors your progress to ensure complete recovery and long-term liver health.",
      tasks: ["Recovery Protocol", "Follow-up Consultations", "Rehabilitation Guidance", "Lifetime Support"],
      glass: "recovery",
      href: "/treatment/post-transplant-follow-up/",
      linkTitle: "Post-operative liver care and follow-up by Dr. Arefin",
    },
  ],
  gallbladder: [
    {
      badge: "Step 1",
      title: "Consultation & Diagnosis",
      description:
        "We start with a focused clinical assessment of your symptoms — biliary colic, indigestion, jaundice — supported by abdominal ultrasound, liver function tests, and where required MRCP to map gallstones, polyps, or inflammation precisely.",
      tasks: ["Symptom Evaluation", "Abdominal Ultrasound", "MRCP When Indicated", "Liver Function Tests"],
      glass: "diagnosis",
      href: "/treatment/cholecystitis-surgery-dhaka/",
      linkTitle: "Gallbladder consultation and cholecystitis evaluation in Dhaka",
    },
    {
      badge: "Step 2",
      title: "Treatment Planning",
      description:
        "Dr. Arefin selects the right approach for your gallbladder disease — elective laparoscopic cholecystectomy, urgent surgery for acute cholecystitis, or complex open conversion when anatomy demands it — and prepares you with clear pre-op counselling.",
      tasks: ["Laparoscopic vs Open Decision", "Anaesthetic Clearance", "Pre-op Optimisation", "Patient Counselling"],
      glass: "planning",
      href: "/treatment/gallbladder-cancer-resection-dhaka/",
      linkTitle: "Gallbladder treatment planning in Dhaka by Dr. Arefin",
    },
    {
      badge: "Step 3",
      title: "Laparoscopic Cholecystectomy",
      description:
        "Minimally invasive removal of the gallbladder through 3–4 keyhole incisions, using high-definition laparoscopy and meticulous Calot's triangle dissection to safely identify and protect the biliary tree throughout the procedure.",
      tasks: ["Keyhole Incisions", "Critical View of Safety", "Stone & Specimen Retrieval", "Drain Placement If Needed"],
      glass: "surgery",
      href: "/treatment/laparoscopic-cholecystectomy-dhaka/",
      linkTitle: "Laparoscopic cholecystectomy in Dhaka by Dr. Arefin",
    },
    {
      badge: "Step 4",
      title: "Recovery & Follow-Up",
      description:
        "Most patients go home within 24 hours. We guide you through diet reintroduction, wound care, and activity progression, with structured follow-up to confirm full recovery and resolve any post-cholecystectomy symptoms.",
      tasks: ["Same/Next-Day Discharge", "Diet & Wound Guidance", "2-Week Review", "Long-Term Support"],
      glass: "recovery",
      href: "/treatment/gallstone-removal-dhaka/",
      linkTitle: "Gallbladder surgery recovery and follow-up in Dhaka",
    },
  ],
  pancreatic: [
    {
      badge: "Step 1",
      title: "Consultation & Advanced Imaging",
      description:
        "Pancreatic conditions demand precision from day one. We combine detailed history with contrast-enhanced CT, MRI/MRCP, and where indicated EUS-guided biopsy and tumour markers to define the lesion, stage disease, and assess resectability.",
      tasks: ["Triphasic CT Scan", "MRI / MRCP", "EUS & Biopsy", "Tumour Marker Panel"],
      glass: "diagnosis",
      href: "/treatment/pancreatic-cyst-surgery-dhaka/",
      linkTitle: "Pancreatic consultation and advanced imaging in Dhaka",
    },
    {
      badge: "Step 2",
      title: "Multidisciplinary Planning",
      description:
        "Every pancreatic case is reviewed in a multidisciplinary tumour board — surgeon, oncologist, radiologist, pathologist — to choose the optimal pathway: upfront resection, neoadjuvant therapy, or palliative bypass, fully tailored to you.",
      tasks: ["Tumour Board Review", "Resectability Assessment", "Neoadjuvant Decision", "Nutritional Optimisation"],
      glass: "planning",
      href: "/treatment/pancreatic-cancer-surgery-dhaka/",
      linkTitle: "Multidisciplinary pancreatic cancer planning in Dhaka",
    },
    {
      badge: "Step 3",
      title: "Pancreatic Resection",
      description:
        "High-complexity surgery — Whipple's pancreaticoduodenectomy, distal pancreatectomy, or total pancreatectomy — performed by an experienced HPB team in a fully equipped operating theatre with intraoperative monitoring at every step.",
      tasks: ["Whipple / Distal Resection", "Vascular Reconstruction If Needed", "Frozen Section Margins", "ICU-Backed Recovery"],
      glass: "surgery",
      href: "/treatment/distal-pancreatectomy-dhaka/",
      linkTitle: "Pancreatic resection — Whipple and distal pancreatectomy in Dhaka",
    },
    {
      badge: "Step 4",
      title: "Recovery & Oncologic Follow-Up",
      description:
        "Structured post-op care covers pain control, drain management, enzyme replacement, and diabetes monitoring. Long-term surveillance with imaging, tumour markers, and oncology coordination protects your outcome over the years.",
      tasks: ["ICU & Ward Care", "Enzyme & Glucose Management", "Adjuvant Therapy Coordination", "Surveillance Imaging"],
      glass: "recovery",
      href: "/treatment/pancreatitis-surgery-dhaka/",
      linkTitle: "Pancreatic surgery recovery and oncologic follow-up in Dhaka",
    },
  ],
  biliary: [
    {
      badge: "Step 1",
      title: "Consultation & Biliary Imaging",
      description:
        "Bile duct problems present with jaundice, itching, or cholangitis. We rapidly evaluate with liver function tests, ultrasound, and MRCP — and ERCP when therapeutic — to map the level and cause of any biliary obstruction.",
      tasks: ["LFTs & Bilirubin Trend", "Abdominal Ultrasound", "MRCP Mapping", "ERCP When Therapeutic"],
      glass: "diagnosis",
      href: "/treatment/bile-duct-obstruction-surgery-dhaka/",
      linkTitle: "Bile duct consultation and biliary imaging in Dhaka",
    },
    {
      badge: "Step 2",
      title: "Drainage & Surgical Planning",
      description:
        "If the bile duct is blocked, we first relieve obstruction safely — with endoscopic stenting or percutaneous drainage — then plan definitive surgery for stones, strictures, choledochal cysts, or biliary malignancy.",
      tasks: ["Biliary Stenting / PTBD", "Stricture vs Stone vs Tumour", "Hepatobiliary MDT Review", "Pre-op Optimisation"],
      glass: "planning",
      href: "/treatment/cholangitis-surgery-dhaka/",
      linkTitle: "Biliary drainage and surgical planning in Dhaka",
    },
    {
      badge: "Step 3",
      title: "Biliary Reconstruction Surgery",
      description:
        "Definitive bile duct surgery — bilioenteric anastomosis (Roux-en-Y hepaticojejunostomy), choledochal cyst excision, or resection for cholangiocarcinoma — performed with meticulous technique to restore bile flow and protect liver function.",
      tasks: ["Hepaticojejunostomy", "Cyst Excision", "Resection For Malignancy", "Intraoperative Cholangiogram"],
      glass: "surgery",
      href: "/treatment/cholangiocarcinoma-surgery-dhaka/",
      linkTitle: "Biliary reconstruction surgery in Dhaka by Dr. Arefin",
    },
    {
      badge: "Step 4",
      title: "Recovery & Long-Term Surveillance",
      description:
        "Recovery focuses on liver function recovery, infection prevention, and nutritional support. Long-term follow-up monitors anastomosis patency and liver health to catch any late stricture or recurrence early.",
      tasks: ["Liver Function Monitoring", "Infection Surveillance", "Nutritional Support", "Long-Term Anastomosis Review"],
      glass: "recovery",
      href: "/treatment/choledochal-cyst-surgery-dhaka/",
      linkTitle: "Long-term biliary surveillance and follow-up in Dhaka",
    },
  ],
  mentorship: [
    {
      badge: "Phase 1",
      title: "Foundations & Orientation",
      description:
        "Trainees begin with structured orientation in hepatobiliary anatomy, imaging interpretation, and case-based theory. Dr. Arefin and senior fellows establish baseline knowledge, OT etiquette, and the standards expected throughout the programme.",
      tasks: ["HPB Anatomy Refresher", "Imaging Reading Sessions", "OT Etiquette & Safety", "Baseline Assessment"],
      glass: "diagnosis",
      href: "/mentorship/hpb-fellowship-training-dhaka/",
      linkTitle: "HPB fellowship foundations and orientation in Dhaka",
    },
    {
      badge: "Phase 2",
      title: "Observership & Assist",
      description:
        "Phase two places you in live operating theatres — observing, scrubbing, and assisting in laparoscopic and open hepatobiliary cases. You learn intra-operative decision-making, tissue handling, and team dynamics under direct supervision.",
      tasks: ["Scrub & Assist Rotations", "Live Case Observation", "Decision-Making Drills", "Operative Logbook"],
      glass: "planning",
      href: "/mentorship/surgical-mentorship-bangladesh/",
      linkTitle: "Surgical observership and assist mentorship in Bangladesh",
    },
    {
      badge: "Phase 3",
      title: "Hands-On Operating",
      description:
        "Trainees progressively perform graded steps of laparoscopic cholecystectomy, bile duct exploration, and selected liver/pancreatic procedures — always under Dr. Arefin's direct supervision, with structured feedback after every case.",
      tasks: ["Graded Operative Steps", "Direct Supervision", "Structured Debriefs", "Skills Logbook"],
      glass: "surgery",
      href: "/mentorship/operative-skills-workshop/",
      linkTitle: "Hands-on operative skills workshop in Dhaka",
    },
    {
      badge: "Phase 4",
      title: "Independence & Certification",
      description:
        "In the final phase, fellows manage cases end-to-end — pre-op planning, surgery, and post-op care — and complete a portfolio review and exit assessment. Successful trainees graduate certified to practise independent HPB surgery.",
      tasks: ["End-to-End Case Ownership", "Portfolio Review", "Exit Assessment", "Certification"],
      glass: "recovery",
      href: "/mentorship/young-surgeon-training-program/",
      linkTitle: "Young surgeon independence and certification programme",
    },
  ],
};

const SUBTITLE_BY_VARIANT: Record<TreatmentProcessVariant, string> = {
  liver:
    "A structured, patient-centered approach from first consultation through full recovery — guided by 20+ years of hepatobiliary expertise.",
  gallbladder:
    "A streamlined, patient-centered pathway for gallbladder disease — from first ultrasound to laparoscopic recovery — backed by 20+ years of HPB surgical expertise.",
  pancreatic:
    "A multidisciplinary, precision-guided pathway for pancreatic disease — from advanced imaging through complex resection and long-term oncologic follow-up.",
  biliary:
    "A specialist pathway for bile duct disease — combining endoscopic, radiologic, and surgical expertise to safely restore biliary flow and protect liver health.",
  mentorship:
    "A structured four-phase pathway from foundational theory to independent HPB practice — mentored end-to-end by Dr. Arefin and a senior fellowship faculty.",
};

type SectionHeader = TreatmentProcessHeader;

const HEADER_BY_VARIANT: Record<TreatmentProcessVariant, SectionHeader> = {
  liver:       { label: "Treatment Process", headingLead: "Your Treatment ",  headingAccent: "Journey",  ariaLabel: "Our four-step treatment process" },
  gallbladder: { label: "Treatment Process", headingLead: "Your Treatment ",  headingAccent: "Journey",  ariaLabel: "Our four-step treatment process" },
  pancreatic:  { label: "Treatment Process", headingLead: "Your Treatment ",  headingAccent: "Journey",  ariaLabel: "Our four-step treatment process" },
  biliary:     { label: "Treatment Process", headingLead: "Your Treatment ",  headingAccent: "Journey",  ariaLabel: "Our four-step treatment process" },
  mentorship:  { label: "Training Timeline", headingLead: "Your Mentorship ", headingAccent: "Journey",  ariaLabel: "Our four-phase mentorship timeline" },
};

const STICKY_TOP = 120; // px — where each card pins

/* ───────────────────── Glassmorphism visuals ───────────────────── */

const GlassDiagnosis = () => (
  <div className="tp-glass tp-glass--diagnosis" aria-hidden="true">
    <div className="tp-glass-orb" />
    <svg viewBox="0 0 64 64" className="tp-glass-icon">
      <path
        d="M20 14v14a12 12 0 0024 0V14"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="44" cy="42" r="6" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M44 48v6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  </div>
);

const GlassPlanning = () => (
  <div className="tp-glass tp-glass--planning" aria-hidden="true">
    <div className="tp-glass-card tp-glass-card--1" />
    <div className="tp-glass-card tp-glass-card--2" />
    <div className="tp-glass-card tp-glass-card--3" />
  </div>
);

const GlassSurgery = () => (
  <div className="tp-glass tp-glass--surgery" aria-hidden="true">
    <div className="tp-glass-orb" />
    <svg viewBox="0 0 64 64" className="tp-glass-icon">
      <path
        d="M14 50l24-24 6 6-24 24z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M44 26l6-6-2-6-6 2-4 4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  </div>
);

const GlassRecovery = () => (
  <div className="tp-glass tp-glass--recovery" aria-hidden="true">
    <div className="tp-glass-orb" />
    <svg viewBox="0 0 64 64" className="tp-glass-icon">
      <path
        d="M32 12l16 6v12c0 12-8 20-16 22-8-2-16-10-16-22V18z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M24 32l6 6 12-12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const renderGlass = (kind: Step["glass"]) => {
  switch (kind) {
    case "diagnosis": return <GlassDiagnosis />;
    case "planning": return <GlassPlanning />;
    case "surgery": return <GlassSurgery />;
    case "recovery": return <GlassRecovery />;
  }
};

/* ───────────────────── Per-step rail icons ───────────────────── */
/* Hand-tuned medical glyphs, 28px, 1.8 stroke for crisp readability inside
   the glass tile. Each glyph maps directly to its step's clinical content. */

const SVG_PROPS = {
  width: 26,
  height: 26,
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* Step 1 — Consultation & Diagnosis: stethoscope tubing + diaphragm with a
   small magnifier dot, signalling examination + diagnostic discovery. */
const IconStethoscopeMag = () => (
  <svg {...SVG_PROPS}>
    <path d="M9 5v6a4 4 0 0 0 8 0V5" />
    <path d="M13 15v4a5 5 0 0 0 5 5h.5" />
    <circle cx="22" cy="22" r="3" />
    <circle cx="22" cy="22" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

/* Step 2 — Treatment Planning: clipboard with checklist ticks overlaying a
   small organ silhouette in the corner — case planning around the organ. */
const IconClipboardLiver = () => (
  <svg {...SVG_PROPS}>
    <rect x="7" y="6" width="14" height="20" rx="2.2" />
    <path d="M11 6V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
    <path d="M10.5 13l1.5 1.5 3-3" />
    <path d="M10.5 19l1.5 1.5 3-3" />
    {/* mini liver silhouette */}
    <path d="M22 17c2.4 0 4 1.6 4 3.6 0 2-1.7 3.4-4 3.4-1.4 0-2.6-.6-3.2-1.6" />
    <path d="M21 19.6c.4-.2.9-.3 1.4-.3" />
  </svg>
);

/* Step 2 — Gallbladder planning: clipboard + tiny pear-shaped gallbladder. */
const IconClipboardGallbladder = () => (
  <svg {...SVG_PROPS}>
    <rect x="7" y="6" width="14" height="20" rx="2.2" />
    <path d="M11 6V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
    <path d="M10.5 13l1.5 1.5 3-3" />
    <path d="M10.5 19l1.5 1.5 3-3" />
    {/* mini gallbladder pear */}
    <path d="M23 16.5c1.6 0 2.8 1.3 2.8 3 0 2-1.4 3.5-2.8 3.5s-2.8-1.5-2.8-3.5c0-1.7 1.2-3 2.8-3z" />
    <path d="M23 16.5v-2" />
  </svg>
);

/* Step 2 — Pancreatic planning: clipboard + slender pancreas curve. */
const IconClipboardPancreas = () => (
  <svg {...SVG_PROPS}>
    <rect x="7" y="6" width="14" height="20" rx="2.2" />
    <path d="M11 6V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
    <path d="M10.5 13l1.5 1.5 3-3" />
    <path d="M10.5 19l1.5 1.5 3-3" />
    {/* mini pancreas: tadpole-like curve, head right + tail tapering left */}
    <path d="M26 19c0 1.7-1.3 3-3 3-1.3 0-2.2-.6-2.8-1.4-.6-.8-1.6-1.1-2.4-.6" />
    <circle cx="24.6" cy="19" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

/* Step 2 — Biliary planning: clipboard + branching bile-duct tree glyph. */
const IconClipboardBileTree = () => (
  <svg {...SVG_PROPS}>
    <rect x="7" y="6" width="14" height="20" rx="2.2" />
    <path d="M11 6V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
    <path d="M10.5 13l1.5 1.5 3-3" />
    <path d="M10.5 19l1.5 1.5 3-3" />
    {/* mini biliary tree */}
    <path d="M23 16v8" />
    <path d="M23 18l-2-1.5" />
    <path d="M23 18l2-1.5" />
    <path d="M23 21l-1.6 1.4" />
  </svg>
);

/* Step 3 — Liver surgery: liver outline with incision marker + scalpel. */
const IconLiverIncision = () => (
  <svg {...SVG_PROPS}>
    <path d="M5 12c0-2.2 1.8-4 4-4h11c3.3 0 6 2.7 6 6 0 4.4-3.6 8-8 8H12c-3.9 0-7-3.1-7-7v-3z" />
    <path d="M16 8v6" />
    <path d="M11 14.5h7" strokeDasharray="1.4 1.6" />
    <path d="M19.5 13l2.5-2.5 1.5 1.5L21 14.5z" />
  </svg>
);

/* Step 3 — Gallbladder surgery: pear-shaped gallbladder with stones inside +
   small clip marker representing laparoscopic ligation. */
const IconGallbladderSurgery = () => (
  <svg {...SVG_PROPS}>
    {/* Pear-shaped gallbladder */}
    <path d="M16 8c-4 0-7 3-7 8s3 10 7 10 7-5 7-10-3-8-7-8z" />
    {/* Cystic duct stub at the top */}
    <path d="M16 8V4" />
    {/* Two gallstones */}
    <circle cx="14" cy="17" r="1.6" />
    <circle cx="18" cy="20" r="1.2" />
    {/* Clip marker on the cystic duct */}
    <path d="M14.5 5.5h3" />
  </svg>
);

/* Step 3 — Pancreatic surgery: pancreas (head + body + tail) with dashed
   resection line marking a Whipple's transection plane. */
const IconPancreasSurgery = () => (
  <svg {...SVG_PROPS}>
    {/* Pancreas: rounded head on right, tapering body to tail on left */}
    <path d="M5 18c2-4 6-3 9-2 3 1 6 1 8-1 2-2 5-1 5 2s-2 5-5 5c-3 0-5-2-8-2-3 0-7 1-9-2z" />
    {/* Pancreatic duct hint */}
    <path d="M8 17c4 1 8 1 13 1" />
    {/* Resection line (dashed transection) */}
    <path d="M17 11v12" strokeDasharray="1.4 1.6" />
  </svg>
);

/* Step 3 — Biliary surgery: bile duct tree with anastomosis loop at the
   bottom representing Roux-en-Y hepaticojejunostomy. */
const IconBiliarySurgery = () => (
  <svg {...SVG_PROPS}>
    {/* Liver hilum + intrahepatic ducts */}
    <path d="M10 6l4 4" />
    <path d="M22 6l-4 4" />
    <path d="M16 10v6" />
    {/* Common bile duct (with dashed segment = anastomosis line) */}
    <path d="M16 16v3" strokeDasharray="1.4 1.6" />
    {/* Roux loop */}
    <path d="M11 22a5 5 0 0 1 10 0" />
    <path d="M11 22v3" />
    <path d="M21 22v3" />
  </svg>
);

/* Step 4 — Recovery & Follow-Up: shield with heartbeat ECG line. */
const IconShieldHeartbeat = () => (
  <svg {...SVG_PROPS}>
    <path d="M16 4l10 3.5v8c0 6.3-4.6 10.5-10 12-5.4-1.5-10-5.7-10-12v-8z" />
    <path d="M9 16h3l1.6-3 2.6 6 1.6-3H23" />
  </svg>
);

const STEP_ICONS_BY_VARIANT: Record<TreatmentProcessVariant, Array<() => JSX.Element>> = {
  liver: [IconStethoscopeMag, IconClipboardLiver, IconLiverIncision, IconShieldHeartbeat],
  gallbladder: [IconStethoscopeMag, IconClipboardGallbladder, IconGallbladderSurgery, IconShieldHeartbeat],
  pancreatic: [IconStethoscopeMag, IconClipboardPancreas, IconPancreasSurgery, IconShieldHeartbeat],
  biliary: [IconStethoscopeMag, IconClipboardBileTree, IconBiliarySurgery, IconShieldHeartbeat],
  mentorship: [IconStethoscopeMag, IconClipboardLiver, IconLiverIncision, IconShieldHeartbeat],
};

/* ───────────────────── Component ───────────────────── */

interface TreatmentProcessStickyProps {
  /** Preset shorthand — picks default steps, header, subtitle, and rail icons. */
  variant?: TreatmentProcessVariant;
  /** Override steps. When provided, fully replaces the variant's steps. */
  steps?: TreatmentProcessStep[];
  /** Override header (label + heading + aria). Falls back to variant header. */
  header?: Partial<TreatmentProcessHeader>;
  /** Override subtitle paragraph. */
  subtitle?: string;
  /** Override per-step rail icon components. Length should match steps. */
  stepIcons?: Array<() => JSX.Element>;
}

const TreatmentProcessSticky = ({
  variant = "liver",
  steps,
  header: headerOverride,
  subtitle: subtitleOverride,
  stepIcons,
}: TreatmentProcessStickyProps = {}) => {
  const STEPS = steps ?? STEPS_BY_VARIANT[variant];
  const variantIcons = STEP_ICONS_BY_VARIANT[variant];
  // Per-step icons: explicit prop wins → per-step `icon` field → variant default.
  const STEP_ICONS = STEPS.map(
    (step, i) => stepIcons?.[i] ?? step.icon ?? variantIcons[i] ?? variantIcons[variantIcons.length - 1],
  );
  const subtitle = subtitleOverride ?? SUBTITLE_BY_VARIANT[variant];
  const header: SectionHeader = { ...HEADER_BY_VARIANT[variant], ...headerOverride };
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stackRef = useRef<HTMLDivElement | null>(null);
  const firstCardRef = useRef<HTMLDivElement | null>(null);
  const cardOuterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [cardHeight, setCardHeight] = useState(420);
  const [stackHeight, setStackHeight] = useState(0);
  const [stackTravel, setStackTravel] = useState(1);
  // Mirror stackTravel in a ref so scroll handlers always read the latest
  // measurement instantly — no waiting for the next render or stale closures.
  const stackTravelRef = useRef(1);

  const activeStep = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length));

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  /* Single source of truth: derive progress from a given travel distance and
     the current stack rect. Used by both scroll and post-resize recompute so
     the rail can never desync from the sticky stack geometry. */
  const computeProgress = useCallback((travel: number) => {
    const stack = stackRef.current;
    if (!stack || travel <= 0) return 0;
    const rect = stack.getBoundingClientRect();
    const numerator = STICKY_TOP - rect.top;
    return Math.min(1, Math.max(0, numerator / travel));
  }, []);

  const measureStickyGeometry = useCallback(() => {
    const card = firstCardRef.current;
    const stack = stackRef.current;
    const firstOuter = cardOuterRefs.current[0];
    const lastOuter = cardOuterRefs.current[STEPS.length - 1];

    if (card) setCardHeight(card.getBoundingClientRect().height);
    if (stack) setStackHeight(stack.getBoundingClientRect().height);

    let nextTravel = stackTravelRef.current;
    if (firstOuter && lastOuter) {
      nextTravel = Math.max(1, lastOuter.offsetTop - firstOuter.offsetTop);
      // Ref update is synchronous so any scroll rAF firing on the next frame
      // already sees the new geometry — no visual lag during resize+scroll.
      stackTravelRef.current = nextTravel;
      setStackTravel(nextTravel);
    }
    // Recompute progress immediately against the freshly-measured travel so
    // the rail fill never overshoots after a layout change (resize, font load,
    // image decode, content swap, etc.).
    setProgress(computeProgress(nextTravel));
  }, [computeProgress]);

  /* Track first card height (for rail track length) and total stack height
     (so the rail column matches the sticky stack across all viewports). */
  useEffect(() => {
    if (typeof ResizeObserver === "undefined") return;
    const card = firstCardRef.current;
    const stack = stackRef.current;
    const ro = new ResizeObserver(() => {
      measureStickyGeometry();
    });
    if (card) ro.observe(card);
    if (stack) ro.observe(stack);
    cardOuterRefs.current.forEach((el) => {
      if (el) ro.observe(el);
    });
    measureStickyGeometry();
    const onResize = () => {
      // Re-measure synchronously, then push a scroll-paced update so any
      // in-flight scroll gesture gets the new geometry on the next frame.
      measureStickyGeometry();
    };
    window.addEventListener("resize", onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [isDesktop, measureStickyGeometry]);

  /* Neutralize ancestor overflow that breaks position:sticky */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const saved: { el: HTMLElement; o: string; ox: string; oy: string }[] = [];
    let parent = section.parentElement;
    while (parent && parent !== document.documentElement) {
      const cs = getComputedStyle(parent);
      if (cs.overflow !== "visible" || cs.overflowX !== "visible" || cs.overflowY !== "visible") {
        saved.push({ el: parent, o: parent.style.overflow, ox: parent.style.overflowX, oy: parent.style.overflowY });
        parent.style.overflow = "visible";
        parent.style.overflowX = "visible";
        parent.style.overflowY = "visible";
      }
      parent = parent.parentElement;
    }
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflowX;
    const prevBody = body.style.overflowX;
    html.style.overflowX = "clip";
    body.style.overflowX = "clip";
    return () => {
      saved.forEach(({ el, o, ox, oy }) => {
        el.style.overflow = o;
        el.style.overflowX = ox;
        el.style.overflowY = oy;
      });
      html.style.overflowX = prevHtml;
      body.style.overflowX = prevBody;
    };
  }, []);

  /* Scroll-driven progress (rAF-throttled). Reads stackTravel from a ref so a
     mid-scroll resize is reflected on the very next frame with no stale
     closure window. Shares computeProgress with the resize/measure path. */
  const rafRef = useRef<number | null>(null);
  const handleScroll = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      setProgress(computeProgress(stackTravelRef.current));
    });
  }, [computeProgress]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section ref={sectionRef} className="tp-section" aria-label={header.ariaLabel}>
      <div className="tp-container">
        {/* Header */}
        <div className="tp-header">
          <span className="tp-label">{header.label}</span>
          <h2 className="tp-heading font-arefin-heading">
            {header.headingLead}<em>{header.headingAccent}</em>
          </h2>
          <p className="tp-subtitle">{subtitle}</p>
        </div>

        {/* Body: rail + sticky stack */}
        <div className="tp-body">
          {isDesktop && (
            <div
              className="tp-rail-col"
              aria-hidden="true"
              style={stackHeight > 0 ? { height: `${stackHeight}px` } : undefined}
            >
              <div className="tp-rail-sticky">
                <div className="tp-rail-icon">
                  {STEP_ICONS.map((Icon, i) => (
                    <span key={i} className="tp-rail-icon-svg" data-active={activeStep === i}>
                      <Icon />
                    </span>
                  ))}
                </div>
                <div className="tp-rail-track" style={{ height: `${cardHeight}px` }}>
                  <div className="tp-rail-fill" style={{ height: `${progress * 100}%` }} />
                </div>
              </div>
            </div>
          )}

          {/* Sticky stack — height matches actual stacking distance to avoid dead scroll */}
          <div
            className="tp-stack"
            ref={stackRef}
            style={
              isDesktop && stackTravel > 1
                ? { height: `${stackTravel + cardHeight}px` }
                : undefined
            }
          >
            {STEPS.map((step, i) => (
              <div
                key={step.badge}
                className="tp-card-outer"
                ref={(el) => {
                  cardOuterRefs.current[i] = el;
                  if (i === 0) firstCardRef.current = el;
                }}
                style={isDesktop ? { position: "sticky", top: `${STICKY_TOP}px`, zIndex: i + 1 } : undefined}
              >
                <article className="tp-card" data-step={i + 1}>
                  <div className="tp-card-body">
                    {step.href ? (
                      <Link
                        to={step.href}
                        className="tp-badge tp-badge-link"
                        title={step.linkTitle ?? step.badge}
                      >
                        {step.badge}
                      </Link>
                    ) : (
                      <span className="tp-badge">{step.badge}</span>
                    )}
                    <h3 className="tp-card-title">
                      {step.href ? (
                        <Link
                          to={step.href}
                          className="tp-card-title-link"
                          title={step.linkTitle ?? step.title}
                        >
                          {step.title}
                        </Link>
                      ) : (
                        step.title
                      )}
                    </h3>
                    <p className="tp-card-desc">{step.description}</p>
                    <p className="tp-tasks-heading">Tasks Involved</p>
                    <div className="tp-task-tags">
                      {step.tasks.map((t) => {
                        const taskSlug = t
                          .toLowerCase()
                          .replace(/&/g, " and ")
                          .replace(/\//g, " ")
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/^-+|-+$/g, "")
                          .slice(0, 60);
                        const href = step.href
                          ? `${step.href.replace(/\/$/, "")}/${taskSlug}/`
                          : undefined;
                        return href ? (
                          <Link
                            key={t}
                            to={href}
                            className="tp-tag tp-tag-link"
                            title={`${t} — ${step.linkTitle ?? step.title}`}
                          >
                            {t}
                          </Link>
                        ) : (
                          <span key={t} className="tp-tag">{t}</span>
                        );
                      })}
                    </div>
                  </div>
                  <div className="tp-card-visual">{renderGlass(step.glass)}</div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TreatmentProcessSticky;
