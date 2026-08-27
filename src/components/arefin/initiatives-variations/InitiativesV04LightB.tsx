import { HeartHandshake, GraduationCap, Users, ArrowRight } from "lucide-react";

const items = [
  {
    icon: HeartHandshake,
    title: "Surgery Assistance",
    desc: "We offer guidance and support for patients in need of **complex liver, gallbladder, and pancreatic surgeries**, helping them access the right care and **financial assistance for timely treatment.**",
  },
  {
    icon: GraduationCap,
    title: "Health Education",
    desc: "Through awareness programs and liver health seminars, Dr. Arefin and his team **educate the community about early detection, lifestyle management, and prevention** of liver diseases in Bangladesh.",
  },
  {
    icon: Users,
    title: "Support Groups",
    desc: "Our patient network connects individuals and families who are undergoing **hepatobiliary or liver transplant treatments**, creating a **safe space for emotional support and recovery.**",
  },
];

const delays = ["hero-d-0", "hero-d-100", "hero-d-200"];

/**
 * Initiatives — Variation B (Elevated Cards)
 * Premium glass-morphic cards with soft shadows and rounded corners.
 * Boutique private practice aesthetic.
 */
const InitiativesV04LightB = () => {
  return (
    <section
      className="arefin relative"
      style={{ background: "hsl(var(--background))" }}
      aria-label="Our Initiatives"
    >
      <div className="container max-w-[1248px] mx-auto px-6 py-14 md:py-20 lg:py-28">
        {/* Header */}
        <div className="text-center mb-14 md:mb-18 hero-anim-fade-up hero-d-0">
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide mb-4"
            style={{
              background: "hsl(var(--accent))",
              color: "hsl(var(--primary))",
            }}
          >
            OUR PROGRAMS
          </span>
          <h2
            className="font-arefin-heading text-fluid-h2 lg:text-[42px] leading-tight"
            style={{ color: "hsl(var(--foreground))", letterSpacing: "-0.02em" }}
          >
            Our Initiatives
          </h2>
          <p
            className="mt-5 max-w-2xl mx-auto text-base leading-relaxed"
            style={{ color: "hsl(var(--muted-foreground))", lineHeight: 1.75 }}
          >
            At Dr. Murshidul Arefin&apos;s Hepatobiliary & Liver Care Center, our mission extends beyond the operation theater. We&apos;re committed to empowering patients and their families through <strong>education</strong>, <strong>compassion</strong>, and <strong>continuous support.</strong>
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <article
                key={it.title}
                className={`hero-anim-fade-up ${delays[i]} group relative p-8 rounded-2xl border transition-all duration-300`}
                style={{
                  background: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  boxShadow: "0 4px 20px -6px hsl(var(--foreground) / 0.05)",
                }}
              >
                {/* Icon Container */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--accent)), hsl(var(--secondary)))",
                  }}
                >
                  <Icon
                    className="w-7 h-7"
                    style={{ color: "hsl(var(--primary))" }}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title */}
                <h3
                  className="font-arefin-heading text-xl font-semibold mb-3"
                  style={{ color: "hsl(var(--foreground))" }}
                >
                  {it.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: "hsl(var(--muted-foreground))", lineHeight: 1.7 }}
                  dangerouslySetInnerHTML={{
                    __html: it.desc.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"),
                  }}
                />

                {/* CTA Link */}
                <a
                  href="/contact/"
                  className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 group-hover:gap-3"
                  style={{ color: "hsl(var(--primary))" }}
                >
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </a>

                {/* Hover state overlay */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    boxShadow: "0 12px 40px -10px hsl(var(--primary) / 0.15)",
                  }}
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InitiativesV04LightB;
