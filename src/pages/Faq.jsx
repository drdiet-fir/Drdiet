import { useState } from 'react'
import PageMeta from '../components/PageMeta'
import PageHero from '../components/PageHero'
import { FAQ_GROUPS } from '../data/faqData'
import '../components/FaqSection.css'
import './Faq.css'

export default function Faq() {
  const [openKey, setOpenKey] = useState('0-0')

  return (
    <>
      <PageMeta
        title="FAQs | Dr Diet"
        description="Answers to common questions about Dr Diet — ordering & delivery, food & nutrition, meal plans, payments, offers, support and franchise."
        canonical="/faq"
      />
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about ordering, our food, meal plans, payments and more."
      />

      <section className="section faq-page">
        <div className="container faq-page__inner">
          <div className="faq-section-v2__groups">
            {FAQ_GROUPS.map((group, gi) => (
              <div className="faq-group" key={group.category}>
                <h2 className="faq-group__title">{group.category}</h2>
                <div className="faq-section-v2__accordion">
                  {group.items.map((item, qi) => {
                    const key = `${gi}-${qi}`
                    const open = openKey === key
                    return (
                      <div className={`faq-item-v2 ${open ? 'faq-item-v2--open' : ''}`} key={item.q}>
                        <button
                          type="button"
                          className="faq-item-v2__header"
                          onClick={() => setOpenKey(open ? '' : key)}
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
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
