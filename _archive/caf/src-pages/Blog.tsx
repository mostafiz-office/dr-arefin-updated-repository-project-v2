import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTABand from "@/components/CTABand";
import { Reveal } from "@/hooks/useScrollReveal";
import { ArrowRight, Tag, Phone, Mail, MessageCircle } from "lucide-react";
import pageHeroBg from "@/assets/page-hero-bg.jpg";
import blog730 from "@/assets/blog/blog-730-guida.jpg";
import blogIsee from "@/assets/blog/blog-isee-famiglia.jpg";
import blogPensione from "@/assets/blog/blog-pensione-inps.jpg";
import blogDichiarazione from "@/assets/blog/blog-dichiarazione-online.jpg";
import blogBonus from "@/assets/blog/blog-bonus-fiscali.jpg";
import blogNaspi from "@/assets/blog/blog-naspi-guida.jpg";
import blogScadenze from "@/assets/blog/blog-scadenze-fiscali.jpg";
import blogRistrutturazione from "@/assets/blog/blog-ristrutturazione.jpg";
import blogConsulenza from "@/assets/blog/blog-consulenza-fiscale.jpg";

const categories = [
  { name: "Dichiarazioni Fiscali", slug: "dichiarazioni-fiscali", count: 8, titleAttr: "Articoli su Dichiarazioni Fiscali – 730, Redditi PF a Fondi" },
  { name: "ISEE e Bonus", slug: "isee-bonus", count: 6, titleAttr: "Articoli su ISEE e Bonus Sociali – Guida agevolazioni a Fondi e Latina" },
  { name: "Pensioni e Previdenza", slug: "pensioni-previdenza", count: 5, titleAttr: "Articoli su Pensioni INPS e Previdenza – Patronato Fondi" },
  { name: "Novità Fiscali", slug: "novita-fiscali", count: 4, titleAttr: "Novità Fiscali e Normative – Aggiornamenti CAF Patronato Fondi" },
  { name: "Guide Pratiche", slug: "guide-pratiche", count: 7, titleAttr: "Guide Pratiche CAF – Come compilare 730, ISEE e pratiche INPS" },
];

