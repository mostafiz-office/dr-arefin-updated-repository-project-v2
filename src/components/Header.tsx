import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, FileText, Star, FolderOpen, ArrowRight, MapPin, Landmark, Shield } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const serviceLinks = [
  { label: "CAF 730 Online", path: "/caf-730-online", titleAttr: "CAF 730 Online a Fondi – Prenotazione e compilazione dichiarazione redditi online" },
  { label: "Calcolo ISEE", path: "/caf-isee", titleAttr: "Calcolo ISEE a Fondi – Elaborazione DSU per bonus e agevolazioni sociali" },
  { label: "Patronato INPS", path: "/patronato-inps", titleAttr: "Patronato INPS a Fondi – Pensioni, NASpI, invalidità e pratiche previdenziali" },
  { label: "CAF Dichiarazione Redditi", path: "/caf-dichiarazione-redditi", titleAttr: "CAF Dichiarazione Redditi a Fondi – Consulenza fiscale e Modello Redditi PF" },
  { label: "Tutti i Servizi", path: "/servizi", titleAttr: "Tutti i Servizi CAF e Patronato a Fondi – 730, ISEE, Pensioni e Consulenza" },
];

const blogCategories = [
  { label: "CAF & Fiscale", path: "/blog?categoria=caf-fiscale", titleAttr: "Articoli su CAF, 730 e Fiscale a Fondi – Guide e novità tributarie" },
  { label: "Patronato & INPS", path: "/blog?categoria=patronato-inps", titleAttr: "Articoli su Patronato INPS a Fondi – Pensioni, invalidità, NASpI" },
  { label: "Guide & Novità", path: "/blog?categoria=guide-novita", titleAttr: "Guide pratiche e novità normative – CAF Patronato Fondi" },
  { label: "Bonus & Agevolazioni", path: "/blog?categoria=bonus-agevolazioni", titleAttr: "Articoli su Bonus e Agevolazioni – Detrazioni e incentivi a Fondi" },
];

const blogLatest = [
  { label: "Modello 730/2025: Scadenze e Novità", path: "/blog/modello-730-2025-scadenze-novita", titleAttr: "Modello 730 2025 scadenze e novità – Guida CAF Fondi" },
  { label: "Calcolo ISEE 2025: Guida Bonus", path: "/blog/calcolo-isee-2025-bonus-agevolazioni", titleAttr: "Calcolo ISEE 2025 bonus e agevolazioni – Guida CAF Fondi" },
  { label: "Pensione 2025: Requisiti e Novità", path: "/blog/pensione-2025-requisiti-opzione-donna", titleAttr: "Pensione 2025 requisiti e novità – Patronato INPS Fondi" },
];

const blogFeatured = [
  { label: "Guida Completa 730 Online", path: "/blog/modello-730-2025-scadenze-novita", titleAttr: "Guida completa al 730 online – CAF Patronato Fondi" },
  { label: "ISEE: Tutto Quello che Devi Sapere", path: "/blog/calcolo-isee-2025-bonus-agevolazioni", titleAttr: "ISEE guida completa – CAF Patronato Fondi" },
];

const navLinks = [
  { label: "Home", path: "/", titleAttr: "Home – CAF Patronato Fondi, assistenza fiscale e previdenziale" },
  { label: "Chi Siamo", path: "/chi-siamo", titleAttr: "Chi Siamo – CAF Patronato Fondi, storia e valori dal 2005" },
  { label: "Servizi", path: "/servizi", titleAttr: "Servizi CAF e Patronato a Fondi – 730, ISEE, Patronato INPS", children: serviceLinks },
  { label: "Blog", path: "/blog", titleAttr: "Blog CAF Patronato Fondi – Guide fiscali, ISEE e pensioni a Fondi", megaMenu: true },
  { label: "Contatto", path: "/contatto", titleAttr: "Contattaci – Prenota appuntamento CAF a Fondi, Terracina e Cisterna di Latina", contactMenu: true },
  { label: "Privacy", path: "/privacy", titleAttr: "Privacy e Note Legali – CAF Patronato Fondi", privacyMenu: true },
];

