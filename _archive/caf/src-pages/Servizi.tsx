import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTABand from "@/components/CTABand";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/hooks/useScrollReveal";
import { FileText, Calculator, Shield, Briefcase, ChevronDown } from "lucide-react";
import { useState } from "react";

const serviceDetails = [
  {
    icon: FileText,
    title: "Dichiarazioni Fiscali",
    titleAttr: "Dichiarazioni Fiscali a Fondi – CAF 730 e Modello Redditi PF con assistenza professionale",
    desc: "Assistenza completa per la compilazione e l'invio delle dichiarazioni dei redditi.",
    bullets: [
      "Modello 730 per lavoratori dipendenti e pensionati",
      "Modello Redditi PF per autonomi e professionisti",
      "Dichiarazioni correttive e integrative",
      "Assistenza per detrazioni e deduzioni fiscali",
    ],
    link: "/caf-730-online",
  },
  {
    icon: Calculator,
    title: "Calcolo ISEE",
    titleAttr: "Calcolo ISEE a Fondi – ISEE ordinario, corrente e universitario per bonus e agevolazioni",
    desc: "Elaborazione della Dichiarazione Sostitutiva Unica per accedere a prestazioni sociali agevolate.",
    bullets: [
      "ISEE ordinario e corrente",
      "ISEE universitario",
      "ISEE sociosanitario",
      "Assistenza per bonus e agevolazioni",
    ],
    link: "/caf-isee",
  },
  {
    icon: Shield,
    title: "Servizi Patronato",
    titleAttr: "Servizi Patronato INPS a Fondi – Pensioni, NASpI, invalidità e pratiche previdenziali",
    desc: "Gestione completa delle pratiche previdenziali e assistenziali presso INPS e altri enti.",
    bullets: [
      "Domande di pensione (vecchiaia, anticipata, invalidità)",
      "NASpI e disoccupazione",
      "Invalidità civile e accompagnamento",
      "Assegno unico e universale per i figli",
      "Maternità e congedi parentali",
    ],
    link: "/patronato-inps",
  },
  {
    icon: Briefcase,
    title: "Consulenze Tributarie",
    titleAttr: "Consulenze Tributarie a Fondi – CAF tutela fiscale del contribuente e pianificazione fiscale",
    desc: "Consulenza fiscale personalizzata per privati e piccole imprese.",
    bullets: [
      "Pianificazione fiscale",
      "Assistenza per accertamenti e cartelle esattoriali",
      "Consulenza su contratti e locazioni",
      "Successioni e donazioni",
    ],
    link: "/caf-dichiarazione-redditi",
  },
];

const faqs = [
  { q: "Quali documenti devo portare per il Modello 730?", a: "CU (Certificazione Unica), documenti relativi a spese detraibili (sanitarie, mutuo, assicurazioni), dati catastali di immobili e documenti di identità." },
  { q: "Quanto tempo ci vuole per ottenere l'ISEE?", a: "Generalmente l'ISEE viene elaborato entro 2-3 giorni lavorativi dalla consegna di tutta la documentazione necessaria." },
  { q: "È necessario prendere appuntamento?", a: "Sì, consigliamo di prenotare un appuntamento per garantirti un'assistenza dedicata e senza attese." },
  { q: "I servizi di Patronato sono gratuiti?", a: "Molti servizi di Patronato sono gratuiti per il cittadino. Per maggiori dettagli, contattaci direttamente." },
  { q: "Dove si trova il vostro ufficio?", a: "Siamo in Via Roma 123, 04022 Fondi (LT). Raggiungibili facilmente dal centro città." },
];

const jsonLdServizi = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Servizi CAF e Patronato a Fondi",
  "description": "Tutti i servizi di assistenza fiscale e previdenziale: CAF 730, ISEE, Patronato INPS, dichiarazione redditi e consulenza tributaria a Fondi e Latina.",
  "provider": { "@type": "LocalBusiness", "name": "CAF Patronato Fondi", "areaServed": ["Fondi", "Terracina", "Latina"] },
  "serviceType": ["CAF 730", "Calcolo ISEE", "Patronato INPS", "Dichiarazione Redditi", "Consulenza Tributaria"],
};

const Servizi = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdServizi) }} />
      <Header />

      <PageHero
        title="Servizi CAF e Patronato a Fondi – 730, ISEE, Pensioni e Consulenza"
        subtitle="Tutti i servizi di assistenza fiscale e previdenziale: CAF 730 online, calcolo ISEE, patronato INPS, disoccupazione, dimissioni e consulenza tributaria a Fondi e Latina."
        titleAttr="Servizi CAF e Patronato a Fondi – 730 online, ISEE, pensioni INPS, dichiarazione redditi e consulenza fiscale a Fondi, Terracina e Latina"
        sectionTitle="Servizi CAF Fondi – 730, ISEE, Patronato INPS, Dichiarazione Redditi, Consulenza Tributaria"
        variant="geometric"
      />

      {/* Service details */}
      <section className="bg-background seo-page-parent-block" title="Servizi CAF e Patronato Fondi – Dichiarazioni fiscali, ISEE, patronato INPS e consulenza tributaria">
        <div className="container py-20 md:py-28">
          <div className="space-y-20">
            {serviceDetails.map((s, i) => (
              <Reveal key={s.title}>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start`}>
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
                        <s.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-foreground" title={s.titleAttr}>
                        <strong title={s.titleAttr}>
                          <Link to={s.link} title={s.titleAttr} className="text-foreground hover:text-primary transition-colors">{s.title}</Link>
                        </strong>
                      </h2>
                    </div>
                    <p className="text-body-text leading-relaxed mb-5 seo-container-para" title={s.desc}>{s.desc}</p>
                    <ul className="space-y-2.5 mb-6">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-body-text" title={b}>
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <Button asChild>
                      <Link to="/contatto" title={`Richiedi informazioni – ${s.title} a Fondi`}>Richiedi informazioni</Link>
                    </Button>
                  </div>
                  <div className={`bg-secondary rounded-lg p-10 md:p-14 flex items-center justify-center min-h-[260px] ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                    <s.icon className="h-24 w-24 text-primary/20" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface" title="Domande Frequenti CAF Patronato Fondi – FAQ su 730, ISEE, patronato e servizi fiscali">
        <div className="container py-20 md:py-28">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">FAQ</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4" title="Domande Frequenti – CAF Patronato Fondi, 730, ISEE e servizi fiscali">Domande Frequenti</h2>
            </div>
          </Reveal>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="bg-card border border-border rounded-lg hover:bg-accent hover:border-primary/20 transition-all duration-300" title={faq.q}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-medium text-foreground text-sm md:text-base pr-4">{faq.q}</span>
                    <ChevronDown className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      openFaq === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 pb-5 text-sm text-body-text leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Pronto per iniziare?"
        subtitle="Prenota un appuntamento e lasciati guidare dai nostri professionisti."
      />

      <Footer />
    </div>
  );
};

export default Servizi;
