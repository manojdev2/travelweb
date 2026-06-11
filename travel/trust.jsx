/* SECTION 2 — TRUST INTELLIGENCE FABRIC */

/* — Card 1: self-drawing route map with a pulse traveling the path — */
function RouteViz() {
  return (
    <div className="tv tv--route">
      <svg className="tv__svg" viewBox="0 0 240 150" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="tvRoute" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--mint)"/>
            <stop offset="1" stopColor="var(--violet)"/>
          </linearGradient>
        </defs>
        <path id="tvRoutePath" className="tv__route" pathLength="1"
          d="M28 122 C74 122 66 52 122 58 S190 96 214 34" fill="none"
          stroke="url(#tvRoute)" strokeWidth="2.6" strokeLinecap="round"/>
        {[[28,122],[122,58],[214,34]].map(([x,y],i) => (
          <g key={i} className="tv__node" style={{ animationDelay: `${i*0.5}s` }}>
            <circle cx={x} cy={y} r="11" className="tv__node-ring"/>
            <circle cx={x} cy={y} r="4.5" className="tv__node-dot"/>
          </g>
        ))}
        <circle r="5" className="tv__travel" fill="var(--mint)">
          <animateMotion dur="3.6s" repeatCount="indefinite" rotate="auto" calcMode="spline"
            keyPoints="0;1" keyTimes="0;1" keySplines="0.4 0 0.2 1">
            <mpath href="#tvRoutePath"/>
          </animateMotion>
        </circle>
      </svg>
      <div className="tv__chip tv__chip--a"><Icon.Plane style={{ width: 10, height: 10 }}/> Day 1 · Lisbon</div>
      <div className="tv__chip tv__chip--b">−42 min walking</div>
    </div>
  );
}

/* — Card 2: dropping location pins + verified local avatars — */
function ExpertsViz() {
  const pins = [{ x: "22%", y: "30%" }, { x: "54%", y: "20%" }, { x: "74%", y: "46%" }];
  const avs = ["L", "M", "A"];
  const grads = ["linear-gradient(135deg,#8b5cf6,#3a1c6d)", "linear-gradient(135deg,#2e9b8a,#14463d)", "linear-gradient(135deg,#e05a7a,#7a1c3d)"];
  return (
    <div className="tv tv--experts">
      <div className="tv__map"/>
      <svg className="tv__dash" viewBox="0 0 240 150" preserveAspectRatio="none">
        <path d="M53 45 L130 30 L178 69" fill="none" stroke="var(--line-2)" strokeWidth="1.5" strokeDasharray="4 5" className="tv__dashline"/>
      </svg>
      {pins.map((p, i) => (
        <div key={i} className="tv__pin" style={{ left: p.x, top: p.y, animationDelay: `${i*0.55}s` }}>
          <Icon.Pin/>
        </div>
      ))}
      <div className="tv__verify"><Icon.Shield style={{ width: 11, height: 11 }}/> Verified by locals</div>
      <div className="tv__avatars">
        {avs.map((a, i) => (
          <span key={i} className="tv__avatar" style={{ background: grads[i], animationDelay: `${0.2+i*0.18}s` }}>{a}</span>
        ))}
        <span className="tv__avatar tv__avatar--check"><Icon.Arrow style={{ width: 0, height: 0 }}/>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M3 6.5l2.4 2.4L10 4" stroke="#06140F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
      </div>
    </div>
  );
}

/* — Card 3: live confidence gauge + metering bars — */
function ConfidenceViz() {
  return (
    <div className="tv tv--conf">
      <svg className="tv__gauge" viewBox="0 0 120 120">
        <defs>
          <linearGradient id="tvGauge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--mint)"/>
            <stop offset="1" stopColor="var(--violet)"/>
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="46" fill="none" stroke="var(--line)" strokeWidth="9"/>
        <circle cx="60" cy="60" r="46" fill="none" stroke="url(#tvGauge)" strokeWidth="9" strokeLinecap="round"
          className="tv__gauge-arc" pathLength="1" transform="rotate(-90 60 60)"/>
      </svg>
      <div className="tv__gauge-label"><b>96</b><span>%</span><i>confidence</i></div>
      <div className="tv__bars">
        {[{ l: "Source", w: "92%", d: "0s" }, { l: "Freshness", w: "88%", d: "0.25s" }, { l: "Local sign-off", w: "97%", d: "0.5s" }].map((b, i) => (
          <div className="tv__bar" key={i}>
            <span className="tv__bar-l">{b.l}</span>
            <div className="tv__bar-track"><i style={{ ['--w']: b.w, animationDelay: b.d }}/></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrustSection() {
  const cards = [
    {
      ico: <Icon.Bot/>, num: "01", title: "Agentic AI", visual: <RouteViz/>,
      body: "Autonomous agents build your full trip end-to-end — flights, stays, routes, day-by-day pacing — adapting in real time as plans change.",
      tag: "Autonomous trip building",
    },
    {
      ico: <Icon.User/>, num: "02", title: "Human Expertise Layer", visual: <ExpertsViz/>,
      body: "Verified local experts review every plan, swapping tourist traps for the places they'd actually send a friend in their own city.",
      tag: "People who live there",
    },
    {
      ico: <Icon.Shield/>, num: "03", title: "Accountability Engine", visual: <ConfidenceViz/>,
      body: "Every recommendation ships with a confidence score and a source — so you always know why it's on your itinerary, and how sure we are.",
      tag: "Confidence on everything",
    },
  ];
  return (
    <section className="trust" id="intelligence">
      <div className="container">
        <Reveal className="trust__head">
          <span className="eyebrow">The new layer of trust</span>
          <h2 className="trust__title">
            Human Trust <em>Intelligence</em> Fabric<sup>™</sup>
          </h2>
          <p className="trust__sub">
            AI plans at machine speed. Humans keep it honest. Together they form a fabric of
            trust woven through every trip you take with Alto.
          </p>
        </Reveal>
        <div className="trust__grid">
          {cards.map((c, i) => (
            <Reveal key={i} delay={i * 130} className="trust-card" data-hover>
              <div className="trust-card__glow"/>
              <div className="trust-card__num">{c.num}</div>
              <div className="trust-card__visual">
                {c.visual}
                <div className="trust-card__ico">{c.ico}</div>
              </div>
              <h3 className="trust-card__title">{c.title}</h3>
              <p className="trust-card__body">{c.body}</p>
              <div className="trust-card__tag">{c.tag}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

window.TrustSection = TrustSection;
