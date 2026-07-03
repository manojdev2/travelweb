/* SECTION 10 — CTA FOOTER */

function CTASection() {
  return (
    <section className="cta">
      <div className="cta__bg"/>
      <div className="cta__inner">
        <Reveal>
          <div className="eyebrow cta__eyebrow">Ready when you are</div>
          <h2 className="cta__headline">Your next adventure <em>starts here.</em></h2>
          <p className="cta__sub">Join 10,000+ travelers planning smarter. Free to start, no card required.</p>
          <form className="cta__form" onSubmit={(e) => { e.preventDefault(); goToApp(); }}>
            <input className="cta__input" type="email" placeholder="you@email.com" aria-label="Email"/>
            <button className="btn btn--primary" type="submit"><span>Get started free</span><Icon.Arrow className="btn__arrow"/></button>
          </form>
          <div className="cta__note">No spam · Cancel anytime · 4.9★ on every store</div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { title: "Product", items: ["AI Planner", "Hyperlocal", "Explore", "Group trips", "Pricing"] },
    { title: "Company", items: ["About", "Local experts", "Careers", "Press"] },
    { title: "Support", items: ["Help center", "Contact", "Status", "Community"] },
  ];
  const socials = [
    { ico: <Social.TikTok/>, label: "TikTok" },
    { ico: <Social.Instagram/>, label: "Instagram" },
    { ico: <Social.Threads/>, label: "Threads" },
    { ico: <Social.LinkedIn/>, label: "LinkedIn" },
  ];
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer__brand"><Wordmark h={22}/></div>
            <p className="footer__tagline">AI + human intelligence for trips that actually feel local. Plan smarter, travel better — from anywhere, on any budget.</p>
            <div className="footer__socials">
              {socials.map((s, i) => <button className="footer__social" key={i} aria-label={s.label}>{s.ico}</button>)}
            </div>
          </div>
          {cols.map((c, i) => (
            <div className="footer__col" key={i}>
              <div className="footer__col-title">{c.title}</div>
              <ul>{c.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className="footer__bottom">
          <span className="footer__copy">© 2026 <Wordmark h={13} className="wordmark--inline"/></span>
        </div>
      </div>
    </footer>
  );
}

window.CTASection = CTASection;
window.Footer = Footer;
