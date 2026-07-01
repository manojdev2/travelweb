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

const NAV_LINKS = [
  ["#intelligence", "Intelligence"],
  ["#features", "Features"],
  ["#hyperlocal", "Hyperlocal"],
  ["#explore", "Explore"],
  ["#pricing", "Pricing"],
];

function Nav({ theme, onToggleTheme }) {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
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

  // close the mobile menu when the viewport grows back to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 880) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // lock body scroll + close on Escape while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <React.Fragment>
      <nav className={"nav" + (open ? " is-open" : "")} style={{ ['--nav-y']: (hidden && !open) ? "-120px" : "0px" }}>
        <a href="#top" className="nav__logo" onClick={() => setOpen(false)}>
          <span className="nav__dot"/>
          <Wordmark h={17}/>
        </a>
        <div className="nav__links">
          {NAV_LINKS.map(([href, label]) => (
            <a key={href} className="nav__link" href={href}>{label}</a>
          ))}
        </div>
        <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
          {theme === "dark" ? <Icon.Sun/> : <Icon.Moon/>}
        </button>
        <button className="nav__cta" onClick={() => { window.location.href = "https://altotravelai.vercel.app/"; }}>Start free</button>
        <button
          className={"nav__burger" + (open ? " is-active" : "")}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span/><span/><span/>
        </button>
      </nav>

      <div
        className={"nav-mobile" + (open ? " is-open" : "")}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      >
        <div className="nav-mobile__panel" onClick={(e) => e.stopPropagation()}>
          <div className="nav-mobile__links">
            {NAV_LINKS.map(([href, label], i) => (
              <a
                key={href}
                className="nav-mobile__link"
                href={href}
                style={{ ['--i']: i }}
                onClick={() => setOpen(false)}
              >
                <span>{label}</span>
                <Icon.Arrow/>
              </a>
            ))}
          </div>
          <button className="nav-mobile__cta" onClick={() => { setOpen(false); window.location.href = "https://altotravelai.vercel.app/"; }}>Start free</button>
        </div>
      </div>
    </React.Fragment>
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
