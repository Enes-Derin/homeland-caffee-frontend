import { useRef, useEffect, useState } from "react";
import "./About.css";

function useInView(threshold = 0.2) {
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

function Counter({ to, suffix = "" }) {
  const [val, setVal] = useState(0);
  const [ref, inView] = useInView(0.5);
  useEffect(() => {
    if (!inView) return;
    let start = null;
    const dur = 1800;
    const step = (ts) => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / dur, 1);
      setVal(Math.floor(prog * to));
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function TiltCard({ children, className = "" }) {
  const cardRef = useRef(null);
  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = ((e.clientX - left) / width  - 0.5) * 2;
    const y = ((e.clientY - top)  / height - 0.5) * 2;
    el.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg) scale(1.02)`;
  };
  const onLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "";
  };
  return (
    <div ref={cardRef} className={`tilt-card ${className}`} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}

export default function About() {
  const [ref, inView] = useInView();

  const pillars = [
    { icon: "◇", title: "Kalite",     desc: "Özenle seçilmiş çekirdekler, her fincan için özel kavurma." },
    { icon: "◈", title: "Atmosfer",   desc: "Ev sıcaklığı ile şehir enerjisinin buluştuğu nokta." },
    { icon: "◉", title: "Topluluk",   desc: "Maç geceleri, etkinlikler ve paylaşılan anlar için buradayız." },
  ];

  return (
    <div className="about" ref={ref}>
      <div className="about-bg-text display">Homeland</div>

      <div className="container">
        <div className={`about-grid ${inView ? "in" : ""}`}>
          {/* Left */}
          <div className="about-left">
            <div className="section-label" style={{ marginBottom: "20px" }}>
              <span className="rule" />
              <span className="mono-label">Hikâyemiz</span>
            </div>

            <h2 className="about-title display">
              Sıradan bir<br />
              <em>kahve değil.</em>
            </h2>

            <p className="about-body">
              Barbaros'un kalbinde, dar sokaklardan gelen yorgunluğa mola veren bir sığınak. Homeland Coffee, 
              yalnızca içecek sunmak için değil — anlık bağlantılar, samimi sohbetler ve unutulmaz deneyimler 
              için var oldu.
            </p>
            <p className="about-body">
              Her malzeme, her detay, her dakika — sizin için düşünüldü.
            </p>

            <div className="about-counters">
              {[
                { label: "Mutlu Misafir", to: 3200, suffix: "+" },
                { label: "Özel Tarif",   to: 54,   suffix: "" },
                { label: "Maç Gecesi",   to: 180,  suffix: "+" },
              ].map(({ label, to, suffix }) => (
                <div key={label} className="about-counter">
                  <span className="counter-num display">
                    <Counter to={to} suffix={suffix} />
                  </span>
                  <span className="counter-lbl">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="about-right">
            <TiltCard className="about-visual">
              <div className="av-inner">
                {/* Geometric coffee art */}
                <svg viewBox="0 0 320 380" className="about-svg">
                  <defs>
                    <radialGradient id="goldGrd" cx="50%" cy="50%" r="50%">
                      <stop offset="0%"   stopColor="var(--gold)" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="var(--gold)" stopOpacity="0"    />
                    </radialGradient>
                  </defs>
                  <ellipse cx="160" cy="190" rx="130" ry="130" fill="url(#goldGrd)" />
                  <circle cx="160" cy="190" r="110" stroke="var(--gold)" strokeWidth="0.6" fill="none" opacity="0.2" />
                  <circle cx="160" cy="190" r="80"  stroke="var(--gold)" strokeWidth="0.4" fill="none" opacity="0.15"
                    strokeDasharray="4 10" />
                  {/* Cup outline */}
                  <path d="M110 170 Q160 120 210 170 L200 240 Q160 260 120 240 Z"
                    stroke="var(--gold)" strokeWidth="1.2" fill="none" opacity="0.5" />
                  <ellipse cx="160" cy="170" rx="50" ry="9"
                    stroke="var(--gold)" strokeWidth="1" fill="none" opacity="0.4" />
                  <path d="M210 188 Q235 188 235 210 Q235 230 210 230"
                    stroke="var(--gold)" strokeWidth="8" fill="none" opacity="0.35" strokeLinecap="round" />
                  {/* Steam */}
                  {[0, 1, 2].map(i => (
                    <path key={i}
                      d={`M${145 + i * 12} 158 Q${148 + i * 12} 142 ${143 + i * 12} 128 Q${138 + i * 12} 114 ${141 + i * 12} 100`}
                      stroke="var(--text)" strokeWidth="0.8" fill="none" opacity="0.15"
                      style={{ animation: `floatY ${1.8 + i * 0.3}s ${i * 0.4}s ease-in-out infinite` }}
                    />
                  ))}
                  {/* Corner accents */}
                  {[[0, 0], [320, 0], [0, 380], [320, 380]].map(([x, y], i) => (
                    <g key={i} transform={`translate(${x}, ${y})`}>
                      <line
                        x1="0" y1="0"
                        x2={i % 2 === 0 ? 20 : -20} y2="0"
                        stroke="var(--gold)" strokeWidth="0.8" opacity="0.3"
                      />
                      <line
                        x1="0" y1="0"
                        x2="0" y2={i < 2 ? 20 : -20}
                        stroke="var(--gold)" strokeWidth="0.8" opacity="0.3"
                      />
                    </g>
                  ))}
                </svg>

                <div className="av-badge">
                  <span className="display" style={{ fontSize: "2.5rem", fontWeight: 300, color: "var(--gold)" }}>HC</span>
                  <span className="mono-label" style={{ fontSize: "0.45rem", letterSpacing: "5px" }}>Est. 2023</span>
                </div>
              </div>
            </TiltCard>

            {/* Pillar cards */}
            <div className="about-pillars">
              {pillars.map(({ icon, title, desc }, i) => (
                <TiltCard key={title} className="pillar-card" style={{ animationDelay: `${i * 0.1}s` }}>
                  <span className="pillar-icon" style={{ color: "var(--gold)" }}>{icon}</span>
                  <div>
                    <div className="pillar-title">{title}</div>
                    <div className="pillar-desc">{desc}</div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
