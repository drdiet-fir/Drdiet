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
    city: 'Riyadh',
    branches: [
      { name: 'Riyadh – Al Olaya Branch', address: 'Al Olaya District, King Fahd Road', phone: '+966 11 000 0001', hours: 'Sun–Thu: 6am–10pm', delivery: 'All Riyadh Districts' },
      { name: 'Riyadh – Al Nakheel Branch', address: 'Al Nakheel District, Prince Mohammed Bin Salman Road', phone: '+966 11 000 0002', hours: 'Sun–Thu: 6am–10pm', delivery: 'North Riyadh' },
      { name: 'Riyadh – Al Malaz Branch', address: 'Al Malaz, Al Imam Saud Bin Abdul Aziz Road', phone: '+966 11 000 0003', hours: 'Sun–Thu: 6am–10pm', delivery: 'Central Riyadh' },
      { name: 'Riyadh – Al Diriyah Branch', address: 'Al Diriyah District, King Salman Road', phone: '+966 11 000 0004', hours: 'Sun–Thu: 6am–10pm', delivery: 'West Riyadh' },
    ],
    img: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&q=80',
  },
  {
    city: 'Jeddah',
    branches: [
      { name: 'Jeddah – Al Hamra Branch', address: 'Al Hamra District, Madinah Road', phone: '+966 12 000 0001', hours: 'Sun–Thu: 6am–10pm', delivery: 'Central Jeddah' },
      { name: 'Jeddah – Al Rawdah Branch', address: 'Al Rawdah District, Palestine Street', phone: '+966 12 000 0002', hours: 'Sun–Thu: 6am–10pm', delivery: 'North Jeddah' },
      { name: 'Jeddah – Al Andalus Branch', address: 'Al Andalus District, Abdullah Al-Omar Street', phone: '+966 12 000 0003', hours: 'Sun–Thu: 6am–10pm', delivery: 'South Jeddah' },
    ],
    img: 'https://images.unsplash.com/photo-1609183461561-34f2dc3f9ca9?w=600&q=80',
  },
  {
    city: 'Dammam',
    branches: [
      { name: 'Dammam – Al Faisaliah Branch', address: 'Al Faisaliah District, Prince Mohammed Bin Fahd Road', phone: '+966 13 000 0001', hours: 'Sun–Thu: 6am–10pm', delivery: 'Dammam & Khobar' },
      { name: 'Dammam – Al Shatea Branch', address: 'Al Shatea District, King Fahd Road', phone: '+966 13 000 0002', hours: 'Sun–Thu: 6am–10pm', delivery: 'Dammam Central' },
    ],
    img: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=80',
  },
  {
    city: 'Coming Soon',
    branches: [
      { name: 'Mecca – Al Aziziyah (Q3 2025)', address: 'Al Aziziyah District', phone: 'Notify Me', hours: 'Opening Soon', delivery: 'All Mecca Zones' },
      { name: 'Medina – Al Munawarrah (Q4 2025)', address: 'Central Medina', phone: 'Notify Me', hours: 'Opening Soon', delivery: 'All Medina Zones' },
      { name: 'Khobar – Al Thuqbah (Q2 2025)', address: 'Al Thuqbah, 1st Street', phone: 'Notify Me', hours: 'Opening Soon', delivery: 'Khobar & Dhahran' },
    ],
    img: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80',
    comingSoon: true,
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
          <h1>Dr Diet Across<br />the Kingdom</h1>
          <p>12 branches and growing. Fresh meals prepared locally and delivered to your door every morning.</p>
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
                      {loc.comingSoon ? (
                        <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer" className="btn btn--outline-dark btn--sm">
                          <i className="fab fa-whatsapp" /> Notify Me
                        </a>
                      ) : (
                        <>
                          <a href={`tel:${branch.phone}`} className="btn btn--outline-dark btn--sm">
                            <i className="fas fa-phone" /> {branch.phone}
                          </a>
                          <a href={`https://maps.google.com?q=${encodeURIComponent(branch.address)}`} target="_blank" rel="noopener noreferrer" className="btn btn--dark btn--sm">
                            <i className="fas fa-map" /> Get Directions
                          </a>
                        </>
                      )}
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
            <h2 className="text-white">We Deliver Everywhere You Are</h2>
            <div className="divider" />
            <p style={{ color: 'rgba(245,237,225,0.7)' }}>Fresh meals at your door before 7am. No waiting, no effort.</p>
          </div>
          <div className="delivery-features">
            {[
              { icon: 'fas fa-clock', title: 'Before 7am', desc: "Delivered fresh every morning so it's ready when you wake up" },
              { icon: 'fas fa-temperature-low', title: 'Cold Chain', desc: 'Insulated packaging maintains freshness from kitchen to your door' },
              { icon: 'fas fa-map-marked-alt', title: 'Live Tracking', desc: 'Know exactly when your delivery will arrive via WhatsApp updates' },
              { icon: 'fas fa-calendar-alt', title: '6-7 Days/Week', desc: 'Delivery 6 days on Starter plans, 7 days on Transform & Elite' },
            ].map((f, i) => (
              <div key={f.title} className={`delivery-feature fade-up stagger-${i + 1}`}>
                <div className="delivery-feature__icon"><i className={f.icon} /></div>
                <h4 className="text-white">{f.title}</h4>
                <p style={{ color: 'rgba(245,237,225,0.65)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '56px' }}>
            <Link to="/subscription" className="btn btn--primary btn--lg">
              Start Your Subscription <i className="fas fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
