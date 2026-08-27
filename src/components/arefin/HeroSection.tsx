import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/hooks/useScrollReveal";
import HeroCTA from "@/components/arefin/HeroCTA";

/** A trust chip may be a plain label, or an SEO link to a satellite page. */
export type HeroTrustItem =
  | string
  | { label: string; href: string; title: string };

export interface HeroSectionProps {
  /** Hero background image (absolute or already-resolved import). */
  imageSrc: string;
  imageAlt: string;
  /** Breadcrumb tail label (e.g. "Hepatobiliary Surgery"). */
  breadcrumb: string;
  /** Small uppercase kicker above the H1 (often same as breadcrumb). */
  kicker: string;
  /** Page H1. */
  h1: string;
  /** Optional internal href to wrap H1 in a Link (e.g. "/about/"). */
  h1Href?: string;
  /** Optional title attribute for the H1 link. */
  h1Title?: string;
  /** Intro lede HTML (already trusted, comes from data layer). */
  introHtml: string;
  /** Trust signal chips below the lede. */
  trust?: HeroTrustItem[];
  /** Override the hero CTA aria label. */
  ctaAriaLabel?: string;
}

/* Default trust chips — gallbladder-focused satellite pages (Tier 1). */
const DEFAULT_TRUST: HeroTrustItem[] = [
  {
    label: "FCPS · MS Hepatobiliary",
    href: "/credentials/fcps-ms-hepatobiliary-gallbladder-surgeon-dhaka/",
    title:
      "Dr. Arefin's FCPS & MS Hepatobiliary credentials — verified gallbladder surgeon in Dhaka",
  },
  {
    label: "1500+ surgeries",
    href: "/credentials/1500-gallbladder-surgeries-dhaka/",
    title:
      "1500+ gallbladder & hepatobiliary surgeries performed by Dr. Arefin in Dhaka",
  },
  {
    label: "20+ years",
    href: "/credentials/20-years-gallbladder-surgery-experience-dhaka/",
    title:
      "20+ years of gallbladder, liver, and bile-duct surgery experience — Dr. Murshidul Arefin",
  },
];

/**
 * Approved hero section for satellite + interior pages.
 * Spec ref: Dr-Arefin-Spec/reviewer/08-global-shell-parity.md (G11).
 */
