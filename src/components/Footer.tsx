import { Link } from "react-router-dom";
import { Mail, Phone, Facebook, Instagram, Linkedin, Landmark } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-accent border-t border-border" title="Footer CAF Patronato Fondi – Contatti, servizi e link rapidi per assistenza fiscale a Fondi, Terracina e Cisterna di Latina">
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand */}
          <div>
            <h3 className="mb-4" title="CAF Patronato Fondi – Centro assistenza fiscale e previdenziale accreditato">
              <strong title="CAF Patronato – Centro assistenza fiscale">
                <Link to="/" title="CAF Patronato Fondi – Home page" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
                  <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-sm">
                    <Landmark className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="text-lg font-bold text-foreground tracking-tight uppercase">
                    CAF <span className="text-primary">&</span> Patronato
                  </span>
                </Link>
              </strong>
            </h3>
            <div className="paragraph-parent-block seo-parent-block">
               <p className="text-sm leading-relaxed text-body-text seo-container-para text-justify" title="CAF Patronato Fondi – Assistenza fiscale e previdenziale professionale con 730 online, ISEE, pensioni INPS a Fondi, Terracina e Cisterna di Latina">
                <strong title="CAF Patronato Fondi – Centro assistenza fiscale e previdenziale professionale">
                  <Link to="/" title="CAF Patronato Fondi – Assistenza fiscale a Fondi e Cisterna di Latina" className="text-body-text hover:text-primary transition-colors">CAF Patronato Fondi</Link>
                </strong>: assistenza fiscale e previdenziale professionale a Fondi, Terracina e Cisterna di Latina.{" "}
                <strong title="CAF 730 Online – Dichiarazione redditi con prenotazione online">
                  <Link to="/caf-730-online" title="CAF 730 Online a Fondi" className="text-body-text hover:text-primary transition-colors">CAF 730 online</Link>
                </strong>,{" "}
                <strong title="Calcolo ISEE – Elaborazione DSU per bonus e agevolazioni">
                  <Link to="/caf-isee" title="Calcolo ISEE a Fondi" className="text-body-text hover:text-primary transition-colors">calcolo ISEE</Link>
                </strong>,{" "}
                <strong title="Patronato INPS – Pensioni, NASpI e pratiche previdenziali">
                  <Link to="/patronato-inps" title="Patronato INPS a Fondi" className="text-body-text hover:text-primary transition-colors">pensioni INPS</Link>
                </strong>, disoccupazione e{" "}
                <strong title="Dichiarazione redditi – Modello Redditi PF e consulenza fiscale">
                  <Link to="/caf-dichiarazione-redditi" title="Dichiarazione redditi a Fondi" className="text-body-text hover:text-primary transition-colors">dichiarazione redditi</Link>
                </strong>. Il tuo CAF di fiducia vicino a te. ☎ +39 328 556 1774.
              </p>
            </div>
          </div>

          {/* Col 2: Servizi */}
          <div>
            <h4 className="text-lg font-bold text-foreground mb-5" title="Servizi CAF Patronato Fondi – 730, ISEE, Patronato INPS, Dichiarazione Redditi">Servizi CAF</h4>
            <ul className="space-y-3 text-sm text-body-text">
              <li><Link to="/caf-730-online" title="CAF 730 Online a Fondi – Prenotazione e compilazione dichiarazione redditi" className="hover:text-primary transition-colors">CAF 730 Online</Link></li>
              <li><Link to="/caf-isee" title="Calcolo ISEE a Fondi – Elaborazione DSU per bonus e agevolazioni" className="hover:text-primary transition-colors">Calcolo ISEE</Link></li>
              <li><Link to="/patronato-inps" title="Patronato INPS a Fondi – Pensioni, NASpI e pratiche previdenziali" className="hover:text-primary transition-colors">Patronato INPS</Link></li>
              <li><Link to="/caf-dichiarazione-redditi" title="Dichiarazione Redditi a Fondi – Consulenza fiscale e Modello Redditi PF" className="hover:text-primary transition-colors">Dichiarazione Redditi</Link></li>
              <li><Link to="/servizi" title="Tutti i servizi CAF e Patronato a Fondi e Latina" className="hover:text-primary transition-colors">Tutti i Servizi</Link></li>
            </ul>
          </div>

          {/* Col 3: Link Rapidi */}
          <div>
            <h4 className="text-lg font-bold text-foreground mb-5" title="Link rapidi CAF Patronato Fondi">Link Rapidi</h4>
            <ul className="space-y-3 text-sm text-body-text">
              <li><Link to="/" title="Home – CAF Patronato Fondi" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/chi-siamo" title="Chi Siamo – CAF Patronato Fondi, storia e valori" className="hover:text-primary transition-colors">Chi Siamo</Link></li>
              <li><Link to="/servizi" title="Servizi CAF e Patronato a Fondi – 730, ISEE, Pensioni" className="hover:text-primary transition-colors">Servizi</Link></li>
              <li><Link to="/blog" title="Blog CAF Patronato Fondi – Guide fiscali, ISEE e pensioni" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/contatto" title="Prenota appuntamento CAF a Fondi – Contattaci oggi" className="hover:text-primary transition-colors">Prenota Appuntamento</Link></li>
            </ul>
          </div>

          {/* Col 4: Contatti */}
          <div>
            <h4 className="text-lg font-bold text-foreground mb-5" title="Contatti CAF Fondi – Telefono, email e social media">Contatti CAF Fondi</h4>
            <ul className="space-y-4 text-sm text-body-text">
              <li>
                <a href="mailto:info@cafpatronatofondi.com" title="Email CAF Patronato Fondi – Scrivi per informazioni e prenotazioni" className="inline-flex items-center gap-2.5 hover:text-primary transition-colors">
                  <Mail className="h-4 w-4 shrink-0" /> info@cafpatronatofondi.com
                </a>
              </li>
              <li>
                <a href="tel:+393285561774" title="Cellulare CAF Patronato Fondi – Chiama per prenotare appuntamento" className="inline-flex items-center gap-2.5 hover:text-primary transition-colors">
                  <Phone className="h-4 w-4 shrink-0" /> +39 328 556 1774
                </a>
              </li>
              <li>
                <a href="https://call.rasia.pro/call-caff" title="Telefono fisso CAF Patronato Fondi" className="inline-flex items-center gap-2.5 hover:text-primary transition-colors">
                  <Phone className="h-4 w-4 shrink-0" /> +39 0771 904129
                </a>
              </li>
            </ul>
            <div className="flex gap-3 mt-6">
              {[
                { icon: Facebook, label: "Facebook", titleAttr: "CAF Patronato Fondi su Facebook", href: "https://clink.rasia.pro/caf-facebook" },
                { icon: Instagram, label: "Instagram", titleAttr: "CAF Patronato Fondi su Instagram", href: "https://clink.rasia.pro/caf-instagram" },
                { icon: Linkedin, label: "LinkedIn", titleAttr: "CAF Patronato Fondi su LinkedIn", href: "https://clink.rasia.pro/caf-linkedin" },
              ].map(({ icon: Icon, label, titleAttr, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={titleAttr}
                  className="group w-10 h-10 rounded-full bg-foreground text-primary-foreground flex items-center justify-center hover:bg-primary transition-all duration-300"
                >
                  <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <span>{new Date().getFullYear()} © <strong className="text-foreground" title="CAF Patronato Fondi – Assistenza fiscale e previdenziale">CAF Patronato Fondi</strong> – Assistenza Fiscale e Previdenziale</span>
          <div className="flex gap-6">
            <a href="#" title="Privacy Policy – CAF Patronato Fondi" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" title="Termini e Condizioni – CAF Patronato Fondi" className="hover:text-primary transition-colors">Termini e Condizioni</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
