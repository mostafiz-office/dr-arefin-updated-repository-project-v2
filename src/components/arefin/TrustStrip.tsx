import { Phone, MessageCircle, CalendarCheck, ShieldCheck, Award, GraduationCap, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * TrustStrip — light-green relief band that sits between the dark CTA Band
 * and the dark Footer. It preserves the dark → light → dark rotation rhythm
 * and earns its place with two pieces of pre-footer reassurance:
 *   1. Accreditations / affiliations row (silent credibility)
 *   2. Quick-contact row (Call · WhatsApp · Book) — last conversion nudge
 *
 * Background uses the existing light-mint token (--surface-tint-1) which is
 * the same green used by the Initiatives and Testimonials sections, so we
 * stay within the "two greens only" rule and reuse what's already there.
 */
const TrustStrip = () => {
  const credentials = [
    { Icon: GraduationCap, label: "MS, FCPS, FRCS" },
    { Icon: Stethoscope, label: "Hepatobiliary Specialist" },
    { Icon: Award, label: "Popular Medical College Faculty" },
    { Icon: ShieldCheck, label: "BMDC Registered" },
  ];

  return (
    <section
      className="arefin-trust-strip"
      aria-label="Credentials and quick contact"
    >
      <div className="container py-12 md:py-16">
        {/* Row 1 — Accreditations / affiliations */}
        <ul className="arefin-trust-strip-creds">
          {credentials.map(({ Icon, label }) => (
            <li key={label} className="arefin-trust-strip-cred-item">
              <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>{label}</span>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div className="arefin-trust-strip-divider" aria-hidden="true" />

        {/* Row 2 — Quick contact */}
        <div className="arefin-trust-strip-actions">
          <p className="arefin-trust-strip-prompt">
            Ready to talk to <strong>Dr. Arefin</strong>?
          </p>

          <div className="arefin-trust-strip-buttons">
            <a
              href="tel:+8801311487592"
              className="arefin-trust-strip-btn arefin-trust-strip-btn-primary"
              title="Call Dr. Arefin's chamber"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span>Call now</span>
            </a>

            <a
              href="https://wa.me/8801311487592"
              target="_blank"
              rel="noopener noreferrer"
              className="arefin-trust-strip-btn arefin-trust-strip-btn-secondary"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>WhatsApp</span>
            </a>

            <Link
              to="/contact/"
              className="arefin-trust-strip-btn arefin-trust-strip-btn-secondary"
              title="Book a chamber visit"
            >
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              <span>Book visit</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
