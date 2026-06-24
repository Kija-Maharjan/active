"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function Nav() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const loadUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", user.id)
          .single();
        setProfile(profile);
      }
    };
    loadUser();
  }, []);

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
        {user ? (
          <Link href="/profile" className="nav-profile-link" onClick={() => setOpen(false)}>
            <span className="nav-avatar">
              {profile?.full_name
                ? profile.full_name
                    .split(" ")
                    .map((part: string) => part[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()
                : "ME"}
            </span>
            <span className="nav-profile-text">Profile</span>
          </Link>
        ) : (
          <>
            <Link
              href="/login"
              className="nav-login-link"
            >
              Login
            </Link>
            <button className="cta-btn" onClick={() => router.push("/signup") }>
              Join Now
            </button>
          </>
        )}
      </div>
      <button className={`hamburger ${open ? "open" : ""}`} onClick={() => setOpen(!open)} aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}
