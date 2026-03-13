import "./Footer.css";

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="footer">
      <div className="footer-top" />

      <div className="container">
        <div className="footer-main">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <svg viewBox="0 0 36 36" fill="none" width="32" height="32">
                <circle cx="18" cy="18" r="17" stroke="currentColor" strokeWidth="0.8" />
                <path d="M10 24 Q18 10 26 24" stroke="currentColor" strokeWidth="1.2" fill="none" />
                <circle cx="18" cy="21" r="2.5" fill="currentColor" opacity="0.8" />
              </svg>
              <div>
                <div className="footer-logo-name">Homeland Coffee</div>
                <div className="footer-logo-tag">Barbaros · Bağcılar</div>
              </div>
            </div>
            <p className="footer-tagline">
              Her yudumda bir hikâye.<br />
              Şehrin kalbinde evinizin sıcaklığı.
            </p>
          </div>

          {/* Nav */}
          <div className="footer-nav">
            <div className="footer-col">
              <div className="footer-col-title">Sayfalar</div>
              {["home","about","menu","gallery","contact"].map(id => (
                <button key={id} className="footer-link" onClick={() => scrollTo(id)}>
                  {{home:"Ana Sayfa", about:"Hakkımızda", menu:"Menü", gallery:"Galeri", contact:"İletişim"}[id]}
                </button>
              ))}
            </div>
            <div className="footer-col">
              <div className="footer-col-title">İletişim</div>
              <a href="tel:+905057826864" className="footer-link">0505 782 68 64</a>
              <a href="https://instagram.com/homeland.coffee_" target="_blank" rel="noopener noreferrer" className="footer-link">@homeland.coffee_</a>
              <span className="footer-link">09:00 — 23:00</span>
              <span className="footer-link" style={{ fontSize: "0.72rem" }}>Barbaros, 19/2 Sokak No:4</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2024 Homeland Coffee · Tüm hakları saklıdır.</span>
          <span>Bağcılar, İstanbul</span>
        </div>
      </div>
    </footer>
  );
}
