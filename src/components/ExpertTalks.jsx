const VIDEOS = ['SiuRLB7VOPM', 'j4p49gLg1MU', 'pzqBUYgTMGE']

export default function ExpertTalks() {
  return (
    <section id="expert-talks" aria-labelledby="expert-talks-heading">
      <div className="w">
        <div className="sh2">
          <h2 id="expert-talks-heading">Expert Talks by Dr. Rupali Gupta – Your Health, Our Priority</h2>
        </div>
        <div className="talks-grid">
          {VIDEOS.map((id, index) => (
            <div className="talk-card" key={id}>
              <iframe
                src={`https://www.youtube.com/embed/${id}?playsinline=1&rel=0`}
                title={`Expert talk by Dr. Rupali Gupta ${index + 1}`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
              <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
