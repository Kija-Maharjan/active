export default function Plans() {
  return (
    <section className="plans" id="plans">
      <div className="plans-inner">
        <div className="section-label">Membership</div>
        <h2 className="section-title">Choose Your Plan</h2>
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
              <li>Locker access</li>
            </ul>
            <button className="plan-btn">Get Started</button>
          </div>
          <div className="plan featured">
            <div className="plan-badge">Most Popular</div>
            <div className="plan-name">Quarterly</div>
            <div className="plan-price">
              <sup>Rs </sup>4,000<span>/3mo</span>
            </div>
            <ul>
              <li>Full gym access</li>
              <li>All equipment included</li>
              <li>7 days a week</li>
              <li>Locker access</li>
              <li>Priority support</li>
            </ul>
            <button className="plan-btn">Get Started</button>
          </div>
          <div className="plan">
            <div className="plan-name">Annual</div>
            <div className="plan-price">
              <sup>Rs </sup>13,000<span>/yr</span>
            </div>
            <ul>
              <li>Full gym access</li>
              <li>All equipment included</li>
              <li>7 days a week</li>
              <li>Locker access</li>
              <li>Priority support</li>
              <li>Free 1 month bonus</li>
            </ul>
            <button className="plan-btn">Get Started</button>
          </div>
        </div>
      </div>
    </section>
  );
}
