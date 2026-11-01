import { Link } from "react-router-dom";
import { physicianEntity, buildBreadcrumbList, buildGraph } from "@/lib/structuredData";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  ShieldCheck,
  HeartPulse,
  Microscope,
  Activity,
} from "lucide-react";
import DrArefinHeader from "@/components/arefin/DrArefinHeader";
import DrArefinFooter from "@/components/arefin/DrArefinFooter";
import darkLogo from "@/assets/dr-arefin-logo-dark.webp";
import { Reveal } from "@/hooks/useScrollReveal";
import HeroSection from "@/components/arefin/HeroSection";
import GlobalCTABand from "@/components/arefin/GlobalCTABand";
import TestimonialsSection from "@/components/arefin/TestimonialsSection";
import TreatmentProcessSticky from "@/components/arefin/TreatmentProcessSticky";
import FAQAccordion from "@/components/arefin/FAQAccordion";
import { getFaqsBySlugs } from "@/data/faqRegistry";

/* ── Real clinical images ── */
import heroBg from "@/assets/gallery/hepatobiliary-open-surgery-best-surgeon-team-dhaka.webp";
import imgPortrait from "@/assets/gallery/dr-murshidul-arefin-surgeon-ot-portrait.webp";
import imgTumor from "@/assets/gallery/liver-pancreatic-open-surgery-specialist-team-dhaka.webp";
import imgCyst from "@/assets/gallery/dr-murshidul-arefin-open-surgery-closeup-popular-medical-dhaka.webp";
import imgFatty from "@/assets/gallery/laparoscopic-gallbladder-surgery-full-ot-team-popular-medical-dhaka.webp";
import imgTransplant from "@/assets/gallery/liver-surgery-team-closeup-hepatobiliary-surgeon-dhaka.webp";
import imgFollowup from "@/assets/gallery/dr-murshidul-arefin-patient-recovery-after-gallbladder-surgery-dhaka.webp";
/**
 * Liver Surgery — Sub-treatment page (dark variant)
 * URL: /treatment/liver-surgery/
 * Keyword targets: liver surgeon dhaka, hepatobiliary surgeon dhaka,
 *   liver transplant dhaka bangladesh, best liver doctor dhaka,
 *   liver tumor surgery bangladesh, liver cyst treatment dhaka,
 *   fatty liver treatment dhaka, minimally invasive liver surgery
 */

interface LiverCondition {
  title: string;
  description: string;
  img: string;
  imgAlt: string;
  imgPosition?: string;
  /* T10 (2026-05-17): satellite link target for the card title — wraps the
     <h3> in an internal <Link> so the headline itself is a keyword anchor,
     not just words inside the body copy. */
  titleHref?: string;
  titleAlt?: string;
}

