/* SECTION 4 — HYPERLOCAL (interactive budget slider) */

function HyperlocalSection() {
  const cities = [
    {
      key: "mumbai", name: "Mumbai", flag: "🇮🇳", cur: "₹", tab: "INR",
      min: 800, max: 4000, def: 1800, step: 100,
      perday: (v) => `Home currency · zero forex`,
      picks: (v) => [
        { ico: <Icon.Pin/>, t: v < 1500 ? "Anand Stall vada pav" : "Britannia & Co. berry pulao", s: "Street food · local legend", p: `${Math.round(v * 0.18)}` },
        { ico: <Icon.Home/>, t: v < 2200 ? "Colaba backpacker dorm" : "Bandra boutique stay", s: "Local stay · per night", p: `${Math.round(v * 0.55)}` },
        { ico: <Icon.Route/>, t: "Local train + share auto", s: "Transit · zero markup", p: `${Math.round(v * 0.06)}` },
      ],
    },
    {
      key: "bali", name: "Bali", flag: "🇮🇩", cur: "₹", tab: "INR",
      min: 1000, max: 10000, def: 2100, step: 100,
      perday: (v) => `≈ Rp ${(v * 190).toLocaleString()} / day`,
      picks: (v) => [
        { ico: <Icon.Pin/>, t: v < 1900 ? "Warung Bu Mangku nasi" : "Ubud night market feast", s: "Street food · local pick", p: `${Math.round(v * 0.18).toLocaleString("en-IN")}` },
        { ico: <Icon.Home/>, t: v < 3000 ? "Canggu surf homestay" : "Rice-field bamboo villa", s: "Local stay · per night", p: `${Math.round(v * 0.55).toLocaleString("en-IN")}` },
        { ico: <Icon.Route/>, t: "Scooter rental + petrol", s: "Transit · the local way", p: `${Math.round(v * 0.10).toLocaleString("en-IN")}` },
      ],
    },
    {
      key: "paris", name: "Paris", flag: "🇫🇷", cur: "₹", tab: "INR",
      min: 3200, max: 20000, def: 5000, step: 100,
      perday: (v) => `≈ €${Math.round(v / 90)} / day`,
      picks: (v) => [
        { ico: <Icon.Pin/>, t: v < 4500 ? "Marché d'Aligre baguette" : "Le Baratin neighborhood bistro", s: "Local eat · no queue", p: `${Math.round(v * 0.22).toLocaleString("en-IN")}` },
        { ico: <Icon.Home/>, t: v < 7200 ? "Belleville artist room" : "Canal St-Martin flat", s: "Local stay · per night", p: `${Math.round(v * 0.55).toLocaleString("en-IN")}` },
        { ico: <Icon.Route/>, t: "Métro carnet + vélo", s: "Transit · like a Parisian", p: `${Math.round(v * 0.07).toLocaleString("en-IN")}` },
      ],
    },
  ];

  const [ci, setCi] = useState(0);
  const c = cities[ci];
  const [val, setVal] = useState(c.def);
  React.useEffect(() => { setVal(cities[ci].def); }, [ci]);

  const pct = ((val - c.min) / (c.max - c.min)) * 100;
  const picks = c.picks(val);

  return (
    <section className="hyper" id="hyperlocal">
      <div className="container">
        <div className="hyper__layout">
          {/* LEFT — mockup */}
          <Reveal blur>
            <div className="hyper__mock">
              <div className="hyper__mock-glow"/>
              <div className="hyper__mock-head">
                <div className="hyper__mock-city">
                  <div className="hyper__mock-flag">{c.flag}</div>
                  <div>
                    <div className="hyper__mock-cname">{c.name}</div>
                    <div className="hyper__mock-tab">HYPERLOCAL MODE</div>
                  </div>
                </div>
                <span className="chip" style={{ color: "var(--mint)", borderColor: "rgba(255,255,255,0.14)" }}><span className="chip__dot"/> LIVE</span>
              </div>

              <div className="hyper__mock-citytabs">
                {cities.map((city, i) => (
                  <button key={city.key} className={"hyper__citytab" + (i === ci ? " is-active" : "")} onClick={() => setCi(i)}>{city.name}</button>
                ))}
              </div>

              <div className="hyper__budget-label">Your daily budget</div>
              <div className="hyper__budget-val">{c.cur}{val.toLocaleString()}<span> /day</span></div>
              <div className="hyper__budget-perday">{c.perday(val)}</div>

              <div className="hyper__slider">
                <div className="hyper__range-track">
                  <div className="hyper__range-fill" style={{ width: `${pct}%` }}/>
                  <input className="hyper__range" type="range" min={c.min} max={c.max} step={c.step} value={val}
                    onChange={(e) => setVal(Number(e.target.value))}/>
                </div>
                <div className="hyper__ticks"><span>{c.cur}{c.min.toLocaleString()}</span><span>SHOESTRING → COMFORT</span><span>{c.cur}{c.max.toLocaleString()}</span></div>
              </div>

              <div className="hyper__results">
                {picks.map((p, i) => (
                  <div className="hyper__result" key={c.key + i + p.t}>
                    <div className="hyper__result-ico">{p.ico}</div>
                    <div className="hyper__result-main">
                      <div className="hyper__result-t">{p.t}</div>
                      <div className="hyper__result-s">{p.s}</div>
                    </div>
                    <div className="hyper__result-price">{c.cur}{p.p}</div>
                  </div>
                ))}
              </div>

              <div className="hyper__mock-foot"><span>HAND-CHECKED BY LOCALS</span><span><b>0%</b> TOURIST MARKUP</span></div>
            </div>
          </Reveal>

          {/* RIGHT — copy */}
          <Reveal delay={120} className="hyper__copy">
            <span className="eyebrow">New · Budget specs</span>
            <h2 className="hyper__title">Your budget. <em>Your neighborhood.</em></h2>
            <p className="hyper__desc">
              Input ₹800/day or ₹8,000/day — and get street-level, hyper-specific plans: local dhabas,
              walking routes, hidden stays. Zero tourist markup, drag the slider and watch it adapt.
            </p>
            <div className="hyper__cities">
              {[
                { flag: "🇮🇳", name: "Mumbai", cur: "₹", v: "1,800" },
                { flag: "🇮🇩", name: "Bali", cur: "₹", v: "2,100" },
                { flag: "🇫🇷", name: "Paris", cur: "₹", v: "5,000" },
              ].map((city, i) => (
                <div className="hyper__cityrow" key={i}>
                  <div className="hyper__cityrow-name"><span className="hyper__cityrow-flag">{city.flag}</span>{city.name}</div>
                  <div className="hyper__cityrow-val"><b>{city.cur}{city.v}</b><small>/DAY</small></div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

window.HyperlocalSection = HyperlocalSection;
