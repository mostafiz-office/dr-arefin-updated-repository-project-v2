import { ArrowRight } from "lucide-react";
import CountUp from "@/components/CountUp";
import SeoLink from "@/components/arefin/SeoLink";

const stats = [
  {
    end: 8,
    suffix: "+",
    separator: "",
    label: "Years of **surgical excellence**",
    category: "Experience",
    href: "/years-of-experience/",
    titleAttr:
      "8+ years of dedicated hepatobiliary, liver, gallbladder, and pancreatic surgical experience in Dhaka — Dr. Murshidul Arefin's clinical track record",
    labelHref: "/surgical-excellence-experience/",
    labelTitleAttr:
      "Years of surgical excellence in hepatobiliary, liver, gallbladder, and pancreatic surgery — Dr. Murshidul Arefin's dedicated practice in Dhaka",
  },
  {
    end: 800,
    suffix: "+",
    separator: "",
    label: "**Successful surgeries**",
    category: "Clinical Volume",
    href: "/successful-surgeries/",
    titleAttr:
      "800+ successful hepatobiliary surgeries — high clinical volume in liver, gallbladder, and pancreatic procedures performed by Dr. Murshidul Arefin in Dhaka",
    labelHref: "/successful-hepatobiliary-surgeries/",
    labelTitleAttr:
      "Successful hepatobiliary surgeries and clinical outcomes in liver, gallbladder, and pancreatic procedures by Dr. Murshidul Arefin in Dhaka",
  },
  {
    end: 10000,
    suffix: "+",
    separator: ",",
    label: "**Patients treated**",
    category: "Patient Reach",
    href: "/patients-treated-count/",
    titleAttr:
      "10,000+ patients consulted, evaluated, and treated by Dr. Murshidul Arefin's hepatobiliary and liver care practice in Dhaka",
    labelHref: "/patients-treated-care/",
    labelTitleAttr:
      "Patients treated across consultation, evaluation, surgery, and follow-up by Dr. Murshidul Arefin's hepatobiliary practice in Dhaka",
  },
  {
    end: 80,
    suffix: "+",
    separator: "",
    label: "**Conferences**",
    category: "Academic",
    href: "/conferences-presented/",
    titleAttr:
      "80+ national and international surgical conferences attended and presented at by Dr. Murshidul Arefin — active academic engagement in hepatobiliary surgery",
    labelHref: "/surgical-conferences-academic/",
    labelTitleAttr:
      "Surgical conferences and academic engagement — national and international hepatobiliary surgery presentations by Dr. Murshidul Arefin",
  },
];

const delays = ["hero-d-0", "hero-d-100", "hero-d-200", "hero-d-300"];

/**
 * Metrics — Variation C (Asymmetric Feature)
 * Hero-grade hover: cell gets soft shadow + left primary border (no uplift),
 * number + label turn primary-green with sharp 1px text-shadow on hover.
 * Heading + intro support per-word green hover on bolded phrases.
 */
