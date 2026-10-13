import { useEffect, useState } from 'react'
import { EmergencyIcon } from './EmergencyBooking'
import { Cal } from './Icons'

export default function EmergencyQuickBooking({ paused, onExpand, onConsult }) {
  const [kind, setKind] = useState('emergency')
  const [visible, setVisible] = useState(false)
  const [cycle, setCycle] = useState(0)
  const [details, setDetails] = useState({ name: '', phone: '' })
  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      if (document.hidden || document.activeElement?.matches('input,textarea,select')) return
      if (visible) setKind(value => value === 'emergency' ? 'consultation' : 'emergency')
      else setVisible(true)
    }, 5000)
    return () => clearInterval(timer)
  }, [paused, visible, cycle])
  const dismiss = () => { setVisible(false); setCycle(value => value + 1) }
  useEffect(() => {
    if (!visible || paused) return
    const escape = event => { if (event.key === 'Escape') dismiss() }
    document.addEventListener('keydown', escape)
    return () => document.removeEventListener('keydown', escape)
  }, [visible, paused])
  if (!visible || paused) return null
  return <aside key={kind} className={`emergency-quick${kind === 'consultation' ? ' consultation-quick' : ''}`} aria-labelledby="emergency-quick-heading">
    <button className="quick-close" type="button" aria-label="Close short booking form" onClick={dismiss}>×</button>
    <div className="quick-heading"><span>{kind === 'emergency' ? <EmergencyIcon /> : <Cal s={24} />}</span><div><h3 id="emergency-quick-heading">{kind === 'emergency' ? 'Emergency Booking' : 'Consultancy Booking'}</h3><p>{kind === 'emergency' ? '₹299 · 9 AM–6 PM' : '24/7'}</p></div></div>
    <form onSubmit={event => { event.preventDefault(); dismiss(); (kind === 'emergency' ? onExpand : onConsult)(details) }}>
      <label>Name<input required autoComplete="name" placeholder="Your full name" pattern=".*\S.*" value={details.name} onChange={event => setDetails(value => ({ ...value, name: event.target.value }))} /></label>
      <label>Mobile Number<input required type="tel" autoComplete="tel" placeholder="Contact number" pattern="[0-9+\s-]{10,15}" value={details.phone} onChange={event => setDetails(value => ({ ...value, phone: event.target.value }))} /></label>
      <button type="submit" className="quick-book">Open to Book Now <span aria-hidden="true">↗</span></button>
    </form>
  </aside>
}
