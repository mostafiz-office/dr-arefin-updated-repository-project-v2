import { Link } from "react-router-dom";
import { ArrowRight, Phone, Send } from "lucide-react";

interface HeroCTAProps {
  /** Primary (green) CTA copy. */
  primaryLabel?: string;
  primaryTo?: string;
  primaryAriaLabel?: string;
  /** Secondary (call) CTA. */
  callLabel?: string;
  callHref?: string;
  /** When set, the secondary button links to an internal route (e.g. the
   * contact form) instead of tel:. Used on treatment pages (Nov 2026
   * feedback: form first, not Call). */
  secondaryTo?: string;
  /** Label for the internal-route secondary button. Defaults to "Send a Query". */
  secondaryLabel?: string;
  /** Center the pair (use in CTA bands); default left-aligned for hero. */
  center?: boolean;
  /** Optional extra className on wrapper. */
  className?: string;
}

/**
 * Canonical hero/CTA button pair for the Dr. Arefin site.
 * Spec ref: Dr-Arefin-Spec/reviewer/08-global-shell-parity.md (G10).
 *
 * Pair is `Book Consultation` (primary green) + `Call Now` (secondary).
 * Same visual treatment everywhere: hero-cta-primary.is-green + hero-cta-secondary.
 */
export const HeroCTA = ({
  primaryLabel = "Book Consultation",
  primaryTo = "/contact/",
  primaryAriaLabel,
  callLabel = "Call Now",
  callHref = "tel:+8801311487592",
  secondaryTo,
  secondaryLabel,
  center = false,
  className = "",
}: HeroCTAProps) => {
  const justify = center ? "justify-center items-center" : "";
  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${justify} ${className}`.trim()}>
      <Link
        to={primaryTo}
        aria-label={primaryAriaLabel ?? primaryLabel}
        className="hero-cta-primary is-green no-underline"
      >
        {primaryLabel}
        <ArrowRight className="hero-cta-icon" />
      </Link>
      {secondaryTo ? (
        <Link
          to={secondaryTo}
          aria-label={secondaryLabel ?? "Send a Query"}
          className="hero-cta-secondary no-underline"
        >
          <Send className="hero-cta-icon-sm" />
          {secondaryLabel ?? "Send a Query"}
        </Link>
      ) : (
        <a
          href={callHref}
          aria-label="Call Dr. Arefin"
          className="hero-cta-secondary no-underline"
        >
          <Phone className="hero-cta-icon-sm" />
          {callLabel}
        </a>
      )}
    </div>
  );
};

export default HeroCTA;
