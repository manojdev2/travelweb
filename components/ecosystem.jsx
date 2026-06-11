/* ALTO.EV ECOSYSTEM — interactive constellation */

const ECO_NODES = [
  {
    id: "vehicle",
    label: "Vehicle",
    eyebrow: "01 · VEHICLE",
    title: "Your EV, finally aware.",
    body: "Telemetry, battery health, climate, software updates — all read into Alto's model in real time. Your car learns once, the system remembers everywhere.",
    bullets: ["Live telemetry", "Battery health", "Climate sync", "OTA updates"],
    accent: "var(--fx-blue)",
    angle: -90,
    icon: "car",
  },
  {
    id: "home",
    label: "Home",
    eyebrow: "02 · HOME",
    title: "The wall charger that learns.",
    body: "Schedules around utility rates and solar production. Pre-warms the cabin before you leave. Powers the house if the grid drops.",
    bullets: ["Solar-aware", "Off-peak scheduling", "V2H ready", "Pre-conditioning"],
    accent: "var(--fx-lime)",
    angle: -18,
    icon: "home",
  },
  {
    id: "wallet",
    label: "Wallet",
    eyebrow: "03 · WALLET",
    title: "One tap, every plug.",
    body: "Pay across 38 networks without thinking about plug-and-charge contracts. Apple, Google, or card — Alto routes payment invisibly.",
    bullets: ["38 networks", "Plug-and-charge", "Invisible routing", "Single receipt"],
    accent: "oklch(0.78 0.16 65)",
    angle: 54,
    icon: "wallet",
  },
  {
    id: "grid",
    label: "Grid",
    eyebrow: "04 · GRID",
    title: "Public charging, demystified.",
    body: "Live availability, wait times, and charger health — all visible before you commit. Alto books, reserves, and re-routes if something changes.",
    bullets: ["Live availability", "Wait-time data", "Auto-reroute", "Stall reservation"],
    accent: "var(--fx-blue)",
    angle: 126,
    icon: "grid",
  },
  {
    id: "rewards",
    label: "Rewards",
    eyebrow: "05 · REWARDS",
    title: "Energy that gives back.",
    body: "Off-peak charging earns credits and carbon offsets. Alto runs the optimization in the background so you don't have to think about it.",
    bullets: ["Off-peak credits", "Carbon offsets", "Annual report", "No tracking"],
    accent: "oklch(0.70 0.20 330)",
    angle: 198,
    icon: "rewards",
  },
];

