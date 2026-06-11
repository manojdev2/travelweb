/* FUTURE OF ELECTRIC LIVING — interactive roadmap */

const FUTURE = [
  {
    year: "2027",
    phase: "PHASE 01 · PILOT",
    title: "Vehicle-to-home",
    short: "Bidirectional",
    desc: "Power your house from your battery during peak rates. Refill from solar or off-peak grid overnight. Your car becomes the largest battery you own.",
    capability: "11 kW · bidirectional",
    partners: "PG&E · Sunrun · Tesla Powerwall",
    visual: "v2h",
  },
  {
    year: "2028",
    phase: "PHASE 02 · BETA",
    title: "AI mobility agents",
    short: "Autonomous trips",
    desc: "Delegate trip planning to a model that books charging, routes, parks, and pays end-to-end. Tell it where; it handles the how.",
    capability: "End-to-end delegation",
    partners: "Anthropic · Google · 38 networks",
    visual: "agent",
  },
  {
    year: "2029",
    phase: "PHASE 03 · LIVE",
    title: "Energy trading",
    short: "15-min markets",
    desc: "Sell excess battery back to the grid in 15-minute windows, automatically. Your car earns capacity credits while it sleeps — Alto reads the curve.",
    capability: "Real-time market",
    partners: "CAISO · ERCOT · UK National Grid",
    visual: "trade",
  },
  {
    year: "2030",
    phase: "PHASE 04 · ROLLOUT",
    title: "Autonomous charging",
    short: "Self-plugging",
    desc: "Your car drives itself to the charger while you sleep, eat, or work. Robotic plugs, valet-grade routing, no human in the loop.",
    capability: "Robotic plug · L4 valet",
    partners: "EVgo · Wallbox · Volterio",
    visual: "auto",
  },
  {
    year: "2031",
    phase: "PHASE 05 · SCALE",
    title: "Smart city integration",
    short: "Municipal mesh",
    desc: "Traffic, parking, curbside power, and tolling coordinated across the municipal mesh. The city becomes a single, legible energy surface.",
    capability: "Multi-modal · city-grade",
    partners: "SF · NYC · Tokyo · Oslo",
    visual: "city",
  },
  {
    year: "2033",
    phase: "PHASE 06 · HORIZON",
    title: "Predictive mobility",
    short: "Pre-empted decisions",
    desc: "The system arranges power, rides, charging windows, and routing before you've made the decision. You arrive at a day already smoothed.",
    capability: "Pre-emptive layer",
    partners: "Calendar · Banking · Mesh",
    visual: "predict",
  },
  {
    year: "2035",
    phase: "PHASE 07 · AMBIENT",
    title: "Ambient intelligence",
    short: "Beyond the screen",
    desc: "Your environment becomes the interface. Alto recedes into the cabin, the wall, the city. The phone screen disappears.",
    capability: "Post-screen UX",
    partners: "Spatial · Voice · Glass",
    visual: "ambient",
  },
];

