import { useParams, Link, Navigate } from "react-router-dom";
import { buildBreadcrumbList, buildGraph } from "@/lib/structuredData";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowRight, Calendar, User, Clock, Phone, MessageCircle, Mail, ChevronRight } from "lucide-react";
import DrArefinHeader from "@/components/arefin/DrArefinHeader";
import DrArefinFooter from "@/components/arefin/DrArefinFooter";
import { GlobalCTABand } from "@/components/arefin/GlobalCTABand";
import darkLogo from "@/assets/dr-arefin-logo-dark.webp";
import { Reveal } from "@/hooks/useScrollReveal";
import { CallBookPill } from "@/components/arefin/DrArefinHeader";

/* ── ISO date map for semantic <time> + JSON-LD ── */
const ISO_DATE: Record<string, string> = {
  "April 28, 2026": "2026-04-28",
  "April 15, 2026": "2026-04-15",
  "March 30, 2026": "2026-03-30",
  "March 18, 2026": "2026-03-18",
  "March 5, 2026": "2026-03-05",
  "February 22, 2026": "2026-02-22",
  "February 10, 2026": "2026-02-10",
  "January 28, 2026": "2026-01-28",
  "January 15, 2026": "2026-01-15",
};

/* ── Thumbnail imports ── */
import thumb01 from "@/assets/gallery/dr-murshidul-arefin-hepatobiliary-surgery-lecture-training-dhaka.webp";
import thumb02 from "@/assets/gallery/dr-murshidul-arefin-performing-gallbladder-surgery-dhaka.webp";
import thumb03 from "@/assets/gallery/dr-murshidul-arefin-keynote-speaker-popular-medical-college-dhaka.webp";
import thumb04 from "@/assets/gallery/empyema-gallbladder-laparoscopic-surgery-specialist-dhaka.webp";
import thumb05 from "@/assets/gallery/gallbladder-stone-laparoscopic-removal-surgery-dhaka.webp";
import thumb06 from "@/assets/gallery/dr-murshidul-arefin-open-surgery-closeup-popular-medical-dhaka.webp";
import thumb07 from "@/assets/gallery/hepatobiliary-open-surgery-best-surgeon-team-dhaka.webp";
import thumb08 from "@/assets/gallery/dr-murshidul-arefin-medical-seminar-hepatobiliary-training-dhaka.webp";
import thumb09 from "@/assets/gallery/dr-arefin-16th-international-surgical-congress-2025.webp";

/* ── Article full data ── */
interface ArticleFull {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  thumbnail: string;
  content: string[];
  tags: string[];
}

