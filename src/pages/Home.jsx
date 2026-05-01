import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta'
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
  const ref = useReveal()
  return (
    <section className="hero" ref={ref}>
      <div className="container hero__inner">

        {/* Left — content */}
        <div className="hero__left fade-up">
          <span className="hero__eyebrow">
            <i className="fas fa-leaf" /> Science-Backed Nutrition
          </span>
          <h1 className="hero__headline">
            Eat What's Right.<br />
            Real Food. Real <span className="hero__headline-accent">Transformation.</span>
          </h1>
          <p className="hero__sub">
            High-protein, calorie-conscious meals delivered daily.
            Starting at <strong>₹199</strong>.
          </p>
          <div className="hero__actions">
            <Link to="/subscription" className="btn btn--dark btn--lg">
              Start Your Transformation
            </Link>
            <Link to="/menu" className="hero__link">
              Explore the menu <i className="fas fa-arrow-right" />
            </Link>
          </div>
          <p className="hero__disclaimer">
            Flexible plans. No commitment. Cancel anytime.
          </p>
        </div>

        {/* Right — food imagery */}
        <div className="hero__right fade-up stagger-2">
          <div className="hero__img-stack">
            <img
              src="/brand_assets/Food image 1.webp"
              alt="Fresh healthy bowl"
              className="hero__img hero__img--main"
            />
            <img
              src="/brand_assets/Food image 2.webp"
              alt="Grilled protein wrap"
              className="hero__img hero__img--secondary"
            />
            <div className="hero__img-badge">
              <strong>500K+</strong>
              <span>Meals Delivered</span>
            </div>
          </div>
        </div>

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
            Millions invest in gyms, supplements, and fitness apps but still struggle to
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
      desc: 'Your macros, your preferences, your intolerances. All handled. No generic plans here.',
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
            <h2>Meet Dr Diet,<br />Your Health Transformation Partner</h2>
            <div className="divider divider--left" />
            <p>
              We combine cutting-edge nutritional science with chef-quality cooking
              to deliver personalized meal plans that produce real, measurable
              transformations without the guesswork or the effort.
            </p>
            <Link to="/about" className="btn btn--dark" style={{ marginTop: '32px' }}>
              Learn Our Story <i className="fas fa-arrow-right" />
            </Link>
          </div>
          <div className="solution-intro__visual fade-up stagger-2">
            <div className="solution-image-stack">
              <img
                src="/brand_assets/Mediterranean stuffed panner.webp"
                alt="Mediterranean stuffed paneer"
                className="solution-img solution-img--main"
              />
              <img
                src="/brand_assets/mashed potato portrait.webp"
                alt="Mashed potato dish"
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
      name: 'Poonam',
      duration: '3 Months',
      loss: '-18 kg',
      goal: 'Fat Loss',
      quote: '"I tried everything before. Dr Diet is the only thing that actually worked."',
      beforeImg: '/brand_assets/Tranformation 1 before.webp',
      afterImg: '/brand_assets/Tranformation 1 after.webp',
    },
    {
      name: 'Alok',
      duration: '4 Months',
      loss: '-22 kg',
      goal: 'Body Recomp',
      quote: '"From 30% body fat to lean and athletic. My energy levels are insane now."',
      beforeImg: '/brand_assets/Tranformation 2 before.webp',
      afterImg: '/brand_assets/Tranformation 2 after.webp',
    },
    {
      name: 'Simran',
      duration: '2 Months',
      loss: '-12 kg',
      goal: 'Postpartum',
      quote: "\"After my second baby I thought I'd never get my body back. I was wrong.\"",
      beforeImg: '/brand_assets/Tranformation 3 Before.webp',
      afterImg: '/brand_assets/Tranformation 3 after.webp',
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
            These aren't stock photos. These are our customers, people just like you
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
                <strong className="transformation-card__name">{t.name}</strong>
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

function TrialFormSection() {
  const ref = useReveal()
  const [form, setForm] = useState({ name: '', phone: '', city: '', goal: '', diet: '', source: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('https://drdiet.onrender.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: form.source || 'Homepage Trial Form' }),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Could not reach server. Please WhatsApp us directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section section--cream trial-form-section" ref={ref}>
      <div className="container">
        <div className="trial-form-wrapper fade-up">
          <div className="trial-form-header">
            <span className="section-label section-label--dark">Get Started</span>
            <h2>Book Your Trial Meal Today.</h2>
            <p className="trial-form-sub">Tell us about yourself and our team will get in touch to arrange your first Dr Diet meal — no commitment, no payment upfront.</p>
          </div>

          {submitted ? (
            <div className="trial-form-success">
              <div className="trial-form-success__icon"><i className="fas fa-check-circle" /></div>
              <h3>You're on the list!</h3>
              <p>Our team will reach out within a few hours to set up your trial meal. Check your WhatsApp.</p>
              <a href="https://wa.me/917015732242" target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--lg">
                <i className="fab fa-whatsapp" /> Chat With Us Now
              </a>
            </div>
          ) : (
            <form className="trial-form" onSubmit={handleSubmit}>
              <div className="trial-form__row">
                <div className="form-group">
                  <label htmlFor="tf-name">Full Name *</label>
                  <input className="form-control" type="text" id="tf-name" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="tf-phone">WhatsApp Number *</label>
                  <input className="form-control" type="tel" id="tf-phone" name="phone" value={form.phone} onChange={handleChange} placeholder="e.g. 9876543210" required />
                </div>
              </div>
              <div className="trial-form__row">
                <div className="form-group">
                  <label htmlFor="tf-city">Your City *</label>
                  <select className="form-control" id="tf-city" name="city" value={form.city} onChange={handleChange} required>
                    <option value="">Select city</option>
                    <option>Delhi NCR</option>
                    <option>Gurgaon</option>
                    <option>Chandigarh</option>
                    <option>Mohali</option>
                    <option>Bengaluru</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="tf-goal">Your Goal *</label>
                  <select className="form-control" id="tf-goal" name="goal" value={form.goal} onChange={handleChange} required>
                    <option value="">Select goal</option>
                    <option>Weight Loss</option>
                    <option>Muscle Gain</option>
                    <option>Body Recomposition</option>
                    <option>Eat Healthy</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="tf-diet">Diet Preference *</label>
                <select className="form-control" id="tf-diet" name="diet" value={form.diet} onChange={handleChange} required>
                  <option value="">Select preference</option>
                  <option>Non-Vegetarian</option>
                  <option>Vegetarian</option>
                  <option>Eggetarian</option>
                  <option>Vegan</option>
                </select>
              </div>
              {error && <p className="trial-form__error"><i className="fas fa-exclamation-circle" /> {error}</p>}
              <button type="submit" className="btn btn--primary btn--lg trial-form__submit" disabled={loading}>
                {loading ? <><i className="fas fa-spinner fa-spin" /> Booking...</> : <><i className="fas fa-paper-plane" /> Book My Trial Meal</>}
              </button>
              <p className="trial-form__trust">
                <i className="fas fa-lock" /> No payment required. We'll contact you on WhatsApp to confirm.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function StarMealsSection() {
  const ref = useReveal()
  const meals = [
    {
      name: 'Juiciest Stuffed Chicken Breast',
      price: '₹280',
      protein: '55g protein',
      tag: 'High Protein',
      img: '/brand_assets/Juiciest stuffed chicken breast.webp',
    },
    {
      name: 'Brown Rice Chicken Tikka Biryani',
      price: '₹249',
      protein: '38g protein',
      tag: 'Light & Fresh',
      img: '/brand_assets/Chicken Brown rice Landscape.webp',
    },
    {
      name: 'Guilt Free Paneer Makhani Bowl',
      price: '₹249',
      protein: '32g protein',
      tag: 'Fit Rice Bowl',
      img: '/brand_assets/Guilt Free Paneer Makhani Bowl.webp',
    },
    {
      name: 'Chicken Tikka Wrap',
      price: '₹249',
      protein: '38g protein',
      tag: 'Rolling Rolls',
      img: '/brand_assets/Chicken Tikka Wrap.webp',
    },
    {
      name: 'Quinoa Patty Protein Burger',
      price: '₹249',
      protein: '28g protein',
      tag: 'Multigrain Burger',
      img: '/brand_assets/Quinoa Patty Burger.webp',
    },
    {
      name: 'Nutella Protein Pancakes',
      price: '₹249',
      protein: '22g protein',
      tag: 'Protein Dessert',
      img: '/brand_assets/Nuttela Pancake.webp',
    },
  ]

  return (
    <section className="section section--dark meals-section" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label section-label--white">Our Menu</span>
          <h2 className="text-white">Real Food. Real Flavour.</h2>
          <div className="divider" />
          <p style={{ color: 'rgba(245,237,225,0.7)' }}>
            Starting at <strong style={{ color: 'var(--accent)' }}>₹199</strong> · Up to <strong style={{ color: 'var(--accent)' }}>55g protein</strong> per meal.
            Every dish is calorie-counted, macro-balanced, and genuinely delicious.
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
                  <span><i className="fas fa-indian-rupee-sign" /> {meal.price}</span>
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
  const c1 = useCounter(12, '+')
  const c2 = useCounter(2500, '+')
  const c3 = useCounter(10000, '+')
  const c4 = useCounter(5, '')

  const stats = [
    { ref: c1, label: 'Outlets Across India', icon: 'fas fa-store' },
    { ref: c2, label: 'Meals Per Day', icon: 'fas fa-utensils' },
    { ref: c3, label: 'Happy Customers', icon: 'fas fa-users' },
    { ref: c4, label: 'Cities', icon: 'fas fa-map-marker-alt' },
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
      img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&q=80',
    },
    {
      icon: 'fas fa-building',
      title: 'Corporate Catering',
      desc: 'Keep your team energized and healthy with daily catered meals. Flexible packages for offices of all sizes.',
      cta: 'Get Catering Quote',
      hash: '#catering',
      img: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=500&q=80',
    },
    {
      icon: 'fas fa-handshake',
      title: 'B2B Partnership',
      desc: 'Gyms, clinics, hotels. Partner with Dr Diet to offer your clients premium nutrition solutions.',
      cta: 'Explore Partnership',
      hash: '#b2b',
      img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80',
    },
  ]

  return (
    <section className="section section--cream join-preview-section" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label section-label--dark">Opportunities</span>
          <h2>Grow With Dr Diet</h2>
          <div className="divider" />
          <p>Whether you want to run a branch, feed your team, or partner up, there's a seat at our table.</p>
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
      name: 'Kia',
      role: 'North Mohali',
      platform: 'Swiggy',
      platformIcon: 'fas fa-motorcycle',
      item: 'Quinoa Patty Burger',
      rating: 5,
      text: "I was admitted in the hospital since last night and just came back. I was very hungry but didn't have the courage to cook. Because of you, I was able to eat my favourite meal in a healthy version.",
      initials: 'K',
    },
    {
      name: 'Khushi Arora',
      role: 'Rajouri Garden, Delhi',
      platform: 'Swiggy',
      platformIcon: 'fas fa-motorcycle',
      item: 'Stuffed Chicken Breast',
      rating: 5,
      text: "First of all, the food was absolutely amazing! It was my first time ordering and honestly I said 'wow' with every single bite. Please tell Chef Laddu that he's done a fantastic job.",
      initials: 'KA',
    },
    {
      name: 'Abhi',
      role: 'Delhi · Repeat Customer',
      platform: 'Swiggy',
      platformIcon: 'fas fa-motorcycle',
      item: 'High Protein Half Pound Meal',
      rating: 5,
      text: "I have been using Dr Diet for a while now. It has become my go-to place to order and eat healthy and clean with enough protein.",
      initials: 'A',
    },
    {
      name: 'Mohit Yadav',
      role: 'Gurgaon · 10+ orders',
      platform: 'Swiggy',
      platformIcon: 'fas fa-motorcycle',
      item: 'Whole Wheat Chicken Tikka Wrap',
      rating: 5,
      text: "Recently tried the pasta and was genuinely impressed. Cooked perfectly al dente, sauce rich and well-balanced. Every bite was satisfying and comforting. Would definitely order again.",
      initials: 'MY',
    },
    {
      name: 'Yuktika Dhupar',
      role: 'Local Guide · Google Reviews',
      platform: 'Google',
      platformIcon: 'fab fa-google',
      item: 'Food 5/5 · Service 5/5',
      rating: 5,
      text: "I don't think I've had such better healthy food at this cost anywhere in my life. Also the owner Priti is very sweet. Kudos to you guys for bringing this up!!",
      initials: 'YD',
    },
    {
      name: 'V',
      role: 'WhatsApp Feedback',
      platform: 'WhatsApp',
      platformIcon: 'fab fa-whatsapp',
      item: 'Baked Creamy Chicken Breast',
      rating: 5,
      text: "Got the handwritten note, very unexpected for a Swiggy order. Thank you for putting much effort into this. Your best dish is the baked creamy chicken breast paprika with mushroom. Thank you for serving good food.",
      initials: 'V',
    },
  ]

  return (
    <section className="section testimonials-section" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Testimonials</span>
          <h2>What Our Customers Say</h2>
          <div className="divider" />
          <p>Real reviews from real people, on Swiggy, Zomato, and Google.</p>
        </div>
        <div className="testimonials-grid">
          {reviews.map((r, i) => (
            <div key={r.name + r.role} className={`testimonial-card fade-up stagger-${(i % 3) + 1}`}>
              <div className="testimonial-card__top">
                <div className="testimonial-card__stars">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <i key={j} className="fas fa-star" />
                  ))}
                </div>
                <span className={`testimonial-card__platform testimonial-card__platform--${r.platform.toLowerCase()}`}>
                  <i className={r.platformIcon} /> {r.platform}
                </span>
              </div>
              <p className="testimonial-card__text">"{r.text}"</p>
              <div className="testimonial-card__footer">
                <div className="testimonial-card__avatar">{r.initials}</div>
                <div>
                  <strong>{r.name}</strong>
                  <span>{r.role}</span>
                  <span className="testimonial-card__item"><i className="fas fa-utensils" /> {r.item}</span>
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
    { name: 'Delhi', branches: 4, icon: 'fas fa-city' },
    { name: 'Gurgaon', branches: 2, icon: 'fas fa-city' },
    { name: 'Noida', branches: 1, icon: 'fas fa-city' },
    { name: 'Chandigarh', branches: 1, icon: 'fas fa-city' },
    { name: 'Mohali', branches: 1, icon: 'fas fa-city' },
    { name: 'Bengaluru', branches: 1, icon: 'fas fa-city' },
  ]

  return (
    <section className="section section--dark locations-preview-section" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label section-label--white">Find Us</span>
          <h2 className="text-white">12 Outlets Across India</h2>
          <div className="divider" />
          <p style={{ color: 'rgba(245,237,225,0.7)' }}>
            Delhi · Gurgaon · Noida · Chandigarh · Mohali · Bengaluru. Expanding to Hyderabad, Pune &amp; Mumbai.
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

function AudienceSection() {
  const ref = useReveal()
  const segments = [
    {
      icon: 'fas fa-weight',
      title: 'Weight Loss',
      desc: 'Calorie-deficit meal plans with high protein. Lose 6–10kg in 6 weeks without starving.',
      link: '/blog/how-to-lose-weight-without-starving',
      cta: 'Read: How to Lose Weight',
    },
    {
      icon: 'fas fa-dumbbell',
      title: 'Muscle Gain',
      desc: '35–55g protein per meal to fuel your workouts and build lean muscle without extra fat.',
      link: '/blog/high-protein-indian-meal-plan-muscle-gain',
      cta: 'Read: Muscle Gain Guide',
    },
    {
      icon: 'fas fa-briefcase',
      title: 'Office Professionals',
      desc: 'Skip the canteen. Get a calorie-counted, high-protein office lunch delivered every morning.',
      link: '/blog/healthy-office-lunch-delhi-gurgaon',
      cta: 'Read: Office Lunch Guide',
    },
    {
      icon: 'fas fa-heartbeat',
      title: 'Medical Goals',
      desc: 'Custom plans for PCOS, diabetes, thyroid, and lifestyle conditions. Clean, whole-food meals.',
      link: '/blog/pcos-diet-plan-india',
      cta: 'Read: PCOS Diet Guide',
    },
  ]

  return (
    <section className="section section--cream audience-section" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label section-label--dark">Who It's For</span>
          <h2>Every Goal Has a Plan</h2>
          <div className="divider" />
          <p>Whether you want to lose weight, build muscle, eat clean at work, or manage a health condition — Dr Diet has a meal plan built for your specific goal.</p>
        </div>
        <div className="audience-grid">
          {segments.map((s, i) => (
            <div key={s.title} className={`audience-card fade-up stagger-${i + 1}`}>
              <div className="audience-card__icon"><i className={s.icon} /></div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <Link to={s.link} className="audience-card__link">{s.cta} <i className="fas fa-arrow-right" /></Link>
            </div>
          ))}
        </div>
        <div className="audience-cities fade-up">
          <p className="audience-cities__label">Delivering across India:</p>
          <div className="audience-cities__list">
            <Link to="/healthy-meal-plan-delhi">Delhi</Link>
            <Link to="/diet-food-gurgaon">Gurgaon</Link>
            <Link to="/healthy-meals-chandigarh">Chandigarh & Mohali</Link>
            <Link to="/weight-loss-meals-bangalore">Bangalore</Link>
          </div>
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
            href="https://wa.me/917015732242"
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
      <PageMeta
        title="Dr Diet – Healthy Meal Plans Delivered Daily | Weight Loss & High-Protein Meals"
        description="Dr Diet delivers fresh, calorie-counted, high-protein meal plans across Delhi, Gurgaon, Chandigarh & Bangalore. Plans for weight loss, muscle gain, PCOS & office professionals. Starting ₹199/day."
        canonical="/"
        ogImage="/brand_assets/Food image 1.webp"
      />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <AudienceSection />
      <TransformationsSection />
      <TrialFormSection />
      <StarMealsSection />
      <StatsSection />
      <JoinUsPreviewSection />
      <TestimonialsSection />
      <LocationsSection />
      <CtaBanner />
    </>
  )
}
