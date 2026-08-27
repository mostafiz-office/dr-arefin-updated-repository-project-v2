import { Link } from "react-router-dom";
import DrArefinHeader from "@/components/arefin/DrArefinHeaderLight";
import DrArefinFooter from "@/components/arefin/DrArefinFooter";
import ServicesV04LightA from "@/components/arefin/services-variations/ServicesV04LightA";
import ServicesV04LightB from "@/components/arefin/services-variations/ServicesV04LightB";
import ServicesV04LightC from "@/components/arefin/services-variations/ServicesV04LightC";
import { useEffect } from "react";

/**
 * Services Section Variations Preview Page
 * Route: /services
 */
const ServicesSectionVariations = () => {
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
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
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
            Comprehensive Services — Section Variations
          </h1>
          <p className="text-lg mb-8 max-w-3xl" style={{ color: "hsl(var(--muted-foreground))" }}>
            Three premium designs for the 6-card hepatobiliary services grid. Each card links into the corresponding
            entry on <code>/treatment/</code>.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/hero-variations/" className="text-sm font-medium hover:underline" style={{ color: "hsl(var(--primary))" }}>← Hero Variations</Link>
            <Link to="/value-proposition/" className="text-sm font-medium hover:underline" style={{ color: "hsl(var(--primary))" }}>← Value Proposition</Link>
            <Link to="/about-section/" className="text-sm font-medium hover:underline" style={{ color: "hsl(var(--primary))" }}>← About Section</Link>
            <Link to="/initiatives-section/" className="text-sm font-medium hover:underline" style={{ color: "hsl(var(--primary))" }}>← Initiatives Section</Link>
            <Link to="/metrics/" className="text-sm font-medium hover:underline" style={{ color: "hsl(var(--primary))" }}>← Metrics Section</Link>
            <Link to="/videos/" className="text-sm font-medium hover:underline" style={{ color: "hsl(var(--primary))" }}>← Videos Section</Link>
            <Link to="/call-to-care/" className="text-sm font-medium hover:underline" style={{ color: "hsl(var(--primary))" }}>→ Call to Care</Link>
          </div>
        </section>

        <div
          className="sticky top-[72px] z-30 border-y"
          style={{ background: "hsl(var(--card) / 0.95)", backdropFilter: "blur(8px)", borderColor: "hsl(var(--border))" }}
        >
          <div className="container max-w-[1248px] mx-auto px-6">
            <nav className="flex gap-6 overflow-x-auto py-3">
              {[
                { id: "variant-a", label: "A — Dark Bento (spec-true)" },
                { id: "variant-b", label: "B — Light Editorial" },
                { id: "variant-c", label: "C — Gradient Glass" },
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
            .jump-nav-link.active { color: hsl(var(--primary)) !important; font-weight: 600; }
            .jump-nav-link:hover { color: hsl(var(--foreground)) !important; }
          `}</style>
        </div>

        {/* Variant A */}
        <section id="variant-a" className="scroll-mt-32" style={{ background: "hsl(var(--background))" }}>
          <div className="container max-w-[1248px] mx-auto px-6 py-8 border-b" style={{ borderColor: "hsl(var(--border))" }}>
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "hsl(var(--primary))" }}>VARIATION A</span>
            <h2 className="font-arefin-heading text-2xl mt-2 mb-1" style={{ color: "hsl(var(--foreground))" }}>Dark Bento (spec-true)</h2>
            <p className="text-sm max-w-2xl" style={{ color: "hsl(var(--muted-foreground))" }}>
              Mirrors the source JSON design spec — dark cards (#111827-equivalent token) on a light page with green keyword chips.
            </p>
          </div>
          <ServicesV04LightA />
        </section>

        {/* Variant B */}
        <section id="variant-b" className="scroll-mt-32" style={{ background: "hsl(var(--background))" }}>
          <div className="container max-w-[1248px] mx-auto px-6 py-8 border-b" style={{ borderColor: "hsl(var(--border))" }}>
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "hsl(var(--primary))" }}>VARIATION B</span>
            <h2 className="font-arefin-heading text-2xl mt-2 mb-1" style={{ color: "hsl(var(--foreground))" }}>Light Editorial</h2>
            <p className="text-sm max-w-2xl" style={{ color: "hsl(var(--muted-foreground))" }}>
              Swiss medical-journal aesthetic — hairline dividers, indexed cards, sharp directional hover shadow.
            </p>
          </div>
          <ServicesV04LightB />
        </section>

        {/* Variant C */}
        <section id="variant-c" className="scroll-mt-32" style={{ background: "hsl(var(--background))" }}>
          <div className="container max-w-[1248px] mx-auto px-6 py-8 border-b" style={{ borderColor: "hsl(var(--border))" }}>
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "hsl(var(--primary))" }}>VARIATION C</span>
            <h2 className="font-arefin-heading text-2xl mt-2 mb-1" style={{ color: "hsl(var(--foreground))" }}>Gradient Glass Showcase</h2>
            <p className="text-sm max-w-2xl" style={{ color: "hsl(var(--muted-foreground))" }}>
              Premium glassmorphic cards over a primary-tinted gradient with decorative blobs and per-card CTA pills.
            </p>
          </div>
          <ServicesV04LightC />
        </section>

        <div className="h-20" />
      </main>

      <DrArefinFooter />
    </div>
  );
};

export default ServicesSectionVariations;
