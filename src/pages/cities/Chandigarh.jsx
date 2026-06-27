import { Link } from 'react-router-dom'
import PageMeta from '../../components/PageMeta'
import './CityPage.css'

const benefits = [
  { icon: 'fas fa-weight', title: 'Weight Loss Plans', desc: 'Calorie-deficit meal plans with high protein to help you lose fat while preserving muscle mass.' },
  { icon: 'fas fa-dumbbell', title: 'Muscle Gain Meals', desc: '35–55g protein per meal to fuel workouts, support recovery, and build lean muscle.' },
  { icon: 'fas fa-graduation-cap', title: 'Student Plans', desc: 'Affordable healthy meal plans for students at PU, NIFT, and other Chandigarh institutions.' },
  { icon: 'fas fa-heartbeat', title: 'Medical Diet Plans', desc: 'Customised plans for PCOS, diabetes, thyroid, and other health conditions.' },
  { icon: 'fas fa-leaf', title: 'Clean Eating', desc: 'No maida, no preservatives. Real whole food ingredients cooked fresh every morning.' },
  { icon: 'fas fa-truck', title: 'Daily Delivery', desc: 'Fresh meals delivered across Chandigarh, Mohali, Panchkula, and Kharar every morning.' },
]

const areas = ['Sector 32', 'Sector 70 Mohali', 'Sector 17', 'Sector 22', 'Sector 35', 'Panchkula', 'Kharar', 'Zirakpur', 'Aerocity', 'IT Park Mohali']

const meals = [
  { name: 'Double Paneer Tikka Sandwich', cal: '380 kcal', protein: '26g protein', img: '/brand_assets/Double panner tikka sandwich.webp' },
  { name: 'Curried Chole Bowl', cal: '380 kcal', protein: '18g protein', img: '/brand_assets/curried chole bowl.webp' },
  { name: 'Nutella Protein Pancakes', cal: '380 kcal', protein: '28g protein', img: '/brand_assets/Nuttela Pancake.webp' },
]

const testimonials = [
  { text: 'Started at Dr Diet when I was studying in Chandigarh. Lost 8kg in 6 weeks and my energy levels went through the roof. The food is so good I cancelled my hostel mess subscription.', name: 'Ananya Singh', role: 'Student, Chandigarh University', rating: 5 },
  { text: 'Living in Mohali and working in IT Park, I had zero time to cook. Dr Diet solved it. Fresh meals at my door every morning. Highly recommend for anyone in the Tricity area.', name: 'Harpreet Kaur', role: 'IT Professional, Mohali', rating: 5 },
]

export default function Chandigarh() {
  return (
    <>
      <PageMeta
        title="Healthy Meal Plans in Chandigarh & Mohali – Dr Diet"
        description="Dr Diet delivers fresh, calorie-counted healthy meal plans across Chandigarh, Mohali, Panchkula & Kharar. Plans for weight loss, muscle gain & students from ₹199/day."
        canonical="/healthy-meals-chandigarh"
        ogImage="/brand_assets/Double panner tikka sandwich.webp"
      />

      <section className="page-hero city-hero">
        <div className="container">
          <span className="section-label section-label--white">Chandigarh</span>
          <h1>Healthy Meal Plans in Chandigarh<br />& Mohali for Every Goal</h1>
          <p>Fresh, calorie-counted, high-protein meals delivered daily across the Tricity. Starting at ₹199/day.</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '32px' }}>
            <Link to="/subscription#get-started" className="btn btn--primary btn--lg">Start My Plan</Link>
            <a href="https://wa.me/917015732242?text=I want a healthy meal plan in Chandigarh" target="_blank" rel="noopener noreferrer" className="btn btn--outline btn--lg" style={{ borderColor: 'rgba(255,255,255,0.6)', color: '#fff' }}>
              <i className="fab fa-whatsapp" /> Chat With Us
            </a>
          </div>
        </div>
      </section>

      <section className="section city-intro-section">
        <div className="container">
          <p>
            Dr Diet provides healthy meal delivery services in Chandigarh, Mohali, Panchkula, and Kharar. Our plans are ideal for working professionals, students, gym-goers, and individuals looking for weight loss or muscle gain diets in the Tricity region.
          </p>
          <p>
            Founded in Chandigarh, Dr Diet is a homegrown brand that understands the Tricity lifestyle. From our kitchen in Sector 70 Mohali, we deliver freshly cooked, calorie-counted meals every morning — so whether you are a student at PU, a professional at IT Park Mohali, or a gym enthusiast in Panchkula, healthy eating is always on time.
          </p>
          <p>
            Every meal is macro-tracked, freshly cooked, and customised to your goal. No frozen food, no preservatives, no shortcuts. Just real, clean Indian food delivered to your door every day.
          </p>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <div className="section-header">
            <span className="section-label section-label--dark">Why Dr Diet Chandigarh</span>
            <h2>Tricity's Most Trusted Healthy Meal Service</h2>
            <div className="divider" />
          </div>
          <div className="city-benefits-grid">
            {benefits.map((b) => (
              <div key={b.title} className="city-benefit-card">
                <div className="city-benefit-card__icon"><i className={b.icon} /></div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section city-areas-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label section-label--dark">Delivery Areas</span>
            <h2>We Deliver Across the Tricity</h2>
            <div className="divider" />
          </div>
          <div className="city-areas-grid">
            {areas.map((a) => <div key={a} className="city-area-pill">{a}</div>)}
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <div className="section-header">
            <span className="section-label section-label--dark">Sample Meals</span>
            <h2>What's on Your Plate</h2>
            <div className="divider" />
          </div>
          <div className="city-meals-grid">
            {meals.map((m) => (
              <div key={m.name} className="city-meal-card">
                <img src={m.img} alt={m.name} loading="lazy" />
                <div className="city-meal-card__info">
                  <h4>{m.name}</h4>
                  <span>{m.cal} · {m.protein}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link to="/menu" className="btn btn--dark">View Full Menu <i className="fas fa-arrow-right" /></Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Customer Reviews</span>
            <h2>What Chandigarh Customers Say About Dr Diet</h2>
            <div className="divider" />
          </div>
          <div className="city-testimonial-grid">
            {testimonials.map((t) => (
              <div key={t.name} className="city-testimonial-card">
                <div className="city-testimonial-stars">{Array.from({ length: t.rating }).map((_, i) => <i key={i} className="fas fa-star" />)}</div>
                <p>"{t.text}"</p>
                <div className="city-testimonial-card__author">
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section city-cta-section" style={{ textAlign: 'center' }}>
        <div className="container">
          <span className="section-label section-label--white">Get Started</span>
          <h2>Start Your Healthy Meal Plan in Chandigarh Today</h2>
          <p>Join thousands of Tricity residents eating right every day. Plans from ₹199/day.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/subscription#get-started" className="btn btn--primary btn--lg">Start My Plan</Link>
            <a href="https://wa.me/917015732242?text=I want a healthy meal plan in Chandigarh" target="_blank" rel="noopener noreferrer" className="btn btn--outline btn--lg">
              <i className="fab fa-whatsapp" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
