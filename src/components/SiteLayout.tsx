"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

interface SiteLayoutProps {
  children: React.ReactNode;
  /** Aktuell aktive Seite für Nav-Highlight, z.B. "kontakt" oder "impressum" */
  activePage?: string;
}

type Theme = "system" | "light" | "dark";

export default function SiteLayout({ children, activePage }: SiteLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme;
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, []);

  const changeTheme = (t: Theme) => {
    setTheme(t);
    if (t === "system") {
      localStorage.removeItem("theme");
      document.documentElement.removeAttribute("data-theme");
    } else {
      localStorage.setItem("theme", t);
      document.documentElement.setAttribute("data-theme", t);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { href: "/", label: "Startseite", key: "startseite" },
    { href: "/#leistungen", label: "Leistungen", key: "leistungen" },
    { href: "/kontakt", label: "Kontakt", key: "kontakt" },
    { href: "/impressum", label: "Impressum", key: "impressum" },
    { href: "/datenschutz", label: "Datenschutz", key: "datenschutz" },
  ];

  return (
    <>
      {/* ── NAVIGATION ── */}
      {/* ── FLOATING NAVIGATION ── */}
      <div 
        className={isScrolled ? "nav-scrolled" : ""}
        style={{
        position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000,
        pointerEvents: "none",
        transform: isScrolled ? "translateY(-1.5rem)" : "translateY(0)",
        transition: "transform 0.8s ease-in-out"
      }}>
        <Link href="/" style={{ pointerEvents: "auto", position: "absolute", top: "1.5rem", left: "1.5rem", display: "block" }}>
          <img src="/Logo_back.png" alt="HM-Profi Logo" className="logo-light nav-logo" />
          <img src="/Logo_Back_dark.png" alt="HM-Profi Logo" className="logo-dark nav-logo" />
        </Link>

        <nav className="desktop-nav">
          {navLinks.map(({ href, label, key }) => (
            <Link key={key} href={href} style={{
              fontWeight: 700,
              color: "var(--foreground)",
              textDecoration: "none",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              position: "relative",
              padding: "0.25rem 0",
              opacity: activePage === key ? 1 : 0.7,
              fontSize: "1rem",
            }}>
              {label}
              {activePage === key && (
                <span style={{ 
                  position: "absolute", 
                  bottom: "-4px", 
                  left: "0", 
                  width: "100%", 
                  height: "3px", 
                  background: "var(--primary-gradient)", 
                  borderRadius: "99px" 
                }} />
              )}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Menü öffnen"
          style={{ pointerEvents: "auto", position: "absolute", top: "1.5rem", right: "1.5rem", backgroundColor: "var(--surface)", border: "1px solid var(--border)", cursor: "pointer", padding: "1rem", display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-end", borderRadius: "50%", boxShadow: "0 8px 24px rgba(0,0,0,0.15)", outline: "none" }}
        >
          <span style={{ display: "block", width: "36px", height: "4px", backgroundColor: "var(--foreground)", borderRadius: "2px" }} />
          <span style={{ display: "block", width: "36px", height: "4px", backgroundColor: "var(--foreground)", borderRadius: "2px" }} />
          <span style={{ display: "block", width: "28px", height: "4px", backgroundColor: "var(--foreground)", borderRadius: "2px" }} />
        </button>
      </div>

      {/* ── SLIDE-IN SIDEBAR ── */}
      <div
        onClick={() => setMenuOpen(false)}
        style={{
          position: "fixed", inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 2000,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.35s ease",
        }}
      />
      <aside style={{
        position: "fixed", top: 0, right: 0, height: "100%", width: "min(320px, 85vw)",
        backgroundColor: "var(--sidebar-bg)", zIndex: 2005,
        transform: menuOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: "-4px 0 24px rgba(0,0,0,0.15)",
        display: "flex", flexDirection: "column",
        padding: "2rem 1.5rem", overflowY: "auto",
      }}>
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "2rem" }}>
          <button onClick={() => setMenuOpen(false)} aria-label="Menü schließen"
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.8rem", color: "var(--foreground)", lineHeight: 1, padding: "0.25rem" }}>
            ✕
          </button>
        </div>

        {/* THEME SWITCHER */}
        <div style={{ display: "flex", backgroundColor: "var(--background)", borderRadius: "999px", padding: "0.35rem", marginBottom: "2rem", border: "1px solid var(--border)" }}>
          <button onClick={() => changeTheme("light")} style={{ flex: 1, padding: "0.5rem", borderRadius: "999px", border: "none", background: theme === "light" ? "var(--surface)" : "transparent", color: "var(--foreground)", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem", boxShadow: theme === "light" ? "var(--shadow-sm)" : "none", transition: "all 0.2s" }}>☀️ Hell</button>
          <button onClick={() => changeTheme("system")} style={{ flex: 1, padding: "0.5rem", borderRadius: "999px", border: "none", background: theme === "system" ? "var(--surface)" : "transparent", color: "var(--foreground)", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem", boxShadow: theme === "system" ? "var(--shadow-sm)" : "none", transition: "all 0.2s" }}>💻 System</button>
          <button onClick={() => changeTheme("dark")} style={{ flex: 1, padding: "0.5rem", borderRadius: "999px", border: "none", background: theme === "dark" ? "var(--surface)" : "transparent", color: "var(--foreground)", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem", boxShadow: theme === "dark" ? "var(--shadow-sm)" : "none", transition: "all 0.2s" }}>🌙 Dunkel</button>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem", margin: "auto 0" }}>
          {[
            { href: "/", label: "🏠 Startseite" },
            { href: "/#leistungen", label: "🔧 Leistungen" },
            { href: "/kontakt", label: "📞 Kontakt" },
            { href: "/impressum", label: "📄 Impressum" },
            { href: "/datenschutz", label: "🔒 Datenschutz" },
          ].map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)} className="sidebar-link"
              style={{ display: "block", padding: "1rem 1.25rem", borderRadius: "0.75rem", fontWeight: 600, fontSize: "1.05rem", color: "var(--foreground)", textDecoration: "none", transition: "background 0.2s, color 0.2s" }}>
              {label}
            </Link>
          ))}
        </nav>

        <div style={{ marginTop: "auto", paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
          <Link href="/kontakt" onClick={() => setMenuOpen(false)}
            style={{ display: "block", textAlign: "center", padding: "0.9rem", borderRadius: "9999px", background: "var(--primary-gradient)", color: "white", fontWeight: 700, textDecoration: "none" }}>
            Jetzt Angebot anfragen
          </Link>
        </div>
      </aside>

      {/* ── SEITENINHALT ── */}
      <main style={{ overflow: "hidden" }}>
        {/* ── HEADER SPACING ── */}
        <div style={{ height: "170px", width: "100%" }} />
        {children}
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: "var(--secondary)", color: "white", padding: "2.5rem 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", textAlign: "center" }}>
          <div className="text-gradient-light" style={{ fontWeight: 900, fontSize: "1.2rem" }}>HM-Profi</div>
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/impressum" style={{ color: "rgba(255,255,255,0.7)", fontWeight: 500, fontSize: "0.9rem" }}>Impressum</Link>
            <Link href="/datenschutz" style={{ color: "rgba(255,255,255,0.7)", fontWeight: 500, fontSize: "0.9rem" }}>Datenschutz</Link>
            <Link href="/kontakt" style={{ color: "rgba(255,255,255,0.7)", fontWeight: 500, fontSize: "0.9rem" }}>Kontakt</Link>
          </div>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", margin: 0 }}>
            © {new Date().getFullYear()} HM-Profi. Alle Rechte vorbehalten.
          </p>
        </div>
      </footer>
    </>
  );
}
