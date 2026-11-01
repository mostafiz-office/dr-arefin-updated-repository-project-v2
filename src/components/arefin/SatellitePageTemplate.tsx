import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import DrArefinHeader from "@/components/arefin/DrArefinHeader";
import DrArefinFooter from "@/components/arefin/DrArefinFooter";
import darkLogo from "@/assets/dr-arefin-logo-dark.webp";
import SeoLink from "@/components/arefin/SeoLink";
import GlobalCTABand from "@/components/arefin/GlobalCTABand";
import HeroSection from "@/components/arefin/HeroSection";
import FAQAccordion from "@/components/arefin/FAQAccordion";
import BodyContentSection from "@/components/arefin/BodyContentSection";
import { physicianEntity, buildBreadcrumbList, buildGraph } from "@/lib/structuredData";
import type { SatellitePage } from "@/data/satellitePages";

/* Map every gallery asset so we can resolve string paths from data file. */
const galleryAssets = import.meta.glob("/src/assets/gallery/*.{jpg,png,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const SITE_URL = "https://drarefin.com";

interface Props {
  page: SatellitePage;
}

export const SatellitePageTemplate = ({ page }: Props) => {
  /* Treatment attribution (Nov 2026 feedback, D2/D3): only pages under
     /treatment/ get the form-first band; mentorship/conditions pages keep Call.
     The slug is the first segment after /treatment/ (service, matrix area page,
     or topic hub) — the contact page labels the submission with it. */
  const { pathname } = useLocation();
  const treatmentSeg = pathname.startsWith("/treatment/")
    ? pathname.split("/").filter(Boolean)[1]
    : undefined;
  const heroSrc = galleryAssets[page.heroImage] ?? page.heroImage;
  const canonicalPath = page.slug.endsWith("/") ? page.slug : page.slug + "/";
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const ogImage = heroSrc.startsWith("http") ? heroSrc : `${SITE_URL}${heroSrc}`;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  // MedicalCondition for /conditions/*, MedicalProcedure for /treatment/*, otherwise MedicalWebPage
  const isCondition = page.slug.startsWith("/conditions/");
  const subjectEntity = isCondition
    ? {
        "@context": "https://schema.org",
        "@type": "MedicalCondition",
        name: page.h1,
        url: canonicalUrl,
      }
    : {
        "@context": "https://schema.org",
        "@type": "MedicalProcedure",
        name: page.h1,
        url: canonicalUrl,
        procedureType: "https://schema.org/SurgicalProcedure",
        performedBy: { "@id": `${SITE_URL}/#physician` },
      };

  const jsonLdString = buildGraph(
    { "@context": "https://schema.org", ...physicianEntity },
    buildBreadcrumbList([{ name: page.kicker, path: canonicalPath }]),
    faqJsonLd,
    subjectEntity,
  );

  return (
    <div className="arefin dark min-h-screen bg-background text-foreground font-arefin">
      <Helmet>
        <title>{page.title}</title>
        <meta name="description" content={page.metaDesc} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.metaDesc} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.title} />
        <meta name="twitter:description" content={page.metaDesc} />
        <meta name="twitter:image" content={ogImage} />
        <script type="application/ld+json">{jsonLdString}</script>
      </Helmet>

      <a href="#main" className="satellite-skip-link">Skip to content</a>

      <DrArefinHeader logoSrc={darkLogo} />

      <main id="main">
        <HeroSection
          imageSrc={heroSrc}
          imageAlt={page.heroAlt}
          breadcrumb={page.kicker}
          kicker={page.kicker}
          h1={page.h1}
          introHtml={page.intro}
        />

        <BodyContentSection sections={page.sections} />

        <FAQAccordion items={page.faq} />

        {/* ========== FINAL CTA (shared) ========== */}
        <GlobalCTABand
          formCta={Boolean(treatmentSeg)}
          treatmentSlug={treatmentSeg}
          headingLead="Need "
          headingAccent="expert advice?"
          body={
            <>
              <SeoLink to="/about/" title="Dr. Murshidul Arefin profile and credentials">
                <span className="whitespace-nowrap">Dr. Murshidul Arefin</span>
              </SeoLink>{" "}
              consults at{" "}
              <SeoLink to="/popular-medical-college-hospital/" title="Dr. Arefin chamber at Popular Medical College Hospital">
                Popular Medical College Hospital, Dhanmondi
              </SeoLink>
              . Book online or call to discuss your case.
            </>
          }
        />
      </main>

      <DrArefinFooter />

      {/* ============== STYLES (skip link only — body/hero/FAQ/CTA are in their own components) ============== */}
      <style>{`
        .arefin .satellite-skip-link {
          position: absolute; left: -9999px; top: 0;
          padding: 0.75rem 1rem;
          background: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
          z-index: 1000; border-radius: 0 0 8px 0;
          font-weight: 600;
        }
        .arefin .satellite-skip-link:focus { left: 0; }
      `}</style>
    </div>
  );
};

export default SatellitePageTemplate;
