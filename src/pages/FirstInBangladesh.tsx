import { Link } from "react-router-dom";
import { physicianEntity, buildBreadcrumbList, buildGraph } from "@/lib/structuredData";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import {
  Phone,
  MessageCircle,
  Send,
  MapPin,
  Clock,
  Car,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Award,
  GraduationCap,
  Building2,
  Inbox,
  Bell,
  Headphones,
} from "lucide-react";
import DrArefinHeader from "@/components/arefin/DrArefinHeader";
import DrArefinFooter from "@/components/arefin/DrArefinFooter";
import GlobalCTABand from "@/components/arefin/GlobalCTABand";
import FAQAccordion from "@/components/arefin/FAQAccordion";
import { getFaqsBySlugs } from "@/data/faqRegistry";
import { MEGA_SERVICES, MEGA_PHONE_HREF, MEGA_PHONE_DISPLAY } from "@/data/menu";
import { appointmentSchema, isOtherConcern, sendAppointmentRequest } from "@/lib/appointmentRequest";
import { Reveal } from "@/hooks/useScrollReveal";
import darkLogo from "@/assets/dr-arefin-logo-dark.webp";
import portrait from "@/assets/dr-arefin-liver-doctor-real.webp";

/**
 * First in Bangladesh — the fastest way to reach Dr. Arefin from the website.
 * Plan: .lovable/plan/first-in-bangladesh-page-plan-2026-10-21.md (owner-approved).
 * All facts are the site's own (homepage trust chips, FAQ registry, menu data).
 */

const PAGE_PATH = "/fastest-way-to-reach-a-doctor-in-bangladesh/";
const WHATSAPP_HREF = "https://wa.me/8801311487592";

const jsonLdString = buildGraph(
  buildBreadcrumbList([
    { name: "Fastest Way to Reach a Doctor in Bangladesh", path: PAGE_PATH },
  ]),
  {
    "@context": "https://schema.org",
    ...physicianEntity,
    url: `https://drarefin.com${PAGE_PATH}`,
  },
);

/* Homepage trust chips — identical targets to HeroSection defaults. */
const TRUST_CHIPS = [
  {
    label: "FCPS · MS Hepatobiliary",
    href: "/credentials/fcps-ms-hepatobiliary-gallbladder-surgeon-dhaka/",
    title: "Dr. Arefin's FCPS & MS Hepatobiliary credentials — verified gallbladder surgeon in Dhaka",
  },
  {
    label: "1500+ surgeries",
    href: "/credentials/1500-gallbladder-surgeries-dhaka/",
    title: "1500+ gallbladder & hepatobiliary surgeries performed by Dr. Arefin in Dhaka",
  },
  {
    label: "20+ years",
    href: "/credentials/20-years-gallbladder-surgery-experience-dhaka/",
    title: "20+ years of gallbladder, liver, and bile-duct surgery experience — Dr. Murshidul Arefin",
  },
];

const STATS = [
  { icon: Award, value: "20+ years", label: "of surgical practice" },
  { icon: ShieldCheck, value: "1500+ surgeries", label: "performed in Dhaka" },
  { icon: GraduationCap, value: "Associate Professor", label: "Popular Medical College Hospital" },
  { icon: Building2, value: "BSMMU-trained", label: "hepatobiliary (HPB) surgeon" },
];

const PAIN_CARDS = [
  {
    icon: Clock,
    title: "Appointments are a battle",
    body: "Serials fill up before most patients even get through. By the time you reach the chamber, the list for the day is often already closed.",
  },
  {
    icon: Car,
    title: "The journey itself hurts",
    body: "Hours in Dhaka traffic — while you are already unwell — just to ask a question or fix a time. For patients travelling from outside Dhaka, it is a full day lost.",
  },
  {
    icon: HelpCircle,
    title: "Your questions wait",
    body: "There is normally no direct way to ask the doctor's office anything — about reports, about surgery, about what to do next. So you wait, and worry.",
  },
];

const STEPS = [
  {
    n: "1",
    title: "Reach out from this page",
    body: "Call, send a WhatsApp message, or fill in the query form below — whichever is easiest for you.",
  },
  {
    n: "2",
    title: "His team responds",
    body: "Every call, message and form submission is picked up by Dr. Arefin's dedicated team and answered with immediate attention. Your chamber slot is confirmed with you directly.",
  },
  {
    n: "3",
    title: "Meet Dr. Arefin",
    body: "Visit the chamber at Popular Medical College Hospital, House 25, Road 2, Dhanmondi, Dhaka 1205 — afternoons and evenings, by confirmed slot.",
  },
];

