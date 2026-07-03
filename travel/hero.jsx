/* SECTION 1 — HERO (two-column: copy + cohesive trip preview) */

function HeroPreview({ step }) {
  const rows = [
    { ico: <Icon.Plane/>, t: "Land at LIS · 09:40", s: "Airport → Alfama transfer", tag: "DAY 1" },
    { ico: <Icon.Pin/>, t: "Time Out Market", s: "Lunch · 5 min walk", tag: "12:30" },
    { ico: <Icon.Home/>, t: "Boutique stay, Alfama", s: "₹6,500 / night · local pick", tag: "STAY" },
  ];
  return (
    <div className="hp">
      <div className="hp__scene">
        <img className="hp__scene-photo" alt="Lisbon, Portugal" loading="lazy"
          src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=900&q=80&auto=format&fit=crop"
          onError={(e) => { e.currentTarget.style.display = "none"; }}/>
        <Scene type="city"/>
        <div className="hp__scene-shade"/>
        <div className="hp__scene-top">
          <span className="hp__live"><span className="hp__live-dot"/> ALTO AI · BUILDING</span>
          <span className="hp__scene-meta">3-DAY TRIP</span>
        </div>
        <div className="hp__scene-place">
          <div className="hp__scene-city">Lisbon</div>
          <div className="hp__scene-sub">Portugal · ₹58,000 all-in</div>
        </div>
      </div>

      <div className="hp__body">
        {rows.map((r, i) => (
          <div className={"hp__row" + (step > i + 1 ? " is-in" : "")} key={i}>
            <div className="hp__row-ico">{r.ico}</div>
            <div className="hp__row-main">
              <div className="hp__row-t">{r.t}</div>
              <div className="hp__row-s">{r.s}</div>
            </div>
            <span className="hp__row-tag">{r.tag}</span>
          </div>
        ))}

        <div className={"hp__meter" + (step >= 6 ? " is-in" : "")}>
          <div className="hp__meter-head"><span><Icon.Route style={{ width: 12, height: 12 }}/> Route optimized</span><span className="hp__meter-val">−42 min</span></div>
          <div className="hp__meter-track"><i/></div>
          <div className="hp__meter-foot"><span><Icon.Shield style={{ width: 11, height: 11 }}/> Human-verified</span><span className="hp__conf">96% confidence</span></div>
        </div>
      </div>

      <div className="hp__chip hp__chip--budget"><Icon.Wallet style={{ width: 12, height: 12 }}/> Under budget <b>−₹2,800</b></div>
    </div>
  );
}

function HeroScene() {
  const [ready, setReady] = useState(false);
  const [step, setStep] = useState(0);
  useEffect(() => {
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
    const t0 = setTimeout(() => setReady(true), 120);
    const timers = [];
    for (let i = 0; i < 8; i++) {
      timers.push(setTimeout(() => setStep((s) => Math.max(s, i + 1)), 220 + i * 150));
    }
    return () => { cancelAnimationFrame(r); clearTimeout(t0); timers.forEach(clearTimeout); };
  }, []);
  const headline = [
    { t: "Plan", em: false },
    { t: "Smarter.", em: false, br: true },
    { t: "Travel", em: true },
    { t: "Better.", em: true },
  ];
  return (
    <header className={"hero" + (ready ? " is-ready" : "")} id="top">
      <div className="hero__media">
        <div className="hero__videofallback" aria-hidden="true"/>
        <img className="hero__photo" alt="" loading="eager"
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000&q=80&auto=format&fit=crop"
          onError={(e) => { e.currentTarget.style.display = "none"; }}/>
      </div>
      <div className="hero__veil"/>

      <div className="hero__inner">
        <div className="container">
          <div className="hero__grid">
            {/* LEFT — copy */}
            <div className="hero__copy">
              <div className="hero__badges">
                <span className="chip"><span className="chip__dot"/> AI + HUMAN INTELLIGENCE</span>
                <span className="chip">120+ DESTINATIONS</span>
              </div>

              <h1 className="hero__headline">
                {headline.map((w, i) => (
                  <React.Fragment key={i}>
                    <span className={"hw" + (step > i ? " is-shown" : "")}>
                      {w.em ? <em>{w.t}</em> : w.t}
                    </span>{w.br ? <br/> : " "}
                  </React.Fragment>
                ))}
              </h1>

              <p className={"hero__sub" + (step >= 5 ? " is-shown" : "")}>
                Your perfect trip — itinerary, budget, and local secrets — built in
                seconds, verified by people who live there.
              </p>
              <div className={"hero__ctas" + (step >= 6 ? " is-shown" : "")}>
                <button className="btn btn--primary" onClick={() => { goToApp(); }}><span>Start planning free</span><Icon.Arrow className="btn__arrow"/></button>
                <button className="btn btn--ghost"><span className="btn__play"><Icon.Play style={{ width: 9, height: 9 }}/></span> Watch demo</button>
              </div>

              <div className={"hero__stats" + (step >= 7 ? " is-shown" : "")}>
                {[
                  { v: "10K+", l: "Trips generated" },
                  { v: "4.9", suf: "★", l: "Traveler rating" },
                  { v: "60", suf: "s", l: "Avg. plan time" },
                ].map((s, i) => (
                  <div className="hero__stat" key={i}>
                    <div className="hero__stat-value"><b>{s.v}</b>{s.suf && <span>{s.suf}</span>}</div>
                    <div className="hero__stat-label">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — trip preview */}
            <div className={"hero__preview" + (ready ? " is-in" : "")}>
              <HeroPreview step={step}/>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__scrollcue">Scroll<i/></div>
    </header>
  );
}

window.HeroScene = HeroScene;
