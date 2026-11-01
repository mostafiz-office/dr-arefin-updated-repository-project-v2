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
import imgPortrait from "@/assets/gallery/dr-murshidul-arefin-hepatobiliary-surgeon.webp";
import imgWhipple from "@/assets/gallery/liver-pancreatic-open-surgery-specialist-team-dhaka.webp";
import imgPancreatitis from "@/assets/gallery/dr-murshidul-arefin-open-surgery-closeup-popular-medical-dhaka.webp";
import imgCancer from "@/assets/gallery/dr-murshidul-arefin-open-surgery-suturing-popular-medical-dhaka.webp";
import imgCyst from "@/assets/gallery/dr-murshidul-arefin-surgical-team-operation-theater-popular-medical.webp";
/**
 * Pancreatic Surgery — Sub-treatment page (dark variant)
 * URL: /treatment/pancreatic-surgery/
 * Keyword targets: best pancreatic surgeon dhaka, pancreatic surgery dhaka,
 *   whipple procedure dhaka, pancreatic cancer surgery dhaka,
 *   pancreatitis treatment dhaka, pancreatic cyst surgery bangladesh
 */

interface PancreaticCondition {
  title: string;
  description: string;
  img: string;
  imgAlt: string;
  imgPosition?: string;
  /* T10 (2026-05-17): satellite link target for the card title. */
  titleHref?: string;
  titleAlt?: string;
}

