/* SECTION 6 — DESTINATIONS MARQUEE (dual-row) */

function MarqueeSection() {
  const rowA = [
    { n: "Lisbon", cc: "PT", g: "linear-gradient(135deg,#e08b3e,#b54a2e)", img: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=160&h=160&q=70&auto=format&fit=crop" },
    { n: "Tokyo", cc: "JP", g: "linear-gradient(135deg,#8b5cf6,#3a1c6d)", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=160&h=160&q=70&auto=format&fit=crop" },
    { n: "Bali", cc: "ID", g: "linear-gradient(135deg,#2e9b8a,#14463d)", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=160&h=160&q=70&auto=format&fit=crop" },
    { n: "Marrakech", cc: "MA", g: "linear-gradient(135deg,#d98b3e,#7a3d1c)", img: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=160&h=160&q=70&auto=format&fit=crop" },
    { n: "Reykjavík", cc: "IS", g: "linear-gradient(135deg,#4a6b8a,#1c2b3d)", img: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=160&h=160&q=70&auto=format&fit=crop" },
    { n: "Mexico City", cc: "MX", g: "linear-gradient(135deg,#e05a7a,#7a1c3d)", img: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=160&h=160&q=70&auto=format&fit=crop" },
    { n: "Cape Town", cc: "ZA", g: "linear-gradient(135deg,#3eb0a0,#1c5a4d)", img: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=160&h=160&q=70&auto=format&fit=crop" },
  ];
  const rowB = [
    { n: "Kyoto", cc: "JP", g: "linear-gradient(135deg,#c25a8a,#5a1c4d)", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=160&h=160&q=70&auto=format&fit=crop" },
    { n: "Patagonia", cc: "AR", g: "linear-gradient(135deg,#5a8ab0,#1c3d5a)", img: "https://images.unsplash.com/photo-1478827536114-da961b7f86d2?w=160&h=160&q=70&auto=format&fit=crop" },
    { n: "Hanoi", cc: "VN", g: "linear-gradient(135deg,#3eb05a,#1c5a2d)", img: "https://images.unsplash.com/photo-1528127269322-539801943592?w=160&h=160&q=70&auto=format&fit=crop" },
    { n: "Lagos", cc: "NG", g: "linear-gradient(135deg,#e0a03e,#7a5a1c)", img: "https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?w=160&h=160&q=70&auto=format&fit=crop" },
    { n: "Oaxaca", cc: "MX", g: "linear-gradient(135deg,#a05ce0,#3d1c7a)", img: "https://images.unsplash.com/photo-1547995886-6dc09384c6e6?w=160&h=160&q=70&auto=format&fit=crop" },
    { n: "Tbilisi", cc: "GE", g: "linear-gradient(135deg,#e07a5a,#7a2d1c)", img: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=160&h=160&q=70&auto=format&fit=crop" },
    { n: "Queenstown", cc: "NZ", g: "linear-gradient(135deg,#3e9be0,#1c4d7a)", img: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=160&h=160&q=70&auto=format&fit=crop" },
  ];
  const Item = ({ d }) => (
    <div className="marq__item">
      <div className="marq__swatch" style={{ background: d.g }}>
        <img src={d.img} alt={d.n} loading="lazy"
          onError={(e) => { e.currentTarget.style.display = "none"; }}/>
      </div>
      <span className="marq__name">{d.n}</span>
      <span className="marq__cc">{d.cc}</span>
    </div>
  );
  return (
    <section className="marq">
      <div className="marq__label container">
        <span className="eyebrow">120+ destinations · always growing</span>
      </div>
      <div className="marq__fade marq__fade--l"/>
      <div className="marq__fade marq__fade--r"/>
      <div className="marq__row marq__row--a">
        {[...rowA, ...rowA].map((d, i) => <Item d={d} key={i}/>)}
      </div>
      <div className="marq__row marq__row--b">
        {[...rowB, ...rowB].map((d, i) => <Item d={d} key={i}/>)}
      </div>
    </section>
  );
}

window.MarqueeSection = MarqueeSection;
