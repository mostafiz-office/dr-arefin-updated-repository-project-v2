import { Phone, ArrowRight, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import portrait from "@/assets/arefin-portrait-light.webp";

/**
 * Variation C (LIGHT) — "Asymmetric Bento with Portrait Left"
 */
const HeroV04LightC = () => {
  return (
    <section className="hero-04-light-band relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none hero-anim-ray"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(135deg, transparent 0%, transparent 55%, hsl(var(--hero-light-surface)) 60%, transparent 70%)",
        }}
      />

      <div className="container relative pt-12 pb-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative flex mx-auto max-w-md lg:max-w-none">
              <div className="hero-portrait-frame hero-anim-portrait hero-d-150 flex-1">
                <img
                  src={portrait}
                  alt="Dr. Murshidul Arefin, hepatobiliary surgeon"
                  className="w-full h-auto block aspect-[4/5] object-contain"
                  loading="eager"
                  fetchPriority="high"
                  width={860}
                  height={1075}
                />
              </div>
              <span
                className="hidden lg:block w-1 rounded-full ml-6 hero-anim-bar hero-d-450"
                style={{
                  background: "hsl(var(--hero-light-primary))",
                  minHeight: "100%",
                }}
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2 flex flex-col gap-6 lg:gap-8">
            <p className="hero-anim-fade-up hero-d-0 hero-eyebrow">
              Hepatobiliary Surgery · Dhaka
            </p>

            <h1 className="hero-h1 font-arefin-heading">
              <span className="block hero-anim-fade-up hero-d-100">
                Top{" "}
                <Link to="/treatment/" className="hero-h1-link">Hepatobiliary</Link>
                ,{" "}
                <Link to="/treatment/" className="hero-h1-link">Pancreatic</Link> &amp;
              </span>
              <span className="block hero-anim-fade-up hero-d-200">
                <Link to="/treatment/" className="hero-h1-link is-accent">
                  Liver Surgeon in Dhaka
                </Link>
              </span>
            </h1>

            <p className="hero-anim-fade-up hero-d-300 hero-lede">
              Patient-first surgical care by{" "}
              <Link to="/about/" className="hero-p-link">Dr. Murshidul Arefin</Link>{" "}
              specialised in{" "}
              <Link to="/treatment/" className="hero-p-link">Liver</Link>,{" "}
              <Link to="/treatment/" className="hero-p-link">Gall Bladder</Link>,{" "}
              <Link to="/treatment/" className="hero-p-link">Biliary Tract</Link>,{" "}
              <Link to="/treatment/" className="hero-p-link">Pancreas</Link>,{" "}
              <Link to="/treatment/" className="hero-p-link">Spleen</Link>,{" "}
              <Link to="/treatment/" className="hero-p-link">Stomach</Link> &amp;{" "}
              <Link to="/treatment/" className="hero-p-link">Upper&nbsp;GIT</Link> diseases.
            </p>

            <div className="hero-anim-fade-up hero-d-400 flex flex-col sm:flex-row gap-3">
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

            <ul className="hero-anim-fade-up hero-d-500 grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-[560px]">
              <li className="hero-iconbox">
                <span className="hero-iconbox-circle relative" aria-hidden="true">
                  <MapPin className="h-5 w-5" />
                  <span
                    className="absolute -top-0.5 -right-0.5 inline-flex h-2 w-2 rounded-full hero-anim-pulse-dot"
                    style={{ background: "hsl(var(--hero-light-primary))" }}
                  />
                </span>
                <div>
                  <div className="hero-iconbox-title">Available today</div>
                  <div className="hero-iconbox-sub">Popular Medical College, Dhanmondi</div>
                </div>
              </li>
              <li className="hero-iconbox">
                <span className="hero-iconbox-circle" aria-hidden="true">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <div className="hero-iconbox-title">Mon – Sat · 5pm – 9pm</div>
                  <div className="hero-iconbox-sub">+880 1311-487592</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroV04LightC;