const conditions: LiverCondition[] = [
  {
    title: "Liver Tumor & Cancer Surgery",
    titleHref: "/treatment/liver-tumor-cancer-surgery-dhaka/",
    titleAlt: "Liver tumor and cancer surgery in Dhaka by Dr. Arefin",
    description:
      "Dr. Arefin delivers <strong>precise diagnosis</strong> and <a href='/treatment/liver-tumor-cancer-surgery-dhaka/' title='Liver tumor and cancer surgery in Dhaka by Dr. Arefin'><strong>advanced surgery for benign and malignant liver tumors</strong></a>. Using <strong>modern hepatic resection</strong> and <strong>minimally invasive techniques</strong>, he ensures optimal tumor removal while preserving healthy tissue. For related biliary care, see <a href='/treatment/gallbladder-surgery/' class='liver-inline-link'>gallbladder &amp; bile duct surgery</a>.",
    img: imgTumor,
    imgAlt:
      "Liver tumor surgery by best hepatobiliary surgeon team in Dhaka — লিভার টিউমার সার্জারি ঢাকা",
  },
  {
    title: "Liver Cyst Management",
    titleHref: "/treatment/liver-cyst-surgery-dhaka/",
    titleAlt: "Liver cyst surgery and excision in Dhaka by Dr. Arefin",
    description:
      "<strong>Simple or complex liver cysts</strong> are carefully assessed using advanced imaging. When intervention is required, <a href='/about/' class='liver-inline-link'>Dr. Arefin</a> performs <a href='/treatment/liver-cyst-surgery-dhaka/' title='Liver cyst surgery and excision in Dhaka by Dr. Arefin'><strong>safe cyst excision</strong></a> — including fenestration or complete removal — to prevent recurrence, relieve discomfort, and <strong>restore normal liver function</strong> with lasting results.",
    img: imgCyst,
    imgAlt:
      "Liver cyst treatment by Dr. Murshidul Arefin — open surgery closeup at Popular Medical College Hospital Dhaka — লিভার সিস্ট চিকিৎসা",
  },
  {
    title: "Fatty Liver Surgical Intervention",
    titleHref: "/treatment/fatty-liver-treatment-dhaka/",
    titleAlt: "Fatty liver treatment and surgical intervention in Dhaka",
    description:
      "For patients with <strong>severe or complicated fatty liver disease</strong>, Dr. Arefin combines <strong>metabolic evaluation with surgical precision</strong> to manage liver damage, prevent deterioration, and promote healthy regeneration. Therefore, <strong>long-term fatty liver treatment</strong> outcomes remain stable across follow-up. Furthermore, related issues such as <a href='/treatment/pancreatic-surgery/' class='liver-inline-link'>pancreatitis</a> are reviewed in the same consultation for coordinated abdominal care.",
    img: imgFatty,
    imgAlt:
      "Fatty liver surgery — full OT team during laparoscopic procedure at Popular Medical College Hospital Dhaka — ফ্যাটি লিভার চিকিৎসা ঢাকা",
  },
  {
    title: "Liver Transplant Surgery",
    titleHref: "/treatment/liver-transplant-surgery-dhaka/",
    titleAlt: "Liver transplant surgery in Dhaka by Dr. Arefin",
    description:
      "A cornerstone of <a href='/about/' class='liver-inline-link'>Dr. Arefin's</a> expertise — offering <strong>complete evaluation, donor coordination</strong>, and <a href='/treatment/liver-transplant-surgery-dhaka/' title='Liver transplant surgery in Dhaka by Dr. Arefin'><strong>advanced transplant procedures</strong></a> for <strong>end-stage liver failure</strong>. His approach prioritises patient safety, post-transplant recovery, and a <strong>comprehensive liver transplant program</strong> recognised across Dhaka and Bangladesh.",
    img: imgTransplant,
    imgAlt:
      "Liver transplant surgery team — best hepatobiliary surgeon Dhaka — লিভার ট্রান্সপ্ল্যান্ট সার্জারি ঢাকা",
  },
  {
    title: "Liver Transplant Follow-Up Care",
    titleHref: "/treatment/post-transplant-follow-up/",
    titleAlt: "Post-transplant follow-up and coordination care",
    description:
      "Dr. Arefin's transplant program provides <strong>end-to-end support</strong> — from <strong>donor assessment</strong> to <strong>post-surgery rehabilitation</strong> — ensuring a <strong>seamless experience</strong> and <strong>long-term care</strong> for transplant patients. Therefore, every patient receives personalised follow-up, scheduled imaging, and immunosuppression reviews tailored to their recovery curve. Moreover, complications are caught early. <a href='/contact/' class='liver-inline-link'>Book an appointment</a> for evaluation.",
    img: imgFollowup,
    imgAlt:
      "Patient recovery after liver surgery by Dr. Murshidul Arefin in Dhaka — লিভার সার্জারির পর রোগী সুস্থ",
    imgPosition: "center 20%",
  },
];

