import './WhySection.css'

const CARDS = [
  {
    title: '22+ Delicious Meal Options',
    desc: "From everyday favourites to global flavours, there's always something exciting to eat.",
    img: '/brand_assets/why-section/card-1-main.png',
  },
  {
    title: 'Nutrition That Fits Your Goals',
    desc: 'Balanced, calorie-conscious meals made to match your lifestyle.',
    img: '/brand_assets/why-section/card-2.png',
  },
  {
    title: 'Healthy Eating, Made Easy',
    desc: 'Skip the meal prep. Get delicious, wholesome food delivered to your doorstep.',
    img: '/brand_assets/why-section/card-3.png',
  },
  {
    title: 'Flexible Meal Subscriptions',
    desc: 'Choose a plan that works for your routine, appetite, and goals.',
    img: '/brand_assets/why-section/card-4.png',
  },
]

export default function WhySection() {
  return (
    <section className="why-section">
      <img className="why-section__wave" src="/brand_assets/why-section/wave-divider.svg" alt="" />
      <div className="container why-section__inner">
        <div className="why-section__head">
          <h2 className="why-section__headline">
            Eating Healthy<br />Shouldn't Be This Hard
          </h2>
          <p className="why-section__sub">
            You want to get fit, eat better, and feel good. But busy schedules, confusing diets,
            and everyday food choices often get in the way.
          </p>
        </div>

        <div className="why-section__grid">
          {CARDS.map((c) => (
            <div className="why-card-wrap" key={c.title}>
              <img className="why-card__wave" src="/brand_assets/why-section/card-wave.svg" alt="" />
              <div className="why-card">
                <div className="why-card__content">
                  <div className="why-card__copy">
                    <h3>{c.title}</h3>
                    <p>{c.desc}</p>
                  </div>
                  <div className="why-card__image">
                    <img src={c.img} alt="" loading="lazy" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
