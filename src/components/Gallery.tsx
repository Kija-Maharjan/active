import Image from "next/image";

export default function Gallery() {
  return (
    <section className="gallery" id="gallery">
      <div className="gal-header">
        <div className="section-label">Gallery</div>
        <h2 className="section-title">Inside Our Gym</h2>
      </div>
      <div className="gal-strip">
        <Image
          src="/uploads/gym-1.jpg"
          alt="Active Fitness gym interior"
          width={600}
          height={400}
          style={{ height: 340, width: "auto", flexShrink: 0, objectFit: "cover" }}
        />
        <Image
          src="/uploads/gym-equipment.jpg"
          alt="Gym equipment"
          width={500}
          height={400}
          style={{ height: 340, width: "auto", flexShrink: 0, objectFit: "cover" }}
        />
        <Image
          src="/uploads/gym-dumbbells.jpg"
          alt="Dumbbells"
          width={500}
          height={400}
          style={{ height: 340, width: "auto", flexShrink: 0, objectFit: "cover" }}
        />
      </div>
    </section>
  );
}
