import { Link } from "react-router-dom";
import { physicianEntity, buildBreadcrumbList, buildGraph } from "@/lib/structuredData";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  Phone,
  Stethoscope,
  HeartPulse,
  ShieldCheck,
  Eye,
  Compass,
  GraduationCap,
  BookOpen,
  Award,
  Briefcase,
  Microscope,
} from "lucide-react";
import DrArefinHeader from "@/components/arefin/DrArefinHeader";
import DrArefinFooter from "@/components/arefin/DrArefinFooter";
import TimelineV2 from "@/components/arefin/timeline-variations/TimelineV2";
import FAQAccordion from "@/components/arefin/FAQAccordion";

import { getFaqsByCategory } from "@/data/faqRegistry";
import darkLogo from "@/assets/dr-arefin-logo-dark.webp";
import heroBg from "@/assets/about-hero-ot-real.webp";
import portraitIntro from "@/assets/dr-arefin-liver-doctor-real.webp";
import { Reveal } from "@/hooks/useScrollReveal";

/**
 * About — Dark version
 * Content mirrors https://drarefin.com/about/ verbatim.
 * Header overlays the hero (transparent mode).
 * Each section uses a distinct real image.
 */

const jsonLdString = buildGraph(
  buildBreadcrumbList([{ name: "About", path: "/about/" }]),
  {
    "@context": "https://schema.org",
    ...physicianEntity,
    url: "https://drarefin.com/about/",
  },
);

const pillars = [
  {
    icon: HeartPulse,
    title: "Patient-Centered Care",
    to: "/about/patient-centered-care/",
    linkTitle:
      "Patient-centered gallbladder care — compassionate consultation &amp; same-surgeon continuity",
    body: (
      <>
        Every treatment is guided by <strong><Link to="/about/patient-centered-care/" title="Compassion in gallbladder care — patient-first hepatobiliary surgery">compassion</Link></strong>,{" "}
        <strong><Link to="/about/patient-centered-care/" title="Clear communication during gallbladder consultation in Dhaka">clear communication</Link></strong>, and a{" "}
        <strong><Link to="/treatment/gallbladder-surgery/" title="Commitment to recovery after gallbladder surgery in Dhaka">commitment to your recovery</Link></strong> — because every patient
        deserves <strong><Link to="/about/patient-centered-care/" title="Personalized gallbladder care attention from Dr. Arefin">personalized attention.</Link></strong>
      </>
    ),
  },
  {
    icon: ShieldCheck,
    title: "Proven Surgical Excellence",
    to: "/about/proven-surgical-excellence/",
    linkTitle:
      "Proven surgical excellence — 1500+ gallbladder &amp; hepatobiliary surgeries in Dhaka",
    body: (
      <>
        With <strong><Link to="/treatment/laparoscopic-cholecystectomy-dhaka/" title="Advanced laparoscopic gallbladder surgery techniques in Dhaka">advanced techniques</Link></strong> and a{" "}
        <strong><Link to="/credentials/1500-gallbladder-surgeries-dhaka/" title="1500+ successful gallbladder &amp; hepatobiliary surgery outcomes">track record of successful outcomes</Link></strong>, Dr. Arefin
        ensures each procedure is <strong><Link to="/about/proven-surgical-excellence/" title="Safe, precise gallbladder &amp; hepatobiliary surgical technique">safe, precise</Link></strong>, and focused
        on <strong><Link to="/treatment/gallbladder-surgery/" title="Restoring quality of life after gallbladder surgery in Dhaka">restoring your quality of life.</Link></strong>
      </>
    ),
  },
];

const visionMission = [
  {
    icon: Eye,
    label: "Vision",
    to: "/about/proven-surgical-excellence/",
    linkTitle: "Vision — proven surgical excellence in gallbladder & hepatobiliary surgery, Dhaka",
    body: (
      <>
        To be the{" "}
        <strong>
          <Link to="/treatment/hepatobiliary-surgery/" title="Hepatobiliary surgery expertise — gallbladder, liver & pancreas, Dhaka">
            foremost authority in hepatobiliary surgery
          </Link>
        </strong>
        , renowned for{" "}
        <strong>
          <Link to="/about/proven-surgical-excellence/" title="Proven surgical excellence — 1,500+ gallbladder & hepatobiliary procedures in Dhaka">
            excellence, innovation, and transformative patient care.
          </Link>
        </strong>
      </>
    ),
  },
  {
    icon: Compass,
    label: "Mission",
    to: "/about/patient-centered-care/",
    linkTitle: "Mission — patient-centered gallbladder & hepatobiliary care in Dhanmondi, Dhaka",
    body: (
      <>
        To deliver{" "}
        <strong>
          <Link to="/about/proven-surgical-excellence/" title="Exceptional surgical expertise — gallbladder & hepatobiliary surgeon, Dhaka">
            exceptional surgical expertise
          </Link>
        </strong>{" "}
        while prioritizing{" "}
        <strong>
          <Link to="/about/patient-centered-care/" title="Compassionate, patient-centered gallbladder care — Dhanmondi, Dhaka">
            compassionate, ethical, and patient-centered healthcare
          </Link>
        </strong>
        , ensuring every patient receives the{" "}
        <strong>
          <Link to="/credentials/1500-gallbladder-surgeries-dhaka/" title="Highest standard of gallbladder care — 1,500+ surgeries in Dhaka">
            highest standard of care.
          </Link>
        </strong>
      </>
    ),
  },
];

