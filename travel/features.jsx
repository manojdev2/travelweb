/* SECTION 3 — FEATURES BENTO GRID */

function FeaturesSection() {
  const feats = [
    { ico: <Icon.Bot/>, title: "AI Trip Planner", viz: <VizTimeline/>, body: "Day-by-day itineraries with smart pacing and route optimization — no more zig-zagging across the city.", span: "fc-6 fc-r2", meta: ["Day-by-day", "Smart pacing", "Route AI"] },
    { ico: <Icon.Route/>, title: "Custom Trip Planner", viz: <VizReorder/>, body: "Edit, drag, adjust. Make any AI plan unmistakably yours.", span: "fc-3", meta: [] },
    { ico: <Icon.Wallet/>, title: "Budget Estimator", viz: <VizBars/>, body: "Total cost + per-day breakdown across stays, food & insurance.", span: "fc-3", meta: [] },
    {
      ico: <Icon.Pin/>, title: "Hyperlocal Travel with Budget Specs", badge: "New", viz: <VizPicks/>,
      body: "Set an exact daily budget and get hyper-specific local picks — street food, local stays, transit routes. Never a tourist trap.",
      span: "fc-6", feature: true, meta: ["Street-level", "Zero markup"],
    },
    { ico: <Icon.Map/>, title: "Explore Places", viz: <VizRadar/>, body: "Maps, ratings, AI summaries — save anything straight to your plan.", span: "fc-3", meta: [] },
    { ico: <Icon.Search/>, title: "Community Inspiration Feed", viz: <VizFeed/>, body: "Searchable guides from real travelers, not algorithms.", span: "fc-3", meta: [] },
    { ico: <Icon.Plus/>, title: "Create & Share a Guide", viz: <VizSteps/>, body: "A 3-step wizard turns your trip into a guide others can book.", span: "fc-4", meta: [] },
    { ico: <Icon.Plane/>, title: "Hotel & Flight Booking", viz: <VizFlight/>, body: "Live API integrations — book the whole trip without leaving Alto.", span: "fc-4", meta: [] },
    { ico: <Icon.Users/>, title: "Group Collaboration", viz: <VizCollab/>, body: "Real-time editing, budget splitting, and group voting.", span: "fc-4", meta: [] },
    { ico: <Icon.Refresh/>, title: "24/7 Live Data Refresh", viz: <VizLive/>, vizAfter: true, body: "Prices, hours, closures & weather — always current, automatically.", span: "fc-12 feat-card--live", meta: ["Always-on", "Auto-sync"] },
  ];
  return (
    <section className="features" id="features">
      <div className="container">
        <div className="section-head">
          <Reveal delay={80}>
            <h2>Everything a trip needs, <em>in one canvas.</em></h2>
            <p>Ten tools that used to live in ten tabs — now a single, intelligent surface that plans, prices, books and adapts with you.</p>
          </Reveal>
        </div>
        <div className="features__grid">
          {feats.map((f, i) => (
            <Reveal key={i} delay={(i % 3) * 90} className={"feat-card " + f.span + (f.feature ? " is-feature" : "")} data-hover>
              <div className="feat-card__glow"/>
              <div className="feat-card__top">
                <div className="feat-card__ico">{f.ico}</div>
                {f.badge && <span className="feat-card__badge">{f.badge}</span>}
              </div>
              {f.viz && !f.vizAfter && <div className="feat-card__viz">{f.viz}</div>}
              <div className="feat-card__text">
                <h3 className="feat-card__title">{f.title}</h3>
                <p className="feat-card__body">{f.body}</p>
                {f.meta && f.meta.length > 0 && (
                  <div className="feat-card__meta">{f.meta.map((m, j) => <span className="feat-card__pill" key={j}>{m}</span>)}</div>
                )}
              </div>
              {f.viz && f.vizAfter && <div className="feat-card__viz">{f.viz}</div>}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

window.FeaturesSection = FeaturesSection;
