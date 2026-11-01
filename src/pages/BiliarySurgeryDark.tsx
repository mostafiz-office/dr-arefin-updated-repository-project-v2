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
import imgPortrait from "@/assets/gallery/dr-murshidul-arefin-surgeon-ot-portrait.webp";
import imgObstruction from "@/assets/gallery/dr-murshidul-arefin-open-surgery-closeup-popular-medical-dhaka.webp";
import imgCholangitis from "@/assets/gallery/dr-murshidul-arefin-laparoscopic-surgery-duo-popular-medical-dhaka.webp";
import imgCancer from "@/assets/gallery/dr-murshidul-arefin-open-surgery-suturing-popular-medical-dhaka.webp";
import imgStricture from "@/assets/gallery/hepatobiliary-open-surgery-best-surgeon-team-dhaka.webp";
import imgCyst from "@/assets/gallery/dr-murshidul-arefin-surgical-team-operation-theater-popular-medical.webp";
/**
 * Biliary Tract Surgery — Sub-treatment page (dark variant)
 * URL: /treatment/biliary-tract-surgery/
 * Keyword targets: best biliary surgeon dhaka, bile duct surgery dhaka,
 *   cholangiocarcinoma surgery dhaka, bile duct obstruction treatment dhaka,
 *   biliary tract surgery specialist dhaka, cholangitis treatment dhaka
 */

interface BiliaryCondition {
  title: string;
  description: string;
  img: string;
  imgAlt: string;
  imgPosition?: string;
  /* T10 (2026-05-17): satellite link target for the card title. */
  titleHref?: string;
  titleAlt?: string;
}

