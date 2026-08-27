/**
 * Value Proposition — Variation A (LIGHT) "Minimalist Numerals"
 * Spec: spec/04-section-variations/03-value-proposition-04/02-value-proposition-04.md § Variation A
 *
 * Editorial / Swiss minimal — oversized sage numerals + hero-grade typography
 * and hero-grade hover states (primary-green title + sharp zero-blur shadow).
 */
import SeoLink from "@/components/arefin/SeoLink";

const items = [
  {
    num: "01",
    title: "Surgical Excellence",
    titleHref: "/surgical-excellence/",
    titleSeoTitle:
      "Surgical excellence in hepatobiliary, liver, and gallbladder surgery in Dhaka — 7+ years of operative experience by Dr. Murshidul Arefin",
    desc: (
      <>
        Over{" "}
        <SeoLink to="/years-of-experience/" title="Over 7 years of focused hepatobiliary, liver, and gallbladder surgical experience by Dr. Murshidul Arefin in Dhaka" bold>
          7+ years
        </SeoLink>{" "}
        of hands-on experience in{" "}
        <SeoLink to="/treatment/hepatobiliary-surgery/" title="Hepatobiliary, liver, and gallbladder surgery in Dhaka — fellowship-trained subspecialty by Dr. Murshidul Arefin" bold>
          hepatobiliary, liver, and gallbladder surgery
        </SeoLink>
        . Dr. Murshidul Arefin combines precision, innovation, and compassionate
        care to achieve the best possible surgical outcomes.
      </>
    ),
  },
  {
    num: "02",
    title: "Advanced Treatment",
    titleHref: "/advanced-hepatobiliary-treatment/",
    titleSeoTitle:
      "Advanced hepatobiliary treatment in Dhaka — laparoscopic and open surgical care for liver, pancreas, and biliary tract disease by Dr. Arefin",
    desc: (
      <>
        Comprehensive care for{" "}
        <SeoLink to="/liver-pancreas-biliary-tract/" title="Surgery for liver, pancreas, and biliary tract diseases in Dhaka — unified hepatopancreatobiliary practice by Dr. Arefin" bold>
          liver, pancreas, and biliary tract
        </SeoLink>{" "}
        diseases through both{" "}
        <SeoLink to="/treatment/laparoscopic-surgery/" title="Laparoscopic minimally invasive hepatobiliary surgery in Dhaka by Dr. Murshidul Arefin" bold>
          laparoscopic
        </SeoLink>{" "}
        and{" "}
        <SeoLink to="/open-surgical-techniques/" title="Open surgical techniques for complex hepatobiliary, liver, and pancreas resections in Dhaka by Dr. Arefin" bold>
          open surgical
        </SeoLink>{" "}
        techniques — ensuring safe recovery and long-term health for every
        patient.
      </>
    ),
  },
  {
    num: "03",
    title: "Compassionate Care",
    titleHref: "/compassionate-patient-care/",
    titleSeoTitle:
      "Compassionate patient care from Dr. Murshidul Arefin — personalized guidance, transparent communication, and respectful treatment through diagnosis, surgery, and recovery",
    desc: (
      <>
        A{" "}
        <SeoLink to="/patient-first-philosophy/" title="A patient-first surgical philosophy — informed consent, transparent options, and continuity of care by Dr. Murshidul Arefin" bold>
          patient-first philosophy
        </SeoLink>{" "}
        — offering personalized guidance, transparent communication, and
        respectful treatment throughout every stage of{" "}
        <SeoLink to="/diagnosis-surgery-recovery/" title="End-to-end hepatobiliary care pathway in Dhaka — diagnosis, surgical planning, operation, and structured recovery by Dr. Arefin" bold>
          diagnosis, surgery, and recovery
        </SeoLink>
        .
      </>
    ),
  },
];

const delays = ["hero-d-0", "hero-d-100", "hero-d-200"];

