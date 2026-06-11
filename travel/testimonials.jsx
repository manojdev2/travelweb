/* SECTION 7 — SOCIAL PROOF / TESTIMONIALS */

function TestimonialsSection() {
  const stats = [
    { v: "10K", suf: "+", l: "Trips generated" },
    { v: "4.9", suf: "★", l: "Average rating" },
    { v: "120", suf: "+", l: "Destinations" },
  ];
  const cards = [
    { quote: <>Planned a 9-day Vietnam trip in <b>under a minute</b>. The local picks were things no blog had — and every price was bang on.</>, name: "Aanya R.", handle: "@aanyawanders", av: "A", g: "linear-gradient(135deg,#8b5cf6,#3a1c6d)", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&q=70&auto=format&fit=crop" },
    { quote: <>The confidence scores sold me. I finally trust an AI itinerary because <b>a real local signed off on it.</b></>, name: "Marco V.", handle: "@marcoeats", av: "M", g: "linear-gradient(135deg,#2e9b8a,#14463d)", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&q=70&auto=format&fit=crop" },
    { quote: <>Split a group trip across 6 friends with zero spreadsheet chaos. Budgets, votes, bookings — <b>all in one place.</b></>, name: "Leïla K.", handle: "@leila.maps", av: "L", g: "linear-gradient(135deg,#e05a7a,#7a1c3d)", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&q=70&auto=format&fit=crop" },
  ];
  return (
    <section className="proof">
      <div className="container">
        <div className="section-head">
          <Reveal delay={80}><h2>Built in seconds. <em>Trusted for the whole trip.</em></h2></Reveal>
        </div>
        <div className="proof__grid">
          <Reveal className="proof__stat" blur>
            {stats.map((s, i) => (
              <div className="proof__stat-cell" key={i}>
                <div className="proof__stat-v"><b>{s.v}</b><sup>{s.suf}</sup></div>
                <div className="proof__stat-l">{s.l}</div>
              </div>
            ))}
          </Reveal>
          {cards.map((c, i) => (
            <Reveal key={i} delay={i * 110} className="proof-card" data-hover>
              <div className="proof-card__stars">{[0,1,2,3,4].map(j => <Icon.Star key={j} style={{ width: 14, height: 14 }}/>)}</div>
              <p className="proof-card__quote">{c.quote}</p>
              <div className="proof-card__user">
                <div className="proof-card__avatar" style={{ background: c.g }}>
                  {c.av}
                  <img src={c.img} alt={c.name} loading="lazy"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}/>
                </div>
                <div>
                  <div className="proof-card__name">{c.name}</div>
                  <div className="proof-card__handle">{c.handle}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

window.TestimonialsSection = TestimonialsSection;