const conditions: BiliaryCondition[] = [
  {
    title: "Bile Duct Obstruction Repair",
    titleHref: "/treatment/bile-duct-obstruction-surgery-dhaka/",
    titleAlt: "Bile duct obstruction surgery and stricture repair in Dhaka by Dr. Arefin",
    description:
      "<a href='/treatment/bile-duct-obstruction-surgery-dhaka/' title='Bile duct obstruction surgery and stricture repair in Dhaka by Dr. Arefin'><strong>Bile duct obstruction</strong></a> caused by stones, tumors, or post-surgical strictures demands <a href='/treatment/bile-duct-obstruction-surgery-dhaka/' title='Expert biliary reconstruction surgery in Dhaka'><strong>expert surgical reconstruction</strong></a>. <a href='/about/' class='bt-inline-link'>Dr. Arefin</a> performs <a href='/treatment/bile-duct-obstruction-surgery-dhaka/' title='Hepaticojejunostomy in Dhaka'><strong>hepaticojejunostomy</strong></a>, <a href='/treatment/bile-duct-obstruction-surgery-dhaka/' title='Choledochojejunostomy in Dhaka'><strong>choledochojejunostomy</strong></a>, and <a href='/treatment/bile-duct-obstruction-surgery-dhaka/' title='Bile duct exploration surgery in Dhaka'><strong>bile duct exploration</strong></a> to restore biliary drainage and prevent recurrent jaundice. Moreover, each case is evaluated with MRCP imaging for precise surgical planning.",
    img: imgObstruction,
    imgAlt:
      "Bile duct obstruction surgery by Dr. Murshidul Arefin — best biliary surgeon Dhaka — পিত্তনালীর বাধা সার্জারি ঢাকা",
  },
  {
    title: "Cholangiocarcinoma Surgery",
    titleHref: "/treatment/cholangiocarcinoma-surgery-dhaka/",
    titleAlt: "Cholangiocarcinoma (bile duct cancer) surgery in Dhaka by Dr. Arefin",
    description:
      "Specializing in <a href='/treatment/cholangiocarcinoma-surgery-dhaka/' title='Oncologic biliary surgery in Dhaka'><strong>oncologic biliary surgery</strong></a>, Dr. Arefin performs <a href='/treatment/cholangiocarcinoma-surgery-dhaka/' title='Cholangiocarcinoma and bile duct cancer surgery in Dhaka by Dr. Arefin'><strong>radical resection of cholangiocarcinoma</strong></a> — including hilar (Klatskin tumor), distal, and intrahepatic bile duct cancers. His approach combines <a href='/treatment/cholangiocarcinoma-surgery-dhaka/' title='R0 resection goals for biliary cancer'><strong>R0 resection goals</strong></a> with vascular reconstruction when needed to maximize survival outcomes. Additionally, multidisciplinary tumor boards guide treatment planning.",
    img: imgCancer,
    imgAlt:
      "Cholangiocarcinoma bile duct cancer surgery — Dr. Murshidul Arefin at Popular Medical College Hospital Dhaka — কোল্যানজিওকার্সিনোমা সার্জারি",
  },
  {
    title: "Cholangitis Treatment",
    titleHref: "/treatment/cholangitis-surgery-dhaka/",
    titleAlt: "Cholangitis surgery and emergency biliary treatment in Dhaka",
    description:
      "<a href='/treatment/cholangitis-surgery-dhaka/' title='Cholangitis surgery and emergency biliary treatment in Dhaka by Dr. Arefin'><strong>Acute cholangitis</strong></a> — a life-threatening biliary infection — requires <a href='/treatment/cholangitis-surgery-dhaka/' title='Emergency biliary decompression in Dhaka'><strong>emergency biliary decompression</strong></a> and targeted antibiotic therapy. Dr. Arefin provides <a href='/treatment/cholangitis-surgery-dhaka/' title='Urgent surgical and endoscopic biliary management in Dhaka'><strong>urgent surgical and endoscopic management</strong></a> to resolve infection, remove obstructing stones, and prevent sepsis. <a href='/contact/' class='bt-inline-link'>Contact us immediately</a> for emergency biliary care, with ICU-grade monitoring and round-the-clock surgical readiness.",
    img: imgCholangitis,
    imgAlt:
      "Cholangitis treatment — Dr. Arefin performing biliary surgery in Dhaka — কোল্যানজাইটিস চিকিৎসা ঢাকা",
  },
  {
    title: "Biliary Stricture Reconstruction",
    titleHref: "/treatment/biliary-stricture-reconstruction-dhaka/",
    titleAlt: "Biliary stricture and post-surgical reconstruction in Dhaka",
    description:
      "<a href='/treatment/bile-duct-obstruction-surgery-dhaka/' title='Biliary stricture repair in Dhaka'><strong>Biliary strictures</strong></a> from previous surgery, trauma, or inflammation require <a href='/treatment/bile-duct-obstruction-surgery-dhaka/' title='Reconstructive biliary surgery in Dhaka'><strong>meticulous reconstructive surgery</strong></a>. Dr. Arefin specializes in <a href='/treatment/bile-duct-obstruction-surgery-dhaka/' title='Revision hepaticojejunostomy in Dhaka'><strong>revision hepaticojejunostomy</strong></a> and <a href='/treatment/bile-duct-obstruction-surgery-dhaka/' title='Biliary-enteric anastomosis in Dhaka'><strong>biliary-enteric anastomosis</strong></a> — restoring bile flow and preventing long-term complications like recurrent cholangitis. For related liver conditions, see <a href='/treatment/liver-surgery/' class='bt-inline-link'>liver surgery</a>. Long-term follow-up imaging ensures durable patency and early detection of any recurrence.",
    img: imgStricture,
    imgAlt:
      "Biliary stricture reconstruction surgery — best hepatobiliary surgeon team Dhaka — পিত্তনালীর স্ট্রিকচার সার্জারি",
    imgPosition: "center 40%",
  },
  {
    title: "Choledochal Cyst Excision",
    titleHref: "/treatment/choledochal-cyst-surgery-dhaka/",
    titleAlt: "Choledochal cyst excision surgery in Dhaka by Dr. Arefin",
    description:
      "<a href='/treatment/choledochal-cyst-surgery-dhaka/' title='Choledochal cyst excision surgery in Dhaka by Dr. Arefin'><strong>Choledochal cysts</strong></a> are congenital bile duct dilations that carry a risk of <a href='/treatment/cholangiocarcinoma-surgery-dhaka/' title='Malignant transformation risk in biliary disease'><strong>malignant transformation</strong></a>. Dr. Arefin performs <a href='/treatment/choledochal-cyst-surgery-dhaka/' title='Complete cyst excision with Roux-en-Y hepaticojejunostomy'><strong>complete cyst excision with Roux-en-Y hepaticojejunostomy</strong></a> — the definitive treatment to eliminate cancer risk and restore normal biliary anatomy. For related <a href='/treatment/gallbladder-surgery/' class='bt-inline-link'>gallbladder conditions</a>, coordinated care is available.",
    img: imgCyst,
    imgAlt:
      "Choledochal cyst excision — Dr. Arefin's surgical team at Popular Medical College Hospital — কোলিডোকাল সিস্ট সার্জারি",
    imgPosition: "center 30%",
  },
];

