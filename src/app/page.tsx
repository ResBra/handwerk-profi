"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import SiteLayout from "@/components/SiteLayout";

// Hook: bidirektional – "visible" hinzufügen UND entfernen beim Rein-/Rausscrollen
function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.12) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
        } else {
          el.classList.remove("visible"); // wieder ausblenden beim Rausscrollen
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return ref;
}

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    fetch('/api/posts').then(res => res.json()).then(data => {
      if (Array.isArray(data)) setPosts(data);
    }).catch(console.error);
  }, []);

  useEffect(() => {
    fetch('/api/services').then(res => res.json()).then(data => {
      if (Array.isArray(data)) setServices(data);
    }).catch(console.error);
  }, []);

  useEffect(() => {
    if (posts.length <= 1 || !isPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % posts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [posts.length, isPlaying]);

  useEffect(() => {
    if (isPlaying) return;
    const unpauseTimer = setTimeout(() => {
      setIsPlaying(true);
    }, 10000);
    return () => clearTimeout(unpauseTimer);
  }, [isPlaying, currentSlide]);

  const heroRef = useReveal(0.1);
  const btnsRef = useReveal(0.15);
  const svcTitleRef = useReveal(0.15);
  const card1Ref = useReveal(0.1);
  const card2Ref = useReveal(0.1);
  const ctaRef = useReveal(0.15);
  const blogTitleRef = useReveal(0.15);
  const blogListRef = useReveal(0.2);

  return (
    <SiteLayout activePage="startseite">
      {/* ── BANNER ── */}
      <section style={{ width: "100%", lineHeight: 0 }}>
        <img src="/Banner2.png" alt="HM-Profi Banner" className="theme-light-only" style={{ display: "block", width: "100%", height: "auto" }} />
        <img src="/Banner1.png" alt="HM-Profi Banner" className="theme-dark-only" style={{ display: "block", width: "100%", height: "auto" }} />
      </section>

      {/* ── WAVE-TRENNER ── */}
      <div style={{ backgroundColor: "var(--background)", marginTop: "-2px" }}>
        <svg style={{ display: "block", width: "100%", height: "clamp(40px, 6vw, 100px)" }} viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" fill="var(--surface)" />
        </svg>
      </div>

      {/* ── HERO TEXT ── */}
      <section style={{ backgroundColor: "var(--background)", padding: "3rem 0 5rem" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div ref={heroRef} className="reveal" style={{ marginBottom: "2.5rem" }}>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, letterSpacing: "-1px", marginBottom: "1.25rem", color: "var(--foreground)" }}>
              Handwerks-Profi Service<br />
              <span className="text-gradient">mit höchster Präzision</span>
            </h1>
            <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)", color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto" }}>
              Ihr zuverlässiger Partner für professionelle Hausmeisterdienstleistungen und individuellen Möbelbau nach Maß.
            </p>
          </div>
          <div ref={btnsRef} className="reveal" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/kontakt" className="btn btn-primary" style={{ fontSize: "1.05rem", padding: "0.9rem 2.25rem" }}>
              Jetzt Angebot anfordern
            </Link>
            <Link href="#leistungen" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0.9rem 2.25rem", borderRadius: "9999px", fontWeight: 700, border: "2px solid var(--border)", color: "var(--foreground)", fontSize: "1.05rem", textDecoration: "none", transition: "all 0.3s" }}>
              Unsere Leistungen
            </Link>
          </div>
        </div>
      </section>

      {/* ── LEISTUNGEN ── */}
      <section id="leistungen">
        <div style={{ background: "var(--primary-gradient)", padding: "6rem 0", overflow: "hidden", position: "relative" }}>
          <div className="container" style={{ position: "relative", zIndex: 1 }}>

            <div className="services-split-grid">

              {/* Left Side: Info */}
              <div ref={svcTitleRef} className="reveal reveal-left" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, marginBottom: "1.5rem", color: "white", lineHeight: 1.1 }}>
                  Unsere<br />Serviceleistungen
                </h2>
                <p style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.9)", marginBottom: "3rem", lineHeight: 1.7, maxWidth: "450px" }}>
                  Sie beauftragen uns, und wir reinigen, putzen und pflegen für Sie Ihr gewünschtes Objekt, die gewünschte Fläche.
                </p>
                <div>
                  <Link href="/kontakt" style={{ display: "inline-block", backgroundColor: "black", color: "white", padding: "1.2rem 2.5rem", borderRadius: "999px", fontWeight: 800, textDecoration: "none", fontSize: "1rem", transition: "transform 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
                    JETZT ANFRAGEN
                  </Link>
                </div>
              </div>

              {/* Right Side: Masonry Grid */}
              <div>
                <div style={{ display: "flex", gap: "2rem" }}>

                  {/* Column 1 (Even Indexes -> 0, 2, 4) - Staggered down */}
                  <div ref={card1Ref} className="reveal reveal-left" style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2rem", marginTop: services.length > 1 ? "4rem" : "0" }}>
                    {services.filter((_, i) => i % 2 === 0).map((service) => (
                      <div key={service.id} onClick={() => setSelectedService(service)} style={{ backgroundColor: "white", borderRadius: "1rem", overflow: "hidden", cursor: "pointer", boxShadow: "0 10px 30px rgba(0,0,0,0.15)", transition: "transform 0.3s", transform: "scale(1)" }} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
                        <div style={{ position: "relative", width: "100%", backgroundColor: "#e2e8f0" }}>
                          {service.imageUrl && <img src={service.imageUrl} alt={service.title} style={{ width: "100%", height: "auto", display: "block" }} />}
                          {/* Circle Target Icon */}
                          <div style={{ position: "absolute", top: "1rem", left: "1rem", width: "36px", height: "36px", borderRadius: "50%", border: "3px solid rgba(255,255,255,0.8)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
                            <div style={{ width: "14px", height: "14px", backgroundColor: "white", borderRadius: "50%", boxShadow: "0 0 5px rgba(0,0,0,0.3)" }} />
                          </div>
                        </div>
                        <div style={{ padding: "1.25rem 1.5rem" }}>
                          <h3 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 800, color: "black", textTransform: "uppercase", letterSpacing: "0.5px" }}>{service.title}</h3>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Column 2 (Odd Indexes -> 1, 3, 5 - Higher up) */}
                  <div ref={card2Ref} className="reveal reveal-right" style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2rem" }}>
                    {services.filter((_, i) => i % 2 === 1).map((service) => (
                      <div key={service.id} onClick={() => setSelectedService(service)} style={{ backgroundColor: "white", borderRadius: "1rem", overflow: "hidden", cursor: "pointer", boxShadow: "0 10px 30px rgba(0,0,0,0.15)", transition: "transform 0.3s", transform: "scale(1)" }} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
                        <div style={{ position: "relative", width: "100%", backgroundColor: "#e2e8f0" }}>
                          {service.imageUrl && <img src={service.imageUrl} alt={service.title} style={{ width: "100%", height: "auto", display: "block" }} />}
                          {/* Circle Target Icon */}
                          <div style={{ position: "absolute", top: "1rem", left: "1rem", width: "36px", height: "36px", borderRadius: "50%", border: "3px solid rgba(255,255,255,0.8)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
                            <div style={{ width: "14px", height: "14px", backgroundColor: "white", borderRadius: "50%", boxShadow: "0 0 5px rgba(0,0,0,0.3)" }} />
                          </div>
                        </div>
                        <div style={{ padding: "1.25rem 1.5rem" }}>
                          <h3 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 800, color: "black", textTransform: "uppercase", letterSpacing: "0.5px" }}>{service.title}</h3>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>

            </div>

            {services.length === 0 && (
              <p style={{ textAlign: "center", color: "rgba(255,255,255,0.7)", padding: "2rem 0", marginTop: "2rem" }}>Aktuell sind keine Leistungen hinterlegt.</p>
            )}

          </div>
        </div>

        {/* SERVICE MODAL POPUP */}
        {selectedService && (
          <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
            <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} onClick={() => setSelectedService(null)} />
            <div style={{ position: "relative", backgroundColor: "var(--background)", width: "100%", maxWidth: "600px", borderRadius: "1.5rem", overflow: "hidden", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)", zIndex: 10000 }}>
              {selectedService.imageUrl && (
                <div style={{ width: "100%", height: "280px", backgroundColor: "var(--surface)" }}>
                  <img src={selectedService.imageUrl} alt={selectedService.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
              <div style={{ padding: "2.5rem" }}>
                <h3 style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: "1.5rem", color: "var(--foreground)", textTransform: "uppercase" }}>{selectedService.title}</h3>
                <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
                  {selectedService.description}
                </p>
                <div style={{ marginTop: "2.5rem", display: "flex", justifyContent: "flex-end" }}>
                  <button onClick={() => setSelectedService(null)} style={{ padding: "0.8rem 2rem", borderRadius: "999px", border: "none", background: "var(--primary-gradient)", color: "white", fontWeight: 700, cursor: "pointer", fontSize: "1rem", transition: "transform 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
                    Schließen
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── NEWS & AKTUELLES ── */}
      <section id="news" style={{ padding: "5rem 0", backgroundColor: "var(--background)" }}>
        <div className="container">
          <div ref={blogTitleRef} className="reveal" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 900, marginBottom: "1rem", color: "var(--foreground)" }}>
              Aktuelles & News
            </h2>
            <div style={{ width: "80px", height: "5px", background: "var(--primary-gradient)", borderRadius: "999px", margin: "0 auto" }} />
          </div>

          <div ref={blogListRef} className="reveal" style={{ position: "relative", width: "100vw", left: "50%", transform: "translateX(-50%)", overflow: "hidden", padding: "1rem 0" }}>
            {posts.length > 0 ? (
              <>
                <div style={{
                  display: "flex",
                  width: "max-content",
                  gap: "2rem",
                  transition: "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
                  transform: `translateX(calc(50vw - (${currentSlide} * (min(85vw, 800px) + 2rem)) - (min(85vw, 800px) / 2)))`
                }}>
                  {posts.map((post, idx) => (
                    <div key={idx} style={{ width: "min(85vw, 800px)", flexShrink: 0 }}>
                      <div
                        onClick={() => { setCurrentSlide(idx); setIsPlaying(false); }}
                        style={{
                          backgroundColor: "var(--surface)",
                          borderRadius: "1.5rem",
                          boxShadow: "var(--shadow-lg)",
                          border: "1px solid var(--border)",
                          padding: "1.5rem 2rem",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          textAlign: "center",
                          transform: currentSlide === idx ? "scale(1)" : "scale(0.9)",
                          opacity: currentSlide === idx ? 1 : 0.4,
                          transition: "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
                          cursor: currentSlide === idx ? "default" : "pointer"
                        }}>
                        {post.imageUrl && (
                          <div style={{ width: "100%", backgroundColor: "var(--background)", borderRadius: "1rem", overflow: "hidden", marginBottom: "1rem", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
                            <img src={post.imageUrl} alt={post.title} style={{ maxWidth: "100%", maxHeight: "450px", objectFit: "contain", display: "block" }} />
                          </div>
                        )}
                        <small className="text-gradient" style={{ fontWeight: 600, marginBottom: "0.5rem", display: "block", fontSize: "0.95rem" }}>
                          {new Date(post.createdAt).toLocaleDateString("de-DE")}
                        </small>
                        <h3 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "1rem", color: "var(--foreground)" }}>{post.title}</h3>
                        <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "2rem", whiteSpace: "pre-wrap", maxWidth: "700px", fontSize: "1.05rem" }}>
                          {post.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {posts.length > 1 && (
                  <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", justifyContent: "center", marginTop: "2rem" }}>
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      style={{ background: "none", border: "1px solid var(--border)", color: "var(--foreground)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "var(--surface)", boxShadow: "var(--shadow-sm)", transition: "all 0.3s", fontSize: "0.9rem" }}
                      aria-label={isPlaying ? "Pause" : "Play"}
                      title={isPlaying ? "Automatischen Wechsel pausieren" : "Automatischen Wechsel fortsetzen"}
                    >
                      {isPlaying ? "⏸" : "▶"}
                    </button>
                    <div style={{ display: "flex", gap: "0.75rem" }}>
                      {posts.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => { setCurrentSlide(idx); setIsPlaying(false); }}
                          style={{
                            width: "12px", height: "12px", borderRadius: "50%", border: "none", cursor: "pointer", padding: 0,
                            background: currentSlide === idx ? "var(--primary-gradient)" : "var(--border)",
                            transition: "background 0.3s, transform 0.3s",
                            transform: currentSlide === idx ? "scale(1.2)" : "scale(1)"
                          }}
                          aria-label={`Slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p style={{ padding: "4rem 2rem", textAlign: "center", color: "var(--text-muted)", fontSize: "1.1rem" }}>Derzeit liegen keine aktuellen Meldungen vor.</p>
            )}
          </div>
        </div>
      </section>

      {/* ── CTA SEKTION ── */}
      <section style={{ background: "var(--primary-gradient)", padding: "5rem 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "350px", height: "350px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "250px", height: "250px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
        <div ref={ctaRef} className="reveal reveal-scale" style={{ textAlign: "center", position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 900, color: "white", marginBottom: "1rem" }}>
            Bereit für Ihr nächstes Projekt?
          </h2>
          <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)", color: "rgba(255,255,255,0.85)", maxWidth: "560px", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
            Kontaktieren Sie uns für eine unverbindliche Beratung. Wir freuen uns auf Ihre Anfrage.
          </p>
          <Link href="/kontakt" className="cta-btn"
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "1rem 3rem", borderRadius: "9999px", backgroundColor: "white", color: "#09131e", fontWeight: 800, fontSize: "1.1rem", letterSpacing: "0.5px", textDecoration: "none", boxShadow: "0 8px 30px rgba(0,0,0,0.2)", transition: "transform 0.3s, box-shadow 0.3s" }}>
            JETZT ANFRAGEN
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
