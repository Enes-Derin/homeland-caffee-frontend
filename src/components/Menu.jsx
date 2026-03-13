import { useState, useRef, useEffect, useCallback } from "react";
import "./Menu.css";

/* ─── Veri ──────────────────────────────────────────────── */
const categories = [
  {
    id: "ozel",
    label: "İmza",
    icon: "◉",
    items: [
      {
        name: "Homeland Blend",
        desc: "Etiyopya ve Kolombiya kökenli çekirdeklerin buluşması. Karamel ve fındık notaları.",
        price: "85",
        tag: "İmza",
        img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80",
      },
      {
        name: "Gece Yarısı",
        desc: "Espresso, tuzlu karamel ve vanilya. Geceye en yakışan fincan.",
        price: "80",
        tag: "İmza",
        img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80",
      },
      {
        name: "Sakura Latte",
        desc: "Kiraz çiçeği surubu ve matcha ile espresso. Sezona özel.",
        price: "75",
        tag: "Sezonluk",
        img: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=400&q=80",
      },
      {
        name: "Turunç Kahve",
        desc: "Portakal kabuğu yağı ile zenginleştirilmiş espresso.",
        price: "70",
        tag: "",
        img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&q=80",
      },
      {
        name: "Yaz Toniği",
        desc: "Bergamot, nane ve premium tonik suyu.",
        price: "80",
        tag: "Yeni",
        img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80",
      },
      {
        name: "Kış Karışımı",
        desc: "Tarçın, kakao ve sıcak süt ile ısınan bir fincan.",
        price: "70",
        tag: "Sezonluk",
        img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80",
      },
    ],
  },
  {
    id: "sicak",
    label: "Sıcak",
    icon: "◎",
    items: [
      {
        name: "Espresso",
        desc: "Tek çekimlik, yoğun ve velvetsi. Günün en saf başlangıcı.",
        price: "35",
        tag: "Klasik",
        img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&q=80",
      },
      {
        name: "Latte",
        desc: "Kadifemsi micro-foam süt ile yumuşatılmış çift shot espresso.",
        price: "55",
        tag: "Popüler",
        img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&q=80",
      },
      {
        name: "Cappuccino",
        desc: "Eşit oranda espresso, buharlanmış süt ve yoğun süt köpüğü.",
        price: "50",
        tag: "",
        img: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&q=80",
      },
      {
        name: "Flat White",
        desc: "Ristretto bazlı, ince micro-foam ile Avustralya tarzı.",
        price: "55",
        tag: "",
        img: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=400&q=80",
      },
      {
        name: "V60 Pour Over",
        desc: "Tek orijinli çekirdek, hassas demleme. Her gün farklı.",
        price: "65",
        tag: "Önerilen",
        img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80",
      },
      {
        name: "Türk Kahvesi",
        desc: "Geleneksel tarif, mastik aroması ile servisi özel.",
        price: "40",
        tag: "",
        img: "https://images.unsplash.com/photo-1614180073044-73e77e9e1975?w=400&q=80",
      },
      {
        name: "Cortado",
        desc: "Eşit oranda espresso ve az köpüklü buharlanmış süt.",
        price: "45",
        tag: "",
        img: "https://images.unsplash.com/photo-1593503750649-4e273b38a2c6?w=400&q=80",
      },
      {
        name: "Macchiato",
        desc: "Espresso üzerine hafif süt köpüğü. Minimal, güçlü.",
        price: "45",
        tag: "",
        img: "https://images.unsplash.com/photo-1485808191679-5f86510bd9d4?w=400&q=80",
      },
    ],
  },
  {
    id: "soguk",
    label: "Soğuk",
    icon: "◈",
    items: [
      {
        name: "Cold Brew",
        desc: "18 saat soğuk demleme. Asitsiz, yumuşak ve yoğun.",
        price: "70",
        tag: "Önerilen",
        img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80",
      },
      {
        name: "Iced Latte",
        desc: "Taze çekilmiş espresso, buz ve soğuk süt.",
        price: "60",
        tag: "Popüler",
        img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80",
      },
      {
        name: "Nitro Cold Brew",
        desc: "Nitrojen ile köpüklü cold brew. Krema dokusunda.",
        price: "80",
        tag: "Yeni",
        img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&q=80",
      },
      {
        name: "Iced Matcha",
        desc: "Seremoni kaliteli Japon çayı, buz ve süt.",
        price: "65",
        tag: "",
        img: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=400&q=80",
      },
      {
        name: "Sparkling Tonic",
        desc: "Espresso ve premium tonik suyu. Beklenmedik bir lezzet.",
        price: "75",
        tag: "",
        img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80",
      },
      {
        name: "Frappe",
        desc: "Buz, süt ve espresso karışımı. Klasik ve serinletici.",
        price: "65",
        tag: "",
        img: "https://images.unsplash.com/photo-1589396575653-c09c794ff6a6?w=400&q=80",
      },
    ],
  },
  {
    id: "yiyecek",
    label: "Yiyecek",
    icon: "◇",
    items: [
      {
        name: "Avokado Toast",
        desc: "Ekşi maya ekmeği, taze avokado, haşlanmış yumurta ve kırmızı pul biber.",
        price: "95",
        tag: "Sağlıklı",
        img: "https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=400&q=80",
      },
      {
        name: "Cheesecake",
        desc: "New York tarzı, ev yapımı çilek sosu ile.",
        price: "85",
        tag: "Popüler",
        img: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400&q=80",
      },
      {
        name: "Waffle",
        desc: "Sıcak çıtır waffle, taze meyve ve fıstık ezmesi.",
        price: "90",
        tag: "",
        img: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400&q=80",
      },
      {
        name: "Croissant",
        desc: "Tereyağlı, çıtır ve mis gibi Fransız böreği.",
        price: "45",
        tag: "",
        img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80",
      },
      {
        name: "Granola Bowl",
        desc: "Yoğurt, taze meyve, bal ve granola karışımı.",
        price: "80",
        tag: "Sağlıklı",
        img: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=400&q=80",
      },
      {
        name: "Brownie",
        desc: "Çikolatalı, cevizli, sıcak servis fırın brownie.",
        price: "55",
        tag: "",
        img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80",
      },
      {
        name: "Sandviç",
        desc: "Taze malzeme, pesto sos ve roka ile ekşi maya ekmekte.",
        price: "75",
        tag: "",
        img: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&q=80",
      },
      {
        name: "Pain au Chocolat",
        desc: "İçinde kaliteli bitter çikolata olan çıtır Fransız pastası.",
        price: "50",
        tag: "",
        img: "https://images.unsplash.com/photo-1623334044303-241021148842?w=400&q=80",
      },
    ],
  },
];

