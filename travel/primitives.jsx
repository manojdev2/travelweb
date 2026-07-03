/* Shared primitives, hooks, icons */

const { useState, useEffect, useRef, useMemo, useLayoutEffect } = React;

/* ---------- App navigation (treat this landing page + the main_files app as one) ----------
   Every "enter the app" CTA routes here. Locally we hop to the Next.js dev server so the
   two behave as one product in dev; in production we go to the deployed app. */
const ALTO_APP_URL = (() => {
  try {
    const h = window.location.hostname;
    if (h === "localhost" || h === "127.0.0.1") return "http://localhost:3000/";
  } catch {}
  return "https://altotravelai.vercel.app/";
})();
function goToApp(path = "") {
  const base = ALTO_APP_URL.replace(/\/$/, "");
  window.location.href = path ? base + "/" + path.replace(/^\//, "") : base + "/";
}

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

/* ---------- Hook: count-up when in view ---------- */
function useCountUp(target, { duration = 1400, decimals = 0 } = {}) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          const start = performance.now();
          const step = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(target * eased);
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);
  const display = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString();
  return [ref, display];
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
  Bot: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <rect x="2.5" y="4" width="9" height="7" rx="2" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M7 1.5V4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="7" cy="1.5" r="0.9" fill="currentColor"/>
      <circle cx="5" cy="7" r="0.9" fill="currentColor"/>
      <circle cx="9" cy="7" r="0.9" fill="currentColor"/>
      <path d="M5.5 9h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  User: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <circle cx="7" cy="4.5" r="2.3" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M2.5 12c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  Shield: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <path d="M7 1.5l4.5 1.8V7c0 3-2 4.5-4.5 5.5C4.5 11.5 2.5 10 2.5 7V3.3L7 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M5 7l1.4 1.4L9 5.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Pin: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <path d="M7 12.5C9.5 9.5 11 7.5 11 5.3A4 4 0 003 5.3C3 7.5 4.5 9.5 7 12.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      <circle cx="7" cy="5.2" r="1.4" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  ),
  Map: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <path d="M1.5 3.5L5 2l4 1.5L12.5 2v8.5L9 12 5 10.5 1.5 12V3.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M5 2v8.5M9 3.5V12" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  ),
  Heart: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <path d="M7 12C3 9.5 1.5 7.5 1.5 5.3A2.8 2.8 0 017 4a2.8 2.8 0 015.5 1.3C12.5 7.5 11 9.5 7 12z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  ),
  Users: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <circle cx="5" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M1.5 12c0-2 1.5-3.5 3.5-3.5S8.5 10 8.5 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M9.5 3a2 2 0 010 4M10 8.6c1.7.2 3 1.6 3 3.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  Refresh: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <path d="M12 7a5 5 0 11-1.5-3.6M12 1.5V4H9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Search: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M9 9l3.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  Calendar: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <rect x="1.5" y="2.5" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M1.5 5.5h11M4.5 1v2.5M9.5 1v2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  Play: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <path d="M5 3.5l5 3.5-5 3.5v-7z" fill="currentColor"/>
    </svg>
  ),
  Star: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" {...p}>
      <path d="M7 1l1.6 3.9 4.2.3-3.2 2.7 1 4.1L7 9.9 3.4 12.1l1-4.1L1.2 5.2l4.2-.3L7 1z"/>
    </svg>
  ),
  Plane: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <path d="M2 8.5l10-5.5-2.5 7.5-2-2.5L2 8.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M5.5 6l-2 5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  Plus: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
};

/* ---------- social glyphs ---------- */
const Social = {
  TikTok: (p) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...p}>
      <path d="M11 2.5c.3 1.8 1.5 3 3.3 3.2v2.1c-1.1 0-2.2-.3-3.1-.9v4.3a4.1 4.1 0 11-4.1-4.1c.2 0 .4 0 .6.05v2.2a1.9 1.9 0 101.3 1.8V2.5H11z" fill="currentColor"/>
    </svg>
  ),
  Instagram: (p) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...p}>
      <rect x="3" y="3" width="12" height="12" rx="3.4" stroke="currentColor" strokeWidth="1.3"/>
      <circle cx="9" cy="9" r="2.8" stroke="currentColor" strokeWidth="1.3"/>
      <circle cx="12.4" cy="5.6" r="0.8" fill="currentColor"/>
    </svg>
  ),
  Threads: (p) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...p}>
      <path d="M12.5 8.6c-.2-3.2-2-4.6-4-4.6-1.7 0-3.4 1-3.4 3.2 0 1.8 1.4 2.8 3 2.8 1.5 0 2.6-.9 2.6-2.3 0-1-.7-1.7-1.6-1.7-.7 0-1.2.4-1.2 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M5 9c0 3.2 1.8 5 4.2 5 2.6 0 4.3-1.9 4.3-5.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  LinkedIn: (p) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...p}>
      <rect x="3" y="3" width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M6 8v4M6 5.6v.01M9 12V8m0 0c0-1 3-1.2 3 1v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
};

/* ---------- Logo mark ---------- */
function LogoMark({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 12.5L21 4l-6 16-3.5-6L3 12.5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
      <path d="M11.5 14L21 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  );
}

/* Brand wordmark — theme-aware two-tone "Alto.travel" built from the logo
   artwork. Body letters take var(--ink) (auto black/white per theme);
   the "lt" accent takes var(--mint) to match the site palette. */
function Wordmark({ h = 18, className = "" }) {
  return (
    <span
      className={"wordmark " + className}
      style={{ ['--wm-h']: h + "px" }}
      role="img"
      aria-label="Alto.travel"
    >
      <span className="wordmark__layer wordmark__ink" aria-hidden="true"/>
      <span className="wordmark__layer wordmark__accent" aria-hidden="true"/>
    </span>
  );
}

/* expose */
Object.assign(window, {
  Reveal, useScrollProgress, useScrollY, useCountUp, Icon, Social, LogoMark, Wordmark,
});
