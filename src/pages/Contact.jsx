import { useState, useEffect, useRef } from 'react'
import PageHero from '../components/PageHero'
import PageMeta from '../components/PageMeta'
import { API_URL } from '../config'
import { isBlank, isValidIndianPhone, clean } from '../validators'
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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' })
  const s1 = useReveal()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (isBlank(form.name) || isBlank(form.email) || isBlank(form.message)) {
      setError('Please fill in your name, email and message.')
      return
    }
    if (form.phone && !isValidIndianPhone(form.phone)) {
      setError('Please enter a valid 10-digit mobile number.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: clean(form.name),
          email: clean(form.email),
          phone: clean(form.phone),
          city: '',
          goal: clean(form.subject),
          diet: '',
          source: clean(form.message),
        }),
      })
      const data = await res.json()
      if (data.success) setSubmitted(true)
      else throw new Error(data.error)
    } catch (err) {
      console.error('Contact form failed:', err)
      setError('Something went wrong. Please WhatsApp us directly.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <>
      <PageMeta
        title="Contact Dr Diet | WhatsApp, Call or Email Us"
        description="Get in touch with Dr Diet for orders, subscriptions, catering, franchise or feedback. Reach us on WhatsApp, phone or email — we reply fast."
        canonical="/contact"
      />
      <PageHero
        title="Let's Talk. We're Here for You."
        subtitle="Questions, feedback, partnership enquiries, or just want to say hi, we'd love to hear from you."
      />

      {/* Contact main */}
      <section className="section contact-section" ref={s1}>
        <div className="container">
          <div className="contact-grid">
            {/* Info column */}
            <div className="contact-info fade-up">
              <h3>Reach Us Directly</h3>
              <p className="contact-info__subtitle">Choose the way that works best for you.</p>
              <div className="contact-channels">
                <a href="https://wa.me/917015732242" target="_blank" rel="noopener noreferrer" className="contact-channel contact-channel--wa">
                  <div className="contact-channel__icon"><i className="fab fa-whatsapp" /></div>
                  <div>
                    <strong>WhatsApp (Fastest)</strong>
                    <span>+91 70157 32242</span>
                    <span className="contact-channel__note">Typically replies within 15 minutes</span>
                  </div>
                  <i className="fas fa-arrow-up-right-from-square contact-channel__external" />
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
                    <span>Dr Diet, Plot 201, Modern Market, Sector 70</span>
                    <span className="contact-channel__note">Mohali, 160070</span>
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
                  <div className="contact-form-wrapper__head">
                    <div>
                      <h3>Send Us a Message</h3>
                      <p className="contact-info__subtitle">Tell us what's on your mind.</p>
                    </div>
                    <span className="contact-form-wrapper__required">* Required fields</span>
                  </div>
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
                    {error && <p className="contact-form__error" role="alert">{error}</p>}
                    <button type="submit" className="btn btn--dark btn--lg" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                      {loading ? 'Sending…' : <>Send Message <i className="fas fa-arrow-right" /></>}
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
