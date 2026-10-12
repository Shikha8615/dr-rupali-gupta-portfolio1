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

  return (
    <>
      <Navbar onBook={book} dark={dark} toggle={toggle} />
      <Hero onBook={book} />
      <About />
      <Services onBook={book} />
      <Journey />
      <ExpertTalks />
      <Testimonials />
      <Faq />
      <CtaBanner onBook={book} />
      <Footer />
      <BookingModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
