import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTABand from "@/components/CTABand";
import PageHero from "@/components/PageHero";
import heroChiSiamo from "@/assets/hero-chi-siamo.jpg";
import { Reveal } from "@/hooks/useScrollReveal";
import { Target, Heart, Handshake } from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  { icon: Target, title: "Competenza", desc: "Professionisti aggiornati e qualificati, pronti a offrirti il miglior supporto in ambito fiscale e previdenziale.", titleAttr: "Competenza CAF Fondi – Professionisti qualificati per assistenza fiscale" },
  { icon: Heart, title: "Dedizione", desc: "Ogni cliente è unico. Ci dedichiamo con passione a trovare la soluzione più adatta alle tue esigenze personali.", titleAttr: "Dedizione CAF Fondi – Assistenza personalizzata per ogni cliente" },
  { icon: Handshake, title: "Trasparenza", desc: "Operiamo con chiarezza e onestà, informandoti con cura e precisione su ogni fase del processo burocratico.", titleAttr: "Trasparenza CAF Fondi – Servizio chiaro e onesto" },
];

const ChiSiamo = () => {
  return (
    <div className="min-h-screen">
      <Header />

      <PageHero
        title="Chi Siamo – CAF Patronato Fondi, Tutela Fiscale dal 2005"
        subtitle="Da oltre 20 anni il CAF di fiducia a Fondi e Latina. Scopri la nostra storia, i valori e perché migliaia di clienti ci scelgono per 730, ISEE e pratiche INPS."
        titleAttr="Chi Siamo – CAF Patronato Fondi, assistenza fiscale e previdenziale dal 2005 a Fondi, Terracina e Latina"
        sectionTitle="Chi Siamo CAF Patronato Fondi – Storia, Valori e Missione del centro assistenza fiscale a Fondi"
        variant="image-overlay"
        backgroundImage={heroChiSiamo}
      />

      {/* Mission / Story */}
      <section className="bg-background seo-page-parent-block" title="CAF Patronato Fondi – Da oltre 20 anni assistenza fiscale e previdenziale a Fondi e Latina">
        <div className="container py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal direction="left">
              <div>
                <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3 text-center lg:text-left">LA NOSTRA STORIA</p>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center lg:text-left" title="CAF Patronato Fondi – Da oltre 20 anni al fianco dei cittadini per assistenza fiscale e previdenziale">
                  <strong title="CAF Patronato Fondi – Centro assistenza fiscale accreditato dal 2005 a Fondi e Latina">
                    <Link to="/" title="CAF Patronato Fondi – Assistenza fiscale da oltre 20 anni" className="text-foreground hover:text-primary transition-colors">Da Oltre 20 Anni</Link>
                  </strong> al Tuo Fianco
                </h2>
                <div className="space-y-4 text-body-text leading-relaxed paragraph-parent-block seo-parent-block seo-page-block">
                  <div className="seo-container-para">
                    <p>Da oltre 20 anni,{" "}
                      <strong title="CAF Patronato Fondi – Centro assistenza fiscale e previdenziale accreditato a Fondi (LT)">
                        <Link to="/" title="CAF Patronato Fondi – Home page del centro assistenza fiscale" className="text-body-text hover:text-primary transition-colors">CAF Patronato Fondi</Link>
                      </strong>{" "}
                      è il punto di riferimento per l'assistenza fiscale e previdenziale nella città di Fondi e nella provincia di Latina.
                    </p>
                  </div>
                  <div className="seo-container-para">
                    <p>Fondato con l'obiettivo di rendere accessibili e comprensibili i servizi fiscali e previdenziali, il nostro centro assistenza si è affermato grazie alla professionalità, alla competenza e alla vicinanza ai cittadini.</p>
                  </div>
                  <div className="seo-container-para">
                    <p>Il nostro team di professionisti qualificati è costantemente aggiornato sulle ultime novità normative per garantirti un servizio sempre all'avanguardia in{" "}
                      <strong title="CAF 730 – Dichiarazione dei redditi a Fondi">
                        <Link to="/caf-730-online" title="CAF 730 Online a Fondi" className="text-body-text hover:text-primary transition-colors">dichiarazioni fiscali</Link>
                      </strong>,{" "}
                      <strong title="Calcolo ISEE – Elaborazione DSU a Fondi">
                        <Link to="/caf-isee" title="Calcolo ISEE a Fondi" className="text-body-text hover:text-primary transition-colors">calcolo ISEE</Link>
                      </strong> e{" "}
                      <strong title="Patronato INPS – Pensioni e pratiche previdenziali">
                        <Link to="/patronato-inps" title="Patronato INPS a Fondi" className="text-body-text hover:text-primary transition-colors">pratiche INPS</Link>
                      </strong>.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal direction="right">
              <div className="bg-secondary rounded-lg p-6 md:p-10 lg:p-14 text-center lg:text-left">
                <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">LA NOSTRA MISSIONE</p>
                <h3 className="text-xl font-bold text-foreground mb-4" title="Missione CAF Patronato Fondi – Semplificare la burocrazia fiscale e previdenziale">Semplificare la Burocrazia</h3>
                <p className="text-body-text leading-relaxed mb-8">
                  Rendere semplice e accessibile l'assistenza fiscale e previdenziale per ogni cittadino, offrendo un servizio professionale, trasparente e su misura.
                </p>
                <div className="flex gap-10">
                  <div>
                    <div className="text-3xl font-bold text-primary transition-all duration-300 hover:scale-105 hover:[text-shadow:1px_0.7px_0_rgba(0,0,0,0.85)]">20+</div>
                    <div className="text-sm text-muted-foreground whitespace-nowrap">Anni di attività</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary transition-all duration-300 hover:scale-105 hover:[text-shadow:1px_0.7px_0_rgba(0,0,0,0.85)]">5.000+</div>
                    <div className="text-sm text-muted-foreground whitespace-nowrap">Clienti soddisfatti</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface" title="Valori CAF Patronato Fondi – Competenza, dedizione e trasparenza">
        <div className="container py-20 md:py-28">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">I NOSTRI VALORI</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4" title="I principi che guidano CAF Patronato Fondi – Competenza, dedizione e trasparenza">
                <strong title="Valori CAF Patronato Fondi – Professionalità e trasparenza nell'assistenza fiscale">
                  <Link to="/chi-siamo" title="Chi Siamo – I valori di CAF Patronato Fondi" className="text-foreground hover:text-primary transition-colors">I Principi che Ci Guidano</Link>
                </strong>
              </h2>
              <p className="text-body-text max-w-2xl mx-auto">I principi che guidano ogni nostra azione e decisione.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 120}>
                <div className="bg-card border border-border rounded-lg p-8 text-center hover:shadow-lg hover:bg-accent hover:border-primary/20 hover:-translate-y-1 transition-all duration-300" title={v.titleAttr}>
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <v.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3" title={v.titleAttr}>{v.title}</h3>
                  <p className="text-sm text-body-text leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Vuoi saperne di più?"
        subtitle="Contattaci per scoprire come possiamo aiutarti con i tuoi adempimenti fiscali e previdenziali."
      />

      <Footer />
    </div>
  );
};

export default ChiSiamo;
