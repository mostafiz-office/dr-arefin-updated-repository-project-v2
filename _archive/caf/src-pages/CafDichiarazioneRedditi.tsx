import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTABand from "@/components/CTABand";
import PageHero from "@/components/PageHero";
import heroDichRedditi from "@/assets/hero-dichiarazione-redditi.jpg";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/hooks/useScrollReveal";
import { Briefcase, CheckCircle, ArrowRight } from "lucide-react";

const jsonLdRedditi = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "CAF Dichiarazione Redditi a Fondi",
  "description": "Assistenza per Modello Redditi PF, pianificazione fiscale, accertamenti e cartelle esattoriali. CAF tutela fiscale del contribuente a Fondi e Latina.",
  "provider": { "@type": "LocalBusiness", "name": "CAF Patronato Fondi", "areaServed": ["Fondi", "Terracina", "Latina"] },
  "serviceType": "CAF Dichiarazione Redditi",
  "areaServed": ["Fondi", "Terracina", "Latina"],
};

const CafDichiarazioneRedditi = () => {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdRedditi) }} />
      <Header />

      <PageHero
        title="CAF Dichiarazione Redditi a Fondi – Consulenza Fiscale Completa"
        subtitle="Assistenza per Modello Redditi PF, pianificazione fiscale, accertamenti e cartelle esattoriali. CAF tutela fiscale del contribuente a Fondi e Latina."
        titleAttr="CAF Dichiarazione Redditi a Fondi – Consulenza fiscale, Modello Redditi PF, tutela fiscale del contribuente a Fondi, Terracina e Latina"
        sectionTitle="CAF Dichiarazione Redditi Fondi – Tutela Fiscale, Consulenza Tributaria, Accertamenti"
        variant="image-overlay"
        backgroundImage={heroDichRedditi}
      />

      <section className="bg-background seo-page-parent-block" title="CAF Tutela Fiscale del Contribuente a Fondi – Dichiarazione redditi, consulenza e accertamenti">
        <div className="container py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <Reveal direction="left">
              <div>
                <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">CONSULENZA TRIBUTARIA</p>
                <h2
                  className="text-2xl md:text-3xl font-bold text-foreground mb-6"
                  title="CAF Tutela Fiscale del Contribuente a Fondi – Consulenza fiscale personalizzata per privati e imprese"
                >
                  <strong title="CAF Tutela Fiscale – Centro assistenza per la tutela dei diritti fiscali del contribuente">
                    <Link to="/caf-dichiarazione-redditi" title="CAF Tutela Fiscale del Contribuente a Fondi e Latina" className="text-foreground hover:text-primary transition-colors">CAF Tutela Fiscale</Link>
                  </strong> del Contribuente
                </h2>
                <div className="space-y-4 text-body-text leading-relaxed paragraph-parent-block seo-parent-block seo-page-block">
                  <div className="seo-container-para">
                    <p>
                      Il nostro{" "}
                      <strong title="CAF tutela fiscale – Centro assistenza fiscale per la protezione dei diritti del contribuente">
                        <Link to="/caf-dichiarazione-redditi" title="CAF Tutela Fiscale a Fondi – Assistenza per dichiarazione redditi" className="text-body-text hover:text-primary transition-colors">CAF tutela fiscale</Link>
                      </strong>{" "}
                      offre assistenza completa per la{" "}
                      <strong title="Dichiarazione dei redditi – Modello Redditi PF per autonomi e professionisti">
                        <Link to="/caf-dichiarazione-redditi" title="Dichiarazione dei redditi a Fondi – Modello Redditi PF" className="text-body-text hover:text-primary transition-colors">dichiarazione dei redditi</Link>
                      </strong>{" "}
                      con il Modello Redditi PF. Ideale per lavoratori autonomi, liberi professionisti e piccole imprese che necessitano di{" "}
                      <strong title="Consulenza fiscale personalizzata – Assistenza su misura per ogni esigenza tributaria">consulenza fiscale personalizzata</strong>.
                    </p>
                  </div>
                  <div className="seo-container-para">
                    <p>
                      Come{" "}
                      <strong title="CAF consulente del lavoro vicino a me – Assistenza fiscale e lavorativa professionale a Fondi">CAF consulente del lavoro vicino a me</strong>, forniamo supporto per{" "}
                      <strong title="Pianificazione fiscale – Strategie per ottimizzare il carico fiscale in modo legale">pianificazione fiscale</strong>, gestione di{" "}
                      <strong title="Accertamenti – Assistenza per rispondere ad accertamenti dell'Agenzia delle Entrate">accertamenti</strong> e{" "}
                      <strong title="Cartelle esattoriali – Assistenza per contestazione e rateizzazione cartelle">cartelle esattoriali</strong>, successioni e donazioni. Il nostro obiettivo è la{" "}
                      <strong title="Tutela fiscale del contribuente – Protezione dei diritti fiscali dei cittadini a Fondi e Latina">
                        <Link to="/caf-dichiarazione-redditi" title="Tutela Fiscale del Contribuente – CAF Patronato Fondi" className="text-body-text hover:text-primary transition-colors">tutela fiscale del contribuente</Link>
                      </strong>.
                    </p>
                  </div>
                  <div className="seo-container-para">
                    <p>
                      Siamo un{" "}
                      <strong title="CAF nazionale del lavoro – Centro assistenza fiscale accreditato a livello nazionale">CAF nazionale del lavoro</strong> accreditato, operativo a{" "}
                      <strong title="CAF Fondi – Centro assistenza fiscale nella città di Fondi (LT)">
                        <Link to="/contatto" title="CAF Fondi – Contattaci per consulenza fiscale" className="text-body-text hover:text-primary transition-colors">Fondi</Link>
                      </strong>,{" "}
                      <strong title="CAF Terracina – Servizi di consulenza fiscale a Terracina">Terracina</strong> e{" "}
                      <strong title="CAF Latina – Assistenza fiscale e tributaria nel capoluogo di provincia">Latina</strong>. Cercavi un{" "}
                      <strong title="CAF lavoro e fisco – Centro assistenza per questioni fiscali e lavorative">CAF lavoro e fisco</strong>?{" "}
                      <strong title="Contattaci per consulenza gratuita – Prenota appuntamento al CAF di Fondi">
                        <Link to="/contatto" title="Contattaci – Consulenza fiscale gratuita a Fondi, Terracina e Latina" className="text-body-text hover:text-primary transition-colors">Contattaci per una consulenza gratuita</Link>
                      </strong>.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Button asChild size="lg">
                    <Link to="/contatto" title="Richiedi consulenza fiscale – CAF Patronato Fondi">Richiedi Consulenza <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right">
              <div className="space-y-5">
                {[
                  { title: "Modello Redditi PF", desc: "Per lavoratori autonomi, professionisti e chi ha redditi da più fonti.", titleAttr: "Modello Redditi PF a Fondi – Dichiarazione per autonomi e professionisti" },
                  { title: "Pianificazione Fiscale", desc: "Strategie per ottimizzare il carico fiscale in modo legale e trasparente.", titleAttr: "Pianificazione Fiscale a Fondi – Ottimizzazione carico fiscale legale" },
                  { title: "Accertamenti e Cartelle", desc: "Assistenza per rispondere ad accertamenti dell'Agenzia delle Entrate.", titleAttr: "Accertamenti e Cartelle Esattoriali a Fondi – Assistenza Agenzia delle Entrate" },
                  { title: "Successioni e Donazioni", desc: "Pratiche di successione ereditaria e dichiarazioni di donazione.", titleAttr: "Successioni e Donazioni a Fondi – Pratiche ereditarie e dichiarazioni" },
                  { title: "Contratti e Locazioni", desc: "Registrazione contratti di locazione e cedolare secca.", titleAttr: "Contratti e Locazioni a Fondi – Registrazione contratti e cedolare secca" },
                ].map((s) => (
                  <div key={s.title} className="bg-card border border-border rounded-lg p-5 hover:shadow-md hover:border-primary/20 transition-all" title={s.titleAttr}>
                    <div className="flex items-start gap-3">
                      <Briefcase className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1" title={s.titleAttr}>{s.title}</h3>
                        <p className="text-sm text-body-text">{s.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="bg-surface" title="Servizi correlati CAF Patronato Fondi – 730, ISEE, Patronato INPS">
        <div className="container py-16 md:py-20">
          <Reveal>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-8 text-center" title="Servizi CAF correlati alla Dichiarazione Redditi – 730, ISEE, Patronato a Fondi">Servizi Correlati</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "CAF 730 Online", desc: "Dichiarazione 730 per dipendenti e pensionati con prenotazione online.", path: "/caf-730-online", titleAttr: "CAF 730 Online a Fondi – Prenotazione e compilazione dichiarazione redditi" },
              { title: "Calcolo ISEE", desc: "ISEE ordinario e corrente per bonus e prestazioni sociali.", path: "/caf-isee", titleAttr: "Calcolo ISEE a Fondi – Elaborazione DSU per bonus e agevolazioni" },
              { title: "Patronato INPS", desc: "Pensioni, NASpI, invalidità e pratiche previdenziali.", path: "/patronato-inps", titleAttr: "Patronato INPS a Fondi – Pensioni, disoccupazione e pratiche previdenziali" },
            ].map((s) => (
              <Reveal key={s.path}>
                <Link to={s.path} title={s.titleAttr} className="block bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-primary/20 transition-all">
                  <h3 className="font-semibold text-foreground mb-2" title={s.titleAttr}>{s.title}</h3>
                  <p className="text-sm text-body-text mb-3">{s.desc}</p>
                  <span className="text-sm font-medium text-primary inline-flex items-center gap-1">Scopri di più <ArrowRight className="h-3.5 w-3.5" /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand title="Proteggi i Tuoi Diritti Fiscali" subtitle="Consulenza fiscale personalizzata. CAF tutela fiscale del contribuente a Fondi." />
      <Footer />
    </div>
  );
};

export default CafDichiarazioneRedditi;
