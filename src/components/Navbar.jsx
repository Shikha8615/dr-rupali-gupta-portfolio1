import { useEffect, useState } from 'react'
import { Moon, Sun, ArrowUR } from './Icons'

const LINKS = [['top', 'Home'], ['about', 'About'], ['services', 'Services'], ['journey', 'Journey'], ['faq', 'FAQ'], ['contact', 'Contact']]

export default function Navbar({ onBook, dark, toggle }) {
  const [open, setOpen] = useState(false)
  const [sc, setSc] = useState(false)
  const [act, setAct] = useState('top')

  useEffect(() => {
    const on = () => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      setSc(y > 20)
      let cur = 'top'
      for (const [id] of LINKS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 200) cur = id
      }
      if (max > 0 && y >= max - 4) cur = 'contact'
      setAct(cur)
    }
    const esc = e => e.key === 'Escape' && setOpen(false)
    const rs = () => window.innerWidth > 900 && setOpen(false)
    on()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', rs)
    window.addEventListener('keydown', esc)
    return () => {
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', rs)
      window.removeEventListener('keydown', esc)
    }
  }, [])

  const book = e => { e.preventDefault(); setOpen(false); onBook() }
  const links = cls => LINKS.map(([id, t]) => (
    <a key={id} href={'#' + id} className={`${cls} ${act === id ? 'on' : ''}`} onClick={() => setOpen(false)}>{t}</a>
  ))

  return (
    <header className={'hd' + (sc ? ' sc' : '')}>
      <div className="w">
        <a href="#top" className="br" onClick={() => setOpen(false)}>Dr. Rupali</a>
        <nav className="nv" aria-label="Main">{links('l')}</nav>
        <div className="ac">
          <button className="ic" type="button" aria-label="Toggle dark / light mode" onClick={toggle}>{dark ? <Sun s={18} /> : <Moon s={18} />}</button>
          <a className="pill sm" href="#book" onClick={book}>Book Appointment <ArrowUR s={15} /></a>
          <button className={'bg' + (open ? ' x' : '')} aria-label="Menu" aria-expanded={open} onClick={() => setOpen(o => !o)}><i /><i /><i /></button>
        </div>
      </div>
      <div className={'mp' + (open ? ' open' : '')}>
        <div className="in">
          {links('l')}
          <a className="pill" href="#book" onClick={book}>Book Appointment <ArrowUR s={16} /></a>
        </div>
      </div>
    </header>
  )
}
