import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTABand from "@/components/CTABand";
import PageHero from "@/components/PageHero";
import heroCaf730 from "@/assets/hero-caf-730.jpg";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/hooks/useScrollReveal";
import { FileText, CheckCircle, ArrowRight, Clock, Shield } from "lucide-react";

const documents = [
  "CU (Certificazione Unica) del datore di lavoro o ente pensionistico",
  "Spese sanitarie, scontrini farmacia e fatture mediche",
  "Interessi passivi del mutuo e relativi documenti",
  "Ricevute di affitto e contratto di locazione",
  "Spese scolastiche e universitarie",
  "Spese per ristrutturazioni e bonus edilizi",
  "Assicurazioni sulla vita e infortuni",
  "Documenti catastali degli immobili posseduti",
  "Documento di identità e codice fiscale",
];

const jsonLd730 = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "CAF 730 Online a Fondi",
  "description": "Compilazione e invio telematico del Modello 730 con prenotazione online. CAF 730 appuntamento a Fondi, Terracina e Latina.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "CAF Patronato Fondi",
    "areaServed": ["Fondi", "Terracina", "Latina"],
  },
  "serviceType": "CAF 730 Dichiarazione dei Redditi",
  "areaServed": ["Fondi", "Terracina", "Latina"],
};

const Caf730Online = () => {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd730) }} />
      <Header />

      <PageHero
        title="CAF 730 Online a Fondi e Latina – Prenotazione e Assistenza"
        subtitle="Compila il tuo Modello 730 con l'assistenza dei nostri esperti. Prenotazione online, ritiro a domicilio e invio telematico. CAF 730 appuntamento disponibile anche oggi."
        titleAttr="CAF 730 Online – Prenotazione e compilazione dichiarazione redditi a Fondi, Terracina e Latina. CAF 730 appuntamento e invio telematico"
        sectionTitle="CAF 730 Online a Fondi – Dichiarazione Redditi, Prenotazione 730, CAF Aperto Oggi"
        variant="image-overlay"
        backgroundImage={heroCaf730}
      />

      {/* Main content */}
      <section className="bg-background seo-page-parent-block" title="CAF 730 Fondi – Dichiarazione dei redditi semplice e veloce con prenotazione online">
        <div className="container py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <Reveal direction="left">
              <div>
                <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">DICHIARAZIONE DEI REDDITI</p>
                <h2
                  className="text-2xl md:text-3xl font-bold text-foreground mb-6"
                  title="CAF 730 a Fondi – Dichiarazione dei Redditi per dipendenti e pensionati con prenotazione online"
                >
                  <strong title="CAF 730 – Assistenza fiscale per dichiarazione dei redditi a Fondi e Latina">
                    <Link to="/caf-730-online" title="CAF 730 Online – Dichiarazione dei redditi semplice e veloce" className="text-foreground hover:text-primary transition-colors">
                      CAF 730
                    </Link>
                  </strong>: Dichiarazione dei Redditi Semplice e Veloce
                </h2>
                <div className="space-y-4 text-body-text leading-relaxed paragraph-parent-block seo-parent-block seo-page-block">
                  <div className="seo-container-para">
                    <p>
                      Il{" "}
                      <strong title="CAF 730 – Centro Assistenza Fiscale per la dichiarazione dei redditi di lavoratori dipendenti e pensionati">
                        <Link to="/caf-730-online" title="CAF 730 a Fondi – Dichiarazione dei redditi online" className="text-body-text hover:text-primary transition-colors">CAF 730</Link>
                      </strong>{" "}
                      è il servizio di assistenza fiscale per lavoratori dipendenti e pensionati che devono presentare la{" "}
                      <strong title="Dichiarazione dei redditi – Modello 730 per dipendenti e pensionati">dichiarazione dei redditi</strong>. Presso il nostro{" "}
                      <strong title="CAF a Fondi – Centro assistenza fiscale accreditato nella città di Fondi (LT)">
                        <Link to="/contatto" title="CAF Fondi – Contattaci per prenotare il tuo 730" className="text-body-text hover:text-primary transition-colors">CAF a Fondi</Link>
                      </strong>, offriamo compilazione professionale del Modello 730 con possibilità di{" "}
                      <strong title="Prenotazione online CAF 730 – Prenota appuntamento senza code">
                        <Link to="/contatto" title="Prenotazione online 730 – Prenota il tuo appuntamento CAF a Fondi" className="text-body-text hover:text-primary transition-colors">prenotazione online</Link>
                      </strong>.
                    </p>
                  </div>
                  <div className="seo-container-para">
                    <p>
                      Che tu stia cercando un{" "}
                      <strong title="CAF 730 vicino a me – Trova il centro assistenza fiscale più vicino a te">CAF 730 vicino a me</strong>, un{" "}
                      <strong title="CAF 730 a Milano – Servizio dichiarazione redditi disponibile online da tutta Italia">CAF 730 a Milano</strong>,{" "}
                      <strong title="CAF 730 Roma – Assistenza fiscale per la dichiarazione dei redditi">Roma</strong>,{" "}
                      <strong title="CAF 730 Torino – Compilazione 730 online e invio telematico">Torino</strong> o{" "}
                      <strong title="CAF 730 Latina – Dichiarazione redditi nella provincia di Latina">
                        <Link to="/contatto" title="CAF 730 Latina – Prenota appuntamento nella provincia" className="text-body-text hover:text-primary transition-colors">Latina</Link>
                      </strong>, il nostro servizio di{" "}
                      <strong title="CAF 730 Online – Compilazione dichiarazione redditi da casa senza code">
                        <Link to="/caf-730-online" title="CAF 730 Online – Compila la dichiarazione comodamente da casa" className="text-body-text hover:text-primary transition-colors">CAF 730 online</Link>
                      </strong>{" "}
                      ti permette di completare la dichiarazione comodamente da casa.
                    </p>
                  </div>
                  <div className="seo-container-para">
                    <p>
                      <strong title="CAF aperto oggi – Verifica gli orari di apertura del nostro centro fiscale a Fondi">CAF aperto oggi?</strong>{" "}
                      <strong title="Contattaci per verificare gli orari del CAF e prenotare appuntamento">
                        <Link to="/contatto" title="Contattaci – Verifica orari CAF e prenota appuntamento 730 a Fondi" className="text-body-text hover:text-primary transition-colors">Contattaci</Link>
                      </strong>{" "}
                      per verificare gli{" "}
                      <strong title="Orari CAF – Orari di apertura del centro assistenza fiscale a Fondi">orari CAF</strong> e fissare un appuntamento. Offriamo anche assistenza per il{" "}
                      <strong title="730 precompilato – Assistenza per la dichiarazione precompilata dall'Agenzia delle Entrate">730 precompilato</strong> e dichiarazioni correttive.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Button asChild size="lg">
                    <Link to="/contatto" title="Prenota appuntamento 730 – CAF Patronato Fondi">
                      Prenota Appuntamento 730 <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/servizi" title="Tutti i servizi CAF e Patronato a Fondi e Latina">Tutti i Servizi</Link>
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right">
              <div>
                <div className="bg-secondary rounded-lg p-8 mb-8">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2" title="Perché scegliere il nostro CAF per il 730 a Fondi – Vantaggi e servizi">
                    <Clock className="h-5 w-5 text-primary" />
                    Perché Scegliere il Nostro CAF per il 730
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Prenotazione 730 online – niente code",
                      "Compilazione e invio telematico in giornata",
                      "Verifica detrazioni e deduzioni fiscali",
                      "Assistenza per rimborsi e conguagli",
                      "CAF 730 aperto anche il sabato mattina",
                      "Consulenza gratuita pre-compilazione",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-body-text" title={item}>
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-lg p-8">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2" title="730 Cosa Portare – Elenco documenti necessari per la dichiarazione dei redditi">
                    <FileText className="h-5 w-5 text-primary" />
                    730 Cosa Portare – Documenti Necessari
                  </h3>
                  <ul className="space-y-2">
                    {documents.map((doc) => (
                      <li key={doc} className="flex items-start gap-2 text-sm text-body-text" title={doc}>
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Internal linking section */}
      <section className="bg-surface" title="Servizi correlati CAF Patronato Fondi – ISEE, Patronato INPS, Dichiarazione Redditi">
        <div className="container py-16 md:py-20">
          <Reveal>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-8 text-center" title="Servizi CAF correlati al 730 – ISEE, Patronato INPS e Consulenza Fiscale a Fondi">Servizi Correlati</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Calcolo ISEE", desc: "Elaborazione ISEE ordinario, corrente e universitario per bonus e agevolazioni.", path: "/caf-isee", titleAttr: "Calcolo ISEE a Fondi – Elaborazione DSU per bonus e agevolazioni sociali" },
              { title: "Patronato INPS", desc: "Pensioni, NASpI, invalidità civile e tutte le pratiche previdenziali.", path: "/patronato-inps", titleAttr: "Patronato INPS a Fondi – Pensioni, disoccupazione e pratiche previdenziali" },
              { title: "Dichiarazione Redditi", desc: "Modello Redditi PF per autonomi e professionisti.", path: "/caf-dichiarazione-redditi", titleAttr: "CAF Dichiarazione Redditi a Fondi – Modello Redditi PF e consulenza fiscale" },
            ].map((s) => (
              <Reveal key={s.path}>
                <Link to={s.path} title={s.titleAttr} className="block bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-primary/20 transition-all">
                  <h3 className="font-semibold text-foreground mb-2" title={s.titleAttr}>{s.title}</h3>
                  <p className="text-sm text-body-text mb-3">{s.desc}</p>
                  <span className="text-sm font-medium text-primary inline-flex items-center gap-1">
                    Scopri di più <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Prenota il Tuo 730 Online Oggi"
        subtitle="Niente code, niente stress. Compila il modello 730 con i nostri esperti CAF a Fondi."
      />

      <Footer />
    </div>
  );
};

export default Caf730Online;
