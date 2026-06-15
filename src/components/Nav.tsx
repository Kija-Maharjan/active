"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Nav() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav>
      <div className="logo">
        Active<span>Fitness</span>
      </div>
      <ul className={open ? "open" : ""}>
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
        <li className="nav-mobile-only">
          <Link href="/login" onClick={() => setOpen(false)}>Login</Link>
        </li>
        <li className="nav-mobile-only">
          <button className="cta-btn" onClick={() => { setOpen(false); router.push("/signup"); }}>Join Now</button>
        </li>
      </ul>
      <div className="nav-desktop-actions">
        <Link
          href="/login"
          className="nav-login-link"
        >
          Login
        </Link>
        <button className="cta-btn" onClick={() => router.push("/signup")}>
          Join Now
        </button>
      </div>
      <button className={`hamburger ${open ? "open" : ""}`} onClick={() => setOpen(!open)} aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}
