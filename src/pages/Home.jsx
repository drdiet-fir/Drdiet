import PageMeta from '../components/PageMeta'
import ProteinHero from '../components/ProteinHero'
import WhySection from '../components/WhySection'
import ChecklistBar from '../components/ChecklistBar'
import MealsSection from '../components/MealsSection'
import ReelsSection from '../components/ReelsSection'
import TestimonialsSectionV2 from '../components/TestimonialsSectionV2'
import StatsSectionV2 from '../components/StatsSectionV2'
import CitiesSection from '../components/CitiesSection'
import FaqSection from '../components/FaqSection'

/* ─────────────────── HOME PAGE ─────────────────── */
export default function Home() {
  return (
    <>
      <PageMeta
        title="Dr Diet – Healthy Meal Plans Delivered Daily | Weight Loss & High-Protein Meals"
        description="Dr Diet delivers fresh, calorie-counted, high-protein meal plans across Delhi, Gurgaon, Chandigarh & Bangalore. Plans for weight loss, muscle gain, PCOS & office professionals. Starting ₹199/day."
        canonical="/"
        ogImage="/brand_assets/Food image 1.webp"
      />
      <ProteinHero />
      <WhySection />
      <ChecklistBar />
      <MealsSection />
      <ReelsSection />
      <TestimonialsSectionV2 />
      <StatsSectionV2 />
      <CitiesSection />
      <FaqSection />
    </>
  )
}
