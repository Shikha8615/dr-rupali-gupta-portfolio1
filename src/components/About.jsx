import { ArrowUR, Heart, Users, Clock, Shield, Pulse, User, Leaf } from './Icons'
import { STATS } from '../config'
import { useEffect, useRef, useState } from 'react'
import './About.css'

const VALUES = [
  [Pulse, 'Expertise', 'Evidence-based and up-to-date care'],
  [User, 'Compassion', 'A supportive and non-judgemental approach'],
  [Shield, 'Trust', 'Honest guidance and clear communication'],
  [Leaf, 'Holistic Care', 'Focus on physical, emotional and mental wellbeing'],
]

export default function About() {
  const portraitRef = useRef(null)
  const [revealed, setRevealed] = useState(false)
  useEffect(() => {
    if (!('IntersectionObserver' in window)) { setRevealed(true); return }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setRevealed(true); observer.disconnect() }
    }, { threshold: 0.18 })
    if (portraitRef.current) observer.observe(portraitRef.current)
    return () => observer.disconnect()
  }, [])
  const cards = [[Users, STATS[1][0], 'Satisfied Patients', 'Building confidence through every visit.'], [Heart, STATS[0][0], 'Years of Experience', 'Excellence reflected in every consultation.'], [Clock, STATS[2][0], 'Patient Support', 'Care and guidance whenever you need it.']]
  return (
    <section className="why about-personal" id="about" aria-labelledby="about-heading">
      <div className="w about-layout">
        <div className="about-copy">
          <span className="about-eyebrow">Why Me?</span>
          <h2 id="about-heading">Personalised Care<br />for <span>Every Woman</span></h2>
          <p className="about-intro">At the heart of my practice is a simple belief — every woman deserves to feel heard, supported and confident in her health journey. I combine clinical expertise with a compassionate approach to provide holistic care at every stage of life.</p>
          <div className="about-stats">{cards.map(([Icon, number, title, text]) => <div key={title}><span className="about-stat-icon"><Icon s={23} /></span><strong>{number}</strong><h3>{title}</h3><p>{text}</p></div>)}</div>
          <div className="about-actions"><a className="pill" href="#contact">More About Me <ArrowUR s={17} /></a><a className="about-watch" href="#expert-talks"><span aria-hidden="true">▶</span><div><strong>Watch My Approach</strong><small>A short introduction</small></div></a></div>
        </div>
        <div ref={portraitRef} className={`about-portrait${revealed ? ' is-revealed' : ''}`}>
          <div className="about-orbit" aria-hidden="true"><svg className="about-orbit-trace" viewBox="0 0 1000 1180" preserveAspectRatio="none" fill="none"><path pathLength="100" d="M1 560 C1 251 225 1 500 1 C775 1 999 251 999 560 V1000 Q999 1179 820 1179 H180 Q1 1179 1 1000 Z" /></svg><i /><i /><i /></div>
          <div className="about-photo"><img src="/images/doctor.jpg" alt="Dr. Rupali Gupta seated in her clinic" width="627" height="800" loading="lazy" /></div>
          {VALUES.map(([Icon, title, text], index) => <article className={`about-value about-value-${index + 1}`} key={title}><span className="about-value-icon"><Icon s={26} /></span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </div>
    </section>
  )
}
