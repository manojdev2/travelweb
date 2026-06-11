/* APP — Alto.Travel composition + theme */

function App() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("alto-travel-theme") || "light"; } catch { return "light"; }
  });
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("alto-travel-theme", theme); } catch {}
  }, [theme]);
  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <React.Fragment>
      <Loader/>
      <BackgroundFX/>
      <CursorFollow/>
      <Nav theme={theme} onToggleTheme={toggle}/>
      <HeroScene/>
      <TrustSection/>
      <FeaturesSection/>
      <HyperlocalSection/>
      <ExperiencesSection/>
      <MarqueeSection/>
      <TestimonialsSection/>
      <PricingSection/>
      <FAQSection/>
      <CTASection/>
      <Footer/>
      <ScrollTop/>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
