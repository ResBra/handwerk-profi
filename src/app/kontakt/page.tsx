"use client";

import { useState, useEffect, useRef } from "react";
import SiteLayout from "@/components/SiteLayout";

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
          el.classList.remove("visible");
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return ref;
}

export default function Kontakt() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const titleRef  = useReveal(0.1);
  const formRef   = useReveal(0.1);
  const infoRef   = useReveal(0.1);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Fehler beim Senden");
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage("Leider ist ein Fehler aufgetreten. Bitte probieren Sie es später noch einmal.");
    }
  };

  return (
    <SiteLayout activePage="kontakt">
      <section style={{ backgroundColor: "var(--background)", padding: "4rem 0 6rem" }}>
        <div className="container">

          {/* Titel */}
          <div ref={titleRef} className="reveal" style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h1 className="text-gradient" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, marginBottom: "0.75rem" }}>
              Kontaktieren Sie uns
            </h1>
            <div style={{ width: "64px", height: "5px", backgroundColor: "var(--secondary)", borderRadius: "999px", margin: "0 auto" }} />
          </div>

          {/* Grid: Formular + Kontaktinfos */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>

            {/* Formular – von links */}
            <div ref={formRef} className="reveal reveal-left">
              <div className="card" style={{ padding: "2rem" }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1.5rem" }}>Schreiben Sie uns</h2>

                {status === "success" && (
                  <div style={{ backgroundColor: "#dcfce7", color: "#166534", padding: "1rem", borderRadius: "0.5rem", marginBottom: "1.5rem", border: "1px solid #bbf7d0" }}>
                    Vielen Dank! Ihre Nachricht wurde erfolgreich versendet. Wir melden uns in Kürze.
                  </div>
                )}
                {status === "error" && (
                  <div style={{ backgroundColor: "#fee2e2", color: "#991b1b", padding: "1rem", borderRadius: "0.5rem", marginBottom: "1.5rem", border: "1px solid #fecaca" }}>
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div>
                    <label htmlFor="name" className="label">Name</label>
                    <input type="text" id="name" name="name" className="input" placeholder="Max Mustermann" required disabled={status === "loading"} />
                  </div>
                  <div>
                    <label htmlFor="email" className="label">E-Mail</label>
                    <input type="email" id="email" name="email" className="input" placeholder="max@beispiel.de" required disabled={status === "loading"} />
                  </div>
                  <div>
                    <label htmlFor="phone" className="label">Telefon (optional)</label>
                    <input type="tel" id="phone" name="phone" className="input" placeholder="+49 123 4567890" disabled={status === "loading"} />
                  </div>
                  <div>
                    <label htmlFor="message" className="label">Ihre Nachricht</label>
                    <textarea id="message" name="message" rows={5} className="input" style={{ resize: "vertical" }} placeholder="Wie können wir Ihnen helfen?" required disabled={status === "loading"} />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ marginTop: "0.5rem" }} disabled={status === "loading"}>
                    {status === "loading" ? "Wird gesendet…" : "Nachricht senden"}
                  </button>
                </form>
              </div>
            </div>

            {/* Kontaktinfos – von rechts */}
            <div ref={infoRef} className="reveal reveal-right" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div className="card" style={{ padding: "2rem", background: "var(--primary-gradient)", color: "white", border: "none" }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1.5rem", color: "white" }}>Unsere Kontaktdaten</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {[
                    { icon: "📞", label: "Telefon", value: "0123 / 456 78 90" },
                    { icon: "✉️", label: "E-Mail", value: "info@hm-profi.de" },
                    { icon: "📍", label: "Adresse", value: "Hückeswagener Str. 27\n51647 Gummersbach" },
                  ].map(({ icon, label, value }) => (
                    <div key={label} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                      <span style={{ fontSize: "1.5rem" }}>{icon}</span>
                      <div>
                        <p style={{ fontWeight: 700, margin: "0 0 0.25rem", color: "white" }}>{label}</p>
                        <p style={{ opacity: 0.9, margin: 0, color: "white", whiteSpace: "pre-line" }}>{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Maps Integration */}
              <div className="card" style={{ padding: 0, overflow: "hidden", display: "flex", minHeight: "300px" }}>
                <iframe 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, minHeight: "300px", width: "100%" }}
                  src="https://maps.google.com/maps?q=H%C3%BCckeswagener+Str.+27,+51647+Gummersbach&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
