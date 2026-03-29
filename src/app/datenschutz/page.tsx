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

export default function Datenschutz() {
  const titleRef   = useReveal(0.1);
  const contentRef = useReveal(0.08);

  const sectionStyle = { marginBottom: "2.5rem" };
  const h2Style = { fontSize: "1.4rem", fontWeight: 700, marginBottom: "1rem", color: "var(--foreground)" };
  const h3Style = { fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--foreground)" };
  const pStyle = { color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "1rem" };
  const listStyle = { color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "1rem", paddingLeft: "1.5rem" };

  return (
    <SiteLayout activePage="datenschutz">
      <section style={{ backgroundColor: "var(--background)", padding: "4rem 0 6rem" }}>
        <div className="container" style={{ maxWidth: "900px" }}>

          {/* Titel */}
          <div ref={titleRef} className="reveal" style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h1 className="text-gradient" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, marginBottom: "0.75rem" }}>
              Datenschutzerklärung
            </h1>
            <div style={{ width: "64px", height: "5px", backgroundColor: "var(--secondary)", borderRadius: "999px", margin: "0 auto" }} />
          </div>

          {/* Inhalt */}
          <div ref={contentRef} className="reveal">
            <div className="card" style={{ padding: "3rem" }}>
              
              <div style={sectionStyle}>
                <h2 style={h2Style}>1. Datenschutz auf einen Blick</h2>
                <h3 style={h3Style}>Allgemeine Hinweise</h3>
                <p style={pStyle}>
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                </p>
                <h3 style={h3Style}>Datenerfassung auf dieser Website</h3>
                <p style={pStyle}>
                  <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle“ in dieser Datenschutzerklärung entnehmen.
                </p>
                <p style={pStyle}>
                  <strong>Wie erfassen wir Ihre Daten?</strong><br />
                  Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
                </p>
              </div>

              <div style={sectionStyle}>
                <h2 style={h2Style}>2. Hosting</h2>
                <p style={pStyle}>
                  Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
                </p>
                <p style={pStyle}>
                  <strong>Vercel / Cloud-Hosting</strong><br />
                  Die Website wird auf Servern von Cloud-Anbietern betrieben. Wir nutzen Vercel für das Deployment der Website. Details entnehmen Sie der Datenschutzerklärung des jeweiligen Anbieters.
                </p>
              </div>

              <div style={sectionStyle}>
                <h2 style={h2Style}>3. Allgemeine Hinweise und Pflichtinformationen</h2>
                <h3 style={h3Style}>Datenschutz</h3>
                <p style={pStyle}>
                  Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                </p>
                <h3 style={h3Style}>Hinweis zur verantwortlichen Stelle</h3>
                <p style={pStyle}>
                  Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
                </p>
                <p style={pStyle}>
                  Max Mustermann<br />
                  HM-Profi (Hausmeister &amp; Möbelbau)<br />
                  Musterstraße 123<br />
                  12345 Musterstadt
                </p>
                <p style={pStyle}>
                  Telefon: 0123 / 456 78 90<br />
                  E-Mail: info@hm-profi.de
                </p>
                <p style={pStyle}>
                  Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
                </p>
              </div>

              <div style={sectionStyle}>
                <h2 style={h2Style}>4. Datenerfassung auf dieser Website</h2>
                <h3 style={h3Style}>Cookies</h3>
                <p style={pStyle}>
                  Unsere Internetseiten verwenden so genannte „Cookies“. Cookies sind kleine Datenpakete und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert.
                </p>
                <h3 style={h3Style}>Server-Log-Dateien</h3>
                <p style={pStyle}>
                  Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
                </p>
                <ul style={listStyle}>
                  <li>Browsertyp und Browserversion</li>
                  <li>verwendetes Betriebssystem</li>
                  <li>Referrer URL</li>
                  <li>Hostname des zugreifenden Rechners</li>
                  <li>Uhrzeit der Serveranfrage</li>
                  <li>IP-Adresse</li>
                </ul>
                <p style={pStyle}>
                  Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
                </p>
                <h3 style={h3Style}>Kontaktformular</h3>
                <p style={pStyle}>
                  Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                </p>
              </div>

              <div style={sectionStyle}>
                <h2 style={h2Style}>5. Analyse-Tools und Werbung</h2>
                <p style={pStyle}>
                  Wir verzichten auf dieser Website weitestgehend auf komplexe Analyse-Tools, um Ihre Privatsphäre zu schützen. Sofern Dienste wie Google Analytics eingesetzt werden, erfolgt dies nur nach Ihrer ausdrücklichen Einwilligung.
                </p>
              </div>

              <div style={sectionStyle}>
                <h2 style={h2Style}>6. Ihre Rechte</h2>
                <p style={pStyle}>
                  Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.
                </p>
                <ul style={listStyle}>
                  <li>Widerruf Ihrer Einwilligung zur Datenverarbeitung</li>
                  <li>Beschwerderecht bei der zuständigen Aufsichtsbehörde</li>
                  <li>Recht auf Datenübertragbarkeit</li>
                  <li>Auskunft, Berichtigung und Löschung</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