const Header = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isServiceActive = ["/servizi", "/caf-730-online", "/caf-isee", "/patronato-inps", "/caf-dichiarazione-redditi"].includes(location.pathname);
  const isBlogActive = location.pathname.startsWith("/blog");
  const isContactActive = location.pathname.startsWith("/contatto");

  const contactLocations = [
    { label: "Sede Fondi", path: "/contatto/fondi", titleAttr: "Contatti CAF Patronato Fondi – Prenotazione appuntamento", icon: MapPin },
    { label: "Sede Terracina", path: "/contatto/terracina", titleAttr: "Contatti CAF Patronato Terracina – Prenotazione appuntamento", icon: MapPin },
    { label: "Sede Cisterna di Latina", path: "/contatto/cisterna-di-latina", titleAttr: "Contatti CAF Patronato Cisterna di Latina – Prenotazione appuntamento", icon: MapPin },
  ];

  const privacyLinks = [
    { label: "Disclaimer", href: "https://cafpatronatofondi.com/disclaimer/", titleAttr: "Disclaimer – CAF Patronato Fondi note legali e limitazioni di responsabilità" },
    { label: "Imprint", href: "https://cafpatronatofondi.com/imprint/", titleAttr: "Imprint – CAF Patronato Fondi informazioni legali e dati aziendali" },
    { label: "Cookie Policy (EU)", href: "https://cafpatronatofondi.com/cookie-policy-eu/", titleAttr: "Cookie Policy EU – CAF Patronato Fondi gestione cookie e consenso" },
    { label: "Privacy Statement (EU)", href: "https://cafpatronatofondi.com/privacy-statement-eu/", titleAttr: "Privacy Statement EU – CAF Patronato Fondi trattamento dati personali GDPR" },
  ];

  const renderBlogMegaMenu = () => (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[680px] bg-card border border-border rounded-xl shadow-xl z-50 p-6" title="Blog Mega Menu – CAF Patronato Fondi articoli, categorie e guide">
      <div className="grid grid-cols-3 gap-6">
        {/* Latest Blog */}
        <div>
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
            <FileText className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground" title="Ultimi articoli blog CAF Patronato Fondi – Guide fiscali e previdenziali">Ultimi Articoli</h2>
          </div>
          <div className="flex flex-col gap-1">
            {blogLatest.map((item) => (
              <h3 key={item.path} className="text-xs font-normal m-0">
                <strong title={item.titleAttr}>
                  <Link
                    to={item.path}
                    title={item.titleAttr}
                    onClick={() => setOpenDropdown(null)}
                    className={`block px-3 py-2 rounded-md transition-colors hover:bg-accent hover:text-primary ${
                      location.pathname === item.path ? "text-primary bg-accent" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                </strong>
              </h3>
            ))}
            <h3 className="text-xs font-normal m-0">
              <strong title="Vedi tutti gli articoli del blog CAF Patronato Fondi – Archivio completo guide fiscali">
                <Link
                  to="/blog"
                  title="Vedi tutti gli articoli – Blog CAF Patronato Fondi"
                  onClick={() => setOpenDropdown(null)}
                  className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-primary hover:underline mt-1"
                >
                  Vedi tutti <ArrowRight className="h-3 w-3" />
                </Link>
              </strong>
            </h3>
          </div>
        </div>

        {/* Categories */}
        <div>
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
            <FolderOpen className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground" title="Categorie blog CAF Patronato Fondi – CAF fiscale, Patronato INPS, guide e bonus">Categorie</h2>
          </div>
          <div className="flex flex-col gap-1">
            {blogCategories.map((item) => (
              <h3 key={item.path} className="text-xs font-normal m-0">
                <strong title={item.titleAttr}>
                  <Link
                    to={item.path}
                    title={item.titleAttr}
                    onClick={() => setOpenDropdown(null)}
                    className="block px-3 py-2 rounded-md transition-colors hover:bg-accent hover:text-primary text-muted-foreground"
                  >
                    {item.label}
                  </Link>
                </strong>
              </h3>
            ))}
          </div>
        </div>

        {/* Featured Articles */}
        <div>
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
            <Star className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground" title="Articoli in evidenza CAF Patronato Fondi – Guide essenziali 730 e ISEE">Articoli in Evidenza</h2>
          </div>
          <div className="flex flex-col gap-1">
            {blogFeatured.map((item) => (
              <h3 key={item.path} className="text-xs font-normal m-0">
                <strong title={item.titleAttr}>
                  <Link
                    to={item.path}
                    title={item.titleAttr}
                    onClick={() => setOpenDropdown(null)}
                    className={`block px-3 py-2 rounded-md transition-colors hover:bg-accent hover:text-primary ${
                      location.pathname === item.path ? "text-primary bg-accent" : "text-muted-foreground"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Star className="h-3 w-3 text-primary/60 flex-shrink-0" />
                      {item.label}
                    </span>
                  </Link>
                </strong>
              </h3>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <header className={`sticky top-0 z-50 bg-background transition-shadow duration-300 ${scrolled ? "shadow-md" : "border-b border-border"}`} title="Navigazione CAF Patronato Fondi – Menu principale assistenza fiscale e previdenziale">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" title="CAF Patronato Fondi – Centro assistenza fiscale e previdenziale a Fondi, Terracina e Latina" className="flex items-center gap-2.5">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-primary flex items-center justify-center shadow-sm">
            <Landmark className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
          </div>
          <span className="text-lg md:text-xl font-bold text-foreground tracking-tight uppercase">
            CAF <span className="text-primary">&</span> Patronato
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1" title="Menu navigazione CAF Patronato Fondi – Servizi fiscali e previdenziali">
          {navLinks.map((link) => {
            const isOpen = openDropdown === link.label;
            const isActive = link.label === "Servizi" ? isServiceActive : link.label === "Blog" ? isBlogActive : link.label === "Contatto" ? isContactActive : location.pathname === link.path;
            const hasContactMenu = 'contactMenu' in link && link.contactMenu;
            const hasMegaMenu = 'megaMenu' in link && link.megaMenu;
            const hasChildren = 'children' in link && link.children;
            const hasPrivacyMenu = 'privacyMenu' in link && link.privacyMenu;

            if (hasMegaMenu) {
              return (
                <div key={link.path} className="relative" ref={link.label === openDropdown ? dropdownRef : undefined}>
                  <button
                    onClick={() => setOpenDropdown(isOpen ? null : link.label)}
                    title={link.titleAttr}
                    className={`text-sm font-medium flex items-center gap-1 px-3 py-1.5 rounded-full transition-all duration-200 ${
                      isActive
                        ? "text-primary bg-primary/10 shadow-sm"
                        : "text-foreground hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && renderBlogMegaMenu()}
                </div>
              );
            }

            if (hasChildren) {
              return (
                <div key={link.path} className="relative" ref={link.label === openDropdown ? dropdownRef : undefined}>
                  <button
                    onClick={() => setOpenDropdown(isOpen ? null : link.label)}
                    title={link.titleAttr}
                    className={`text-sm font-medium flex items-center gap-1 px-3 py-1.5 rounded-full transition-all duration-200 ${
                      isActive
                        ? "text-primary bg-primary/10 shadow-sm"
                        : "text-foreground hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-card border border-border rounded-xl shadow-xl py-2 z-50" title={`Dropdown ${link.label} – Servizi CAF e Patronato a Fondi, Terracina e Latina`}>
                      <h2 className="sr-only" title="Menu servizi CAF Patronato Fondi – 730, ISEE, Patronato INPS e dichiarazione redditi">{link.label}</h2>
                      {link.children!.map((child) => (
                        <h3 key={child.path} className="text-sm font-normal m-0">
                          <strong title={child.titleAttr}>
                            <Link
                              to={child.path}
                              title={child.titleAttr}
                              onClick={() => setOpenDropdown(null)}
                              className={`block px-4 py-2.5 transition-colors hover:bg-accent hover:text-primary ${
                                location.pathname === child.path ? "text-primary bg-accent" : "text-foreground"
                              }`}
                            >
                              {child.label}
                            </Link>
                          </strong>
                        </h3>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            if (hasContactMenu) {
              return (
                <div key={link.path} className="relative" ref={link.label === openDropdown ? dropdownRef : undefined}>
                  <button
                    onClick={() => setOpenDropdown(isOpen ? null : link.label)}
                    title={link.titleAttr}
                    className={`text-sm font-medium flex items-center gap-1 px-3 py-1.5 rounded-full transition-all duration-200 ${
                      isActive
                        ? "text-primary bg-primary/10 shadow-sm"
                        : "text-foreground hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="absolute top-full right-0 mt-2 w-64 bg-card border border-border rounded-xl shadow-xl py-2 z-50" title="Sedi CAF Patronato – Prenotazione appuntamento a Fondi, Terracina e Cisterna di Latina">
                      <h2 className="sr-only" title="Sedi contatto CAF Patronato – Fondi, Terracina e Cisterna di Latina assistenza fiscale">Contatto Sedi</h2>
                      {contactLocations.map((loc) => (
                        <h3 key={loc.path} className="text-sm font-normal m-0">
                          <strong title={loc.titleAttr}>
                            <Link
                              to={loc.path}
                              title={loc.titleAttr}
                              onClick={() => setOpenDropdown(null)}
                              className={`flex items-center gap-2 px-4 py-2.5 transition-colors hover:bg-accent hover:text-primary ${
                                location.pathname === loc.path ? "text-primary bg-accent" : "text-foreground"
                              }`}
                            >
                              <MapPin className="h-3.5 w-3.5 text-primary/60" />
                              {loc.label}
                            </Link>
                          </strong>
                        </h3>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            if (hasPrivacyMenu) {
              return (
                <div key={link.path} className="relative" ref={link.label === openDropdown ? dropdownRef : undefined}>
                  <button
                    onClick={() => setOpenDropdown(isOpen ? null : link.label)}
                    title={link.titleAttr}
                    className={`text-sm font-medium flex items-center gap-1 px-3 py-1.5 rounded-full transition-all duration-200 ${
                      isOpen
                        ? "text-primary bg-primary/10 shadow-sm"
                        : "text-foreground hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="absolute top-full right-0 mt-2 w-64 bg-card border border-border rounded-xl shadow-xl py-2 z-50" title="Privacy e Note Legali – CAF Patronato Fondi">
                      <h2 className="sr-only" title="Menu privacy e note legali CAF Patronato Fondi">Privacy</h2>
                      {privacyLinks.map((item) => (
                        <h3 key={item.href} className="text-sm font-normal m-0">
                          <strong title={item.titleAttr}>
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={item.titleAttr}
                              onClick={() => setOpenDropdown(null)}
                              className="flex items-center gap-2 px-4 py-2.5 transition-colors hover:bg-accent hover:text-primary text-foreground"
                            >
                              <Shield className="h-3.5 w-3.5 text-primary/60" />
                              {item.label}
                            </a>
                          </strong>
                        </h3>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.path}
                to={link.path}
                title={link.titleAttr}
                className={`text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-200 ${
                  location.pathname === link.path
                    ? "text-primary bg-primary/10 shadow-sm"
                    : "text-foreground hover:text-primary hover:bg-primary/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center">
          <div className="flex items-center rounded-full overflow-visible relative border border-border/40 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
            <a
              href="tel:+393285561774"
              title="Chiama – CAF Patronato Fondi assistenza telefonica immediata"
              className="flex items-center gap-2 h-11 px-6 text-sm font-semibold text-white bg-cta-bg rounded-l-full transition-[filter] duration-300 hover:brightness-125 no-underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Chiama
            </a>
            <span className="relative z-10 flex items-center justify-center w-[20px] h-[20px] -mx-[10px] rounded-full bg-[#fafaf8] text-[12px] font-medium text-foreground shadow-[0_0_0_6px_rgba(255,255,255,0.2)]" style={{ fontFamily: "'Poppins', sans-serif" }}>
              O
            </span>
            <a
              href="/contatto"
              title="Contatta – CAF Patronato Fondi"
              className="flex items-center gap-2 h-11 px-6 text-sm font-semibold text-white bg-primary rounded-r-full transition-[filter] duration-300 hover:brightness-110 no-underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Contatta
            </a>
          </div>
        </div>

        {/* Mobile menu toggle — animated hamburger */}
        <button
          className="lg:hidden relative p-2 text-foreground w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
          title="Apri menu navigazione CAF Patronato Fondi"
        >
          <span className="sr-only">Menu</span>
          <span
            className={`absolute h-0.5 w-5 bg-foreground rounded transition-all duration-300 ease-in-out ${
              mobileOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"
            }`}
          />
          <span
            className={`absolute h-0.5 w-5 bg-foreground rounded transition-all duration-300 ease-in-out ${
              mobileOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
            }`}
          />
          <span
            className={`absolute h-0.5 w-5 bg-foreground rounded transition-all duration-300 ease-in-out ${
              mobileOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5"
            }`}
          />
        </button>
      </div>

      {/* Mobile nav — animated slide */}
      <div
        className={`lg:hidden border-t border-border bg-background overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0 border-t-0"
        }`}
      >
        <nav className="container flex flex-col gap-1 py-4" title="Menu mobile CAF Patronato Fondi – Servizi fiscali e previdenziali">
            {navLinks.map((link) => {
              const hasMegaMenu = 'megaMenu' in link && link.megaMenu;
              const hasChildren = 'children' in link && link.children;
              const hasContactMenu = 'contactMenu' in link && link.contactMenu;
              const hasPrivacyMenu = 'privacyMenu' in link && link.privacyMenu;
              const hasSubmenu = hasMegaMenu || hasChildren || hasContactMenu || hasPrivacyMenu;
              const isExpanded = mobileExpanded === link.label;

              return (
                <div key={link.path}>
                  {/* Parent link — toggle submenu or navigate */}
                  {hasSubmenu ? (
                    <button
                      onClick={() => setMobileExpanded(isExpanded ? null : link.label)}
                      title={link.titleAttr}
                      className={`w-full flex items-center justify-between text-base font-semibold py-3 px-2 rounded-lg transition-all duration-200 ${
                        isExpanded ? "text-primary bg-primary/5" : "text-foreground hover:text-primary hover:bg-muted/50"
                      }`}
                    >
                      {link.label}
                      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ease-in-out ${isExpanded ? "rotate-180" : ""}`} />
                    </button>
                  ) : (
                    <Link
                      to={link.path}
                      title={link.titleAttr}
                      onClick={() => { setMobileOpen(false); setMobileExpanded(null); }}
                      className={`block text-base font-semibold py-3 px-2 rounded-lg transition-all duration-200 hover:bg-muted/50 ${
                        location.pathname === link.path ? "text-primary bg-primary/5" : "text-foreground hover:text-primary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}

                  {/* Animated submenu container */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    {/* Blog mega menu sections */}
                    {hasMegaMenu && (
                      <div className="ml-3 pl-3 border-l-2 border-primary/20 flex flex-col gap-3 py-2">
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Ultimi Articoli</p>
                          {blogLatest.map((item) => (
                            <Link key={item.path} to={item.path} title={item.titleAttr} onClick={() => { setMobileOpen(false); setMobileExpanded(null); }}
                              className="block text-sm py-1.5 text-muted-foreground hover:text-primary transition-colors">{item.label}</Link>
                          ))}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Categorie</p>
                          {blogCategories.map((item) => (
                            <Link key={item.path} to={item.path} title={item.titleAttr} onClick={() => { setMobileOpen(false); setMobileExpanded(null); }}
                              className="block text-sm py-1.5 text-muted-foreground hover:text-primary transition-colors">{item.label}</Link>
                          ))}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">In Evidenza</p>
                          {blogFeatured.map((item) => (
                            <Link key={item.path} to={item.path} title={item.titleAttr} onClick={() => { setMobileOpen(false); setMobileExpanded(null); }}
                              className="block text-sm py-1.5 text-muted-foreground hover:text-primary transition-colors">{item.label}</Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Service children */}
                    {hasChildren && (
                      <div className="ml-3 pl-3 border-l-2 border-primary/20 flex flex-col gap-0.5 py-2">
                        {link.children!.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            title={child.titleAttr}
                            onClick={() => { setMobileOpen(false); setMobileExpanded(null); }}
                            className={`text-sm py-1.5 transition-colors hover:text-primary ${
                              location.pathname === child.path ? "text-primary font-medium" : "text-muted-foreground"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Contact locations */}
                    {hasContactMenu && (
                      <div className="ml-3 pl-3 border-l-2 border-primary/20 flex flex-col gap-0.5 py-2">
                        {contactLocations.map((loc) => (
                          <Link
                            key={loc.path}
                            to={loc.path}
                            title={loc.titleAttr}
                            onClick={() => { setMobileOpen(false); setMobileExpanded(null); }}
                            className={`text-sm py-1.5 transition-colors hover:text-primary flex items-center gap-1.5 ${
                              location.pathname === loc.path ? "text-primary font-medium" : "text-muted-foreground"
                            }`}
                          >
                            <MapPin className="h-3 w-3" />
                            {loc.label}
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Privacy links */}
                    {hasPrivacyMenu && (
                      <div className="ml-3 pl-3 border-l-2 border-primary/20 flex flex-col gap-0.5 py-2">
                        {privacyLinks.map((item) => (
                          <a
                            key={item.href}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={item.titleAttr}
                            onClick={() => { setMobileOpen(false); setMobileExpanded(null); }}
                            className="text-sm py-1.5 transition-colors hover:text-primary flex items-center gap-1.5 text-muted-foreground"
                          >
                            <Shield className="h-3 w-3" />
                            {item.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div className="flex items-center rounded-full overflow-hidden shadow-sm mt-3">
              <a
                href="tel:+393285561774"
                title="Chiamaci – CAF Patronato Fondi"
                className="flex-1 flex items-center justify-center gap-2 h-11 text-sm font-semibold text-primary-foreground"
                style={{ backgroundColor: 'hsl(var(--cta-bg))' }}
                onClick={() => { setMobileOpen(false); setMobileExpanded(null); }}
              >
                Chiamaci
              </a>
              <span className="relative z-10 flex items-center justify-center w-[20px] h-[20px] -mx-[10px] rounded-full bg-[#fafaf8] text-[12px] font-medium text-foreground shadow-[0_0_0_6px_rgba(255,255,255,0.2)]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Or
              </span>
              <a
                href="https://wa.me/393285561774"
                target="_blank"
                rel="noopener noreferrer"
                title="Contattaci su WhatsApp – CAF Patronato Fondi"
                className="flex-1 flex items-center justify-center gap-2 h-11 text-sm font-semibold text-primary-foreground bg-primary"
                onClick={() => { setMobileOpen(false); setMobileExpanded(null); }}
              >
                Contattaci
              </a>
            </div>
          </nav>
        </div>
    </header>
  );
};

export default Header;