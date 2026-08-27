import { Link } from "react-router-dom";
import DrArefinHeader from "@/components/arefin/DrArefinHeaderLight";
import DrArefinFooter from "@/components/arefin/DrArefinFooter";
import InitiativesV04LightA from "@/components/arefin/initiatives-variations/InitiativesV04LightA";
import InitiativesV04LightB from "@/components/arefin/initiatives-variations/InitiativesV04LightB";
import InitiativesV04LightC from "@/components/arefin/initiatives-variations/InitiativesV04LightC";
import { useEffect } from "react";

/**
 * Initiatives Section Variations Preview Page
 * Routes: /initiatives-section
 * Renders A/B/C variations with sticky jump-nav.
 */
const InitiativesSectionVariations = () => {
  // Scrollspy highlight
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
        {/* Intro */}
        <section className="container max-w-[1248px] mx-auto px-6 py-16 md:py-20">
          <h1
            className="font-arefin-heading text-3xl md:text-4xl lg:text-5xl mb-4"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Our Initiatives — Section Variations
          </h1>
          <p className="text-lg mb-8 max-w-3xl" style={{ color: "hsl(var(--muted-foreground))" }}>
            Three premium medical design approaches for the Our Initiatives section.
            Each balances clinical authority with community warmth.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/hero-variations/"
              className="text-sm font-medium hover:underline"
              style={{ color: "hsl(var(--primary))" }}
            >
              ← Hero Variations
            </Link>
            <Link
              to="/value-proposition/"
              className="text-sm font-medium hover:underline"
              style={{ color: "hsl(var(--primary))" }}
            >
              ← Value Proposition
            </Link>
            <Link
              to="/about-section/"
              className="text-sm font-medium hover:underline"
              style={{ color: "hsl(var(--primary))" }}
            >
              ← About Section
            </Link>
            <Link
              to="/metrics/"
              className="text-sm font-medium hover:underline"
              style={{ color: "hsl(var(--primary))" }}
            >
              → Metrics Section
            </Link>
            <Link
              to="/videos/"
              className="text-sm font-medium hover:underline"
              style={{ color: "hsl(var(--primary))" }}
            >
              → Videos Section
            </Link>
            <Link
              to="/services/"
              className="text-sm font-medium hover:underline"
              style={{ color: "hsl(var(--primary))" }}
            >
              → Services Section
            </Link>
            <Link
              to="/call-to-care/"
              className="text-sm font-medium hover:underline"
              style={{ color: "hsl(var(--primary))" }}
            >
              → Call to Care
            </Link>
          </div>
        </section>

        {/* Sticky Jump Nav */}
        <div
          className="sticky top-[72px] z-30 border-y"
          style={{
            background: "hsl(var(--card) / 0.95)",
            backdropFilter: "blur(8px)",
            borderColor: "hsl(var(--border))",
          }}
        >
          <div className="container max-w-[1248px] mx-auto px-6">
            <nav className="flex gap-6 overflow-x-auto py-3">
              {[
                { id: "variant-a", label: "A — Editorial" },
                { id: "variant-b", label: "B — Elevated" },
                { id: "variant-c", label: "C — Feature Grid" },
              ].map((v) => (
                <a
                  key={v.id}
                  href={`#${v.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    jumpTo(v.id);
                  }}
                  className="jump-nav-link whitespace-nowrap text-sm font-medium transition-colors duration-200"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                >
                  {v.label}
                </a>
              ))}
            </nav>
          </div>
          <style>{`
            .jump-nav-link.active {
              color: hsl(var(--primary)) !important;
              font-weight: 600;
            }
            .jump-nav-link:hover {
              color: hsl(var(--foreground)) !important;
            }
          `}</style>
        </div>

        {/* Variant A — Editorial */}
        <section
          id="variant-a"
          className="scroll-mt-32"
          style={{ background: "hsl(var(--background))" }}
        >
          <div
            className="container max-w-[1248px] mx-auto px-6 py-8 border-b"
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "hsl(var(--primary))" }}
            >
              VARIATION A
            </span>
            <h2
              className="font-arefin-heading text-2xl mt-2 mb-1"
              style={{ color: "hsl(var(--foreground))" }}
            >
              Editorial Minimal
            </h2>
            <p className="text-sm max-w-2xl" style={{ color: "hsl(var(--muted-foreground))" }}>
              Swiss editorial style — whitespace defines separation. Clean typography, subtle
              divider lines, minimal chrome. Medical journal aesthetic.
            </p>
          </div>
          <InitiativesV04LightA />
        </section>

        {/* Variant B — Elevated */}
        <section
          id="variant-b"
          className="scroll-mt-32"
          style={{ background: "hsl(var(--background))" }}
        >
          <div
            className="container max-w-[1248px] mx-auto px-6 py-8 border-b"
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "hsl(var(--primary))" }}
            >
              VARIATION B
            </span>
            <h2
              className="font-arefin-heading text-2xl mt-2 mb-1"
              style={{ color: "hsl(var(--foreground))" }}
            >
              Elevated Cards
            </h2>
            <p className="text-sm max-w-2xl" style={{ color: "hsl(var(--muted-foreground))" }}>
              Premium glass-morphic cards with soft shadows, rounded-2xl corners, and gradient
              icon containers. Boutique private practice feel.
            </p>
          </div>
          <InitiativesV04LightB />
        </section>

        {/* Variant C — Feature Grid */}
        <section
          id="variant-c"
          className="scroll-mt-32"
          style={{ background: "hsl(var(--background))" }}
        >
          <div
            className="container max-w-[1248px] mx-auto px-6 py-8 border-b"
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "hsl(var(--primary))" }}
            >
              VARIATION C
            </span>
            <h2
              className="font-arefin-heading text-2xl mt-2 mb-1"
              style={{ color: "hsl(var(--foreground))" }}
            >
              Feature Grid
            </h2>
            <p className="text-sm max-w-2xl" style={{ color: "hsl(var(--muted-foreground))" }}>
              Bold asymmetric layout with prominent numbers and impact-focused presentation.
              Center card emphasized. NGO/impact report aesthetic.
            </p>
          </div>
          <InitiativesV04LightC />
        </section>

        {/* Bottom spacer */}
        <div className="h-20" />
      </main>

      <DrArefinFooter />
    </div>
  );
};

export default InitiativesSectionVariations;
