import { Link } from "react-router-dom";
import { Reveal } from "@/hooks/useScrollReveal";
import type { LucideIcon } from "lucide-react";

export type TimelineV2Item = {
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
  items: TimelineV2Item[];
};

/**
 * Timeline Variation 2 — "Floating Milestone Cards with Connector Arcs"
 *
 * Design notes:
 * - Light mint band, single column, but cards float with slight alternating
 *   horizontal offset (creates a gentle S-curve down the page).
 * - Huge ghost YEAR numeral sits behind each card as a watermark
 *   (display-size, low-opacity green).
 * - SVG dashed curved arc connects each card to the next; arc "draws" via
 *   stroke-dashoffset scroll-driven animation.
 * - Icon chip sits on the card edge, pulses subtly.
 * - Card hover: 3px green left border + sharp Atto shadow + green title
 *   (no position shift). Title is a SeoLink.
 */
const TimelineV2 = ({ eyebrow, heading, subheading, items }: Props) => {
  return (
    <section
      className="tv2-section arefin-section-divider arefin-mint-band py-12 sm:py-16 md:py-24 lg:py-28"
      aria-label="Education and professional journey — Variation 2"
    >
      <div className="container">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            {eyebrow && (
              <p className="tv2-eyebrow text-xs font-semibold uppercase tracking-[0.25em] mb-4">
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2 className="tv2-heading text-fluid-h2 font-semibold leading-tight">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="tv2-sub mt-5 text-fluid-body leading-relaxed">{subheading}</p>
            )}
          </div>
        </Reveal>

        <ol className="tv2-list mx-auto" role="list">
          {items.map((it, i) => {
            const side = i % 2 === 0 ? "tv2-row--left" : "tv2-row--right";
            const isLast = i === items.length - 1;
            return (
              <li key={it.year + it.title} className={`tv2-row ${side}`}>
                <Reveal delay={80 + i * 100}>
                  <div className="tv2-row-inner">
                    <span className="tv2-ghost-year" aria-hidden="true">
                      {it.year}
                    </span>

                    <article className="tv2-card">
                      <span className="tv2-icon" aria-hidden="true">
                        <it.icon className="h-5 w-5" />
                      </span>
                      <span className="tv2-year-pill">{it.year}</span>
                      <h3 className="tv2-card-title text-fluid-h4 font-semibold">
                        <Link to={it.to} title={it.linkTitle} className="tv2-card-title-link">
                          {it.title}
                        </Link>
                      </h3>
                      <p className="tv2-card-body text-fluid-body leading-relaxed">
                        {it.body}
                      </p>
                    </article>
                  </div>
                </Reveal>

                {!isLast && (
                  <svg
                    className="tv2-arc"
                    viewBox="0 0 200 120"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      className="tv2-arc-path"
                      d={
                        i % 2 === 0
                          ? "M 30 0 C 30 60, 170 60, 170 120"
                          : "M 170 0 C 170 60, 30 60, 30 120"
                      }
                      fill="none"
                      stroke="hsl(135 80% 41%)"
                      strokeWidth="2.2"
                      strokeDasharray="6 8"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <style>{`
        .arefin.dark .tv2-eyebrow { color: hsl(150 35% 28%); }
        .arefin.dark .tv2-heading { color: hsl(150 18% 12%); }
        .arefin.dark .tv2-sub     { color: hsl(150 10% 25%); }
        .arefin.dark .tv2-sub strong { color: inherit; font-weight: inherit; }

        .arefin.dark .tv2-list {
          list-style: none;
          padding: 0;
          margin: 0 auto;
          max-width: 980px;
        }

        .arefin.dark .tv2-row { position: relative; }
        .arefin.dark .tv2-row-inner {
          position: relative;
          padding: 18px 0;
        }

        /* Ghost year watermark */
        .arefin.dark .tv2-ghost-year {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-family: inherit;
          font-weight: 900;
          font-size: clamp(5rem, 14vw, 12rem);
          line-height: 0.9;
          letter-spacing: -0.04em;
          color: hsl(135 60% 35% / 0.08);
          pointer-events: none;
          user-select: none;
          z-index: 0;
          white-space: nowrap;
        }
        .arefin.dark .tv2-row--left  .tv2-ghost-year { right: -2%; }
        .arefin.dark .tv2-row--right .tv2-ghost-year { left: -2%; }

        /* Card */
        .arefin.dark .tv2-card {
          position: relative;
          z-index: 1;
          background: hsl(0 0% 100%);
          border: 1px solid hsl(150 20% 88%);
          border-left: 3px solid transparent;
          border-radius: 16px;
          padding: 22px 24px 22px 60px;
          max-width: 560px;
          transition:
            border-color 220ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin.dark .tv2-row--left  .tv2-card { margin-left: 0; margin-right: auto; }
        .arefin.dark .tv2-row--right .tv2-card { margin-left: auto; margin-right: 0; }

        .arefin.dark .tv2-card:hover {
          border-left-color: hsl(135 80% 41%);
          box-shadow: 6px 6px 0 0 hsl(0 0% 0%);
        }

        /* Icon chip (on the card edge) */
        .arefin.dark .tv2-icon {
          position: absolute;
          top: 22px;
          left: -22px;
          width: 44px;
          height: 44px;
          border-radius: 999px;
          background: hsl(0 0% 100%);
          border: 2px solid hsl(135 80% 41%);
          color: hsl(135 90% 25%);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: 3px 3px 0 0 hsl(135 80% 41% / 0.2);
          transition:
            background-color 220ms cubic-bezier(0.22, 1, 0.36, 1),
            color 220ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin.dark .tv2-card:hover .tv2-icon {
          background: hsl(135 80% 41%);
          color: hsl(0 0% 100%);
          box-shadow: 3px 3px 0 0 hsl(0 0% 0%);
        }

        .arefin.dark .tv2-year-pill {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: hsl(135 90% 25%);
          background: hsl(135 60% 92%);
          border: 1px solid hsl(135 50% 75%);
          padding: 3px 10px;
          border-radius: 999px;
          margin-bottom: 10px;
        }

        .arefin.dark .tv2-card-title { color: hsl(150 18% 12%); margin: 0 0 8px; }
        .arefin.dark .tv2-card-title-link { color: inherit; text-decoration: none; }
        .arefin.dark .tv2-card:hover .tv2-card-title-link {
          color: hsl(135 90% 22%);
          text-shadow: 1px 0.7px 0 hsl(140 20% 75%);
        }
        .arefin.dark .tv2-card-body { color: hsl(150 10% 25%); margin: 0; }
        .arefin.dark .tv2-card-body strong { color: inherit; font-weight: inherit; }
        .arefin.dark .tv2-card-body a {
          color: inherit;
          text-decoration: none;
          transition:
            color 220ms cubic-bezier(0.22, 1, 0.36, 1),
            text-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin.dark .tv2-card-body a:hover {
          color: hsl(135 90% 22%);
          text-shadow: 1px 0.7px 0 hsl(140 20% 75%);
        }

        /* Connector arc between rows */
        .arefin.dark .tv2-arc {
          display: block;
          width: 100%;
          height: 90px;
          margin: -6px auto -6px;
          max-width: 720px;
          pointer-events: none;
        }
        .arefin.dark .tv2-arc-path {
          stroke-dasharray: 8 10;
          stroke-dashoffset: 240;
          animation: tv2-draw linear both;
          animation-timeline: view();
          animation-range: entry 0% cover 60%;
        }
        @keyframes tv2-draw {
          to { stroke-dashoffset: 0; }
        }
        @supports not (animation-timeline: view()) {
          .arefin.dark .tv2-arc-path { stroke-dashoffset: 0; }
        }

        @media (max-width: 720px) {
          .arefin.dark .tv2-row--left  .tv2-card,
          .arefin.dark .tv2-row--right .tv2-card {
            max-width: 100%;
            margin-left: 14px;
            margin-right: 0;
          }
          .arefin.dark .tv2-ghost-year {
            font-size: clamp(4rem, 22vw, 7rem);
            opacity: 0.5;
          }
          .arefin.dark .tv2-row--left  .tv2-ghost-year,
          .arefin.dark .tv2-row--right .tv2-ghost-year {
            left: auto; right: -4%;
          }
          .arefin.dark .tv2-arc { height: 56px; max-width: 100%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .arefin.dark .tv2-arc-path { animation: none; stroke-dashoffset: 0; }
        }
      `}</style>
    </section>
  );
};

export default TimelineV2;
