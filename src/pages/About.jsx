import { useEffect, useRef } from 'react'
import PageHero from '../components/PageHero'
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
    bio: 'Started Dr Diet to solve the problem of unhealthy, inaccessible food for students and working professionals. Built from a small 10x8 room in Chandigarh to 17 outlets across 5 cities in India. Still actively involved in the kitchen every day.',
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
  { icon: '/brand_assets/about/value-icon-1.svg', title: 'Real Nutrition', desc: 'Transparent macros, honest ingredients, no shortcuts.' },
  { icon: '/brand_assets/about/value-icon-2.svg', title: 'Desi at Heart', desc: 'Indian flavours you love, made for your body.' },
  { icon: '/brand_assets/about/value-icon-3.svg', title: 'Taste First', desc: 'Healthy food should taste good. Always.' },
  { icon: '/brand_assets/about/value-icon-4.svg', title: 'Accessible Health', desc: '17 outlets, 5 cities, health on your doorstep.' },
]

const pressItems = [
  {
    source: 'StartupPedia',
    headline: 'Seeing Students Lack Proper Nutrition, This Lawyer Built a Cloud Kitchen Offering High-Protein Meals for ₹200, Clocking ₹10 Crore Annually',
    date: 'March 2026',
    logo: '📰',
    url: 'https://startuppedia.in/smbs/seeing-students-lack-proper-nutrition-this-lawyer-built-a-cloud-kitchen-offering-high-protein-meals-for-200-clocking-10-crore-annually-11247428',
  },
]

const milestones = [
  { year: '2019', event: 'Started in a 10×8 room in Chandigarh. First meals at ₹99.', img: '/brand_assets/about/timeline-2019.png' },
  { year: '2020', event: "COVID shutdown. Lost entire investment. Restarted with landlord's support.", img: '/brand_assets/about/timeline-2020.png' },
  { year: '2021', event: 'Official relaunch. New kitchen, team of 5 chefs, listed on Swiggy & Zomato.', img: '/brand_assets/about/timeline-2021.png' },
  { year: '2022–23', event: 'Expanded to Delhi, Noida, Gurgaon and Mohali via partner model.', img: '/brand_assets/about/timeline-2022.png' },
  { year: '2024', event: 'Crossed 14 outlets. Launched in Bengaluru. Cloud kitchens + QSR + Dine-in.', img: '/brand_assets/about/timeline-2024.png' },
  { year: '2025', event: '₹10 Cr+ annual revenue. Startup Pedia feature. Went viral nationally.', img: '/brand_assets/about/timeline-2025.png' },
  { year: '2026', event: 'Targeting ₹15–16 Cr. Expanding to Hyderabad, Pune & Mumbai.', img: '/brand_assets/about/timeline-2026.png' },
]

export default function About() {
  const s1 = useReveal()
  const s2 = useReveal()
  const s3 = useReveal()
  const s4 = useReveal()
  const s5 = useReveal()

  return (
    <>
      <PageHero
        title="From a 10x8 Room to 17 Outlets"
        subtitle="What started as a humble 10×8 kitchen has grown into 17 outlets across cities, bringing delicious, wholesome food closer to more people every day."
      />

      {/* Mission */}
      <section className="about-mission-v2" ref={s1}>
        <div className="about-mission-v2__bg">
          <div className="container about-mission-v2__grid">
            <div className="about-mission-v2__content fade-up">
              <span className="about-mission-v2__badge">Our Mission</span>
              <h2>To bring genuinely healthy, calorie-conscious Indian food to your doorstep.</h2>
              <div className="about-mission-v2__desc">
                <p>Because eating right should feel like a choice you're proud of, not a sacrifice. We started Dr Diet because we saw too many students and working professionals eating the wrong food: watery dal, maida chapatis, zero protein. Not because they lacked willpower, but because they lacked access.</p>
                <p>Today, we serve 2,000–2,500 people every day across Delhi, Chandigarh, and Bengaluru, with meals that are calorie-counted, macro-balanced, and genuinely delicious.</p>
              </div>
            </div>
            <div className="about-mission-v2__image fade-up stagger-2">
              <img className="about-mission-v2__composite" src="/brand_assets/about/mission-composite.png" alt="Dr Diet founder Mirnal Sethi" />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="about-values-v2" ref={s2}>
        <div className="container about-values-v2__inner">
          <h2>Our Core Values</h2>
          <div className="about-values-v2__grid">
            {values.map((v, i) => (
              <div key={v.title} className={`about-value-card-v2 fade-up stagger-${i + 1}`}>
                <div className="about-value-card-v2__icon"><img src={v.icon} alt="" /></div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey / Timeline */}
      <section className="about-journey-v2" ref={s3}>
        <div className="container about-journey-v2__inner">
          <div className="about-journey-v2__header">
            <h2>From One Room<br />to a Nationwide Movement</h2>
            <div className="about-journey-v2__accent" />
          </div>

          <div className="about-timeline-v2">
            <div className="about-timeline-v2__line" />
            {milestones.map((m, i) => (
              <div className={`about-timeline-v2__row fade-up stagger-${(i % 4) + 1} ${i % 2 === 1 ? 'about-timeline-v2__row--reverse' : ''}`} key={m.year}>
                <div className="about-timeline-v2__col about-timeline-v2__col--image">
                  <img src={m.img} alt={m.year} />
                </div>
                <div className="about-timeline-v2__connector">
                  <span className="about-timeline-v2__branch" />
                  <img className="about-timeline-v2__marker" src="/brand_assets/about/timeline-marker.svg" alt="" />
                </div>
                <div className="about-timeline-v2__col about-timeline-v2__col--text">
                  <div className="about-timeline-v2__card">
                    <span className="about-timeline-v2__year">{m.year}</span>
                    <p>{m.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-team-v2" ref={s4}>
        <div className="container about-team-v2__inner">
          <h2>The People Behind Every Meal</h2>
          <div className="about-team-v2__grid">
            {team.map((member, i) => (
              <div key={member.name} className={`about-team-card-v2 fade-up stagger-${i + 1}`}>
                <div className="about-team-card-v2__image">
                  <img src={member.img} alt={member.name} />
                </div>
                <div className="about-team-card-v2__content">
                  <div className="about-team-card-v2__identity">
                    <h3>{member.name}</h3>
                    <span className="about-team-card-v2__role">{member.role.toUpperCase()}</span>
                  </div>
                  <img className="about-team-card-v2__divider" src="/brand_assets/about/team-divider.svg" alt="" />
                  <p>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press */}
      <section className="about-press-v2" ref={s5}>
        <div className="container about-press-v2__inner">
          <h2>Dr Diet in the Media</h2>
          <div className="about-press-v2__grid">
            {pressItems.map((item, i) => (
              <a
                key={item.source}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`about-press-card-v2 fade-up stagger-${i + 1}`}
              >
                <div className="about-press-card-v2__logo">{item.logo} {item.source}</div>
                <h4 className="about-press-card-v2__headline">"{item.headline}"</h4>
                <span className="about-press-card-v2__date">{item.date}</span>
                <span className="about-press-card-v2__link">Read Article <i className="fas fa-arrow-up-right-from-square" /></span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