const conditions: PancreaticCondition[] = [
  {
    title: "Whipple Pancreaticoduodenectomy",
    titleHref: "/treatment/whipple-procedure-dhaka/",
    titleAlt: "Whipple procedure (pancreaticoduodenectomy) in Dhaka by Dr. Arefin",
    description:
      "The <a href='/treatment/whipple-procedure-dhaka/' class='pc-inline-link'><strong>Whipple procedure</strong></a> is the gold-standard operation for <a href='/treatment/pancreatic-cancer-surgery-dhaka/' title='Pancreatic head tumor surgery in Dhaka'><strong>pancreatic head tumors</strong></a> and <a href='/treatment/pancreatic-cancer-surgery-dhaka/' title='Periampullary cancer surgery in Dhaka'><strong>periampullary cancers</strong></a>. <a href='/about/' class='pc-inline-link'>Dr. Arefin</a> performs this complex surgery with meticulous precision — removing the head of the pancreas, duodenum, gallbladder, and part of the bile duct while preserving digestive function. Furthermore, each case is discussed in a multidisciplinary tumor board for optimal outcomes.",
    img: imgWhipple,
    imgAlt:
      "Whipple procedure pancreatic surgery by specialist team in Dhaka — হুইপল সার্জারি প্যানক্রিয়াটিক ক্যান্সার ঢাকা",
  },
  {
    title: "Pancreatic Cancer Surgery",
    titleHref: "/treatment/pancreatic-cancer-surgery-dhaka/",
    titleAlt: "Pancreatic cancer surgery in Dhaka by Dr. Arefin",
    description:
      "Specializing in <a href='/treatment/pancreatic-cancer-surgery-dhaka/' class='pc-inline-link'><strong>oncologic pancreatic surgery</strong></a>, Dr. Arefin performs <a href='/treatment/distal-pancreatectomy-dhaka/' class='pc-inline-link'><strong>distal pancreatectomy</strong></a>, <a href='/treatment/pancreatic-cancer-surgery-dhaka/' title='Total pancreatectomy in Dhaka'><strong>total pancreatectomy</strong></a>, and <a href='/treatment/whipple-procedure-dhaka/' title='Whipple procedure in Dhaka'><strong>Whipple procedures</strong></a> for pancreatic malignancies. His approach combines <a href='/treatment/pancreatic-cancer-surgery-dhaka/' title='R0 resection goals for pancreatic cancer'><strong>R0 resection goals</strong></a> with evidence-based perioperative management to improve survival and quality of life. Additionally, neoadjuvant protocols are coordinated when indicated.",
    img: imgCancer,
    imgAlt:
      "Pancreatic cancer surgery — Dr. Murshidul Arefin performing open surgery at Popular Medical College Hospital Dhaka — প্যানক্রিয়াটিক ক্যান্সার সার্জারি",
  },
  {
    title: "Acute & Chronic Pancreatitis",
    titleHref: "/treatment/pancreatitis-surgery-dhaka/",
    titleAlt: "Acute and chronic pancreatitis surgical management in Dhaka",
    description:
      "From <a href='/treatment/pancreatitis-surgery-dhaka/' class='pc-inline-link'><strong>necrotizing pancreatitis</strong></a> requiring surgical debridement to <a href='/treatment/pancreatitis-surgery-dhaka/' title='Chronic pancreatitis surgery in Dhaka'><strong>chronic pancreatitis</strong></a> with duct obstruction, Dr. Arefin provides <a href='/treatment/pancreatitis-surgery-dhaka/' title='Comprehensive surgical management of pancreatitis'><strong>comprehensive surgical management</strong></a> — including necrosectomy, drainage procedures, and Frey/Puestow operations. <a href='/contact/' class='pc-inline-link'>Book a consultation</a> for expert pancreatitis care, supported by ICU-grade perioperative monitoring and nutrition optimization throughout recovery.",
    img: imgPancreatitis,
    imgAlt:
      "Pancreatitis surgical treatment by Dr. Arefin — best pancreatic surgeon Dhaka — প্যানক্রিয়াটাইটিস চিকিৎসা ঢাকা",
  },
  {
    title: "Pancreatic Cyst & Pseudocyst",
    titleHref: "/treatment/pancreatic-cyst-surgery-dhaka/",
    titleAlt: "Pancreatic cyst and pseudocyst surgery in Dhaka by Dr. Arefin",
    description:
      "<a href='/treatment/pancreatic-cyst-surgery-dhaka/' class='pc-inline-link'><strong>Pancreatic cysts</strong></a> and <a href='/treatment/pancreatic-cyst-surgery-dhaka/' title='Pancreatic pseudocyst treatment in Dhaka'><strong>pseudocysts</strong></a> require careful evaluation to distinguish benign from premalignant lesions. Dr. Arefin offers <a href='/treatment/pancreatic-cyst-surgery-dhaka/' title='Surgical drainage of pancreatic cysts in Dhaka'><strong>expert surgical drainage</strong></a>, <a href='/treatment/pancreatic-cyst-surgery-dhaka/' title='Cystogastrostomy for pancreatic pseudocyst in Dhaka'><strong>cystogastrostomy</strong></a>, and <a href='/treatment/pancreatic-cyst-surgery-dhaka/' title='Pancreatic cyst resection in Dhaka'><strong>resection</strong></a> when indicated — using advanced imaging and endoscopic assessment to guide treatment. For related biliary conditions, see <a href='/treatment/biliary-tract-surgery/' class='pc-inline-link'>biliary tract surgery</a>.",
    img: imgCyst,
    imgAlt:
      "Pancreatic cyst pseudocyst surgery — Dr. Arefin's surgical team at Popular Medical College Hospital — প্যানক্রিয়াটিক সিস্ট সার্জারি",
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
    title: "Best Pancreatic Surgeon in Dhaka",
    body: "Dr. Arefin is recognized as one of Dhaka's <a href='/best-hepatobiliary-surgeon-dhaka/' title='Top pancreatic and hepatobiliary surgeons in Dhaka'><strong>top pancreatic and hepatobiliary surgeons</strong></a>, with extensive experience in <a href='/treatment/whipple-procedure-dhaka/' title='Whipple procedure in Dhaka'><strong>Whipple procedures</strong></a> and complex pancreatic resections.",
    titleHref: "/best-hepatobiliary-surgeon-dhaka/",
    titleAlt: "Best hepatobiliary & pancreatic surgeon in Dhaka",
  },
  {
    icon: Microscope,
    title: "Complex Surgical Expertise",
    body: "Trained in <a href='/best-hepatobiliary-surgeon-dhaka/' title='Advanced hepatopancreatobiliary surgery techniques'><strong>advanced hepatopancreatobiliary techniques</strong></a>, Dr. Arefin handles the most challenging pancreatic cases — from <a href='/treatment/pancreatic-cancer-surgery-dhaka/' title='Borderline resectable pancreatic tumor surgery'><strong>borderline resectable tumors</strong></a> to <a href='/treatment/pancreatitis-surgery-dhaka/' title='Necrotizing pancreatitis treatment in Dhaka'><strong>necrotizing pancreatitis</strong></a>.",
    titleHref: "/hepatobiliary-pancreatic-surgery-specialist/",
    titleAlt: "Hepatobiliary & pancreatic surgery specialist",
  },
  {
    icon: HeartPulse,
    title: "Patient-Centered Approach",
    body: "From initial consultation through post-operative recovery, Dr. Arefin provides <a href='/about/patient-centered-care/' title='Patient-centered care by Dr. Arefin'><strong>compassionate, personalized care</strong></a> that prioritizes patient comfort and long-term pancreatic health.",
    titleHref: "/about/patient-centered-care/",
    titleAlt: "Patient-centered care approach",
  },
  {
    icon: Activity,
    title: "Multidisciplinary Cancer Care",
    body: "Pancreatic cancer cases are managed through <a href='/about/proven-surgical-excellence/' title='Multidisciplinary tumor board for pancreatic cancer'><strong>multidisciplinary tumor boards</strong></a> — coordinating with oncologists, radiologists, and gastroenterologists for <a href='/diagnosis-surgery-recovery/' title='Optimal treatment planning for pancreatic cancer'><strong>optimal treatment planning</strong></a>.",
    titleHref: "/treatment/pancreatic-cancer-surgery-dhaka/",
    titleAlt: "Pancreatic cancer surgery in Dhaka",
  },
];

