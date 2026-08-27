import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/hooks/useScrollReveal";
import ContactInfoCards from "@/components/ContactInfoCards";

const contactInfo = [
  { icon: Phone, title: "Cellulare", value: "+39 328 556 1774", href: "tel:+393285561774", titleAttr: "Cellulare CAF Patronato Fondi – Chiama per prenotare appuntamento" },
  { icon: Phone, title: "Telefono Fisso", value: "0771 904129", href: "tel:+390771904129", titleAttr: "Telefono fisso CAF Patronato Fondi – Chiama per prenotare appuntamento" },
  { icon: Mail, title: "Email", value: "info@cafpatronatofondi.com", href: "mailto:info@cafpatronatofondi.com", titleAttr: "Email CAF Patronato Fondi – Scrivi per informazioni e appuntamenti" },
  { icon: MapPin, title: "Indirizzo", value: "Via Roma 8 A, 04022 Fondi (LT)", href: null, titleAttr: "Indirizzo CAF Patronato Fondi – Fondi (LT), provincia di Latina" },
  { icon: Clock, title: "Orari", value: "Lun–Ven: 9:00 – 18:00", href: null, titleAttr: "Orari CAF Fondi – Lunedì-Venerdì 9:00-18:00, CAF aperto oggi" },
];

const jsonLdContatto = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "CAF Patronato Fondi",
  "telephone": "+393285561774",
  "email": "info@cafpatronatofondi.com",
  "address": { "@type": "PostalAddress", "streetAddress": "Via Roma 8 A", "addressLocality": "Fondi", "addressRegion": "LT", "addressCountry": "IT" },
  "openingHours": "Mo-Fr 09:00-18:00",
  "areaServed": ["Fondi", "Terracina", "Cisterna di Latina"],
};

const Contatto = () => {
  const [formData, setFormData] = useState({ nome: "", email: "", telefono: "", messaggio: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Grazie per averci contattato! Ti risponderemo al più presto.");
    setFormData({ nome: "", email: "", telefono: "", messaggio: "" });
  };

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdContatto) }} />
      <Header />

      <PageHero
        title="Contattaci – Prenotazione Appuntamento CAF a Fondi"
        subtitle="Prenota appuntamento online per 730, ISEE, pensioni e pratiche INPS. CAF aperto oggi a Fondi, Terracina e Cisterna di Latina. Chiama il numero +39 328 556 1774."
        titleAttr="Contattaci CAF Patronato Fondi – Prenotazione appuntamento online per 730, ISEE, pensioni e pratiche INPS a Fondi, Terracina e Cisterna di Latina"
        sectionTitle="Contatto CAF Fondi – Prenotazione Online, Telefono, Email, Orari di Apertura"
        variant="aurora"
      />

      {/* Contact Info Grid */}
      <section className="bg-background seo-page-parent-block" title="Contatti CAF Patronato Fondi – Telefono, email, indirizzo e orari di apertura">
        <div className="container py-20 md:py-28">
          <ContactInfoCards items={contactInfo} />

          {/* Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">SCRIVICI</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4" title="Inviaci un messaggio – CAF Patronato Fondi, prenotazione appuntamento online">Inviaci un Messaggio</h2>
              <p className="text-body-text leading-relaxed mb-8 seo-container-para" title="Compila il modulo per contattare il CAF Patronato Fondi – Risposta entro 24 ore lavorative">
                Compila il modulo e ti risponderemo entro 24 ore lavorative. In alternativa, chiamaci direttamente per assistenza immediata.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Nome e Cognome *</label>
                  <input type="text" required value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors" placeholder="Mario Rossi" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Email *</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors" placeholder="mario@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Telefono</label>
                    <input type="tel" value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors" placeholder="+39 333 000 0000" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Messaggio *</label>
                  <textarea required rows={5} value={formData.messaggio} onChange={(e) => setFormData({ ...formData, messaggio: e.target.value })} className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none" placeholder="Come possiamo aiutarti?" />
                </div>
                <Button type="submit" size="lg">
                  Invia Messaggio
                </Button>
              </form>
            </div>

            {/* Map placeholder */}
            <div className="bg-secondary rounded-lg flex items-center justify-center min-h-[400px]" title="Mappa CAF Patronato Fondi – Fondi (LT), provincia di Latina">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-primary/30 mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">Fondi (LT), Italy</p>
                <p className="text-muted-foreground text-xs mt-1">Mappa interattiva disponibile prossimamente</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servizi Correlati */}
      <section className="bg-surface" title="Servizi CAF Patronato Fondi – 730 Online, ISEE, Patronato INPS e Dichiarazione Redditi">
        <div className="container py-16 md:py-20">
          <Reveal>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-8 text-center" title="Servizi CAF Patronato Fondi – Prenota 730, ISEE, Patronato e Consulenza Fiscale">
              <strong title="Servizi CAF e Patronato disponibili a Fondi e Latina">
                <Link to="/servizi" title="Tutti i servizi CAF e Patronato a Fondi" className="text-foreground hover:text-primary transition-colors">Servizi Correlati</Link>
              </strong>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "CAF 730 Online", desc: "Dichiarazione dei redditi con prenotazione online e invio telematico.", path: "/caf-730-online", titleAttr: "CAF 730 Online a Fondi – Prenotazione e compilazione dichiarazione redditi" },
              { title: "Calcolo ISEE", desc: "ISEE ordinario, corrente e universitario per bonus e agevolazioni.", path: "/caf-isee", titleAttr: "Calcolo ISEE a Fondi – Elaborazione DSU per bonus e agevolazioni sociali" },
              { title: "Patronato INPS", desc: "Pensioni, NASpI, invalidità civile e pratiche previdenziali.", path: "/patronato-inps", titleAttr: "Patronato INPS a Fondi – Pensioni, disoccupazione e pratiche previdenziali" },
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

      <Footer />
    </div>
  );
};

export default Contatto;
