import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { Reveal } from "@/hooks/useScrollReveal";
import ContactInfoCards from "@/components/ContactInfoCards";

const contactInfo = [
  { icon: Phone, title: "Cellulare", value: "+39 328 556 1774", href: "tel:+393285561774", titleAttr: "Cellulare CAF Patronato Terracina" },
  { icon: Phone, title: "Telefono Fisso", value: "0771 904129", href: "tel:+390771904129", titleAttr: "Telefono fisso CAF Patronato Terracina" },
  { icon: Mail, title: "Email", value: "terracina@cafpatronatofondi.com", href: "mailto:terracina@cafpatronatofondi.com", titleAttr: "Email CAF Patronato Terracina" },
  { icon: MapPin, title: "Indirizzo", value: "Piazza Gregorio Antonelli 11, 04019 Terracina (LT)", href: null, titleAttr: "Indirizzo sede CAF Patronato Terracina" },
  { icon: Clock, title: "Orari", value: "Lun–Ven: 9:00 – 18:00", href: null, titleAttr: "Orari apertura CAF Terracina" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "CAF Patronato Fondi – Sede Terracina",
  "telephone": "+393285561774",
  "email": "terracina@cafpatronatofondi.com",
  "address": { "@type": "PostalAddress", "streetAddress": "Piazza Gregorio Antonelli 11", "addressLocality": "Terracina", "postalCode": "04019", "addressRegion": "LT", "addressCountry": "IT" },
  "openingHours": "Mo-Fr 09:00-18:00",
  "areaServed": "Terracina",
};

const ContattoTerracina = () => (
  <div className="min-h-screen">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <Header />
    <PageHero
      title="Contattaci – CAF Patronato Terracina"
      subtitle="Prenota appuntamento per 730, ISEE, pensioni e pratiche INPS nella nostra sede di Terracina."
      titleAttr="Contatti CAF Patronato Terracina – Prenotazione appuntamento"
      sectionTitle="Contatto Sede Terracina – Telefono, Email, Orari e Modulo Online"
      variant="aurora"
    />

    <section className="bg-background seo-page-parent-block" title="Contatti sede Terracina – CAF Patronato">
      <div className="container py-20 md:py-28">
        <ContactInfoCards items={contactInfo} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactForm sede="terracina" sedeLabel="Terracina" />
          <div className="rounded-lg overflow-hidden min-h-[400px]" title="Mappa sede CAF Terracina">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23952.5!2d13.25!3d41.29!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13a0174a0!2sTerracina%20LT!5e0!3m2!1sit!2sit!4v1"
              width="100%" height="100%" style={{ border: 0, minHeight: 400 }} allowFullScreen loading="lazy"
              title="Google Maps – CAF Patronato Terracina"
            />
          </div>
        </div>
      </div>
    </section>

    <section className="bg-secondary" title="Altre sedi CAF Patronato">
      <div className="container py-16 md:py-20">
        <Reveal>
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-8 text-center">
            <strong><Link to="/servizi" title="Altre sedi CAF" className="text-foreground hover:text-primary transition-colors">Altre Nostre Sedi</Link></strong>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {[
            { title: "Sede Fondi", path: "/contatto/fondi", titleAttr: "CAF Patronato Fondi – Contattaci" },
            { title: "Sede Cisterna di Latina", path: "/contatto/cisterna-di-latina", titleAttr: "CAF Patronato Cisterna di Latina – Contattaci" },
          ].map((s) => (
            <Reveal key={s.path}>
              <Link to={s.path} title={s.titleAttr} className="block bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-primary/20 transition-all text-center">
                <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
                <span className="text-sm font-medium text-primary inline-flex items-center gap-1">Vai ai contatti <ArrowRight className="h-3.5 w-3.5" /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default ContattoTerracina;