function FutureSection() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const intervalRef = useRef(null);

  // Auto-advance every 5s when "auto" is on
  useEffect(() => {
    if (!auto) return;
    intervalRef.current = setInterval(() => {
      setActive((a) => (a + 1) % FUTURE.length);
    }, 5200);
    return () => clearInterval(intervalRef.current);
  }, [auto]);

  const onSelect = (i) => {
    setAuto(false);
    setActive(i);
  };

  const current = FUTURE[active];

  return (
    <section className="future section" id="future">
      <div className="container">
        <div className="section-head">
          <div className="section-head__idx">07 — ROADMAP</div>
          <Reveal>
            <h2>The decade after<br/>the app.</h2>
            <p>
              Seven phases. One ambient, autonomous, predictive electric life. Pick a year — see what we're building, with whom, and what changes for you.
            </p>
          </Reveal>
        </div>

        <Reveal slow>
          <div className="future-board">
            {/* Timeline header */}
            <div className="future-board__timeline">
              <div className="future-board__line">
                <div className="future-board__line-fill" style={{
                  width: `${(active / (FUTURE.length - 1)) * 100}%`,
                }}/>
              </div>
              <div className="future-board__ticks">
                {FUTURE.map((f, i) => (
                  <button
                    key={i}
                    className={`future-tick ${i === active ? "is-active" : ""} ${i < active ? "is-past" : ""}`}
                    onClick={() => onSelect(i)}
                  >
                    <span className="future-tick__dot"/>
                    <span className="future-tick__year">{f.year}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Body — nav + stage */}
            <div className="future-board__body">
              <nav className="future-board__nav">
                {FUTURE.map((f, i) => (
                  <button
                    key={i}
                    onClick={() => onSelect(i)}
                    className={`future-row ${i === active ? "is-active" : ""}`}
                  >
                    <div className="future-row__num">{String(i + 1).padStart(2, "0")}</div>
                    <div>
                      <div className="future-row__title">{f.title}</div>
                      <div className="future-row__short">{f.short}</div>
                    </div>
                    <Icon.Arrow className="future-row__arrow"/>
                  </button>
                ))}
                <div className="future-board__auto">
                  <button
                    className={`future-auto ${auto ? "is-on" : ""}`}
                    onClick={() => setAuto(a => !a)}
                  >
                    <span className="future-auto__dot"/>
                    {auto ? "Auto · advancing" : "Auto · paused"}
                  </button>
                </div>
              </nav>

              <div className="future-stage">
                <div className="future-stage__visual">
                  <FutureVisual kind={current.visual} key={current.visual}/>
                  <div className="future-stage__visual-grid"/>
                </div>

                <div className="future-stage__panel">
                  <div className="future-stage__head">
                    <span className="future-stage__phase">{current.phase}</span>
                    <span className="future-stage__year">{current.year}</span>
                  </div>
                  <h3 key={current.title} className="future-stage__title">{current.title}</h3>
                  <p key={current.desc} className="future-stage__desc">{current.desc}</p>
                  <div className="future-stage__meta">
                    <div>
                      <div className="future-stage__meta-label">CAPABILITY</div>
                      <div className="future-stage__meta-value">{current.capability}</div>
                    </div>
                    <div>
                      <div className="future-stage__meta-label">WORKING WITH</div>
                      <div className="future-stage__meta-value">{current.partners}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   FUTURE VISUALS — each concept gets a custom animated diagram
   ============================================================ */

function FutureVisual({ kind }) {
  if (kind === "v2h") return <FVHouse/>;
  if (kind === "agent") return <FVAgent/>;
  if (kind === "trade") return <FVTrade/>;
  if (kind === "auto") return <FVAuto/>;
  if (kind === "city") return <FVCity/>;
  if (kind === "predict") return <FVPredict/>;
  if (kind === "ambient") return <FVAmbient/>;
  return null;
}

function FVHouse() {
  return (
    <svg viewBox="0 0 600 400" className="fv">
      <defs>
        <linearGradient id="fv-h-glow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--fx-lime)" stopOpacity="0"/>
          <stop offset="50%" stopColor="var(--fx-lime)" stopOpacity="1"/>
          <stop offset="100%" stopColor="var(--fx-lime)" stopOpacity="0"/>
        </linearGradient>
      </defs>

      {/* HOUSE silhouette */}
      <g transform="translate(80, 140)">
        <path d="M0 100 L70 30 L140 100 L140 200 L0 200 Z" fill="var(--bg-3)" stroke="var(--line-2)" strokeWidth="1"/>
        <rect x="55" y="130" width="30" height="70" fill="var(--bg-2)"/>
        <rect x="20" y="120" width="22" height="22" fill="var(--fx-lime)" opacity="0.5">
          <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite"/>
        </rect>
        <rect x="100" y="120" width="22" height="22" fill="var(--fx-blue)" opacity="0.4"/>
        <text x="70" y="245" textAnchor="middle" fontFamily="var(--mono)" fontSize="9" fill="var(--ink-3)" letterSpacing="2">HOME</text>
      </g>

      {/* CAR */}
      <g transform="translate(380, 230)">
        <path d="M0 30 C 15 5, 50 0, 90 0 L 130 0 C 160 5, 180 18, 190 35 L 200 50 L 200 60 L -5 60 L -5 50 Z"
              fill="var(--bg-3)" stroke="var(--line-2)" strokeWidth="1"/>
        <path d="M30 5 C 60 -5, 110 -5, 150 5 L 180 25 L 165 35 L 35 35 Z" fill="var(--fx-blue)" opacity="0.4"/>
        <circle cx="40" cy="60" r="14" fill="var(--bg-2)" stroke="var(--ink-3)" strokeWidth="0.6"/>
        <circle cx="160" cy="60" r="14" fill="var(--bg-2)" stroke="var(--ink-3)" strokeWidth="0.6"/>
        <text x="100" y="90" textAnchor="middle" fontFamily="var(--mono)" fontSize="9" fill="var(--ink-3)" letterSpacing="2">VEHICLE · 87%</text>
      </g>

      {/* Bidirectional energy line */}
      <path d="M225 260 Q 300 200 380 260" stroke="var(--line-2)" strokeWidth="1.5" fill="none"/>
      <path d="M225 260 Q 300 200 380 260" stroke="url(#fv-h-glow)" strokeWidth="2.5" fill="none" strokeDasharray="14 280" strokeDashoffset="0">
        <animate attributeName="stroke-dashoffset" from="294" to="0" dur="3s" repeatCount="indefinite"/>
      </path>

      {/* Energy flow markers */}
      <g>
        <circle r="3" fill="var(--fx-lime)">
          <animateMotion dur="3s" repeatCount="indefinite" path="M225 260 Q 300 200 380 260"/>
        </circle>
        <circle r="3" fill="var(--fx-blue)" opacity="0.7">
          <animateMotion dur="3s" begin="-1s" repeatCount="indefinite" path="M380 260 Q 300 200 225 260"/>
        </circle>
      </g>

      {/* Labels */}
      <text x="300" y="190" textAnchor="middle" fontFamily="var(--mono)" fontSize="9" fill="var(--fx-lime)" letterSpacing="2">11 kW · BIDIRECTIONAL</text>

      {/* Sun + grid badges */}
      <g transform="translate(120, 60)">
        <circle r="14" fill="none" stroke="var(--fx-lime)" strokeWidth="1" opacity="0.6"/>
        <circle r="6" fill="var(--fx-lime)" opacity="0.5"/>
        <text y="32" textAnchor="middle" fontFamily="var(--mono)" fontSize="8" fill="var(--ink-3)" letterSpacing="1.5">SOLAR</text>
      </g>
    </svg>
  );
}

function FVAgent() {
  // central orb + radiating task cards
  return (
    <svg viewBox="0 0 600 400" className="fv">
      <defs>
        <radialGradient id="fv-a-orb">
          <stop offset="0%" stopColor="var(--fx-blue)" stopOpacity="1"/>
          <stop offset="100%" stopColor="var(--fx-blue)" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* central orb */}
      <g transform="translate(300, 200)">
        <circle r="120" fill="none" stroke="var(--line)" strokeWidth="0.5" strokeDasharray="2 6">
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="40s" repeatCount="indefinite"/>
        </circle>
        <circle r="80" fill="none" stroke="var(--line-2)" strokeWidth="0.5"/>
        <circle r="40" fill="url(#fv-a-orb)" opacity="0.8"/>
        <circle r="20" fill="var(--fx-blue)" opacity="0.9">
          <animate attributeName="r" values="18;22;18" dur="3s" repeatCount="indefinite"/>
        </circle>

        {/* task tickets orbiting */}
        {[
          { x: -150, y: -60, label: "BOOK PARKING" },
          { x: 130, y: -80, label: "RESERVE CHARGER" },
          { x: 160, y: 60, label: "PAY TOLLS" },
          { x: -130, y: 90, label: "ROUTE TRAFFIC" },
        ].map((t, i) => (
          <g key={i} transform={`translate(${t.x}, ${t.y})`}>
            <line x1="0" y1="0" x2={-t.x * 0.35} y2={-t.y * 0.35} stroke="var(--fx-lime)" strokeWidth="0.5" opacity="0.6" strokeDasharray="2 4">
              <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="2s" repeatCount="indefinite"/>
            </line>
            <rect x="-40" y="-12" width="80" height="24" rx="4" fill="var(--bg-2)" stroke="var(--line-2)" strokeWidth="0.6"/>
            <text textAnchor="middle" y="4" fontFamily="var(--mono)" fontSize="8" fill="var(--ink)" letterSpacing="1.5">{t.label}</text>
            <circle cx="-32" r="2.5" fill="var(--fx-lime)">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin={`${i * 0.5}s`} repeatCount="indefinite"/>
            </circle>
          </g>
        ))}

        <text y="135" textAnchor="middle" fontFamily="var(--mono)" fontSize="9" fill="var(--ink-3)" letterSpacing="2">ALTO AGENT</text>
      </g>
    </svg>
  );
}

function FVTrade() {
  // candlestick + buy/sell arrows
  const bars = useMemo(() => Array.from({ length: 18 }, (_, i) => ({
    h: 40 + Math.sin(i * 0.7) * 60 + Math.random() * 30,
    up: Math.random() > 0.45,
  })), []);
  return (
    <svg viewBox="0 0 600 400" className="fv">
      <g transform="translate(60, 80)">
        {/* axes */}
        <line x1="0" y1="240" x2="480" y2="240" stroke="var(--line-2)" strokeWidth="0.5"/>
        <line x1="0" y1="0" x2="0" y2="240" stroke="var(--line-2)" strokeWidth="0.5"/>

        {/* horizontal gridlines */}
        {[60, 120, 180].map((y, i) => (
          <line key={i} x1="0" y1={y} x2="480" y2={y} stroke="var(--line)" strokeWidth="0.5" strokeDasharray="2 4"/>
        ))}

        {/* bars */}
        {bars.map((b, i) => (
          <g key={i}>
            <rect
              x={i * 26 + 10}
              y={240 - b.h}
              width="14"
              height={b.h}
              fill={b.up ? "var(--fx-lime)" : "var(--fx-blue)"}
              opacity="0.45"
            >
              <animate attributeName="height" from={b.h} to={b.h * 0.9} dur={`${1 + (i % 4) * 0.3}s`} repeatCount="indefinite" values={`${b.h};${b.h*1.1};${b.h*0.9};${b.h}`}/>
            </rect>
            <rect x={i * 26 + 14} y={240 - b.h - 4} width="6" height="4" fill={b.up ? "var(--fx-lime)" : "var(--fx-blue)"}/>
          </g>
        ))}

        {/* live current marker */}
        <g transform="translate(420, 90)">
          <circle r="6" fill="var(--fx-lime)" opacity="0.4">
            <animate attributeName="r" values="5;12;5" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle r="4" fill="var(--fx-lime)"/>
          <text x="14" y="4" fontFamily="var(--mono)" fontSize="11" fill="var(--ink)" letterSpacing="1">High demand</text>
          <text x="14" y="18" fontFamily="var(--mono)" fontSize="8" fill="var(--fx-lime)" letterSpacing="1">SELLING</text>
        </g>

        <text x="0" y="-12" fontFamily="var(--mono)" fontSize="9" fill="var(--ink-3)" letterSpacing="2">LIVE · 15-MIN MARKET</text>
      </g>
    </svg>
  );
}

function FVAuto() {
  // dashed self-drive arc to charger
  return (
    <svg viewBox="0 0 600 400" className="fv">
      <defs>
        <radialGradient id="fv-auto-glow">
          <stop offset="0%" stopColor="var(--fx-lime)" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="var(--fx-lime)" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* parking lot grid */}
      <g stroke="var(--line)" strokeWidth="0.5" fill="none">
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={i} x1={80 + i * 80} y1="80" x2={80 + i * 80} y2="320"/>
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <line key={i} x1="80" y1={80 + i * 80} x2="480" y2={80 + i * 80}/>
        ))}
      </g>

      {/* dashed path */}
      <path d="M120 290 Q 200 290 200 230 Q 200 170 280 170 Q 360 170 360 130" stroke="var(--fx-lime)" strokeWidth="1.5" fill="none" strokeDasharray="6 6" opacity="0.75">
        <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="2s" repeatCount="indefinite"/>
      </path>

      {/* start position (car silhouette top-down) */}
      <g transform="translate(110, 280)">
        <ellipse cx="10" cy="15" rx="20" ry="35" fill="url(#fv-auto-glow)"/>
        <rect x="-2" y="-8" width="24" height="42" rx="6" fill="var(--bg-3)" stroke="var(--fx-lime)" strokeWidth="0.8"/>
        <rect x="0" y="-2" width="20" height="14" fill="var(--fx-blue)" opacity="0.5"/>
      </g>

      {/* end charger */}
      <g transform="translate(348, 120)">
        <rect x="0" y="0" width="24" height="40" rx="3" fill="var(--bg-2)" stroke="var(--fx-lime)" strokeWidth="1"/>
        <circle cx="12" cy="14" r="3" fill="var(--fx-lime)">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.2s" repeatCount="indefinite"/>
        </circle>
        <rect x="6" y="22" width="12" height="3" rx="1" fill="var(--fx-lime)" opacity="0.5"/>
        <text x="12" y="56" textAnchor="middle" fontFamily="var(--mono)" fontSize="8" fill="var(--ink-3)" letterSpacing="1.5">DOCK #04</text>
      </g>

      {/* status badge */}
      <g transform="translate(60, 50)">
        <rect width="180" height="30" rx="15" fill="var(--bg-2)" stroke="var(--line-2)"/>
        <circle cx="18" cy="15" r="4" fill="var(--fx-lime)">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1s" repeatCount="indefinite"/>
        </circle>
        <text x="32" y="19" fontFamily="var(--mono)" fontSize="9" fill="var(--ink)" letterSpacing="1.5">SELF-PARKING · L4 VALET</text>
      </g>
    </svg>
  );
}

