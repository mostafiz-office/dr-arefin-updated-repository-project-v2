import { Phone, ArrowRight, Award, Stethoscope, Heart, Pill, Syringe, Activity, Shield, Microscope, Thermometer, Cross } from "lucide-react";
import { Link } from "react-router-dom";
import portrait from "@/assets/arefin-portrait-light.webp";

/**
 * Variation A (LIGHT) — "Authority Split Right"
 * Refactored per hero-typography-fix issues #1–#20.
 *  - Token-based pill CTAs (no inline styles, no JS hover handlers)
 *  - Tightened eyebrow tracking, fluid H1 with proper line-height
 *  - 8px-grid vertical rhythm, max-w 560px paragraph
 *  - Trust strip replaced with 2 ATTO-style icon-boxes
 *  - Portrait radius reduced to clinical 16px (rounded-2xl)
 */
const HeroV04LightA = () => {
  return (
    <section className="hero-04-light-band relative">
      {/* Soft sage ambient blobs — anchored behind portrait + H1 negative space */}
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
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 items-start">
          {/* LEFT 60% */}
          <div className="lg:col-span-3 flex flex-col gap-6 lg:gap-8">
            <p className="hero-anim-fade-up hero-d-0 hero-eyebrow">
              Hepatobiliary Surgery · Dhaka
            </p>

            <h1 className="hero-h1 font-arefin-heading">
              <span className="block hero-anim-fade-up hero-d-0">
                Top{" "}
                <Link to="/treatment/hepatobiliary-surgery/" title="Hepatobiliary surgery in Dhaka by Dr. Arefin — liver, gallbladder, bile duct procedures" className="hero-h1-link">Hepatobiliary</Link>,{" "}
                <Link to="/best-hepatobiliary-surgeon-dhaka/" title="Best hepatobiliary and pancreatic surgeon in Dhaka — Dr. Murshidul Arefin credentials" className="hero-h1-link">Pancreatic</Link>
                <span className="whitespace-nowrap">&nbsp;&amp;</span>
              </span>
              <span className="block hero-anim-fade-up hero-d-100">
                <Link to="/treatment/liver-surgeon-dhaka/" title="Best liver surgeon in Dhaka — Dr. Murshidul Arefin at Popular Medical College Hospital, Dhanmondi" className="hero-h1-link is-accent">
                  Liver Surgeon in Dhaka
                </Link>
              </span>
            </h1>

            <p className="hero-anim-fade-up hero-d-200 hero-lede">
              Patient friendly, highly skilled surgical care by{" "}
              <Link to="/about/" title="About Dr. Murshidul Arefin" className="hero-p-link">Dr. Murshidul Arefin</Link>{" "}
              <Link to="/treatment/fatty-liver-management/" title="Fatty liver disease management and liver care by Dr. Arefin in Dhaka" className="hero-p-link">Liver</Link>,{" "}
              <Link to="/conditions/gallstones/" title="Gallstones and gallbladder stone removal surgery in Dhaka" className="hero-p-link">Gall Bladder</Link>,{" "}
              <Link to="/treatment/bile-duct-surgery/" title="Bile duct surgery, reconstruction and biliary tract procedures in Dhaka" className="hero-p-link">Biliary Tract</Link>,{" "}
              <Link to="/best-hepatobiliary-surgeon-dhaka/" title="Pancreatic surgery and Whipple procedure by best hepatobiliary surgeon in Dhaka" className="hero-p-link">Pancreas</Link>,{" "}
              <Link to="/treatment/spleen-surgery/" title="Spleen surgery and splenectomy by Dr. Arefin in Dhaka" className="hero-p-link">Spleen</Link>,{" "}
              <Link to="/treatment/" className="hero-p-link">Stomach</Link> &amp;{" "}
              <Link to="/treatment/" className="hero-p-link">Upper&nbsp;GIT</Link> diseases.{" "}
              Specialising in <Link to="/treatment/laparoscopic-surgery/" title="Laparoscopic keyhole surgery in Dhaka — minimally invasive hepatobiliary procedures" className="hero-p-link">laparoscopic surgery</Link> and{" "}
              <Link to="/treatment/liver-transplant-coordination/" title="Liver transplant coordination, donor evaluation and post-transplant care in Dhaka" className="hero-p-link">liver transplant coordination</Link>{" "}
              at{" "}
              <Link to="/popular-medical-college-hospital/" title="Dr. Arefin chamber at Popular Medical College Hospital, Dhanmondi, Dhaka" className="hero-p-link">Popular Medical College Hospital</Link>,{" "}
              <Link to="/popular-medical-college-hospital/" title="Visit Dr. Arefin's Dhanmondi chamber — directions and visiting hours" className="hero-p-link">Dhanmondi</Link>.
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

            {/* Trust — 2 ATTO-style icon-boxes (replaces 4-col data table) */}
            <ul className="hero-anim-fade-up hero-d-400 mt-2 grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-[560px]">
              <li className="hero-iconbox">
                <span className="hero-iconbox-circle" aria-hidden="true">
                  <Award className="h-5 w-5" />
                </span>
                <div>
                  <div className="hero-iconbox-title">FCPS · MS Hepatobiliary</div>
                  <div className="hero-iconbox-sub">20+ years · 1500+ surgeries</div>
                </div>
              </li>
              <li className="hero-iconbox">
                <span className="hero-iconbox-circle" aria-hidden="true">
                  <Stethoscope className="h-5 w-5" />
                </span>
                <div>
                  <div className="hero-iconbox-title">Popular Medical College</div>
                  <div className="hero-iconbox-sub">Dhanmondi, Dhaka</div>
                </div>
              </li>
            </ul>
          </div>

          {/* RIGHT 40% — Portrait (extends below hero into value-prop section) */}
          <div className="lg:col-span-2 relative z-0 lg:mt-[-80px] xl:mt-[-100px] lg:mb-[-180px] xl:mb-[-220px]">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Behind-doctor icons (lower z-index, blurred frosted-glass) */}
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

              {/* Doctor portrait */}
              <div className="hero-portrait-frame is-blend hero-anim-portrait hero-d-150 lg:scale-110 lg:origin-top relative z-[1]">
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

              {/* Front-of-doctor icons (higher z-index, crisp glass) */}
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
    </section>
  );
};

export default HeroV04LightA;
