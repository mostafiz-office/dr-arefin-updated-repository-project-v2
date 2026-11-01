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
import heroBg from "@/assets/gallery/gallbladder-surgery-operating-room-panoramic-dhaka.webp";
import imgPortrait from "@/assets/gallery/dr-murshidul-arefin-best-gallbladder-surgeon-dhaka.webp";
import imgGallstone from "@/assets/gallery/gallbladder-stone-laparoscopic-removal-surgery-dhaka.webp";
import imgEmpyema from "@/assets/gallery/empyema-gallbladder-laparoscopic-surgery-specialist-dhaka.webp";
import imgCancer from "@/assets/gallery/dr-murshidul-arefin-open-surgery-closeup-popular-medical-dhaka.webp";
import imgCholecystitis from "@/assets/gallery/dr-murshidul-arefin-performing-gallbladder-surgery-dhaka.webp";
import imgPolyps from "@/assets/gallery/dr-murshidul-arefin-surgical-team-gallbladder-operation-popular-medical.webp";
/**
 * Gallbladder Surgery — Sub-treatment page (dark variant)
 * URL: /treatment/gallbladder-surgery/
 * Keyword targets: best gallbladder surgeon dhaka, gallbladder surgery dhaka,
 *   laparoscopic cholecystectomy dhaka, gallbladder stone removal surgery dhaka,
 *   gallbladder operation specialist dhaka, empyema gallbladder treatment dhaka,
 *   gallbladder stone operation cost bangladesh
 */

interface GallbladderCondition {
  title: string;
  description: string;
  img: string;
  imgAlt: string;
  imgPosition?: string;
  /* T10 (2026-05-17): satellite link target for the card title. */
  titleHref?: string;
  titleAlt?: string;
}

