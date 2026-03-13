import { useEffect, useRef, useState } from "react";
import "./Hero.css";

function CoffeeCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let t = 0;

    function resize() {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    }
    resize();
    window.addEventListener("resize", resize);

    const isDark = () => document.documentElement.getAttribute("data-theme") !== "light";

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.5 + 0.4,
      speed: Math.random() * 0.0003 + 0.00015,
      angle: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.0002,
      opacity: Math.random() * 0.35 + 0.1,
    }));

    const steamLines = Array.from({ length: 5 }, (_, i) => ({
      x: 0.42 + i * 0.04,
      phase: (i * Math.PI) / 2.5,
      amp: 0.012 + i * 0.003,
      speed: 0.0008 + i * 0.0002,
    }));

    function draw() {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);
      t += 0.016;

      const dark = isDark();
      const gold = dark ? "201,169,110" : "160,120,48";
      const textCol = dark ? "240,232,218" : "26,22,18";

      // Background radial glow
      const grd = ctx.createRadialGradient(W * 0.5, H * 0.55, 0, W * 0.5, H * 0.55, H * 0.6);
      grd.addColorStop(0, `rgba(${gold}, ${dark ? 0.06 : 0.05})`);
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      // Orbiting rings
      for (let ring = 1; ring <= 3; ring++) {
        const radius = (80 + ring * 55) * (W / 800);
        const cx = W * 0.5, cy = H * 0.52;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${gold}, ${0.06 - ring * 0.01})`;
        ctx.lineWidth = 0.8;
        ctx.setLineDash([3, 12]);
        ctx.lineDashOffset = -t * (ring % 2 === 0 ? 20 : -15);
        ctx.stroke();
        ctx.setLineDash([]);

        const dotAngle = t * 0.3 * (ring % 2 === 0 ? -1 : 1) + ring;
        const dx = cx + Math.cos(dotAngle) * radius;
        const dy = cy + Math.sin(dotAngle) * radius;
        ctx.beginPath();
        ctx.arc(dx, dy, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${gold}, 0.5)`;
        ctx.fill();
      }

      const cx = W * 0.5, cy = H * 0.52;
      const scale = Math.min(W, H) * 0.0012;

      ctx.save();
      ctx.translate(cx, cy);

      // Cup body
      const cup = new Path2D();
      cup.moveTo(-55 * scale, -30 * scale);
      cup.bezierCurveTo(-55 * scale, 20 * scale, -40 * scale, 55 * scale, 0, 60 * scale);
      cup.bezierCurveTo(40 * scale, 55 * scale, 55 * scale, 20 * scale, 55 * scale, -30 * scale);
      cup.closePath();
      ctx.fillStyle = `rgba(${gold}, ${dark ? 0.07 : 0.06})`;
      ctx.fill(cup);
      ctx.strokeStyle = `rgba(${gold}, 0.22)`;
      ctx.lineWidth = 1;
      ctx.stroke(cup);

      // Saucer
      ctx.beginPath();
      ctx.ellipse(0, 65 * scale, 70 * scale, 10 * scale, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${gold}, 0.18)`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Handle
      ctx.beginPath();
      ctx.arc(65 * scale, 8 * scale, 22 * scale, -0.8, 0.8);
      ctx.strokeStyle = `rgba(${gold}, 0.2)`;
      ctx.lineWidth = 8 * scale;
      ctx.stroke();

      // Coffee surface
      ctx.beginPath();
      ctx.ellipse(0, -30 * scale, 50 * scale, 8 * scale, 0, 0, Math.PI * 2);
      const surfGrd = ctx.createRadialGradient(0, -30 * scale, 0, 0, -30 * scale, 50 * scale);
      surfGrd.addColorStop(0, `rgba(${gold}, 0.25)`);
      surfGrd.addColorStop(1, `rgba(${gold}, 0.04)`);
      ctx.fillStyle = surfGrd;
      ctx.fill();

      ctx.restore();

      // Steam — frac döngü içinde tanımlanıp dışarıda kullanılıyordu, düzeltildi
      steamLines.forEach((s) => {
        const sx = W * s.x;
        const baseY = cy - 38 * scale;
        ctx.beginPath();
        let lastFrac = 0;
        for (let step = 0; step < 40; step++) {
          lastFrac = step / 39;
          const x = sx + Math.sin(lastFrac * Math.PI * 2 + s.phase + t * s.speed * 60) * W * s.amp;
          const y = baseY - lastFrac * 70 * scale;
          if (step === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${textCol}, ${0.06 - lastFrac * 0.04})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Floating particles
      particles.forEach((p) => {
        p.angle += p.drift;
        p.y -= p.speed;
        if (p.y < 0) p.y = 1;
        const x = p.x * W + Math.sin(p.angle) * 20;
        const y = p.y * H;
        ctx.beginPath();
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${gold}, ${p.opacity})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" />;
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth: W, innerHeight: H } = window;
      const x = ((clientX / W) - 0.5) * 20;
      const y = ((clientY / H) - 0.5) * 10;
      heroRef.current.style.setProperty("--mx", `${x}deg`);
      heroRef.current.style.setProperty("--my", `${-y}deg`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const scrollToMenu = () => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  const scrollToContact = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div ref={heroRef} className={`hero ${loaded ? "loaded" : ""}`}>
      <CoffeeCanvas />

      <div className="hero-content container">
        <div className="hero-text" style={{ marginTop: 100 }}>

          <h1 className="hero-title display">
            <span className="line-1">Homeland</span>
            <span className="line-2"><em>Coffee</em></span>
          </h1>

          <p className="hero-desc">
            Her yudumda bir hikâye. Evinizin sıcaklığını,<br />
            şehrin kalbinde bulun.
          </p>

          <div className="hero-cta">
            <button className="btn-primary" onClick={scrollToMenu}>Menüyü Keşfet</button>
            <button className="btn-ghost" onClick={scrollToContact}>Rezervasyon</button>
          </div>

          <div className="hero-stats">
            {[
              { n: "09–23", l: "Açık Her Gün" },
              { n: "50+", l: "Özel Lezzet" },
              { n: "1", l: "Eşsiz Mekan" },
            ].map(({ n, l }) => (
              <div key={l} className="stat">
                <span className="stat-num display">{n}</span>
                <span className="stat-lbl">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-line">
          <div className="scroll-dot" />
        </div>
        <span className="mono-label" style={{ fontSize: "0.48rem" }}>Kaydır</span>
      </div>
    </div>
  );
}