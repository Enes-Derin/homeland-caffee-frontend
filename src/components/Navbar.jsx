import { useState, useEffect } from "react";
import "./Navbar.css";

const navLinks = [
  { id: "home",    label: "Ana Sayfa" },
  { id: "about",   label: "Hakkımızda" },
  { id: "menu",    label: "Menü" },
  { id: "gallery", label: "Galeri" },
  { id: "contact", label: "İletişim" },
];

export default function Navbar({ theme, setTheme, activeSection, setActiveSection }) {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.4 }
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [setActiveSection]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""} ${menuOpen ? "menu-open" : ""}`}>
        <div className="nav-inner">
          {/* Logo */}
          <button className="nav-logo" onClick={() => scrollTo("home")}>
            <div className="logo-emblem">
              <svg viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="17" stroke="currentColor" strokeWidth="0.8" />
                <path d="M10 24 Q18 10 26 24" stroke="currentColor" strokeWidth="1.2" fill="none" />
                <circle cx="18" cy="21" r="2.5" fill="currentColor" opacity="0.8" />
              </svg>
            </div>
            <div className="logo-text">
              <span className="logo-main">Homeland</span>
              <span className="logo-sub">Coffee</span>
            </div>
          </button>

          {/* Links */}
          <ul className="nav-links">
            {navLinks.map(({ id, label }) => (
              <li key={id}>
                <button
                  className={`nav-link ${activeSection === id ? "active" : ""}`}
                  onClick={() => scrollTo(id)}
                >
                  {label}
                  <span className="link-line" />
                </button>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="nav-controls">
            <button
              className="theme-toggle"
              onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
              aria-label="Tema değiştir"
            >
              <div className={`toggle-track ${theme === "light" ? "light" : ""}`}>
                <div className="toggle-thumb">
                  {theme === "dark"
                    ? <span className="icon">☽</span>
                    : <span className="icon">☀</span>}
                </div>
              </div>
            </button>

            <button className={`burger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(m => !m)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <ul>
          {navLinks.map(({ id, label }, i) => (
            <li key={id} style={{ animationDelay: `${i * 0.07}s` }}>
              <button onClick={() => scrollTo(id)} className={activeSection === id ? "active" : ""}>
                <span className="m-num">{String(i + 1).padStart(2, "0")}</span>
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
