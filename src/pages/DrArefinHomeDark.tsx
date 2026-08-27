import { Link } from "react-router-dom";
import { physicianEntity, websiteSchema, organizationSchema, buildBreadcrumbList, buildGraph } from "@/lib/structuredData";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  Phone,
  Stethoscope,
  GraduationCap,
  Users,
  HeartHandshake,
} from "lucide-react";
import DrArefinHeader, { CallBookPill } from "@/components/arefin/DrArefinHeader";
import darkLogo from "@/assets/dr-arefin-logo-dark.webp";
import DrArefinFooter from "@/components/arefin/DrArefinFooter";
import GlobalCTABand from "@/components/arefin/GlobalCTABand";
import FAQAccordion from "@/components/arefin/FAQAccordion";
import { getFaqsBySlugs } from "@/data/faqRegistry";
import HeroV04InteractiveOrgans from "@/components/arefin/hero-variations/HeroV04InteractiveOrgans";
import HomeMobileHero from "@/components/arefin/hero-variations/HomeMobileHero";
import ValuePropV04LightA from "@/components/arefin/value-prop-variations/ValuePropV04LightA";
import AboutV04LightB from "@/components/arefin/about-variations/AboutV04LightB";
import InitiativesV04LightA from "@/components/arefin/initiatives-variations/InitiativesV04LightA";
import MetricsV04LightC from "@/components/arefin/metrics-variations/MetricsV04LightC";
import StickyStackServices from "@/components/arefin/StickyStackServices";
import VideosV04LightC from "@/components/arefin/videos-variations/VideosV04LightC";
import { Reveal } from "@/hooks/useScrollReveal";
import TestimonialsSection from "@/components/arefin/TestimonialsSection";
import SectionToneValidator from "@/components/arefin/dev/SectionToneValidator";

import SeoLink from "@/components/arefin/SeoLink";
import aboutPortrait from "@/assets/arefin-about-portrait-real.webp";

import story1 from "@/assets/transformation-liver-transplant-real.webp";
import story2 from "@/assets/transformation-biliary-surgery-real.webp";

// NOTE: Dark variant of the homepage. Spec: Dr-Arefin-Spec/dark-version/
// Reuses every existing *V04Light* component — they are token-driven and
// auto-flip when the root has `arefin dark` instead of `arefin`.

const initiatives = [
  {
    icon: HeartHandshake,
    title: "Surgery Assistance",
    body: "We offer guidance and support for patients in need of complex liver, gallbladder, and pancreatic surgeries, helping them access the right care and financial assistance for timely treatment.",
  },
  {
    icon: GraduationCap,
    title: "Health Education",
    body: "Through awareness programs and liver health seminars, Dr. Arefin and his team educate the community about early detection, lifestyle management, and prevention of liver diseases in Bangladesh.",
  },
  {
    icon: Users,
    title: "Support Groups",
    body: "Our patient network connects individuals and families who are undergoing hepatobiliary or liver transplant treatments, creating a safe space for emotional support and recovery.",
  },
];

const stories = [
  {
    img: story1,
    title: "Liver Transplant Triumph",
    titleHref: "/liver-transplant-triumph/",
    titleAttr:
      "Liver transplant triumph — patient recovery story under Dr. Murshidul Arefin's hepatobiliary surgical care in Dhaka",
    body: "After being diagnosed with **end-stage liver disease**, the patient received **expert surgical care** under Dr. Arefin's team. Today, they lead a **healthy, active life** — a true testament to the power of **precision surgery** and **compassionate follow-up care**.",
  },
  {
    img: story2,
    title: "Biliary Surgery Breakthrough",
    titleHref: "/biliary-surgery-breakthrough/",
    titleAttr:
      "Biliary surgery breakthrough — minimally invasive bile duct procedure success story by Dr. Murshidul Arefin",
    body: "A patient suffering from **chronic bile duct obstruction** underwent a **complex, minimally invasive procedure** performed by Dr. Arefin. The successful surgery **restored liver function**, eliminated pain, and gave the patient a **new lease on life**.",
  },
];

const renderBoldStories = (s: string) => s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