const conditions: GallbladderCondition[] = [
  {
    title: "Gallbladder Stone Surgery",
    titleHref: "/treatment/gallstone-removal-dhaka/",
    titleAlt: "Gallstone removal surgery in Dhaka by Dr. Arefin",
    description:
      "From <a href='/treatment/gallstone-removal-dhaka/' title='Gallstone removal surgery in Dhaka by Dr. Arefin'><strong>painful gallstones</strong></a> to <a href='/treatment/gallstone-removal-dhaka/' title='Complicated cholelithiasis treatment in Dhaka'><strong>complicated cholelithiasis</strong></a>, <a href='/about/' class='gb-inline-link'>Dr. Arefin</a> offers <a href='/treatment/laparoscopic-cholecystectomy-dhaka/' title='Laparoscopic cholecystectomy in Dhaka by Dr. Arefin'><strong>laparoscopic cholecystectomy</strong></a> — removing stones and restoring comfort through <a href='/minimally-invasive-surgery/' title='Minimally invasive small-incision surgery in Dhaka'><strong>small-incision, minimally invasive procedures</strong></a> with faster healing. Moreover, each patient receives a thorough pre-operative workup to ensure the safest possible outcome.",
    img: imgGallstone,
    imgAlt:
      "Gallbladder stone laparoscopic removal surgery in Dhaka by best surgeon — পিত্তথলির পাথর ল্যাপারোস্কপিক অপারেশন ঢাকা",
  },
  {
    title: "Empyema Gallbladder Treatment",
    titleHref: "/treatment/empyema-gallbladder-dhaka/",
    titleAlt: "Empyema gallbladder surgery and drainage in Dhaka by Dr. Arefin",
    description:
      "<a href='/treatment/empyema-gallbladder-dhaka/' title='Empyema gallbladder surgery and drainage in Dhaka by Dr. Arefin'><strong>Empyema of the gallbladder</strong></a> — a serious complication involving pus accumulation — demands <a href='/treatment/empyema-gallbladder-dhaka/' title='Urgent gallbladder surgical intervention in Dhaka'><strong>urgent surgical intervention</strong></a>. Dr. Arefin's team performs <a href='/treatment/laparoscopic-cholecystectomy-dhaka/' title='Laparoscopic or open drainage and cholecystectomy in Dhaka'><strong>expert laparoscopic or open drainage and cholecystectomy</strong></a> to resolve infection, prevent sepsis, and restore biliary function. Additionally, antibiotic protocols are coordinated to optimize recovery and minimize hospital stay.",
    img: imgEmpyema,
    imgAlt:
      "Empyema gallbladder laparoscopic surgery by specialist in Dhaka — এমপায়েমা গল ব্লাডার সার্জারি ঢাকা",
  },
  {
    title: "Gallbladder & Bile Duct Cancer",
    titleHref: "/treatment/gallbladder-cancer-resection-dhaka/",
    titleAlt: "Gallbladder cancer resection surgery in Dhaka by Dr. Arefin",
    description:
      "Specializing in <a href='/treatment/' title='Oncologic hepatobiliary surgery in Dhaka'><strong>oncologic hepatobiliary surgery</strong></a>, Dr. Arefin performs <a href='/treatment/gallbladder-cancer-resection-dhaka/' title='Gallbladder cancer resection surgery in Dhaka by Dr. Arefin'><strong>advanced resections for gallbladder and bile duct cancers</strong></a>, combining surgical precision with evidence-based cancer management to extend survival and improve quality of life. For related biliary conditions, see <a href='/treatment/biliary-tract-surgery/' class='gb-inline-link'>biliary tract surgery</a>. Multidisciplinary oncology coordination ensures comprehensive post-operative follow-up.",
    img: imgCancer,
    imgAlt:
      "Gallbladder cancer surgery by Dr. Murshidul Arefin — open surgery closeup at Popular Medical College Hospital Dhaka — গল ব্লাডার ক্যান্সার সার্জারি",
  },
  {
    title: "Cholecystitis Treatment",
    titleHref: "/treatment/cholecystitis-surgery-dhaka/",
    titleAlt: "Cholecystitis surgery and treatment in Dhaka by Dr. Arefin",
    description:
      "<a href='/treatment/cholecystitis-surgery-dhaka/' title='Cholecystitis surgery and treatment in Dhaka by Dr. Arefin'><strong>Acute and chronic gallbladder inflammation</strong></a> is managed through <a href='/diagnosis-surgery-recovery/' title='Timely diagnosis and minimally invasive surgery in Dhaka'><strong>timely diagnosis and minimally invasive surgery</strong></a> to relieve pain, prevent infection, and avoid recurrence. Furthermore, Dr. Arefin's approach includes <a href='/treatment/cholecystitis-surgery-dhaka/' title='Early intervention strategies for gallbladder inflammation'><strong>early intervention strategies</strong></a> that reduce complication rates, shorten hospital stay, and accelerate return to normal activity for working professionals.",
    img: imgCholecystitis,
    imgAlt:
      "Cholecystitis treatment — Dr. Arefin performing gallbladder surgery in Dhaka — কোলেসিস্টাইটিস চিকিৎসা ঢাকা",
  },
  {
    title: "Gallbladder Polyps Management",
    titleHref: "/treatment/gallbladder-polyps-dhaka/",
    titleAlt: "Gallbladder polyps surgical management in Dhaka by Dr. Arefin",
    description:
      "<a href='/treatment/gallbladder-surgery/' title='Gallbladder polyp evaluation and surgery in Dhaka'><strong>Gallbladder polyps</strong></a> require careful surveillance and, when indicated, surgical removal to prevent malignant transformation. Dr. Arefin provides <a href='/diagnosis-surgery-recovery/' title='Expert polyp evaluation with advanced imaging in Dhaka'><strong>expert evaluation using advanced imaging</strong></a> and performs <a href='/treatment/laparoscopic-cholecystectomy-dhaka/' title='Laparoscopic cholecystectomy for gallbladder polyps in Dhaka'><strong>laparoscopic cholecystectomy</strong></a> when polyps exceed safe thresholds. <a href='/contact/' class='gb-inline-link'>Book a consultation</a> for polyp assessment and ongoing ultrasound-guided monitoring tailored to your risk profile.",
    img: imgPolyps,
    imgAlt:
      "Gallbladder polyps surgical management — Dr. Arefin's surgical team at Popular Medical College Hospital — গল ব্লাডার পলিপ সার্জারি",
    imgPosition: "center 30%",
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
    title: "Best Gallbladder Surgeon in Dhaka",
    titleHref: "/credentials/fcps-ms-hepatobiliary-gallbladder-surgeon-dhaka/",
    titleAlt: "Best gallbladder surgeon in Dhaka — FCPS/MS hepatobiliary credentials",
    body: "Dr. Arefin is recognized as one of Dhaka's <a href='/best-hepatobiliary-surgeon-dhaka/' title='Top gallbladder and hepatobiliary surgeons in Dhaka'><strong>top gallbladder and hepatobiliary surgeons</strong></a>, with extensive experience in both <a href='/treatment/laparoscopic-cholecystectomy-dhaka/' title='Laparoscopic and open cholecystectomy in Dhaka'><strong>laparoscopic and open cholecystectomy</strong></a> procedures.",
  },
  {
    icon: Microscope,
    title: "Advanced Laparoscopic Precision",
    titleHref: "/treatment/laparoscopic-cholecystectomy-dhaka/",
    titleAlt: "Advanced laparoscopic cholecystectomy in Dhaka by Dr. Arefin",
    body: "Utilizing <a href='/minimally-invasive-surgery/' title='State-of-the-art Storz laparoscopic systems in Dhaka'><strong>state-of-the-art Storz laparoscopic systems</strong></a>, Dr. Arefin performs <a href='/treatment/gallstone-removal-dhaka/' title='Gallbladder stone removal surgery in Dhaka'><strong>gallbladder stone removal</strong></a> with minimal scarring, reduced pain, and faster recovery times.",
  },
  {
    icon: HeartPulse,
    title: "Patient-Centered Approach",
    titleHref: "/about/patient-centered-care/",
    titleAlt: "Patient-centered gallbladder care by Dr. Murshidul Arefin",
    body: "From initial consultation through post-operative recovery, Dr. Arefin provides <a href='/about/patient-centered-care/' title='Patient-centered care by Dr. Arefin'><strong>compassionate, personalized care</strong></a> that prioritizes patient comfort and long-term biliary health.",
  },
  {
    icon: Activity,
    title: "Minimally Invasive Expertise",
    titleHref: "/minimally-invasive-surgery/",
    titleAlt: "Minimally invasive surgery expertise in Dhaka by Dr. Arefin",
    body: "Whenever possible, <a href='/treatment/laparoscopic-cholecystectomy-dhaka/' title='Laparoscopic cholecystectomy in Dhaka by Dr. Arefin'><strong>laparoscopic cholecystectomy</strong></a> is the preferred approach — ensuring <a href='/minimally-invasive-surgery/' title='Minimally invasive small-incision surgery in Dhaka'><strong>smaller incisions</strong></a>, shorter hospital stays, and quicker return to daily life.",
  },
];

