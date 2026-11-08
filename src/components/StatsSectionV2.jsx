import { useCounter, useLiveTicker } from '../hooks/useCounters'
import './StatsSectionV2.css'

export default function StatsSectionV2() {
  const outlets = useCounter(17, '')
  const meals = useLiveTicker(2489, 2470, 2545, '+')
  const customers = useLiveTicker(10054, 10054, 10230, '+')
  const cities = useCounter(5, '')

  const stats = [
    { ref: outlets, label: 'Outlet Across India', icon: '/brand_assets/stats/icon-outlets.svg' },
    { ref: cities, label: 'Cities', icon: '/brand_assets/stats/icon-cities.svg' },
    { ref: customers, label: 'Happy Customers', icon: '/brand_assets/stats/icon-customers.svg' },
    { ref: meals, label: 'Meals Per Day', icon: '/brand_assets/stats/icon-meals.svg' },
  ]

  return (
    <section className="stats-v2">
      <div className="container stats-v2__inner">
        {stats.map((s) => (
          <div className="stats-v2__item" key={s.label}>
            <div className="stats-v2__icon">
              <img src={s.icon} alt="" />
            </div>
            <div className="stats-v2__number" ref={s.ref}>0</div>
            <div className="stats-v2__label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
