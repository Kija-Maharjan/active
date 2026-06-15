export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-inner">
        <div className="contact-info">
          <div className="section-label">Find Us</div>
          <h2 className="section-title">Get In Touch</h2>
          <p>
            Ready to start your fitness journey? Come visit us or send us a
            message and we&apos;ll get back to you as soon as possible.
          </p>
          <div className="contact-detail">
            <div className="cd">
              <div className="cd-icon">📍</div>
              <div className="cd-text">
                <strong>Address</strong>M7W2+77J Chundevi Repair Road, Chandragiri 44600
              </div>
            </div>
            <div className="cd">
              <div className="cd-icon">🕐</div>
              <div className="cd-text">
                <strong>Hours</strong><br/>
                  Mon–Fri: 5 AM–8 PM<br/>
                  Sat: 5–10 AM<br/>
                  Sun: 5 AM–8 PM
              </div>
            </div>
            <div className="cd">
              <div className="cd-icon">📞</div>
              <div className="cd-text">
                <strong>Phone</strong>9841830305
              </div>
            </div>
          </div>
        </div>
        <div className="contact-form">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Email Address" />
          <input type="tel" placeholder="Phone Number" />
          <textarea placeholder="Your Message" />
          <button className="btn-primary">Send Message</button>
        </div>
      </div>
    </section>
  );
}
