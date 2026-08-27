import DrArefinHeader from "@/components/arefin/DrArefinHeader";
import darkLogo from "@/assets/dr-arefin-logo-dark.webp";
import HeroV04InteractiveOrgans from "@/components/arefin/hero-variations/HeroV04InteractiveOrgans";

const HeroSectionUpdate = () => {
  return (
    <div className="arefin dark min-h-screen bg-background text-foreground font-arefin">
      <DrArefinHeader logoSrc={darkLogo} />
      <HeroV04InteractiveOrgans />
    </div>
  );
};

export default HeroSectionUpdate;
