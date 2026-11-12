import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CtaBand from './components/CtaBand'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'

// Secondary routes are code-split so the landing page ships a smaller bundle.
const About = lazy(() => import('./pages/About'))
const Subscription = lazy(() => import('./pages/Subscription'))
const Menu = lazy(() => import('./pages/Menu'))
const Media = lazy(() => import('./pages/Media'))
const Testimonials = lazy(() => import('./pages/Testimonials'))
const Locations = lazy(() => import('./pages/Locations'))
const JoinUs = lazy(() => import('./pages/JoinUs'))
const Contact = lazy(() => import('./pages/Contact'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Faq = lazy(() => import('./pages/Faq'))
const Delhi = lazy(() => import('./pages/cities/Delhi'))
const Gurgaon = lazy(() => import('./pages/cities/Gurgaon'))
const Bangalore = lazy(() => import('./pages/cities/Bangalore'))
const Chandigarh = lazy(() => import('./pages/cities/Chandigarh'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Terms = lazy(() => import('./pages/Terms'))
const Privacy = lazy(() => import('./pages/Privacy'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar />
      <main id="main-content">
        <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/media" element={<Media />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/join-us" element={<JoinUs />} />
          <Route path="/careers" element={<Navigate to="/join-us#careers" replace />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/healthy-meal-plan-delhi" element={<Delhi />} />
          <Route path="/diet-food-gurgaon" element={<Gurgaon />} />
          <Route path="/weight-loss-meals-bangalore" element={<Bangalore />} />
          <Route path="/healthy-meals-chandigarh" element={<Chandigarh />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </main>
      <CtaBand />
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </HelmetProvider>
  )
}
