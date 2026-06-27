import { Link } from 'react-router-dom'
import PageMeta from '../../components/PageMeta'
import './CityPage.css'

const benefits = [
  { icon: 'fas fa-briefcase', title: 'Office Meal Plans', desc: 'Portioned, macro-tracked meals ideal for corporate professionals in DLF, Cyber City, and Sohna Road.' },
  { icon: 'fas fa-weight', title: 'Weight Loss Plans', desc: 'Calorie-deficit meals designed for busy professionals who want to lose weight without spending hours cooking.' },
  { icon: 'fas fa-dumbbell', title: 'Muscle Gain Meals', desc: 'High-protein (35–55g) meals to fuel your gym sessions and support muscle recovery.' },
  { icon: 'fas fa-heartbeat', title: 'Medical Diet Plans', desc: 'Nutrition-first plans for PCOS, diabetes, and lifestyle conditions — aligned with your doctor\'s advice.' },
  { icon: 'fas fa-leaf', title: 'Clean Eating', desc: 'Zero maida, zero preservatives, zero seed oils. Real Indian food made healthy.' },
  { icon: 'fas fa-truck', title: 'Daily Delivery', desc: 'Fresh meals delivered to your office or home across Gurgaon before 9am.' },
]

const areas = ['DLF City', 'Sector 28', 'Sohna Road', 'Golf Course Road', 'MG Road', 'Cyber City', 'Palam Vihar', 'Sector 56', 'South City', 'Udyog Vihar']

const meals = [
  { name: 'Stuffed Chicken Breast', cal: '480 kcal', protein: '46g protein', img: '/brand_assets/Juiciest stuffed chicken breast.webp' },
  { name: 'Thai Curry Bowl', cal: '480 kcal', protein: '38g protein', img: '/brand_assets/Thai curry bowl.webp' },
  { name: 'Mexican Protein Wrap', cal: '440 kcal', protein: '32g protein', img: '/brand_assets/Maxican Protein Wrap.webp' },
]

const testimonials = [
  { text: 'Working in Cyber City with long hours made eating healthy impossible. Dr Diet changed that. My lunch is delivered by 12:30 every day — perfectly portioned and delicious.', name: 'Vikram Singh', role: 'Software Engineer, DLF Phase 2', rating: 5 },
  { text: 'Lost 8kg in 6 weeks without stepping into a kitchen. Dr Diet handles everything. Perfect for the Gurgaon work lifestyle.', name: 'Sneha Kapoor', role: 'Marketing Manager, Sohna Road', rating: 5 },
]

export default function Gurgaon() {
  return (
    <>
      <PageMeta
        title="Diet Food Delivery in Gurgaon – Healthy Meal Plans for Professionals | Dr Diet"
        description="Dr Diet delivers healthy, calorie-counted meal plans in Gurgaon including DLF City, Sohna Road & Cyber City. High-protein meals for weight loss, muscle gain & busy professionals. From ₹199/day."
        canonical="/diet-food-gurgaon"
        ogImage="/brand_assets/Juiciest stuffed chicken breast.webp"
      />

      <section className="page-hero city-hero">
        <div className="container">
          <span className="section-label section-label--white">Gurgaon</span>
          <h1>Diet Food Delivery in Gurgaon<br />for Professionals & Fitness Goals</h1>
          <p>Healthy, calorie-counted meals delivered to your office or home across Gurgaon. Starting at ₹199/day.</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '32px' }}>
            <Link to="/subscription#get-started" className="btn btn--primary btn--lg">Start My Plan</Link>
            <a href="https://wa.me/917015732242?text=I want a healthy meal plan in Gurgaon" target="_blank" rel="noopener noreferrer" className="btn btn--outline btn--lg" style={{ borderColor: 'rgba(255,255,255,0.6)', color: '#fff' }}>
              <i className="fab fa-whatsapp" /> Chat With Us
            </a>
          </div>
        </div>
      </section>

      <section className="section city-intro-section">
        <div className="container">
          <p>
            Dr Diet provides healthy diet food delivery services in Gurgaon including DLF City IV, Sector 28, Sohna Road, and Cyber City. Our meal plans are specially designed for corporate professionals, gym-goers, and individuals looking for weight loss or muscle gain diets in Gurugram.
          </p>
          <p>
            Gurgaon's fast-paced corporate lifestyle leaves little time for meal prep. Dr Diet solves this by delivering freshly cooked, calorie-counted meals to your doorstep or office every morning — so you can focus on your work while we take care of your nutrition.
          </p>
          <p>
            Whether you need a high-protein diet plan in Gurgaon for muscle gain, a calorie-deficit plan for weight loss, or simply healthy office tiffin — Dr Diet customises your meals around your specific goal, calorie target, and food preference.
          </p>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <div className="section-header">
            <span className="section-label section-label--dark">Why Dr Diet Gurgaon</span>
            <h2>Meal Plans Built for the Gurgaon Lifestyle</h2>
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
            <h2>We Deliver Across Gurgaon</h2>
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
            <h2>What Gurgaon Customers Say About Dr Diet</h2>
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
          <h2>Start Your Healthy Meal Plan in Gurgaon Today</h2>
          <p>Join working professionals across Gurugram who eat right every day. Plans from ₹199/day.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/subscription#get-started" className="btn btn--primary btn--lg">Start My Plan</Link>
            <a href="https://wa.me/917015732242?text=I want a healthy meal plan in Gurgaon" target="_blank" rel="noopener noreferrer" className="btn btn--outline btn--lg">
              <i className="fab fa-whatsapp" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
