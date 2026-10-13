import { useEffect, useMemo, useState } from 'react'
import SendOptions from './SendOptions'
import { SERVICES } from '../config'

const MN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const WD = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const LS = 'bookedSlots'
const TIMES = []
for (let m = 17 * 60; m < 20 * 60; m += 15) TIMES.push(m) // 5:00 PM - 8:00 PM, 15-min slots

const p2 = n => (n < 10 ? '0' : '') + n
const lbl = m => { const h = Math.floor(m / 60); return `${p2(h > 12 ? h - 12 : h)}:${p2(m % 60)} ${h >= 12 ? 'PM' : 'AM'}` }
const key = (d, t) => `${d}_${t}`
const load = () => { try { return JSON.parse(localStorage.getItem(LS) || '{}') } catch { return {} } }

function makeDays() {
  const now = new Date(), out = []
  for (let i = 0; i < 6 && out.length < 5; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i)
    if (i === 0 && now.getHours() * 60 + now.getMinutes() >= 20 * 60 - 15) continue
    out.push({ k: `${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())}`, w: WD[d.getDay()], n: d.getDate(), m: MN[d.getMonth()], today: i === 0 })
  }
  return out
}

const EMPTY = { name: '', lastName: '', phone: '', email: '', age: '', city: '', lastPeriodDate: '', type: SERVICES[3], concern: '', prev: '' }