interface WhyChooseItem {
  icon: typeof ShieldCheck;
  title: string;
  body: string;
  titleHref?: string;
  titleAlt?: string;
}

const whyChoose: WhyChooseItem[] = [
  {
    icon: ShieldCheck,
    title: "Best Biliary Surgeon in Dhaka",
    titleHref: "/best-hepatobiliary-surgeon-dhaka/",
    titleAlt: "Best hepatobiliary and biliary surgeon in Dhaka — Dr. Murshidul Arefin",
    body: "Dr. Arefin is recognized as one of Dhaka's <a href='/best-hepatobiliary-surgeon-dhaka/' title='Top biliary and hepatobiliary surgeons in Dhaka'><strong>top biliary and hepatobiliary surgeons</strong></a>, with extensive experience in <a href='/treatment/bile-duct-obstruction-surgery-dhaka/' title='Complex bile duct reconstruction in Dhaka'><strong>complex bile duct reconstruction</strong></a> and <a href='/treatment/cholangiocarcinoma-surgery-dhaka/' title='Cholangiocarcinoma resection in Dhaka'><strong>cholangiocarcinoma resection</strong></a>.",
  },
  {
    icon: Microscope,
    title: "Advanced Reconstructive Techniques",
    titleHref: "/treatment/bile-duct-surgery/",
    titleAlt: "Bile duct surgery and advanced biliary reconstruction in Dhaka by Dr. Arefin",
    body: "Trained in <a href='/best-hepatobiliary-surgeon-dhaka/' title='Advanced hepatopancreatobiliary surgery training'><strong>advanced hepatopancreatobiliary surgery</strong></a>, Dr. Arefin performs <a href='/treatment/bile-duct-obstruction-surgery-dhaka/' title='Intricate biliary-enteric anastomoses in Dhaka'><strong>intricate biliary-enteric anastomoses</strong></a> and <a href='/treatment/cholangiocarcinoma-surgery-dhaka/' title='Vascular reconstruction in biliary cancer surgery'><strong>vascular reconstructions</strong></a> for the most challenging bile duct pathologies.",
  },
  {
    icon: HeartPulse,
    title: "Patient-Centered Approach",
    titleHref: "/about/patient-centered-care/",
    titleAlt: "Patient-centered biliary and hepatobiliary care in Dhaka by Dr. Arefin",
    body: "From initial consultation through post-operative recovery, Dr. Arefin provides <a href='/about/patient-centered-care/' title='Patient-centered care by Dr. Arefin'><strong>compassionate, personalized care</strong></a> that prioritizes patient comfort and long-term biliary health.",
  },
  {
    icon: Activity,
    title: "Emergency Biliary Care",
    titleHref: "/treatment/cholangitis-surgery-dhaka/",
    titleAlt: "Emergency cholangitis and biliary surgery in Dhaka by Dr. Arefin",
    body: "Dr. Arefin's team is equipped for <a href='/treatment/cholangitis-surgery-dhaka/' title='Urgent biliary emergencies in Dhaka'><strong>urgent biliary emergencies</strong></a> — including <a href='/treatment/cholangitis-surgery-dhaka/' title='Acute cholangitis emergency treatment in Dhaka'><strong>acute cholangitis</strong></a>, <a href='/treatment/bile-duct-obstruction-surgery-dhaka/' title='Bile duct injury repair in Dhaka'><strong>bile duct injuries</strong></a>, and <a href='/treatment/bile-duct-obstruction-surgery-dhaka/' title='Obstructive jaundice surgical treatment in Dhaka'><strong>obstructive jaundice</strong></a> requiring immediate intervention.",
  },
];

