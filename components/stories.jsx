/* EVERYDAY EV STORIES */

const STORIES = [
  {
    time: "07:14 — Tuesday",
    title: "The morning commute, already planned.",
    body: "Alto wakes before you do. It checks traffic, your calendar, the grid, and your battery — then warms the cabin to 68° and re-routes around the 101 closure. You leave on time without thinking.",
    chips: ["Calendar synced", "Pre-conditioned", "Smart routing"],
    palette: ["#0E1014", "#16223A", "oklch(0.72 0.16 235)"],
    visual: "morning",
  },
  {
    time: "21:08 — Wednesday",
    title: "Apartment charging, finally solved.",
    body: "No home charger? Alto reserved a charger 7 minutes away on overnight rates. When you wake, your car has full range, a clean state-of-charge report, and the session closed itself out invisibly.",
    chips: ["Auto-reserve", "Off-peak windows", "Walk-time minimized"],
    palette: ["#0A0E18", "#1A1429", "oklch(0.70 0.20 330)"],
    visual: "apartment",
  },
  {
    time: "10:30 — Saturday",
    title: "Highway weekend, no anxiety.",
    body: "Alto knows you're driving to Tahoe before you tell it. It books the fastest charger on the route, sends snack stop options at the right battery interval, and recommends a 22-min lunch where you'll be hungry anyway.",
    chips: ["Range confidence", "Charger reserved", "Trip companion"],
    palette: ["#0E1A0E", "#1A2418", "oklch(0.92 0.22 130)"],
    visual: "highway",
  },
  {
    time: "18:40 — Friday",
    title: "Charge while you live.",
    body: "Park at the grocery, the gym, dinner. Alto matches micro-charging windows to your real day — a 14% top-up at Whole Foods, another at yoga, a slow charge through your reservation. You never \"go\" to charge.",
    chips: ["Ambient charging", "Multi-stop optimization", "Invisible"],
    palette: ["#160F0A", "#241910", "oklch(0.80 0.16 65)"],
    visual: "ambient",
  },
];

function StoriesSection() {
  return (
    <section className="stories section" id="stories">
      <div className="container">
        <div className="section-head">
          <div className="section-head__idx">01 — STORIES</div>
          <Reveal>
            <h2>Not a charging app.<br/>A way of moving.</h2>
            <p>
              Alto.EV lives in the small moments of your day — the ones where range anxiety, last-minute reroutes, and the search for a working plug used to live. Here's what it feels like.
            </p>
          </Reveal>
        </div>

        {STORIES.map((s, i) => (
          <Story key={i} {...s} reversed={i % 2 === 1} idx={i} />
        ))}
      </div>
    </section>
  );
}