export default function BookingModal({ open, onClose, initialDetails }) {
  const days = useMemo(makeDays, [open])
  const [booked, setBooked] = useState(load)
  const [step, setStep] = useState(1)
  const [sd, setSd] = useState(null)
  const [st, setSt] = useState(null)
  const [topic, setTopic] = useState(SERVICES[0])
  const [f, setF] = useState(EMPTY)
  const [consent, setConsent] = useState(false)
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState({ text: '', sum: '' })
  const set = k => e => setF({ ...f, [k]: e.target.value })
  useEffect(() => {
    if (open && initialDetails) setF(value => ({ ...value, name: initialDetails.name, lastName: '', phone: initialDetails.phone }))
  }, [open, initialDetails])

  useEffect(() => {
    if (open) { setStep(1); setSt(null); setSd(days[0] && days[0].k); setErr(''); setBooked(load()) }
  }, [open]) // eslint-disable-line

  useEffect(() => {
    const esc = e => e.key === 'Escape' && onClose()
    const sync = e => e.key === LS && setBooked(load())
    window.addEventListener('keydown', esc)
    window.addEventListener('storage', sync)
    return () => { window.removeEventListener('keydown', esc); window.removeEventListener('storage', sync) }
  }, [onClose])

  const now = new Date(), nm = now.getHours() * 60 + now.getMinutes()
  const day = days.find(d => d.k === sd)
  const summary = day && st !== null ? `${day.w}, ${day.n} ${day.m} · ${lbl(st)}` : ''

  const toDetails = () => { setF({ ...f, type: topic }); setStep(2) }

  const pay = () => {
    const firstName = f.name.trim()
    const n = [firstName, f.lastName.trim()].filter(Boolean).join(' '), p = f.phone.trim(), m = f.email.trim()
    if (!firstName || !/^[0-9+\s-]{10,15}$/.test(p)) return setErr('Please enter your first name and a valid mobile number.')
    if (m && !/^\S+@\S+\.\S+$/.test(m)) return setErr('Please enter a valid email address.')
    const k = key(sd, st)
    if (load()[k]) { setBooked(load()); setSt(null); setStep(1); return alert('Sorry, this slot was just booked. Please choose another.') }
    setErr(''); setBusy(true)
    setTimeout(() => {
      const sum = `${summary} · ${f.type}`
      const text = `Hello Dr. Rupali Gupta, I would like to request a consultation.\nName: ${n}\nPhone: ${p}` +
        (m ? `\nEmail: ${m}` : '') + (f.age ? `\nAge: ${f.age}` : '') + (f.city ? `\nCity: ${f.city}` : '') +
        (f.lastPeriodDate ? `\nLast Period Date: ${f.lastPeriodDate}` : '') +
        `\nType: ${f.type}\nSlot: ${sum}` + (f.concern ? `\nConcern: ${f.concern}` : '') +
        (f.prev ? `\nPrevious details: ${f.prev}` : '') + '\nConsultation fee: ₹199 (payment pending)'
      setDone({ text, sum })
      setBusy(false); setConsent(false); setStep(3)
    }, 900)
  }

  return (
    <div id="bk" className={open ? 'on' : ''} role="dialog" aria-modal="true" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="pn">
        <button className="x" id="bx" aria-label="Close" onClick={onClose}>✕</button>

        {step === 1 && (
          <div>
            <small className="k" style={{ marginTop: 6 }}>Online gynaecology consultation</small>
            <h3>Choose your time.</h3>
            <p style={{ margin: 0, opacity: 0.8 }}>Select a day and an available 15-minute slot.</p>
            <div className="fee"><span>15-minute video consultation</span><b style={{ color: 'var(--mar)' }}>₹199</b></div>
            <small className="k">Select a day</small>
            <div className="days">
              {days.map(d => (
                <button key={d.k} className={sd === d.k ? 'sel' : ''} onClick={() => { setSd(d.k); setSt(null) }}>
                  {d.w}<br /><b style={{ fontSize: '1.4rem' }}>{d.n}</b><br />{d.m}
                </button>
              ))}
            </div>
            <small className="k">Available times · 05:00 PM–08:00 PM</small>
            <div className="slots">
              {TIMES.map(t => {
                const isB = !!booked[key(sd, t)], past = day && day.today && t <= nm
                return (
                  <button key={t} disabled={isB || !!past} title={isB ? 'Already booked' : ''} className={st === t ? 'sel' : ''} onClick={() => setSt(t)}>{lbl(t)}</button>
                )
              })}
            </div>
            <small className="k">Consultation topic</small>
            <select value={topic} onChange={e => setTopic(e.target.value)}>{SERVICES.map(s => <option key={s}>{s}</option>)}</select>
            <button className="go" disabled={st === null} onClick={toDetails}>Continue to your details ↗</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <small className="k" style={{ marginTop: 6 }}>Online gynaecology consultation</small>
            <h3>A few details.</h3>
            <p style={{ margin: '0 0 6px', opacity: 0.8 }}>Please fill in your details so we can prepare for your consultation.</p>
            <p style={{ margin: '0 0 10px', color: 'var(--mar)', fontWeight: 600 }}>{summary} · {f.type}</p>
            <div className="fg">
              <label>First name<input autoComplete="given-name" placeholder="First name" value={f.name} onChange={set('name')} /></label>
              <label>Last name<input autoComplete="family-name" placeholder="Last name" value={f.lastName} onChange={set('lastName')} /></label>
              <label>Mobile / WhatsApp<input type="tel" placeholder="+91" value={f.phone} onChange={set('phone')} /></label>
              <label>Email<input type="email" placeholder="you@example.com" value={f.email} onChange={set('email')} /></label>
              <label>Age<input type="number" min="1" max="99" placeholder="Age" value={f.age} onChange={set('age')} /></label>
              <label>City<input placeholder="City" value={f.city} onChange={set('city')} /></label>
              <label>Last Period Date<input type="date" value={f.lastPeriodDate} onChange={set('lastPeriodDate')} /></label>
              <label>Consultation type<select value={f.type} onChange={set('type')}>{SERVICES.map(s => <option key={s}>{s}</option>)}</select></label>
            </div>
            <label className="ta">Main concern<textarea rows="3" placeholder="Briefly describe your symptoms or reason for consultation" value={f.concern} onChange={set('concern')} /></label>
            <label className="ta">Previous treatment or details<textarea rows="3" placeholder="Optional — previous treatment, medicines or relevant history" value={f.prev} onChange={set('prev')} /></label>
            <div className="nt">🛡 <div><b>Reports and prescriptions</b><br />Please keep relevant reports and prescriptions ready for your consultation. Online upload is currently unavailable.</div></div>
            <label className="cs consultation-validity"><input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} /> <span><strong>Consultation validity — 7 days</strong><br />I understand that my consultation is valid for 7 days from the consultation date. I consent to the clinic using the details provided to arrange my consultation.</span></label>
            <small style={{ color: '#e53935' }}>{err}</small>
            <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
              <button className="go" style={{ width: 'auto', margin: 0, background: 'none', color: 'var(--mar)', border: '1px solid var(--mar)' }} onClick={() => setStep(1)}>Back</button>
              <button className="go" style={{ margin: 0 }} disabled={!consent || busy} onClick={pay}>{busy ? 'Preparing request…' : 'Continue with request · ₹199 ↗'}</button>
            </div>
            <p className="nt" style={{ marginTop: 14, fontSize: '.8rem' }}>Your appointment will be confirmed by the clinic. Payment instructions will be shared separately.</p>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3>Your consultation request is ready</h3>
            <p>{done.sum}</p>
            <p style={{ fontSize: '.9rem', opacity: 0.8 }}>Send your request to the clinic using an option below. Your appointment is pending confirmation.</p>
            <SendOptions text={done.text} name={f.name} />
          </div>
        )}
      </div>
    </div>
  )
}
