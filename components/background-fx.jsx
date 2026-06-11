/* GLOBAL BACKGROUND FX — fixed, sits behind everything,
   themed to Alto.EV: rising energy particles, charge beams,
   live-grid waveform, drifting network grid */

function BackgroundFX() {
  const y = useScrollY();
  const [vp, setVp] = useState({ w: 1440, h: 900 });

  useEffect(() => {
    const onR = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    onR();
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, []);

  // particles drifting upward (long lifecycle, stable seed)
  const particles = useMemo(() => Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    yOffset: Math.random() * 100,
    size: 0.6 + Math.random() * 2.2,
    duration: 18 + Math.random() * 22,
    delay: -Math.random() * 30,
    color: Math.random() > 0.78 ? "lime" : "blue",
    drift: (Math.random() - 0.5) * 10,
  })), []);

  // vertical charge beams
  const beams = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: 8 + i * 11 + Math.random() * 6,
    duration: 6 + Math.random() * 6,
    delay: -Math.random() * 10,
    height: 120 + Math.random() * 200,
    color: Math.random() > 0.6 ? "lime" : "blue",
  })), []);
  // base grid offset — scrolls slowly with page (network drifting under)
  const gridOffset = (y * 0.15) % 80;

  return (
    <div className="bg-fx" aria-hidden="true">
      {/* grid layer (scrolls with page, slow) */}
      <div className="bg-fx__grid" style={{
        backgroundPosition: `0px ${-gridOffset}px, 0px ${-gridOffset}px`,
      }}/>

      {/* radial aura that drifts with scroll */}
      <div className="bg-fx__aura" style={{
        transform: `translate(-50%, calc(-50% + ${Math.sin(y * 0.001) * 80}px))`,
      }}/>

      {/* rising charge particles */}
      <div className="bg-fx__particles">
        {particles.map(p => (
          <div key={p.id} className="bg-fx__p" style={{
            left: `${p.x}%`,
            bottom: `${-10 + p.yOffset}%`,
            width: p.size,
            height: p.size,
            background: p.color === "lime" ? "var(--fx-lime)" : "var(--fx-blue)",
            boxShadow: `0 0 ${4 + p.size * 4}px currentColor`,
            color: p.color === "lime" ? "var(--fx-lime)" : "var(--fx-blue)",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            ['--drift']: `${p.drift}px`,
          }}/>
        ))}
      </div>

      {/* vertical charge beams */}
      <div className="bg-fx__beams">
        {beams.map(b => (
          <div key={b.id} className={`bg-fx__beam bg-fx__beam--${b.color}`} style={{
            left: `${b.x}%`,
            height: b.height,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}/>
        ))}
      </div>

      {/* live grid waveform — bottom-anchored sine wave */}
      <svg className="bg-fx__wave" viewBox="0 0 1440 200" preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="var(--fx-blue)" stopOpacity="0"/>
            <stop offset="50%" stopColor="var(--fx-blue)" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="var(--fx-blue)" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="waveGrad2" x1="0" x2="1">
            <stop offset="0%" stopColor="var(--fx-lime)" stopOpacity="0"/>
            <stop offset="50%" stopColor="var(--fx-lime)" stopOpacity="0.55"/>
            <stop offset="100%" stopColor="var(--fx-lime)" stopOpacity="0"/>
          </linearGradient>
        </defs>

        <path d="M0 100 Q 180 60 360 100 T 720 100 T 1080 100 T 1440 100"
              fill="none" stroke="url(#waveGrad)" strokeWidth="1.4">
            <animate attributeName="d"
              values="M0 100 Q 180 60 360 100 T 720 100 T 1080 100 T 1440 100;
                      M0 100 Q 180 140 360 100 T 720 100 T 1080 100 T 1440 100;
                      M0 100 Q 180 60 360 100 T 720 100 T 1080 100 T 1440 100"
              dur="9s" repeatCount="indefinite"/>
        </path>
        <path d="M0 130 Q 240 90 480 130 T 960 130 T 1440 130"
              fill="none" stroke="url(#waveGrad2)" strokeWidth="1.2">
            <animate attributeName="d"
              values="M0 130 Q 240 90 480 130 T 960 130 T 1440 130;
                      M0 130 Q 240 170 480 130 T 960 130 T 1440 130;
                      M0 130 Q 240 90 480 130 T 960 130 T 1440 130"
              dur="13s" repeatCount="indefinite"/>
        </path>
      </svg>

      {/* scroll-linked vignette */}
      <div className="bg-fx__vignette" style={{
        opacity: 0.5 + Math.min(0.5, y / 5000),
      }}/>
    </div>
  );
}

window.BackgroundFX = BackgroundFX;