function Story({ time, title, body, chips, palette, visual, reversed, idx }) {
  const ref = useRef(null);
  const [parallax, setParallax] = useState(0);
  useEffect(() => {
    function onScroll() {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = (rect.top + rect.height / 2) - vh / 2;
      // Drift up to ±24px based on distance from viewport center
      const p = Math.max(-1, Math.min(1, -center / vh));
      setParallax(p * 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <article ref={ref} className={`story ${reversed ? "story--rev" : ""}`}>
      <div className="story__bignum" aria-hidden="true">{String(idx + 1).padStart(2, "0")}</div>
      <Reveal delay={100} className="story__copy-wrap">
        <div className="story__copy">
          <div className="story__time">{time}</div>
          <h3 className="story__title">{title}</h3>
          <p className="story__body">{body}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {chips.map((c, i) => (
              <span key={i} className="story__chip">
                <span className="story__chip-dot" style={{ background: palette[2] }} />
                {c}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
      <Reveal delay={200} slow className="story__visual-wrap">
        <div
          className="story__visual"
          style={{
            background: `linear-gradient(135deg, ${palette[0]}, ${palette[1]})`,
            transform: `translateY(${parallax}px)`,
          }}
        >
          <StoryVisual kind={visual} accent={palette[2]} />
          <div className="story__visual-glow" style={{ background: `radial-gradient(60% 40% at 50% 100%, ${palette[2]}55, transparent)` }}/>
        </div>
      </Reveal>
    </article>
  );
}

function StoryVisual({ kind, accent }) {
  if (kind === "morning") return <MorningVisual accent={accent} />;
  if (kind === "apartment") return <ApartmentVisual accent={accent} />;
  if (kind === "highway") return <HighwayVisual accent={accent} />;
  if (kind === "ambient") return <AmbientVisual accent={accent} />;
  return null;
}

/* Shared frame chrome */
function VisualFrame({ children, accent, hudLeft, hudRight, footLeft, footRight }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* subtle grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 90%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 90%)',
      }}/>
      {/* corner aura */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(60% 50% at 50% 100%, ${accent}26, transparent 70%)`,
        pointerEvents: 'none',
      }}/>

      {/* HUDs */}
      {(hudLeft || hudRight) && (
        <div style={{
          position: 'absolute',
          top: 20, left: 20, right: 20,
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          color: 'rgba(255,255,255,0.85)', zIndex: 3,
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase' }}>{hudLeft}</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', textAlign: 'right' }}>{hudRight}</div>
        </div>
      )}

      {children}

      {(footLeft || footRight) && (
        <div style={{
          position: 'absolute',
          bottom: 18, left: 20, right: 20,
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          color: '#fff', zIndex: 3,
        }}>
          <div>{footLeft}</div>
          <div style={{ textAlign: 'right' }}>{footRight}</div>
        </div>
      )}
    </div>
  );
}

function MorningVisual({ accent }) {
  // Top-down map fragment with an animated route from home → work, plus cabin pre-warm sparkline
  return (
    <VisualFrame
      accent={accent}
      hudLeft={"↖ ROUTE"}
      hudRight={"22 MIN · ETA 7:36"}
      footLeft={(
        <>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.16em', opacity: 0.6, textTransform: 'uppercase' }}>CABIN</div>
          <div style={{ fontFamily: 'var(--display)', fontSize: 32, letterSpacing: '-0.02em', marginTop: 2 }}>
            68° <span style={{ fontSize: 12, opacity: 0.55 }}>pre-warmed</span>
          </div>
        </>
      )}
      footRight={(
        <>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.16em', opacity: 0.6, textTransform: 'uppercase' }}>DEPART</div>
          <div style={{ fontFamily: 'var(--display)', fontSize: 24, letterSpacing: '-0.02em', marginTop: 2 }}>07:14</div>
        </>
      )}
    >
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id={`mor-glow-${accent}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={accent} stopOpacity="0"/>
            <stop offset="50%" stopColor={accent} stopOpacity="1"/>
            <stop offset="100%" stopColor={accent} stopOpacity="0"/>
          </linearGradient>
        </defs>

        {/* abstract city blocks */}
        <g fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5">
          {[[40,80,90,50],[140,60,70,90],[230,90,80,40],[60,180,70,110],[170,200,90,60],[270,180,90,90],[40,330,90,60],[150,310,80,90],[260,330,90,70]].map(([x,y,w,h], i) => (
            <rect key={i} x={x} y={y} width={w} height={h} rx="3"/>
          ))}
        </g>
        {/* sprinkled lit windows */}
        {Array.from({ length: 14 }).map((_, i) => (
          <rect key={i} x={Math.random()*360+20} y={Math.random()*380+60} width="4" height="4" fill={accent} opacity={0.5 + Math.random()*0.4}>
            <animate attributeName="opacity" values="0.2;0.7;0.2" dur={`${2 + Math.random()*3}s`} repeatCount="indefinite"/>
          </rect>
        ))}

        {/* route */}
        <path d="M50 430 Q 120 360 130 280 Q 145 200 220 180 Q 300 165 320 90"
              stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none"/>
        <path d="M50 430 Q 120 360 130 280 Q 145 200 220 180 Q 300 165 320 90"
              stroke={accent} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="8 8"
              style={{ filter: `drop-shadow(0 0 6px ${accent})` }}>
          <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="2.5s" repeatCount="indefinite"/>
        </path>

        {/* origin + destination */}
        <g>
          <circle cx="50" cy="430" r="6" fill={accent}/>
          <circle cx="50" cy="430" r="6" fill="none" stroke={accent} strokeWidth="1">
            <animate attributeName="r" values="6;14;6" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite"/>
          </circle>
          <text x="62" y="434" fontFamily="var(--mono)" fontSize="9" fill="#fff" letterSpacing="1">HOME</text>
        </g>
        <g>
          <rect x="312" y="80" width="16" height="16" fill="none" stroke={accent} strokeWidth="1.4"/>
          <circle cx="320" cy="88" r="3" fill={accent}/>
          <text x="335" y="92" fontFamily="var(--mono)" fontSize="9" fill="#fff" letterSpacing="1">WORK</text>
        </g>

        {/* pre-warm sparkline floating card */}
        <g transform="translate(40, 60)">
          <rect x="0" y="0" width="160" height="56" rx="8" fill="rgba(0,0,0,0.55)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6"/>
          <text x="10" y="15" fontFamily="var(--mono)" fontSize="8" fill="rgba(255,255,255,0.55)" letterSpacing="1.5">PRE-WARM</text>
          <text x="150" y="15" textAnchor="end" fontFamily="var(--mono)" fontSize="8" fill={accent} letterSpacing="1.5">06:50 → 07:14</text>
          {/* sparkline */}
          <path d="M10 44 L 30 42 L 50 38 L 70 33 L 90 27 L 110 22 L 130 18 L 150 16" stroke={accent} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M10 44 L 30 42 L 50 38 L 70 33 L 90 27 L 110 22 L 130 18 L 150 16 L 150 50 L 10 50 Z" fill={accent} opacity="0.18"/>
          <circle cx="150" cy="16" r="2.5" fill={accent}/>
        </g>
      </svg>
    </VisualFrame>
  );
}

function ApartmentVisual({ accent }) {
  // Neighborhood charger lattice with a reserved node + overnight battery curve
  return (
    <VisualFrame
      accent={accent}
      hudLeft={"≡ NEAR YOU"}
      hudRight={"7 MIN WALK"}
      footLeft={(
        <>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.16em', opacity: 0.6, textTransform: 'uppercase' }}>RESERVED</div>
          <div style={{ fontFamily: 'var(--display)', fontSize: 22, letterSpacing: '-0.02em', marginTop: 2 }}>
            Pier 39 · Stall 04
          </div>
        </>
      )}
      footRight={(
        <>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.16em', opacity: 0.6, textTransform: 'uppercase' }}>OFF-PEAK</div>
          <div style={{ fontFamily: 'var(--display)', fontSize: 18, letterSpacing: '-0.02em', marginTop: 2 }}>22:00 — 06:30</div>
        </>
      )}
    >
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {/* tiny grid of nearby chargers */}
        {Array.from({ length: 5 }).flatMap((_, row) =>
          Array.from({ length: 6 }).map((__, col) => {
            const x = 50 + col * 55;
            const y = 80 + row * 55;
            const isReserved = row === 2 && col === 3;
            const isAvail = (row + col) % 3 === 0 && !isReserved;
            return (
              <g key={`${row}-${col}`}>
                {isReserved && (
                  <>
                    <circle cx={x} cy={y} r="18" fill="none" stroke={accent} strokeWidth="1.2" opacity="0.55">
                      <animate attributeName="r" values="12;22;12" dur="2.2s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" values="0.7;0;0.7" dur="2.2s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx={x} cy={y} r="10" fill={accent} opacity="0.18"/>
                  </>
                )}
                <circle
                  cx={x} cy={y}
                  r={isReserved ? 6 : isAvail ? 3 : 2}
                  fill={isReserved ? accent : isAvail ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.25)"}
                />
              </g>
            );
          })
        )}

        {/* walk path "YOU" → reserved */}
        <g transform="translate(60, 380)">
          <circle r="5" fill="#fff"/>
          <circle r="5" fill="none" stroke="#fff" strokeWidth="0.8" opacity="0.6">
            <animate attributeName="r" values="5;12;5" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite"/>
          </circle>
          <text x="12" y="4" fontFamily="var(--mono)" fontSize="9" fill="#fff" letterSpacing="1">YOU</text>
        </g>
        <path d="M60 380 Q 100 320 145 290 Q 195 250 215 190"
              stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" strokeDasharray="3 6">
          <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="2s" repeatCount="indefinite"/>
        </path>

        {/* overnight battery curve card */}
        <g transform="translate(40, 360)">
          {/* no card here; bottom annotations handle this */}
        </g>
      </svg>
    </VisualFrame>
  );
}

function HighwayVisual({ accent }) {
  // SOC area chart across the trip with a charging stop
  return (
    <VisualFrame
      accent={accent}
      hudLeft={"↗ TO TAHOE"}
      hudRight={"198 MI · 1 STOP"}
      footLeft={(
        <>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.16em', opacity: 0.6, textTransform: 'uppercase' }}>ARRIVE</div>
          <div style={{ fontFamily: 'var(--display)', fontSize: 22, letterSpacing: '-0.02em', marginTop: 2 }}>13:22 · 78%</div>
        </>
      )}
      footRight={(
        <>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.16em', opacity: 0.6, textTransform: 'uppercase' }}>RANGE BUFFER</div>
          <div style={{ fontFamily: 'var(--display)', fontSize: 18, letterSpacing: '-0.02em', marginTop: 2 }}>+62 mi</div>
        </>
      )}
    >
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="hw-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.4"/>
            <stop offset="100%" stopColor={accent} stopOpacity="0"/>
          </linearGradient>
        </defs>

        {/* horizontal SOC ticks */}
        {[100, 75, 50, 25, 0].map((pct, i) => {
          const y = 110 + (4 - i) * 60;
          return (
            <g key={i}>
              <line x1="36" y1={y} x2="380" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="0.6"/>
              <text x="30" y={y + 3} textAnchor="end" fontFamily="var(--mono)" fontSize="8" fill="rgba(255,255,255,0.4)" letterSpacing="1">{pct}</text>
            </g>
          );
        })}

        {/* SOC curve */}
        <path
          d="M40 130 L 90 170 L 140 220 L 190 270 L 220 290 L 240 200 L 260 140 L 320 180 L 380 220"
          stroke={accent} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
          style={{ filter: `drop-shadow(0 0 8px ${accent})` }}
        />
        <path
          d="M40 130 L 90 170 L 140 220 L 190 270 L 220 290 L 240 200 L 260 140 L 320 180 L 380 220 L 380 350 L 40 350 Z"
          fill="url(#hw-area)"
        />

        {/* charging stop marker */}
        <line x1="230" y1="110" x2="230" y2="350" stroke="rgba(255,255,255,0.25)" strokeDasharray="2 4" strokeWidth="0.8"/>
        <g transform="translate(230, 100)">
          <rect x="-36" y="-22" width="72" height="22" rx="4" fill="rgba(0,0,0,0.6)" stroke={accent} strokeWidth="0.8"/>
          <text textAnchor="middle" y="-7" fontFamily="var(--mono)" fontSize="9" fill={accent} letterSpacing="1.5">CHARGE 22m</text>
          <circle cy="6" r="4" fill={accent}/>
          <circle cy="6" r="4" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.7">
            <animate attributeName="r" values="4;10;4" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite"/>
          </circle>
        </g>

        {/* x-axis labels */}
        <g fontFamily="var(--mono)" fontSize="8" fill="rgba(255,255,255,0.5)" letterSpacing="1">
          <text x="40" y="370">SF</text>
          <text x="140" y="370">SACTO</text>
          <text x="230" y="370" textAnchor="middle">AUBURN</text>
          <text x="320" y="370">DONNER</text>
          <text x="376" y="370" textAnchor="end">TAHOE</text>
        </g>

        {/* live position dot */}
        <circle r="4" fill="#fff">
          <animateMotion dur="7s" repeatCount="indefinite" path="M40 130 L 90 170 L 140 220 L 190 270 L 220 290 L 240 200 L 260 140 L 320 180 L 380 220"/>
        </circle>
      </svg>
    </VisualFrame>
  );
}

function AmbientVisual({ accent }) {
  // Stacked bar chart accumulating charge across the day
  const sessions = [
    { label: "GROCERY",   time: "09:14", h: 36 },
    { label: "YOGA",      time: "12:30", h: 56 },
    { label: "DINNER",    time: "19:45", h: 78 },
  ];
  return (
    <VisualFrame
      accent={accent}
      hudLeft={"⏱ AMBIENT · 1 DAY"}
      hudRight={"3 SESSIONS"}
      footLeft={(
        <>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.16em', opacity: 0.6, textTransform: 'uppercase' }}>ADDED INVISIBLY</div>
          <div style={{ fontFamily: 'var(--display)', fontSize: 38, letterSpacing: '-0.025em', marginTop: 2, lineHeight: 1 }}>
            +54<span style={{ fontSize: 18, opacity: 0.55 }}>%</span>
          </div>
        </>
      )}
      footRight={(
        <>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.16em', opacity: 0.6, textTransform: 'uppercase' }}>NEXT</div>
          <div style={{ fontFamily: 'var(--display)', fontSize: 18, letterSpacing: '-0.02em', marginTop: 2 }}>Yoga · 12:30</div>
        </>
      )}
    >
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="amb-bar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.95"/>
            <stop offset="100%" stopColor={accent} stopOpacity="0.3"/>
          </linearGradient>
        </defs>

        {/* day-of-week tick line */}
        <line x1="36" y1="330" x2="380" y2="330" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6"/>
        {Array.from({ length: 25 }).map((_, i) => (
          <line key={i} x1={36 + (i / 24) * 344} y1="330" x2={36 + (i / 24) * 344} y2={i % 6 === 0 ? 336 : 333} stroke="rgba(255,255,255,0.2)" strokeWidth="0.6"/>
        ))}
        <g fontFamily="var(--mono)" fontSize="7" fill="rgba(255,255,255,0.4)" letterSpacing="1">
          <text x="36" y="348">00</text>
          <text x="122" y="348">06</text>
          <text x="208" y="348">12</text>
          <text x="294" y="348">18</text>
          <text x="376" y="348" textAnchor="end">24</text>
        </g>

        {/* three sessions */}
        {sessions.map((s, i) => {
          const xCenter = 36 + ((i + 1) / 4) * 344;
          return (
            <g key={i}>
              <rect x={xCenter - 22} y={330 - s.h} width="44" height={s.h} rx="3" fill="url(#amb-bar)"/>
              {/* connector tick */}
              <line x1={xCenter} y1="330" x2={xCenter} y2="336" stroke={accent} strokeWidth="1.5"/>
              {/* time label */}
              <text x={xCenter} y="105" textAnchor="middle" fontFamily="var(--mono)" fontSize="9" fill="#fff" letterSpacing="1">+{Math.round(s.h * 0.3)}%</text>
              <text x={xCenter} y="120" textAnchor="middle" fontFamily="var(--mono)" fontSize="8" fill="rgba(255,255,255,0.55)" letterSpacing="1.5">{s.time}</text>
              <text x={xCenter} y="360" textAnchor="middle" fontFamily="var(--mono)" fontSize="7" fill={accent} letterSpacing="1.5">{s.label}</text>
            </g>
          );
        })}

        {/* live progress fill */}
        <line x1="36" y1="288" x2="380" y2="288" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" strokeDasharray="3 4"/>
        <text x="376" y="284" textAnchor="end" fontFamily="var(--mono)" fontSize="8" fill="rgba(255,255,255,0.4)" letterSpacing="1">+54% TOTAL</text>
      </svg>
    </VisualFrame>
  );
}

window.StoriesSection = StoriesSection;
