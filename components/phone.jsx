/* INTERACTIVE PHONE SHOWCASE */

function PhoneSection() {
  const [tab, setTab] = useState(0);
  // auto-cycle screens
  useEffect(() => {
    const t = setInterval(() => setTab((x) => (x + 1) % 3), 4400);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="phone-section section" id="app">
      <div className="container">
        <div className="section-head">
          <div className="section-head__idx">06 — APP</div>
          <Reveal>
            <h2>An interface as quiet<br/>as your morning.</h2>
            <p>
              Alto's app is rarely visible. When it is, it's a single decision, surfaced at the right second. Tap once. Move on with your day.
            </p>
          </Reveal>
        </div>

        <div className="phone-stage">
          <div className="phone-stage__aurora" />

          <div className="phone phone--float-1">
            <div className="phone__notch"/>
            <div className="phone__screen">
              <PhoneScreenNetwork />
            </div>
          </div>

          <div className="phone phone--center float-y">
            <div className="phone__notch"/>
            <div className="phone__screen">
              {tab === 0 && <PhoneScreenHome />}
              {tab === 1 && <PhoneScreenCharge />}
              {tab === 2 && <PhoneScreenRoute />}
            </div>

            {/* dots */}
            <div style={{
              position: 'absolute',
              bottom: 22, left: 0, right: 0,
              display: 'flex', justifyContent: 'center', gap: 6,
              zIndex: 10,
            }}>
              {[0, 1, 2].map(i => (
                <button key={i} onClick={() => setTab(i)} style={{
                  width: i === tab ? 18 : 6,
                  height: 6,
                  borderRadius: 999,
                  background: i === tab ? '#fff' : 'rgba(255,255,255,0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}/>
              ))}
            </div>
          </div>

          <div className="phone phone--float-2">
            <div className="phone__notch"/>
            <div className="phone__screen">
              <PhoneScreenAI />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Phone screens (use the same dark scheme regardless of page theme) ----

function PhoneStatus({ time = "9:41" }) {
  return (
    <div className="phone__statusbar">
      <span>{time}</span>
      <span>● 5G · 87%</span>
    </div>
  );
}

function PhoneScreenHome() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let v = 0;
    const i = setInterval(() => {
      v += 3;
      setPct(Math.min(87, v));
      if (v >= 87) clearInterval(i);
    }, 30);
    return () => clearInterval(i);
  }, []);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <PhoneStatus/>
      <div style={{ padding: '12px 22px 0', fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>
        TUE · MAR 12
      </div>
      <div style={{ padding: '4px 22px 0', fontFamily: 'var(--display)', fontSize: 26, fontWeight: 300, letterSpacing: '-0.02em' }}>
        Good morning,<br/>Lena.
      </div>

      {/* battery ring */}
      <div style={{ flex: 1, display: 'grid', placeItems: 'center', position: 'relative', marginTop: 8 }}>
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6"/>
          <circle cx="100" cy="100" r="80" fill="none"
                  stroke="oklch(0.92 0.22 130)" strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${(pct/100)*502} 502`}
                  transform="rotate(-90 100 100)"
                  style={{ filter: 'drop-shadow(0 0 12px oklch(0.92 0.22 130))', transition: 'stroke-dasharray 0.1s' }}/>
        </svg>
        <div style={{ position: 'absolute', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--display)', fontSize: 56, fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 1 }}>{pct}<span style={{ fontSize: 24, opacity: 0.5 }}>%</span></div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em', opacity: 0.55, marginTop: 6 }}>312 MI RANGE</div>
        </div>
      </div>

      <div style={{ padding: '0 22px 60px' }}>
        <div style={{ padding: 14, borderRadius: 16, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.16em', opacity: 0.5 }}>NEXT</div>
              <div style={{ fontSize: 14, marginTop: 2 }}>Coffee at Sightglass</div>
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'oklch(0.92 0.22 130)' }}>↑ 14 MIN</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhoneScreenCharge() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <PhoneStatus time="9:42"/>
      <div style={{ padding: '12px 22px 0', fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.5)' }}>NEAR YOU</div>
      <div style={{ padding: '4px 22px 16px', fontFamily: 'var(--display)', fontSize: 22, fontWeight: 300, letterSpacing: '-0.02em' }}>
        4 fast chargers free
      </div>

      <div style={{ padding: '0 22px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { name: "Berkeley Plaza", dist: "0.4 mi", power: "350 kW", status: "Off-peak", lime: true },
          { name: "Ferry Building", dist: "1.2 mi", power: "150 kW", status: "Peak", lime: false },
          { name: "Pier 39", dist: "2.1 mi", power: "350 kW", status: "Off-peak", lime: true },
        ].map((c, i) => (
          <div key={i} style={{
            padding: 14, borderRadius: 14,
            background: i === 0 ? 'rgba(190, 255, 80, 0.08)' : 'rgba(255,255,255,0.04)',
            border: i === 0 ? '1px solid rgba(190, 255, 80, 0.4)' : '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{c.name}</div>
                <div style={{ fontSize: 11, opacity: 0.55, marginTop: 2 }}>{c.dist} · {c.power}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'oklch(0.92 0.22 130)' }}>{c.status}</div>
                <div style={{ fontSize: 9, opacity: 0.45, marginTop: 2, letterSpacing: '0.14em', fontFamily: 'var(--mono)' }}>{c.lime ? "FREE NOW" : "1 WAITING"}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '16px 22px 60px' }}>
        <button style={{
          width: '100%', padding: '14px', borderRadius: 999,
          background: '#fff', color: '#000',
          border: 'none', fontSize: 13, fontWeight: 500,
          cursor: 'pointer',
        }}>Reserve Berkeley Plaza →</button>
      </div>
    </div>
  );
}

function PhoneScreenRoute() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <PhoneStatus time="9:43"/>
      <div style={{ padding: '12px 22px 0', fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.5)' }}>ROUTE TO</div>
      <div style={{ padding: '4px 22px 16px', fontFamily: 'var(--display)', fontSize: 24, fontWeight: 300, letterSpacing: '-0.02em' }}>
        Tahoe · 13:22
      </div>

      <div style={{ position: 'relative', flex: 1, margin: '0 22px', borderRadius: 16, overflow: 'hidden', background: 'rgba(70, 130, 255, 0.08)' }}>
        <svg viewBox="0 0 240 360" style={{ width: '100%', height: '100%' }}>
          <path d="M30 320 C 60 280, 90 240, 120 220 S 170 160, 200 80" stroke="oklch(0.92 0.22 130)" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="6 4">
            <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2s" repeatCount="indefinite"/>
          </path>
          {/* mock road network */}
          <g stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" fill="none">
            <path d="M0 100 Q 100 130, 240 110"/>
            <path d="M0 200 Q 120 180, 240 200"/>
            <path d="M50 0 L 60 360"/>
            <path d="M180 0 L 170 360"/>
          </g>
          <circle cx="30" cy="320" r="6" fill="oklch(0.92 0.22 130)"/>
          <circle cx="200" cy="80" r="6" fill="white" stroke="oklch(0.92 0.22 130)" strokeWidth="2"/>
          {/* stop */}
          <circle cx="120" cy="220" r="4" fill="oklch(0.72 0.16 235)"/>
        </svg>
        <div style={{ position: 'absolute', top: 12, left: 12, padding: '4px 8px', background: 'rgba(0,0,0,0.6)', borderRadius: 6, fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.14em' }}>
          1 STOP · AUBURN
        </div>
      </div>

      <div style={{ padding: '12px 22px 60px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
        <Mini label="DIST" value="198 mi"/>
        <Mini label="ETA" value="3:48"/>
        <Mini label="CHARGE" value="22 m"/>
      </div>
    </div>
  );
}

function Mini({ label, value }) {
  return (
    <div style={{ padding: '10px 8px', borderRadius: 10, background: 'rgba(255,255,255,0.04)' }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 8, letterSpacing: '0.14em', opacity: 0.5 }}>{label}</div>
      <div style={{ fontSize: 14, fontFamily: 'var(--display)', marginTop: 2 }}>{value}</div>
    </div>
  );
}

function PhoneScreenAI() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <PhoneStatus time="9:40"/>
      <div style={{ padding: '20px 22px 0' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.5)' }}>ALTO</div>
        <div style={{ fontFamily: 'var(--display)', fontSize: 22, fontWeight: 300, letterSpacing: '-0.02em', marginTop: 6 }}>
          Predicting your evening.
        </div>
      </div>

      {/* orb */}
      <div style={{ flex: 1, display: 'grid', placeItems: 'center', position: 'relative' }}>
        <div style={{
          width: 140, height: 140, borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 30%, oklch(0.78 0.10 235), oklch(0.55 0.18 250) 60%, oklch(0.30 0.12 260))',
          boxShadow: '0 0 80px oklch(0.72 0.16 235 / 0.7)',
          animation: 'orbBreathe 4s ease-in-out infinite',
        }}/>
      </div>

      <div style={{ padding: '0 22px 60px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{
          padding: '12px 14px', borderRadius: 14,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)',
          fontSize: 12, lineHeight: 1.5,
        }}>
          Battery hits 22% by 18:40. Reserve a charger at Ferry Building during dinner?
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button style={{
            flex: 1, padding: '10px', borderRadius: 999,
            background: 'oklch(0.92 0.22 130)', color: '#000',
            border: 'none', fontSize: 11, fontWeight: 600,
            cursor: 'pointer',
          }}>Yes, reserve</button>
          <button style={{
            flex: 1, padding: '10px', borderRadius: 999,
            background: 'rgba(255,255,255,0.06)', color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            fontSize: 11, cursor: 'pointer',
          }}>Not now</button>
        </div>
      </div>
    </div>
  );
}

function PhoneScreenNetwork() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#0A0C10' }}>
      <PhoneStatus time="9:38"/>

      {/* Map area */}
      <div style={{
        position: 'relative',
        flex: 1,
        margin: '12px 16px 0',
        borderRadius: 22,
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #14181F, #0E1116)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}>
        {/* Top controls */}
        <div style={{
          position: 'absolute', top: 12, left: 12, right: 12,
          display: 'flex', justifyContent: 'space-between',
          zIndex: 3,
        }}>
          <button style={{
            width: 34, height: 34, borderRadius: '50%',
            background: 'rgba(255,255,255,0.95)', border: 'none',
            display: 'grid', placeItems: 'center', cursor: 'pointer',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 4h10M2 7h10M2 10h10" stroke="#000" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </button>
          <div style={{ display: 'flex', gap: 6 }}>
            <button style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'rgba(255,255,255,0.95)', border: 'none',
              display: 'grid', placeItems: 'center', cursor: 'pointer',
            }}>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <circle cx="6" cy="6" r="4" stroke="#000" strokeWidth="1.4"/>
                <path d="M9.5 9.5l3 3" stroke="#000" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </button>
            <button style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'rgba(255,255,255,0.95)', border: 'none',
              display: 'grid', placeItems: 'center', cursor: 'pointer',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 4h8M3 7h6M3 10h8" stroke="#000" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Map SVG */}
        <svg viewBox="0 0 280 380" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
          {/* Soft district shapes */}
          <g fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6">
            <path d="M-10 80 L 80 60 L 130 100 L 110 180 L 30 200 Z"/>
            <path d="M130 60 L 230 50 L 280 110 L 250 170 L 180 180 L 130 100 Z"/>
            <path d="M250 170 L 290 180 L 290 260 L 230 270 L 200 220 Z"/>
            <path d="M30 200 L 110 180 L 180 180 L 200 220 L 230 270 L 180 320 L 70 310 L 20 270 Z"/>
            <path d="M-10 270 L 20 270 L 70 310 L 30 380 L -10 380 Z"/>
            <path d="M180 320 L 230 270 L 290 260 L 290 380 L 170 380 Z"/>
          </g>

          {/* Streets */}
          <g stroke="rgba(255,255,255,0.16)" strokeWidth="0.8" fill="none">
            <path d="M-10 130 Q 80 110 150 140 T 290 140"/>
            <path d="M-10 230 Q 80 220 140 250 T 290 240"/>
            <path d="M60 0 Q 80 100 100 180 T 130 380"/>
            <path d="M170 0 Q 180 80 200 200 T 240 380"/>
            <path d="M-10 320 L 290 330"/>
          </g>

          {/* Route line (active) */}
          <path
            d="M70 290 Q 100 250 120 220 Q 145 190 165 165 Q 180 145 195 130"
            stroke="#FF5A2E"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          >
            <animate attributeName="stroke-dasharray" values="0 200;200 200" dur="2s" repeatCount="indefinite"/>
          </path>

          {/* Origin */}
          <g>
            <circle cx="70" cy="290" r="11" fill="rgba(255,255,255,0.18)"/>
            <circle cx="70" cy="290" r="7" fill="rgba(255,255,255,0.95)" stroke="#0A0C10" strokeWidth="1.5"/>
            <circle cx="70" cy="290" r="2.5" fill="#0A0C10"/>
          </g>

          {/* Destination label */}
          <g transform="translate(195, 130)">
            <rect x="-46" y="-30" width="92" height="20" rx="10" fill="#fff"/>
            <text x="0" y="-16" textAnchor="middle" fontFamily="var(--body)" fontSize="9" fill="#0A0C10" fontWeight="500">Berkeley Plaza</text>
          </g>
          <circle cx="195" cy="130" r="5" fill="#fff" stroke="#FF5A2E" strokeWidth="2"/>
        </svg>

        {/* Charge station pins — overlaid divs */}
        <ChargePin x="22%" y="14%" status="available" count={4}/>
        <ChargePin x="58%" y="9%" status="busy"/>
        <ChargePin x="80%" y="20%" status="busy"/>
        <ChargePin x="40%" y="42%" status="available"/>
        <ChargePin x="14%" y="62%" status="available" count={2}/>
        <ChargePin x="20%" y="76%" status="available" count={2}/>
        <ChargePin x="48%" y="60%" status="busy" count={3}/>
        <ChargePin x="72%" y="70%" status="available" count={3}/>
        <ChargePin x="84%" y="55%" status="available"/>

        {/* Selected station chip */}
        <div style={{
          position: 'absolute', left: '34%', top: '50%',
          background: '#fff', color: '#0A0C10',
          padding: '4px 10px', borderRadius: 10,
          fontFamily: 'var(--body)', fontSize: 9, fontWeight: 500,
          whiteSpace: 'nowrap',
          zIndex: 4,
        }}>
          Ridgewood Blvd
        </div>

        {/* Bottom HUD pills */}
        <div style={{
          position: 'absolute',
          left: 10, right: 10, bottom: 10,
          display: 'flex', gap: 6, alignItems: 'center',
          zIndex: 3,
        }}>
          <div style={{
            padding: '6px 12px', borderRadius: 999,
            background: '#FF5A2E', color: '#fff',
            display: 'flex', alignItems: 'center', gap: 6,
            fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 600,
          }}>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <rect x="0.5" y="1.5" width="11" height="7" rx="1.5" stroke="#fff" strokeWidth="1"/>
              <rect x="2" y="3" width="7" height="4" rx="0.5" fill="#fff"/>
              <line x1="12.5" y1="3.5" x2="12.5" y2="6.5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            87%
          </div>
          <div style={{
            padding: '6px 12px', borderRadius: 999,
            background: 'rgba(0,0,0,0.85)', color: '#fff',
            display: 'flex', alignItems: 'center', gap: 6,
            fontFamily: 'var(--mono)', fontSize: 10,
          }}>
            <svg width="12" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M3 8a3 3 0 010-6 4 4 0 017 1.5 2.5 2.5 0 01.5 4.5z" stroke="#fff" strokeWidth="1" fill="none"/>
            </svg>
            14°
          </div>
          <div style={{
            padding: '6px 8px', borderRadius: 999,
            background: 'rgba(0,0,0,0.85)', color: '#fff',
            display: 'grid', placeItems: 'center',
          }}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M5 2v2M9 2v2M3.5 4h7v3a3.5 3.5 0 11-7 0V4zM7 10.5v2.5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
          <div style={{
            marginLeft: 'auto',
            width: 30, height: 30, borderRadius: '50%',
            background: '#fff',
            display: 'grid', placeItems: 'center',
          }}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="2.5" stroke="#0A0C10" strokeWidth="1.2"/>
              <path d="M7 1v1M7 12v1M13 7h-1M2 7H1" stroke="#0A0C10" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom dock */}
      <div style={{ padding: '12px 16px 70px' }}>
        <div style={{
          padding: '12px 14px',
          borderRadius: 16,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 8, letterSpacing: '0.16em', color: '#FF5A2E', marginBottom: 2 }}>NEAREST</div>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#fff' }}>Berkeley Plaza · 350 kW</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 1 }}>Off-peak · 4 free stalls</div>
          </div>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: '#FF5A2E', color: '#fff',
            display: 'grid', placeItems: 'center',
            fontFamily: 'var(--mono)', fontWeight: 600,
            lineHeight: 1, textAlign: 'center',
          }}>
            <div>
              <div style={{ fontSize: 16 }}>8</div>
              <div style={{ fontSize: 8, opacity: 0.8 }}>min</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChargePin({ x, y, status, count }) {
  const color = status === "available" ? "#22C55E" : "#FF5A2E";
  return (
    <div style={{
      position: 'absolute',
      left: x, top: y,
      transform: 'translate(-50%, -100%)',
      zIndex: 2,
    }}>
      {count ? (
        <div style={{
          width: 22, height: 26,
          borderRadius: '12px 12px 12px 4px',
          background: '#0A0C10',
          color: '#fff',
          display: 'grid', placeItems: 'center',
          fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 600,
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          border: '1.5px solid rgba(255,255,255,0.1)',
          position: 'relative',
        }}>
          {count}
          <div style={{
            position: 'absolute',
            right: -3, top: -3,
            width: 12, height: 12,
            borderRadius: '50%',
            background: color,
            border: '2px solid #0A0C10',
          }}/>
        </div>
      ) : (
        <div style={{
          width: 20, height: 24,
          borderRadius: '10px 10px 10px 2px',
          background: color,
          display: 'grid', placeItems: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        }}>
          <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
            <path d="M5 2v2M9 2v2M3.5 4h7v3a3.5 3.5 0 11-7 0V4zM7 10v2" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </div>
      )}
    </div>
  );
}

window.PhoneSection = PhoneSection;
