/* NAV + FOOTER + THEME */

function Nav({ theme, onToggleTheme }) {
  return (
    <nav className="nav">
      <a href="#" className="nav__logo">
        <span className="nav__dot"/>
        <LogoMark size={18}/>
        <span>Alto.EV</span>
      </a>
      <div className="nav__links">
        <a className="nav__link" href="#stories">Stories</a>
        <a className="nav__link" href="#companion">Alto AI</a>
        <a className="nav__link" href="#network">Network</a>
        <a className="nav__link" href="#ecosystem">Ecosystem</a>
        <a className="nav__link" href="#future">Future</a>
      </div>
      <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
        {theme === "dark" ? <Icon.Sun/> : <Icon.Moon/>}
      </button>
      <button className="nav__cta" onClick={() => { window.location.href = "https://altotravelai.vercel.app/"; }}>Reserve</button>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer__brand">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <LogoMark size={26}/> Alto.EV
              </span>
            </div>
            <p className="footer__tagline">
              The intelligent mobility companion for everyday electric life. Built in California. Shipping worldwide, summer 2026.
            </p>
          </div>
          {[
            { title: "PRODUCT", items: ["Alto AI", "App", "Network", "Wall Charger", "Roadmap"] },
            { title: "COMPANY", items: ["Manifesto", "Press", "Careers", "Sustainability"] },
            { title: "SUPPORT", items: ["Help Center", "Reserve", "Contact", "Status"] },
            { title: "LEGAL", items: ["Privacy", "Terms", "Energy Data"] },
          ].map((c, i) => (
            <div className="footer__col" key={i}>
              <div className="footer__col-title">{c.title}</div>
              <ul>{c.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className="footer__bottom">
          <span>© 2026 ALTO.EV INC. · ALL ENERGY ARRANGED</span>
          <span>SF · TOKYO · OSLO</span>
        </div>
      </div>
    </footer>
  );
}

window.Nav = Nav;
window.Footer = Footer;
