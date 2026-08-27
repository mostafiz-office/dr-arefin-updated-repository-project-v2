import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FileText, Home, Stethoscope, Phone, Image, Newspaper, HelpCircle, MapPin, GraduationCap, Map } from "lucide-react";
import GlobalCTABand from "@/components/arefin/GlobalCTABand";

interface SitemapSection {
  title: string;
  icon: React.ReactNode;
  links: { label: string; href: string }[];
}

const sections: SitemapSection[] = [
  {
    title: "Main Pages",
    icon: <Home className="h-5 w-5" />,
    links: [
      { label: "Home", href: "/" },
      { label: "About Dr. Arefin", href: "/about/" },
      { label: "Contact & Book Appointment", href: "/contact/" },
    ],
  },
  {
    title: "Treatments",
    icon: <Stethoscope className="h-5 w-5" />,
    links: [
      { label: "Treatment Overview", href: "/treatment/" },
      { label: "Liver Surgery", href: "/treatment/liver-surgery/" },
      { label: "Gallbladder Surgery", href: "/treatment/gallbladder-surgery/" },
      { label: "Pancreatic Surgery", href: "/treatment/pancreatic-surgery/" },
      { label: "Biliary Tract Surgery", href: "/treatment/biliary-tract-surgery/" },
      { label: "Hepatobiliary Surgery", href: "/treatment/hepatobiliary-surgery/" },
      { label: "Laparoscopic Surgery", href: "/treatment/laparoscopic-surgery/" },
      { label: "Bile Duct Surgery", href: "/treatment/bile-duct-surgery/" },
      { label: "Liver Transplant Coordination", href: "/treatment/liver-transplant-coordination/" },
      { label: "Fatty Liver Management", href: "/treatment/fatty-liver-management/" },
      { label: "Spleen Surgery", href: "/treatment/spleen-surgery/" },
      { label: "Gallstone Removal", href: "/treatment/gallstone-removal/" },
      { label: "HPB Cancer Surgery", href: "/treatment/hpb-cancer-surgery/" },
      { label: "Hernia Surgery", href: "/treatment/hernia-surgery/" },
      { label: "Appendix Surgery", href: "/treatment/appendix-surgery/" },
    ],
  },
  {
    title: "Specialist Pages",
    icon: <MapPin className="h-5 w-5" />,
    links: [
      { label: "Best Hepatobiliary Surgeon Dhaka", href: "/best-hepatobiliary-surgeon-dhaka/" },
      { label: "Liver Surgeon Dhaka", href: "/treatment/liver-surgeon-dhaka/" },
      { label: "Popular Medical College Hospital", href: "/popular-medical-college-hospital/" },
      { label: "Gallstones Condition", href: "/conditions/gallstones/" },
    ],
  },
  {
    title: "Matrix & Area Pages",
    icon: <MapPin className="h-5 w-5" />,
    links: [
      { label: "Liver Surgery in Dhanmondi", href: "/treatment/liver-surgery-in-dhanmondi/" },
      { label: "Best Liver Surgeon in Dhanmondi", href: "/best-liver-surgeon-in-dhanmondi/" },
      { label: "Why Liver Surgery is Required", href: "/why-liver-surgery-is-required/" },
      { label: "Why Liver Surgery is Required in Dhanmondi", href: "/why-liver-surgery-is-required-in-dhanmondi/" },
    ],
  },
  {
    title: "Content & Media",
    icon: <Image className="h-5 w-5" />,
    links: [
      { label: "Photo Gallery", href: "/gallery/" },
      { label: "Articles & Blog", href: "/articles/" },
      { label: "Mentorship Programme", href: "/mentorship/" },
    ],
  },
  {
    title: "FAQ",
    icon: <HelpCircle className="h-5 w-5" />,
    links: [
      { label: "Where does Dr. Arefin see patients?", href: "/faq/where-does-dr-arefin-see-patients/" },
      { label: "What conditions does Dr. Arefin treat?", href: "/faq/what-conditions-does-dr-arefin-treat/" },
      { label: "How can I book a consultation?", href: "/faq/how-can-i-book-a-consultation/" },
      { label: "Does Dr. Arefin perform laparoscopic surgery?", href: "/faq/does-dr-arefin-perform-laparoscopic-surgery/" },
      { label: "Do you offer second opinions?", href: "/faq/do-you-offer-second-opinions/" },
      { label: "Is financial assistance available?", href: "/faq/is-financial-assistance-available/" },
      { label: "What is Dr. Arefin's specialty?", href: "/faq/what-is-dr-arefin-specialty/" },
      { label: "Where does Dr. Arefin practice?", href: "/faq/where-does-dr-arefin-practice/" },
      { label: "What are his qualifications?", href: "/faq/what-are-his-qualifications/" },
      { label: "Does he handle complex liver transplant cases?", href: "/faq/does-he-handle-complex-liver-transplant-cases/" },
      { label: "Best hepatobiliary surgeon in Dhanmondi", href: "/faq/best-hepatobiliary-surgeon-in-dhanmondi-dhaka/" },
      { label: "Chamber address and visiting hours", href: "/faq/chamber-address-and-visiting-hours-dhanmondi/" },
      { label: "Appointment fees and payment", href: "/faq/appointment-fees-and-payment-dhaka/" },
      { label: "International and out-of-Dhaka patients", href: "/faq/international-and-out-of-dhaka-patients/" },
      { label: "How much does liver surgery cost in Dhaka?", href: "/faq/how-much-does-liver-surgery-cost-in-dhaka/" },
      { label: "Who is the best liver surgeon in Dhanmondi?", href: "/faq/who-is-the-best-liver-surgeon-in-dhanmondi-dhaka/" },
      { label: "Where is liver transplant surgery available in Dhaka?", href: "/faq/where-is-liver-transplant-surgery-available-in-dhaka/" },
      { label: "How long does recovery after liver resection take?", href: "/faq/how-long-does-recovery-after-liver-resection-take-in-dhaka/" },
      { label: "Is laparoscopic liver surgery available in Dhanmondi?", href: "/faq/is-laparoscopic-liver-surgery-available-in-dhanmondi/" },
      { label: "Pre-operative tests for liver surgery", href: "/faq/pre-operative-tests-needed-before-liver-surgery-in-dhaka/" },
      { label: "Does Dr. Arefin treat liver cancer?", href: "/faq/does-dr-arefin-treat-liver-cancer-at-popular-medical-college-hospital/" },
      { label: "Best gallbladder surgeon in Dhanmondi", href: "/faq/best-gallbladder-surgeon-in-dhanmondi-dhaka/" },
      { label: "How much does gallbladder stone surgery cost?", href: "/faq/how-much-does-gallbladder-stone-surgery-cost-in-dhaka/" },
      { label: "Is laparoscopic cholecystectomy available in Dhanmondi?", href: "/faq/is-laparoscopic-cholecystectomy-available-in-dhanmondi/" },
      { label: "How long does recovery after gallbladder surgery take?", href: "/faq/how-long-does-recovery-after-gallbladder-surgery-take-in-dhaka/" },
      { label: "Treatment for empyema of the gallbladder", href: "/faq/treatment-for-empyema-of-the-gallbladder-in-dhaka/" },
      { label: "Does Dr. Arefin perform gallbladder cancer surgery?", href: "/faq/does-dr-arefin-perform-gallbladder-cancer-surgery-in-dhaka/" },
      { label: "Do gallbladder polyps need surgery?", href: "/faq/do-gallbladder-polyps-need-surgery-in-dhaka/" },
    ],
  },
  {
    title: "Brand & Authority",
    icon: <GraduationCap className="h-5 w-5" />,
    links: [
      { label: "Surgical Excellence", href: "/surgical-excellence/" },
      { label: "Advanced Hepatobiliary Treatment", href: "/advanced-hepatobiliary-treatment/" },
      { label: "Compassionate Patient Care", href: "/compassionate-patient-care/" },
      { label: "Dr. Murshidul Arefin", href: "/dr-murshidul-arefin/" },
      { label: "Surgery Assistance Program", href: "/surgery-assistance-program/" },
      { label: "Liver Health Education", href: "/liver-health-education/" },
      { label: "Patient Support Groups", href: "/patient-support-groups/" },
      { label: "Hepatobiliary Pancreatic Surgery Specialist", href: "/hepatobiliary-pancreatic-surgery-specialist/" },
      { label: "MBBS University of Dhaka", href: "/mbbs-university-of-dhaka/" },
      { label: "MS Hepatobiliary Surgery BSMMU", href: "/ms-hepatobiliary-surgery-bsmmu/" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <>
      <Helmet>
        <title>Sitemap — Dr. Murshidul Arefin</title>
        <meta
          name="description"
          content="Complete sitemap of Dr. Murshidul Arefin's website. Browse all pages: treatments, conditions, FAQs, gallery, articles, and more."
        />
        <link rel="canonical" href="https://drarefin-v4.lovable.app/sitemap/" />
      </Helmet>

      <section className="relative overflow-hidden bg-[#0b0f19] py-24 md:py-32">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgb(255 255 255) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative mx-auto max-w-[1248px] px-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-[hsl(142,72%,40%)]">
            <Map className="h-4 w-4" />
            <span>Site Directory</span>
          </div>
          <h1 className="type-h2 mx-auto mb-6 max-w-3xl text-white">
            Sitemap
          </h1>
          <p className="type-body mx-auto max-w-2xl text-[hsl(220,13%,65%)]">
            Browse every page on Dr. Murshidul Arefin's website — treatments, conditions, FAQs, gallery, articles, and specialist resources.
          </p>
        </div>
      </section>

      <section className="bg-[#0b0f19] py-16 md:py-24">
        <div className="mx-auto max-w-[1248px] px-6">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((sec) => (
              <div
                key={sec.title}
                className="rounded-xl border border-white/10 bg-[hsl(220,20%,8%)] p-6"
              >
                <div className="mb-4 flex items-center gap-2 text-[hsl(142,72%,40%)]">
                  {sec.icon}
                  <h2 className="type-h5 text-white">{sec.title}</h2>
                </div>
                <ul className="space-y-2">
                  {sec.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="group flex items-start gap-2 text-sm text-[hsl(220,13%,65%)] transition-colors hover:text-[hsl(142,72%,40%)]"
                      >
                        <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/20 group-hover:text-[hsl(142,72%,40%)]" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GlobalCTABand
        body="Can't find what you're looking for? Reach out directly and we'll guide you to the right information."
        primaryLabel="Contact Dr. Arefin"
        primaryTo="/contact/"
      />
    </>
  );
}
