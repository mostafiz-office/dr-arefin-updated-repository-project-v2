import { HeartHandshake, GraduationCap, Users, ArrowRight } from "lucide-react";

const items = [
  {
    num: "01",
    icon: HeartHandshake,
    title: "Surgery Assistance",
    desc: "We offer guidance and support for patients in need of **complex liver, gallbladder, and pancreatic surgeries**, helping them access the right care and **financial assistance for timely treatment.**",
  },
  {
    num: "02",
    icon: GraduationCap,
    title: "Health Education",
    desc: "Through awareness programs and liver health seminars, Dr. Arefin and his team **educate the community about early detection, lifestyle management, and prevention** of liver diseases in Bangladesh.",
  },
  {
    num: "03",
    icon: Users,
    title: "Support Groups",
    desc: "Our patient network connects individuals and families who are undergoing **hepatobiliary or liver transplant treatments**, creating a **safe space for emotional support and recovery.**",
  },
];

const delays = ["hero-d-0", "hero-d-100", "hero-d-200"];

/**
 * Initiatives — Variation C (Feature Grid)
 * Bold asymmetric layout with prominent numbers and impact-focused presentation.
 * NGO/impact report aesthetic showing scale of community work.
 */
const InitiativesV04LightC = () => {
  return (
    <section
      className="arefin relative"
      style={{ background: "hsl(var(--background))" }}
      aria-label="Our Initiatives"
    >
      <div className="container max-w-[1248px] mx-auto px-6 py-14 md:py-20 lg:py-28">
        {/* Header — Left aligned */}
        <div className="mb-14 md:mb-18 hero-anim-fade-up hero-d-0">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "hsl(var(--primary))" }}
          >
            OUR PROGRAMS
          </span>
          <h2
            className="font-arefin-heading text-fluid-h2 lg:text-[42px] leading-tight"
            style={{ color: "hsl(var(--foreground))", letterSpacing: "-0.02em" }}
          >
            Our Initiatives
          </h2>
          {/* Accent underline */}
          <div
            className="mt-4 h-1 rounded-full"
            style={{
              width: 60,
              background: "hsl(var(--primary))",
            }}
          />
          <p
            className="mt-6 max-w-3xl text-base leading-relaxed"
            style={{ color: "hsl(var(--muted-foreground))", lineHeight: 1.75 }}
          >
            At Dr. Murshidul Arefin&apos;s Hepatobiliary & Liver Care Center, our mission extends beyond the operation theater. We&apos;re committed to empowering patients and their families through <strong>education</strong>, <strong>compassion</strong>, and <strong>continuous support.</strong>
          </p>
        </div>

        {/* Cards Grid — Slightly asymmetric with center card emphasized */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((it, i) => {
            const Icon = it.icon;
            const isCenter = i === 1;
            return (
              <article
                key={it.title}
                className={`hero-anim-fade-up ${delays[i]} group relative p-6 md:p-8 rounded-xl border transition-all duration-300 ${
                  isCenter ? "md:scale-[1.02]" : ""
                }`}
                style={{
                  background: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                }}
              >
                {/* Number + Icon row */}
                <div className="flex items-center justify-between mb-5">
                  {/* Large number */}
                  <span
                    className="font-arefin-heading text-5xl md:text-6xl font-bold transition-colors duration-300"
                    style={{
                      color: "hsl(var(--muted-foreground) / 0.25)",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {it.num}
                  </span>

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300"
                    style={{ background: "hsl(var(--accent))" }}
                  >
                    <Icon
                      className="w-6 h-6"
                      style={{ color: "hsl(var(--primary))" }}
                      strokeWidth={1.5}
                    />
                  </div>
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
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: "hsl(var(--muted-foreground))", lineHeight: 1.7 }}
                  dangerouslySetInnerHTML={{
                    __html: it.desc.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"),
                  }}
                />

                {/* CTA */}
                <a
                  href="/contact/"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
                  style={{ color: "hsl(var(--primary))" }}
                >
                  Learn more
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </article>
            );
          })}
        </div>
      </div>

      <style>{`
        .arefin .group:hover {
          background: hsl(var(--accent));
        }
        .arefin .group:hover span:first-of-type {
          color: hsl(var(--primary) / 0.6);
        }
      `}</style>
    </section>
  );
};

export default InitiativesV04LightC;
