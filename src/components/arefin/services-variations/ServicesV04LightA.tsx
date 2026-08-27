import { Activity, Stethoscope, HeartPulse, Microscope, ClipboardCheck, ShieldCheck, ArrowUpRight, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface Service {
  icon: LucideIcon;
  title: string;
  desc: string;
  keywords: string[];
  slug: string;
}

const services: Service[] = [
  {
    icon: Activity,
    title: "Advanced Liver Surgery",
    desc: "Expert surgical treatment for **liver tumors, cysts, and transplant procedures** using the latest **minimally invasive and open techniques** for faster recovery and reduced complications.",
    keywords: ["liver tumors", "transplant", "minimally invasive"],
    slug: "liver-tumor-cancer-surgery",
  },
  {
    icon: Stethoscope,
    title: "Gallbladder & Biliary Surgery",
    desc: "Specialized care for **gallstones, bile duct obstructions, and biliary strictures**, ensuring precise diagnosis and safe surgical outcomes through **advanced laparoscopic procedures**.",
    keywords: ["gallstones", "bile duct", "laparoscopic"],
    slug: "gallstone-gallbladder-surgery",
  },
  {
    icon: HeartPulse,
    title: "Pancreatic & Upper GI Surgery",
    desc: "Comprehensive management of **pancreatic disorders, cysts, and upper gastrointestinal diseases**, performed with precision and patient comfort in mind.",
    keywords: ["pancreatic disorders", "upper GI", "patient comfort"],
    slug: "pancreatic-cancer-surgery",
  },
  {
    icon: Microscope,
    title: "Laparoscopic & Minimally Invasive Surgery",
    desc: "State-of-the-art **keyhole surgeries** designed to **minimize scarring, shorten hospital stays**, and improve recovery time for hepatobiliary and abdominal conditions.",
    keywords: ["keyhole surgery", "minimize scarring", "fast recovery"],
    slug: "",
  },
  {
    icon: ClipboardCheck,
    title: "Liver Transplant Consultation & Follow-Up",
    desc: "Personalized **pre- and post-transplant care** to guide patients through every stage of their **liver health journey** with compassion and expert supervision.",
    keywords: ["pre-transplant", "post-transplant", "expert supervision"],
    slug: "liver-transplant-coordination-followup-care",
  },
  {
    icon: ShieldCheck,
    title: "Hepatology & Liver Disease Management",
    desc: "Comprehensive medical management for **fatty liver, hepatitis, and cirrhosis**, supported by **accurate diagnostics and evidence-based treatment plans**.",
    keywords: ["fatty liver", "hepatitis", "cirrhosis"],
    slug: "fatty-liver-surgical-intervention",
  },
];

const renderBold = (s: string) => s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

const link = (slug: string) => (slug ? `/treatment/#${slug}` : "/treatment/");

/**
 * Services — Variation A (Dark Bento, spec-true)
 * Dark cards on light page; mirrors source JSON design_specs.
 */
const ServicesV04LightA = () => {
  return (
    <section
      className="arefin relative"
      style={{ background: "hsl(var(--background))" }}
      aria-label="Comprehensive Hepatobiliary & Liver Care Services"
    >
      <div className="container max-w-[1248px] mx-auto px-6 py-14 md:py-20 lg:py-28">
        {/* Header */}
        <div className="text-center mb-14 md:mb-16">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "hsl(var(--primary))" }}
          >
            OUR SERVICES
          </span>
          <h2
            className="font-arefin-heading text-fluid-h2 lg:text-[42px] leading-tight max-w-3xl mx-auto"
            style={{ color: "hsl(var(--foreground))", letterSpacing: "-0.02em" }}
          >
            Comprehensive Hepatobiliary & Liver Care Services
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.title}
                to={link(s.slug)}
                className="services-a-card group relative block rounded-2xl p-7 md:p-8 transition-all duration-300 focus:outline-none focus-visible:ring-2"
                style={{
                  background: "hsl(var(--background-deepest))",
                  // @ts-expect-error css var
                  "--tw-ring-color": "hsl(var(--primary) / 0.5)",
                }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300"
                  style={{ background: "hsl(var(--primary) / 0.15)" }}
                >
                  <Icon
                    className="w-6 h-6"
                    style={{ color: "hsl(var(--primary-glow))" }}
                    strokeWidth={1.6}
                    aria-hidden
                  />
                </div>

                {/* Title */}
                <h3
                  className="font-arefin-heading text-xl font-semibold mb-3 leading-snug"
                  style={{ color: "hsl(var(--primary-foreground))" }}
                >
                  {s.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm mb-5"
                  style={{ color: "hsl(0 0% 82%)", lineHeight: 1.7 }}
                  dangerouslySetInnerHTML={{ __html: renderBold(s.desc) }}
                />

                {/* Keyword chips */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {s.keywords.map((k) => (
                    <span
                      key={k}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                      style={{
                        background: "hsl(var(--primary) / 0.18)",
                        color: "hsl(var(--primary-light))",
                      }}
                    >
                      {k}
                    </span>
                  ))}
                </div>

                {/* Arrow indicator */}
                <span
                  className="services-a-arrow inline-flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300"
                  style={{
                    background: "hsl(var(--primary) / 0.18)",
                    color: "hsl(var(--primary-glow))",
                  }}
                  aria-hidden
                >
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <style>{`
        .arefin .services-a-card {
          box-shadow: 0 1px 2px hsl(0 0% 0% / 0.04);
        }
        .arefin .services-a-card:hover {
          box-shadow: 0 20px 40px -20px hsl(var(--primary) / 0.4),
                      0 0 0 1px hsl(var(--primary) / 0.35) inset;
        }
        .arefin .services-a-card:hover .services-a-arrow {
          background: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
        }
      `}</style>
    </section>
  );
};

export default ServicesV04LightA;
