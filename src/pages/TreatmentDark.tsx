import { Link } from "react-router-dom";
import { buildBreadcrumbList, buildGraph } from "@/lib/structuredData";
import { Helmet } from "react-helmet-async";
import DrArefinHeader from "@/components/arefin/DrArefinHeader";
import DrArefinFooter from "@/components/arefin/DrArefinFooter";
import darkLogo from "@/assets/dr-arefin-logo-dark.webp";
import heroBg from "@/assets/dr-arefin-ot-team-real.webp";
import { Reveal } from "@/hooks/useScrollReveal";
import HeroSection from "@/components/arefin/HeroSection";
import TestimonialsSection from "@/components/arefin/TestimonialsSection";
import ServicesGridSection from "@/components/arefin/ServicesGridSection";
import FAQAccordion from "@/components/arefin/FAQAccordion";
import GlobalCTABand from "@/components/arefin/GlobalCTABand";
import { getFaqsBySlugs } from "@/data/faqRegistry";

/* ── Real clinical images for treatment cards ── */
import imgLiverTumor from "@/assets/gallery/hepatobiliary-open-surgery-best-surgeon-team-dhaka.webp";
import imgLiverCyst from "@/assets/gallery/dr-murshidul-arefin-open-surgery-closeup-popular-medical-dhaka.webp";
import imgFattyLiver from "@/assets/gallery/laparoscopic-gallbladder-surgery-full-ot-team-popular-medical-dhaka.webp";
import imgTransplant from "@/assets/gallery/liver-surgery-team-closeup-hepatobiliary-surgeon-dhaka.webp";
import imgGallstone from "@/assets/gallery/gallbladder-stone-laparoscopic-removal-surgery-dhaka.webp";
import imgBileDuct from "@/assets/gallery/dr-murshidul-arefin-performing-gallbladder-surgery-dhaka.webp";
import imgGallbladderCancer from "@/assets/gallery/dr-murshidul-arefin-surgical-team-gallbladder-operation-popular-medical.webp";
import imgCholecystitis from "@/assets/gallery/empyema-gallbladder-laparoscopic-surgery-specialist-dhaka.webp";
import imgPancreaticCancer from "@/assets/gallery/dr-murshidul-arefin-open-surgery-suturing-popular-medical-dhaka.webp";
import imgPancreaticCyst from "@/assets/gallery/dr-murshidul-arefin-laparoscopic-surgery-duo-popular-medical-dhaka.webp";
import imgPancreatitis from "@/assets/gallery/dr-murshidul-arefin-laparoscopic-team-operation-theater-dhaka.webp";
import imgSpleen from "@/assets/gallery/three-surgeons-gallbladder-operation-popular-medical-dhaka.webp";
import imgUpperGit from "@/assets/gallery/gallbladder-surgery-team-popular-medical-college-hospital.webp";
import imgTransplantFollowup from "@/assets/gallery/dr-murshidul-arefin-patient-recovery-after-gallbladder-surgery-dhaka.webp";

/**
 * Treatment — Dark version
 * Content mirrors https://drarefin.com/treatment/ verbatim.
 * Design system matches homepage & about page (dark mode).
 */

interface TreatmentService {
  title: string;
  description: string;
  img?: string;
  imgPosition?: string;
  to?: string;
  linkTitle?: string;
}

