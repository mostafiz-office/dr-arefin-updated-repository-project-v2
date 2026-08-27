import { Link, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowRight } from "lucide-react";
import DrArefinHeader from "@/components/arefin/DrArefinHeader";
import DrArefinFooter from "@/components/arefin/DrArefinFooter";
import darkLogo from "@/assets/dr-arefin-logo-dark.webp";
import FAQAccordion from "@/components/arefin/FAQAccordion";
import GlobalCTABand from "@/components/arefin/GlobalCTABand";
import { Reveal } from "@/hooks/useScrollReveal";
import { buildBreadcrumbList, buildGraph } from "@/lib/structuredData";
import {
  galleryImages,
  slugifyAlt,
  type GalleryImage,
} from "./GalleryDark";

/**
 * T33 — Per-image gallery detail page.
 * Route: /gallery/:slug/
 * - Looks up the image by `slugifyAlt(alt)`
 * - Renders SEO-focused H1, description, image and a per-image FAQ
 * - Links back to /gallery/ and to prev/next images in the same category
 */

/* ── Per-category SEO copy + FAQ templates ──────────────────────────────
   T31: every Q&A follows the gallbladder satellite-page format:
   gallbladder-keyword question + answer with internal links to the
   /treatment/gallbladder-surgery, /treatment/laparoscopic-cholecystectomy-dhaka,
   /treatment/liver-surgery, /treatment/liver-transplant-surgery-dhaka,
   /treatment/biliary-stricture-reconstruction-dhaka and /treatment/pancreatic-surgery
   satellite pages. Answers are JSX so React Router Links are real anchors. */
import type { ReactNode } from "react";
const CATEGORY_COPY: Record<
  GalleryImage["category"],
  { intro: (alt: string) => string; faqs: { q: string; a: ReactNode; aText?: string }[] }