const credentials = [
  {
    year: "2003",
    icon: GraduationCap,
    title: "MBBS — University of Dhaka",
    to: "/credentials/fcps-ms-hepatobiliary-gallbladder-surgeon-dhaka/",
    linkTitle: "MBBS, University of Dhaka — foundation of Dr. Arefin's gallbladder & hepatobiliary surgical training",
    body: (
      <>
        Earned{" "}
        <strong>
          <Link to="/credentials/fcps-ms-hepatobiliary-gallbladder-surgeon-dhaka/" title="MBBS credential — Dr. Arefin's medical degree, prerequisite to hepatobiliary specialisation">
            MBBS
          </Link>
        </strong>{" "}
        from the{" "}
        <strong>
          <Link to="/credentials/fcps-ms-hepatobiliary-gallbladder-surgeon-dhaka/" title="University of Dhaka — clinical training origin of Dhaka's gallbladder surgeon">
            University of Dhaka
          </Link>
        </strong>
        , completing the foundational years of clinical training at one of South Asia's
        most respected medical schools.
      </>
    ),
  },
  {
    year: "2011",
    icon: BookOpen,
    title: "MS in Hepatobiliary Surgery — BSMMU",
    to: "/credentials/fcps-ms-hepatobiliary-gallbladder-surgeon-dhaka/",
    linkTitle: "MS in Hepatobiliary Surgery — board-certified gallbladder, liver & pancreas surgeon credential",
    body: (
      <>
        Completed{" "}
        <strong>
          <Link to="/credentials/fcps-ms-hepatobiliary-gallbladder-surgeon-dhaka/" title="MS Hepatobiliary Surgery — sub-specialty training behind Dhaka's gallbladder surgeon">
            MS in Hepatobiliary Surgery
          </Link>
        </strong>{" "}
        at{" "}
        <strong>
          <Link to="/credentials/fcps-ms-hepatobiliary-gallbladder-surgeon-dhaka/" title="BSMMU — Bangladesh's leading institution for hepatobiliary & gallbladder surgical training">
            Bangabandhu Sheikh Mujib Medical University (BSMMU)
          </Link>
        </strong>{" "}
        — Bangladesh's leading postgraduate medical institution — sub-specialising in
        liver, gallbladder, bile duct and pancreatic surgery.
      </>
    ),
  },
  {
    year: "2013",
    icon: Microscope,
    title: "Advanced Liver Transplant Training",
    to: "/treatment/liver-surgery/",
    linkTitle: "Advanced liver transplant training — complex hepatic & gallbladder surgery expertise, Dhaka",
    body: (
      <>
        Pursued advanced fellowship exposure in{" "}
        <strong>
          <Link to="/treatment/liver-surgery/" title="Liver transplantation & resection — Dr. Arefin's advanced hepatobiliary surgical training">
            liver transplantation
          </Link>
        </strong>{" "}
        and{" "}
        <strong>
          <Link to="/treatment/liver-surgery/" title="Complex hepatic resection — advanced liver & gallbladder surgical capability">
            complex hepatic resection
          </Link>
        </strong>
        , building hands-on capability in donor–recipient surgery and post-transplant care.
      </>
    ),
  },
  {
    year: "2015",
    icon: Briefcase,
    title: "Consultant — Popular Medical College Hospital",
    to: "/popular-medical-college-hospital/",
    linkTitle: "Consultant at Popular Medical College Hospital, Dhanmondi — Dr. Arefin's gallbladder surgery chamber",
    body: (
      <>
        Appointed{" "}
        <strong>
          <Link to="/treatment/laparoscopic-cholecystectomy-dhaka/" title="Consultant in laparoscopic gallbladder & liver transplant surgery, Dhaka">
            Consultant in General, Laparoscopic and Liver Transplant Surgery
          </Link>
        </strong>{" "}
        at{" "}
        <strong>
          <Link to="/popular-medical-college-hospital/" title="Popular Medical College Hospital, Dhanmondi — Dr. Arefin's gallbladder surgery chamber">
            Popular Medical College Hospital, Dhanmondi
          </Link>
        </strong>
        , where he both consults and operates today.
      </>
    ),
  },
  {
    year: "Today",
    icon: Award,
    title: "1,000+ Hepatobiliary Procedures",
    to: "/credentials/1500-gallbladder-surgeries-dhaka/",
    linkTitle: "1,500+ gallbladder & hepatobiliary surgeries performed in Dhaka — documented volume",
    body: (
      <>
        Recognised among the{" "}
        <strong>
          <Link to="/treatment/hepatobiliary-surgery/" title="Best hepatobiliary & gallbladder surgeons in Dhaka — sub-specialty practice">
            best hepatobiliary surgeons in Dhaka
          </Link>
        </strong>
        , with more than{" "}
        <strong>
          <Link to="/credentials/1500-gallbladder-surgeries-dhaka/" title="1,500+ successful gallbladder & hepatobiliary procedures in Dhaka">
            1,000 successful procedures
          </Link>
        </strong>{" "}
        across liver, gallbladder, biliary tract and pancreatic surgery — combining open and
        minimally invasive techniques.
      </>
    ),
  },
];

