import SlideButton from "@/components/arefin/SlideButton";
import portrait from "@/assets/dr-arefin-portrait.webp";

/**
 * About — Variation A (LIGHT) "Editorial Classic"
 * Spec: spec/04-section-variations/04-about-04/02-about-04.md § Variation A
 *
 * Magazine-style asymmetric split. Text left, portrait right in a soft rounded frame
 * with a sharp zero-blur shadow on hover (no positional shift). Premium medical aesthetic.
 */
const AboutV04LightA = () => {
  return (
    <section
      className="hero-04-light-band relative"
      aria-label="About Dr. Murshidul Arefin — editorial classic"
    >
      <div className="container py-14 md:py-20 lg:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text column */}
          <div className="lg:col-span-6 hero-anim-fade-up hero-d-0">
            {/* Eyebrow */}
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

            {/* Signature line */}
            <span
              aria-hidden="true"
              style={{
                display: "block",
                width: 56,
                height: 2,
                marginTop: 20,
                background: "hsl(var(--hero-light-primary))",
                borderRadius: 9999,
              }}
            />

            <div className="mt-7 space-y-5">
              <p
                className="font-arefin"
                style={{
                  fontSize: 17,
                  lineHeight: 1.75,
                  color: "hsl(var(--hero-light-muted))",
                }}
              >
                Dr. Murshidul Arefin is a highly skilled Hepatobiliary and
                Pancreatic Surgery Specialist based in Dhaka, Bangladesh, with
                a strong reputation for excellence in liver, gallbladder, bile
                duct, and pancreatic surgery.
              </p>
              <p
                className="font-arefin"
                style={{
                  fontSize: 17,
                  lineHeight: 1.75,
                  color: "hsl(var(--hero-light-muted))",
                }}
              >
                He holds an MBBS from the University of Dhaka and an MS in
                Hepatobiliary Surgery from Bangabandhu Sheikh Mujib Medical
                University (BSMMU) — the country's leading medical institution.
                Currently serving as a Consultant in General, Laparoscopic, and
                Liver Transplant Surgery at Popular Medical College Hospital,
                Dhanmondi, Dr. Arefin provides advanced surgical care with
                precision and compassion.
              </p>
              <p
                className="font-arefin"
                style={{
                  fontSize: 17,
                  lineHeight: 1.75,
                  color: "hsl(var(--hero-light-muted))",
                }}
              >
                With years of hands-on experience and a deep commitment to
                patient well-being, he is recognized among the best
                hepatobiliary surgeons in Dhaka. His patient-first approach,
                ethical standards, and expertise in minimally invasive
                techniques have earned him the trust of thousands seeking
                reliable liver and biliary treatment in Bangladesh.
              </p>
            </div>

            <div className="mt-8">
              <SlideButton to="/about/" hoverText="Learn More">
                Learn More
              </SlideButton>
            </div>
          </div>

          {/* Image column */}
          <div className="lg:col-span-6 lg:order-2 hero-anim-card hero-d-100">
            <figure className="about-a-figure relative">
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
                }}
              />
            </figure>
          </div>
        </div>
      </div>

      <style>{`
        .arefin .about-a-figure {
          transition: box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .arefin .about-a-figure:hover {
          box-shadow: 8px 8px 0 0 hsl(var(--hero-light-primary) / 0.18);
        }
      `}</style>
    </section>
  );
};

export default AboutV04LightA;
