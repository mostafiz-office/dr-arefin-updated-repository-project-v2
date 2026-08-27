import { Link } from "react-router-dom";
import { buildBreadcrumbList, buildGraph } from "@/lib/structuredData";
import { Helmet } from "react-helmet-async";
import { useState, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import DrArefinHeader from "@/components/arefin/DrArefinHeader";
import DrArefinFooter from "@/components/arefin/DrArefinFooter";
import HeroSection from "@/components/arefin/HeroSection";
import { GlobalCTABand } from "@/components/arefin/GlobalCTABand";
import darkLogo from "@/assets/dr-arefin-logo-dark.webp";
import { Reveal } from "@/hooks/useScrollReveal";

/* ── Hero BG ── */
import heroBg from "@/assets/gallery/gallbladder-surgery-operating-room-panoramic-dhaka.webp";

/* ── Operation Theater ── */
import ot01 from "@/assets/gallery/best-gallbladder-surgery-team-operating-theater-dhaka.webp";
import ot02 from "@/assets/gallery/dr-murshidul-arefin-laparoscopic-surgery-duo-popular-medical-dhaka.webp";
import ot03 from "@/assets/gallery/dr-murshidul-arefin-laparoscopic-team-operation-theater-dhaka.webp";
import ot04 from "@/assets/gallery/dr-murshidul-arefin-open-surgery-closeup-popular-medical-dhaka.webp";
import ot05 from "@/assets/gallery/dr-murshidul-arefin-open-surgery-suturing-popular-medical-dhaka.webp";
import ot06 from "@/assets/gallery/dr-murshidul-arefin-operation-theater-light.webp";
import ot07 from "@/assets/gallery/dr-murshidul-arefin-performing-gallbladder-surgery-dhaka.webp";
import ot08 from "@/assets/gallery/dr-murshidul-arefin-surgical-team-operation-theater-popular-medical.webp";
import ot09 from "@/assets/gallery/gallbladder-surgery-team-popular-medical-college-hospital.webp";
import ot10 from "@/assets/gallery/hepatobiliary-open-surgery-best-surgeon-team-dhaka.webp";
import ot11 from "@/assets/gallery/laparoscopic-gallbladder-surgery-full-ot-team-popular-medical-dhaka.webp";
import ot12 from "@/assets/gallery/liver-surgery-team-closeup-hepatobiliary-surgeon-dhaka.webp";
import ot13 from "@/assets/gallery/three-surgeons-gallbladder-operation-popular-medical-dhaka.webp";
import ot14 from "@/assets/gallery/empyema-gallbladder-laparoscopic-surgery-specialist-dhaka.webp";
import ot15 from "@/assets/gallery/gallbladder-stone-laparoscopic-removal-surgery-dhaka.webp";
import ot16 from "@/assets/gallery/dr-murshidul-arefin-surgical-team-gallbladder-operation-popular-medical.webp";
import ot17 from "@/assets/gallery/gallbladder-operation-surgical-team-popular-medical-dhaka.webp";

/* ── Conference & Training ── */
import ct01 from "@/assets/gallery/dr-arefin-16th-international-surgical-congress-2025.webp";
import ct02 from "@/assets/gallery/dr-arefin-advancing-healthcare-together-pha-summit-2024.webp";
import ct03 from "@/assets/gallery/dr-arefin-colleagues-conference-hall-2023.webp";
import ct04 from "@/assets/gallery/dr-arefin-colleagues-pha-global-summit-2024.webp";
import ct05 from "@/assets/gallery/dr-arefin-group-photo-conference-2023.webp";
import ct06 from "@/assets/gallery/dr-arefin-indoor-group-conference-2024.webp";
import ct07 from "@/assets/gallery/dr-arefin-mentorship-seminar-room-2025.webp";
import ct08 from "@/assets/gallery/dr-arefin-selsb-award-national-congress-2025.webp";
import ct09 from "@/assets/gallery/dr-arefin-team-pha-banner-2024.webp";
import ct10 from "@/assets/gallery/dr-arefin-we-love-selsb-sign-sea-pearl-2025.webp";
import ct11 from "@/assets/gallery/dr-murshidul-arefin-hepatobiliary-surgery-lecture-training-dhaka.webp";
import ct12 from "@/assets/gallery/dr-murshidul-arefin-keynote-speaker-popular-medical-college-dhaka.webp";
import ct13 from "@/assets/gallery/dr-murshidul-arefin-medical-conference-speaker-dhaka.webp";
import ct14 from "@/assets/gallery/dr-murshidul-arefin-medical-seminar-hepatobiliary-training-dhaka.webp";
import ct15 from "@/assets/gallery/dr-arefin-surgeons-group-table-conference-2024.webp";
import ct16 from "@/assets/gallery/dr-arefin-senior-colleague-sea-pearl-selsb-2025.webp";

/* ── Chamber ── */
import ch01 from "@/assets/gallery/dr-murshidul-arefin-liver-specialist-consultation-chamber-dhaka.webp";
import ch02 from "@/assets/gallery/dr-murshidul-arefin-best-gallbladder-surgeon-dhaka.webp";
import ch03 from "@/assets/gallery/dr-murshidul-arefin-hepatobiliary-surgeon.webp";
import ch04 from "@/assets/gallery/dr-murshidul-arefin-appointment-gallbladder-liver-surgeon-dhaka.webp";

/* ── Successful OT ── */
import sot01 from "@/assets/gallery/dr-murshidul-arefin-successful-gallbladder-stone-operation-dhaka.webp";
import sot02 from "@/assets/gallery/dr-murshidul-arefin-patient-recovery-after-gallbladder-surgery-dhaka.webp";
import sot03 from "@/assets/gallery/dr-murshidul-arefin-popular-medical-college-hospital-full-staff-dhaka.webp";
import sot04 from "@/assets/gallery/dr-murshidul-arefin-popular-medical-college-hospital-team-dhaka.webp";

/* ── Types ── */
export type GalleryCategory = "All" | "Operation Theater" | "Conference & Training" | "Chamber" | "Successful OT";

export interface GalleryImage {
  src: string;
  alt: string;
  category: Exclude<GalleryCategory, "All">;
}

/** T33 — Slugify a gallery image's alt text into a stable URL slug for /gallery/:slug. */
export const slugifyAlt = (alt: string): string =>
  alt
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 90);