export const HeroSection = ({
  imageSrc,
  imageAlt,
  breadcrumb,
  kicker,
  h1,
  h1Href,
  h1Title,
  introHtml,
  trust = DEFAULT_TRUST,
  ctaAriaLabel = "Book appointment with Dr. Arefin",
}: HeroSectionProps) => {
  return (
    <section className="satellite-hero relative overflow-hidden">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="satellite-hero-img"
        loading="eager"
        fetchPriority="high"
        width={1600}
        height={900}
      />
      <div className="satellite-hero-overlay" aria-hidden />
      <div className="container relative satellite-hero-inner">
        <Reveal>
          <nav className="satellite-breadcrumb" aria-label="Breadcrumb">
            <Link to="/" title="Dr. Arefin home">Home</Link>
            <ChevronRight className="bc-sep" aria-hidden />
            <span>{breadcrumb}</span>
          </nav>
        </Reveal>
        <Reveal delay={80}>
          <p className="satellite-kicker">{kicker}</p>
        </Reveal>
        <Reveal delay={140}>
          <h1 className="satellite-h1">
            {h1Href ? (
              <Link to={h1Href} title={h1Title} className="satellite-h1-link">
                {h1}
              </Link>
            ) : (
              h1
            )}
          </h1>
        </Reveal>
        <Reveal delay={220}>
          <div
            className="satellite-intro"
            dangerouslySetInnerHTML={{ __html: introHtml }}
          />
        </Reveal>
        {trust.length > 0 && (
          <Reveal delay={280}>
            <ul className="satellite-trust" aria-label="Trust signals">
              {trust.map((t) => {
                if (typeof t === "string") {
                  return <li key={t}>{t}</li>;
                }
                return (
                  <li key={t.href}>
                    <Link
                      to={t.href}
                      title={t.title}
                      className="satellite-trust-link"
                    >
                      {t.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        )}
        <Reveal delay={340}>
          <div className="satellite-cta-row">
            <HeroCTA primaryAriaLabel={ctaAriaLabel} />
          </div>
        </Reveal>
      </div>
      <style>{`
        .arefin .satellite-hero {
          padding: 120px 0 80px;
          background: hsl(var(--background));
        }
        @media (min-width: 768px) {
          .arefin .satellite-hero { padding: 160px 0 110px; }
        }
        .arefin .satellite-hero-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          filter: brightness(0.55) saturate(0.92);
          z-index: 0;
        }
        .arefin .satellite-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg,
            hsl(0 0% 0% / 0.65) 0%,
            hsl(0 0% 0% / 0.72) 50%,
            hsl(0 0% 0% / 0.82) 100%);
          z-index: 1;
        }
        .arefin .satellite-hero-inner {
          position: relative; z-index: 2;
          max-width: 56rem;
          margin-inline: auto;
          text-align: center;
        }
        .arefin .satellite-breadcrumb {
          display: inline-flex; align-items: center; justify-content: center; gap: 6px;
          font-size: 0.85rem; color: hsl(var(--muted-foreground));
          margin-bottom: 1.5rem;
        }
        .arefin .satellite-breadcrumb a {
          color: hsl(var(--muted-foreground)); text-decoration: none;
          transition: color 200ms ease;
        }
        .arefin .satellite-breadcrumb a:hover { color: hsl(var(--primary)); }
        .arefin .satellite-breadcrumb .bc-sep { width: 14px; height: 14px; opacity: 0.6; }
        .arefin .satellite-kicker {
          font-size: 0.78rem; font-weight: 600; letter-spacing: 0.22em;
          text-transform: uppercase; color: hsl(var(--primary)); margin-bottom: 1rem;
        }
        .arefin .satellite-h1 {
          font-family: var(--font-arefin-heading, inherit);
          font-size: var(--fs-h1);
          line-height: var(--lh-h1);
          letter-spacing: var(--ls-h1);
          font-weight: 700;
          color: hsl(var(--foreground));
          margin-bottom: 1.5rem;
          transition: color 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      text-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin:not(.dark) .satellite-h1:hover,
        .arefin:not(.dark) .satellite-h1:focus-within {
          color: hsl(var(--primary-darker, var(--primary)));
          text-shadow: 1px 0.7px 0 hsl(var(--hover-shadow-ink, 80 60% 13%));
        }
        .arefin.dark .satellite-h1:hover,
        .arefin.dark .satellite-h1:focus-within {
          color: hsl(var(--primary-light, var(--primary)));
          text-shadow: 1px 0.7px 0 hsl(160 22% 5%);
        }
        .arefin .satellite-h1-link,
        .arefin .satellite-h1-link:hover,
        .arefin .satellite-h1-link:focus-visible {
          color: inherit; text-decoration: none;
        }
        .arefin .satellite-h1-link:focus-visible {
          outline: 2px solid hsl(var(--primary-bright));
          outline-offset: 4px; border-radius: 4px;
        }
        .arefin .satellite-intro {
          font-size: 1.0625rem; line-height: 1.7;
          color: hsl(var(--foreground) / 0.78);
        }
        .arefin .satellite-intro p { margin: 0; }
        .arefin .satellite-intro a {
          color: inherit; text-decoration: none;
          transition: color 200ms ease;
        }
        .arefin .satellite-intro a:hover,
        .arefin .satellite-intro a:focus-visible {
          color: hsl(var(--primary));
        }
        .arefin .satellite-intro strong { color: inherit; font-weight: inherit; }
        .arefin .satellite-trust {
          display: flex; flex-wrap: wrap; justify-content: center;
          gap: 0.5rem 1.25rem;
          margin-top: 1.25rem; padding: 0; list-style: none;
          font-size: 0.85rem; color: hsl(var(--muted-foreground));
        }
        .arefin .satellite-cta-row {
          display: flex; justify-content: center; margin-top: 2rem;
        }
        .arefin .satellite-trust li {
          display: inline-flex; align-items: center;
          padding: 0;
          border: 1px solid hsl(var(--border));
          border-radius: 999px;
          background: hsl(var(--card) / 0.5);
          transition: border-color 220ms ease, background 220ms ease,
                      box-shadow 220ms ease;
        }
        .arefin .satellite-trust li:has(a:hover),
        .arefin .satellite-trust li:has(a:focus-visible) {
          border-color: hsl(var(--primary-bright));
          background: hsl(var(--primary-bright) / 0.12);
          box-shadow: 2px 2px 0 0 hsl(0 0% 0% / 0.35);
        }
        .arefin .satellite-trust > li:not(:has(a)) {
          padding: 0.35rem 0.75rem;
        }
        .arefin .satellite-trust-link {
          display: inline-flex; align-items: center;
          padding: 0.35rem 0.85rem;
          color: hsl(var(--muted-foreground));
          text-decoration: none;
          font: inherit;
          border-radius: 999px;
          transition: color 220ms ease, text-shadow 220ms ease;
        }
        .arefin .satellite-trust-link:hover,
        .arefin .satellite-trust-link:focus-visible {
          color: hsl(var(--primary-bright));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
          outline: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .arefin .satellite-intro a,
          .arefin .satellite-breadcrumb a,
          .arefin .satellite-trust-link,
          .arefin .satellite-trust li { transition: none; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
