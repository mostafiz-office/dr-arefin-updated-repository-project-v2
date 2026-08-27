import { Reveal } from "@/hooks/useScrollReveal";

export interface BodySection {
  heading: string;
  body: string; // sanitized HTML
}

interface Props {
  sections: BodySection[];
  /** Outer section className override (defaults to standard satellite spacing). */
  className?: string;
  /** Container max-width class (defaults to max-w-3xl for long-form prose). */
  maxWidthClass?: string;
}

/**
 * Shared long-form body content block used by satellite/interior pages.
 * Renders an array of { heading, body } as <h2> + prose, with staggered Reveal.
 *
 * All visual styling lives here so individual pages do not redefine prose styles.
 */
export const BodyContentSection = ({
  sections,
  className = "body-content-section py-20 md:py-24",
  maxWidthClass = "max-w-3xl",
}: Props) => {
  if (!sections?.length) return null;

  return (
    <section className={className}>
      <div className={`container ${maxWidthClass}`}>
        {sections.map((sec, i) => (
          <Reveal key={sec.heading} delay={i * 60}>
            <article className="body-content-block">
              <h2 className="body-content-h2">{sec.heading}</h2>
              <div
                className="body-content-prose"
                dangerouslySetInnerHTML={{ __html: sec.body }}
              />
            </article>
          </Reveal>
        ))}
      </div>

      <style>{`
        .arefin .body-content-section { background: hsl(var(--background)); }
        .arefin .body-content-block { margin-bottom: 3rem; }
        .arefin .body-content-block:last-child { margin-bottom: 0; }
        .arefin .body-content-h2 {
          font-family: var(--font-arefin-heading, inherit);
          font-size: clamp(1.5rem, 2.6vw, 2rem);
          font-weight: 600;
          color: hsl(var(--foreground));
          margin-bottom: 1.25rem;
          line-height: 1.25;
          letter-spacing: -0.01em;
        }
        .arefin .body-content-prose {
          font-size: 1rem;
          line-height: 1.75;
          color: hsl(var(--foreground) / 0.78);
        }
        .arefin .body-content-prose p { margin: 0 0 1rem 0; }
        .arefin .body-content-prose p:last-child { margin-bottom: 0; }
        .arefin .body-content-prose ul {
          margin: 0 0 1rem 0;
          padding-left: 1.25rem;
          list-style: disc;
        }
        .arefin .body-content-prose li { margin-bottom: 0.5rem; }
        .arefin .body-content-prose strong { color: inherit; font-weight: inherit; }
        .arefin .body-content-prose a {
          color: hsl(var(--primary));
          text-decoration: none;
          border-bottom: 1px solid hsl(var(--primary) / 0.4);
          transition: color 200ms ease, border-color 200ms ease;
        }
        .arefin .body-content-prose a:hover {
          color: hsl(var(--primary-darker));
          border-bottom-color: hsl(var(--primary-darker));
        }
        @media (prefers-reduced-motion: reduce) {
          .arefin .body-content-prose a { transition: none; }
        }
      `}</style>
    </section>
  );
};

export default BodyContentSection;
