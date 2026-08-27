import { Activity, Stethoscope, HeartPulse, Microscope, ClipboardCheck, ShieldCheck, ArrowRight, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface Service {
  icon: LucideIcon;
  title: string;
  desc: string;
  keywords: string[];
  slug: string;
}

const services: Service[] = [
  { icon: Activity, title: "Advanced Liver Surgery", desc: "Expert surgical treatment for **liver tumors, cysts, and transplant procedures** using the latest **minimally invasive and open techniques** for faster recovery and reduced complications.", keywords: ["liver tumors", "transplant", "minimally invasive"], slug: "liver-tumor-cancer-surgery" },
  { icon: Stethoscope, title: "Gallbladder & Biliary Surgery", desc: "Specialized care for **gallstones, bile duct obstructions, and biliary strictures**, ensuring precise diagnosis and safe surgical outcomes through **advanced laparoscopic procedures**.", keywords: ["gallstones", "bile duct", "laparoscopic"], slug: "gallstone-gallbladder-surgery" },
  { icon: HeartPulse, title: "Pancreatic & Upper GI Surgery", desc: "Comprehensive management of **pancreatic disorders, cysts, and upper gastrointestinal conditions** including **tumors and chronic pancreatitis**, performed with surgical precision and long-term **patient comfort and recovery** in mind.", keywords: ["pancreatic", "upper GI", "comfort"], slug: "pancreatic-cancer-surgery" },
  { icon: Microscope, title: "Laparoscopic & Minimally Invasive Surgery", desc: "State-of-the-art **keyhole surgeries** designed to **minimize scarring, shorten hospital stays**, and improve recovery time for hepatobiliary and abdominal conditions.", keywords: ["keyhole", "less scarring", "fast recovery"], slug: "" },
  { icon: ClipboardCheck, title: "Liver Transplant Consultation & Follow-Up", desc: "Personalized **pre- and post-transplant care** to guide patients through every stage of their **liver health journey** with compassion and expert supervision.", keywords: ["pre-transplant", "post-op care", "supervision"], slug: "liver-transplant-coordination-followup-care" },
  { icon: ShieldCheck, title: "Hepatology & Liver Disease Management", desc: "Comprehensive medical management for **fatty liver, hepatitis, and cirrhosis**, supported by **accurate diagnostics and evidence-based treatment plans**.", keywords: ["fatty liver", "hepatitis", "cirrhosis"], slug: "fatty-liver-surgical-intervention" },
];

const renderBold = (s: string) => s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
const link = (slug: string) => (slug ? `/treatment/#${slug}` : "/treatment/");

/**
 * Services — Variation C (Gradient Glass Showcase)
 * Premium glassmorphic cards on a primary-tinted gradient background.
 */
const ServicesV04LightC = () => {
  return (
    <section
      className="arefin arefin-section-divider relative"
      style={{
        background:
          "linear-gradient(135deg, hsl(var(--gradient-start)) 0%, hsl(var(--gradient-end)) 100%)",
      }}
      aria-label="Comprehensive Hepatobiliary & Liver Care Services"
    >
      {/* Decorative blobs — wrapped so overflow-hidden clips blobs but NOT card hover shadows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-40 blur-3xl"
          style={{ background: "hsl(var(--primary) / 0.25)" }}
        />
        <div
          className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full opacity-40 blur-3xl"
          style={{ background: "hsl(var(--primary-glow) / 0.2)" }}
        />
      </div>

      <div className="container max-w-[1248px] mx-auto px-6 py-14 md:py-20 lg:py-28 relative">
        {/* Header */}
        <div className="text-center mb-14 md:mb-16 max-w-2xl mx-auto">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-3 px-3 py-1 rounded-full"
            style={{
              background: "hsl(var(--card) / 0.7)",
              color: "hsl(var(--primary-deep))",
              backdropFilter: "blur(8px)",
            }}
          >
            WHAT WE TREAT
          </span>
          <h2
            className="services-c-heading font-arefin-heading text-fluid-h2 lg:text-[44px] leading-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Comprehensive Hepatobiliary & <strong>Liver Care Services</strong>
          </h2>
          <p
            className="services-c-intro mt-4 text-base"
            style={{ lineHeight: 1.75 }}
          >
            From routine <strong>gallbladder procedures</strong> to <strong>complex liver transplants</strong> — explore our six core service areas.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <article
                key={s.title}
                className="services-c-card group relative rounded-2xl p-7 md:p-8"
                style={{
                  background: "hsl(155 25% 8% / 0.85)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                {/* Icon disc */}
                <div
                  className="services-c-icon w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-glow)) 100%)",
                    boxShadow: "0 10px 24px -10px hsl(var(--primary) / 0.55)",
                  }}
                >
                  <Icon
                    className="w-6 h-6"
                    style={{ color: "hsl(var(--primary-foreground))" }}
                    strokeWidth={1.7}
                    aria-hidden
                  />
                </div>

                {/* Title */}
                <h3
                  className="services-c-title font-arefin-heading text-xl font-semibold mb-3 leading-snug"
                >
                  {s.title}
                </h3>

                {/* Description */}
                <p
                  className="services-c-desc text-sm mb-5"
                  dangerouslySetInnerHTML={{ __html: renderBold(s.desc) }}
                />

                {/* Keyword chips */}
                <div className="flex flex-nowrap gap-1.5 mb-6">
                  {s.keywords.map((k) => (
                    <span
                      key={k}
                      className="services-c-chip text-[11px] font-medium px-2.5 py-1 rounded-full border whitespace-nowrap"
                    >
                      {k}
                    </span>
                  ))}
                </div>

                {/* CTA pill */}
                <Link
                  to={link(s.slug)}
                  className="services-c-cta inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full border transition-all duration-300 no-underline"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>

      <style>{`
        /* ---------- Section heading: word-level green hover with sharp shadow ---------- */
        .arefin .services-c-heading {
          color: hsl(var(--foreground));
        }
        .arefin .services-c-heading strong {
          color: inherit;
          font-weight: inherit;
          cursor: default;
          transition: color 240ms cubic-bezier(0.22, 1, 0.36, 1),
                      text-shadow 240ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin .services-c-heading strong:hover {
          color: hsl(var(--primary));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* Section intro paragraph: muted base, bolded words go green on hover */
        .arefin .services-c-intro {
          color: hsl(var(--foreground) / 0.75);
        }
        .arefin .services-c-intro strong {
          color: inherit;
          font-weight: inherit;
          cursor: default;
          transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1),
                      text-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin .services-c-intro strong:hover {
          color: hsl(var(--primary));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* Card container styling + hover (border-left, box-shadow, title color)
           is owned by the canonical ATTO PROPERTY CARD HOVER block in src/index.css.
           Do not redefine .services-c-card border / box-shadow here — it would
           override the soft dark Atto drop shadow with a custom green-tinted one. */

        /* Title: green + sharp shadow on card hover */
        .arefin .services-c-title {
          color: hsl(var(--foreground));
          transition: color 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      text-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin .services-c-card:hover .services-c-title,
        .arefin .services-c-card:focus-within .services-c-title {
          color: hsl(var(--primary));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* Description: muted color base, bolded words go green per-word on hover */
        .arefin .services-c-desc {
          color: hsl(var(--muted-foreground));
          line-height: 1.7;
        }
        .arefin .services-c-desc strong {
          color: inherit;
          font-weight: inherit;
          cursor: default;
          transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1),
                      text-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin .services-c-desc strong:hover {
          color: hsl(var(--primary));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* Keyword chips */
        .arefin .services-c-chip {
          background: hsl(var(--primary) / 0.08);
          border-color: hsl(var(--primary) / 0.25);
          color: hsl(var(--primary-deep));
        }

        /* CTA pill: base state */
        .arefin .services-c-cta {
          border-color: hsl(var(--primary));
          color: hsl(var(--primary));
          background: transparent;
        }
        /* CTA pill: direct hover */
        .arefin .services-c-cta:hover {
          background: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
          box-shadow: 0 4px 14px -4px hsl(var(--primary) / 0.5);
        }
        /* CTA pill: also fills on card hover */
        .arefin .services-c-card:hover .services-c-cta {
          background: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
        }

        /* Icon disc keeps the subtle scale */
        .arefin .services-c-icon {
          transition: transform 300ms ease;
        }
        .arefin .services-c-card:hover .services-c-icon {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
};

export default ServicesV04LightC;
