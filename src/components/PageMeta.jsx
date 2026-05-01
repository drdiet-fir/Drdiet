import { Helmet } from 'react-helmet-async'

export default function PageMeta({ title, description, canonical, ogImage }) {
  const base = 'https://www.drdiet.fit'
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical ? `${base}${canonical}` : base} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical ? `${base}${canonical}` : base} />
      {ogImage && <meta property="og:image" content={`${base}${ogImage}`} />}
    </Helmet>
  )
}
