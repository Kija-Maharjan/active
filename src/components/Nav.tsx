"use client";

import Link from "next/link";

export default function Nav() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav>
      <div className="logo">
        Active<span>Fitness</span>
      </div>
      <ul>
        <li>
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo("about"); }}>About</a>
        </li>
        <li>
          <a href="#equipment" onClick={(e) => { e.preventDefault(); scrollTo("equipment"); }}>Facilities</a>
        </li>
        <li>
          <a href="#plans" onClick={(e) => { e.preventDefault(); scrollTo("plans"); }}>Plans</a>
        </li>
        <li>
          <a href="#gallery" onClick={(e) => { e.preventDefault(); scrollTo("gallery"); }}>Gallery</a>
        </li>
        <li>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>Contact</a>
        </li>
      </ul>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <Link
          href="/login"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "0.85rem",
            fontWeight: 600,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "var(--muted)",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
        >
          Login
        </Link>
        <button className="cta-btn" onClick={() => scrollTo("plans")}>
          Join Now
        </button>
      </div>
    </nav>
  );
}
