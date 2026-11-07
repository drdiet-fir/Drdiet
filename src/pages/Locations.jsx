import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import PageHero from '../components/PageHero'
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

const galleryImages = [
  '/brand_assets/Cafe Interior 1.png',
  '/brand_assets/Cafe Interior 2.png',
  '/brand_assets/Cafe Exterior 1.png',
]

const locations = [
  {
    city: 'Delhi',
    branches: [
      { name: 'Malviya Nagar', address: 'D-89, near Karnataka Bank, DDA Flats, Malviya Nagar, New Delhi 110017' },
      { name: 'Lajpat Nagar',  address: 'D-166, Block D, Lajpat Nagar I, New Delhi 110024' },
      { name: 'Rajouri Garden', address: 'Rajouri Garden, West Delhi' },
      { name: 'Karol Bagh',     address: 'Karol Bagh, New Delhi' },
    ],
  },
  {
    city: 'Bengaluru',
    branches: [
      { name: 'Hebbal', address: 'Shop no 23, Sharadha Complex, Kempapura Main Rd, opp. Muthoot Finance, Hebbal, Bengaluru 560023' },
      { name: 'Whitefield', address: 'Whitefield, Bengaluru, Karnataka' },
    ],
  },
  {
    city: 'Gurgaon',
    branches: [
      { name: 'Sector 28, DLF City IV', address: 'F3CP+286, Sector 28, DLF City IV, Gurugram, Haryana 122009' },
      { name: 'Sapphire Mall, Sohna Road', address: 'Sapphire Mall, Sohna Road, Gurugram, Haryana' },
    ],
  },
  {
    city: 'Noida',
    branches: [
      { name: 'Sector 73', address: 'Royal Avenue St, Sector 73, Noida, Uttar Pradesh 201316' },
    ],
  },
  {
    city: 'Chandigarh',
    branches: [
      { name: 'Chandigarh – Sector 32', address: 'Sco no. 285/2, Sector 32D, Chandigarh 160030' },
      { name: 'Panchkula',              address: 'Panchkula, Haryana' },
    ],
  },
  {
    city: 'Mohali',
    branches: [
      { name: 'Mohali – Sector 70', address: 'Dr Diet, Plot 201, Modern Market, Sector 70, Mohali, 160070' },
      { name: 'Kharar',             address: 'Kharar, SAS Nagar, Punjab' },
    ],
  },
]

export default function Locations() {
  const [activeCity, setActiveCity] = useState(locations[0].city)
  const s1 = useReveal()
  const gridRef = useRef(null)

  const activeBranches = locations.find((l) => l.city === activeCity)?.branches ?? []

  useLayoutEffect(() => {
    if (!gridRef.current) return
    gridRef.current.querySelectorAll('.fade-up').forEach((el) => el.classList.add('visible'))
  }, [activeCity])

  return (
    <>
      <PageHero
        title="Dr Diet Across India"
        subtitle="12 outlets across 5 cities. Fresh, healthy meals delivered daily."
      />

      {/* Photo strip */}
      <section className="locations-gallery">
        <div className="locations-gallery__track">
          {[...galleryImages, ...galleryImages].map((src, i) => (
            <img key={i} src={src} alt="Dr Diet outlet" />
          ))}
        </div>
      </section>

      {/* City filter + branches */}
      <section className="section locations-section" ref={s1}>
        <div className="container">
          <div className="locations-city-pills">
            {locations.map((loc) => (
              <button
                key={loc.city}
                className={`locations-city-pill ${activeCity === loc.city ? 'locations-city-pill--active' : ''}`}
                onClick={() => setActiveCity(loc.city)}
              >
                {loc.city}
              </button>
            ))}
          </div>

          <div className="locations-branch-grid" ref={gridRef}>
            {activeBranches.map((branch, i) => (
              <div key={branch.name} className={`locations-branch-card fade-up stagger-${(i % 3) + 1}`}>
                <div className="locations-branch-card__top">
                  <h3>{branch.name}</h3>
                  <a
                    href={`https://maps.google.com?q=Dr+Diet+${encodeURIComponent(branch.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="locations-branch-card__directions"
                  >
                    Directions <i className="fas fa-location-arrow" />
                  </a>
                </div>
                <p>{branch.address}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
