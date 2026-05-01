import { useState, useEffect, useRef } from 'react'
import './Contact.css'

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    )
    root.querySelectorAll('.fade-up').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
  return ref
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' })
  const s1 = useReveal()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('https://drdiet.onrender.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          city: '',
          goal: form.subject,
          diet: '',
          source: form.message,
        }),
      })
      const data = await res.json()
      if (data.success) setSubmitted(true)
      else throw new Error(data.error)
    } catch (err) {
      console.error('Contact form failed:', err)
      alert('Something went wrong. Please WhatsApp us directly.')
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <>
      <section className="page-hero contact-hero">
        <div className="container">
          <span className="section-label section-label--white">Get In Touch</span>
          <h1>Let's Talk.<br />We're Here for You.</h1>
          <p>Questions, feedback, partnership enquiries, or just want to say hi, we'd love to hear from you.</p>
        </div>
      </section>

      {/* Contact main */}
      <section className="section contact-section" ref={s1}>
        <div className="container">
          <div className="contact-grid">
            {/* Info column */}
            <div className="contact-info fade-up">
              <h3>Reach Us Directly</h3>
              <div className="contact-channels">
                <a href="https://wa.me/917015732242" target="_blank" rel="noopener noreferrer" className="contact-channel contact-channel--wa">
                  <div className="contact-channel__icon"><i className="fab fa-whatsapp" /></div>
                  <div>
                    <strong>WhatsApp (Fastest)</strong>
                    <span>+91 70157 32242</span>
                    <span className="contact-channel__note">Typically replies within 15 minutes</span>
                  </div>
                </a>
                <a href="tel:+917015732242" className="contact-channel">
                  <div className="contact-channel__icon"><i className="fas fa-phone" /></div>
                  <div>
                    <strong>Phone</strong>
                    <span>+91 70157 32242</span>
                    <span className="contact-channel__note">Mon–Sat, 9am–8pm</span>
                  </div>
                </a>
                <a href="mailto:drdietdelhi@gmail.com" className="contact-channel">
                  <div className="contact-channel__icon"><i className="fas fa-envelope" /></div>
                  <div>
                    <strong>Email</strong>
                    <span>drdietdelhi@gmail.com</span>
                    <span className="contact-channel__note">We respond within 24 hours</span>
                  </div>
                </a>
                <div className="contact-channel">
                  <div className="contact-channel__icon"><i className="fas fa-map-marker-alt" /></div>
                  <div>
                    <strong>Head Office</strong>
                    <span>Plot no. 201, Mattaur Rd, Sector 70</span>
                    <span className="contact-channel__note">Sahibzada Ajit Singh Nagar, Punjab 160071</span>
                  </div>
                </div>
                <div className="contact-channel">
                  <div className="contact-channel__icon"><i className="fas fa-motorcycle" /></div>
                  <div>
                    <strong>Order Online</strong>
                    <span>Search "Dr. Diet" on Swiggy &amp; Zomato</span>
                    <span className="contact-channel__note">Delhi, Gurgaon, Noida, Chandigarh, Mohali &amp; Bengaluru</span>
                  </div>
                </div>
              </div>

              <div className="contact-socials">
                <h4>Follow Us</h4>
                <div className="contact-socials__links">
                  {[
                    { icon: 'fab fa-instagram', label: 'Instagram', href: 'https://instagram.com/drdiet.fit' },
                    { icon: 'fab fa-whatsapp', label: 'WhatsApp', href: 'https://wa.me/917015732242' },
                  ].map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label={s.label}>
                      <i className={s.icon} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="contact-form-wrapper fade-up stagger-2">
              {submitted ? (
                <div className="contact-success">
                  <div className="contact-success__icon"><i className="fas fa-check" /></div>
                  <h3>Message Received!</h3>
                  <p>Thank you for reaching out. Our team will get back to you within 24 hours. For faster help, chat with us on WhatsApp.</p>
                  <a href="https://wa.me/917015732242" target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                    <i className="fab fa-whatsapp" /> Chat Now
                  </a>
                </div>
              ) : (
                <>
                  <h3>Send Us a Message</h3>
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="contact-form__row">
                      <div className="form-group">
                        <label htmlFor="name">Full Name *</label>
                        <input className="form-control" type="text" id="name" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required aria-required="true" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input className="form-control" type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input className="form-control" type="email" id="email" name="email" value={form.email} onChange={handleChange} placeholder="you@email.com" required aria-required="true" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <select className="form-control" id="subject" name="subject" value={form.subject} onChange={handleChange}>
                        <option>General Inquiry</option>
                        <option>Subscription Question</option>
                        <option>Franchise Inquiry</option>
                        <option>Catering Request</option>
                        <option>B2B Partnership</option>
                        <option>Press / Media</option>
                        <option>Feedback</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Message *</label>
                      <textarea className="form-control" id="message" name="message" value={form.message} onChange={handleChange} placeholder="How can we help you?" required aria-required="true" />
                    </div>
                    <button type="submit" className="btn btn--primary btn--lg" style={{ width: '100%', justifyContent: 'center' }}>
                      <i className="fas fa-paper-plane" /> Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
