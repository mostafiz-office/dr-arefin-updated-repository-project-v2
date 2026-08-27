import { type LucideIcon, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link?: string;
  titleAttr?: string;
}

const ServiceCard = ({ icon: Icon, title, description, link = "/servizi", titleAttr }: ServiceCardProps) => {
  const computedTitleAttr = titleAttr || `${title} a Fondi – ${description}`;

  return (
    <div className="bg-card border border-border rounded-lg p-7 md:p-8 hover:shadow-lg hover:bg-accent hover:border-primary/20 transition-all duration-300 group text-center seo-parent-block" title={computedTitleAttr}>
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2" title={computedTitleAttr}>
        <strong title={computedTitleAttr}>
          <Link to={link} title={computedTitleAttr} className="text-foreground hover:text-primary transition-all hover:text-shadow-heading">
            {title}
          </Link>
        </strong>
      </h3>
      <p className="text-sm leading-relaxed text-body-text mb-4 seo-container-para" title={description}>
        <Link to={link} title={computedTitleAttr} className="text-body-text hover:text-primary transition-colors">
          {description}
        </Link>
      </p>
      <Link
        to={link}
        title={`Scopri di più – ${title} CAF Patronato Fondi`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline group-hover:gap-2.5 transition-all"
      >
        Scopri di più <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
};

export default ServiceCard;
