import { Link } from "react-router-dom";
import SlideButton from "@/components/arefin/SlideButton";
import CountUp from "@/components/CountUp";
import portrait from "@/assets/dr-arefin-portrait.webp";

/**
 * About — Variation C (LIGHT) "Clinical Authority"
 * Spec: spec/04-section-variations/04-about-04/02-about-04.md § Variation C
 *
 * Conversion-focused. Image left with offset sage accent block, stat strip below
 * paragraphs with CountUp, dual CTA. Patient-journey copy reframe.
 */
const stats = [
  { end: 7, suffix: "+", label: "Years Experience" },
  { end: 1000, suffix: "+", label: "Successful Surgeries" },
  { end: 100, suffix: "%", label: "Patient-First Care" },
];

const AboutV04LightC = () => {
  return (
    <section
      className="hero-04-light-band relative"
      aria-label="About Dr. Murshidul Arefin — clinical authority"
    >
      <div className="container py-14 md:py-20 lg:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image column — left */}
          <div className="lg:col-span-5 hero-anim-card hero-d-0">
            <div
              className="relative"
              style={{ paddingRight: 16, paddingBottom: 16 }}
            >
              {/* Offset accent block */}
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  right: 0,
                  bottom: 0,
                  background: "hsl(var(--hero-light-primary))",
                  borderRadius: "1rem",
                  zIndex: 0,
                }}
              />
              <figure className="about-c-figure relative" style={{ zIndex: 1 }}>
                <img
                  src={portrait}
                  alt="Dr. Murshidul Arefin — Hepatobiliary & Liver Transplant Surgeon, Dhaka"
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: "100%",
                    aspectRatio: "4 / 5",
                    objectFit: "cover",
                    objectPosition: "center top",
                    borderRadius: "1rem",
                    border: "1px solid hsl(var(--hero-light-border))",
                    display: "block",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
              </figure>
            </div>
          </div>

          {/* Text column — right */}
          <div className="lg:col-span-7 hero-anim-fade-up hero-d-100">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                style={{
                  display: "inline-block",
                  width: 24,
                  height: 1,
                  background: "hsl(var(--hero-light-primary))",
                }}
              />
              <span
                className="font-arefin"
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "hsl(var(--hero-light-primary))",
                }}
              >
                About the surgeon
              </span>
            </div>

            <h2
              className="font-arefin-heading mt-4"
              style={{
                fontSize: "clamp(36px, 5vw, 52px)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "hsl(var(--hero-light-deep))",
                fontWeight: 700,
              }}
            >
              About Dr. Murshidul Arefin
            </h2>

            <div className="mt-6 space-y-5">
              <p
                className="font-arefin"
                style={{
                  fontSize: 17,
                  lineHeight: 1.75,
                  color: "hsl(var(--hero-light-muted))",
                }}
              >
                Dr. Murshidul Arefin is a highly skilled{" "}
                <strong>
                  Hepatobiliary and Pancreatic Surgery Specialist
                </strong>{" "}
                in Dhaka, Bangladesh — recognised for excellence in liver,
                gallbladder, bile duct, and pancreatic surgery.
              </p>
              <p
                className="font-arefin"
                style={{
                  fontSize: 17,
                  lineHeight: 1.75,
                  color: "hsl(var(--hero-light-muted))",
                }}
              >
                Trained at the{" "}
                <strong>
                  University of Dhaka (MBBS)
                </strong>{" "}
                and{" "}
                <strong>
                  BSMMU (MS, Hepatobiliary Surgery)
                </strong>
                , he now serves as a Consultant in General, Laparoscopic, and
                Liver Transplant Surgery at{" "}
                <strong>
                  Popular Medical College Hospital, Dhanmondi
                </strong>{" "}
                — combining advanced technique with calm, clear,
                patient-centred care.
              </p>
              <p
                className="font-arefin"
                style={{
                  fontSize: 17,
                  lineHeight: 1.75,
                  color: "hsl(var(--hero-light-muted))",
                }}
              >
                From your first consultation through diagnosis, surgery, and
                recovery, you'll be guided by a surgeon thousands of patients
                across Bangladesh have already trusted. A patient-first
                approach. Minimally invasive expertise. And an unwavering focus
                on getting you safely back to the life you love.
              </p>
            </div>

            {/* Stat strip */}
            <div
              className="mt-8 pt-6 grid grid-cols-3 gap-4 hero-anim-fade-up hero-d-200"
              style={{ borderTop: "1px solid hsl(var(--hero-light-border))" }}
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  aria-label={`${s.end}${s.suffix} ${s.label}`}
                >
                  <div
                    className="font-arefin-heading"
                    style={{
                      fontSize: "clamp(28px, 3.4vw, 34px)",
                      lineHeight: 1,
                      color: "hsl(var(--hero-light-primary))",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    <CountUp end={s.end} suffix={s.suffix} separator="" />
                  </div>
                  <div
                    className="font-arefin mt-2"
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "hsl(var(--hero-light-muted))",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <SlideButton to="/about/" hoverText="Learn More">
                Learn More
              </SlideButton>
              <Link
                to="/contact/"
                className="about-c-ghost font-arefin"
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "hsl(var(--hero-light-deep))",
                  textDecoration: "none",
                }}
              >
                Book Consultation →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .arefin .about-c-figure {
          transition: box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .arefin .about-c-figure:hover {
          box-shadow: 8px 8px 0 0 hsl(var(--hero-light-primary) / 0.18);
        }
        .arefin .about-c-ghost {
          transition: color 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .arefin .about-c-ghost:hover {
          color: hsl(var(--hero-light-primary));
        }
      `}</style>
    </section>
  );
};

export default AboutV04LightC;
