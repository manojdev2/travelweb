/* FEATURE CARD VISUALS — compact animated micro-scenes, one per card.
   All decorative loops; resting populated state under prefers-reduced-motion. */

/* 01 — AI Trip Planner: itinerary timeline building day by day */
function VizTimeline() {
  const days = [
    { n: "01", city: "Lisbon", acts: 2 },
    { n: "02", city: "Sintra", acts: 3 },
    { n: "03", city: "Cascais", acts: 2 },
  ];
  return (
    <div className="fv fv--timeline">
      <span className="fv__spine"><i/></span>
      {days.map((d, i) => (
        <div className="fv__day" key={i} style={{ animationDelay: `${i * 0.55}s` }}>
          <span className="fv__day-dot"/>
          <div className="fv__day-card">
            <div className="fv__day-top"><span className="fv__day-n">DAY {d.n}</span><span className="fv__day-city">{d.city}</span></div>
            <div className="fv__day-acts">
              {Array.from({ length: d.acts }).map((_, j) => (
                <span key={j} style={{ animationDelay: `${i * 0.55 + 0.25 + j * 0.12}s` }}/>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* 02 — Custom Trip Planner: drag to reorder rows */
function VizReorder() {
  return (
    <div className="fv fv--reorder">
      {[0,1,2].map(i => (
        <div className={"fv__row" + (i === 1 ? " fv__row--drag" : "")} key={i}>
          <span className="fv__grip"><i/><i/><i/><i/><i/><i/></span>
          <span className="fv__rbar" style={{ width: ["72%","88%","60%"][i] }}/>
        </div>
      ))}
    </div>
  );
}

/* 03 — Budget Estimator: bar chart filling + running total */
function VizBars() {
  const bars = [54, 78, 62, 90, 70];
  return (
    <div className="fv fv--bars">
      <span className="fv__total">₹1,12,000<small>est.</small></span>
      <div className="fv__barwrap">
        {bars.map((h, i) => (
          <span className="fv__bar2" key={i} style={{ ['--h']: h + "%", animationDelay: `${i * 0.12}s` }}/>
        ))}
      </div>
    </div>
  );
}

/* 04 — Hyperlocal: budget pill → local picks slide in */
function VizPicks() {
  const picks = [
    { ico: <Icon.Pin/>, t: "Street food", p: "₹120" },
    { ico: <Icon.Home/>, t: "Local stay", p: "₹990" },
  ];
  return (
    <div className="fv fv--picks">
      <div className="fv__budget">
        <span className="fv__budget-l">Daily budget</span>
        <span className="fv__budget-v">₹2,000</span>
        <span className="fv__budget-track"><i/></span>
      </div>
      <div className="fv__picklist">
        {picks.map((p, i) => (
          <div className="fv__pick" key={i} style={{ animationDelay: `${0.4 + i * 0.5}s` }}>
            <span className="fv__pick-ico">{p.ico}</span>
            <span className="fv__pick-t">{p.t}</span>
            <span className="fv__pick-p">{p.p}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 05 — Explore Places: radar sweep + blips */
function VizRadar() {
  return (
    <div className="fv fv--radar">
      <div className="fv__radar">
        <span className="fv__sweep"/>
        <span className="fv__blip" style={{ left: "64%", top: "34%", animationDelay: "0.2s" }}/>
        <span className="fv__blip" style={{ left: "38%", top: "60%", animationDelay: "1s" }}/>
        <span className="fv__blip" style={{ left: "72%", top: "68%", animationDelay: "1.7s" }}/>
        <span className="fv__radar-pin"><Icon.Pin/></span>
      </div>
    </div>
  );
}

/* 06 — Community Feed: stacked guide cards + floating hearts */
function VizFeed() {
  return (
    <div className="fv fv--feed">
      <div className="fv__stack">
        <span className="fv__fcard fv__fcard--3"/>
        <span className="fv__fcard fv__fcard--2"/>
        <span className="fv__fcard fv__fcard--1">
          <i className="fv__fline"/><i className="fv__fline fv__fline--s"/>
        </span>
      </div>
      <span className="fv__heart" style={{ left: "66%", animationDelay: "0s" }}><Icon.Heart/></span>
      <span className="fv__heart" style={{ left: "78%", animationDelay: "1.1s" }}><Icon.Heart/></span>
    </div>
  );
}

/* 07 — Create & Share: 3-step wizard progress */
function VizSteps() {
  return (
    <div className="fv fv--steps">
      {[1,2,3].map((n, i) => (
        <React.Fragment key={n}>
          <span className="fv__step" style={{ animationDelay: `${i * 0.8}s` }}>{n}</span>
          {i < 2 && <span className="fv__steplink"><i style={{ animationDelay: `${i * 0.8 + 0.4}s` }}/></span>}
        </React.Fragment>
      ))}
    </div>
  );
}

/* 08 — Hotel & Flight: plane flies an arc, then "booked" */
function VizFlight() {
  return (
    <div className="fv fv--flight">
      <svg className="fv__flightsvg" viewBox="0 0 200 96" preserveAspectRatio="xMidYMid meet">
        <path id="fvArc" className="fv__arc" pathLength="1" d="M22 78 Q100 8 178 78" fill="none" stroke="var(--line-2)" strokeWidth="2" strokeDasharray="0.04 0.03"/>
        <circle cx="22" cy="78" r="4" className="fv__arc-end"/>
        <circle cx="178" cy="78" r="4" className="fv__arc-end"/>
        <g className="fv__plane">
          <circle r="9" className="fv__plane-halo"/>
          <path d="M-5 0l8-3-2 3 2 3-8-3z" className="fv__plane-body" transform="rotate(0)"/>
          <animateMotion dur="3.4s" repeatCount="indefinite" rotate="auto" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.45 0 0.2 1">
            <mpath href="#fvArc"/>
          </animateMotion>
        </g>
      </svg>
      <span className="fv__booked"><svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2.5 5.6l2 2L8.5 3.5" stroke="#06140F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> Booked</span>
    </div>
  );
}

/* 09 — Group Collaboration: shared doc + live cursors */
function VizCollab() {
  return (
    <div className="fv fv--collab">
      <div className="fv__doc">
        <i className="fv__dline"/><i className="fv__dline fv__dline--a"/><i className="fv__dline fv__dline--b"/>
      </div>
      <div className="fv__avstack">
        {["L","M","A"].map((a, i) => (
          <span key={i} className="fv__av" style={{ background: ["linear-gradient(135deg,#8b5cf6,#3a1c6d)","linear-gradient(135deg,#2e9b8a,#14463d)","linear-gradient(135deg,#e05a7a,#7a1c3d)"][i] }}>{a}</span>
        ))}
      </div>
      <span className="fv__cursor fv__cursor--a"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1 1l4 10 1.6-4L11 5.4 1 1z" fill="var(--mint)" stroke="var(--bg-2)" strokeWidth="0.8"/></svg></span>
      <span className="fv__cursor fv__cursor--b"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1 1l4 10 1.6-4L11 5.4 1 1z" fill="var(--violet)" stroke="var(--bg-2)" strokeWidth="0.8"/></svg></span>
    </div>
  );
}

/* 10 — Live Data Refresh: live tickers (full-width strip) */
function VizLive() {
  const tk = [
    { ico: <Icon.Wallet/>, l: "Avg price", v: "↓ 12%", d: "0s" },
    { ico: <Icon.Calendar/>, l: "Hours", v: "Updated", d: "0.5s" },
    { ico: <Icon.Refresh/>, l: "Weather", v: "24°C", d: "1s" },
    { ico: <Icon.Pin/>, l: "Closures", v: "2 today", d: "1.5s" },
  ];
  return (
    <div className="fv fv--live">
      <span className="fv__refresh"><Icon.Refresh/></span>
      <div className="fv__tickers">
        {tk.map((t, i) => (
          <div className="fv__ticker" key={i} style={{ animationDelay: t.d }}>
            <span className="fv__ticker-ico">{t.ico}</span>
            <span className="fv__ticker-l">{t.l}</span>
            <span className="fv__ticker-v">{t.v}</span>
            <span className="fv__ticker-dot"/>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, {
  VizTimeline, VizReorder, VizBars, VizPicks, VizRadar, VizFeed, VizSteps, VizFlight, VizCollab, VizLive,
});
