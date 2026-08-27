import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTABand from "@/components/CTABand";
import PageHero from "@/components/PageHero";
import heroPatronato from "@/assets/hero-patronato-inps.jpg";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/hooks/useScrollReveal";
import { Shield, CheckCircle, ArrowRight } from "lucide-react";

const patronatoServices = [
  { title: "Pensione di Vecchiaia e Anticipata", desc: "Assistenza completa per domanda di pensione INPS, verifica contributi e calcolo importo.", titleAttr: "Pensione INPS a Fondi – Domanda di pensione di vecchiaia e anticipata" },
  { title: "NASpI – Disoccupazione", desc: "Domanda NASpI per disoccupazione, calcolo durata e importo dell'indennità.", titleAttr: "NASpI Disoccupazione a Fondi – Domanda indennità di disoccupazione INPS" },
  { title: "Invalidità Civile", desc: "Pratiche di invalidità civile, accompagnamento e legge 104.", titleAttr: "Invalidità Civile a Fondi – Pratiche di invalidità, accompagnamento e Legge 104" },
  { title: "Maternità e Congedi", desc: "Domanda maternità obbligatoria, facoltativa e congedi parentali presso INPS.", titleAttr: "Maternità INPS a Fondi – Congedi parentali e maternità obbligatoria" },
  { title: "Assegno Unico per Figli", desc: "Domanda e rinnovo assegno unico universale per figli a carico.", titleAttr: "Assegno Unico a Fondi – Domanda e rinnovo assegno universale per figli" },
  { title: "Permesso di Soggiorno", desc: "Assistenza per pratiche di immigrazione, rinnovo permesso di soggiorno e ricongiungimento familiare.", titleAttr: "Permesso di Soggiorno a Fondi – CAF immigrazione e ricongiungimento familiare" },
  { title: "Dimissioni Volontarie", desc: "Invio telematico delle dimissioni volontarie tramite il portale INPS.", titleAttr: "Dimissioni Volontarie a Fondi – Invio telematico tramite portale INPS" },
  { title: "Cambio Residenza", desc: "Assistenza per pratiche di cambio residenza e comunicazioni agli enti.", titleAttr: "Cambio Residenza a Fondi – Assistenza pratiche e comunicazioni agli enti" },
];

const jsonLdPatronato = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Patronato INPS a Fondi",
  "description": "Servizi di patronato: pensioni, NASpI, invalidità civile, maternità, permesso di soggiorno e pratiche INPS a Fondi, Terracina e Latina.",
  "provider": { "@type": "LocalBusiness", "name": "CAF Patronato Fondi", "areaServed": ["Fondi", "Terracina", "Latina"] },
  "serviceType": "Patronato INPS",
  "areaServed": ["Fondi", "Terracina", "Latina"],
};