const MetricsV04LightC = () => {
  return (
    <section
      className="arefin arefin-section-divider arefin-mint-band relative"
      aria-label="Professional Impact Metrics"
    >
      <div className="container max-w-[1248px] mx-auto px-6 py-14 md:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: heading + intro */}
          <div className="lg:col-span-5 hero-anim-fade-up hero-d-0">
            <span
              className="inline-block text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: "hsl(var(--primary))" }}
            >
              BY THE NUMBERS
            </span>
            <h2
              className="metric-heading font-arefin-heading text-fluid-h2 lg:text-[42px] leading-tight mb-5"
              style={{ color: "hsl(var(--foreground))", letterSpacing: "-0.02em" }}
            >
              A Decade of <strong>Hepatobiliary Expertise</strong>
            </h2>
            <p
              className="metric-intro text-base mb-6"
              style={{ color: "hsl(var(--muted-foreground))", lineHeight: 1.75 }}
            >
              <strong>Surgical authority</strong> backed by <strong>clinical volume</strong> and <strong>academic engagement</strong> across Bangladesh.
            </p>
            <a
              href="#credentials"
              className="metric-cta inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
              style={{ color: "hsl(var(--primary))" }}
            >
              View credentials
              <ArrowRight className="w-4 h-4 transition-transform duration-200" strokeWidth={2} />
            </a>
          </div>

          {/* Right: 2x2 stats grid with offset accent block */}
          <div className="lg:col-span-7 relative">
            {/* Decorative offset accent block */}
            <div
              className="hidden lg:block absolute -top-6 -right-6 bottom-6 left-6 rounded-2xl -z-10"
              style={{ background: "hsl(var(--accent))" }}
              aria-hidden="true"
            />

            <div
              className="grid grid-cols-2 gap-px rounded-2xl overflow-hidden"
              style={{ background: "hsl(var(--border))" }}
            >
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`metric-cell hero-anim-fade-up ${delays[i]} p-6 md:p-8`}
                >
                  <span
                    className="metric-category block text-[10px] font-semibold tracking-widest uppercase mb-2"
                  >
                    {s.category}
                  </span>
                  <SeoLink
                    to={s.href}
                    title={s.titleAttr}
                    className="metric-number-link block"
                  >
                    <CountUp
                      end={s.end}
                      suffix={s.suffix}
                      separator={s.separator}
                      className="metric-number font-arefin-heading text-fluid-h1 block leading-none"
                    />
                  </SeoLink>
                  <p className="metric-label mt-3 text-sm leading-relaxed">
                    <SeoLink
                      to={s.labelHref}
                      title={s.labelTitleAttr}
                      className="metric-label-link"
                    >
                      {s.label.split(/(\*\*[^*]+\*\*)/g).map((part, idx) => {
                        if (part.startsWith("**") && part.endsWith("**")) {
                          return <strong key={idx}>{part.slice(2, -2)}</strong>;
                        }
                        return <span key={idx}>{part}</span>;
                      })}
                    </SeoLink>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .arefin .metric-cta:hover svg {
          transform: translateX(4px);
        }

        .arefin [aria-label="Professional Impact Metrics"] {
          background: hsl(var(--arefin-light-mint));
        }

        /* Section is always mint — pin metrics tokens to a DARK card palette
           so cards contrast with the light-green band (Surface Elevation rule:
           light section → dark cards). Same values in light + dark mode. */
        .arefin [aria-label="Professional Impact Metrics"],
        .arefin.dark [aria-label="Professional Impact Metrics"] {
          --m-cell-bg: 160 22% 10%;          /* deep dark green-black card */
          --m-cell-divider: 160 18% 18%;     /* hairline between cells */
          --m-num-color: 0 0% 97%;           /* near-white number */
          --m-cat-color: 142 71% 50%;        /* bright green eyebrow */
          --m-label-color: 0 0% 75%;         /* muted light label */
          --m-label-strong: 0 0% 96%;        /* full-white bold words */
          --m-primary: 142 71% 45%;          /* hover green accent */
        }

        /* Divider grid uses the dark hairline (was --border which is too light) */
        .arefin [aria-label="Professional Impact Metrics"] .grid.grid-cols-2 {
          background: hsl(var(--m-cell-divider));
        }

        /* ---- Cells: dark surface, no uplift, left primary border on hover ---- */
        .arefin .metric-cell {
          position: relative;
          background: hsl(var(--m-cell-bg));
          border-left: 3px solid transparent;
          transition: border-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      background-color 280ms ease;
        }
        .arefin .metric-cell:hover,
        .arefin .metric-cell:focus-within {
          border-left-color: hsl(var(--m-primary));
          box-shadow: 4px 4px 0 0 hsl(0 0% 0% / 0.35);
          z-index: 1;
        }

        .arefin .metric-cell .metric-category {
          color: hsl(var(--m-cat-color));
          transition: color 280ms ease;
        }

        .arefin .metric-cell .metric-number {
          color: hsl(var(--m-num-color));
          font-variant-numeric: tabular-nums;
          overflow-wrap: anywhere;
          transition: color 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      text-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        /* Mobile (<640px): cap metric number so 10,000+ fits in a 2-col cell.
           Spec: Task 21 — metrics row readable type scale, no overflow. */
        @media (max-width: 639px) {
          .arefin .metric-cell { padding: 1rem; }
          .arefin .metric-cell .metric-number {
            font-size: clamp(1.5rem, 7.5vw, 2.125rem);
            line-height: 1;
          }
          .arefin .metric-cell .metric-label { font-size: 0.8125rem; }
          .arefin .metric-cell .metric-category { font-size: 9px; }
        }
        .arefin .metric-cell:hover .metric-number,
        .arefin .metric-cell:focus-within .metric-number {
          color: hsl(var(--m-primary));
          text-shadow: 1px 0.7px 0 hsl(140 20% 75%);
        }

        /* Number link wrapper: inherits color from .metric-number, no underline */
        .arefin .metric-cell .metric-number-link,
        .arefin .metric-cell .metric-number-link:hover {
          color: inherit;
          text-decoration: none;
        }
        .arefin .metric-cell .metric-number-link::after { display: none; }

        /* Label link wrapper: inherits color, no underline */
        .arefin .metric-cell .metric-label-link,
        .arefin .metric-cell .metric-label-link:hover {
          color: inherit;
          text-decoration: none;
        }
        .arefin .metric-cell .metric-label-link::after { display: none; }

        .arefin .metric-cell .metric-label {
          color: hsl(var(--m-label-color));
          transition: color 280ms ease;
        }
        .arefin .metric-cell:hover .metric-label {
          color: hsl(var(--m-label-strong));
        }
        .arefin .metric-cell .metric-label strong {
          color: inherit;
          font-weight: inherit;
          cursor: default;
          transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1),
                      text-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin .metric-cell .metric-label strong:hover {
          color: hsl(var(--m-primary));
          text-shadow: 1px 0.7px 0 hsl(140 20% 75%);
        }

        /* Heading: per-word green hover on bolded phrase */
        .arefin .metric-heading strong {
          color: inherit;
          font-weight: inherit;
          cursor: default;
          transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1),
                      text-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin .metric-heading strong:hover {
          color: hsl(var(--primary));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* Intro: per-word green hover on bolded phrases */
        .arefin .metric-intro strong {
          color: inherit;
          font-weight: inherit;
          cursor: default;
          transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1),
                      text-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin .metric-intro strong:hover {
          color: hsl(var(--primary));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }
      `}</style>
    </section>
  );
};

export default MetricsV04LightC;
