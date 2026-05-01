import { Link } from 'react-router-dom'
import PageMeta from '../../components/PageMeta'
import './CityPage.css'

const benefits = [
  { icon: 'fas fa-weight', title: 'Weight Loss Meals', desc: 'Calorie-deficit plans designed for sustainable fat loss. High protein, low empty calories, zero maida.' },
  { icon: 'fas fa-dumbbell', title: 'Muscle Gain Plans', desc: 'High-protein meals with 35–55g protein per serving to support muscle building and recovery.' },
  { icon: 'fas fa-briefcase', title: 'Office-Friendly Plans', desc: 'Portioned, labelled, ready-to-eat meals delivered before your work day starts. No prep needed.' },
  { icon: 'fas fa-heartbeat', title: 'Medical Diet Plans', desc: 'Customised nutrition for PCOS, diabetes, thyroid, and other health conditions.' },
  { icon: 'fas fa-leaf', title: 'Clean Eating', desc: 'No preservatives, no refined flour, no seed oils. Just real, whole ingredients cooked fresh daily.' },
  { icon: 'fas fa-truck', title: 'Daily Fresh Delivery', desc: 'Cooked every morning and delivered to your door across South, West, and Central Delhi.' },
]

const areas = ['Malviya Nagar', 'Lajpat Nagar', 'Rajouri Garden', 'Karol Bagh', 'Saket', 'Greater Kailash', 'Hauz Khas', 'Vasant Kunj', 'Dwarka', 'Rohini', 'Pitampura', 'Janakpuri']

const meals = [
  { name: 'Grilled Chicken Rice Bowl', cal: '420 kcal', protein: '38g protein', img: '/brand_assets/Chicken Brown rice Landscape.webp' },
  { name: 'Achari Paneer Bowl', cal: '380 kcal', protein: '32g protein', img: '/brand_assets/achari paneer bowl.webp' },
  { name: 'Chicken Tikka Wrap', cal: '460 kcal', protein: '36g protein', img: '/brand_assets/Chicken Tikka Wrap.webp' },
]

const testimonials = [
  { text: 'Lost 12kg in 3 months with Dr Diet. The meals are genuinely delicious and I never felt like I was on a diet. Best decision I made for my health.', name: 'Priya Sharma', role: 'Working Professional, South Delhi', rating: 5 },
  { text: 'As a gym-goer in Delhi, finding high-protein meals used to be a nightmare. Dr Diet solved it completely. 40g+ protein per meal and it actually tastes great.', name: 'Rahul Mehta', role: 'Fitness Enthusiast, West Delhi', rating: 5 },
]

export default function Delhi() {
  return (
    <>
      <PageMeta
        title="Healthy Meal Plans in Delhi – Weight Loss & High-Protein Meals | Dr Diet"
        description="Dr Diet delivers calorie-counted, high-protein healthy meal plans in Delhi including Malviya Nagar, Lajpat Nagar, Rajouri Garden & Karol Bagh. Plans from ₹199/day for weight loss, muscle gain & office professionals."
        canonical="/healthy-meal-plan-delhi"
        ogImage="/brand_assets/Chicken Brown rice Landscape.webp"
      />

      <section className="page-hero city-hero">
        <div className="container">
          <span className="section-label section-label--white">Delhi</span>
          <h1>Healthy Meal Plans in Delhi<br />for Weight Loss & Fitness</h1>
          <p>Calorie-counted, high-protein meals delivered fresh daily across Delhi. Starting at ₹199/day.</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '32px' }}>
            <Link to="/subscription" className="btn btn--primary btn--lg">Start My Plan</Link>
            <a href="https://wa.me/917015732242?text=I want a healthy meal plan in Delhi" target="_blank" rel="noopener noreferrer" className="btn btn--outline btn--lg" style={{ borderColor: 'rgba(255,255,255,0.6)', color: '#fff' }}>
              <i className="fab fa-whatsapp" /> Chat With Us
            </a>
          </div>
        </div>
      </section>

      <section className="section city-intro-section">
        <div className="container">
          <p>
            Dr Diet provides healthy meal delivery services in Delhi including Malviya Nagar, Lajpat Nagar, Rajouri Garden, and Karol Bagh. Our customised meal plans are ideal for working professionals, gym-goers, and individuals looking for weight loss or muscle gain diets in Delhi.
          </p>
          <p>
            Every meal is freshly cooked in our HACCP-certified kitchen each morning and delivered to your doorstep before your day begins. No frozen meals, no reheating — just calorie-counted, macro-balanced Indian food that helps you hit your health goals without sacrificing taste.
          </p>
          <p>
            Whether you are looking for a weight loss diet plan in Delhi, a high-protein muscle gain meal subscription, or simply healthy tiffin service for office — Dr Diet has a plan designed specifically for your goal and lifestyle.
          </p>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <div className="section-header">
            <span className="section-label section-label--dark">Why Dr Diet Delhi</span>
            <h2>Meal Plans for Every Goal in Delhi</h2>
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
            <h2>We Deliver Across Delhi</h2>
            <div className="divider" />
            <p style={{ color: 'var(--text-muted)' }}>Healthy meal delivery available in these areas of Delhi and surrounding neighbourhoods.</p>
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
            <h2>What Delhi Customers Say About Dr Diet</h2>
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
          <h2>Start Your Healthy Meal Plan in Delhi Today</h2>
          <p>Join thousands of Delhi residents eating right every day. Plans from ₹199/day.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/subscription" className="btn btn--primary btn--lg">Start My Plan</Link>
            <a href="https://wa.me/917015732242?text=I want a healthy meal plan in Delhi" target="_blank" rel="noopener noreferrer" className="btn btn--outline btn--lg">
              <i className="fab fa-whatsapp" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
