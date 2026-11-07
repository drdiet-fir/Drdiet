import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HOME_FAQS } from '../data/faqData'
import './FaqSection.css'

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="faq-section-v2">
      <div className="container faq-section-v2__inner">
        <div className="faq-section-v2__head">
          <h2>FAQs</h2>
          <p>Frequently Asked Questions</p>
        </div>

        <div className="faq-section-v2__accordion">
          {HOME_FAQS.map((item, i) => {
            const open = openIndex === i
            return (
              <div className={`faq-item-v2 ${open ? 'faq-item-v2--open' : ''}`} key={item.q}>
                <button
                  type="button"
                  className="faq-item-v2__header"
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  aria-expanded={open}
                >
                  <span>{item.q}</span>
                  <i className="fas fa-chevron-down" />
                </button>
                {open && <p className="faq-item-v2__answer">{item.a}</p>}
              </div>
            )
          })}
        </div>

        <Link to="/faq" className="faq-section-v2__view-all">
          View All FAQs <i className="fas fa-arrow-right" />
        </Link>
      </div>
    </section>
  )
}
