import { Heart, ArrowUR } from './Icons'

export default function CtaBanner({ onBook }) {
  return (
    <section className="cb2">
      <div className="w">
        <div className="bnr">
          <i className="bh"><Heart s={28} fill="currentColor" /></i>
          <div className="bt"><b>Your health deserves<br />personalised care.</b><span>Book your consultation today.</span></div>
          <a className="wb" href="#book" onClick={e => { e.preventDefault(); onBook() }}>Book Appointment <ArrowUR s={16} /></a>
        </div>
      </div>
    </section>
  )
}