const articles: ArticleFull[] = [
  {
    slug: "laparoscopic-cholecystectomy-advances-2025",
    title: "Advances in Laparoscopic Cholecystectomy: What Patients Should Know",
    excerpt: "Laparoscopic cholecystectomy remains the gold standard for gallbladder removal. Recent advances in surgical techniques have significantly reduced recovery times and improved patient outcomes.",
    date: "April 28, 2026",
    author: "Dr. Murshidul Arefin",
    readTime: "6 min read",
    thumbnail: thumb01,
    tags: ["Laparoscopic Surgery", "Gallbladder", "Minimally Invasive"],
    content: [
      "Laparoscopic cholecystectomy has undergone remarkable evolution since its introduction in the late 1980s. Today, it remains the gold standard for gallbladder removal, with over 90% of cholecystectomies performed laparoscopically worldwide.",
      "Recent technological advances have further refined the procedure. Single-incision laparoscopic surgery (SILS) allows surgeons to perform the entire operation through a single umbilical port, resulting in virtually scarless outcomes. Robotic-assisted platforms offer enhanced dexterity and 3D visualization, particularly beneficial in complex cases.",
      "The critical view of safety (CVS) technique remains the cornerstone of safe cholecystectomy. This involves clearly identifying the cystic duct and cystic artery within the hepatocystic triangle before clipping and dividing any structures. Adherence to CVS has dramatically reduced the incidence of bile duct injuries.",
      "Patient selection has also evolved. While acute cholecystitis was once considered a relative contraindication for laparoscopic approach, current evidence supports early laparoscopic cholecystectomy within 72 hours of symptom onset, leading to shorter hospital stays and fewer complications compared to delayed surgery.",
      "Recovery after laparoscopic cholecystectomy is typically swift. Most patients are discharged within 24 hours and can return to normal activities within one to two weeks. Post-operative pain is managed effectively with multimodal analgesia, and dietary restrictions are minimal.",
      "At Popular Medical College Hospital, we employ the latest techniques and equipment to ensure optimal outcomes for every patient. Our team's extensive experience with both routine and complex gallbladder cases allows us to provide individualized surgical care.",
    ],
  },
  {
    slug: "gallbladder-stone-symptoms-treatment",
    title: "Understanding Gallbladder Stones: Symptoms, Diagnosis & Treatment",
    excerpt: "Gallbladder stones affect millions worldwide. Recognizing early symptoms is critical for timely intervention.",
    date: "April 15, 2026",
    author: "Dr. Murshidul Arefin",
    readTime: "7 min read",
    thumbnail: thumb02,
    tags: ["Gallbladder Stones", "Diagnosis", "Treatment"],
    content: [
      "Gallbladder stones (cholelithiasis) are one of the most common gastrointestinal conditions, affecting approximately 10-15% of the adult population in developed countries. These solid deposits form within the gallbladder and can range in size from tiny grains of sand to golf ball-sized masses.",
      "The two main types of gallstones are cholesterol stones and pigment stones. Cholesterol stones, which account for about 80% of cases, form when there is an imbalance in the bile components. Pigment stones are more common in patients with hemolytic conditions or liver cirrhosis.",
      "Many patients with gallstones remain asymptomatic for years. However, when symptoms do occur, they typically present as biliary colic — episodes of severe pain in the right upper abdomen or epigastrium, often radiating to the right shoulder or back. These episodes usually occur after fatty meals and can last from 30 minutes to several hours.",
      "Complications of gallstones include acute cholecystitis (inflammation of the gallbladder), choledocholithiasis (stones in the common bile duct), cholangitis (infection of the bile ducts), and gallstone pancreatitis. These complications require urgent medical attention.",
      "Diagnosis is primarily made through abdominal ultrasound, which has a sensitivity of over 95% for detecting gallstones. Additional imaging modalities, including MRCP and endoscopic ultrasound, may be necessary when common bile duct stones are suspected.",
      "The definitive treatment for symptomatic gallstones is laparoscopic cholecystectomy. This minimally invasive procedure offers excellent outcomes with minimal morbidity. Conservative management with ursodeoxycholic acid may be considered for patients who are not surgical candidates, though recurrence rates are high.",
    ],
  },
  {
    slug: "hepatobiliary-surgery-training-bangladesh",
    title: "Hepatobiliary Surgery Training in Bangladesh: Building the Next Generation",
    excerpt: "Bangladesh's hepatobiliary surgery landscape is evolving rapidly with new mentorship programs.",
    date: "March 30, 2026",
    author: "Dr. Murshidul Arefin",
    readTime: "5 min read",
    thumbnail: thumb03,
    tags: ["Medical Training", "Bangladesh", "Hepatobiliary Surgery"],
    content: [
      "The field of hepatobiliary surgery in Bangladesh has witnessed tremendous growth over the past decade. What was once a subspecialty available only at a handful of tertiary centers has expanded significantly, with trained hepatobiliary surgeons now practicing at multiple institutions across the country.",
      "Structured training programs have been instrumental in this transformation. At Popular Medical College Hospital, our mentorship initiative provides hands-on experience in both open and laparoscopic hepatobiliary procedures. Trainees progress through a graduated curriculum, starting with basic biliary procedures before advancing to complex liver resections.",
      "International collaboration has played a crucial role in advancing surgical training. Exchange programs with established hepatobiliary centers in Japan, South Korea, and India have exposed Bangladeshi surgeons to cutting-edge techniques and technologies.",
      "The integration of simulation-based training has enhanced surgical education significantly. Laparoscopic box trainers, virtual reality simulators, and cadaveric workshops provide safe environments for developing technical skills before operating on patients.",
      "Research output in hepatobiliary surgery from Bangladesh has also increased substantially. Publications in peer-reviewed journals and presentations at international conferences demonstrate the growing expertise and academic contribution of Bangladeshi hepatobiliary surgeons.",
      "Looking ahead, the goals for hepatobiliary surgery training in Bangladesh include establishing fellowship programs accredited by international surgical societies, developing specialized hepatobiliary ICU protocols, and building a national hepatobiliary surgery registry.",
    ],
  },
  {
    slug: "empyema-gallbladder-management",
    title: "Empyema Gallbladder: Challenges in Surgical Management",
    excerpt: "Empyema of the gallbladder presents unique surgical challenges due to severe inflammation and adhesions.",
    date: "March 18, 2026",
    author: "Dr. Murshidul Arefin",
    readTime: "6 min read",
    thumbnail: thumb04,
    tags: ["Empyema", "Gallbladder", "Surgical Management"],
    content: [
      "Empyema of the gallbladder represents one of the most challenging conditions encountered in biliary surgery. This condition occurs when the gallbladder becomes filled with pus, typically as a complication of acute cholecystitis with cystic duct obstruction.",
      "Clinical presentation may include persistent right upper quadrant pain, high-grade fever, leukocytosis, and occasionally a palpable mass. In elderly or immunocompromised patients, symptoms may be subtle, leading to delayed diagnosis and increased morbidity.",
      "Imaging plays a crucial role in preoperative planning. Ultrasound findings suggestive of empyema include a distended gallbladder with internal echoes, thickened wall, and pericholecystic fluid. CT scan provides additional information about surrounding inflammation, abscess formation, and hepatic involvement.",
      "Surgical management of empyema gallbladder requires meticulous technique. The severe inflammation and dense adhesions in the hepatocystic triangle can distort normal anatomy, making identification of the cystic duct and artery particularly challenging. A low threshold for subtotal cholecystectomy should be maintained when the anatomy cannot be safely delineated.",
      "Percutaneous cholecystostomy may serve as a bridge to definitive surgery in critically ill patients or those with prohibitive surgical risk. This temporizing measure allows for drainage of the infected collection and optimization of the patient's condition before definitive cholecystectomy.",
      "Outcomes in empyema gallbladder surgery have improved with advances in surgical technique and perioperative care, but complication rates remain higher than elective cholecystectomy. Multidisciplinary involvement and experienced surgical teams are essential for optimal patient outcomes.",
    ],
  },
  {
    slug: "gallbladder-stone-laparoscopic-removal",
    title: "Laparoscopic Gallbladder Stone Removal: A Step-by-Step Guide",
    excerpt: "This technical article walks through the standard laparoscopic cholecystectomy procedure from positioning to retrieval.",
    date: "March 5, 2026",
    author: "Dr. Murshidul Arefin",
    readTime: "8 min read",
    thumbnail: thumb05,
    tags: ["Laparoscopic Surgery", "Step-by-Step", "Technical"],
    content: [
      "Laparoscopic cholecystectomy follows a systematic approach to ensure safety and efficiency. The patient is positioned supine with the right side slightly elevated. General anesthesia is administered, and pneumoperitoneum is established using either Veress needle or open (Hasson) technique.",
      "Port placement follows the standard four-port technique: a 10mm umbilical port for the camera, a 10mm epigastric port for dissection, and two 5mm ports in the right subcostal region for retraction. Some surgeons now prefer a three-port technique to minimize wound complications.",
      "Exposure of the hepatocystic triangle begins with grasping the fundus of the gallbladder and retracting it superiorly over the liver edge. The infundibulum is then retracted laterally to open up the triangle of Calot. Careful dissection of peritoneal attachments reveals the underlying structures.",
      "Achieving the critical view of safety (CVS) is the most important step. The hepatocystic triangle must be cleared of fat and fibrous tissue until only two structures — the cystic duct and cystic artery — are seen entering the gallbladder. This visualization is confirmed from both anterior and posterior perspectives.",
      "Once CVS is confirmed, the cystic artery and cystic duct are individually clipped with titanium clips and divided. The gallbladder is then dissected off the liver bed using electrocautery, working from the triangle toward the fundus. Hemostasis of the liver bed is carefully achieved.",
      "Specimen retrieval is performed through the umbilical or epigastric port, using an endoscopic retrieval bag when the gallbladder contains stones. The operative field is irrigated, hemostasis confirmed, ports are removed under direct vision, and fascial and skin closures complete the procedure.",
    ],
  },
  {
    slug: "open-surgery-vs-laparoscopic",
    title: "Open Surgery vs. Laparoscopic: When Is Open Approach Still Necessary?",
    excerpt: "While laparoscopic surgery has become the default, certain conditions may require conversion to open surgery.",
    date: "February 22, 2026",
    author: "Dr. Murshidul Arefin",
    readTime: "6 min read",
    thumbnail: thumb06,
    tags: ["Open Surgery", "Laparoscopic", "Decision Making"],
    content: [
      "The evolution from open to laparoscopic surgery represents one of the greatest paradigm shifts in modern surgery. However, the open approach remains an essential tool in the surgeon's armamentarium, and knowing when to convert is a hallmark of surgical judgment.",
      "Common indications for conversion from laparoscopic to open cholecystectomy include inability to identify anatomy safely, uncontrolled bleeding, suspected bile duct injury, and dense adhesions from previous surgery. The conversion rate varies from 2-15% depending on the surgical population and case complexity.",
      "Certain patient populations may benefit from a planned open approach. These include patients with known Mirizzi syndrome, gallbladder carcinoma suspected preoperatively, severe portal hypertension with prominent collateral vessels, or extensive previous upper abdominal surgery.",
      "The decision to convert should never be viewed as a failure. Rather, it represents sound surgical judgment prioritizing patient safety over surgical approach. Timely conversion has been shown to reduce serious complications compared to prolonged attempts at laparoscopic completion.",
      "In hepatobiliary surgery beyond the gallbladder, open approaches remain the standard for many complex procedures. Major liver resections, hilar cholangiocarcinoma surgery, and complex biliary reconstructions often require the exposure and tactile feedback that only open surgery can provide.",
      "The hybrid approach — beginning laparoscopically for diagnostic evaluation and mobilization, then converting to a targeted open incision — combines the benefits of both techniques and is increasingly used in complex hepatobiliary cases.",
    ],
  },
  {
    slug: "liver-resection-hepatocellular-carcinoma",
    title: "Liver Resection for Hepatocellular Carcinoma: Current Approaches",
    excerpt: "Hepatocellular carcinoma (HCC) is one of the most common liver cancers. Surgical resection remains curative for selected patients.",
    date: "February 10, 2026",
    author: "Dr. Murshidul Arefin",
    readTime: "7 min read",
    thumbnail: thumb07,
    tags: ["Liver Cancer", "Hepatocellular Carcinoma", "Liver Resection"],
    content: [
      "Hepatocellular carcinoma (HCC) is the sixth most common cancer globally and the third leading cause of cancer-related death. In Bangladesh, the burden of HCC is significant, primarily driven by hepatitis B virus infection and increasingly by non-alcoholic fatty liver disease.",
      "Patient selection for liver resection requires comprehensive evaluation. Key factors include tumor characteristics (size, number, vascular invasion), underlying liver function (Child-Pugh score, MELD score, ICG clearance), and overall performance status. The Barcelona Clinic Liver Cancer (BCLC) staging system guides treatment allocation.",
      "Preoperative planning is critical for safe liver resection. Volumetric CT analysis determines the future liver remnant (FLR), which must be adequate to prevent post-hepatectomy liver failure. Portal vein embolization may be used to induce compensatory hypertrophy of the FLR when it is deemed insufficient.",
      "Surgical techniques for liver resection have evolved significantly. Anatomical resection following Couinaud's segmental anatomy is preferred over non-anatomical wedge resection, as it provides better oncological margins. Intraoperative ultrasound is essential for identifying tumor boundaries and vascular anatomy.",
      "Parenchymal transection methods include the clamp-crushing technique, ultrasonic dissection (CUSA), and energy-based devices. Vascular control strategies such as the Pringle maneuver and selective hepatic vascular exclusion minimize blood loss during transection.",
      "Outcomes after liver resection for HCC have improved substantially, with operative mortality rates at high-volume centers now below 5%. Five-year survival rates of 50-70% are achievable in well-selected patients, though recurrence remains a significant challenge requiring vigilant surveillance.",
    ],
  },
  {
    slug: "bile-duct-injury-prevention",
    title: "Preventing Bile Duct Injuries During Cholecystectomy",
    excerpt: "Bile duct injury is a feared complication. The critical view of safety and understanding anatomy variations are essential.",
    date: "January 28, 2026",
    author: "Dr. Murshidul Arefin",
    readTime: "6 min read",
    thumbnail: thumb08,
    tags: ["Bile Duct Injury", "Prevention", "Safety"],
    content: [
      "Bile duct injury (BDI) during cholecystectomy remains a significant concern, occurring in approximately 0.3-0.7% of laparoscopic cholecystectomies. Despite its relative rarity, the consequences of BDI can be devastating, including prolonged hospital stays, multiple reoperations, and long-term quality of life impairment.",
      "Understanding the common mechanisms of injury is essential for prevention. The most frequent cause is misidentification of the common bile duct as the cystic duct, often due to excessive cephalad traction on the gallbladder infundibulum, which aligns the cystic and common bile ducts.",
      "The critical view of safety (CVS), first described by Strasberg in 1995, is the single most important strategy for preventing BDI. CVS requires: 1) the hepatocystic triangle cleared of fat and fibrous tissue, 2) the lower third of the gallbladder separated from the liver bed, and 3) only two structures seen entering the gallbladder.",
      "Anatomical variations of the biliary tree are common and contribute to injury risk. Aberrant right hepatic ducts, low-inserting cystic ducts, and parallel course of the cystic and common bile ducts are among the variants that increase surgical complexity.",
      "Intraoperative cholangiography (IOC) and near-infrared fluorescence cholangiography with indocyanine green (ICG) are valuable adjuncts for biliary anatomy identification. While routine IOC remains debated, selective use in difficult cases provides real-time roadmap of the biliary anatomy.",
      "When anatomy cannot be clearly identified despite careful dissection, the surgeon should employ bail-out strategies: subtotal cholecystectomy, cholecystostomy tube placement, or conversion to open surgery. These alternatives are far preferable to inadvertent bile duct injury.",
    ],
  },
  {
    slug: "international-surgical-congress-highlights",
    title: "Highlights from the 16th International Surgical Congress 2025",
    excerpt: "The 16th International Surgical Congress brought together leading surgeons covering innovations in minimally invasive surgery.",
    date: "January 15, 2026",
    author: "Dr. Murshidul Arefin",
    readTime: "5 min read",
    thumbnail: thumb09,
    tags: ["Conference", "International", "Surgical Congress"],
    content: [
      "The 16th International Surgical Congress, held in late 2025, brought together over 2,000 surgeons from 45 countries. The congress featured groundbreaking presentations on minimally invasive surgery, AI-assisted diagnostics, and advances in hepatobiliary oncology.",
      "A major highlight was the session on artificial intelligence in surgical planning. Presentations demonstrated how machine learning algorithms can analyze preoperative CT scans to predict surgical difficulty, estimate blood loss, and suggest optimal resection planes for liver surgery.",
      "The robotic surgery symposium showcased the latest generation of surgical robots with haptic feedback and improved ergonomics. Several presentations reported favorable outcomes with robotic liver resection, including reduced blood loss and shorter hospital stays compared to traditional laparoscopic approaches.",
      "Hepatobiliary oncology sessions focused on combined modality treatments. Neoadjuvant immunotherapy for initially unresectable hepatocellular carcinoma showed promising conversion rates, expanding the pool of patients eligible for curative surgery.",
      "The congress also highlighted the importance of global surgical access. Sessions on training programs in low- and middle-income countries emphasized the need for sustainable surgical education models and appropriate technology transfer.",
      "Dr. Arefin's presentation on laparoscopic management of complex gallbladder disease in the Bangladeshi population was well received, generating meaningful discussion about adapting surgical approaches to local disease patterns and healthcare infrastructure.",
    ],
  },
];

