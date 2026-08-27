import { Link } from "react-router-dom";
import { Reveal } from "@/hooks/useScrollReveal";
import type { LucideIcon } from "lucide-react";
import { useId } from "react";

export type TimelineV3Item = {
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
  items: TimelineV3Item[];
};

/**
 * Timeline Variation 3 — "Interactive Year Tabs + Animated Detail Card"
 *
 * Design notes:
 * - Light mint band, horizontal year pill rail (click to switch), big animated
 *   detail card below.
 * - Pure CSS state via hidden radio inputs + sibling selectors (no JS).
 * - Active year pill: solid green fill, white text, sharp Atto shadow.
 * - Detail card slides up + fades in on activation (CSS keyframe restart via
 *   :checked sibling selector).
 * - Auto-progress bar under tabs animates a horizontal fill that "ticks"
 *   between years on its own; user click resets it.
 * - Card title is a SeoLink; no hover uplift.
 */
const TimelineV3 = ({ eyebrow, heading, subheading, items }: Props) => {
  const rid = useId().replace(/[:]/g, "");
  const name = `tv3-${rid}`;

  return (
    <section
      className="tv3-section arefin-section-divider arefin-mint-band py-12 sm:py-16 md:py-24 lg:py-28"
      aria-label="Education and professional journey — Variation 3"
    >
      <div className="container">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            {eyebrow && (
              <p className="tv3-eyebrow text-xs font-semibold uppercase tracking-[0.25em] mb-4">
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2 className="tv3-heading text-fluid-h2 font-semibold leading-tight">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="tv3-sub mt-5 text-fluid-body leading-relaxed">{subheading}</p>
            )}
          </div>
        </Reveal>

        <div className="tv3-stage mx-auto" role="tablist">
          {/* Radio inputs (hidden) — pure CSS state */}
          {items.map((it, i) => (
            <input
              key={`r-${it.year}-${i}`}
              type="radio"
              name={name}
              id={`${name}-${i}`}
              className="tv3-radio"
              defaultChecked={i === 0}
              aria-label={`${it.year} — ${it.title}`}
            />
          ))}

          {/* Tab rail */}
          <div className="tv3-tabs" role="tablist" aria-label="Career milestones">
            {items.map((it, i) => (
              <label
                key={`l-${it.year}-${i}`}
                htmlFor={`${name}-${i}`}
                className="tv3-tab"
                data-index={i}
              >
                <span className="tv3-tab-dot" aria-hidden="true">
                  <it.icon className="h-4 w-4" />
                </span>
                <span className="tv3-tab-year">{it.year}</span>
              </label>
            ))}
            <span className="tv3-tab-rail" aria-hidden="true" />
          </div>

          {/* Detail panels */}
          <div className="tv3-panels">
            {items.map((it, i) => (
              <article
                key={`p-${it.year}-${i}`}
                className="tv3-panel"
                data-index={i}
                role="tabpanel"
              >
                <div className="tv3-panel-left">
                  <span className="tv3-panel-icon" aria-hidden="true">
                    <it.icon className="h-6 w-6" />
                  </span>
                  <span className="tv3-panel-year">{it.year}</span>
                </div>
                <div className="tv3-panel-right">
                  <h3 className="tv3-panel-title text-fluid-h4 font-semibold">
                    <Link to={it.to} title={it.linkTitle} className="tv3-panel-title-link">
                      {it.title}
                    </Link>
                  </h3>
                  <p className="tv3-panel-body text-fluid-body leading-relaxed">{it.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .arefin.dark .tv3-eyebrow { color: hsl(150 35% 28%); }
        .arefin.dark .tv3-heading { color: hsl(150 18% 12%); }
        .arefin.dark .tv3-sub     { color: hsl(150 10% 25%); }
        .arefin.dark .tv3-sub strong { color: inherit; font-weight: inherit; }

        .arefin.dark .tv3-stage {
          position: relative;
          max-width: 1080px;
        }
        .arefin.dark .tv3-radio {
          position: absolute;
          opacity: 0;
          pointer-events: none;
          width: 0; height: 0;
        }

        /* ---- Tab rail ---- */
        .arefin.dark .tv3-tabs {
          position: relative;
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: 1fr;
          gap: 8px;
          padding: 14px 14px 22px;
          background: hsl(0 0% 100%);
          border: 1px solid hsl(150 20% 88%);
          border-radius: 16px;
          margin-bottom: 24px;
        }
        .arefin.dark .tv3-tab-rail {
          position: absolute;
          left: 14px;
          right: 14px;
          bottom: 10px;
          height: 3px;
          border-radius: 999px;
          background: hsl(150 25% 88%);
          overflow: hidden;
        }
        .arefin.dark .tv3-tab-rail::after {
          content: "";
          position: absolute;
          inset: 0 auto 0 0;
          width: 0%;
          background: linear-gradient(90deg, hsl(135 80% 41%), hsl(135 90% 30%));
          border-radius: 999px;
          animation: tv3-rail-grow 24s linear infinite;
        }
        @keyframes tv3-rail-grow {
          0%   { width: 0%; }
          100% { width: 100%; }
        }
        .arefin.dark .tv3-tabs:hover .tv3-tab-rail::after { animation-play-state: paused; }

        .arefin.dark .tv3-tab {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 10px 8px 12px;
          cursor: pointer;
          border-radius: 12px;
          border: 1px solid transparent;
          color: hsl(150 18% 25%);
          transition:
            background-color 220ms cubic-bezier(0.22, 1, 0.36, 1),
            color 220ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 220ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin.dark .tv3-tab:hover {
          background: hsl(135 60% 95%);
          border-color: hsl(135 50% 80%);
          color: hsl(135 90% 22%);
        }
        .arefin.dark .tv3-tab-dot {
          width: 36px;
          height: 36px;
          border-radius: 999px;
          background: hsl(135 60% 92%);
          border: 2px solid hsl(135 50% 75%);
          color: hsl(135 90% 25%);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .arefin.dark .tv3-tab-year {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        /* ---- Panels ---- */
        .arefin.dark .tv3-panels {
          position: relative;
          min-height: 220px;
        }
        .arefin.dark .tv3-panel {
          position: absolute;
          inset: 0;
          background: hsl(0 0% 100%);
          border: 1px solid hsl(150 20% 88%);
          border-left: 3px solid hsl(135 80% 41%);
          border-radius: 16px;
          padding: 26px 28px;
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 28px;
          opacity: 0;
          visibility: hidden;
          transition: opacity 320ms ease, visibility 320ms;
        }
        .arefin.dark .tv3-panel-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 14px;
          border-right: 1px dashed hsl(150 25% 82%);
          padding-right: 24px;
        }
        .arefin.dark .tv3-panel-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: hsl(135 60% 92%);
          border: 2px solid hsl(135 50% 75%);
          color: hsl(135 90% 25%);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .arefin.dark .tv3-panel-year {
          font-size: clamp(2.4rem, 5vw, 3.4rem);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.02em;
          color: hsl(135 90% 22%);
        }
        .arefin.dark .tv3-panel-title { color: hsl(150 18% 12%); margin: 0 0 10px; }
        .arefin.dark .tv3-panel-title-link {
          color: inherit;
          text-decoration: none;
          transition:
            color 220ms cubic-bezier(0.22, 1, 0.36, 1),
            text-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin.dark .tv3-panel-title-link:hover {
          color: hsl(135 90% 22%);
          text-shadow: 1px 0.7px 0 hsl(140 20% 75%);
        }
        .arefin.dark .tv3-panel-body { color: hsl(150 10% 25%); margin: 0; }
        .arefin.dark .tv3-panel-body strong { color: inherit; font-weight: inherit; }
        .arefin.dark .tv3-panel-body a {
          color: inherit;
          text-decoration: none;
          transition:
            color 220ms cubic-bezier(0.22, 1, 0.36, 1),
            text-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin.dark .tv3-panel-body a:hover {
          color: hsl(135 90% 22%);
          text-shadow: 1px 0.7px 0 hsl(140 20% 75%);
        }

        @keyframes tv3-panel-in {
          from { opacity: 0; clip-path: inset(0 0 100% 0); }
          to   { opacity: 1; clip-path: inset(0 0 0 0); }
        }

        /* ---- Checked-state wiring (pure CSS) ---- */
        ${items
          .map(
            (_, i) => `
        .arefin.dark .tv3-radio:nth-of-type(${i + 1}):checked ~ .tv3-tabs .tv3-tab[data-index="${i}"] {
          background: hsl(135 80% 41%);
          color: hsl(0 0% 100%);
          border-color: hsl(135 90% 30%);
          box-shadow: 4px 4px 0 0 hsl(0 0% 0%);
        }
        .arefin.dark .tv3-radio:nth-of-type(${i + 1}):checked ~ .tv3-tabs .tv3-tab[data-index="${i}"] .tv3-tab-dot {
          background: hsl(0 0% 100%);
          border-color: hsl(0 0% 100%);
          color: hsl(135 90% 25%);
        }
        .arefin.dark .tv3-radio:nth-of-type(${i + 1}):checked ~ .tv3-panels .tv3-panel[data-index="${i}"] {
          opacity: 1;
          visibility: visible;
          animation: tv3-panel-in 380ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }`,
          )
          .join("\n")}

        @media (max-width: 720px) {
          .arefin.dark .tv3-tab-year { font-size: 0.7rem; letter-spacing: 0.08em; }
          .arefin.dark .tv3-panel {
            position: relative;
            grid-template-columns: 1fr;
            gap: 16px;
            padding: 20px;
          }
          .arefin.dark .tv3-panel-left {
            flex-direction: row;
            align-items: center;
            border-right: none;
            border-bottom: 1px dashed hsl(150 25% 82%);
            padding-right: 0;
            padding-bottom: 14px;
          }
          .arefin.dark .tv3-panels { min-height: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .arefin.dark .tv3-tab-rail::after { animation: none; width: 100%; }
          .arefin.dark .tv3-panel { transition: none; }
        }
      `}</style>
    </section>
  );
};

export default TimelineV3;
