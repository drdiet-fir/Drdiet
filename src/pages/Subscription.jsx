import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
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

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Begin your health journey',
    price: { monthly: 299, quarterly: 269, biannual: 249 },
    meals: '2 meals / day',
    features: [
      '2 customized meals per day',
      'Standard calorie targets',
      'Weekly menu variety (15+ options)',
      'Free delivery 6 days/week',
      'Digital meal plan access',
      'Weekly check-in email',
      'Email & WhatsApp support',
    ],
    notIncluded: ['Nutritionist consultation', 'Snacks', 'Body composition tracking'],
    highlight: false,
    color: 'var(--neutral)',
  },
  {
    id: 'transform',
    name: 'Transform',
    tagline: 'Maximum results — best value',
    price: { monthly: 499, quarterly: 449, biannual: 399 },
    meals: '3 meals + 2 snacks',
    features: [
      '3 meals + 2 healthy snacks/day',
      'Full macro & calorie customization',
      'Premium menu (40+ options)',
      'Free delivery 7 days/week',
      'Monthly nutritionist consultation',
      'Bi-weekly progress review',
      'Priority WhatsApp support',
      'Monthly body measurement tracking',
    ],
    notIncluded: ['Weekly 1-on-1 sessions', 'Supplement guide'],
    highlight: true,
    color: 'var(--accent)',
  },
  {
    id: 'elite',
    name: 'Elite',
    tagline: 'Zero compromise. Maximum transformation.',
    price: { monthly: 799, quarterly: 719, biannual: 649 },
    meals: '5 meals + unlimited snacks',
    features: [
      '5 meals + unlimited healthy snacks',
      'Fully bespoke meal plan',
      'Exclusive premium dishes',
      'Free delivery 7 days/week',
      'Weekly 1-on-1 nutritionist session',
      'Weekly body composition scan',
      'Dedicated account manager',
      '24/7 priority support',
      'Supplement & lifestyle guidance',
      'Exclusive client events',
    ],
    notIncluded: [],
    highlight: false,
    color: 'var(--primary)',
  },
]

const faqs = [
  { q: 'Can I pause or cancel my subscription?', a: 'Yes. You can pause your subscription for up to 14 days per month or cancel anytime with 3 days notice. No cancellation fees.' },
  { q: 'How are meals delivered?', a: 'Meals are prepared fresh daily in our HACCP-certified kitchen and delivered to your door before 7am (or your preferred time window), 6-7 days a week depending on your plan.' },
  { q: 'Can I customize meals for allergies or preferences?', a: 'Absolutely. We accommodate all common allergies (gluten, dairy, nuts, etc.) and dietary preferences (keto, low-carb, vegan, high-protein, etc.). You specify during signup.' },
  { q: 'What areas do you deliver to?', a: 'We currently deliver across Riyadh, Jeddah, Dammam, Khobar, Mecca, and Medina. Check our Locations page for specific neighborhoods.' },
  { q: 'Is there a minimum commitment period?', a: 'No long-term commitment. You can start on a monthly basis. Quarterly and bi-annual plans are available at a discount.' },
  { q: 'Do you offer a free trial?', a: 'We offer a 3-day trial box so you can experience the quality before subscribing. Contact us via WhatsApp to arrange one.' },
]

