import { ChevronRight } from "lucide-react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "@/hooks/useScrollReveal";
import { buildFAQPageSchema } from "@/lib/structuredData";

export interface FAQItem {
  q: string;
  a: ReactNode;
  /** Plain-text version of `a` for FAQPage JSON-LD. Required if `a` is not a string. */
  aText?: string;
  /** Optional override; otherwise auto-generated from `q`. */
  slug?: string;
  /** When true, the question renders as an internal link to `<basePath>/<slug>/`. */
  linkToPage?: boolean;
  /** Optional title attribute override for the question link. */
  linkTitle?: string;
}

export interface FAQAccordionProps {
  items: FAQItem[];
  kicker?: string;
  heading?: string;
  /** Base path for question links when `linkToPage` is enabled. Default: `/faq`. */
  basePath?: string;
}

/** Slugify a question into a URL-safe slug for future /faq/<slug>/ pages. */
export const slugifyQuestion = (q: string): string =>
  q
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);

interface FAQRowProps {
  item: FAQItem;
  index: number;
  basePath: string;
}

const FAQRow = ({ item, index, basePath }: FAQRowProps) => {
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const innerRef = useRef<HTMLDivElement>(null);
  const slug = item.slug ?? slugifyQuestion(item.q);
  const href = `${basePath.replace(/\/$/, "")}/${slug}/`;
  const linkTitle = item.linkTitle ?? item.q;

  useEffect(() => {
    if (!innerRef.current) return;
    setHeight(open ? innerRef.current.scrollHeight : 0);
  }, [open, item.a]);

  return (
    <div
      className={`arefin-faq-item${open ? " is-open" : ""}`}
      data-faq-slug={slug}
    >
      {/* T01: Entire trigger row is clickable (anywhere on the card header
          toggles open/close). Inner <Link> stops propagation so navigation
          still works for linkToPage variant. Keyboard a11y preserved via
          role="button" + onKeyDown. */}
      <div
        className="arefin-faq-trigger"
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-controls={`faq-panel-${index}`}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((o) => !o);
          }
        }}
      >
        {item.linkToPage ? (
          <Link
            to={href}
            title={linkTitle}
            className="arefin-faq-q arefin-faq-q-link"
            onClick={(e) => e.stopPropagation()}
          >
            {item.q}
          </Link>
        ) : (
          <span className="arefin-faq-q arefin-faq-q-button">{item.q}</span>
        )}
        <span
          className="arefin-faq-toggle"
          aria-hidden="true"
        >
          <ChevronRight className="arefin-faq-chev" aria-hidden />
        </span>
      </div>
      <div
        id={`faq-panel-${index}`}
        className="arefin-faq-panel"
        style={{ height }}
        aria-hidden={!open}
      >
        <div ref={innerRef} className="arefin-faq-panel-inner">
          {typeof item.a === "string" ? <p>{item.a}</p> : item.a}
          {/* T22: subtle inline "Show more" CTA → dedicated single-FAQ page.
              Rendered ONLY when the item has a dedicated page (linkToPage) —
              the full answer is already inline, and a link to a page that
              does not exist must never be emitted (SEO fix, 2026-10-22:
              the unconditional link generated 448 dead /<slug>/ links). */}
          {item.linkToPage && (
            <p className="arefin-faq-show-more">
              <Link
                to={href}
                title={`Read the full answer: ${item.q}`}
                className="arefin-faq-show-more-link"
              >
                Show more →
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Approved FAQ accordion (Atto card hover pattern, brand-green tint).
 * Spec ref: Dr-Arefin-Spec/reviewer/08-global-shell-parity.md (G11),
 *           Dr-Arefin-Spec/components/atto-card-hover.md
 */
export const FAQAccordion = ({
  items,
  kicker = "Frequently asked",
  heading = "Common Questions",
  basePath = "/faq",
}: FAQAccordionProps) => {
  if (!items || items.length === 0) return null;

  const schemaItems = items
    .map((it) => {
      const answer = it.aText ?? (typeof it.a === "string" ? it.a : "");
      if (!answer && import.meta.env.DEV) {
        console.warn(
          `[FAQAccordion] Skipping FAQ "${it.q}" from JSON-LD: provide a string \`a\` or an \`aText\` field.`
        );
      }
      return answer ? { question: it.q, answer } : null;
    })
    .filter((x): x is { question: string; answer: string } => x !== null);
  const faqSchema = buildFAQPageSchema(schemaItems);

  return (
    <section className="arefin-faq-section py-20 md:py-24">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <div className="container max-w-3xl">
        <Reveal>
          <p className="arefin-faq-kicker">{kicker}</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="arefin-faq-heading type-h2 mb-10">{heading}</h2>
        </Reveal>
        <div className="arefin-faq-list">
          {items.map((f, i) => (
            <Reveal key={f.q} delay={i * 50}>
              <FAQRow item={f} index={i} basePath={basePath} />
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
        .arefin .arefin-faq-section,
        .arefin.dark .arefin-faq-section { background: hsl(var(--arefin-light-mint)); }
        .arefin.dark .arefin-faq-kicker { color: hsl(var(--primary-darker, var(--primary))); }
        .arefin.dark .arefin-faq-heading { color: hsl(220 15% 15%); }
        .arefin.dark .arefin-faq-item {
          background: hsl(215 40% 7%);
          border-color: hsl(215 30% 14%);
          color: hsl(0 0% 95%);
        }
        .arefin.dark .arefin-faq-item.is-open {
          background: hsl(215 45% 6%);
          border-color: hsl(var(--primary-bright, var(--primary)) / 0.55);
        }
        .arefin.dark .arefin-faq-trigger,
        .arefin.dark .arefin-faq-q { color: hsl(0 0% 96%); }
        .arefin.dark .arefin-faq-panel-inner { color: hsl(0 0% 88%); }
        .arefin .arefin-faq-kicker {
          font-size: 0.78rem; font-weight: 600; letter-spacing: 0.22em;
          text-transform: uppercase; color: hsl(var(--primary));
          margin-bottom: 0.75rem; text-align: center;
        }
        .arefin .arefin-faq-heading {
          font-family: var(--font-arefin-heading, inherit);
          /* Font size delegated to .type-h2 fluid token (T18) */
          font-weight: 600; line-height: 1.25; letter-spacing: -0.01em;
          text-align: center; color: hsl(var(--foreground));
        }
        .arefin .arefin-faq-list { display: flex; flex-direction: column; gap: 0.75rem; }

        .arefin .arefin-faq-item {
          background: hsl(var(--card));
          color: hsl(var(--card-foreground));
          border: 1px solid hsl(var(--border));
          border-left: 3px solid hsl(var(--border));
          border-radius: 14px;
          overflow: hidden;
          transition:
            background-color 240ms ease,
            border-color 240ms ease,
            border-left-color 240ms ease,
            box-shadow 240ms ease;
        }
        .arefin .arefin-faq-item:hover,
        .arefin .arefin-faq-item:focus-within {
          border-left-color: hsl(var(--primary-bright, var(--primary)));
          box-shadow: 4px 4px 0 0 rgb(var(--hover-shadow-ink) / 0.18);
        }
        .arefin .arefin-faq-item.is-open {
          background: hsl(var(--primary-bright, var(--primary)) / 0.08);
          border-color: hsl(var(--primary-bright, var(--primary)) / 0.45);
          border-left-color: hsl(var(--primary-bright, var(--primary)));
          box-shadow: 4px 4px 0 0 rgb(var(--hover-shadow-ink) / 0.22);
        }

        .arefin .arefin-faq-trigger {
          width: 100%;
          padding: 1.1rem 1.4rem;
          display: flex; align-items: center; justify-content: space-between;
          gap: 1rem;
          color: hsl(var(--card-foreground));
          cursor: pointer;
          user-select: none;
        }
        .arefin .arefin-faq-trigger:focus-visible {
          outline: 2px solid hsl(var(--primary-bright, var(--primary)));
          outline-offset: 2px;
        }
        .arefin .arefin-faq-q {
          flex: 1;
          background: transparent; border: 0; padding: 0; margin: 0;
          font: inherit; font-weight: 600; font-size: 1rem; line-height: 1.4;
          text-align: left; cursor: pointer;
          color: hsl(var(--card-foreground));
          text-decoration: none;
          transition: color 200ms ease, text-shadow 200ms ease;
        }
        /* T21: Title hover applies to BOTH link & button variants, plus when
           the parent card is hovered. In dark sections title hover → white. */
        .arefin .arefin-faq-q:hover,
        .arefin .arefin-faq-q:focus-visible,
        .arefin .arefin-faq-item:hover .arefin-faq-q,
        .arefin .arefin-faq-item:focus-within .arefin-faq-q {
          color: hsl(var(--primary-darker, var(--primary)));
          text-shadow: 1px 1px 0 rgb(var(--hover-shadow-ink) / 0.18);
        }
        .arefin .arefin-faq-item.is-open .arefin-faq-q {
          color: hsl(var(--primary-darker, var(--primary)));
        }
        /* Dark variant: title hover/open turns white for legibility on dark cards. */
        .arefin.dark .arefin-faq-q:hover,
        .arefin.dark .arefin-faq-q:focus-visible,
        .arefin.dark .arefin-faq-item:hover .arefin-faq-q,
        .arefin.dark .arefin-faq-item:focus-within .arefin-faq-q,
        .arefin.dark .arefin-faq-item.is-open .arefin-faq-q {
          color: hsl(0 0% 100%);
        }
        .arefin .arefin-faq-toggle {
          background: transparent; border: 0; padding: 0.25rem; margin: 0;
          cursor: pointer; display: inline-flex; align-items: center; justify-content: center;
          color: hsl(var(--primary-bright, var(--primary)));
        }
        .arefin .arefin-faq-chev {
          width: 18px; height: 18px; flex-shrink: 0;
          color: inherit;
          transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin .arefin-faq-item.is-open .arefin-faq-chev { transform: rotate(90deg); }

        .arefin .arefin-faq-panel {
          height: 0; overflow: hidden;
          transition: height 320ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin .arefin-faq-panel-inner {
          padding: 0 1.4rem 1.2rem;
          color: hsl(var(--card-foreground) / 0.82);
          line-height: 1.7; font-size: 0.95rem;
          overflow-wrap: anywhere;
          word-break: break-word;
        }
        @media (max-width: 639px) {
          .arefin .arefin-faq-trigger { padding: 0.95rem 1rem; }
          .arefin .arefin-faq-panel-inner { padding: 0 1rem 1rem; font-size: 0.9rem; }
          .arefin .arefin-faq-q { font-size: 0.95rem; }
        }
        .arefin .arefin-faq-panel-inner > p { margin: 0; }
        .arefin .arefin-faq-panel-inner > * + * { margin-top: 0.75rem; }
        /* Strong-tag body rule: inherit weight & color; only links inside strong get the green keyword treatment. */
        .arefin .arefin-faq-panel-inner strong { color: inherit; font-weight: inherit; }
        /* T20: At rest, answer-body links inherit body color/weight (no underline).
           Only on hover do they turn brand green with the standard hover-shadow. */
        .arefin .arefin-faq-panel-inner a {
          color: inherit;
          font-weight: inherit;
          text-decoration: none;
          transition: color 200ms ease, text-shadow 200ms ease;
        }
        .arefin .arefin-faq-panel-inner a:hover,
        .arefin .arefin-faq-panel-inner a:focus-visible {
          color: hsl(var(--primary-bright, var(--primary)));
          text-shadow: 1px 1px 0 rgb(var(--hover-shadow-ink) / 0.18);
          text-decoration: none;
        }

        /* T22 / T20: "Show more" inline CTA — distinct accent color so it
           reads as a deliberate call-to-action, not body copy. Brand green
           at rest, deeper hover-green on hover. Underlined to signal link. */
        .arefin .arefin-faq-show-more {
          margin-top: 1rem;
          font-size: 0.9rem;
          line-height: 1.4;
        }
        .arefin .arefin-faq-panel-inner a.arefin-faq-show-more-link {
          color: hsl(var(--primary-darker, var(--primary)));
          font-weight: 600;
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-thickness: 1.5px;
        }
        .arefin .arefin-faq-panel-inner a.arefin-faq-show-more-link:hover,
        .arefin .arefin-faq-panel-inner a.arefin-faq-show-more-link:focus-visible {
          color: hsl(var(--primary-bright, var(--primary)));
          text-shadow: 1px 1px 0 rgb(var(--hover-shadow-ink) / 0.18);
        }
        .arefin.dark .arefin-faq-panel-inner a.arefin-faq-show-more-link {
          color: hsl(var(--primary-bright, var(--primary)));
        }
        .arefin.dark .arefin-faq-panel-inner a.arefin-faq-show-more-link:hover,
        .arefin.dark .arefin-faq-panel-inner a.arefin-faq-show-more-link:focus-visible {
          color: hsl(140 70% 70%);
        }

        @media (prefers-reduced-motion: reduce) {
          .arefin .arefin-faq-item,
          .arefin .arefin-faq-chev,
          .arefin .arefin-faq-panel { transition: none; }
        }
      `}</style>
    </section>
  );
};

export default FAQAccordion;
