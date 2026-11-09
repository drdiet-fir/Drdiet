import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import PageHero from '../components/PageHero'
import PageMeta from '../components/PageMeta'
import { API_URL } from '../config'
import { isBlank, isValidIndianPhone, clean } from '../validators'
import './JoinUs.css'

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

const quickNav = [
  { icon: 'fas fa-store', title: 'Own a franchise', desc: 'Build a business with purpose', href: '#franchise' },
  { icon: 'fas fa-utensils', title: 'Feed your team', desc: 'Healthy catering & partnerships', href: '#corporate' },
  { icon: 'fas fa-users', title: 'Join our team', desc: 'Bring your skills to the table', href: '#careers' },
]

const franchisePerks = [
  'Full franchise training program (4 weeks)',
  'Kitchen setup & equipment support',
  'Ongoing operational support & quality audits',
  'Marketing materials & digital support',
  'Exclusive territory rights',
  'Access to proprietary meal planning system',
  'Dedicated franchise account manager',
]

const pricingTiers = [
  { name: 'Small Team', size: '10–50 employees', price: 'From ₹150/person/day' },
  { name: 'Enterprise', size: '50–500 employees', price: 'Custom Pricing' },
  { name: 'Events', size: 'One-time catering', price: 'Quote on Request' },
]

const corporatePerks = [
  'Flexible delivery schedules',
  'Customized to dietary needs & preferences',
  'Branded packaging available',
  'Dedicated account manager',
  'Monthly invoicing',
  'Nutritional reporting available',
]

const partnerTypes = [
  { icon: 'fas fa-dumbbell', title: 'Gyms & Fitness Centers', desc: 'Offer your members customized meal plans. Rev-share or white-label available.' },
  { icon: 'fas fa-hospital', title: 'Medical Clinics', desc: 'Therapeutic nutrition programs for your patients. Certified and medically aligned.' },
  { icon: 'fas fa-hotel', title: 'Hotels & Resorts', desc: 'In-room healthy meal delivery for health-conscious guests.' },
  { icon: 'fas fa-spa', title: 'Wellness Centers', desc: 'Complete the wellness experience with science-backed nutrition programs.' },
]

const careerTags = ['Kitchen & culinary', 'Operations', 'Marketing & branding']

