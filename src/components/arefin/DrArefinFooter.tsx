import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Youtube, Linkedin, Instagram } from "lucide-react";
import logo from "@/assets/dr-arefin-logo.webp";

// Inline SVG icon nodes (lucide doesn't ship these brand marks)
const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.84a8.16 8.16 0 0 0 4.77 1.52V6.91a4.85 4.85 0 0 1-1.84-.22z"/>
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.99.66-2.25 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.11A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.11V7.05H2.18A11 11 0 0 0 1 12c0 1.78.43 3.46 1.18 4.95z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.05l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/>
  </svg>
);

const DrArefinFooter = () => {
  return (
    <footer className="arefin-feature-band border-t border-border/40">
      {/* ───── Row 1 — Brand / Quick Links / Contact / Social ───── */}
      <div className="arefin-footer-row-main">
        <div className="container py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:[grid-template-columns:1.618fr_1fr_1.2fr_0.8fr] gap-10">
            {/* Brand */}
            <div>
              <Link to="/" className="inline-block mb-5" title="Dr. M Arefin — Hepatobiliary, Liver, Gallbladder & Pancreatic Surgeon in Dhanmondi, Dhaka — Home">
                <img
                  src={logo}
                  alt="Dr. M Arefin Hepatobiliary Panacea — official logo"
                  className="h-14 w-auto"
                />
              </Link>
              <p className="text-sm leading-relaxed arefin-band-body">
                {/* T04 (2026-05-17): Gallbladder-first rewrite — leads with
                    the highest-priority keyword, then expands to broader
                    hepatobiliary, liver and pancreatic care. */}
                Expert <Link to="/treatment/gallbladder-surgery/" className="hover:text-primary-light transition-colors" title="Gallbladder surgery in Dhanmondi, Dhaka — laparoscopic cholecystectomy and gallstones treatment">gallbladder surgery</Link>,
                hepatobiliary, liver and pancreatic care by{" "}
                <Link to="/about/" className="hover:text-primary-light transition-colors" title="About Dr. Murshidul Arefin — hepatobiliary and pancreatic surgery specialist in Dhanmondi, Dhaka">
                  Dr. Murshidul Arefin
                </Link>{" "}
                at Popular Medical College Hospital, Dhanmondi, Dhaka.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-base font-semibold mb-5">Quick Links</h4>
              <ul className="space-y-3 text-sm arefin-band-body">
                {/* T05 (2026-05-17): Gallbladder Surgery promoted to Quick
                    Links as top item — mirrors footer Specialties priority. */}
                <li><Link to="/treatment/gallbladder-surgery/" className="hover:text-primary-light transition-colors" title="What is gallbladder surgery in Dhanmondi, Dhaka? Laparoscopic cholecystectomy and gallstones treatment by Dr. Arefin">Gallbladder Surgery</Link></li>
                <li><Link to="/about/" className="hover:text-primary-light transition-colors" title="About Dr. Arefin — surgeon profile, training, and credentials">About Dr. Arefin</Link></li>
                <li><Link to="/treatment/" className="hover:text-primary-light transition-colors" title="Treatment services — liver, gallbladder, pancreatic and biliary surgery in Dhaka">Treatment Services</Link></li>
                <li><Link to="/mentorship/" className="hover:text-primary-light transition-colors" title="Surgical mentorship and training program with Dr. Arefin">Mentorship</Link></li>
                <li><Link to="/articles/" className="hover:text-primary-light transition-colors" title="Articles on hepatobiliary, liver and gallbladder health by Dr. Arefin">Articles</Link></li>
                <li><Link to="/gallery/" className="hover:text-primary-light transition-colors" title="Gallery — operating theatre, chamber and conference photos">Gallery</Link></li>
                <li><Link to="/contact/" className="hover:text-primary-light transition-colors" title="Contact Dr. Arefin — chamber address, phone and appointment booking">Contact</Link></li>
                <li><Link to="/fastest-way-to-reach-a-doctor-in-bangladesh/" className="hover:text-primary-light transition-colors" title="Fastest way to reach a doctor in Bangladesh — reach Dr. Arefin directly, a first in Bangladesh">Reach Dr. Arefin Directly</Link></li>
              </ul>
            </div>

            {/* Contact — full-width tap rows on mobile (≥48px), inline on md+ */}
            <div>
              <h4 className="text-base font-semibold mb-5">Contact</h4>
              <ul className="space-y-2 md:space-y-4 text-sm arefin-band-body">
                <li>
                  <a
                    href="tel:+8801311487592"
                    aria-label="Call Dr. Arefin at +880 1311 487 592"
                    title="Call Dr. Arefin's chamber — +880 1311 487 592"
                    className="arefin-footer-contact-row"
                  >
                    <Phone className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                    <span>+880 1311 487 592</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@drarefin.com"
                    aria-label="Email Dr. Arefin at info@drarefin.com"
                    title="Email Dr. Arefin — info@drarefin.com"
                    className="arefin-footer-contact-row"
                  >
                    <Mail className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                    <span>info@drarefin.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://clink.rasia.pro/best-hepatobiliary-surgeon-in-dhaka"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open Popular Medical College Hospital location on map (opens in a new tab)"
                    title="Popular Medical College Hospital, Dhanmondi, Dhaka — open location on map"
                    className="arefin-footer-contact-row"
                  >
                    <MapPin className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                    <span>
                      Popular Medical College Hospital,<br />
                      Dhanmondi, Dhaka, Bangladesh
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div className="text-center md:text-left">
              <h4 className="text-base font-semibold mb-5">Follow Dr. Arefin</h4>
              <div className="grid grid-cols-4 gap-2 max-w-[15rem] mx-auto md:mx-0 md:max-w-none md:flex md:flex-wrap md:justify-start md:gap-3">
                {[
                  { Icon: Facebook, label: "Facebook", href: "https://www.facebook.com/profile.php?id=61579153446053" },
                  { Icon: Instagram, label: "Instagram", href: "https://instagram.com/rahmanarefin" },
                  { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/murshidul-arefin-60085291/" },
                  { Icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@HealthPanacea" },
                  { Icon: XIcon, label: "X (Twitter)", href: "https://x.com/murshidularefin" },
                  { Icon: TikTokIcon, label: "TikTok", href: "https://www.tiktok.com/@dr..m.arefin" },
                  { Icon: GoogleIcon, label: "Google Business", href: "https://share.google/up7Yu5vPnxjZJSmLz" },
                ].map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={`Dr. Arefin on ${label}`}
                    className="arefin-footer-social-link"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ───── Row 2 — Specialty / SEO landing pages ───── */}
      <div className="arefin-footer-row-specialty">
        <div className="container py-10 md:py-12">
          <nav aria-label="Specialty pages">
            <h4 className="arefin-footer-specialty-label text-xs uppercase tracking-wider mb-4 arefin-band-meta">
              Specialty pages
            </h4>
            <ul className="arefin-footer-specialty-list flex flex-wrap gap-x-3 gap-y-2 md:gap-x-5 text-sm arefin-band-body">
              {/* T03 (2026-05-17): Gallbladder = #1 priority keyword. */}
              <li><Link to="/treatment/gallbladder-surgery/" className="arefin-footer-specialty-pill" title="What is gallbladder surgery in Dhanmondi, Dhaka?">Gallbladder surgery</Link></li>
              <li><Link to="/treatment/liver-surgeon-dhaka/" className="arefin-footer-specialty-pill" title="Liver surgeon in Dhaka">Liver surgeon Dhaka</Link></li>
              <li><Link to="/treatment/hepatobiliary-surgery/" className="arefin-footer-specialty-pill" title="Hepatobiliary surgery in Dhaka">Hepatobiliary surgery</Link></li>
              <li><Link to="/treatment/bile-duct-surgery/" className="arefin-footer-specialty-pill" title="Bile duct surgery">Bile duct surgery</Link></li>
              <li><Link to="/conditions/gallstones/" className="arefin-footer-specialty-pill" title="Gallstones treatment">Gallstones</Link></li>
              <li><Link to="/best-hepatobiliary-surgeon-dhaka/" className="arefin-footer-specialty-pill" title="Best hepatobiliary surgeon in Dhaka">Best hepatobiliary surgeon</Link></li>
              <li><Link to="/treatment/laparoscopic-surgery/" className="arefin-footer-specialty-pill" title="Laparoscopic surgery in Dhaka">Laparoscopic surgery</Link></li>
              <li><Link to="/treatment/fatty-liver-management/" className="arefin-footer-specialty-pill" title="Fatty liver management">Fatty liver</Link></li>
              <li><Link to="/treatment/liver-transplant-coordination/" className="arefin-footer-specialty-pill" title="Liver transplant coordination">Liver transplant</Link></li>
              <li><Link to="/treatment/spleen-surgery/" className="arefin-footer-specialty-pill" title="Spleen surgery">Spleen surgery</Link></li>
              <li><Link to="/popular-medical-college-hospital/" className="arefin-footer-specialty-pill" title="Dr. Arefin chamber at Popular Medical College Hospital">Popular Medical College</Link></li>
            </ul>
          </nav>
        </div>
      </div>

      {/* ───── Row 3 — Copyright / Attribution / Legal ───── */}
      <div className="arefin-footer-row-copyright">
        <div className="container py-6 md:py-7 flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-6 text-xs arefin-band-meta">
          <h2 className="arefin-footer-attribution text-center md:text-left">
            © {new Date().getFullYear()}{" "}
            <a
              href="https://drarefin.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Visit Dr. Arefin official website"
              aria-label="Dr. Arefin — visit the official website (opens in a new tab)"
              className="hover:text-primary-light transition-colors underline-offset-2 hover:underline"
            >
              Dr. Arefin
            </a>
            . All rights reserved
            <span className="mx-2 opacity-50">|</span>
            Powered by{" "}
            <a
              href="https://riseup-asia.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="Riseup-Asia LLC — digital strategy and growth partner"
              className="hover:text-primary-light transition-colors underline-offset-2 hover:underline"
            >
              Riseup-Asia LLC
            </a>
            {" & "}
            <a
              href="https://riseup-seo.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="Riseup-SEO — search engine optimization partner"
              className="hover:text-primary-light transition-colors underline-offset-2 hover:underline"
            >
              Riseup-SEO
            </a>
          </h2>

          <div className="flex justify-center md:justify-end gap-5">
            <Link to="/privacy-statement-eu/" className="hover:text-primary-light transition-colors" title="Privacy statement — how Dr. Arefin handles your data">Privacy</Link>
            <Link to="/cookie-policy-eu/" className="hover:text-primary-light transition-colors" title="Cookie policy — cookies used on drarefin.com">Cookies</Link>
            <Link to="/disclaimer/" className="hover:text-primary-light transition-colors" title="Medical and editorial disclaimer">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DrArefinFooter;
