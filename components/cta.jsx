/* FINAL CINEMATIC CTA */

function CTASection() {
  const ref = useRef(null);
  const p = useScrollProgress(ref);

  return (
    <section className="cta" ref={ref} id="cta">
      <CTAParticles />
      {/* energy wash */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(60% 80% at 50% ${100 - p * 30}%, oklch(0.72 0.16 235 / ${0.25 + p * 0.15}), transparent 70%)`,
        transition: 'background 0.3s linear',
        pointerEvents: 'none',
      }}/>

      <div className="cta__inner">
        <Reveal>
          <div className="cta__eyebrow">ALTO.EV · MMXXVI</div>
        </Reveal>

        <Reveal delay={100} slow>
          <h2 className="cta__headline">
            The future<br/>won't <em>wait.</em>
          </h2>
        </Reveal>

        <Reveal delay={300}>
          <p className="cta__sub">
            Reserve your place. The first 5,000 Alto.EV companions ship summer 2026 — built for everyone with a plug.
          </p>
        </Reveal>

        <Reveal delay={500}>
          <div className="cta__ctas">
            <button className="btn btn--primary" style={{ padding: '18px 28px', fontSize: 15 }} onClick={() => { window.location.href = "https://altotravelai.vercel.app/"; }}>
              Reserve Alto.EV
              <Icon.Arrow className="btn__arrow"/>
            </button>
            <button className="btn btn--ghost" style={{ padding: '18px 28px', fontSize: 15 }}>
              Read the manifesto
            </button>
          </div>
        </Reveal>

        <Reveal delay={700}>
          <div style={{
            marginTop: 60,
            display: 'flex',
            gap: 24,
            justifyContent: 'center',
            flexWrap: 'wrap',
            fontFamily: 'var(--mono)',
            fontSize: 10,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--ink-3)',
          }}>
            <span>● Fully refundable</span>
            <span>● Ships summer '26</span>
            <span>● 38 networks · day one</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CTAParticles() {
  const dots = useMemo(() => Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 1 + Math.random() * 3,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 10,
    color: Math.random() > 0.7 ? 'oklch(0.92 0.22 130)' : 'oklch(0.72 0.16 235)',
  })), []);
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {dots.map(d => (
        <div key={d.id} style={{
          position: 'absolute',
          left: `${d.left}%`,
          top: `${d.top}%`,
          width: d.size, height: d.size,
          borderRadius: '50%',
          background: d.color,
          boxShadow: `0 0 ${4 + d.size * 4}px ${d.color}`,
          opacity: 0.4,
          animation: `float ${d.duration}s ease-in-out ${d.delay}s infinite, blink ${d.duration * 0.6}s ease-in-out ${d.delay}s infinite`,
        }}/>
      ))}
    </div>
  );
}

window.CTASection = CTASection;