const blogPosts = [
  {
    title: "Guida Completa al Modello 730: Tutto Quello che Devi Sapere",
    excerpt: "Il Modello 730 è la dichiarazione dei redditi più utilizzata dai lavoratori dipendenti e pensionati in Italia. Scopri chi deve presentarlo, le scadenze e come ottenere il massimo rimborso.",
    date: "15 Marzo 2026",
    author: "Team CAF Fondi",
    slug: "/blog/guida-modello-730",
    image: blog730,
    alt: "Documenti fiscali e calcolatrice su scrivania – guida al modello 730",
    titleAttr: "Guida Completa al Modello 730 – CAF Patronato Fondi",
  },
  {
    title: "ISEE 2026: Come Calcolarlo e Quali Documenti Servono",
    excerpt: "L'ISEE è l'indicatore fondamentale per accedere a bonus e agevolazioni sociali. Ti spieghiamo passo dopo passo come preparare la DSU e ottenere la certificazione ISEE nel 2026.",
    date: "10 Marzo 2026",
    author: "Team CAF Fondi",
    slug: "/blog/isee-2026-guida",
    image: blogIsee,
    alt: "Famiglia italiana che esamina documenti finanziari insieme",
    titleAttr: "ISEE 2026: Come Calcolarlo – CAF Patronato Fondi",
  },
  {
    title: "Pensione INPS: Requisiti, Tempistiche e Come Fare Domanda",
    excerpt: "Pianificare la pensione richiede attenzione ai dettagli. Scopri i requisiti di età e contributi, le diverse tipologie di pensione INPS e come il nostro Patronato può assisterti.",
    date: "5 Marzo 2026",
    author: "Team CAF Fondi",
    slug: "/blog/pensione-inps-guida",
    image: blogPensione,
    alt: "Coppia anziana sorridente durante una consulenza pensionistica",
    titleAttr: "Pensione INPS: Requisiti e Domanda – Patronato Fondi",
  },
  {
    title: "Dichiarazione dei Redditi Online: La Guida Passo per Passo",
    excerpt: "Inviare la dichiarazione dei redditi online è oggi più semplice che mai. Ecco come compilare e trasmettere il tuo modello fiscale comodamente da casa con l'assistenza del nostro CAF.",
    date: "28 Febbraio 2026",
    author: "Team CAF Fondi",
    slug: "/blog/dichiarazione-redditi-online",
    image: blogDichiarazione,
    alt: "Mani che digitano al laptop con moduli fiscali sullo schermo",
    titleAttr: "Dichiarazione dei Redditi Online – CAF Patronato Fondi",
  },
  {
    title: "Bonus Fiscali 2026: Tutti i Bonus Disponibili e Come Richiederli",
    excerpt: "Il 2026 porta nuove opportunità fiscali per famiglie e lavoratori. Dai bonus casa alle agevolazioni per figli a carico, scopri tutti i benefici disponibili e i requisiti.",
    date: "20 Febbraio 2026",
    author: "Team CAF Fondi",
    slug: "/blog/bonus-fiscali-2026",
    image: blogBonus,
    alt: "Ufficio centro assistenza fiscale CAF in città italiana",
    titleAttr: "Bonus Fiscali 2026 – CAF Patronato Fondi",
  },
  {
    title: "NASpI 2026: Come Richiedere l'Indennità di Disoccupazione",
    excerpt: "Hai perso il lavoro involontariamente? La NASpI è l'indennità mensile di disoccupazione INPS. Scopri chi ne ha diritto, come fare domanda e quanto dura il sussidio nel 2026.",
    date: "15 Febbraio 2026",
    author: "Team CAF Fondi",
    slug: "/blog/naspi-disoccupazione-guida",
    image: blogNaspi,
    alt: "Giovane professionista che esamina documenti in un ufficio moderno",
    titleAttr: "NASpI 2026: Guida alla Disoccupazione – Patronato Fondi",
  },
  {
    title: "Scadenze Fiscali 2026: Il Calendario Completo",
    excerpt: "Non perdere nessuna scadenza fiscale importante. Abbiamo preparato il calendario completo 2026 con tutte le date chiave per dichiarazioni, versamenti e adempimenti obbligatori.",
    date: "8 Febbraio 2026",
    author: "Team CAF Fondi",
    slug: "/blog/scadenze-fiscali-2026",
    image: blogScadenze,
    alt: "Documenti fiscali organizzati su scrivania con pianta verde",
    titleAttr: "Scadenze Fiscali 2026 – Calendario CAF Patronato Fondi",
  },
  {
    title: "Bonus Ristrutturazione 2026: Detrazioni Fiscali per la Tua Casa",
    excerpt: "Stai pensando di ristrutturare casa? Scopri le detrazioni fiscali disponibili nel 2026 per interventi di recupero edilizio, risparmio energetico e adeguamento sismico.",
    date: "1 Febbraio 2026",
    author: "Team CAF Fondi",
    slug: "/blog/bonus-ristrutturazione-2026",
    image: blogRistrutturazione,
    alt: "Interno di casa moderna con lavori di ristrutturazione in corso",
    titleAttr: "Bonus Ristrutturazione 2026 – CAF Patronato Fondi",
  },
  {
    title: "Consulenza Fiscale Personalizzata: Quando Affidarsi a un CAF",
    excerpt: "Non sempre è facile orientarsi tra normative fiscali in continua evoluzione. Scopri i vantaggi di affidarsi a un Centro di Assistenza Fiscale per una consulenza su misura.",
    date: "25 Gennaio 2026",
    author: "Team CAF Fondi",
    slug: "/blog/consulenza-fiscale-caf",
    image: blogConsulenza,
    alt: "Consulente fiscale che spiega grafici finanziari a un cliente",
    titleAttr: "Consulenza Fiscale Personalizzata – CAF Patronato Fondi",
  },
];