const services: TreatmentService[] = [
  {
    title: "Liver Tumor & Cancer Surgery",
    to: "/treatment/liver-tumor-cancer-surgery-dhaka/",
    linkTitle: "Liver tumor & cancer surgery in Dhaka — hepatobiliary & gallbladder surgeon Dr. Arefin",
    description:
      "Dr. Arefin provides <a href='/diagnosis-surgery-recovery/' title='Precise hepatobiliary diagnosis by Dr. Arefin in Dhaka'><strong>precise diagnosis</strong></a> and <a href='/treatment/liver-tumor-cancer-surgery-dhaka/' title='Advanced surgical treatment for benign and malignant liver tumors in Dhaka'><strong>advanced surgical treatment for both benign and malignant liver tumors</strong></a>. Using <a href='/minimally-invasive-surgery/' title='Modern resection and minimally invasive liver surgery techniques'><strong>modern resection and minimally invasive techniques</strong></a>, he ensures optimal tumor removal.",
    img: imgLiverTumor,
  },
  {
    title: "Liver Cyst Management",
    to: "/treatment/liver-cyst-surgery-dhaka/",
    linkTitle: "Liver cyst surgery in Dhaka — safe excision by hepatobiliary & gallbladder specialist",
    description:
      "<a href='/treatment/liver-cyst-surgery-dhaka/' title='Simple or complex liver cyst evaluation and surgery in Dhaka'><strong>Simple or complex liver cysts</strong></a> are carefully assessed using advanced imaging. When surgery is required, Dr. Arefin performs <a href='/treatment/liver-cyst-surgery-dhaka/' title='Safe liver cyst excision in Dhaka by Dr. Arefin'><strong>safe cyst excision</strong></a> to prevent recurrence, relieve discomfort, and <a href='/treatment/liver-surgery/' title='Restore normal liver function — hepatobiliary surgery in Dhaka'><strong>restore normal liver function.</strong></a>",
    img: imgLiverCyst,
  },
  {
    title: "Fatty Liver Surgical Intervention",
    to: "/treatment/fatty-liver-management/",
    linkTitle: "Fatty liver disease — surgical & metabolic management by Dhaka's hepatobiliary surgeon",
    description:
      "For patients with <a href='/treatment/fatty-liver-management/' title='Fatty liver disease management in Dhaka'><strong>severe or complicated fatty liver disease</strong></a>, Dr. Arefin combines <a href='/treatment/fatty-liver-management/' title='Metabolic evaluation with surgical precision for fatty liver disease'><strong>metabolic evaluation with surgical precision</strong></a> to manage liver damage, prevent further deterioration, and promote healthy regeneration.",
    img: imgFattyLiver,
  },
  {
    title: "Liver Transplant Surgery",
    to: "/treatment/liver-transplant-surgery-dhaka/",
    linkTitle: "Liver transplant surgery in Dhaka — donor coordination & advanced hepatobiliary care",
    description:
      "A cornerstone of Dr. Arefin's expertise—offering <a href='/treatment/liver-transplant-evaluation/' title='Complete liver transplant evaluation and donor coordination in Dhaka'><strong>complete evaluation, donor coordination</strong></a>, and <a href='/treatment/liver-transplant-surgery-dhaka/' title='Liver transplant surgery in Dhaka by Dr. Arefin'><strong>advanced transplant procedures</strong></a> for <a href='/treatment/liver-transplant-surgery-dhaka/' title='End-stage liver failure transplant surgery in Dhaka'><strong>end-stage liver failure</strong></a>. His approach focuses on patient safety, post-transplant recovery, and long-term liver health.",
    img: imgTransplant,
  },
  {
    title: "Gallstone & Gallbladder Surgery",
    to: "/treatment/gallstone-removal-dhaka/",
    linkTitle: "Gallstone & gallbladder surgery in Dhaka — laparoscopic removal by Dr. Arefin",
    description:
      "From <a href='/treatment/gallstone-removal-dhaka/' title='Painful gallstone removal in Dhaka by Dr. Arefin'><strong>painful gallstones</strong></a> to <a href='/treatment/cholecystitis-surgery-dhaka/' title='Inflamed gallbladder conditions — cholecystitis surgery in Dhaka'><strong>inflamed gallbladder conditions</strong></a>, Dr. Arefin offers <a href='/treatment/laparoscopic-cholecystectomy-dhaka/' title='Laparoscopic cholecystectomy — keyhole gallbladder removal in Dhaka by Dr. Arefin'><strong>laparoscopic cholecystectomy</strong></a>—removing stones and restoring comfort through <a href='/minimally-invasive-surgery/' title='Small-incision, minimally invasive surgical procedures'><strong>small-incision, minimally invasive procedures</strong></a> with faster healing.",
    img: imgGallstone,
  },
  {
    title: "Bile Duct & Biliary Tract Surgery",
    to: "/treatment/bile-duct-obstruction-surgery-dhaka/",
    linkTitle: "Bile duct & biliary tract surgery in Dhaka — gallbladder-trained hepatobiliary surgeon",
    description:
      "Dr. Arefin treats <a href='/treatment/biliary-obstruction-cancer-dhaka/' title='Biliary obstruction and bile duct cancer surgery in Dhaka by Dr. Arefin'><strong>complex bile duct obstructions</strong></a> and <a href='/treatment/cholangiocarcinoma-surgery-dhaka/' title='Biliary cancers and cholangiocarcinoma surgery in Dhaka'><strong>biliary cancers</strong></a> using <a href='/minimally-invasive-surgery/' title='Precise microsurgical methods for bile duct surgery'><strong>precise microsurgical methods</strong></a>. His care ensures proper bile flow, alleviates jaundice, and minimizes postoperative complications.",
    img: imgBileDuct,
  },
  {
    title: "Gallbladder & Bile Duct Cancer Surgery",
    to: "/treatment/gallbladder-cancer-resection-dhaka/",
    linkTitle: "Gallbladder & bile duct cancer resection in Dhaka — oncologic hepatobiliary surgery",
    description:
      "Specializing in <a href='/treatment/hepatobiliary-surgery/' title='Oncologic hepatobiliary surgery in Dhaka by Dr. Arefin'><strong>oncologic hepatobiliary surgery</strong></a>, Dr. Arefin performs <a href='/treatment/liver-tumor-cancer-surgery-dhaka/' title='Hepatobiliary cancer resection in Dhaka'><strong>advanced resections for gallbladder and bile duct cancers</strong></a>, combining surgical precision with evidence-based cancer management to extend survival and improve quality of life.",
    img: imgGallbladderCancer,
  },
  {
    title: "Cholecystitis Treatment",
    to: "/treatment/cholecystitis-surgery-dhaka/",
    linkTitle: "Cholecystitis (inflamed gallbladder) surgery in Dhaka — minimally invasive treatment",
    description:
      "<a href='/treatment/cholecystitis-surgery-dhaka/' title='Acute and chronic gallbladder inflammation treatment in Dhaka'><strong>Acute and chronic gallbladder inflammation</strong></a> is managed through <a href='/treatment/cholecystitis-surgery-dhaka/' title='Timely diagnosis and minimally invasive cholecystitis surgery'><strong>timely diagnosis and minimally invasive surgery</strong></a> to relieve pain, prevent infection, and avoid recurrence.",
    img: imgCholecystitis,
  },
  {
    title: "Pancreatic Cancer Surgery",
    to: "/treatment/pancreatic-cancer-surgery-dhaka/",
    linkTitle: "Pancreatic cancer surgery in Dhaka — Whipple & hepatobiliary oncologic expertise",
    description:
      "For pancreatic tumors, Dr. Arefin performs <a href='/treatment/pancreatic-cancer-surgery-dhaka/' title='Highly specialised pancreatic cancer surgeries in Dhaka'><strong>highly specialized surgeries</strong></a>—including <a href='/treatment/whipple-procedure-dhaka/' title='Whipple procedure for pancreatic cancer in Dhaka by Dr. Arefin'><strong>Whipple procedures</strong></a>—aimed at <a href='/treatment/pancreatic-cancer-surgery-dhaka/' title='Removing pancreatic cancer while protecting vital structures'><strong>removing cancer</strong></a> while protecting vital structures. His multidisciplinary approach ensures optimal outcomes in challenging cases.",
    img: imgPancreaticCancer,
  },
  {
    title: "Pancreatic Cyst Treatment",
    to: "/treatment/pancreatic-cyst-surgery-dhaka/",
    linkTitle: "Pancreatic cyst surgery in Dhaka — safe evaluation & resection by Dr. Arefin",
    description:
      "<a href='/treatment/pancreatic-cyst-surgery-dhaka/' title='Pancreatic cyst surgery in Dhaka'><strong>Pancreatic cysts can pose serious risks</strong></a> if untreated. Dr. Arefin provides <a href='/treatment/pancreatic-cyst-surgery-dhaka/' title='Expert pancreatic cyst evaluation and surgical management in Dhaka'><strong>expert evaluation and surgical management</strong></a>, ensuring <a href='/treatment/pancreatic-cyst-surgery-dhaka/' title='Safe pancreatic cyst removal in Dhaka by Dr. Arefin'><strong>safe cyst removal</strong></a> and <a href='/treatment/pancreatic-surgery/' title='Long-term digestive health after pancreatic surgery'><strong>long-term digestive health.</strong></a>",
    img: imgPancreaticCyst,
  },
  {
    title: "Pancreatitis (Surgical Management)",
    to: "/treatment/pancreatitis-surgery-dhaka/",
    linkTitle: "Pancreatitis surgery in Dhaka — relieve obstruction & preserve pancreatic function",
    description:
      "<a href='/treatment/pancreatitis-surgery-dhaka/' title='Surgical management of pancreatitis in Dhaka'><strong>Severe or chronic pancreatitis</strong></a> requiring surgery is treated with <a href='/treatment/pancreatitis-surgery-dhaka/' title='Surgical precision to relieve pancreatic obstruction'><strong>precision to relieve obstruction</strong></a>, prevent recurrence, and <a href='/treatment/pancreatic-surgery/' title='Preserve pancreatic function — Dr. Arefin pancreatic surgery'><strong>preserve pancreatic function</strong></a>—helping patients regain comfort and nutritional stability.",
    img: imgPancreatitis,
  },
  {
    title: "Spleen-Related Surgeries",
    to: "/treatment/spleen-surgery/",
    linkTitle: "Splenectomy & spleen surgery in Dhaka — by gallbladder-trained hepatobiliary surgeon",
    description:
      "Dr. Arefin offers <a href='/treatment/spleen-surgery/' title='Splenectomy and spleen surgery in Dhaka'><strong>splenectomy and related procedures</strong></a> for <a href='/treatment/spleen-surgery/' title='Spleen surgery for trauma, cysts, or hematologic disorders'><strong>trauma, cysts, or hematologic disorders</strong></a>, ensuring <a href='/treatment/spleen-surgery/' title='Safe spleen removal with minimal blood loss'><strong>safe removal</strong></a> with minimal blood loss and smooth recovery.",
    img: imgSpleen,
  },
  {
    title: "Upper Gastrointestinal (GIT) Surgery",
    to: "/treatment/hepatobiliary-surgery/",
    linkTitle: "Upper GI surgery in Dhaka — esophageal, gastric & duodenal care by hepatobiliary surgeon",
    description:
      "Comprehensive management for <a href='/treatment/hepatobiliary-surgery/' title='Esophageal, gastric, and duodenal disorder surgery in Dhaka'><strong>esophageal, gastric, and duodenal disorders</strong></a>—combining <a href='/treatment/hepatobiliary-surgery/' title='Diagnostic endoscopy for upper GI conditions'><strong>diagnostic endoscopy</strong></a> with <a href='/treatment/hepatobiliary-surgery/' title='Advanced surgical intervention for upper GI disorders'><strong>advanced surgical intervention</strong></a> to <a href='/treatment/' title='Restore digestive health — hepatobiliary surgery in Dhaka'><strong>restore digestive health</strong></a> and quality of life.",
    img: imgUpperGit,
  },
  {
    title: "Liver Transplant Coordination & Follow-Up Care",
    to: "/treatment/post-transplant-follow-up/",
    linkTitle: "Liver transplant coordination & post-transplant follow-up care in Dhaka",
    description:
      "Dr. Arefin's transplant program provides <a href='/treatment/liver-transplant-coordination/' title='End-to-end liver transplant support in Dhaka'><strong>end-to-end support</strong></a>—from <a href='/treatment/liver-transplant-evaluation/' title='Donor assessment for liver transplant in Dhaka'><strong>donor assessment</strong></a> to <a href='/treatment/post-transplant-follow-up/' title='Post-transplant follow-up care in Dhaka'><strong>post-surgery rehabilitation</strong></a>—ensuring a <a href='/diagnosis-surgery-recovery/' title='Seamless diagnosis-surgery-recovery experience with Dr. Arefin'><strong>seamless experience</strong></a> and <a href='/treatment/post-transplant-follow-up/' title='Long-term post-transplant care in Dhaka'><strong>long-term care</strong></a> for transplant patients.",
    img: imgTransplantFollowup,
    imgPosition: "center 20%",
  },
];