function FVCity() {
  // hex / dot network
  const nodes = useMemo(() => {
    const list = [];
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 9; c++) {
        list.push({
          x: 60 + c * 55 + (r % 2 === 0 ? 0 : 27),
          y: 70 + r * 45,
          active: Math.random() > 0.65,
        });
      }
    }
    return list;
  }, []);
  return (
    <svg viewBox="0 0 600 400" className="fv">
      {/* connection lines */}
      <g stroke="var(--line)" strokeWidth="0.4" fill="none">
        {nodes.map((n, i) => {
          if (i + 1 < nodes.length && i % 4 !== 0) {
            const m = nodes[i + 1];
            return <line key={i} x1={n.x} y1={n.y} x2={m.x} y2={m.y}/>;
          }
          return null;
        })}
      </g>

      {/* nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          {n.active && (
            <circle cx={n.x} cy={n.y} r="6" fill="var(--fx-blue)" opacity="0.3">
              <animate attributeName="r" values="3;10;3" dur={`${2 + (i % 4) * 0.5}s`} repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.4;0;0.4" dur={`${2 + (i % 4) * 0.5}s`} repeatCount="indefinite"/>
            </circle>
          )}
          <circle cx={n.x} cy={n.y} r="1.6" fill={n.active ? "var(--fx-blue)" : "var(--ink-3)"} opacity={n.active ? 1 : 0.4}/>
        </g>
      ))}

      {/* car route over the mesh */}
      <path d="M30 280 Q 180 280 240 220 Q 320 160 420 130 Q 480 110 560 80" stroke="var(--fx-lime)" strokeWidth="2" fill="none" strokeDasharray="4 4" opacity="0.9">
        <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="2s" repeatCount="indefinite"/>
      </path>
      <circle r="4" fill="var(--fx-lime)">
        <animateMotion dur="6s" repeatCount="indefinite" path="M30 280 Q 180 280 240 220 Q 320 160 420 130 Q 480 110 560 80"/>
      </circle>

      <text x="30" y="50" fontFamily="var(--mono)" fontSize="9" fill="var(--ink-3)" letterSpacing="2">MUNICIPAL MESH · 1,284 NODES</text>
    </svg>
  );
}

