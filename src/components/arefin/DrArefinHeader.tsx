import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, MessageCircle, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/dr-arefin-logo-black.webp";
import SlideButton from "./SlideButton";

type NavChild = { label: string; description: string; path: string; icon: React.ReactNode };

type NavItem = {
  label: string;
  path: string;
  children?: NavChild[];
  mega?: boolean;
};

const LiverIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M3 12c0-4 3-8 7-8 2 0 3.5 1 4.5 2.5S17 9 19 9c2 0 2 2 2 3s-1 5-5 5c-2 0-3-1-4.5-1S8 17 6 17c-2 0-3-2.5-3-5z"/>
    <path d="M12 4v8m0 0c-1 2-3 3-5 4m5-4c1 2 3 3 5 4"/>
  </svg>
);
const GallbladderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M12 2c3 0 5 2 5 5v3c0 4-2 7-3 9s-1 3-2 3-1-1-2-3-3-5-3-9V7c0-3 2-5 5-5z"/>
    <path d="M9 7h6"/>
  </svg>
);
const PancreasIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M4 12c0-2 1-4 3-4h2c1 0 2 1 3 1h1c1 0 2-1 3-1h2c2 0 3 2 3 4s-1 4-3 4h-2c-1 0-2-1-3-1h-1c-1 0-2 1-3 1H7c-2 0-3-2-3-4z"/>
    <circle cx="8" cy="12" r="1"/><circle cx="16" cy="12" r="1"/>
  </svg>
);
const BiliaryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M12 3v5m0 0l-3 4v6a2 2 0 004 0v-6l-3-4m2 0h2"/>
    <path d="M8 8h8"/>
  </svg>
);

const navLinks: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about/" },
  {
    label: "Treatment",
    path: "/treatment/",
    children: [
      { label: "Liver Surgery", description: "Resection, transplant & HCC care", path: "/treatment/liver-surgery/", icon: <LiverIcon /> },
      { label: "Gall Bladder", description: "Laparoscopic cholecystectomy", path: "/treatment/gallbladder-surgery/", icon: <GallbladderIcon /> },
      { label: "Pancreatic Surgery", description: "Whipple & pseudocyst procedures", path: "/treatment/pancreatic-surgery/", icon: <PancreasIcon /> },
      { label: "Biliary Tract", description: "Bile duct reconstruction & stenting", path: "/treatment/biliary-tract-surgery/", icon: <BiliaryIcon /> },
    ],
  },
  { label: "Mentorship", path: "/mentorship/" },
  { label: "Articles", path: "/articles/" },
  { label: "Gallery", path: "/gallery/" },
];

const normalizePath = (path: string) => (path.endsWith("/") ? path : `${path}/`);

const isRouteActive = (currentPath: string, itemPath: string) => {
  if (itemPath === "/") return currentPath === "/";
  const current = normalizePath(currentPath);
  const target = normalizePath(itemPath);
  return current === target || current.startsWith(target);
};

/**
 * Dual CTA pill — CAF/Atto reference design:
 *   ┌─────────────┬───┬──────────────┐
 *   │  Call       │OR │  Book        │
 *   │  (DARK)     │(glass ring)│(GREEN) │
 *   └─────────────┴───┴──────────────┘
 *
 * Spec:
 *  - Container: rounded-full, overflow visible, no outer border, soft CAF shadow.
 *  - Left "Call": bg = hsl(var(--background-deepest)), white text+icon.
 *  - Center "OR": 20px off-white circle with 6px translucent glass ring.
 *  - Right "Book": bg = hsl(var(--primary)), white text+icon.
 *  - Hover: each half independently brightens, matching CAF behavior.
 */
export const CallBookPill = () => (
  <div className="arefin-dual-cta" role="group" aria-label="Call or book Dr. Arefin">
    <a
      href="tel:+8801311487592"
      className="arefin-dual-cta-call no-underline"
      title="Call Dr. Arefin for an appointment"
    >
      <Phone className="h-[15px] w-[15px]" strokeWidth={2} aria-hidden />
      Call
    </a>
    <span className="arefin-dual-cta-or" aria-hidden>OR</span>
    <Link
      to="/contact/"
      className="arefin-dual-cta-book no-underline"
      title="Book an appointment with Dr. Arefin"
    >
      <MessageCircle className="h-[15px] w-[15px]" strokeWidth={2} aria-hidden />
      Book
    </Link>
  </div>
);

