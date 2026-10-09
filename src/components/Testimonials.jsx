import { useEffect, useState } from 'react'
import { TESTIMONIALS } from '../config'
import { Right, StarF } from './Icons'

export default function Testimonials() {
  const n = TESTIMONIALS.length
  const [s, setS] = useState(0)
  const [hold, setHold] = useState(false)
  useEffect(() => {
    if (hold || n < 2) return
    const t = setInterval(() => setS(x => (x + 1) % n), 6000)
    return () => clearInterval(t)
  }, [hold, n])
  const vis = [0, 1, 2].map(k => TESTIMONIALS[(s + k) % n])
  return (
    <section id="reviews" className="rev">
      <div className="w">
        <div className="sh2"><div><h2>Patient Stories</h2><p>What our patients say</p></div><button className="ar" aria-label="Next reviews" onClick={() => setS((s + 1) % n)}><Right s={20} /></button></div>
        <div className="rcs" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
          {vis.map((r, k) => (
            <div className="rc" key={s + '-' + k}>
              <div className="rt"><span className="av">{r.name[0]}</span><div className="stars">{[0, 1, 2, 3, 4].map(i => <StarF key={i} s={15} />)}</div></div>
              <p>“{r.text}”</p>
              <b>— {r.name}</b>
              {r.sample && <em>Sample review – replace with a real one</em>}
            </div>
          ))}
        </div>
        <div className="dots">{TESTIMONIALS.map((_, k) => <button key={k} aria-label={'Review ' + (k + 1)} className={k === s ? 'on' : ''} onClick={() => setS(k)} />)}</div>
      </div>
    </section>
  )
}
