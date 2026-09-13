import { useEffect, useRef, useState } from "react";
import { Phone, ArrowRight, Award, Stethoscope, Heart, Pill, Syringe, Activity, Shield, Microscope, Thermometer, Cross } from "lucide-react";
import { Link } from "react-router-dom";
import portrait from "@/assets/arefin-portrait-light.webp";
import organLiver from "@/assets/organ-liver-3d.webp";
import organGallbladder from "@/assets/organ-gallbladder-3d.webp";
import organStomach from "@/assets/organ-stomach-3d.webp";
import OrganGapDebugOverlay from "./OrganGapDebugOverlay";
import { useHoverSound } from "@/hooks/useHoverSound";

type OrganOrb = {
  id: string;
  src: string;
  alt: string;
  href: string;
  question: string;
  cta: string;
  ctaShort: string;
  positionClass: string;
  delay: string;
};

const ORGAN_ORBS: OrganOrb[] = [
  {
    id: "liver",
    src: organLiver,
    alt: "Liver — hepatic surgery",
    href: "/treatment/liver-surgery/",
    question: "Worried about liver disease or transplant?",
    cta: "See liver surgery care",
    ctaShort: "See liver care",
    positionClass: "organ-orb--top-left",
    delay: "0s",
  },
  {
    id: "gallbladder",
    src: organGallbladder,
    alt: "Gallbladder — gallstone & cholecystectomy",
    href: "/treatment/gallbladder-surgery/",
    question: "Gallstones causing pain?",
    cta: "Explore gallbladder treatment",
    ctaShort: "Treat gallstones",
    positionClass: "organ-orb--mid-right",
    delay: "1.2s",
  },
  {
    id: "stomach",
    src: organStomach,
    alt: "Stomach — upper GI surgery",
    href: "/treatment/",
    question: "Persistent stomach issues?",
    cta: "Get expert upper-GI care",
    ctaShort: "Get GI care",
    positionClass: "organ-orb--bottom-left",
    delay: "2.4s",
  },
];

/**
 * HeroV04InteractiveOrgans — same as HeroV04LightA, but the portrait area
 * is wrapped in `.organ-stage` with three colorful 3D organ orbs floating
 * around Dr. Arefin. Idle: gentle float + slow rotate. Portrait hover:
 * orbs energize (saturation + glow). Orb hover: tooltip card with a
 * catchy question + CTA link.
 */
