/* ALTO AI COMPANION — living, predictive assistant */

const AI_FEATURES = [
  { icon: "Bolt", label: "Predictive charging" },
  { icon: "Route", label: "Battery-aware routing" },
  { icon: "Mic", label: "Calm voice presence" },
  { icon: "Sparkle", label: "Travel intelligence" },
  { icon: "Battery", label: "Energy optimization" },
  { icon: "Plug", label: "Smart alerts" },
];

const AI_TRANSCRIPT = [
  { role: "alto", text: "Battery will hit 22% by 18:40 — earlier than your dinner. Reserve a charger at Ferry Building during reservation?" },
  { role: "you", text: "Yes." },
  { role: "alto", text: "Done. Stall 04 held from 19:00. I moved your route home to avoid the bridge backup." },
];

function CompanionSection() {
  const [activeMsg, setActiveMsg] = useState(0);
  useEffect(() => {
    const i = setInterval(() => {
      setActiveMsg((m) => (m + 1) % (AI_TRANSCRIPT.length + 1));
    }, 2800);
    return () => clearInterval(i);
  }, []);

  return (
    <section className="companion section" id="companion">
      <div className="companion__halo" aria-hidden="true" />
      <div className="container companion__layout">
        <Reveal>
          <div className="companion__copy">
            <div className="eyebrow">02 — ALTO AI</div>
            <h2>
              An intelligence that<br/>
              <em style={{
                fontStyle: 'normal',
                background: 'linear-gradient(120deg, var(--blue), var(--lime))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}>listens before it speaks.</em>
            </h2>
            <p>
              Alto AI is the soft, persistent presence behind every drive. It doesn't ping you with notifications. It quietly handles charge scheduling, route adaptation, and energy spend — surfacing only the one thing you actually need to decide.
            </p>
            <div className="companion__features">
              {AI_FEATURES.map((f, i) => {
                const I = Icon[f.icon];
                return (
                  <Reveal key={i} delay={i * 80}>
                    <div className="companion__feat">
                      <I />
                      <span>{f.label}</span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal blur slow>
          <div className="companion__orb-wrap">
            <AltoOrb activeMsg={activeMsg} />
            <AltoTranscript activeMsg={activeMsg} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AltoOrb({ activeMsg }) {
  return (
    <div style={{
      position: 'relative',
      width: 'min(520px, 100%)',
      aspectRatio: '1',
      margin: '0 auto',
    }}>
      {/* Outer rings */}
      <div style={{
        position: 'absolute', inset: 0,
        borderRadius: '50%',
        border: '1px solid var(--line)',
        animation: 'spin 80s linear infinite',
      }} />
      <div style={{
        position: 'absolute', inset: '8%',
        borderRadius: '50%',
        border: '1px dashed var(--line-2)',
        animation: 'spin 60s linear reverse infinite',
      }} />
      <div style={{
        position: 'absolute', inset: '16%',
        borderRadius: '50%',
        border: '1px solid var(--line)',
        animation: 'spin 40s linear infinite',
      }} />

      {/* satellite dots on rings */}
      {[0, 1, 2, 3].map(i => (
        <div key={i} style={{
          position: 'absolute',
          top: '50%', left: '50%',
          width: 8, height: 8,
          marginTop: -4, marginLeft: -4,
          transformOrigin: '50% 50%',
          animation: `spin ${30 + i * 12}s linear ${i % 2 ? 'reverse' : ''} infinite`,
        }}>
          <div style={{
            position: 'absolute',
            left: `${40 - i * 8}%`,
            top: '50%',
            width: 6, height: 6,
            background: i % 2 ? 'var(--lime)' : 'var(--blue)',
            borderRadius: '50%',
            boxShadow: `0 0 12px currentColor`,
            color: i % 2 ? 'var(--lime)' : 'var(--blue)',
          }}/>
        </div>
      ))}

      {/* Core orb */}
      <div style={{
        position: 'absolute',
        inset: '28%',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 30%, oklch(0.78 0.10 235), oklch(0.55 0.18 250) 60%, oklch(0.30 0.12 260))',
        boxShadow: '0 0 80px oklch(0.72 0.16 235 / 0.6), 0 0 200px oklch(0.72 0.16 235 / 0.3), inset 0 0 60px rgba(255,255,255,0.2)',
        animation: 'orbBreathe 4s ease-in-out infinite',
      }}>
        {/* Highlight */}
        <div style={{
          position: 'absolute',
          top: '12%', left: '20%',
          width: '40%', height: '30%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.6), transparent 70%)',
          filter: 'blur(8px)',
        }}/>
        {/* Inner caustic shimmer */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: 'conic-gradient(from 0deg, transparent, oklch(0.92 0.22 130 / 0.3), transparent 30%, transparent 70%, oklch(0.72 0.16 235 / 0.3), transparent)',
          animation: 'spin 8s linear infinite',
          mixBlendMode: 'screen',
        }}/>
      </div>

      {/* Voice waveform overlay */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        opacity: activeMsg % 2 === 0 ? 1 : 0.3,
        transition: 'opacity 0.5s',
        zIndex: 2,
      }}>
        {[0,1,2,3,4,5,6].map(i => (
          <div key={i} style={{
            width: 3,
            height: 8 + Math.abs(Math.sin((i / 6) * Math.PI)) * 28,
            background: 'rgba(255,255,255,0.85)',
            borderRadius: 2,
            animation: `pulse ${0.6 + (i % 3) * 0.2}s ease-in-out ${i * 0.05}s infinite`,
          }}/>
        ))}
      </div>

      {/* Label below */}
      <div style={{
        position: 'absolute',
        bottom: -20,
        left: 0, right: 0,
        textAlign: 'center',
        fontFamily: 'var(--mono)',
        fontSize: 10,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--ink-3)',
      }}>
        ALTO · LISTENING
      </div>
    </div>
  );
}

function AltoTranscript({ activeMsg }) {
  return (
    <div style={{
      position: 'absolute',
      left: 0, right: 0,
      top: 0,
      pointerEvents: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    }}>
      {AI_TRANSCRIPT.map((msg, i) => (
        <div key={i} style={{
          alignSelf: msg.role === 'you' ? 'flex-end' : 'flex-start',
          maxWidth: '68%',
          padding: '10px 14px',
          borderRadius: msg.role === 'you' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
          background: msg.role === 'you' ? 'var(--ink)' : 'var(--glass-2)',
          border: msg.role === 'you' ? 'none' : '1px solid var(--line)',
          backdropFilter: 'blur(20px)',
          color: msg.role === 'you' ? 'var(--bg)' : 'var(--ink)',
          fontSize: 13,
          lineHeight: 1.4,
          opacity: activeMsg >= i ? 1 : 0,
          transform: activeMsg >= i ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          {msg.role === 'alto' && (
            <div style={{
              fontFamily: 'var(--mono)',
              fontSize: 9,
              letterSpacing: '0.16em',
              opacity: 0.6,
              marginBottom: 3,
            }}>ALTO</div>
          )}
          {msg.text}
        </div>
      ))}
    </div>
  );
}

window.CompanionSection = CompanionSection;
