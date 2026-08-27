import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTABand from "@/components/CTABand";
import ServiceCard from "@/components/ServiceCard";
import heroFinanceDark from "@/assets/hero-finance-dark.png";
import heroFinanceLight from "@/assets/hero-finance-dark-transparent.png";
import teamImage from "@/assets/team-working.jpg";
import avatarMaria from "@/assets/avatar-maria.jpg";
import avatarGiuseppe from "@/assets/avatar-giuseppe.jpg";
import avatarAnna from "@/assets/avatar-anna.jpg";
import stack730 from "@/assets/stack-730.jpg";
import stackIsee from "@/assets/stack-isee.jpg";
import stackRedditi from "@/assets/stack-redditi.jpg";
import stackPatronato from "@/assets/stack-patronato.jpg";
import { Reveal } from "@/hooks/useScrollReveal";
import CountUp from "@/components/CountUp";
import {
  FileText,
  Calculator,
  Shield,
  Briefcase,
  Users,
  Clock,
  CheckCircle,
  Award,
  HeartHandshake,
  Star,
  ArrowRight,
  Phone,
  ClipboardList,
  ThumbsUp,
  Mail,
} from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "Dichiarazioni Fiscali",
    description: "Modello 730, Redditi PF e assistenza completa per la tua dichiarazione dei redditi.",
    link: "/caf-730-online",
    titleAttr: "Dichiarazioni Fiscali a Fondi – CAF 730 Online e Modello Redditi PF con prenotazione",
  },
  {
    icon: Calculator,
    title: "Calcolo ISEE",
    description: "Elaborazione dell'ISEE per accedere a bonus, agevolazioni e prestazioni sociali.",
    link: "/caf-isee",
    titleAttr: "Calcolo ISEE a Fondi – Elaborazione DSU per bonus e agevolazioni sociali",
  },
  {
    icon: Shield,
    title: "Servizi Patronato",
    description: "Pensioni, NASpI, invalidità civile e tutte le pratiche INPS gestite per te.",
    link: "/patronato-inps",
    titleAttr: "Servizi Patronato INPS a Fondi – Pensioni, NASpI, invalidità e pratiche previdenziali",
  },
  {
    icon: Briefcase,
    title: "Consulenze Tributarie",
    description: "Consulenza fiscale personalizzata per privati e piccole imprese.",
    link: "/caf-dichiarazione-redditi",
    titleAttr: "Consulenze Tributarie a Fondi – CAF tutela fiscale del contribuente e pianificazione fiscale",
  },
];

const whyChooseUs = [
  { icon: CheckCircle, title: "Precisione Garantita", desc: "Ogni pratica viene curata con attenzione ai dettagli e massima precisione." },
  { icon: Clock, title: "Tempi Rapidi", desc: "Elaborazione veloce delle pratiche con aggiornamenti costanti sullo stato." },
  { icon: HeartHandshake, title: "Assistenza Personalizzata", desc: "Un approccio su misura per ogni cliente e ogni esigenza specifica." },
];

const steps = [
  { icon: Phone, title: "Contattaci", desc: "Chiamaci o prenota un appuntamento online per una prima consulenza gratuita." },
  { icon: ClipboardList, title: "Consulenza", desc: "Analizziamo la tua situazione e ti guidiamo verso la soluzione migliore." },
  { icon: ThumbsUp, title: "Risultato", desc: "Ci occupiamo della documentazione e ricevi la pratica completata." },
];

const testimonials = [
  { name: "Maria R.", title: "Servizio Eccellente per il 730", text: "Professionali e disponibili. Mi hanno aiutato con il 730 in tempi record. Tutto gestito con cura e precisione. Consigliatissimi!", role: "Lavoratrice dipendente", avatar: avatarMaria, link: "/caf-730-online", keyword: "730", titleAttr: "Servizio Eccellente per il 730 – Recensione CAF 730 Online Fondi" },
  { name: "Giuseppe L.", title: "Pensione Ottenuta Senza Stress", text: "Grazie a loro ho ottenuto la mia pensione senza stress. Un servizio eccellente, puntuale e sempre disponibili per ogni chiarimento.", role: "Pensionato", avatar: avatarGiuseppe, link: "/patronato-inps", keyword: "pensione", titleAttr: "Pensione Ottenuta Senza Stress – Recensione Patronato INPS Fondi" },
  { name: "Anna B.", title: "ISEE Elaborato in Tempi Record", text: "Ho avuto bisogno dell'ISEE urgente e me lo hanno elaborato in tempi rapidissimi. Personale gentile e molto competente. Tornerò sicuramente.", role: "Libera professionista", avatar: avatarAnna, link: "/caf-isee", keyword: "ISEE", titleAttr: "ISEE Elaborato in Tempi Record – Recensione CAF ISEE Fondi" },
];

