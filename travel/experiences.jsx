/* SECTION 5 — EXPERIENCES CAROUSEL */

function ExperiencesSection() {
  const trackRef = useRef(null);
  const exps = [
    { cat: "Desert Safari", scene: "desert", title: "Dunes of Merzouga", place: "Morocco", days: "3 days", price: "₹28,500", rating: "4.9", grad: "linear-gradient(160deg, #e0a35a, #8a4a20)", img: "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=900&q=80&auto=format&fit=crop" },
    { cat: "Mountain Hike", scene: "mountain", title: "Annapurna Base Camp", place: "Nepal", days: "9 days", price: "₹73,000", rating: "5.0", grad: "linear-gradient(160deg, #5a7da0, #1c2b3d)", img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&q=80&auto=format&fit=crop" },
    { cat: "City Tour", scene: "city", title: "Neon Tokyo After Dark", place: "Japan", days: "4 days", price: "₹43,500", rating: "4.8", grad: "linear-gradient(160deg, #6d4a8a, #1a0f2a)", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=900&q=80&auto=format&fit=crop" },
    { cat: "Beach Relax", scene: "beach", title: "Hidden Coves of Palawan", place: "Philippines", days: "5 days", price: "₹51,000", rating: "4.9", grad: "linear-gradient(160deg, #2eb0a0, #0f463d)", img: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=900&q=80&auto=format&fit=crop" },
    { cat: "Desert Safari", scene: "camp", title: "Wadi Rum Star Camp", place: "Jordan", days: "2 days", price: "₹23,500", rating: "4.9", grad: "linear-gradient(160deg, #c25a3e, #2a0f14)", img: "https://images.unsplash.com/photo-1547234935-80c7145ec969?w=900&q=80&auto=format&fit=crop" },
  ];

  const scroll = (dir) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * 398, behavior: "smooth" });
  };

  return (
    <section className="exp" id="explore">
      <div className="container">
        <div className="exp__head">
          <div>
            <span className="eyebrow">Curated experiences</span>
            <h2>Stories worth <em>the flight.</em></h2>
          </div>
          <div className="exp__nav">
            <button className="exp__navbtn" onClick={() => scroll(-1)} aria-label="Previous"><Icon.Arrow style={{ transform: "rotate(180deg)" }}/></button>
            <button className="exp__navbtn" onClick={() => scroll(1)} aria-label="Next"><Icon.Arrow/></button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="exp__track" ref={trackRef}>
          {exps.map((e, i) => (
            <article className="exp-card" key={i} data-hover>
              <div className="exp-card__img" style={{ background: e.grad }}>
                <Scene type={e.scene}/>
                <img className="exp-card__photo" src={e.img} alt={e.title} loading="lazy"
                  onError={(ev) => { ev.currentTarget.style.display = "none"; }}/>
              </div>
              <div className="exp-card__tagimg">{e.cat.toUpperCase()}</div>
              <div className="exp-card__shade"/>
              <div className="exp-card__body">
                <div className="exp-card__cat">{e.cat} · {e.place}</div>
                <h3 className="exp-card__title">{e.title}</h3>
                <div className="exp-card__stats">
                  <div className="exp-card__stat"><div className="exp-card__stat-v">{e.days}</div><div className="exp-card__stat-l">Duration</div></div>
                  <div className="exp-card__stat"><div className="exp-card__stat-v">{e.price}</div><div className="exp-card__stat-l">From / person</div></div>
                  <div className="exp-card__stat"><div className="exp-card__stat-v"><Icon.Star style={{ width: 12, height: 12, color: "var(--mint)" }}/>{e.rating}</div><div className="exp-card__stat-l">Rating</div></div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

window.ExperiencesSection = ExperiencesSection;
