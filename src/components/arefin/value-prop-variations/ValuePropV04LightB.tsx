/**
 * Value Proposition — Variation B (LIGHT) "Card Stack with Sage Accent"
 * Spec: spec/04-section-variations/03-value-proposition-04/02-value-proposition-04.md § Variation B
 *
 * Trust-first medical card — bordered surface, sage top-rule, hover via shadow only.
 */
const items = [
  {
    num: "01",
    title: "Surgical Excellence",
    desc: "Over 7 years of hands-on experience in hepatobiliary, liver, and gallbladder surgery, Dr. Murshidul Arefin combines precision, innovation, and compassionate care to achieve the best surgical outcomes.",
  },
  {
    num: "02",
    title: "Advanced Treatment",
    desc: "Providing comprehensive care for liver, pancreas, and biliary tract diseases through both laparoscopic and open surgical techniques, ensuring safe recovery and long-term health for every patient.",
  },
  {
    num: "03",
    title: "Compassionate Care",
    desc: "Dr. Arefin believes in a patient-first philosophy — offering personalized guidance, transparent communication, and respectful treatment throughout every stage of diagnosis, surgery, and recovery.",
  },
];

const delays = ["hero-d-0", "hero-d-100", "hero-d-200"];

const ValuePropV04LightB = () => {
  return (
    <section
      className="hero-04-light-band relative"
      style={{ background: "hsl(var(--hero-light-bg))" }}
      aria-label="Value proposition — card stack"
    >
      <div className="container py-14 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {items.map((it, i) => (
            <article
              key={it.num}
              className={`hero-anim-card ${delays[i]} vp-b-card relative overflow-hidden`}
              style={{
                background: "hsl(var(--hero-light-bg))",
                border: "1px solid hsl(var(--hero-light-border))",
                borderRadius: "1rem",
                padding: "32px 28px",
                boxShadow: "0 1px 2px rgba(20,20,20,0.04)",
                transition:
                  "box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {/* Sage top accent */}
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 right-0"
                style={{
                  height: 4,
                  background: "hsl(var(--hero-light-primary))",
                  borderTopLeftRadius: "1rem",
                  borderTopRightRadius: "1rem",
                }}
              />

              <div className="flex items-center gap-2 mt-2">
                <span
                  aria-hidden="true"
                  className="inline-block rounded-full"
                  style={{
                    width: 8,
                    height: 8,
                    background: "hsl(var(--hero-light-primary))",
                  }}
                />
                <span
                  className="font-arefin"
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "hsl(var(--hero-light-primary))",
                  }}
                >
                  Step {it.num}
                </span>
              </div>

              <h3
                className="font-arefin-heading mt-4"
                style={{
                  fontSize: 20,
                  lineHeight: 1.3,
                  fontWeight: 700,
                  color: "hsl(var(--hero-light-deep))",
                }}
              >
                {it.title}
              </h3>

              <p
                className="font-arefin mt-3"
                style={{
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: "hsl(var(--hero-light-deep) / 0.7)",
                }}
              >
                {it.desc}
              </p>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .arefin .vp-b-card:hover {
          box-shadow: 0 12px 32px -16px hsl(var(--hero-light-primary) / 0.25);
          border-color: hsl(var(--hero-light-primary) / 0.4);
        }
      `}</style>
    </section>
  );
};

export default ValuePropV04LightB;
