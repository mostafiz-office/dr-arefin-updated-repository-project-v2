/**
 * Journey Task Pages — auto-generated per-task satellite pages.
 *
 * Source of truth: the STEPS_BY_VARIANT data in
 * `src/components/arefin/TreatmentProcessSticky.tsx`.
 *
 * For every {variant, step, task} triple we produce a real satellite page
 * routed at `{step.href}/<task-slug>/` so each "Tasks Involved" tag has a
 * unique destination instead of all four tags pointing to the same step.
 *
 * Pages are intentionally compact (~250–400 words) but still meet the SEO
 * contract: unique H1, meta description, intro, two H2 sections, FAQ block,
 * and a related-links grid. They are rendered by the same
 * `SatellitePageTemplate` used by hand-authored pages, via
 * `findSatellitePage()` -> `__JOURNEY_TASK_PAGES__` global (registered in
 * `App.tsx`, same pattern as `__MATRIX_PAGES__`).
 */

import type { SatellitePage } from "@/data/satellitePages";

/* ───────────────────── Source data (mirrors TreatmentProcessSticky) ───────────────────── */

interface JourneyStepSeed {
  badge: string;
  title: string;
  stepHref: string;          // parent step satellite page (must already exist)
  stepLinkTitle: string;
  tasks: string[];
}
interface JourneyVariantSeed {
  variant: "liver" | "gallbladder" | "pancreatic" | "biliary" | "mentorship";
  variantLabel: string;
  hubHref: string;           // e.g. /treatment/liver-surgery/
  hubLabel: string;
  steps: JourneyStepSeed[];
}

