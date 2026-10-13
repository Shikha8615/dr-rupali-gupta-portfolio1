import { useEffect, useRef, useState } from 'react'
import SendOptions from './SendOptions'
import './EmergencyBooking.css'

export function EmergencyIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 18v-6a6 6 0 0 1 12 0v6M4 18h16v3H4zM12 1v2M3 5l2 2M21 5l-2 2M1 12h2M21 12h2" /></svg>
}

const EMPTY = { name: '', phone: '', concern: 'Pregnancy-related concern', description: '', date: '', time: '', payment: 'Not paid — request payment instructions', reference: '' }
const dateToday = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date())

export default function EmergencyBooking({ open, onClose, initialDetails }) {
  const [form, setForm] = useState(EMPTY)
  const [request, setRequest] = useState(null)
  const panel = useRef(null)
  const previousFocus = useRef(null)
  const change = key => event => setForm(value => ({ ...value, [key]: event.target.value }))
  useEffect(() => {
    if (open && initialDetails) setForm(value => ({ ...value, name: initialDetails.name, phone: initialDetails.phone }))
  }, [open, initialDetails])
  useEffect(() => {
    if (!open) return
    setRequest(null)
    previousFocus.current = document.activeElement
    panel.current?.focus()
    const oldOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const keydown = event => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab') return
      const items = [...panel.current.querySelectorAll('button,a,input,select,textarea')].filter(element => !element.disabled)
      const first = items[0], last = items[items.length - 1]
      if (event.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) { event.preventDefault(); last?.focus() }
      else if (!event.shiftKey && (document.activeElement === last || document.activeElement === panel.current)) { event.preventDefault(); first?.focus() }
    }
    document.addEventListener('keydown', keydown)
    return () => { document.body.style.overflow = oldOverflow; document.removeEventListener('keydown', keydown); previousFocus.current?.focus() }
  }, [open, onClose])
  if (!open) return null
  const submit = event => {
    event.preventDefault()
    const text = `Urgent consultation request for Dr. Rupali Gupta\nPatient: ${form.name.trim()}\nMobile: ${form.phone.trim()}\nConcern: ${form.concern}\nDescription: ${form.description.trim()}\nPreferred date: ${form.date}\nPreferred time: ${form.time} IST\nFee: ₹299\nPayment: ${form.payment}${form.reference ? `\nPayment reference: ${form.reference.trim()}` : ''}\nAppointment and payment verification pending clinic confirmation.`
    setRequest(text)
    panel.current?.scrollTo({ top: 0 })
  }
  return <div className="urgent-overlay" onClick={event => event.target === event.currentTarget && onClose()}><div className="urgent-panel" ref={panel} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="urgent-heading" aria-describedby="urgent-warning">
    <button className="urgent-close" type="button" onClick={onClose} aria-label="Close emergency booking">×</button>
    <div className="urgent-title"><span><EmergencyIcon /></span><div><p>Priority care request</p><h2 id="urgent-heading">Emergency Appointment</h2></div></div>
    <p className="urgent-warning" id="urgent-warning">For immediate danger, severe bleeding, chest pain, difficulty breathing or other life-threatening symptoms, <a href="tel:112">call 112 in India</a> or go to the nearest emergency department. This form is not monitored for emergencies.</p>
    <div className="urgent-summary"><div><small>Consultation fee</small><strong>₹299</strong></div><div><small>Booking hours · IST</small><strong>9 AM – 6 PM</strong></div></div>
    {request ? <div className="urgent-result"><h3>Your request is ready to send</h3><p>Choose an option below to send it to the clinic. Your appointment is pending confirmation; payment details will be verified by the clinic.</p><SendOptions text={request} name={form.name} copy /><button className="urgent-edit" type="button" onClick={() => setRequest(null)}>Edit details</button></div> : <form className="urgent-form" onSubmit={submit}>
      <p className="urgent-intro">Request a priority consultation with Dr. Rupali Gupta. Please provide your contact details and a brief description.</p>
      <div className="urgent-grid"><label>Patient Name<input required autoComplete="name" placeholder="Full name" value={form.name} onChange={change('name')} pattern=".*\S.*" /></label><label>Mobile Number<input required type="tel" autoComplete="tel" placeholder="Contact number" pattern="[0-9+\s-]{10,15}" value={form.phone} onChange={change('phone')} /></label></div>
      <label>Type of Concern<select value={form.concern} onChange={change('concern')}>{['Pregnancy-related concern', 'Menstrual or bleeding concern', 'Pelvic pain or discomfort', 'Medicine or treatment concern', 'Other gynaecology concern'].map(text => <option key={text}>{text}</option>)}</select></label>
      <label>Brief Description<textarea required rows="3" placeholder="Briefly describe your concern and when it started" value={form.description} onChange={change('description')} /></label>
      <div className="urgent-grid"><label>Preferred Appointment Date<input required type="date" min={dateToday()} value={form.date} onChange={change('date')} /></label><label>Preferred Time<select required value={form.time} onChange={change('time')}><option value="">Choose a time</option>{Array.from({ length: 19 }, (_, i) => { const hour = 9 + Math.floor(i / 2), minutes = i % 2 ? '30' : '00'; const time = `${hour > 12 ? hour - 12 : hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`; return <option key={time}>{time}</option> })}</select></label></div>
      <label className="urgent-consent urgent-validity"><input required type="checkbox" /><span><strong>Consultation validity — 7 days</strong><br />I understand that my consultation is valid for 7 days from the consultation date. I consent to the clinic using the details provided to arrange my consultation.</span></label>
      <div className="urgent-actions"><button type="button" className="urgent-back" onClick={onClose}>Back</button><button type="submit" className="urgent-submit">Continue with request · ₹299 ↗</button></div>
      <p className="urgent-payment-note">Your appointment will be confirmed by the clinic. Payment instructions will be shared separately.</p>
    </form>}
  </div></div>
}
