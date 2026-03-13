import { useState, useRef, useEffect } from "react";
import "./Contact.css";

const contactInfo = [
  { num: "01", label: "Adres",            value: "Barbaros, 19/2 Sokak No:4",    sub: "34200 Bağcılar / İstanbul" },
  { num: "02", label: "Telefon",          value: "0505 782 68 64",               sub: "Hemen arayabilirsiniz",     href: "tel:+905057826864" },
  { num: "03", label: "Instagram",        value: "@homeland.coffee_",            sub: "6 gönderi · 120 takipçi",   href: "https://instagram.com/homeland.coffee_" },
  { num: "04", label: "Çalışma Saatleri", value: "09:00 — 23:00",               sub: "Her gün açık" },
];

function useInView(threshold = 0.15) {
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

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [ref, inView] = useInView();
  const [focused, setFocused] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1800);
  };

  const reset = () => { setSent(false); setForm({ name: "", phone: "", subject: "", message: "" }); };

  return (
    <div className="contact-section" ref={ref}>
      <div className="contact-deco-1" />
      <div className="contact-deco-2" />

      <div className="container">
        {/* Header */}
        <div className={`contact-header ${inView ? "in" : ""}`}>
          <div className="section-label" style={{ justifyContent: "center", marginBottom: "20px" }}>
            <span className="rule" />
            <span className="mono-label">Ulaşın</span>
            <span className="rule" />
          </div>
          <h2 className="contact-title display">
            İleti<em>şim</em>
          </h2>
          <p className="contact-subtitle">
            Rezervasyon, özel etkinlik veya maç gecesi için bize ulaşın
          </p>
        </div>

        <div className={`contact-grid ${inView ? "in" : ""}`}>
          {/* Left — Info */}
          <div className="contact-left">
            <div className="info-cards">
              {contactInfo.map((item) => (
                <a
                  key={item.num}
                  href={item.href || undefined}
                  className={`info-card ${item.href ? "clickable" : ""}`}
                  target={item.href?.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                >
                  <span className="info-num">{item.num}</span>
                  <div className="info-content">
                    <div className="info-label">{item.label}</div>
                    <div className="info-value display">{item.value}</div>
                    <div className="info-sub">{item.sub}</div>
                  </div>
                  {item.href && <span className="info-arrow">↗</span>}
                </a>
              ))}
            </div>

            {/* Map */}
            <div className="map-wrap">
              <div className="map-label">
                <span className="mono-label" style={{ fontSize: "0.48rem" }}>Konum</span>
              </div>
              <iframe
                title="Homeland Coffee Konum"
                src="https://maps.google.com/maps?q=Barbaros+19+sokak+No+4+Bağcılar+Istanbul&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="220"
                style={{ border: 0, display: "block" }}
                loading="lazy"
              />
            </div>
          </div>

          {/* Right — Form */}
          <div className="contact-right">
            {sent ? (
              <div className="sent-state">
                <div className="sent-icon">
                  <svg viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="23" stroke="var(--gold)" strokeWidth="0.8" />
                    <path d="M14 24 L21 31 L34 17" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="sent-title display">Mesajınız Ulaştı</h3>
                <p className="sent-body">
                  En kısa sürede geri dönüş yapacağız.<br />
                  Homeland Coffee'yi tercih ettiğiniz için teşekkürler.
                </p>
                <button className="btn-ghost" onClick={reset}>Yeni Mesaj</button>
              </div>
            ) : (
              <>
                <div className="form-header">
                  <h3 className="display" style={{ fontSize: "2rem", fontWeight: 300, color: "var(--text)", marginBottom: "6px" }}>
                    Mesaj Gönderin
                  </h3>
                  <p className="mono-label">Tüm sorularınız için buradayız</p>
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className={`field ${focused === "name" ? "focused" : ""}`}>
                      <label className="field-label">Ad Soyad</label>
                      <input
                        name="name" value={form.name} onChange={handleChange} required
                        placeholder="Ahmet Yılmaz"
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                      />
                      <div className="field-line" />
                    </div>
                    <div className={`field ${focused === "phone" ? "focused" : ""}`}>
                      <label className="field-label">Telefon</label>
                      <input
                        name="phone" value={form.phone} onChange={handleChange} required
                        placeholder="05xx xxx xx xx"
                        onFocus={() => setFocused("phone")}
                        onBlur={() => setFocused(null)}
                      />
                      <div className="field-line" />
                    </div>
                  </div>

                  <div className={`field ${focused === "subject" ? "focused" : ""}`}>
                    <label className="field-label">Konu</label>
                    <select
                      name="subject" value={form.subject} onChange={handleChange} required
                      onFocus={() => setFocused("subject")}
                      onBlur={() => setFocused(null)}
                    >
                      <option value="">Seçiniz...</option>
                      <option value="rezervasyon">Masa Rezervasyonu</option>
                      <option value="ozel-etkinlik">Özel Etkinlik</option>
                      <option value="mac-gecesi">Maç Gecesi</option>
                      <option value="oneri">Öneri & Şikayet</option>
                      <option value="diger">Diğer</option>
                    </select>
                    <div className="field-line" />
                  </div>

                  <div className={`field ${focused === "message" ? "focused" : ""}`}>
                    <label className="field-label">Mesajınız</label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange} required
                      rows={5} placeholder="Merhaba, rezervasyon yaptırmak istiyorum..."
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                    />
                    <div className="field-line" />
                  </div>

                  <button type="submit" className={`submit-btn ${sending ? "sending" : ""}`} disabled={sending}>
                    {sending ? (
                      <>
                        <span className="spin-ring" />
                        Gönderiliyor
                      </>
                    ) : (
                      <>
                        Gönder
                        <span className="btn-arrow">→</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
