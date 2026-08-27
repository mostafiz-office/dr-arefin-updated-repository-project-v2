import { Link } from "react-router-dom";
import { useEffect } from "react";
import DrArefinHeader from "@/components/arefin/DrArefinHeaderLight";
import DrArefinFooter from "@/components/arefin/DrArefinFooter";
import TestimonialsV04LightA from "@/components/arefin/testimonials-variations/TestimonialsV04LightA";
import TestimonialsV04LightB from "@/components/arefin/testimonials-variations/TestimonialsV04LightB";
import TestimonialsV04LightC from "@/components/arefin/testimonials-variations/TestimonialsV04LightC";

/**
 * Real Stories, Real Recoveries — Section Variations Preview
 * Route: /testimonials
 * Spec: spec/04-section-variations/11-real-stories/
 */
const TestimonialsSectionVariations = () => {
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["variant-a", "variant-b", "variant-c"];
      let current = "variant-a";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) current = id;
        }
      }
      document.querySelectorAll(".jump-nav-link").forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) link.classList.add("active");
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const jumpTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen flex flex-col arefin" style={{ background: "hsl(var(--background))" }}>
      <DrArefinHeader />

      <main className="flex-1">
        <section className="container max-w-[1248px] mx-auto px-6 py-16 md:py-20">
          <h1
            className="font-arefin-heading text-3xl md:text-4xl lg:text-5xl mb-4"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Real Stories, Real Recoveries — Section Variations
          </h1>
          <p className="text-lg mb-4 max-w-3xl" style={{ color: "hsl(var(--muted-foreground))" }}>
            Three premium designs for displaying verified Google reviews of Hepatobiliary Surgeon Dr. Murshidul Arefin.
          </p>
          <p className="text-sm mb-8 max-w-3xl" style={{ color: "hsl(var(--muted-foreground))" }}>
            <strong>Phase 1:</strong> Reviews are sample placeholders matching Google's review schema.{" "}
            <strong>Phase 2:</strong> Swap to live data via Featurable API or Google Places API — see{" "}
            <code>spec/04-section-variations/11-real-stories/04-real-stories-data-source.md</code>.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/hero-variations/" className="text-sm font-medium hover:underline" style={{ color: "hsl(var(--primary))" }}>← Hero</Link>
            <Link to="/value-proposition/" className="text-sm font-medium hover:underline" style={{ color: "hsl(var(--primary))" }}>← Value Proposition</Link>
            <Link to="/about-section/" className="text-sm font-medium hover:underline" style={{ color: "hsl(var(--primary))" }}>← About</Link>
            <Link to="/initiatives-section/" className="text-sm font-medium hover:underline" style={{ color: "hsl(var(--primary))" }}>← Initiatives</Link>
            <Link to="/metrics/" className="text-sm font-medium hover:underline" style={{ color: "hsl(var(--primary))" }}>← Metrics</Link>
            <Link to="/videos/" className="text-sm font-medium hover:underline" style={{ color: "hsl(var(--primary))" }}>← Videos</Link>
            <Link to="/services/" className="text-sm font-medium hover:underline" style={{ color: "hsl(var(--primary))" }}>← Services</Link>
            <Link to="/call-to-care/" className="text-sm font-medium hover:underline" style={{ color: "hsl(var(--primary))" }}>← Call to Care</Link>
            <Link to="/transformations/" className="text-sm font-medium hover:underline" style={{ color: "hsl(var(--primary))" }}>← Transformations</Link>
          </div>
        </section>

        <div
          className="sticky top-[72px] z-30 border-y"
          style={{ background: "hsl(var(--card) / 0.95)", backdropFilter: "blur(8px)", borderColor: "hsl(var(--border))" }}
        >
          <div className="container max-w-[1248px] mx-auto px-6">
            <nav className="flex gap-6 overflow-x-auto py-3">
              {[
                { id: "variant-a", label: "A — Editorial Spotlight" },
                { id: "variant-b", label: "B — Aurora Wall" },
                { id: "variant-c", label: "C — Cinematic Marquee" },
              ].map((v) => (
                <a
                  key={v.id}
                  href={`#${v.id}`}
                  onClick={(e) => { e.preventDefault(); jumpTo(v.id); }}
                  className="jump-nav-link whitespace-nowrap text-sm font-medium transition-colors duration-200"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                >
                  {v.label}
                </a>
              ))}
            </nav>
          </div>
          <style>{`
            .jump-nav-link.active { color: hsl(var(--primary)); font-weight: 600; }
            .jump-nav-link:hover { color: hsl(var(--foreground)); }
          `}</style>
        </div>

        <section id="variant-a" className="scroll-mt-32">
          <div className="container max-w-[1248px] mx-auto px-6 py-8 border-b" style={{ borderColor: "hsl(var(--border))" }}>
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "hsl(var(--primary))" }}>VARIATION A</span>
            <h2 className="font-arefin-heading text-2xl mt-2 mb-1" style={{ color: "hsl(var(--foreground))" }}>Editorial Spotlight</h2>
            <p className="text-sm max-w-2xl" style={{ color: "hsl(var(--muted-foreground))" }}>
              Magazine-grade quote carousel — one review center stage, oversized opening quote, auto-advance + dot pagination.
            </p>
          </div>
          <TestimonialsV04LightA />
        </section>

        <section id="variant-b" className="scroll-mt-32">
          <div className="container max-w-[1248px] mx-auto px-6 py-8 border-b" style={{ borderColor: "hsl(var(--border))" }}>
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "hsl(var(--primary))" }}>VARIATION B</span>
            <h2 className="font-arefin-heading text-2xl mt-2 mb-1" style={{ color: "hsl(var(--foreground))" }}>Aurora Wall</h2>
            <p className="text-sm max-w-2xl" style={{ color: "hsl(var(--muted-foreground))" }}>
              Bento masonry — featured 2-col card, 6 reviews total, sharp directional shadow on hover, aggregate rating badge.
            </p>
          </div>
          <TestimonialsV04LightB />
        </section>

        <section id="variant-c" className="scroll-mt-32">
          <div className="container max-w-[1248px] mx-auto px-6 py-8 border-b" style={{ borderColor: "hsl(var(--border))" }}>
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "hsl(var(--primary))" }}>VARIATION C</span>
            <h2 className="font-arefin-heading text-2xl mt-2 mb-1" style={{ color: "hsl(var(--foreground))" }}>Cinematic Marquee</h2>
            <p className="text-sm max-w-2xl" style={{ color: "hsl(var(--muted-foreground))" }}>
              Dark brand band hero with massive 5.0 + infinite scrolling review rail. Pause on hover. Honors prefers-reduced-motion.
            </p>
          </div>
          <TestimonialsV04LightC />
        </section>

        <div className="h-20" />
      </main>

      <DrArefinFooter />
    </div>
  );
};

export default TestimonialsSectionVariations;