function EcosystemSection() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const i = setInterval(() => setActive(a => (a + 1) % ECO_NODES.length), 4400);
    return () => clearInterval(i);
  }, [auto]);

  const select = (i) => { setAuto(false); setActive(i); };
  const current = ECO_NODES[active];

  return (
    <section className="ecosystem section" id="ecosystem">
      <div className="container">
        <div className="section-head">
          <div className="section-head__idx">04 — ECOSYSTEM</div>
          <Reveal>
            <h2>One intelligence,<br/>every surface of your day.</h2>
            <p>
              Your vehicle, home charger, wallet, the public grid, your rewards — all reading from the same predictive model. Touch a node to see how Alto AI runs across it.
            </p>
          </Reveal>
        </div>

        <Reveal slow>
          <div className="eco-stage">
            <div className="eco-stage__constellation">
              <Constellation nodes={ECO_NODES} active={active} onSelect={select}/>
            </div>

            <div className="eco-stage__detail">
              <div className="eco-stage__head">
                <span className="eco-stage__eyebrow" style={{ color: current.accent }}>
                  {current.eyebrow}
                </span>
                <button
                  className={`eco-auto ${auto ? "is-on" : ""}`}
                  onClick={() => setAuto(a => !a)}
                >
                  <span className="eco-auto__dot"/>
                  {auto ? "Auto" : "Paused"}
                </button>
              </div>
              <h3 key={current.id + "-t"} className="eco-stage__title">{current.title}</h3>
              <p key={current.id + "-b"} className="eco-stage__body">{current.body}</p>
              <ul className="eco-stage__bullets">
                {current.bullets.map((b, i) => (
                  <li key={i} style={{ animationDelay: `${i * 70}ms` }}>
                    <span className="eco-stage__bullet-dot" style={{ background: current.accent }}/>
                    {b}
                  </li>
                ))}
              </ul>

              <div className="eco-stage__nav">
                {ECO_NODES.map((n, i) => (
                  <button
                    key={n.id}
                    onClick={() => select(i)}
                    className={`eco-stage__nav-btn ${i === active ? "is-active" : ""}`}
                  >
                    <span className="eco-stage__nav-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="eco-stage__nav-label">{n.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   CONSTELLATION — central Alto orb + orbiting nodes
   ============================================================ */
function Constellation({ nodes, active, onSelect }) {
  const cx = 300, cy = 300;
  const radius = 200;

  // node positions
  const positions = nodes.map((n) => {
    const rad = (n.angle * Math.PI) / 180;
    return {
      x: cx + Math.cos(rad) * radius,
      y: cy + Math.sin(rad) * radius,
    };
  });

  return (
    <svg viewBox="0 0 600 600" className="constellation">
      <defs>
        <radialGradient id="alto-core">
          <stop offset="0%" stopColor="oklch(0.85 0.10 235)"/>
          <stop offset="50%" stopColor="oklch(0.55 0.18 250)"/>
          <stop offset="100%" stopColor="oklch(0.30 0.12 260)"/>
        </radialGradient>
        <radialGradient id="alto-halo">
          <stop offset="0%" stopColor="var(--fx-blue)" stopOpacity="0.5"/>
          <stop offset="60%" stopColor="var(--fx-blue)" stopOpacity="0.05"/>
          <stop offset="100%" stopColor="var(--fx-blue)" stopOpacity="0"/>
        </radialGradient>
        <filter id="alto-soft">
          <feGaussianBlur stdDeviation="2"/>
        </filter>
      </defs>

      {/* halo */}
      <circle cx={cx} cy={cy} r="280" fill="url(#alto-halo)"/>

      {/* outer rotating ring with tick marks */}
      <g style={{ transformOrigin: `${cx}px ${cy}px`, animation: 'spin 90s linear infinite' }}>
        <circle cx={cx} cy={cy} r={radius + 50} fill="none" stroke="var(--line)" strokeWidth="0.5" strokeDasharray="2 8"/>
        {Array.from({ length: 36 }).map((_, i) => {
          const a = (i / 36) * Math.PI * 2;
          const x1 = cx + Math.cos(a) * (radius + 48);
          const y1 = cy + Math.sin(a) * (radius + 48);
          const x2 = cx + Math.cos(a) * (radius + 56);
          const y2 = cy + Math.sin(a) * (radius + 56);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--line-2)" strokeWidth="0.6"/>;
        })}
      </g>

      {/* mid ring */}
      <g style={{ transformOrigin: `${cx}px ${cy}px`, animation: 'spin 60s linear reverse infinite' }}>
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke="var(--line-2)" strokeWidth="0.5"/>
      </g>

      {/* inner ring */}
      <circle cx={cx} cy={cy} r={radius - 70} fill="none" stroke="var(--line)" strokeWidth="0.5" strokeDasharray="4 6"/>

      {/* connection lines (under nodes) */}
      {positions.map((p, i) => {
        const isActive = i === active;
        return (
          <g key={`line-${i}`}>
            <line
              x1={cx} y1={cy} x2={p.x} y2={p.y}
              stroke="var(--line-2)"
              strokeWidth="0.6"
            />
            {isActive && (
              <line
                x1={cx} y1={cy} x2={p.x} y2={p.y}
                stroke={nodes[i].accent}
                strokeWidth="1.4"
                strokeDasharray="4 6"
                style={{ filter: `drop-shadow(0 0 4px ${nodes[i].accent})` }}
              >
                <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1.4s" repeatCount="indefinite"/>
              </line>
            )}
          </g>
        );
      })}

      {/* ENERGY PARTICLES flowing along lines (for active) */}
      {positions[active] && (
        <g>
          <circle r="3.5" fill={nodes[active].accent}>
            <animate attributeName="cx" values={`${cx};${positions[active].x};${cx}`} dur="3s" repeatCount="indefinite"/>
            <animate attributeName="cy" values={`${cy};${positions[active].y};${cy}`} dur="3s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite"/>
          </circle>
        </g>
      )}

      {/* center: ALTO AI orb */}
      <g transform={`translate(${cx} ${cy})`}>
        <circle r="84" fill="none" stroke="var(--line-2)" strokeWidth="0.5" strokeDasharray="2 4">
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="30s" repeatCount="indefinite"/>
        </circle>
        <circle r="62" fill="url(#alto-core)" opacity="0.95">
          <animate attributeName="r" values="60;64;60" dur="4s" repeatCount="indefinite"/>
        </circle>
        <circle r="62" fill="none" stroke="var(--fx-blue)" strokeWidth="0.8" opacity="0.5">
          <animate attributeName="r" values="62;78;62" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite"/>
        </circle>
        {/* shimmer */}
        <ellipse cx="-14" cy="-18" rx="22" ry="14" fill="rgba(255,255,255,0.5)" filter="url(#alto-soft)"/>
        <text y="6" textAnchor="middle" fontFamily="var(--display)" fontSize="14" fill="white" letterSpacing="-0.5" fontWeight="500">ALTO</text>
        <text y="22" textAnchor="middle" fontFamily="var(--mono)" fontSize="7" fill="rgba(255,255,255,0.7)" letterSpacing="2.5">INTELLIGENCE</text>
      </g>

      {/* perimeter NODES */}
      {nodes.map((n, i) => {
        const p = positions[i];
        const isActive = i === active;
        return (
          <g
            key={n.id}
            transform={`translate(${p.x} ${p.y})`}
            onClick={() => onSelect(i)}
            style={{ cursor: 'pointer' }}
          >
            {/* hit area */}
            <circle r="40" fill="transparent"/>

            {/* active ring */}
            {isActive && (
              <>
                <circle r="36" fill="none" stroke={n.accent} strokeWidth="1" opacity="0.4">
                  <animate attributeName="r" values="30;46;30" dur="2.4s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="2.4s" repeatCount="indefinite"/>
                </circle>
                <circle r="30" fill="none" stroke={n.accent} strokeWidth="1.2"/>
              </>
            )}

            {/* node body */}
            <circle r="24" fill="var(--bg-2)" stroke={isActive ? n.accent : "var(--line-2)"} strokeWidth={isActive ? 1.5 : 1}/>
            <circle r="20" fill={isActive ? "var(--bg)" : "var(--bg-3)"}/>

            {/* node icon */}
            <NodeIcon kind={n.icon} accent={n.accent} active={isActive}/>

            {/* label below */}
            <text
              y="44"
              textAnchor="middle"
              fontFamily="var(--mono)"
              fontSize="9"
              letterSpacing="2"
              fill={isActive ? "var(--ink)" : "var(--ink-2)"}
              style={{ transition: 'fill 0.3s' }}
            >
              {n.label.toUpperCase()}
            </text>
            <text
              y="56"
              textAnchor="middle"
              fontFamily="var(--mono)"
              fontSize="8"
              letterSpacing="1.5"
              fill={isActive ? n.accent : "var(--ink-3)"}
              style={{ transition: 'fill 0.3s' }}
            >
              {String(i + 1).padStart(2, "0")}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function NodeIcon({ kind, accent, active }) {
  const stroke = active ? accent : "var(--ink-2)";
  const sw = 1.2;
  if (kind === "car") {
    return (
      <g stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M-10 2 C -8 -4, -4 -7, 0 -7 L 4 -7 C 7 -7, 9 -5, 10 -2 L 10 4 L -10 4 Z"/>
        <circle cx="-6" cy="4" r="2.2" fill="var(--bg-3)"/>
        <circle cx="6" cy="4" r="2.2" fill="var(--bg-3)"/>
      </g>
    );
  }
  if (kind === "home") {
    return (
      <g stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M-9 1 L 0 -8 L 9 1 L 9 8 L -9 8 Z"/>
        <path d="M-2 8 L -2 2 L 2 2 L 2 8"/>
      </g>
    );
  }
  if (kind === "wallet") {
    return (
      <g stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="-10" y="-5" width="20" height="12" rx="2"/>
        <line x1="-10" y1="-2" x2="10" y2="-2"/>
        <circle cx="6" cy="3" r="1.6" fill={stroke}/>
      </g>
    );
  }
  if (kind === "grid") {
    return (
      <g stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round">
        <line x1="-8" y1="-8" x2="-8" y2="8"/>
        <line x1="0" y1="-8" x2="0" y2="8"/>
        <line x1="8" y1="-8" x2="8" y2="8"/>
        <line x1="-8" y1="-4" x2="8" y2="-4"/>
        <line x1="-8" y1="0" x2="8" y2="0"/>
        <line x1="-8" y1="4" x2="8" y2="4"/>
        <circle cx="0" cy="0" r="2" fill={stroke}/>
      </g>
    );
  }
  if (kind === "rewards") {
    return (
      <g stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M0 -8 L 2 -2 L 8 -1 L 4 3 L 5 9 L 0 6 L -5 9 L -4 3 L -8 -1 L -2 -2 Z"/>
      </g>
    );
  }
  return null;
}

window.EcosystemSection = EcosystemSection;
