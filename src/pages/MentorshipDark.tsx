import { buildBreadcrumbList, buildGraph } from "@/lib/structuredData";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Stethoscope,
  GraduationCap,
  UserCheck,
  BookOpen,
  Briefcase,
  Microscope,
  Beaker,
  HeartHandshake,
  Lightbulb,
  Award,
  Users,
} from "lucide-react";
import DrArefinHeader from "@/components/arefin/DrArefinHeader";
import DrArefinFooter from "@/components/arefin/DrArefinFooter";
import HeroSection from "@/components/arefin/HeroSection";
import { GlobalCTABand } from "@/components/arefin/GlobalCTABand";
import darkLogo from "@/assets/dr-arefin-logo-dark.webp";
import heroBg from "@/assets/dr-arefin-ot-team-real.webp";
import { Reveal } from "@/hooks/useScrollReveal";
import CountUp from "@/components/CountUp";
import TestimonialsSection from "@/components/arefin/TestimonialsSection";
import TreatmentProcessSticky from "@/components/arefin/TreatmentProcessSticky";
import FAQAccordion from "@/components/arefin/FAQAccordion";
import MentorshipCarousel from "@/components/arefin/MentorshipCarousel";

/**
 * Mentorship — Dark version
 * Content mirrors https://drarefin.com/mentorship/ verbatim.
 * Design system matches homepage & treatment page (dark mode).
 */

/* ── Who Can Join cards ── */
const audiences = [
  {
    icon: GraduationCap,
    title: "MBBS Students",
    titleHref: "/mentorship/",
    titleAlt: "Mentorship program for MBBS students — hepatobiliary fundamentals with Dr. Arefin",
    body: "Foundational <a href='/treatment/liver-surgery/' title='Hepatobiliary and liver surgery overview'><strong>hepatobiliary knowledge</strong></a> via seminars and liver health awareness programs.",
  },
  {
    icon: UserCheck,
    title: "Intern Doctors",
    titleHref: "/mentorship/operative-skills-workshop/",
    titleAlt: "Operative skills workshop for intern doctors — hands-on laparoscopic training in Dhaka",
    body: "<a href='/treatment/laparoscopic-cholecystectomy-dhaka/' title='Hands-on laparoscopic surgery training with Dr. Arefin'><strong>Hands-on surgical</strong></a>, operation-theatre, and patient-management experience under expert mentorship.",
  },
  {
    icon: BookOpen,
    title: "Postgraduate",
    titleHref: "/treatment/liver-surgery/",
    titleAlt: "Postgraduate training in liver, biliary & transplant surgery with Dr. Arefin",
    body: "Advanced training in <a href='/treatment/liver-surgery/' title='Liver resections by Dr. Arefin'><strong>liver resections</strong></a>, <a href='/treatment/biliary-stricture-reconstruction-dhaka/' title='Biliary reconstruction by Dr. Arefin'><strong>biliary reconstruction</strong></a>, and transplant coordination.",
  },
  {
    icon: Briefcase,
    title: "Professionals",
    titleHref: "/treatment/hepatobiliary-surgery/",
    titleAlt: "Hepatobiliary professional development — perioperative & advanced surgical training",
    body: "Specialised <a href='/treatment/liver-surgery/' title='Hepatobiliary care by Dr. Arefin'><strong>hepatobiliary care</strong></a>, perioperative management, and structured clinical training.",
  },
];

/* ── What You Will Learn cards ── */
const learnings = [
  {
    icon: Stethoscope,
    title: "Surgical Support",
    titleHref: "/treatment/liver-surgery/",
    titleAlt: "Surgical support for complex hepatobiliary & liver transplant cases — Dr. Arefin",
    body: "Offering <a href='/about/patient-centered-care/' title='Expert guidance and resources for hepatobiliary surgery patients — patient-centred care by Dr. Arefin'><strong>expert guidance and resources</strong></a> for patients needing <a href='/treatment/liver-surgery/' title='Complex hepatobiliary surgery by Dr. Arefin'><strong>complex hepatobiliary</strong></a> and <a href='/treatment/liver-transplant-surgery-dhaka/' title='Liver transplant surgery in Dhaka by Dr. Arefin'><strong>liver transplant surgeries.</strong></a>",
  },
  {
    icon: Lightbulb,
    title: "Liver Education",
    titleHref: "/treatment/fatty-liver-management/",
    titleAlt: "Liver education & disease prevention awareness — fatty liver management in Dhaka",
    body: "<a href='/liver-health-education/' title='Empowering communities through liver health education — awareness programs by Dr. Arefin'><strong>Empowering communities</strong></a> through <a href='/liver-disease-prevention-education/' title='Workshops and awareness programs on liver disease prevention by Dr. Arefin'><strong>workshops and awareness programs</strong></a> on <a href='/treatment/liver-surgery/' title='Liver care and disease prevention'><strong>liver care and disease prevention.</strong></a>",
  },
  {
    icon: HeartHandshake,
    title: "Support Network",
    titleHref: "/about/patient-centered-care/",
    titleAlt: "Patient & family support network — patient-centered hepatobiliary care in Dhaka",
    body: "<a href='/patient-support-groups/' title='Building strong connections between patients and families through support groups'><strong>Building strong connections</strong></a> for <a href='/about/patient-centered-care/' title='Patient-centred care for patients and families by Dr. Arefin'><strong>patients and families</strong></a> through <a href='/gallery/' title='Shared patient experiences and surgical journey gallery'><strong>shared experiences</strong></a> and <a href='/patient-emotional-support-recovery/' title='Ongoing emotional support and recovery care for hepatobiliary patients'><strong>ongoing emotional support.</strong></a>",
  },
];

