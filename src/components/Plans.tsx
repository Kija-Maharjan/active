"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Plan = {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string | null;
  features: string[];
  admission_fee: number;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
};

function formatPeriod(period: string): string {
  const map: Record<string, string> = {
    mo: "/mo",
    "3mo": "/3mo",
    yr: "/yr",
  };
  return map[period] ?? `/${period}`;
}

export default function Plans() {
  const router = useRouter();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/plans")
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          const message = typeof data === "object" && data !== null && "error" in data ? data.error : "Failed to load plans.";
          throw new Error(message);
        }
        if (!Array.isArray(data)) {
          throw new Error("Unexpected plans response format.");
        }
        setPlans(data);
      })
      .catch((err) => {
        console.error("Failed to fetch plans:", err);
        setError(err instanceof Error ? err.message : "Failed to load plans.");
        setPlans([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const maxAdmissionFee = Math.max(...plans.map((p) => p.admission_fee), 0);

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
          {maxAdmissionFee > 0 && (
            <p className="plans-admission" style={{ marginTop: 8, fontSize: "0.85rem", color: "var(--muted)" }}>
              One-time admission fee: <strong>Rs {maxAdmissionFee.toLocaleString()}</strong>
            </p>
          )}
        </div>

        {loading ? (
          <div className="plans-grid">
            {[1, 2, 3].map((i) => (
              <div key={i} className="plan" style={{ opacity: 0.4, pointerEvents: "none" }}>
                <div className="plan-name" style={{ background: "var(--border)", height: 20, width: "60%", margin: "0 auto 12px", borderRadius: 4 }} />
                <div style={{ background: "var(--border)", height: 32, width: "50%", margin: "0 auto 24px", borderRadius: 4 }} />
                <ul>
                  {[1, 2, 3, 4].map((j) => (
                    <li key={j} style={{ background: "var(--border)", height: 14, width: "70%", margin: "8px 0", borderRadius: 4, listStyle: "none" }} />
                  ))}
                </ul>
                <div style={{ background: "var(--border)", height: 40, width: "80%", margin: "24px auto 0", borderRadius: 4 }} />
              </div>
            ))}
          </div>
        ) : error ? (
          <p style={{ textAlign: "center", color: "var(--muted)", padding: "40px 0" }}>
            {error}
          </p>
        ) : plans.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--muted)", padding: "40px 0" }}>
            No membership plans available at the moment.
          </p>
        ) : (
          <div className="plans-grid">
            {plans.map((plan) => (
              <div key={plan.id} className={`plan${plan.is_featured ? " featured" : ""}`}>
                {plan.is_featured && <div className="plan-badge">Most Popular</div>}
                <div className="plan-name">{plan.name}</div>
                <div className="plan-price">
                  <sup>Rs </sup>{plan.price.toLocaleString()}<span>{formatPeriod(plan.period)}</span>
                </div>
                {plan.admission_fee > 0 && (
                  <p style={{ fontSize: "0.75rem", color: "var(--muted)", margin: "-8px 0 12px" }}>
                    + Rs {plan.admission_fee.toLocaleString()} admission
                  </p>
                )}
                <ul>
                  {plan.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <button className="plan-btn" onClick={() => router.push("/signup")}>Get Started</button>
              </div>
            ))}
          </div>
        )}

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
