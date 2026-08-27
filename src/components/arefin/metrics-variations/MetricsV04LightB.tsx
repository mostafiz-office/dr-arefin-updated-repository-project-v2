import CountUp from "@/components/CountUp";

const stats = [
  { end: 8, suffix: "+", separator: "", label: "Years of surgical excellence", category: "Experience" },
  { end: 800, suffix: "+", separator: "", label: "Successful HPB surgeries", category: "Clinical Volume" },
  { end: 10000, suffix: "+", separator: ",", label: "Patients treated", category: "Patient Reach" },
  { end: 80, suffix: "+", separator: "", label: "Conferences & lectures", category: "Academic" },
];

const delays = ["hero-d-0", "hero-d-100", "hero-d-200", "hero-d-300"];

/**
 * Metrics — Variation B (Elevated Cards)
 * Premium glass-morphic cards with accent stripes and category chips.
 */
const MetricsV04LightB = () => {
  return (
    <section
      className="arefin relative"
      style={{ background: "hsl(var(--background))" }}
      aria-label="Professional Impact Metrics"
    >
      <div className="container max-w-[1248px] mx-auto px-6 py-14 md:py-20 lg:py-28">
        {/* Header */}
        <div className="text-center mb-14 md:mb-18 hero-anim-fade-up hero-d-0">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "hsl(var(--primary))" }}
          >
            CLINICAL EXCELLENCE
          </span>
          <h2
            className="font-arefin-heading text-fluid-h2 lg:text-[42px] leading-tight"
            style={{ color: "hsl(var(--foreground))", letterSpacing: "-0.02em" }}
          >
            Professional Impact Metrics
          </h2>
          <p
            className="mt-4 max-w-2xl mx-auto text-base"
            style={{ color: "hsl(var(--muted-foreground))", lineHeight: 1.75 }}
          >
            Eight years of advanced <strong>liver, gallbladder, and pancreatic surgery</strong> in Dhaka, Bangladesh.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <article
              key={s.label}
              className={`metric-card hero-anim-fade-up ${delays[i]} relative overflow-hidden rounded-2xl p-6 md:p-8 transition-all duration-300`}
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
              }}
            >
              {/* Top accent stripe */}
              <span
                className="absolute top-0 left-0 right-0 h-1 transition-all duration-300"
                style={{ background: "hsl(var(--primary))" }}
                aria-hidden="true"
              />

              {/* Category chip */}
              <span
                className="inline-block text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full mb-5"
                style={{
                  background: "hsl(var(--accent))",
                  color: "hsl(var(--primary))",
                }}
              >
                {s.category}
              </span>

              {/* Numeral */}
              <CountUp
                end={s.end}
                suffix={s.suffix}
                separator={s.separator}
                className="font-arefin-heading text-fluid-h1 block leading-none"
              />

              {/* Label */}
              <p
                className="mt-4 text-sm md:text-base leading-relaxed"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                {s.label}
              </p>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .arefin .metric-card:hover {
          box-shadow: 0 8px 24px hsl(var(--primary) / 0.12);
          border-color: hsl(var(--primary) / 0.4);
        }
      `}</style>
    </section>
  );
};

export default MetricsV04LightB;
