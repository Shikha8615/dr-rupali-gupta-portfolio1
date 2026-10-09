import { ArrowUR, Heart, Users, Award } from './Icons'
import { STATS } from '../config'

export default function Hero({ onBook }) {
  return (
    <section className="hero" id="top">
      <div className="hs">
        <span className="wm" aria-hidden="true">Rupali</span>
        <img className="hp" src="/images/doctor-cut.webp" alt="Dr. Rupali Gupta, Gynaecologist" />
        <span className="tg tgw"><b>Healthy Women</b><i>|</i><b>Happy Families</b><i>|</i><b>Brighter Future</b></span>
        <div className="hrt"><b>{STATS[0][0]}</b><span>Years of experience in women's health &amp; Garbhsanskar care.</span></div>
        <div className="hi">
          <p className="hey">Hey, this is</p>
          <h1>Dr. Rupali</h1>
          <p className="sub">Gynaecologist &amp; Garbhsanskar Guide<br />Women's Health Expert in Ahmedabad</p>
          <a className="pill" href="#book" onClick={e => { e.preventDefault(); onBook() }}>Book An Appointment <ArrowUR s={16} /></a>
        </div>
        <div className="hpt">
          <span className="stk"><i><Heart s={15} /></i><i><Users s={15} /></i><i><Award s={15} /></i></span>
          <div><b>{STATS[1][0]}</b><span>Satisfied Patients</span></div>
        </div>
      </div>
    </section>
  )
}