const siteUrl = "https://fondi-assist-core.lovable.app";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "CAF Patronato Fondi",
  "description": "Centro di Assistenza Fiscale e Patronato a Fondi – 730 Online, ISEE, Pensioni INPS, Dichiarazione Redditi a Fondi, Terracina e Cisterna di Latina.",
  "image": heroFinanceDark,
  "priceRange": "€",
  "url": siteUrl,
  "telephone": "+393285561774",
  "email": "info@cafpatronatofondi.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Via Roma 8 A",
    "addressLocality": "Fondi",
    "addressRegion": "Lazio",
    "postalCode": "04022",
    "addressCountry": "IT"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 41.3572,
    "longitude": 13.4283
  },
  "openingHours": "Mo-Fr 09:00-18:00",
  "areaServed": [
    {
      "@type": "City",
      "name": "Fondi",
      "sameAs": "https://it.wikipedia.org/wiki/Fondi"
    },
    {
      "@type": "City",
      "name": "Terracina",
      "sameAs": "https://it.wikipedia.org/wiki/Terracina"
    },
    {
      "@type": "City",
      "name": "Cisterna di Latina",
      "sameAs": "https://it.wikipedia.org/wiki/Cisterna_di_Latina"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Provincia di Latina"
    }
  ],
  "serviceType": ["CAF 730 Online", "Calcolo ISEE", "Patronato INPS", "Dichiarazione Redditi", "Consulenza Tributaria"],
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Maria R.",
        "url": siteUrl + "/chi-siamo",
        "image": avatarMaria
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "<strong title='Il servizio CAF 730 Online a Fondi garantisce elaborazione rapida con precisione al 98% nella compilazione dichiarazione redditi'><a href='" + siteUrl + "/caf-730-online' title='CAF 730 Online a Fondi – Compilazione dichiarazione dei redditi professionale e rapida'>CAF Patronato Fondi</a></strong> mi ha aiutato con il 730 in tempi record. Tutto gestito con cura e precisione. Consigliatissimi!"
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Giuseppe L.",
        "url": siteUrl + "/chi-siamo",
        "image": avatarGiuseppe
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Grazie a <strong title='Patronato INPS Fondi – Assistenza previdenziale esperta per pratiche pensionistiche senza stress'><a href='" + siteUrl + "/patronato-inps' title='Patronato INPS a Fondi – Gestione completa pratiche pensionistiche e previdenziali'>il Patronato INPS di Fondi</a></strong> ho ottenuto la mia pensione senza stress. Servizio eccellente, puntuale e sempre disponibili per ogni chiarimento."
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Anna B.",
        "url": siteUrl + "/chi-siamo",
        "image": avatarAnna
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Ho avuto bisogno dell'ISEE urgente e <strong title='Calcolo ISEE rapido a Fondi – Elaborazione DSU in tempi record per bonus e agevolazioni sociali'><a href='" + siteUrl + "/caf-isee' title='Calcolo ISEE a Fondi – Elaborazione urgente ISEE per bonus e prestazioni sociali'>il CAF ISEE di Fondi</a></strong> me lo ha elaborato in tempi rapidissimi. Personale gentile e molto competente."
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "3"
  }
};