const jsonLdBlog = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Blog CAF Patronato Fondi",
  "description": "Articoli, guide e novità su dichiarazioni fiscali 730, ISEE, pensioni INPS e assistenza previdenziale a Fondi, Terracina e Latina.",
  "url": "https://fondi-assist-core.lovable.app/blog",
  "publisher": {
    "@type": "Organization",
    "name": "CAF Patronato Fondi",
    "url": "https://fondi-assist-core.lovable.app",
  },
};

const Blog = () => {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBlog) }} />
      <Header />

      {/* Atto-style Blog Hero — Image Overlay + SEO Content + CTA Bar */}
      <section
        title="Blog CAF Fondi – Guide fiscali, ISEE, pensioni e novità normative"
        className="seo-page-parent-block relative overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${pageHeroBg})` }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(12, 40, 24, 0.88) 0%, rgba(17, 17, 17, 0.92) 100%)' }}
        />
        <div
          className="absolute top-0 left-0 right-0 z-[1]"
          style={{
            height: '6px',
            background: 'linear-gradient(to right, #C9FFF7 0%, #C9FFF7 25%, #FFB8B1 25%, #FFB8B1 50%, #C6CFFF 50%, #C6CFFF 75%, #FBE8A4 75%, #FBE8A4 100%)'
          }}
        />

        <div className="container relative z-[1] py-24 md:py-32 text-center flex flex-col items-center justify-center seo-parent-block">
          <Reveal>
            <h1
              className="font-bold text-white mb-8"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: '1.2', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
              title="Blog CAF Patronato Fondi – Articoli su 730, ISEE, pensioni INPS e assistenza fiscale a Fondi e Latina"
            >
              <Link to="/blog" title="Blog CAF Patronato Fondi – Guide Fiscali, ISEE e Pensioni" className="text-white hover:text-white transition-colors">
                Blog e Novità – Dichiarazioni Fiscali, ISEE, Pensioni e Assistenza dal CAF Patronato Fondi
              </Link>
            </h1>
          </Reveal>

          <Reveal delay={100}>
            <div className="seo-container-para text-left" style={{ color: '#CCCCCC', lineHeight: '1.85', fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)' }}>
              <p className="mb-5" style={{ color: '#CCCCCC' }}>
                Orientarsi nel mondo della{" "}
                <strong title="CAF Patronato Fondi – Centro assistenza fiscale e previdenziale a Fondi e Latina">
                  <Link to="/" title="Visita la homepage CAF Patronato Fondi" className="text-white hover:text-primary transition-colors">assistenza fiscale</Link>
                </strong>{" "}
                può essere complesso, ma sei nel posto giusto. Siamo il punto di riferimento per consulenza fiscale e previdenziale, tagliando la confusione per offrirti consigli genuini e competenti. Ti aiutiamo a gestire tutto, dalla{" "}
                <strong title="Dichiarazione dei redditi 730 – Compilazione e invio telematico a Fondi">
                  <Link to="/caf-730-online" title="CAF 730 Online a Fondi – Prenotazione dichiarazione redditi" className="text-white hover:text-primary transition-colors">dichiarazione 730</Link>
                </strong>{" "}
                al calcolo{" "}
                <strong title="Calcolo ISEE – Elaborazione DSU per bonus e agevolazioni sociali a Fondi">
                  <Link to="/caf-isee" title="Calcolo ISEE a Fondi – Prenotazione online" className="text-white hover:text-primary transition-colors">ISEE</Link>
                </strong>{" "}
                fino alle pratiche{" "}
                <strong title="Patronato INPS – Pensioni, NASpI e pratiche previdenziali a Fondi">
                  <Link to="/patronato-inps" title="Patronato INPS a Fondi – Pensioni e assistenza previdenziale" className="text-white hover:text-primary transition-colors">Patronato INPS</Link>
                </strong>.
              </p>
              <p style={{ color: '#CCCCCC' }}>
                Siamo gli esperti di fiducia a{" "}
                <strong title="CAF Patronato Fondi – Sede principale assistenza fiscale">
                  <Link to="/contatto" title="Contattaci – Sede di Fondi" className="text-white hover:text-primary transition-colors">Fondi</Link>
                </strong>, così come a{" "}
                <strong title="CAF Patronato Terracina – Assistenza fiscale e previdenziale">
                  <Link to="/contatto-terracina" title="Sede CAF Patronato Terracina" className="text-white hover:text-primary transition-colors">Terracina</Link>
                </strong>{" "}
                e{" "}
                <strong title="CAF Patronato Cisterna di Latina – Servizi fiscali e previdenziali">
                  <Link to="/contatto-cisterna" title="Sede CAF Patronato Cisterna" className="text-white hover:text-primary transition-colors">Cisterna di Latina</Link>
                </strong>.{" "}
                Come specialisti in{" "}
                <strong title="Dichiarazione Redditi – Consulenza fiscale personalizzata a Fondi e Latina">
                  <Link to="/caf-dichiarazione-redditi" title="CAF Dichiarazione Redditi a Fondi" className="text-white hover:text-primary transition-colors">dichiarazioni dei redditi</Link>
                </strong>{" "}
                e{" "}
                <strong title="Tutti i servizi CAF e Patronato a Fondi">
                  <Link to="/servizi" title="Servizi CAF e Patronato – Fondi" className="text-white hover:text-primary transition-colors">servizi CAF</Link>
                </strong>, possiamo risolvere ogni tua esigenza fiscale e previdenziale.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="flex items-center justify-center mt-8">
              <div className="inline-flex items-center rounded-full overflow-hidden" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                <a
                  href="https://call.rasia.pro/call-caff"
                  title="Chiama CAF Patronato Fondi"
                  className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-all"
                  style={{ backgroundColor: '#54B435' }}
                  onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.15)')}
                  onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
                >
                  <Phone className="h-4 w-4" />
                  Chiama
                </a>
                <a
                  href="https://clink.rasia.pro/whatsapp-caf"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="WhatsApp CAF Patronato Fondi"
                  className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-all"
                  style={{ backgroundColor: '#54B435' }}
                  onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.15)')}
                  onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
                <a
                  href="mailto:info@cafpatronatofondi.com"
                  title="Email CAF Patronato Fondi"
                  className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-all"
                  style={{ backgroundColor: '#54B435' }}
                  onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.15)')}
                  onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-background seo-parent-block" title="Categorie Blog CAF Fondi – Dichiarazioni fiscali, ISEE, pensioni e guide pratiche">
        <div className="container py-12">
          <Reveal>
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/blog?categoria=${cat.slug}`}
                  title={cat.titleAttr}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Tag className="h-3.5 w-3.5" />
                  {cat.name}
                  <span className="text-xs opacity-60">({cat.count})</span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Blog Posts Grid — Atto-style cards */}
      <section className="bg-background seo-page-parent-block" title="Articoli Blog CAF Patronato Fondi – Guide su 730, ISEE, pensioni e bonus fiscali">
        <div className="container py-16 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
            {blogPosts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 80}>
                <article
                  className="group bg-card overflow-hidden flex flex-col h-full cursor-pointer rounded-xl"
                  style={{
                    border: '1px solid transparent',
                    borderLeft: '4px solid transparent',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                    transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                  }}
                  title={post.titleAttr}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderLeftColor = 'hsl(var(--primary-hover))';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderLeftColor = 'transparent';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
                  }}
                >
                  {/* Thumbnail — square 300px, no zoom */}
                  <Link to={post.slug} title={post.titleAttr} className="block overflow-hidden" style={{ height: '300px' }}>
                    <img
                      src={post.image}
                      alt={post.alt}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="font-bold text-foreground mb-2.5 leading-snug text-lg group-hover:text-primary transition-colors group-hover:[text-shadow:0.6px_0.4px_0px_rgb(40,61,5)]" title={post.titleAttr}>
                      <Link to={post.slug} title={post.titleAttr} className="text-foreground group-hover:text-primary transition-colors no-underline group-hover:[text-shadow:0.6px_0.4px_0px_rgb(40,61,5)]">
                        {post.title}
                      </Link>
                    </h2>

                    <div className="flex items-center gap-2 mb-3.5 text-sm font-semibold group-hover:text-primary transition-colors" style={{ color: '#379237' }}>
                      <span className="group-hover:[text-shadow:0.6px_0.4px_0px_rgb(40,61,5)] transition-all">{post.date}</span>
                      <span style={{ color: '#d1d5db', fontWeight: 400 }}>|</span>
                      <span className="group-hover:[text-shadow:0.6px_0.4px_0px_rgb(40,61,5)] transition-all">{post.author}</span>
                    </div>

                    <p className="text-sm text-body-text leading-relaxed mb-5 flex-1">
                      {post.excerpt}
                    </p>

                    <Link
                      to={post.slug}
                      title={`Leggi di più: ${post.title}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-3 transition-all mt-auto no-underline group-hover:[text-shadow:0.6px_0.4px_0px_rgb(40,61,5)]"
                    >
                      Leggi di più
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Servizi Correlati */}
      <section className="bg-accent seo-parent-block" title="Servizi Correlati – CAF 730, ISEE e Patronato INPS a Fondi">
        <div className="container py-16 md:py-20">
          <Reveal>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground" title="Servizi Correlati CAF Patronato Fondi – 730, ISEE e Patronato INPS">
                <strong title="Servizi CAF Patronato Fondi – Assistenza fiscale completa">
                  <Link to="/servizi" title="Tutti i Servizi CAF e Patronato a Fondi" className="text-foreground hover:text-primary transition-colors">
                    Servizi Correlati
                  </Link>
                </strong>
              </h2>
            </div>
          </Reveal>
          <div className="paragraph-parent-block seo-parent-block seo-page-block">
            <div className="seo-container-para text-center text-body-text max-w-3xl mx-auto leading-relaxed">
              Scopri i nostri servizi di assistenza fiscale:{" "}
              <strong title="CAF 730 Online – Compilazione e invio telematico dichiarazione redditi a Fondi">
                <Link to="/caf-730-online" title="CAF 730 Online a Fondi – Prenotazione dichiarazione redditi" className="text-primary hover:underline">CAF 730 Online</Link>
              </strong>,{" "}
              <strong title="Calcolo ISEE – Elaborazione DSU per bonus e agevolazioni sociali a Fondi">
                <Link to="/caf-isee" title="Calcolo ISEE a Fondi – Prenotazione online" className="text-primary hover:underline">Calcolo ISEE</Link>
              </strong>,{" "}
              <strong title="Patronato INPS – Pensioni, NASpI e pratiche previdenziali a Fondi">
                <Link to="/patronato-inps" title="Patronato INPS a Fondi – Pensioni e assistenza previdenziale" className="text-primary hover:underline">Patronato INPS</Link>
              </strong> e{" "}
              <strong title="Dichiarazione Redditi – Consulenza fiscale personalizzata a Fondi e Latina">
                <Link to="/caf-dichiarazione-redditi" title="CAF Dichiarazione Redditi a Fondi" className="text-primary hover:underline">Dichiarazione Redditi</Link>
              </strong>.
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Hai bisogno di assistenza fiscale?"
        subtitle="Prenota un appuntamento oggi. Il nostro team CAF è pronto ad aiutarti."
      />

      <Footer />
    </div>
  );
};

export default Blog;
