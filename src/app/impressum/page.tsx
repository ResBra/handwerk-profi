"use client";

import { useEffect, useRef } from "react";
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

export default function Impressum() {
  const titleRef   = useReveal(0.1);
  const contentRef = useReveal(0.08);

  return (
    <SiteLayout activePage="impressum">
      <section style={{ backgroundColor: "var(--background)", padding: "4rem 0 6rem" }}>
        <div className="container" style={{ maxWidth: "860px" }}>

          {/* Titel */}
          <div ref={titleRef} className="reveal" style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h1 className="text-gradient" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, marginBottom: "0.75rem" }}>
              Impressum
            </h1>
            <div style={{ width: "64px", height: "5px", backgroundColor: "var(--secondary)", borderRadius: "999px", margin: "0 auto" }} />
          </div>

          {/* Inhalt */}
          <div ref={contentRef} className="reveal">
            <div className="card" style={{ padding: "2.5rem", display: "flex", flexDirection: "column", gap: "2rem" }}>

              <section>
                <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--foreground)" }}>
                  Angaben gemäß § 5 TMG
                </h2>
                <p style={{ color: "var(--text-muted)", lineHeight: 1.8, margin: 0 }}>
                  Max Mustermann<br />
                  HM-Profi (Hausmeister &amp; Möbelbau)<br />
                  Musterstraße 123<br />
                  12345 Musterstadt
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--foreground)" }}>
                  Kontakt
                </h2>
                <p style={{ color: "var(--text-muted)", lineHeight: 1.8, margin: 0 }}>
                  Telefon: 0123 / 456 78 90<br />
                  E-Mail: info@hm-profi.de
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--foreground)" }}>
                  Umsatzsteuer-ID
                </h2>
                <p style={{ color: "var(--text-muted)", lineHeight: 1.8, margin: 0 }}>
                  Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                  DE999999999
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--foreground)" }}>
                  Verbraucherstreitbeilegung / Universalschlichtungsstelle
                </h2>
                <p style={{ color: "var(--text-muted)", lineHeight: 1.8, margin: 0 }}>
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </section>

            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
