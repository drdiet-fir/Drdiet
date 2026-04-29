import { useState, useEffect, useRef } from 'react'
import './Careers.css'

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

const openings = [
  { id: 1, title: 'Senior Nutritionist', dept: 'Nutrition', location: 'Delhi', type: 'Full-time', desc: 'Lead client nutrition consultations, design customized meal plans, and drive transformation outcomes for our growing subscriber base.' },
  { id: 2, title: 'Head Chef – New Branch', dept: 'Kitchen', location: 'Bengaluru', type: 'Full-time', desc: 'Lead kitchen operations for our new Bengaluru branch. Must have 5+ years in high-volume food production and a passion for healthy cooking.' },
  { id: 3, title: 'Digital Marketing Manager', dept: 'Marketing', location: 'Delhi', type: 'Full-time', desc: "Own our digital marketing strategy across social, paid, and SEO. We're growing fast and need someone who can grow with us." },
  { id: 4, title: 'Customer Success Specialist', dept: 'Operations', location: 'Remote', type: 'Full-time', desc: 'Be the voice of Dr Diet for our customers. Handle onboarding, check-ins, and ensure every subscriber feels supported on their journey.' },
  { id: 5, title: 'Delivery Fleet Coordinator', dept: 'Logistics', location: 'Gurgaon', type: 'Full-time', desc: 'Manage our delivery fleet to ensure meals arrive on time, every time. Experience in logistics coordination required.' },
  { id: 6, title: 'Social Media Content Creator', dept: 'Marketing', location: 'Delhi', type: 'Part-time', desc: 'Create engaging content for our Instagram, TikTok, and Snapchat. Food photography and video editing skills a must.' },
]

const perks = [
  { icon: 'fas fa-utensils', title: 'Free Meals', desc: 'All Dr Diet meals on us, every day.' },
  { icon: 'fas fa-chart-line', title: 'Growth Path', desc: 'We promote from within and invest in your career.' },
  { icon: 'fas fa-heart', title: 'Health Insurance', desc: 'Comprehensive medical coverage for you and family.' },
  { icon: 'fas fa-om', title: 'Flexible Hours', desc: 'Flexible work schedule that respects your work-life balance.' },
  { icon: 'fas fa-plane', title: 'Annual Leave', desc: '21 days + national holidays as per Indian labor law.' },
  { icon: 'fas fa-graduation-cap', title: 'Training', desc: 'Annual learning budget for courses & certifications.' },
]

export default function Careers() {
  const [activeJob, setActiveJob] = useState(null)
  const [filter, setFilter] = useState('All')
  const s1 = useReveal()
  const s2 = useReveal()

  const departments = ['All', ...new Set(openings.map((o) => o.dept))]
  const filtered = filter === 'All' ? openings : openings.filter((o) => o.dept === filter)

  return (
    <>
      <section className="page-hero careers-hero">
        <div className="container">
          <span className="section-label section-label--white">Join the Team</span>
          <h1>Build a Career<br />That Transforms Lives</h1>
          <p>At Dr Diet, we're not just delivering meals. We're changing how India eats. Join us and be part of something meaningful.</p>
        </div>
      </section>

      {/* Culture */}
      <section className="section careers-culture" ref={s1}>
        <div className="container">
          <div className="careers-culture__grid">
            <div className="fade-up">
              <span className="section-label section-label--dark">Our Culture</span>
              <h2>Where Passion Meets Purpose</h2>
              <div className="divider divider--left" />
              <p>We're a team of nutritionists, chefs, technologists, and marketers united by one belief: that what you eat shapes who you become. We work hard, we eat well, and we celebrate every transformation, our customers' and our team's.</p>
              <p style={{marginTop:'16px'}}>If you're driven, care about your craft, and want your work to genuinely matter, you'll fit right in.</p>
            </div>
            <div className="careers-culture__images fade-up stagger-2">
              <img src="https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=500&q=80" alt="Dr Diet team" className="careers-culture__img1" />
              <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80" alt="Kitchen team" className="careers-culture__img2" />
            </div>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="section section--cream">
        <div className="container">
          <div className="section-header">
            <span className="section-label section-label--dark">Benefits</span>
            <h2>Why Work at Dr Diet</h2>
            <div className="divider" />
          </div>
          <div className="grid-3">
            {perks.map((perk, i) => (
              <div key={perk.title} className="careers-perk fade-up">
                <div className="careers-perk__icon"><i className={perk.icon} /></div>
                <h4>{perk.title}</h4>
                <p>{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job openings */}
      <section className="section" ref={s2}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Open Positions</span>
            <h2>Current Openings</h2>
            <div className="divider" />
          </div>

          <div className="careers-filters">
            {departments.map((d) => (
              <button key={d} className={`menu-filter-btn ${filter === d ? 'menu-filter-btn--active' : ''}`} onClick={() => setFilter(d)}>
                {d}
              </button>
            ))}
          </div>

          <div className="careers-jobs">
            {filtered.map((job, i) => (
              <div key={job.id} className={`careers-job-card fade-up stagger-${(i % 3) + 1} ${activeJob === job.id ? 'careers-job-card--open' : ''}`}>
                <div className="careers-job-card__header" onClick={() => setActiveJob(activeJob === job.id ? null : job.id)}>
                  <div>
                    <h4>{job.title}</h4>
                    <div className="careers-job-card__meta">
                      <span><i className="fas fa-building" /> {job.dept}</span>
                      <span><i className="fas fa-map-marker-alt" /> {job.location}</span>
                      <span className={`badge ${job.type === 'Full-time' ? 'badge--primary' : 'badge--accent'}`}>{job.type}</span>
                    </div>
                  </div>
                  <i className={`fas fa-chevron-${activeJob === job.id ? 'up' : 'down'} careers-job-card__chevron`} />
                </div>
                {activeJob === job.id && (
                  <div className="careers-job-card__body">
                    <p>{job.desc}</p>
                    <div className="careers-job-card__actions">
                      <a href={`https://wa.me/917015732242?text=I'd like to apply for the ${job.title} position`} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                        <i className="fab fa-whatsapp" /> Apply via WhatsApp
                      </a>
                      <a href="mailto:careers@drdiet.com?subject=Application: Dr Diet" className="btn btn--outline-dark">
                        <i className="fas fa-envelope" /> Send CV by Email
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="careers-general">
            <p>Don't see the right role? We're always looking for exceptional people.</p>
            <a href="mailto:careers@drdiet.com" className="btn btn--dark">
              <i className="fas fa-paper-plane" /> Send Us Your CV
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