const NavItemLink = ({
  item,
  isActive,
  currentPath,
  openDropdown,
  setOpenDropdown,
}: {
  item: NavItem;
  isActive: boolean;
  currentPath: string;
  openDropdown: string | null;
  setOpenDropdown: (v: string | null) => void;
}) => {
  const hasChildren = !!item.children?.length;
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isOpen = openDropdown === item.label;

  const handleEnter = () => {
    if (!hasChildren) return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(item.label);
  };

  const handleLeave = () => {
    if (!hasChildren) return;
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <li
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Link
        to={item.path}
        data-active={isActive || undefined}
        aria-haspopup={hasChildren || undefined}
        aria-expanded={hasChildren ? isOpen : undefined}
        onClick={() => setOpenDropdown(null)}
        className={`arefin-nav-item inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
          isActive
            ? "text-primary"
            : "text-foreground/80 hover:text-primary hover:bg-secondary"
        }`}
      >
        {item.label}
        {hasChildren && (
          <ChevronDown
            className={`h-[14px] w-[14px] opacity-50 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </Link>

      {hasChildren && isOpen && item.mega && (
        <div
          className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <div className="arefin-mega-panel arefin-mega-reveal" role="menu">
            <div className="grid grid-cols-2 gap-2">
              {item.children!.map((child) => {
                const childActive = isRouteActive(currentPath, child.path);
                return (
                  <Link
                    key={child.path}
                    to={child.path}
                    role="menuitem"
                    data-active={childActive || undefined}
                    onClick={() => setOpenDropdown(null)}
                    className="arefin-mega-card"
                  >
                    <span className="arefin-mega-icon">{child.icon}</span>
                    <span>
                      <span className="arefin-mega-card-title block">{child.label}</span>
                      <span className="arefin-mega-card-desc block">{child.description}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
            <div className="arefin-mega-popular">
              <span className="arefin-mega-popular-label">Popular topics</span>
              <ul className="arefin-mega-popular-list">
                <li><Link to="/best-hepatobiliary-surgeon-dhaka/" onClick={() => setOpenDropdown(null)} title="Best hepatobiliary surgeon in Dhaka">Best surgeon in Dhaka</Link></li>
                <li><Link to="/conditions/gallstones/" onClick={() => setOpenDropdown(null)} title="Gallstones — symptoms and treatment">Gallstones</Link></li>
                <li><Link to="/treatment/laparoscopic-surgery/" onClick={() => setOpenDropdown(null)} title="Laparoscopic surgery in Dhaka">Laparoscopic surgery</Link></li>
                <li><Link to="/treatment/fatty-liver-management/" onClick={() => setOpenDropdown(null)} title="Fatty liver management">Fatty liver</Link></li>
              </ul>
            </div>
            <div className="arefin-mega-footer">
              <Link
                to="/treatment/"
                onClick={() => setOpenDropdown(null)}
                className="arefin-mega-footer-link text-xs font-medium transition-colors duration-300"
              >
                View all treatments →
              </Link>
            </div>
          </div>
        </div>
      )}

      {hasChildren && isOpen && !item.mega && (
        <div
          className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <div
            className="arefin-dropdown w-80 arefin-scale-in"
            role="menu"
          >
            {item.children!.map((child) => {
              const childActive = isRouteActive(currentPath, child.path);
              return (
                <Link
                  key={child.path}
                  to={child.path}
                  role="menuitem"
                  data-active={childActive || undefined}
                  onClick={() => setOpenDropdown(null)}
                  className="arefin-dropdown-item flex flex-col w-full rounded-lg px-4 py-3 text-left gap-0.5"
                >
                  <span className="arefin-dropdown-item-title text-sm font-semibold text-popover-foreground">{child.label}</span>
                  <span className="arefin-dropdown-item-desc text-xs text-muted-foreground leading-snug">{child.description}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </li>
  );
};

type DrArefinHeaderProps = { logoSrc?: string; transparent?: boolean };
const DrArefinHeader = ({ logoSrc, transparent = false }: DrArefinHeaderProps = {}) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  // Lock body scroll while the mobile menu is open. Preserves the user's
  // current scroll position so closing the menu doesn't jump to top.
  // Uses position:fixed + negative top trick (works on iOS Safari, where
  // overflow:hidden alone is unreliable). Cleanup restores scroll on
  // unmount or close.
  useEffect(() => {
    if (!mobileOpen) return;
    const scrollY = window.scrollY;
    const { body } = document;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      window.scrollTo(0, scrollY);
    };
  }, [mobileOpen]);

  return (
    <header data-transparent={transparent || undefined} className={
      transparent
        ? "arefin-header arefin-header-transparent absolute top-0 left-0 right-0 z-50 arefin-fade-in"
        : "arefin-header sticky top-0 z-50 bg-white border-b border-border/50 arefin-fade-in"
    }>
      <div className="container flex items-center justify-between h-[70px]">
        {/* Logo */}
        <Link
          to="/"
          className="group flex items-center"
          aria-label="Dr. M Arefin — Hepatobiliary Panacea"
        >
          <img
            src={logoSrc ?? logo}
            alt="Dr. M Arefin Hepatobiliary Panacea logo"
            className="h-9 sm:h-10 md:h-14 w-auto max-w-[150px] sm:max-w-[180px] md:max-w-none object-contain transition-[filter] duration-300 group-hover:[filter:brightness(1.08)]"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:block" aria-label="Primary">
          <ul className="flex items-center gap-1">
            {navLinks.map((item) => (
              <NavItemLink
                key={item.path}
                item={item}
                isActive={isRouteActive(location.pathname, item.path)}
                currentPath={location.pathname}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
              />
            ))}
          </ul>
        </nav>

        {/* Desktop right actions — CAF/Atto-style dual CTA pill */}
        <div className="hidden lg:flex items-center">
          <CallBookPill />
        </div>

        {/* Mobile toggles */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="inline-flex items-center justify-center min-w-11 min-h-11 rounded-lg text-foreground hover:bg-secondary transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {mobileOpen ? <X className="h-[22px] w-[22px]" /> : <Menu className="h-[22px] w-[22px]" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer — backdrop + panel; siblings inside a fixed wrapper so
          stacking order is unambiguous regardless of header context. */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[70px] z-[60]">
          <div
            className="absolute inset-0 bg-black/55 arefin-fade-in"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="arefin-mobile-panel relative bg-white text-slate-900 max-h-full overflow-y-auto arefin-fade-in-up">
          <nav className="container py-4 flex flex-col gap-1" aria-label="Mobile primary">
            {navLinks.map((item) => {
              const hasChildren = !!item.children?.length;
              const isExpanded = mobileExpanded === item.label;
              const isActive = isRouteActive(location.pathname, item.path);

              return (
                <div key={item.path}>
                  {hasChildren ? (
                    <button
                      type="button"
                      onClick={() => setMobileExpanded(isExpanded ? null : item.label)}
                      aria-expanded={isExpanded}
                      aria-controls={`mobile-submenu-${item.label}`}
                      data-active={isExpanded || isActive ? "true" : undefined}
                      className="arefin-nav-item arefin-mobile-link flex w-full items-center justify-between min-h-12 px-4 py-3 rounded-lg text-sm font-medium text-slate-900 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      aria-current={isActive ? "page" : undefined}
                      data-active={isActive ? "true" : undefined}
                      className="arefin-nav-item arefin-mobile-link flex w-full items-center min-h-12 px-4 py-3 rounded-lg text-sm font-medium text-slate-900 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      {item.label}
                    </Link>
                  )}
                  {hasChildren && isExpanded && (
                    <div
                      id={`mobile-submenu-${item.label}`}
                      className="ml-3 mt-1 flex flex-col gap-1 arefin-fade-in-up"
                    >
                      {item.children!.map((child) => {
                        const childActive = location.pathname === child.path;
                        return (
                          <Link
                            key={child.path}
                            to={child.path}
                            aria-current={childActive ? "page" : undefined}
                            data-active={childActive ? "true" : undefined}
                            className={`arefin-dropdown-item flex items-start gap-3 rounded-lg px-4 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                              childActive
                                ? "border-l-[3px] border-primary"
                                : "border-l border-border"
                            }`}
                          >
                            {child.icon && (
                              <span className="flex-shrink-0 mt-0.5 text-primary/70">
                                {child.icon}
                              </span>
                            )}
                            <div className="flex flex-col gap-0.5">
                              <span className={`arefin-dropdown-item-title text-sm font-semibold ${childActive ? "text-primary" : "text-popover-foreground"}`}>{child.label}</span>
                              <span className="arefin-dropdown-item-desc text-xs text-body-text leading-snug">{child.description}</span>
                            </div>
                          </Link>
                        );
                      })}
                      <Link
                        to={item.path}
                        className="mt-1 ml-[3px] inline-flex items-center gap-1 px-4 py-2 text-xs font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
                      >
                        View all {item.label.toLowerCase()} →
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}

            <div className="arefin-mobile-divider flex gap-2 pt-3 mt-2">
              <a
                href="tel:+8801311487592"
                className="arefin-mobile-call flex-1 inline-flex items-center justify-center gap-2 min-h-12 px-4 rounded-full text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Phone className="h-4 w-4" />
                Call
              </a>
              <SlideButton
                to="/contact/"
                hoverText="Let's Talk"
                className="flex-1"
              >
                Book
              </SlideButton>
            </div>
          </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default DrArefinHeader;
