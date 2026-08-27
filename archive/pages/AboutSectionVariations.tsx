import { Link } from "react-router-dom";
import DrArefinHeaderLight from "@/components/arefin/DrArefinHeaderLight";
import AboutV04LightA from "@/components/arefin/about-variations/AboutV04LightA";
import AboutV04LightB from "@/components/arefin/about-variations/AboutV04LightB";
import AboutV04LightC from "@/components/arefin/about-variations/AboutV04LightC";

/**
 * Single consolidated preview page for all light About section variations.
 * Route: /about-section
 * Spec: spec/04-section-variations/04-about-04/
 *
 * Sister pages:
 *  - /hero-variations
 *  - /value-proposition
 */
const AboutSectionVariations = () => {
  const variations = [
    {
      key: "A",
      slug: "a",
      title: "Variation A — Editorial Classic",
      summary:
        "Magazine-style asymmetric split. Signature line under H2, soft framed portrait, sharp zero-blur shadow on hover.",
      Component: AboutV04LightA,
    },
    {
      key: "B",
      slug: "b",
      title: "Variation B — Credentials Showcase",
      summary:
        "Trust-first private practice. Glass-morphic credentials chip floats over portrait. Inline strong-anchor SEO links.",
      Component: AboutV04LightB,
    },
    {
      key: "C",
      slug: "c",
      title: "Variation C — Clinical Authority",
      summary:
        "Conversion-focused. Image left with offset sage accent block. Stat strip with CountUp + dual CTA.",
      Component: AboutV04LightC,
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

      {/* Sticky jump-nav */}
      <nav
        className="sticky top-[72px] z-40 backdrop-blur-md"
        style={{
          background: "hsl(0 0% 98% / 0.9)",
          borderBottom: "1px solid hsl(0 0% 90%)",
        }}
        aria-label="About section variation jump navigation"
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
              href={`#about-${v.slug}`}
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
              to="/value-proposition"
              className="text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
              style={{
                border: "1px solid hsl(142 71% 45%)",
                color: "hsl(142 71% 35%)",
                background: "hsl(142 71% 96%)",
              }}
            >
              → Value proposition
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
          About section · Light treatment · Premium medical
        </p>
        <h1
          className="font-arefin-heading text-3xl md:text-4xl mt-3"
          style={{ color: "hsl(0 0% 8%)" }}
        >
          Dr. M Arefin — About Section · 3 light variations
        </h1>
        <p
          className="mt-3 max-w-2xl text-sm md:text-base"
          style={{ color: "hsl(0 0% 38%)" }}
        >
          Three premium-medical layout treatments for the About Dr. Murshidul
          Arefin section. Editorial Classic · Credentials Showcase · Clinical
          Authority. Same heading and intent, different visual rhythm and copy
          tone. Pick the one to promote to the live homepage.
        </p>
      </div>

      {variations.map(({ key, slug, title, summary, Component }) => (
        <section
          key={slug}
          id={`about-${slug}`}
          className="scroll-mt-[140px]"
        >
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
          className="underline mr-3"
          style={{ color: "hsl(142 71% 35%)" }}
        >
          See hero variations →
        </Link>
        <Link
          to="/value-proposition"
          className="underline"
          style={{ color: "hsl(142 71% 35%)" }}
        >
          See value proposition →
        </Link>
      </footer>
    </div>
  );
};

export default AboutSectionVariations;
