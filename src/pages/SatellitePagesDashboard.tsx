import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell,
} from "@/components/ui/table";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

type Status = "new" | "exists" | "covered";

interface Entry {
  id: number;
  anchor: string;
  currentLink: string;
  slug: string;
  title: string;
  focus: string;
  status: Status;
  coveredBy?: number;
}

interface Section {
  name: string;
  entries: Entry[];
}

const sections: Section[] = [
  {
    name: "Section 1 — Hero",
    entries: [
      { id: 1, anchor: "Hepatobiliary", currentLink: "#treatment", slug: "/treatment/hepatobiliary-surgery/", title: "Hepatobiliary Surgery in Dhaka — Dr. Arefin", focus: "Overview of all hepatobiliary procedures, specialization, FAQ", status: "new" },
      { id: 2, anchor: "Pancreatic", currentLink: "#treatment", slug: "/treatment/pancreatic-surgery/", title: "Pancreatic Surgery Specialist in Dhaka", focus: "Already exists — ensure content depth", status: "exists" },
      { id: 3, anchor: "Liver Surgeon in Dhaka", currentLink: "#treatment", slug: "/treatment/liver-surgeon-dhaka/", title: "Best Liver Surgeon in Dhaka — Dr. Arefin", focus: "Geo-targeted liver surgery + Dhaka location, chamber info, map", status: "new" },
      { id: 4, anchor: "Dr. Murshidul Arefin", currentLink: "#about", slug: "/about/", title: "About Dr. Murshidul Arefin — HPB Surgeon", focus: "Already exists", status: "exists" },
      { id: 5, anchor: "Liver", currentLink: "#treatment", slug: "/treatment/liver-surgery/", title: "Advanced Liver Surgery — Dr. Arefin", focus: "Already exists", status: "exists" },
      { id: 6, anchor: "Gall Bladder", currentLink: "#treatment", slug: "/treatment/gallbladder-surgery/", title: "Gallbladder Surgery in Dhaka", focus: "Already exists", status: "exists" },
      { id: 7, anchor: "Biliary Tract", currentLink: "#treatment", slug: "/treatment/biliary-tract-surgery/", title: "Biliary Tract Surgery — Dr. Arefin", focus: "Already exists", status: "exists" },
      { id: 8, anchor: "Pancreas", currentLink: "#treatment", slug: "/treatment/pancreas-diseases/", title: "Pancreas Diseases & Surgery — Dr. Arefin", focus: "Diseases, symptoms, treatment options, when surgery is needed", status: "new" },
      { id: 9, anchor: "Spleen", currentLink: "#treatment", slug: "/treatment/spleen-surgery/", title: "Spleen Surgery & Splenectomy in Dhaka", focus: "Spleen enlargement, splenectomy, Dr. Arefin's experience", status: "new" },
      { id: 10, anchor: "Stomach", currentLink: "#treatment", slug: "/treatment/stomach-surgery/", title: "Stomach & Upper GI Surgery — Dr. Arefin", focus: "Gastric conditions, surgical options", status: "new" },
      { id: 11, anchor: "Upper GIT", currentLink: "#treatment", slug: "/treatment/upper-gi-surgery/", title: "Upper GI Tract Surgery in Dhaka", focus: "Upper GI diseases, GERD, tumors, surgical management", status: "new" },
      { id: 12, anchor: "Popular Medical College Hospital", currentLink: "#contact", slug: "/popular-medical-college-hospital/", title: "Dr. Arefin at Popular Medical College Hospital", focus: "Hospital affiliation, chamber details, map, visiting hours, photos, FAQ", status: "new" },
      { id: 13, anchor: "Dhanmondi", currentLink: "#contact", slug: "/chamber/dhanmondi/", title: "Dr. Arefin's Chamber — Dhanmondi, Dhaka", focus: "Address, map embed, directions, visiting hours, nearby landmarks", status: "new" },
    ],
  },
  {
    name: "Section 2 — Value Proposition",
    entries: [
      { id: 14, anchor: "hepatobiliary, liver, and gallbladder surgery", currentLink: "—", slug: "/treatment/hepatobiliary-liver-gallbladder/", title: "Hepatobiliary, Liver & Gallbladder Surgery", focus: "Combined overview of three core specializations", status: "new" },
      { id: 15, anchor: "liver, pancreas, and biliary tract", currentLink: "—", slug: "/treatment/liver-pancreas-biliary/", title: "Liver, Pancreas & Biliary Tract Treatment", focus: "Diseases of these three organs, treatment pathways", status: "new" },
      { id: 16, anchor: "laparoscopic", currentLink: "—", slug: "/treatment/laparoscopic-surgery/", title: "Laparoscopic Surgery in Dhaka — Dr. Arefin", focus: "Minimally invasive/keyhole surgery, benefits, procedures", status: "new" },
      { id: 17, anchor: "open surgical", currentLink: "—", slug: "/treatment/open-surgery/", title: "Open Surgical Techniques — Dr. Arefin", focus: "When open surgery is preferred, Dr. Arefin's expertise", status: "new" },
      { id: 18, anchor: "patient-first philosophy", currentLink: "—", slug: "/about/patient-first-philosophy/", title: "Patient-First Philosophy — Dr. Arefin", focus: "Approach to care, communication, ethics, testimonials", status: "new" },
      { id: 19, anchor: "diagnosis, surgery, and recovery", currentLink: "—", slug: "/patient-journey/", title: "Your Journey: Diagnosis to Recovery", focus: "Step-by-step patient journey guide", status: "new" },
    ],
  },
  {
    name: "Section 3 — About Dr. Arefin",
    entries: [
      { id: 20, anchor: "Hepatobiliary and Pancreatic Surgery Specialist", currentLink: "/treatment/", slug: "/about/hepatobiliary-pancreatic-specialist/", title: "Hepatobiliary & Pancreatic Surgery Specialist", focus: "Specialization credentials, training, cases", status: "new" },
      { id: 21, anchor: "MBBS from the University of Dhaka", currentLink: "/about/", slug: "/about/education/mbbs-university-of-dhaka/", title: "Dr. Arefin — MBBS, University of Dhaka", focus: "Education journey, university details, early career", status: "new" },
      { id: 22, anchor: "MS in Hepatobiliary Surgery from BSMMU", currentLink: "/about/", slug: "/about/education/ms-hepatobiliary-bsmmu/", title: "MS in Hepatobiliary Surgery — BSMMU", focus: "Postgraduate training, BSMMU affiliation, research", status: "new" },
      { id: 23, anchor: "General, Laparoscopic, and Liver Transplant Surgery", currentLink: "/treatment/", slug: "/treatment/general-laparoscopic-liver-transplant/", title: "General, Laparoscopic & Liver Transplant Surgery", focus: "Overview of three surgical domains", status: "new" },
      { id: 24, anchor: "best hepatobiliary surgeons in Dhaka", currentLink: "/about/", slug: "/best-hepatobiliary-surgeon-dhaka/", title: "Best Hepatobiliary Surgeon in Dhaka", focus: "Geo-targeted authority page, credentials, reviews", status: "new" },
      { id: 25, anchor: "minimally invasive techniques", currentLink: "/treatment/", slug: "/treatment/minimally-invasive-surgery/", title: "Minimally Invasive Surgery — Dr. Arefin", focus: "Techniques, benefits, recovery times, procedures", status: "new" },
    ],
  },
  {
    name: "Section 4 — Our Initiatives",
    entries: [
      { id: 26, anchor: "education", currentLink: "—", slug: "/initiatives/health-education/", title: "Health Education Programs — Dr. Arefin", focus: "Community education programs, seminars", status: "new" },
      { id: 27, anchor: "compassion", currentLink: "—", slug: "/about/compassionate-care/", title: "Compassionate Surgical Care — Dr. Arefin", focus: "Philosophy of compassion, patient stories", status: "new" },
      { id: 28, anchor: "continuous support", currentLink: "—", slug: "/initiatives/patient-support/", title: "Continuous Patient Support — Dr. Arefin", focus: "Post-op follow-up, recovery support", status: "new" },
      { id: 29, anchor: "Surgery Assistance", currentLink: "—", slug: "/initiatives/surgery-assistance/", title: "Surgery Assistance Program — Dr. Arefin", focus: "Financial assistance, eligibility, success stories", status: "new" },
      { id: 30, anchor: "Health Education (card)", currentLink: "—", slug: "/initiatives/health-education/", title: "(same as #26)", focus: "(same as #26)", status: "covered", coveredBy: 26 },
      { id: 31, anchor: "Support Groups", currentLink: "—", slug: "/initiatives/support-groups/", title: "Patient Support Groups — Dr. Arefin", focus: "How to join, meeting details, testimonials", status: "new" },
      { id: 32, anchor: "complex liver, gallbladder, and pancreatic surgeries", currentLink: "—", slug: "/treatment/complex-hepatobiliary-surgery/", title: "Complex Liver, Gallbladder & Pancreatic Surgery", focus: "High-risk/complex cases, case studies", status: "new" },
      { id: 33, anchor: "hepatobiliary or liver transplant treatments", currentLink: "—", slug: "/treatment/liver-transplant/", title: "Liver Transplant Care — Dr. Arefin", focus: "Pre/post transplant journey, coordination", status: "new" },
    ],
  },
  {
    name: "Section 5 — Metrics",
    entries: [
      { id: 34, anchor: "Hepatobiliary Expertise", currentLink: "—", slug: "/about/hepatobiliary-expertise/", title: "Dr. Arefin's Hepatobiliary Expertise", focus: "Credentials, case volume, outcomes", status: "new" },
      { id: 35, anchor: "Surgical authority", currentLink: "—", slug: "/about/surgical-credentials/", title: "Surgical Credentials & Authority", focus: "Training history, certifications, peer recognition", status: "new" },
      { id: 36, anchor: "clinical volume", currentLink: "—", slug: "/about/clinical-volume/", title: "Clinical Volume & Surgical Statistics", focus: "Numbers, case types breakdown, outcomes data", status: "new" },
      { id: 37, anchor: "academic engagement", currentLink: "—", slug: "/about/academic-career/", title: "Academic Engagement & Research", focus: "Publications, teaching roles, conferences", status: "new" },
    ],
  },
  {
    name: "Section 6 — Recent Videos",
    entries: [
      { id: 38, anchor: "liver, gallbladder and digestive surgery", currentLink: "—", slug: "/treatment/liver-gallbladder-digestive/", title: "Liver, Gallbladder & Digestive Surgery Topics", focus: "Hub page linking to video content + treatment detail", status: "new" },
    ],
  },
  {
    name: "Section 7 — Services (Sticky Stack Cards)",
    entries: [
      { id: 39, anchor: "Advanced Liver Surgery", currentLink: "/treatment/liver-surgery/", slug: "/treatment/liver-surgery/", title: "Advanced Liver Surgery — Dr. Arefin", focus: "exists", status: "exists" },
      { id: 40, anchor: "Gallbladder & Biliary Surgery", currentLink: "/treatment/gallbladder-surgery/", slug: "/treatment/gallbladder-surgery/", title: "Gallbladder & Biliary Surgery", focus: "exists", status: "exists" },
      { id: 41, anchor: "Pancreatic & Upper GI Surgery", currentLink: "/treatment/pancreatic-surgery/", slug: "/treatment/pancreatic-surgery/", title: "Pancreatic & Upper GI Surgery", focus: "exists", status: "exists" },
      { id: 42, anchor: "Bile Duct & Hepatic Surgery", currentLink: "—", slug: "/treatment/bile-duct-surgery/", title: "Bile Duct & Hepatic Surgery — Dr. Arefin", focus: "Bile duct injuries, strictures, choledochal cysts", status: "new" },
      { id: 43, anchor: "Liver Transplant Coordination", currentLink: "—", slug: "/treatment/liver-transplant-coordination/", title: "Liver Transplant Coordination — Dr. Arefin", focus: "Pre/post transplant care, center coordination", status: "new" },
      { id: 44, anchor: "Fatty Liver & Disease Management", currentLink: "—", slug: "/treatment/fatty-liver-management/", title: "Fatty Liver & Disease Management", focus: "Non-surgical approach, lifestyle, monitoring", status: "new" },
      { id: 45, anchor: "liver tumors, cysts", currentLink: "—", slug: "/conditions/liver-tumors-cysts/", title: "Liver Tumors & Cysts Treatment in Dhaka", focus: "Types, diagnosis, surgical options", status: "new" },
      { id: 46, anchor: "gallstones", currentLink: "—", slug: "/conditions/gallstones/", title: "Gallstone Surgery in Dhaka — Dr. Arefin", focus: "Symptoms, diagnosis, laparoscopic removal, recovery", status: "new" },
      { id: 47, anchor: "bile duct obstructions", currentLink: "—", slug: "/conditions/bile-duct-obstruction/", title: "Bile Duct Obstruction Treatment", focus: "Causes, symptoms, surgical vs endoscopic treatment", status: "new" },
      { id: 48, anchor: "pancreatic disorders", currentLink: "—", slug: "/conditions/pancreatic-disorders/", title: "Pancreatic Disorders — Diagnosis & Surgery", focus: "Types of conditions, treatment pathways", status: "new" },
      { id: 49, anchor: "fatty liver, hepatitis", currentLink: "—", slug: "/conditions/fatty-liver-hepatitis/", title: "Fatty Liver & Hepatitis Management in Dhaka", focus: "Non-surgical management, treatment plans", status: "new" },
    ],
  },
  {
    name: "Section 8 — CTA Band",
    entries: [
      { id: 50, anchor: "critical liver and hepatobiliary surgeries", currentLink: "—", slug: "/treatment/critical-hepatobiliary-surgery/", title: "Critical Liver & Hepatobiliary Surgeries", focus: "Emergency/critical cases, success stories", status: "new" },
    ],
  },
  {
    name: "Section 9 — Inspiring Transformations",
    entries: [
      { id: 51, anchor: "hepatobiliary and pancreatic surgery", currentLink: "—", slug: "—", title: "—", focus: "Covered by #20", status: "covered", coveredBy: 20 },
      { id: 52, anchor: "end-stage liver disease", currentLink: "—", slug: "/conditions/end-stage-liver-disease/", title: "End-Stage Liver Disease Treatment — Dr. Arefin", focus: "ESLD, transplant options, Dr. Arefin's approach", status: "new" },
      { id: 53, anchor: "chronic bile duct obstruction", currentLink: "—", slug: "/conditions/chronic-bile-duct-obstruction/", title: "Chronic Bile Duct Obstruction Surgery", focus: "Surgical reconstruction, outcomes", status: "new" },
      { id: 54, anchor: "minimally invasive procedure", currentLink: "—", slug: "—", title: "—", focus: "Covered by #25", status: "covered", coveredBy: 25 },
      { id: 55, anchor: "precision surgery", currentLink: "—", slug: "/about/precision-surgery/", title: "Precision Surgery Approach — Dr. Arefin", focus: "Techniques, technology, what makes it precise", status: "new" },
    ],
  },
  {
    name: "Section 11 — Final CTA",
    entries: [
      { id: 56, anchor: "Connect with Dr. Arefin", currentLink: "/about/", slug: "/about/", title: "—", focus: "exists", status: "exists" },
      { id: 57, anchor: "detailed diagnosis", currentLink: "/treatment/", slug: "/treatment/", title: "—", focus: "exists", status: "exists" },
      { id: 58, anchor: "expert advice", currentLink: "/articles/", slug: "/articles/", title: "—", focus: "exists", status: "exists" },
      { id: 59, anchor: "surgical gallery", currentLink: "/gallery/", slug: "/gallery/", title: "—", focus: "exists", status: "exists" },
      { id: 60, anchor: "mentorship programs", currentLink: "/mentorship/", slug: "/mentorship/", title: "—", focus: "exists", status: "exists" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

function statusBadge(s: Status, coveredBy?: number) {
  switch (s) {
    case "new":
      return <Badge className="bg-emerald-600/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-600/30">New Page</Badge>;
    case "exists":
      return <Badge className="bg-sky-600/20 text-sky-400 border-sky-500/30 hover:bg-sky-600/30">Exists</Badge>;
    case "covered":
      return <Badge className="bg-amber-600/20 text-amber-400 border-amber-500/30 hover:bg-amber-600/30">Covered #{coveredBy}</Badge>;
  }
}

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function SatellitePagesDashboard() {
  const [filter, setFilter] = useState<"all" | Status>("all");

  const stats = useMemo(() => {
    const all = sections.flatMap((s) => s.entries);
    return {
      total: all.length,
      newPages: all.filter((e) => e.status === "new").length,
      exists: all.filter((e) => e.status === "exists").length,
      covered: all.filter((e) => e.status === "covered").length,
    };
  }, []);

  const filtered = useMemo(() => {
    if (filter === "all") return sections;
    return sections
      .map((s) => ({ ...s, entries: s.entries.filter((e) => e.status === filter) }))
      .filter((s) => s.entries.length > 0);
  }, [filter]);

  const sectionStats = (entries: Entry[]) => {
    const n = entries.filter((e) => e.status === "new").length;
    const x = entries.filter((e) => e.status === "exists").length;
    const c = entries.filter((e) => e.status === "covered").length;
    return { total: entries.length, n, x, c };
  };

  return (
    <div className="min-h-screen bg-[hsl(220,20%,6%)] text-[hsl(0,0%,90%)] px-4 py-10 md:px-8">
      <div className="max-w-[1400px] mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-fluid-h2 font-bold tracking-tight text-white">
            Satellite Pages Database
          </h1>
          <p className="mt-2 text-[hsl(0,0%,60%)] text-base max-w-3xl">
            Every keyword from the homepage mapped to a dedicated SEO landing page. Use this dashboard to track which pages need to be created vs already exist.
          </p>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Keywords", value: stats.total, color: "hsl(0,0%,100%)" },
            { label: "New Pages", value: stats.newPages, color: "hsl(145,60%,45%)" },
            { label: "Already Exist", value: stats.exists, color: "hsl(200,80%,60%)" },
            { label: "Covered / Duplicate", value: stats.covered, color: "hsl(40,80%,55%)" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-[hsl(220,15%,15%)] bg-[hsl(220,18%,10%)] p-5"
            >
              <p className="text-sm text-[hsl(0,0%,55%)]">{s.label}</p>
              <p className="text-3xl font-bold mt-1" style={{ color: s.color }}>
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-2 flex-wrap">
          {(["all", "new", "exists", "covered"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                filter === f
                  ? "bg-[hsl(145,50%,35%)] border-[hsl(145,50%,45%)] text-white"
                  : "bg-[hsl(220,18%,10%)] border-[hsl(220,15%,18%)] text-[hsl(0,0%,60%)] hover:bg-[hsl(220,18%,14%)]"
              }`}
            >
              {f === "all" ? "All" : f === "new" ? "New Pages" : f === "exists" ? "Existing" : "Covered"}
            </button>
          ))}
        </div>

        {/* Sections */}
        {filtered.map((section) => {
          const ss = sectionStats(section.entries);
          return (
            <div key={section.name} className="space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-xl font-semibold text-white">{section.name}</h2>
                <span className="text-xs text-[hsl(0,0%,50%)]">
                  {ss.total} keywords · {ss.n} new · {ss.x} exist · {ss.c} covered
                </span>
              </div>

              <div className="rounded-xl border border-[hsl(220,15%,15%)] overflow-hidden bg-[hsl(220,18%,8%)]">
                <Table>
                  <TableHeader>
                    <TableRow className="border-[hsl(220,15%,15%)] hover:bg-transparent">
                      <TableHead className="text-[hsl(0,0%,50%)] w-12">#</TableHead>
                      <TableHead className="text-[hsl(0,0%,50%)]">Anchor Text</TableHead>
                      <TableHead className="text-[hsl(0,0%,50%)]">Proposed Slug</TableHead>
                      <TableHead className="text-[hsl(0,0%,50%)] hidden lg:table-cell">Page Title</TableHead>
                      <TableHead className="text-[hsl(0,0%,50%)] hidden xl:table-cell">Focus</TableHead>
                      <TableHead className="text-[hsl(0,0%,50%)] w-28">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {section.entries.map((entry) => (
                      <TableRow
                        key={entry.id}
                        className="border-[hsl(220,15%,13%)] hover:bg-[hsl(220,18%,12%)]"
                      >
                        <TableCell className="text-[hsl(0,0%,45%)] font-mono text-xs">
                          {entry.id}
                        </TableCell>
                        <TableCell className="font-medium text-[hsl(0,0%,85%)]">
                          {entry.anchor}
                        </TableCell>
                        <TableCell className="font-mono text-xs text-[hsl(145,40%,55%)]">
                          {entry.slug}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-[hsl(0,0%,65%)] text-sm">
                          {entry.title}
                        </TableCell>
                        <TableCell className="hidden xl:table-cell text-[hsl(0,0%,55%)] text-xs max-w-[260px]">
                          {entry.focus}
                        </TableCell>
                        <TableCell>{statusBadge(entry.status, entry.coveredBy)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          );
        })}

        {/* Category breakdown */}
        <div className="rounded-xl border border-[hsl(220,15%,15%)] bg-[hsl(220,18%,10%)] p-6 space-y-4">
          <h2 className="text-xl font-semibold text-white">New Pages by URL Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { prefix: "/treatment/", count: 16 },
              { prefix: "/about/", count: 10 },
              { prefix: "/conditions/", count: 7 },
              { prefix: "/initiatives/", count: 4 },
              { prefix: "/chamber/", count: 1 },
              { prefix: "/patient-journey/", count: 1 },
              { prefix: "/popular-medical-college-hospital/", count: 1 },
              { prefix: "/best-hepatobiliary-surgeon-dhaka/", count: 1 },
            ].map((cat) => (
              <div
                key={cat.prefix}
                className="flex items-center justify-between rounded-lg bg-[hsl(220,18%,13%)] px-4 py-3 border border-[hsl(220,15%,16%)]"
              >
                <span className="font-mono text-xs text-[hsl(145,40%,55%)]">{cat.prefix}</span>
                <span className="font-bold text-white">{cat.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