function FVPredict() {
  // clock with future ring
  return (
    <svg viewBox="0 0 600 400" className="fv">
      <g transform="translate(300, 200)">
        {/* outer ring with hours */}
        <circle r="140" fill="none" stroke="var(--line)" strokeWidth="0.5"/>
        <circle r="120" fill="none" stroke="var(--line-2)" strokeWidth="0.5" strokeDasharray="3 8">
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="60s" repeatCount="indefinite"/>
        </circle>

        {/* hour ticks */}
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2 - Math.PI / 2;
          const x1 = Math.cos(a) * 140;
          const y1 = Math.sin(a) * 140;
          const x2 = Math.cos(a) * (i % 6 === 0 ? 125 : 132);
          const y2 = Math.sin(a) * (i % 6 === 0 ? 125 : 132);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={i % 6 === 0 ? "var(--ink-2)" : "var(--line-2)"} strokeWidth="0.8"/>;
        })}

        {/* now line */}
        <line x1="0" y1="0" x2="0" y2="-140" stroke="var(--fx-lime)" strokeWidth="1.5"/>
        <circle r="5" fill="var(--fx-lime)"/>

        {/* future events on ring */}
        {[
          { a: 0.18, label: "COFFEE" },
          { a: 0.35, label: "CHARGE" },
          { a: 0.52, label: "TOLL" },
          { a: 0.68, label: "DINNER" },
          { a: 0.82, label: "HOME" },
        ].map((e, i) => {
          const ang = e.a * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(ang) * 100;
          const y = Math.sin(ang) * 100;
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="8" fill="var(--bg-2)" stroke="var(--fx-blue)" strokeWidth="1"/>
              <circle cx={x} cy={y} r="3" fill="var(--fx-blue)"/>
              <text x={x} y={y + 22} textAnchor="middle" fontFamily="var(--mono)" fontSize="8" fill="var(--ink-2)" letterSpacing="1">{e.label}</text>
            </g>
          );
        })}

        <text textAnchor="middle" y="-160" fontFamily="var(--mono)" fontSize="9" fill="var(--ink-3)" letterSpacing="2">NEXT 24H · PRE-ARRANGED</text>
        <text textAnchor="middle" y="4" fontFamily="var(--display)" fontSize="22" fill="var(--ink)" letterSpacing="-1">9:41</text>
      </g>
    </svg>
  );
}

