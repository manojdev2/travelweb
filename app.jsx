/* APP — root composition + theme management */

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("alto-theme") || "dark";
    } catch { return "dark"; }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("alto-theme", theme); } catch {}
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <React.Fragment>
      <BackgroundFX/>
      <CursorFollow/>
      <Nav theme={theme} onToggleTheme={toggle}/>
      <HeroScene/>
      <StoriesSection/>
      <CompanionSection/>
      <NetworkSection/>
      <EcosystemSection/>
      <EmotionalSection/>
      <PhoneSection/>
      <FutureSection/>
      <CTASection/>
      <Footer/>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
