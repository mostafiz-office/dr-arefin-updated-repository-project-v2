import { Link } from "react-router-dom";
import { ReactNode } from "react";
import liverImg from "@/assets/transformation-liver-transplant.webp";
import biliaryImg from "@/assets/transformation-biliary-surgery.webp";
import SeoLink from "@/components/arefin/SeoLink";

const CASES: {
  img: string;
  alt: string;
  eyebrow: string;
  title: string;
  body: ReactNode;
  metric: string;
  tags: string[];
}[] = [
  {
    img: liverImg,
    alt: "Surgical team performing a liver transplant in the operating theatre",
    eyebrow: "CASE STUDY · LIVER TRANSPLANT",
    title: "Liver Transplant Triumph",
    body: (
      <>
        A patient with{" "}
        <SeoLink to="/end-stage-liver-disease/" title="End-stage liver disease treatment and liver transplant options by Dr. Arefin in Dhaka" bold>
          end-stage liver disease
        </SeoLink>{" "}
        underwent a successful liver transplant led by{" "}
        <SeoLink to="/about/" title="About Dr. Murshidul Arefin — Hepatobiliary and Pancreatic Surgery Specialist in Dhaka">
          Dr. Arefin and his surgical team
        </SeoLink>. With{" "}
        <strong>precision surgery</strong> and <strong>compassionate follow-up care</strong>, they returned to a healthy, active life.
      </>
    ),
    metric: "Returned to active life",
    tags: ["Precision Surgery", "Expert Team", "Compassionate Care"],
  },
  {
    img: biliaryImg,
    alt: "Dr. Arefin in the operating theatre after a successful biliary procedure",
    eyebrow: "CASE STUDY · BILIARY SURGERY",
    title: "Biliary Surgery Breakthrough",
    body: (
      <>
        A patient with{" "}
        <SeoLink to="/chronic-bile-duct-obstruction/" title="Chronic bile duct obstruction surgery and biliary reconstruction by Dr. Arefin" bold>
          chronic bile duct obstruction
        </SeoLink>{" "}
        underwent a complex{" "}
        <SeoLink to="/minimally-invasive-surgery/" title="Minimally invasive hepatobiliary surgery techniques by Dr. Arefin in Dhaka">
          minimally invasive procedure
        </SeoLink>. The surgery <strong>restored liver function</strong> and completely eliminated chronic pain — a new lease on life.
      </>
    ),
    metric: "Pain eliminated · 100%",
    tags: ["Minimally Invasive", "Faster Recovery", "Quality of Life"],
  },
];

/**
 * Transformations — Variation A · Editorial Journal (light)
 * Spec: spec/04-section-variations/10-transformations-04/02-transformations-04.md
 */
const TransformationsV04LightA = () => {
  return (
    <section
      className="w-full"
      style={{ background: "hsl(var(--background))" }}
      aria-labelledby="transformations-a-heading"
    >
      <div className="container max-w-[1248px] mx-auto px-6 py-14 md:py-20 lg:py-28">
        <div className="max-w-3xl mb-14">
          <span
            className="text-xs font-semibold tracking-[0.18em] uppercase"
            style={{ color: "hsl(var(--primary))" }}
          >
            PATIENT STORIES
          </span>
          <h2
            id="transformations-a-heading"
            className="font-arefin-heading text-fluid-display mt-3"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Inspiring Transformations
          </h2>
          <div className="w-16 h-px my-6" style={{ background: "hsl(var(--border))" }} aria-hidden />
          <p className="text-lg leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
            Real outcomes from complex hepatobiliary and pancreatic surgery — restored lives, restored hope.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CASES.map((c, i) => (
            <article
              key={i}
              className="trA-card group flex flex-col overflow-hidden"
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            >
              <div className="trA-imgWrap relative overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
                <img
                  src={c.img}
                  alt={c.alt}
                  loading="lazy"
                  className="trA-img w-full h-full object-cover"
                />
                <span
                  className="absolute top-4 left-4 text-[10px] font-semibold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full"
                  style={{
                    background: "hsl(var(--card))",
                    color: "hsl(var(--primary))",
                    border: "1px solid hsl(var(--border))",
                  }}
                >
                  {c.eyebrow}
                </span>
              </div>

              <div className="p-7 md:p-8 flex flex-col flex-1">
                <h3
                  className="font-arefin-heading text-2xl md:text-[1.75rem] leading-tight"
                  style={{ color: "hsl(var(--foreground))" }}
                >
                  {c.title}
                </h3>

                <p
                  className="mt-4 text-base leading-relaxed"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                >
                  {c.body}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span
                    className="text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{
                      background: "hsl(var(--primary) / 0.10)",
                      color: "hsl(var(--primary))",
                    }}
                  >
                    ✓ {c.metric}
                  </span>
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1.5 rounded-full"
                      style={{
                        border: "1px solid hsl(var(--border))",
                        color: "hsl(var(--muted-foreground))",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-7 pt-6" style={{ borderTop: "1px solid hsl(var(--border))" }}>
                  <Link
                    to="/articles/"
                    className="trA-cta inline-flex items-center gap-2 text-sm font-semibold"
                    style={{ color: "hsl(var(--primary))" }}
                  >
                    Read full story
                    <span className="trA-arrow inline-block" aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .trA-card { transition: box-shadow 200ms ease, border-color 200ms ease; }
        .trA-card:hover {
          border-color: hsl(var(--foreground) / 0.20);
          box-shadow: 8px 8px 0 0 hsl(var(--foreground) / 0.08);
        }
        .trA-img { filter: grayscale(100%); transition: filter 400ms ease, transform 600ms ease; }
        .trA-card:hover .trA-img { filter: grayscale(0%); transform: scale(1.03); }
        .trA-arrow { transition: transform 200ms ease; }
        .trA-cta:hover .trA-arrow { transform: translateX(4px); }
      `}</style>
    </section>
  );
};

export default TransformationsV04LightA;