export default function JoinUs() {
  const s1 = useReveal()
  const s2 = useReveal()
  const s3 = useReveal()
  const location = useLocation()

  // Scroll to the targeted section (#franchise / #corporate / #careers) when
  // arriving with a hash, e.g. the /careers redirect → /join-us#careers.
  useEffect(() => {
    if (!location.hash) return
    const el = document.getElementById(location.hash.slice(1))
    if (el) {
      const t = setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120)
      return () => clearTimeout(t)
    }
  }, [location.hash, location.pathname])

  const [franchiseForm, setFranchiseForm] = useState({ name: '', phone: '', city: '' })
  const [franchiseSent, setFranchiseSent] = useState(false)
  const [franchiseLoading, setFranchiseLoading] = useState(false)

  const [careersForm, setCareersForm] = useState({ name: '', email: '', phone: '', area: '', about: '', cvLink: '' })
  const [careersSent, setCareersSent] = useState(false)
  const [careersLoading, setCareersLoading] = useState(false)

  const submitLead = async (payload) => {
    const res = await fetch(`${API_URL}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    if (!data.success) throw new Error(data.error)
  }

  const handleFranchiseSubmit = (e) => {
    e.preventDefault()
    const name = clean(franchiseForm.name)
    const phone = clean(franchiseForm.phone)
    const city = clean(franchiseForm.city)

    if (isBlank(name) || isBlank(city)) {
      alert('Please enter your name and preferred city.')
      return
    }
    if (!isValidIndianPhone(phone)) {
      alert('Please enter a valid 10-digit mobile number.')
      return
    }

    // Open a pre-filled WhatsApp chat with Dr Diet (must happen synchronously
    // in the click handler so the browser doesn't block the new tab).
    const message =
      `Hi Dr Diet! I'm interested in a franchise.\n\n` +
      `Name: ${name}\nPhone: ${phone}\nPreferred city: ${city}`
    window.open(
      `https://wa.me/917015732242?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    )

    // Still record the lead in the background (don't block the chat on it).
    submitLead({ name, phone, city, goal: 'Franchise Enquiry', diet: '', source: 'Join Us – Franchise' })
      .catch((err) => console.error('Franchise enquiry save failed:', err))

    setFranchiseSent(true)
  }

  const handleCareersSubmit = async (e) => {
    e.preventDefault()
    setCareersLoading(true)
    try {
      await submitLead({
        name: careersForm.name,
        phone: careersForm.phone,
        city: careersForm.email,
        goal: careersForm.area || 'Careers Application',
        diet: '',
        source: careersForm.about,
        sheet: 'Career Leads',
        cvUrl: careersForm.cvLink,
      })
      setCareersSent(true)
    } catch (err) {
      console.error('Careers application failed:', err)
      alert('Something went wrong. Please email your CV to drdietdelhi@gmail.com instead.')
    } finally {
      setCareersLoading(false)
    }
  }

  return (
    <>
      <PageMeta
        title="Franchise, Catering & Careers | Join Dr Diet"
        description="Partner with Dr Diet — own a franchise, cater healthy meals for your team or workplace, or join our team. Explore opportunities and apply."
        canonical="/join-us"
      />
      <PageHero
        title="Grow with Dr Diet. Make a difference."
        subtitle="Good food brings people together. Build a franchise, nourish your workplace, or help us make healthy eating an everyday choice."
      >
        <div className="joinus-quicknav__inner">
          {quickNav.map((item) => (
            <a key={item.title} href={item.href} className="joinus-quicknav-item">
              <i className={item.icon} />
              <span className="joinus-quicknav-item__text">
                <strong>{item.title}</strong>
                <small>{item.desc}</small>
              </span>
              <i className="fas fa-arrow-right joinus-quicknav-item__arrow" />
            </a>
          ))}
        </div>
      </PageHero>

      {/* Franchise */}
      <section id="franchise" className="section joinus-franchise" ref={s1}>
        <div className="container joinus-franchise__grid">
          <div className="joinus-franchise__media fade-up">
            <img src="/brand_assets/Cafe Interior 1.png" alt="Dr Diet franchise outlet interior" loading="lazy" />
            <div className="joinus-stats-row">
              <div className="joinus-stat-card">
                <strong>6</strong>
                <span>Years of operations</span>
              </div>
              <div className="joinus-stat-card">
                <strong>17</strong>
                <span>Successful branches</span>
              </div>
              <div className="joinus-stat-card">
                <strong>18mo</strong>
                <span>Avg. payback period</span>
              </div>
            </div>
          </div>

          <div className="joinus-franchise__content fade-up stagger-2">
            <span className="section-label section-label--dark">Franchise Partnership</span>
            <h2>Your ambition. Our next chapter.</h2>
            <p>Become a Dr Diet franchise partner. Our proven business model, full operational support and brand give you a way to bring wholesome food to your city.</p>

            <h4>What you get</h4>
            <ul className="joinus-checklist">
              {franchisePerks.map((item) => (
                <li key={item}><i className="fas fa-check" /> {item}</li>
              ))}
            </ul>

            <div className="joinus-franchise__actions">
              <a href="/brand_assets/Pitch Deck Dr Diet.pdf" target="_blank" rel="noopener noreferrer" className="btn btn--dark">
                View Franchise Deck <i className="fas fa-file-arrow-down" />
              </a>
              <a href="https://wa.me/917015732242?text=I'm interested in a Dr Diet franchise" target="_blank" rel="noopener noreferrer" className="btn btn--outline-dark">
                Inquire About Franchise <i className="fas fa-arrow-right" />
              </a>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="joinus-enquiry-band">
            <div className="joinus-enquiry-band__head">
              <h3>Let's bring Dr Diet to your city.</h3>
              <p>Tell us a little about yourself to start the conversation.</p>
            </div>

            {franchiseSent ? (
              <p className="joinus-enquiry-band__success">
                <i className="fas fa-check-circle" /> Thanks! Our franchise team will reach out on WhatsApp shortly.
              </p>
            ) : (
              <form className="joinus-enquiry-form" onSubmit={handleFranchiseSubmit}>
                <div className="form-group">
                  <label htmlFor="franchise-name">Full name *</label>
                  <input
                    className="form-control" id="franchise-name" type="text" placeholder="Your full name"
                    value={franchiseForm.name}
                    onChange={(e) => setFranchiseForm({ ...franchiseForm, name: e.target.value })}
                    required aria-required="true"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="franchise-phone">Phone number *</label>
                  <input
                    className="form-control" id="franchise-phone" type="tel" placeholder="Your phone number"
                    value={franchiseForm.phone}
                    onChange={(e) => setFranchiseForm({ ...franchiseForm, phone: e.target.value })}
                    required aria-required="true"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="franchise-city">Preferred city *</label>
                  <input
                    className="form-control" id="franchise-city" type="text" placeholder="City of interest"
                    value={franchiseForm.city}
                    onChange={(e) => setFranchiseForm({ ...franchiseForm, city: e.target.value })}
                    required aria-required="true"
                  />
                </div>
                <button type="submit" className="btn btn--primary joinus-enquiry-form__submit" disabled={franchiseLoading}>
                  {franchiseLoading ? 'Sending…' : <>Send Enquiry <i className="fas fa-arrow-right" /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Corporate services */}
      <section id="corporate" className="section section--cream joinus-corporate" ref={s2}>
        <div className="container joinus-corporate__grid">
          <div className="joinus-corporate__content fade-up">
            <span className="section-label section-label--dark">Corporate Services</span>
            <h2>A healthier team starts at the table.</h2>
            <p>Fuel your team's performance with daily catered healthy meals. Dr Diet makes corporate wellness effortless, with food that fits your workplace.</p>

            <div className="joinus-quote">
              Studies show employees who eat well are 25% more productive and 35% less absent.
            </div>

            <div className="joinus-pricing-row">
              {pricingTiers.map((p) => (
                <div key={p.name} className="joinus-pricing-card">
                  <strong>{p.name}</strong>
                  <span>{p.size}</span>
                  <span className="joinus-pricing-card__price">{p.price}</span>
                </div>
              ))}
            </div>

            <h4>Why companies choose Dr Diet</h4>
            <ul className="joinus-checklist joinus-checklist--2col">
              {corporatePerks.map((item) => (
                <li key={item}><i className="fas fa-check" /> {item}</li>
              ))}
            </ul>
          </div>

          <div className="joinus-corporate__media fade-up stagger-2">
            <img src="/brand_assets/achari paneer bowl.jpg" alt="Healthy corporate meal bowl" loading="lazy" />
          </div>
        </div>

        <div className="container">
          <div className="joinus-partner-band">
            <div className="joinus-partner-band__head">
              <div>
                <h3>Let's build something together.</h3>
                <p>Run a gym, clinic, hotel or wellness center? Give your clients the missing piece of their health journey: expert nutrition. We grow together.</p>
              </div>
              <a href="https://wa.me/917015732242?text=I'm interested in a B2B partnership with Dr Diet" target="_blank" rel="noopener noreferrer" className="btn btn--dark joinus-partner-band__cta">
                Start a Partnership Conversation <i className="fas fa-arrow-right" />
              </a>
            </div>
            <div className="joinus-partner-grid">
              {partnerTypes.map((t) => (
                <div key={t.title} className="joinus-partner-item">
                  <i className={t.icon} />
                  <strong>{t.title}</strong>
                  <p>{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Careers */}
      <section id="careers" className="section joinus-careers" ref={s3}>
        <div className="container joinus-careers__grid">
          <div className="joinus-careers__content fade-up">
            <span className="section-label section-label--white">Careers</span>
            <h2 className="text-white">Bring your talent<br />to the table.</h2>
            <p>Behind every meal are people who care. If you're passionate about food, nutrition and making healthy eating easier, we'd love to hear from you.</p>

            <div className="joinus-tags">
              {careerTags.map((t) => <span key={t} className="joinus-tag">{t}</span>)}
            </div>

            <div className="joinus-careers__image">
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=900&q=80"
                alt="Dr Diet kitchen team preparing food"
                loading="lazy"
              />
            </div>
          </div>

          <div className="joinus-careers-card fade-up stagger-2">
            {careersSent ? (
              <div className="joinus-careers-card__success">
                <div className="joinus-careers-card__success-icon"><i className="fas fa-check" /></div>
                <h3>Application Sent!</h3>
                <p>Thanks for reaching out — our team will review your application and get back to you soon.</p>
              </div>
            ) : (
              <>
                <h3>Introduce yourself.</h3>
                <p>Share your interests and experience with the Dr Diet team.</p>
                <form className="joinus-careers-form" onSubmit={handleCareersSubmit}>
                  <div className="sub-form__row">
                    <div className="form-group">
                      <label htmlFor="careers-name">Full name *</label>
                      <input
                        className="form-control" id="careers-name" type="text" placeholder="Your full name"
                        value={careersForm.name}
                        onChange={(e) => setCareersForm({ ...careersForm, name: e.target.value })}
                        required aria-required="true"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="careers-email">Email address *</label>
                      <input
                        className="form-control" id="careers-email" type="email" placeholder="you@email.com"
                        value={careersForm.email}
                        onChange={(e) => setCareersForm({ ...careersForm, email: e.target.value })}
                        required aria-required="true"
                      />
                    </div>
                  </div>
                  <div className="sub-form__row">
                    <div className="form-group">
                      <label htmlFor="careers-phone">Phone number</label>
                      <input
                        className="form-control" id="careers-phone" type="tel" placeholder="Your phone number"
                        value={careersForm.phone}
                        onChange={(e) => setCareersForm({ ...careersForm, phone: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="careers-area">Area of interest *</label>
                      <select
                        className="form-control" id="careers-area"
                        value={careersForm.area}
                        onChange={(e) => setCareersForm({ ...careersForm, area: e.target.value })}
                        required aria-required="true"
                      >
                        <option value="">Select an area</option>
                        <option>Kitchen & Culinary</option>
                        <option>Operations</option>
                        <option>Marketing & Branding</option>
                        <option>Delivery</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="careers-about">A little about you</label>
                    <textarea
                      className="form-control" id="careers-about" placeholder="Tell us about your experience and what you'd like to do."
                      value={careersForm.about}
                      onChange={(e) => setCareersForm({ ...careersForm, about: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="careers-cv">CV / Resume link *</label>
                    <input
                      className="form-control"
                      id="careers-cv"
                      type="url"
                      placeholder="Paste a link to your CV (Google Drive, Dropbox, etc.)"
                      value={careersForm.cvLink}
                      onChange={(e) => setCareersForm({ ...careersForm, cvLink: e.target.value })}
                      required
                      aria-required="true"
                    />
                  </div>
                  <button type="submit" className="btn btn--dark btn--lg joinus-careers-form__submit" disabled={careersLoading}>
                    {careersLoading ? 'Sending…' : <>Send My Application <i className="fas fa-arrow-right" /></>}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
