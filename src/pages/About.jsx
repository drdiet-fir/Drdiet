import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './About.css'

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

const team = [
  {
    name: 'Mirnal Sethi',
    role: 'Founder',
    img: '/brand_assets/IMG_2241.PNG.webp',
    bio: 'Started Dr Diet to solve the problem of unhealthy, inaccessible food for students and working professionals. Built from a small 10x8 room in Chandigarh to 12 outlets across 5 cities in India. Still actively involved in the kitchen every day.',
  },
  {
    name: 'Our Kitchen Team',
    role: 'The People Behind Every Meal',
    img: '/brand_assets/128199f1-f61a-4058-b3fd-c3431ddf93aa.webp',
    bio: '"We don\'t hire chefs. We make them." Every kitchen team member is trained from the ground up in nutrition, clean cooking, and the Dr Diet way. Because when you\'re responsible for someone\'s health, good enough isn\'t good enough.',
  },
  {
    name: 'Marketing & Branding Team',
    role: 'In-House Creatives',
    img: '/brand_assets/a643568a-00bc-4e4f-b9cf-220b0ec4ed29.webp',
    bio: 'From designing the meal box you unbox to the reel that stops your scroll. Everything is built in-house. Our creative team handles brand identity, content, social media, and campaigns end-to-end. No outsourcing. No compromises. Just a team that genuinely cares about how Dr Diet shows up in the world.',
  },
]

const values = [
  { icon: 'fas fa-flask', title: 'Real Nutrition', desc: 'Transparent macros, honest ingredients, no shortcuts.' },
  { icon: 'fas fa-leaf', title: 'Desi at Heart', desc: 'Indian flavours you grew up with, made the way your body actually needs.' },
  { icon: 'fas fa-fire', title: 'Taste First', desc: 'Healthy food should taste good. Always.' },
  { icon: 'fas fa-map-marker-alt', title: 'Accessible Health', desc: '12 outlets, 5 cities, health on your doorstep.' },
]

const milestones = [
  { year: '2020', event: 'Started in a 10x8 room in Chandigarh. First meals at ₹99.' },
  { year: '2020', event: 'COVID shutdown. Lost entire investment. Restarted with landlord\'s support.' },
  { year: '2021', event: 'Official relaunch. New kitchen, team of 5 chefs, listed on Swiggy & Zomato.' },
  { year: '2022–23', event: 'Expanded to Delhi, Noida, Gurgaon and Mohali via partner model.' },
  { year: '2024', event: 'Crossed 14 outlets. Launched in Bengaluru. Cloud kitchens + QSR + Dine-in.' },
  { year: '2025', event: '₹10 Cr+ annual revenue. Startup Pedia feature. Went viral nationally.' },
  { year: '2026', event: 'Targeting ₹15–16 Cr. Expanding to Hyderabad, Pune & Mumbai.' },
]

export default function About() {
  const s1 = useReveal()
  const s2 = useReveal()
  const s3 = useReveal()
  const s4 = useReveal()

  return (
    <>
      {/* Hero */}
      <section className="page-hero about-hero">
        <div className="container">
          <span className="section-label section-label--white">Our Story</span>
          <h1>From a 10x8 Room<br />to 14+ Outlets</h1>
          <p>Eat What's Right. Built to make genuinely healthy, calorie-conscious food accessible for students and working professionals.</p>
        </div>
      </section>

      {/* Mission */}
      <section className="section about-mission" ref={s1}>
        <div className="container">
          <div className="about-mission__grid">
            <div className="about-mission__image fade-up">
              <img src="/brand_assets/IMG_2241.PNG.webp" alt="Dr Diet founder Mirnal Sethi" />
              <div className="about-mission__badge">
                <span className="about-mission__badge-num">14+</span>
                <span>Outlets Across India</span>
              </div>
            </div>
            <div className="about-mission__content fade-up stagger-2">
              <span className="section-label section-label--dark">Our Mission</span>
              <h2>To bring genuinely healthy, calorie-conscious Indian food to your doorstep.</h2>
              <div className="divider divider--left" />
              <p>Because eating right should feel like a choice you're proud of, not a sacrifice. We started Dr Diet because we saw too many students and working professionals eating the wrong food: watery dal, maida chapatis, zero protein. Not because they lacked willpower, but because they lacked access.</p>
              <p style={{marginTop:'16px'}}>Today, we serve 2,000–2,500 people every day across Delhi, Chandigarh, and Bengaluru, with meals that are calorie-counted, macro-balanced, and genuinely delicious.</p>
              <Link to="/subscription" className="btn btn--dark" style={{marginTop:'32px'}}>
                Start Your Plan <i className="fas fa-arrow-right" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section section--cream" ref={s2}>
        <div className="container">
          <div className="section-header">
            <span className="section-label section-label--dark">What We Stand For</span>
            <h2>Our Core Values</h2>
            <div className="divider" />
          </div>
          <div className="grid-4">
            {values.map((v, i) => (
              <div key={v.title} className={`about-value-card fade-up stagger-${i + 1}`}>
                <div className="about-value-card__icon"><i className={v.icon} /></div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section section--dark" ref={s3}>
        <div className="container">
          <div className="section-header">
            <span className="section-label section-label--white">Our Journey</span>
            <h2 className="text-white">From One Room<br />to a Nationwide Movement</h2>
            <div className="divider" />
          </div>
          <div className="timeline">
            {milestones.map((m, i) => (
              <div key={m.year} className={`timeline-item fade-up stagger-${(i % 4) + 1} ${i % 2 === 0 ? 'timeline-item--left' : 'timeline-item--right'}`}>
                <div className="timeline-item__dot" />
                <div className="timeline-item__content">
                  <span className="timeline-item__year">{m.year}</span>
                  <p>{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" ref={s4}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">The Team</span>
            <h2>The People Behind Every Meal</h2>
            <div className="divider" />
          </div>
          <div className="grid-3">
            {team.map((member, i) => (
              <div key={member.name} className={`team-card fade-up stagger-${i + 1}`}>
                <div className="team-card__image">
                  <img src={member.img} alt={member.name} />
                </div>
                <div className="team-card__info">
                  <h4>{member.name}</h4>
                  <span className="team-card__role">{member.role}</span>
                  <p>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta-bar">
        <div className="container about-cta-bar__content">
          <div>
            <h3>Ready to Eat What's Right?</h3>
            <p>Join 10,000+ people who chose clean eating over compromise.</p>
          </div>
          <div className="about-cta-bar__actions">
            <Link to="/subscription" className="btn btn--primary btn--lg">Start Your Plan</Link>
            <Link to="/contact" className="btn btn--outline btn--lg">Talk to Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
