/* INTELLIGENT ENERGY NETWORK — animated map */

function NetworkSection() {
  return (
    <section className="network section" id="network">
      <div className="container">
        <div className="section-head">
          <div className="section-head__idx">03 — NETWORK</div>
          <Reveal>
            <h2>The grid, alive.</h2>
            <p>
              12,847 charging nodes. 38 utility partners. One live map of available power, wait times, and routes through it. Alto sees your energy ecosystem in real time and routes you through its softest moments.
            </p>
          </Reveal>
        </div>

        <Reveal slow blur>
          <NetworkMap />
        </Reveal>
      </div>
    </section>
  );
}

function NetworkMap() {
  // generate stable nodes
  const nodes = useMemo(() => {
    const seed = [];
    for (let i = 0; i < 38; i++) {
      seed.push({
        x: 4 + Math.random() * 92,
        y: 8 + Math.random() * 84,
        size: 1 + Math.random() * 3,
        type: Math.random() > 0.75 ? 'fast' : Math.random() > 0.6 ? 'available' : 'standard',
        pulse: Math.random() * 4,
      });
    }
    return seed;
  }, []);

  // route from one node to another
  const route = [
    { x: 12, y: 78 },
    { x: 28, y: 60 },
    { x: 42, y: 48 },
    { x: 58, y: 36 },
    { x: 74, y: 28 },
    { x: 88, y: 18 },
  ];

  return (
    <div className="network__map">
      <div className="network__legend">
        <div className="network__legend-row"><span style={{ background: 'var(--fx-lime)', boxShadow: '0 0 8px var(--fx-lime)' }}/>Available now</div>
        <div className="network__legend-row"><span style={{ background: 'var(--fx-blue)', boxShadow: '0 0 8px var(--fx-blue)' }}/>DC fast (350kW)</div>
        <div className="network__legend-row"><span style={{ background: 'var(--ink-3)' }}/>Standard</div>
      </div>

      {/* SVG layer */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 100 56" preserveAspectRatio="none">
        <defs>
          <linearGradient id="netGrid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.72 0.16 235 / 0.25)"/>
            <stop offset="100%" stopColor="transparent"/>
          </linearGradient>
          <radialGradient id="netNode">
            <stop offset="0%" stopColor="white"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
        </defs>

        {/* lat/long grid */}
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 8} y1="0" x2={i * 8} y2="56"
                stroke="var(--line)" strokeWidth="0.05" />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 8} x2="100" y2={i * 8}
                stroke="var(--line)" strokeWidth="0.05" />
        ))}

        {/* highways / road network — abstract curves */}
        <g stroke="var(--line-2)" strokeWidth="0.15" fill="none" opacity="0.6">
          <path d="M0 30 C 20 20, 40 35, 60 25 S 90 18, 100 22"/>
          <path d="M0 45 C 20 48, 40 38, 60 42 S 90 48, 100 40"/>
          <path d="M20 0 L 25 56"/>
          <path d="M55 0 C 50 20, 60 40, 55 56"/>
          <path d="M85 0 L 80 56"/>
        </g>

        {/* connection lines between active nodes */}
        <g stroke="oklch(0.72 0.16 235 / 0.3)" strokeWidth="0.08" fill="none">
          {nodes.filter(n => n.type !== 'standard').map((n, i) => {
            const next = nodes[(i + 3) % nodes.length];
            return <line key={i} x1={n.x} y1={n.y} x2={next.x} y2={next.y} />;
          })}
        </g>

        {/* nodes */}
        {nodes.map((n, i) => {
          const c = n.type === 'available' ? 'oklch(0.92 0.22 130)'
                  : n.type === 'fast' ? 'oklch(0.72 0.16 235)'
                  : 'var(--ink-3)';
          return (
            <g key={i}>
              {n.type !== 'standard' && (
                <circle cx={n.x} cy={n.y} r={n.size * 0.8}
                        fill={c} opacity="0.3">
                  <animate attributeName="r" values={`${n.size*0.6};${n.size*2};${n.size*0.6}`} dur={`${2 + n.pulse}s`} repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.6;0;0.6" dur={`${2 + n.pulse}s`} repeatCount="indefinite"/>
                </circle>
              )}
              <circle cx={n.x} cy={n.y} r={n.size * 0.4}
                      fill={c} opacity={n.type === 'standard' ? 0.5 : 1}/>
            </g>
          );
        })}

        {/* route polyline */}
        <polyline
          points={route.map(p => `${p.x},${p.y}`).join(" ")}
          fill="none"
          stroke="oklch(0.92 0.22 130)"
          strokeWidth="0.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1.5 0.8"
          style={{ filter: 'drop-shadow(0 0 2px oklch(0.92 0.22 130))' }}
        >
          <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="2s" repeatCount="indefinite"/>
        </polyline>

        {/* origin + destination markers */}
        <circle cx={route[0].x} cy={route[0].y} r="1.2" fill="oklch(0.92 0.22 130)"/>
        <circle cx={route[0].x} cy={route[0].y} r="1.2" fill="none" stroke="oklch(0.92 0.22 130)" strokeWidth="0.15">
          <animate attributeName="r" values="1.2;3;1.2" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite"/>
        </circle>

        <g>
          <circle cx={route[route.length-1].x} cy={route[route.length-1].y} r="1.4" fill="none" stroke="oklch(0.92 0.22 130)" strokeWidth="0.2"/>
          <circle cx={route[route.length-1].x} cy={route[route.length-1].y} r="0.7" fill="oklch(0.92 0.22 130)"/>
        </g>
      </svg>

      {/* origin + destination labels */}
      <div style={{
        position: 'absolute',
        left: `${route[0].x}%`,
        top: `${route[0].y}%`,
        transform: 'translate(8px, -50%)',
        fontFamily: 'var(--mono)',
        fontSize: 9,
        letterSpacing: '0.16em',
        color: 'var(--ink)',
        padding: '4px 8px',
        background: 'var(--glass-2)',
        backdropFilter: 'blur(8px)',
        border: '1px solid var(--line)',
        borderRadius: 8,
        whiteSpace: 'nowrap',
        textTransform: 'uppercase',
      }}>
        ◉ You · 87% · Mission St
      </div>
      <div style={{
        position: 'absolute',
        left: `${route[route.length-1].x}%`,
        top: `${route[route.length-1].y}%`,
        transform: 'translate(-100%, -100%) translate(-8px, -8px)',
        fontFamily: 'var(--mono)',
        fontSize: 9,
        letterSpacing: '0.16em',
        color: 'var(--ink)',
        padding: '4px 8px',
        background: 'var(--glass-2)',
        backdropFilter: 'blur(8px)',
        border: '1px solid var(--line)',
        borderRadius: 8,
        whiteSpace: 'nowrap',
        textTransform: 'uppercase',
      }}>
        ▲ Tahoe · arrive 13:22
      </div>

      <div className="network__hud">
        <div className="network__hud-card">
          <div className="network__hud-label">LIVE NETWORK</div>
          <div className="network__hud-value">2,184 chargers free</div>
        </div>
        <div className="network__hud-card">
          <div className="network__hud-label">AVG WAIT</div>
          <div className="network__hud-value">0 min · 18 cities</div>
        </div>
      </div>
    </div>
  );
}

window.NetworkSection = NetworkSection;