/* ── Gallery data ── */
export const galleryImages: GalleryImage[] = [
  /* Operation Theater */
  { src: ot01, alt: "Best gallbladder surgery team in operation theater, Dhaka", category: "Operation Theater" },
  { src: ot02, alt: "Dr. Murshidul Arefin laparoscopic surgery duo at Popular Medical College", category: "Operation Theater" },
  { src: ot03, alt: "Dr. Murshidul Arefin with laparoscopic team in operation theater", category: "Operation Theater" },
  { src: ot04, alt: "Dr. Murshidul Arefin open surgery closeup at Popular Medical College", category: "Operation Theater" },
  { src: ot05, alt: "Dr. Murshidul Arefin performing open surgery suturing", category: "Operation Theater" },
  { src: ot06, alt: "Dr. Murshidul Arefin in operation theater under OT lights", category: "Operation Theater" },
  { src: ot07, alt: "Dr. Murshidul Arefin performing gallbladder surgery in Dhaka", category: "Operation Theater" },
  { src: ot08, alt: "Dr. Murshidul Arefin surgical team in operation theater", category: "Operation Theater" },
  { src: ot09, alt: "Gallbladder surgery team at Popular Medical College Hospital", category: "Operation Theater" },
  { src: ot10, alt: "Hepatobiliary open surgery — best surgeon team in Dhaka", category: "Operation Theater" },
  { src: ot11, alt: "Laparoscopic gallbladder surgery full OT team at Popular Medical", category: "Operation Theater" },
  { src: ot12, alt: "Liver surgery team closeup — hepatobiliary surgeon Dhaka", category: "Operation Theater" },
  { src: ot13, alt: "Three surgeons performing gallbladder operation at Popular Medical", category: "Operation Theater" },
  { src: ot14, alt: "Empyema gallbladder laparoscopic surgery specialist, Dhaka", category: "Operation Theater" },
  { src: ot15, alt: "Gallbladder stone laparoscopic removal surgery in Dhaka", category: "Operation Theater" },
  { src: ot16, alt: "Dr. Murshidul Arefin surgical team gallbladder operation at Popular Medical", category: "Operation Theater" },
  { src: ot17, alt: "Gallbladder operation surgical team at Popular Medical, Dhaka", category: "Operation Theater" },

  /* Conference & Training */
  { src: ct01, alt: "Dr. Arefin at 16th International Surgical Congress 2025", category: "Conference & Training" },
  { src: ct02, alt: "Dr. Arefin at Advancing Healthcare Together PHA Summit 2024", category: "Conference & Training" },
  { src: ct03, alt: "Dr. Arefin with colleagues at conference hall 2023", category: "Conference & Training" },
  { src: ct04, alt: "Dr. Arefin with colleagues at PHA Global Summit 2024", category: "Conference & Training" },
  { src: ct05, alt: "Dr. Arefin group photo at medical conference 2023", category: "Conference & Training" },
  { src: ct06, alt: "Dr. Arefin at indoor group conference 2024", category: "Conference & Training" },
  { src: ct07, alt: "Dr. Arefin mentorship seminar room 2025", category: "Conference & Training" },
  { src: ct08, alt: "Dr. Arefin SELSB Award at National Congress 2025", category: "Conference & Training" },
  { src: ct09, alt: "Dr. Arefin team at PHA banner 2024", category: "Conference & Training" },
  { src: ct10, alt: "Dr. Arefin We Love SELSB sign at Sea Pearl 2025", category: "Conference & Training" },
  { src: ct11, alt: "Dr. Murshidul Arefin hepatobiliary surgery lecture training, Dhaka", category: "Conference & Training" },
  { src: ct12, alt: "Dr. Murshidul Arefin keynote speaker at Popular Medical College", category: "Conference & Training" },
  { src: ct13, alt: "Dr. Murshidul Arefin medical conference speaker, Dhaka", category: "Conference & Training" },
  { src: ct14, alt: "Dr. Murshidul Arefin medical seminar hepatobiliary training, Dhaka", category: "Conference & Training" },
  { src: ct15, alt: "Dr. Arefin with surgeons group at conference table 2024", category: "Conference & Training" },
  { src: ct16, alt: "Dr. Arefin with senior colleague at Sea Pearl SELSB 2025", category: "Conference & Training" },

  /* Chamber */
  { src: ch01, alt: "Dr. Murshidul Arefin liver specialist consultation chamber, Dhaka", category: "Chamber" },
  { src: ch02, alt: "Dr. Murshidul Arefin — best gallbladder surgeon in Dhaka", category: "Chamber" },
  { src: ch03, alt: "Dr. Murshidul Arefin — hepatobiliary surgeon portrait", category: "Chamber" },
  { src: ch04, alt: "Dr. Murshidul Arefin appointment — gallbladder and liver surgeon, Dhaka", category: "Chamber" },

  /* Successful OT */
  { src: sot01, alt: "Dr. Murshidul Arefin successful gallbladder stone operation, Dhaka", category: "Successful OT" },
  { src: sot02, alt: "Patient recovery after gallbladder surgery by Dr. Murshidul Arefin", category: "Successful OT" },
  { src: sot03, alt: "Dr. Murshidul Arefin with full staff at Popular Medical College Hospital", category: "Successful OT" },
  { src: sot04, alt: "Dr. Murshidul Arefin with team at Popular Medical College Hospital, Dhaka", category: "Successful OT" },
];

