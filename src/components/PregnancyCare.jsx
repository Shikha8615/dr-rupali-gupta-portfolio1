import { useState } from 'react'

const STAGES = [
  { title: 'First Trimester', weeks: 'Weeks 1–12', items: [
    ['Baby Development', 'The early foundations of the brain, spinal cord and organs begin to form.'],
    ["Mother’s Changes", 'Nausea, tiredness and breast tenderness are common. Discuss persistent vomiting or difficulty drinking with your doctor.'],
    ['Diet Chart', 'Breakfast: oats or whole-grain roti with pasteurised curd. Lunch: dal, roti or rice and cooked vegetables. Snack: washed fruit. Dinner: beans or well-cooked eggs with vegetables. Choose smaller meals if nauseated.'],
    ['Tests & Checkups', 'Book your first antenatal visit. Your doctor will review your history, blood pressure, blood and urine tests, dating ultrasound and screening options.'],
    ['Care & Precautions', 'Avoid alcohol and smoking. Wash produce, use pasteurised dairy and cook meat and eggs thoroughly. Check every medicine or herbal supplement with your doctor.'],
    ["Doctor’s Guidance", 'Discuss folic acid, other supplements, nausea relief and a care schedule suited to your medical history.'],
  ] },
  { title: 'Second Trimester', weeks: 'Weeks 13–27', items: [
    ['Baby Development', 'Your baby continues growing and becoming more active; you may begin noticing movements.'],
    ["Mother’s Changes", 'Your bump grows and nausea may ease. Back discomfort and changes in skin can occur.'],
    ['Diet Chart', 'Breakfast: vegetable poha with curd. Lunch: dal or beans, whole grains and vegetables. Snack: fruit and unsalted nuts if tolerated. Dinner: paneer made with pasteurised milk or well-cooked lean protein with vegetables.'],
    ['Tests & Checkups', 'Continue antenatal visits for blood pressure, urine and growth checks. Discuss the anatomy scan and gestational diabetes screening with your doctor.'],
    ['Care & Precautions', 'Stay hydrated and discuss suitable activity. Avoid contact sports or activities with a risk of falling. Report pain, bleeding or concerning symptoms.'],
    ["Doctor’s Guidance", 'Review iron and calcium needs, emotional wellbeing and your baby’s developing movement pattern.'],
  ] },
  { title: 'Third Trimester', weeks: 'Weeks 28–Birth', items: [
    ['Baby Development', 'Your baby gains weight and continues maturing in preparation for birth.'],
    ["Mother’s Changes", 'Heartburn, sleep difficulty and increased pressure can occur. Discuss symptoms and comfort measures at your visits.'],
    ['Diet Chart', 'Breakfast: whole-grain toast or idli with a protein option. Lunch: dal, rice or roti and vegetables. Snack: pasteurised curd or fruit. Dinner: a smaller balanced meal with protein and vegetables; drink water regularly.'],
    ['Tests & Checkups', 'Follow your personalised visit schedule for blood pressure, urine, growth and baby-position checks. Additional scans or blood tests depend on your individual needs.'],
    ['Care & Precautions', 'Contact your maternity team immediately for reduced or changed baby movements, bleeding, leaking fluid, severe headache, vision changes or severe abdominal pain. Do not wait for the next appointment.'],
    ["Doctor’s Guidance", 'Discuss labour signs, birth preferences, transport, hospital preparation, breastfeeding and care after delivery.'],
  ] },
]

export default function PregnancyCare({ onBook }) {
  const [expanded, setExpanded] = useState([0, 1, 2])
  return (
    <div className="pregnancy-guide" aria-labelledby="pregnancy-heading">
      <div className="pregnancy-hero"><div><p className="services-eyebrow">Pregnancy Care</p>
      <h2 id="pregnancy-heading">Your pregnancy journey, step by step</h2>
      <p className="pregnancy-intro">Explore each stage to understand routine care, nutrition and preparation.</p>
      <button className="pill appointment-highlight" type="button" onClick={onBook}>Book Appointment</button></div><img src="/images/pregnancy-care.jpg" alt="A pregnant woman discussing her pregnancy care with a doctor" width="1000" height="667" /></div>
      {STAGES.map((stage, index) => (
        <div className="trimester" key={stage.title}>
          <h3><button type="button" id={`trimester-button-${index}`} aria-expanded={expanded.includes(index)} aria-controls={`trimester-panel-${index}`} onClick={() => setExpanded(current => current.includes(index) ? current.filter(item => item !== index) : [...current, index])}>
            <span>{stage.title}<small>{stage.weeks}</small></span><span aria-hidden="true">{expanded.includes(index) ? '−' : '+'}</span>
          </button></h3>
          <div className={`trimester-panel ${expanded.includes(index) ? 'is-open' : ''}`} id={`trimester-panel-${index}`} role="region" aria-labelledby={`trimester-button-${index}`} inert={expanded.includes(index) ? undefined : ''} aria-hidden={!expanded.includes(index)}>
            <div><div className="pregnancy-topics">{stage.items.map(([title, description]) => <article key={title}><h4>{title}</h4><p>{description}</p></article>)}</div></div>
          </div>
        </div>
      ))}
      <p className="pregnancy-note">Meal ideas are general examples. Dr. Rupali Gupta can tailor nutrition, tests and supplements to your health, allergies and pregnancy needs.</p>
      <div className="pregnancy-actions"><button className="pill appointment-highlight" type="button" onClick={onBook}>Book Appointment</button><a href="/index.html#expert-talks">Watch Dr. Rupali’s expert talks →</a></div>
      <p className="pregnancy-sources">Further reading: <a href="https://www.nhs.uk/pregnancy/your-pregnancy-care/your-antenatal-care-and-appointments/" target="_blank" rel="noopener noreferrer">Antenatal care</a> · <a href="https://www.nhs.uk/best-start-in-life/pregnancy/healthy-eating-in-pregnancy/" target="_blank" rel="noopener noreferrer">Healthy eating</a></p>
    </div>
  )
}