> = {
  "Operation Theater": {
    intro: (alt) =>
      `${alt}. This image is from <a href="/about/" title="About Dr. Murshidul Arefin"><strong>Dr. Murshidul Arefin's</strong></a> hepatobiliary operating theatre at Popular Medical College Hospital, Dhanmondi, Dhaka — where <a href="/treatment/laparoscopic-cholecystectomy-dhaka/" title="Laparoscopic cholecystectomy in Dhaka"><strong>laparoscopic</strong></a> and open <a href="/treatment/liver-surgery/" title="Liver surgery by Dr. Arefin"><strong>liver</strong></a>, <a href="/treatment/gallbladder-surgery/" title="Gallbladder surgery in Dhaka"><strong>gallbladder</strong></a>, <a href="/treatment/biliary-stricture-reconstruction-dhaka/" title="Biliary surgery in Dhaka"><strong>biliary</strong></a> and <a href="/treatment/pancreatic-surgery/" title="Pancreatic surgery in Dhaka"><strong>pancreatic surgeries</strong></a> are performed daily by his team.`,
    faqs: [
      {
        q: "What is gallbladder surgery in Dhanmondi?",
        a: (
          <>
            <Link to="/treatment/gallbladder-surgery/" title="Gallbladder surgery in Dhaka">Gallbladder surgery</Link> at Dr. Arefin's Dhanmondi theatre most often means <Link to="/treatment/laparoscopic-cholecystectomy-dhaka/" title="Laparoscopic cholecystectomy in Dhaka">laparoscopic cholecystectomy</Link> for symptomatic stones, with open conversion only when oncologic or anatomic safety demands it.
          </>
        ),
        aText:
          "Gallbladder surgery at Dr. Arefin's Dhanmondi theatre most often means laparoscopic cholecystectomy for symptomatic stones, with open conversion only when oncologic or anatomic safety demands it.",
      },
      {
        q: "Does Dr. Arefin also operate on liver and bile duct cases here?",
        a: (
          <>
            Yes — the same operating theatre is used for <Link to="/treatment/liver-surgery/" title="Liver surgery by Dr. Arefin">liver resections</Link>, <Link to="/treatment/liver-transplant-surgery-dhaka/" title="Liver transplant surgery in Dhaka">liver-transplant work</Link>, <Link to="/treatment/biliary-stricture-reconstruction-dhaka/" title="Biliary stricture reconstruction in Dhaka">biliary stricture reconstruction</Link> and <Link to="/treatment/pancreatic-surgery/" title="Pancreatic surgery in Dhaka">pancreatic surgery</Link>.
          </>
        ),
        aText:
          "Yes — the same operating theatre is used for liver resections, liver-transplant work, biliary stricture reconstruction and pancreatic surgery.",
      },
      {
        q: "Where does Dr. Arefin operate in Dhaka?",
        a: "Dr. Arefin operates at Popular Medical College Hospital, Dhanmondi, Dhaka — a tertiary centre with dedicated hepatobiliary anaesthesia, ICU and interventional radiology support.",
      },
      {
        q: "Is laparoscopic surgery available with Dr. Arefin?",
        a: "Yes. Dr. Arefin performs laparoscopic gallbladder, liver and selected biliary surgeries using modern Storz laparoscopic systems whenever clinically safe.",
      },
      {
        q: "How can I book a surgical consultation in Dhanmondi?",
        a: "Call +880 1311 487 592 or message on WhatsApp. The chamber is at Popular Medical College Hospital, House 25, Road 2, Dhanmondi 1205.",
      },
    ],
  },
  "Conference & Training": {
    intro: (alt) =>
      `${alt}. <a href="/about/" title="About Dr. Murshidul Arefin"><strong>Dr. Murshidul Arefin</strong></a> regularly speaks at and attends national and international <a href="/treatment/liver-surgery/" title="Hepatobiliary surgery in Dhaka"><strong>hepatobiliary surgery</strong></a> conferences, <a href="/mentorship/operative-skills-workshop/" title="Operative skills workshop"><strong>workshops</strong></a> and <a href="/mentorship/" title="Surgical mentorship programmes"><strong>training events</strong></a> — sharing experience from Popular Medical College Hospital, Dhanmondi, Dhaka.`,
    faqs: [
      {
        q: "Does Dr. Arefin offer gallbladder-surgery training to other doctors?",
        a: (
          <>
            Yes — the <Link to="/mentorship/operative-skills-workshop/" title="Operative skills workshop">operative skills workshop</Link> and the wider <Link to="/mentorship/" title="Surgical mentorship programmes">mentorship programme</Link> include <Link to="/treatment/laparoscopic-cholecystectomy-dhaka/" title="Laparoscopic cholecystectomy in Dhaka">laparoscopic cholecystectomy</Link> as a core hands-on module alongside <Link to="/treatment/liver-surgery/" title="Liver surgery training">liver</Link> and <Link to="/treatment/pancreatic-surgery/" title="Pancreatic surgery training">pancreatic surgery</Link>.
          </>
        ),
        aText:
          "Yes — the operative skills workshop and the wider mentorship programme include laparoscopic cholecystectomy as a core hands-on module alongside liver and pancreatic surgery.",
      },
      {
        q: "Which gallbladder topics are covered at conferences?",
        a: (
          <>
            Sessions typically cover difficult <Link to="/treatment/gallbladder-surgery/" title="Gallbladder surgery in Dhaka">gallbladder anatomy</Link>, safe <Link to="/treatment/laparoscopic-cholecystectomy-dhaka/" title="Laparoscopic cholecystectomy in Dhaka">laparoscopic cholecystectomy</Link>, prevention of bile duct injury and <Link to="/treatment/biliary-stricture-reconstruction-dhaka/" title="Biliary stricture reconstruction">post-injury reconstruction</Link>.
          </>
        ),
        aText:
          "Sessions typically cover difficult gallbladder anatomy, safe laparoscopic cholecystectomy, prevention of bile duct injury and post-injury reconstruction.",
      },
      {
        q: "Does Dr. Arefin teach hepatobiliary surgery?",
        a: "Yes. As Associate Professor at Popular Medical College Hospital, Dhanmondi, Dr. Arefin runs a structured mentorship and observership programme for MBBS students, postgraduates and visiting fellows.",
      },
      {
        q: "How can I attend Dr. Arefin's training programmes?",
        a: "Contact the chamber on +880 1311 487 592 or via WhatsApp to ask about the next observership intake or surgical workshop in Dhanmondi.",
      },
      {
        q: "Does Dr. Arefin speak at international conferences?",
        a: "Yes. Dr. Arefin presents and chairs sessions at hepatobiliary, transplant and surgical congresses in Bangladesh and abroad.",
      },
    ],
  },
  Chamber: {
    intro: (alt) =>
      `${alt}. <a href="/about/" title="About Dr. Murshidul Arefin"><strong>Dr. Murshidul Arefin</strong></a> sees patients at his Dhanmondi chamber inside Popular Medical College Hospital, House 25, Road 2, Dhanmondi 1205 — for <a href="/treatment/liver-surgery/" title="Liver consultations in Dhaka"><strong>liver</strong></a>, <a href="/treatment/gallbladder-surgery/" title="Gallbladder consultations in Dhaka"><strong>gallbladder</strong></a>, <a href="/treatment/biliary-stricture-reconstruction-dhaka/" title="Biliary consultations in Dhaka"><strong>biliary</strong></a> and <a href="/treatment/pancreatic-surgery/" title="Pancreatic consultations in Dhaka"><strong>pancreatic consultations</strong></a>.`,
    faqs: [
      {
        q: "Where do I book a gallbladder consultation in Dhanmondi?",
        a: (
          <>
            Book at Dr. Arefin's Dhanmondi chamber for a <Link to="/treatment/gallbladder-surgery/" title="Gallbladder surgery consultation">gallbladder consultation</Link>; many patients are also seen for <Link to="/treatment/laparoscopic-cholecystectomy-dhaka/" title="Laparoscopic cholecystectomy in Dhaka">laparoscopic cholecystectomy</Link> planning or <Link to="/treatment/biliary-stricture-reconstruction-dhaka/" title="Biliary stricture reconstruction">post-cholecystectomy bile duct review</Link>.
          </>
        ),
        aText:
          "Book at Dr. Arefin's Dhanmondi chamber for a gallbladder consultation; many patients are also seen for laparoscopic cholecystectomy planning or post-cholecystectomy bile duct review.",
      },
      {
        q: "Which hepatobiliary conditions are reviewed at the chamber?",
        a: (
          <>
            The chamber sees <Link to="/treatment/gallbladder-surgery/" title="Gallbladder disease in Dhaka">gallbladder</Link>, <Link to="/treatment/liver-surgery/" title="Liver disease in Dhaka">liver</Link>, <Link to="/treatment/liver-transplant-surgery-dhaka/" title="Liver transplant consultation in Dhaka">liver-transplant</Link>, <Link to="/treatment/biliary-stricture-reconstruction-dhaka/" title="Biliary disease in Dhaka">biliary</Link> and <Link to="/treatment/pancreatic-surgery/" title="Pancreatic disease in Dhaka">pancreatic</Link> referrals.
          </>
        ),
        aText:
          "The chamber sees gallbladder, liver, liver-transplant, biliary and pancreatic referrals.",
      },
      {
        q: "Where is Dr. Arefin's chamber in Dhaka?",
        a: "Dr. Arefin's chamber is at Popular Medical College Hospital, House 25, Road 2, Dhanmondi 1205, Dhaka.",
      },
      {
        q: "What are Dr. Arefin's chamber visiting hours?",
        a: "Chamber visits run on scheduled afternoons and evenings. Please call +880 1311 487 592 or WhatsApp to confirm the next available slot.",
      },
      {
        q: "What should I bring to the consultation?",
        a: "Bring all prior imaging (ultrasound, CT, MRI, MRCP), blood reports and any previous operative notes so the case can be assessed in one visit.",
      },
    ],
  },
  "Successful OT": {
    intro: (alt) =>
      `${alt}. This moment is from <a href="/about/" title="About Dr. Murshidul Arefin"><strong>Dr. Murshidul Arefin's</strong></a> <a href="/treatment/liver-surgery/" title="Hepatobiliary surgery in Dhaka"><strong>hepatobiliary practice</strong></a> at Popular Medical College Hospital, Dhanmondi, Dhaka — where every successful <a href="/treatment/laparoscopic-cholecystectomy-dhaka/" title="Laparoscopic gallbladder removal"><strong>gallbladder</strong></a>, <a href="/treatment/liver-transplant-surgery-dhaka/" title="Liver transplant surgery in Dhaka"><strong>liver-transplant</strong></a> or <a href="/treatment/pancreatic-surgery/" title="Pancreatic surgery in Dhaka"><strong>pancreatic</strong></a> operation is followed by structured recovery and long-term follow-up.`,
    faqs: [
      {
        q: "What does a successful gallbladder operation look like here?",
        a: (
          <>
            A typical successful case is a 30–45 minute <Link to="/treatment/laparoscopic-cholecystectomy-dhaka/" title="Laparoscopic cholecystectomy in Dhaka">laparoscopic cholecystectomy</Link> with same-day mobilisation; complex <Link to="/treatment/gallbladder-surgery/" title="Gallbladder surgery in Dhaka">gallbladder</Link> cases may need open conversion or <Link to="/treatment/biliary-stricture-reconstruction-dhaka/" title="Biliary reconstruction in Dhaka">bile duct reconstruction</Link>.
          </>
        ),
        aText:
          "A typical successful case is a 30–45 minute laparoscopic cholecystectomy with same-day mobilisation; complex gallbladder cases may need open conversion or bile duct reconstruction.",
      },
      {
        q: "How are liver and pancreatic outcomes tracked after surgery?",
        a: (
          <>
            <Link to="/treatment/liver-surgery/" title="Liver surgery follow-up">Liver</Link>, <Link to="/treatment/liver-transplant-surgery-dhaka/" title="Liver transplant follow-up">liver-transplant</Link> and <Link to="/treatment/pancreatic-surgery/" title="Pancreatic surgery follow-up">pancreatic</Link> patients enter a structured follow-up clinic with imaging, blood work and nutrition review at fixed intervals.
          </>
        ),
        aText:
          "Liver, liver-transplant and pancreatic patients enter a structured follow-up clinic with imaging, blood work and nutrition review at fixed intervals.",
      },
      {
        q: "What is recovery like after surgery with Dr. Arefin?",
        a: "Recovery depends on the procedure: laparoscopic gallbladder removal often goes home in 24–48 hours, while complex liver or pancreatic resections need 7–14 days in hospital.",
      },
      {
        q: "Does Dr. Arefin offer follow-up after surgery?",
        a: "Yes. Structured post-operative follow-up runs from the Dhanmondi chamber to monitor wound healing, liver function and long-term outcomes.",
      },
      {
        q: "How do I share my recovery feedback?",
        a: "You can share your experience by contacting the chamber on +880 1311 487 592 or via WhatsApp; testimonials help future patients in similar situations.",
      },
    ],
  },
};

