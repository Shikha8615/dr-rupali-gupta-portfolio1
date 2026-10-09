import { Heart, Shield, Leaf, Users, ArrowUR } from './Icons'

const SVC = [
  [Heart, 'Pregnancy Care', 'Regular check-ups, pregnancy guidance and delivery support.'],
  [Shield, 'Gynaecology Care', "Women's reproductive and hormonal health."],
  [Leaf, 'Garbhsanskar', 'Mental, emotional and spiritual pregnancy guidance.'],
  [Users, 'Family Planning', 'Personalised counselling for your future family goals.'],
]
const FAQ = [
  ['What is Garbhsanskar?', "A traditional approach of positive thoughts, music, diet and routines during pregnancy to support the mother's and baby's wellbeing."],
  ['How do I book an appointment?', 'Click any "Book Appointment" button, choose a day and time, or call +91-9727006001. We will confirm your slot.'],
  ['When should I first visit during pregnancy?', 'As soon as you confirm your pregnancy, or earlier when planning, for a pre-conception check-up.'],
]

export default function Services({ onBook }) {
  const book = e => { e.preventDefault(); onBook() }
  return (
    <section id="services">
      <div className="w">
        <div className="sh2"><div><h2>Treatment Plans, Just for You</h2><p>Expert gynaecological solutions tailored to your unique needs.</p></div><a className="pill" href="#book" onClick={book}>See All <ArrowUR s={16} /></a></div>
        <div className="sx">
          <div className="sg">
            {SVC.map(([I, t, d]) => (
              <div key={t}>
                <i className="sic"><I s={26} /></i>
                <h3>{t}</h3><p>{d}</p>
                <a href="#book" onClick={book}>Learn More ›</a>
              </div>
            ))}
          </div>
          <div className="sim"><img src="/images/hero.jpg" alt="Expecting mother" /></div>
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
