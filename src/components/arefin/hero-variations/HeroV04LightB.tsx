import { Phone, ArrowRight, Star, Award, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import portrait from "@/assets/arefin-portrait-light.webp";

/**
 * Variation B (LIGHT) — "Centered with Floating Credential Cards"
 */
const HeroV04LightB = () => {
  return (
    <section className="hero-04-light-band relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(40% 50% at 80% 15%, hsl(var(--hero-light-surface)) 0%, transparent 70%),
            radial-gradient(45% 55% at 15% 90%, hsl(var(--hero-light-surface)) 0%, transparent 70%)
          `,
        }}
      />
      <div className="hero-04-light-dots absolute inset-0 pointer-events-none opacity-60" aria-hidden="true" />

      <div className="container relative pt-12 pb-16 md:py-20 lg:py-24">
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-6 lg:gap-8 items-center">
          <p className="hero-anim-fade-up hero-d-0 hero-eyebrow">
            Hepatobiliary Surgery · Dhaka
          </p>

          <h1 className="hero-h1 font-arefin-heading">
            <span className="block hero-anim-fade-up hero-d-0">
              Top{" "}
              <Link to="/treatment/" className="hero-h1-link">Hepatobiliary</Link>
              ,{" "}
              <Link to="/treatment/" className="hero-h1-link">Pancreatic</Link> &amp;
            </span>
            <span className="block hero-anim-fade-up hero-d-100">
              Liver Surgeon in{" "}
              <Link to="/contact/" className="hero-h1-link is-accent">Dhaka</Link>
            </span>
          </h1>

          <p className="hero-anim-fade-up hero-d-200 hero-lede mx-auto">
            Patient friendly, highly skilled surgical care by{" "}
            <Link to="/about/" className="hero-p-link">Dr. Murshidul Arefin</Link>{" "}
            <Link to="/treatment/" className="hero-p-link">Liver</Link>,{" "}
            <Link to="/treatment/" className="hero-p-link">Gall Bladder</Link>,{" "}
            <Link to="/treatment/" className="hero-p-link">Biliary Tract</Link>,{" "}
            <Link to="/treatment/" className="hero-p-link">Pancreas</Link>,{" "}
            <Link to="/treatment/" className="hero-p-link">Spleen</Link>,{" "}
            <Link to="/treatment/" className="hero-p-link">Stomach</Link> &amp;{" "}
            <Link to="/treatment/" className="hero-p-link">Upper&nbsp;GIT</Link> diseases.{" "}
            <Link to="/contact/" className="hero-p-link">Popular Medical College Hospital</Link>,{" "}
            <Link to="/contact/" className="hero-p-link">Dhanmondi</Link>.
          </p>

          <div className="hero-anim-fade-up hero-d-300 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact/"
              aria-label="Book an appointment with Dr. Arefin"
              className="hero-cta-primary"
            >
              Book an Appointment
              <ArrowRight className="hero-cta-icon" />
            </Link>
            <a
              href="tel:+8801311487592"
              aria-label="Call Dr. Arefin"
              className="hero-cta-secondary"
            >
              <Phone className="hero-cta-icon-sm" />
              Call Now
            </a>
          </div>
        </div>

        {/* Portrait + floating cards */}
        <div className="relative mt-12 lg:mt-16 mx-auto max-w-[560px]">
          <div className="hero-portrait-frame hero-anim-portrait hero-d-150 mx-auto max-w-[480px]">
            <img
              src={portrait}
              alt="Dr. Murshidul Arefin, hepatobiliary surgeon"
              className="w-full h-auto block aspect-[5/6] object-contain"
              loading="eager"
              fetchPriority="high"
              width={960}
              height={1152}
            />
          </div>

          <div className="hidden lg:block">
            <div className="absolute top-8 left-0 hero-anim-card hero-d-450 hero-anim-float">
              <div className="hero-cred-card">
                <div className="flex items-center gap-2 mb-1">
                  <span className="hero-cred-icon">
                    <Star className="h-4 w-4" />
                  </span>
                  <div className="font-arefin-heading text-sm leading-tight hero-strong">
                    FCPS · MS Hepatobiliary
                  </div>
                </div>
                <div className="text-[11px] leading-snug" style={{ color: "hsl(var(--hero-light-muted))" }}>
                  Bangabandhu Sheikh Mujib Medical Univ.
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-0 hero-anim-card hero-d-550 hero-anim-float-slow">
              <div className="hero-cred-card">
                <div className="flex items-center gap-2 mb-1">
                  <span className="hero-cred-icon">
                    <Award className="h-4 w-4" />
                  </span>
                  <div className="font-arefin-heading text-sm leading-tight hero-strong">
                    20+ Years · 1500+ Surgeries
                  </div>
                </div>
                <div className="text-[11px] leading-snug" style={{ color: "hsl(var(--hero-light-muted))" }}>
                  Hepatobiliary &amp; pancreatic specialist
                </div>
              </div>
            </div>
            <div className="absolute -bottom-2 left-2 hero-anim-card hero-d-650 hero-anim-float">
              <div className="hero-cred-card">
                <div className="flex items-center gap-2 mb-1">
                  <span className="hero-cred-icon">
                    <Building2 className="h-4 w-4" />
                  </span>
                  <div className="font-arefin-heading text-sm leading-tight hero-strong">
                    Popular Medical College
                  </div>
                </div>
                <div className="text-[11px] leading-snug" style={{ color: "hsl(var(--hero-light-muted))" }}>
                  Dhanmondi, Dhaka
                </div>
              </div>
            </div>
          </div>

          <div className="lg:hidden mt-6 flex flex-wrap justify-center gap-2">
            <InlinePill icon={<Star className="h-3.5 w-3.5" />} text="FCPS · MS" />
            <InlinePill icon={<Award className="h-3.5 w-3.5" />} text="20+ Yrs · 1500+ Surgeries" />
            <InlinePill icon={<Building2 className="h-3.5 w-3.5" />} text="Popular Medical College" />
          </div>
        </div>
      </div>
    </section>
  );
};

const InlinePill = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <span
    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
    style={{
      background: "hsl(var(--hero-light-bg))",
      border: "1px solid hsl(var(--hero-light-border))",
      color: "hsl(var(--hero-light-deep))",
    }}
  >
    <span style={{ color: "hsl(var(--hero-light-primary))" }}>{icon}</span>
    {text}
  </span>
);

export default HeroV04LightB;
