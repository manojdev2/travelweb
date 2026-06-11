/* EMOTIONAL LAYER */

const EMOTIONS = [
  {
    word: "Freedom",
    body: "Drive farther without the math. Alto handles the kilowatts, the miles, the timing — so the trip is the trip again.",
  },
  {
    word: "Calm",
    body: "Fewer notifications. Fewer decisions. Alto only surfaces what needs you. The rest happens in the background.",
  },
  {
    word: "Confidence",
    body: "Range anxiety is a math problem. Alto already solved it before you got in the car.",
  },
];

function EmotionalSection() {
  return (
    <section className="emotional section" id="emotional">
      <div className="container">
        <div className="section-head">
          <div className="section-head__idx">05 — EMOTIONAL</div>
          <Reveal>
            <h2>How it feels<br/>to drive a thinking car.</h2>
            <p>
              Specs sell. Feelings keep. Here's what people who've lived with Alto.EV for a year actually say — about the way it changes the texture of a day.
            </p>
          </Reveal>
        </div>

        <div className="emotional__quotes">
          {EMOTIONS.map((e, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="emotional__quote">
                <div className="emotional__quote-word">{e.word}.</div>
                <p className="emotional__quote-body">{e.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400}>
          <div style={{
            marginTop: 80,
            padding: '64px 48px',
            border: '1px solid var(--line)',
            borderRadius: 28,
            background: 'var(--bg)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 48,
            alignItems: 'center',
          }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>YEAR ONE WITH ALTO</div>
              <h3 style={{
                fontFamily: 'var(--display)',
                fontSize: 'clamp(28px, 3.4vw, 44px)',
                fontWeight: 300,
                letterSpacing: '-0.028em',
                lineHeight: 1.05,
                margin: 0,
                textWrap: 'balance',
              }}>
                "I haven't thought about charging in 11 months. The car just… knows where I'm going."
              </h3>
              <div className="mono" style={{ marginTop: 24, color: 'var(--ink-3)' }}>
                — Lena Ito · Brooklyn · drives 4,200 mi/yr
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Stat n="0" sub="charge stops searched"/>
              <Stat n="264" sub="off-peak hours used"/>
              <Stat n="11" sub="months of calm"/>
              <Stat n="4.2k" sub="miles, zero anxiety"/>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stat({ n, sub }) {
  return (
    <div style={{ padding: 16, border: '1px solid var(--line)', borderRadius: 14 }}>
      <div style={{ fontFamily: 'var(--display)', fontSize: 34, letterSpacing: '-0.03em', lineHeight: 1 }}>{n}</div>
      <div className="mono" style={{ marginTop: 6, color: 'var(--ink-3)', fontSize: 10, letterSpacing: '0.14em' }}>{sub}</div>
    </div>
  );
}

window.EmotionalSection = EmotionalSection;
