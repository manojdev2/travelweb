/* GLOBAL BACKGROUND FX — fixed, behind everything.
   Scene-aware ambient system: aurora light fields whose palette and
   composition morph to match the section currently in view.
     hero         → brand dawn (violet / mint)
     intelligence → analytical cool blue
     features     → deep tech violet-blue
     hyperlocal   → fresh local greens
     explore      → sunset wanderlust (rose / gold)
     golden       → golden-hour marquee
     proof        → warm violet (human stories)
     pricing      → trustworthy blue / mint
     faq          → quiet, dimmed
     cta          → full brand glow
   Hues interpolate smoothly via registered CSS custom properties. */

const BG_SCENES = [
  [".hero",     "hero"],
  [".trust",    "intelligence"],
  [".features", "features"],
  [".hyper",    "hyperlocal"],
  [".exp",      "explore"],
  [".marq",     "golden"],
  [".proof",    "proof"],
  [".pricing",  "pricing"],
  [".faq",      "faq"],
  [".cta",      "cta"],
];

function useActiveScene() {
  const [scene, setScene] = useState("hero");
  useEffect(() => {
    let els = [];
    let raf = 0;
    let last = "hero";
    const resolve = () => {
      els = BG_SCENES
        .map(([sel, name]) => {
          const el = document.querySelector(sel);
          return el ? { el, name } : null;
        })
        .filter(Boolean);
    };
    const update = () => {
      raf = 0;
      if (!els.length) resolve();
      const mid = window.innerHeight * 0.5;
      for (const { el, name } of els) {
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) { last = name; break; }
      }
      setScene(last);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    resolve();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return scene;
}

function BackgroundFX() {
  const y = useScrollY();
  const scene = useActiveScene();

  return (
    <div className="bg-fx" aria-hidden="true" data-scene={scene}>
      {/* aurora light fields — slow parallax with scroll */}
      <div className="bg-fx__field" style={{ transform: `translate3d(0, ${y * -0.05}px, 0)` }}>
        <span className="bg-fx__orb bg-fx__orb--a"></span>
        <span className="bg-fx__orb bg-fx__orb--b"></span>
        <span className="bg-fx__orb bg-fx__orb--c"></span>
      </div>

      {/* soft diagonal light sweep */}
      <div className="bg-fx__sheen"></div>

      {/* horizon glow line that breathes and rises per scene */}
      <div className="bg-fx__horizon"></div>

      {/* fine film grain */}
      <div className="bg-fx__grain"></div>

      <div className="bg-fx__vignette" style={{ opacity: 0.3 + Math.min(0.25, y / 10000) }}></div>
    </div>
  );
}

window.BackgroundFX = BackgroundFX;
