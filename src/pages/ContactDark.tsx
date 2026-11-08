import { Link, useLocation } from "react-router-dom";
import { physicianEntity, buildBreadcrumbList, buildGraph } from "@/lib/structuredData";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import {
  ArrowRight,
  Phone,
  MapPin,
  Clock,
  Send,
  ChevronDown,
} from "lucide-react";
import DrArefinHeader from "@/components/arefin/DrArefinHeader";
import DrArefinFooter from "@/components/arefin/DrArefinFooter";
import SimilarWebsiteBar from "@/components/arefin/SimilarWebsiteBar";

import FAQAccordion from "@/components/arefin/FAQAccordion";
import darkLogo from "@/assets/dr-arefin-logo-dark.webp";
import heroBg from "@/assets/about-hero-ot-real.webp";
import { Reveal } from "@/hooks/useScrollReveal";
import { appointmentSchema, isOtherConcern, sendAppointmentRequest } from "@/lib/appointmentRequest";
import { SERVICES } from "@/data/satelliteMatrix";

/* ── Medical Concern Options ── */
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

/* ── FAQ data — Contact-page unique (no overlap with faqRegistry / other pages) ── */
const faqs: { q: string; aHtml: string }[] = [
  {
    q: "How quickly will I receive confirmation after submitting the appointment form?",
    aHtml:
      "Our team usually confirms <a href='/contact/' title='Appointment confirmation within 24 hours by Dr. Arefin team'><strong>appointment requests within 24 hours</strong></a> on working days, often sooner. You will receive a confirmation by <a href='tel:+8801311487592' title='Call Dr. Arefin chamber on +880 1311 487 592 for phone, SMS, or WhatsApp confirmation'><strong>phone call, SMS, or WhatsApp</strong></a> on <a href='tel:+8801311487592' title='Call Dr. Arefin hepatobiliary chamber on +880 1311 487 592'><strong>+880 1311 487 592</strong></a>, along with your <a href='/contact/' title='Chamber slot at Popular Medical College Hospital, Dhanmondi — Dr. Arefin hepatobiliary chamber'><strong>chamber slot at Popular Medical College Hospital, Dhanmondi</strong></a>. For <a href='/contact/' title='Same-day or urgent hepatobiliary consultations — call Dr. Arefin team'><strong>same-day or urgent hepatobiliary consultations</strong></a>, please call us directly instead of using the form.",
  },
  {
    q: "Can patients from outside Dhaka or abroad book a consultation with Dr. Arefin?",
    aHtml:
      "Yes. <a href='/about/' title='About Dr. Murshidul Arefin — fellowship-trained hepatobiliary surgeon in Dhaka'><strong>Dr. Arefin</strong></a> regularly consults <a href='/contact/' title='Hepatobiliary consultations for patients from across Bangladesh with Dr. Arefin'><strong>patients from across Bangladesh</strong></a> as well as <a href='/contact/' title='International hepatobiliary patients seen by Dr. Arefin in Dhaka'><strong>international patients</strong></a> from <a href='/contact/' title='International patients from India, Nepal, the Middle East and beyond seen by Dr. Arefin'><strong>India, Nepal, the Middle East, and beyond</strong></a>. We offer <a href='/contact/' title='WhatsApp video consultations with Dr. Arefin for remote hepatobiliary patients'><strong>WhatsApp video consultations</strong></a>, <a href='/contact/' title='Second-opinion reviews of imaging and biopsy reports by Dr. Arefin'><strong>second-opinion reviews of imaging and biopsy reports</strong></a>, and <a href='/contact/' title='Pre-travel planning for international patients arriving in Dhaka'><strong>pre-travel planning</strong></a> so you arrive in <a href='/contact/' title='Visit Dr. Arefin chamber at Popular Medical College Hospital, Dhanmondi, Dhaka'><strong>Dhaka</strong></a> with a clear <a href='/treatment/' title='Liver, gallbladder, bile duct and pancreatic surgery roadmap by Dr. Arefin'><strong>liver, gallbladder, bile duct, or pancreatic surgery</strong></a> roadmap.",
  },
  {
    q: "What medical reports and documents should I bring to my first chamber visit?",
    aHtml:
      "Please bring all <a href='/contact/' title='Bring previous prescriptions to your Dr. Arefin chamber visit'><strong>previous prescriptions</strong></a>, <a href='/contact/' title='Bring discharge summaries from prior hospitalisations'><strong>discharge summaries</strong></a>, recent <a href='/contact/' title='Bring blood tests — LFT, CBC and coagulation profile for hepatobiliary review'><strong>blood tests (LFT, CBC, coagulation profile)</strong></a>, and any <a href='/contact/' title='Bring ultrasound, CT, MRI, MRCP or PET-CT scans for hepatobiliary review'><strong>ultrasound, CT, MRI, MRCP or PET-CT scans</strong></a> related to your <a href='/treatment/' title='Liver, gallbladder, bile duct or pancreas treatment by Dr. Arefin'><strong>liver, gallbladder, bile duct or pancreas</strong></a>. If you have <a href='/contact/' title='Bring biopsy slides or histopathology reports for review by Dr. Arefin'><strong>biopsy slides or histopathology reports</strong></a>, bring those too. Soft copies on a USB drive or phone are equally welcome — Dr. Arefin reviews everything during your <a href='/treatment/hepatobiliary-surgery/' title='Hepatobiliary consultation with Dr. Arefin in Dhaka'><strong>hepatobiliary consultation</strong></a>.",
  },
  {
    q: "Is parking available at Popular Medical College Hospital and which entrance leads to Dr. Arefin's chamber?",
    aHtml:
      "Yes — <a href='/popular-medical-college-hospital/' title='Popular Medical College Hospital, Dhanmondi-02 — Dr. Arefin chamber location'><strong>Popular Medical College Hospital, Dhanmondi-02</strong></a> offers <a href='/contact/' title='On-site patient parking at Popular Medical College Hospital, Dhanmondi'><strong>on-site patient parking</strong></a>. Dr. Arefin sees patients in <a href='/contact/' title='Dr. Arefin chamber Room-304, Building-06, Popular Medical College Hospital'><strong>Room-304 (Building-06)</strong></a> and <a href='/contact/' title='Dr. Arefin chamber Room-302, Building-03, Popular Medical College Hospital'><strong>Room-302 (Building-03)</strong></a>. The <a href='/contact/' title='Building-06 entrance — most convenient route to Dr. Arefin chamber'><strong>Building-06 entrance</strong></a> is the most convenient — take the lift to the <a href='/contact/' title='Third floor — Dr. Arefin Hepatobiliary & Liver Transplant Chamber'><strong>third floor</strong></a> and follow signs for the <a href='/treatment/liver-transplant-surgery-dhaka/' title='Hepatobiliary & Liver Transplant Chamber of Dr. Arefin in Dhaka'><strong>Hepatobiliary &amp; Liver Transplant Chamber</strong></a>. Wheelchair access and lift support are available for elderly or post-operative patients.",
  },
  {
    q: "Can I reschedule or cancel an appointment, and are there any charges?",
    aHtml:
      "Yes — you can <a href='/contact/' title='Reschedule or cancel your Dr. Arefin appointment free of charge'><strong>reschedule or cancel free of charge</strong></a> by calling or messaging <a href='tel:+8801311487592' title='Call Dr. Arefin chamber on +880 1311 487 592 to reschedule'><strong>+880 1311 487 592</strong></a> at least <a href='/contact/' title='Give at least 4 hours notice before your appointment slot'><strong>4 hours before your slot</strong></a>. We will offer the <a href='/contact/' title='Next available Dr. Arefin chamber appointment time'><strong>next available chamber time</strong></a> that suits you. Repeated last-minute cancellations may delay future bookings during <a href='/contact/' title='Peak evening chamber hours 5–9 PM at Dr. Arefin chamber'><strong>peak evening hours (5–9 PM)</strong></a>, so early notice helps us serve other patients waiting for <a href='/treatment/hepatobiliary-surgery/' title='Hepatobiliary consultation with Dr. Arefin in Dhaka'><strong>hepatobiliary consultation</strong></a>.",
  },
];

