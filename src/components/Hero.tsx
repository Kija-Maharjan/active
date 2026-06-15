export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-tag">Est. 2015 · Chandragiri</div>
        <h1>
          Forge Your <em>Strength.</em>
        </h1>
        <p className="hero-sub">
          A premium training environment built for those who refuse to settle.
          Iron, intensity, and results — every single day.
        </p>
        <p className="hero-addr">📍 M7W2+77J Chundevi Repair Road, Chandragiri 44600</p>
        <div className="hero-actions">
          <a href="#plans" className="btn-primary">
            Get Membership
          </a>
          <a href="#about" className="btn-outline">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
