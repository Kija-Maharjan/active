import Image from "next/image";

export default function Gallery() {
  return (
    <section className="gallery" id="gallery">
      <div className="gal-header">
        <div className="section-label">Gallery</div>
        <h2 className="section-title">Inside The Gym</h2>
      </div>
      <div className="gal-strip">
        <Image
          src="/uploads/2.svg"
          alt="Gym equipment"
          width={500}
          height={340}
          style={{ height: 340, width: "auto", flexShrink: 0 }}
        />
        <Image
          src="/uploads/1.svg"
          alt="Active Fitness Logo"
          width={340}
          height={340}
          style={{
            height: 340,
            width: 340,
            flexShrink: 0,
            background: "#1a1d20",
            objectFit: "contain",
            padding: 20,
          }}
        />
        <Image
          src="/uploads/3.svg"
          alt="Dumbbells"
          width={500}
          height={340}
          style={{ height: 340, width: "auto", flexShrink: 0 }}
        />
      </div>
    </section>
  );
}