const jsonLdString = buildGraph(
  websiteSchema,
  organizationSchema,
  { "@context": "https://schema.org", ...physicianEntity },
);

const DrArefinHomeDark = () => {
  return (
    <div className="arefin dark min-h-screen bg-background text-foreground font-arefin">
      <Helmet>
        <title>Gallbladder Expert Surgeon | MBBS | Popular, Dhaka, Bangladesh | Dr. Arifin</title>
        <meta name="description" content="Dr. Murshidul Arefin is a leading hepatobiliary and liver transplant surgeon at Popular Medical College Hospital, Dhaka. Expert in laparoscopic cholecystectomy, liver resection, pancreatic surgery, and biliary tract procedures." />
        <link rel="canonical" href="https://drarefin.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Gallbladder Expert Surgeon | MBBS | Popular, Dhaka, Bangladesh | Dr. Arifin" />
        <meta property="og:description" content="Dr. Murshidul Arefin is a leading hepatobiliary and liver transplant surgeon at Popular Medical College Hospital, Dhaka. Expert in laparoscopic cholecystectomy, liver resection, pancreatic surgery, and biliary tract procedures." />
        <meta property="og:url" content="https://drarefin.com/" />
        <meta property="og:site_name" content="Dr. Murshidul Arefin" />
        <meta property="og:locale" content="en_BD" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="preload" as="image" href={aboutPortrait} fetchPriority="high" type="image/webp" />
      </Helmet>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString }} />

      <DrArefinHeader logoSrc={darkLogo} />

      {/* ============== SECTION 1 — HERO ============== */}
      {/* Same interactive-organ hero on every viewport; the component already
          collapses to a single column with portrait-first ordering on mobile. */}
      <HeroV04InteractiveOrgans />

      {/* ============== SECTION 2 — VALUE PROPOSITION ============== */}
      <Reveal>
        <ValuePropV04LightA />
      </Reveal>

      {/* ============== SECTION 3 — ABOUT ============== */}
      <Reveal>
        <AboutV04LightB />
      </Reveal>

      {/* ============== SECTION 4 — INITIATIVES ============== */}
      <Reveal>
        <InitiativesV04LightA />
      </Reveal>

      {/* ============== SECTION 5 — RECENT VIDEOS ============== */}
      <Reveal>
        <VideosV04LightC />
      </Reveal>

      {/* ============== SECTION 6 — METRICS ============== */}
      <Reveal>
        <MetricsV04LightC />
      </Reveal>

      {/* ============== SECTION 7 — CTA BAND #1 ============== */}
      <section className="arefin-feature-band py-20 md:py-24 relative bg-background">
        <div className="container relative text-center max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-fluid-h1 font-bold mb-6 leading-[1.1] tracking-tight [text-wrap:balance] max-w-4xl mx-auto">
              Transform Lives,{" "}
              <span className="text-primary-light italic font-bold">One Surgery</span>{" "}
              at a Time
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="arefin-band-body text-fluid-lede mb-10 leading-relaxed max-w-2xl mx-auto">
              Your trust and support help{" "}
              <SeoLink to="/about/" title="About Dr. Murshidul Arefin — Hepatobiliary and Liver Transplant Surgeon" bold>Dr. Murshidul Arefin</SeoLink> deliver{" "}
              <SeoLink to="/treatment/hepatobiliary-surgery/" title="Critical hepatobiliary and liver surgery in Dhaka by Dr. Arefin" bold>critical liver and hepatobiliary surgeries</SeoLink> to{" "}
              <SeoLink to="/financial-assistance/" title="Financial assistance for patients in need" bold>patients who need hope the most</SeoLink>.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="flex justify-center items-center">
              <CallBookPill />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============== SECTION 8 — SERVICES ============== */}
      <StickyStackServices />

      {/* ============== SECTION 9 — INSPIRING TRANSFORMATIONS ============== */}
      <section className="arefin arefin-section-divider stories-section py-14 md:py-20 lg:py-28">
        <div className="container">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-4">Patient Stories</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="stories-heading text-fluid-h2 font-semibold mb-6">
                Inspiring <strong>Transformations</strong>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="stories-intro text-fluid-lede leading-relaxed">
                Real stories of courage, recovery, and renewed life made possible through{" "}
                <SeoLink to="/about/" title="About Dr. Murshidul Arefin — Hepatobiliary and Pancreatic Surgery Specialist in Dhaka" bold>Dr. Murshidul Arefin</SeoLink>'s expertise in{" "}
                <SeoLink to="/treatment/hepatobiliary-surgery/" title="Hepatobiliary and pancreatic surgery overview by Dr. Arefin" bold>hepatobiliary and pancreatic surgery</SeoLink>.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stories.map((st, i) => (
              <Reveal key={st.title} delay={i * 120}>
                <article className="stories-card group rounded-2xl overflow-hidden h-full flex flex-col">
                  <div className="stories-img-wrap aspect-[16/10] overflow-hidden">
                    <img src={st.img} alt={st.title} loading="lazy" className="stories-img w-full h-full object-cover" />
                  </div>
                  <div className="p-7 flex-1 flex flex-col">
                    <h3 className="stories-title text-fluid-h4 font-semibold mb-3">
                      <Link
                        to={st.titleHref}
                        title={st.titleAttr}
                        className="stories-title-link"
                      >
                        {st.title}
                      </Link>
                    </h3>
                    <p
                      className="stories-desc text-fluid-body leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: renderBoldStories(st.body) }}
                    />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <style>{`
          /* ───── Light-mode base (inherited from /dr-arefin) ───── */
          .arefin .stories-heading { color: hsl(var(--foreground)); }
          .arefin .stories-heading strong {
            color: inherit; font-weight: inherit; cursor: default;
            transition: color 240ms cubic-bezier(0.22, 1, 0.36, 1),
                        text-shadow 240ms cubic-bezier(0.22, 1, 0.36, 1);
          }
          .arefin .stories-heading strong:hover {
            color: hsl(var(--primary));
            text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
          }
          .arefin .stories-intro { color: hsl(var(--foreground) / 0.7); }
          .arefin .stories-intro strong {
            color: inherit; font-weight: inherit; cursor: default;
            transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1),
                        text-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
          }
          .arefin .stories-intro strong:hover {
            color: hsl(var(--primary));
            text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
          }
          .arefin .stories-card {
            position: relative;
            background: hsl(var(--card));
            border: 1px solid hsl(var(--border));
            border-left: 3px solid hsl(var(--border));
            box-shadow: 0 1px 2px hsl(var(--foreground) / 0.03);
            transition: border-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
                        box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1),
                        background-color 280ms ease;
          }
          .arefin .stories-card:hover,
          .arefin .stories-card:focus-within {
            border-color: hsl(var(--border));
            border-left-color: hsl(var(--primary));
            box-shadow: 0 8px 28px -10px hsl(var(--primary) / 0.18),
                        0 2px 6px hsl(var(--foreground) / 0.04);
          }
          .arefin .stories-img { transition: filter 600ms cubic-bezier(0.22, 1, 0.36, 1); }
          .arefin .stories-card:hover .stories-img { filter: brightness(1.05) saturate(1.08); }
          .arefin .stories-title {
            color: hsl(var(--foreground));
            transition: color 280ms cubic-bezier(0.22, 1, 0.36, 1),
                        text-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
          }
          .arefin .stories-card:hover .stories-title,
          .arefin .stories-card:focus-within .stories-title {
            color: hsl(var(--primary));
            text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
          }
          /* Title link inherits all stories-title styling — no underline, no separate color */
          .arefin .stories-title-link,
          .arefin .stories-title-link:hover {
            color: inherit;
            text-decoration: none;
          }
          .arefin .stories-title-link::after { display: none; }
          .arefin .stories-desc { color: hsl(var(--muted-foreground)); }
          .arefin .stories-desc strong {
            color: inherit; font-weight: inherit; cursor: default;
            transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1),
                        text-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
          }
          .arefin .stories-desc strong:hover {
            color: hsl(var(--primary));
            text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
          }

          /* ───── Dark-mode: keep stories DARK section, light cards (Surface Elevation) ───── */
          .arefin.dark .stories-heading { color: hsl(0 0% 95%); }
          .arefin.dark .stories-intro { color: hsl(0 0% 75%); }
          .arefin.dark .stories-intro strong { color: inherit; }

          /* Light cards on dark section per Surface Elevation rule */
          .arefin.dark .stories-card {
            background: hsl(0 0% 97%);
            border-color: hsl(140 10% 85%);
            border-left-color: hsl(140 10% 85%);
          }
          .arefin.dark .stories-title { color: hsl(150 25% 12%); }
          .arefin.dark .stories-desc { color: hsl(150 10% 25%); }
          .arefin.dark .stories-desc strong { color: inherit; }

          .arefin.dark .stories-card:hover .stories-title,
          .arefin.dark .stories-card:focus-within .stories-title {
            color: hsl(var(--primary-darker));
            text-shadow: 1px 0.7px 0 hsl(140 20% 75%);
          }
          .arefin.dark .stories-card:hover,
          .arefin.dark .stories-card:focus-within {
            border-left-color: hsl(var(--primary));
            box-shadow: 4px 4px 0 0 hsl(0 0% 0% / 0.35);
          }
        `}</style>
      </section>


      {/* ============== SECTION 10 — TESTIMONIALS ============== */}
      <Reveal>
        <TestimonialsSection />
      </Reveal>

      {/* ============== SECTION 11 — FINAL CTA ============== */}
      <Reveal>
        <GlobalCTABand
          headingLead="Ready for "
          headingAccent="Expert Consultation?"
          body={
            <>
              <strong><Link to="/about/" title="About Dr. Murshidul Arefin">Connect with Dr. Arefin</Link></strong> for a{" "}
              <strong><Link to="/treatment/" title="Hepatobiliary treatment services">detailed diagnosis</Link></strong>,{" "}
              <strong><Link to="/articles/" title="Expert articles on hepatobiliary surgery">expert advice</Link></strong>, and a{" "}
              <strong><Link to="/diagnosis-surgery-recovery/" title="Diagnosis, surgery and recovery pathway">path to recovery</Link></strong>. View our <strong><Link to="/gallery/" title="Surgical gallery">surgical gallery</Link></strong> or explore <strong><Link to="/mentorship/" title="Mentorship programs">mentorship programs</Link></strong>.
            </>
          }
        />
      </Reveal>

      {/* ============== SECTION 12 — FAQ (light mint relief band before footer) ============== */}
      <div className="home-faq-band arefin-mint-band">
        <Reveal>
        <FAQAccordion
          kicker="FAQ"
          heading="Frequently Asked Questions"
          basePath=""
          items={getFaqsBySlugs([
            "where-does-dr-arefin-see-patients",
            "what-conditions-does-dr-arefin-treat",
            "how-can-i-book-a-consultation",
            "does-dr-arefin-perform-laparoscopic-surgery",
            "do-you-offer-second-opinions",
            "is-financial-assistance-available",
          ]).map((f) => {
            // Rich Atto-style JSX answers with transition words and bolded internal links.
            const richAnswers: Record<string, React.ReactNode> = {
              "where-does-dr-arefin-see-patients": (
                <p>
                  Dr. Murshidul Arefin consults at <strong><Link to="/contact/" title="Clinic location and contact">Popular Medical College Hospital</Link></strong>, Dhanmondi, Dhaka, with patients travelling from across Bangladesh and Melbourne for specialist hepatobiliary care. Therefore, scheduling ahead is strongly recommended for new consultations. Moreover, every visit follows a structured review of imaging, blood work and prior reports for clarity. Consequently, you receive focused recommendations rather than rushed advice. However, urgent post-operative concerns are accommodated whenever possible. Additionally, the clinic offers <strong><Link to="/contact/" title="Phone and WhatsApp booking">phone and WhatsApp booking</Link></strong> at +880 1311 487 592 for fast response. Indeed, over 1,000 successful procedures speak to the trust patients place in this practice. Thus, choosing the right time slot improves the depth of your first conversation. Notably, accompanying family members are welcome during the discussion. Ultimately, an in-person review at the Dhanmondi consultation room remains the clearest first step toward treatment.
                </p>
              ),
              "what-conditions-does-dr-arefin-treat": (
                <p>
                  Dr. Arefin specialises in <strong><Link to="/treatment/" title="Full hepatobiliary treatment overview">hepatobiliary, liver, gallbladder, biliary tract and pancreatic disease</Link></strong>, covering both benign and malignant presentations. Consequently, complex referrals from general surgeons and physicians form a large share of weekly cases. Moreover, common conditions include <strong><Link to="/treatment/liver-surgery/" title="Liver surgery services">liver tumours and resections</Link></strong>, <strong><Link to="/treatment/gallbladder-surgery/" title="Gallbladder surgery services">gallstones and cholecystitis</Link></strong>, <strong><Link to="/treatment/biliary-tract-surgery/" title="Biliary tract surgery">bile duct strictures</Link></strong> and <strong><Link to="/treatment/pancreatic-surgery/" title="Pancreatic surgery services">pancreatic tumours</Link></strong>. Specifically, advanced procedures include <Link to="/treatment/whipple-procedure-dhaka/" title="Whipple procedure for pancreatic and periampullary cancer">Whipple procedure</Link>, <Link to="/treatment/liver-transplant-surgery-dhaka/" title="Liver transplant surgery in Dhaka">liver transplant surgery</Link>, <Link to="/treatment/complex-hepatic-resection/" title="Complex hepatic resection">complex hepatic resection</Link>, <Link to="/treatment/cholangiocarcinoma-surgery-dhaka/" title="Cholangiocarcinoma (bile-duct cancer) surgery">cholangiocarcinoma resection</Link>, <Link to="/treatment/pancreatic-cancer-surgery-dhaka/" title="Pancreatic cancer surgery">pancreatic cancer surgery</Link>, <Link to="/treatment/laparoscopic-cholecystectomy-dhaka/" title="Laparoscopic cholecystectomy in Dhaka">laparoscopic cholecystectomy</Link>, <Link to="/treatment/bile-duct-obstruction-surgery-dhaka/" title="Bile duct obstruction and stricture repair">bile-duct reconstruction</Link> and <Link to="/treatment/choledochal-cyst-surgery-dhaka/" title="Choledochal cyst excision">choledochal cyst excision</Link>. Therefore, each pathway uses imaging-led planning before any operative decision. However, not every patient requires surgery, and conservative routes are discussed first when appropriate. Additionally, transplant evaluation and post-transplant follow-up are part of the practice. Thus, you receive a single point of expert oversight across the full disease spectrum. Indeed, more than a decade of focused practice supports each treatment recommendation. Notably, multidisciplinary discussion with radiology and oncology is built into complex cases. Ultimately, this breadth ensures patients in Dhaka and abroad reach the right treatment without unnecessary delay.
                </p>
              ),
              "how-can-i-book-a-consultation": (
                <p>
                  Booking is straightforward — call or message <strong><Link to="/contact/" title="Booking phone and WhatsApp">+880 1311 487 592 on phone or WhatsApp</Link></strong>, or use the <strong><Link to="/contact/" title="Contact form">contact page form</Link></strong>. Therefore, slots are confirmed quickly, often within the same working day. Moreover, please bring all <strong><Link to="/second-opinion/" title="Second opinion preparation">previous reports, prescriptions and imaging</Link></strong> (USG, CT, MRI, MRCP) so the consultation stays focused. Consequently, the visit is spent on decisions rather than on retracing history. However, if your reports are digital, sharing them in advance via WhatsApp helps the team prepare. Additionally, international patients can request a pre-visit phone briefing to plan travel from Melbourne or other cities. Indeed, more than 1,000 patient journeys have been organised this way. Thus, arriving prepared shortens the path to a clear management plan. Notably, family members are welcome to join the discussion of options. Ultimately, this preparation makes your first appointment with Dr. Arefin both efficient and reassuring.
                </p>
              ),
              "does-dr-arefin-perform-laparoscopic-surgery": (
                <p>
                  Yes — whenever clinically appropriate, procedures are performed using <strong><Link to="/laparoscopic-cholecystectomy/" title="Laparoscopic cholecystectomy details">laparoscopic (key-hole) technique</Link></strong>. Therefore, patients benefit from smaller incisions, less post-operative pain and faster return to normal activity. Moreover, <strong><Link to="/treatment/gallbladder-surgery/" title="Gallbladder surgery services">laparoscopic gallbladder removal</Link></strong> is performed routinely, alongside selected liver and biliary procedures. Consequently, hospital stays are typically shorter compared with open surgery. However, key-hole surgery is not appropriate for every case, and the choice is always individualised. Additionally, the same surgeon performs both open and laparoscopic operations — there is no compromise on safety to fit a particular technique. Thus, decisions are based on tumour stage, anatomy and patient fitness rather than convenience. Indeed, advanced laparoscopic training underpins every procedure offered. Notably, recovery protocols are aligned with current international guidelines. Ultimately, the goal remains a complete, oncologically sound operation with the least disruption possible to your life.
                </p>
              ),
              "do-you-offer-second-opinions": (
                <p>
                  Absolutely — <strong><Link to="/second-opinion/" title="Second opinion service">second-opinion consultations</Link></strong> on outside imaging and biopsy reports are a routine part of the practice. Therefore, patients facing a major surgical decision are encouraged to seek confirmation before proceeding. Moreover, every review is honest and evidence-based, even when the conclusion supports the original recommendation. Consequently, you leave with clarity rather than confusion, regardless of the outcome. However, it helps to bring the actual <strong><Link to="/contact/" title="What to bring to consultation">imaging files, pathology slides and prior operative notes</Link></strong> rather than summary letters alone. Additionally, complex cases are often discussed with radiology and oncology colleagues before a final view is shared. Indeed, dozens of families each year change or reconfirm their treatment direction after this step. Thus, a second opinion is a low-risk, high-value safeguard. Notably, international guidelines actively encourage independent review for cancer and major hepatobiliary surgery. Ultimately, your treatment choice should rest on confidence, not pressure — and that is exactly what this consultation aims to provide.
                </p>
              ),
              "is-financial-assistance-available": (
                <p>
                  Yes — through dedicated <strong><Link to="/financial-assistance/" title="Patient financial assistance programme">patient initiatives</Link></strong>, support is available for selected complex liver and hepatobiliary surgeries when financial need is genuine. Therefore, no patient should abandon necessary treatment purely because of cost. Moreover, eligibility is reviewed case-by-case during the initial consultation, with documentation kept entirely confidential. Consequently, families receive a clear written estimate before any commitment is made. However, partial support is more common than full coverage, and expectations are set transparently from the outset. Additionally, the team can guide you through related <strong><Link to="/contact/" title="Hospital admission and payment options">hospital admission and payment options</Link></strong> at Popular Medical College Hospital. Indeed, this assistance pathway has helped numerous families across Dhaka access timely surgery. Thus, please raise the topic openly during your visit — there is no awkwardness in doing so. Notably, our wider <strong><Link to="/mentorship/" title="Mentorship and community work">mentorship and community work</Link></strong> reflects the same commitment to equitable care. Ultimately, financial pressure should never delay a surgery that could change the trajectory of your health.
                </p>
              ),
            };
            // T19: Title must toggle accordion (button), not navigate. Dedicated
            // FAQ-page link lives in the per-answer "Show more" CTA (T22).
            return { ...f, linkToPage: false, a: richAnswers[f.slug] ?? f.a };
          })}
        />
        </Reveal>
        <style>{`
          /* Light mint section — pin colors so heading/cards stay legible in dark theme.
             Section ↔ Card Contrast Rule: light section → dark cards. */
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

      {import.meta.env.DEV &&
        typeof window !== "undefined" &&
        new URLSearchParams(window.location.search).get("debug") === "tone" && (
          <SectionToneValidator rootSelector=".arefin.dark" />
        )}
    </div>
  );
};

export default DrArefinHomeDark;
