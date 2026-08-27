import { HeartHandshake, GraduationCap, Users } from "lucide-react";
import type { ReactNode } from "react";
import SeoLink from "@/components/arefin/SeoLink";

interface Item {
  icon: typeof HeartHandshake;
  title: string;
  href: string;
  titleAttr: string;
  desc: ReactNode;
}

const items: Item[] = [
  {
    icon: HeartHandshake,
    title: "Surgery Assistance",
    href: "/surgery-assistance-program/",
    titleAttr:
      "Surgery assistance program — guidance and case-by-case financial aid for patients needing complex liver, gallbladder, and pancreatic surgery in Dhaka",
    desc: (
      <>
        We offer guidance and support for patients in need of{" "}
        <SeoLink
          to="/complex-liver-gallbladder-pancreatic-surgery/"
          title="Complex liver, gallbladder, and pancreatic surgery in Dhaka — high-acuity hepatobiliary procedures by Dr. Murshidul Arefin"
          bold
        >
          complex liver, gallbladder, and pancreatic surgeries
        </SeoLink>
        , helping them access the right care and{" "}
        <SeoLink
          to="/surgery-financial-assistance/"
          title="Financial assistance for timely hepatobiliary surgery in Dhaka — case-by-case aid pathways for patients who cannot afford to delay treatment"
          bold
        >
          financial assistance for timely treatment.
        </SeoLink>
      </>
    ),
  },
  {
    icon: GraduationCap,
    title: "Health Education",
    href: "/liver-health-education/",
    titleAttr:
      "Liver health education in Bangladesh — awareness programs, early-detection seminars, and prevention guidance led by Dr. Arefin's team",
    desc: (
      <>
        Through awareness programs and liver health seminars, Dr. Arefin and his team{" "}
        <SeoLink
          to="/liver-disease-prevention-education/"
          title="Educate the community about early detection, lifestyle management, and prevention of liver disease in Bangladesh"
          bold
        >
          educate the community about early detection, lifestyle management, and prevention
        </SeoLink>{" "}
        of liver diseases in Bangladesh.
      </>
    ),
  },
  {
    icon: Users,
    title: "Support Groups",
    href: "/patient-support-groups/",
    titleAttr:
      "Patient support groups for hepatobiliary and liver transplant patients in Dhaka — peer connections, family support, and recovery community",
    desc: (
      <>
        Our patient network connects individuals and families who are undergoing{" "}
        <SeoLink
          to="/hepatobiliary-liver-transplant-treatment/"
          title="Hepatobiliary or liver transplant treatments in Dhaka — coordinated surgical and recovery care for patients and families"
          bold
        >
          hepatobiliary or liver transplant treatments
        </SeoLink>
        , creating a{" "}
        <SeoLink
          to="/patient-emotional-support-recovery/"
          title="A safe space for emotional support and recovery — peer community for hepatobiliary and liver transplant patients"
          bold
        >
          safe space for emotional support and recovery.
        </SeoLink>
      </>
    ),
  },
];

const delays = ["hero-d-0", "hero-d-100", "hero-d-200"];

/**
 * Initiatives — Variation A (Editorial Minimal)
 * Section bg: light green. Cards: dark emerald-tinted.
 * Per section ↔ card contrast rule.
 */
const InitiativesV04LightA = () => {
  return (
    <section
      className="arefin arefin-section-divider init-a-section relative"
      aria-label="Our Initiatives"
    >
      <div className="container max-w-[1248px] mx-auto px-6 py-14 md:py-20 lg:py-28">
        {/* Header */}
        <div className="text-center mb-14 md:mb-18 hero-anim-fade-up hero-d-0">
          <span className="init-a-label">OUR PROGRAMS</span>
          <h2 className="init-a-heading font-arefin-heading text-fluid-h2 lg:text-[42px] leading-tight">
            Our Initiatives
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base init-a-intro">
            At Dr. Murshidul Arefin&apos;s Hepatobiliary &amp; Liver Care Center, our mission extends beyond the operation theater. We&apos;re committed to empowering patients and their families through <strong>education</strong>, <strong>compassion</strong>, and <strong>continuous support.</strong>
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <article
                key={it.title}
                className={`init-a-card hero-anim-fade-up ${delays[i]} group`}
              >
                <div className="init-a-icon-wrap" aria-hidden="true">
                  <Icon className="w-6 h-6 init-a-icon" strokeWidth={1.5} />
                </div>
                <span aria-hidden="true" className="init-a-bar" />
                <h3 className="init-a-title font-arefin-heading">
                  <SeoLink to={it.href} title={it.titleAttr} className="init-a-title-link">
                    {it.title}
                  </SeoLink>
                </h3>
                <p className="init-a-desc">{it.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InitiativesV04LightA;