const whyChoose: Array<{
  icon: typeof ShieldCheck;
  title: string;
  body: string;
  titleHref?: string;
  titleAlt?: string;
}> = [
  {
    icon: ShieldCheck,
    title: "Fellowship-Trained Expertise",
    titleHref: "/best-hepatobiliary-surgeon-dhaka/",
    titleAlt: "Best hepatobiliary surgeon in Dhaka — fellowship-trained credentials",
    body: "Trained in <a href='/best-hepatobiliary-surgeon-dhaka/' title='Hepatobiliary and liver transplant surgery training'><strong>hepatobiliary and liver transplant surgery</strong></a> at <a href='/about/' title='Dr. Arefin BSMMU training and credentials'><strong>BSMMU</strong></a>, Dr. Arefin brings internationally recognized surgical techniques to every procedure.",
  },
  {
    icon: Microscope,
    title: "Advanced Diagnostic Precision",
    titleHref: "/diagnosis-surgery-recovery/",
    titleAlt: "Advanced diagnostic precision for liver disease in Dhaka",
    body: "Every liver condition is assessed with <a href='/diagnosis-surgery-recovery/' title='Advanced diagnostic imaging for liver disease in Dhaka'><strong>state-of-the-art imaging</strong></a> and lab evaluation to determine the most effective, least invasive treatment plan.",
  },
  {
    icon: HeartPulse,
    title: "Patient-Centered Approach",
    titleHref: "/about/patient-centered-care/",
    titleAlt: "Patient-centered care approach by Dr. Murshidul Arefin",
    body: "From initial consultation through post-operative recovery, Dr. Arefin provides <a href='/about/patient-centered-care/' title='Patient-centered care approach by Dr. Arefin'><strong>compassionate, personalized care</strong></a> that prioritizes patient comfort and long-term health.",
  },
  {
    icon: Activity,
    title: "Minimally Invasive Techniques",
    titleHref: "/treatment/minimally-invasive-liver-surgery-dhaka/",
    titleAlt: "Minimally invasive and laparoscopic liver surgery in Dhaka",
    body: "Whenever possible, <a href='/treatment/minimally-invasive-liver-surgery-dhaka/' title='Minimally invasive and laparoscopic liver surgery in Dhaka by Dr. Arefin'><strong>laparoscopic and minimally invasive liver surgery</strong></a> techniques are used to reduce recovery time, minimize scarring, and improve outcomes.",
  },
];

/* T25 — Liver Surgery FAQ: 8 Dhanmondi/Dhaka SEO-focused entries pulled from
   the central registry so each FAQ has a resolvable /faq/<slug>/ page. */
const LIVER_FAQ_SLUGS = [
  "how-much-does-liver-surgery-cost-in-dhaka",
  "who-is-the-best-liver-surgeon-in-dhanmondi-dhaka",
  "where-is-liver-transplant-surgery-available-in-dhaka",
  "success-rate-of-liver-surgery-at-popular-medical-college-hospital",
  "how-long-does-recovery-after-liver-resection-take-in-dhaka",
  "is-laparoscopic-liver-surgery-available-in-dhanmondi",
  "pre-operative-tests-needed-before-liver-surgery-in-dhaka",
  "does-dr-arefin-treat-liver-cancer-at-popular-medical-college-hospital",
];
const faqs = getFaqsBySlugs(LIVER_FAQ_SLUGS);

