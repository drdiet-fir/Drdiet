import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

/* ── Scroll-animation hook (inline for page-level use) ── */
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

/* ── Counter hook ── */
function useCounter(value, suffix = '') {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let started = false
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true
          let startTs = null
          const duration = 2000
          const step = (ts) => {
            if (!startTs) startTs = ts
            const p = Math.min((ts - startTs) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            el.textContent = Math.floor(eased * value).toLocaleString() + (p < 1 ? '' : suffix)
            if (p < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.6 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [value, suffix])
  return ref
}

/* ─────────────────── SECTIONS ─────────────────── */

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__bg" />
      <div className="hero__overlay" />
      <div className="container hero__content">
        <div className="fade-up">
          <span className="badge badge--light hero__badge">
            <i className="fas fa-leaf" /> &nbsp;Science-Backed Nutrition
          </span>
        </div>
        <h1 className="hero__headline fade-up stagger-1">
          Your Body Is Built<br />
          <span className="hero__headline-accent">In The Kitchen.</span>
        </h1>
        <p className="hero__sub fade-up stagger-2">
          Customized meal plans crafted by nutrition experts, delivered fresh
          every day. Stop guessing — start transforming.
        </p>
        <div className="hero__actions fade-up stagger-3">
          <Link to="/subscription" className="btn btn--primary btn--lg">
            <i className="fas fa-rocket" /> Start Your Plan
          </Link>
          <Link to="/menu" className="btn btn--outline btn--lg">
            <i className="fas fa-utensils" /> View Menu
          </Link>
        </div>
        <div className="hero__trust fade-up stagger-4">
          <div className="hero__trust-item">
            <strong>10,000+</strong>
            <span>Happy Customers</span>
          </div>
          <div className="hero__trust-divider" />
          <div className="hero__trust-item">
            <strong>500K+</strong>
            <span>Meals Delivered</span>
          </div>
          <div className="hero__trust-divider" />
          <div className="hero__trust-item">
            <strong>95%</strong>
            <span>Success Rate</span>
          </div>
        </div>
      </div>
      <div className="hero__scroll-indicator">
        <span />
      </div>
    </section>
  )
}

