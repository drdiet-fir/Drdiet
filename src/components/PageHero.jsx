import './PageHero.css'

export default function PageHero({ eyebrow, title, subtitle, children, heroImage, hideImageOnMobile }) {
  return (
    <section className={`page-hero-v2 ${heroImage ? 'page-hero-v2--with-media' : ''} ${heroImage && hideImageOnMobile ? 'page-hero-v2--hide-media-mobile' : ''}`}>
      <div className="container page-hero-v2__inner">
        {eyebrow}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
        {children}
      </div>
      {heroImage && (
        <div className="page-hero-v2__media" aria-hidden="true">
          <img src={heroImage} alt="" />
        </div>
      )}
      <img className="page-hero-v2__wave" src="/brand_assets/about/hero-wave.svg" alt="" />
    </section>
  )
}