/* T27 — Pancreatic Surgery FAQ: 8 Dhanmondi/Dhaka SEO-focused entries pulled
   from the central registry so each FAQ has a resolvable /faq/<slug>/ page. */
const PANCREATIC_FAQ_SLUGS = [
  "best-pancreatic-surgeon-in-dhanmondi-dhaka",
  "how-much-does-whipple-surgery-cost-in-dhaka",
  "where-is-whipple-surgery-performed-in-dhaka",
  "how-long-does-recovery-after-whipple-surgery-take-in-dhaka",
  "does-dr-arefin-treat-pancreatic-cancer-in-dhaka",
  "treatment-for-acute-and-chronic-pancreatitis-in-dhaka",
  "do-pancreatic-cysts-need-surgery-in-dhaka",
  "how-to-book-a-pancreatic-surgery-consultation-in-dhanmondi",
];
const faqs = getFaqsBySlugs(PANCREATIC_FAQ_SLUGS);

const jsonLdString = buildGraph(
  buildBreadcrumbList([
    { name: "Treatment", path: "/treatment/" },
    { name: "Pancreatic Surgery", path: "/treatment/pancreatic-surgery/" },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Pancreatic Surgery in Dhaka — Dr. Murshidul Arefin",
    url: "https://drarefin.com/treatment/pancreatic-surgery/",
    description:
      "Expert pancreatic cancer surgery, Whipple procedure, pancreatitis treatment & pancreatic cyst management in Dhaka by Dr. Murshidul Arefin at Popular Medical College Hospital.",
    mainEntity: {
      ...physicianEntity,
      medicalSpecialty: ["Hepatobiliary Surgery", "Pancreatic Surgery", "Pancreaticoduodenectomy"],
    },
  },
  // FAQPage schema is emitted by <FAQAccordion> (matches homepage; avoids duplicate).
);

const PancreaticSurgeryDark = () => {
  return (
    <div className="arefin dark min-h-screen bg-background text-foreground font-arefin">
      <Helmet>
        <title>Pancreatic Surgery in Dhaka — Dr. Murshidul Arefin, Best Pancreatic Surgeon</title>
        <meta
          name="description"
          content="Expert pancreatic cancer surgery, Whipple procedure, pancreatitis treatment & pancreatic cyst surgery in Dhaka by Dr. Murshidul Arefin — best pancreatic surgeon at Popular Medical College Hospital. প্যানক্রিয়াটিক সার্জারি ঢাকা"
        />
        <link rel="canonical" href="https://drarefin.com/treatment/pancreatic-surgery/" />
        <link rel="preload" as="image" href={heroBg} />
        <link rel="alternate" hrefLang="bn" href="https://drarefin.com/treatment/pancreatic-surgery/" />
        <link rel="alternate" hrefLang="en" href="https://drarefin.com/treatment/pancreatic-surgery/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Pancreatic Surgery in Dhaka — Dr. Murshidul Arefin" />
        <meta
          property="og:description"
          content="Expert pancreatic cancer surgery, Whipple procedure, pancreatitis treatment & pancreatic cyst surgery in Dhaka by Dr. Murshidul Arefin — best pancreatic surgeon at Popular Medical College Hospital."
        />
        <meta property="og:url" content="https://drarefin.com/treatment/pancreatic-surgery/" />
        <meta property="og:site_name" content="Dr. Murshidul Arefin" />
        <meta property="og:locale" content="en_BD" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pancreatic Surgery in Dhaka — Dr. Murshidul Arefin" />
        <meta
          name="twitter:description"
          content="Expert pancreatic cancer surgery, Whipple procedure, pancreatitis treatment & pancreatic cyst surgery in Dhaka by Dr. Murshidul Arefin — best pancreatic surgeon at Popular Medical College Hospital."
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
        imageAlt="Best pancreatic surgery operating room in Dhaka"
        breadcrumb="Pancreatic Surgery"
        kicker="Pancreatic Surgery"
        h1="Pancreatic Surgery in Dhaka"
        h1Href="/treatment/pancreatic-surgery/"
        h1Title="Pancreatic cancer surgery, Whipple procedure and pancreatitis treatment in Dhaka by Dr. Murshidul Arefin"
        introHtml={`<a href="/treatment/pancreatic-surgery/" title="Pancreatic surgery services in Dhaka by Dr. Arefin"><strong>Expert Whipple procedure, pancreatic cancer surgery, pancreatitis treatment, and pseudocyst management</strong></a> — led by <a href="/about/" title="About Dr. Murshidul Arefin"><strong>Dr. Murshidul Arefin</strong></a>, the best pancreatic surgeon in Dhaka at <a href="/contact/" title="Popular Medical College Hospital">Popular Medical College Hospital</a>.`}
      />

      {/* ══════════════ WHY CHOOSE ══════════════ */}
      <section
        className="py-10 sm:py-14 md:py-20 lg:py-28 arefin-mint-band arefin-section-divider"
        aria-label="Why choose Dr. Arefin for pancreatic surgery"
      >
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-stretch">
            <Reveal className="h-full">
              <div className="pc-portrait-wrap rounded-2xl overflow-hidden h-full min-h-[320px] sm:min-h-[420px]">
                <img
                  src={imgPortrait}
                  alt="Dr. Murshidul Arefin — Best Pancreatic Surgeon in Dhaka — ঢাকার সেরা প্যানক্রিয়াটিক সার্জন"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>

            <div>
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-light mb-4">
                  Best Pancreatic Surgeon Dhaka
                </p>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="pc-section-heading text-fluid-h2 font-semibold text-foreground mb-6 leading-tight">
                  Why Choose Dr. Arefin for Pancreatic Surgery?
                </h2>
              </Reveal>
              <Reveal delay={150}>
                <p className="pc-body-text text-fluid-lede mb-8">
                  As a <Link to="/best-hepatobiliary-surgeon-dhaka/" className="pc-inline-link"><strong>fellowship-trained hepatobiliary surgeon</strong></Link>{" "}
                  at{" "}
                  <Link to="/contact/" className="pc-inline-link">
                    Popular Medical College Hospital, Dhanmondi
                  </Link>
                  , Dr. Arefin delivers <Link to="/treatment/pancreatic-surgery/" className="pc-inline-link"><strong>expert pancreatic surgery in Dhaka</strong></Link>{" "}
                  — from complex <Link to="/treatment/whipple-procedure-dhaka/" className="pc-inline-link"><strong>Whipple procedures</strong></Link> to{" "}
                  <Link to="/treatment/pancreatitis-surgery-dhaka/" className="pc-inline-link"><strong>pancreatitis surgical management</strong></Link>.
                  Consequently, patients across Bangladesh trust his expertise
                  for critical pancreatic conditions.
                </p>
              </Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {whyChoose.map((item, i) => (
                  <Reveal key={item.title} delay={200 + i * 80} className="h-full">
                    <div className="pc-why-card arefin-card-hover rounded-xl p-5 h-full">
                      <item.icon className="h-6 w-6 text-primary-light mb-3" />
                      <h3 className="pc-why-title text-base font-semibold mb-2">
                        {item.titleHref ? (
                          <Link to={item.titleHref} title={item.titleAlt ?? item.title} className="pc-card-title-link">
                            {item.title}
                          </Link>
                        ) : (
                          <span>{item.title}</span>
                        )}
                      </h3>
                      <p
                        className="pc-why-body text-sm leading-relaxed"
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
        aria-label="Pancreatic conditions treated by Dr. Arefin"
      >
        <div className="container">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-light mb-4">
                Pancreatic Surgery Services
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="pc-section-heading text-fluid-h2 font-semibold text-foreground mb-6 leading-tight">
                Pancreatic Conditions We Treat
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="pc-body-text text-fluid-lede">
                <Link to="/treatment/pancreatic-surgery/" className="pc-inline-link">
                  <strong>
                    Expert surgical care for pancreatic cancer, pancreatitis,
                    pancreatic cysts, and periampullary tumors
                  </strong>
                </Link>{" "}
                — tailored to each patient's condition by{" "}
                <Link to="/about/" className="pc-inline-link">
                  Dr. Murshidul Arefin
                </Link>
                , the{" "}
                <Link to="/best-hepatobiliary-surgeon-dhaka/" className="pc-inline-link"><strong>best pancreatic surgery specialist in Dhaka</strong></Link>.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {conditions.map((c, i) => (
              <Reveal key={c.title} delay={i % 3 === 0 ? 0 : i % 3 === 1 ? 80 : 160} className="h-full">
                <article className="pc-card arefin-card-hover rounded-2xl overflow-hidden h-full flex flex-col">
                  <div className="pc-card-img-wrap aspect-[16/10] overflow-hidden">
                    <img
                      src={c.img}
                      alt={c.imgAlt}
                      loading="lazy"
                      decoding="async"
                      className="pc-card-img w-full h-full object-cover"
                      style={
                        c.imgPosition
                          ? { objectPosition: c.imgPosition }
                          : undefined
                      }
                    />
                  </div>
                  <div className="p-5 sm:p-6 md:p-7 flex-1 flex flex-col">
                    <h3 className="pc-card-title text-fluid-h4 font-semibold mb-3">
                      {c.titleHref ? (
                        <Link to={c.titleHref} title={c.titleAlt ?? c.title} className="pc-card-title-link">
                          {c.title}
                        </Link>
                      ) : (
                        c.title
                      )}
                    </h3>
                    <p
                      className="pc-card-desc text-base leading-relaxed flex-1"
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
      <TreatmentProcessSticky variant="pancreatic" />

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
              <h2 className="pc-section-heading text-fluid-h2 font-semibold text-foreground mb-6 leading-tight">
                Related Treatment Services
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="pc-body-text text-fluid-lede">
                <Link to="/about/" className="pc-inline-link"><strong>Dr. Arefin</strong></Link> also specializes in{" "}
                <Link to="/treatment/" className="pc-inline-link"><strong>liver, gallbladder, and biliary tract surgery</strong></Link>{" "}
                — conditions often closely linked to pancreatic health.
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
                title: "Gallbladder Surgery",
                desc: "Laparoscopic cholecystectomy, gallstone removal, empyema treatment, and gallbladder cancer surgery.",
                href: "/treatment/gallbladder-surgery/",
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
                  className="pc-related-card arefin-card-hover rounded-xl p-5 sm:p-6 h-full flex flex-col no-underline group"
                >
                  <h3 className="pc-related-title text-lg font-semibold mb-3">
                    {rt.title}
                  </h3>
                  <p className="pc-related-desc text-sm leading-relaxed mb-4 flex-1">
                    {rt.desc}
                  </p>
                  <span className="pc-related-link inline-flex items-center gap-1.5 text-sm font-medium text-primary-light">
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
        treatmentSlug="pancreatic-surgery"
        headingLead="Ready for "
        headingAccent="Expert Pancreatic Consultation?"
        body={
          <>
            <Link to="/contact/" className="pc-inline-link"><strong>Connect with Dr. Arefin</strong></Link> for a{" "}
            <Link to="/treatment/pancreatic-surgery/" className="pc-inline-link"><strong>comprehensive pancreatic evaluation</strong></Link>,{" "}
            <Link to="/contact/" className="pc-inline-link"><strong>expert surgical advice</strong></Link>, and a{" "}
            <Link to="/diagnosis-surgery-recovery/" className="pc-inline-link"><strong>clear path to recovery</strong></Link>.
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
        .pc-hero { min-height: 480px; }
        .pc-hero-img {
          filter: brightness(0.55) saturate(0.92);
        }
        .pc-hero-overlay {
          background: linear-gradient(
            to bottom,
            hsl(0 0% 0% / 0.65) 0%,
            hsl(0 0% 0% / 0.72) 50%,
            hsl(0 0% 0% / 0.82) 100%
          );
        }
        .pc-hero-h1 {
          color: #ffffff;
          text-shadow: 0 2px 20px hsl(0 0% 0% / 0.6);
          transition: text-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      color 280ms cubic-bezier(0.22, 1, 0.36, 1);
          cursor: default;
        }
        .pc-hero-h1:hover {
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
          color: hsl(var(--primary));
        }
        .pc-hero-sub {
          color: hsl(0 0% 100% / 0.92);
        }
        .pc-hero-sub strong {
          color: inherit;
          font-weight: inherit;
        }

        /* ───── Inline links ───── */
        .pc-inline-link {
          color: hsl(var(--primary-light));
          text-decoration: none;
          transition: color 220ms ease, text-shadow 220ms ease;
        }
        .pc-inline-link:hover {
          color: hsl(var(--primary));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* ───── Section headings ───── */
        .pc-section-heading {
          transition: text-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      color 280ms cubic-bezier(0.22, 1, 0.36, 1);
          cursor: default;
        }
        .pc-section-heading:hover {
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
          color: hsl(var(--primary-light));
        }

        /* ───── Body text ───── */
        .pc-body-text {
          color: hsl(var(--muted-foreground));
        }
        .pc-body-text strong {
          color: inherit;
          font-weight: inherit;
          transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1),
                      text-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .pc-body-text strong:hover {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }
        .pc-body-text a {
          color: hsl(var(--primary-light));
          text-decoration: none;
          transition: color 220ms ease, text-shadow 220ms ease;
        }
        .pc-body-text a:hover {
          color: hsl(var(--primary));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* ───── Portrait ───── */
        .pc-portrait-wrap {
          border: 1px solid hsl(var(--border));
        }

        /* ───── Why-choose cards ───── */
        .arefin.dark .pc-why-card {
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
          border-left: 3px solid hsl(var(--border));
          box-shadow: 0 1px 2px hsl(var(--foreground) / 0.03);
          transition: border-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin.dark .pc-why-card:hover {
          border-color: hsl(var(--border));
          border-left-color: hsl(var(--primary));
          box-shadow: 0 10px 28px -8px hsl(0 0% 0% / 0.5),
                      0 4px 8px -4px hsl(var(--primary) / 0.2);
        }
        .pc-why-title {
          color: hsl(var(--foreground));
          transition: color 280ms ease, text-shadow 280ms ease;
        }
        .arefin.dark .pc-why-card:hover .pc-why-title {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }
        .pc-why-body {
          color: hsl(var(--muted-foreground));
        }
        .pc-why-body strong {
          color: inherit;
          font-weight: inherit;
          transition: color 220ms ease, text-shadow 220ms ease;
        }
        .pc-why-body strong:hover {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* ───── Condition cards ───── */
        .arefin.dark .pc-card {
          background: hsl(0 0% 97%);
          border: 1px solid hsl(220 10% 85%);
          border-left: 3px solid hsl(220 10% 85%);
          box-shadow: 0 1px 2px hsl(0 0% 0% / 0.06);
          transition: border-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      background-color 280ms ease;
        }
        .arefin.dark .pc-card:hover,
        .arefin.dark .pc-card:focus-within {
          border-color: hsl(220 10% 85%);
          border-left-color: hsl(var(--primary));
          box-shadow: 0 10px 28px -8px hsl(0 0% 0% / 0.5),
                      0 4px 8px -4px hsl(var(--primary) / 0.2);
        }
        .pc-card-img {
          transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .pc-card:hover .pc-card-img {
          transform: scale(1.04);
        }
        .pc-card-title {
          color: hsl(var(--foreground));
          transition: color 280ms ease, text-shadow 280ms ease;
        }
        .arefin.dark .pc-card .pc-card-title {
          color: hsl(0 0% 8%);
        }
        .arefin.dark .pc-card:hover .pc-card-title,
        .arefin.dark .pc-card:focus-within .pc-card-title {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }
        .pc-card-desc {
          color: hsl(var(--muted-foreground));
          text-align: justify;
          text-justify: inter-word;
          hyphens: auto;
          -webkit-hyphens: auto;
        }
        .arefin.dark .pc-card .pc-card-desc {
          color: hsl(0 0% 35%);
        }
        .pc-card-desc strong {
          color: inherit;
          font-weight: inherit;
          cursor: default;
          transition: color 220ms ease, text-shadow 220ms ease;
        }
        .pc-card-desc strong:hover {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* ───── Approach section ───── */
        .pc-approach-img-wrap {
          border: 1px solid hsl(var(--border));
        }
        .pc-step-number {
          color: hsl(var(--primary) / 0.20);
        }
        .pc-approach-title {
          transition: color 280ms ease, text-shadow 280ms ease;
          cursor: default;
        }
        .pc-approach-title:hover {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* ───── FAQ ───── */
        .pc-faq-item {
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
          transition: border-color 280ms ease, box-shadow 280ms ease;
        }
        .pc-faq-item[open],
        .pc-faq-item:hover {
          border-color: hsl(var(--primary) / 0.4);
          box-shadow: 0 4px 12px -4px hsl(var(--primary) / 0.15);
        }
        .pc-faq-q {
          transition: color 220ms ease;
        }
        .pc-faq-item:hover .pc-faq-q,
        .pc-faq-item[open] .pc-faq-q {
          color: hsl(var(--primary-light));
        }
        .pc-faq-a {
          color: hsl(var(--muted-foreground));
        }
        .pc-faq-a strong {
          color: inherit;
          font-weight: inherit;
          transition: color 220ms ease, text-shadow 220ms ease;
        }
        .pc-faq-a strong:hover {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }
        .pc-faq-a a {
          color: hsl(var(--primary-light));
          text-decoration: none;
          transition: color 220ms ease;
        }
        .pc-faq-a a:hover {
          color: hsl(var(--primary));
        }

        /* ───── CTA body ───── */
        .pc-cta-body strong {
          color: inherit;
          font-weight: inherit;
          cursor: default;
          transition: color 220ms ease, text-shadow 220ms ease;
        }
        .pc-cta-body strong:hover {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* ───── Related treatment cards ───── */
        .arefin.dark .pc-related-card {
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
          border-left: 3px solid hsl(var(--border));
          box-shadow: 0 1px 2px hsl(var(--foreground) / 0.03);
          transition: border-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin.dark .pc-related-card:hover {
          border-color: hsl(var(--border));
          border-left-color: hsl(var(--primary));
          box-shadow: 0 10px 28px -8px hsl(0 0% 0% / 0.5),
                      0 4px 8px -4px hsl(var(--primary) / 0.2);
        }
        .pc-related-title {
          color: hsl(var(--foreground));
          transition: color 280ms ease, text-shadow 280ms ease;
        }
        .arefin.dark .pc-related-card:hover .pc-related-title {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }
        .pc-related-desc {
          color: hsl(var(--muted-foreground));
        }
        .pc-related-link {
          transition: color 220ms ease;
        }
        .pc-related-card:hover .pc-related-link {
          color: hsl(var(--primary));
        }

        /* ───── SURFACE ELEVATION OVERRIDE — Related cards on dark bg → light/white ───── */
        .arefin.dark .pc-related-card {
          background: hsl(0 0% 97%);
          border: 1px solid hsl(0 0% 88%);
          border-left: 3px solid hsl(0 0% 88%);
          box-shadow: 0 1px 3px hsl(0 0% 0% / 0.18);
        }
        .arefin.dark .pc-related-card:hover,
        .arefin.dark .pc-related-card:focus-within {
          border-color: hsl(0 0% 88%);
          border-left-color: hsl(131 87% 41%);
          box-shadow: 8px 8px 0 0 hsl(131 87% 41% / 0.22);
        }
        .arefin.dark .pc-related-card .pc-related-title {
          color: hsl(0 0% 8%);
        }
        .arefin.dark .pc-related-card:hover .pc-related-title,
        .arefin.dark .pc-related-card:focus-within .pc-related-title {
          color: hsl(142 71% 32%);
          text-shadow: 1px 0.7px 0 hsl(80 25% 25%);
        }
        .arefin.dark .pc-related-card .pc-related-desc {
          color: hsl(0 0% 25%);
        }
        .arefin.dark .pc-related-card .pc-related-link {
          color: hsl(142 71% 32%);
        }
        .arefin.dark .pc-related-card:hover .pc-related-link {
          color: hsl(142 71% 28%);
        }
      `}</style>
    </div>
  );
};

export default PancreaticSurgeryDark;
