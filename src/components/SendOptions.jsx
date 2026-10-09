import { useState } from 'react'
import { WA_NUMBER, EMAIL, PHONE } from '../config'

// WhatsApp app / WhatsApp web / Email / Call (+ optional copy)
export default function SendOptions({ text, name, copy }) {
  const [copied, setCopied] = useState('')
  const q = encodeURIComponent(text)
  const st = bg => ({ display: 'block', textAlign: 'center', margin: '6px 0', padding: 10, borderRadius: 30, border: 0, color: '#fff', fontWeight: 600, background: bg, fontFamily: 'inherit', fontSize: '1rem', cursor: 'pointer', width: '100%' })
  const doCopy = async () => {
    try { await navigator.clipboard.writeText(text); setCopied('✔ Copied') }
    catch {
      const a = document.createElement('textarea')
      a.value = text; document.body.appendChild(a); a.select()
      try { document.execCommand('copy'); setCopied('✔ Copied') } catch { setCopied('Copy failed') }
      a.remove()
    }
  }
  return (
    <div>
      <a style={st('#25d366')} target="_blank" rel="noopener noreferrer" href={`whatsapp://send?phone=${WA_NUMBER}&text=${q}`}>💬 Send on WhatsApp app</a>
      <a style={st('#128c7e')} target="_blank" rel="noopener noreferrer" href={`https://wa.me/${WA_NUMBER}?text=${q}`}>🌐 WhatsApp Web / link</a>
      <a style={st('var(--mar)')} href={`mailto:${EMAIL}?subject=${encodeURIComponent('Appointment request – ' + name)}&body=${q}`}>✉️ Send by Email</a>
      <a style={st('var(--pink)')} href={`tel:${PHONE.replace(/-/g, '')}`}>📞 Call Now</a>
      {copy && <button type="button" style={st('#555')} onClick={doCopy}>{copied || '📋 Copy message'}</button>}
    </div>
  )
}