/* ─── Hooks ─────────────────────────────────────────────── */
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

/* ─── Bottom Sheet Modal ────────────────────────────────── */
function ItemModal({ item, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-drag-handle" />
        <div className="modal-img-wrap">
          <img src={item.img} alt={item.name} className="modal-img" />
          <div className="modal-img-overlay" />
          {item.tag && <span className="modal-tag">{item.tag}</span>}
        </div>
        <div className="modal-body">
          <div className="modal-top">
            <h3 className="modal-name display">{item.name}</h3>
            <span className="modal-price display">{item.price}₺</span>
          </div>
          <p className="modal-desc">{item.desc}</p>
          <button className="modal-close-btn" onClick={onClose}>Kapat</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Product Card ──────────────────────────────────────── */
function ProductCard({ item, onClick }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="product-card" onClick={() => onClick(item)}>
      <div className="pc-img-wrap">
        {!imgLoaded && <div className="pc-img-skeleton" />}
        <img
          src={item.img}
          alt={item.name}
          className={`pc-img ${imgLoaded ? "loaded" : ""}`}
          onLoad={() => setImgLoaded(true)}
          loading="lazy"
        />
        {item.tag && <span className="pc-tag">{item.tag}</span>}
      </div>
      <div className="pc-info">
        <span className="pc-name display">{item.name}</span>
        <span className="pc-price display">{item.price}₺</span>
      </div>
    </div>
  );
}

/* ─── Category Tab Bar ──────────────────────────────────── */
function TabBar({ categories, activeId, onSelect }) {
  const trackRef = useRef(null);
  const btnRefs = useRef([]);
  const indicRef = useRef(null);

  // Slide indicator
  useEffect(() => {
    const idx = categories.findIndex(c => c.id === activeId);
    const btn = btnRefs.current[idx];
    if (btn && indicRef.current) {
      indicRef.current.style.left = `${btn.offsetLeft}px`;
      indicRef.current.style.width = `${btn.offsetWidth}px`;
    }
    // Scroll tab into view on mobile
    if (btn && trackRef.current) {
      const track = trackRef.current;
      const btnCenter = btn.offsetLeft + btn.offsetWidth / 2;
      track.scrollTo({ left: btnCenter - track.offsetWidth / 2, behavior: "smooth" });
    }
  }, [activeId, categories]);

  return (
    <div className="tab-bar-wrap">
      <div className="tab-bar" ref={trackRef}>
        {categories.map(({ id, label, icon }, i) => (
          <button
            key={id}
            ref={el => btnRefs.current[i] = el}
            className={`tab-pill ${activeId === id ? "active" : ""}`}
            onClick={() => onSelect(id)}
          >
            <span className="tab-icon">{icon}</span>
            <span>{label}</span>
          </button>
        ))}
        <div className="tab-indic" ref={indicRef} />
      </div>
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────── */
export default function Menu() {
  const [activeId, setActiveId] = useState(categories[0].id);
  const [selected, setSelected] = useState(null);
  const [ref, inView] = useInView();

  const activeCat = categories.find(c => c.id === activeId);

  return (
    <div className="menu-section" ref={ref}>
      <div className="menu-bg-line" />

      {/* ── Header ── */}
      <div className="container">
        <div className={`menu-header ${inView ? "in" : ""}`}>
          <div className="section-label" style={{ justifyContent: "center", marginBottom: "20px" }}>
            <span className="rule" />
            <span className="mono-label">Ne içelim?</span>
            <span className="rule" />
          </div>
          <h2 className="menu-title display">Menü<em>müz</em></h2>
          <p className="menu-subtitle">
            Bir ürüne dokunarak detayları görün
          </p>
        </div>
      </div>

      {/* ── Sticky tab bar (outside container for full-bleed scroll) ── */}
      <div className={`tab-bar-outer ${inView ? "in" : ""}`}>
        <TabBar
          categories={categories}
          activeId={activeId}
          onSelect={setActiveId}
        />
      </div>

      {/* ── Product grid ── */}
      <div className="container">
        <div className="product-grid" key={activeId}>
          {activeCat.items.map((item, i) => (
            <ProductCard
              key={item.name}
              item={item}
              onClick={setSelected}
            />
          ))}
        </div>

        <p className="menu-note">
          Tüm içeceklerimiz taze çekilmiş, özenle hazırlanmıştır. Alerjeniniz için personelimize danışın.
        </p>
      </div>

      {/* ── Bottom sheet modal ── */}
      {selected && (
        <ItemModal item={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}