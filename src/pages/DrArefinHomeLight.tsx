import { Link } from "react-router-dom";
import {
  ArrowRight,
  Phone,
  Stethoscope,
  ShieldCheck,
  GraduationCap,
  Users,
  HeartHandshake,
} from "lucide-react";
import DrArefinHeader, { CallBookPill } from "@/components/arefin/DrArefinHeader";
import DrArefinFooter from "@/components/arefin/DrArefinFooter";
import SlideButton from "@/components/arefin/SlideButton";
import HeroV04LightA from "@/components/arefin/hero-variations/HeroV04LightA";
import ValuePropV04LightA from "@/components/arefin/value-prop-variations/ValuePropV04LightA";
import AboutV04LightB from "@/components/arefin/about-variations/AboutV04LightB";
import InitiativesV04LightA from "@/components/arefin/initiatives-variations/InitiativesV04LightA";
import MetricsV04LightC from "@/components/arefin/metrics-variations/MetricsV04LightC";
import ServicesV04LightC from "@/components/arefin/services-variations/ServicesV04LightC";
import VideosV04LightC from "@/components/arefin/videos-variations/VideosV04LightC";
import { Reveal } from "@/hooks/useScrollReveal";
import SeoLink from "@/components/arefin/SeoLink";
import { Fragment, type ReactNode } from "react";

import story1 from "@/assets/transformation-liver-transplant-real.webp";
import story2 from "@/assets/transformation-biliary-surgery-real.webp";


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



interface StoryPhrase {
  /** Exact bolded text in body (without ** markers) */
  phrase: string;
  href: string;
  title: string;
}

const stories: Array<{
  img: string;
  title: string;
  titleHref: string;
  titleAttr: string;
  body: string;
  phrases: StoryPhrase[];
}> = [
  {
    img: story1,
    title: "Liver Transplant Triumph",
    titleHref: "/liver-transplant-triumph/",
    titleAttr:
      "Liver transplant triumph — patient recovery story under Dr. Murshidul Arefin's hepatobiliary surgical care in Dhaka",
    body: "After being diagnosed with **end-stage liver disease**, the patient received **expert surgical care** under Dr. Arefin's team. Today, they lead a **healthy, active life** — a true testament to the power of **precision surgery** and **compassionate follow-up care**.",
    phrases: [
      { phrase: "end-stage liver disease", href: "/end-stage-liver-disease/", title: "End-stage liver disease — diagnosis, evaluation, and surgical management options in Dhaka" },
      { phrase: "expert surgical care", href: "/expert-surgical-care/", title: "Expert surgical care for hepatobiliary patients — Dr. Murshidul Arefin's team in Dhaka" },
      { phrase: "healthy, active life", href: "/healthy-active-life-after-surgery/", title: "Healthy, active life after liver and hepatobiliary surgery — patient recovery outcomes" },
      { phrase: "precision surgery", href: "/precision-hepatobiliary-surgery/", title: "Precision hepatobiliary surgery — meticulous technique for liver and biliary procedures" },
      { phrase: "compassionate follow-up care", href: "/compassionate-follow-up-care/", title: "Compassionate post-operative follow-up care for hepatobiliary surgery patients in Dhaka" },
    ],
  },
  {
    img: story2,
    title: "Biliary Surgery Breakthrough",
    titleHref: "/biliary-surgery-breakthrough/",
    titleAttr:
      "Biliary surgery breakthrough — minimally invasive bile duct procedure success story by Dr. Murshidul Arefin",
    body: "A patient suffering from **chronic bile duct obstruction** underwent a **complex, minimally invasive procedure** performed by Dr. Arefin. The successful surgery **restored liver function**, eliminated pain, and gave the patient a **new lease on life**.",
    phrases: [
      { phrase: "chronic bile duct obstruction", href: "/chronic-bile-duct-obstruction/", title: "Chronic bile duct obstruction — causes, diagnosis, and surgical treatment in Dhaka" },
      { phrase: "complex, minimally invasive procedure", href: "/complex-minimally-invasive-procedure/", title: "Complex minimally invasive bile duct surgery — laparoscopic hepatobiliary procedures" },
      { phrase: "restored liver function", href: "/restored-liver-function/", title: "Restored liver function after biliary surgery — measurable patient recovery outcomes" },
      { phrase: "new lease on life", href: "/new-lease-on-life/", title: "New lease on life after hepatobiliary surgery — patient transformation stories" },
    ],
  },
];

/** Render story body, wrapping each **phrase** with its mapped SeoLink. */
const renderStoryBody = (body: string, phrases: StoryPhrase[]): ReactNode => {
  const parts = body.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const inner = part.slice(2, -2);
      const match = phrases.find((p) => p.phrase === inner);
      if (match) {
        return (
          <SeoLink key={idx} to={match.href} title={match.title} bold>
            {inner}
          </SeoLink>
        );
      }
      return <strong key={idx}>{inner}</strong>;
    }
    return <Fragment key={idx}>{part}</Fragment>;
  });
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Physician",
  name: "Dr. Murshidul Arefin",
  alternateName: "Dr. M Arefin",
  medicalSpecialty: ["Hepatobiliary Surgery", "Liver Transplant Surgery", "Pancreatic Surgery", "Laparoscopic Surgery"],
  url: "https://drarefin.com/",
  telephone: "+8801311487592",
  image: "https://drarefin.com/wp-content/uploads/2026/04/logos.png",
  worksFor: {
    "@type": "Hospital",
    name: "Popular Medical College Hospital",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Dhanmondi",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
  },
};