const ValuePropV04LightA = () => {
  return (
    <section
      className="hero-04-light-band arefin-section-divider arefin-mint-band relative z-10"
      style={{ background: "#E2F8E7" }}
      aria-label="Value proposition — minimalist numerals"
    >
      <div className="container pt-10 pb-14 md:pt-14 md:pb-24 lg:pt-16 lg:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {items.map((it, i) => (
            <article
              key={it.num}
              className={`vp-a-card hero-anim-fade-up ${delays[i]} group ${
                i > 0 ? "md:border-l md:pl-10" : ""
              }`}
            >
              <div
                className="vp-a-num font-arefin-heading"
                aria-hidden="true"
              >
                {it.num}
              </div>

              <span aria-hidden="true" className="vp-a-bar" />

              <h3 className="vp-a-title font-arefin-heading">
                <SeoLink to={it.titleHref} title={it.titleSeoTitle} className="vp-a-title-link">
                  {it.title}
                </SeoLink>
              </h3>

              <p className="vp-a-desc font-arefin">
                {it.desc}
              </p>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        /* Section is always light mint — pin colors to light values regardless of theme */
        .arefin .hero-04-light-band,
        .arefin.dark .hero-04-light-band {
          --vp-a-num-color: 142 71% 38%;
          --vp-a-title-color: 0 0% 8%;
          --vp-a-desc-color: 0 0% 30%;
          --vp-a-primary: 142 71% 38%;
          --vp-a-border: 140 20% 78%;
        }
        .arefin .hero-04-light-band .vp-a-card { border-color: hsl(var(--vp-a-border)); }

        /* Dark-mode overrides — beat .arefin.dark .vp-a-num (white) and
           .arefin .hero-04-light-band h3 (near-white) from index.css. */
        .arefin.dark .hero-04-light-band .vp-a-num {
          color: hsl(var(--vp-a-num-color));
          text-shadow: none;
        }
        .arefin.dark .hero-04-light-band h3.vp-a-title {
          color: hsl(var(--vp-a-title-color));
        }
        .arefin.dark .hero-04-light-band .group:hover .vp-a-num,
        .arefin.dark .hero-04-light-band .group:focus-within .vp-a-num,
        .arefin.dark .hero-04-light-band .group:hover h3.vp-a-title,
        .arefin.dark .hero-04-light-band .group:focus-within h3.vp-a-title {
          color: hsl(var(--vp-a-primary));
          text-shadow: 1px 0.7px 0 hsl(140 20% 75%);
        }
        .arefin.dark .hero-04-light-band .vp-a-desc { color: hsl(var(--vp-a-desc-color)); }
        .arefin.dark .hero-04-light-band .vp-a-desc strong:hover {
          color: hsl(var(--vp-a-primary));
          text-shadow: 1px 0.7px 0 hsl(140 20% 75%);
        }

        .arefin .vp-a-num {
          font-size: 84px;
          line-height: 1;
          letter-spacing: -0.04em;
          color: hsl(var(--vp-a-num-color));
          font-weight: 800;
          transition: color 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      text-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin .group:hover .vp-a-num,
        .arefin .group:focus-within .vp-a-num {
          color: hsl(var(--vp-a-primary));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        .arefin .vp-a-bar {
          display: block;
          margin-top: 14px;
          width: 32px;
          height: 2px;
          border-radius: 9999px;
          background: hsl(var(--vp-a-primary));
          transition: width 320ms cubic-bezier(0.22, 1, 0.36, 1),
                      background-color 280ms ease;
        }
        .arefin .group:hover .vp-a-bar { width: 64px; }

        .arefin .vp-a-title {
          margin-top: 22px;
          font-size: 24px;
          line-height: 1.25;
          color: hsl(var(--vp-a-title-color));
          font-weight: 700;
          letter-spacing: -0.01em;
          transition: color 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      text-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin .group:hover .vp-a-title,
        .arefin .group:focus-within .vp-a-title {
          color: hsl(var(--vp-a-primary));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }
        /* T01: title is a SeoLink — inherit color/weight, no underline; hover handled by .vp-a-title rules above */
        .arefin .vp-a-title-link,
        .arefin .vp-a-title-link:visited {
          color: inherit;
          text-decoration: none;
          background: none;
        }
        .arefin .vp-a-title-link:hover,
        .arefin .vp-a-title-link:focus-visible {
          color: inherit;
          text-decoration: none;
        }

        .arefin .vp-a-desc {
          margin-top: 14px;
          font-size: 16px;
          line-height: 1.7;
          color: hsl(var(--vp-a-desc-color));
          letter-spacing: 0.005em;
        }
        @media (min-width: 768px) {
          .arefin .vp-a-desc { font-size: 17px; line-height: 1.75; }
        }
        .arefin .vp-a-desc strong {
          color: inherit;
          font-weight: inherit;
          cursor: default;
          transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1),
                      text-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin .vp-a-desc strong:hover {
          color: hsl(var(--vp-a-primary));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }
      `}</style>
    </section>
  );
};

export default ValuePropV04LightA;