/* ── Mentorship Curriculum cards ── */
const curriculum = [
  {
    icon: GraduationCap,
    title: "Advanced Surgical Mentorship",
    titleHref: "/mentorship/",
    titleAlt: "Advanced surgical mentorship — academic + hands-on hepatobiliary training in Dhaka",
    body: "Comprehensive mentorship that blends <a href='/mentorship/' title='Academic learning track in Dr. Arefin hepatobiliary mentorship program'><strong>academic learning</strong></a> with <a href='/mentorship/operative-skills-workshop/' title='Hands-on operative skills workshop experience under Dr. Arefin'><strong>hands-on experience</strong></a>, preparing future surgeons for <a href='/treatment/liver-surgery/' title='Real-world hepatobiliary surgical challenges'><strong>real-world hepatobiliary challenges.</strong></a>",
  },
  {
    icon: Beaker,
    title: "Liver Transplant Training",
    titleHref: "/treatment/liver-transplant-surgery-dhaka/",
    titleAlt: "Liver transplant training — protocols, surgery steps & postoperative care in Dhaka",
    body: "In-depth exposure to <a href='/treatment/liver-transplant-surgery-dhaka/' title='Liver transplant protocols and surgery in Dhaka'><strong>transplant protocols, surgical steps, and postoperative care</strong></a> under <a href='/about/proven-surgical-excellence/' title='Expert surgical supervision by Dr. Arefin — proven hepatobiliary excellence in Dhaka'><strong>expert supervision</strong></a> for <a href='/treatment/liver-transplant-coordination/' title='Liver transplant coordination training for future transplant specialists'><strong>future transplant specialists.</strong></a>",
  },
  {
    icon: Microscope,
    title: "Pancreatic & Biliary Surgery Skills",
    titleHref: "/treatment/pancreatic-surgery/",
    titleAlt: "Pancreatic & biliary surgery skills — laparoscopic and open techniques with Dr. Arefin",
    body: "Focused training on <a href='/treatment/pancreatic-surgery/' title='Pancreatic and biliary disorder surgery by Dr. Arefin'><strong>managing complex pancreatic and biliary disorders</strong></a> using <a href='/treatment/laparoscopic-cholecystectomy-dhaka/' title='Laparoscopic surgery training'><strong>modern laparoscopic and open surgical approaches.</strong></a>",
  },
  {
    icon: Stethoscope,
    title: "Minimally Invasive Techniques",
    titleHref: "/mentorship/operative-skills-workshop/",
    titleAlt: "Minimally invasive techniques — operative skills workshop on laparoscopic surgery",
    body: "Practical workshops on <a href='/mentorship/operative-skills-workshop/' title='Operative skills workshop — advanced laparoscopic and keyhole surgery training by Dr. Arefin'><strong>advanced laparoscopic and keyhole surgeries</strong></a>, enhancing <a href='/minimally-invasive-surgery/' title='Minimally invasive surgery precision — Dr. Arefin laparoscopic technique'><strong>surgical precision</strong></a> and <a href='/diagnosis-surgery-recovery/' title='Diagnosis-surgery-recovery pathway improving patient recovery outcomes'><strong>patient recovery outcomes.</strong></a>",
  },
  {
    icon: BookOpen,
    title: "Surgical Research & Case Analysis",
    titleHref: "/about/proven-surgical-excellence/",
    titleAlt: "Surgical research & case analysis — proven hepatobiliary surgical excellence in Dhaka",
    body: "Develop critical thinking through <a href='/mentorship/' title='Live surgical case discussions in Dr. Arefin mentorship program'><strong>live case discussions</strong></a>, <a href='/about/proven-surgical-excellence/' title='Academic presentations and proven hepatobiliary surgical excellence'><strong>academic presentations</strong></a>, and <a href='/treatment/liver-surgery/' title='Research collaborations on hepatobiliary diseases'><strong>research collaborations on hepatobiliary diseases.</strong></a>",
  },
  {
    icon: Award,
    title: "Professional Development & Ethics",
    titleHref: "/about/",
    titleAlt: "Professional development & ethics — leadership and ethical surgical practice",
    body: "Training that fosters <a href='/about/' title='Leadership, communication, and ethical excellence — Dr. Arefin professional values'><strong>leadership, communication, and ethical excellence</strong></a> essential for <a href='/mentorship/' title='Successful surgical and academic careers through Dr. Arefin mentorship'><strong>successful surgical and academic careers.</strong></a>",
  },
];

