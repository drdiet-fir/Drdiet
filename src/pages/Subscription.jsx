import { useState, useEffect, useRef } from 'react'
import './Subscription.css'

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    root.querySelectorAll('.fade-up, .fade-in').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
  return ref
}

const values = [
  { icon: 'fas fa-dumbbell',    title: 'High-Protein Meals',       desc: 'Up to 55g of protein per meal. Built for muscle, fat loss, and staying full.' },
  { icon: 'fas fa-calculator',  title: 'Calorie-Counted',           desc: 'Every meal is weighed, portioned, and macro-tracked so you always hit your targets.' },
  { icon: 'fas fa-leaf',        title: 'No Maida. No Shortcuts.',   desc: 'Clean whole ingredients only. Zero refined flour, zero empty calories, zero compromise.' },
  { icon: 'fas fa-tag',         title: 'Starting at ₹200',          desc: 'Healthy food that doesn\'t cost a fortune. Plans for every budget and every goal.' },
  { icon: 'fas fa-truck',       title: 'Delivered Fresh Daily',     desc: 'Cooked in our kitchen every morning and at your doorstep while it\'s still fresh.' },
  { icon: 'fas fa-bullseye',    title: 'Customised for Your Goal',  desc: 'Weight loss, muscle gain, or clean eating. Your meals are built around your goal.' },
]

const faqs = [
  { q: 'Can I customise my meals?',    a: 'Yes. Every plan is built around your health goal, calorie target, and dietary preference (Veg / Non-Veg / Eggetarian). Nothing is one-size-fits-all.' },
  { q: 'Which cities do you serve?',   a: 'We currently deliver across Delhi, Chandigarh, and Bengaluru. Expanding to more cities soon. Drop your city in the form and we\'ll update you.' },
  { q: 'What\'s the starting price?',  a: 'Meals start at ₹200 per meal. Your total plan cost depends on your goal and the number of meals per day. Our team will share a tailored quote on WhatsApp.' },
  { q: 'How does delivery work?',      a: 'We cook fresh every morning and deliver to your doorstep daily. No frozen meals, no reheating. Just freshly prepared, ready-to-eat food.' },
]

const initialForm = { name: '', phone: '', city: '', goal: '', diet: '', source: '' }