const categories: GalleryCategory[] = ["All", "Operation Theater", "Conference & Training", "Chamber", "Successful OT"];

/* ── JSON-LD: Breadcrumb + ImageGallery with ImageObject entries ── */
const jsonLdString = buildGraph(
  buildBreadcrumbList([{ name: "Gallery", path: "/gallery/" }]),
  {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Dr. Murshidul Arefin — Gallery",
    description:
      "Photo gallery of Dr. Murshidul Arefin's surgical practice — operation theater, conferences, training and consultation moments at Popular Medical College Hospital, Dhaka.",
    url: "https://drarefin.com/gallery/",
    image: galleryImages.map((g) => ({
      "@type": "ImageObject",
      contentUrl: `https://drarefin.com${g.src}`,
      url: `https://drarefin.com/gallery/${slugifyAlt(g.alt)}/`,
      name: g.alt,
      description: g.alt,
      caption: g.category,
    })),
  },
);

/* ── Lightbox ── */
const Lightbox = ({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  const img = images[currentIndex];
  if (!img) return null;

  return (
    <div
      className="gallery-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
      onClick={onClose}
    >
      <div className="gallery-lightbox-inner" onClick={(e) => e.stopPropagation()}>
        <img src={img.src} alt={img.alt} title={img.alt} className="gallery-lightbox-img" />
        <p className="gallery-lightbox-caption">{img.alt}</p>
        <Link
          to={`/gallery/${slugifyAlt(img.alt)}/`}
          className="gallery-lightbox-details"
          onClick={onClose}
        >
          View details <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <button
        className="gallery-lightbox-close"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <X className="h-6 w-6" />
      </button>

      <button
        className="gallery-lightbox-nav gallery-lightbox-prev"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous image"
      >
        <ChevronLeft className="h-7 w-7" />
      </button>
      <button
        className="gallery-lightbox-nav gallery-lightbox-next"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next image"
      >
        <ChevronRight className="h-7 w-7" />
      </button>

      <span className="gallery-lightbox-counter">
        {currentIndex + 1} / {images.length}
      </span>
    </div>
  );
};

/* ── Page ── */
const GalleryDark = () => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + filteredImages.length) % filteredImages.length : null));
  }, [filteredImages.length]);

  const nextImage = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % filteredImages.length : null));
  }, [filteredImages.length]);

  return (
    <div className="arefin dark min-h-screen bg-background text-foreground font-arefin">
      <Helmet>
        <title>Gallery — Surgical Operations & Medical Events by Dr. Murshidul Arefin</title>
        <meta name="description" content="View Dr. Murshidul Arefin's surgical gallery — hepatobiliary operations, laparoscopic procedures, medical conferences, and training sessions at Popular Medical College Hospital, Dhaka." />
        <link rel="canonical" href="https://drarefin.com/gallery/" />
        <link rel="preload" as="image" href={heroBg} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Gallery — Dr. Murshidul Arefin's Surgical Operations & Events" />
        <meta property="og:description" content="View Dr. Murshidul Arefin's surgical gallery — hepatobiliary operations, laparoscopic procedures, and medical conferences in Dhaka." />
        <meta property="og:url" content="https://drarefin.com/gallery/" />
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
        imageAlt="Operating-room panorama at Popular Medical College Hospital — Dr. Murshidul Arefin"
        breadcrumb="Gallery"
        kicker="Photo Gallery"
        h1="Gallery — Surgical Operations & Medical Events"
        introHtml={`Inside the operating theatre with <a href="/about/" title="About Dr. Murshidul Arefin"><strong>Dr. Murshidul Arefin</strong></a> — documenting <a href="/treatment/gallbladder-surgery/" title="Gallbladder surgery in Dhaka"><strong>gallbladder surgery</strong></a>, <a href="/treatment/laparoscopic-cholecystectomy-dhaka/" title="Laparoscopic cholecystectomy in Dhaka"><strong>laparoscopic cholecystectomy</strong></a>, <a href="/treatment/liver-surgery/" title="Liver and hepatobiliary surgery"><strong>hepatobiliary</strong></a> and <a href="/treatment/liver-transplant-surgery-dhaka/" title="Liver transplant surgery in Dhaka"><strong>liver-transplant surgery</strong></a>, <a href="/treatment/biliary-stricture-reconstruction-dhaka/" title="Biliary stricture reconstruction in Dhaka"><strong>biliary reconstruction</strong></a>, and <a href="/treatment/pancreatic-surgery/" title="Pancreatic surgery in Dhaka"><strong>pancreatic procedures</strong></a> at Popular Medical College Hospital, Dhaka, plus international conferences and <a href="/mentorship/operative-skills-workshop/" title="Operative skills workshop & surgical training"><strong>surgical training</strong></a>.`}
      />

      {/* ============== FILTER + GRID ============== */}
      <section className="gallery-light-band arefin-section-divider py-12 sm:py-14 md:py-20 lg:py-28" aria-label="Photo gallery">
        <div className="container px-4 sm:px-6">
          {/* Filter pills */}
          <Reveal>
            <div className="gallery-filter-row">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`gallery-filter-pill ${activeCategory === cat ? "gallery-filter-active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Image grid (or empty-state) */}
          {filteredImages.length === 0 ? (
            <div className="gallery-empty">
              <p>No images in this category yet. Please check back soon.</p>
            </div>
          ) : (
            <div className="gallery-grid mt-8 sm:mt-10 md:mt-14">
              {filteredImages.map((img, i) => (
                <Reveal key={`${img.src}-${activeCategory}`} delay={Math.min(i * 40, 300)}>
                  <button
                    className="gallery-grid-item"
                    onClick={() => openLightbox(i)}
                    aria-label={`View: ${img.alt}`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      title={img.alt}
                      loading="lazy"
                      className="gallery-grid-img"
                    />
                    <div className="gallery-grid-overlay" aria-hidden="true">
                      <span className="gallery-grid-category">{img.category}</span>
                      <span className="gallery-grid-title">{img.alt}</span>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════ FINAL CTA — shared GlobalCTABand ══════════════ */}
      <GlobalCTABand
        body={
          <>
            <Link to="/contact/" className="text-primary-light"><strong>Connect with Dr. Arefin</strong></Link> for a{" "}
            <Link to="/diagnosis-surgery-recovery/" className="text-primary-light"><strong>detailed diagnosis</strong></Link>, <Link to="/contact/" className="text-primary-light"><strong>expert advice</strong></Link>,
            and a <Link to="/diagnosis-surgery-recovery/" className="text-primary-light"><strong>path to recovery</strong></Link>.
          </>
        }
      />

      <DrArefinFooter />

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}

      <style>{`
        /* ── Empty state ── */
        .arefin .gallery-empty {
          text-align: center;
          padding: 60px 20px;
          color: hsl(var(--muted-foreground));
        }


        /* ── Filter pills ── */
        .arefin .gallery-filter-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
        }
        @media (min-width: 640px) { .arefin .gallery-filter-row { gap: 10px; } }
        .arefin .gallery-filter-pill {
          padding: 8px 16px;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.03em;
          border: 1px solid hsl(var(--border));
          background: transparent;
          color: hsl(var(--muted-foreground));
          cursor: pointer;
          transition: all 260ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        @media (min-width: 640px) {
          .arefin .gallery-filter-pill { padding: 10px 22px; font-size: 0.8125rem; }
        }
        .arefin .gallery-filter-pill:hover {
          border-color: hsl(var(--primary));
          color: hsl(var(--primary));
        }
        .arefin .gallery-filter-active {
          background: hsl(var(--primary));
          border-color: hsl(var(--primary));
          color: #fff;
        }
        .arefin .gallery-filter-active:hover {
          background: hsl(var(--primary-darker));
          border-color: hsl(var(--primary-darker));
          color: #fff;
        }

        /* ── Grid ── */
        .arefin .gallery-grid {
          display: grid;
          grid-template-columns: 1fr;
          grid-auto-flow: row dense;
          grid-auto-rows: 1fr;
          gap: 12px;
        }
        .arefin .gallery-grid > * {
          display: block;
          min-width: 0;
          height: 100%;
        }
        @media (min-width: 480px) {
          .arefin .gallery-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
        }
        @media (min-width: 640px) {
          .arefin .gallery-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
        }
        @media (min-width: 1024px) {
          .arefin .gallery-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .arefin .gallery-grid-item {
          position: relative;
          display: block;
          width: 100%;
          overflow: hidden;
          border-radius: 10px;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--card));
          cursor: pointer;
          aspect-ratio: 4 / 3;
          transition: border-color 260ms cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 260ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        @media (min-width: 640px) {
          .arefin .gallery-grid-item { border-radius: 12px; }
        }
        .arefin .gallery-grid-item {
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        }
        .arefin .gallery-grid-item:hover {
          border-color: hsl(var(--primary-bright));
          box-shadow: 8px 8px 0 0 hsl(var(--primary-bright) / 0.22);
        }
        .arefin .gallery-grid-img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 320ms ease;
        }
        /* T30: dark bottom-up gradient overlay + white title for AA contrast.
           Subtle gradient at rest, full opacity + brighter title on hover.
           No transform/scale on the item itself (No Hover Uplift contract);
           only the image itself nudges slightly via filter-free transform inside its clipped wrapper. */
        .arefin .gallery-grid-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 8px;
          padding: 14px 16px;
          background: linear-gradient(
            to top,
            hsl(0 0% 0% / 0.78) 0%,
            hsl(0 0% 0% / 0.55) 38%,
            hsl(0 0% 0% / 0.12) 72%,
            hsl(0 0% 0% / 0) 100%
          );
          opacity: 0.82;
          transition: opacity 260ms ease, background 260ms ease;
          pointer-events: none;
        }
        .arefin .gallery-grid-item:hover .gallery-grid-overlay,
        .arefin .gallery-grid-item:focus-visible .gallery-grid-overlay {
          opacity: 1;
          background: linear-gradient(
            to top,
            hsl(0 0% 0% / 0.92) 0%,
            hsl(0 0% 0% / 0.72) 38%,
            hsl(0 0% 0% / 0.30) 72%,
            hsl(0 0% 0% / 0) 100%
          );
        }
        .arefin .gallery-grid-category {
          align-self: flex-start;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #fff;
          background: hsl(var(--primary-darker) / 0.92);
          padding: 4px 10px;
          border-radius: 6px;
        }
        .arefin .gallery-grid-title {
          color: #fff;
          font-weight: 600;
          font-size: 0.95rem;
          line-height: 1.35;
          text-shadow: 0 1px 2px hsl(0 0% 0% / 0.55);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @media (min-width: 1024px) {
          .arefin .gallery-grid-overlay { padding: 16px 18px; }
          .arefin .gallery-grid-title { font-size: 1rem; }
        }

        /* ───── Gallery LIGHT-GREEN BAND (forced light even inside .arefin.dark) ───── */
        .gallery-light-band,
        .arefin.dark .gallery-light-band {
          background: hsl(138 60% 95%);
          color: hsl(0 0% 8%);
        }

        /* Filter pills on light band */
        .arefin .gallery-light-band .gallery-filter-pill,
        .arefin.dark .gallery-light-band .gallery-filter-pill {
          background: hsl(0 0% 100%);
          border: 1px solid hsl(155 30% 75%);
          color: hsl(155 40% 18%);
        }
        .arefin .gallery-light-band .gallery-filter-pill:hover {
          border-color: hsl(131 87% 35%);
          color: hsl(131 87% 28%);
        }
        .arefin .gallery-light-band .gallery-filter-active,
        .arefin.dark .gallery-light-band .gallery-filter-active {
          background: hsl(155 40% 8%);
          border-color: hsl(155 40% 8%);
          color: #fff;
        }
        .arefin .gallery-light-band .gallery-filter-active:hover {
          background: hsl(131 87% 28%);
          border-color: hsl(131 87% 28%);
          color: #fff;
        }

        /* Dark cards on the light band */
        .arefin .gallery-light-band .gallery-grid-item,
        .arefin.dark .gallery-light-band .gallery-grid-item {
          background: hsl(155 40% 8%);
          border: 1px solid hsl(155 30% 14%);
          border-left: 3px solid hsl(155 30% 14%);
          box-shadow: 0 1px 3px hsl(0 0% 0% / 0.18);
        }
        .arefin .gallery-light-band .gallery-grid-item:hover,
        .arefin.dark .gallery-light-band .gallery-grid-item:hover {
          border-color: hsl(var(--primary-bright));
          border-left: 3px solid hsl(var(--primary-bright));
          box-shadow: 8px 8px 0 0 hsl(var(--primary-bright) / 0.22);
        }
        .gallery-lightbox {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: hsl(0 0% 0% / 0.92);
          backdrop-filter: blur(12px);
          animation: gallery-lb-in 200ms ease-out;
        }
        @keyframes gallery-lb-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .gallery-lightbox-inner {
          max-width: calc(100vw - 24px);
          max-height: calc(100vh - 64px);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 64px 56px 24px;
        }
        @media (min-width: 640px) {
          .gallery-lightbox-inner { max-width: 90vw; padding: 72px 80px 32px; }
        }
        .gallery-lightbox-img {
          max-width: 100%;
          max-height: 60vh;
          object-fit: contain;
          border-radius: 6px;
        }
        @media (min-width: 640px) {
          .gallery-lightbox-img { max-height: 72vh; border-radius: 8px; }
        }
        .gallery-lightbox-caption {
          margin-top: 10px;
          font-size: 0.8125rem;
          color: hsl(0 0% 100% / 0.7);
          text-align: center;
          max-width: 600px;
          padding: 0 12px;
        }
        @media (min-width: 640px) {
          .gallery-lightbox-caption { margin-top: 12px; font-size: 0.875rem; }
        }
        .gallery-lightbox-details {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 12px;
          padding: 8px 16px;
          color: #fff;
          background: hsl(var(--primary-bright) / 0.18);
          border: 1px solid hsl(var(--primary-bright) / 0.55);
          border-radius: 999px;
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          text-decoration: none;
          transition: background 200ms, border-color 200ms, color 200ms;
        }
        .gallery-lightbox-details:hover {
          background: hsl(var(--primary-bright) / 0.32);
          border-color: hsl(var(--primary-bright));
          color: #fff;
        }
        .gallery-lightbox-close {
          position: absolute;
          top: 12px;
          right: 12px;
          color: #fff;
          background: hsl(0 0% 0% / 0.55);
          border: 1px solid hsl(0 0% 100% / 0.15);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 200ms;
          z-index: 2;
        }
        @media (min-width: 640px) {
          .gallery-lightbox-close {
            top: 20px;
            right: 20px;
            width: 44px;
            height: 44px;
            background: hsl(0 0% 100% / 0.1);
            border: none;
          }
        }
        .gallery-lightbox-close:hover { background: hsl(0 0% 100% / 0.2); }
        .gallery-lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          color: #fff;
          background: hsl(0 0% 0% / 0.55);
          border: 1px solid hsl(0 0% 100% / 0.15);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 200ms;
          z-index: 2;
        }
        @media (min-width: 640px) {
          .gallery-lightbox-nav {
            background: hsl(0 0% 100% / 0.1);
            border: none;
            width: 48px;
            height: 48px;
          }
        }
        .gallery-lightbox-nav:hover { background: hsl(0 0% 100% / 0.25); }
        .gallery-lightbox-prev { left: 8px; }
        .gallery-lightbox-next { right: 8px; }
        @media (min-width: 640px) {
          .gallery-lightbox-prev { left: 20px; }
          .gallery-lightbox-next { right: 20px; }
        }
        .gallery-lightbox-counter {
          position: absolute;
          top: 18px;
          left: 18px;
          color: hsl(0 0% 100% / 0.7);
          font-size: 0.7rem;
          font-weight: 500;
          background: hsl(0 0% 0% / 0.5);
          padding: 4px 10px;
          border-radius: 999px;
        }
        @media (min-width: 640px) {
          .gallery-lightbox-counter { top: 26px; left: 28px; font-size: 0.8125rem; }
        }
      `}</style>
    </div>
  );
};

export default GalleryDark;
