import CountUp from "@/components/CountUp";

const stats = [
  { end: 8, suffix: "+", separator: "", label: "Years of surgical excellence", category: "EXPERIENCE" },
  { end: 800, suffix: "+", separator: "", label: "Successful surgeries", category: "CLINICAL VOLUME" },
  { end: 10000, suffix: "+", separator: ",", label: "Patients treated", category: "PATIENT REACH" },
  { end: 80, suffix: "+", separator: "", label: "Conferences", category: "ACADEMIC ENGAGEMENT" },
];

const delays = ["hero-d-0", "hero-d-100", "hero-d-200", "hero-d-300"];

/**
 * Metrics — Variation A (Editorial Banner)
 * Horizontal stat strip with thin dividers, Swiss medical-journal aesthetic.
 */
const MetricsV04LightA = () => {
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
            PROFESSIONAL IMPACT
          </span>
          <h2
            className="font-arefin-heading text-fluid-h2 lg:text-[42px] leading-tight"
            style={{ color: "hsl(var(--foreground))", letterSpacing: "-0.02em" }}
          >
            Trusted by Thousands Across Bangladesh
          </h2>
          <p
            className="mt-4 max-w-2xl mx-auto text-base"
            style={{ color: "hsl(var(--muted-foreground))", lineHeight: 1.75 }}
          >
            Numbers reflecting Dr. Arefin&apos;s commitment to hepatobiliary care.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-0">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`hero-anim-fade-up ${delays[i]} text-center md:px-6 ${
                i > 0 ? "md:border-l" : ""
              }`}
              style={{ borderColor: "hsl(var(--border) / 0.5)" }}
            >
              <span
                className="block text-[10px] font-semibold tracking-widest uppercase mb-3"
                style={{ color: "hsl(var(--primary))" }}
              >
                {s.category}
              </span>
              <CountUp
                end={s.end}
                suffix={s.suffix}
                separator={s.separator}
                className="font-arefin-heading text-5xl md:text-6xl lg:text-7xl block"
              />
              <p
                className="mt-3 text-sm md:text-base leading-relaxed"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsV04LightA;
