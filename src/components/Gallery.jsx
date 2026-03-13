import { useRef, useState, useEffect } from "react";
import "./Gallery.css";

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// Her kart kendi rengi ve SVG ile — daha fazla kart eklendi
const galleryItems = [
  {
    title: "Espresso Anı",
    sub: "Her sabah ritüeli",
    size: "tall",
    svg: (
      <svg viewBox="0 0 200 200" fill="none" className="g-svg">
        <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.6" opacity="0.15" />
        <ellipse cx="100" cy="92" rx="46" ry="7" stroke="currentColor" strokeWidth="1" opacity="0.45" />
        <path d="M58 92 Q100 62 142 92 L134 142 Q100 158 66 142 Z" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.55" />
        <path d="M142 108 Q162 108 162 126 Q162 144 142 144" stroke="currentColor" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.35" />
        <ellipse cx="100" cy="158" rx="54" ry="8" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.25" />
        {[0, 1, 2].map(i => <path key={i} d={`M${86 + i * 12} 82 Q${89 + i * 12} 66 ${85 + i * 12} 54`} stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.2" />)}
      </svg>
    ),
  },
  {
    title: "Maç Gecesi",
    sub: "Her maç bir şenlik",
    size: "wide",
    svg: (
      <svg viewBox="0 0 200 200" fill="none" className="g-svg">
        <rect x="28" y="48" width="144" height="104" rx="4" stroke="currentColor" strokeWidth="1" opacity="0.35" />
        <rect x="36" y="56" width="128" height="88" fill="currentColor" opacity="0.06" />
        <line x1="100" y1="56" x2="100" y2="144" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
        <circle cx="100" cy="100" r="20" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
        <circle cx="100" cy="100" r="5" fill="currentColor" opacity="0.35" />
        {[60, 78, 122, 140].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy="164" r="5" fill="currentColor" opacity="0.2" />
            <line x1={x} y1="169" x2={x} y2="184" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.15" />
          </g>
        ))}
      </svg>
    ),
  },
  {
    title: "Latte Art",
    sub: "Ustalıkla hazırlanan",
    size: "normal",
    svg: (
      <svg viewBox="0 0 200 200" fill="none" className="g-svg">
        <circle cx="100" cy="100" r="66" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
        <circle cx="100" cy="100" r="50" fill="currentColor" opacity="0.05" />
        <path d="M100 58 Q116 80 100 100 Q84 80 100 58Z" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.45" />
        <path d="M100 142 Q116 120 100 100 Q84 120 100 142Z" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.45" />
        <path d="M58 100 Q80 84 100 100 Q80 116 58 100Z" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.45" />
        <path d="M142 100 Q120 84 100 100 Q120 116 142 100Z" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.45" />
        <circle cx="100" cy="100" r="7" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
  {
    title: "Mekan",
    sub: "Sıcak ve davetkar",
    size: "normal",
    svg: (
      <svg viewBox="0 0 200 200" fill="none" className="g-svg">
        <rect x="54" y="28" width="92" height="114" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.35" />
        <line x1="100" y1="28" x2="100" y2="142" stroke="currentColor" strokeWidth="0.6" opacity="0.2" />
        <line x1="54" y1="85" x2="146" y2="85" stroke="currentColor" strokeWidth="0.6" opacity="0.2" />
        {[0, 1, 2, 3].map(i => <line key={i} x1={74 + i * 16} y1="30" x2={64 + i * 21} y2="142" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />)}
        <ellipse cx="100" cy="170" rx="52" ry="9" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.25" />
        <line x1="64" y1="170" x2="64" y2="196" stroke="currentColor" strokeWidth="1" opacity="0.18" />
        <line x1="136" y1="170" x2="136" y2="196" stroke="currentColor" strokeWidth="1" opacity="0.18" />
        <circle cx="100" cy="164" r="8" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.35" />
      </svg>
    ),
  },
  {
    title: "Cold Brew",
    sub: "18 saat demleme",
    size: "normal",
    svg: (
      <svg viewBox="0 0 200 200" fill="none" className="g-svg">
        <path d="M68 58 L132 58 L126 172 Q100 182 74 172 Z" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.45" />
        <rect x="63" y="48" width="74" height="14" rx="2" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.35" />
        <path d="M71 132 L72 172 Q100 182 128 172 L129 132 Z" fill="currentColor" opacity="0.08" />
        {[[84, 118], [106, 113], [88, 136]].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="19" height="17" rx="2" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.3" transform={`rotate(${i * 9},${x + 9},${y + 8})`} />
        ))}
        <line x1="116" y1="46" x2="116" y2="174" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
      </svg>
    ),
  },
  {
    title: "V60 Seremonisi",
    sub: "Pour-over ustalığı",
    size: "normal",
    svg: (
      <svg viewBox="0 0 200 200" fill="none" className="g-svg">
        {/* V60 dripper */}
        <path d="M65 55 L135 55 L108 130 Q100 138 92 130 Z" stroke="currentColor" strokeWidth="1.1" fill="none" opacity="0.45" />
        {/* Ribs */}
        {[0, 1, 2].map(i => <line key={i} x1={88 + i * 12} y1="60" x2={96 + i * 8} y2="120" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />)}
        {/* Stand */}
        <rect x="80" y="130" width="40" height="8" rx="1" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.3" />
        <line x1="88" y1="138" x2="82" y2="158" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        <line x1="112" y1="138" x2="118" y2="158" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        {/* Mug */}
        <ellipse cx="100" cy="168" rx="22" ry="6" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.25" />
        <line x1="78" y1="168" x2="78" y2="185" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
        <line x1="122" y1="168" x2="122" y2="185" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
        {/* Pour */}
        <path d="M100 42 Q101 48 100 55" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      </svg>
    ),
  },
  {
    title: "Sabah Croissant",
    sub: "Taze fırından",
    size: "normal",
    svg: (
      <svg viewBox="0 0 200 200" fill="none" className="g-svg">
        <path d="M55 120 Q70 80 100 75 Q130 80 145 120 Q130 140 100 145 Q70 140 55 120Z" stroke="currentColor" strokeWidth="1.1" fill="none" opacity="0.45" />
        <path d="M62 110 Q80 88 100 86 Q120 88 138 110" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.25" />
        <path d="M66 125 Q82 108 100 106 Q118 108 134 125" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.2" />
        <circle cx="100" cy="165" r="24" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.2" />
        <ellipse cx="100" cy="165" rx="24" ry="6" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.2" />
      </svg>
    ),
  },
  {
    title: "Gece Yarısı",
    sub: "İmza karışım",
    size: "tall",
    svg: (
      <svg viewBox="0 0 200 200" fill="none" className="g-svg">
        <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.6" opacity="0.15" />
        {[0, 1, 2, 3, 4, 5].map(i => {
          const a = (i * 60 * Math.PI) / 180;
          return <line key={i} x1="100" y1="100" x2={100 + 55 * Math.cos(a)} y2={100 + 55 * Math.sin(a)} stroke="currentColor" strokeWidth="0.5" opacity="0.12" />;
        })}
        <circle cx="100" cy="100" r="28" fill="currentColor" opacity="0.07" />
        <circle cx="100" cy="100" r="28" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
        {/* Moon */}
        <path d="M90 82 Q108 90 108 100 Q108 110 90 118 Q80 108 80 100 Q80 92 90 82Z" stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.4" />
        {/* Stars */}
        {[[140, 50], [155, 80], [130, 35], [160, 110]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.5" fill="currentColor" opacity="0.3" />
        ))}
      </svg>
    ),
  },
];

