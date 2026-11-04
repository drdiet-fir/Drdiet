import { useState } from 'react'
import './FaqSection.css'

const FAQS = [
  {
    q: 'What is Dr Diet?',
    a: 'Dr Diet makes healthy eating easier and more enjoyable with delicious, balanced meals, protein-rich options, and a variety of cuisines. No boring ghas-phoos!',
  },
  {
    q: 'Is Dr Diet only for people who go to the gym?',
    a: "Not at all. Our plans are built for weight loss, muscle gain, medical conditions like PCOS, diabetes and thyroid, busy professionals, and anyone who just wants to eat clean — gym-goer or not.",
  },
  {
    q: 'What kind of food do you serve?',
    a: 'Freshly cooked, calorie-counted Indian meals — bowls, wraps, salads and more — made without maida, preservatives, or seed oils.',
  },
  {
    q: 'Do you offer vegetarian and non-vegetarian meals?',
    a: 'Yes. Every meal on our menu is available in both Veg and Non-Veg options, so you can pick what fits your diet.',
  },
  {
    q: 'Do your meals include calorie and protein information?',
    a: 'Yes, every meal is calorie-counted and protein-tagged so you always know exactly what you’re eating.',
  },
]

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
          {FAQS.map((item, i) => {
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
      </div>
    </section>
  )
}
