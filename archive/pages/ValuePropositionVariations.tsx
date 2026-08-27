import { Link } from "react-router-dom";
import DrArefinHeaderLight from "@/components/arefin/DrArefinHeaderLight";
import ValuePropV04LightA from "@/components/arefin/value-prop-variations/ValuePropV04LightA";
import ValuePropV04LightB from "@/components/arefin/value-prop-variations/ValuePropV04LightB";
import ValuePropV04LightC from "@/components/arefin/value-prop-variations/ValuePropV04LightC";

/**
 * Single consolidated preview page for all light Value Proposition variations.
 * Route: /value-proposition
 * Spec: spec/04-section-variations/03-value-proposition-04/
 *
 * Sister page to /hero-variations (heroes only).
 */
const ValuePropositionVariations = () => {
  const variations = [
    {
      key: "A",
      slug: "a",
      title: "Variation A — Minimalist Numerals",
      summary:
        "Editorial / Swiss minimal. No card chrome — oversized sage numerals carry the layout, divider rules between columns.",
      Component: ValuePropV04LightA,
    },
    {
      key: "B",
      slug: "b",
      title: "Variation B — Card Stack with Sage Accent",
      summary:
        "Trust-first medical card. Bordered surface with a sage top-rule, soft shadow on hover, no positional shift.",
      Component: ValuePropV04LightB,
    },
    {
      key: "C",
      slug: "c",
      title: "Variation C — Bento Numeral",
      summary:
        "Asymmetric bento. Large sage numeral block on the left, content on the right — confident and modern.",
      Component: ValuePropV04LightC,
    },
  ];

  return (
    <div
      className="arefin min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, hsl(0 0% 98%) 0%, hsl(0 0% 96%) 100%)",
      }}
    >
      <DrArefinHeaderLight />

      {/* Sticky jump-nav (light) */}
      <nav
        className="sticky top-[72px] z-40 backdrop-blur-md"
        style={{
          background: "hsl(0 0% 98% / 0.9)",
          borderBottom: "1px solid hsl(0 0% 90%)",
        }}
        aria-label="Value proposition variation jump navigation"
      >
        <div className="container flex flex-wrap items-center gap-2 py-3">
          <span
            className="text-xs font-semibold uppercase tracking-[0.2em] mr-2"
            style={{ color: "hsl(0 0% 38%)" }}
          >
            Jump to:
          </span>
          {variations.map((v) => (
            <a
              key={v.slug}
              href={`#vp-${v.slug}`}
              className="text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
              style={{
                border: "1px solid hsl(0 0% 88%)",
                color: "hsl(0 0% 12%)",
                background: "hsl(0 0% 100%)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "hsl(142 71% 45%)";
                e.currentTarget.style.color = "hsl(142 71% 35%)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "hsl(0 0% 88%)";
                e.currentTarget.style.color = "hsl(0 0% 12%)";
              }}
            >
              Variation {v.key}
            </a>
          ))}
          <span className="ml-auto flex flex-wrap items-center gap-2">
            <Link
              to="/hero-variations"
              className="text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
              style={{
                border: "1px solid hsl(142 71% 45%)",
                color: "hsl(142 71% 35%)",
                background: "hsl(142 71% 96%)",
              }}
            >
              → Hero variations
            </Link>
            <Link
              to="/about-section"
              className="text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
              style={{
                border: "1px solid hsl(142 71% 45%)",
                color: "hsl(142 71% 35%)",
                background: "hsl(142 71% 96%)",
              }}
            >
              → About section
            </Link>
            <Link
              to="/metrics"
              className="text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
              style={{
                border: "1px solid hsl(142 71% 45%)",
                color: "hsl(142 71% 35%)",
                background: "hsl(142 71% 96%)",
              }}
            >
              → Metrics section
            </Link>
            <Link
              to="/initiatives-section"
              className="text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
              style={{
                border: "1px solid hsl(142 71% 45%)",
                color: "hsl(142 71% 35%)",
                background: "hsl(142 71% 96%)",
              }}
            >
              → Initiatives section
            </Link>
            <Link
              to="/videos"
              className="text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
              style={{
                border: "1px solid hsl(142 71% 45%)",
                color: "hsl(142 71% 35%)",
                background: "hsl(142 71% 96%)",
              }}
            >
              → Videos section
            </Link>
            <Link
              to="/services"
              className="text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
              style={{
                border: "1px solid hsl(142 71% 45%)",
                color: "hsl(142 71% 35%)",
                background: "hsl(142 71% 96%)",
              }}
            >
              → Services section
            </Link>
          </span>
        </div>
      </nav>

      {/* Page intro */}
      <div
        className="container py-10"
        style={{ borderBottom: "1px solid hsl(0 0% 90%)" }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-[0.25em]"
          style={{ color: "hsl(142 71% 35%)" }}
        >
          Value proposition · Light treatment
        </p>
        <h1
          className="font-arefin-heading text-3xl md:text-4xl mt-3"
          style={{ color: "hsl(0 0% 8%)" }}
        >
          Dr. M Arefin — Value Proposition · 3 light variations
        </h1>
        <p
          className="mt-3 max-w-2xl text-sm md:text-base"
          style={{ color: "hsl(0 0% 38%)" }}
        >
          Three layout treatments for the three-pillar Value Proposition
          section (Surgical Excellence · Advanced Treatment · Compassionate
          Care). Same copy, different visual rhythm. Pick the one to promote
          to the live homepage.
        </p>
      </div>

      {variations.map(({ key, slug, title, summary, Component }) => (
        <section key={slug} id={`vp-${slug}`} className="scroll-mt-[140px]">
          <div
            className="container py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
            style={{
              background: "hsl(0 0% 100%)",
              borderTop: "1px solid hsl(0 0% 90%)",
              borderBottom: "1px solid hsl(0 0% 90%)",
            }}
          >
            <div>
              <span
                className="inline-flex items-center justify-center h-7 min-w-7 px-2 rounded-full text-xs font-bold mr-3"
                style={{
                  background: "hsl(142 71% 45%)",
                  color: "hsl(0 0% 100%)",
                }}
              >
                {key}
              </span>
              <span
                className="font-arefin-heading text-base md:text-lg"
                style={{ color: "hsl(0 0% 8%)" }}
              >
                {title}
              </span>
            </div>
            <p
              className="text-xs md:text-sm md:text-right md:max-w-xl"
              style={{ color: "hsl(0 0% 38%)" }}
            >
              {summary}
            </p>
          </div>
          <Component />
        </section>
      ))}

      <footer
        className="container py-12 text-center text-sm"
        style={{ color: "hsl(0 0% 38%)" }}
      >
        Pick a variation (A, B, or C) and let me know which to promote to the
        live homepage.{" "}
        <Link
          to="/hero-variations"
          className="underline"
          style={{ color: "hsl(142 71% 35%)" }}
        >
          See hero variations →
        </Link>
      </footer>
    </div>
  );
};

export default ValuePropositionVariations;