const HeroV04InteractiveOrgans = () => {
  const playSwoosh = useHoverSound();
  const [activeOrb, setActiveOrb] = useState<string | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeOrb) return;
    const onDocClick = (e: MouseEvent) => {
      if (!stageRef.current?.contains(e.target as Node)) setActiveOrb(null);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [activeOrb]);
  return (
    <section className="hero-04-light-band relative">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(58% 65% at 82% 45%, hsl(var(--hero-light-primary) / 0.18) 0%, hsl(var(--hero-light-surface)) 38%, transparent 78%),
            radial-gradient(28% 40% at 8% 92%, hsl(var(--hero-light-surface)) 0%, transparent 75%)
          `,
        }}
      />

      <div className="container relative pt-12 pb-12 md:pt-20 md:pb-20 lg:pt-24 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,13fr)_minmax(0,8fr)] xl:grid-cols-5 gap-10 lg:gap-8 xl:gap-12 items-start">
          {/* LEFT 60% — order-2 on mobile so portrait appears above text */}
          <div className="order-2 lg:order-1 min-w-0 xl:col-span-3 flex flex-col gap-6 lg:gap-8">
            <p className="hero-anim-fade-up hero-d-0 hero-eyebrow">
              Hepatobiliary · Pancreatic · Upper-GI Surgery
            </p>

            <h1 className="hero-h1 hero-h1-three-lines font-arefin-heading">
              <span className="block whitespace-nowrap hero-anim-fade-up hero-d-0">
                <Link to="/treatment/gallbladder-surgery/" className="hero-h1-link">Gallbladder</Link>
                <span className="whitespace-nowrap">, </span>
                <Link to="/treatment/liver-surgeon-dhaka/" className="hero-h1-link">Liver Surgeon</Link>
              </span>
              <span className="block whitespace-nowrap hero-anim-fade-up hero-d-100">
                <Link to="/treatment/laparoscopic-cholecystectomy/" className="hero-h1-link is-accent">
                  Advanced Laparoscopic
                </Link>
              </span>
              <span className="block whitespace-nowrap hero-anim-fade-up hero-d-200">Care in Dhaka</span>
            </h1>

            <p className="hero-anim-fade-up hero-d-200 hero-lede">
              Patient friendly, highly skilled surgical care by{" "}
              <Link to="/about/" className="hero-p-link">Dr. Murshidul Arefin</Link> for{" "}
              <Link to="/treatment/liver-surgery/" className="hero-p-link">Liver</Link>,{" "}
              <Link to="/treatment/gallbladder-surgery/" className="hero-p-link">Gall Bladder</Link>,{" "}
              <Link to="/treatment/bile-duct-surgery/" className="hero-p-link">Biliary Tract</Link>,{" "}
              <Link to="/best-hepatobiliary-surgeon-dhaka/" className="hero-p-link">Pancreas</Link>,{" "}
              <Link to="/treatment/" className="hero-p-link">Stomach</Link> &amp;{" "}
              <Link to="/treatment/" className="hero-p-link">Upper&nbsp;GIT</Link> diseases at{" "}
              <Link to="/popular-medical-college-hospital/" className="hero-p-link">Popular Medical College Hospital</Link>, Dhanmondi.
            </p>

            <div className="hero-anim-fade-up hero-d-300 flex flex-col sm:flex-row gap-3">
              <Link
                to="/contact/"
                aria-label="Book an appointment with Dr. Arefin"
                className="hero-cta-primary is-green"
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

            <ul className="hero-anim-fade-up hero-d-400 mt-2 grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-[560px]">
              <li>
                <Link
                  to="/about/"
                  title="Learn more about Dr. Arefin's FCPS and MS Hepatobiliary credentials, fellowship training, and 20+ years of surgical experience"
                  className="hero-iconbox hero-iconbox-link"
                >
                  <span className="hero-iconbox-circle" aria-hidden="true">
                    <Award className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="hero-iconbox-title">FCPS · MS Hepatobiliary</div>
                    <div className="hero-iconbox-sub">20+ years · 1500+ surgeries</div>
                  </div>
                </Link>
              </li>
              <li>
                <a
                  href="https://clink.rasia.pro/best-hepatobiliary-surgeon-in-dhaka"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open Popular Medical College Hospital, Dhanmondi, Dhaka in Google Maps — Dr. Arefin's chamber location"
                  className="hero-iconbox hero-iconbox-link"
                >
                  <span className="hero-iconbox-circle" aria-hidden="true">
                    <Stethoscope className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="hero-iconbox-title">Popular Medical College</div>
                    <div className="hero-iconbox-sub">Dhanmondi, Dhaka</div>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* RIGHT 40% — Portrait + interactive organ orbit. order-1 on mobile (image first). */}
          <div className="order-1 lg:order-2 min-w-0 xl:col-span-2 relative z-0 lg:mt-[-40px] xl:mt-[-60px]">
            <div ref={stageRef} className="organ-stage relative mx-auto max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-none">
              {/* Behind-doctor ambient medical icons (frosted, lower z) */}
              <span className="med-icon-float is-behind med-float-a" style={{ top: '6%', left: '2%', zIndex: 0 }} aria-hidden="true">
                <Heart className="w-10 h-10" />
              </span>
              <span className="med-icon-float is-behind med-float-c" style={{ top: '50%', right: '0%', zIndex: 0 }} aria-hidden="true">
                <Activity className="w-9 h-9" />
              </span>
              <span className="med-icon-float is-behind med-float-e" style={{ bottom: '25%', left: '6%', zIndex: 0 }} aria-hidden="true">
                <Shield className="w-8 h-8" />
              </span>
              <span className="med-icon-float is-behind med-float-g" style={{ top: '30%', left: '-8%', zIndex: 0 }} aria-hidden="true">
                <Thermometer className="w-9 h-9" />
              </span>

              {/* Portrait — when hovered/focused, energizes all orbs via :hover ~ .organ-orb */}
              <div
                className="organ-portrait-wrap hero-portrait-frame is-blend hero-anim-portrait hero-d-150 lg:scale-105 lg:origin-top relative z-[1]"
                tabIndex={0}
              >
                <img
                  src={portrait}
                  alt="Dr. Murshidul Arefin, hepatobiliary surgeon, in green surgical scrubs"
                  className="w-full h-auto block aspect-[4/5] object-contain"
                  loading="eager"
                  fetchPriority="high"
                  width={860}
                  height={1075}
                />
              </div>

              {ORGAN_ORBS.map((orb) => {
                const tooltipId = `organ-tooltip-${orb.id}`;
                return (
                  <Link
                    key={orb.id}
                    to={orb.href}
                    className={`organ-orb ${orb.positionClass}${activeOrb === orb.id ? " is-active" : ""}`}
                    data-delay={orb.delay}
                    aria-label={`${orb.alt} — ${orb.cta}`}
                    aria-describedby={tooltipId}
                    aria-expanded={activeOrb === orb.id}
                    onMouseEnter={playSwoosh}
                    onFocus={playSwoosh}
                    onClick={(e) => {
                      // Tap-to-toggle on touch / coarse pointers: first tap reveals the
                      // card, second tap navigates. Hover-capable devices keep direct nav.
                      const isCoarse = window.matchMedia("(hover: none)").matches;
                      if (isCoarse && activeOrb !== orb.id) {
                        e.preventDefault();
                        setActiveOrb(orb.id);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        e.preventDefault();
                        setActiveOrb(null);
                        (e.currentTarget as HTMLAnchorElement).blur();
                      }
                    }}
                  >
                    <span className="organ-orb-glow" aria-hidden="true" />
                    <span
                      className="organ-orb-img-wrap"
                      style={{ animationDelay: orb.delay }}
                      aria-hidden="true"
                    >
                      <img
                        src={orb.src}
                        alt=""
                        className="organ-orb-img"
                        loading="lazy"
                        width={256}
                        height={256}
                      />
                    </span>
                    <div className="organ-tooltip" role="tooltip" id={tooltipId}>
                      <span
                        className="organ-tooltip-close"
                        role="button"
                        tabIndex={0}
                        aria-label="Close"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveOrb(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveOrb(null);
                          }
                        }}
                      >
                        ×
                      </span>
                      <p className="organ-tooltip-q">{orb.question}</p>
                      <span className="organ-tooltip-cta">
                        <span className="organ-tooltip-cta-full">{orb.cta} →</span>
                        <span className="organ-tooltip-cta-short">{orb.ctaShort} →</span>
                      </span>
                    </div>
                  </Link>
                );
              })}

              {/* Front-of-doctor ambient medical icons (crisp, higher z) */}
              <span className="med-icon-float med-float-b" style={{ top: '10%', right: '5%', zIndex: 2 }} aria-hidden="true">
                <Pill className="w-8 h-8" />
              </span>
              <span className="med-icon-float med-float-d" style={{ top: '38%', right: '-6%', zIndex: 2 }} aria-hidden="true">
                <Syringe className="w-11 h-11" />
              </span>
              <span className="med-icon-float med-float-f" style={{ bottom: '18%', right: '8%', zIndex: 2 }} aria-hidden="true">
                <Microscope className="w-9 h-9" />
              </span>
              <span className="med-icon-float med-float-h" style={{ top: '18%', left: '-4%', zIndex: 2 }} aria-hidden="true">
                <Cross className="w-7 h-7" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <OrganGapDebugOverlay />
    </section>
  );
};

export default HeroV04InteractiveOrgans;