const VARIANTS: JourneyVariantSeed[] = [
  {
    variant: "liver",
    variantLabel: "Liver Surgery",
    hubHref: "/treatment/liver-surgery/",
    hubLabel: "Liver Surgery Hub",
    steps: [
      {
        badge: "Step 1", title: "Consultation & Diagnosis",
        stepHref: "/treatment/liver-surgeon-dhaka/",
        stepLinkTitle: "Liver surgeon consultation in Dhaka by Dr. Arefin",
        tasks: ["Medical History Review", "Diagnostic Imaging", "Lab Work Analysis", "Risk Assessment"],
      },
      {
        badge: "Step 2", title: "Treatment Planning",
        stepHref: "/treatment/liver-tumor-cancer-surgery-dhaka/",
        stepLinkTitle: "Liver tumor and cancer surgery planning in Dhaka by Dr. Arefin",
        tasks: ["Multidisciplinary Review", "Surgical Approach Selection", "Pre-op Preparation", "Patient Counseling"],
      },
      {
        badge: "Step 3", title: "Surgical Procedure",
        stepHref: "/treatment/minimally-invasive-liver-surgery-dhaka/",
        stepLinkTitle: "Minimally invasive liver surgery in Dhaka by Dr. Arefin",
        tasks: ["Advanced Surgical Techniques", "Minimally Invasive Options", "Intraoperative Monitoring", "Expert Surgical Team"],
      },
      {
        badge: "Step 4", title: "Recovery & Follow-Up",
        stepHref: "/treatment/post-transplant-follow-up/",
        stepLinkTitle: "Post-operative liver care and follow-up by Dr. Arefin",
        tasks: ["Recovery Protocol", "Follow-up Consultations", "Rehabilitation Guidance", "Lifetime Support"],
      },
    ],
  },
  {
    variant: "gallbladder",
    variantLabel: "Gallbladder Surgery",
    hubHref: "/treatment/gallbladder-surgery/",
    hubLabel: "Gallbladder Surgery Hub",
    steps: [
      {
        badge: "Step 1", title: "Consultation & Diagnosis",
        stepHref: "/treatment/cholecystitis-surgery-dhaka/",
        stepLinkTitle: "Gallbladder consultation and cholecystitis evaluation in Dhaka",
        tasks: ["Symptom Evaluation", "Abdominal Ultrasound", "MRCP When Indicated", "Liver Function Tests"],
      },
      {
        badge: "Step 2", title: "Treatment Planning",
        stepHref: "/treatment/gallbladder-cancer-resection-dhaka/",
        stepLinkTitle: "Gallbladder treatment planning in Dhaka by Dr. Arefin",
        tasks: ["Laparoscopic vs Open Decision", "Anaesthetic Clearance", "Pre-op Optimisation", "Patient Counselling"],
      },
      {
        badge: "Step 3", title: "Laparoscopic Cholecystectomy",
        stepHref: "/treatment/laparoscopic-cholecystectomy-dhaka/",
        stepLinkTitle: "Laparoscopic cholecystectomy in Dhaka by Dr. Arefin",
        tasks: ["Keyhole Incisions", "Critical View of Safety", "Stone & Specimen Retrieval", "Drain Placement If Needed"],
      },
      {
        badge: "Step 4", title: "Recovery & Follow-Up",
        stepHref: "/treatment/gallstone-removal-dhaka/",
        stepLinkTitle: "Gallbladder surgery recovery and follow-up in Dhaka",
        tasks: ["Same/Next-Day Discharge", "Diet & Wound Guidance", "2-Week Review", "Long-Term Support"],
      },
    ],
  },
  {
    variant: "pancreatic",
    variantLabel: "Pancreatic Surgery",
    hubHref: "/treatment/pancreatic-surgery/",
    hubLabel: "Pancreatic Surgery Hub",
    steps: [
      {
        badge: "Step 1", title: "Consultation & Advanced Imaging",
        stepHref: "/treatment/pancreatic-cyst-surgery-dhaka/",
        stepLinkTitle: "Pancreatic consultation and advanced imaging in Dhaka",
        tasks: ["Triphasic CT Scan", "MRI / MRCP", "EUS & Biopsy", "Tumour Marker Panel"],
      },
      {
        badge: "Step 2", title: "Multidisciplinary Planning",
        stepHref: "/treatment/pancreatic-cancer-surgery-dhaka/",
        stepLinkTitle: "Multidisciplinary pancreatic cancer planning in Dhaka",
        tasks: ["Tumour Board Review", "Resectability Assessment", "Neoadjuvant Decision", "Nutritional Optimisation"],
      },
      {
        badge: "Step 3", title: "Pancreatic Resection",
        stepHref: "/treatment/distal-pancreatectomy-dhaka/",
        stepLinkTitle: "Pancreatic resection — Whipple and distal pancreatectomy in Dhaka",
        tasks: ["Whipple / Distal Resection", "Vascular Reconstruction If Needed", "Frozen Section Margins", "ICU-Backed Recovery"],
      },
      {
        badge: "Step 4", title: "Recovery & Oncologic Follow-Up",
        stepHref: "/treatment/pancreatitis-surgery-dhaka/",
        stepLinkTitle: "Pancreatic surgery recovery and oncologic follow-up in Dhaka",
        tasks: ["ICU & Ward Care", "Enzyme & Glucose Management", "Adjuvant Therapy Coordination", "Surveillance Imaging"],
      },
    ],
  },
  {
    variant: "biliary",
    variantLabel: "Biliary Surgery",
    hubHref: "/treatment/biliary-tract-surgery/",
    hubLabel: "Biliary Surgery Hub",
    steps: [
      {
        badge: "Step 1", title: "Consultation & Biliary Imaging",
        stepHref: "/treatment/bile-duct-obstruction-surgery-dhaka/",
        stepLinkTitle: "Bile duct consultation and biliary imaging in Dhaka",
        tasks: ["LFTs & Bilirubin Trend", "Abdominal Ultrasound", "MRCP Mapping", "ERCP When Therapeutic"],
      },
      {
        badge: "Step 2", title: "Drainage & Surgical Planning",
        stepHref: "/treatment/cholangitis-surgery-dhaka/",
        stepLinkTitle: "Biliary drainage and surgical planning in Dhaka",
        tasks: ["Biliary Stenting / PTBD", "Stricture vs Stone vs Tumour", "Hepatobiliary MDT Review", "Pre-op Optimisation"],
      },
      {
        badge: "Step 3", title: "Biliary Reconstruction Surgery",
        stepHref: "/treatment/cholangiocarcinoma-surgery-dhaka/",
        stepLinkTitle: "Biliary reconstruction surgery in Dhaka by Dr. Arefin",
        tasks: ["Hepaticojejunostomy", "Cyst Excision", "Resection For Malignancy", "Intraoperative Cholangiogram"],
      },
      {
        badge: "Step 4", title: "Recovery & Long-Term Surveillance",
        stepHref: "/treatment/choledochal-cyst-surgery-dhaka/",
        stepLinkTitle: "Long-term biliary surveillance and follow-up in Dhaka",
        tasks: ["Liver Function Monitoring", "Infection Surveillance", "Nutritional Support", "Long-Term Anastomosis Review"],
      },
    ],
  },
  {
    variant: "mentorship",
    variantLabel: "HPB Mentorship",
    hubHref: "/mentorship/",
    hubLabel: "Mentorship Programme",
    steps: [
      {
        badge: "Phase 1", title: "Foundations & Orientation",
        stepHref: "/mentorship/hpb-fellowship-training-dhaka/",
        stepLinkTitle: "HPB fellowship foundations and orientation in Dhaka",
        tasks: ["HPB Anatomy Refresher", "Imaging Reading Sessions", "OT Etiquette & Safety", "Baseline Assessment"],
      },
      {
        badge: "Phase 2", title: "Observership & Assist",
        stepHref: "/mentorship/surgical-mentorship-bangladesh/",
        stepLinkTitle: "Surgical observership and assist mentorship in Bangladesh",
        tasks: ["Scrub & Assist Rotations", "Live Case Observation", "Decision-Making Drills", "Operative Logbook"],
      },
      {
        badge: "Phase 3", title: "Hands-On Operating",
        stepHref: "/mentorship/operative-skills-workshop/",
        stepLinkTitle: "Hands-on operative skills workshop in Dhaka",
        tasks: ["Graded Operative Steps", "Direct Supervision", "Structured Debriefs", "Skills Logbook"],
      },
      {
        badge: "Phase 4", title: "Independence & Certification",
        stepHref: "/mentorship/young-surgeon-training-program/",
        stepLinkTitle: "Young surgeon independence and certification programme",
        tasks: ["End-to-End Case Ownership", "Portfolio Review", "Exit Assessment", "Certification"],
      },
    ],
  },
];

