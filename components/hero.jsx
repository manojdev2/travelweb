/* HERO — cinematic opening scene */

function HeroScene() {
  // animated counters
  const [range, setRange] = useState(0);
  const [charge, setCharge] = useState(0);
  useEffect(() => {
    let f = 0;
    const a = setInterval(() => {
      f += 1;
      setRange(Math.min(312, Math.round(f * 8)));
      setCharge(Math.min(87, Math.round(f * 2.2)));
      if (f > 60) clearInterval(a);
    }, 30);
    return () => clearInterval(a);
  }, []);

  // parallax via scroll
  const y = useScrollY();
  const heroRef = useRef(null);

  return (
    <header className="hero" ref={heroRef}>
      <div className="hero__scene">
        <HeroGrid y={y} />
        <HeroParticles />
        <HeroEnergyStream />
        <HeroVehicle y={y} />
        <HeroFloatingCards />
        <div className="hero__horizon" />
      </div>

      <div className="container hero__inner">
        <div className="hero__top">
          <div className="hero__eyebrow-stack">
            <span>ALTO.EV / EDITION 2026</span>
            <span>YOUR INTELLIGENT EV COMPANION</span>
          </div>
          <div className="hero__meta">
            LIVE NETWORK<br/>
            <strong style={{ color: 'var(--ink)' }}>12,847</strong> NODES ACTIVE<br/>
            UPDATED 00:00:03 AGO
          </div>
        </div>

        <h1 className="hero__headline reveal is-in">
          Mobility that<br/>thinks <em>ahead.</em>
        </h1>

        <div className="hero__lower">
          <Reveal delay={200}>
            <p className="hero__sub">
              Alto.EV is the calm, predictive intelligence layer for your electric life. It learns your routes, your rhythm, your battery — and charges, navigates, and routes you before you ever ask.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="hero__ctas">
              <button className="btn btn--primary">
                Reserve early access <Icon.Arrow className="btn__arrow" />
              </button>
              <button className="btn btn--ghost">
                Watch the film
              </button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={600}>
          <div className="hero__stats">
            <div>
              <div className="hero__stat-label">PREDICTED RANGE</div>
              <div className="hero__stat-value">{range}<span className="hero__stat-unit">mi</span></div>
            </div>
            <div>
              <div className="hero__stat-label">BATTERY</div>
              <div className="hero__stat-value">{charge}<span className="hero__stat-unit">%</span></div>
            </div>
            <div>
              <div className="hero__stat-label">NEXT CHARGE</div>
              <div className="hero__stat-value" style={{ fontSize: 22 }}>Berkeley Plaza<span className="hero__stat-unit"> · 16 min</span></div>
            </div>
            <div>
              <div className="hero__stat-label">GRID LOAD</div>
              <div className="hero__stat-value">Soft<span className="hero__stat-unit"> · off-peak</span></div>
            </div>
          </div>
        </Reveal>
      </div>
    </header>
  );
}

function HeroGrid({ y }) {
  return (
    <div className="hero__grid" style={{
      transform: `translateY(${y * 0.18}px)`,
    }} />
  );
}

function HeroParticles() {
  const particles = useMemo(() => Array.from({ length: 36 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 6,
    duration: 4 + Math.random() * 8,
    size: 1 + Math.random() * 2.5,
    color: Math.random() > 0.7 ? 'var(--lime)' : 'var(--blue)',
  })), []);
  return (
    <div className="hero__particles">
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          left: `${p.left}%`,
          top: `${p.top}%`,
          width: p.size, height: p.size,
          borderRadius: '50%',
          background: p.color,
          boxShadow: `0 0 ${6 + p.size * 4}px ${p.color}`,
          opacity: 0.4,
          animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite, blink ${p.duration * 0.7}s ease-in-out ${p.delay}s infinite`,
        }} />
      ))}
    </div>
  );
}

function HeroEnergyStream() {
  // horizontal energy streaks
  return (
    <svg style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
    }} preserveAspectRatio="none" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="streak" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="oklch(0.72 0.16 235)" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <linearGradient id="streakLime" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="oklch(0.92 0.22 130)" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      {[
        { y: 540, dur: 7, grad: 'streak', delay: 0, w: 240 },
        { y: 600, dur: 9, grad: 'streakLime', delay: 2, w: 180 },
        { y: 660, dur: 6, grad: 'streak', delay: 4, w: 300 },
        { y: 480, dur: 11, grad: 'streak', delay: 1, w: 200 },
        { y: 720, dur: 8, grad: 'streakLime', delay: 5, w: 220 },
      ].map((s, i) => (
        <g key={i} style={{ animation: `drift ${s.dur}s linear ${s.delay}s infinite` }}>
          <rect x="-300" y={s.y} width={s.w} height="1.5" fill={`url(#${s.grad})`} />
        </g>
      ))}
    </svg>
  );
}

