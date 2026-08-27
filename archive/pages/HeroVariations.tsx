import { Link } from "react-router-dom";
import DrArefinHeaderLight from "@/components/arefin/DrArefinHeaderLight";
import HeroV04LightA from "@/components/arefin/hero-variations/HeroV04LightA";
import HeroV04LightB from "@/components/arefin/hero-variations/HeroV04LightB";
import HeroV04LightC from "@/components/arefin/hero-variations/HeroV04LightC";

/**
 * Single consolidated preview page for all light hero variations.
 * Route: /hero-variations
 * Spec: spec/04-section-variations/02-hero-04-light/
 *
 * Sister page: /value-proposition (value-prop only).
 */
const HeroVariations = () => {
  const variations = [
    {
      key: "A",
      slug: "a",
      title: "Variation A — Authority Split Right",
      summary:
        "Two-column. Text + trust strip on the left, portrait card on the right with a soft pulse halo.",
      Component: HeroV04LightA,
    },
    {
      key: "B",
      slug: "b",
      title: "Variation B — Centered with Floating Credential Cards",
      summary:
        "Centered text and portrait. 3 floating credential cards orbit the portrait on desktop, collapse to inline pills on mobile.",
      Component: HeroV04LightB,
    },
    {
      key: "C",
      slug: "c",
      title: "Variation C — Asymmetric Bento with Portrait Left",
      summary:
        "Portrait on the left with a vertical green accent bar, text on the right, plus a 2-card mini bento for live availability + direct line.",
      Component: HeroV04LightC,
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
        aria-label="Hero variation jump navigation"
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
              href={`#hero-${v.slug}`}
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
              to="/value-proposition"
              className="text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
              style={{
                border: "1px solid hsl(142 71% 45%)",
                color: "hsl(142 71% 35%)",
                background: "hsl(142 71% 96%)",
              }}
            >
              → Value Prop variations
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
          Hero variations · Light treatment
        </p>
        <h1
          className="font-arefin-heading text-3xl md:text-4xl mt-3"
          style={{ color: "hsl(0 0% 8%)" }}
        >
          Dr. M Arefin — Hero · 3 light variations
        </h1>
        <p
          className="mt-3 max-w-2xl text-sm md:text-base"
          style={{ color: "hsl(0 0% 38%)" }}
        >
          Scroll through the three light hero variations below. All three share
          the same light header, near-black headings, and the bright brand
          green <code className="px-1.5 py-0.5 rounded bg-black/5 text-xs">#22C55E</code>{" "}
          accent. Pick the one you want to promote to the live homepage.
        </p>
      </div>

      {variations.map(({ key, slug, title, summary, Component }) => (
        <section key={slug} id={`hero-${slug}`} className="scroll-mt-[140px]">
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
          to="/value-proposition"
          className="underline"
          style={{ color: "hsl(142 71% 35%)" }}
        >
          See value proposition variations →
        </Link>
      </footer>
    </div>
  );
};

export default HeroVariations;
