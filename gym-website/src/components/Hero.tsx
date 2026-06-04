export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-tag">Est. 2015 · Kathmandu</div>
        <h1>
          Forge Your <em>Strength.</em>
        </h1>
        <p className="hero-sub">
          A premium training environment built for those who refuse to settle.
          Iron, intensity, and results — every single day.
        </p>
        <p className="hero-addr">📍 Chandragiri 12, Balambu</p>
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