function HeroVehicle({ y }) {
  return (
    <div className="hero__car" style={{
      transform: `translateX(-50%) translateY(${-y * 0.08}px)`,
    }}>
      <svg viewBox="0 0 800 240" fill="none" style={{ width: '100%', overflow: 'visible' }}>
        <defs>
          <linearGradient id="carBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--ink)" stopOpacity="0.95"/>
            <stop offset="100%" stopColor="var(--ink)" stopOpacity="0.55"/>
          </linearGradient>
          <radialGradient id="headlight" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="oklch(0.92 0.22 130)" stopOpacity="1"/>
            <stop offset="60%" stopColor="oklch(0.92 0.22 130)" stopOpacity="0.2"/>
            <stop offset="100%" stopColor="oklch(0.92 0.22 130)" stopOpacity="0"/>
          </radialGradient>
          <linearGradient id="reflect" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.72 0.16 235)" stopOpacity="0.7"/>
            <stop offset="100%" stopColor="oklch(0.72 0.16 235)" stopOpacity="0"/>
          </linearGradient>
        </defs>

        {/* underglow */}
        <ellipse cx="400" cy="200" rx="320" ry="14" fill="url(#headlight)" opacity="0.6" />

        {/* car silhouette — abstract cinematic side view */}
        <path d="M120 175 C 160 130, 230 100, 340 95 L 480 92 C 580 95, 640 110, 690 150 L 720 170 L 720 195 L 100 195 L 100 178 Z"
              fill="url(#carBody)" />
        {/* greenhouse */}
        <path d="M270 110 C 320 90, 400 85, 480 92 L 560 110 L 540 130 L 290 130 Z" fill="url(#reflect)" opacity="0.6" />
        {/* wheels */}
        <circle cx="240" cy="195" r="32" fill="var(--bg-2)" stroke="var(--ink-2)" strokeWidth="1.2"/>
        <circle cx="240" cy="195" r="14" fill="var(--bg-3)" />
        <circle cx="600" cy="195" r="32" fill="var(--bg-2)" stroke="var(--ink-2)" strokeWidth="1.2"/>
        <circle cx="600" cy="195" r="14" fill="var(--bg-3)" />
        {/* lime accent strip — energy charge indicator */}
        <rect x="160" y="170" width="280" height="2" fill="oklch(0.92 0.22 130)" opacity="0.9">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite"/>
        </rect>
      </svg>
    </div>
  );
}

window.HeroScene = HeroScene;

function HeroFloatingCards() {
  return (
    <div className="hero__cards">
      {/* Card 1 — Station map mini */}
      <div className="hero__card hero__card--map">
        <div className="hero__card-eyebrow">STATION · 3456</div>
        <svg viewBox="0 0 220 130" className="hero__card-map">
          <defs>
            <radialGradient id="hcmap-glow">
              <stop offset="0%" stopColor="var(--fx-lime)" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="var(--fx-lime)" stopOpacity="0"/>
            </radialGradient>
          </defs>
          {/* streets */}
          <g stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" fill="none">
            <path d="M0 90 L 220 50"/>
            <path d="M40 0 L 60 130"/>
            <path d="M130 0 L 150 130"/>
            <path d="M0 30 L 220 20"/>
          </g>
          {/* route */}
          <path d="M30 110 L 80 80 L 130 60 L 180 30" stroke="var(--fx-lime)" strokeWidth="1.6" strokeDasharray="3 3" fill="none" strokeLinecap="round">
            <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1.5s" repeatCount="indefinite"/>
          </path>
          {/* nodes */}
          <g>
            {[[50, 50], [120, 100], [170, 70], [85, 35]].map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="6" fill="url(#hcmap-glow)">
                  <animate attributeName="r" values="4;10;4" dur={`${2 + i * 0.3}s`} repeatCount="indefinite"/>
                </circle>
                <circle cx={x} cy={y} r="2.5" fill="var(--fx-lime)"/>
              </g>
            ))}
          </g>
          <circle cx="180" cy="30" r="3.5" fill="#fff" stroke="var(--fx-lime)" strokeWidth="1.5"/>
        </svg>
        <div className="hero__card-foot">
          <span>4 km</span>
          <span>12,000 V</span>
        </div>
      </div>

      {/* Card 2 — Battery capsule */}
      <div className="hero__card hero__card--battery">
        <div className="hero__card-eyebrow">BATTERY</div>
        <div className="hero__capsule">
          <div className="hero__capsule-fill"/>
          <div className="hero__capsule-tip"/>
        </div>
        <div className="hero__card-foot">
          <span>87%</span>
          <span>312 mi</span>
        </div>
      </div>

      {/* Card 3 — Live charge pulse */}
      <div className="hero__card hero__card--pulse">
        <div className="hero__card-eyebrow">LIVE CHARGE</div>
        <svg viewBox="0 0 220 60" className="hero__card-wave">
          <defs>
            <linearGradient id="hcw" x1="0" x2="1">
              <stop offset="0%" stopColor="var(--fx-blue)" stopOpacity="0"/>
              <stop offset="50%" stopColor="var(--fx-blue)" stopOpacity="1"/>
              <stop offset="100%" stopColor="var(--fx-blue)" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d="M0 30 Q 30 10 60 30 T 120 30 T 180 30 T 240 30" stroke="url(#hcw)" strokeWidth="1.4" fill="none">
            <animate attributeName="d"
              values="M0 30 Q 30 10 60 30 T 120 30 T 180 30 T 240 30;
                      M0 30 Q 30 45 60 30 T 120 30 T 180 30 T 240 30;
                      M0 30 Q 30 10 60 30 T 120 30 T 180 30 T 240 30"
              dur="3s" repeatCount="indefinite"/>
          </path>
        </svg>
        <div className="hero__card-foot">
          <span>11 kW</span>
          <span style={{ color: 'var(--fx-lime)' }}>● flowing</span>
        </div>
      </div>
    </div>
  );
}
