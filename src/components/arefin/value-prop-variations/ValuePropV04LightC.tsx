/**
 * Value Proposition — Variation C (LIGHT) "Bento Numeral with Vertical Bar"
 * Spec: spec/04-section-variations/03-value-proposition-04/02-value-proposition-04.md § Variation C
 *
 * Bold, asymmetric — sage numeral + vertical bar on the left, content on the right.
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

const ValuePropV04LightC = () => {
  return (
    <section
      className="hero-04-light-band relative"
      style={{ background: "hsl(var(--hero-light-bg))" }}
      aria-label="Value proposition — bento numeral"
    >
      <div className="container py-14 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {items.map((it, i) => (
            <article
              key={it.num}
              className={`hero-anim-card ${delays[i]} vp-c-card relative`}
              style={{
                background: "hsl(var(--hero-light-surface))",
                borderRadius: "1rem",
                padding: 28,
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: 20,
                alignItems: "start",
                transition:
                  "background-color 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {/* Vertical sage bar */}
              <span
                aria-hidden="true"
                className="vp-c-bar hero-anim-bar self-stretch"
                style={{
                  width: 4,
                  background: "hsl(var(--hero-light-primary))",
                  borderRadius: 9999,
                  transformOrigin: "top",
                  transition:
                    "width 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />

              <div>
                <div
                  className="font-arefin-heading"
                  style={{
                    fontSize: 56,
                    lineHeight: 0.9,
                    letterSpacing: "-0.02em",
                    color: "hsl(var(--hero-light-primary))",
                    fontWeight: 700,
                  }}
                >
                  {it.num}
                </div>

                <h3
                  className="font-arefin-heading mt-3"
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
                  className="font-arefin mt-2.5"
                  style={{
                    fontSize: 14.5,
                    lineHeight: 1.6,
                    color: "hsl(var(--hero-light-muted))",
                  }}
                >
                  {it.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .arefin .vp-c-card:hover {
          background: hsl(var(--hero-light-bg));
        }
        .arefin .vp-c-card:hover .vp-c-bar {
          width: 6px;
        }
      `}</style>
    </section>
  );
};

export default ValuePropV04LightC;
