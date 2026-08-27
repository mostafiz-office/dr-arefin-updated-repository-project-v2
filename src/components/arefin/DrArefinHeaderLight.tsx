import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/arefin-logo.webp";

/**
 * DrArefinHeaderLight — Pure White + Sage header for the light hero variations.
 * Spec: spec/04-section-variations/02-hero-04-light/02-hero-04-light.md § Shared header
 *
 * - Sticky white surface with sage hairline.
 * - Uploaded official logo (arefin-logo.png) on the left.
 * - Centered pill nav.
 * - Phone link + deep-forest CTA on the right.
 * - Mobile slide-down sheet, no positional hover shifts.
 */

const navLinks = [
  { label: "Home", path: "/hero-variations/04-light/" },
  { label: "About", path: "/hero-variations/04-light/#about" },
  { label: "Treatment", path: "/hero-variations/04-light/#treatment" },
  { label: "Mentorship", path: "/hero-variations/04-light/#mentorship" },
  { label: "Articles", path: "/hero-variations/04-light/#articles" },
  { label: "Gallery", path: "/hero-variations/04-light/#gallery" },
  { label: "Contact", path: "/hero-variations/04-light/#contact" },
];

const DrArefinHeaderLight = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{
        background: "hsl(var(--hero-light-bg) / 0.85)",
        borderBottom: "1px solid hsl(var(--hero-light-border))",
      }}
    >
      <div className="container flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link
          to="/hero-variations/04-light/"
          aria-label="Dr. M Arefin — Hepatobiliary Panacea"
          className="flex items-center"
        >
          <img
            src={logo}
            alt="Dr. M Arefin Hepatobiliary Panacea logo"
            className="h-9 md:h-11 w-auto transition-[filter] duration-300 hover:[filter:brightness(1.05)]"
            width={300}
            height={88}
          />
        </Link>

        {/* Desktop pill nav */}
        <nav className="hidden lg:block" aria-label="Primary">
          <ul
            className="flex items-center gap-1 rounded-full px-2 py-1.5"
            style={{
              background: "hsl(var(--hero-light-surface))",
              border: "1px solid hsl(var(--hero-light-border))",
            }}
          >
            {navLinks.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="inline-block px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300"
                  style={{ color: "hsl(var(--hero-light-deep) / 0.78)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "hsl(var(--hero-light-bg))";
                    e.currentTarget.style.color = "hsl(var(--hero-light-deep))";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "hsl(var(--hero-light-deep) / 0.78)";
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+8801311487592"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300"
            style={{ color: "hsl(var(--hero-light-deep) / 0.8)" }}
          >
            <Phone className="h-4 w-4" />
            <span className="hidden xl:inline">+880 1311 487 592</span>
          </a>
          <a
            href="/contact/"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-full text-sm font-semibold transition-[background-color,box-shadow] duration-300"
            style={{
              background: "hsl(var(--primary-bright))",
              color: "#ffffff",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "hsl(var(--primary-darker))";
              e.currentTarget.style.boxShadow =
                "0 10px 24px -10px hsl(var(--primary-bright) / 0.55)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "hsl(var(--primary-bright))";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Book Appointment <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="lg:hidden p-2 rounded-lg transition-colors duration-300"
          style={{ color: "hsl(var(--hero-light-deep))" }}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile sheet */}
      {mobileOpen && (
        <div
          className="lg:hidden hero-anim-fade-up"
          style={{
            background: "hsl(var(--hero-light-bg))",
            borderTop: "1px solid hsl(var(--hero-light-border))",
          }}
        >
          <nav className="container py-4 flex flex-col gap-1" aria-label="Mobile primary">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200"
                style={{ color: "hsl(var(--hero-light-deep) / 0.85)" }}
              >
                {item.label}
              </Link>
            ))}
            <div
              className="flex gap-2 pt-3 mt-2"
              style={{ borderTop: "1px solid hsl(var(--hero-light-border))" }}
            >
              <a
                href="tel:+8801311487592"
                className="flex-1 inline-flex items-center justify-center gap-2 h-11 rounded-full text-sm font-semibold transition-colors duration-300"
                style={{
                  border: "1px solid hsl(var(--hero-light-border))",
                  color: "hsl(var(--hero-light-deep))",
                }}
              >
                <Phone className="h-4 w-4" /> Call
              </a>
              <a
                href="/contact/"
                className="flex-1 inline-flex items-center justify-center gap-2 h-11 rounded-full text-sm font-semibold transition-colors duration-300"
                style={{
                  background: "hsl(var(--primary-bright))",
                  color: "#ffffff",
                }}
              >
                Book
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default DrArefinHeaderLight;
