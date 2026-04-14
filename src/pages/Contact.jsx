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

const upcomingEvents = [
  { title: 'Free Nutrition Webinar', date: 'Apr 22, 2025', time: '7:00 PM', location: 'Online (Zoom)', type: 'Free', desc: 'Join our head nutritionist for a live Q&A on how to eat for fat loss without feeling hungry.' },
  { title: 'Dr Diet Open Day – Riyadh', date: 'May 3, 2025', time: '10:00 AM – 2:00 PM', location: 'Al Olaya Branch, Riyadh', type: 'Free', desc: 'Visit our kitchen, meet the team, and get a free 1-week meal plan consultation.' },
  { title: 'Corporate Wellness Summit', date: 'May 15, 2025', time: '9:00 AM – 5:00 PM', location: 'Riyadh Marriott', type: 'Paid', desc: 'Dr Diet is a featured speaker at the KSA Corporate Wellness Summit. Register via the event website.' },
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' })
  const s1 = useReveal()
  const s2 = useReveal()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Placeholder: integrate with form service (Formspree, EmailJS, etc.)
    setSubmitted(true)
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
          <p>Questions, feedback, partnership enquiries, or just want to say hi — we'd love to hear from you.</p>
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
                <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer" className="contact-channel contact-channel--wa">
                  <div className="contact-channel__icon"><i className="fab fa-whatsapp" /></div>
                  <div>
                    <strong>WhatsApp (Fastest)</strong>
                    <span>+966 50 000 0000</span>
                    <span className="contact-channel__note">Typically replies within 15 minutes</span>
                  </div>
                </a>
                <a href="tel:+966500000000" className="contact-channel">
                  <div className="contact-channel__icon"><i className="fas fa-phone" /></div>
                  <div>
                    <strong>Phone</strong>
                    <span>+966 50 000 0000</span>
                    <span className="contact-channel__note">Sun–Thu, 8am–8pm</span>
                  </div>
                </a>
                <a href="mailto:hello@drdiet.com" className="contact-channel">
                  <div className="contact-channel__icon"><i className="fas fa-envelope" /></div>
                  <div>
                    <strong>Email</strong>
                    <span>hello@drdiet.com</span>
                    <span className="contact-channel__note">We respond within 24 hours</span>
                  </div>
                </a>
                <div className="contact-channel">
                  <div className="contact-channel__icon"><i className="fas fa-map-marker-alt" /></div>
                  <div>
                    <strong>Head Office</strong>
                    <span>Al Olaya District, Riyadh</span>
                    <span className="contact-channel__note">Kingdom of Saudi Arabia</span>
                  </div>
                </div>
              </div>

              <div className="contact-socials">
                <h4>Follow Us</h4>
                <div className="contact-socials__links">
                  {[
                    { icon: 'fab fa-instagram', label: 'Instagram', href: '#' },
                    { icon: 'fab fa-tiktok', label: 'TikTok', href: '#' },
                    { icon: 'fab fa-snapchat-ghost', label: 'Snapchat', href: '#' },
                    { icon: 'fab fa-twitter', label: 'Twitter/X', href: '#' },
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
                  <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer" className="btn btn--primary">
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
                        <input className="form-control" type="text" id="name" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input className="form-control" type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+966 XX XXX XXXX" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input className="form-control" type="email" id="email" name="email" value={form.email} onChange={handleChange} placeholder="you@email.com" required />
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
                      <textarea className="form-control" id="message" name="message" value={form.message} onChange={handleChange} placeholder="How can we help you?" required />
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

      {/* Events */}
      <section className="section section--cream" id="events" ref={s2}>
        <div className="container">
          <div className="section-header">
            <span className="section-label section-label--dark">Events</span>
            <h2>Upcoming Dr Diet Events</h2>
            <div className="divider" />
            <p>Join us live, online, or in person — learn, connect, and start your transformation.</p>
          </div>
          <div className="events-grid">
            {upcomingEvents.map((event, i) => (
              <div key={event.title} className={`event-card fade-up stagger-${i + 1}`}>
                <div className="event-card__date-col">
                  <div className="event-card__date">
                    <span>{event.date.split(',')[0].split(' ')[1]}</span>
                    <strong>{event.date.split(',')[0].split(' ')[0]}</strong>
                  </div>
                </div>
                <div className="event-card__info">
                  <div className="event-card__header">
                    <h4>{event.title}</h4>
                    <span className={`badge ${event.type === 'Free' ? 'badge--accent' : 'badge--primary'}`}>{event.type}</span>
                  </div>
                  <div className="event-card__meta">
                    <span><i className="fas fa-clock" /> {event.time}</span>
                    <span><i className="fas fa-map-marker-alt" /> {event.location}</span>
                  </div>
                  <p className="event-card__desc">{event.desc}</p>
                  <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer" className="btn btn--dark btn--sm">
                    <i className="fab fa-whatsapp" /> Register Interest
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