const PatronatoInps = () => {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPatronato) }} />
      <Header />

      <PageHero
        title="Patronato CAF Fondi – Pensioni, NASpI e Pratiche INPS"
        subtitle="Servizi di patronato a Fondi, Terracina e Latina. Pensioni, disoccupazione, invalidità civile, maternità, permesso di soggiorno e tutte le pratiche INPS."
        titleAttr="Patronato CAF Fondi – Pensioni INPS, NASpI disoccupazione, invalidità civile e pratiche previdenziali a Fondi, Terracina e Latina"
        sectionTitle="Patronato INPS Fondi – Pensioni, Disoccupazione, Maternità, Permesso di Soggiorno, Dimissioni"
        variant="image-overlay"
        backgroundImage={heroPatronato}
      />

      <section className="bg-background seo-page-parent-block" title="Patronato CAF Fondi – Assistenza previdenziale completa per pensioni, NASpI, invalidità e immigrazione">
        <div className="container py-20 md:py-28">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">SERVIZI PATRONATO</p>
              <h2
                className="text-2xl md:text-3xl font-bold text-foreground mb-6"
                title="CAF Patronato Fondi – Assistenza previdenziale completa per pensioni, disoccupazione e pratiche INPS"
              >
                <strong title="CAF Patronato Fondi – Centro di assistenza previdenziale accreditato a Fondi (LT)">
                  <Link to="/patronato-inps" title="CAF Patronato Fondi – Tutti i servizi di patronato INPS" className="text-foreground hover:text-primary transition-colors">CAF Patronato Fondi</Link>
                </strong>: Assistenza Previdenziale Completa
              </h2>
              <div className="space-y-4 text-body-text leading-relaxed paragraph-parent-block seo-parent-block seo-page-block">
                <div className="seo-container-para">
                  <p>
                    Il nostro{" "}
                    <strong title="Patronato CAF a Fondi – Centro di assistenza per pratiche INPS e previdenziali">
                      <Link to="/patronato-inps" title="Patronato CAF a Fondi – Pensioni, NASpI e pratiche INPS" className="text-body-text hover:text-primary transition-colors">patronato CAF a Fondi</Link>
                    </strong>{" "}
                    offre assistenza completa per tutte le pratiche{" "}
                    <strong title="INPS – Istituto Nazionale della Previdenza Sociale">
                      <Link to="/patronato-inps" title="INPS – Pratiche previdenziali a Fondi" className="text-body-text hover:text-primary transition-colors">INPS</Link>
                    </strong> e previdenziali. Che tu stia cercando un{" "}
                    <strong title="CAF patronato vicino a me – Trova il patronato più vicino a te a Fondi e Latina">
                      <Link to="/contatto" title="CAF patronato vicino a me – Trova la sede più vicina" className="text-body-text hover:text-primary transition-colors">CAF patronato vicino a me</Link>
                    </strong>, un{" "}
                    <strong title="CAF lavoro vicino a me – Centro assistenza per pratiche lavorative e previdenziali">
                      <Link to="/contatto" title="CAF lavoro vicino a me – Assistenza lavorativa a Fondi" className="text-body-text hover:text-primary transition-colors">CAF lavoro vicino a me</Link>
                    </strong> o assistenza per{" "}
                    <strong title="Disoccupazione – Domanda NASpI per indennità di disoccupazione INPS">
                      <Link to="/naspi-disoccupazione" title="NASpI Disoccupazione – Domanda indennità a Fondi" className="text-body-text hover:text-primary transition-colors">disoccupazione</Link>
                    </strong>,{" "}
                    <strong title="Dimissioni volontarie – Invio telematico dimissioni tramite portale INPS">
                      <Link to="/dimissioni-volontarie" title="Dimissioni Volontarie – Invio telematico a Fondi" className="text-body-text hover:text-primary transition-colors">dimissioni</Link>
                    </strong> o{" "}
                    <strong title="Maternità – Domanda di maternità obbligatoria e congedi parentali INPS">
                      <Link to="/maternita-congedi" title="Maternità e Congedi – Domanda maternità INPS a Fondi" className="text-body-text hover:text-primary transition-colors">maternità</Link>
                    </strong>, siamo il punto di riferimento nella provincia di Latina.
                  </p>
                </div>
                <div className="seo-container-para">
                  <p>
                    Offriamo anche assistenza specifica per{" "}
                    <strong title="CAF stranieri – Assistenza fiscale e previdenziale per cittadini stranieri a Fondi">
                      <Link to="/patronato-inps" title="CAF stranieri a Fondi – Assistenza per cittadini stranieri" className="text-body-text hover:text-primary transition-colors">stranieri</Link>
                    </strong>:{" "}
                    <strong title="Permesso di soggiorno – Assistenza per rinnovo e primo rilascio permesso di soggiorno">
                      <Link to="/permesso-soggiorno" title="Permesso di Soggiorno a Fondi – Rinnovo e primo rilascio" className="text-body-text hover:text-primary transition-colors">permesso di soggiorno</Link>
                    </strong>, pratiche di{" "}
                    <strong title="Immigrazione – CAF immigrazione vicino a me per pratiche di soggiorno e ricongiungimento">
                      <Link to="/permesso-soggiorno" title="CAF Immigrazione a Fondi – Pratiche di soggiorno" className="text-body-text hover:text-primary transition-colors">immigrazione</Link>
                    </strong>,{" "}
                    <strong title="SPID – Attivazione identità digitale SPID presso il nostro CAF a Fondi">
                      <Link to="/spid-identita-digitale" title="SPID a Fondi – Attivazione identità digitale" className="text-body-text hover:text-primary transition-colors">SPID</Link>
                    </strong> e ricongiungimento familiare. Cerchi un{" "}
                    <strong title="CAF immigrazione vicino a me – Centro assistenza per stranieri a Fondi e Latina">
                      <Link to="/contatto" title="CAF immigrazione vicino a me – Trova la sede più vicina" className="text-body-text hover:text-primary transition-colors">CAF immigrazione vicino a me</Link>
                    </strong> o un{" "}
                    <strong title="CAF stranieri vicino a me – Assistenza fiscale e previdenziale per cittadini stranieri">
                      <Link to="/contatto" title="CAF stranieri vicino a me – Trova la sede più vicina" className="text-body-text hover:text-primary transition-colors">CAF stranieri vicino a me</Link>
                    </strong>?{" "}
                    <strong title="Contattaci per appuntamento – Prenota il tuo appuntamento al patronato di Fondi">
                      <Link to="/contatto" title="Contattaci – Prenota appuntamento patronato a Fondi, Terracina e Latina" className="text-body-text hover:text-primary transition-colors">Contattaci per un appuntamento</Link>
                    </strong>.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {patronatoServices.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 h-full" title={s.titleAttr}>
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1" title={s.titleAttr}>{s.title}</h3>
                      <p className="text-sm text-body-text">{s.desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400}>
            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link to="/contatto" title="Prenota appuntamento patronato – CAF Patronato Fondi">Prenota Appuntamento Patronato <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Internal links */}
      <section className="bg-surface" title="Servizi correlati CAF Patronato Fondi – 730, ISEE, Dichiarazione Redditi">
        <div className="container py-16 md:py-20">
          <Reveal>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-8 text-center" title="Servizi CAF correlati al Patronato – 730, ISEE e Consulenza Fiscale a Fondi">Servizi Correlati</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "CAF 730 Online", desc: "Dichiarazione dei redditi, prenotazione online e invio telematico.", path: "/caf-730-online", titleAttr: "CAF 730 Online a Fondi – Prenotazione e invio dichiarazione redditi" },
              { title: "Calcolo ISEE", desc: "ISEE ordinario, corrente e universitario per bonus e agevolazioni.", path: "/caf-isee", titleAttr: "Calcolo ISEE a Fondi – Elaborazione DSU per bonus e agevolazioni" },
              { title: "Dichiarazione Redditi", desc: "Modello Redditi PF per autonomi, professionisti e imprese.", path: "/caf-dichiarazione-redditi", titleAttr: "CAF Dichiarazione Redditi a Fondi – Consulenza tributaria e Modello Redditi PF" },
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

      <CTABand title="Hai Bisogno del Patronato?" subtitle="Pensioni, NASpI, invalidità e pratiche INPS. Prenota il tuo appuntamento oggi." />
      <Footer />
    </div>
  );
};

export default PatronatoInps;
