import { ArrowUR, Heart, Users, Clock } from './Icons'
import { STATS } from '../config'

export default function About() {
  const cards = [[Users, STATS[1][0], 'Satisfied Patients', 'Building confidence through every visit.'], [Heart, STATS[0][0], 'Years of Experience', 'Excellence reflected in every consultation.'], [Clock, STATS[2][0], 'Patient Support', 'Care and guidance whenever you need it.']]
  return (
    <section className="why" id="about">
      <div className="w">
        <div className="sh2"><h2>Why Me?</h2><a className="pill" href="#services">More About Me <ArrowUR s={16} /></a></div>
        <div className="wp">
          <div className="wl">
            <h3>About Dr. Rupali Gupta</h3>
            <p>Committed to providing exceptional gynaecological care with compassion and trust — ensuring every woman feels confident and cared for.</p>
            <p>Her approach focuses on holistic well-being, ensuring physical, emotional and mental health for you and your baby.</p>
          </div>
          <i className="vd" />
          <div className="wc">
            {cards.map(([I, a, b, c]) => (
              <div key={b}><span className="ci2"><I s={18} /></span><b>{a}</b><em>{b}</em><p>{c}</p></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
