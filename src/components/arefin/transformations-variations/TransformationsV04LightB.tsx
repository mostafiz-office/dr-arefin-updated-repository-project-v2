import { Link } from "react-router-dom";
import liverImg from "@/assets/transformation-liver-transplant.webp";
import biliaryImg from "@/assets/transformation-biliary-surgery.webp";

const renderBold = (s: string) =>
  s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

const CASES = [
  {
    img: liverImg,
    alt: "Surgical team performing a liver transplant in the operating theatre",
    no: "01",
    eyebrow: "LIVER TRANSPLANT",
    title: "Liver Transplant Triumph",
    body: "A patient with **end-stage liver disease** underwent a successful **liver transplant** led by **Dr. Arefin and his surgical team**. With precision surgery and **compassionate follow-up care**, they returned to a healthy, active life.",
    metric: "Returned to active life",
    tags: ["Precision Surgery", "Expert Team", "Compassionate Care"],
  },
  {
    img: biliaryImg,
    alt: "Dr. Arefin in the operating theatre after a successful biliary procedure",
    no: "02",
    eyebrow: "BILIARY SURGERY",
    title: "Biliary Surgery Breakthrough",
    body: "A patient with **chronic bile duct obstruction** underwent a **complex minimally invasive procedure**. The surgery **restored liver function** and completely eliminated chronic pain — a new lease on life.",
    metric: "Pain eliminated · 100%",
    tags: ["Minimally Invasive", "Faster Recovery", "Quality of Life"],
  },
];

/**
 * Transformations — Variation B · Cinematic Dark Split (zigzag)
 * Spec: spec/04-section-variations/10-transformations-04/02-transformations-04.md
 */
const TransformationsV04LightB = () => {
  return (
    <section
      className="w-full"
      style={{ background: "hsl(var(--background-deepest))" }}
      aria-labelledby="transformations-b-heading"
    >
      <div className="container max-w-[1248px] mx-auto px-6 py-14 md:py-20 lg:py-28">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span
            className="text-xs font-semibold tracking-[0.22em] uppercase"
            style={{ color: "hsl(var(--primary-light))" }}
          >
            PATIENT STORIES
          </span>
          <h2
            id="transformations-b-heading"
            className="font-arefin-heading text-fluid-h1 leading-[1.1] mt-3"
            style={{ color: "hsl(var(--primary-foreground))" }}
          >
            Inspiring Transformations
          </h2>
          <p
            className="mt-5 text-lg leading-relaxed"
            style={{ color: "hsl(var(--primary-foreground) / 0.78)" }}
          >
            Real outcomes from complex hepatobiliary and pancreatic surgery — restored lives, restored hope.
          </p>
        </div>

        <div className="space-y-16 md:space-y-24">
          {CASES.map((c, i) => {
            const reverse = i % 2 === 1;
            return (
              <article
                key={i}
                className="trB-row grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
              >
                <div
                  className={`lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}
                >
                  <div
                    className="trB-frame relative overflow-hidden"
                    style={{
                      borderRadius: "var(--radius)",
                      border: "1px solid hsl(var(--primary-foreground) / 0.10)",
                    }}
                  >
                    <div style={{ aspectRatio: "4 / 3" }}>
                      <img
                        src={c.img}
                        alt={c.alt}
                        loading="lazy"
                        className="trB-img w-full h-full object-cover"
                      />
                    </div>
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(180deg, hsl(var(--background-deepest) / 0) 55%, hsl(var(--background-deepest) / 0.55) 100%)",
                      }}
                      aria-hidden
                    />
                    <span
                      className="absolute bottom-5 left-5 font-arefin-heading text-5xl md:text-6xl leading-none"
                      style={{ color: "hsl(var(--primary-foreground))", opacity: 0.92 }}
                      aria-hidden
                    >
                      {c.no}
                    </span>
                  </div>
                </div>

                <div className={`lg:col-span-5 ${reverse ? "lg:order-1" : ""}`}>
                  <span
                    className="text-xs font-semibold tracking-[0.22em] uppercase"
                    style={{ color: "hsl(var(--primary-light))" }}
                  >
                    CASE STUDY · {c.eyebrow}
                  </span>
                  <h3
                    className="font-arefin-heading text-fluid-h2 leading-tight mt-3"
                    style={{ color: "hsl(var(--primary-foreground))" }}
                  >
                    {c.title}
                  </h3>
                  <p
                    className="mt-5 text-base md:text-lg leading-relaxed"
                    style={{ color: "hsl(var(--primary-foreground) / 0.78)" }}
                    dangerouslySetInnerHTML={{ __html: renderBold(c.body) }}
                  />

                  <div className="mt-6 flex flex-wrap gap-2">
                    <span
                      className="text-xs font-semibold px-3 py-1.5 rounded-full"
                      style={{
                        background: "hsl(var(--primary))",
                        color: "hsl(var(--primary-foreground))",
                      }}
                    >
                      ✓ {c.metric}
                    </span>
                    {c.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-3 py-1.5 rounded-full"
                        style={{
                          background: "hsl(var(--primary-foreground) / 0.08)",
                          color: "hsl(var(--primary-foreground) / 0.85)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7">
                    <Link
                      to="/articles/"
                      className="trB-cta inline-flex items-center gap-2 text-sm font-semibold"
                      style={{ color: "hsl(var(--primary-light))" }}
                    >
                      Read full story
                      <span className="trB-arrow inline-block" aria-hidden>→</span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <style>{`
        .trB-frame { transition: box-shadow 250ms ease, border-color 250ms ease; }
        .trB-row:hover .trB-frame {
          border-color: hsl(var(--primary) / 0.55);
          box-shadow: 0 0 0 1px hsl(var(--primary) / 0.40), 12px 12px 0 0 hsl(var(--primary) / 0.18);
        }
        .trB-img { transition: transform 700ms ease, filter 500ms ease; }
        .trB-row:hover .trB-img { transform: scale(1.04); }
        .trB-arrow { transition: transform 200ms ease; }
        .trB-cta:hover .trB-arrow { transform: translateX(4px); }
      `}</style>
    </section>
  );
};

export default TransformationsV04LightB;