const Index = () => {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      {/* Hero - Dark Cinematic with highlighted keywords */}
      <section className="relative overflow-hidden min-h-[100vh] flex items-center seo-page-parent-block" title="CAF Patronato Fondi – #1 Assistenza Fiscale 730, ISEE, Pensioni INPS a Fondi, Terracina, Latina" style={{ background: "linear-gradient(165deg, #0a0a0a 0%, #0d1f0d 60%, #1a2e1a 100%)" }}>
        {/* Abstract line pattern */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-[2px] rounded-full"
              style={{
                top: `${8 + i * 7.5}%`,
                right: `${5 + (i % 3) * 10}%`,
                width: `${60 + (i % 4) * 30}px`,
                background: i % 3 === 0 ? "hsl(var(--primary))" : i % 3 === 1 ? "hsl(37, 85%, 63%)" : "hsl(0, 0%, 40%)",
                opacity: 0.5 + (i % 3) * 0.2,
              }}
            />
          ))}
        </div>

        <div className="container relative py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Reveal>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-8">
                  CAF Patronato Fondi • Tutela Fiscale dal 2005
                </p>
              </Reveal>

              <Reveal delay={100}>
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-8 text-shadow-light"
                  title="CAF Patronato Fondi – Assistenza Fiscale 730, ISEE e Previdenza a Fondi, Terracina e Latina"
                >
                  <strong title="CAF Patronato Fondi – Centro assistenza fiscale e previdenziale accreditato a Fondi (LT)">
                    <Link to="/chi-siamo" title="CAF Patronato Fondi – Chi siamo e i nostri servizi fiscali" className="text-white hover:text-primary-light transition-colors hover:text-shadow-heading-light">
                      CAF Patronato
                    </Link>
                  </strong>{" "}
                  <span className="whitespace-nowrap">
                    <strong title="CAF Patronato Fondi – Centro assistenza fiscale accreditato a Fondi">
                      <Link to="/chi-siamo" title="CAF Patronato Fondi" className="text-white hover:text-primary-light transition-all">
                        <span className="inline-block px-4 py-1 rounded-lg bg-white/10 border border-white/20 text-white transition-all duration-300 hover:bg-primary/20 hover:border-primary/40 hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)]">Fondi</span>
                      </Link>
                    </strong>{" "}
                    <strong title="CAF 730 Online – Dichiarazione dei redditi con prenotazione e invio telematico a Fondi e Latina">
                      <Link to="/caf-730-online" title="CAF 730 Online a Fondi – Prenotazione e compilazione dichiarazione redditi" className="text-white hover:text-primary-light transition-all">
                        <span className="inline-block px-4 py-1 rounded-lg bg-white/10 border border-white/20 text-white transition-all duration-300 hover:bg-primary/20 hover:border-primary/40 hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)]">730</span>
                      </Link>
                    </strong>
                  </span>,{" "}
                  <strong title="Calcolo ISEE – Elaborazione ISEE ordinario, corrente e universitario per bonus e agevolazioni">
                    <Link to="/caf-isee" title="CAF ISEE a Fondi – Prenotazione e calcolo ISEE online" className="text-white hover:text-primary-light transition-colors hover:text-shadow-heading-light">
                      ISEE
                    </Link>
                  </strong> e{" "}
                  <strong title="Assistenza fiscale completa – CAF tutela fiscale del contribuente a Fondi, Terracina e Latina">
                    <Link to="/servizi" title="Tutti i servizi CAF e Patronato – Assistenza fiscale e previdenziale" className="text-white hover:text-primary-light transition-colors hover:text-shadow-heading-light">
                      Assistenza Fiscale
                    </Link>
                  </strong>
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <div className="paragraph-parent-block seo-parent-block seo-page-block">
                  <p className="text-lg text-white/50 leading-relaxed mb-10 max-w-lg seo-container-para" title="Servizi CAF Patronato Fondi – 730 online, ISEE, pensioni INPS, dichiarazione redditi a Fondi, Terracina, Latina">
                    <strong title="CAF 730 online – Compilazione e invio telematico della dichiarazione dei redditi a Fondi">
                      <Link to="/caf-730-online" title="CAF 730 Online – Prenotazione dichiarazione redditi a Fondi e Latina" className="text-white/50 hover:text-primary transition-colors">CAF 730 online</Link>
                    </strong>,{" "}
                    <strong title="Calcolo ISEE – Elaborazione DSU per bonus e agevolazioni sociali a Fondi">
                      <Link to="/caf-isee" title="Calcolo ISEE a Fondi – Prenotazione ISEE online per bonus e agevolazioni" className="text-white/50 hover:text-primary transition-colors">calcolo ISEE</Link>
                    </strong>,{" "}
                    <strong title="Patronato INPS – Pensioni, NASpI, invalidità civile e pratiche previdenziali a Fondi">
                      <Link to="/patronato-inps" title="Patronato INPS a Fondi – Pensioni, disoccupazione e pratiche previdenziali" className="text-white/50 hover:text-primary transition-colors">pensioni INPS</Link>
                    </strong> e{" "}
                    <strong title="Dichiarazione redditi – Modello Redditi PF e consulenza fiscale personalizzata">
                      <Link to="/caf-dichiarazione-redditi" title="CAF Dichiarazione Redditi a Fondi – Consulenza fiscale completa" className="text-white/50 hover:text-primary transition-colors">dichiarazione redditi</Link>
                    </strong>.
                    Il tuo CAF di fiducia a Fondi, Terracina e Latina.{" "}
                    <strong title="Prenota appuntamento CAF – Prenotazione online senza code a Fondi">
                      <Link to="/contatto" title="Prenota appuntamento CAF a Fondi – Contattaci oggi" className="text-white/50 hover:text-primary transition-colors">Prenota appuntamento oggi</Link>
                    </strong>.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={300}>
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  {/* Primary CTA — dual-state button */}
                  <Link
                    to="/contatto"
                    className="group relative h-16 px-10 rounded-xl text-lg font-medium overflow-hidden bg-primary text-primary-foreground shadow-2xl shadow-primary/30 inline-flex items-center justify-center"
                  >
                    <span className="flex items-center gap-2 transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0">
                      Prenota Appuntamento <ArrowRight className="h-5 w-5" />
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center gap-2 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <Phone className="h-5 w-5" /> Chiama Ora
                    </span>
                  </Link>

                  {/* Secondary CTA — dual-state button */}
                  <Link
                    to="/servizi"
                    className="group relative h-16 px-10 rounded-xl text-lg font-medium overflow-hidden bg-white/5 text-white border border-white/15 hover:bg-white/10 backdrop-blur-sm inline-flex items-center justify-center"
                  >
                    <span className="flex items-center gap-2 transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0">
                      Esplora Servizi
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center gap-2 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      Scopri <ArrowRight className="h-5 w-5" />
                    </span>
                  </Link>
                </div>
              </Reveal>

              {/* Stats row */}
              <Reveal delay={400}>
                <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
                  {[
                    { val: "5.000+", label: "Clienti Serviti" },
                    { val: "98%", label: "Soddisfazione" },
                    { val: "20+", label: "Anni Esperienza" },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="text-2xl md:text-3xl font-bold text-primary">{s.val}</div>
                      <div className="text-xs text-white/40 uppercase tracking-wide mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right: illustration with floating elements */}
            <Reveal direction="right">
              <div className="relative group/hero">
                <div className="rounded-3xl overflow-hidden img-shadow group/hero-img relative">
                  <img src={heroFinanceDark} alt="CAF Patronato Fondi – Servizi fiscali 730, ISEE e assistenza previdenziale" title="CAF Patronato Fondi – Centro assistenza fiscale e previdenziale a Fondi, Terracina e Latina" className="w-full h-auto object-contain transition-opacity duration-300 group-hover/hero-img:opacity-0" loading="eager" fetchPriority="high" />
                  <img src={heroFinanceLight} alt="CAF Patronato Fondi – Servizi fiscali 730, ISEE e assistenza previdenziale" title="CAF Patronato Fondi – Centro assistenza fiscale e previdenziale a Fondi, Terracina e Latina" className="w-full h-auto object-contain absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/hero-img:opacity-100" loading="eager" />
                </div>

                {/* Floating notification card */}
                <Link
                  to="/caf-730-online"
                  title="CAF 730 Online – Dichiarazione dei redditi completata a Fondi"
                  className="absolute top-6 -left-6 z-10 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 shadow-xl block no-underline animate-float-card-in transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.4)] hover:bg-white/[0.08] group-hover/hero:bg-[rgba(12,40,24,0.85)] group-hover/hero:border-primary/30 group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[8deg]">
                      <CheckCircle className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white transition-colors duration-300 group-hover:text-primary-light">730 Completato</div>
                      <div className="text-xs text-white/50">Rimborso in arrivo</div>
                    </div>
                  </div>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-background border-b border-border seo-parent-block" title="Perché scegliere CAF Patronato Fondi – Esperienza, clienti assistiti e pratiche gestite a Fondi e Latina">
        <div className="container py-16 md:py-20">
          <Reveal>
            <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-8">Perché migliaia di clienti si fidano di noi</p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { end: 20, suffix: "+", label: "Anni di Esperienza" },
              { end: 5000, suffix: "+", label: "Clienti Assistiti" },
              { end: 15000, suffix: "+", label: "Pratiche Gestite" },
              { end: 100, suffix: "%", label: "Soddisfazione" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 150}>
                <div className="group cursor-default">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1 transition-transform duration-300 group-hover:scale-105">
                    <CountUp end={stat.end} suffix={stat.suffix} duration={2200} />
                  </div>
                  <div className="text-sm text-muted-foreground transition-colors duration-300 group-hover:text-primary">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-background">
        <div className="container py-20 md:py-28">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">SERVIZI CAF E PATRONATO</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4" title="Servizi CAF Patronato Fondi – 730, ISEE, Pensioni INPS e Dichiarazione Redditi a Fondi e Latina">
                <strong title="CAF 730 – Dichiarazione dei redditi online con prenotazione a Fondi">
                  <Link to="/caf-730-online" title="CAF 730 Online a Fondi – Prenotazione e assistenza fiscale" className="text-foreground hover:text-primary transition-colors">CAF 730</Link>
                </strong>,{" "}
                <strong title="Calcolo ISEE – Elaborazione rapida per bonus e agevolazioni sociali">
                  <Link to="/caf-isee" title="CAF ISEE a Fondi – Calcolo e prenotazione online" className="text-foreground hover:text-primary transition-colors">ISEE</Link>
                </strong>,{" "}
                <strong title="Patronato INPS – Pensioni, NASpI e pratiche previdenziali a Fondi e Latina">
                  <Link to="/patronato-inps" title="Patronato INPS a Fondi – Pensioni e assistenza previdenziale" className="text-foreground hover:text-primary transition-colors">Pensioni</Link>
                </strong> e{" "}
                <strong title="Dichiarazione Redditi – Modello Redditi PF e consulenza tributaria">
                  <Link to="/caf-dichiarazione-redditi" title="CAF Dichiarazione Redditi a Fondi – Consulenza fiscale" className="text-foreground hover:text-primary transition-colors">Dichiarazione Redditi</Link>
                </strong>
              </h2>
              <div className="paragraph-parent-block seo-parent-block">
                <p className="text-body-text max-w-2xl mx-auto seo-container-para" title="Assistenza fiscale completa CAF Patronato a Fondi e Latina">
                  Assistenza fiscale completa:{" "}
                  <strong title="CAF 730 Online – Compilazione e invio telematico dichiarazione redditi"><Link to="/caf-730-online" className="text-primary hover:underline" title="CAF 730 Online a Fondi">CAF 730 online</Link></strong>,{" "}
                  <strong title="Calcolo ISEE – DSU per bonus e prestazioni sociali"><Link to="/caf-isee" className="text-primary hover:underline" title="Calcolo ISEE a Fondi e Latina">calcolo ISEE</Link></strong>,{" "}
                  <strong title="Patronato INPS – Pensioni, NASpI, invalidità e assistenza previdenziale"><Link to="/patronato-inps" className="text-primary hover:underline" title="Patronato INPS a Fondi">patronato INPS</Link></strong> e{" "}
                  <strong title="Consulenza tributaria – CAF tutela fiscale del contribuente"><Link to="/caf-dichiarazione-redditi" className="text-primary hover:underline" title="Consulenza tributaria a Fondi e Latina">consulenza tributaria</Link></strong> a Fondi e Latina.
                </p>
              </div>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 100}>
                <ServiceCard icon={s.icon} title={s.title} description={s.description} link={s.link} titleAttr={s.titleAttr} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-surface seo-parent-block" title="Perché scegliere CAF Patronato Fondi – Precisione, tempi rapidi e assistenza personalizzata a Fondi e Latina">
        <div className="container py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            <Reveal direction="left">
              <div className="relative h-full img-shadow-left rounded-lg">
                <div className="rounded-lg overflow-hidden h-full">
                  <img src={teamImage} alt="Team CAF Patronato Fondi – Assistenza fiscale professionale" title="Il team di CAF Patronato Fondi – Professionisti fiscali a Fondi e Latina" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="absolute bottom-6 left-6 bg-primary text-white rounded-lg px-6 py-4 shadow-xl">
                  <div className="text-2xl md:text-3xl font-bold">5.000+</div>
                  <div className="text-sm opacity-90">Clienti assistiti</div>
                </div>
              </div>
            </Reveal>
            <Reveal direction="right">
              <div>
                <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">PERCHÉ SCEGLIERCI</p>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-8" title="CAF Patronato Fondi – Un partner di fiducia per assistenza fiscale 730, ISEE e patronato INPS">Un Partner di Fiducia per le Tue Esigenze</h2>
                <div className="space-y-6">
                  {whyChooseUs.map((b) => (
                    <div key={b.title} className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <b.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1" title={`${b.title} – CAF Patronato Fondi`}>{b.title}</h3>
                        <p className="text-sm text-body-text leading-relaxed" title={b.desc}>{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/chi-siamo" title="Chi Siamo – Scopri la storia e i valori di CAF Patronato Fondi" className="inline-flex items-center gap-2 text-sm font-semibold text-primary mt-8 hover:underline">
                  Scopri il nostro approccio <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Process steps */}
      <section className="bg-background seo-parent-block" title="Come funziona il CAF Patronato Fondi – Contattaci, consulenza e risultato in 3 semplici passi">
        <div className="container py-20 md:py-28">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">IL NOSTRO PROCESSO</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4" title="Come funziona CAF Patronato Fondi – Processo semplice per 730, ISEE e pratiche INPS">Come Funziona</h2>
              <p className="text-body-text max-w-2xl mx-auto" title="Processo CAF in 3 passi – Contatto, consulenza e pratica completata a Fondi">Un processo semplice e trasparente per gestire le tue pratiche.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 150}>
                <div className="bg-card border border-border rounded-lg p-7 md:p-8 text-center hover:shadow-lg hover:border-primary/20 hover:bg-accent transition-all duration-300 group cursor-default">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <step.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <div className="text-xs font-bold text-primary/40 uppercase tracking-widest mb-2 group-hover:text-primary/70 transition-colors duration-300">Passo {i + 1}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2" title={`${step.title} – CAF Patronato Fondi`}>{step.title}</h3>
                  <p className="text-sm text-body-text leading-relaxed max-w-xs mx-auto" title={step.desc}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Stack Cards — DesignMonks "Industry Wins" style */}
      <section className="bg-background seo-parent-block" title="Servizi CAF Patronato Fondi – Assistenza Fiscale e Previdenziale a Fondi, Terracina e Latina">
        <div className="container py-20 md:py-28">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">I NOSTRI SERVIZI</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4" title="Assistenza Completa per Ogni Esigenza Fiscale a Fondi e Latina">
                Assistenza Completa per{" "}
                <em className="text-primary not-italic">Ogni Esigenza</em>
              </h2>
            </div>
          </Reveal>

          <div className="space-y-8">
            {[
              {
                category: "Dichiarazione",
                title: "Compilazione 730 Semplice e Veloce",
                desc: "Compilazione rapida del Modello 730 con invio telematico diretto all'Agenzia delle Entrate. Il nostro team ti guida passo dopo passo per ottenere il massimo rimborso.",
                stats: [
                  { label: "Tempo medio", value: "48h" },
                  { label: "Clienti soddisfatti", value: "98%" },
                ],
                person: { name: "Maria R.", role: "Lavoratrice dipendente", avatar: avatarMaria },
                image: stack730,
                link: "/caf-730-online",
                bg: "bg-[#C9FFF7]",
              },
              {
                category: "Agevolazioni",
                title: "Calcolo ISEE per Ogni Agevolazione",
                desc: "Elaborazione ISEE veloce per accedere a bonus sociali, agevolazioni universitarie e prestazioni. Ti aiutiamo a ottenere tutti i benefici a cui hai diritto.",
                stats: [
                  { label: "Pratiche annuali", value: "2.500+" },
                  { label: "Risparmio medio", value: "€1.200" },
                ],
                person: { name: "Anna B.", role: "Libera professionista", avatar: avatarAnna },
                image: stackIsee,
                link: "/caf-isee",
                bg: "bg-[#FFB8B1]",
              },
              {
                category: "Fiscalità",
                title: "Dichiarazione Redditi Personalizzata",
                desc: "Modello Redditi PF con consulenza tributaria personalizzata per privati e imprese. Analizziamo la tua situazione per ottimizzare ogni detrazione.",
                stats: [
                  { label: "Anni esperienza", value: "15+" },
                  { label: "Detrazioni trovate", value: "€850" },
                ],
                person: { name: "Giuseppe L.", role: "Pensionato", avatar: avatarGiuseppe },
                image: stackRedditi,
                link: "/caf-dichiarazione-redditi",
                bg: "bg-[#FBE8A4]",
              },
              {
                category: "Previdenza",
                title: "Patronato INPS – Al Tuo Fianco",
                desc: "Assistenza completa per pensioni, NASpI, invalidità civile e ogni pratica INPS. Ti accompagniamo in ogni fase della tua vita lavorativa.",
                stats: [
                  { label: "Pratiche gestite", value: "5.000+" },
                  { label: "Tasso successo", value: "97%" },
                ],
                person: { name: "Maria R.", role: "Lavoratrice dipendente", avatar: avatarMaria },
                image: stackPatronato,
                link: "/patronato-inps",
                bg: "bg-[#C6CFFF]",
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 100}>
                <Link to={card.link} className="block no-underline" title={card.title}>
                  <div className={`${card.bg} rounded-2xl p-8 md:p-12 lg:p-16 transition-shadow duration-300 hover:shadow-xl`}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                      {/* Left: Content */}
                      <div>
                        <p className="text-sm italic text-[#1a1a2e]/70 mb-3 font-medium">{card.category}</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-4">{card.title}</h3>
                        <p className="text-[#1a1a2e]/70 leading-relaxed mb-8 max-w-md">{card.desc}</p>

                        {/* Stats */}
                        <div className="flex gap-12 mb-8">
                          {card.stats.map((stat) => (
                            <div key={stat.label}>
                              <div className="text-xs text-[#1a1a2e]/50 mb-1">{stat.label}</div>
                              <div className="text-2xl md:text-3xl font-bold text-[#1a1a2e]">{stat.value}</div>
                            </div>
                          ))}
                        </div>

                        {/* Person card */}
                        <div className="flex items-center gap-3 bg-white/40 backdrop-blur-sm rounded-xl px-4 py-3 max-w-xs">
                          <img
                            src={card.person.avatar}
                            alt={card.person.name}
                            className="w-10 h-10 rounded-full object-cover"
                            loading="lazy"
                          />
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-[#1a1a2e]">{card.person.name}</div>
                            <div className="text-xs text-[#1a1a2e]/60">{card.person.role}</div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-[#1a1a2e]/40" />
                        </div>
                      </div>

                      {/* Right: Image */}
                      <div className="flex items-center justify-center">
                        <div className="rounded-2xl overflow-hidden shadow-lg max-w-md w-full">
                          <img
                            src={card.image}
                            alt={card.title}
                            className="w-full h-auto object-cover"
                            loading="lazy"
                            width={800}
                            height={640}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-accent seo-parent-block" title="Testimonianze clienti CAF Patronato Fondi – Recensioni positive per 730, ISEE e patronato INPS">
        <div className="container py-20 md:py-28">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">TESTIMONIANZE</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4" title="Testimonianze clienti CAF Patronato Fondi – Recensioni e opinioni su 730, ISEE e servizi fiscali">Cosa Dicono i Nostri Clienti</h2>
              <p className="text-body-text max-w-2xl mx-auto" title="Recensioni CAF Patronato Fondi – Valutazione 4.9/5 da oltre 70 clienti soddisfatti">La soddisfazione dei nostri clienti è la nostra priorità.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 150}>
                <div className="bg-card border border-border rounded-lg p-6 md:p-8 hover:shadow-lg hover:bg-background hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full" title={`${t.title} – Recensione di ${t.name}, ${t.role}`}>
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <h3 className="font-bold text-foreground mb-3" title={t.titleAttr}>
                    <strong title={t.titleAttr}>
                      <Link to={t.link} title={t.titleAttr} className="text-foreground hover:text-primary transition-colors hover:text-shadow-heading">{t.title}</Link>
                    </strong>
                  </h3>
                  <p className="text-body-text text-sm leading-relaxed mb-6 flex-1 seo-container-para" title={`${t.title} – Recensione cliente CAF Patronato Fondi`}>
                    "{t.text.split(t.keyword).map((part, idx, arr) => (
                      <span key={idx}>
                        {part}
                        {idx < arr.length - 1 && (
                          <Link to={t.link} title={t.titleAttr} className="text-primary hover:underline transition-colors font-medium">{t.keyword}</Link>
                        )}
                      </span>
                    ))}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <img src={t.avatar} alt={`${t.name} – Cliente CAF Patronato Fondi`} title={`${t.name}, ${t.role} – Recensione CAF Fondi`} className="w-10 h-10 rounded-full object-cover img-shadow" loading="lazy" />
                    <div>
                      <div className="font-semibold text-foreground text-sm">{t.name}</div>
                      <div className="text-muted-foreground text-xs">{t.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <div className="text-center mt-10">
              <Button asChild size="lg" className="text-base px-10 py-4 h-14">
                <Link to="/contatto">
                  Leggi Altre Recensioni
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Service Locations — Per-location JSON-LD schema */}
      {(() => {
        const locations = [
          {
            city: "Fondi",
            desc: "La nostra sede principale a Fondi (LT). Assistenza completa per dichiarazioni fiscali, ISEE, pensioni e tutte le pratiche INPS per cittadini e famiglie.",
            ratingValue: "4.9",
            reviewCount: 42,
            postalCode: "04022",
            lat: 41.3572,
            lng: 13.4283,
            wiki: "https://it.wikipedia.org/wiki/Fondi",
          },
          {
            city: "Terracina",
            desc: "Servizi CAF e Patronato a Terracina. Supporto professionale per lavoratori dipendenti, autonomi e pensionati della zona costiera.",
            ratingValue: "4.8",
            reviewCount: 31,
            postalCode: "04019",
            lat: 41.2919,
            lng: 13.2482,
            wiki: "https://it.wikipedia.org/wiki/Terracina",
          },
          {
            city: "Cisterna di Latina",
            desc: "Assistenza fiscale e previdenziale a Cisterna di Latina. Consulenze personalizzate per privati, famiglie e piccole imprese della provincia.",
            ratingValue: "4.7",
            reviewCount: 27,
            postalCode: "04012",
            lat: 41.5919,
            lng: 12.8290,
            wiki: "https://it.wikipedia.org/wiki/Cisterna_di_Latina",
          },
        ];

        const locationSchemas = locations.map((loc) => ({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": `CAF Patronato ${loc.city}`,
          "alternateName": `CAF Patronato – Assistenza Fiscale ${loc.city}`,
          "image": heroFinanceDark,
          "url": siteUrl,
          "telephone": "+393285561774",
          "priceRange": "€",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": loc.city,
            "addressLocality": loc.city,
            "addressRegion": "Lazio",
            "postalCode": loc.postalCode,
            "addressCountry": "IT",
          },
          "areaServed": [
            { "@type": "City", "name": loc.city, "sameAs": loc.wiki },
            { "@type": "AdministrativeArea", "name": `Provincia di Latina` },
          ],
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": loc.lat,
            "longitude": loc.lng,
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": loc.ratingValue,
            "reviewCount": String(loc.reviewCount),
            "bestRating": "5",
            "worstRating": "1",
          },
          "openingHours": "Mo-Fr 09:00-18:00",
          "serviceType": ["CAF 730 Online", "Calcolo ISEE", "Patronato INPS", "Dichiarazione Redditi"],
        }));

        return (
          <section className="bg-background seo-parent-block" title="CAF vicino a me – Sedi CAF Patronato a Fondi, Terracina e Cisterna di Latina, assistenza fiscale locale">
            {/* Per-location JSON-LD schemas */}
            {locationSchemas.map((schema, i) => (
              <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            ))}
            <div className="container py-20 md:py-28">
              <Reveal>
                <div className="text-center mb-14">
                  <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">CAF VICINO A ME</p>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4" title="CAF Patronato vicino a me – Sedi a Fondi, Terracina e Cisterna di Latina per 730, ISEE e pratiche INPS">
                    <strong title="CAF Patronato – Centro assistenza fiscale e previdenziale">
                      <Link to="/chi-siamo" title="CAF Patronato – Chi siamo" className="text-foreground hover:text-primary transition-colors">CAF Patronato</Link>
                    </strong> Vicino a Me –{" "}
                    <strong title="CAF Patronato Fondi – Sede principale">
                      <Link to="/contatto/fondi" title="CAF Patronato Fondi – Contatti sede Fondi" className="text-foreground hover:text-primary transition-colors">Fondi</Link>
                    </strong>,{" "}
                    <strong title="CAF Patronato Terracina – Sede Terracina">
                      <Link to="/contatto/terracina" title="CAF Patronato Terracina – Contatti sede Terracina" className="text-foreground hover:text-primary transition-colors">Terracina</Link>
                    </strong> e{" "}
                    <strong title="CAF Patronato Cisterna di Latina – Sede Cisterna di Latina">
                      <Link to="/contatto/cisterna-di-latina" title="CAF Patronato Cisterna di Latina – Contatti sede Cisterna di Latina" className="text-foreground hover:text-primary transition-colors">Cisterna di Latina</Link>
                    </strong>
                  </h2>
                  <p className="text-body-text max-w-2xl mx-auto mb-6">
                    Cerchi un CAF vicino a me o un ufficio CAF nelle vicinanze? Siamo il centro CAF di riferimento nella provincia di Latina con sedi a Fondi, Terracina e Cisterna di Latina.
                  </p>
                  <div className="inline-flex items-center gap-3">
                    <a href="tel:+393285561774" className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-[0_2px_10px_rgba(84,180,53,0.3)] hover:bg-primary-hover transition-all duration-300" title="Chiama CAF Patronato Fondi – Assistenza telefonica immediata">
                      <Phone className="h-4 w-4" /> Chiama
                    </a>
                    <a href="/contatto/" className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-transparent text-primary font-semibold text-sm border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300" title="Contatta CAF Patronato Fondi – Richiedi informazioni">
                      <Mail className="h-4 w-4" /> Contatta
                    </a>
                  </div>
                </div>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {locations.map((loc, i) => (
                  <Reveal key={loc.city} delay={i * 150}>
                    <div className="bg-card border border-border rounded-lg p-8 hover:shadow-lg hover:bg-accent hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full" title={`CAF Patronato ${loc.city} – Assistenza fiscale e previdenziale, 730, ISEE e patronato INPS`}>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3" title={`CAF Patronato ${loc.city} – Centro assistenza fiscale e previdenziale`}>
                        <strong title={`CAF Patronato ${loc.city} – Servizi 730, ISEE e pratiche INPS a ${loc.city}`}>
                          <Link to="/contatto" title={`CAF Patronato ${loc.city} – Prenota appuntamento per assistenza fiscale`} className="text-foreground hover:text-primary transition-colors">
                            CAF Patronato {loc.city}
                          </Link>
                        </strong>
                      </h3>
                      <p className="text-sm text-body-text leading-relaxed mb-6 flex-1 seo-container-para" title={`Servizi CAF a ${loc.city} – Assistenza fiscale 730, ISEE, pensioni INPS`}>{loc.desc}</p>
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-foreground mb-1">Valutazione: {loc.ratingValue}/5 ({loc.reviewCount} Recensioni)</p>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className="h-5 w-5 fill-primary text-primary" />
                          ))}
                        </div>
                      </div>
                      <Button asChild className="w-full">
                        <Link to="/contatto" title={`Prenota appuntamento CAF ${loc.city} – Assistenza fiscale e previdenziale`}>
                          {loc.city} — Servizi CAF
                        </Link>
                      </Button>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={300}>
                <div className="text-center mt-10">
                  <Button asChild variant="outline" size="lg" className="text-base px-10 py-4 h-14 border-2">
                    <Link to="/contatto" title="Scopri tutte le sedi CAF Patronato nella provincia di Latina">
                      Scopri Tutte le Sedi
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </Reveal>
            </div>
          </section>
        );
      })()}

      {/* CTA Band */}
      <CTABand
        title="Hai bisogno di assistenza?"
        subtitle="Contattaci oggi per una consulenza gratuita. Il nostro team è pronto ad aiutarti."
      />

      <Footer />
    </div>
  );
};

export default Index;