export default function Subscription() {
  const [billing, setBilling] = useState('monthly')
  const [openFaq, setOpenFaq] = useState(null)
  const s1 = useReveal()
  const s2 = useReveal()
  const s3 = useReveal()

  const billingMultiplier = { monthly: 1, quarterly: 0.9, biannual: 0.83 }

  return (
    <>
      <section className="page-hero sub-hero">
        <div className="container">
          <span className="section-label section-label--white">Meal Plans</span>
          <h1>Choose Your Plan.<br />Start Your Transformation.</h1>
          <p>Flexible, customized, science-backed meal subscriptions. Pause or cancel anytime.</p>
        </div>
      </section>

      {/* Billing Toggle */}
      <section className="sub-billing-toggle-section" ref={s1}>
        <div className="container">
          <div className="sub-billing-toggle">
            {['monthly', 'quarterly', 'biannual'].map((b) => (
              <button
                key={b}
                className={`sub-billing-btn ${billing === b ? 'sub-billing-btn--active' : ''}`}
                onClick={() => setBilling(b)}
              >
                {b.charAt(0).toUpperCase() + b.slice(1)}
                {b === 'quarterly' && <span className="sub-billing-save">Save 10%</span>}
                {b === 'biannual' && <span className="sub-billing-save">Save 17%</span>}
              </button>
            ))}
          </div>

          <div className="sub-plans-grid">
            {plans.map((plan, i) => (
              <div key={plan.id} className={`sub-plan-card fade-up stagger-${i + 1} ${plan.highlight ? 'sub-plan-card--highlight' : ''}`}>
                {plan.highlight && (
                  <div className="sub-plan-card__popular">
                    <i className="fas fa-fire" /> Most Popular
                  </div>
                )}
                <div className="sub-plan-card__header">
                  <div className="sub-plan-card__icon" style={{ background: plan.color === 'var(--accent)' ? 'rgba(213,208,88,0.15)' : 'rgba(67,78,48,0.08)' }}>
                    <i className="fas fa-bowl-food" style={{ color: plan.color }} />
                  </div>
                  <div>
                    <h3>{plan.name}</h3>
                    <p className="sub-plan-card__tagline">{plan.tagline}</p>
                  </div>
                </div>

                <div className="sub-plan-card__price">
                  <div>
                    <span className="sub-plan-card__currency">SAR</span>
                    <span className="sub-plan-card__amount">
                      {Math.round(plan.price.monthly * billingMultiplier[billing])}
                    </span>
                    <span className="sub-plan-card__period">/month</span>
                  </div>
                  <span className="sub-plan-card__meals">{plan.meals}</span>
                </div>

                <div className="sub-plan-card__divider" />

                <ul className="sub-plan-card__features">
                  {plan.features.map((f) => (
                    <li key={f} className="sub-plan-card__feature sub-plan-card__feature--yes">
                      <i className="fas fa-check" /> {f}
                    </li>
                  ))}
                  {plan.notIncluded.map((f) => (
                    <li key={f} className="sub-plan-card__feature sub-plan-card__feature--no">
                      <i className="fas fa-times" /> {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://wa.me/966500000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn ${plan.highlight ? 'btn--primary' : 'btn--outline-dark'}`}
                  style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }}
                >
                  <i className="fab fa-whatsapp" /> Get Started
                </a>
              </div>
            ))}
          </div>

          <p className="sub-plans-note fade-up">
            <i className="fas fa-shield-alt" /> All plans include free delivery, fresh daily preparation, and a satisfaction guarantee.
            <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"> Questions? Chat with us.</a>
          </p>
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
              { step: '01', icon: 'fas fa-clipboard-list', title: 'Tell Us Your Goals', desc: 'Fill out our nutrition assessment. We learn about your goals, lifestyle, preferences, and any food restrictions.' },
              { step: '02', icon: 'fas fa-user-md', title: 'Get Your Custom Plan', desc: 'Our nutritionists design a meal plan optimized for your specific goals and caloric needs.' },
              { step: '03', icon: 'fas fa-utensils', title: 'We Cook, You Enjoy', desc: 'Our chefs prepare your meals fresh daily in our certified kitchen using clean, traceable ingredients.' },
              { step: '04', icon: 'fas fa-truck', title: 'Delivered to Your Door', desc: 'Your meals arrive before 7am — portioned, labeled, and ready to eat. No cooking, no prep, no guessing.' },
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
              <div key={i} className={`sub-faq-item fade-up stagger-${(i % 3) + 1} ${openFaq === i ? 'sub-faq-item--open' : ''}`}>
                <button className="sub-faq-item__question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
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
            <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer" className="btn btn--dark btn--lg">
              <i className="fab fa-whatsapp" /> Chat With Our Team
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
