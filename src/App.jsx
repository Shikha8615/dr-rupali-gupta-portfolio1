import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Journey from './components/Journey'
import About from './components/About'
import Services, { Faq } from './components/Services'
import Testimonials from './components/Testimonials'
import ExpertTalks from './components/ExpertTalks'
import CtaBanner from './components/CtaBanner'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'
import PregnancyCare from './components/PregnancyCare'
import GynaecologyCare from './components/GynaecologyCare'
import Garbhsanskar from './components/Garbhsanskar'
import FamilyPlanning from './components/FamilyPlanning'
import EmergencyBooking, { EmergencyIcon } from './components/EmergencyBooking'
import EmergencyQuickBooking from './components/EmergencyQuickBooking'

export default function App() {
  const [open, setOpen] = useState(false)
  const [emergencyOpen, setEmergencyOpen] = useState(false)
  const [emergencyDetails, setEmergencyDetails] = useState(null)
  const [consultationDetails, setConsultationDetails] = useState(null)
  const emergencyBook = () => { setOpen(false); setEmergencyOpen(true) }
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
      <Navbar onBook={book} onEmergency={emergencyBook} dark={dark} toggle={toggle} homeHref={servicePage ? '/index.html' : ''} activeSection={servicePage ? 'services' : undefined} />
      {servicePage ? <main className="w pregnancy-page"><a className="pregnancy-back" href="/index.html#services">← Back to Services</a>{familyPlanningPage ? <FamilyPlanning onBook={book} /> : garbhsanskarPage ? <Garbhsanskar onBook={book} /> : gynaecologyPage ? <GynaecologyCare onBook={book} /> : <PregnancyCare onBook={book} />}</main> : <>
      <Hero onBook={book} />
      <About />
      <Services onBook={book} />
      <Journey />
      <ExpertTalks />
      <Testimonials />
      <Faq />
      <CtaBanner onBook={book} />
      </>}
      <Footer homeHref={servicePage ? '/index.html' : ''} />
      <BookingModal open={open} initialDetails={consultationDetails} onClose={() => setOpen(false)} />
      <button className="emergency-floating" type="button" onClick={emergencyBook} aria-label="Emergency booking, ₹299, 9 AM to 6 PM"><EmergencyIcon /><span>Emergency<br />Booking</span></button>
      <EmergencyQuickBooking paused={open || emergencyOpen} onExpand={details => { setEmergencyDetails(details); emergencyBook() }} onConsult={details => { setConsultationDetails(details); setEmergencyOpen(false); book() }} />
      <EmergencyBooking open={emergencyOpen} initialDetails={emergencyDetails} onClose={() => setEmergencyOpen(false)} />
    </>
  )
}
