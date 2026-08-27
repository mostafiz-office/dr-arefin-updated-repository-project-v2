import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight } from "lucide-react";
import DrArefinHeader from "@/components/arefin/DrArefinHeader";
import DrArefinFooter from "@/components/arefin/DrArefinFooter";
import FAQAccordion from "@/components/arefin/FAQAccordion";
import GlobalCTABand from "@/components/arefin/GlobalCTABand";
import SeoLink from "@/components/arefin/SeoLink";
import darkLogo from "@/assets/dr-arefin-logo-dark.webp";
import {
  findFAQBySlug,
  getRelatedFaqs,
  faqRegistry,
} from "@/data/faqRegistry";
import {
  physicianEntity,
  buildBreadcrumbList,
  buildGraph,
  buildFAQPageSchema,
} from "@/lib/structuredData";

const SITE_URL = "https://drarefin.com";

const FAQSinglePage = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const entry = findFAQBySlug(slug);

  if (!entry) {
    return <Navigate to="/" replace />;
  }

  const canonicalPath = `/${entry.slug}/`;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const title =
    entry.pageTitle ?? `${entry.q} — Dr. Murshidul Arefin`;
  const metaDesc =
    entry.metaDesc ??
    entry.aText.slice(0, 155).replace(/\s+\S*$/, "") +
      (entry.aText.length > 155 ? "…" : "");

  const related = getRelatedFaqs(entry.slug, 4);

  const questionSchema = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: entry.q,
      url: canonicalUrl,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.aText,
        author: { "@id": `${SITE_URL}/#physician` },
      },
    },
  };

  const breadcrumbSchema = buildBreadcrumbList([
    { name: "FAQ", path: "/faq/" },
    { name: entry.q, path: canonicalPath },
  ]);

  const relatedFaqSchema = buildFAQPageSchema(
    [entry, ...related].map((f) => ({ question: f.q, answer: f.aText }))
  );

  const jsonLd = buildGraph(
    { "@context": "https://schema.org", ...physicianEntity },
    breadcrumbSchema,
    questionSchema,
    ...(relatedFaqSchema ? [relatedFaqSchema] : []),
  );

  return (
    <div className="arefin dark min-h-screen bg-background text-foreground font-arefin">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDesc} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={metaDesc} />
        <script type="application/ld+json">{jsonLd}</script>
      </Helmet>

      <DrArefinHeader logoSrc={darkLogo} />

      <main id="main">
        {/* ── Hero / heading band ── */}
        <section className="faq-single-hero">
          <div className="container">
            <nav className="faq-breadcrumb" aria-label="Breadcrumb">
              <Link to="/" title="Dr. Arefin home">Home</Link>
              <ChevronRight className="bc-sep" aria-hidden />
              <span className="bc-current">FAQ</span>
              <ChevronRight className="bc-sep" aria-hidden />
              <span className="bc-current">{entry.q}</span>
            </nav>
            <p className="faq-kicker">Frequently asked</p>
            <h1 className="faq-h1">{entry.q}</h1>
          </div>
        </section>

        {/* ── Answer body ── */}
        <section className="faq-body">
          <div className="container max-w-3xl">
            <article className="faq-answer">
              {typeof entry.a === "string" ? <p>{entry.a}</p> : entry.a}
            </article>

            <div className="faq-back">
              <SeoLink
                to="/contact/"
                title="Book a consultation with Dr. Arefin"
              >
                Still have questions? Contact Dr. Arefin
              </SeoLink>
            </div>
          </div>
        </section>

        {/* ── Related questions (mint relief band) ── */}
        {related.length > 0 && (
          <div className="faq-related-band arefin-mint-band">
            <FAQAccordion
              kicker="Related questions"
              heading="People also ask"
              basePath=""
              items={related}
            />
          </div>
        )}

        <GlobalCTABand
          headingLead="Need "
          headingAccent="expert advice?"
          body={
            <>
              <SeoLink to="/about/" title="Dr. Murshidul Arefin profile and credentials">
                <span className="whitespace-nowrap">Dr. Murshidul Arefin</span>
              </SeoLink>{" "}
              consults at{" "}
              <SeoLink
                to="/popular-medical-college-hospital/"
                title="Dr. Arefin chamber at Popular Medical College Hospital"
              >
                Popular Medical College Hospital, Dhanmondi
              </SeoLink>
              . Book online or call to discuss your case.
            </>
          }
        />
      </main>

      <DrArefinFooter />

      <style>{`
        .arefin .faq-single-hero {
          padding: 6rem 0 2.5rem;
          background:
            radial-gradient(circle at 20% 0%, hsl(var(--primary-bright) / 0.08), transparent 60%),
            hsl(var(--background));
          border-bottom: 1px solid hsl(var(--border));
        }
        .arefin .faq-breadcrumb {
          display: flex; align-items: center; gap: 0.4rem;
          font-size: 0.85rem; color: hsl(var(--foreground) / 0.65);
          margin-bottom: 1.5rem; flex-wrap: wrap;
        }
        .arefin .faq-breadcrumb a {
          color: hsl(var(--foreground) / 0.65);
          text-decoration: none;
          transition: color 200ms ease;
        }
        .arefin .faq-breadcrumb a:hover { color: hsl(var(--primary-bright)); }
        .arefin .faq-breadcrumb .bc-sep { width: 14px; height: 14px; opacity: 0.5; }
        .arefin .faq-breadcrumb .bc-current { color: hsl(var(--foreground) / 0.85); }

        .arefin .faq-kicker {
          font-size: 0.78rem; font-weight: 600; letter-spacing: 0.22em;
          text-transform: uppercase; color: hsl(var(--primary-bright));
          margin-bottom: 0.75rem;
        }
        .arefin .faq-h1 {
          font-family: var(--font-arefin-heading, inherit);
          font-size: var(--fs-h1);
          line-height: var(--lh-h1);
          letter-spacing: var(--ls-h1);
          font-weight: 600;
          color: hsl(var(--foreground));
          max-width: 56rem;
        }

        .arefin .faq-body { padding: 3rem 0 2rem; }
        .arefin .faq-answer {
          color: hsl(var(--foreground) / 0.85);
          font-size: 1.05rem; line-height: 1.75;
        }
        .arefin .faq-answer > p { margin: 0 0 1rem; }
        .arefin .faq-answer > * + * { margin-top: 1rem; }
        .arefin .faq-back {
          margin-top: 2.5rem; padding-top: 1.5rem;
          border-top: 1px solid hsl(var(--border));
          font-weight: 600;
        }

        .arefin .faq-related-band { padding: 1rem 0 0; }

        @media (max-width: 640px) {
          .arefin .faq-single-hero { padding: 5rem 0 2rem; }
          .arefin .faq-body { padding: 2rem 0 1.5rem; }
        }
      `}</style>
    </div>
  );
};

export default FAQSinglePage;

/** Exposed so App.tsx can register a route per slug if needed. */
export const allFaqSlugs = () => faqRegistry.map((f) => f.slug);
