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
                <strong>Address</strong>Chandragiri 12, Balambu, Kathmandu
              </div>
            </div>
            <div className="cd">
              <div className="cd-icon">🕐</div>
              <div className="cd-text">
                <strong>Hours</strong>Sunday – Saturday: 5:00 AM – 10:00 PM
              </div>
            </div>
            <div className="cd">
              <div className="cd-icon">📞</div>
              <div className="cd-text">
                <strong>Phone</strong>+977-XXX-XXXXXXX
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
