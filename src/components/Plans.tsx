"use client";
import { useRouter } from "next/navigation";

export default function Plans() {
  const router = useRouter();

  return (
    <section className="plans" id="plans">
      <div className="plans-inner">
        <div className="plans-intro">
          <div className="section-label">Membership</div>
          <h2 className="section-title">Choose Your Plan</h2>
          <p className="plans-sub">
            All plans include full gym access, locker facilities, and a free fitness consultation.
            No hidden fees — cancel anytime.
          </p>
        </div>
        <div className="plans-grid">
          <div className="plan">
            <div className="plan-name">Monthly</div>
            <div className="plan-price">
              <sup>Rs </sup>1,500<span>/mo</span>
            </div>
            <ul>
              <li>Full gym access</li>
              <li>All equipment included</li>
              <li>7 days a week</li>
              <li>Locker &amp; changing room</li>
              <li>Free fitness consultation</li>
            </ul>
            <button className="plan-btn" onClick={() => router.push("/signup")}>Get Started</button>
          </div>

          <div className="plan featured">
            <div className="plan-badge">Most Popular</div>
            <div className="plan-name">Quarterly</div>
            <div className="plan-price">
              <sup>Rs </sup>4,000<span>/3mo</span>
            </div>
            <ul>
              <li>Everything in Monthly</li>
              <li>Priority support</li>
              <li>1 free personal training session</li>
              <li>Priority class booking</li>
              <li>Save Rs 500</li>
            </ul>
            <button className="plan-btn" onClick={() => router.push("/signup")}>Get Started</button>
          </div>

          <div className="plan">
            <div className="plan-name">Annual</div>
            <div className="plan-price">
              <sup>Rs </sup>13,000<span>/yr</span>
            </div>
            <ul>
              <li>Everything in Quarterly</li>
              <li>3 free personal training sessions</li>
              <li>Free nutrition consultation</li>
              <li>1 month free bonus</li>
              <li>Best value — save Rs 5,000</li>
            </ul>
            <button className="plan-btn" onClick={() => router.push("/signup")}>Get Started</button>
          </div>
        </div>

        <div className="plans-cta">
          <p>Not ready to commit? <strong>Try us free for a day</strong> — no strings attached.</p>
          <a href="#contact" className="btn-outline" style={{
            display: "inline-block",
            marginTop: 16,
            fontSize: "0.85rem",
            padding: "12px 36px",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            letterSpacing: "3px",
            textTransform: "uppercase",
            textDecoration: "none",
            border: "2px solid var(--red)",
            color: "var(--light)",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "rgba(224,32,32,0.15)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
          >
            Request Guest Pass
          </a>
        </div>
      </div>
    </section>
  );
}
