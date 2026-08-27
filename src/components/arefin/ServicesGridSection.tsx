import { Link } from "react-router-dom";
import { Reveal } from "@/hooks/useScrollReveal";

export interface ServiceCardItem {
  title: string;
  /** Sanitized HTML — supports <strong> per Strong Tag Body Text Rule. */
  description: string;
  /** Imported image (optional). */
  img?: string;
  /** Override CSS object-position (e.g. "center 30%"). */
  imgPosition?: string;
  /** Override alt text; defaults to title. */
  imgAlt?: string;
  /** Internal SeoLink target for the card title (with trailing slash). */
  to?: string;
  /** Unique SEO-rich title attribute for the title link (gallbladder-first). */
  linkTitle?: string;
}

interface ServicesGridSectionProps {
  /** Section eyebrow / kicker. */
  kicker?: string;
  /** H2 text. Plain string; rendered with section-heading hover treatment. */
  heading: string;
  /** Sub-headline HTML under the H2 (supports <strong>). */
  introHtml?: string;
  /** Card data. */
  items: ServiceCardItem[];
  /** Columns at md+ (default 2). lg+ jumps to 3 if `cols=3`. */
  cols?: 2 | 3;
  /** Section id (for in-page anchors). */
  id?: string;
  /** A11y label for the section landmark. */
  ariaLabel?: string;
  /** When true, render on a forced light-green band with dark cards (matches About Pillars). */
  lightBand?: boolean;
}

/**
 * Canonical services / treatments grid for Dr. Arefin pages.
 * Uses the approved Atto card hover pattern (3px green left border on hover,
 * sharp 0-blur shadow, dark-green title, image zoom).
 *
 * Catalog ref: mem://style/component-catalog
 * Card ref:    mem://style/atto-card-hover-pattern
 */
