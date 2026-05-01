import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import About from './pages/About'
import Subscription from './pages/Subscription'
import Menu from './pages/Menu'
import Media from './pages/Media'
import Testimonials from './pages/Testimonials'
import Locations from './pages/Locations'
import JoinUs from './pages/JoinUs'
import Careers from './pages/Careers'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Delhi from './pages/cities/Delhi'
import Gurgaon from './pages/cities/Gurgaon'
import Bangalore from './pages/cities/Bangalore'
import Chandigarh from './pages/cities/Chandigarh'

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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/media" element={<Media />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/join-us" element={<JoinUs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/healthy-meal-plan-delhi" element={<Delhi />} />
          <Route path="/diet-food-gurgaon" element={<Gurgaon />} />
          <Route path="/weight-loss-meals-bangalore" element={<Bangalore />} />
          <Route path="/healthy-meals-chandigarh" element={<Chandigarh />} />
        </Routes>
      </main>
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
