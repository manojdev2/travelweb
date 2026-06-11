/* LOADER + NAV — Alto.Travel chrome */

function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setDone(true), 1850);
    return () => clearTimeout(t1);
  }, []);
  return (
    <div className={"loader" + (done ? " is-done" : "")}>
      <div className="loader__inner">
        <div className="loader__mark">
          <Wordmark h={44}/>
        </div>
        <div className="loader__bar"><i/></div>
        <div className="loader__label">Mapping your next adventure</div>
      </div>
    </div>
  );
}

function Nav({ theme, onToggleTheme }) {
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 600 && y > last.current);
      last.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className="nav" style={{ ['--nav-y']: hidden ? "-120px" : "0px" }}>
      <a href="#top" className="nav__logo">
        <span className="nav__dot"/>
        <Wordmark h={17}/>
      </a>
      <div className="nav__links">
        <a className="nav__link" href="#intelligence">Intelligence</a>
        <a className="nav__link" href="#features">Features</a>
        <a className="nav__link" href="#hyperlocal">Hyperlocal</a>
        <a className="nav__link" href="#explore">Explore</a>
        <a className="nav__link" href="#pricing">Pricing</a>
      </div>
      <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
        {theme === "dark" ? <Icon.Sun/> : <Icon.Moon/>}
      </button>
      <button className="nav__cta">Start free</button>
    </nav>
  );
}

function ScrollTop() {
  const [prog, setProg] = useState(0);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProg(max > 0 ? Math.min(1, window.scrollY / max) : 0);
        setShown(window.scrollY > 600);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  const R = 23;
  const C = 2 * Math.PI * R;
  return (
    <button
      className={"totop" + (shown ? " is-shown" : "")}
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <svg className="totop__ring" viewBox="0 0 52 52" aria-hidden="true">
        <circle cx="26" cy="26" r={R} className="totop__track"></circle>
        <circle cx="26" cy="26" r={R} className="totop__prog"
          strokeDasharray={C} strokeDashoffset={C * (1 - prog)}></circle>
      </svg>
      <svg className="totop__arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M7 12V2M2.5 6.5L7 2l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
      </svg>
    </button>
  );
}

window.Loader = Loader;
window.Nav = Nav;
window.ScrollTop = ScrollTop;
