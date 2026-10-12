const STEPS = [
  ['Consultation', 'Meet the doctor for history and evaluation.'],
  ['Diagnosis', 'Required tests and clear explanation of results.'],
  ['Treatment Plan', 'A personalised plan for your needs.'],
  ['Follow-up', 'Regular check-ins and ongoing guidance.'],
]

function StepIllustration({ step }) {
  const drawings = [
    <><rect x="17" y="22" width="62" height="44" rx="12" /><path d="m55 66 13 12V66" /><circle cx="33" cy="44" r="2" /><circle cx="48" cy="44" r="2" /><circle cx="63" cy="44" r="2" /></>,
    <><path d="M27 20v22a18 18 0 0 0 36 0V20M27 22h9M63 22h-9M45 60v8a14 14 0 0 0 28 0V54" /><circle cx="73" cy="47" r="7" /><path d="M34 17v10M56 17v10" /></>,
    <><rect x="25" y="22" width="48" height="59" rx="7" /><rect x="37" y="16" width="24" height="13" rx="4" /><path d="M38 44h22M38 56h10M38 68h22M58 51v10M53 56h10" /></>,
    <><rect x="20" y="23" width="58" height="57" rx="9" /><path d="M20 39h58M35 17v13M63 17v13m-26 31 9 9 17-20" /></>,
  ]
  return <svg className="journey-illustration" viewBox="0 0 100 100" width="100" height="100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle className="journey-icon-halo" cx="50" cy="50" r="45" stroke="none" />{drawings[step]}</svg>
}

export default function Journey() {
  return (
    <section id="journey" className="jsec" aria-labelledby="journey-heading">
      <div className="w">
        <div className="sh2"><div><h2 id="journey-heading">Care at Every Step</h2><p>Personalised support, from your first conversation to continuing care.</p></div></div>
        <div className="journey-flow">
          <svg className="journey-route" viewBox="0 0 1120 440" preserveAspectRatio="none" fill="none" aria-hidden="true">
            <defs><linearGradient id="journey-gradient" x1="0" y1="0" x2="1120" y2="440" gradientUnits="userSpaceOnUse"><stop stopColor="#7773ce" /><stop offset=".5" stopColor="#3b82f6" /><stop offset="1" stopColor="#20b9c3" /></linearGradient></defs>
            <path className="journey-route-base" d="M110 24H235Q280 24 280 69V371Q280 416 325 416H515Q560 416 560 371V69Q560 24 605 24H795Q840 24 840 69V371Q840 416 885 416H1010" />
            <path className="journey-route-light" pathLength="100" d="M110 24H235Q280 24 280 69V371Q280 416 325 416H515Q560 416 560 371V69Q560 24 605 24H795Q840 24 840 69V371Q840 416 885 416H1010" />
            <circle cx="110" cy="24" r="10" /><circle cx="1010" cy="416" r="10" />
          </svg>
        <ol className="journey-cards">
          {STEPS.map(([t, d], i) => (
            <li className="journey-card" key={t} style={{ '--step-delay': `${i * .5}s` }}><div className="journey-card-content"><StepIllustration step={i} /><span className="journey-step">Step {String(i + 1).padStart(2, '0')}</span><h3>{t}</h3><p>{d}</p></div></li>
          ))}
        </ol>
        </div>
      </div>
    </section>
  )
}