/* Same concern options as the contact page form. */
const medicalConcerns = [
  "Liver Disease Consultation",
  "Gallbladder Stone Treatment",
  "Bile Duct Stone Treatment",
  "Pancreatic Disease Consultation",
  "Hepatobiliary Surgery Consultation",
  "Laparoscopic Surgery Consultation",
  "Follow-up Appointment",
  "General Surgical Consultation",
  "Other",
];

const FirstInBangladesh = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    concern: "",
    message: "",
  });
  const [website, setWebsite] = useState(""); // hidden spam trap
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorText, setErrorText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = appointmentSchema.safeParse(formData);
    if (!parsed.success) {
      setStatus("error");
      setErrorText(parsed.error.errors[0]?.message || "Please check the form.");
      return;
    }
    setStatus("sending");
    try {
      await sendAppointmentRequest({
        ...parsed.data,
        website,
        source: "First in Bangladesh page",
      });
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", concern: "", message: "" });
    } catch {
      setStatus("error");
      setErrorText("Sorry, your query could not be sent. Please call +880 1311 487 592.");
    }
  };

  return (
    <div className="arefin dark min-h-screen bg-background text-foreground font-arefin">
      <Helmet>
        <title>Fastest Way to Reach a Doctor in Bangladesh — A First in Bangladesh | Dr. Arefin</title>
        <meta
          name="description"
          content="Reaching a doctor in Bangladesh usually means long serials, traffic and waiting. Dr. Arefin's website changes that — call, WhatsApp or send a query and get a direct response from his dedicated team."
        />
        <link rel="canonical" href={`https://drarefin.com${PAGE_PATH}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Fastest Way to Reach a Doctor in Bangladesh — A First in Bangladesh | Dr. Arefin" />
        <meta
          property="og:description"
          content="For the first time in Bangladesh, reach your doctor directly — call, WhatsApp or send a query to Dr. Arefin's office and get immediate attention."
        />
        <meta property="og:url" content={`https://drarefin.com${PAGE_PATH}`} />
        <meta property="og:site_name" content="Dr. Murshidul Arefin" />
        <meta property="og:locale" content="en_BD" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString }} />

      <DrArefinHeader logoSrc={darkLogo} />

      {/* ============== 1 — HERO ============== */}
      <section className="relative overflow-hidden" aria-label="Reach Dr. Arefin directly">
        <div className="container px-4 sm:px-6 pt-14 pb-16 sm:pt-20 sm:pb-20 md:py-24 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-light mb-5">
                  First Time in Bangladesh
                </p>
              </Reveal>
              <Reveal delay={100}>
                <h1 className="text-fluid-h1 font-semibold leading-tight">
                  For the First Time in Bangladesh, Reach Your Doctor{" "}
                  <span className="text-primary-light">Directly.</span>
                </h1>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-6 max-w-2xl text-fluid-lede text-foreground/80">
                  No serial queues. No fighting traffic just to ask a question. From this page,
                  you reach{" "}
                  <Link to="/about/" title="About Dr. Murshidul Arefin — hepatobiliary surgeon in Dhaka">
                    <strong>Dr. Arefin's</strong>
                  </Link>{" "}
                  office directly — and every message gets immediate attention.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  {/* Nov 2026 feedback: form first — Send a Query leads, WhatsApp
                      second, Call Now removed from this hero. */}
                  <a href="#query-form" className="hero-cta-primary is-green no-underline" title="Send a query to Dr. Arefin's office">
                    <Send className="hero-cta-icon h-[18px] w-[18px]" aria-hidden />
                    Send a Query
                  </a>
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noreferrer"
                    className="hero-cta-secondary no-underline"
                    title="Chat with Dr. Arefin's office on WhatsApp"
                  >
                    <MessageCircle className="hero-cta-icon-sm h-[18px] w-[18px]" aria-hidden />
                    WhatsApp
                  </a>
                </div>
              </Reveal>
              <Reveal delay={400}>
                <ul className="mt-9 flex flex-wrap gap-2.5" aria-label="Credentials">
                  {TRUST_CHIPS.map((chip) => (
                    <li key={chip.label}>
                      <Link
                        to={chip.href}
                        title={chip.title}
                        className="inline-flex items-center rounded-full border border-white/15 px-4 py-2 text-[13px] font-medium text-foreground/85 transition-colors hover:border-primary-light hover:text-primary-light"
                      >
                        {chip.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <Reveal delay={200}>
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <img
                  src={portrait}
                  alt="Dr. Murshidul Arefin — gallbladder, liver and hepatobiliary surgeon in Dhanmondi, Dhaka"
                  className="w-full rounded-3xl border border-white/10 object-cover"
                  loading="eager"
                />
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-black/55 px-5 py-4 backdrop-blur-sm">
                  <p className="font-heading text-base font-semibold text-white">
                    Prof. Dr. Murshidul Arefin
                  </p>
                  <p className="text-[13px] text-white/75">
                    Hepatobiliary, Liver &amp; Gallbladder Surgeon — Popular Medical College Hospital, Dhanmondi
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============== 2 — STATS BAND ============== */}
      <section className="arefin-section-divider py-12 sm:py-14" aria-label="Dr. Arefin in numbers">
        <div className="container px-4 sm:px-6">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s) => (
              <Reveal key={s.value}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-6">
                  <s.icon className="mt-1 h-6 w-6 shrink-0 text-primary-light" aria-hidden />
                  <div>
                    <dt className="order-2 mt-1 block text-sm text-foreground/70">{s.label}</dt>
                    <dd className="font-heading text-xl font-semibold leading-snug">{s.value}</dd>
                  </div>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* ============== 3 — THE PAIN ============== */}
      <section className="py-12 sm:py-14 md:py-20 lg:py-28" aria-label="Why reaching a doctor in Bangladesh is hard">
        <div className="container px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
            <Reveal>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary-light">
                The Usual Story
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-fluid-h2 font-semibold leading-tight">
                Why reaching a doctor in <strong>Bangladesh</strong> is so hard
              </h2>
            </Reveal>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {PAIN_CARDS.map((card, i) => (
              <Reveal key={card.title} delay={i * 100}>
                <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 px-7 py-8">
                  <card.icon className="mb-5 h-8 w-8 text-primary-light" aria-hidden />
                  <h3 className="font-heading text-lg font-semibold">{card.title}</h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-foreground/75">{card.body}</p>
                  <p className="mt-5 border-t border-white/10 pt-4 text-sm font-medium text-primary-light">
                    Here, you start with a message — not a queue.
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============== 4 — THE DIFFERENCE ============== */}
      <section className="arefin-section-divider py-12 sm:py-14 md:py-20 lg:py-28" aria-label="The Dr. Arefin difference">
        <div className="container px-4 sm:px-6">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div>
              <Reveal>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary-light">
                  The Difference
                </p>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="text-fluid-h2 font-semibold leading-tight">
                  A direct line to the <strong>surgeon's office</strong>
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <div className="mt-6 space-y-5 text-fluid-lede text-foreground/80">
                  <p>
                    This website is watched by a dedicated team — engineers and support staff whose
                    only job is to make sure every call, WhatsApp message and form submission is
                    picked up and answered with <strong>immediate attention</strong>. Nothing sits
                    in an inbox. Nothing waits for the next chamber day.
                  </p>
                  <p>
                    And behind that team is the care itself: a{" "}
                    <Link to="/treatment/hepatobiliary-surgery/" title="Hepatobiliary surgery in Dhaka by Dr. Arefin">
                      <strong>hepatobiliary surgeon</strong>
                    </Link>{" "}
                    with 20+ years of practice and{" "}
                    <Link to="/credentials/1500-gallbladder-surgeries-dhaka/" title="1500+ gallbladder & hepatobiliary surgeries by Dr. Arefin in Dhaka">
                      <strong>1500+ surgeries</strong>
                    </Link>{" "}
                    across{" "}
                    <Link to="/treatment/gallbladder-surgery/" title="Gallbladder surgery in Dhanmondi, Dhaka">
                      <strong>gallbladder</strong>
                    </Link>
                    ,{" "}
                    <Link to="/treatment/liver-surgery/" title="Liver surgery in Dhaka by Dr. Arefin">
                      <strong>liver</strong>
                    </Link>
                    , bile duct and pancreatic care.
                  </p>
                </div>
              </Reveal>
            </div>
            <Reveal delay={200}>
              <ul className="space-y-4">
                {[
                  {
                    icon: Inbox,
                    title: "Every submission is seen",
                    body: "Form queries from this website go straight to the team — saved, emailed to the chamber inbox, and followed up.",
                  },
                  {
                    icon: Bell,
                    title: "Immediate attention",
                    body: "Calls, WhatsApp messages and queries are picked up as they arrive, not batched for later.",
                  },
                  {
                    icon: Headphones,
                    title: "A team, not a voicemail",
                    body: "Real people confirm your slot, answer questions about reports and visits, and guide you to the chamber.",
                  },
                ].map((row) => (
                  <li key={row.title} className="flex gap-5 rounded-2xl border border-white/10 bg-white/5 px-6 py-6">
                    <row.icon className="mt-0.5 h-6 w-6 shrink-0 text-primary-light" aria-hidden />
                    <div>
                      <h3 className="font-heading text-base font-semibold">{row.title}</h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-foreground/75">{row.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============== 5 — EXPERTISE ============== */}
      <section className="py-12 sm:py-14 md:py-20 lg:py-28" aria-label="Treatments by Dr. Arefin">
        <div className="container px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
            <Reveal>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary-light">
                Expertise
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-fluid-h2 font-semibold leading-tight">
                Care you can reach, from a <strong>surgeon you can trust</strong>
              </h2>
            </Reveal>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {MEGA_SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 4) * 80}>
                <Link
                  to={s.hub}
                  title={s.hubTitle}
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 px-6 py-7 no-underline transition-colors hover:border-primary-light/60"
                >
                  <h3 className="font-heading text-base font-semibold text-foreground">{s.display}</h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-foreground/70">{s.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary-light">
                    Explore
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============== 6 — HOW IT WORKS ============== */}
      <section className="arefin-section-divider py-12 sm:py-14 md:py-20 lg:py-28" aria-label="How to reach Dr. Arefin">
        <div className="container px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
            <Reveal>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary-light">
                How It Works
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-fluid-h2 font-semibold leading-tight">
                Reach Dr. Arefin in <strong>three steps</strong>
              </h2>
            </Reveal>
          </div>
          <ol className="grid gap-5 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} delay={i * 100}>
                <li className="h-full rounded-2xl border border-white/10 bg-white/5 px-7 py-8">
                  <span className="font-heading text-4xl font-bold text-primary-light">{step.n}</span>
                  <h3 className="mt-4 font-heading text-lg font-semibold">{step.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-foreground/75">{step.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ============== 7 — QUERY FORM ============== */}
      <section id="query-form" className="reach-form-band py-12 sm:py-14 md:py-20 lg:py-28" aria-label="Send a query to Dr. Arefin">
        <div className="container px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
            <Reveal>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary-light">
                Send a Query
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-fluid-h2 font-semibold leading-tight">
                Send a query — get <strong>immediate attention</strong>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 text-fluid-lede text-foreground/75">
                Fill in the form and his team will pick it up right away. Prefer to talk?{" "}
                <a href={MEGA_PHONE_HREF} title={`Call Dr. Arefin on ${MEGA_PHONE_DISPLAY}`}>
                  <strong>Call {MEGA_PHONE_DISPLAY}</strong>
                </a>{" "}
                or message on WhatsApp.
              </p>
            </Reveal>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-[1.6fr_1fr]">
            <Reveal delay={100}>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
                  <div className="contact-field">
                    <label htmlFor="reach-name" className="contact-label">Full Name</label>
                    <input
                      id="reach-name"
                      type="text"
                      required
                      maxLength={100}
                      placeholder="Your Full Name"
                      className="contact-input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="contact-field">
                    <label htmlFor="reach-email" className="contact-label">Email Address</label>
                    <input
                      id="reach-email"
                      type="email"
                      required
                      maxLength={255}
                      placeholder="Your Email Address"
                      className="contact-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="contact-field">
                    <label htmlFor="reach-phone" className="contact-label">Phone Number</label>
                    <input
                      id="reach-phone"
                      type="tel"
                      required
                      maxLength={20}
                      placeholder="Country Code + Phone"
                      className="contact-input"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="contact-field">
                    <label htmlFor="reach-concern" className="contact-label">Medical Concern</label>
                    <div className="contact-select-wrap">
                      <select
                        id="reach-concern"
                        required
                        className="contact-input contact-select"
                        value={formData.concern}
                        onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
                      >
                        <option value="">Select Your Medical Concern</option>
                        {medicalConcerns.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <ChevronDown className="contact-select-chev h-4 w-4" aria-hidden />
                    </div>
                  </div>
                </div>
                <div className="contact-field mt-5">
                  <label htmlFor="reach-message" className="contact-label">Message</label>
                  <textarea
                    id="reach-message"
                    rows={5}
                    maxLength={1000}
                    placeholder="Describe your condition or questions..."
                    className="contact-input contact-textarea"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <div className="contact-trap" aria-hidden="true">
                  <label htmlFor="reach-website">Website</label>
                  <input id="reach-website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                </div>
                {isOtherConcern(formData.concern) && (
                  <p className="contact-other-warning" role="alert">
                    This form is for patients only. Developers and job seekers: please do not submit your profile here — contact us via LinkedIn DMs only.
                  </p>
                )}
                {status === "success" && (
                  <p className="contact-form-status is-success" role="status">
                    Thank you! Your query has been sent. Dr. Arefin's team will contact you shortly.
                  </p>
                )}
                {status === "error" && (
                  <p className="contact-form-status is-error" role="alert">{errorText}</p>
                )}
                <div className="mt-8 flex justify-center">
                  <button type="submit" disabled={status === "sending"} className="hero-cta-primary contact-submit-btn">
                    {status === "sending" ? "Sending…" : "Send Query"}
                    <Send className="h-[18px] w-[18px]" aria-hidden />
                  </button>
                </div>
              </form>
            </Reveal>

            <Reveal delay={200}>
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-6">
                  <MapPin className="mb-3 h-6 w-6 text-primary-light" aria-hidden />
                  <h3 className="font-heading text-base font-semibold">Chamber</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-foreground/75">
                    Popular Medical College Hospital, House 25, Road 2, Dhanmondi, Dhaka 1205.
                    Visits run on scheduled afternoons and evenings.
                  </p>
                </div>
                <a href={MEGA_PHONE_HREF} className="block rounded-2xl border border-white/10 bg-white/5 px-6 py-6 no-underline transition-colors hover:border-primary-light/60" title={`Call Dr. Arefin on ${MEGA_PHONE_DISPLAY}`}>
                  <Phone className="mb-3 h-6 w-6 text-primary-light" aria-hidden />
                  <h3 className="font-heading text-base font-semibold text-foreground">Call the chamber</h3>
                  <p className="mt-1.5 text-[15px] text-foreground/75">{MEGA_PHONE_DISPLAY}</p>
                </a>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-2xl border border-white/10 bg-white/5 px-6 py-6 no-underline transition-colors hover:border-primary-light/60"
                  title="Chat with Dr. Arefin's office on WhatsApp"
                >
                  <MessageCircle className="mb-3 h-6 w-6 text-primary-light" aria-hidden />
                  <h3 className="font-heading text-base font-semibold text-foreground">WhatsApp</h3>
                  <p className="mt-1.5 text-[15px] text-foreground/75">
                    Message the office directly — reports, questions, or booking a slot.
                  </p>
                </a>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-6">
                  <Clock className="mb-3 h-6 w-6 text-primary-light" aria-hidden />
                  <h3 className="font-heading text-base font-semibold">Book an appointment</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-foreground/75">
                    Prefer the full booking page?{" "}
                    <Link to="/contact/" title="Contact Dr. Arefin — book an appointment in Dhanmondi, Dhaka">
                      <strong>Book an appointment here</strong>
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============== 8 — FAQ (the accordion carries its own heading,
          kicker and padding — same mint-band wrap as the homepage) ============== */}
      <div className="arefin-mint-band">
        <FAQAccordion
          items={getFaqsBySlugs([
            "chamber-address-and-visiting-hours-dhanmondi",
            "how-to-book-a-gallbladder-surgery-consultation-in-dhanmondi",
            "appointment-fees-and-payment-dhaka",
            "is-laparoscopic-cholecystectomy-available-in-dhanmondi",
          ])}
        />
      </div>

      {/* ============== 9 — FINAL CTA ============== */}
      <Reveal>
        <GlobalCTABand
          headingLead="Your doctor is "
          headingAccent="one message away."
          body={
            <>
              Skip the queue, the traffic and the waiting.{" "}
              <strong>
                <a href={MEGA_PHONE_HREF} title={`Call Dr. Arefin on ${MEGA_PHONE_DISPLAY}`}>
                  Call the chamber
                </a>
              </strong>
              , message on{" "}
              <strong>
                <a href={WHATSAPP_HREF} target="_blank" rel="noreferrer" title="Chat with Dr. Arefin's office on WhatsApp">
                  WhatsApp
                </a>
              </strong>
              , or{" "}
              <strong>
                <a href="#query-form" title="Send a query to Dr. Arefin's office">
                  send a query
                </a>
              </strong>{" "}
              — and Dr. Arefin's team will take it from there. Explore his{" "}
              <strong>
                <Link to="/treatment/" title="Treatment services — liver, gallbladder, pancreatic and biliary surgery in Dhaka">
                  treatments
                </Link>
              </strong>{" "}
              or read{" "}
              <strong>
                <Link to="/articles/" title="Articles on hepatobiliary, liver and gallbladder health by Dr. Arefin">
                  patient articles
                </Link>
              </strong>
              .
            </>
          }
        />
      </Reveal>

      {/* Form styles — the contact form's CSS lives in ContactDark's own
          <style> blocks, so this page carries the same rules (extracted
          verbatim 2026-10-21); only the card rule is re-scoped from
          .contact-form-band to this page's .reach-form-band. */}
      <style>{`
        .arefin.dark .reach-form-band .contact-form {
          background: hsl(0 0% 10%);
          border: 1px solid hsl(0 0% 22%);
          border-radius: 1.25rem;
          padding: 2.25rem;
          box-shadow: 0 12px 40px -20px hsl(0 0% 0% / 0.45);
        }
        .arefin .contact-field { display: flex; flex-direction: column; gap: 0.4rem; }
        .arefin .contact-label {
          font-size: 0.75rem; font-weight: 600;
          color: hsl(0 0% 96% / 0.78);
          text-transform: uppercase; letter-spacing: 0.08em;
        }
        .arefin .contact-input {
          background: hsl(0 0% 7%);
          border: 1px solid hsl(0 0% 24%);
          border-radius: 0.625rem;
          padding: 0.8rem 1rem;
          color: hsl(0 0% 96%);
          font-size: 0.938rem;
          transition: border-color 240ms ease, box-shadow 240ms ease, background 240ms ease;
          outline: none;
          font-family: inherit;
          width: 100%;
        }
        .arefin .contact-input::placeholder { color: hsl(0 0% 96% / 0.38); }
        .arefin .contact-input:focus,
        .arefin .contact-input:focus-visible {
          border-color: hsl(var(--primary-bright));
          box-shadow: 0 0 0 3px hsl(var(--primary-bright) / 0.22);
          background: hsl(0 0% 8%);
        }
        .arefin .contact-select-wrap { position: relative; }
        .arefin .contact-select { appearance: none; padding-right: 2.5rem; }
        .arefin .contact-select-chev {
          position: absolute; right: 0.875rem; top: 50%;
          transform: translateY(-50%);
          color: hsl(var(--primary-bright));
          pointer-events: none;
        }
        .arefin .contact-select option { background: hsl(0 0% 10%); color: hsl(0 0% 96%); }
        .arefin .contact-textarea { resize: vertical; min-height: 120px; }
        .arefin .contact-submit-btn { gap: 0.5rem; }
        .arefin .contact-submit-btn svg { transition: transform 240ms ease; }
        .arefin .contact-submit-btn:hover svg { transform: translateX(2px); }
        .arefin .contact-submit-btn:disabled { opacity: 0.7; cursor: wait; }
        .arefin .contact-trap { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
        .arefin .contact-other-warning,
        .arefin .contact-form-status {
          width: 100%;
          margin-top: 1.25rem;
          padding: 0.85rem 1rem;
          border-radius: 8px;
          font-size: 0.95rem;
          line-height: 1.5;
          font-weight: 600;
        }
        .arefin .contact-other-warning,
        .arefin .contact-form-status.is-error {
          background: hsl(0 85% 97%);
          color: hsl(0 72% 38%);
          border: 1px solid hsl(0 72% 50%);
        }
        .arefin .contact-form-status.is-success {
          background: hsl(150 60% 96%);
          color: hsl(150 70% 22%);
          border: 1px solid hsl(150 50% 40%);
        }
      `}</style>

      <DrArefinFooter />
    </div>
  );
};

export default FirstInBangladesh;