/* ───────────────────── Slug + content generation ───────────────────── */

const HERO_IMG = "/src/assets/gallery/hepatobiliary-open-surgery-best-surgeon-team-dhaka.webp";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\//g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function buildPage(
  v: JourneyVariantSeed,
  step: JourneyStepSeed,
  task: string,
  siblingTasks: string[]
): SatellitePage {
  const taskSlug = slugify(task);
  const parentSlugNoTrail = step.stepHref.replace(/\/$/, "");
  const slug = `${parentSlugNoTrail}/${taskSlug}`;
  const variantLower = v.variantLabel.toLowerCase();

  const h1 = `${task} — ${step.title} in ${v.variantLabel}`;
  const title =
    `${task} in ${v.variantLabel} — Dr. Arefin Dhaka`.slice(0, 60);
  const metaDesc =
    `${task} during the ${step.title.toLowerCase()} phase of ${variantLower} ` +
    `by Dr. Murshidul Arefin in Dhaka — what to expect, who it suits, and how it fits the full pathway.`
      .slice(0, 160);

  const intro =
    `<p><strong>${task}</strong> is a focused activity inside the <a href='${step.stepHref}' ` +
    `title='${step.stepLinkTitle}'>${step.title}</a> phase of ${variantLower} under ` +
    `<a href='/about/' title='About Dr. Murshidul Arefin — credentials and training'>Dr. Murshidul Arefin's</a> ` +
    `care. This page explains what the task involves, why it matters for your outcome, and how it ` +
    `links to the rest of your <a href='${v.hubHref}' title='${v.hubLabel}'>${v.variantLabel.toLowerCase()} ` +
    `journey</a> at Popular Medical College Hospital, Dhanmondi.</p>`;

  const sections = [
    {
      heading: `What "${task}" actually involves`,
      body:
        `<p>During the ${step.title.toLowerCase()} phase, "${task}" is performed by the ` +
        `<a href='/best-hepatobiliary-surgeon-dhaka/' title='Best hepatobiliary surgeon in Dhaka'>` +
        `hepatobiliary team</a> using clear, protocolised steps. Patients receive a written ` +
        `summary of the findings, the next decision points, and what is expected of them before ` +
        `progressing to the next stage of the <a href='${step.stepHref}' title='${step.stepLinkTitle}'>` +
        `${step.title.toLowerCase()}</a> pathway.</p>`,
    },
    {
      heading: `How it connects to your full ${variantLower} pathway`,
      body:
        `<p>${task} is one of four tasks in the ${step.title.toLowerCase()} phase, alongside ` +
        siblingTasks
          .filter((t) => t !== task)
          .map(
            (t) =>
              `<a href='${parentSlugNoTrail}/${slugify(t)}/' title='${t} — ${step.stepLinkTitle}'>${t}</a>`
          )
          .join(", ") +
        `. The complete journey runs through four phases — see the ` +
        `<a href='${v.hubHref}' title='${v.hubLabel}'>${v.variantLabel.toLowerCase()} hub</a> for the ` +
        `full timeline and contact options.</p>`,
    },
  ];

  const faq = [
    {
      q: `Why does ${task.toLowerCase()} matter in ${variantLower}?`,
      a: `${task} feeds directly into the decisions made during the ${step.title.toLowerCase()} phase. Skipping or rushing it increases the risk of mis-staging, avoidable complications, and unplanned reoperation, which is why Dr. Arefin's team treats it as a checklist item, not an optional step.`,
    },
    {
      q: `Do I need to prepare anything for ${task.toLowerCase()}?`,
      a: `Most patients are guided through preparation at the consultation. Bring all prior imaging on disc, a list of current medications (including blood thinners and herbal supplements), and a family member who can help recall instructions afterwards.`,
    },
    {
      q: `Where is ${task.toLowerCase()} performed?`,
      a: `Dr. Arefin's ${variantLower} pathway runs at Popular Medical College Hospital, Dhanmondi, Dhaka. Imaging, lab work, and procedural steps are coordinated in-house to minimise repeat visits.`,
    },
  ];

  const related = [
    { to: step.stepHref, label: step.title, title: step.stepLinkTitle },
    { to: v.hubHref, label: v.hubLabel, title: `${v.variantLabel} overview by Dr. Arefin` },
    { to: "/about/", label: "About Dr. Arefin", title: "About Dr. Murshidul Arefin — hepatobiliary surgeon" },
    { to: "/contact/", label: "Book Consultation", title: "Contact Dr. Arefin chamber, Popular Medical College" },
  ];

  return {
    slug,
    kicker: `${v.variantLabel} • ${step.badge}`,
    title,
    metaDesc,
    h1,
    intro,
    heroImage: HERO_IMG,
    heroAlt: `${task} during ${step.title.toLowerCase()} — ${v.variantLabel} by Dr. Arefin, Dhaka`,
    sections,
    faq,
    related,
  };
}

/* ───────────────────── Final export ───────────────────── */

export const JOURNEY_TASK_PAGES: SatellitePage[] = VARIANTS.flatMap((v) =>
  v.steps.flatMap((s) => s.tasks.map((task) => buildPage(v, s, task, s.tasks)))
);