/* ── Why Train With Dr. Arefin (dark band differentiators) ── */
const reasons = [
  {
    icon: Award,
    title: "Two Decades of Expertise",
    titleHref: "/about/",
    titleAlt: "Two decades of hepatobiliary, pancreatic & liver transplant expertise — Dr. Arefin",
    body: "Learn directly from a surgeon with <a href='/about/' title='About Dr. Arefin — two decades of hepatobiliary expertise'><strong>two decades of hepatobiliary, pancreatic, and liver transplant experience</strong></a> across Bangladesh and international centres.",
  },
  {
    icon: Microscope,
    title: "Live Operating Theatre",
    titleHref: "/treatment/liver-surgery/",
    titleAlt: "Live operating theatre exposure — real liver & pancreatic surgery cases in Dhaka",
    body: "Stand beside Dr. Arefin in <a href='/gallery/' title='Real operating theatre photos from Dr. Arefin hepatobiliary surgeries'><strong>real operating theatres</strong></a> on complex <a href='/treatment/liver-surgery/' title='Liver surgery cases'>liver</a> and <a href='/treatment/pancreatic-surgery/' title='Pancreatic surgery cases'>pancreatic</a> cases — actual surgeries, not simulations or recordings.",
  },
  {
    icon: Users,
    title: "International Faculty",
    titleHref: "/credentials/fcps-ms-hepatobiliary-gallbladder-surgeon-dhaka/",
    titleAlt: "International faculty network — hepatobiliary credentials & transplant collaborators",
    body: "Tap into a <a href='/credentials/fcps-ms-hepatobiliary-gallbladder-surgeon-dhaka/' title='Global academic network — Dr. Arefin FCPS/MS hepatobiliary credentials and collaborators'><strong>global academic network</strong></a> of <a href='/treatment/liver-surgery/' title='Hepatobiliary specialists network'><strong>hepatobiliary specialists</strong></a>, transplant centres, and research collaborators built over years of international practice.",
  },
  {
    icon: UserCheck,
    title: "One-on-One Mentoring",
    titleHref: "/about/patient-centered-care/",
    titleAlt: "One-on-one mentoring — individualised surgical feedback & patient-centered guidance",
    body: "Every trainee receives <a href='/mentorship/' title='Individual case discussions, surgical feedback, and career guidance from Dr. Arefin'><strong>individual case discussions, surgical feedback, and career guidance</strong></a> tailored to their specific learning goals and clinical strengths.",
  },
];

/* ── Measurable Impact stats ── */
const stats = [
  {
    value: 645,
    suffix: "+",
    label: "Surgeons Trained Worldwide",
    href: "/mentorship/operative-skills-workshop/",
    title: "Operative skills workshop & hepatobiliary mentorship",
  },
  {
    value: 29,
    suffix: "%",
    label: "Successful Career Placement",
    href: "/treatment/liver-surgery/",
    title: "Liver surgery training outcomes",
  },
  {
    value: 25,
    suffix: "%",
    label: "Serving in Hospitals Across Bangladesh & Abroad",
    href: "/about/",
    title: "About Dr. Arefin's global mentorship reach",
  },
];
const faqs = [
  {
    q: "Who is eligible for the mentorship program?",
    a: "The program is open to <a href='/mentorship/' title='Mentorship for MBBS students, intern doctors, postgraduate surgical trainees, faculty, and professionals'><strong>MBBS students, intern doctors, postgraduate surgical trainees, faculty members, and healthcare professionals</strong></a> who wish to develop or advance their skills in <a href='/treatment/liver-surgery/' title='Hepatobiliary and liver transplant surgery training'><strong>hepatobiliary and liver transplant surgery</strong></a>. No prior hepatobiliary experience is required for entry-level tracks.",
  },
  {
    q: "How long does the mentorship program last?",
    a: "Program duration varies by track. <a href='/mentorship/' title='Observership modules in Dr. Arefin hepatobiliary mentorship program'><strong>Observership modules</strong></a> run for <a href='/mentorship/operative-skills-workshop/' title='2–4 week operative skills workshop with Dr. Arefin'><strong>2–4 weeks</strong></a>, while <a href='/mentorship/' title='Comprehensive surgical training tracks under Dr. Arefin'><strong>comprehensive surgical training tracks</strong></a> span <a href='/mentorship/young-surgeon-training-program/' title='3–6 month young surgeon training program with Dr. Arefin'><strong>3–6 months</strong></a> depending on the participant's level and goals. Custom durations can be arranged for <a href='/mentorship/' title='Visiting international fellows in Dr. Arefin hepatobiliary mentorship'><strong>visiting international fellows.</strong></a>",
  },
  {
    q: "What are the steps to apply?",
    a: "Applying is straightforward: <strong>1)</strong> Submit your application through the <a href='/contact/' title='Mentorship application contact form — reach Dr. Arefin team'><strong>contact form</strong></a> on this website. <strong>2)</strong> Attach your <a href='/contact/' title='Submit CV, medical credentials, and statement of interest for mentorship'><strong>CV, medical credentials, and a brief statement of interest</strong></a>. <strong>3)</strong> The team will review your profile and schedule a <a href='/contact/' title='Schedule a short interview or orientation call for the mentorship program'><strong>short interview or orientation call</strong></a> within 7 working days.",
  },
  {
    q: "What criteria are used for selection?",
    a: "Selection is based on <a href='/about/' title='Academic qualifications, clinical experience, motivation, and references reviewed by Dr. Arefin'><strong>academic qualifications, clinical experience, motivation for hepatobiliary surgery, and professional references</strong></a>. Priority is given to candidates demonstrating <a href='/about/proven-surgical-excellence/' title='Genuine commitment to proven surgical excellence — Dr. Arefin mentorship values'><strong>genuine commitment to surgical excellence</strong></a> and those from <a href='/surgery-assistance-program/' title='Surgery assistance program for trainees from underserved regions'><strong>underserved regions seeking advanced training.</strong></a>",
  },
  {
    q: "Is there a fee for the mentorship program?",
    a: "Some tracks may involve a <a href='/surgery-financial-assistance/' title='Nominal administrative fee and financial assistance for mentorship participants'><strong>nominal administrative fee</strong></a> to cover materials and facility access. However, <a href='/about/patient-centered-care/' title='Dr. Arefin mentorship philosophy prioritises accessibility and patient-centred values'><strong>Dr. Arefin's mentorship philosophy prioritizes accessibility</strong></a> — financial assistance and <a href='/surgery-financial-assistance/' title='Mentorship fee waivers and financial assistance program'><strong>fee waivers</strong></a> are available for deserving candidates on a case-by-case basis.",
  },
  {
    q: "Will I receive a certificate upon completion?",
    a: "Yes. All participants who successfully complete the program receive a <a href='/mentorship/' title='Certificate of completion for Dr. Arefin hepatobiliary mentorship program'><strong>certificate of completion</strong></a> endorsed by <a href='/about/' title='About Dr. Murshidul Arefin — fellowship-trained hepatobiliary surgeon'><strong>Dr. Murshidul Arefin</strong></a>. Exceptional trainees may also receive <a href='/mentorship/' title='Recommendation letters from Dr. Arefin mentorship for career advancement'><strong>recommendation letters</strong></a> to support their career advancement.",
  },
];

