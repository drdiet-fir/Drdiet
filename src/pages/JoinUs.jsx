import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './JoinUs.css'

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    )
    root.querySelectorAll('.fade-up, .fade-in').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
  return ref
}

export default function JoinUs() {
  const s1 = useReveal()
  const s2 = useReveal()
  const s3 = useReveal()

  return (
    <>
      <section className="page-hero joinus-hero">
        <div className="container">
          <span className="section-label section-label--white">Partner With Us</span>
          <h1>Grow With<br />Dr Diet</h1>
          <p>Franchise opportunities, corporate catering, and B2B partnerships — there's a seat at our table for every ambition.</p>
        </div>
      </section>

      {/* Quick nav */}
      <div className="joinus-nav-bar">
        <div className="container joinus-nav-links">
          <a href="#franchise"><i className="fas fa-store" /> Franchise</a>
          <a href="#catering"><i className="fas fa-building" /> Catering</a>
          <a href="#b2b"><i className="fas fa-handshake" /> B2B</a>
        </div>
      </div>

      {/* Franchise */}
      <section className="section joinus-section" id="franchise" ref={s1}>
        <div className="container">
          <div className="joinus-block">
            <div className="joinus-block__image fade-up">
              <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80" alt="Dr Diet Franchise" />
              <div className="joinus-block__tag">
                <i className="fas fa-store" /> Franchise
              </div>
            </div>
            <div className="joinus-block__content fade-up stagger-2">
              <span className="section-label section-label--dark">Own a Branch</span>
              <h2>Become a Dr Diet Franchise Partner</h2>
              <div className="divider divider--left" />
              <p>Join the fastest-growing nutrition brand in the Kingdom. Our proven business model, full operational support, and powerful brand make Dr Diet one of the most attractive franchise opportunities in Saudi Arabia today.</p>

              <div className="joinus-stats">
                <div className="joinus-stat">
                  <strong>6</strong>
                  <span>Years of Operations</span>
                </div>
                <div className="joinus-stat">
                  <strong>12+</strong>
                  <span>Successful Branches</span>
                </div>
                <div className="joinus-stat">
                  <strong>18mo</strong>
                  <span>Avg. Payback Period</span>
                </div>
              </div>

              <h4 style={{marginTop:'32px', marginBottom:'16px'}}>What You Get:</h4>
              <ul className="joinus-list">
                {['Full franchise training program (4 weeks)', 'Kitchen setup & equipment support', 'Ongoing operational support & quality audits', 'Marketing materials & digital support', 'Exclusive territory rights', 'Access to proprietary meal planning system', 'Dedicated franchise account manager'].map((item) => (
                  <li key={item}><i className="fas fa-check" /> {item}</li>
                ))}
              </ul>

              <a href="https://wa.me/966500000000?text=I'm interested in a Dr Diet franchise" target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--lg" style={{marginTop:'32px'}}>
                <i className="fab fa-whatsapp" /> Inquire About Franchise
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Catering */}
      <section className="section section--cream joinus-section" id="catering" ref={s2}>
        <div className="container">
          <div className="joinus-block joinus-block--reverse">
            <div className="joinus-block__content fade-up">
              <span className="section-label section-label--dark">Corporate Services</span>
              <h2>Healthy Catering for Your Team</h2>
              <div className="divider divider--left" />
              <p>Fuel your team's performance with daily catered healthy meals. Studies show employees who eat well are 25% more productive and 35% less absent. Dr Diet makes corporate wellness effortless.</p>

              <div className="catering-packages">
                {[
                  { name: 'Small Team', size: '10–50 employees', price: 'From SAR 45/person/day', icon: 'fas fa-users' },
                  { name: 'Enterprise', size: '50–500 employees', price: 'Custom Pricing', icon: 'fas fa-building' },
                  { name: 'Events', size: 'One-time catering', price: 'Quote on Request', icon: 'fas fa-calendar-alt' },
                ].map((pkg) => (
                  <div key={pkg.name} className="catering-package">
                    <i className={pkg.icon} />
                    <div>
                      <strong>{pkg.name}</strong>
                      <span>{pkg.size}</span>
                      <span className="catering-package__price">{pkg.price}</span>
                    </div>
                  </div>
                ))}
              </div>

              <h4 style={{marginBottom:'16px'}}>Why Companies Choose Dr Diet:</h4>
              <ul className="joinus-list">
                {['Flexible delivery schedules', 'Customized to dietary needs & preferences', 'Branded packaging available', 'Dedicated account manager', 'Monthly invoicing', 'Nutritional reporting available'].map((item) => (
                  <li key={item}><i className="fas fa-check" /> {item}</li>
                ))}
              </ul>

              <a href="https://wa.me/966500000000?text=I'd like to inquire about corporate catering" target="_blank" rel="noopener noreferrer" className="btn btn--dark btn--lg" style={{marginTop:'32px'}}>
                <i className="fab fa-whatsapp" /> Get a Catering Quote
              </a>
            </div>
            <div className="joinus-block__image fade-up stagger-2">
              <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80" alt="Corporate Catering" />
              <div className="joinus-block__tag joinus-block__tag--right">
                <i className="fas fa-building" /> Catering
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* B2B */}
      <section className="section joinus-section" id="b2b" ref={s3}>
        <div className="container">
          <div className="joinus-block">
            <div className="joinus-block__image fade-up">
              <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=700&q=80" alt="B2B Partnership" />
              <div className="joinus-block__tag">
                <i className="fas fa-handshake" /> B2B
              </div>
            </div>
            <div className="joinus-block__content fade-up stagger-2">
              <span className="section-label section-label--dark">Strategic Partnerships</span>
              <h2>Let's Build Something Together</h2>
              <div className="divider divider--left" />
              <p>If you run a gym, clinic, hotel, or wellness center, partnering with Dr Diet means offering your clients the missing piece of their health journey — expert nutrition. We grow together.</p>

              <div className="b2b-types">
                {[
                  { icon: 'fas fa-dumbbell', title: 'Gyms & Fitness Centers', desc: 'Offer your members customized meal plans. Rev-share or white-label available.' },
                  { icon: 'fas fa-hospital', title: 'Medical Clinics', desc: 'Therapeutic nutrition programs for your patients. Certified and medically aligned.' },
                  { icon: 'fas fa-hotel', title: 'Hotels & Resorts', desc: 'In-room healthy meal delivery for health-conscious guests.' },
                  { icon: 'fas fa-spa', title: 'Wellness Centers', desc: 'Complete the wellness experience with science-backed nutrition programs.' },
                ].map((type) => (
                  <div key={type.title} className="b2b-type fade-up">
                    <div className="b2b-type__icon"><i className={type.icon} /></div>
                    <div>
                      <strong>{type.title}</strong>
                      <p>{type.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a href="https://wa.me/966500000000?text=I'm interested in a B2B partnership with Dr Diet" target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--lg" style={{marginTop:'32px'}}>
                <i className="fab fa-whatsapp" /> Start a Partnership Conversation
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
