import { type LucideIcon } from "lucide-react";
import { Reveal } from "@/hooks/useScrollReveal";

interface ContactInfoItem {
  icon: LucideIcon;
  title: string;
  value: string;
  href: string | null;
  titleAttr: string;
}

interface ContactInfoCardsProps {
  items: ContactInfoItem[];
}

const ContactInfoCards = ({ items }: ContactInfoCardsProps) => (
  <div className="flex flex-wrap justify-center gap-6 mb-20">
    {items.map((c, i) => (
      <div key={c.title} className="w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]">
        <Reveal delay={i * 100}>
          <div
            className="group bg-card border border-border rounded-xl px-6 py-10 text-center transition-all duration-300 hover:border-primary/40 hover:[box-shadow:0_3px_0_0_rgba(55,146,55,0.85)] hover:bg-primary/[0.03] h-full"
            title={c.titleAttr}
          >
            {/* Icon circle with gradient bg + inner ring + rotation */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center mx-auto mb-5 shadow-[inset_0_0_0_1px_rgba(84,180,53,0.15)] transition-all duration-300 group-hover:shadow-[inset_0_0_0_1.5px_rgba(84,180,53,0.35)] group-hover:from-primary/25 group-hover:to-primary/10">
              <c.icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[5deg]" />
            </div>

            {/* Title — turns green with green text-shadow on hover */}
            <h3
              className="font-semibold text-foreground text-[0.95rem] mb-1.5 transition-all duration-300 group-hover:text-primary group-hover:[text-shadow:1px_0.7px_0_rgba(0,0,0,0.85)]"
              title={c.titleAttr}
            >
              {c.title}
            </h3>

            {/* Value — links turn green, plain text gets darker */}
            {c.href ? (
              <a
                href={c.href}
                title={c.titleAttr}
                className="text-sm text-body-text transition-colors duration-300 group-hover:text-foreground"
              >
                {c.value}
              </a>
            ) : (
              <p className="text-sm text-body-text transition-colors duration-300 group-hover:text-foreground">{c.value}</p>
            )}
          </div>
        </Reveal>
      </div>
    ))}
  </div>
);

export default ContactInfoCards;
