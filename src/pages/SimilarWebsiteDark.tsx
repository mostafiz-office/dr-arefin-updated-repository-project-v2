import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Send } from "lucide-react";
import DrArefinHeader from "@/components/arefin/DrArefinHeader";
import DrArefinFooter from "@/components/arefin/DrArefinFooter";
import darkLogo from "@/assets/dr-arefin-logo-dark.webp";
import { buildBreadcrumbList, buildGraph } from "@/lib/structuredData";
import { appointmentSchema, sendAppointmentRequest } from "@/lib/appointmentRequest";

/* ── Website-lead form ──────────────────────────────────────────────
   Nov 2026: the top-bar "Get a Similar Website" button lands here.
   No new receiver and no snippet change: the lead posts to the existing
   arefin/v1/contact receiver with source "Similar website lead", so it
   lands in the same request list + team email as appointment requests,
   distinguished by that source label. The receiver's payload shape is the
   appointment shape, so the lead reuses it with a fixed concern value —
   "Website enquiry" — which also tells the chamber at a glance that this
   is an agency lead, not a patient. Business information travels inside
   the message (the receiver has no business field): business (≤300 chars)
   + message (≤600) + label stay under the receiver's 1000-char message
   cap. Fields per approval: name, phone, email, business required;
   message optional. No GlobalCTABand here — its buttons point at the
   appointment form, the wrong destination for an agency lead. */
export function buildWebsiteLeadMessage(business: string, message: string): string {
  const b = business.trim();
  const m = message.trim();
  return m ? `Business information: ${b}\n\n${m}` : `Business information: ${b}`;
}

const LEAD_CONCERN = "Website enquiry";
const LEAD_SOURCE = "Similar website lead";

const jsonLdString = buildGraph(
  buildBreadcrumbList([{ name: "Get a Similar Website", path: "/similar-website/" }]),
);

const SimilarWebsiteDark = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    business: "",
    message: "",
  });
  const [website, setWebsite] = useState(""); // hidden spam trap
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorText, setErrorText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = appointmentSchema.safeParse({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      concern: LEAD_CONCERN,
      message: buildWebsiteLeadMessage(formData.business, formData.message),
    });
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
        source: LEAD_SOURCE,
      });
      setStatus("success");
      setFormData({ name: "", phone: "", email: "", business: "", message: "" });
    } catch {
      setStatus("error");
      setErrorText("Sorry, your enquiry could not be sent. Please try again later.");
    }
  };

  return (
    <div className="arefin dark min-h-screen bg-background text-foreground font-arefin">
      <Helmet>
        <title>Get a Similar Website for Your Business | Riseup Asia</title>
        <meta name="description" content="Want a website like Dr. Arefin's for your business? Tell Riseup Asia about your business and we'll get back to you." />
        <link rel="canonical" href="https://drarefin.com/similar-website/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Get a Similar Website for Your Business | Riseup Asia" />
        <meta property="og:description" content="Want a website like Dr. Arefin's for your business? Tell Riseup Asia about your business and we'll get back to you." />
        <meta property="og:url" content="https://drarefin.com/similar-website/" />
        <meta property="og:site_name" content="Dr. Murshidul Arefin" />
        <meta property="og:locale" content="en_BD" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />

      <DrArefinHeader logoSrc={darkLogo} />

      <section
        className="py-14 sm:py-16 text-center"
        style={{ background: "hsl(40 6% 8%)" }}
      >
        <div className="container max-w-3xl mx-auto px-4">
          <h1 className="font-arefin-heading text-3xl sm:text-4xl font-bold text-white">
            Want a website like this one?
          </h1>
          <p className="mt-4 text-base sm:text-lg" style={{ color: "hsl(40 10% 80%)" }}>
            Riseup Asia designs and builds business websites. Tell us about
            your business and we&apos;ll get back to you.
          </p>
        </div>
      </section>

      <section className="container max-w-3xl mx-auto px-4 py-12 sm:py-14">
        <form onSubmit={handleSubmit} className="contact-form max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            <div className="contact-field">
              <label htmlFor="website-name" className="contact-label">Full Name</label>
              <input
                id="website-name"
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
              <label htmlFor="website-phone" className="contact-label">Phone Number</label>
              <input
                id="website-phone"
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
              <label htmlFor="website-email" className="contact-label">Email Address</label>
              <input
                id="website-email"
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
              <label htmlFor="website-business" className="contact-label">Business information</label>
              <textarea
                id="website-business"
                rows={2}
                required
                maxLength={300}
                placeholder="Your business name and type"
                className="contact-input contact-textarea"
                value={formData.business}
                onChange={(e) => setFormData({ ...formData, business: e.target.value })}
              />
            </div>
          </div>
          <div className="contact-field mt-5">
            <label htmlFor="website-message" className="contact-label">Message</label>
            <textarea
              id="website-message"
              rows={5}
              maxLength={600}
              placeholder="Tell us about your website needs..."
              className="contact-input contact-textarea"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>
          <div className="contact-trap" aria-hidden="true">
            <label htmlFor="website-website">Website</label>
            <input id="website-website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>
          {status === "success" && (
            <p className="contact-form-status is-success" role="status">
              Thank you! Your enquiry has been sent. Our team will get back to you.
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
              {status === "sending" ? "Sending…" : "Send Website Enquiry"}
              <Send className="h-[18px] w-[18px]" aria-hidden />
            </button>
          </div>
          <p className="mt-6 text-center text-sm" style={{ color: "hsl(40 10% 70%)" }}>
            This enquiry goes to Riseup Asia.{" "}
            <a
              href="https://riseup-asia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Visit Riseup Asia
            </a>
          </p>
        </form>
      </section>

      <DrArefinFooter />
    </div>
  );
};

export default SimilarWebsiteDark;
