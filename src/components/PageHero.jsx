import './PageHero.css'

export default function PageHero({ eyebrow, title, subtitle, children }) {
  return (
    <section className="page-hero-v2">
      <div className="container page-hero-v2__inner">
        {eyebrow}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
        {children}
      </div>
      <img className="page-hero-v2__wave" src="/brand_assets/about/hero-wave.svg" alt="" />
    </section>
  )
}