/* T26 — Gallbladder FAQ: 8 Dhanmondi/Dhaka SEO-focused entries pulled from
   the central registry so each FAQ has a resolvable /faq/<slug>/ page. */
const GALLBLADDER_FAQ_SLUGS = [
  "best-gallbladder-surgeon-in-dhanmondi-dhaka",
  "how-much-does-gallbladder-stone-surgery-cost-in-dhaka",
  "is-laparoscopic-cholecystectomy-available-in-dhanmondi",
  "how-long-does-recovery-after-gallbladder-surgery-take-in-dhaka",
  "treatment-for-empyema-of-the-gallbladder-in-dhaka",
  "does-dr-arefin-perform-gallbladder-cancer-surgery-in-dhaka",
  "do-gallbladder-polyps-need-surgery-in-dhaka",
  "how-to-book-a-gallbladder-surgery-consultation-in-dhanmondi",
];
const faqs = getFaqsBySlugs(GALLBLADDER_FAQ_SLUGS);

const jsonLdString = buildGraph(
  buildBreadcrumbList([
    { name: "Treatment", path: "/treatment/" },
    { name: "Gallbladder Surgery", path: "/treatment/gallbladder-surgery/" },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Gallbladder Surgery in Dhaka — Dr. Murshidul Arefin",
    url: "https://drarefin.com/treatment/gallbladder-surgery/",
    description:
      "Expert gallbladder stone removal, laparoscopic cholecystectomy, empyema treatment & gallbladder cancer surgery in Dhaka by Dr. Murshidul Arefin at Popular Medical College Hospital.",
    mainEntity: {
      ...physicianEntity,
      medicalSpecialty: ["Hepatobiliary Surgery", "Gallbladder Surgery", "Laparoscopic Cholecystectomy"],
    },
  },
  // FAQPage schema is emitted by <FAQAccordion> (matches homepage; avoids duplicate).
);

const GallbladderSurgeryDark = () => {
  return (
    <div className="arefin dark min-h-screen bg-background text-foreground font-arefin">
      <Helmet>
        <title>Gallbladder Surgery in Dhaka — Dr. Murshidul Arefin, Best Gallbladder Surgeon</title>
        <meta
          name="description"
          content="Expert gallbladder stone removal, laparoscopic cholecystectomy & gallbladder cancer surgery in Dhaka by Dr. Murshidul Arefin — best gallbladder surgeon at Popular Medical College Hospital. পিত্তথলির পাথর অপারেশন ঢাকা"
        />
        <link rel="canonical" href="https://drarefin.com/treatment/gallbladder-surgery/" />
        <link rel="preload" as="image" href={heroBg} />
        <link rel="alternate" hrefLang="bn" href="https://drarefin.com/treatment/gallbladder-surgery/" />
        <link rel="alternate" hrefLang="en" href="https://drarefin.com/treatment/gallbladder-surgery/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Gallbladder Surgery in Dhaka — Dr. Murshidul Arefin" />
        <meta
          property="og:description"
          content="Expert gallbladder stone removal, laparoscopic cholecystectomy & gallbladder cancer surgery in Dhaka by Dr. Murshidul Arefin — best gallbladder surgeon at Popular Medical College Hospital."
        />
        <meta property="og:url" content="https://drarefin.com/treatment/gallbladder-surgery/" />
        <meta property="og:site_name" content="Dr. Murshidul Arefin" />
        <meta property="og:locale" content="en_BD" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gallbladder Surgery in Dhaka — Dr. Murshidul Arefin" />
        <meta
          name="twitter:description"
          content="Expert gallbladder stone removal, laparoscopic cholecystectomy & gallbladder cancer surgery in Dhaka by Dr. Murshidul Arefin — best gallbladder surgeon at Popular Medical College Hospital."
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
        imageAlt="Best gallbladder surgery operating room in Dhaka"
        breadcrumb="Gallbladder Surgery"
        kicker="Gallbladder Surgery"
        h1="Gallbladder Surgery in Dhaka"
        h1Href="/treatment/gallbladder-surgery/"
        h1Title="Gallbladder stone removal, laparoscopic cholecystectomy and cancer surgery in Dhaka by Dr. Murshidul Arefin"
        introHtml={`<a href="/treatment/gallbladder-surgery/" title="Gallbladder surgery services in Dhaka by Dr. Arefin"><strong>Expert gallstone removal, laparoscopic cholecystectomy, empyema treatment, and gallbladder cancer surgery</strong></a> — led by <a href="/about/" title="About Dr. Murshidul Arefin"><strong>Dr. Murshidul Arefin</strong></a>, the best gallbladder surgeon in Dhaka at <a href="/contact/" title="Popular Medical College Hospital">Popular Medical College Hospital</a>.`}
      />

      {/* ══════════════ WHY CHOOSE ══════════════ */}
      <section
        className="py-10 sm:py-14 md:py-20 lg:py-28 arefin-mint-band arefin-section-divider"
        aria-label="Why choose Dr. Arefin for gallbladder surgery"
      >
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-stretch">
            <Reveal className="h-full">
              <div className="gb-portrait-wrap rounded-2xl overflow-hidden h-full min-h-[320px] sm:min-h-[420px]">
                <img
                  src={imgPortrait}
                  alt="Dr. Murshidul Arefin — Best Gallbladder Surgeon in Dhaka — ঢাকার সেরা গল ব্লাডার সার্জন"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>

            <div>
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-light mb-4">
                  Best Gallbladder Surgeon Dhaka
                </p>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="gb-section-heading text-fluid-h2 font-semibold text-foreground mb-6 leading-tight">
                  Why Choose Dr. Arefin for Gallbladder Surgery?
                </h2>
              </Reveal>
              <Reveal delay={150}>
                <p className="gb-body-text text-fluid-lede mb-8">
                  As a <Link to="/best-hepatobiliary-surgeon-dhaka/" className="gb-inline-link"><strong>fellowship-trained hepatobiliary surgeon</strong></Link>{" "}
                  at{" "}
                  <Link to="/contact/" className="gb-inline-link">
                    Popular Medical College Hospital, Dhanmondi
                  </Link>
                  , Dr. Arefin delivers <Link to="/treatment/gallbladder-surgery/" className="gb-inline-link"><strong>expert gallbladder surgery in Dhaka</strong></Link>{" "}
                  — from routine <Link to="/treatment/laparoscopic-cholecystectomy-dhaka/" className="gb-inline-link"><strong>laparoscopic cholecystectomy</strong></Link> to complex{" "}
                  <Link to="/treatment/gallbladder-cancer-resection-dhaka/" className="gb-inline-link"><strong>gallbladder cancer resection</strong></Link>.
                  Consequently, patients across Bangladesh trust his expertise
                  for critical gallbladder conditions.
                </p>
              </Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {whyChoose.map((item, i) => (
                  <Reveal key={item.title} delay={200 + i * 80} className="h-full">
                    <div className="gb-why-card arefin-card-hover rounded-xl p-5 h-full">
                      <item.icon className="h-6 w-6 text-primary-light mb-3" />
                      <h3 className="gb-why-title text-base font-semibold mb-2">
                        {item.titleHref ? (
                          <Link to={item.titleHref} title={item.titleAlt ?? item.title} className="gb-card-title-link">
                            {item.title}
                          </Link>
                        ) : (
                          item.title
                        )}
                      </h3>
                      <p
                        className="gb-why-body text-sm leading-relaxed"
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

      {/* ══════════════ CONDITIONS WE TREAT ══════════════ */}
      <section
        className="py-10 sm:py-14 md:py-20 lg:py-28 bg-background arefin-section-divider"
        aria-label="Gallbladder conditions treated by Dr. Arefin"
      >
        <div className="container">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-light mb-4">
                Gallbladder Surgery Services
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="gb-section-heading text-fluid-h2 font-semibold text-foreground mb-6 leading-tight">
                Gallbladder Conditions We Treat
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="gb-body-text text-fluid-lede">
                <Link to="/treatment/gallbladder-surgery/" className="gb-inline-link">
                  <strong>
                    Expert surgical care for gallstones, empyema, cholecystitis,
                    gallbladder polyps, and gallbladder cancer
                  </strong>
                </Link>{" "}
                — tailored to each patient's condition by{" "}
                <Link to="/about/" className="gb-inline-link">
                  Dr. Murshidul Arefin
                </Link>
                , the{" "}
                <Link to="/best-hepatobiliary-surgeon-dhaka/" className="gb-inline-link"><strong>best gallbladder operation specialist in Dhaka</strong></Link>.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {conditions.map((c, i) => (
              <Reveal key={c.title} delay={i % 3 === 0 ? 0 : i % 3 === 1 ? 80 : 160} className="h-full">
                <article className="gb-card arefin-card-hover rounded-2xl overflow-hidden h-full flex flex-col">
                  <div className="gb-card-img-wrap aspect-[16/10] overflow-hidden">
                    <img
                      src={c.img}
                      alt={c.imgAlt}
                      loading="lazy"
                      decoding="async"
                      className="gb-card-img w-full h-full object-cover"
                      style={
                        c.imgPosition
                          ? { objectPosition: c.imgPosition }
                          : undefined
                      }
                    />
                  </div>
                  <div className="p-5 sm:p-6 md:p-7 flex-1 flex flex-col">
                    <h3 className="gb-card-title text-fluid-h4 font-semibold mb-3">
                      {c.titleHref ? (
                        <Link to={c.titleHref} title={c.titleAlt ?? c.title} className="gb-card-title-link">
                          {c.title}
                        </Link>
                      ) : (
                        c.title
                      )}
                    </h3>
                    <p
                      className="gb-card-desc text-base leading-relaxed flex-1"
                      dangerouslySetInnerHTML={{ __html: c.description }}
                    />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ Treatment Process ══════════════ */}
      <TreatmentProcessSticky variant="gallbladder" />

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
              <h2 className="gb-section-heading text-fluid-h2 font-semibold text-foreground mb-6 leading-tight">
                Related Treatment Services
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="gb-body-text text-fluid-lede">
                <Link to="/about/" className="gb-inline-link"><strong>Dr. Arefin</strong></Link> also specializes in{" "}
                <Link to="/treatment/" className="gb-inline-link"><strong>liver, biliary tract, and pancreatic surgery</strong></Link>{" "}
                — conditions often closely linked to gallbladder health.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Liver Surgery",
                desc: "Liver tumor resection, cyst management, fatty liver intervention, and transplant surgery in Dhaka.",
                href: "/treatment/liver-surgery/",
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
                  className="gb-related-card arefin-card-hover rounded-xl p-5 sm:p-6 h-full flex flex-col no-underline group"
                >
                  <h3 className="gb-related-title text-lg font-semibold mb-3">
                    {rt.title}
                  </h3>
                  <p className="gb-related-desc text-sm leading-relaxed mb-4 flex-1">
                    {rt.desc}
                  </p>
                  <span className="gb-related-link inline-flex items-center gap-1.5 text-sm font-medium text-primary-light">
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
        treatmentSlug="gallbladder-surgery"
        headingLead="Ready for "
        headingAccent="Expert Gallbladder Consultation?"
        body={
          <>
            <Link to="/contact/" className="gb-inline-link"><strong>Connect with Dr. Arefin</strong></Link> for a{" "}
            <Link to="/treatment/gallbladder-surgery/" className="gb-inline-link"><strong>comprehensive gallbladder evaluation</strong></Link>,{" "}
            <Link to="/contact/" className="gb-inline-link"><strong>expert surgical advice</strong></Link>, and a{" "}
            <Link to="/diagnosis-surgery-recovery/" className="gb-inline-link"><strong>clear path to recovery</strong></Link>.
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
        .gb-hero { min-height: 480px; }
        .gb-hero-img {
          filter: brightness(0.55) saturate(0.92);
        }
        .gb-hero-overlay {
          background: linear-gradient(
            to bottom,
            hsl(0 0% 0% / 0.65) 0%,
            hsl(0 0% 0% / 0.72) 50%,
            hsl(0 0% 0% / 0.82) 100%
          );
        }
        .gb-hero-h1 {
          color: #ffffff;
          text-shadow: 0 2px 20px hsl(0 0% 0% / 0.6);
          transition: text-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      color 280ms cubic-bezier(0.22, 1, 0.36, 1);
          cursor: default;
        }
        .gb-hero-h1:hover {
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
          color: hsl(var(--primary));
        }
        .gb-hero-sub {
          color: hsl(0 0% 100% / 0.92);
        }
        .gb-hero-sub strong {
          color: inherit;
          font-weight: inherit;
        }

        /* ───── Inline links ───── */
        .gb-inline-link {
          color: hsl(var(--primary-light));
          text-decoration: none;
          transition: color 220ms ease, text-shadow 220ms ease;
        }
        .gb-inline-link:hover {
          color: hsl(var(--primary));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* ───── Section headings ───── */
        .gb-section-heading {
          transition: text-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      color 280ms cubic-bezier(0.22, 1, 0.36, 1);
          cursor: default;
        }
        .gb-section-heading:hover {
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
          color: hsl(var(--primary-light));
        }

        /* ───── Body text ───── */
        .gb-body-text {
          color: hsl(var(--muted-foreground));
        }
        .gb-body-text strong {
          color: inherit;
          font-weight: inherit;
          transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1),
                      text-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .gb-body-text strong:hover {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }
        .gb-body-text a {
          color: hsl(var(--primary-light));
          text-decoration: none;
          transition: color 220ms ease, text-shadow 220ms ease;
        }
        .gb-body-text a:hover {
          color: hsl(var(--primary));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* ───── Portrait ───── */
        .gb-portrait-wrap {
          border: 1px solid hsl(var(--border));
        }

        /* ───── Why-choose cards ───── */
        .arefin.dark .gb-why-card {
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
          border-left: 3px solid hsl(var(--border));
          box-shadow: 0 1px 2px hsl(var(--foreground) / 0.03);
          transition: border-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin.dark .gb-why-card:hover {
          border-color: hsl(var(--border));
          border-left-color: hsl(var(--primary));
          box-shadow: 0 10px 28px -8px hsl(0 0% 0% / 0.5),
                      0 4px 8px -4px hsl(var(--primary) / 0.2);
        }
        .gb-why-title {
          color: hsl(var(--foreground));
          transition: color 280ms ease, text-shadow 280ms ease;
        }
        .arefin.dark .gb-why-card:hover .gb-why-title {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }
        .gb-why-body {
          color: hsl(var(--muted-foreground));
        }
        .gb-why-body strong {
          color: inherit;
          font-weight: inherit;
          transition: color 220ms ease, text-shadow 220ms ease;
        }
        .gb-why-body strong:hover {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* ───── Condition cards ───── */
        .arefin.dark .gb-card {
          background: hsl(0 0% 97%);
          border: 1px solid hsl(220 10% 85%);
          border-left: 3px solid hsl(220 10% 85%);
          box-shadow: 0 1px 2px hsl(0 0% 0% / 0.06);
          transition: border-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      background-color 280ms ease;
        }
        .arefin.dark .gb-card:hover,
        .arefin.dark .gb-card:focus-within {
          border-color: hsl(220 10% 85%);
          border-left-color: hsl(var(--primary));
          box-shadow: 0 10px 28px -8px hsl(0 0% 0% / 0.5),
                      0 4px 8px -4px hsl(var(--primary) / 0.2);
        }
        .gb-card-img {
          transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .gb-card:hover .gb-card-img {
          transform: scale(1.04);
        }
        .gb-card-title {
          color: hsl(var(--foreground));
          transition: color 280ms ease, text-shadow 280ms ease;
        }
        .arefin.dark .gb-card .gb-card-title {
          color: hsl(0 0% 8%);
        }
        .arefin.dark .gb-card:hover .gb-card-title,
        .arefin.dark .gb-card:focus-within .gb-card-title {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }
        .gb-card-desc {
          color: hsl(var(--muted-foreground));
          text-align: justify;
          text-justify: inter-word;
          hyphens: auto;
          -webkit-hyphens: auto;
        }
        .arefin.dark .gb-card .gb-card-desc {
          color: hsl(0 0% 35%);
        }
        .gb-card-desc strong {
          color: inherit;
          font-weight: inherit;
          cursor: default;
          transition: color 220ms ease, text-shadow 220ms ease;
        }
        .gb-card-desc strong:hover {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* ───── Approach section ───── */
        .gb-approach-img-wrap {
          border: 1px solid hsl(var(--border));
        }
        .gb-step-number {
          color: hsl(var(--primary) / 0.20);
        }
        .gb-approach-title {
          transition: color 280ms ease, text-shadow 280ms ease;
          cursor: default;
        }
        .gb-approach-title:hover {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* ───── FAQ ───── */
        .gb-faq-item {
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
          transition: border-color 280ms ease, box-shadow 280ms ease;
        }
        .gb-faq-item[open],
        .gb-faq-item:hover {
          border-color: hsl(var(--primary) / 0.4);
          box-shadow: 0 4px 12px -4px hsl(var(--primary) / 0.15);
        }
        .gb-faq-q {
          transition: color 220ms ease;
        }
        .gb-faq-item:hover .gb-faq-q,
        .gb-faq-item[open] .gb-faq-q {
          color: hsl(var(--primary-light));
        }
        .gb-faq-a {
          color: hsl(var(--muted-foreground));
        }
        .gb-faq-a strong {
          color: inherit;
          font-weight: inherit;
          transition: color 220ms ease, text-shadow 220ms ease;
        }
        .gb-faq-a strong:hover {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }
        .gb-faq-a a {
          color: hsl(var(--primary-light));
          text-decoration: none;
          transition: color 220ms ease;
        }
        .gb-faq-a a:hover {
          color: hsl(var(--primary));
        }

        /* ───── CTA body ───── */
        .gb-cta-body strong {
          color: inherit;
          font-weight: inherit;
          cursor: default;
          transition: color 220ms ease, text-shadow 220ms ease;
        }
        .gb-cta-body strong:hover {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* ───── Related treatment cards ───── */
        .arefin.dark .gb-related-card {
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
          border-left: 3px solid hsl(var(--border));
          box-shadow: 0 1px 2px hsl(var(--foreground) / 0.03);
          transition: border-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin.dark .gb-related-card:hover {
          border-color: hsl(var(--border));
          border-left-color: hsl(var(--primary));
          box-shadow: 0 10px 28px -8px hsl(0 0% 0% / 0.5),
                      0 4px 8px -4px hsl(var(--primary) / 0.2);
        }
        .gb-related-title {
          color: hsl(var(--foreground));
          transition: color 280ms ease, text-shadow 280ms ease;
        }
        .arefin.dark .gb-related-card:hover .gb-related-title {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }
        .gb-related-desc {
          color: hsl(var(--muted-foreground));
        }
        .gb-related-link {
          transition: color 220ms ease;
        }
        .gb-related-card:hover .gb-related-link {
          color: hsl(var(--primary));
        }

        /* ───── SURFACE ELEVATION OVERRIDE — Related cards on dark bg → light/white ───── */
        .arefin.dark .gb-related-card {
          background: hsl(0 0% 97%);
          border: 1px solid hsl(0 0% 88%);
          border-left: 3px solid hsl(0 0% 88%);
          box-shadow: 0 1px 3px hsl(0 0% 0% / 0.18);
        }
        .arefin.dark .gb-related-card:hover,
        .arefin.dark .gb-related-card:focus-within {
          border-color: hsl(0 0% 88%);
          border-left-color: hsl(131 87% 41%);
          box-shadow: 8px 8px 0 0 hsl(131 87% 41% / 0.22);
        }
        .arefin.dark .gb-related-card .gb-related-title {
          color: hsl(0 0% 8%);
        }
        .arefin.dark .gb-related-card:hover .gb-related-title,
        .arefin.dark .gb-related-card:focus-within .gb-related-title {
          color: hsl(142 71% 32%);
          text-shadow: 1px 0.7px 0 hsl(80 25% 25%);
        }
        .arefin.dark .gb-related-card .gb-related-desc {
          color: hsl(0 0% 25%);
        }
        .arefin.dark .gb-related-card .gb-related-link {
          color: hsl(142 71% 32%);
        }
        .arefin.dark .gb-related-card:hover .gb-related-link {
          color: hsl(142 71% 28%);
        }
      `}</style>
    </div>
  );
};

export default GallbladderSurgeryDark;
