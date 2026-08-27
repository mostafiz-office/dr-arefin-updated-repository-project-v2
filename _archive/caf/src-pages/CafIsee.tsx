import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTABand from "@/components/CTABand";
import PageHero from "@/components/PageHero";
import heroCafIsee from "@/assets/hero-caf-isee.jpg";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/hooks/useScrollReveal";
import { Calculator, CheckCircle, ArrowRight } from "lucide-react";

const iseeTypes = [
  { title: "ISEE Ordinario", desc: "Per accedere a bonus sociali, agevolazioni tariffarie e prestazioni assistenziali." },
  { title: "ISEE Corrente", desc: "In caso di variazione significativa del reddito rispetto all'anno precedente." },
  { title: "ISEE Universitario", desc: "Per borse di studio, riduzione tasse universitarie e mense." },
  { title: "ISEE Sociosanitario", desc: "Per prestazioni di assistenza sociosanitaria, RSA e disabilità." },
  { title: "ISEE Minorenni", desc: "Per prestazioni destinate ai figli minorenni, come asili nido e bonus." },
];

const jsonLdIsee = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "CAF ISEE a Fondi",
  "description": "Calcolo ISEE ordinario, corrente e universitario con prenotazione online. Elaborazione DSU per bonus e agevolazioni a Fondi, Terracina e Latina.",
  "provider": { "@type": "LocalBusiness", "name": "CAF Patronato Fondi", "areaServed": ["Fondi", "Terracina", "Latina"] },
  "serviceType": "Calcolo ISEE",
  "areaServed": ["Fondi", "Terracina", "Latina"],
};

