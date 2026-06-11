/* CURSOR FOLLOW — dual-layer custom cursor with easing */

function CursorFollow() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const haloRef = useRef(null);
  const stateRef = useRef({
    mx: -200, my: -200,           // target (mouse position)
    dx: -200, dy: -200,           // dot position (1:1)
    rx: -200, ry: -200,           // ring position (eased)
    hx: -200, hy: -200,           // halo position (more eased)
    hover: false,
    text: false,
    pressed: false,
    visible: false,
  });

  useEffect(() => {
    // Skip for touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const s = stateRef.current;

    const onMove = (e) => {
      s.mx = e.clientX;
      s.my = e.clientY;
      if (!s.visible) {
        s.visible = true;
        document.documentElement.classList.add("has-cursor-follow");
      }
    };
    const onLeave = () => {
      s.visible = false;
      document.documentElement.classList.remove("has-cursor-follow");
    };
    const onEnter = () => {
      s.visible = true;
      document.documentElement.classList.add("has-cursor-follow");
    };
    const onDown = () => { s.pressed = true; };
    const onUp = () => { s.pressed = false; };

    // hover detection on interactive elements vs text
    const interactiveSel = "a, button, [role='button'], input, select, textarea, .nav__link, .nav__cta, .feat-card, .exp-card, .price-card, .faq-item, .trust-card, [data-hover]";
    const textSel = "h1, h2, h3, h4, h5, h6, p, li, blockquote, .hero__sub, .section-head p";
    const onOver = (e) => {
      const t = e.target;
      if (!t.closest) return;
      if (t.closest(interactiveSel)) {
        s.hover = true;
        s.text = false;
      } else if (t.closest(textSel)) {
        s.text = true;
        s.hover = false;
      }
    };
    const onOut = (e) => {
      const t = e.target;
      if (!t.closest) return;
      if (t.closest(interactiveSel)) s.hover = false;
      if (t.closest(textSel)) s.text = false;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    let raf;
    const tick = () => {
      // Lerp positions
      s.dx += (s.mx - s.dx) * 1;       // dot: snap
      s.dy += (s.my - s.dy) * 1;
      s.rx += (s.mx - s.rx) * 0.20;    // ring: medium ease
      s.ry += (s.my - s.ry) * 0.20;
      s.hx += (s.mx - s.hx) * 0.08;    // halo: slow ease
      s.hy += (s.my - s.hy) * 0.08;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${s.dx}px, ${s.dy}px, 0) translate(-50%, -50%)`;
        dotRef.current.style.opacity = s.text ? 0 : "";
      }
      if (ringRef.current) {
        const scale = s.hover ? 2.2 : s.pressed ? 0.7 : 1;
        ringRef.current.style.transform = `translate3d(${s.rx}px, ${s.ry}px, 0) translate(-50%, -50%) scale(${scale})`;
        // Toggle modes
        const el = ringRef.current;
        if (s.hover) {
          el.dataset.mode = "hover";
        } else if (s.text) {
          el.dataset.mode = "text";
        } else {
          el.dataset.mode = "idle";
        }
      }
      if (haloRef.current) {
        haloRef.current.style.transform = `translate3d(${s.hx}px, ${s.hy}px, 0) translate(-50%, -50%)`;
      }

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.classList.remove("has-cursor-follow");
    };
  }, []);

  return (
    <React.Fragment>
      <div ref={haloRef} className="cursor-halo" aria-hidden="true"/>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true"/>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true"/>
    </React.Fragment>
  );
}

window.CursorFollow = CursorFollow;
