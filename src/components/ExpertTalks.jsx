import { Youtube, Arrow, ArrowUR, Leaf } from './Icons'
import { SOCIAL } from '../config'

const VIDEOS = [
  { id: 'SiuRLB7VOPM', category: 'Featured Video', title: 'Pregnancy: First Trimester — What to Expect and How to Take Care', description: 'Explore early pregnancy care, common changes and questions to discuss at your first visit.' },
  { id: 'j4p49gLg1MU', category: 'Pregnancy Care', title: 'Second Trimester Care — Growth, Tests and Tips', description: 'Guidance on pregnancy changes, checkups and everyday care during your second trimester.' },
  { id: 'pzqBUYgTMGE', category: 'Holistic Wellbeing', title: 'Garbhsanskar Guidance — Preparing Mentally and Emotionally', description: 'Explore mindful routines, relaxation and emotional wellbeing during pregnancy.' },
]

function TalkCard({ video, featured = false }) {
  return (
    <article className={`talk-card ${featured ? 'talk-featured' : 'talk-compact'}`}>
      <div className="talk-player"><iframe src={`https://www.youtube.com/embed/${video.id}?playsinline=1&rel=0`} title={video.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div>
      <div className="talk-copy">
        <span className={`talk-badge ${featured ? 'talk-featured-badge' : ''}`}>{featured && <span aria-hidden="true">★</span>}{video.category}</span>
        <h3>{video.title}</h3><p>{video.description}</p>
        <a className="talk-watch" href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer"><Youtube s={19} /><span>Watch on YouTube</span><ArrowUR s={15} /></a>
      </div>
    </article>
  )
}

export default function ExpertTalks() {
  return (
    <section id="expert-talks" aria-labelledby="expert-talks-heading">
      <div className="talk-decoration" aria-hidden="true"><Leaf s={210} /></div>
      <div className="w">
        <div className="talks-heading"><span className="talk-badge talks-label"><span className="talks-play" aria-hidden="true">▶</span>Videos</span><h2 id="expert-talks-heading">Expert Talks with Dr. Rupali</h2><p>Trusted video guidance for every stage of women’s health.</p></div>
        <div className="talks-grid"><TalkCard video={VIDEOS[0]} featured /><div className="talks-side">{VIDEOS.slice(1).map(video => <TalkCard key={video.id} video={video} />)}</div></div>
        <div className="talks-footer"><a className="talks-all" href={SOCIAL.youtube} target="_blank" rel="noopener noreferrer">View All Expert Talks <Arrow s={18} /></a></div>
      </div>
    </section>
  )
}
