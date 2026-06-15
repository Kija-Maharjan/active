import Image from "next/image";

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about-grid">
        <div className="about-img-wrap">
          <Image
            src="/uploads/2.svg"
            alt="Active Fitness Equipment"
            width={600}
            height={500}
            style={{ width: "100%", height: 500, objectFit: "cover" }}
          />
        </div>
        <div className="about-body">
          <div className="section-label">Who We Are</div>
          <h2 className="section-title">
            Built On Iron, Driven By Results
          </h2>
          <p>
            Since 2015, Active Fitness has been Chandragiri&apos;s premier strength
            and conditioning gym. We house a full range of professional-grade
            equipment to support every training goal — from powerlifting to body
            composition.
          </p>
          <p>
            Our facility is open every day of the week, giving you the
            flexibility to train on your schedule. Whether you&apos;re just
            starting out or a seasoned athlete, our space is designed to
            challenge and elevate you.
          </p>
          <a
            href="#contact"
            className="btn-primary"
            style={{ marginTop: 16, display: "inline-block" }}
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
