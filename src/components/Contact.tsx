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
                <strong>Address</strong>
                <a href="https://www.google.com/maps/place/Active+Fitness/@27.6956757,85.2505518,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgICk-bnGAQ!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAGiLD5PNpYtsTILVDbIcOeaV77gv7kXNDm6XIMGHOTSckzDCY5yqKNLoVIgaIwp8BDfZk5ME0DI-Zjh7M-TsCexvA23sxuQ_DPr8iZs8-weZU_FYWVfUpK-a_P2qvrrd0Cp9-A%3Dw203-h135-k-no!7i6000!8i4000!4m10!1m2!2m1!1sactive+fitness+gym!3m6!1s0x39eb23f49882a999:0xf6f9de82afde6aa!8m2!3d27.6957106!4d85.2506291!15sChJhY3RpdmUgZml0bmVzcyBneW1aFCISYWN0aXZlIGZpdG5lc3MgZ3ltkgEPZ3ltbmFzdGljc19jbHVimgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVVJFTW05SGFsWm5FQUXgAQD6AQQIABAj!16s%2Fg%2F11h110ryvp?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" style="color: var(--light); text-decoration: underline; text-underline-offset: 3px;">
                  M7W2+77J Chundevi Repair Road, Chandragiri 44600
                </a>
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
