import { Heart, Shield, Leaf, Users, Arrow } from './Icons'

const SVC = [
  [Heart, 'Pregnancy Care', 'Guidance from your first visit through delivery.'],
  [Shield, 'Gynaecology Care', "Support for reproductive and hormonal health."],
  [Leaf, 'Garbhsanskar', 'Mindful pregnancy and wellbeing guidance.'],
  [Users, 'Family Planning', 'Personalised counselling for your future family.'],
]
const FAQ = [
  ['What is Garbhsanskar?', "A traditional approach of positive thoughts, music, diet and routines during pregnancy to support the mother's and baby's wellbeing."],
  ['How do I book an appointment?', 'Click any "Book Appointment" button, choose a day and time, or call +91-8171455302. We will confirm your slot.'],
  ['When should I first visit during pregnancy?', 'As soon as you confirm your pregnancy, or earlier when planning, for a pre-conception check-up.'],
]

export default function Services({ onBook }) {
  return (
    <section id="services" aria-labelledby="services-heading">
      <div className="w services-layout">
        <div className="services-copy">
          <p className="services-eyebrow">Our Services</p>
          <h2 id="services-heading">Care designed around you</h2>
          <p className="services-intro">Personalised gynaecological care through every stage of life.</p>
          <div className="service-list">
            {SVC.map(([I, t, d]) => (
              <a className="service-row" key={t} href={t === 'Pregnancy Care' ? '/pregnancy-care.html' : t === 'Gynaecology Care' ? '/gynaecology-care.html' : t === 'Garbhsanskar' ? '/garbhsanskar.html' : '/family-planning.html'}>
                <span className="service-icon"><I s={40} /></span>
                <span className="service-text"><h3>{t}</h3><p>{d}</p></span>
                <Arrow s={24} />
              </a>
            ))}
          </div>
        </div>
        <div className="service-film">
          <video src="/videos/services.mp4" autoPlay muted loop playsInline controls preload="metadata" aria-label="Dr. Rupali Gupta services video" />
        </div>
      </div>
    </section>
  )
}
export function Faq() {
  return (
    <section id="faq" className="faq">
      <div className="w" style={{ maxWidth: 860 }}>
        <div className="sh2"><div><h2>Frequently Asked Questions</h2><p>Quick answers before you visit.</p></div></div>
        {FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
      </div>
    </section>
  )
}
