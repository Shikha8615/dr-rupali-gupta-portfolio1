const STEPS = [
  ['Consultation', 'Meet the doctor for history and evaluation.'],
  ['Diagnosis', 'Required tests and clear explanation of results.'],
  ['Treatment Plan', 'A personalised plan for your needs.'],
  ['Follow-up', 'Regular check-ins and ongoing guidance.'],
]

export default function Journey() {
  return (
    <section id="journey" className="jsec">
      <div className="w">
        <div className="sh2"><div><h2>Your Care Journey</h2><p>What to expect when you visit.</p></div></div>
        <div className="jp">
          {STEPS.map(([t, d], i) => (
            <div key={t}><span className="num">{i + 1}</span><h3>{t}</h3><p>{d}</p></div>
          ))}
        </div>
      </div>
    </section>
  )
}
