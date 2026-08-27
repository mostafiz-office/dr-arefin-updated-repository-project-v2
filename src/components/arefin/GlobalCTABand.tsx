import { ReactNode } from "react";
import { Stethoscope } from "lucide-react";
import { Reveal } from "@/hooks/useScrollReveal";
import HeroCTA from "@/components/arefin/HeroCTA";

interface GlobalCTABandProps {
  /** Heading text rendered before the accent span. e.g. "Ready for " */
  headingLead?: string;
  /** Accent (green) heading word(s). e.g. "Expert Consultation?" */
  headingAccent?: string;
  /** Rich body content (supports inline links / <strong>). */
  body: ReactNode;
  /** Primary CTA copy. */
  primaryLabel?: string;
  primaryTo?: string;
  /** Secondary (call) CTA. */
  callLabel?: string;
  callHref?: string;
  /** Show stethoscope chip above heading. */
  showIcon?: boolean;
}

/**
 * Shared final CTA band — used on the home page and every satellite page.
 * Spec ref: Dr-Arefin-Spec/reviewer/08-global-shell-parity.md (G8).
 *
 * Visual contract: dark background, centered content, optional icon chip,
 * two-tone heading (foreground + primary accent), body prose with inline
 * links, and the canonical hero-cta-primary / hero-cta-secondary button pair.
 */
export const GlobalCTABand = ({
  headingLead = "Ready for ",
  headingAccent = "Expert Consultation?",
  body,
  primaryLabel = "Book Appointment",
  primaryTo = "/contact/",
  callLabel = "Call Now",
  callHref = "tel:+8801311487592",
  showIcon = true,
}: GlobalCTABandProps) => {
  return (
    <section className="arefin-section-divider arefin-final-cta py-20 md:py-24 relative overflow-hidden">
      <div className="container relative text-center max-w-3xl mx-auto">
        {showIcon && (
          <Reveal>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/15 mb-6">
              <Stethoscope className="h-8 w-8 text-primary" />
            </div>
          </Reveal>
        )}
        <Reveal delay={100}>
          <h2 className="text-fluid-h2 font-semibold text-foreground mb-6 leading-tight">
            {headingLead}
            <span className="text-primary">{headingAccent}</span>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="final-cta-body text-base md:text-lg text-foreground/70 mb-10 leading-relaxed">
            {body}
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="hero-04-light-band is-ghost">
            <HeroCTA
              center
              primaryLabel={primaryLabel}
              primaryTo={primaryTo}
              callLabel={callLabel}
              callHref={callHref}
            />
          </div>
        </Reveal>
      </div>
      <style>{`
        .final-cta-body strong,
        .final-cta-body a,
        .final-cta-body strong a {
          color: inherit;
          font-weight: inherit;
          text-decoration: none;
          cursor: pointer;
          transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1),
                      text-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .final-cta-body a:hover,
        .final-cta-body strong:hover,
        .final-cta-body strong a:hover {
          color: hsl(var(--primary));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }
      `}</style>
    </section>
  );
};

export default GlobalCTABand;
