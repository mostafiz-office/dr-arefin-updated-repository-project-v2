import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/hooks/useScrollReveal";
import {
  ArrowRight,
  Shield,
  FileText,
  Calculator,
  Users,
  CheckCircle,
  TrendingUp,
  Award,
  Phone,
  Euro,
  Building2,
  HeartHandshake,
} from "lucide-react";
import heroFinance1 from "@/assets/hero-finance-1.png";
import heroFinance2 from "@/assets/hero-finance-2.png";
import heroFinance3 from "@/assets/hero-finance-3.png";
import heroFinance4 from "@/assets/hero-finance-4.png";

/* Highlighted keyword box component */
const Highlight = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`inline-block px-4 py-1 rounded-lg bg-primary/15 border border-primary/30 text-primary ${className}`}>
    {children}
  </span>
);

const HighlightDark = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`inline-block px-4 py-1 rounded-lg bg-white/10 border border-white/20 text-white ${className}`}>
    {children}
  </span>
);

/* ─────────────────────── VARIANT 1 ─────────────────────── */
/* Clean white split: bold text with highlighted keywords + 3D illustration right + floating badges */
const HeroVariant1 = () => (
  <section className="relative overflow-hidden bg-background min-h-[90vh] flex items-center">
    {/* Subtle grid pattern */}
    <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
      backgroundSize: "60px 60px",
    }} />

    <div className="container relative py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left: Text */}
        <div>
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20 mb-8">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-primary">🔥 Consulenza Gratuita Disponibile</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold text-foreground leading-[1.12] mb-6">
              Come{" "}
              <Highlight>dichiarazioni</Highlight>
              <br className="hidden md:block" />
              {" "}e <Highlight>pensioni</Highlight> trovano
              <br />
              soluzione con noi
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg">
              730, ISEE, pensioni e pratiche INPS — oltre 20 anni di esperienza
              al servizio delle famiglie di Fondi, Terracina e Latina.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button asChild size="lg" className="text-base px-10 py-4 h-14 shadow-lg shadow-primary/20 rounded-xl">
                <Link to="/contatto">
                  Prenota Consulenza
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-8 py-4 h-14 rounded-xl">
                <Link to="/servizi">Scopri i Servizi</Link>
              </Button>
            </div>
          </Reveal>

          {/* Trust row */}
          <Reveal delay={400}>
            <div className="flex items-center gap-6 border-t border-border pt-6">
              {[
                { icon: Users, val: "5.000+", label: "Clienti" },
                { icon: FileText, val: "15.000+", label: "Pratiche" },
                { icon: Award, val: "20+", label: "Anni" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center">
                    <s.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">{s.val}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right: Illustration with floating cards */}
        <Reveal direction="right">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden bg-accent/50 p-6">
              <img src={heroFinance1} alt="Servizi fiscali italiani" className="w-full h-auto object-contain rounded-2xl" />
            </div>

            {/* Floating badge top-right */}
            <div className="absolute -top-4 -right-4 bg-card border border-border rounded-2xl p-4 shadow-xl animate-[bounce_3s_ease-in-out_infinite]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Euro className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">€ Risparmio</div>
                  <div className="text-xs text-muted-foreground">Garantito</div>
                </div>
              </div>
            </div>

            {/* Floating badge bottom-left */}
            <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground rounded-2xl p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6" />
                <div>
                  <div className="text-sm font-bold">CAF Autorizzato</div>
                  <div className="text-xs opacity-80">Certificazione ufficiale</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ─────────────────────── VARIANT 2 ─────────────────────── */
/* Dark cinematic: huge bold text with highlighted keywords, illustration overlay, floating stats */
const HeroVariant2 = () => (
  <section className="relative overflow-hidden min-h-[100vh] flex items-center" style={{ background: "linear-gradient(165deg, #0a0a0a 0%, #0d1f0d 60%, #1a2e1a 100%)" }}>
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
              CAF & Patronato • Dal 2005
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-8">
              Come{" "}
              <HighlightDark>fiscalità</HighlightDark>
              <br />
              e <HighlightDark>previdenza</HighlightDark>
              <br />
              lavorano per te
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-lg text-white/50 leading-relaxed mb-10 max-w-lg">
              Dichiarazioni dei redditi, ISEE, pensioni e pratiche INPS.
              Da oltre 20 anni il punto di riferimento a Fondi, Terracina e Latina.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button asChild size="lg" className="text-base px-10 py-5 h-16 shadow-2xl shadow-primary/30 rounded-xl text-lg">
                <Link to="/contatto">
                  Prenota Appuntamento
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" className="text-base px-10 py-5 h-16 bg-white/5 text-white border border-white/15 hover:bg-white/10 backdrop-blur-sm rounded-xl">
                <Link to="/servizi">Esplora Servizi</Link>
              </Button>
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

        {/* Right: dark illustration with floating elements */}
        <Reveal direction="right">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden">
              <img src={heroFinance4} alt="Servizi fiscali" className="w-full h-auto object-contain" />
            </div>

            {/* Floating notification card */}
            <div className="absolute top-6 -left-6 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">730 Completato</div>
                  <div className="text-xs text-white/50">Rimborso in arrivo</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ─────────────────────── VARIANT 3 ─────────────────────── */
/* Light card style: centered text with keyword boxes, illustration below in a rounded card */
const HeroVariant3 = () => (
  <section className="relative overflow-hidden min-h-[90vh] flex items-center" style={{ background: "linear-gradient(180deg, hsl(var(--accent)) 0%, hsl(var(--background)) 100%)" }}>
    <div className="container relative py-16 md:py-24">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/25 bg-background mb-8 shadow-sm">
            <HeartHandshake className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Al tuo fianco dal 2005</span>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.1] mb-6">
            Il tuo{" "}
            <Highlight>futuro fiscale</Highlight>
            <br />
            inizia da qui
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
            Assistenza completa per dichiarazioni dei redditi, ISEE, pensioni e pratiche previdenziali.
            Professionisti certificati al servizio della tua tranquillità.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Button asChild size="lg" className="text-base px-10 py-4 h-14 shadow-lg shadow-primary/20 rounded-xl">
              <Link to="/contatto">
                Prenota Consulenza Gratuita
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-8 py-4 h-14 rounded-xl">
              <a href="tel:+393285561774">
                <Phone className="mr-2 h-5 w-5" />
                Chiama Ora
              </a>
            </Button>
          </div>
        </Reveal>
      </div>

      {/* Illustration in rounded card with floating elements */}
      <Reveal delay={400}>
        <div className="relative max-w-5xl mx-auto">
          <div className="bg-background rounded-3xl shadow-2xl border border-border overflow-hidden p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <img src={heroFinance3} alt="Assistenza fiscale per famiglie" className="w-full h-auto rounded-2xl" />
              <div className="space-y-5">
                {[
                  { icon: FileText, title: "Mod. 730 & Redditi", desc: "Dichiarazioni fiscali complete con massimo rimborso" },
                  { icon: Calculator, title: "ISEE & DSU", desc: "Calcolo e certificazione per bonus e agevolazioni" },
                  { icon: Shield, title: "Pensioni INPS", desc: "Pratiche pensionistiche e previdenziali" },
                  { icon: Building2, title: "Successioni", desc: "Gestione pratiche ereditarie e catastali" },
                ].map((s) => (
                  <div key={s.title} className="flex items-start gap-4 p-4 rounded-xl hover:bg-accent transition-colors">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <s.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">{s.title}</div>
                      <div className="text-xs text-muted-foreground">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating stats */}
          <div className="absolute -top-5 right-8 bg-primary text-primary-foreground rounded-2xl px-5 py-3 shadow-xl">
            <div className="text-lg font-bold">5.000+</div>
            <div className="text-xs opacity-80">Clienti soddisfatti</div>
          </div>
          <div className="absolute -bottom-5 left-8 bg-card border border-border rounded-2xl px-5 py-3 shadow-xl">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <div>
                <div className="text-sm font-bold text-foreground">98% Successo</div>
                <div className="text-xs text-muted-foreground">Pratiche approvate</div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ─────────────────────── VARIANT 4 ─────────────────────── */
/* Bold asymmetric: giant text left with keyword highlights, full illustration right, minimal */
const HeroVariant4 = () => (
  <section className="relative overflow-hidden min-h-[90vh] flex items-center bg-background">
    {/* Vertical accent bar */}
    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary" />

    <div className="container relative py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left: 7 cols */}
        <div className="lg:col-span-7">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-primary" />
              CAF Patronato Fondi
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.08] mb-8">
              Gestire{" "}
              <Highlight>tasse</Highlight>
              <br />
              e <Highlight>previdenza</Highlight>
              <br />
              con certezza.
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg">
              Servizi fiscali e previdenziali su misura per privati e famiglie.
              Da 20 anni al servizio della comunità di Fondi, Terracina e Latina.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button asChild size="lg" className="text-base px-10 py-5 h-16 shadow-xl shadow-primary/20 rounded-xl">
                <Link to="/contatto">
                  Inizia Ora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="text-base px-8 py-5 h-16 text-foreground hover:text-primary">
                <a href="tel:+393285561774">
                  <Phone className="mr-2 h-5 w-5" />
                  328 556 1774
                </a>
              </Button>
            </div>
          </Reveal>

          {/* Mini service tags */}
          <Reveal delay={400}>
            <div className="flex flex-wrap gap-3">
              {["730 & Redditi", "ISEE", "Pensioni", "Successioni", "Bonus", "INPS"].map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full bg-accent text-xs font-semibold text-foreground border border-border">
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right: 5 cols - Illustration */}
        <Reveal direction="right" className="lg:col-span-5">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden bg-accent/30 p-4">
              <img src={heroFinance2} alt="Ufficio fiscale professionale" className="w-full h-auto rounded-2xl shadow-lg" />
            </div>

            {/* Overlapping accent card */}
            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground rounded-2xl p-5 shadow-2xl">
              <TrendingUp className="h-7 w-7 mb-2 opacity-80" />
              <div className="text-2xl font-bold">20+</div>
              <div className="text-sm opacity-80">Anni di esperienza</div>
            </div>

            {/* Top accent */}
            <div className="absolute -top-3 -right-3 w-20 h-20 rounded-2xl bg-accent border border-primary/20 flex items-center justify-center shadow-lg">
              <CheckCircle className="h-9 w-9 text-primary" />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ─────────────────────── SHOWCASE PAGE ─────────────────────── */
const HeroShowcase = () => {
  return (
    <div className="min-h-screen">
      {/* Header label */}
      <div className="bg-foreground text-background py-4 text-center sticky top-0 z-50">
        <p className="text-sm font-bold uppercase tracking-widest">Hero Section Showcase — Scegli la tua preferita</p>
      </div>

      {/* Variant 1 */}
      <div className="relative">
        <div className="absolute top-4 left-4 z-10 bg-foreground text-background px-4 py-2 rounded-full text-sm font-bold shadow-lg">
          Variante 1 — Split Layout con Keywords
        </div>
        <HeroVariant1 />
      </div>

      <div className="py-6 bg-muted text-center">
        <p className="text-sm text-muted-foreground">▼ Scorri per vedere la prossima variante ▼</p>
      </div>

      {/* Variant 2 */}
      <div className="relative">
        <div className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold shadow-lg">
          Variante 2 — Dark Cinematic
        </div>
        <HeroVariant2 />
      </div>

      <div className="py-6 bg-muted text-center">
        <p className="text-sm text-muted-foreground">▼ Scorri per vedere la prossima variante ▼</p>
      </div>

      {/* Variant 3 */}
      <div className="relative">
        <div className="absolute top-4 left-4 z-10 bg-foreground text-background px-4 py-2 rounded-full text-sm font-bold shadow-lg">
          Variante 3 — Card Centrata con Servizi
        </div>
        <HeroVariant3 />
      </div>

      <div className="py-6 bg-muted text-center">
        <p className="text-sm text-muted-foreground">▼ Scorri per vedere la prossima variante ▼</p>
      </div>

      {/* Variant 4 */}
      <div className="relative">
        <div className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold shadow-lg">
          Variante 4 — Asymmetrico Bold
        </div>
        <HeroVariant4 />
      </div>

      {/* Footer */}
      <div className="bg-foreground text-background py-10 text-center">
        <p className="text-lg font-semibold mb-2">Quale preferisci?</p>
        <p className="text-sm opacity-60">Dimmi il numero (1, 2, 3 o 4) e lo applicherò alla homepage</p>
      </div>
    </div>
  );
};

export default HeroShowcase;
