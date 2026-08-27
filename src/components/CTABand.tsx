import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/hooks/useScrollReveal";
import { Phone, Mail } from "lucide-react";

interface CTABandProps {
  title: string;
  subtitle: string;
}

const CTABand = ({ title, subtitle }: CTABandProps) => {
  return (
    <section className="bg-cta-bg seo-parent-block" title={`${title} – CAF Patronato Fondi, assistenza fiscale a Fondi, Terracina e Latina`}>
      <div className="container py-24 md:py-28 text-center">
        <Reveal>
          <h2 className="text-2xl md:text-3xl lg:text-[2.75rem] font-bold text-white mb-5 leading-tight max-w-[40rem] mx-auto text-shadow-light" title={`${title} – Prenota appuntamento CAF Patronato Fondi`}>
            {title}
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="text-base md:text-lg mb-10 max-w-xl mx-auto seo-container-para text-white/70" title={subtitle}>
            {subtitle}
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="relative overflow-hidden">
              <Link to="/contatto" title="Prenota appuntamento CAF a Fondi – Assistenza fiscale immediata">
                <span className="flex items-center justify-center gap-2 transition-all duration-300 group-hover:translate-y-[-100%] group-hover:opacity-0 peer-hover:translate-y-[-100%] peer-hover:opacity-0 [a:hover_&]:translate-y-[-100%] [a:hover_&]:opacity-0">
                  Prenota Appuntamento <span aria-hidden="true">→</span>
                </span>
                <span className="absolute inset-0 flex items-center justify-center gap-2 transition-all duration-300 translate-y-[100%] opacity-0 [a:hover_&]:translate-y-0 [a:hover_&]:opacity-100">
                  <Phone className="size-[18px]" /> Chiama Ora
                </span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="relative overflow-hidden border-2 border-white/60 text-white bg-white/[0.08] hover:bg-white hover:text-foreground hover:border-white">
              <Link to="/contatto" title="Contattaci – CAF Patronato Fondi, telefono e email per informazioni">
                <span className="flex items-center justify-center gap-2 transition-all duration-300 [a:hover_&]:translate-y-[-100%] [a:hover_&]:opacity-0">
                  Contattaci
                </span>
                <span className="absolute inset-0 flex items-center justify-center gap-2 transition-all duration-300 translate-y-[100%] opacity-0 [a:hover_&]:translate-y-0 [a:hover_&]:opacity-100">
                  <Mail className="size-[18px]" /> Scrivici
                </span>
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CTABand;