/* T28 — Biliary Tract Surgery FAQ: 8 Dhanmondi/Dhaka SEO-focused entries
   pulled from the central registry so each FAQ has a /faq/<slug>/ page. */
const BILIARY_FAQ_SLUGS = [
  "best-biliary-tract-surgeon-in-dhanmondi-dhaka",
  "how-much-does-bile-duct-surgery-cost-in-dhaka",
  "treatment-for-bile-duct-stricture-in-dhaka",
  "does-dr-arefin-treat-cholangiocarcinoma-in-dhaka",
  "where-is-choledochal-cyst-surgery-performed-in-dhaka",
  "how-long-does-recovery-after-bile-duct-surgery-take-in-dhaka",
  "treatment-for-bile-duct-injury-after-gallbladder-surgery-in-dhaka",
  "how-to-book-a-biliary-tract-surgery-consultation-in-dhanmondi",
];
const faqs = getFaqsBySlugs(BILIARY_FAQ_SLUGS);

const jsonLdString = buildGraph(
  buildBreadcrumbList([
    { name: "Treatment", path: "/treatment/" },
    { name: "Biliary Tract Surgery", path: "/treatment/biliary-tract-surgery/" },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Biliary Tract Surgery in Dhaka — Dr. Murshidul Arefin",
    url: "https://drarefin.com/treatment/biliary-tract-surgery/",
    description:
      "Expert bile duct surgery, cholangiocarcinoma resection, cholangitis treatment & biliary reconstruction in Dhaka by Dr. Murshidul Arefin at Popular Medical College Hospital.",
    mainEntity: {
      ...physicianEntity,
      medicalSpecialty: ["Hepatobiliary Surgery", "Biliary Tract Surgery", "Bile Duct Reconstruction"],
    },
  },
  // FAQPage schema is emitted by <FAQAccordion> (matches homepage; avoids duplicate).
);

const BiliarySurgeryDark = () => {
  return (
    <div className="arefin dark min-h-screen bg-background text-foreground font-arefin">
      <Helmet>
        <title>Biliary Tract Surgery in Dhaka — Dr. Murshidul Arefin, Best Biliary Surgeon</title>
        <meta
          name="description"
          content="Expert bile duct surgery, cholangiocarcinoma resection, cholangitis treatment & biliary reconstruction in Dhaka by Dr. Murshidul Arefin — best biliary surgeon at Popular Medical College Hospital. পিত্তনালীর সার্জারি ঢাকা"
        />
        <link rel="canonical" href="https://drarefin.com/treatment/biliary-tract-surgery/" />
        <link rel="preload" as="image" href={heroBg} />
        <link rel="alternate" hrefLang="bn" href="https://drarefin.com/treatment/biliary-tract-surgery/" />
        <link rel="alternate" hrefLang="en" href="https://drarefin.com/treatment/biliary-tract-surgery/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Biliary Tract Surgery in Dhaka — Dr. Murshidul Arefin" />
        <meta
          property="og:description"
          content="Expert bile duct surgery, cholangiocarcinoma resection, cholangitis treatment & biliary reconstruction in Dhaka by Dr. Murshidul Arefin — best biliary surgeon at Popular Medical College Hospital."
        />
        <meta property="og:url" content="https://drarefin.com/treatment/biliary-tract-surgery/" />
        <meta property="og:site_name" content="Dr. Murshidul Arefin" />
        <meta property="og:locale" content="en_BD" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Biliary Tract Surgery in Dhaka — Dr. Murshidul Arefin" />
        <meta
          name="twitter:description"
          content="Expert bile duct surgery, cholangiocarcinoma resection, cholangitis treatment & biliary reconstruction in Dhaka by Dr. Murshidul Arefin — best biliary surgeon at Popular Medical College Hospital."
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
        imageAlt="Best biliary tract surgery operating room in Dhaka"
        breadcrumb="Biliary Tract Surgery"
        kicker="Biliary Tract Surgery"
        h1="Biliary Tract Surgery in Dhaka"
        h1Href="/treatment/biliary-tract-surgery/"
        h1Title="Bile duct surgery, cholangiocarcinoma resection and biliary reconstruction in Dhaka by Dr. Murshidul Arefin"
        introHtml={`<a href="/treatment/biliary-tract-surgery/" title="Biliary tract surgery services in Dhaka by Dr. Arefin"><strong>Expert bile duct reconstruction, cholangiocarcinoma surgery, cholangitis treatment, and choledochal cyst excision</strong></a> — led by <a href="/about/" title="About Dr. Murshidul Arefin"><strong>Dr. Murshidul Arefin</strong></a>, the best biliary surgeon in Dhaka at <a href="/contact/" title="Popular Medical College Hospital">Popular Medical College Hospital</a>.`}
      />

      {/* ══════════════ WHY CHOOSE ══════════════ */}
      <section
        className="py-10 sm:py-14 md:py-20 lg:py-28 arefin-mint-band arefin-section-divider"
        aria-label="Why choose Dr. Arefin for biliary tract surgery"
      >
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-stretch">
            <Reveal className="h-full">
              <div className="bt-portrait-wrap rounded-2xl overflow-hidden h-full min-h-[320px] sm:min-h-[420px]">
                <img
                  src={imgPortrait}
                  alt="Dr. Murshidul Arefin — Best Biliary Surgeon in Dhaka — ঢাকার সেরা পিত্তনালী সার্জন"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>

            <div>
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-light mb-4">
                  Best Biliary Surgeon Dhaka
                </p>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="bt-section-heading text-fluid-h2 font-semibold text-foreground mb-6 leading-tight">
                  Why Choose Dr. Arefin for Biliary Tract Surgery?
                </h2>
              </Reveal>
              <Reveal delay={150}>
                <p className="bt-body-text text-fluid-lede mb-8">
                  As a <Link to="/best-hepatobiliary-surgeon-dhaka/" className="bt-inline-link"><strong>fellowship-trained hepatobiliary surgeon</strong></Link>{" "}
                  at{" "}
                  <Link to="/contact/" className="bt-inline-link">
                    Popular Medical College Hospital, Dhanmondi
                  </Link>
                  , Dr. Arefin delivers <Link to="/treatment/biliary-tract-surgery/" className="bt-inline-link"><strong>expert biliary tract surgery in Dhaka</strong></Link>{" "}
                  — from complex <Link to="/treatment/bile-duct-obstruction-surgery-dhaka/" className="bt-inline-link"><strong>bile duct reconstruction</strong></Link> to{" "}
                  <Link to="/treatment/cholangiocarcinoma-surgery-dhaka/" className="bt-inline-link"><strong>cholangiocarcinoma resection</strong></Link>.
                  Consequently, patients across Bangladesh trust his expertise
                  for critical biliary conditions.
                </p>
              </Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {whyChoose.map((item, i) => (
                  <Reveal key={item.title} delay={200 + i * 80} className="h-full">
                    <div className="bt-why-card arefin-card-hover rounded-xl p-5 h-full">
                      <item.icon className="h-6 w-6 text-primary-light mb-3" />
                      <h3 className="bt-why-title text-base font-semibold mb-2">
                        {item.titleHref ? (
                          <Link to={item.titleHref} title={item.titleAlt ?? item.title} className="bt-why-title-link">
                            {item.title}
                          </Link>
                        ) : (
                          item.title
                        )}
                      </h3>
                      <p
                        className="bt-why-body text-sm leading-relaxed"
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
        aria-label="Biliary conditions treated by Dr. Arefin"
      >
        <div className="container">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-light mb-4">
                Biliary Tract Surgery Services
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="bt-section-heading text-fluid-h2 font-semibold text-foreground mb-6 leading-tight">
                Biliary Conditions We Treat
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="bt-body-text text-fluid-lede">
                <Link to="/treatment/biliary-tract-surgery/" className="bt-inline-link">
                  <strong>
                    Expert surgical care for bile duct obstruction, cholangiocarcinoma,
                    cholangitis, biliary strictures, and choledochal cysts
                  </strong>
                </Link>{" "}
                — tailored to each patient's condition by{" "}
                <Link to="/about/" className="bt-inline-link">
                  Dr. Murshidul Arefin
                </Link>
                , the{" "}
                <Link to="/best-hepatobiliary-surgeon-dhaka/" className="bt-inline-link"><strong>best biliary tract surgery specialist in Dhaka</strong></Link>.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {conditions.map((c, i) => (
              <Reveal key={c.title} delay={i % 3 === 0 ? 0 : i % 3 === 1 ? 80 : 160} className="h-full">
                <article className="bt-card arefin-card-hover rounded-2xl overflow-hidden h-full flex flex-col">
                  <div className="bt-card-img-wrap aspect-[16/10] overflow-hidden">
                    <img
                      src={c.img}
                      alt={c.imgAlt}
                      loading="lazy"
                      decoding="async"
                      className="bt-card-img w-full h-full object-cover"
                      style={
                        c.imgPosition
                          ? { objectPosition: c.imgPosition }
                          : undefined
                      }
                    />
                  </div>
                  <div className="p-5 sm:p-6 md:p-7 flex-1 flex flex-col">
                    <h3 className="bt-card-title text-fluid-h4 font-semibold mb-3">
                      {c.titleHref ? (
                        <Link to={c.titleHref} title={c.titleAlt ?? c.title} className="bt-card-title-link">
                          {c.title}
                        </Link>
                      ) : (
                        c.title
                      )}
                    </h3>
                    <p
                      className="bt-card-desc text-base leading-relaxed flex-1"
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
      <TreatmentProcessSticky variant="biliary" />

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
              <h2 className="bt-section-heading text-fluid-h2 font-semibold text-foreground mb-6 leading-tight">
                Related Treatment Services
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="bt-body-text text-fluid-lede">
                <Link to="/about/" className="bt-inline-link"><strong>Dr. Arefin</strong></Link> also specializes in{" "}
                <Link to="/treatment/" className="bt-inline-link"><strong>liver, gallbladder, and pancreatic surgery</strong></Link>{" "}
                — conditions often closely linked to biliary tract health.
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
                title: "Pancreatic Surgery",
                desc: "Whipple procedure, pancreatic cancer surgery, pancreatitis treatment, and pseudocyst management.",
                href: "/treatment/pancreatic-surgery/",
              },
            ].map((rt, i) => (
              <Reveal key={rt.title} delay={i * 100} className="h-full">
                <Link
                  to={rt.href}
                  className="bt-related-card arefin-card-hover rounded-xl p-5 sm:p-6 h-full flex flex-col no-underline group"
                >
                  <h3 className="bt-related-title text-lg font-semibold mb-3">
                    {rt.title}
                  </h3>
                  <p className="bt-related-desc text-sm leading-relaxed mb-4 flex-1">
                    {rt.desc}
                  </p>
                  <span className="bt-related-link inline-flex items-center gap-1.5 text-sm font-medium text-primary-light">
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
        treatmentSlug="biliary-tract-surgery"
        headingLead="Ready for "
        headingAccent="Expert Biliary Consultation?"
        body={
          <>
            <Link to="/contact/" className="bt-inline-link"><strong>Connect with Dr. Arefin</strong></Link> for a{" "}
            <Link to="/treatment/biliary-tract-surgery/" className="bt-inline-link"><strong>comprehensive biliary tract evaluation</strong></Link>,{" "}
            <Link to="/contact/" className="bt-inline-link"><strong>expert surgical advice</strong></Link>, and a{" "}
            <Link to="/diagnosis-surgery-recovery/" className="bt-inline-link"><strong>clear path to recovery</strong></Link>.
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
        .bt-hero { min-height: 480px; }
        .bt-hero-img {
          filter: brightness(0.55) saturate(0.92);
        }
        .bt-hero-overlay {
          background: linear-gradient(
            to bottom,
            hsl(0 0% 0% / 0.65) 0%,
            hsl(0 0% 0% / 0.72) 50%,
            hsl(0 0% 0% / 0.82) 100%
          );
        }
        .bt-hero-h1 {
          color: #ffffff;
          text-shadow: 0 2px 20px hsl(0 0% 0% / 0.6);
          transition: text-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      color 280ms cubic-bezier(0.22, 1, 0.36, 1);
          cursor: default;
        }
        .bt-hero-h1:hover {
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
          color: hsl(var(--primary));
        }
        .bt-hero-sub {
          color: hsl(0 0% 100% / 0.92);
        }
        .bt-hero-sub strong {
          color: inherit;
          font-weight: inherit;
        }

        /* ───── Inline links ───── */
        .bt-inline-link {
          color: hsl(var(--primary-light));
          text-decoration: none;
          transition: color 220ms ease, text-shadow 220ms ease;
        }
        .bt-inline-link:hover {
          color: hsl(var(--primary));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* ───── Section headings ───── */
        .bt-section-heading {
          transition: text-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      color 280ms cubic-bezier(0.22, 1, 0.36, 1);
          cursor: default;
        }
        .bt-section-heading:hover {
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
          color: hsl(var(--primary-light));
        }

        /* ───── Body text ───── */
        .bt-body-text {
          color: hsl(var(--muted-foreground));
        }
        .bt-body-text strong {
          color: inherit;
          font-weight: inherit;
          transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1),
                      text-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .bt-body-text strong:hover {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }
        .bt-body-text a {
          color: hsl(var(--primary-light));
          text-decoration: none;
          transition: color 220ms ease, text-shadow 220ms ease;
        }
        .bt-body-text a:hover {
          color: hsl(var(--primary));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* ───── Portrait ───── */
        .bt-portrait-wrap {
          border: 1px solid hsl(var(--border));
        }

        /* ───── Why-choose cards ───── */
        .arefin.dark .bt-why-card {
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
          border-left: 3px solid hsl(var(--border));
          box-shadow: 0 1px 2px hsl(var(--foreground) / 0.03);
          transition: border-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin.dark .bt-why-card:hover {
          border-color: hsl(var(--border));
          border-left-color: hsl(var(--primary));
          box-shadow: 0 10px 28px -8px hsl(0 0% 0% / 0.5),
                      0 4px 8px -4px hsl(var(--primary) / 0.2);
        }
        .bt-why-title {
          color: hsl(var(--foreground));
          transition: color 280ms ease, text-shadow 280ms ease;
        }
        .arefin.dark .bt-why-card:hover .bt-why-title {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }
        .bt-why-body {
          color: hsl(var(--muted-foreground));
        }
        .bt-why-body strong {
          color: inherit;
          font-weight: inherit;
          transition: color 220ms ease, text-shadow 220ms ease;
        }
        .bt-why-body strong:hover {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* ───── Condition cards ───── */
        .arefin.dark .bt-card {
          background: hsl(0 0% 97%);
          border: 1px solid hsl(220 10% 85%);
          border-left: 3px solid hsl(220 10% 85%);
          box-shadow: 0 1px 2px hsl(0 0% 0% / 0.06);
          transition: border-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      background-color 280ms ease;
        }
        .arefin.dark .bt-card:hover,
        .arefin.dark .bt-card:focus-within {
          border-color: hsl(220 10% 85%);
          border-left-color: hsl(var(--primary));
          box-shadow: 0 10px 28px -8px hsl(0 0% 0% / 0.5),
                      0 4px 8px -4px hsl(var(--primary) / 0.2);
        }
        .bt-card-img {
          transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .bt-card:hover .bt-card-img {
          transform: scale(1.04);
        }
        .bt-card-title {
          color: hsl(var(--foreground));
          transition: color 280ms ease, text-shadow 280ms ease;
        }
        .arefin.dark .bt-card .bt-card-title {
          color: hsl(0 0% 8%);
        }
        .arefin.dark .bt-card:hover .bt-card-title,
        .arefin.dark .bt-card:focus-within .bt-card-title {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }
        .bt-card-desc {
          color: hsl(var(--muted-foreground));
          text-align: justify;
          text-justify: inter-word;
          hyphens: auto;
          -webkit-hyphens: auto;
        }
        .arefin.dark .bt-card .bt-card-desc {
          color: hsl(0 0% 35%);
        }
        .bt-card-desc strong {
          color: inherit;
          font-weight: inherit;
          cursor: default;
          transition: color 220ms ease, text-shadow 220ms ease;
        }
        .bt-card-desc strong:hover {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* ───── Approach section ───── */
        .bt-approach-img-wrap {
          border: 1px solid hsl(var(--border));
        }
        .bt-step-number {
          color: hsl(var(--primary) / 0.20);
        }
        .bt-approach-title {
          transition: color 280ms ease, text-shadow 280ms ease;
          cursor: default;
        }
        .bt-approach-title:hover {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* ───── FAQ ───── */
        .bt-faq-item {
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
          transition: border-color 280ms ease, box-shadow 280ms ease;
        }
        .bt-faq-item[open],
        .bt-faq-item:hover {
          border-color: hsl(var(--primary) / 0.4);
          box-shadow: 0 4px 12px -4px hsl(var(--primary) / 0.15);
        }
        .bt-faq-q {
          transition: color 220ms ease;
        }
        .bt-faq-item:hover .bt-faq-q,
        .bt-faq-item[open] .bt-faq-q {
          color: hsl(var(--primary-light));
        }
        .bt-faq-a {
          color: hsl(var(--muted-foreground));
        }
        .bt-faq-a strong {
          color: inherit;
          font-weight: inherit;
          transition: color 220ms ease, text-shadow 220ms ease;
        }
        .bt-faq-a strong:hover {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }
        .bt-faq-a a {
          color: hsl(var(--primary-light));
          text-decoration: none;
          transition: color 220ms ease;
        }
        .bt-faq-a a:hover {
          color: hsl(var(--primary));
        }

        /* ───── CTA body ───── */
        .bt-cta-body strong {
          color: inherit;
          font-weight: inherit;
          cursor: default;
          transition: color 220ms ease, text-shadow 220ms ease;
        }
        .bt-cta-body strong:hover {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* ───── Related treatment cards ───── */
        .arefin.dark .bt-related-card {
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
          border-left: 3px solid hsl(var(--border));
          box-shadow: 0 1px 2px hsl(var(--foreground) / 0.03);
          transition: border-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin.dark .bt-related-card:hover {
          border-color: hsl(var(--border));
          border-left-color: hsl(var(--primary));
          box-shadow: 0 10px 28px -8px hsl(0 0% 0% / 0.5),
                      0 4px 8px -4px hsl(var(--primary) / 0.2);
        }
        .bt-related-title {
          color: hsl(var(--foreground));
          transition: color 280ms ease, text-shadow 280ms ease;
        }
        .arefin.dark .bt-related-card:hover .bt-related-title {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }
        .bt-related-desc {
          color: hsl(var(--muted-foreground));
        }
        .bt-related-link {
          transition: color 220ms ease;
        }
        .bt-related-card:hover .bt-related-link {
          color: hsl(var(--primary));
        }

        /* ───── SURFACE ELEVATION OVERRIDE — Related cards on dark bg → light/white ───── */
        .arefin.dark .bt-related-card {
          background: hsl(0 0% 97%);
          border: 1px solid hsl(0 0% 88%);
          border-left: 3px solid hsl(0 0% 88%);
          box-shadow: 0 1px 3px hsl(0 0% 0% / 0.18);
        }
        .arefin.dark .bt-related-card:hover,
        .arefin.dark .bt-related-card:focus-within {
          border-color: hsl(0 0% 88%);
          border-left-color: hsl(131 87% 41%);
          box-shadow: 8px 8px 0 0 hsl(131 87% 41% / 0.22);
        }
        .arefin.dark .bt-related-card .bt-related-title {
          color: hsl(0 0% 8%);
        }
        .arefin.dark .bt-related-card:hover .bt-related-title,
        .arefin.dark .bt-related-card:focus-within .bt-related-title {
          color: hsl(142 71% 32%);
          text-shadow: 1px 0.7px 0 hsl(80 25% 25%);
        }
        .arefin.dark .bt-related-card .bt-related-desc {
          color: hsl(0 0% 25%);
        }
        .arefin.dark .bt-related-card .bt-related-link {
          color: hsl(142 71% 32%);
        }
        .arefin.dark .bt-related-card:hover .bt-related-link {
          color: hsl(142 71% 28%);
        }
      `}</style>
    </div>
  );
};

export default BiliarySurgeryDark;