const GalleryImageDetailDark = () => {
  const { slug } = useParams<{ slug: string }>();

  const index = galleryImages.findIndex((img) => slugifyAlt(img.alt) === slug);
  if (index === -1) {
    return <Navigate to="/gallery/" replace />;
  }
  const image = galleryImages[index];
  const { intro, faqs } = CATEGORY_COPY[image.category];
  const description = intro(image.alt);
  /* Plain-text version for <meta> / JSON-LD (anchors stripped) */
  const descriptionText = description.replace(/<[^>]+>/g, "");

  /* Prev/next within the same category for navigation */
  const sameCategory = galleryImages.filter((g) => g.category === image.category);
  const localIndex = sameCategory.findIndex((g) => g.src === image.src);
  const prevImg = sameCategory[(localIndex - 1 + sameCategory.length) % sameCategory.length];
  const nextImg = sameCategory[(localIndex + 1) % sameCategory.length];

  const pageUrl = `https://drarefin.com/gallery/${slug}/`;
  const imageAbsoluteUrl = `https://drarefin.com${image.src.startsWith("/") ? image.src : "/" + image.src}`;
  const jsonLdString = buildGraph(
    buildBreadcrumbList([
      { name: "Gallery", path: "/gallery/" },
      { name: image.alt, path: `/gallery/${slug}/` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "ImageObject",
      contentUrl: imageAbsoluteUrl,
      url: pageUrl,
      name: image.alt,
      description: descriptionText,
      caption: image.alt,
      representativeOfPage: true,
    },
  );

  const title = `${image.alt} — Dr. Murshidul Arefin Gallery, Dhaka`;

  return (
    <div className="arefin dark min-h-screen bg-background text-foreground font-arefin">
      <Helmet>
        <title>{title.slice(0, 60)}</title>
        <meta name="description" content={descriptionText.slice(0, 158)} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={image.alt} />
        <meta property="og:description" content={descriptionText.slice(0, 158)} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <script type="application/ld+json">{jsonLdString}</script>
      </Helmet>

      <DrArefinHeader logoSrc={darkLogo} />

      <main className="gid-main">
        <section className="gid-hero" aria-label="Gallery image detail">
          <div className="container">
            {/* Breadcrumbs */}
            <nav className="gid-breadcrumbs" aria-label="Breadcrumb">
              <ol>
                <li>
                  <Link to="/" className="gid-crumb-link">Home</Link>
                </li>
                <li aria-hidden="true" className="gid-crumb-sep">/</li>
                <li>
                  <Link to="/gallery/" className="gid-crumb-link">Gallery</Link>
                </li>
                <li aria-hidden="true" className="gid-crumb-sep">/</li>
                <li className="gid-crumb-current">{image.category}</li>
              </ol>
            </nav>

            <Reveal>
              <p className="gid-kicker">{image.category}</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="gid-title text-fluid-h1">{image.alt}</h1>
            </Reveal>

            <Reveal delay={140}>
              <figure className="gid-figure">
                <img
                  src={image.src}
                  alt={image.alt}
                  title={image.alt}
                  loading="eager"
                  className="gid-image"
                />
                <figcaption className="gid-caption">{image.alt}</figcaption>
              </figure>
            </Reveal>

            <Reveal delay={200}>
              <p
                className="gid-description text-fluid-lede"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </Reveal>

            {/* Prev / Next within category */}
            <div className="gid-pager">
              <Link to={`/gallery/${slugifyAlt(prevImg.alt)}/`} className="gid-pager-link">
                <ArrowLeft size={16} aria-hidden="true" />
                <span>Previous in {image.category}</span>
              </Link>
              <Link to="/gallery/" className="gid-pager-back">
                Back to Gallery
              </Link>
              <Link to={`/gallery/${slugifyAlt(nextImg.alt)}/`} className="gid-pager-link gid-pager-link--next">
                <span>Next in {image.category}</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <FAQAccordion
          kicker="Related Questions"
          heading="About this image"
          items={faqs.map((f) => ({ q: f.q, a: f.a, aText: f.aText ?? (typeof f.a === "string" ? f.a : undefined) }))}
        />

        {/* ============== FINAL CTA — shared GlobalCTABand ============== */}
        <GlobalCTABand
          headingLead="Ready for "
          headingAccent="Expert Consultation?"
          body={
            <>
              <strong><Link to="/contact/" title="Connect with Dr. Arefin">Connect with Dr. Arefin</Link></strong> for a{" "}
              <Link to="/diagnosis-surgery-recovery/" className="text-primary-light"><strong>detailed diagnosis</strong></Link>,{" "}
              <Link to="/contact/" className="text-primary-light"><strong>expert advice</strong></Link>, and a{" "}
              <Link to="/diagnosis-surgery-recovery/" className="text-primary-light"><strong>path to recovery</strong></Link>.
            </>
          }
        />
      </main>

      <DrArefinFooter />

      <style>{`
        .gid-main { padding-top: 2rem; padding-bottom: 2rem; }
        .gid-hero { padding: 32px 0 56px; }
        .gid-breadcrumbs { margin-bottom: 24px; font-size: 0.875rem; color: hsl(var(--muted-foreground)); }
        .gid-breadcrumbs ol { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
        .gid-crumb-link { color: hsl(var(--muted-foreground)); text-decoration: none; }
        .gid-crumb-link:hover { color: hsl(var(--primary-bright)); }
        .gid-crumb-sep { color: hsl(var(--muted-foreground) / 0.6); }
        .gid-crumb-current { color: hsl(var(--foreground)); font-weight: 500; }

        .gid-kicker { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.25em; text-transform: uppercase; color: hsl(var(--primary-bright)); margin-bottom: 12px; }
        .gid-title { font-family: var(--font-heading); font-weight: 700; line-height: 1.15; color: hsl(var(--foreground)); margin: 0 0 24px; }

        .gid-figure { margin: 0 0 28px; border-radius: 24px; overflow: hidden; background: hsl(var(--muted)); }
        .gid-image { display: block; width: 100%; height: auto; max-height: 70vh; object-fit: cover; }
        .gid-caption { padding: 12px 16px; font-size: 0.875rem; color: hsl(var(--muted-foreground)); background: hsl(var(--card)); }

        .gid-description { color: hsl(var(--foreground)); margin: 0 0 32px; max-width: 78ch; }

        .gid-pager { display: flex; flex-wrap: wrap; gap: 12px; justify-content: space-between; align-items: center; padding-top: 16px; border-top: 1px solid hsl(var(--border)); }
        .gid-pager-link { display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: 999px; border: 1px solid hsl(var(--border)); color: hsl(var(--foreground)); text-decoration: none; font-size: 0.9rem; font-weight: 500; }
        .gid-pager-link:hover { border-color: hsl(var(--primary-bright)); color: hsl(var(--primary-bright)); }
        .gid-pager-link--next { margin-left: auto; }
        .gid-pager-back { padding: 10px 18px; border-radius: 999px; background: hsl(var(--primary-bright)); color: hsl(0 0% 100%); text-decoration: none; font-weight: 600; font-size: 0.9rem; }
        .gid-pager-back:hover { background: hsl(var(--primary-darker)); }
      `}</style>
    </div>
  );
};

export default GalleryImageDetailDark;
