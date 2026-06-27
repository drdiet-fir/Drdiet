import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Locations.css'

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

const locations = [
  {
    city: 'Delhi',
    branches: [
      { name: 'Malviya Nagar', address: 'D-89, near Karnataka Bank, DDA Flats, Malviya Nagar, New Delhi 110017', hours: 'Mon–Sun: 8am–9pm', delivery: 'South Delhi' },
      { name: 'Lajpat Nagar',  address: 'D-166, Block D, Lajpat Nagar I, New Delhi 110024',                      hours: 'Mon–Sun: 8am–9pm', delivery: 'Central South Delhi' },
      { name: 'Rajouri Garden', address: 'Rajouri Garden, West Delhi',                                            hours: 'Mon–Sun: 8am–9pm', delivery: 'West Delhi' },
      { name: 'Karol Bagh',     address: 'Karol Bagh, New Delhi',                                                hours: 'Mon–Sun: 8am–9pm', delivery: 'Central Delhi' },
    ],
    img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80',
  },
  {
    city: 'Gurgaon',
    branches: [
      { name: 'Sector 28, DLF City IV', address: 'F3CP+286, Sector 28, DLF City IV, Gurugram, Haryana 122009', hours: 'Mon–Sun: 8am–9pm', delivery: 'DLF City, Gurgaon' },
      { name: 'Sapphire Mall, Sohna Road', address: 'Sapphire Mall, Sohna Road, Gurugram, Haryana',              hours: 'Mon–Sun: 8am–9pm', delivery: 'Sohna Road, Gurugram' },
    ],
    img: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=80',
  },
  {
    city: 'Noida',
    branches: [
      { name: 'Sector 73', address: 'Royal Avenue St, Sector 73, Noida, Uttar Pradesh 201316', hours: 'Mon–Sun: 8am–9pm', delivery: 'Sector 73, 74 & 75, Noida' },
    ],
    img: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=600&q=80',
  },
  {
    city: 'Chandigarh / Mohali',
    branches: [
      { name: 'Chandigarh – Sector 32', address: 'Sco no. 285/2, Sector 32D, Chandigarh 160030',                                       hours: 'Mon–Sun: 8am–9pm', delivery: 'Chandigarh & Panchkula' },
      { name: 'Mohali – Sector 70',     address: 'Plot no. 201, Mattaur Rd, Sector 70, Sahibzada Ajit Singh Nagar, Punjab 160071', hours: 'Mon–Sun: 8am–9pm', delivery: 'Mohali & SAS Nagar' },
      { name: 'Panchkula',              address: 'Panchkula, Haryana',                                                                hours: 'Mon–Sun: 8am–9pm', delivery: 'Panchkula' },
      { name: 'Kharar',                 address: 'Kharar, SAS Nagar, Punjab',                                                         hours: 'Mon–Sun: 8am–9pm', delivery: 'Kharar & Kurali' },
    ],
    img: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80',
  },
  {
    city: 'Bengaluru',
    branches: [
      { name: 'Hebbal', address: 'Shop no 23, Sharadha Complex, Kempapura Main Rd, opp. Muthoot Finance, Hebbal, Bengaluru 560023', hours: 'Mon–Sun: 8am–9pm', delivery: 'Hebbal & North Bengaluru' },
    ],
    img: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&q=80',
  },
]

export default function Locations() {
  const s1 = useReveal()
  const s2 = useReveal()

  return (
    <>
      <section className="page-hero locations-hero">
        <div className="container">
          <span className="section-label section-label--white">Find Us</span>
          <h1>Dr Diet Across<br />India</h1>
          <p>12 outlets across 5 cities. Fresh, healthy meals delivered daily.</p>
        </div>
      </section>

      {/* City sections */}
      <section className="section locations-section" ref={s1}>
        <div className="container">
          {locations.map((loc, i) => (
            <div key={loc.city} className={`location-city fade-up stagger-${(i % 3) + 1} ${loc.comingSoon ? 'location-city--soon' : ''}`}>
              <div className="location-city__header">
                <div className="location-city__image">
                  <img src={loc.img} alt={loc.city} />
                  {loc.comingSoon && <div className="location-city__soon-badge">Coming Soon</div>}
                </div>
                <div className="location-city__meta">
                  <h2>{loc.city}</h2>
                  <p>{loc.branches.length} {loc.branches.length === 1 ? 'Branch' : 'Branches'}</p>
                </div>
              </div>
              <div className="location-branches">
                {loc.branches.map((branch) => (
                  <div key={branch.name} className="location-branch-card">
                    <div className="location-branch-card__info">
                      <h4>{branch.name}</h4>
                      <div className="location-branch-card__details">
                        <span><i className="fas fa-map-marker-alt" /> {branch.address}</span>
                        <span><i className="fas fa-clock" /> {branch.hours}</span>
                        <span><i className="fas fa-truck" /> Delivery: {branch.delivery}</span>
                      </div>
                    </div>
                    <div className="location-branch-card__actions">
                      <a href="https://wa.me/917015732242" target="_blank" rel="noopener noreferrer" className="btn btn--outline-dark btn--sm">
                        <i className="fab fa-whatsapp" /> WhatsApp
                      </a>
                      <a href={`https://maps.google.com?q=Dr+Diet+${encodeURIComponent(branch.name)}`} target="_blank" rel="noopener noreferrer" className="btn btn--dark btn--sm">
                        <i className="fas fa-map" /> Get Directions
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Delivery zones */}
      <section className="section section--dark" ref={s2}>
        <div className="container">
          <div className="section-header">
            <span className="section-label section-label--white">Delivery</span>
            <h2 className="text-white">We Deliver Fresh,<br />Wherever You Are</h2>
            <div className="divider" />
            <p style={{ color: 'rgba(245,237,225,0.7)' }}>Real food. Real health. Right at your doorstep.</p>
          </div>
          <div className="delivery-features">
            {[
              { icon: 'fas fa-fire-alt',       title: 'Fresh Meals Daily',              desc: 'Cooked fresh every morning and delivered the same day. No freezing, no reheating.' },
              { icon: 'fas fa-dumbbell',        title: 'High Protein & Calorie-Counted', desc: 'Every meal is macro-tracked and designed around your health goal.' },
              { icon: 'fas fa-map-marker-alt',  title: 'Delhi, Gurgaon, Noida & More',  desc: '12 outlets across 5 cities, with more locations coming soon.' },
              { icon: 'fas fa-motorcycle',      title: 'Order on Swiggy & Zomato',       desc: 'Search "Dr. Diet" on your favourite food delivery app and order in minutes.' },
            ].map((f, i) => (
              <div key={f.title} className={`delivery-feature fade-up stagger-${i + 1}`}>
                <div className="delivery-feature__icon"><i className={f.icon} /></div>
                <h4 className="text-white">{f.title}</h4>
                <p style={{ color: 'rgba(245,237,225,0.65)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '56px' }}>
            <Link to="/subscription#get-started" className="btn btn--primary btn--lg">
              Start Your Plan <i className="fas fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