function ProblemSection() {
  const ref = useReveal()
  const painPoints = [
    {
      icon: 'fas fa-dumbbell',
      title: "Gym Alone Isn't Enough",
      desc: 'Exercise accounts for only 20% of your results. The other 80% happens in the kitchen.',
    },
    {
      icon: 'fas fa-clock',
      title: 'No Time to Meal Prep',
      desc: 'Busy schedules lead to fast food, skipped meals, and broken diet plans.',
    },
    {
      icon: 'fas fa-question-circle',
      title: 'Confusing Nutrition Advice',
      desc: 'Contradicting information makes it impossible to know what actually works for your body.',
    },
    {
      icon: 'fas fa-chart-line',
      title: 'No Visible Progress',
      desc: 'Working hard but not seeing results because the nutrition foundation is missing.',
    },
  ]

  return (
    <section className="section section--cream problem-section" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label section-label--dark">The Problem</span>
          <h2>Why Most People<br />Never Reach Their Goals</h2>
          <div className="divider" />
          <p>
            Millions invest in gyms, supplements, and fitness apps — yet struggle to
            see real change. The missing piece is always nutrition.
          </p>
        </div>
        <div className="problem-grid">
          {painPoints.map((p, i) => (
            <div key={p.title} className={`problem-card fade-up stagger-${i + 1}`}>
              <div className="problem-card__icon">
                <i className={p.icon} />
              </div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
        <div className="problem-highlight fade-up">
          <div className="problem-highlight__stat">
            <strong>80%</strong>
            <span>of transformation results come from diet</span>
          </div>
          <div className="problem-highlight__divider" />
          <p className="problem-highlight__text">
            You can't out-train a bad diet. No matter how hard you work in the gym,
            without the right nutrition your body can't burn fat, build muscle, or
            recover properly. <strong>Dr Diet fixes that.</strong>
          </p>
        </div>
      </div>
    </section>
  )
}

function SolutionSection() {
  const ref = useReveal()
  const benefits = [
    {
      icon: 'fas fa-user-md',
      title: 'Expert Nutrition Guidance',
      desc: 'Every plan is crafted by certified nutritionists based on your body composition, goals, and lifestyle.',
    },
    {
      icon: 'fas fa-sliders-h',
      title: 'Fully Customized Meals',
      desc: 'Your macros, your preferences, your intolerances — all handled. No generic plans here.',
    },
    {
      icon: 'fas fa-truck',
      title: 'Fresh Daily Delivery',
      desc: 'Meals prepared in our HACCP-certified kitchen and delivered to your door every morning.',
    },
    {
      icon: 'fas fa-chart-bar',
      title: 'Progress Tracking',
      desc: 'Regular check-ins and plan adjustments to ensure you keep progressing week over week.',
    },
    {
      icon: 'fas fa-leaf',
      title: 'Clean Ingredients Only',
      desc: 'No artificial preservatives, no seed oils, no shortcuts. Just real food that fuels real results.',
    },
    {
      icon: 'fas fa-headset',
      title: '24/7 Support',
      desc: 'Our nutrition support team is always available to answer questions and keep you motivated.',
    },
  ]

  return (
    <section className="section solution-section" ref={ref}>
      <div className="container">
        <div className="solution-intro">
          <div className="solution-intro__text fade-up">
            <span className="section-label">The Solution</span>
            <h2>Meet Dr Diet —<br />Your Health Transformation Partner</h2>
            <div className="divider divider--left" />
            <p>
              We combine cutting-edge nutritional science with chef-quality cooking
              to deliver personalized meal plans that produce real, measurable
              transformations — without the guesswork or the effort.
            </p>
            <Link to="/about" className="btn btn--dark" style={{ marginTop: '32px' }}>
              Learn Our Story <i className="fas fa-arrow-right" />
            </Link>
          </div>
          <div className="solution-intro__visual fade-up stagger-2">
            <div className="solution-image-stack">
              <img
                src="https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80"
                alt="Healthy meal preparation"
                className="solution-img solution-img--main"
              />
              <img
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300&q=80"
                alt="Fresh ingredients"
                className="solution-img solution-img--accent"
              />
              <div className="solution-badge">
                <i className="fas fa-award" />
                <div>
                  <strong>Certified</strong>
                  <span>Nutrition Experts</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid-3" style={{ marginTop: '80px' }}>
          {benefits.map((b, i) => (
            <div key={b.title} className={`benefit-card fade-up stagger-${(i % 3) + 1}`}>
              <div className="benefit-card__icon">
                <i className={b.icon} />
              </div>
              <h4>{b.title}</h4>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TransformationsSection() {
  const ref = useReveal()
  const transformations = [
    {
      name: 'Sarah K.',
      duration: '3 Months',
      loss: '-18 kg',
      goal: 'Fat Loss',
      quote: '"I tried everything before. Dr Diet is the only thing that actually worked."',
      beforeImg: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=280&q=80',
      afterImg: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=280&q=80',
    },
    {
      name: 'Ahmed R.',
      duration: '4 Months',
      loss: '-22 kg',
      goal: 'Body Recomp',
      quote: '"From 30% body fat to lean and athletic. My energy levels are insane now."',
      beforeImg: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=280&q=80',
      afterImg: 'https://images.unsplash.com/photo-1611672585731-fa10603fb9e0?w=280&q=80',
    },
    {
      name: 'Nora M.',
      duration: '2 Months',
      loss: '-12 kg',
      goal: 'Postpartum',
      quote: "\"After my second baby I thought I'd never get my body back. I was wrong.\"",
      beforeImg: 'https://images.unsplash.com/photo-1551836022-8b2858c9c69b?w=280&q=80',
      afterImg: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=280&q=80',
    },
  ]

  return (
    <section className="section section--dark transformations-section" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label section-label--white">Real Results</span>
          <h2 className="text-white">
            Real People.<br />Real Transformations.
          </h2>
          <div className="divider" />
          <p className="text-cream" style={{ opacity: 0.75 }}>
            These aren't stock photos. These are our customers — people just like you
            who decided to eat what's right.
          </p>
        </div>

        <div className="transformations-grid">
          {transformations.map((t, i) => (
            <div key={t.name} className={`transformation-card fade-up stagger-${i + 1}`}>
              <div className="transformation-card__images">
                <div className="transformation-card__before">
                  <img src={t.beforeImg} alt={`${t.name} before`} />
                  <span className="transformation-label">Before</span>
                </div>
                <div className="transformation-card__after">
                  <img src={t.afterImg} alt={`${t.name} after`} />
                  <span className="transformation-label transformation-label--after">After</span>
                </div>
                <div className="transformation-card__badge">{t.loss}</div>
              </div>
              <div className="transformation-card__info">
                <div className="transformation-card__meta">
                  <span className="badge badge--accent">{t.goal}</span>
                  <span className="transformation-card__duration">
                    <i className="fas fa-clock" /> {t.duration}
                  </span>
                </div>
                <p className="transformation-card__quote">{t.quote}</p>
                <strong className="transformation-card__name">— {t.name}</strong>
              </div>
            </div>
          ))}
        </div>

        <div className="transformations-cta fade-up">
          <p className="text-cream">Ready to write your own success story?</p>
          <Link to="/subscription" className="btn btn--primary btn--lg">
            Start My Transformation <i className="fas fa-arrow-right" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function PlansSection() {
  const ref = useReveal()
  const plans = [
    {
      name: 'Starter',
      tagline: 'Perfect to begin your journey',
      price: '299',
      period: 'month',
      meals: 2,
      features: [
        '2 meals per day',
        'Basic calorie tracking',
        'Standard meal variety',
        'Weekly check-in',
        'Email support',
      ],
      cta: 'Choose Starter',
      highlight: false,
    },
    {
      name: 'Transform',
      tagline: 'Most popular — best results',
      price: '499',
      period: 'month',
      meals: 3,
      features: [
        '3 meals + 2 snacks daily',
        'Full macro customization',
        'Premium meal selection',
        'Bi-weekly nutritionist call',
        'Priority WhatsApp support',
        'Progress report',
      ],
      cta: 'Choose Transform',
      highlight: true,
    },
    {
      name: 'Elite',
      tagline: 'Maximum results, zero compromise',
      price: '799',
      period: 'month',
      meals: 5,
      features: [
        '5 meals + unlimited snacks',
        'Fully bespoke meal plan',
        'Premium & exclusive dishes',
        'Weekly 1-on-1 consultation',
        '24/7 dedicated support',
        'Body composition tracking',
        'Supplement recommendations',
      ],
      cta: 'Choose Elite',
      highlight: false,
    },
  ]

  return (
    <section className="section section--cream plans-section" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label section-label--dark">Subscription Plans</span>
          <h2>Choose Your Path to Transformation</h2>
          <div className="divider" />
          <p>Flexible plans with no long-term commitment. Pause or cancel anytime.</p>
        </div>

        <div className="plans-grid">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`plan-card fade-up stagger-${i + 1} ${plan.highlight ? 'plan-card--highlight' : ''}`}
            >
              {plan.highlight && (
                <div className="plan-card__popular">
                  <i className="fas fa-star" /> Most Popular
                </div>
              )}
              <div className="plan-card__header">
                <h3>{plan.name}</h3>
                <p className="plan-card__tagline">{plan.tagline}</p>
                <div className="plan-card__price">
                  <span className="plan-card__currency">SAR</span>
                  <span className="plan-card__amount">{plan.price}</span>
                  <span className="plan-card__period">/{plan.period}</span>
                </div>
              </div>
              <ul className="plan-card__features">
                {plan.features.map((f) => (
                  <li key={f}>
                    <i className="fas fa-check" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/subscription"
                className={`btn ${plan.highlight ? 'btn--primary' : 'btn--outline-dark'}`}
                style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="plans-note fade-up">
          <i className="fas fa-info-circle" />
          Prices are indicative. Final pricing depends on your customized plan.
          <Link to="/contact"> Talk to our team</Link> for an exact quote.
        </p>
      </div>
    </section>
  )
}

function StarMealsSection() {
  const ref = useReveal()
  const meals = [
    {
      name: 'Grilled Salmon Bowl',
      cal: '480 kcal',
      protein: '42g protein',
      tag: 'High Protein',
      img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80',
    },
    {
      name: 'Chicken Shawarma Wrap',
      cal: '520 kcal',
      protein: '38g protein',
      tag: 'Fan Favourite',
      img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80',
    },
    {
      name: 'Quinoa Power Salad',
      cal: '380 kcal',
      protein: '22g protein',
      tag: 'Vegan',
      img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80',
    },
    {
      name: 'Beef Kofta Platter',
      cal: '560 kcal',
      protein: '45g protein',
      tag: 'Bulk & Gain',
      img: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&q=80',
    },
    {
      name: 'Overnight Oats Jar',
      cal: '340 kcal',
      protein: '18g protein',
      tag: 'Breakfast',
      img: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400&q=80',
    },
    {
      name: 'Zucchini Pasta Bolognese',
      cal: '420 kcal',
      protein: '35g protein',
      tag: 'Low Carb',
      img: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80',
    },
  ]

  return (
    <section className="section section--dark meals-section" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label section-label--white">Our Menu</span>
          <h2 className="text-white">Star Meals Your Body Will Love</h2>
          <div className="divider" />
          <p style={{ color: 'rgba(245,237,225,0.7)' }}>
            Every dish is calorie-counted, macro-balanced, and genuinely delicious.
            Because healthy food should never feel like punishment.
          </p>
        </div>

        <div className="meals-grid">
          {meals.map((meal, i) => (
            <div key={meal.name} className={`meal-card fade-up stagger-${(i % 3) + 1}`}>
              <div className="meal-card__image">
                <img src={meal.img} alt={meal.name} loading="lazy" />
                <span className="meal-card__tag">{meal.tag}</span>
              </div>
              <div className="meal-card__body">
                <h4 className="meal-card__name">{meal.name}</h4>
                <div className="meal-card__macros">
                  <span><i className="fas fa-fire" /> {meal.cal}</span>
                  <span><i className="fas fa-drumstick-bite" /> {meal.protein}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="meals-cta fade-up">
          <Link to="/menu" className="btn btn--primary btn--lg">
            Explore Full Menu <i className="fas fa-arrow-right" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function StatsSection() {
  const c1 = useCounter(10000, '+')
  const c2 = useCounter(500000, '+')
  const c3 = useCounter(2800, '+')
  const c4 = useCounter(12, '+')

  const stats = [
    { ref: c1, label: 'Happy Customers', icon: 'fas fa-users' },
    { ref: c2, label: 'Meals Delivered', icon: 'fas fa-utensils' },
    { ref: c3, label: 'Transformations', icon: 'fas fa-heart-pulse' },
    { ref: c4, label: 'Locations', icon: 'fas fa-map-marker-alt' },
  ]

  return (
    <section className="stats-section">
      <div className="stats-section__bg" />
      <div className="container stats-grid">
        {stats.map((s, i) => (
          <div key={s.label} className="stat-item">
            <div className="stat-item__icon">
              <i className={s.icon} />
            </div>
            <div className="stat-item__number" ref={s.ref}>0</div>
            <div className="stat-item__label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function JoinUsPreviewSection() {
  const ref = useReveal()
  const options = [
    {
      icon: 'fas fa-store',
      title: 'Franchise',
      desc: 'Own a Dr Diet branch in your city. Proven business model, full operational support, and a brand people already trust.',
      cta: 'Learn About Franchise',
      hash: '#franchise',
      img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&q=80',
    },
    {
      icon: 'fas fa-building',
      title: 'Corporate Catering',
      desc: 'Keep your team energized and healthy with daily catered meals. Flexible packages for offices of all sizes.',
      cta: 'Get Catering Quote',
      hash: '#catering',
      img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80',
    },
    {
      icon: 'fas fa-handshake',
      title: 'B2B Partnership',
      desc: 'Gyms, clinics, hotels — partner with Dr Diet to offer your clients premium nutrition solutions.',
      cta: 'Explore Partnership',
      hash: '#b2b',
      img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=500&q=80',
    },
  ]

  return (
    <section className="section section--cream join-preview-section" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label section-label--dark">Opportunities</span>
          <h2>Grow With Dr Diet</h2>
          <div className="divider" />
          <p>Whether you want to run a branch, feed your team, or partner up — there's a seat at our table.</p>
        </div>

        <div className="join-preview-grid">
          {options.map((opt, i) => (
            <div key={opt.title} className={`join-preview-card fade-up stagger-${i + 1}`}>
              <div className="join-preview-card__image">
                <img src={opt.img} alt={opt.title} loading="lazy" />
                <div className="join-preview-card__icon-wrap">
                  <i className={opt.icon} />
                </div>
              </div>
              <div className="join-preview-card__body">
                <h3>{opt.title}</h3>
                <p>{opt.desc}</p>
                <Link to={`/join-us${opt.hash}`} className="btn btn--dark btn--sm">
                  {opt.cta} <i className="fas fa-arrow-right" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const ref = useReveal()
  const reviews = [
    {
      name: 'Fatima Al-Rashidi',
      role: 'Working Mother, Riyadh',
      rating: 5,
      text: "I've been with Dr Diet for 5 months and lost 15kg without stepping foot in a gym. The food is genuinely delicious - my kids keep stealing my meals!",
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80',
    },
    {
      name: 'Khalid Al-Mansouri',
      role: 'Personal Trainer, Dubai',
      rating: 5,
      text: 'I recommend Dr Diet to all my clients. The macros are spot-on, the quality is consistent, and the customer service actually responds. Rare these days.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80',
    },
    {
      name: 'Lina Hassan',
      role: 'University Student, Jeddah',
      rating: 5,
      text: "As a student on a budget I was skeptical but the Starter plan is so worth it. I've lost 8kg in 6 weeks and actually have energy for classes now.",
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80',
    },
  ]

  return (
    <section className="section testimonials-section" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Testimonials</span>
          <h2>What Our Customers Say</h2>
          <div className="divider" />
        </div>
        <div className="grid-3 testimonials-grid">
          {reviews.map((r, i) => (
            <div key={r.name} className={`testimonial-card fade-up stagger-${i + 1}`}>
              <div className="testimonial-card__stars">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <i key={j} className="fas fa-star" />
                ))}
              </div>
              <p className="testimonial-card__text">"{r.text}"</p>
              <div className="testimonial-card__author">
                <img src={r.avatar} alt={r.name} />
                <div>
                  <strong>{r.name}</strong>
                  <span>{r.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="testimonials-cta fade-up">
          <Link to="/testimonials" className="btn btn--outline-dark">
            Read More Stories <i className="fas fa-arrow-right" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function LocationsSection() {
  const ref = useReveal()
  const cities = [
    { name: 'Riyadh', branches: 4, icon: 'fas fa-city' },
    { name: 'Jeddah', branches: 3, icon: 'fas fa-city' },
    { name: 'Dammam', branches: 2, icon: 'fas fa-city' },
    { name: 'Khobar', branches: 1, icon: 'fas fa-city' },
    { name: 'Mecca', branches: 1, icon: 'fas fa-city' },
    { name: 'Medina', branches: 1, icon: 'fas fa-city' },
  ]

  return (
    <section className="section section--dark locations-preview-section" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label section-label--white">Find Us</span>
          <h2 className="text-white">We're In Your City</h2>
          <div className="divider" />
          <p style={{ color: 'rgba(245,237,225,0.7)' }}>
            Fresh meals prepared and delivered across the Kingdom.
          </p>
        </div>
        <div className="locations-preview-grid">
          {cities.map((city, i) => (
            <div key={city.name} className={`location-pill fade-up stagger-${(i % 3) + 1}`}>
              <i className={city.icon} />
              <div>
                <strong>{city.name}</strong>
                <span>{city.branches} {city.branches === 1 ? 'Branch' : 'Branches'}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="locations-cta fade-up">
          <Link to="/locations" className="btn btn--primary">
            View All Locations <i className="fas fa-map" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function CtaBanner() {
  return (
    <section className="cta-banner">
      <div className="cta-banner__bg" />
      <div className="container cta-banner__content">
        <div className="cta-banner__text">
          <h2>Start Your Transformation Today.</h2>
          <p>
            Join 10,000+ people who chose to eat what's right. Your first step
            takes 60 seconds.
          </p>
        </div>
        <div className="cta-banner__actions">
          <Link to="/subscription" className="btn btn--dark btn--lg">
            <i className="fas fa-rocket" /> Start Your Plan
          </Link>
          <a
            href="https://wa.me/966500000000"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--outline-dark btn--lg"
          >
            <i className="fab fa-whatsapp" /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────── HOME PAGE ─────────────────── */
export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <TransformationsSection />
      <PlansSection />
      <StarMealsSection />
      <StatsSection />
      <JoinUsPreviewSection />
      <TestimonialsSection />
      <LocationsSection />
      <CtaBanner />
    </>
  )
}
