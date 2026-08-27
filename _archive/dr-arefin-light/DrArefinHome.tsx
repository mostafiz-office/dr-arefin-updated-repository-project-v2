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

import story1 from "@/assets/arefin-story-1.jpg";
import story2 from "@/assets/arefin-story-2.jpg";


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
    body: "After being diagnosed with **end-stage liver disease**, the patient received **expert surgical care** under Dr. Arefin's team. Today, they lead a **healthy, active life** — a true testament to the power of **precision surgery** and **compassionate follow-up care**.",
  },
  {
    img: story2,
    title: "Biliary Surgery Breakthrough",
    body: "A patient suffering from **chronic bile duct obstruction** underwent a **complex, minimally invasive procedure** performed by Dr. Arefin. The successful surgery **restored liver function**, eliminated pain, and gave the patient a **new lease on life**.",
  },
];

const renderBoldStories = (s: string) => s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

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

const DrArefinHome = () => {
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] tracking-tight [text-wrap:balance] max-w-4xl mx-auto">
              Transform Lives,{" "}
              <span className="text-primary-light italic font-bold">One Surgery</span>{" "}
              at a Time
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="arefin-band-body text-base md:text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
              Your trust and support help{" "}
              <strong>Dr. Murshidul Arefin</strong> deliver{" "}
              <strong>critical liver and hepatobiliary surgeries</strong> to{" "}
              <strong>patients who need hope the most</strong>.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="flex justify-center items-center">
              <CallBookPill />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============== SECTION 9 — INSPIRING TRANSFORMATIONS ============== */}
      <section className="arefin arefin-section-divider arefin-surface-cream py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-4">Patient Stories</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="stories-heading text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
                Inspiring <strong>Transformations</strong>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="stories-intro text-base md:text-lg leading-relaxed">
                Real stories of courage, recovery, and renewed life made possible through{" "}
                <strong>Dr. Murshidul Arefin</strong>'s expertise in{" "}
                <strong>hepatobiliary and pancreatic surgery</strong>.
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
                    <h3 className="stories-title text-xl font-semibold mb-3">{st.title}</h3>
                    <p
                      className="stories-desc text-base leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: renderBoldStories(st.body) }}
                    />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <style>{`
          /* Section heading: word-level green hover with sharp shadow */
          .arefin .stories-heading {
            color: hsl(var(--foreground));
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
            text-shadow: 1px 1px 0 hsl(var(--foreground));
          }

          /* Intro paragraph: muted base, bolded words turn green on hover */
          .arefin .stories-intro {
            color: hsl(var(--foreground) / 0.7);
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
            text-shadow: 1px 1px 0 hsl(var(--foreground));
          }

          /* Card — initiatives parity: no uplift, soft shadow + left primary border on hover */
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

          /* Image: subtle zoom on card hover (no uplift) */
          .arefin .stories-img {
            transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
          }
          .arefin .stories-card:hover .stories-img {
            transform: scale(1.04);
          }

          /* Title: green + sharp shadow on card hover */
          .arefin .stories-title {
            color: hsl(var(--foreground));
            transition: color 280ms cubic-bezier(0.22, 1, 0.36, 1),
                        text-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
          }
          .arefin .stories-card:hover .stories-title,
          .arefin .stories-card:focus-within .stories-title {
            color: hsl(var(--primary));
            text-shadow: 1px 1px 0 hsl(var(--foreground));
          }

          /* Description: muted base; bolded phrases go green per-word on hover */
          .arefin .stories-desc {
            color: hsl(var(--muted-foreground));
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
            text-shadow: 1px 1px 0 hsl(var(--foreground));
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6 leading-tight">
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
      </section>

      <DrArefinFooter />
    </div>
  );
};

export default DrArefinHome;