const jsonLdString = buildGraph(
  buildBreadcrumbList([{ name: "Mentorship", path: "/mentorship/" }]),
  {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    name: "Hepatobiliary Surgical Mentorship & Training — Dr. Murshidul Arefin",
    url: "https://drarefin.com/mentorship/",
    description:
      "World-class hepatobiliary surgical mentorship and hands-on training in Dhaka by Dr. Murshidul Arefin for MBBS students, intern doctors, postgraduates and professionals.",
    provider: { "@id": "https://drarefin.com/#physician" },
  },
);

const MentorshipDark = () => {
  return (
    <div className="arefin dark min-h-screen bg-background text-foreground font-arefin">
      <Helmet>
        <title>Mentorship & Surgical Training — Dr. Murshidul Arefin, Dhaka</title>
        <meta name="description" content="Hepatobiliary surgery mentorship and training programs by Dr. Murshidul Arefin at Popular Medical College Hospital, Dhaka. Hands-on surgical skills development for the next generation of surgeons." />
        <link rel="canonical" href="https://drarefin.com/mentorship/" />
        <link rel="preload" as="image" href={heroBg} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Mentorship & Surgical Training — Dr. Murshidul Arefin" />
        <meta property="og:description" content="Hepatobiliary surgery mentorship and training programs by Dr. Murshidul Arefin at Popular Medical College Hospital, Dhaka." />
        <meta property="og:url" content="https://drarefin.com/mentorship/" />
        <meta property="og:site_name" content="Dr. Murshidul Arefin" />
        <meta property="og:locale" content="en_BD" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />

      <DrArefinHeader logoSrc={darkLogo} transparent />

      {/* ══════════════ HERO — shared HeroSection (homepage parity) ══════════════ */}
      <HeroSection
        imageSrc={heroBg}
        imageAlt="Operating-room training with Dr. Murshidul Arefin at Popular Medical College Hospital"
        breadcrumb="Mentorship"
        kicker="Mentorship & Training"
        h1="Mentorship & Surgical Training"
        h1Href="/mentorship/"
        h1Title="Mentorship & surgical training programs led by Dr. Murshidul Arefin in Dhaka"
        introHtml={`<strong><a href="/mentorship/young-surgeon-training-program/" title="Young surgeon training program — next generation of hepatobiliary surgeons by Dr. Arefin">Empowering the next generation of hepatobiliary surgeons</a></strong> through <a href="/mentorship/" title="World-class surgical education by Dr. Arefin in Dhaka"><strong>world-class surgical education</strong></a> and <a href="/mentorship/operative-skills-workshop/" title="Hands-on operative skills training in Dhaka with Dr. Arefin"><strong>hands-on training in Dhaka.</strong></a> Led by <strong><a href="/about/" title="About Dr. Murshidul Arefin">Dr. Murshidul Arefin</a></strong>, explore our <strong><a href="/gallery/" title="Surgical gallery and operations">surgical gallery</a></strong> and <strong><a href="/articles/" title="Articles on hepatobiliary surgery">expert articles</a></strong>.`}
        ctaAriaLabel="Apply to Dr. Arefin's hepatobiliary mentorship program"
      />
      {/* ============== WHO CAN JOIN ============== */}
      <section className="py-10 sm:py-14 md:py-20 lg:py-28 arefin-mint-band arefin-section-divider" aria-label="Who can join the mentorship program">
        <div className="container">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-light mb-4">
                Open Enrollment
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mentor-section-heading text-fluid-h2 font-semibold text-foreground mb-6 leading-tight">
                Who Can Join
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mentor-body-text text-fluid-lede">
                Our <a href="/mentorship/" title="Hepatobiliary mentorship and training programs led by Dr. Arefin"><strong>mentorship and training programs</strong></a> are open to{" "}
                <a href="/mentorship/" title="Mentorship for MBBS students, intern doctors, postgraduate trainees, faculty, and professionals"><strong>MBBS students, intern doctors, postgraduate trainees, faculty members, and healthcare professionals</strong></a>{" "}
                eager to <a href="/mentorship/operative-skills-workshop/" title="Enhance surgical skills through Dr. Arefin operative skills workshop"><strong>enhance their surgical skills</strong></a>. Whether you're beginning your journey or{" "}
                <a href="/treatment/hepatobiliary-surgery/" title="Advancing expertise in hepatobiliary surgery with Dr. Arefin"><strong>advancing your expertise in hepatobiliary surgery</strong></a>,{" "}
                <a href="/about/" title="Dr. Arefin's hands-on guidance in hepatobiliary mentorship"><strong>Dr. Arefin's hands-on guidance</strong></a> helps you grow with confidence and precision.
              </p>
            </Reveal>
          </div>

          {/* T23 (2026-05-17): 3-card carousel — middle 1.15× scaled,
              sides dimmed, arrows + dots, no autoplay. Stacks on mobile. */}
          <MentorshipCarousel
            items={audiences}
            getKey={(a) => a.title}
            ariaLabel="Who can join the mentorship program — slides"
            renderCard={(a) => (
              <article className="mentor-card arefin-card-hover p-5 sm:p-6 md:p-7 rounded-2xl h-full flex flex-col">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/15 mb-5">
                  <a.icon className="h-6 w-6 text-primary-light" />
                </span>
                <h3 className="mentor-card-title text-fluid-h4 font-semibold mb-3">
                  <Link to={a.titleHref} title={a.titleAlt} className="mentor-card-title-link">{a.title}</Link>
                </h3>
                <p
                  className="mentor-card-desc text-base leading-relaxed flex-1"
                  dangerouslySetInnerHTML={{ __html: a.body }}
                />
              </article>
            )}
          />
        </div>
      </section>

      {/* ============== WHAT YOU WILL LEARN ============== */}
      <section className="arefin-section-divider py-10 sm:py-14 md:py-20 lg:py-28 bg-background" aria-label="What you will learn">
        <div className="container">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-light mb-4">
                Training Outcomes
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mentor-section-heading text-fluid-h2 font-semibold text-foreground mb-6 leading-tight">
                What You Will Learn
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mentor-body-text text-fluid-lede">
                Gain <a href="/about/proven-surgical-excellence/" title="In-depth hepatobiliary surgical knowledge — proven excellence by Dr. Arefin"><strong>in-depth surgical knowledge</strong></a>,{" "}
                <a href="/mentorship/operative-skills-workshop/" title="Hands-on hepatobiliary training in operative skills workshop"><strong>hands-on hepatobiliary training</strong></a>, and{" "}
                <a href="/gallery/" title="Real-world clinical experience — Dr. Arefin operating theatre gallery"><strong>real-world clinical experience</strong></a> to{" "}
                <a href="/mentorship/" title="Advance your medical career confidently with Dr. Arefin mentorship"><strong>advance your medical career confidently.</strong></a>
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learnings.map((l, i) => (
              <Reveal key={l.title} delay={i * 100} className="h-full">
                <article className="mentor-card mentor-learn-card arefin-card-hover p-5 sm:p-6 md:p-7 rounded-2xl h-full flex flex-col">
                  <span className="mentor-learn-icon-wrap inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/15 mb-5">
                    <l.icon className="mentor-learn-icon h-6 w-6 text-primary-light" />
                  </span>
                  <h3 className="mentor-card-title text-fluid-h4 font-semibold mb-3">
                    <Link to={l.titleHref} title={l.titleAlt} className="mentor-card-title-link">{l.title}</Link>
                  </h3>
                  <p
                    className="mentor-card-desc text-base leading-relaxed flex-1"
                    dangerouslySetInnerHTML={{ __html: l.body }}
                  />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============== MENTORSHIP CURRICULUM (LIGHT-GREEN BAND, DARK CARDS) ============== */}
      <section className="mentor-light-band arefin-section-divider py-10 sm:py-14 md:py-20 lg:py-28" aria-label="Mentorship curriculum">
        <div className="container">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <Reveal>
              <p className="mentor-light-eyebrow text-xs font-semibold uppercase tracking-[0.25em] mb-4">
                Curriculum
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mentor-light-heading text-fluid-h2 font-semibold mb-6 leading-tight">
                The Mentorship Combines <span className="mentor-light-accent">Academic Learning</span> with Extensive Hands-on Experience
              </h2>
            </Reveal>
          </div>

          <MentorshipCarousel
            items={curriculum}
            getKey={(c) => c.title}
            ariaLabel="Your mentorship journey"
            renderCard={(c) => (
              <article className="mentor-dark-card p-5 sm:p-6 md:p-7 rounded-2xl h-full flex flex-col">
                <span className="mentor-dark-icon inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5">
                  <c.icon className="h-6 w-6" />
                </span>
                <h3 className="mentor-dark-title text-fluid-h4 font-semibold mb-3">
                  <Link to={c.titleHref} title={c.titleAlt} className="mentor-dark-title-link">{c.title}</Link>
                </h3>
                <p
                  className="mentor-dark-body text-base leading-relaxed flex-1"
                  dangerouslySetInnerHTML={{ __html: c.body }}
                />
              </article>
            )}
          />
        </div>
      </section>

      {/* ============== WHY TRAIN WITH DR. AREFIN (DARK BAND) ============== */}
      <section className="arefin-section-divider py-10 sm:py-14 md:py-20 lg:py-28 bg-background" aria-label="Why train with Dr. Arefin">
        <div className="container">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-light mb-4">
                Why Choose Us
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mentor-section-heading text-fluid-h2 font-semibold text-foreground mb-6 leading-tight">
                Why Train With <span className="text-primary-light">Dr. Arefin</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mentor-body-text text-fluid-lede">
                Four reasons why <a href="/treatment/hepatobiliary-surgery/" title="Aspiring hepatobiliary surgeons training with Dr. Arefin"><strong>aspiring hepatobiliary surgeons</strong></a> from across the region choose this <a href="/mentorship/" title="Dr. Arefin hepatobiliary mentorship program in Dhaka"><strong>mentorship program</strong></a> to <a href="/mentorship/young-surgeon-training-program/" title="Shape your surgical career through young surgeon training program"><strong>shape their surgical careers.</strong></a>
              </p>
            </Reveal>
          </div>

          {/* T24 (2026-05-17): 3-card carousel — middle 1.15× scaled,
              sides dimmed, arrows + dots, no autoplay. Stacks on mobile. */}
          <MentorshipCarousel
            items={reasons}
            getKey={(r) => r.title}
            ariaLabel="Why train with Dr. Arefin — slides"
            renderCard={(r) => (
              <article className="mentor-card mentor-reason-card arefin-card-hover p-5 sm:p-6 md:p-7 rounded-2xl h-full flex flex-col">
                <span className="mentor-reason-icon-wrap inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/15 mb-5">
                  <r.icon className="mentor-reason-icon h-6 w-6 text-primary-light" />
                </span>
                <h3 className="mentor-card-title text-fluid-h4 font-semibold mb-3">
                  <Link to={r.titleHref} title={r.titleAlt} className="mentor-card-title-link">{r.title}</Link>
                </h3>
                <p
                  className="mentor-card-desc text-base leading-relaxed flex-1"
                  dangerouslySetInnerHTML={{ __html: r.body }}
                />
              </article>
            )}
          />
        </div>
      </section>

      {/* ============== TRAINING TIMELINE (sticky-stack phases) ============== */}
      <TreatmentProcessSticky variant="mentorship" />

      {/* ============== MEASURABLE IMPACT ============== */}
      <section className="mentor-stats-section py-10 sm:py-14 md:py-20 lg:py-28" aria-label="Measurable impact">
        <div className="container">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-light mb-4">
                Our Impact
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mentor-section-heading text-fluid-h2 font-semibold text-foreground mb-6 leading-tight">
                Measurable Impact
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mentor-body-text text-fluid-lede">
                <a href="/mentorship/" title="Dr. Arefin's hepatobiliary mentorship program impact"><strong>Dr. Arefin's mentorship</strong></a> has{" "}
                <a href="/about/proven-surgical-excellence/" title="Created skilled surgeons improving outcomes globally — proven surgical excellence"><strong>created skilled surgeons improving surgical outcomes globally.</strong></a>
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 120}>
                <Link to={s.href} title={s.title} className="mentor-stat-link text-center block">
                  <p className="mentor-stat-value text-4xl sm:text-5xl md:text-6xl font-bold text-primary-light mb-3">
                    <CountUp end={s.value} suffix={s.suffix} separator="," />
                  </p>
                  <p className="mentor-stat-label mentor-body-text text-base font-medium">{s.label}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============== TESTIMONIALS (reused from homepage) ============== */}
      {/* TODO: Replace with real trainee testimonials when client provides them */}
      <TestimonialsSection />

      {/* ══════════════ FINAL CTA — shared GlobalCTABand ══════════════ */}
      <GlobalCTABand
        body={
          <>
            Your trust and support help <a href="/about/" title="About Dr. Murshidul Arefin — fellowship-trained hepatobiliary surgeon in Dhaka"><strong>Dr. Murshidul Arefin</strong></a>{" "}
            deliver <a href="/treatment/liver-surgery/" title="Critical liver and hepatobiliary surgeries by Dr. Arefin"><strong>critical liver and hepatobiliary surgeries</strong></a>{" "}
            to <a href="/about/patient-centered-care/" title="Patient-centred care for patients who need hope the most"><strong>patients who need hope the most.</strong></a>
          </>
        }
      />
      {/* ============== FAQ — homepage parity (FAQAccordion + light mint band) ============== */}
      <div className="home-faq-band arefin-mint-band">
        <Reveal>
          <FAQAccordion
            kicker="FAQ"
            heading="Frequently Asked Questions"
            basePath=""
            items={faqs.map((f) => ({
              q: f.q,
              a: <p dangerouslySetInnerHTML={{ __html: f.a }} />,
              aText: f.a.replace(/<[^>]+>/g, ""),
              linkToPage: false,
            }))}
          />
        </Reveal>
        <style>{`
          .arefin.dark .home-faq-band .satellite-faq { background: #E2F8E7; }
          .arefin.dark .home-faq-band .satellite-section-kicker { color: hsl(142 71% 32%); }
          .arefin.dark .home-faq-band .satellite-faq .satellite-h2 { color: hsl(0 0% 8%); }
          .arefin.dark .home-faq-band .satellite-faq-item {
            background: hsl(0 0% 12%);
            color: hsl(0 0% 96%);
            border-color: hsl(0 0% 22%);
            border-left-color: hsl(0 0% 22%);
          }
          .arefin.dark .home-faq-band .satellite-faq-item[open],
          .arefin.dark .home-faq-band .satellite-faq-item:hover,
          .arefin.dark .home-faq-band .satellite-faq-item:focus-within {
            border-left-color: hsl(131 87% 41%);
          }
          .arefin.dark .home-faq-band .satellite-faq-item summary { color: hsl(0 0% 96%); }
          .arefin.dark .home-faq-band .satellite-faq-item .faq-chev { color: hsl(131 87% 45%); }
          .arefin.dark .home-faq-band .satellite-faq-answer { color: hsl(0 0% 96% / 0.78); }
        `}</style>
      </div>

      <DrArefinFooter />

      <style>{`
        /* ───── Section headings ───── */
        .mentor-section-heading {
          transition: text-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      color 280ms cubic-bezier(0.22, 1, 0.36, 1);
          cursor: default;
        }
        .mentor-section-heading:hover {
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
          color: hsl(var(--primary-light));
        }

        /* ───── Body text ───── */
        .mentor-body-text {
          color: hsl(var(--muted-foreground));
        }
        .mentor-body-text strong {
          color: inherit;
          font-weight: inherit;
          transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1),
                      text-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .mentor-body-text strong:hover {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* ───── Cards — emerald-tinted dark ───── */
        .arefin.dark .mentor-card {
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
          border-left: 5px solid hsl(var(--border));
          box-shadow: 0 1px 3px hsl(0 0% 0% / 0.32);
          transition: border-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin.dark .mentor-card:hover {
          border-left-color: hsl(var(--primary-bright));
          box-shadow: 0 10px 25px hsl(0 0% 0% / 0.45);
        }
        .mentor-card-title {
          color: hsl(var(--foreground));
          transition: color 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      text-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin.dark .mentor-card:hover .mentor-card-title {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }
        .mentor-card-desc {
          color: hsl(var(--muted-foreground));
          text-align: justify;
          text-justify: inter-word;
          hyphens: auto;
          -webkit-hyphens: auto;
        }
        .mentor-card-desc strong {
          color: inherit;
          font-weight: inherit;
        }

        /* ───── Light cards on dark sections (Surface Elevation Rule) — What You Will Learn + Why Train With ───── */
        .arefin.dark .mentor-learn-card,
        .arefin.dark .mentor-reason-card {
          background: hsl(0 0% 97%);
          border: 1px solid hsl(0 0% 88%);
          border-left: 5px solid hsl(0 0% 88%);
          box-shadow: 0 1px 3px hsl(0 0% 0% / 0.32);
        }
        .arefin.dark .mentor-learn-card:hover,
        .arefin.dark .mentor-reason-card:hover {
          border-left-color: hsl(131 87% 41%);
          box-shadow: 0 10px 25px hsl(0 0% 0% / 0.45);
        }
        .arefin.dark .mentor-learn-card .mentor-card-title,
        .arefin.dark .mentor-reason-card .mentor-card-title {
          color: hsl(0 0% 12%);
        }
        .arefin.dark .mentor-learn-card:hover .mentor-card-title,
        .arefin.dark .mentor-reason-card:hover .mentor-card-title {
          color: hsl(142 71% 28%);
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }
        .arefin.dark .mentor-learn-card .mentor-card-desc,
        .arefin.dark .mentor-reason-card .mentor-card-desc {
          color: hsl(0 0% 25%);
        }
        .arefin.dark .mentor-learn-card .mentor-learn-icon-wrap,
        .arefin.dark .mentor-reason-card .mentor-reason-icon-wrap {
          background: hsl(142 60% 92%);
        }
        .arefin.dark .mentor-learn-card .mentor-learn-icon,
        .arefin.dark .mentor-reason-card .mentor-reason-icon {
          color: hsl(142 71% 32%);
        }

        /* ───── Stats section ───── */
        .mentor-stats-section {
          background: hsl(var(--card));
          border-top: 1px solid hsl(var(--border));
          border-bottom: 1px solid hsl(var(--border));
        }
        /* ───── Stat metric links (no positional hover; color + text-shadow only) ───── */
        .mentor-stat-link {
          text-decoration: none;
          color: inherit;
          transition: color 240ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .mentor-stat-link:hover .mentor-stat-value,
        .mentor-stat-link:focus-visible .mentor-stat-value {
          color: hsl(var(--primary-bright));
          text-shadow: 2px 2px 0 hsl(var(--hover-shadow-ink, 0 0% 0%));
        }
        .mentor-stat-link:hover .mentor-stat-label,
        .mentor-stat-link:focus-visible .mentor-stat-label {
          color: hsl(var(--primary-bright));
        }
        .mentor-stat-link:focus-visible {
          outline: 2px solid hsl(var(--primary-bright));
          outline-offset: 4px;
          border-radius: 8px;
        }

        /* ───── CTA body text ───── */
        .mentor-cta-body strong {
          color: inherit;
          font-weight: inherit;
        }

        /* ───── Curriculum LIGHT-GREEN BAND (forced light even inside .arefin.dark) ───── */
        .mentor-light-band,
        .arefin.dark .mentor-light-band {
          background: hsl(138 60% 95%);
          color: hsl(0 0% 8%);
        }
        .mentor-light-eyebrow,
        .arefin.dark .mentor-light-band .mentor-light-eyebrow {
          color: hsl(142 71% 32%);
        }
        .mentor-light-heading,
        .arefin.dark .mentor-light-band .mentor-light-heading {
          color: hsl(0 0% 8%);
          transition: text-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      color 280ms cubic-bezier(0.22, 1, 0.36, 1);
          cursor: default;
        }
        .mentor-light-heading:hover,
        .arefin.dark .mentor-light-band .mentor-light-heading:hover {
          color: hsl(142 71% 32%);
          text-shadow: 1px 0.7px 0 hsl(80 25% 25%);
        }
        .mentor-light-accent,
        .arefin.dark .mentor-light-band .mentor-light-accent {
          color: hsl(142 71% 32%);
        }

        /* Dark cards on the light band */
        .mentor-dark-card,
        .arefin.dark .mentor-light-band .mentor-dark-card {
          background: hsl(155 40% 8%);
          color: hsl(0 0% 98%);
          border: 1px solid hsl(155 30% 14%);
          border-left: 3px solid hsl(155 30% 14%);
          box-shadow: 0 1px 3px hsl(0 0% 0% / 0.18);
          transition: border-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .mentor-dark-card:hover,
        .arefin.dark .mentor-light-band .mentor-dark-card:hover {
          border-left-color: hsl(131 87% 41%);
          box-shadow: 8px 8px 0 0 hsl(131 87% 41% / 0.22);
        }
        .mentor-dark-icon,
        .arefin.dark .mentor-light-band .mentor-dark-icon {
          background: hsl(131 87% 41% / 0.18);
          color: hsl(131 87% 55%);
        }
        .mentor-dark-title,
        .arefin.dark .mentor-light-band .mentor-dark-title {
          color: hsl(0 0% 98%);
          transition: color 240ms cubic-bezier(0.22, 1, 0.36, 1),
                      text-shadow 240ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .mentor-dark-card:hover .mentor-dark-title,
        .arefin.dark .mentor-light-band .mentor-dark-card:hover .mentor-dark-title {
          color: hsl(131 87% 55%);
          text-shadow: 1px 0.7px 0 hsl(0 0% 0%);
        }
        .mentor-dark-body,
        .arefin.dark .mentor-light-band .mentor-dark-body {
          color: hsl(0 0% 82%);
        }
        .mentor-dark-body strong {
          color: inherit;
          font-weight: inherit;
          transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1),
                      text-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .mentor-dark-body strong:hover {
          color: hsl(131 87% 55%);
          text-shadow: 1px 0.7px 0 hsl(0 0% 0%);
        }
      `}</style>
    </div>
  );
};

export default MentorshipDark;
