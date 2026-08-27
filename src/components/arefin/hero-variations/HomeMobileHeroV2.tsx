import { Phone, ArrowRight, Award } from "lucide-react";
import { Link } from "react-router-dom";
import portrait from "@/assets/arefin-portrait-light.webp";

/**
 * HomeMobileHeroV2 — Side-Aligned.
 * Text on the left, portrait anchored bottom-right. Fits 100svh - 70px.
 * Mobile/tablet only.
 */
const HomeMobileHeroV2 = () => {
  return (
    <section className="hmh-v2 relative overflow-hidden">
      <div className="hmh-v2-bg" aria-hidden="true" />

      <div className="container hmh-v2-inner">
        <div className="hmh-v2-text">
          <p className="hmh-v2-eyebrow">Hepatobiliary · Dhaka</p>

          <h1 className="hmh-v2-h1 font-arefin-heading">
            Top{" "}
            <Link to="/treatment/hepatobiliary-surgery/" className="hmh-v2-link">
              Hepatobiliary
            </Link>{" "}
            &amp;{" "}
            <Link
              to="/treatment/liver-surgeon-dhaka/"
              className="hmh-v2-link is-accent"
            >
              Liver Surgeon
            </Link>{" "}
            in Dhaka
          </h1>

          <p className="hmh-v2-lede">
            Skilled surgical care by{" "}
            <Link to="/about/" className="hmh-v2-link">
              Dr. Murshidul Arefin
            </Link>
            .
          </p>

          <div className="hmh-v2-cta-col">
            <Link
              to="/contact/"
              aria-label="Book an appointment with Dr. Arefin"
              className="hmh-v2-cta-primary"
            >
              Book Appointment
              <ArrowRight className="hmh-v2-cta-icon" />
            </Link>
            <a
              href="tel:+8801311487592"
              aria-label="Call Dr. Arefin"
              className="hmh-v2-cta-secondary"
            >
              <Phone className="hmh-v2-cta-icon-sm" />
              Call Now
            </a>
          </div>

          <p className="hmh-v2-trust">
            <Award className="hmh-v2-trust-icon" aria-hidden="true" />
            FCPS · 1500+ surgeries · 20+ yrs
          </p>
        </div>

        <div className="hmh-v2-portrait-wrap">
          <div className="hmh-v2-portrait-halo" aria-hidden="true" />
          <img
            src={portrait}
            alt="Dr. Murshidul Arefin, hepatobiliary surgeon"
            className="hmh-v2-portrait"
            loading="eager"
            fetchPriority="high"
            width={860}
            height={1075}
          />
        </div>
      </div>

      <style>{`
        .arefin .hmh-v2 {
          min-height: calc(100svh - 70px);
          background: hsl(var(--background));
          padding-top: 12px;
          padding-bottom: 12px;
          display: flex;
        }
        .arefin .hmh-v2-bg {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background:
            radial-gradient(50% 60% at 100% 60%, hsl(var(--primary) / 0.14) 0%, transparent 70%);
        }
        .arefin .hmh-v2-inner {
          position: relative; z-index: 1;
          flex: 1 1 auto;
          display: grid;
          grid-template-columns: 1fr 42%;
          gap: 8px;
          align-items: stretch;
          min-height: calc(100svh - 70px - 24px);
        }

        /* Text */
        .arefin .hmh-v2-text {
          display: flex; flex-direction: column;
          justify-content: center;
          gap: 10px;
          padding-right: 4px;
        }
        .arefin .hmh-v2-eyebrow {
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: hsl(var(--primary));
          margin: 0;
        }
        .arefin .hmh-v2-h1 {
          font-size: clamp(1.35rem, 5.6vw, 1.85rem);
          line-height: 1.15;
          font-weight: 700;
          color: hsl(var(--foreground));
          margin: 0;
          letter-spacing: -0.01em;
        }
        .arefin .hmh-v2-link {
          color: hsl(var(--primary));
          text-decoration: none;
          transition: color 200ms ease;
        }
        .arefin .hmh-v2-link:hover { color: hsl(var(--primary-darker)); }
        .arefin .hmh-v2-lede {
          font-size: var(--fs-body);
          line-height: 1.5;
          color: hsl(var(--foreground) / 0.78);
          margin: 0;
        }

        /* CTAs stacked */
        .arefin .hmh-v2-cta-col {
          display: flex; flex-direction: column; gap: 8px;
          margin-top: 4px;
        }
        .arefin .hmh-v2-cta-primary {
          display: inline-flex; align-items: center; justify-content: center;
          gap: 8px;
          padding: 11px 16px;
          background: hsl(var(--primary));
          color: hsl(0 0% 100%);
          border-radius: 999px;
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          transition: background 200ms ease, box-shadow 200ms ease;
        }
        .arefin .hmh-v2-cta-primary:hover {
          background: hsl(var(--primary-darker));
          box-shadow: 4px 4px 0 0 hsl(var(--hover-shadow-ink, 0 0% 0%) / 0.85);
        }
        .arefin .hmh-v2-cta-icon { width: 16px; height: 16px; }
        .arefin .hmh-v2-cta-secondary {
          display: inline-flex; align-items: center; justify-content: center;
          gap: 8px;
          padding: 11px 16px;
          background: transparent;
          color: hsl(var(--foreground));
          border: 1.5px solid hsl(var(--border));
          border-radius: 999px;
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          transition: border-color 200ms ease, color 200ms ease;
        }
        .arefin .hmh-v2-cta-secondary:hover {
          border-color: hsl(var(--primary));
          color: hsl(var(--primary));
        }
        .arefin .hmh-v2-cta-icon-sm { width: 14px; height: 14px; }

        .arefin .hmh-v2-trust {
          display: inline-flex; align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          color: hsl(var(--muted-foreground));
          margin: 4px 0 0;
        }
        .arefin .hmh-v2-trust-icon {
          width: 13px; height: 13px;
          color: hsl(var(--primary));
        }

        /* Portrait */
        .arefin .hmh-v2-portrait-wrap {
          position: relative;
          display: flex; align-items: flex-end; justify-content: flex-end;
        }
        .arefin .hmh-v2-portrait-halo {
          position: absolute;
          right: -10%; bottom: 6%;
          width: 110%; height: 70%;
          border-radius: 50%;
          background: radial-gradient(circle, hsl(var(--primary) / 0.22) 0%, transparent 65%);
          filter: blur(22px);
        }
        .arefin .hmh-v2-portrait {
          position: relative;
          width: 100%;
          max-height: calc(100svh - 70px - 24px);
          height: auto;
          object-fit: contain;
          object-position: bottom right;
        }

        @media (prefers-reduced-motion: reduce) {
          .arefin .hmh-v2-cta-primary,
          .arefin .hmh-v2-cta-secondary,
          .arefin .hmh-v2-link { transition: none; }
        }
      `}</style>
    </section>
  );
};

export default HomeMobileHeroV2;
