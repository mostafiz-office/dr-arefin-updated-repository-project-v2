import { Link } from "react-router-dom";
import { Reveal } from "@/hooks/useScrollReveal";
import type { LucideIcon } from "lucide-react";

export type TimelineV1Item = {
  year: string;
  icon: LucideIcon;
  title: string;
  to: string;
  linkTitle: string;
  body: React.ReactNode;
};

type Props = {
  eyebrow?: string;
  heading?: React.ReactNode;
  subheading?: React.ReactNode;
  items: TimelineV1Item[];
};

/**
 * Timeline Variation 1 — "Vertical Path with Animated Progress Trail"
 *
 * Design notes:
 * - Light mint band (uses arefin-mint-band tokens).
 * - Center vertical rail with a green progress line that fills on scroll
 *   (scroll-driven animation, pure CSS, no JS).
 * - Alternating left/right milestone cards on desktop; single column on mobile.
 * - Year is a large green-outline badge; circular icon marker pulses and
 *   inverts to solid green on card hover.
 * - Card uses Atto sharp shadow + 3px green left border on hover
 *   (compliant with no-hover-uplift + atto-card-hover-pattern).
 */
const TimelineV1 = ({ eyebrow, heading, subheading, items }: Props) => {
  return (
    <section
      className="tv1-section arefin-section-divider arefin-mint-band py-12 sm:py-16 md:py-24 lg:py-28"
      aria-label="Education and professional journey — Variation 1"
    >
      <div className="container">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            {eyebrow && (
              <p className="tv1-eyebrow text-xs font-semibold uppercase tracking-[0.25em] mb-4">
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2 className="tv1-heading text-fluid-h2 font-semibold leading-tight">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="tv1-sub mt-5 text-fluid-body leading-relaxed">{subheading}</p>
            )}
          </div>
        </Reveal>

        <ol className="tv1-list mx-auto" role="list">
          {/* Animated central rail */}
          <span className="tv1-rail" aria-hidden="true">
            <span className="tv1-rail-fill" aria-hidden="true" />
          </span>

          {items.map((it, i) => {
            const side = i % 2 === 0 ? "tv1-item--left" : "tv1-item--right";
            return (
              <Reveal key={it.year + it.title} delay={80 + i * 100}>
                <li className={`tv1-item ${side}`} style={{ ["--tv1-i" as never]: i }}>
                  <span className="tv1-marker" aria-hidden="true">
                    <span className="tv1-marker-ring" />
                    <it.icon className="tv1-marker-icon h-5 w-5" />
                  </span>

                  <article className="tv1-card">
                    <span className="tv1-year">{it.year}</span>
                    <h3 className="tv1-card-title text-fluid-h4 font-semibold">
                      <Link to={it.to} title={it.linkTitle} className="tv1-card-title-link">
                        {it.title}
                      </Link>
                    </h3>
                    <p className="tv1-card-body text-fluid-body leading-relaxed">{it.body}</p>
                  </article>
                </li>
              </Reveal>
            );
          })}
        </ol>
      </div>

      <style>{`
        /* ------- Section heading tokens (match About page mint band) ------- */
        .arefin.dark .tv1-eyebrow { color: hsl(150 35% 28%); }
        .arefin.dark .tv1-heading { color: hsl(150 18% 12%); }
        .arefin.dark .tv1-sub     { color: hsl(150 10% 25%); }
        .arefin.dark .tv1-sub strong { color: inherit; font-weight: inherit; }

        /* ------- List + central rail ------- */
        .arefin.dark .tv1-list {
          position: relative;
          list-style: none;
          padding: 0;
          margin: 0 auto;
          max-width: 1040px;
        }
        .arefin.dark .tv1-rail {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 28px;
          width: 3px;
          background: hsl(150 25% 80%);
          border-radius: 999px;
          overflow: hidden;
          z-index: 0;
        }
        .arefin.dark .tv1-rail-fill {
          position: absolute;
          inset: 0 0 auto 0;
          height: 0%;
          background: linear-gradient(
            180deg,
            hsl(135 80% 41%) 0%,
            hsl(135 90% 30%) 100%
          );
          border-radius: 999px;
          animation: tv1-rail-grow linear both;
          animation-timeline: view();
          animation-range: entry 0% cover 80%;
        }
        @keyframes tv1-rail-grow {
          from { height: 0%; }
          to   { height: 100%; }
        }
        /* Browsers without scroll-driven animations: keep rail visible at half */
        @supports not (animation-timeline: view()) {
          .arefin.dark .tv1-rail-fill { height: 100%; }
        }

        /* ------- Items ------- */
        .arefin.dark .tv1-item {
          position: relative;
          padding: 0 0 36px 76px;
          min-height: 96px;
        }
        .arefin.dark .tv1-item:last-child { padding-bottom: 0; }

        /* ------- Marker ------- */
        .arefin.dark .tv1-marker {
          position: absolute;
          left: 4px;
          top: 4px;
          width: 52px;
          height: 52px;
          border-radius: 999px;
          background: hsl(0 0% 100%);
          border: 2px solid hsl(135 80% 41%);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: hsl(135 90% 25%);
          transition:
            background-color 220ms cubic-bezier(0.22, 1, 0.36, 1),
            color 220ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 1;
        }
        .arefin.dark .tv1-marker-ring {
          position: absolute;
          inset: -6px;
          border-radius: 999px;
          border: 2px solid hsl(135 80% 41% / 0.45);
          opacity: 0;
          animation: tv1-pulse 2.6s ease-out infinite;
        }
        .arefin.dark .tv1-item:nth-child(2n) .tv1-marker-ring { animation-delay: 0.6s; }
        .arefin.dark .tv1-item:nth-child(3n) .tv1-marker-ring { animation-delay: 1.2s; }
        @keyframes tv1-pulse {
          0%   { transform: scale(0.9); opacity: 0.7; }
          70%  { transform: scale(1.45); opacity: 0; }
          100% { transform: scale(1.45); opacity: 0; }
        }
        .arefin.dark .tv1-item:hover .tv1-marker {
          background: hsl(135 80% 41%);
          color: hsl(0 0% 100%);
          box-shadow: 4px 4px 0 0 hsl(0 0% 0%);
        }

        /* ------- Card ------- */
        .arefin.dark .tv1-card {
          position: relative;
          background: hsl(0 0% 100%);
          border: 1px solid hsl(150 20% 88%);
          border-left: 3px solid transparent;
          border-radius: 14px;
          padding: 18px 22px 20px;
          transition:
            border-color 220ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin.dark .tv1-item:hover .tv1-card {
          border-left-color: hsl(135 80% 41%);
          box-shadow: 6px 6px 0 0 hsl(0 0% 0%);
        }
        .arefin.dark .tv1-year {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: hsl(135 90% 25%);
          background: hsl(135 60% 92%);
          border: 1px solid hsl(135 50% 75%);
          padding: 4px 10px;
          border-radius: 999px;
          margin-bottom: 10px;
        }
        .arefin.dark .tv1-card-title { color: hsl(150 18% 12%); margin: 0 0 8px; }
        .arefin.dark .tv1-card-title-link { color: inherit; text-decoration: none; }
        .arefin.dark .tv1-item:hover .tv1-card-title-link {
          color: hsl(135 90% 22%);
          text-shadow: 1px 0.7px 0 hsl(140 20% 75%);
        }
        .arefin.dark .tv1-card-body { color: hsl(150 10% 25%); margin: 0; }
        .arefin.dark .tv1-card-body strong { color: inherit; font-weight: inherit; }
        .arefin.dark .tv1-card-body a {
          color: inherit;
          text-decoration: none;
          transition:
            color 220ms cubic-bezier(0.22, 1, 0.36, 1),
            text-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin.dark .tv1-card-body a:hover {
          color: hsl(135 90% 22%);
          text-shadow: 1px 0.7px 0 hsl(140 20% 75%);
        }

        /* ------- Desktop: alternating left/right with center rail ------- */
        @media (min-width: 900px) {
          .arefin.dark .tv1-rail { left: 50%; transform: translateX(-50%); }
          .arefin.dark .tv1-item { padding: 0 0 56px 0; min-height: 120px; display: grid; }
          .arefin.dark .tv1-item--left  { grid-template-columns: 1fr 96px 1fr; }
          .arefin.dark .tv1-item--right { grid-template-columns: 1fr 96px 1fr; }
          .arefin.dark .tv1-marker {
            position: relative;
            grid-column: 2;
            left: auto;
            top: 0;
            justify-self: center;
          }
          .arefin.dark .tv1-item--left  .tv1-card { grid-column: 1; text-align: right; margin-right: 8px; }
          .arefin.dark .tv1-item--left  .tv1-card .tv1-year { float: right; clear: both; }
          .arefin.dark .tv1-item--right .tv1-card { grid-column: 3; margin-left: 8px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .arefin.dark .tv1-marker-ring { animation: none; opacity: 0; }
          .arefin.dark .tv1-rail-fill { animation: none; height: 100%; }
        }
      `}</style>
    </section>
  );
};

export default TimelineV1;