/* Treatment-page FAQ: 8 cross-specialty Dhaka SEO entries spanning
   liver, gallbladder, pancreatic and biliary tract surgery. Sourced from
   the central registry so every question has a resolvable /faq/<slug>/ page. */
const TREATMENT_FAQ_SLUGS = [
  "best-hepatobiliary-surgeon-in-dhanmondi-dhaka",
  "how-much-does-liver-surgery-cost-in-dhaka",
  "where-is-liver-transplant-surgery-available-in-dhaka",
  "is-laparoscopic-cholecystectomy-available-in-dhanmondi",
  "how-much-does-whipple-surgery-cost-in-dhaka",
  "does-dr-arefin-treat-pancreatic-cancer-in-dhaka",
  "treatment-for-bile-duct-stricture-in-dhaka",
  "how-to-book-a-gallbladder-surgery-consultation-in-dhanmondi",
];
const faqs = getFaqsBySlugs(TREATMENT_FAQ_SLUGS);

const jsonLdString = buildGraph(
  buildBreadcrumbList([{ name: "Treatment", path: "/treatment/" }]),
  {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Hepatobiliary & Liver Treatment Services — Dr. Murshidul Arefin",
    url: "https://drarefin.com/treatment/",
    description:
      "Advanced hepatobiliary and liver transplant care led by Dr. Murshidul Arefin, delivering personalized surgical solutions for your liver and biliary health in Dhaka.",
    mainEntity: { "@id": "https://drarefin.com/#physician" },
  },
);

