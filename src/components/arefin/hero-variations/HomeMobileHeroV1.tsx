import { useState } from "react";
import { Phone, ArrowRight, Award } from "lucide-react";
import { Link } from "react-router-dom";
import portrait from "@/assets/arefin-portrait-light.webp";
import organLiver from "@/assets/organ-liver-3d.webp";
import organGallbladder from "@/assets/organ-gallbladder-3d.webp";
import organStomach from "@/assets/organ-stomach-3d.webp";

type OrganId = "liver" | "gall" | "stomach";

const ORGANS: Record<OrganId, { label: string; href: string; blurb: string }> = {
  liver:   { label: "Liver",       href: "/treatment/liver-surgeon-dhaka/",       blurb: "Liver resection & HPB surgery" },
  gall:    { label: "Gallbladder", href: "/treatment/gallbladder-surgery-dhaka/", blurb: "Laparoscopic cholecystectomy" },
  stomach: { label: "Stomach",     href: "/treatment/biliary-surgery-dhaka/",     blurb: "Upper-GI & biliary care" },
};

/**
 * HomeMobileHeroV1 — Stacked Compact with interactive organ orbs.
 */
const HomeMobileHeroV1 = () => {
  const [active, setActive] = useState<OrganId | null>(null);

  const renderOrgan = (id: OrganId, src: string, modifier: string) => {
    const o = ORGANS[id];
    return (
      <button
        type="button"
        className={`hmh-v1-organ-btn hmh-v1-organ--${modifier} ${active === id ? "is-active" : ""}`}
        onClick={() => setActive((cur) => (cur === id ? null : id))}
        onMouseEnter={() => setActive(id)}
        onMouseLeave={() => setActive(null)}
        aria-label={`${o.label} surgery information`}
        aria-expanded={active === id}
      >
        <img src={src} alt="" aria-hidden="true" className="hmh-v1-organ-img" loading="lazy" />
        <span className="hmh-v1-organ-label">{o.label}</span>
        <span className="hmh-v1-organ-card" role="tooltip">
          <span className="hmh-v1-organ-card-title">{o.label}</span>
          <span className="hmh-v1-organ-card-blurb">{o.blurb}</span>
          <Link to={o.href} className="hmh-v1-organ-card-link" onClick={(e) => e.stopPropagation()}>
            Learn more <ArrowRight className="hmh-v1-cta-icon-sm" />
          </Link>
        </span>
      </button>
    );
  };

  return (
    <section className="hmh-v1 relative overflow-hidden">
      <div className="hmh-v1-bg" aria-hidden="true" />

      <div className="container hmh-v1-inner">
        {/* Portrait + interactive organ orbs */}
        <div className="hmh-v1-portrait-wrap">
          <div className="hmh-v1-portrait-halo" aria-hidden="true" />
          <div className="hmh-v1-portrait-frame">
            <img
              src={portrait}
              alt="Dr. Murshidul Arefin, hepatobiliary surgeon, in green surgical scrubs"
              className="hmh-v1-portrait"
              loading="eager"
              fetchPriority="high"
              width={860}
              height={1075}
            />
          </div>
          {renderOrgan("liver",   organLiver,       "liver")}
          {renderOrgan("gall",    organGallbladder, "gall")}
          {renderOrgan("stomach", organStomach,     "stomach")}
        </div>

        {/* Text block */}
        <div className="hmh-v1-text">
          <p className="hmh-v1-eyebrow">Hepatobiliary Surgery · Dhaka</p>

          <h1 className="hmh-v1-h1 font-arefin-heading">
            Top{" "}
            <Link to="/treatment/hepatobiliary-surgery/" className="hmh-v1-link">
              Hepatobiliary
            </Link>{" "}
            &amp;{" "}
            <Link to="/treatment/liver-surgeon-dhaka/" className="hmh-v1-link is-accent">
              Liver Surgeon
            </Link>{" "}
            in Dhaka
          </h1>

          <p className="hmh-v1-lede">
            Patient-friendly surgical care by{" "}
            <Link to="/about/" className="hmh-v1-link">
              Dr. Murshidul Arefin
            </Link>{" "}
            at Popular Medical College, Dhanmondi.
          </p>

          <div className="hmh-v1-cta-row">
            <Link to="/contact/" aria-label="Book an appointment with Dr. Arefin" className="hmh-v1-cta-primary">
              Book Appointment
              <ArrowRight className="hmh-v1-cta-icon" />
            </Link>
            <a href="tel:+8801311487592" aria-label="Call Dr. Arefin" className="hmh-v1-cta-secondary">
              <Phone className="hmh-v1-cta-icon-sm" />
              Call Now
            </a>
          </div>

          <p className="hmh-v1-trust">
            <Award className="hmh-v1-trust-icon" aria-hidden="true" />
            FCPS · MS Hepatobiliary · 1500+ surgeries · 20+ years
          </p>
        </div>
      </div>

      <style>{`
        .arefin .hmh-v1 {
          min-height: calc(100svh - 70px);
          background: hsl(var(--background));
          padding-top: 16px;
          padding-bottom: 16px;
        }
        .arefin .hmh-v1-bg {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background:
            radial-gradient(60% 50% at 50% 18%, hsl(var(--primary) / 0.10) 0%, transparent 70%),
            radial-gradient(40% 30% at 90% 90%, hsl(var(--primary) / 0.06) 0%, transparent 75%);
        }
        .arefin .hmh-v1-inner {
          position: relative; z-index: 1;
          min-height: calc(100svh - 70px - 32px);
          display: flex; flex-direction: column;
          justify-content: space-between;
          gap: 12px;
        }

        /* Portrait wrap — give breathing room around for organs */
        .arefin .hmh-v1-portrait-wrap {
          position: relative;
          width: 100%;
          display: flex; justify-content: center; align-items: flex-end;
          flex: 0 0 auto;
          padding: 8px 4px 12px;
          min-height: clamp(220px, 42svh, 360px);
        }
        .arefin .hmh-v1-portrait-halo {
          position: absolute;
          top: 50%; left: 50%;
          width: 70%; height: 90%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(circle, hsl(var(--primary) / 0.20) 0%, transparent 65%);
          filter: blur(18px);
          z-index: 0;
        }
        /* Solid frame so portrait base no longer blends into bg */
        .arefin .hmh-v1-portrait-frame {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: flex-end;
          justify-content: center;
          padding: 6px;
          border-radius: 50%;
          background:
            radial-gradient(circle at 50% 60%,
              hsl(var(--card)) 0%,
              hsl(var(--card)) 55%,
              transparent 72%);
          box-shadow: 0 0 0 1px hsl(var(--border) / 0.6);
        }
        .arefin .hmh-v1-portrait {
          position: relative;
          width: auto;
          height: clamp(190px, 38svh, 330px);
          object-fit: contain;
          object-position: bottom center;
        }

        /* Organ orb buttons — visible, tappable, with hover card */
        .arefin .hmh-v1-organ-btn {
          position: absolute;
          z-index: 5;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          min-width: 56px;
          min-height: 56px;
          padding: 4px;
          background: transparent;
          border: 0;
          cursor: pointer;
          color: hsl(var(--foreground));
        }
        .arefin .hmh-v1-organ-img {
          width: 100%;
          height: auto;
          object-fit: contain;
          filter:
            drop-shadow(0 2px 0 hsl(var(--background)))
            drop-shadow(0 6px 14px hsl(0 0% 0% / 0.45))
            drop-shadow(0 0 12px hsl(var(--primary) / 0.35));
          opacity: 1;
          transition: transform 200ms ease, filter 200ms ease;
        }
        .arefin .hmh-v1-organ-btn:hover .hmh-v1-organ-img,
        .arefin .hmh-v1-organ-btn.is-active .hmh-v1-organ-img {
          filter:
            drop-shadow(0 2px 0 hsl(var(--background)))
            drop-shadow(0 8px 18px hsl(0 0% 0% / 0.55))
            drop-shadow(0 0 16px hsl(var(--primary) / 0.55));
        }
        .arefin .hmh-v1-organ-label {
          font-size: 0.625rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: hsl(var(--foreground));
          background: hsl(var(--card));
          padding: 2px 6px;
          border-radius: 999px;
          border: 1px solid hsl(var(--border));
          line-height: 1;
        }

        /* Sizes — gallbladder visibly larger */
        .arefin .hmh-v1-organ--liver   { width: 64px; top: 6%;  left: 2%; }
        .arefin .hmh-v1-organ--gall    { width: 88px; top: 22%; right: 0%; }
        .arefin .hmh-v1-organ--stomach { width: 64px; bottom: 6%; left: 4%; }

        /* Hover/tap info card */
        .arefin .hmh-v1-organ-card {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translate(-50%, 8px);
          min-width: 168px;
          max-width: 200px;
          padding: 10px 12px;
          background: hsl(var(--card));
          color: hsl(var(--card-foreground));
          border: 1px solid hsl(var(--border));
          border-left: 3px solid hsl(var(--primary));
          border-radius: 10px;
          box-shadow: 4px 4px 0 0 hsl(0 0% 0% / 0.85);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: opacity 180ms ease;
          z-index: 20;
          text-align: left;
          display: flex; flex-direction: column; gap: 4px;
        }
        .arefin .hmh-v1-organ-btn.is-active .hmh-v1-organ-card,
        .arefin .hmh-v1-organ-btn:hover .hmh-v1-organ-card {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
        }
        /* Anchor the card so it doesn't overflow viewport edges */
        .arefin .hmh-v1-organ--gall .hmh-v1-organ-card { left: auto; right: 0; transform: translate(0, 8px); }
        .arefin .hmh-v1-organ--liver .hmh-v1-organ-card,
        .arefin .hmh-v1-organ--stomach .hmh-v1-organ-card { left: 0; transform: translate(0, 8px); }

        .arefin .hmh-v1-organ-card-title {
          font-size: 0.85rem; font-weight: 700;
          color: hsl(var(--primary-darker, var(--primary)));
        }
        .arefin .hmh-v1-organ-card-blurb {
          font-size: 0.75rem; line-height: 1.35;
          color: hsl(var(--card-foreground) / 0.8);
        }
        .arefin .hmh-v1-organ-card-link {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 0.75rem; font-weight: 600;
          color: hsl(var(--primary));
          text-decoration: none;
          margin-top: 2px;
        }

        /* Text */
        .arefin .hmh-v1-text {
          display: flex; flex-direction: column; gap: 10px;
          text-align: center;
          flex: 1 1 auto;
          justify-content: center;
        }
        .arefin .hmh-v1-eyebrow {
          font-size: 0.7rem; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: hsl(var(--primary));
          margin: 0;
        }
        .arefin .hmh-v1-h1 {
          font-size: clamp(1.5rem, 6vw, 2rem);
          line-height: 1.15; font-weight: 700;
          color: hsl(var(--foreground)); margin: 0;
          letter-spacing: -0.01em;
        }
        .arefin .hmh-v1-link { color: hsl(var(--primary)); text-decoration: none; transition: color 200ms ease; }
        .arefin .hmh-v1-link:hover { color: hsl(var(--primary-darker)); }
        .arefin .hmh-v1-link.is-accent { color: hsl(var(--primary)); }
        .arefin .hmh-v1-lede {
          font-size: var(--fs-body); line-height: 1.5;
          color: hsl(var(--foreground) / 0.78); margin: 0;
        }

        /* CTAs */
        .arefin .hmh-v1-cta-row { display: flex; flex-direction: column; gap: 10px; align-items: stretch; margin-top: 4px; }
        @media (min-width: 480px) {
          .arefin .hmh-v1-cta-row { flex-direction: row; justify-content: center; }
        }
        .arefin .hmh-v1-cta-primary {
          display: inline-flex; align-items: center; justify-content: center;
          gap: 8px; padding: 12px 20px;
          background: hsl(var(--primary)); color: hsl(0 0% 100%);
          border-radius: 999px; font-weight: 600; font-size: 0.95rem;
          text-decoration: none;
          transition: background 200ms ease, box-shadow 200ms ease;
        }
        .arefin .hmh-v1-cta-primary:hover {
          background: hsl(var(--primary-darker));
          box-shadow: 4px 4px 0 0 hsl(var(--hover-shadow-ink, 0 0% 0%) / 0.85);
        }
        .arefin .hmh-v1-cta-icon { width: 16px; height: 16px; }
        .arefin .hmh-v1-cta-secondary {
          display: inline-flex; align-items: center; justify-content: center;
          gap: 8px; padding: 12px 20px;
          background: transparent; color: hsl(var(--foreground));
          border: 1.5px solid hsl(var(--border)); border-radius: 999px;
          font-weight: 600; font-size: 0.95rem; text-decoration: none;
          transition: border-color 200ms ease, color 200ms ease;
        }
        .arefin .hmh-v1-cta-secondary:hover { border-color: hsl(var(--primary)); color: hsl(var(--primary)); }
        .arefin .hmh-v1-cta-icon-sm { width: 14px; height: 14px; }

        /* Trust */
        .arefin .hmh-v1-trust {
          display: inline-flex; align-items: center; justify-content: center;
          gap: 6px; font-size: 0.78rem;
          color: hsl(var(--muted-foreground)); margin: 0;
        }
        .arefin .hmh-v1-trust-icon { width: 14px; height: 14px; color: hsl(var(--primary)); }

        @media (prefers-reduced-motion: reduce) {
          .arefin .hmh-v1-cta-primary,
          .arefin .hmh-v1-cta-secondary,
          .arefin .hmh-v1-link,
          .arefin .hmh-v1-organ-img,
          .arefin .hmh-v1-organ-card { transition: none; }
        }
      `}</style>
    </section>
  );
};

export default HomeMobileHeroV1;