const DrArefinHomeLight = () => {
  return (
    <div className="arefin min-h-screen bg-background text-foreground font-arefin">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <DrArefinHeader />

      {/* ============== SECTION 1 — HERO (Variation A from /hero-variations) ============== */}
      <HeroV04LightA />

      {/* ============== SECTION 2 — VALUE PROPOSITION (Variation A — Minimalist Numerals) ============== */}
      <ValuePropV04LightA />

      {/* ============== SECTION 3 — ABOUT (Variation B) ============== */}
      <AboutV04LightB />

      {/* ============== SECTION 4 — INITIATIVES (Variation A — Editorial Minimal) ============== */}
      <InitiativesV04LightA />

      {/* ============== SECTION 5 — METRICS (Variation C — Asymmetric Feature) ============== */}
      <MetricsV04LightC />

      {/* ============== SECTION 6 — RECENT VIDEOS (dynamic, links to internal /video/:slugId pages) ============== */}
      <VideosV04LightC />

      {/* ============== SECTION 7 — SERVICES (Variation C — Gradient Glass Showcase) ============== */}
      <ServicesV04LightC />

      {/* ============== SECTION 8 — CTA BAND #1 ============== */}
      <section className="arefin-feature-band py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(ellipse at 30% 50%, hsl(var(--primary) / 0.35), transparent 60%), radial-gradient(ellipse at 70% 50%, hsl(var(--primary-glow) / 0.25), transparent 50%)",
            }}
          />
        </div>
        <div className="container relative text-center max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-fluid-h1 font-bold mb-6 leading-[1.1] tracking-tight [text-wrap:balance] max-w-4xl mx-auto">
              Transform Lives,{" "}
              <span className="text-primary-light italic font-bold">One Surgery</span>{" "}
              at a Time
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="arefin-band-body text-base md:text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
              Your trust and support help{" "}
              <SeoLink to="/dr-murshidul-arefin/" title="About Dr. Murshidul Arefin — hepatobiliary surgeon in Dhaka" bold>Dr. Murshidul Arefin</SeoLink> deliver{" "}
              <SeoLink to="/critical-liver-surgery/" title="Critical liver surgery — complex hepatic procedures by Dr. Arefin" bold>critical liver</SeoLink> and{" "}
              <SeoLink to="/hepatobiliary-surgery/" title="Hepatobiliary surgery — liver, gallbladder, and bile duct surgical care" bold>hepatobiliary surgeries</SeoLink> to{" "}
              <SeoLink to="/patients-who-need-hope/" title="Hepatobiliary care for patients who need hope the most" bold>patients who need hope the most</SeoLink>.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="flex justify-center items-center">
              <CallBookPill />
            </div>
          </Reveal>
        </div>
        <style>{`
          /* T15: All body text in this dark CTA band shares the SAME exact white
             at rest. Links/strongs only differ on hover (green + shadow). */
          .arefin-feature-band .arefin-band-body,
          .arefin-feature-band .arefin-band-body strong,
          .arefin-feature-band .arefin-band-body .seo-link {
            color: hsl(0 0% 100%);
            font-weight: inherit;
          }
          .arefin-feature-band .arefin-band-body .seo-link {
            text-decoration: none;
            cursor: pointer;
            transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1),
                        text-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
          }
          .arefin-feature-band .arefin-band-body .seo-link:hover,
          .arefin-feature-band .arefin-band-body .seo-link:focus-visible {
            color: hsl(var(--primary));
            text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
            text-decoration: none;
          }
        `}</style>
      </section>

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
              <p className="stories-intro text-base md:text-lg leading-relaxed">
                Real stories of courage, recovery, and renewed life made possible through{" "}
                <SeoLink
                  to="/dr-murshidul-arefin/"
                  title="Dr. Murshidul Arefin — Dhaka's leading hepatobiliary, liver, gallbladder, and pancreatic surgeon at Popular Medical College Hospital"
                  bold
                >
                  Dr. Murshidul Arefin
                </SeoLink>
                's expertise in{" "}
                <SeoLink
                  to="/hepatobiliary-pancreatic-surgery/"
                  title="Hepatobiliary and pancreatic surgery — liver, gallbladder, bile duct, and pancreas surgical care by Dr. Murshidul Arefin in Dhaka"
                  bold
                >
                  hepatobiliary and pancreatic surgery
                </SeoLink>
                .
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
                      <SeoLink
                        to={st.titleHref}
                        title={st.titleAttr}
                        className="stories-title-link"
                      >
                        {st.title}
                      </SeoLink>
                    </h3>
                    <p className="stories-desc text-base leading-relaxed">
                      {renderStoryBody(st.body, st.phrases)}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <style>{`
          /* Section: light green background */
          .stories-section {
            background: hsl(140 35% 93%);
          }

          /* Section heading */
          .arefin .stories-heading {
            color: hsl(220 15% 15%);
          }
          .arefin .stories-heading strong {
            color: inherit;
            font-weight: inherit;
            cursor: default;
            transition: color 240ms cubic-bezier(0.22, 1, 0.36, 1),
                        text-shadow 240ms cubic-bezier(0.22, 1, 0.36, 1);
          }
          .arefin .stories-heading strong:hover {
            color: hsl(var(--primary));
            text-shadow: 1px 1px 0 hsl(220 15% 15%);
          }

          /* Intro paragraph */
          .arefin .stories-intro {
            color: hsl(220 10% 35%);
          }
          .arefin .stories-intro strong {
            color: inherit;
            font-weight: inherit;
            cursor: default;
            transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1),
                        text-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
          }
          .arefin .stories-intro strong:hover {
            color: hsl(var(--primary));
            text-shadow: 1px 1px 0 hsl(220 15% 15%);
          }

          /* Card — light on light green */
          .arefin .stories-card {
            position: relative;
            background: hsl(0 0% 99%);
            border: 1px solid hsl(140 15% 82%);
            border-left: 3px solid hsl(140 15% 82%);
            box-shadow: 0 1px 2px hsl(0 0% 0% / 0.06);
            transition: border-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
                        box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
          }
          .arefin .stories-card:hover,
          .arefin .stories-card:focus-within {
            border-color: hsl(140 15% 72%);
            border-left-color: hsl(var(--primary));
            box-shadow: 4px 0 0 0 hsl(var(--primary)),
                        0 8px 28px -10px hsl(0 0% 0% / 0.12);
          }

          /* Image: subtle zoom on card hover */
          .arefin .stories-img {
            transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
          }
          .arefin .stories-card:hover .stories-img {
            transform: scale(1.04);
          }

          /* Title: dark text on light card */
          .arefin .stories-title {
            color: hsl(150 20% 15%);
            transition: color 280ms cubic-bezier(0.22, 1, 0.36, 1),
                        text-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
          }
          .arefin .stories-card:hover .stories-title,
          .arefin .stories-card:focus-within .stories-title {
            color: hsl(var(--primary-darker));
            text-shadow: 1px 1px 0 hsl(140 20% 75%);
          }

          /* Title link wrapper: inherit color, no underline */
          .arefin .stories-title-link,
          .arefin .stories-title-link:hover {
            color: inherit;
            text-decoration: none;
          }
          .arefin .stories-title-link::after { display: none; }

          /* Description: muted dark text on light card */
          .arefin .stories-desc {
            color: hsl(150 10% 35%);
          }
          .arefin .stories-desc strong {
            color: inherit;
            font-weight: inherit;
            cursor: default;
            transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1),
                        text-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
          }
          .arefin .stories-desc strong:hover {
            color: hsl(var(--primary));
            text-shadow: 1px 1px 0 hsl(140 20% 75%);
          }
        `}</style>
      </section>


      {/* ============== SECTION 11 — FINAL CTA ============== */}
      <section className="arefin-section-divider py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-25"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, hsl(var(--primary) / 0.3), transparent 60%)",
            }}
          />
        </div>
        <div className="container relative text-center max-w-3xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/15 mb-6">
              <Stethoscope className="h-8 w-8 text-primary" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-fluid-h2 font-semibold text-foreground mb-6 leading-tight">
              Ready for <span className="text-primary">Expert Consultation?</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="final-cta-body text-base md:text-lg text-foreground/70 mb-10 leading-relaxed">
              <strong>Connect with Dr. Arefin</strong> for a{" "}
              <strong>detailed diagnosis</strong>,{" "}
              <strong>expert advice</strong>, and a{" "}
              <strong>path to recovery</strong>.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/dr-arefin/contact"
                className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-primary text-primary-foreground font-semibold text-base shadow-lg shadow-primary/20 hover:[filter:brightness(1.1)] transition-[filter] duration-300"
              >
                Book an Appointment <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="tel:+8801311487592"
                className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-card border border-border text-foreground font-semibold text-base hover:border-primary hover:text-primary transition-colors duration-300"
              >
                <Phone className="h-5 w-5" /> +880 1311 487 592
              </a>
            </div>
          </Reveal>
        </div>
        <style>{`
          .final-cta-body strong,
          .final-cta-body a,
          .final-cta-body strong a {
            color: inherit;
            font-weight: inherit;
            text-decoration: none;
            cursor: pointer;
            transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1),
                        text-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
          }
          .final-cta-body a:hover,
          .final-cta-body strong:hover,
          .final-cta-body strong a:hover {
            color: hsl(var(--primary));
            text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
          }
        `}</style>
      </section>

      <DrArefinFooter />
    </div>
  );
};

export default DrArefinHomeLight;
