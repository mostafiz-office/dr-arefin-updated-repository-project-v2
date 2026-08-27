import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";

interface HeroCTAProps {
  /** Primary (green) CTA copy. */
  primaryLabel?: string;
  primaryTo?: string;
  primaryAriaLabel?: string;
  /** Secondary (call) CTA. */
  callLabel?: string;
  callHref?: string;
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
      <a
        href={callHref}
        aria-label="Call Dr. Arefin"
        className="hero-cta-secondary no-underline"
      >
        <Phone className="hero-cta-icon-sm" />
        {callLabel}
      </a>
    </div>
  );
};

export default HeroCTA;
