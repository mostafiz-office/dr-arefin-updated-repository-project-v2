import { Phone, ArrowRight, Award } from "lucide-react";
import { Link } from "react-router-dom";
import portrait from "@/assets/arefin-portrait-light.webp";

/**
 * HomeMobileHeroV3 — Full-Bleed Background.
 * Portrait fills the frame; gradient fades to background; text anchored bottom.
 * Mobile/tablet only.
 */
const HomeMobileHeroV3 = () => {
  return (
    <section className="hmh-v3 relative overflow-hidden">
      <img
        src={portrait}
        alt="Dr. Murshidul Arefin, hepatobiliary surgeon"
        className="hmh-v3-bg-img"
        loading="eager"
        fetchPriority="high"
        width={860}
        height={1075}
      />
      <div className="hmh-v3-overlay" aria-hidden="true" />

      <div className="container hmh-v3-inner">
        <div className="hmh-v3-text">
          <p className="hmh-v3-eyebrow">Hepatobiliary · Dhaka</p>

          <h1 className="hmh-v3-h1 font-arefin-heading">
            Top{" "}
            <Link to="/treatment/hepatobiliary-surgery/" className="hmh-v3-link">
              Hepatobiliary
            </Link>{" "}
            &amp;{" "}
            <Link
              to="/treatment/liver-surgeon-dhaka/"
              className="hmh-v3-link is-accent"
            >
              Liver Surgeon
            </Link>{" "}
            in Dhaka
          </h1>

          <p className="hmh-v3-lede">
            Skilled, patient-friendly care by{" "}
            <Link to="/about/" className="hmh-v3-link">
              Dr. Murshidul Arefin
            </Link>{" "}
            at Popular Medical College, Dhanmondi.
          </p>

          <div className="hmh-v3-cta-row">
            <Link
              to="/contact/"
              aria-label="Book an appointment with Dr. Arefin"
              className="hmh-v3-cta-primary"
            >
              Book Appointment
              <ArrowRight className="hmh-v3-cta-icon" />
            </Link>
            <a
              href="tel:+8801311487592"
              aria-label="Call Dr. Arefin"
              className="hmh-v3-cta-secondary"
            >
              <Phone className="hmh-v3-cta-icon-sm" />
              Call
            </a>
          </div>

          <p className="hmh-v3-trust">
            <Award className="hmh-v3-trust-icon" aria-hidden="true" />
            FCPS · 1500+ surgeries · 20+ yrs
          </p>
        </div>
      </div>

      <style>{`
        .arefin .hmh-v3 {
          position: relative;
          min-height: calc(100svh - 70px);
          background: hsl(var(--background));
          isolation: isolate;
        }
        .arefin .hmh-v3-bg-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: top center;
          z-index: 0;
        }
        .arefin .hmh-v3-overlay {
          position: absolute; inset: 0;
          z-index: 1;
          background: linear-gradient(
            180deg,
            hsl(var(--background) / 0.0) 0%,
            hsl(var(--background) / 0.35) 38%,
            hsl(var(--background) / 0.85) 62%,
            hsl(var(--background)) 88%
          );
        }
        .arefin .hmh-v3-inner {
          position: relative; z-index: 2;
          min-height: calc(100svh - 70px);
          display: flex; flex-direction: column;
          justify-content: flex-end;
          padding-top: 16px;
          padding-bottom: max(20px, env(safe-area-inset-bottom));
        }
        .arefin .hmh-v3-text {
          display: flex; flex-direction: column;
          gap: 10px;
        }
        .arefin .hmh-v3-eyebrow {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: hsl(var(--primary));
          margin: 0;
          text-shadow: 0 1px 8px hsl(var(--background) / 0.6);
        }
        .arefin .hmh-v3-h1 {
          font-size: clamp(1.5rem, 6.2vw, 2.1rem);
          line-height: 1.15;
          font-weight: 700;
          color: hsl(var(--foreground));
          margin: 0;
          letter-spacing: -0.01em;
          text-shadow: 0 2px 14px hsl(var(--background) / 0.7);
        }
        .arefin .hmh-v3-link {
          color: hsl(var(--primary));
          text-decoration: none;
          transition: color 200ms ease;
        }
        .arefin .hmh-v3-link:hover { color: hsl(var(--primary-darker)); }
        .arefin .hmh-v3-lede {
          font-size: var(--fs-body);
          line-height: 1.5;
          color: hsl(var(--foreground) / 0.9);
          margin: 0;
          text-shadow: 0 1px 8px hsl(var(--background) / 0.7);
        }

        .arefin .hmh-v3-cta-row {
          display: flex; gap: 10px;
          margin-top: 4px;
        }
        .arefin .hmh-v3-cta-primary {
          display: inline-flex; align-items: center; justify-content: center;
          gap: 8px;
          padding: 12px 20px;
          background: hsl(var(--primary));
          color: hsl(0 0% 100%);
          border-radius: 999px;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          transition: background 200ms ease, box-shadow 200ms ease;
          flex: 1 1 auto;
        }
        .arefin .hmh-v3-cta-primary:hover {
          background: hsl(var(--primary-darker));
          box-shadow: 4px 4px 0 0 hsl(var(--hover-shadow-ink, 0 0% 0%) / 0.85);
        }
        .arefin .hmh-v3-cta-icon { width: 16px; height: 16px; }
        .arefin .hmh-v3-cta-secondary {
          display: inline-flex; align-items: center; justify-content: center;
          gap: 6px;
          padding: 12px 16px;
          background: hsl(var(--background) / 0.7);
          backdrop-filter: blur(6px);
          color: hsl(var(--foreground));
          border: 1.5px solid hsl(var(--border));
          border-radius: 999px;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          transition: border-color 200ms ease, color 200ms ease;
        }
        .arefin .hmh-v3-cta-secondary:hover {
          border-color: hsl(var(--primary));
          color: hsl(var(--primary));
        }
        .arefin .hmh-v3-cta-icon-sm { width: 14px; height: 14px; }

        .arefin .hmh-v3-trust {
          display: inline-flex; align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          color: hsl(var(--foreground) / 0.8);
          margin: 6px 0 0;
          text-shadow: 0 1px 6px hsl(var(--background) / 0.7);
        }
        .arefin .hmh-v3-trust-icon {
          width: 13px; height: 13px;
          color: hsl(var(--primary));
        }

        @media (prefers-reduced-motion: reduce) {
          .arefin .hmh-v3-cta-primary,
          .arefin .hmh-v3-cta-secondary,
          .arefin .hmh-v3-link { transition: none; }
        }
      `}</style>
    </section>
  );
};

export default HomeMobileHeroV3;
