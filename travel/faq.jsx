/* SECTION 9 — FAQ ACCORDION */

function FAQSection() {
  const [open, setOpen] = useState(0);
  const faqs = [
    { q: "How does Alto build a trip in seconds?", a: "Our agentic AI pulls live data on flights, stays, transit, hours and weather, then composes a paced day-by-day plan optimized for your route and budget — in one pass. You can edit any part instantly." },
    { q: "What is the Human Trust Intelligence Fabric™?", a: "It's the layer where verified local experts review AI-generated plans, swap out tourist traps, and attach confidence scores to each recommendation. Machine speed, human judgment." },
    { q: "How does hyperlocal budgeting actually work?", a: "Set an exact daily budget in your currency — say ₹1,800 in Mumbai or ₹5,000 in Paris — and Alto returns street-level picks: local eats, neighborhood stays, and transit routes, all priced with zero tourist markup." },
    { q: "Can I plan a trip with friends?", a: "Yes. Group Collaboration gives you real-time co-editing, budget splitting, and group voting, so six people can plan one trip without a single spreadsheet." },
    { q: "Do you handle bookings too?", a: "Hotel & flight booking is built in through live API integrations on Pro and Elite — book the whole trip without ever leaving Alto." },
    { q: "Is there a free way to try it?", a: "Absolutely. Start planning free, no card required. Upgrade only when you want hyperlocal specs, human review, or unlimited trips." },
  ];
  return (
    <section className="faq">
      <div className="container">
        <div className="faq__layout">
          <Reveal className="faq__intro">
            <span className="eyebrow">Good to know</span>
            <h2>Questions, answered.</h2>
            <p>Everything you need to know before your first trip. Still curious? Our team replies in minutes.</p>
          </Reveal>
          <Reveal delay={120} className="faq__list">
            {faqs.map((f, i) => (
              <div className={"faq-item" + (open === i ? " is-open" : "")} key={i} data-hover>
                <button className="faq-item__q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                  {f.q}
                  <span className="faq-item__icon"><Icon.Plus/></span>
                </button>
                <div className="faq-item__a">
                  <div className="faq-item__a-inner"><p>{f.a}</p></div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

window.FAQSection = FAQSection;
