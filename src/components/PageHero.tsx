import { Reveal } from "@/hooks/useScrollReveal";
import pageHeroBg from "@/assets/page-hero-bg.webp";

type HeroVariant = "image-overlay" | "geometric" | "aurora";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  titleAttr?: string;
  sectionTitle?: string;
  variant?: HeroVariant;
  backgroundImage?: string;
}

const GeometricBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Dark base */}
    <div className="absolute inset-0 bg-[hsl(var(--card))]" />

    {/* Geometric shapes */}
    <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>

    {/* Floating geometric shapes */}
    <div
      className="absolute top-[15%] left-[10%] w-32 h-32 border border-[hsl(var(--primary)/0.15)] rotate-45 animate-[spin_25s_linear_infinite]"
    />
    <div
      className="absolute bottom-[20%] right-[15%] w-24 h-24 border border-[hsl(var(--accent)/0.12)] rotate-12 animate-[spin_30s_linear_infinite_reverse]"
    />
    <div
      className="absolute top-[40%] right-[25%] w-16 h-16 bg-[hsl(var(--primary)/0.05)] rotate-[30deg]"
    />
    <div
      className="absolute bottom-[30%] left-[20%] w-20 h-20 rounded-full border border-[hsl(var(--primary)/0.1)]"
    />

    {/* Hexagon cluster */}
    <svg className="absolute top-[10%] right-[8%] w-40 h-40 opacity-[0.08]" viewBox="0 0 100 100">
      <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
      <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" fill="none" stroke="hsl(var(--accent))" strokeWidth="0.5" />
    </svg>

    {/* Subtle gradient overlay for depth */}
    <div
      className="absolute inset-0"
      style={{
        background: 'radial-gradient(ellipse at 30% 50%, hsl(var(--primary) / 0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, hsl(var(--accent) / 0.05) 0%, transparent 50%)'
      }}
    />
  </div>
);

const AuroraBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Dark base */}
    <div className="absolute inset-0 bg-[hsl(var(--card))]" />

    {/* Aurora blobs */}
    <div
      className="absolute -top-[40%] -left-[20%] w-[80%] h-[150%] rounded-full opacity-[0.12] blur-[100px] animate-[aurora-1_8s_ease-in-out_infinite]"
      style={{ background: 'linear-gradient(135deg, #C9FFF7, #C6CFFF)' }}
    />
    <div
      className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[120%] rounded-full opacity-[0.10] blur-[120px] animate-[aurora-2_10s_ease-in-out_infinite]"
      style={{ background: 'linear-gradient(225deg, #FFB8B1, #C9FFF7)' }}
    />
    <div
      className="absolute top-[10%] right-[20%] w-[40%] h-[80%] rounded-full opacity-[0.08] blur-[80px] animate-[aurora-3_12s_ease-in-out_infinite]"
      style={{ background: 'linear-gradient(180deg, #FBE8A4, #FFB8B1)' }}
    />
  </div>
);

const PageHero = ({ title, subtitle, titleAttr, sectionTitle, variant = "image-overlay", backgroundImage }: PageHeroProps) => {
  const bgImage = backgroundImage || pageHeroBg;

  return (
    <section
      title={sectionTitle || titleAttr || title}
      className="seo-page-parent-block relative overflow-hidden"
    >
      {/* Variant backgrounds */}
      {variant === "image-overlay" && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(12, 40, 24, 0.88) 0%, rgba(17, 17, 17, 0.92) 100%)' }}
          />
        </>
      )}

      {variant === "geometric" && <GeometricBackground />}
      {variant === "aurora" && <AuroraBackground />}

      {/* DesignMonks-style decorative color strip */}
      <div
        className="absolute top-0 left-0 right-0 z-[1]"
        style={{
          height: '6px',
          background: 'linear-gradient(to right, #C9FFF7 0%, #C9FFF7 25%, #FFB8B1 25%, #FFB8B1 50%, #C6CFFF 50%, #C6CFFF 75%, #FBE8A4 75%, #FBE8A4 100%)'
        }}
      />

      <div className="container relative z-[1] py-20 md:py-28 text-center flex flex-col items-center justify-center min-h-[280px] md:min-h-[360px] seo-parent-block">
        <Reveal>
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
            title={titleAttr || title}
          >
            {title}
          </h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={100}>
            <p
              className="text-base md:text-lg max-w-2xl mx-auto seo-container-para"
              style={{ color: "#CCCCCC", textShadow: '0 1px 10px rgba(0,0,0,0.4)' }}
              title={subtitle}
            >
              {subtitle}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default PageHero;
