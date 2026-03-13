import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Menu from "./components/Menu";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import "./styles/global.css";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className={`app theme-${theme}`}>
      <Cursor />
      <Navbar theme={theme} setTheme={setTheme} activeSection={activeSection} setActiveSection={setActiveSection} />
      <main>
        <section id="home"><Hero /></section>
        <section id="about"><About /></section>
        <section id="menu"><Menu /></section>
        <section id="gallery"><Gallery /></section>
        <section id="contact"><Contact /></section>
      </main>
      <Footer />
    </div>
  );
}
