import { Activity, Stethoscope, HeartPulse, Microscope, ClipboardCheck, ShieldCheck, type LucideIcon } from "lucide-react";
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
  { icon: HeartPulse, title: "Pancreatic & Upper GI Surgery", desc: "Comprehensive management of **pancreatic disorders, cysts, and upper gastrointestinal diseases**, performed with precision and patient comfort in mind.", keywords: ["pancreatic disorders", "upper GI", "patient comfort"], slug: "pancreatic-cancer-surgery" },
  { icon: Microscope, title: "Laparoscopic & Minimally Invasive Surgery", desc: "State-of-the-art **keyhole surgeries** designed to **minimize scarring, shorten hospital stays**, and improve recovery time for hepatobiliary and abdominal conditions.", keywords: ["keyhole surgery", "minimize scarring", "fast recovery"], slug: "" },
  { icon: ClipboardCheck, title: "Liver Transplant Consultation & Follow-Up", desc: "Personalized **pre- and post-transplant care** to guide patients through every stage of their **liver health journey** with compassion and expert supervision.", keywords: ["pre-transplant", "post-transplant", "expert supervision"], slug: "liver-transplant-coordination-followup-care" },
  { icon: ShieldCheck, title: "Hepatology & Liver Disease Management", desc: "Comprehensive medical management for **fatty liver, hepatitis, and cirrhosis**, supported by **accurate diagnostics and evidence-based treatment plans**.", keywords: ["fatty liver", "hepatitis", "cirrhosis"], slug: "fatty-liver-surgical-intervention" },
];

const renderBold = (s: string) => s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
const link = (slug: string) => (slug ? `/treatment/#${slug}` : "/treatment/");

/**
 * Services — Variation B (Light Editorial)
 * Swiss medical-journal aesthetic. Light cards, hairline borders, sharp directional hover shadow.
 */
const ServicesV04LightB = () => {
  return (
    <section
      className="arefin relative"
      style={{ background: "hsl(var(--background))" }}
      aria-label="Comprehensive Hepatobiliary & Liver Care Services"
    >
      <div className="container max-w-[1248px] mx-auto px-6 py-14 md:py-20 lg:py-28">
        {/* Header */}
        <div className="text-center mb-14 md:mb-16 max-w-2xl mx-auto">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "hsl(var(--primary))" }}
          >
            OUR SERVICES
          </span>
          <h2
            className="font-arefin-heading text-fluid-h2 lg:text-[42px] leading-tight"
            style={{ color: "hsl(var(--foreground))", letterSpacing: "-0.02em" }}
          >
            Comprehensive Hepatobiliary & Liver Care Services
          </h2>
          <p
            className="mt-4 text-base"
            style={{ color: "hsl(var(--muted-foreground))", lineHeight: 1.75 }}
          >
            Six focused programs covering liver, gallbladder, pancreatic, and upper-GI care.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <article
                key={s.title}
                className="services-b-card relative rounded-2xl p-7 md:p-8 border transition-all duration-300"
                style={{
                  background: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                }}
              >
                {/* Top row: icon + index */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center"
                    style={{ background: "hsl(var(--accent))" }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: "hsl(var(--primary))" }}
                      strokeWidth={1.6}
                      aria-hidden
                    />
                  </div>
                  <span
                    className="text-xs font-semibold tracking-widest"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    0{services.indexOf(s) + 1}
                  </span>
                </div>

                {/* Hairline divider */}
                <span
                  className="block h-px w-full mb-5"
                  style={{ background: "hsl(var(--border))" }}
                />

                {/* Title */}
                <h3
                  className="font-arefin-heading text-lg font-semibold mb-3 leading-snug"
                  style={{ color: "hsl(var(--foreground))" }}
                >
                  <Link
                    to={link(s.slug)}
                    className="services-b-title transition-colors duration-300"
                    style={{ color: "hsl(var(--foreground))" }}
                  >
                    {s.title}
                  </Link>
                </h3>

                {/* Description */}
                <p
                  className="text-sm mb-5"
                  style={{ color: "hsl(var(--muted-foreground))", lineHeight: 1.7 }}
                  dangerouslySetInnerHTML={{ __html: renderBold(s.desc) }}
                />

                {/* Keywords inline */}
                <p
                  className="text-[11px] font-medium uppercase tracking-wider"
                  style={{ color: "hsl(var(--primary))" }}
                >
                  {s.keywords.join(" · ")}
                </p>
              </article>
            );
          })}
        </div>
      </div>

      <style>{`
        .arefin .services-b-card:hover {
          border-color: hsl(var(--primary) / 0.4);
          box-shadow: 6px 6px 0 0 hsl(var(--primary) / 0.12);
        }
        .arefin .services-b-card:hover .services-b-title {
          color: hsl(var(--primary));
        }
      `}</style>
    </section>
  );
};

export default ServicesV04LightB;
