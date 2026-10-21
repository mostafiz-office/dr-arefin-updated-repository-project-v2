/**
 * Header mega menu view-model (Treatment panel).
 *
 * Plan: .lovable/plan/mega-menu-atto-style-2026-10-21.md
 * Rules (see plan §11): this file DERIVES everything from
 * satelliteMatrix.ts (SERVICES + AREAS). Display names, area names and
 * counts are never re-typed here — the only hand-kept data is the hub
 * URL per service and one factual description line per service.
 */
import { SERVICES, AREAS, MATRIX_MENU_SERVICE_SLUGS } from "./satelliteMatrix";

export interface MegaAreaLink {
  label: string;
  path: string;
  title: string;
}

export interface MegaService {
  slug: string;
  display: string;
  /** Treatment hub (or Tier-1 satellite hub) the rail row links to. */
  hub: string;
  hubTitle: string;
  /** One factual sentence, adapted from the service's clinical copy. */
  description: string;
  /** "15 areas" — computed from AREAS, never typed. */
  areaCount: number;
  areas: MegaAreaLink[];
}

/** Hub URL per rail service — explicit mapping (plan §12 G6). */
const HUBS: Record<string, string> = {
  "liver-surgery": "/treatment/liver-surgery/",
  "gallbladder-surgery": "/treatment/gallbladder-surgery/",
  "bile-duct-surgery": "/treatment/biliary-tract-surgery/",
  "pancreatic-surgery": "/treatment/pancreatic-surgery/",
  "hepatobiliary-surgery": "/treatment/hepatobiliary-surgery/",
  "laparoscopic-surgery": "/treatment/laparoscopic-surgery/",
  "liver-transplant-coordination": "/treatment/liver-transplant-coordination/",
  "fatty-liver-management": "/treatment/fatty-liver-management/",
};

/** One factual line per service — no claims, no statistics (plan §11 M1). */
const DESCRIPTIONS: Record<string, string> = {
  "liver-surgery":
    "Surgery for liver tumours, cysts and other liver conditions, planned around your imaging and liver function.",
  "gallbladder-surgery":
    "Gallbladder removal and gallstone care, usually laparoscopic, for pain, inflammation and infection.",
  "bile-duct-surgery":
    "Treatment for bile duct blockage, injury and tumours that prevent bile draining from the liver.",
  "pancreatic-surgery":
    "Surgery for pancreatic tumours, cysts and pancreatitis, including complex resections.",
  "hepatobiliary-surgery":
    "Combined liver, gallbladder, bile duct and pancreas care for complex HPB conditions.",
  "laparoscopic-surgery":
    "Keyhole surgery with smaller incisions for gallbladder, hernia, appendix and HPB procedures.",
  "liver-transplant-coordination":
    "Assessment, referral and follow-up coordination for patients who may need a liver transplant.",
  "fatty-liver-management":
    "Assessment and management of fatty liver disease, from metabolic evaluation to surgical care when needed.",
};

export const MEGA_SERVICES: MegaService[] = MATRIX_MENU_SERVICE_SLUGS.map((slug) => {
  const svc = SERVICES.find((s) => s.slug === slug);
  if (!svc) throw new Error(`menu.ts: unknown matrix service "${slug}"`);
  return {
    slug,
    display: svc.display,
    hub: HUBS[slug],
    hubTitle: `${svc.display} — Dr. Arefin, Dhaka`,
    description: DESCRIPTIONS[slug],
    areaCount: AREAS.length,
    areas: AREAS.map((area) => ({
      label: `${svc.display} in ${area.display}`,
      path: `/treatment/${slug}-in-${area.slug}/`,
      title: `${svc.display} in ${area.display}, ${area.city} — Dr. Arefin`,
    })),
  };
}).filter((s) => Boolean(s.hub));

/** Default service shown when the panel opens (plan decision D4). */
export const MEGA_DEFAULT_SERVICE = "gallbladder-surgery";

/** Footer trust line (plan decision D5). */
export const MEGA_TRUST_LINE =
  "BSMMU-trained HPB surgeon · Popular Medical College Hospital, Dhanmondi";

export const MEGA_PHONE_HREF = "tel:+8801311487592";
export const MEGA_PHONE_DISPLAY = "+880 1311 487592";
