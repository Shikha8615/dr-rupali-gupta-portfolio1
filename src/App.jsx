import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Journey from './components/Journey'
import About from './components/About'
import Services, { Faq } from './components/Services'
import Testimonials from './components/Testimonials'
import ExpertTalks from './components/ExpertTalks'
import Shop from './components/Shop'
import CtaBanner from './components/CtaBanner'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'
import PregnancyCare from './components/PregnancyCare'
import GynaecologyCare from './components/GynaecologyCare'
import Garbhsanskar from './components/Garbhsanskar'
import FamilyPlanning from './components/FamilyPlanning'

export default function App() {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme') } catch { return null }
  })
  useEffect(() => {
    if (theme) document.documentElement.dataset.theme = theme
  }, [theme])
  const dark = theme ? theme === 'dark' : window.matchMedia('(prefers-color-scheme:dark)').matches
  const toggle = () => {
    const t = dark ? 'light' : 'dark'
    setTheme(t)
    try { localStorage.setItem('theme', t) } catch { /* ignore */ }
  }
  const book = () => setOpen(true)
  const pregnancyPage = window.location.pathname.endsWith('/pregnancy-care.html')
  const gynaecologyPage = window.location.pathname.endsWith('/gynaecology-care.html')
  const garbhsanskarPage = window.location.pathname.endsWith('/garbhsanskar.html')
  const familyPlanningPage = window.location.pathname.endsWith('/family-planning.html')
  const servicePage = pregnancyPage || gynaecologyPage || garbhsanskarPage || familyPlanningPage

  return (
    <>
      <Navbar onBook={book} dark={dark} toggle={toggle} homeHref={servicePage ? '/index.html' : ''} activeSection={servicePage ? 'services' : undefined} />
      {servicePage ? <main className="w pregnancy-page"><a className="pregnancy-back" href="/index.html#services">← Back to Services</a>{familyPlanningPage ? <FamilyPlanning onBook={book} /> : garbhsanskarPage ? <Garbhsanskar onBook={book} /> : gynaecologyPage ? <GynaecologyCare onBook={book} /> : <PregnancyCare onBook={book} />}</main> : <>
      <Hero onBook={book} />
      <About />
      <Services onBook={book} />
      <Journey />
      <ExpertTalks />
      <Shop onBook={book} />
      <Testimonials />
      <Faq />
      <CtaBanner onBook={book} />
      </>}
      <Footer homeHref={servicePage ? '/index.html' : ''} />
      <BookingModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
