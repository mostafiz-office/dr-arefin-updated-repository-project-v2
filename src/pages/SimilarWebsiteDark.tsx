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

      <section className="container max-w-3xl mx-auto px-4 py-12 sm:py-14 contact-form-band">
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

      {/* Form styling — copied verbatim from ContactDark's page-local block.
          These contact-* classes have NO global CSS (nothing in index.css);
          each form page carries its own copy (FirstInBangladesh does the
          same). Without this block the form fell back to browser defaults:
          labels beside inputs, unstyled boxes, and a VISIBLE spam trap. */}
      <style>{`
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
        .arefin .contact-textarea { resize: vertical; min-height: 120px; }
        .arefin .contact-submit-btn {
          gap: 0.5rem;
        }
        .arefin .contact-submit-btn svg { transition: transform 240ms ease; }
        .arefin .contact-submit-btn:hover svg { transform: translateX(2px); }
        .arefin .contact-submit-btn:disabled { opacity: 0.7; cursor: wait; }
        .arefin .contact-trap { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
        .arefin .contact-form-status {
          width: 100%;
          margin-top: 1.25rem;
          padding: 0.85rem 1rem;
          border-radius: 8px;
          font-size: 0.95rem;
          line-height: 1.5;
          font-weight: 600;
        }
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
    </div>
  );
};

export default SimilarWebsiteDark;
