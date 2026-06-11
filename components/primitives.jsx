/* Shared primitives, hooks, icons */

const { useState, useEffect, useRef, useMemo, useLayoutEffect } = React;

/* ---------- Reveal-on-scroll ---------- */
function Reveal({ children, delay = 0, className = "", blur = false, slow = false, as: Tag = "div", ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setTimeout(() => setShown(true), delay);
          io.disconnect();
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -10% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <Tag
      ref={ref}
      className={[
        "reveal",
        blur ? "reveal--blur" : "",
        slow ? "reveal--slow" : "",
        shown ? "is-in" : "",
        className,
      ].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ---------- Hook: useScrollProgress for an element (0–1 across viewport) ---------- */
function useScrollProgress(ref) {
  const [p, setP] = useState(0);
  useEffect(() => {
    function onScroll() {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when element top hits bottom of viewport; 1 when element bottom hits top
      const total = rect.height + vh;
      const seen = vh - rect.top;
      setP(Math.max(0, Math.min(1, seen / total)));
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);
  return p;
}

/* ---------- Hook: useRawScrollY ---------- */
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onS = () => setY(window.scrollY);
    onS();
    window.addEventListener("scroll", onS, { passive: true });
    return () => window.removeEventListener("scroll", onS);
  }, []);
  return y;
}

/* ---------- Icons ---------- */
const Icon = {
  Arrow: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  ArrowDiag: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <path d="M3 11L11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Sun: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M7 1v1.5M7 11.5V13M13 7h-1.5M2.5 7H1M11.24 2.76l-1.06 1.06M3.82 10.18l-1.06 1.06M11.24 11.24l-1.06-1.06M3.82 3.82L2.76 2.76" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  Moon: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <path d="M12 8.5A5 5 0 016.5 2a5 5 0 105.5 6.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  ),
  Plug: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <path d="M5 1v3M9 1v3M3.5 4h7v3a3.5 3.5 0 11-7 0V4zM7 10.5V13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Bolt: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <path d="M7.5 1L3 8h3.5L6 13l5-7H7.5L7.5 1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  ),
  Route: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <circle cx="3" cy="11" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="11" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M3 9.5V7a3 3 0 013-3h2a3 3 0 003-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  Mic: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <rect x="5.5" y="1.5" width="3" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M3 7a4 4 0 008 0M7 11v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  Sparkle: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <path d="M7 1l1.2 4.8L13 7l-4.8 1.2L7 13l-1.2-4.8L1 7l4.8-1.2L7 1z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
    </svg>
  ),
  Battery: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <rect x="1.5" y="4" width="9" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="3" y="5.5" width="5" height="3" rx="0.5" fill="currentColor"/>
      <path d="M11.5 6v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  Home: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <path d="M2 6.5L7 2l5 4.5V12a1 1 0 01-1 1H3a1 1 0 01-1-1V6.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  ),
  Wallet: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <rect x="1.5" y="3" width="11" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M10 7h2M1.5 5h11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
};

/* ---------- Logo mark ---------- */
function LogoMark({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3L21 21H3L12 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M12 11L17 21H7l5-10z" fill="currentColor" opacity="0.85"/>
    </svg>
  );
}

/* expose */
Object.assign(window, {
  Reveal, useScrollProgress, useScrollY, Icon, LogoMark,
});
