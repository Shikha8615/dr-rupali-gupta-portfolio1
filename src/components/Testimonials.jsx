import { useState } from 'react'
import { TESTIMONIALS } from '../config'
import { Left, Right, StarF, Heart, Shield, Leaf } from './Icons'

const CARE = [
  { title: 'Pregnancy Care', Icon: Heart },
  { title: 'Gynaecology Care', Icon: Shield },
  { title: 'Gynaecology Care', Icon: Shield },
  { title: 'Garbhsanskar', Icon: Leaf },
]

export default function Testimonials() {
  const [start, setStart] = useState(0)
  const count = TESTIMONIALS.length
  if (!count) return null
  const visible = Array.from({ length: Math.min(3, count) }, (_, offset) => {
    const index = (start + offset) % count
    return { review: TESTIMONIALS[index], care: CARE[index] || CARE[0], index }
  })
  const move = direction => setStart(value => (value + direction + count) % count)
  return (
    <section id="reviews" className="rev stories-section" aria-labelledby="stories-heading">
      <div className="stories-background" aria-hidden="true" />
      <div className="w">
        <div className="sh2 stories-heading">
          <div><span className="stories-eyebrow">Patient Stories</span><h2 id="stories-heading">Patient Stories</h2><p>Care, comfort and confidence at every stage.</p></div>
          <div className="stories-controls"><button type="button" className="stories-arrow stories-prev" aria-label="Previous reviews" disabled={count < 2} onClick={() => move(-1)}><Left s={22} /></button><button type="button" className="stories-arrow" aria-label="Next reviews" disabled={count < 2} onClick={() => move(1)}><Right s={22} /></button></div>
        </div>
        <div className="rcs stories-cards" aria-live="polite" aria-atomic="true">
          {visible.map(({ review, care, index }) => (
            <article className="rc story-card" key={index}>
              <span className="story-quote" aria-hidden="true">“</span>
              <div className="rt story-person">
                <img className={`story-avatar${review.photo ? '' : ' story-ai-avatar'}`} src={review.photo || '/images/patient-avatar-ai.png'} alt={review.photo ? '' : 'AI illustrated avatar'} width="80" height="80" loading="lazy" style={{ '--avatar-delay': `${index * .7}s` }} />
                <div><h3>{review.name}</h3><div className="stars" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, i) => <StarF key={i} s={21} />)}</div></div>
              </div>
              <blockquote><p>“{review.text}”</p></blockquote>
              <div className="story-bottom"><span className="story-service"><span><care.Icon s={23} /></span>{review.service || care.title}</span>{review.sample && <small className="story-sample">Sample review</small>}</div>
              <Leaf className="story-leaf" s={64} />
            </article>
          ))}
        </div>
        <div className="dots stories-dots">{TESTIMONIALS.map((_, index) => <button type="button" key={index} aria-label={`Show review ${index + 1}`} aria-pressed={index === start} className={index === start ? 'on' : ''} onClick={() => setStart(index)} />)}</div>
      </div>
    </section>
  )
}