// Sayfa başına kaç kart gösterilsin
const PAGE_SIZE = 6;

export default function Gallery() {
  const [ref, inView] = useInView();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [lightbox, setLightbox] = useState(null); // index or null
  const [hovered, setHovered] = useState(null);

  const visibleItems = galleryItems.slice(0, visibleCount);
  const hasMore = visibleCount < galleryItems.length;

  // Escape to close lightbox
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight" && lightbox !== null) setLightbox(i => Math.min(i + 1, galleryItems.length - 1));
      if (e.key === "ArrowLeft" && lightbox !== null) setLightbox(i => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <div className="gallery-section" ref={ref}>
      <div className="container">
        {/* Header */}
        <div className={`gallery-header ${inView ? "in" : ""}`}>
          <div className="section-label" style={{ marginBottom: "20px" }}>
            <span className="rule" />
            <span className="mono-label">Galeri</span>
          </div>
          <div className="gallery-header-row">
            <h2 className="gallery-title display">An<em>larımız</em></h2>
            <p className="gallery-sub">
              Her köşe, her fincan, her gece —<br />bizimle yaşanan deneyimler.
            </p>
          </div>
        </div>

        {/* Masonry grid */}
        <div className={`gallery-masonry ${inView ? "in" : ""}`}>
          {visibleItems.map((item, i) => (
            <div
              key={item.title}
              className={`g-item size-${item.size}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setLightbox(i)}
              style={{ animationDelay: `${(i % PAGE_SIZE) * 0.08}s` }}
            >
              <div className="g-art" style={{ color: "var(--gold)" }}>
                {item.svg}
                <div className="g-shimmer" />
              </div>

              <div className={`g-overlay ${hovered === i ? "show" : ""}`}>
                <div className="g-overlay-inner">
                  <span className="mono-label" style={{ fontSize: "0.46rem", color: "var(--gold)", opacity: 0.8 }}>{item.sub}</span>
                  <h3 className="g-title display">{item.title}</h3>
                  <span className="g-open-btn">
                    <span>Büyüt</span>
                    <span>↗</span>
                  </span>
                </div>
              </div>

              {/* Corner brackets */}
              {["tl", "tr", "bl", "br"].map(pos => (
                <span key={pos} className={`g-corner ${pos} ${hovered === i ? "show" : ""}`} />
              ))}
            </div>
          ))}
        </div>

        {/* Load more */}
        {hasMore && (
          <div className="gallery-more">
            <button className="load-more-btn" onClick={() => setVisibleCount(c => c + PAGE_SIZE)}>
              <span>Daha Fazla Göster</span>
              <span className="lm-count">
                +{Math.min(PAGE_SIZE, galleryItems.length - visibleCount)} görsel
              </span>
            </button>
            <div className="gallery-progress">
              <div
                className="gallery-progress-fill"
                style={{ width: `${(visibleCount / galleryItems.length) * 100}%` }}
              />
            </div>
            <span className="mono-label" style={{ fontSize: "0.46rem" }}>
              {visibleCount} / {galleryItems.length}
            </span>
          </div>
        )}

        {/* Instagram */}
        <div className="gallery-instagram">
          <a href="https://instagram.com/homeland.coffee_" target="_blank" rel="noopener noreferrer" className="insta-link">
            <span className="insta-icon">◎</span>
            <span>@homeland.coffee_</span>
            <span className="insta-arrow">↗</span>
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <div className="lb-backdrop" />
          <div className="lb-panel" onClick={e => e.stopPropagation()}>
            <div className="lb-art" style={{ color: "var(--gold)" }}>
              {galleryItems[lightbox].svg}
            </div>
            <div className="lb-info">
              <span className="mono-label" style={{ fontSize: "0.48rem", color: "var(--gold)" }}>
                {galleryItems[lightbox].sub}
              </span>
              <h3 className="lb-title display">{galleryItems[lightbox].title}</h3>
            </div>
            <button className="lb-close" onClick={() => setLightbox(null)}>✕</button>
            <button
              className="lb-nav prev"
              onClick={() => setLightbox(i => Math.max(i - 1, 0))}
              disabled={lightbox === 0}
            >‹</button>
            <button
              className="lb-nav next"
              onClick={() => setLightbox(i => Math.min(i + 1, galleryItems.length - 1))}
              disabled={lightbox === galleryItems.length - 1}
            >›</button>
            <div className="lb-counter mono-label" style={{ fontSize: "0.46rem" }}>
              {lightbox + 1} / {galleryItems.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}