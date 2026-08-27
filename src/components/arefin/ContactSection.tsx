import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, Phone, Clock, Send, ExternalLink } from "lucide-react";
import { Reveal } from "@/hooks/useScrollReveal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";

/* ─────────── Validation schema (client-side guard) ─────────── */
const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be under 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Enter a valid email address" })
    .max(255, { message: "Email must be under 255 characters" }),
  phone: z
    .string()
    .trim()
    .max(30, { message: "Phone must be under 30 characters" })
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, { message: "Please enter at least 10 characters" })
    .max(1000, { message: "Message must be under 1000 characters" }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

/* ─────────── Detail block types ─────────── */
export interface ContactDetail {
  icon: "phone" | "email" | "address" | "hours";
  label: string;
  value: string;
  /** Optional href (tel:, mailto:, https://). If omitted, plain text. */
  href?: string;
}

const ICONS = {
  phone: Phone,
  email: Mail,
  address: MapPin,
  hours: Clock,
} as const;

interface ContactSectionProps {
  /** Section eyebrow / kicker. */
  kicker?: string;
  /** H2 heading text. */
  heading?: string;
  /** Short paragraph under heading. */
  intro?: string;
  /** Contact details list. */
  details?: ContactDetail[];
  /** Map embed URL (Google Maps "Embed a map" iframe src). */
  mapEmbedUrl?: string;
  /** Map deep-link (Google Maps URL) for "Open in Maps". */
  mapLink?: string;
  /** Friendly label for the map (e.g. clinic name). */
  mapLabel?: string;
  /** Override default form submit handler. Defaults to a toast confirmation. */
  onSubmit?: (values: ContactFormValues) => Promise<void> | void;
}

const DEFAULT_DETAILS: ContactDetail[] = [
  {
    icon: "phone",
    label: "Phone",
    value: "+880 1311-487592",
    href: "tel:+8801311487592",
  },
  {
    icon: "email",
    label: "Email",
    value: "info@drarefin.com",
    href: "mailto:info@drarefin.com",
  },
  {
    icon: "address",
    label: "Chamber",
    value: "Popular Medical College Hospital, Dhanmondi, Dhaka",
  },
  {
    icon: "hours",
    label: "Hours",
    value: "Sat – Thu · 6:00 PM – 9:00 PM",
  },
];

export const ContactSection = ({
  kicker = "Get in touch",
  heading = "Contact Dr. Arefin",
  intro = "Reach out for appointments, second opinions, or general questions. We typically reply within one business day.",
  details = DEFAULT_DETAILS,
  mapEmbedUrl,
  mapLink = "https://maps.google.com/?q=Popular+Medical+College+Hospital+Dhanmondi",
  mapLabel = "Popular Medical College Hospital, Dhanmondi",
  onSubmit,
}: ContactSectionProps) => {
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const handleSubmit = async (values: ContactFormValues) => {
    setSubmitting(true);
    try {
      if (onSubmit) {
        await onSubmit(values);
      } else {
        // No backend wired in — surface a friendly confirmation.
        await new Promise((r) => setTimeout(r, 400));
        toast({
          title: "Message received",
          description:
            "Thanks — we'll get back to you within one business day.",
        });
        form.reset();
      }
    } catch (err) {
      toast({
        title: "Could not send message",
        description:
          err instanceof Error ? err.message : "Please try again shortly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="contact-section py-20 md:py-24">
      <div className="container max-w-6xl">
        <Reveal>
          <div className="contact-section-header">
            {kicker && <div className="contact-section-kicker">{kicker}</div>}
            <h2 className="contact-section-h2">{heading}</h2>
            {intro && <p className="contact-section-intro">{intro}</p>}
          </div>
        </Reveal>

        <div className="contact-section-grid">
          {/* ── Left column: details + map placeholder ── */}
          <Reveal delay={80}>
            <aside className="contact-details-card">
              <ul className="contact-details-list">
                {details.map((d) => {
                  const Icon = ICONS[d.icon];
                  return (
                    <li key={`${d.label}-${d.value}`} className="contact-detail-item">
                      <span className="contact-detail-icon" aria-hidden="true">
                        <Icon size={18} />
                      </span>
                      <div className="contact-detail-text">
                        <div className="contact-detail-label">{d.label}</div>
                        {d.href ? (
                          <a href={d.href} className="contact-detail-value">
                            {d.value}
                          </a>
                        ) : (
                          <div className="contact-detail-value">{d.value}</div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Map: real embed if provided, else a placeholder block. */}
              <div className="contact-map">
                {mapEmbedUrl ? (
                  <iframe
                    src={mapEmbedUrl}
                    title={`Map — ${mapLabel}`}
                    loading="lazy"
                    className="contact-map-iframe"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="contact-map-placeholder" role="img" aria-label={`Map placeholder for ${mapLabel}`}>
                    <MapPin size={28} aria-hidden="true" />
                    <span className="contact-map-placeholder-label">{mapLabel}</span>
                    <span className="contact-map-placeholder-hint">Map embed coming soon</span>
                  </div>
                )}
                {mapLink && (
                  <a
                    href={mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-map-link"
                  >
                    Open in Google Maps <ExternalLink size={14} aria-hidden="true" />
                  </a>
                )}
              </div>
            </aside>
          </Reveal>

          {/* ── Right column: form ── */}
          <Reveal delay={140}>
            <div className="contact-form-card">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="contact-form"
                  noValidate
                >
                  <div className="contact-form-row">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              autoComplete="name"
                              placeholder="Your full name"
                              maxLength={100}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              autoComplete="email"
                              placeholder="you@example.com"
                              maxLength={255}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone (optional)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="tel"
                            autoComplete="tel"
                            placeholder="+880 ..."
                            maxLength={30}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={6}
                            placeholder="Briefly describe your concern or question..."
                            maxLength={1000}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <button
                    type="submit"
                    disabled={submitting}
                    className="hero-cta-primary is-green no-underline contact-submit-btn"
                  >
                    {submitting ? "Sending..." : "Send Message"}
                    <Send className="hero-cta-icon" />
                  </button>
                </form>
              </Form>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        .arefin .contact-section { background: hsl(var(--background)); }

        .arefin .contact-section-header {
          text-align: center;
          max-width: 42rem;
          margin: 0 auto 3rem auto;
        }
        .arefin .contact-section-kicker {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: hsl(var(--primary));
          margin-bottom: 0.75rem;
        }
        .arefin .contact-section-h2 {
          font-family: var(--font-arefin-heading, inherit);
          font-size: clamp(1.75rem, 3.4vw, 2.5rem);
          font-weight: 600;
          color: hsl(var(--foreground));
          line-height: 1.2;
          letter-spacing: -0.01em;
          margin-bottom: 1rem;
        }
        .arefin .contact-section-intro {
          color: hsl(var(--foreground) / 0.78);
          font-size: 1rem;
          line-height: 1.7;
        }

        .arefin .contact-section-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 900px) {
          .arefin .contact-section-grid {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
            gap: 2rem;
          }
        }

        /* ── Details card ── */
        .arefin .contact-details-card {
          background: hsl(0 0% 97%);
          color: hsl(var(--foreground));
          border-radius: 12px;
          padding: 1.75rem;
          border-left: 3px solid hsl(var(--primary));
        }
        .arefin .contact-details-list {
          list-style: none;
          margin: 0 0 1.5rem 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .arefin .contact-detail-item {
          display: flex;
          gap: 0.875rem;
          align-items: flex-start;
        }
        .arefin .contact-detail-icon {
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: hsl(var(--primary) / 0.12);
          color: hsl(var(--primary-darker));
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .arefin .contact-detail-label {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: hsl(220 9% 35%);
          margin-bottom: 0.125rem;
        }
        .arefin .contact-detail-value {
          color: hsl(220 13% 18%);
          font-size: 0.95rem;
          line-height: 1.5;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: color 200ms ease, border-color 200ms ease;
        }
        a.contact-detail-value:hover {
          color: hsl(var(--primary-darker));
          border-bottom-color: hsl(var(--primary-darker));
        }

        /* ── Map ── */
        .arefin .contact-map {
          margin-top: 0.5rem;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid hsl(220 13% 88%);
          background: hsl(220 14% 96%);
        }
        .arefin .contact-map-iframe {
          width: 100%;
          height: 220px;
          border: 0;
          display: block;
        }
        .arefin .contact-map-placeholder {
          height: 180px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.375rem;
          color: hsl(220 9% 40%);
          background:
            repeating-linear-gradient(
              45deg,
              hsl(220 14% 94%),
              hsl(220 14% 94%) 10px,
              hsl(220 14% 90%) 10px,
              hsl(220 14% 90%) 20px
            );
        }
        .arefin .contact-map-placeholder-label {
          font-weight: 600;
          color: hsl(220 13% 25%);
          font-size: 0.95rem;
        }
        .arefin .contact-map-placeholder-hint {
          font-size: 0.8rem;
          color: hsl(220 9% 45%);
        }
        .arefin .contact-map-link {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.625rem 0.875rem;
          font-size: 0.85rem;
          font-weight: 500;
          color: hsl(var(--primary-darker));
          text-decoration: none;
          border-top: 1px solid hsl(220 13% 88%);
          background: hsl(0 0% 99%);
          transition: background-color 200ms ease;
        }
        .arefin .contact-map-link:hover {
          background: hsl(var(--primary) / 0.08);
        }

        /* ── Form card ── */
        .arefin .contact-form-card {
          background: hsl(0 0% 97%);
          color: hsl(var(--foreground));
          border-radius: 12px;
          padding: 1.75rem;
        }
        .arefin .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.125rem;
        }
        .arefin .contact-form-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.125rem;
        }
        @media (min-width: 640px) {
          .arefin .contact-form-row { grid-template-columns: 1fr 1fr; }
        }
        .arefin .contact-form label {
          color: hsl(220 13% 18%);
          font-size: 0.85rem;
          font-weight: 600;
        }
        .arefin .contact-form input,
        .arefin .contact-form textarea {
          background: hsl(0 0% 100%);
          color: hsl(220 13% 18%);
          border: 1px solid hsl(220 13% 85%);
        }
        .arefin .contact-form input:focus-visible,
        .arefin .contact-form textarea:focus-visible {
          border-color: hsl(var(--primary));
          outline: none;
          box-shadow: 0 0 0 3px hsl(var(--primary) / 0.18);
        }
        .arefin .contact-submit-btn {
          align-self: flex-start;
          margin-top: 0.25rem;
        }
        .arefin .contact-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        @media (prefers-reduced-motion: reduce) {
          .arefin .contact-detail-value,
          .arefin .contact-map-link,
          .arefin .contact-form input,
          .arefin .contact-form textarea { transition: none; }
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