/* ── JSON-LD ── */
const jsonLdString = buildGraph(
  buildBreadcrumbList([{ name: "Contact", path: "/contact/" }]),
  {
    "@context": "https://schema.org",
    ...physicianEntity,
    url: "https://drarefin.com/contact/",
  },
);

const ContactDark = () => {
  /* ?treatment= from treatment pages (Nov 2026 feedback, D3): labels the
     submission with its source treatment so the chamber can tell which page
     sent it. Unknown slugs pass through verbatim; no param = no source, as before. */
  const { search } = useLocation();
  const treatmentParam = new URLSearchParams(search).get("treatment") ?? "";
  const treatmentDisplay = SERVICES.find((s) => s.slug === treatmentParam)?.display;
  const treatmentSource = treatmentParam
    ? `Treatment page: ${treatmentDisplay ?? treatmentParam}`
    : "";
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
        ...(treatmentSource ? { source: treatmentSource } : {}),
      });
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", concern: "", message: "" });
    } catch {
      setStatus("error");
      setErrorText("Sorry, your request could not be sent. Please call +880 1311 487 592.");
    }
  };

  return (
    <div className="arefin dark min-h-screen bg-background text-foreground font-arefin">
      <Helmet>
        <title>Contact Dr. Murshidul Arefin — Book Appointment, Dhaka</title>
        <meta name="description" content="Contact Dr. Murshidul Arefin for hepatobiliary surgery consultations at Popular Medical College Hospital, Dhanmondi, Dhaka. Call, WhatsApp, or book an appointment online." />
        <link rel="canonical" href="https://drarefin.com/contact/" />
        <link rel="preload" as="image" href={heroBg} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contact Dr. Murshidul Arefin — Book Appointment, Dhaka" />
        <meta property="og:description" content="Contact Dr. Murshidul Arefin for hepatobiliary surgery consultations at Popular Medical College Hospital, Dhanmondi, Dhaka." />
        <meta property="og:url" content="https://drarefin.com/contact/" />
        <meta property="og:site_name" content="Dr. Murshidul Arefin" />
        <meta property="og:locale" content="en_BD" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />

      {/* Header overlays the hero — transparent mode */}
      <DrArefinHeader logoSrc={darkLogo} transparent />

      {/* ============== HERO — centered, full bg image (About-style parity) ============== */}
      <section
        className="contact-hero relative overflow-hidden"
        aria-label="Contact Dr. Murshidul Arefin"
      >
        <div className="contact-hero-bg absolute inset-0">
          <img
            src={heroBg}
            loading="eager"
            fetchPriority="high"
            alt=""
            aria-hidden="true"
            className="contact-hero-img block w-full h-full object-cover"
          />
          <div className="contact-hero-overlay absolute inset-0" />
        </div>
        <div className="container relative text-center pt-28 sm:pt-36 md:pt-44 lg:pt-48 pb-16 sm:pb-24 md:pb-32 lg:pb-36">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/60">
                <li>
                  <Link to="/" className="hover:text-white transition-colors" title="Dr. Arefin home">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-white">Contact</li>
              </ol>
            </nav>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="contact-hero-h1 text-fluid-h1">
              Book an Appointment
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="contact-hero-sub mt-6 max-w-2xl mx-auto text-fluid-lede">
              Reach out to <Link to="/about/" title="About Dr. Murshidul Arefin"><strong>Dr. Arefin</strong></Link> for{" "}
              <Link to="/treatment/" title="Hepatobiliary treatment services in Dhaka"><strong>expert hepatobiliary care</strong></Link> and{" "}
              <Link to="/about/patient-centered-care/" title="Personalised hepatobiliary consultations — patient-centred care by Dr. Arefin"><strong>personalised consultations.</strong></Link> Explore{" "}
              <Link to="/treatment/liver-surgery/" title="Liver surgery services"><strong>liver surgery</strong></Link>,{" "}
              <Link to="/treatment/gallbladder-surgery/" title="Gallbladder surgery services"><strong>gallbladder treatment</strong></Link>, and{" "}
              <Link to="/mentorship/" title="Surgical mentorship programs"><strong>mentorship programmes</strong></Link>. In a hurry? See the <Link to="/fastest-way-to-reach-a-doctor-in-bangladesh/" title="Fastest way to reach a doctor in Bangladesh — a first in Bangladesh"><strong>fastest way to reach Dr. Arefin</strong></Link>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CONTACT INFO CARDS section removed per request (General Enquiries / Official Address / Connect With Us) */}

      {/* ============== APPOINTMENT FORM — mint band relief, dark form card ============== */}
      <section
        id="appointment"
        className="arefin-section-divider contact-form-band arefin-mint-band py-12 sm:py-14 md:py-20 lg:py-28"
        aria-label="Book appointment with Dr. Arefin"
      >
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-4 contact-mint-kicker">
                Schedule a Visit
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="contact-section-heading text-fluid-h2 font-semibold mb-6 leading-tight">
                Book an <strong>Appointment</strong>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="contact-body-text text-fluid-lede">
                Fill out the form below and our team will <Link to="/contact/" title="Dr. Arefin team confirms your hepatobiliary appointment quickly"><strong>confirm your appointment</strong></Link> within{" "}
                <Link to="/contact/" title="Appointment confirmation within 24 hours by Dr. Arefin chamber"><strong>24 hours</strong></Link>. For urgent inquiries, please <a href="tel:+8801311487592" title="Call Dr. Arefin chamber directly on +880 1311 487 592"><strong>call us directly.</strong></a>
              </p>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <form
              onSubmit={handleSubmit}
              className="contact-form max-w-3xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                <div className="contact-field">
                  <label htmlFor="contact-name" className="contact-label">Full Name</label>
                  <input
                    id="contact-name"
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
                  <label htmlFor="contact-email" className="contact-label">Email Address</label>
                  <input
                    id="contact-email"
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
                  <label htmlFor="contact-phone" className="contact-label">Phone Number</label>
                  <input
                    id="contact-phone"
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
                  <label htmlFor="contact-concern" className="contact-label">Medical Concern</label>
                  <div className="contact-select-wrap">
                    <select
                      id="contact-concern"
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
                <label htmlFor="contact-message" className="contact-label">Message</label>
                <textarea
                  id="contact-message"
                  rows={5}
                  maxLength={1000}
                  placeholder="Describe your condition or questions..."
                  className="contact-input contact-textarea"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              <div className="contact-trap" aria-hidden="true">
                <label htmlFor="contact-website">Website</label>
                <input id="contact-website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </div>
              {isOtherConcern(formData.concern) && (
                <p className="contact-other-warning" role="alert">
                  This form is for patients only. Developers and job seekers: please do not submit your profile here — contact us via LinkedIn DMs only.
                </p>
              )}
              {status === "success" && (
                <p className="contact-form-status is-success" role="status">
                  Thank you! Your appointment request has been sent. Our team will contact you within 24 hours.
                </p>
              )}
              {status === "error" && (
                <p className="contact-form-status is-error" role="alert">{errorText}</p>
              )}
              <div className="mt-8 flex justify-center">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="hero-cta-primary contact-submit-btn"
                >
                  {status === "sending" ? "Sending…" : "Submit Appointment Request"}
                  <Send className="h-[18px] w-[18px]" aria-hidden />
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ============== MAP + CHAMBER — light cards on dark alt surface ============== */}
      <section className="arefin-section-divider py-12 sm:py-14 md:py-20 lg:py-28 bg-background contact-info-band" aria-label="Chamber location and directions">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16 max-w-3xl mx-auto">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-light mb-4">
                Visit Us
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="contact-section-heading text-fluid-h2 font-semibold text-foreground mb-6 leading-tight">
                Chamber <strong>Location</strong>
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Map */}
            <Reveal className="lg:col-span-3">
              <div className="contact-map-wrap arefin-card arefin-card-hover overflow-hidden h-full">
                <iframe
                  title="Hepatobiliary Surgeon Dr. Murshidul Arefin - Popular Medical College Hospital, Dhanmondi, Dhaka"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.2191720353176!2d90.3821875!3d23.7395625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b900671e3239%3A0xd1abdcca00446a01!2sHepatobiliary%20Surgeon%20Dr.%20Murshidul%20Arefin!5e0!3m2!1sen!2sbd!4v1777916300573!5m2!1sen!2sbd"
                  width="600"
                  height="450"
                  className="w-full h-full min-h-[280px] sm:min-h-[350px] md:min-h-[450px] border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>

            {/* Chamber Info */}
            <Reveal delay={150} className="lg:col-span-2">
              <div className="flex flex-col gap-4 sm:gap-6 h-full">
                <div className="contact-chamber-card contact-info-card arefin-card arefin-card-hover">
                  <div className="contact-info-icon-wrap mb-1">
                    <MapPin className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="contact-info-title">Popular Medical College Hospital</h3>
                  <p className="contact-info-text">
                    Room-304 (Building-06) &amp; Room-302 (Building-03)
                  </p>
                  <p className="contact-info-text">
                    Dhanmondi-02, 1205 Dhaka, Bangladesh
                  </p>
                  <a
                    href="https://maps.google.com/?q=Popular+Medical+College+Hospital+Dhanmondi+Dhaka"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-directions-link"
                    title="Get Directions to Dr. Arefin's Chamber"
                  >
                    Get Directions
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </a>
                </div>

                <div className="contact-chamber-card contact-info-card arefin-card arefin-card-hover">
                  <div className="contact-info-icon-wrap mb-1">
                    <Clock className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="contact-info-title">Visiting Hours</h3>
                  <p className="contact-info-text">Saturday – Thursday</p>
                  <p className="contact-info-text">5:00 PM – 9:00 PM</p>
                  <p className="contact-info-text contact-info-muted">Friday: Closed</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Trust strip — quick action row under the map */}
          <Reveal delay={250}>
            <ul className="contact-trust-strip" aria-label="Quick actions">
              <li>
                <a href="tel:+8801311487592" title="Call Dr. Arefin">
                  <Phone className="h-4 w-4" aria-hidden /> +880 1311 487 592
                </a>
              </li>
              <li>
                <a href="https://wa.me/8801311487592" target="_blank" rel="noopener noreferrer" title="WhatsApp Dr. Arefin">
                  <Send className="h-4 w-4" aria-hidden /> WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=Popular+Medical+College+Hospital+Dhanmondi+Dhaka"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Get directions"
                >
                  <MapPin className="h-4 w-4" aria-hidden /> Directions
                </a>
              </li>
              <li>
                <span><Clock className="h-4 w-4" aria-hidden /> Sat–Thu, 5–9 PM</span>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA "Ready for Expert Consultation?" removed per request */}

      {/* ============== FAQ — Contact-unique, sits above footer ============== */}
      <div className="home-faq-band arefin-mint-band">
        <Reveal>
          <FAQAccordion
            kicker="Common Questions"
            heading="Frequently Asked Questions"
            basePath=""
            items={faqs.map((f) => ({
              q: f.q,
              a: <p dangerouslySetInnerHTML={{ __html: f.aHtml }} />,
              aText: f.aHtml.replace(/<[^>]+>/g, ""),
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

      {/* Similar-website lead bar — Contact page only, in normal flow
          (scrolls away with the page, user-approved 2026-11-08). */}
      <SimilarWebsiteBar />

      <DrArefinFooter />

      <style>{`
        /* ───── Hero with OT background — header overlays, centered ───── */
        .arefin .contact-hero { min-height: 480px; }
        .arefin .contact-hero-img { filter: brightness(0.55) saturate(0.92); }
        .arefin .contact-hero-overlay {
          background: linear-gradient(
            to bottom,
            hsl(0 0% 0% / 0.65) 0%,
            hsl(0 0% 0% / 0.72) 50%,
            hsl(0 0% 0% / 0.82) 100%
          );
        }
        .arefin .contact-hero-h1 {
          color: #ffffff;
          text-shadow: 0 2px 20px hsl(0 0% 0% / 0.6);
          transition: text-shadow 280ms cubic-bezier(0.22,1,0.36,1),
                      color 280ms cubic-bezier(0.22,1,0.36,1);
          cursor: default;
        }
        .arefin .contact-hero-h1:hover {
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
          color: hsl(var(--primary));
        }
        .arefin .contact-hero-sub { color: hsl(0 0% 100% / 0.85); }
        .arefin .contact-hero-sub strong { color: inherit; font-weight: inherit; }
        /* Hero intro links: inherit body color, no underline at rest; green + shadow on hover */
        .arefin .contact-hero-sub a {
          color: inherit;
          text-decoration: none;
          border-bottom: none;
          transition: color 220ms cubic-bezier(0.22,1,0.36,1),
                      text-shadow 220ms cubic-bezier(0.22,1,0.36,1);
        }
        .arefin .contact-hero-sub a:hover,
        .arefin .contact-hero-sub a:focus-visible {
          color: hsl(var(--primary));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }
        .arefin .contact-hero-sub a strong { color: inherit; font-weight: inherit; }

        /* ── Section heading hover ink ── */
        .arefin .contact-section-heading { color: hsl(var(--foreground)); }
        .arefin .contact-section-heading strong {
          color: inherit; font-weight: inherit; cursor: default;
          transition: color 240ms cubic-bezier(0.22,1,0.36,1), text-shadow 240ms cubic-bezier(0.22,1,0.36,1);
        }
        .arefin .contact-section-heading strong:hover {
          color: hsl(var(--primary));
          text-shadow: 1px 1px 0 hsl(var(--foreground));
        }
        .arefin .contact-body-text { color: hsl(var(--foreground) / 0.75); }
        .arefin .contact-body-text strong { color: inherit; font-weight: inherit; }

        /* Mint band kicker stays brand-green on light bg */
        .arefin.dark .contact-mint-kicker { color: hsl(142 71% 28%); }
        .arefin.dark .arefin-mint-band .contact-section-heading,
        .arefin.dark .arefin-mint-band .contact-section-heading strong {
          color: hsl(0 0% 8%);
        }
        .arefin.dark .arefin-mint-band .contact-body-text { color: hsl(0 0% 18%); }
        .arefin.dark .arefin-mint-band .contact-section-heading strong:hover {
          color: hsl(var(--primary-darker));
          text-shadow: 1px 1px 0 hsl(0 0% 100%);
        }

        /* ── Contact info cards: LIGHT cards on DARK section (Surface Elevation Rule) ── */
        .arefin .contact-info-card {
          padding: 1.5rem 1.25rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.625rem;
          height: 100%;
          border-radius: 1rem;
        }
        @media (min-width: 640px) {
          .arefin .contact-info-card { padding: 2rem; gap: 0.75rem; min-height: 240px; }
        }
        .arefin.dark .contact-info-band .contact-info-card {
          background: hsl(0 0% 97%);
          color: hsl(0 0% 12%);
          border: 1px solid hsl(0 0% 88%);
          border-left: 3px solid hsl(0 0% 88%);
        }
        .arefin.dark .contact-info-band .contact-info-card:hover {
          border-left-color: hsl(var(--primary-bright));
          box-shadow: 8px 8px 0 hsl(0 0% 0% / 0.85);
        }
        .arefin .contact-info-icon-wrap {
          width: 3rem; height: 3rem;
          border-radius: 0.875rem;
          background: hsl(var(--primary) / 0.14);
          color: hsl(var(--primary-darker));
          display: flex; align-items: center; justify-content: center;
        }
        @media (min-width: 640px) {
          .arefin .contact-info-icon-wrap { width: 3.5rem; height: 3.5rem; border-radius: 1rem; }
        }
        .arefin .contact-info-title {
          font-size: 1.0625rem; font-weight: 700;
          color: hsl(0 0% 12%);
          transition: color 280ms cubic-bezier(0.22,1,0.36,1), text-shadow 280ms cubic-bezier(0.22,1,0.36,1);
        }
        .arefin .contact-info-card:hover .contact-info-title {
          color: hsl(var(--primary-darker));
          text-shadow: 1px 1px 0 hsl(0 0% 100%);
        }
        .arefin .contact-info-link,
        .arefin .contact-info-text {
          color: hsl(0 0% 28%);
          font-size: 0.9rem;
          line-height: 1.6;
          margin: 0;
          text-decoration: none;
          word-break: break-word;
        }
        .arefin .contact-info-link { display: block; transition: color 220ms ease; }
        .arefin .contact-info-link:hover { color: hsl(var(--primary-darker)); }
        .arefin .contact-info-muted { color: hsl(0 0% 48%); font-size: 0.85rem; }

        /* Social row sits inside Connect card — sized to balance the trio */
        .arefin .contact-social-links {
          display: flex; gap: 0.625rem; justify-content: center; margin-top: 0.25rem; flex-wrap: wrap;
        }
        .arefin .contact-social-link {
          width: 2.5rem; height: 2.5rem;
          border-radius: 0.75rem;
          background: hsl(var(--primary) / 0.12);
          color: hsl(0 0% 22%);
          display: flex; align-items: center; justify-content: center;
          transition: background 240ms ease, color 240ms ease;
        }
        .arefin .contact-social-link:hover {
          background: hsl(var(--primary-bright));
          color: #fff;
        }

        /* Directions link inside chamber card */
        .arefin .contact-directions-link {
          margin-top: 0.5rem;
          display: inline-flex; align-items: center; gap: 0.5rem;
          color: hsl(var(--primary-darker));
          font-weight: 600; font-size: 0.875rem;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: color 220ms ease, border-color 220ms ease, text-shadow 220ms ease;
        }
        .arefin .contact-directions-link:hover {
          color: hsl(var(--primary-bright));
          border-bottom-color: hsl(var(--primary-bright));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* ── Form on mint band: dark form card ── */
        .arefin.dark .contact-form-band .contact-form {
          background: hsl(0 0% 10%);
          border: 1px solid hsl(0 0% 22%);
          border-radius: 1.25rem;
          padding: 1.5rem;
          box-shadow: 0 12px 40px -20px hsl(0 0% 0% / 0.45);
        }
        @media (min-width: 640px) {
          .arefin.dark .contact-form-band .contact-form { padding: 2.25rem; }
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
          padding: 0.75rem 0.875rem;
          color: hsl(0 0% 96%);
          font-size: 16px;
          transition: border-color 240ms ease, box-shadow 240ms ease, background 240ms ease;
          outline: none;
          font-family: inherit;
          width: 100%;
        }
        @media (min-width: 640px) {
          .arefin .contact-input { padding: 0.8rem 1rem; font-size: 0.938rem; }
        }
        .arefin .contact-input::placeholder { color: hsl(0 0% 96% / 0.38); }
        .arefin .contact-input:focus,
        .arefin .contact-input:focus-visible {
          border-color: hsl(var(--primary-bright));
          box-shadow: 0 0 0 3px hsl(var(--primary-bright) / 0.22);
          background: hsl(0 0% 8%);
        }

        /* Custom select with inline-SVG chevron via component (no background-image) */
        .arefin .contact-select-wrap { position: relative; }
        .arefin .contact-select {
          appearance: none;
          padding-right: 2.5rem;
        }
        .arefin .contact-select-chev {
          position: absolute; right: 0.875rem; top: 50%;
          transform: translateY(-50%);
          color: hsl(var(--primary-bright));
          pointer-events: none;
        }
        .arefin .contact-select option { background: hsl(0 0% 10%); color: hsl(0 0% 96%); }
        .arefin .contact-textarea { resize: vertical; min-height: 120px; }

        /* Submit button — reuse hero-cta-primary token, add icon spacing */
        .arefin .contact-submit-btn {
          gap: 0.5rem;
        }
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

        /* Trust strip under map */
        .arefin .contact-trust-strip {
          margin: 2rem auto 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.6rem 0.85rem;
          max-width: 56rem;
        }
        .arefin .contact-trust-strip li a,
        .arefin .contact-trust-strip li span {
          display: inline-flex; align-items: center; gap: 0.45rem;
          padding: 0.55rem 1rem;
          border-radius: 999px;
          font-size: 0.875rem; font-weight: 500;
          background: hsl(0 0% 10%);
          color: hsl(0 0% 92%);
          border: 1px solid hsl(0 0% 22%);
          text-decoration: none;
          transition: border-color 220ms ease, color 220ms ease, background 220ms ease;
        }
        .arefin .contact-trust-strip li a:hover {
          color: hsl(var(--primary-bright));
          border-color: hsl(var(--primary-bright) / 0.6);
        }
      `}</style>
    </div>
  );
};

export default ContactDark;