const jsonLdString = buildGraph(
  buildBreadcrumbList([
    { name: "Treatment", path: "/treatment/" },
    { name: "Liver Surgery", path: "/treatment/liver-surgery/" },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Liver Surgery in Dhaka — Dr. Murshidul Arefin",
    url: "https://drarefin.com/treatment/liver-surgery/",
    description:
      "Advanced liver tumor, cyst, fatty liver & transplant surgery in Dhaka by Dr. Murshidul Arefin — hepatobiliary surgeon at Popular Medical College Hospital.",
    mainEntity: {
      ...physicianEntity,
      medicalSpecialty: ["Hepatobiliary Surgery", "Liver Transplant Surgery"],
    },
  },
  // FAQPage schema is emitted by <FAQAccordion> (matches homepage; avoids duplicate).
);

const LiverSurgeryDark = () => {
  return (
    <div className="arefin dark min-h-screen bg-background text-foreground font-arefin">
      <Helmet>
        <title>Liver Surgery in Dhaka — Dr. Murshidul Arefin, Liver Specialist</title>
        <meta
          name="description"
          content="Advanced liver tumor, cyst, fatty liver & transplant surgery in Dhaka by Dr. Murshidul Arefin — hepatobiliary surgeon at Popular Medical College Hospital."
        />
        <link rel="canonical" href="https://drarefin.com/treatment/liver-surgery/" />
        <link rel="preload" as="image" href={heroBg} />
        <link rel="alternate" hrefLang="bn" href="https://drarefin.com/treatment/liver-surgery/" />
        <link rel="alternate" hrefLang="en" href="https://drarefin.com/treatment/liver-surgery/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Liver Surgery in Dhaka — Dr. Murshidul Arefin" />
        <meta
          property="og:description"
          content="Advanced liver tumor, cyst, fatty liver & transplant surgery in Dhaka by Dr. Murshidul Arefin — hepatobiliary surgeon at Popular Medical College Hospital."
        />
        <meta property="og:url" content="https://drarefin.com/treatment/liver-surgery/" />
        <meta property="og:site_name" content="Dr. Murshidul Arefin" />
        <meta property="og:locale" content="en_BD" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Liver Surgery in Dhaka — Dr. Murshidul Arefin" />
        <meta
          name="twitter:description"
          content="Advanced liver tumor, cyst, fatty liver & transplant surgery in Dhaka by Dr. Murshidul Arefin — hepatobiliary surgeon at Popular Medical College Hospital."
        />
      </Helmet>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />

      <DrArefinHeader logoSrc={darkLogo} transparent />

      {/* ══════════════ HERO — shared HeroSection (homepage parity) ══════════════ */}
      <HeroSection
        imageSrc={heroBg}
        imageAlt="Best liver surgery team in Dhaka — hepatobiliary open surgery at Popular Medical College Hospital"
        breadcrumb="Liver Surgery"
        kicker="Liver Surgery"
        h1="Liver Surgery in Dhaka"
        h1Href="/treatment/liver-surgery/"
        h1Title="Liver tumor, cyst, fatty liver and transplant surgery in Dhaka by Dr. Murshidul Arefin"
        introHtml={`<a href="/treatment/liver-surgery/" title="Advanced liver surgery services in Dhaka"><strong>Advanced liver tumor resection, cyst management, fatty liver intervention, and transplant surgery</strong></a> — led by <a href="/about/" title="About Dr. Murshidul Arefin"><strong>Dr. Murshidul Arefin</strong></a>, one of Dhaka's top hepatobiliary and liver transplant surgeons at <a href="/contact/" title="Popular Medical College Hospital">Popular Medical College Hospital</a>.`}
      />

      {/* ══════════════ WHY CHOOSE ══════════════ */}
      <section
        className="py-10 sm:py-14 md:py-20 lg:py-28 arefin-mint-band arefin-section-divider"
        aria-label="Why choose Dr. Arefin for liver surgery"
      >
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-stretch">
            {/* Portrait — stretches to match the full right-column height */}
            <Reveal className="h-full">
              <div className="liver-portrait-wrap rounded-2xl overflow-hidden h-full min-h-[320px] sm:min-h-[420px]">
                <img
                  src={imgPortrait}
                  alt="Dr. Murshidul Arefin — Liver Surgeon in Dhaka — লিভার সার্জন ঢাকা"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>

            {/* Content */}
            <div>
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-light mb-4">
                  Best Liver Doctor Dhaka
                </p>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="liver-section-heading text-fluid-h2 font-semibold text-foreground mb-6 leading-tight">
                  Why Choose Dr. Arefin for Liver Surgery?
                </h2>
              </Reveal>
              <Reveal delay={150}>
                <p className="liver-body-text text-fluid-lede mb-8">
                  As a <Link to="/best-hepatobiliary-surgeon-dhaka/" className="liver-inline-link"><strong>fellowship-trained hepatobiliary surgeon</strong></Link>{" "}
                  at{" "}
                  <Link to="/contact/" className="liver-inline-link">
                    Popular Medical College Hospital, Dhanmondi
                  </Link>
                  , Dr. Arefin delivers <Link to="/treatment/liver-surgery/" className="liver-inline-link"><strong>expert liver surgery in Dhaka</strong></Link>{" "}
                  — from complex tumor resections to{" "}
                  <Link to="/treatment/liver-transplant-surgery-dhaka/" className="liver-inline-link"><strong>liver transplant surgery in Bangladesh</strong></Link>.
                  Consequently, patients across the country trust his expertise
                  for critical hepatobiliary conditions.
                </p>
              </Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {whyChoose.map((item, i) => (
                  <Reveal key={item.title} delay={200 + i * 80} className="h-full">
                    <div className="liver-why-card arefin-card-hover rounded-xl p-5 h-full">
                      <item.icon className="h-6 w-6 text-primary-light mb-3" />
                      <h3 className="liver-why-title text-base font-semibold mb-2">
                        {item.titleHref ? (
                          <Link to={item.titleHref} title={item.titleAlt ?? item.title} className="liver-card-title-link">
                            {item.title}
                          </Link>
                        ) : (
                          item.title
                        )}
                      </h3>
                      <p
                        className="liver-why-body text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: item.body }}
                      />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ CONDITIONS WE TREAT (moved above process) ══════════════ */}
      <section
        className="py-10 sm:py-14 md:py-20 lg:py-28 bg-background arefin-section-divider"
        aria-label="Liver conditions treated by Dr. Arefin"
      >
        <div className="container">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-light mb-4">
                Liver Surgery Services
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="liver-section-heading text-fluid-h2 font-semibold text-foreground mb-6 leading-tight">
                Liver Conditions We Treat
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="liver-body-text text-fluid-lede">
                <Link to="/treatment/liver-surgery/" className="liver-inline-link">
                  <strong>
                    Expert surgical care for liver tumors, cysts, fatty liver
                    disease, and liver transplant
                  </strong>
                </Link>{" "}
                — tailored to each patient's condition by{" "}
                <Link to="/about/" className="liver-inline-link">
                  Dr. Murshidul Arefin
                </Link>
                , a leading{" "}
                <Link to="/best-hepatobiliary-surgeon-dhaka/" className="liver-inline-link"><strong>hepatobiliary surgeon in Dhaka</strong></Link>.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {conditions.map((c, i) => (
              <Reveal key={c.title} delay={i % 3 === 0 ? 0 : i % 3 === 1 ? 80 : 160} className="h-full">
                <article className="liver-card arefin-card-hover rounded-2xl overflow-hidden h-full flex flex-col">
                  <div className="liver-card-img-wrap aspect-[16/10] overflow-hidden">
                    <img
                      src={c.img}
                      alt={c.imgAlt}
                      loading="lazy"
                      decoding="async"
                      className="liver-card-img w-full h-full object-cover"
                      style={
                        c.imgPosition
                          ? { objectPosition: c.imgPosition }
                          : undefined
                      }
                    />
                  </div>
                  <div className="p-5 sm:p-6 md:p-7 flex-1 flex flex-col">
                    <h3 className="liver-card-title text-fluid-h4 font-semibold mb-3">
                      {c.titleHref ? (
                        <Link to={c.titleHref} title={c.titleAlt ?? c.title} className="liver-card-title-link">
                          {c.title}
                        </Link>
                      ) : (
                        c.title
                      )}
                    </h3>
                    <p
                      className="liver-card-desc text-base leading-relaxed flex-1"
                      dangerouslySetInnerHTML={{ __html: c.description }}
                    />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ TREATMENT PROCESS (now after conditions) ══════════════ */}
      <TreatmentProcessSticky />

      {/* Approach section removed — merged into TreatmentProcessSticky below */}

      {/* FAQ moved below — now sits between final CTA and footer */}

      {/* ══════════════ RELATED TREATMENTS ══════════════ */}
      <section
        className="py-10 sm:py-14 md:py-20 lg:py-28 bg-background"
        aria-label="Related hepatobiliary treatment services"
      >
        <div className="container">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-light mb-4">
                Explore More Services
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="liver-section-heading text-fluid-h2 font-semibold text-foreground mb-6 leading-tight">
                Related Treatment Services
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="liver-body-text text-fluid-lede">
                <Link to="/about/" className="liver-inline-link"><strong>Dr. Arefin</strong></Link> also specializes in{" "}
                <Link to="/treatment/" className="liver-inline-link"><strong>gallbladder, biliary tract, and pancreatic surgery</strong></Link>{" "}
                — conditions often closely linked to liver health.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Gallbladder Surgery",
                desc: "Laparoscopic cholecystectomy, gallstone removal, and gallbladder cancer surgery in Dhaka.",
                href: "/treatment/gallbladder-surgery/",
              },
              {
                title: "Pancreatic Surgery",
                desc: "Whipple procedure, pancreatic cyst treatment, and pancreatitis surgical management.",
                href: "/treatment/pancreatic-surgery/",
              },
              {
                title: "Biliary Tract Surgery",
                desc: "Bile duct obstruction repair, biliary cancer resection, and cholangitis treatment.",
                href: "/treatment/biliary-tract-surgery/",
              },
            ].map((rt, i) => (
              <Reveal key={rt.title} delay={i * 100} className="h-full">
                <Link
                  to={rt.href}
                  className="liver-related-card arefin-card-hover rounded-xl p-5 sm:p-6 h-full flex flex-col no-underline group"
                >
                  <h3 className="liver-related-title text-lg font-semibold mb-3">
                    {rt.title}
                  </h3>
                  <p className="liver-related-desc text-sm leading-relaxed mb-4 flex-1">
                    {rt.desc}
                  </p>
                  <span className="liver-related-link inline-flex items-center gap-1.5 text-sm font-medium text-primary-light">
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ TESTIMONIALS ══════════════ */}
      <TestimonialsSection />

      {/* ══════════════ FINAL CTA — shared GlobalCTABand (homepage parity) ══════════════ */}
      <GlobalCTABand
        formCta
        treatmentSlug="liver-surgery"
        headingLead="Ready for "
        headingAccent="Expert Liver Consultation?"
        body={
          <>
            <Link to="/contact/" className="liver-inline-link"><strong>Connect with Dr. Arefin</strong></Link> for a{" "}
            <Link to="/treatment/liver-surgery/" className="liver-inline-link"><strong>comprehensive liver evaluation</strong></Link>,{" "}
            <Link to="/contact/" className="liver-inline-link"><strong>expert surgical advice</strong></Link>, and a{" "}
            <Link to="/diagnosis-surgery-recovery/" className="liver-inline-link"><strong>clear path to recovery</strong></Link>.
          </>
        }
      />

      {/* ══════════════ FAQ — homepage parity (FAQAccordion + mint band) ══════════════ */}
      <div className="home-faq-band arefin-mint-band">
        <Reveal>
          <FAQAccordion
            kicker="FAQ"
            heading="Frequently Asked Questions"
            items={faqs}
          />
        </Reveal>
        <style>{`
          .arefin.dark .home-faq-band .satellite-faq { background: #E2F8E7; }
          .arefin.dark .home-faq-band .satellite-section-kicker { color: hsl(142 71% 32%); }
          .arefin.dark .home-faq-band .satellite-faq .satellite-h2 { color: hsl(0 0% 8%); }
          .arefin.dark .home-faq-band .satellite-faq-item {
            background: hsl(0 0% 12%);
            color: hsl(0 0% 96%);
            border-color: hsl(0 0% 22%);
            border-left-color: hsl(0 0% 22%);
          }
          .arefin.dark .home-faq-band .satellite-faq-item[open],
          .arefin.dark .home-faq-band .satellite-faq-item:hover,
          .arefin.dark .home-faq-band .satellite-faq-item:focus-within {
            border-left-color: hsl(131 87% 41%);
          }
          .arefin.dark .home-faq-band .satellite-faq-item summary { color: hsl(0 0% 96%); }
          .arefin.dark .home-faq-band .satellite-faq-item .faq-chev { color: hsl(131 87% 45%); }
          .arefin.dark .home-faq-band .satellite-faq-answer { color: hsl(0 0% 96% / 0.78); }
        `}</style>
      </div>

      <DrArefinFooter />

      <style>{`
        /* ───── Hero ───── */
        .liver-hero { min-height: 480px; }
        .liver-hero-bg img {
          /* Darken the underlying photo so white H1/nav read crisply */
          filter: brightness(0.55) saturate(0.92);
        }
        .liver-hero-overlay {
          background: linear-gradient(
            to bottom,
            hsl(0 0% 0% / 0.65) 0%,
            hsl(0 0% 0% / 0.72) 50%,
            hsl(0 0% 0% / 0.82) 100%
          );
        }
        .liver-hero-h1 {
          color: #ffffff;
          text-shadow: 0 2px 20px hsl(0 0% 0% / 0.6);
          transition: text-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      color 280ms cubic-bezier(0.22, 1, 0.36, 1);
          cursor: default;
        }
        .liver-hero-h1:hover {
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
          color: hsl(var(--primary));
        }
        .liver-hero-sub {
          color: hsl(0 0% 100% / 0.92);
        }
        .liver-hero-sub strong {
          color: inherit;
          font-weight: inherit;
        }

        /* ───── Inline links ───── */
        .liver-inline-link {
          color: inherit;
          text-decoration: none;
          transition: color 220ms ease, text-shadow 220ms ease;
        }
        .liver-inline-link:hover {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* ───── Section headings ───── */
        .liver-section-heading {
          transition: text-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      color 280ms cubic-bezier(0.22, 1, 0.36, 1);
          cursor: default;
        }
        .liver-section-heading:hover {
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
          color: hsl(var(--primary-light));
        }

        /* ───── Body text ───── */
        .liver-body-text {
          color: hsl(var(--muted-foreground));
        }
        .liver-body-text strong {
          color: inherit;
          font-weight: inherit;
          transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1),
                      text-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .liver-body-text strong:hover {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }
        .liver-body-text a {
          color: inherit;
          text-decoration: none;
          transition: color 220ms ease, text-shadow 220ms ease;
        }
        .liver-body-text a:hover {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* ───── Portrait ───── */
        .liver-portrait-wrap {
          border: 1px solid hsl(var(--border));
        }

        /* ───── Why-choose cards ───── */
        .arefin.dark .liver-why-card {
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
          border-left: 3px solid hsl(var(--border));
          box-shadow: 0 1px 2px hsl(var(--foreground) / 0.03);
          transition: border-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin.dark .liver-why-card:hover {
          border-color: hsl(var(--border));
          border-left-color: hsl(var(--primary));
          box-shadow: 0 10px 28px -8px hsl(0 0% 0% / 0.5),
                      0 4px 8px -4px hsl(var(--primary) / 0.2);
        }
        .liver-why-title {
          color: hsl(var(--foreground));
          transition: color 280ms ease, text-shadow 280ms ease;
        }
        .arefin.dark .liver-why-card:hover .liver-why-title {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }
        .liver-why-body {
          color: hsl(var(--muted-foreground));
        }
        .liver-why-body strong {
          color: inherit;
          font-weight: inherit;
          transition: color 220ms ease, text-shadow 220ms ease;
        }
        .liver-why-body strong:hover {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* ───── Condition cards ───── */
        .arefin.dark .liver-card {
          background: hsl(0 0% 97%);
          border: 1px solid hsl(220 10% 85%);
          border-left: 3px solid hsl(220 10% 85%);
          box-shadow: 0 1px 2px hsl(0 0% 0% / 0.06);
          transition: border-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      background-color 280ms ease;
        }
        .arefin.dark .liver-card:hover,
        .arefin.dark .liver-card:focus-within {
          border-color: hsl(220 10% 85%);
          border-left-color: hsl(var(--primary));
          box-shadow: 0 10px 28px -8px hsl(0 0% 0% / 0.5),
                      0 4px 8px -4px hsl(var(--primary) / 0.2);
        }
        .liver-card-img {
          transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .liver-card:hover .liver-card-img {
          transform: scale(1.04);
        }
        .liver-card-title {
          color: hsl(var(--foreground));
          transition: color 280ms ease, text-shadow 280ms ease;
          /* T14 (2026-05-17): reserve 2 lines worth of vertical space so
             every card title spans the same height regardless of word
             count — visual rhythm parity across the conditions grid. */
          min-height: calc(var(--fs-h4, 1.25rem) * 1.35 * 2);
          display: flex;
          align-items: flex-start;
        }
        .arefin.dark .liver-card .liver-card-title {
          color: hsl(0 0% 8%);
        }
        .arefin.dark .liver-card:hover .liver-card-title,
        .arefin.dark .liver-card:focus-within .liver-card-title {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }
        .liver-card-desc {
          color: hsl(var(--muted-foreground));
          text-align: justify;
          text-justify: inter-word;
          hyphens: auto;
          -webkit-hyphens: auto;
        }
        .arefin.dark .liver-card .liver-card-desc {
          color: hsl(0 0% 35%);
        }
        .liver-card-desc strong {
          color: inherit;
          font-weight: inherit;
          cursor: default;
          transition: color 220ms ease, text-shadow 220ms ease;
        }
        .liver-card-desc strong:hover {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* ───── Approach section ───── */
        .liver-approach-img-wrap {
          border: 1px solid hsl(var(--border));
        }
        .liver-step-number {
          color: hsl(var(--primary) / 0.20);
        }
        .liver-approach-title {
          transition: color 280ms ease, text-shadow 280ms ease;
          cursor: default;
        }
        .liver-approach-title:hover {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* ───── FAQ ───── */
        .liver-faq-item {
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
          transition: border-color 280ms ease, box-shadow 280ms ease;
        }
        .liver-faq-item[open],
        .liver-faq-item:hover {
          border-color: hsl(var(--primary) / 0.4);
          box-shadow: 0 4px 12px -4px hsl(var(--primary) / 0.15);
        }
        .liver-faq-q {
          transition: color 220ms ease;
        }
        .liver-faq-item:hover .liver-faq-q,
        .liver-faq-item[open] .liver-faq-q {
          color: hsl(var(--primary-light));
        }
        .liver-faq-a {
          color: hsl(var(--muted-foreground));
        }
        .liver-faq-a strong {
          color: inherit;
          font-weight: inherit;
          transition: color 220ms ease, text-shadow 220ms ease;
        }
        .liver-faq-a strong:hover {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }
        .liver-faq-a a {
          color: hsl(var(--primary-light));
          text-decoration: none;
          transition: color 220ms ease;
        }
        .liver-faq-a a:hover {
          color: hsl(var(--primary));
        }

        /* ───── CTA body ───── */
        .liver-cta-body strong {
          color: inherit;
          font-weight: inherit;
          cursor: default;
          transition: color 220ms ease, text-shadow 220ms ease;
        }
        .liver-cta-body strong:hover {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* ───── Related treatment cards ───── */
        .arefin.dark .liver-related-card {
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
          border-left: 3px solid hsl(var(--border));
          box-shadow: 0 1px 2px hsl(var(--foreground) / 0.03);
          transition: border-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin.dark .liver-related-card:hover {
          border-color: hsl(var(--border));
          border-left-color: hsl(var(--primary));
          box-shadow: 0 10px 28px -8px hsl(0 0% 0% / 0.5),
                      0 4px 8px -4px hsl(var(--primary) / 0.2);
        }
        .liver-related-title {
          color: hsl(var(--foreground));
          transition: color 280ms ease, text-shadow 280ms ease;
        }
        .arefin.dark .liver-related-card:hover .liver-related-title {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }
        .liver-related-desc {
          color: hsl(var(--muted-foreground));
        }
        .liver-related-link {
          transition: color 220ms ease;
        }
        .liver-related-card:hover .liver-related-link {
          color: hsl(var(--primary));
        }

        /* ───── SURFACE ELEVATION OVERRIDES ─────
           Conditions + Related cards sit on dark bg → cards must be light/white
           with dark text (Section ↔ Card Contrast Rule). */
        .arefin.dark .liver-card,
        .arefin.dark .liver-related-card {
          background: hsl(0 0% 97%);
          border: 1px solid hsl(0 0% 88%);
          border-left: 3px solid hsl(0 0% 88%);
          box-shadow: 0 1px 3px hsl(0 0% 0% / 0.18);
        }
        .arefin.dark .liver-card:hover,
        .arefin.dark .liver-card:focus-within,
        .arefin.dark .liver-related-card:hover,
        .arefin.dark .liver-related-card:focus-within {
          border-color: hsl(0 0% 88%);
          border-left-color: hsl(131 87% 41%);
          box-shadow: 8px 8px 0 0 hsl(131 87% 41% / 0.22);
        }
        .arefin.dark .liver-card .liver-card-title,
        .arefin.dark .liver-related-card .liver-related-title {
          color: hsl(0 0% 8%);
        }
        .arefin.dark .liver-card:hover .liver-card-title,
        .arefin.dark .liver-card:focus-within .liver-card-title,
        .arefin.dark .liver-related-card:hover .liver-related-title,
        .arefin.dark .liver-related-card:focus-within .liver-related-title {
          color: hsl(142 71% 32%);
          text-shadow: 1px 0.7px 0 hsl(80 25% 25%);
        }
        .arefin.dark .liver-card .liver-card-desc,
        .arefin.dark .liver-related-card .liver-related-desc {
          color: hsl(0 0% 25%);
        }
        .arefin.dark .liver-card .liver-card-desc strong:hover,
        .arefin.dark .liver-card .liver-card-desc a:hover {
          color: hsl(142 71% 32%);
          text-shadow: 1px 0.7px 0 hsl(80 25% 25%);
        }
        .arefin.dark .liver-card .liver-card-desc a {
          color: hsl(142 71% 32%);
        }
        .arefin.dark .liver-related-card .liver-related-link {
          color: hsl(142 71% 32%);
        }
        .arefin.dark .liver-related-card:hover .liver-related-link {
          color: hsl(142 71% 28%);
        }
      `}</style>
    </div>
  );
};

export default LiverSurgeryDark;