/* ── Related articles sidebar ── */
const relatedLinks = [
  { label: "Liver Surgery", path: "/treatment/liver-surgery/" },
  { label: "Gallbladder Surgery", path: "/treatment/gallbladder-surgery/" },
  { label: "Pancreatic Surgery", path: "/treatment/pancreatic-surgery/" },
  { label: "Biliary Tract Surgery", path: "/treatment/biliary-tract-surgery/" },
  { label: "All Articles", path: "/articles/" },
];

const ArticleSingleDark = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);

  if (!article) return <Navigate to="/articles/" replace />;

  /* prev/next navigation */
  const idx = articles.findIndex((a) => a.slug === slug);
  const prev = idx > 0 ? articles[idx - 1] : null;
  const next = idx < articles.length - 1 ? articles[idx + 1] : null;

  /* Related articles (exclude current, pick 3) */
  const related = articles.filter((a) => a.slug !== slug).slice(0, 3);

  const isoDate = ISO_DATE[article.date] || article.date;
  const articleBody = article.content.join(" ");
  const wordCount = articleBody.split(/\s+/).filter(Boolean).length;
  const articleUrl = `https://drarefin.com/articles/${article.slug}/`;

  const jsonLdString = buildGraph(
    buildBreadcrumbList([
      { name: "Articles", path: "/articles/" },
      { name: article.title, path: `/articles/${article.slug}/` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description: article.excerpt,
      datePublished: isoDate,
      dateModified: isoDate,
      mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
      wordCount,
      articleBody,
      keywords: article.tags.join(", "),
      author: { "@id": "https://drarefin.com/#physician" },
      image: article.thumbnail,
      url: articleUrl,
      publisher: {
        "@type": "Organization",
        name: "Dr. Murshidul Arefin",
        url: "https://drarefin.com/",
      },
    }
  );

  return (
    <div className="arefin dark min-h-screen bg-background text-foreground font-arefin">
      <Helmet>
        <title>{article.title} — Dr. Murshidul Arefin</title>
        <meta name="description" content={article.excerpt} />
        <link rel="canonical" href={articleUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={articleUrl} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={article.thumbnail} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt} />
        <meta name="twitter:image" content={article.thumbnail} />
        <link rel="preload" as="image" href={article.thumbnail} />
        <script type="application/ld+json">{jsonLdString}</script>
      </Helmet>

      <DrArefinHeader logoSrc={darkLogo} />

      {/* ── Hero ── */}
      <section className="single-article-hero relative overflow-hidden flex items-end" aria-label="Article hero">
        <div className="single-article-hero-bg absolute inset-0">
          <img
            src={article.thumbnail}
            alt={article.title}
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="single-article-hero-overlay absolute inset-0" />
        <div className="container relative z-10 px-4 sm:px-6 pt-28 sm:pt-36 md:pt-40 lg:pt-44 pb-12 sm:pb-16 md:pb-20 lg:pb-24 max-w-4xl">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
              <ol className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs uppercase tracking-widest text-primary font-semibold flex-wrap">
                <li><Link to="/" className="text-primary hover:underline">Home</Link></li>
                <li><ChevronRight className="h-3 w-3 text-primary/50" /></li>
                <li><Link to="/articles/" className="text-primary hover:underline">Articles</Link></li>
                <li><ChevronRight className="h-3 w-3 text-primary/50" /></li>
                <li className="text-white truncate max-w-[160px] sm:max-w-[280px] md:max-w-none">{article.title}</li>
              </ol>
            </nav>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="single-article-h1 text-fluid-h1 font-bold tracking-tight">
              {article.title}
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <div className="single-article-meta text-fluid-meta">
              <span className="single-article-meta-item">
                <Calendar className="h-4 w-4" aria-hidden />
                <time dateTime={isoDate}>{article.date}</time>
              </span>
              <span className="single-article-meta-item">
                <User className="h-4 w-4" aria-hidden />
                {article.author}
              </span>
              <span className="single-article-meta-item">
                <Clock className="h-4 w-4" aria-hidden />
                {article.readTime}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Main content 2-col ── */}
      <section className="arefin-section-divider py-12 sm:py-16 md:py-24 bg-background">
        <div className="container px-4 sm:px-6">
          <div className="single-article-layout">
            {/* Content column */}
            <article className="single-article-content">
              <Reveal>
                <div className="single-article-tags">
                  {article.tags.map((tag) => (
                    <span key={tag} className="single-article-tag">{tag}</span>
                  ))}
                </div>
              </Reveal>

              {article.content.map((paragraph, i) => (
                <Reveal key={i} delay={i * 50}>
                  <p className="single-article-para">{paragraph}</p>
                </Reveal>
              ))}

              {/* Post navigation */}
              <div className="single-article-nav">
                {prev ? (
                  <Link to={`/articles/${prev.slug}/`} className="single-article-nav-link prev">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="single-article-nav-label">Previous</span>
                    <span className="single-article-nav-title">{prev.title}</span>
                  </Link>
                ) : <div />}
                {next ? (
                  <Link to={`/articles/${next.slug}/`} className="single-article-nav-link next">
                    <span className="single-article-nav-label">Next</span>
                    <span className="single-article-nav-title">{next.title}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : <div />}
              </div>
            </article>

            {/* Sidebar */}
            <aside className="single-article-sidebar">
              {/* CTA Box */}
              <div className="single-sidebar-cta">
                <h3 className="single-sidebar-cta-title">Book a Consultation</h3>
                <p className="single-sidebar-cta-text">
                  Get expert advice from Dr. Murshidul Arefin for your hepatobiliary concerns.
                </p>
                <CallBookPill />
              </div>

              {/* Treatment links */}
              <div className="single-sidebar-box">
                <h3 className="single-sidebar-box-title">Our Treatments</h3>
                <ul className="single-sidebar-links">
                  {relatedLinks.map((link) => (
                    <li key={link.path}>
                      <Link to={link.path} className="single-sidebar-link">
                        <ChevronRight className="h-3.5 w-3.5" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact quick */}
              <div className="single-sidebar-box">
                <h3 className="single-sidebar-box-title">Quick Contact</h3>
                <div className="single-sidebar-contact">
                  <a href="tel:+8801311487592" className="single-sidebar-contact-link">
                    <Phone className="h-4 w-4" />
                    <span>+880 1311-487592</span>
                  </a>
                  <a href="https://wa.me/8801311487592" target="_blank" rel="noopener noreferrer" className="single-sidebar-contact-link">
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp</span>
                  </a>
                  <a href="mailto:dr.murshidul.arefin@gmail.com" className="single-sidebar-contact-link">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Related Articles ── */}
      <section className="arefin-section-divider arefin-surface-alt py-12 sm:py-16 md:py-24">
        <div className="container px-4 sm:px-6">
          <Reveal>
            <h2 className="text-fluid-h2 font-semibold text-foreground mb-10 leading-tight text-center">
              Related <span className="text-primary">Articles</span>
            </h2>
          </Reveal>
          <div className="single-related-grid">
            {related.map((post, i) => (
              <Reveal key={post.slug} delay={i * 80}>
                <Link to={`/articles/${post.slug}/`} className="article-card block">
                  <div className="article-card-thumb">
                    <img src={post.thumbnail} alt={post.title} loading="lazy" className="article-card-img" />
                  </div>
                  <div className="article-card-body">
                    <h3 className="article-card-title">{post.title}</h3>
                    <ul className="article-card-meta text-fluid-meta">
                      <li>
                        <time dateTime={ISO_DATE[post.date] || post.date}>{post.date}</time>
                      </li>
                    </ul>
                    <p className="article-card-excerpt">{post.excerpt}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA — shared GlobalCTABand ── */}
      <GlobalCTABand
        headingLead="Need "
        headingAccent="Expert Advice?"
        body={
          <>
            Schedule a consultation with <Link to="/about/" title="About Dr. Murshidul Arefin"><strong>Dr. Arefin</strong></Link> for{" "}
            <Link to="/contact/" title="Personalised surgical guidance"><strong>personalised surgical guidance</strong></Link> and{" "}
            <Link to="/diagnosis-surgery-recovery/" title="Treatment planning process"><strong>treatment planning</strong></Link>.
          </>
        }
      />

      <DrArefinFooter />

      {/* ── Scoped styles ── */}
      <style>{`
        /* ── Hero ── */
        .arefin .single-article-hero { min-height: 380px; }
        @media (min-width: 640px) { .arefin .single-article-hero { min-height: 480px; } }
        .arefin .single-article-hero-bg img { filter: brightness(0.3); }
        .arefin .single-article-hero-overlay {
          background: linear-gradient(
            to bottom,
            hsl(0 0% 0% / 0.20) 0%,
            hsl(0 0% 0% / 0.50) 60%,
            hsl(0 0% 0% / 0.70) 100%
          );
        }
        .arefin .single-article-h1 {
          color: hsl(0 0% 100%);
          text-shadow: 0 2px 20px hsl(0 0% 0% / 0.6);
          transition: text-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      color 280ms cubic-bezier(0.22, 1, 0.36, 1);
          cursor: default;
          word-wrap: break-word;
          overflow-wrap: break-word;
          hyphens: auto;
        }
        .arefin .single-article-h1:hover {
          color: hsl(var(--primary));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* Meta */
        .arefin .single-article-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px 16px;
          margin-top: 16px;
        }
        @media (min-width: 640px) {
          .arefin .single-article-meta { gap: 20px; margin-top: 20px; }
        }
        .arefin .single-article-meta-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8125rem;
          color: hsl(var(--primary));
          font-weight: 500;
        }
        @media (min-width: 640px) {
          .arefin .single-article-meta-item { font-size: 0.875rem; }
        }

        /* ── Layout ── */
        .arefin .single-article-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }
        @media (min-width: 640px) { .arefin .single-article-layout { gap: 40px; } }
        @media (min-width: 1024px) {
          .arefin .single-article-layout {
            grid-template-columns: 1fr 340px;
            gap: 48px;
          }
        }

        /* ── Content ── */
        .arefin .single-article-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 28px;
        }
        .arefin .single-article-tag {
          display: inline-block;
          padding: 4px 14px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: hsl(var(--primary));
          border: 1px solid hsl(var(--primary) / 0.3);
          border-radius: 9999px;
          background: hsl(var(--primary) / 0.08);
        }
        .arefin .single-article-para {
          font-size: 0.9375rem;
          line-height: 1.8;
          color: hsl(var(--muted-foreground));
          margin-bottom: 18px;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
        @media (min-width: 640px) {
          .arefin .single-article-para { font-size: 1rem; line-height: 1.85; margin-bottom: 20px; }
        }

        /* ── Post Navigation ── */
        .arefin .single-article-nav {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-top: 36px;
          padding-top: 24px;
          border-top: 1px solid hsl(var(--border));
        }
        @media (min-width: 640px) {
          .arefin .single-article-nav {
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin-top: 48px;
            padding-top: 32px;
          }
        }
        .arefin .single-article-nav-link {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--card));
          text-decoration: none;
          transition: border-color 300ms ease, box-shadow 300ms ease;
        }
        .arefin .single-article-nav-link:hover {
          border-color: hsl(var(--primary-bright));
          box-shadow: -3px 0 0 0 hsl(var(--primary-bright));
        }
        .arefin .single-article-nav-link.next {
          text-align: right;
          align-items: flex-end;
        }
        .arefin .single-article-nav-link.next:hover {
          box-shadow: 3px 0 0 0 hsl(var(--primary-bright));
        }
        .arefin .single-article-nav-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: hsl(var(--primary));
          font-weight: 600;
        }
        .arefin .single-article-nav-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: hsl(var(--foreground));
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* ── Sidebar ── */
        .arefin .single-article-sidebar {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        @media (min-width: 640px) {
          .arefin .single-article-sidebar { gap: 24px; }
        }
        @media (min-width: 1024px) {
          .arefin .single-article-sidebar {
            position: sticky;
            top: 100px;
            align-self: flex-start;
          }
        }

        /* Sidebar CTA */
        .arefin .single-sidebar-cta {
          padding: 24px;
          border-radius: 12px;
          background: hsl(var(--primary) / 0.08);
          border: 1px solid hsl(var(--primary) / 0.2);
          text-align: center;
        }
        .arefin .single-sidebar-cta-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: hsl(var(--foreground));
          margin-bottom: 8px;
        }
        .arefin .single-sidebar-cta-text {
          font-size: 0.875rem;
          color: hsl(var(--muted-foreground));
          line-height: 1.6;
          margin-bottom: 16px;
        }

        /* Sidebar boxes */
        .arefin .single-sidebar-box {
          padding: 20px;
          border-radius: 12px;
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
        }
        .arefin .single-sidebar-box-title {
          font-size: 1rem;
          font-weight: 700;
          color: hsl(var(--foreground));
          margin-bottom: 14px;
          padding-bottom: 10px;
          border-bottom: 1px solid hsl(var(--border));
        }
        .arefin .single-sidebar-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .arefin .single-sidebar-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 4px 4px;
          min-height: 26px;
          font-size: 0.875rem;
          font-weight: 500;
          color: hsl(var(--muted-foreground));
          text-decoration: none;
          border-radius: 6px;
          transition: color 200ms ease, background 200ms ease;
        }
        .arefin .single-sidebar-link:hover {
          color: hsl(var(--primary));
          background: hsl(var(--primary) / 0.06);
        }

        /* Sidebar contact */
        .arefin .single-sidebar-contact {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .arefin .single-sidebar-contact-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 4px;
          min-height: 44px;
          font-size: 0.875rem;
          color: hsl(var(--muted-foreground));
          text-decoration: none;
          transition: color 200ms ease;
        }
        .arefin .single-sidebar-contact-link:hover {
          color: hsl(var(--primary));
        }

        /* ── Related grid ── */
        .arefin .single-related-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 640px) { .arefin .single-related-grid { gap: 28px; } }
        @media (min-width: 768px) {
          .arefin .single-related-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Surface alt (for section differentiation) */
        .arefin .arefin-surface-alt {
          background: hsl(var(--surface-section));
        }

        /* Related article cards — Atto hover + surface elevation on dark band */
        .arefin .arefin-surface-alt .article-card {
          background: hsl(0 0% 97%);
          color: hsl(0 0% 8%);
          border: 1px solid hsl(0 0% 88%);
          border-left: 3px solid hsl(0 0% 88%);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 1px 3px hsl(0 0% 0% / 0.18);
          cursor: pointer;
          transition: box-shadow 300ms ease, border-left-color 300ms ease;
          display: flex;
          flex-direction: column;
          height: 100%;
          text-decoration: none;
        }
        .arefin .arefin-surface-alt .article-card:hover {
          border-left-color: hsl(var(--primary-darker));
          box-shadow: 8px 8px 0 0 rgb(var(--hover-shadow-ink));
        }
        .arefin .arefin-surface-alt .article-card .article-card-title {
          color: hsl(0 0% 12%);
        }
        .arefin .arefin-surface-alt .article-card:hover .article-card-title {
          color: hsl(142 71% 25%);
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }
        .arefin .arefin-surface-alt .article-card .article-card-excerpt {
          color: hsl(0 0% 30%);
        }
        .arefin .arefin-surface-alt .article-card .article-card-meta,
        .arefin .arefin-surface-alt .article-card .article-card-meta li {
          color: hsl(142 71% 25%);
        }
        .arefin .article-card-thumb {
          width: 100%;
          height: 200px;
          overflow: hidden;
        }
        .arefin .article-card-img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .arefin .article-card-body {
          padding: 16px 20px 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .arefin .article-card-title {
          font-size: 0.95rem;
          font-weight: 700;
          line-height: 1.4;
          margin-bottom: 8px;
          color: hsl(var(--foreground));
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .arefin .article-card:hover .article-card-title {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }
        .arefin .article-card-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          list-style: none;
          padding: 0;
          margin: 0 0 10px;
          font-size: 0.75rem;
          color: hsl(var(--primary));
        }
        .arefin .article-card-excerpt {
          font-size: 0.8125rem;
          line-height: 1.65;
          color: hsl(var(--muted-foreground));
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ArticleSingleDark;