function FVAmbient() {
  // dispersed field — no screen
  const dots = useMemo(() => Array.from({ length: 80 }, () => ({
    x: 30 + Math.random() * 540,
    y: 40 + Math.random() * 320,
    r: 1 + Math.random() * 3,
    delay: Math.random() * 4,
  })), []);
  return (
    <svg viewBox="0 0 600 400" className="fv">
      <defs>
        <radialGradient id="fv-amb">
          <stop offset="0%" stopColor="var(--fx-blue)" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="var(--fx-blue)" stopOpacity="0"/>
        </radialGradient>
      </defs>

      <rect width="600" height="400" fill="url(#fv-amb)" opacity="0.4"/>

      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={i % 5 === 0 ? "var(--fx-lime)" : "var(--fx-blue)"} opacity="0.6">
          <animate attributeName="opacity" values="0.1;0.8;0.1" dur="4s" begin={`${d.delay}s`} repeatCount="indefinite"/>
        </circle>
      ))}

      {/* whispered voice ribbon */}
      <path d="M40 200 Q 180 160, 300 200 T 560 200" stroke="var(--fx-blue)" strokeWidth="0.8" fill="none" opacity="0.6" strokeDasharray="2 6">
        <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="5s" repeatCount="indefinite"/>
      </path>
      <path d="M40 220 Q 200 180, 320 220 T 560 220" stroke="var(--fx-lime)" strokeWidth="0.6" fill="none" opacity="0.5" strokeDasharray="2 6">
        <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="7s" repeatCount="indefinite"/>
      </path>

      <text x="300" y="60" textAnchor="middle" fontFamily="var(--mono)" fontSize="9" fill="var(--ink-3)" letterSpacing="2">NO SCREEN · ALL PRESENT</text>
    </svg>
  );
}

window.FutureSection = FutureSection;
