/* SECTION 8 — PRICING */

function PricingSection() {
  const [yearly, setYearly] = useState(false);
  const pillRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current, pill = pillRef.current;
    if (!wrap || !pill) return;
    const btns = wrap.querySelectorAll("button");
    const active = btns[yearly ? 1 : 0];
    pill.style.left = active.offsetLeft + "px";
    pill.style.width = active.offsetWidth + "px";
  }, [yearly]);

  const Check = () => (
    <span className="price-card__check"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
  );

  const plans = [
    {
      name: "Basic", monthly: 999, desc: "For the solo wanderer testing the waters.",
      feats: ["AI trip planner", "Budget estimator", "Explore places & maps", "10 trip plans", "Community feed access"],
      rec: false, btn: "ghost",
    },
    {
      name: "Pro", monthly: 1999, desc: "For the frequent traveler who plans like a local.",
      feats: ["Everything in Basic", "Hyperlocal budget specs", "Human expert review", "20 trip plans", "Group collaboration", "Hotel & flight booking"],
      rec: true, btn: "primary",
    },
    {
      name: "Elite", monthly: 2999, desc: "For pros, creators & travel concierges.",
      feats: ["Everything in Pro", "Priority human experts", "Create & sell guides", "30 trip plans", "API & white-label access", "Dedicated trip concierge"],
      rec: false, btn: "ghost",
    },
  ];

  const priceOf = (m) => Math.round(yearly ? (m * 0.8) : m);

  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <div className="pricing__head">
          <span className="eyebrow">Plans</span>
          <h2>Pick a pace. <em>Upgrade anytime.</em></h2>
          <div className="pricing__toggle-wrap">
            <div className="pricing__toggle" ref={wrapRef}>
              <div className="pricing__toggle-pill" ref={pillRef}/>
              <button className={!yearly ? "is-active" : ""} onClick={() => setYearly(false)}>Monthly</button>
              <button className={yearly ? "is-active" : ""} onClick={() => setYearly(true)}>Yearly <span className="pricing__save">−20%</span></button>
            </div>
          </div>
        </div>
        <div className="pricing__grid">
          {plans.map((p, i) => (
            <Reveal key={i} delay={i * 110} className={"price-card" + (p.rec ? " is-rec" : "")} data-hover>
              {p.rec && <div className="price-card__rec">Recommended</div>}
              <div className="price-card__name">{p.name}</div>
              <div className="price-card__price"><small>₹</small>{priceOf(p.monthly).toLocaleString("en-IN")}<small>/mo</small></div>
              <div className="price-card__cycle">{yearly ? `Billed ₹${(priceOf(p.monthly) * 12).toLocaleString("en-IN")} yearly` : "Billed monthly"}</div>
              <p className="price-card__desc">{p.desc}</p>
              <button className={"btn btn--" + p.btn + " price-card__btn"}><span>{p.rec ? "Start free trial" : "Choose " + p.name}</span></button>
              <ul className="price-card__feats">
                {p.feats.map((f, j) => <li key={j}><Check/>{f}</li>)}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

window.PricingSection = PricingSection;
