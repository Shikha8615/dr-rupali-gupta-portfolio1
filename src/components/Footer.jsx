import { useEffect, useState } from 'react'
import { PHONE, WA_NUMBER, EMAIL, SOCIAL } from '../config'
import { Facebook, Instagram, Youtube, Pin, Phone, Mail, Chat, Up, Heart } from './Icons'

const LINKS = [['top', 'Home'], ['about', 'About'], ['services', 'Services'], ['journey', 'Journey'], ['expert-talks', 'Expert Talks'], ['shop', 'Shop'], ['faq', 'FAQ'], ['contact', 'Contact']]

export default function Footer({ homeHref = '' }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const f = () => setShow(window.scrollY > 500)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  const tel = 'tel:' + PHONE.replace(/-/g, '')
  return (
    <>
      <footer className="ft" id="contact">
        <div className="w">
          <div className="fr">
            <div className="fbr"><span className="mono lt">RG</span><span><b>Dr. Rupali Gupta</b><small>Gynaecologist & Garbhsanskar Guide</small></span></div>
            <nav className="fl2" aria-label="Footer">{LINKS.map(([id, t]) => <a key={id} href={homeHref + '#' + id}>{t}</a>)}</nav>
            <ul className="fc2">
              <li><Pin s={16} /> Karnal</li>
              <li><Phone s={16} /><a href={tel}>{PHONE}</a></li>
              <li><Mail s={16} /><a href={'mailto:' + EMAIL}>{EMAIL}</a></li>
            </ul>
            <div className="fso">
              {[[Facebook, 'facebook'], [Instagram, 'instagram'], [Youtube, 'youtube']].map(([I, k]) => <a key={k} href={SOCIAL[k]} aria-label={k} target="_blank" rel="noopener noreferrer"><I s={17} /></a>)}
            </div>
          </div>
          <div className="fb">
            <span>© {new Date().getFullYear()} Dr. Rupali Gupta. All rights reserved.</span>
            <span className="scr">Healthy Women <Heart s={14} fill="currentColor" /> Happy Families</span>
          </div>
          <p className="dsc">Medical treatments are subject to individual diagnosis and outcomes vary. We strictly adhere to the PC-PNDT Act and do not perform gender selection.</p>
        </div>
      </footer>
      <a className="fc" href={tel} aria-label="Call now"><Phone s={24} /></a>
      <a className="fw" href={'https://wa.me/' + WA_NUMBER} aria-label="WhatsApp"><Chat s={26} /></a>
      <button className={'up' + (show ? ' show' : '')} aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><Up s={20} /></button>
    </>
  )
}
