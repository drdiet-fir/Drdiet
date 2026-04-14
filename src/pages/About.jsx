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
  { name: 'Dr. Yasser Al-Khamis', role: 'Founder & Chief Nutritionist', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80', bio: 'PhD in Clinical Nutrition from King Saud University. 15+ years transforming lives through food science.' },
  { name: 'Nada Al-Otaibi', role: 'Head Chef & Menu Director', img: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=400&q=80', bio: 'Trained in Dubai and London. Believes healthy food must always be delicious first.' },
  { name: 'Omar Bahamdan', role: 'Operations & Growth Director', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80', bio: 'Scaled Dr Diet from one kitchen to 12 locations across KSA in 3 years.' },
]

const values = [
  { icon: 'fas fa-microscope', title: 'Science First', desc: 'Every meal plan is grounded in peer-reviewed nutritional research — not trends or fads.' },
  { icon: 'fas fa-heart', title: 'Genuinely Cares', desc: 'We measure success by your transformation, not just your subscription renewal.' },
  { icon: 'fas fa-seedling', title: 'Real Ingredients', desc: 'Clean, fresh, traceable. We know exactly what goes into every meal we deliver.' },
  { icon: 'fas fa-handshake', title: 'Long-Term Partnership', desc: "We're not a quick fix - we're a lifestyle partner committed to your ongoing health." },
]

const milestones = [
  { year: '2018', event: 'Dr Diet founded in Riyadh with 3 customers and 1 kitchen' },
  { year: '2019', event: 'Expanded to Jeddah. Reached 500 active subscribers' },
  { year: '2020', event: 'Launched digital subscription platform. 2,000+ customers' },
  { year: '2021', event: 'Opened Dammam branch. Won Best Nutrition Brand in KSA' },
  { year: '2022', event: 'Launched B2B & Catering division. 5,000+ customers' },
  { year: '2023', event: 'Franchise model launched. 12 locations across KSA' },
  { year: '2024', event: '10,000+ active customers. 500,000 meals delivered' },
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
          <h1>We Believe Food<br />Is Medicine</h1>
          <p>Dr Diet was born from a simple truth: you can't transform your body without transforming your plate. Since 2018, we've been on a mission to make proper nutrition accessible to everyone.</p>
        </div>
      </section>

      {/* Mission */}
      <section className="section about-mission" ref={s1}>
        <div className="container">
          <div className="about-mission__grid">
            <div className="about-mission__image fade-up">
              <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80" alt="Dr Diet kitchen" />
              <div className="about-mission__badge">
                <span className="about-mission__badge-num">6+</span>
                <span>Years of Excellence</span>
              </div>
            </div>
            <div className="about-mission__content fade-up stagger-2">
              <span className="section-label section-label--dark">Our Mission</span>
              <h2>To Transform Every Saudi Household Through the Power of Nutrition</h2>
              <div className="divider divider--left" />
              <p>We started Dr Diet because we saw too many people working hard in the gym but failing in the kitchen. Not because they lacked willpower, but because they lacked access — to proper meal plans, clean food, and expert guidance.</p>
              <p style={{marginTop:'16px'}}>Today, we deliver thousands of customized, chef-prepared meals across the Kingdom every single day. Our nutritionists, chefs, and support teams work together to ensure your meals are not just healthy — but something you genuinely look forward to eating.</p>
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
            <h2 className="text-white">From One Kitchen<br />to a Kingdom-Wide Movement</h2>
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
            <h2>The People Behind Your Transformation</h2>
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
            <h3>Ready to experience the Dr Diet difference?</h3>
            <p>Join 10,000+ people already eating what's right.</p>
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
