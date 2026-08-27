import { useState } from "react";
import DrArefinHeader from "@/components/arefin/DrArefinHeader";
import darkLogo from "@/assets/dr-arefin-logo-dark.webp";
import HomeMobileHero, { type HomeMobileHeroVariant } from "@/components/arefin/hero-variations/HomeMobileHero";

const VARIANTS: { id: HomeMobileHeroVariant; label: string; desc: string }[] = [
  { id: "v1", label: "V1", desc: "Stacked compact" },
  { id: "v2", label: "V2", desc: "Side-aligned" },
  { id: "v3", label: "V3", desc: "Full-bleed bg" },
];

const HomeMobileHeroPreview = () => {
  const [variant, setVariant] = useState<HomeMobileHeroVariant>("v1");

  return (
    <div className="arefin dark min-h-screen bg-background text-foreground font-arefin">
      <DrArefinHeader logoSrc={darkLogo} />

      {/* Variant picker */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[80] flex gap-2 rounded-full border border-border bg-card/90 backdrop-blur-md p-1.5 shadow-lg">
        {VARIANTS.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setVariant(v.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              variant === v.id
                ? "bg-primary text-white"
                : "text-foreground/70 hover:text-foreground"
            }`}
            aria-pressed={variant === v.id}
            title={v.desc}
          >
            {v.label}
          </button>
        ))}
      </div>

      <HomeMobileHero variant={variant} />
    </div>
  );
};

export default HomeMobileHeroPreview;