const CafIsee = () => {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdIsee) }} />
      <Header />

      <PageHero
        title="CAF ISEE a Fondi – Prenotazione e Calcolo Online"
        subtitle="Calcolo ISEE ordinario, corrente e universitario. Prenotazione ISEE online e assistenza completa per bonus, agevolazioni e prestazioni sociali."
        titleAttr="CAF ISEE a Fondi – Calcolo ISEE online, prenotazione rapida per bonus e agevolazioni a Fondi, Terracina e Latina"
        sectionTitle="CAF ISEE Fondi – Calcolo ISEE Ordinario, Corrente, Universitario – Prenotazione Online"
        variant="image-overlay"
        backgroundImage={heroCafIsee}
      />

      <section className="bg-background seo-page-parent-block" title="CAF per ISEE a Fondi – Calcolo rapido e prenotazione online per bonus e agevolazioni sociali">
        <div className="container py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <Reveal direction="left">
              <div>
                <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">CALCOLO ISEE</p>
                <h2
                  className="text-2xl md:text-3xl font-bold text-foreground mb-6"
                  title="CAF per ISEE a Fondi – Calcolo rapido ISEE e prenotazione online per bonus e agevolazioni"
                >
                  <strong title="CAF per ISEE – Centro assistenza fiscale per l'elaborazione della DSU a Fondi">
                    <Link to="/caf-isee" title="CAF ISEE a Fondi – Calcolo ISEE e prenotazione online" className="text-foreground hover:text-primary transition-colors">CAF per ISEE</Link>
                  </strong>: Calcolo Rapido e Prenotazione Online
                </h2>
                <div className="space-y-4 text-body-text leading-relaxed paragraph-parent-block seo-parent-block seo-page-block">
                  <div className="seo-container-para">
                    <p>
                      Il{" "}
                      <strong title="CAF ISEE – Servizio di elaborazione Dichiarazione Sostitutiva Unica per bonus e agevolazioni">
                        <Link to="/caf-isee" title="CAF ISEE a Fondi – Elaborazione DSU per bonus sociali" className="text-body-text hover:text-primary transition-colors">CAF ISEE</Link>
                      </strong>{" "}
                      è il servizio essenziale per ottenere la Dichiarazione Sostitutiva Unica (DSU). Presso il nostro{" "}
                      <strong title="CAF a Fondi – Centro assistenza fiscale accreditato a Fondi (LT)">
                        <Link to="/contatto" title="CAF Fondi – Prenota appuntamento per calcolo ISEE" className="text-body-text hover:text-primary transition-colors">CAF a Fondi</Link>
                      </strong>, elaboriamo l'{" "}
                      <strong title="ISEE – Indicatore della Situazione Economica Equivalente per accedere a prestazioni agevolate">ISEE</strong>{" "}
                      in tempi rapidi con la possibilità di{" "}
                      <strong title="Prenotazione ISEE online – Prenota il calcolo ISEE senza code a Fondi">
                        <Link to="/contatto" title="Prenotazione ISEE Online – Prenota il tuo appuntamento CAF" className="text-body-text hover:text-primary transition-colors">prenotazione ISEE online</Link>
                      </strong>.
                    </p>
                  </div>
                  <div className="seo-container-para">
                    <p>
                      Che tu abbia bisogno dell'{" "}
                      <strong title="ISEE per bonus – Calcolo ISEE necessario per accedere a bonus sociali e agevolazioni">
                        <Link to="/bonus-sociali" title="Bonus Sociali – Accedi a bonus con ISEE valido" className="text-body-text hover:text-primary transition-colors">ISEE per bonus</Link>
                      </strong>,{" "}
                      <strong title="Agevolazioni fiscali – Benefici fiscali accessibili tramite ISEE valido">
                        <Link to="/caf-isee" title="Agevolazioni fiscali con ISEE a Fondi" className="text-body-text hover:text-primary transition-colors">agevolazioni fiscali</Link>
                      </strong>,{" "}
                      <strong title="Assegno unico – Prestazione per figli a carico che richiede ISEE aggiornato">
                        <Link to="/assegno-unico" title="Assegno Unico per figli – Domanda con ISEE a Fondi" className="text-body-text hover:text-primary transition-colors">assegno unico</Link>
                      </strong> o{" "}
                      <strong title="Borse di studio universitarie – ISEE universitario per riduzione tasse e accesso a borse">
                        <Link to="/caf-isee" title="ISEE Universitario per borse di studio a Fondi" className="text-body-text hover:text-primary transition-colors">borse di studio universitarie</Link>
                      </strong>, il nostro team ti guida nella raccolta documenti e nella compilazione della DSU.
                    </p>
                  </div>
                  <div className="seo-container-para">
                    <p>
                      Cerchi un{" "}
                      <strong title="CAF per ISEE vicino a me – Trova il centro assistenza fiscale più vicino per il calcolo ISEE">
                        <Link to="/contatto" title="CAF per ISEE vicino a me – Trova la sede più vicina" className="text-body-text hover:text-primary transition-colors">CAF per ISEE vicino a me</Link>
                      </strong>? Siamo a{" "}
                      <strong title="CAF Fondi – Centro assistenza fiscale a Fondi (LT)">
                        <Link to="/contatto/fondi" title="CAF Fondi – Sede Fondi" className="text-body-text hover:text-primary transition-colors">Fondi</Link>
                      </strong>,{" "}
                      <strong title="CAF Terracina – Servizi ISEE a Terracina">
                        <Link to="/contatto/terracina" title="CAF Terracina – Sede Terracina" className="text-body-text hover:text-primary transition-colors">Terracina</Link>
                      </strong> e{" "}
                      <strong title="CAF Cisterna di Latina – Calcolo ISEE nella provincia di Latina">
                        <Link to="/contatto/cisterna-di-latina" title="CAF Cisterna di Latina – Sede Cisterna di Latina" className="text-body-text hover:text-primary transition-colors">Cisterna di Latina</Link>
                      </strong>.{" "}
                      <strong title="Contattaci per appuntamento – Prenota il calcolo ISEE a Fondi">
                        <Link to="/contatto" title="Contattaci – Prenota appuntamento ISEE a Fondi, Terracina e Latina" className="text-body-text hover:text-primary transition-colors">Contattaci per un appuntamento</Link>
                      </strong>{" "}
                      e ricevi il tuo ISEE in 2-3 giorni lavorativi.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Button asChild size="lg">
                    <Link to="/contatto" title="Prenota calcolo ISEE – CAF Patronato Fondi">Prenota Calcolo ISEE <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right">
              <div className="space-y-4">
                {iseeTypes.map((type) => (
                  <div key={type.title} className="bg-card border border-border rounded-lg p-5 hover:shadow-md hover:border-primary/20 transition-all" title={`${type.title} – ${type.desc}`}>
                    <div className="flex items-start gap-3">
                      <Calculator className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1" title={`${type.title} a Fondi – ${type.desc}`}>{type.title}</h3>
                        <p className="text-sm text-body-text">{type.desc}</p>
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
      <section className="bg-surface" title="Servizi correlati CAF Patronato Fondi – 730, Patronato INPS, Consulenza Fiscale">
        <div className="container py-16 md:py-20">
          <Reveal>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-8 text-center" title="Servizi CAF correlati all'ISEE – 730 Online, Patronato INPS e Dichiarazione Redditi">Servizi Correlati</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "CAF 730 Online", desc: "Dichiarazione dei redditi con prenotazione online e invio telematico.", path: "/caf-730-online", titleAttr: "CAF 730 Online a Fondi – Prenotazione e compilazione dichiarazione redditi" },
              { title: "Patronato INPS", desc: "Pensioni, disoccupazione, invalidità e pratiche previdenziali.", path: "/patronato-inps", titleAttr: "Patronato INPS a Fondi – Pensioni, NASpI e pratiche previdenziali" },
              { title: "Consulenza Fiscale", desc: "Assistenza personalizzata per dichiarazioni e cartelle esattoriali.", path: "/caf-dichiarazione-redditi", titleAttr: "CAF Dichiarazione Redditi a Fondi – Consulenza fiscale e tributaria" },
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

      <CTABand title="Calcola il Tuo ISEE Oggi" subtitle="Prenotazione online rapida. Ricevi il tuo ISEE in 2-3 giorni lavorativi." />
      <Footer />
    </div>
  );
};

export default CafIsee;