export const ServicesGridSection = ({
  kicker = "Our Services",
  heading,
  introHtml,
  items,
  cols = 2,
  id,
  ariaLabel,
  lightBand = false,
}: ServicesGridSectionProps) => {
  const gridCols = cols === 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2";
  const sectionClass = lightBand
    ? "services-grid-section services-grid-light-band py-14 md:py-20 lg:py-28"
    : "services-grid-section py-14 md:py-20 lg:py-28 bg-background";

  return (
    <section
      id={id}
      className={sectionClass}
      aria-label={ariaLabel ?? heading}
    >
      <div className="container">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          {kicker && (
            <Reveal>
              <p className="services-grid-kicker text-xs font-semibold uppercase tracking-[0.25em] mb-4">
                {kicker}
              </p>
            </Reveal>
          )}
          <Reveal delay={100}>
            <h2 className="services-grid-heading text-fluid-h2 font-semibold text-foreground mb-6 leading-tight">
              {heading}
            </h2>
          </Reveal>
          {introHtml && (
            <Reveal delay={200}>
              <p
                className="services-grid-intro text-base md:text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: introHtml }}
              />
            </Reveal>
          )}
        </div>

        <div className={`grid grid-cols-1 ${gridCols} gap-6 md:gap-8`}>
          {items.map((svc, i) => (
            <Reveal key={svc.title} delay={i % 2 === 0 ? 0 : 100} className="h-full">
              <article className="services-grid-card arefin-card-hover rounded-[24px] overflow-hidden h-full flex flex-col">
                {svc.img && (
                  <div className="services-grid-card-img-wrap aspect-[16/10] overflow-hidden">
                    <img
                      src={svc.img}
                      alt={svc.imgAlt ?? svc.title}
                      loading="lazy"
                      decoding="async"
                      className="services-grid-card-img w-full h-full object-cover"
                      style={svc.imgPosition ? { objectPosition: svc.imgPosition } : undefined}
                    />
                  </div>
                )}
                <div className="p-5 sm:p-6 md:p-7 flex-1 flex flex-col">
                  <h3 className="services-grid-card-title text-fluid-h4 font-semibold mb-3">
                    {svc.to ? (
                      <Link
                        to={svc.to}
                        title={svc.linkTitle ?? svc.title}
                        className="services-grid-card-title-link"
                      >
                        {svc.title}
                      </Link>
                    ) : (
                      svc.title
                    )}
                  </h3>
                  <p
                    className="services-grid-card-desc text-base leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: svc.description }}
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        /* ───── Section header ───── */
        .services-grid-kicker { color: hsl(var(--primary-light)); }
        .services-grid-heading {
          transition: text-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      color 280ms cubic-bezier(0.22, 1, 0.36, 1);
          cursor: default;
        }
        .services-grid-heading:hover {
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
          color: hsl(var(--primary-light));
        }
        .services-grid-intro { color: hsl(var(--muted-foreground)); }
        .services-grid-intro strong {
          color: inherit; font-weight: inherit;
          transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1),
                      text-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .services-grid-intro strong:hover {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* ───── Cards (Atto pattern) ───── */
        .arefin.dark .services-grid-card {
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
          border-left: 5px solid hsl(var(--border));
          box-shadow: 0 1px 3px hsl(0 0% 0% / 0.32);
          transition: border-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      background-color 280ms ease;
        }
        .arefin.dark .services-grid-card:hover,
        .arefin.dark .services-grid-card:focus-within {
          border-color: hsl(var(--border));
          border-left-color: hsl(var(--primary-bright));
          box-shadow: 0 10px 25px hsl(0 0% 0% / 0.45);
        }
        .services-grid-card-img {
          transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .services-grid-card:hover .services-grid-card-img {
          transform: scale(1.04);
        }
        .services-grid-card-title {
          color: hsl(var(--foreground));
          /* Normalize card title height across the grid (2-line reservation) */
          min-height: calc(2 * 1.25em);
          line-height: 1.25;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      text-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin.dark .services-grid-card:hover .services-grid-card-title,
        .arefin.dark .services-grid-card:focus-within .services-grid-card-title {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }
        .services-grid-card-title-link { color: inherit; text-decoration: none; }
        .services-grid-card-title-link:focus-visible { outline: 2px solid hsl(var(--primary-bright)); outline-offset: 3px; border-radius: 4px; }
        .services-grid-card-desc {
          color: hsl(var(--muted-foreground));
          /* Normalize card body height across the grid (6-line reservation) */
          min-height: calc(6 * 1.55em);
          line-height: 1.55;
        }
        .services-grid-card-desc strong {
          color: inherit; font-weight: inherit; cursor: default;
          transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1),
                      text-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .services-grid-card-desc strong:hover {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        @media (prefers-reduced-motion: reduce) {
          .services-grid-card,
          .services-grid-card-img,
          .services-grid-card-title,
          .services-grid-heading,
          .services-grid-intro strong,
          .services-grid-card-desc strong { transition: none; }
        }

        /* ───── LIGHT-GREEN BAND variant (forced light even in dark mode) ───── */
        .services-grid-light-band,
        .arefin.dark .services-grid-light-band {
          background: hsl(138 60% 95%);
          color: hsl(0 0% 8%);
        }
        .services-grid-light-band .services-grid-kicker,
        .arefin.dark .services-grid-light-band .services-grid-kicker {
          color: hsl(142 71% 32%);
        }
        .services-grid-light-band .services-grid-heading,
        .arefin.dark .services-grid-light-band .services-grid-heading {
          color: hsl(0 0% 8%);
        }
        .services-grid-light-band .services-grid-heading:hover,
        .arefin.dark .services-grid-light-band .services-grid-heading:hover {
          color: hsl(142 71% 32%);
          text-shadow: 1px 0.7px 0 hsl(80 25% 25%);
        }
        .services-grid-light-band .services-grid-intro,
        .arefin.dark .services-grid-light-band .services-grid-intro {
          color: hsl(0 0% 20%);
        }
        .services-grid-light-band .services-grid-intro strong:hover,
        .arefin.dark .services-grid-light-band .services-grid-intro strong:hover {
          color: hsl(142 71% 32%);
          text-shadow: 1px 0.7px 0 hsl(80 25% 25%);
        }

        /* Dark cards on the light band */
        .services-grid-light-band .services-grid-card,
        .arefin.dark .services-grid-light-band .services-grid-card {
          background: hsl(155 40% 8%);
          color: hsl(0 0% 98%);
          border: 1px solid hsl(155 30% 14%);
          border-left: 3px solid hsl(155 30% 14%);
          box-shadow: 0 1px 3px hsl(0 0% 0% / 0.18);
          transition: border-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .services-grid-light-band .services-grid-card:hover,
        .services-grid-light-band .services-grid-card:focus-within,
        .arefin.dark .services-grid-light-band .services-grid-card:hover,
        .arefin.dark .services-grid-light-band .services-grid-card:focus-within {
          border-left-color: hsl(131 87% 41%);
          box-shadow: 8px 8px 0 0 hsl(131 87% 41% / 0.22);
        }
        .services-grid-light-band .services-grid-card-title,
        .arefin.dark .services-grid-light-band .services-grid-card-title {
          color: hsl(0 0% 98%);
        }
        .services-grid-light-band .services-grid-card:hover .services-grid-card-title,
        .arefin.dark .services-grid-light-band .services-grid-card:hover .services-grid-card-title,
        .services-grid-light-band .services-grid-card:focus-within .services-grid-card-title,
        .arefin.dark .services-grid-light-band .services-grid-card:focus-within .services-grid-card-title {
          color: hsl(131 87% 55%);
          text-shadow: 1px 0.7px 0 hsl(0 0% 0%);
        }
        .services-grid-light-band .services-grid-card-desc,
        .arefin.dark .services-grid-light-band .services-grid-card-desc {
          color: hsl(0 0% 82%);
        }
        .services-grid-light-band .services-grid-card-desc strong:hover,
        .arefin.dark .services-grid-light-band .services-grid-card-desc strong:hover {
          color: hsl(131 87% 55%);
          text-shadow: 1px 0.7px 0 hsl(0 0% 0%);
        }
      `}</style>
    </section>
  );
};

export default ServicesGridSection;