const TreatmentDark = () => {
  return (
    <div className="arefin dark min-h-screen bg-background text-foreground font-arefin">
      <Helmet>
        <title>Treatment Services — Liver, Gallbladder, Pancreatic & Biliary Surgery in Dhaka</title>
        <meta name="description" content="Comprehensive hepatobiliary treatment services by Dr. Murshidul Arefin in Dhaka. Specializing in liver surgery, gallbladder removal, pancreatic surgery, biliary tract procedures, and liver transplant." />
        <link rel="canonical" href="https://drarefin.com/treatment/" />
        <link rel="preload" as="image" href={heroBg} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Treatment Services — Liver, Gallbladder & Pancreatic Surgery in Dhaka" />
        <meta property="og:description" content="Comprehensive hepatobiliary treatment services by Dr. Murshidul Arefin in Dhaka — liver surgery, gallbladder removal, pancreatic surgery, and liver transplant." />
        <meta property="og:url" content="https://drarefin.com/treatment/" />
        <meta property="og:site_name" content="Dr. Murshidul Arefin" />
        <meta property="og:locale" content="en_BD" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />

      <DrArefinHeader logoSrc={darkLogo} transparent />

      {/* ============== HERO — shared HeroSection (homepage parity) ============== */}
      <HeroSection
        imageSrc={heroBg}
        imageAlt="Dr. Arefin's hepatobiliary surgical team in the operating theatre"
        breadcrumb="Treatment"
        kicker="Our Treatments"
        h1="Treatment"
        h1Href="/treatment/"
        h1Title="Hepatobiliary, liver, gallbladder, and pancreatic treatment services in Dhaka by Dr. Murshidul Arefin"
        introHtml={`<a href="/advanced-hepatobiliary-treatment/" title="Advanced hepatobiliary and liver transplant care in Dhaka"><strong>Advanced hepatobiliary and liver transplant care</strong></a> led by <a href="/about/" title="About Dr. Murshidul Arefin"><strong>Dr. Murshidul Arefin</strong></a>, delivering <a href="/about/patient-centered-care/" title="Personalised surgical solutions — patient-centred care by Dr. Arefin"><strong>personalized surgical solutions</strong></a> for your <a href="/treatment/liver-surgery/" title="Liver surgery in Dhaka by Dr. Arefin"><strong>liver and biliary health</strong></a> in Dhaka.`}
        trust={[
          "14+ specialty procedures",
          "Reply within 24 hours",
          "Call +880 1311-487592",
        ]}
      />

      {/* ============== SERVICES SECTION HEADING ============== */}
      <ServicesGridSection
        kicker="Our Services"
        heading="Comprehensive Hepatobiliary & Liver Treatment Services"
        introHtml="<a href='/treatment/' title='Expert care for liver, gallbladder, biliary, pancreatic and upper GI conditions in Dhaka'><strong>Expert care for liver, gallbladder, biliary, pancreatic, and upper gastrointestinal conditions</strong></a>—led by <a href='/about/' title='About Dr. Murshidul Arefin — fellowship-trained hepatobiliary surgeon'><strong>Dr. Murshidul Arefin</strong></a>, one of Dhaka's <a href='/best-hepatobiliary-surgeon-dhaka/' title='Top hepatobiliary and liver transplant surgeons in Dhaka'><strong>top hepatobiliary and liver transplant surgeons.</strong></a>"
        items={services}
        ariaLabel="Treatment services list"
        lightBand
      />

      {/* ============== TESTIMONIALS ============== */}
      <TestimonialsSection />

      {/* ============== FINAL CTA — shared GlobalCTABand (homepage parity) ============== */}
      <GlobalCTABand
        headingLead="Ready for "
        headingAccent="Expert Consultation?"
        body={
          <>
            <Link to="/contact/" title="Connect with Dr. Arefin — book a hepatobiliary consultation in Dhaka"><strong>Connect with Dr. Arefin</strong></Link> for a{" "}
            <Link to="/diagnosis-surgery-recovery/" title="Detailed hepatobiliary diagnosis by Dr. Arefin"><strong>detailed diagnosis</strong></Link>,{" "}
            <Link to="/about/proven-surgical-excellence/" title="Expert hepatobiliary advice — proven surgical excellence"><strong>expert advice</strong></Link>, and a{" "}
            <Link to="/diagnosis-surgery-recovery/" title="Path to recovery — diagnosis, surgery, and recovery pathway"><strong>path to recovery</strong></Link>.
          </>
        }
      />

      {/* ============== FAQ — homepage parity (FAQAccordion + mint band) ============== */}
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
    </div>
  );
};

export default TreatmentDark;
