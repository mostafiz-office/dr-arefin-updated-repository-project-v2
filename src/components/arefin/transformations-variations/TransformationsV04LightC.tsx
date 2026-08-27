import { Link } from "react-router-dom";
import liverImg from "@/assets/transformation-liver-transplant.webp";
import biliaryImg from "@/assets/transformation-biliary-surgery.webp";

const renderBold = (s: string) =>
  s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

const CASES = [
  {
    img: liverImg,
    alt: "Surgical team performing a liver transplant in the operating theatre",
    eyebrow: "CASE STUDY · LIVER TRANSPLANT",
    title: "Liver Transplant Triumph",
    body: "A patient with **end-stage liver disease** underwent a successful **liver transplant** led by **Dr. Arefin and his surgical team**. With precision surgery and **compassionate follow-up care**, they returned to a healthy, active life.",
    metric: "Returned to active life",
    tags: ["Precision Surgery", "Expert Team", "Compassionate Care"],
    rotate: -1.6,
    offset: "md:translate-y-6",
  },
  {
    img: biliaryImg,
    alt: "Dr. Arefin in the operating theatre after a successful biliary procedure",
    eyebrow: "CASE STUDY · BILIARY SURGERY",
    title: "Biliary Surgery Breakthrough",
    body: "A patient with **chronic bile duct obstruction** underwent a **complex minimally invasive procedure**. The surgery **restored liver function** and completely eliminated chronic pain — a new lease on life.",
    metric: "Pain eliminated · 100%",
    tags: ["Minimally Invasive", "Faster Recovery", "Quality of Life"],
    rotate: 1.4,
    offset: "md:-translate-y-6",
  },
];

/**
 * Transformations — Variation C · Tilted Polaroid Stack (tinted light)
 * Spec: spec/04-section-variations/10-transformations-04/02-transformations-04.md
 */
const TransformationsV04LightC = () => {
  return (
    <section
      className="w-full relative overflow-hidden"
      style={{ background: "hsl(var(--surface-tint-2))" }}
      aria-labelledby="transformations-c-heading"
    >
      {/* decorative blob */}
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side, hsl(var(--primary) / 0.18), hsl(var(--primary) / 0))",
        }}
      />

      <div className="container max-w-[1248px] mx-auto px-6 py-14 md:py-20 lg:py-28 relative">
        <div className="max-w-3xl mb-14">
          <span
            className="text-xs font-semibold tracking-[0.18em] uppercase"
            style={{ color: "hsl(var(--primary))" }}
          >
            PATIENT STORIES
          </span>
          <h2
            id="transformations-c-heading"
            className="font-arefin-heading text-fluid-display mt-3"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Inspiring Transformations
          </h2>
          <p
            className="mt-5 text-lg leading-relaxed max-w-2xl"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            Real outcomes from complex hepatobiliary and pancreatic surgery — restored lives, restored hope.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16">
          {CASES.map((c, i) => (
            <article
              key={i}
              className={`trC-card relative ${c.offset}`}
              style={
                {
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                  ["--rot" as string]: `${c.rotate}deg`,
                } as React.CSSProperties
              }
            >
              {/* image */}
              <div className="p-4 pb-0">
                <div
                  className="trC-imgWrap relative overflow-hidden"
                  style={{ aspectRatio: "4 / 3", borderRadius: "calc(var(--radius) - 2px)" }}
                >
                  <img
                    src={c.img}
                    alt={c.alt}
                    loading="lazy"
                    className="trC-img w-full h-full object-cover"
                  />
                  <span
                    className="absolute top-3 left-3 text-[10px] font-semibold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full"
                    style={{
                      background: "hsl(var(--card) / 0.95)",
                      color: "hsl(var(--primary))",
                      border: "1px solid hsl(var(--border))",
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    {c.eyebrow}
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-7">
                <h3
                  className="font-arefin-heading text-2xl md:text-[1.6rem] leading-tight"
                  style={{ color: "hsl(var(--foreground))" }}
                >
                  {c.title}
                </h3>
                <p
                  className="mt-3 text-[15px] leading-relaxed"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                  dangerouslySetInnerHTML={{ __html: renderBold(c.body) }}
                />

                <div className="mt-5 flex flex-wrap gap-2">
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
                        background: "hsl(var(--surface-tint-1))",
                        color: "hsl(var(--foreground) / 0.75)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 pt-5" style={{ borderTop: "1px solid hsl(var(--border))" }}>
                  <Link
                    to="/articles/"
                    className="trC-cta inline-flex items-center gap-2 text-sm font-semibold"
                    style={{ color: "hsl(var(--primary))" }}
                  >
                    Read full story
                    <span className="trC-arrow inline-block" aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .trC-card {
          transform: rotate(var(--rot, 0deg));
          transition: transform 350ms cubic-bezier(.2,.8,.2,1), box-shadow 250ms ease, border-color 250ms ease;
        }
        .trC-card:hover {
          transform: rotate(0deg);
          border-color: hsl(var(--primary) / 0.45);
          box-shadow: 10px 10px 0 0 hsl(var(--primary) / 0.18);
        }
        .trC-img { transition: transform 700ms ease, filter 500ms ease; filter: saturate(0.9); }
        .trC-card:hover .trC-img { transform: scale(1.04); filter: saturate(1.05); }
        .trC-arrow { transition: transform 200ms ease; }
        .trC-cta:hover .trC-arrow { transform: translateX(4px); }
        @media (max-width: 767px) {
          .trC-card { transform: rotate(0deg); }
        }
      `}</style>
    </section>
  );
};

export default TransformationsV04LightC;
