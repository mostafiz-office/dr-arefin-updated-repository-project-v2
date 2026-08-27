import { Link } from "react-router-dom";
import SeoLink from "@/components/arefin/SeoLink";
import { ArrowRight, BookOpen } from "lucide-react";
import portrait from "@/assets/arefin-about-portrait-real.webp";

/**
 * About — Variation B (LIGHT) "Credentials Showcase"
 * Refactored to reuse shared hero tokens (.hero-eyebrow, .hero-h1, .hero-lede,
 * .hero-h1-link, .hero-p-link, .hero-cta-primary/secondary). All inline styles
 * removed — local-only chrome (figure shadow + credentials chip) lives in
 * src/index.css under .about-b-* classes.
 */
const AboutV04LightB = () => {
  return (
    <section
      className="hero-04-light-band arefin-section-divider relative"
      aria-label="About Dr. Murshidul Arefin — credentials showcase"
    >
      <div className="container py-14 md:py-20 lg:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text column */}
          <div className="lg:col-span-7 hero-anim-fade-up hero-d-0">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="about-b-rule" />
              <p className="hero-eyebrow">About the surgeon</p>
            </div>

            <h2 className="hero-h1 font-arefin-heading mt-4">
              About{" "}
              <a href="#about" className="hero-h1-link is-accent">
                Dr. Murshidul Arefin
              </a>
            </h2>

            <div className="mt-6 space-y-5">
              <p className="type-body">
                <SeoLink to="/dr-murshidul-arefin/" title="Dr. Murshidul Arefin — Dhaka's leading hepatobiliary, liver, gallbladder, and pancreatic surgeon at Popular Medical College Hospital, Dhanmondi">Dr. Murshidul Arefin</SeoLink>{" "}
                is a highly skilled{" "}
                <SeoLink to="/hepatobiliary-pancreatic-surgery-specialist/" title="Hepatobiliary and pancreatic surgery specialist in Dhaka — Dr. Murshidul Arefin treats complex liver, gallbladder, bile duct, and pancreas disease">
                  Hepatobiliary and Pancreatic Surgery Specialist
                </SeoLink>{" "}
                based in Dhaka, Bangladesh, with a strong reputation for
                excellence in liver, gallbladder, bile duct, and pancreatic
                surgery.
              </p>
              <p className="type-body">
                He holds an{" "}
                <SeoLink to="/mbbs-university-of-dhaka/" title="MBBS qualification from the University of Dhaka — foundation medical training of Dr. Murshidul Arefin">
                  MBBS from the University of Dhaka
                </SeoLink>{" "}
                and an{" "}
                <SeoLink to="/ms-hepatobiliary-surgery-bsmmu/" title="MS in Hepatobiliary Surgery from BSMMU — postgraduate subspecialty training of Dr. Murshidul Arefin">
                  MS in Hepatobiliary Surgery from BSMMU
                </SeoLink>{" "}
                — the country's leading medical institution. Currently serving
                as a Consultant in{" "}
                <SeoLink to="/general-laparoscopic-liver-transplant-surgery/" title="Consultant in General, Laparoscopic, and Liver Transplant Surgery at Popular Medical College Hospital, Dhanmondi, Dhaka">
                  General, Laparoscopic, and Liver Transplant Surgery
                </SeoLink>{" "}
                at Popular Medical College Hospital, Dhanmondi, Dr. Arefin
                provides advanced surgical care with precision and compassion.
              </p>
              <p className="type-body">
                With years of hands-on experience and a deep commitment to
                patient well-being, he is recognized among the{" "}
                <SeoLink to="/best-hepatobiliary-surgeon-dhaka/" title="Best hepatobiliary surgeons in Dhaka — Dr. Murshidul Arefin's profile, credentials, and outcomes">
                  best hepatobiliary surgeons in Dhaka
                </SeoLink>
                . His patient-first approach, ethical standards, and expertise
                in{" "}
                <SeoLink to="/minimally-invasive-surgery/" title="Minimally invasive (laparoscopic) hepatobiliary surgery in Dhaka — smaller incisions, faster recovery, less pain by Dr. Arefin">
                  minimally invasive techniques
                </SeoLink>{" "}
                have earned him the trust of thousands seeking reliable liver
                and biliary treatment in Bangladesh.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/about/"
                aria-label="Learn more about Dr. Arefin"
                className="hero-cta-primary is-green"
              >
                Learn More
                <ArrowRight className="hero-cta-icon" />
              </Link>
              <Link
                to="/about/"
                aria-label="Read Dr. Arefin's full biography"
                className="hero-cta-secondary"
              >
                <BookOpen className="hero-cta-icon-sm" />
                Read Full Bio
              </Link>
            </div>
          </div>

          {/* Image column */}
          <div className="lg:col-span-5 hero-anim-card hero-d-100">
            <div className="about-b-portrait-wrap relative">
              <figure className="about-b-figure relative">
                <img
                  src={portrait}
                  alt="Dr. Murshidul Arefin — Hepatobiliary & Liver Transplant Surgeon, Dhaka"
                  width={1279}
                  height={1920}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="about-b-img block w-full h-auto"
                />
              </figure>

              {/* Floating credentials chip */}
              <div
                className="about-b-chip hero-anim-fade-up hero-d-200"
                aria-label="Credentials"
              >
                {[
                  "MBBS · University of Dhaka",
                  "MS Hepatobiliary · BSMMU",
                  "Consultant · Popular Medical College",
                ].map((line) => (
                  <div key={line} className="about-b-chip-row font-arefin">
                    <span aria-hidden="true" className="about-b-chip-dot" />
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutV04LightB;
