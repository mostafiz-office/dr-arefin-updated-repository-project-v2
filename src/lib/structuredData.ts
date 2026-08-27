/**
 * Centralized JSON-LD structured data helpers for SEO.
 * All pages share the same Organization / Physician identity.
 */

const SITE_URL = "https://drarefin.com";
const SITE_NAME = "Dr. Murshidul Arefin";
const LOGO_URL = `${SITE_URL}/wp-content/uploads/2026/04/logos.png`;

/* ── Shared physician / organization identity ── */
export const physicianEntity = {
  "@type": "Physician",
  "@id": `${SITE_URL}/#physician`,
  name: "Dr. Murshidul Arefin",
  alternateName: "Dr. M Arefin",
  url: SITE_URL,
  telephone: "+8801311487592",
  email: "info@drarefin.com",
  image: LOGO_URL,
  medicalSpecialty: [
    "Hepatobiliary Surgery",
    "Liver Transplant Surgery",
    "Pancreatic Surgery",
    "Laparoscopic Surgery",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Bangabandhu Sheikh Mujib Medical University (BSMMU)",
  },
  worksFor: {
    "@type": "Hospital",
    "@id": `${SITE_URL}/#hospital`,
    name: "Popular Medical College Hospital",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Room-304 (Building-06), Popular Medical College Hospital",
      addressLocality: "Dhanmondi, Dhaka",
      addressRegion: "Dhaka",
      postalCode: "1205",
      addressCountry: "BD",
    },
  },
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "Years of Surgical Excellence",
      value: "8+",
      description: "Over 8 years of hepatobiliary surgical experience in Dhaka, Bangladesh",
    },
    {
      "@type": "PropertyValue",
      name: "Successful Surgeries",
      value: "800+",
      description: "Over 800 successful liver, gallbladder, and pancreatic surgeries performed",
    },
    {
      "@type": "PropertyValue",
      name: "Patients Treated",
      value: "10000+",
      description: "Over 10,000 patients treated across hepatobiliary and general surgery",
    },
    {
      "@type": "PropertyValue",
      name: "Conferences & Lectures",
      value: "80+",
      description: "Over 80 academic conferences and lectures delivered nationally and internationally",
    },
  ],
} as const;

/* ── WebSite (homepage only) ── */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#physician` },
};

/* ── Organization (homepage only, supplements Physician) ── */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": `${SITE_URL}/#medicalbusiness`,
  name: "Dr. Murshidul Arefin — Hepatobiliary Surgery Practice",
  url: SITE_URL,
  logo: LOGO_URL,
  image: LOGO_URL,
  telephone: "+8801311487592",
  email: "info@drarefin.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Room-304 (Building-06), Popular Medical College Hospital",
    addressLocality: "Dhanmondi, Dhaka",
    addressRegion: "Dhaka",
    postalCode: "1205",
    addressCountry: "BD",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"],
      opens: "17:00",
      closes: "21:00",
    },
  ],
  priceRange: "$$",
  medicalSpecialty: "Hepatobiliary Surgery",
};

/* ── BreadcrumbList builder ── */
export interface BreadcrumbItem {
  name: string;
  path: string; // relative, e.g. "/about/"
}

export function buildBreadcrumbList(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.name,
        item: `${SITE_URL}${item.path}`,
      })),
    ],
  };
}

/* ── FAQPage schema ── */
export interface FAQSchemaItem {
  question: string;
  answer: string;
}

export function buildFAQPageSchema(items: FAQSchemaItem[]) {
  if (!items || items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.answer,
      },
    })),
  };
}

/* ── Render multiple JSON-LD blocks as a single @graph ── */
export function buildGraph(...schemas: Record<string, unknown>[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": schemas.map(({ "@context": _, ...rest }) => rest),
  });
}