export default function Subscription() {
  const [openFaq, setOpenFaq]     = useState(null)
  const [form, setForm]           = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)

  const s1   = useReveal()
  const s2   = useReveal()
  const s3   = useReveal()
  const sForm = useReveal()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('https://drdiet.onrender.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) setSubmitted(true)
      else throw new Error(data.error)
    } catch (err) {
      console.error('Form submission failed:', err)
      alert('Something went wrong. Please try again or WhatsApp us directly.')
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="page-hero sub-hero">
        <div className="container">
          <span className="section-label section-label--white">Meal Plans</span>
          <h1>Start Your Personalised<br />Diet Plan</h1>
          <p>Healthy, high-protein meals tailored to your goal, delivered fresh every day.</p>
        </div>
      </section>

      {/* Value Section */}
      <section className="sub-value-section" ref={s1}>
        <div className="container">
          <div className="section-header">
            <span className="section-label section-label--dark">Why Dr Diet</span>
            <h2>What You Get With Every Plan</h2>
            <div className="divider" />
          </div>
          <div className="sub-value-grid">
            {values.map((v, i) => (
              <div key={v.title} className={`sub-value-card fade-up stagger-${(i % 3) + 1}`}>
                <div className="sub-value-card__icon">
                  <i className={v.icon} />
                </div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Form */}
      <section className="section sub-form-section" ref={sForm}>
        <div className="container">
          <div className="sub-form-wrap fade-up">
            <div className="section-header">
              <span className="section-label section-label--dark">Get Started</span>
              <h2>Start My Plan</h2>
              <div className="divider" />
              <p>Tell us about yourself. Our team will reach out on WhatsApp within minutes.</p>
            </div>

            {submitted ? (
              <div className="sub-form-success">
                <div className="sub-form-success__icon"><i className="fas fa-check" /></div>
                <h3>We've Got Your Details!</h3>
                <p>Our team will contact you on WhatsApp shortly to personalise your diet plan.</p>
                <a
                  href="https://wa.me/917015732242"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary btn--lg"
                >
                  <i className="fab fa-whatsapp" /> Chat Now
                </a>
              </div>
            ) : (
              <form className="sub-form" onSubmit={handleSubmit}>
                <div className="sub-form__row">
                  <div className="form-group">
                    <label htmlFor="sub-name">Full Name *</label>
                    <input
                      className="form-control"
                      type="text"
                      id="sub-name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                      aria-required="true"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="sub-phone">Phone Number *</label>
                    <input
                      className="form-control"
                      type="tel"
                      id="sub-phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      required
                      aria-required="true"
                    />
                  </div>
                </div>

                <div className="sub-form__row">
                  <div className="form-group">
                    <label htmlFor="sub-city">City *</label>
                    <select
                      className="form-control"
                      id="sub-city"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      required
                      aria-required="true"
                    >
                      <option value="">Select your city</option>
                      <option>Delhi</option>
                      <option>Chandigarh</option>
                      <option>Bengaluru</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="sub-goal">Health Goal *</label>
                    <select
                      className="form-control"
                      id="sub-goal"
                      name="goal"
                      value={form.goal}
                      onChange={handleChange}
                      required
                      aria-required="true"
                    >
                      <option value="">Select your goal</option>
                      <option>Weight Loss</option>
                      <option>Muscle Gain</option>
                      <option>Eat Clean</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="sub-form__row">
                  <div className="form-group">
                    <label htmlFor="sub-diet">Dietary Preference *</label>
                    <select
                      className="form-control"
                      id="sub-diet"
                      name="diet"
                      value={form.diet}
                      onChange={handleChange}
                      required
                      aria-required="true"
                    >
                      <option value="">Select preference</option>
                      <option>Veg</option>
                      <option>Non-Veg</option>
                      <option>Eggetarian</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="sub-source">How did you hear about us?</label>
                    <select
                      className="form-control"
                      id="sub-source"
                      name="source"
                      value={form.source}
                      onChange={handleChange}
                    >
                      <option value="">Select an option</option>
                      <option>Instagram</option>
                      <option>Swiggy / Zomato</option>
                      <option>Friend / Referral</option>
                      <option>YouTube</option>
                      <option>Google</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn btn--primary btn--lg sub-form__submit">
                  <i className="fas fa-arrow-right" /> Start My Plan
                </button>
              </form>
            )}

            <p className="sub-form-trust">
              <i className="fab fa-whatsapp" /> Our team will contact you on WhatsApp to personalise your diet plan.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section section--dark" ref={s2}>
        <div className="container">
          <div className="section-header">
            <span className="section-label section-label--white">How It Works</span>
            <h2 className="text-white">Get Started in 4 Simple Steps</h2>
            <div className="divider" />
          </div>
          <div className="sub-steps">
            {[
              { step: '01', icon: 'fas fa-clipboard-list', title: 'Tell Us Your Goal',            desc: 'Fill out the form above. Share your goal, diet preference, and city. Takes under a minute.' },
              { step: '02', icon: 'fas fa-utensils',       title: 'Get Your Personalised Plan',   desc: 'Our team builds a meal plan around your calorie needs, goal, and food preferences.' },
              { step: '03', icon: 'fas fa-fire-alt',       title: 'We Cook Fresh Daily',          desc: 'Every meal is freshly prepared in our kitchen each morning. No freezing, no shortcuts.' },
              { step: '04', icon: 'fas fa-truck',          title: 'Delivered to Your Doorstep',   desc: 'Your meals arrive fresh every day, portioned, labelled, and ready to eat.' },
            ].map((s, i) => (
              <div key={s.step} className={`sub-step fade-up stagger-${i + 1}`}>
                <div className="sub-step__number">{s.step}</div>
                <div className="sub-step__icon"><i className={s.icon} /></div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--cream" ref={s3}>
        <div className="container">
          <div className="section-header">
            <span className="section-label section-label--dark">Got Questions?</span>
            <h2>Frequently Asked Questions</h2>
            <div className="divider" />
          </div>
          <div className="sub-faq">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`sub-faq-item ${openFaq === i ? 'sub-faq-item--open' : ''}`}
              >
                <button
                  className="sub-faq-item__question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{faq.q}</span>
                  <i className={`fas fa-chevron-${openFaq === i ? 'up' : 'down'}`} />
                </button>
                {openFaq === i && (
                  <div className="sub-faq-item__answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <p style={{ marginBottom: '20px', fontSize: '1rem' }}>Still have questions?</p>
            <a
              href="https://wa.me/917015732242"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--dark btn--lg"
            >
              <i className="fab fa-whatsapp" /> Chat With Our Team
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