const AboutDark = () => {
  return (
    <div className="arefin dark min-h-screen bg-background text-foreground font-arefin">
      <Helmet>
        <title>About Dr. Murshidul Arefin — Hepatobiliary Surgeon, Dhaka, Bangladesh</title>
        <meta name="description" content="Learn about Dr. Murshidul Arefin's qualifications, experience, and dedication to hepatobiliary surgery. Associate Professor at Popular Medical College Hospital, Dhaka, specializing in liver, gallbladder, and pancreatic surgery." />
        <link rel="canonical" href="https://drarefin.com/about/" />
        <link rel="preload" as="image" href={heroBg} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About Dr. Murshidul Arefin — Hepatobiliary Surgeon, Dhaka" />
        <meta property="og:description" content="Learn about Dr. Murshidul Arefin's qualifications, experience, and dedication to hepatobiliary surgery at Popular Medical College Hospital, Dhaka." />
        <meta property="og:url" content="https://drarefin.com/about/" />
        <meta property="og:site_name" content="Dr. Murshidul Arefin" />
        <meta property="og:locale" content="en_BD" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />

      {/* Header overlays the hero — transparent mode */}
      <DrArefinHeader logoSrc={darkLogo} transparent />

      {/* ============== HERO with OT background image ============== */}
      <section
        className="about-hero relative overflow-hidden"
        aria-label="About Dr. Murshidul Arefin"
      >
        <div className="about-hero-bg absolute inset-0">
          <img
            src={heroBg}
            loading="eager"
            fetchPriority="high"
            alt=""
            aria-hidden="true"
            className="about-hero-img block w-full h-full object-cover"
          />
          <div className="about-hero-overlay absolute inset-0" />
        </div>
        {/* Extra top padding to account for transparent header */}
        <div className="container relative text-center pt-28 sm:pt-36 md:pt-44 lg:pt-48 pb-16 sm:pb-24 md:pb-32 lg:pb-36">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/60">
                <li>
                  <Link
                    to="/"
                    className="hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-white">About</li>
              </ol>
            </nav>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="about-hero-h1 text-fluid-h1">
              <Link
                to="/about/"
                title="About Dr. Murshidul Arefin — hepatobiliary and liver transplant surgeon, Dhaka"
                className="about-hero-h1-link"
              >
                About Dr. Murshidul Arefin
              </Link>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="about-hero-sub mt-6 max-w-2xl mx-auto text-fluid-lede">
               <strong><Link to="/about/" title="About Dr. Murshidul Arefin — hepatobiliary &amp; liver transplant surgeon, Dhaka">Dr. Murshidul Arefin</Link></strong> is a leading{" "}
               <strong><Link to="/treatment/" title="Hepatobiliary treatment services in Dhaka">hepatobiliary</Link> and <Link to="/treatment/liver-surgery/" title="Liver transplant surgery">liver transplant surgeon</Link> in Dhaka</strong>,
               committed to delivering{" "}
               <strong><Link to="/about/proven-surgical-excellence/" title="Proven surgical excellence — advanced, compassionate, precise hepatobiliary care">advanced, compassionate, and precise surgical care.</Link></strong> Explore his <strong><Link to="/gallery/" title="Surgical gallery">surgical gallery</Link></strong>, <strong><Link to="/articles/" title="Articles on hepatobiliary surgery">expert articles</Link></strong>, or <strong><Link to="/mentorship/" title="Surgical mentorship programs">mentorship programs</Link></strong>.
             </p>
          </Reveal>
        </div>
      </section>

      {/* ============== ABOUT INTRO — LIGHT MINT BAND ============== */}
      <section
        className="arefin-section-divider arefin-mint-band py-10 sm:py-14 md:py-20 lg:py-28"
        aria-label="About Dr. Murshidul Arefin details"
      >
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Text */}
            <div>
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-light mb-4">
                  About the Surgeon
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="about-section-heading is-water-fill text-fluid-h2 font-semibold text-foreground mb-6 leading-tight">
                  <Link
                    to="/about/dr-arefin-gallbladder-specialist/"
                    title="About Dr. Murshidul Arefin — gallbladder specialist surgeon in Dhaka"
                    className="about-section-heading-link"
                  >
                    <span className="water-fill-text" data-text="About Dr. Murshidul Arefin">
                      About <strong>Dr. Murshidul Arefin</strong>
                    </span>
                  </Link>
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="about-body-text text-fluid-body leading-relaxed mb-5">
                  <strong><Link to="/about/" title="About Dr. Murshidul Arefin — hepatobiliary &amp; liver transplant surgeon, Dhaka">Dr. Murshidul Arefin</Link></strong> is a leading{" "}
                  <strong><Link to="/treatment/hepatobiliary-surgery/" title="Hepatobiliary surgery in Dhaka — gallbladder, liver &amp; bile-duct specialist">Hepatobiliary Surgeon in Dhaka</Link></strong>, specializing
                  in <strong><Link to="/treatment/liver-surgery/" title="Liver transplant &amp; liver surgery in Dhaka by Dr. Arefin">liver transplant</Link></strong> and{" "}
                  <strong><Link to="/treatment/" title="Complex abdominal &amp; hepatobiliary surgery services in Dhaka">complex abdominal surgeries.</Link></strong>
                </p>
              </Reveal>
              <Reveal delay={160}>
                <p className="about-body-text text-fluid-body leading-relaxed mb-6">
                  Currently serving as <strong><Link to="/popular-medical-college-hospital/" title="Dr. Arefin's gallbladder chamber at Popular Medical College Hospital, Dhanmondi">Associate Professor at Popular Medical College Hospital</Link></strong>,
                  Dr. Arefin combines <strong><Link to="/credentials/20-years-gallbladder-surgery-experience-dhaka/" title="20+ years of focused gallbladder &amp; hepatobiliary surgical expertise">over a decade of surgical expertise</Link></strong> with{" "}
                  <strong><Link to="/about/patient-centered-care/" title="Patient-centered, compassionate gallbladder care in Dhaka">compassionate, patient-first care</Link></strong> — performing{" "}
                  <strong><Link to="/treatment/" title="Liver, gallbladder, biliary &amp; pancreatic surgical procedures in Dhaka">liver, gallbladder, biliary, and pancreatic procedures</Link></strong> using both{" "}
                  <strong><Link to="/treatment/laparoscopic-cholecystectomy-dhaka/" title="Open and minimally invasive (laparoscopic) gallbladder surgery techniques">open and minimally invasive techniques.</Link></strong>
                </p>
              </Reveal>
              <Reveal delay={200}>
                <ul className="about-highlight-list mb-12 md:mb-16 space-y-3">
                  <li className="about-highlight-item flex items-start gap-3">
                    <ShieldCheck className="about-highlight-icon h-5 w-5 mt-0.5 shrink-0" aria-hidden="true" />
                    <span><strong><Link to="/credentials/fcps-ms-hepatobiliary-gallbladder-surgeon-dhaka/" title="MBBS, MS Hepatobiliary — board-certified gallbladder surgeon credentials">MBBS, MS (Hepatobiliary Surgery)</Link></strong> — board-certified specialist</span>
                  </li>
                  <li className="about-highlight-item flex items-start gap-3">
                    <HeartPulse className="about-highlight-icon h-5 w-5 mt-0.5 shrink-0" aria-hidden="true" />
                    <span><strong><Link to="/credentials/1500-gallbladder-surgeries-dhaka/" title="1500+ successful gallbladder &amp; hepatobiliary surgeries performed in Dhaka">1,000+ successful surgeries</Link></strong> across hepatobiliary &amp; upper-GI care</span>
                  </li>
                  <li className="about-highlight-item flex items-start gap-3">
                    <Stethoscope className="about-highlight-icon h-5 w-5 mt-0.5 shrink-0" aria-hidden="true" />
                    <span><strong><Link to="/treatment/liver-surgery/" title="Liver transplant &amp; complex liver resection expertise in Dhaka">Liver transplant &amp; complex resection expertise</Link></strong> in Dhaka</span>
                  </li>
                </ul>
              </Reveal>
              <Reveal delay={240}>
                <div className="about-intro-cta-row flex flex-col sm:flex-row gap-3 mt-6 md:mt-8">
                  <Link
                    to="/contact/"
                    aria-label="Book an appointment with Dr. Arefin"
                    className="hero-cta-primary is-green no-underline w-full sm:w-auto justify-center"
                  >
                    Book an Appointment
                    <ArrowRight className="hero-cta-icon" />
                  </Link>
                  <a
                    href="tel:+8801311487592"
                    aria-label="Call Dr. Arefin"
                    className="hero-cta-secondary no-underline w-full sm:w-auto justify-center"
                  >
                    <Phone className="hero-cta-icon-sm" />
                    Call Now
                  </a>
                </div>
              </Reveal>

            </div>

            {/* Portrait — consultation/chamber image */}
            <Reveal delay={100}>
              <figure className="about-portrait-figure relative rounded-2xl overflow-hidden border border-border">
                <img
                  src={portraitIntro}
                  alt="Dr. Murshidul Arefin — Hepatobiliary & Liver Transplant Surgeon, Dhaka"
                  loading="lazy"
                  decoding="async"
                  className="block w-full aspect-[4/5] sm:aspect-[4/5] object-cover object-top max-h-[520px] mx-auto"
                />
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============== PILLARS — DARK BAND with light cards ============== */}
      <section
        className="about-pillars-dark-band arefin-section-divider py-10 sm:py-14 md:py-20 lg:py-28 bg-background"
        aria-label="Our care pillars"
      >
        <div className="container">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
              <p className="about-pillars-dark-eyebrow text-xs font-semibold uppercase tracking-[0.25em] mb-4">
                What sets us apart
              </p>
              <h2 className="about-pillars-dark-heading text-fluid-h2 font-semibold leading-tight">
                Care built on <strong><Link to="/about/patient-centered-care/" title="Compassion in gallbladder care — patient-centered hepatobiliary surgery">compassion</Link></strong> and{" "}
                <strong><Link to="/about/proven-surgical-excellence/" title="Proven surgical excellence in gallbladder &amp; hepatobiliary surgery, Dhaka">surgical excellence</Link></strong>
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={120 + i * 100} className="h-full">
                <article className="about-pillar-light-card p-5 sm:p-7 md:p-8 rounded-2xl h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="about-pillar-light-icon inline-flex items-center justify-center w-12 h-12 rounded-xl">
                      <p.icon className="h-6 w-6" />
                    </span>
                    <h3 className="about-pillar-light-title text-fluid-h4 font-semibold leading-snug">
                      <Link to={p.to} title={p.linkTitle} className="about-pillar-light-title-link">
                        {p.title}
                      </Link>
                    </h3>
                  </div>
                  <p className="about-pillar-light-body text-fluid-body leading-relaxed">
                    {p.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TimelineV2
        eyebrow="Credentials & Training"
        heading={<>Education &amp; <strong>Professional Journey</strong></>}
        subheading={
          <>
            A decade-plus path through Bangladesh's leading medical institutions —
            from <strong><Link to="/credentials/fcps-ms-hepatobiliary-gallbladder-surgeon-dhaka/" title="MBBS, University of Dhaka — Dr. Arefin's medical education">MBBS at the University of Dhaka</Link></strong> to a consultant hepatobiliary
            practice in <strong><Link to="/popular-medical-college-hospital/" title="Dhanmondi chamber — Popular Medical College Hospital">Dhanmondi</Link></strong>.
          </>
        }
        items={credentials}
      />

      {/* ============== VISION & MISSION — LIGHT MINT BAND with dark cards ============== */}
      <section
        className="about-vm-section about-vm-dark-band relative overflow-hidden bg-background"
        aria-label="Vision and Mission"
      >
        <div className="container relative py-16 sm:py-24 md:py-32">
          {/* Centered section heading */}
          <Reveal>
            <div className="text-center mb-14">
              <p className="about-vm-eyebrow text-xs font-semibold uppercase tracking-[0.25em] mb-4">
                Our Purpose
              </p>
              <h2 className="about-vm-heading text-fluid-h2 font-semibold leading-tight">
                Vision & Mission
              </h2>
            </div>
          </Reveal>

          {/* Two side-by-side dark cards on light mint */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {visionMission.map((vm, i) => (
              <Reveal key={vm.label} delay={100 + i * 120} className="h-full">
                <article className="vm-card-dark p-5 sm:p-7 md:p-9 rounded-2xl h-full">
                  <div className="flex items-center gap-4 mb-5">
                    <span className="vm-card-dark-icon inline-flex items-center justify-center w-12 h-12 rounded-xl">
                      <vm.icon className="h-6 w-6" />
                    </span>
                    <h3 className="vm-card-dark-title text-fluid-h3 font-semibold">
                      <Link to={vm.to} title={vm.linkTitle} className="about-vm-title-link">
                        {vm.label}
                      </Link>
                    </h3>
                  </div>
                  <p className="vm-card-dark-body text-fluid-body leading-relaxed">
                    {vm.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLBLADDER Q&A BAND — mint reassurance band above the footer */}
      <div className="about-gallbladder-qa-band about-gallbladder-qa-band--prefooter">
        <FAQAccordion
          kicker="Gallbladder Questions"
          heading="Gallbladder Surgery — Patient Questions"
          basePath=""
          items={[
            {
              q: "What is gallbladder surgery in Dhanmondi, Dhaka?",
              a: (
                <p>
                  <Link to="/treatment/gallbladder-surgery/" title="Gallbladder surgery overview">Gallbladder surgery</Link> at Dr. Arefin's Dhanmondi chamber most often means a{" "}
                  <strong><Link to="/treatment/laparoscopic-cholecystectomy-dhaka/" title="Laparoscopic cholecystectomy in Dhaka">laparoscopic cholecystectomy</Link></strong> — a keyhole removal of the gallbladder, typically performed for{" "}
                  <Link to="/conditions/gallstones/" title="Gallstones treatment">symptomatic gallstones</Link>. Therefore, most patients go home within 24 hours and return to light activity inside a week. Moreover, more than 1,000 hepatobiliary procedures inform the operative protocol used here. Consequently, complication rates remain low while pain control and scar size both stay minimal.
                </p>
              ),
              aText:
                "Gallbladder surgery at Dr. Arefin's Dhanmondi chamber most often means a laparoscopic cholecystectomy — a keyhole removal of the gallbladder, typically performed for symptomatic gallstones. Most patients go home within 24 hours.",
              slug: "what-is-gallbladder-surgery-dhanmondi",
            },
            {
              q: "When does Dr. Arefin recommend gallbladder removal over watchful waiting?",
              a: (
                <p>
                  Removal is recommended when <Link to="/conditions/gallstones/" title="Gallstones treatment">gallstones</Link> cause repeated pain, cholecystitis, jaundice or pancreatitis — or when imaging shows a high-risk gallbladder. However, asymptomatic stones in low-risk patients are often safely monitored. Therefore, every recommendation here is individualized: a{" "}
                  <strong><Link to="/second-opinion/" title="Second opinion service">second-opinion review</Link></strong> on outside reports is welcomed before surgery is booked. Moreover, alternative care paths are explained openly, not just the operative one.
                </p>
              ),
              aText:
                "Removal is recommended when gallstones cause repeated pain, cholecystitis, jaundice or pancreatitis — or when imaging shows a high-risk gallbladder.",
              slug: "when-is-gallbladder-removal-needed",
            },
            {
              q: "Is laparoscopic gallbladder surgery safe for elderly patients?",
              a: (
                <p>
                  Yes — with proper anaesthetic and cardiac assessment,{" "}
                  <Link to="/treatment/laparoscopic-cholecystectomy-dhaka/" title="Laparoscopic cholecystectomy in Dhaka">laparoscopic cholecystectomy</Link>{" "}
                  is the safest option for most elderly patients with symptomatic stones. Therefore, age alone is rarely the deciding factor; overall fitness and comorbidities matter more. Moreover, recovery is faster than open surgery, which reduces hospital stay and pneumonia risk.
                </p>
              ),
              aText:
                "Yes — laparoscopic cholecystectomy is the safest option for most elderly patients with symptomatic stones, with faster recovery than open surgery.",
              slug: "is-laparoscopic-gallbladder-surgery-safe-elderly",
            },
            {
              q: "How long is recovery after gallbladder surgery in Dhaka?",
              a: (
                <p>
                  Most patients leave hospital within 24 hours and resume desk work or light routine inside 5–7 days. Therefore, the practical recovery window is short for almost everyone undergoing{" "}
                  <Link to="/treatment/gallbladder-surgery/" title="Gallbladder surgery overview">elective gallbladder surgery</Link>. However, heavy lifting and strenuous exercise should wait 3–4 weeks. Moreover, dietary changes are usually modest — most patients return to a normal diet after a brief low-fat transition.
                </p>
              ),
              aText:
                "Most patients leave hospital within 24 hours and resume light routine inside 5–7 days. Heavy lifting should wait 3–4 weeks.",
              slug: "recovery-after-gallbladder-surgery-dhaka",
            },
            {
              q: "Does Dr. Arefin handle complex gallbladder and bile duct cases?",
              a: (
                <p>
                  Yes — complex cases including{" "}
                  <Link to="/treatment/bile-duct-surgery/" title="Bile duct surgery in Dhaka">bile duct injuries</Link>, intra-operative discoveries, and re-do surgery are a core part of the{" "}
                  <strong><Link to="/treatment/" title="Treatment services">hepatobiliary practice</Link></strong>. Therefore, referrals from physicians and general surgeons are a regular feature of the weekly caseload. Moreover, multidisciplinary input from radiology and oncology is built into difficult presentations.
                </p>
              ),
              aText:
                "Yes — complex gallbladder and bile duct cases including injuries and re-do surgery are a core part of the hepatobiliary practice.",
              slug: "complex-gallbladder-bile-duct-cases",
            },
            {
              q: "How do I book a gallbladder consultation with Dr. Arefin?",
              a: (
                <p>
                  Call <strong><a href="tel:+8801311487592" title="Call Dr. Arefin's chamber">+880 1311 487 592</a></strong> or use the{" "}
                  <strong><Link to="/contact/" title="Contact Dr. Arefin">contact page</Link></strong>{" "}
                  to request a chamber appointment at Popular Medical College Hospital, Dhanmondi. Therefore, scheduling is straightforward whether you are in Dhaka or travelling internationally. Moreover, prior imaging and reports can be sent in advance so the consultation moves directly to decisions.
                </p>
              ),
              aText:
                "Call +880 1311 487 592 or use the contact page to request a chamber appointment at Popular Medical College Hospital, Dhanmondi.",
              slug: "how-to-book-gallbladder-consultation",
            },
          ]}
        />
      </div>


      <DrArefinFooter />

      <style>{`
        /* ───── Hero with OT background — header overlays ───── */
        .about-hero {
          min-height: 480px;
        }
        .about-hero-img {
          filter: brightness(0.55) saturate(0.92);
        }
        .about-hero-overlay {
          background: linear-gradient(
            to bottom,
            hsl(0 0% 0% / 0.65) 0%,
            hsl(0 0% 0% / 0.72) 50%,
            hsl(0 0% 0% / 0.82) 100%
          );
        }
        .about-hero-h1 {
          color: #ffffff;
          text-shadow: 0 2px 20px hsl(0 0% 0% / 0.6);
          transition: text-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      color 280ms cubic-bezier(0.22, 1, 0.36, 1);
          cursor: default;
        }
        .about-hero-h1:hover {
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
          color: hsl(var(--primary));
        }
        .about-hero-h1-link,
        .about-hero-h1-link:hover,
        .about-hero-h1-link:focus-visible {
          color: inherit; text-decoration: none;
        }
        .about-hero-h1-link:focus-visible {
          outline: 2px solid hsl(var(--primary-bright));
          outline-offset: 4px; border-radius: 4px;
        }
        .about-hero-sub {
          color: hsl(0 0% 100% / 0.85);
        }
        .about-hero-sub strong {
          color: inherit;
          font-weight: inherit;
        }

        /* ───── Section headings — hover shadow ───── */
        .about-section-heading {
          transition: text-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      color 280ms cubic-bezier(0.22, 1, 0.36, 1);
          cursor: default;
        }
        .about-section-heading:not(.is-water-fill):hover {
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
          color: hsl(var(--primary-light));
        }
        .about-section-heading strong {
          color: inherit;
          font-weight: inherit;
        }

        /* ───── Water-fill hover (pilot on About H2) ─────
           Two layered spans: bottom = resting color, top = green clipped
           by a width that grows 0%→100% on hover, creating a clean L→R
           green sweep. Reverts symmetrically on mouseleave. No position
           shift, no scale — honors no-hover-uplift rule. */
        .about-section-heading.is-water-fill {
          cursor: pointer;
        }
        .about-section-heading .water-fill-text {
          position: relative;
          display: inline-block;
          color: inherit;
        }
        .about-section-heading-link {
          color: inherit;
          text-decoration: none;
        }
        .about-section-heading .water-fill-text::before {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          color: hsl(var(--primary-darker));
          white-space: nowrap;
          overflow: hidden;
          width: 0;
          transition: width 700ms cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
        }
        .about-section-heading.is-water-fill:hover .water-fill-text::before {
          width: 100%;
        }

        /* ───── About body text ───── */
        .about-body-text {
          color: hsl(var(--muted-foreground));
        }
        .about-body-text strong {
          color: inherit;
          font-weight: inherit;
          transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1),
                      text-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .about-body-text strong:hover {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* ───── About highlight list ───── */
        .about-highlight-list { list-style: none; padding: 0; margin: 0; }
        .about-highlight-item {
          color: hsl(var(--foreground));
          font-size: 0.975rem;
          line-height: 1.55;
        }
        .about-highlight-item strong {
          color: inherit;
          font-weight: 600;
        }
        .about-highlight-icon {
          color: hsl(var(--primary-light));
        }

        /* ───── Pillar cards: emerald-tinted dark ───── */
        .arefin.dark .about-pillar-card {
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
          border-left: 3px solid hsl(var(--border));
          transition: border-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin.dark .about-pillar-card:hover {
          border-left-color: hsl(var(--primary));
          box-shadow: 0 8px 28px -10px hsl(var(--primary) / 0.18),
                      0 2px 6px hsl(var(--foreground) / 0.04);
        }
        .arefin.dark .about-pillar-title {
          color: hsl(var(--foreground));
          transition: color 240ms cubic-bezier(0.22, 1, 0.36, 1),
                      text-shadow 240ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin.dark .about-pillar-card:hover .about-pillar-title {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }
        .arefin.dark .about-pillar-body {
          color: hsl(var(--muted-foreground));
        }
        .arefin.dark .about-pillar-body strong {
          color: inherit;
          font-weight: inherit;
          transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1),
                      text-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin.dark .about-pillar-body strong:hover {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* ───── Portrait figure hover ───── */
        .about-portrait-figure {
          box-shadow: 0 10px 30px -16px hsl(0 0% 0% / 0.55);
          transition: box-shadow 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .about-portrait-figure:hover {
          box-shadow: 0 20px 50px -16px hsl(0 0% 0% / 0.7),
                      8px 8px 0 0 hsl(var(--primary) / 0.18);
        }

        /* ───── Vision/Mission section base ───── */
        .about-vm-section {
          min-height: 520px;
        }

        /* CTA styles now live inside shared GlobalCTABand component. */

        /* ============================================================
           SECTION 3 — PILLARS on DARK band: light cards (Surface Elevation)
           ============================================================ */
        .arefin.dark .about-pillars-dark-eyebrow { color: hsl(131 87% 55%); }
        .arefin.dark .about-pillars-dark-heading {
          color: hsl(0 0% 95%);
          transition: text-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      color 280ms cubic-bezier(0.22, 1, 0.36, 1);
          cursor: default;
        }
        .arefin.dark .about-pillars-dark-heading strong { color: inherit; font-weight: inherit; }
        .arefin.dark .about-pillars-dark-heading:hover {
          color: hsl(131 87% 55%);
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }
        .arefin.dark .about-pillar-light-card {
          background: hsl(0 0% 97%);
          border: 1px solid hsl(140 10% 85%);
          border-left: 3px solid hsl(140 10% 85%);
          transition: border-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin.dark .about-pillar-light-card:hover {
          border-left-color: hsl(var(--primary));
          box-shadow: 4px 4px 0 0 hsl(0 0% 0% / 0.35);
        }
        .arefin.dark .about-pillar-light-icon {
          background: hsl(131 87% 41% / 0.14);
          color: hsl(var(--primary-darker));
        }
        .arefin.dark .about-pillar-light-title {
          color: hsl(150 25% 12%);
          transition: color 240ms cubic-bezier(0.22, 1, 0.36, 1),
                      text-shadow 240ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin.dark .about-pillar-light-card:hover .about-pillar-light-title {
          color: hsl(var(--primary-darker));
          text-shadow: 1px 0.7px 0 hsl(140 20% 75%);
        }
        .arefin.dark .about-pillar-light-title-link {
          color: inherit;
          text-decoration: none;
        }
        .arefin.dark .about-vm-title-link,
        .arefin.dark .about-timeline-title-link {
          color: inherit;
          text-decoration: none;
        }
        .arefin.dark .about-pillar-light-body { color: hsl(150 10% 25%); }
        .arefin.dark .about-pillar-light-body strong {
          color: inherit; font-weight: inherit;
          transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1),
                      text-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin.dark .about-pillar-light-body strong:hover {
          color: hsl(var(--primary-darker));
          text-shadow: 1px 0.7px 0 hsl(140 20% 75%);
        }

        /* ============================================================
           SECTION 4 — VISION/MISSION on DARK band: LIGHT cards
           (Surface Elevation Rule — flipped 2026-05-18)
           ============================================================ */
        .arefin.dark .about-vm-dark-band { background: hsl(var(--background)); }
        .arefin.dark .about-vm-eyebrow { color: hsl(131 87% 55%); }
        .arefin.dark .about-vm-heading {
          color: hsl(0 0% 95%);
          transition: text-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      color 280ms cubic-bezier(0.22, 1, 0.36, 1);
          cursor: default;
        }
        .arefin.dark .about-vm-heading:hover {
          color: hsl(131 87% 55%);
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }
        .arefin.dark .vm-card-dark {
          background: hsl(0 0% 97%);
          color: hsl(220 15% 12%);
          border: 1px solid hsl(140 10% 85%);
          border-left: 3px solid hsl(140 10% 85%);
          transition: border-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin.dark .vm-card-dark:hover {
          border-left-color: hsl(var(--primary));
          box-shadow: 4px 4px 0 0 hsl(0 0% 0% / 0.35);
        }
        .arefin.dark .vm-card-dark-icon {
          background: hsl(131 87% 41% / 0.14);
          color: hsl(var(--primary-darker));
        }
        .arefin.dark .vm-card-dark-title {
          color: hsl(150 25% 12%);
          transition: color 240ms cubic-bezier(0.22, 1, 0.36, 1),
                      text-shadow 240ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin.dark .vm-card-dark:hover .vm-card-dark-title {
          color: hsl(var(--primary-darker));
          text-shadow: 1px 0.7px 0 hsl(140 20% 75%);
        }
        .arefin.dark .vm-card-dark-body { color: hsl(150 10% 25%); }
        .arefin.dark .vm-card-dark-body strong {
          color: inherit; font-weight: inherit;
          transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1),
                      text-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin.dark .vm-card-dark-body strong:hover {
          color: hsl(var(--primary-darker));
          text-shadow: 1px 0.7px 0 hsl(140 20% 75%);
        }

        /* Gallbladder Q&A band uses FAQAccordion default mint background
           (2026-05-18 update): CTA + reassurance band removed per user;
           Q&A now sits directly after Vision/Mission and goes mint per
           explicit user request. Card styling falls back to FAQAccordion
           defaults which already render dark cards on mint in dark mode. */

        /* ============================================================
           CREDENTIALS & EDUCATION TIMELINE — LIGHT MINT band (flipped 2026-05-18)
           Sits between Pillars (dark) and Vision/Mission (dark) so the
           rhythm reads dark → mint → dark per user spec.
           Mint surface inherited from .arefin-mint-band utility.
           ============================================================ */
        .arefin.dark .about-timeline-band {
          border-top: 1px solid hsl(140 25% 78%);
          border-bottom: 1px solid hsl(140 25% 78%);
        }
        .arefin.dark .about-timeline-eyebrow {
          color: hsl(var(--primary-darker));
        }
        .arefin.dark .about-timeline-heading {
          color: hsl(0 0% 8%);
          transition: text-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      color 280ms cubic-bezier(0.22, 1, 0.36, 1);
          cursor: default;
        }
        .arefin.dark .about-timeline-heading strong { color: inherit; font-weight: inherit; }
        .arefin.dark .about-timeline-heading:hover {
          color: hsl(var(--primary-darker));
          text-shadow: 1px 0.7px 0 hsl(140 20% 75%);
        }
        .arefin.dark .about-timeline-sub {
          color: hsl(0 0% 28%);
        }
        .arefin.dark .about-timeline-sub strong { color: inherit; font-weight: inherit; }

        .arefin.dark .about-timeline-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .arefin.dark .about-timeline-item {
          position: relative;
          display: grid;
          grid-template-columns: 56px 1fr;
          gap: 1.25rem;
          padding: 0 0 2rem 0;
        }
        .arefin.dark .about-timeline-item:last-child { padding-bottom: 0; }
        .arefin.dark .about-timeline-rail {
          position: absolute;
          left: 27px;
          top: 56px;
          bottom: -4px;
          width: 2px;
          background: linear-gradient(
            to bottom,
            hsl(var(--primary-darker) / 0.7),
            hsl(var(--primary-darker) / 0.15)
          );
        }
        .arefin.dark .about-timeline-item:last-child .about-timeline-rail { display: none; }
        .arefin.dark .about-timeline-marker {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 9999px;
          background: hsl(0 0% 100%);
          border: 1px solid hsl(var(--primary-darker) / 0.45);
          color: hsl(var(--primary-darker));
          transition: background 240ms cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 240ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin.dark .about-timeline-item:hover .about-timeline-marker {
          background: hsl(131 87% 41% / 0.12);
          border-color: hsl(var(--primary-darker));
        }
        .arefin.dark .about-timeline-content {
          padding-top: 4px;
        }
        .arefin.dark .about-timeline-year {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: hsl(var(--primary-darker));
          background: hsl(0 0% 100%);
          border: 1px solid hsl(var(--primary-darker) / 0.35);
          padding: 0.2rem 0.55rem;
          border-radius: 6px;
          margin-bottom: 0.6rem;
        }
        .arefin.dark .about-timeline-title {
          color: hsl(150 25% 12%);
          margin: 0 0 0.5rem 0;
          transition: color 240ms cubic-bezier(0.22, 1, 0.36, 1),
                      text-shadow 240ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin.dark .about-timeline-item:hover .about-timeline-title {
          color: hsl(var(--primary-darker));
          text-shadow: 1px 0.7px 0 hsl(140 20% 75%);
        }
        .arefin.dark .about-timeline-body { color: hsl(150 10% 25%); margin: 0; }
        .arefin.dark .about-timeline-body strong {
          color: inherit;
          font-weight: inherit;
          transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1),
                      text-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin.dark .about-timeline-body strong:hover {
          color: hsl(var(--primary-darker));
          text-shadow: 1px 0.7px 0 hsl(140 20% 75%);
        }

        /* ============================================================
           REASSURE MINT BAND — between dark CTA and dark Q&A
           ============================================================ */
        .arefin.dark .about-reassure-eyebrow { color: hsl(var(--primary-darker)); }
        .arefin.dark .about-reassure-heading {
          color: hsl(0 0% 8%);
          transition: text-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      color 280ms cubic-bezier(0.22, 1, 0.36, 1);
          cursor: default;
        }
        .arefin.dark .about-reassure-heading strong { color: inherit; font-weight: inherit; }
        .arefin.dark .about-reassure-heading:hover {
          color: hsl(var(--primary-darker));
          text-shadow: 1px 0.7px 0 hsl(140 20% 75%);
        }
        .arefin.dark .about-reassure-sub { color: hsl(0 0% 28%); }
        .arefin.dark .about-reassure-sub strong { color: inherit; font-weight: inherit; }
        .arefin.dark .about-reassure-sub a {
          color: hsl(var(--primary-darker));
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-thickness: 1px;
          transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1),
                      text-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin.dark .about-reassure-sub a:hover {
          color: hsl(var(--primary-bright));
          text-shadow: 1px 0.7px 0 hsl(140 20% 75%);
        }
      `}</style>
    </div>
  );
};

export default AboutDark;
