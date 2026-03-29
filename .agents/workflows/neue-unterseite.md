---
description: Neue Unterseite nach dem HM-Profi Standard-Layout erstellen
---

# Neue Unterseite erstellen – HM-Profi Website

Alle Seiten dieser Website folgen einem einheitlichen Prinzip:
- `SiteLayout` als Wrapper (Header, Hamburger-Menü, Footer)
- Inline-Styles statt Tailwind (kein Tailwind im Projekt!)
- `useReveal`-Hook für Scroll-Animationen (bidirektional)
- HM-Profi Branding überall

---

## Schritte

### 1. Neuen Ordner und page.tsx anlegen

Erstelle die Datei:
```
src/app/[seitenname]/page.tsx
```

### 2. Basis-Template verwenden

```tsx
"use client";

import { useEffect, useRef } from "react";
import SiteLayout from "@/components/SiteLayout";

// Scroll-Reveal Hook (immer gleich einbinden)
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

export default function MeineSeite() {
  const titleRef   = useReveal(0.1);
  const contentRef = useReveal(0.1);

  return (
    // activePage muss dem key in SiteLayout.tsx navLinks entsprechen
    <SiteLayout activePage="meinkey">
      <section style={{ backgroundColor: "var(--background)", padding: "4rem 0 6rem" }}>
        <div className="container">

          {/* Seitentitel */}
          <div ref={titleRef} className="reveal" style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, color: "var(--primary)", marginBottom: "0.75rem" }}>
              Meine Seite
            </h1>
            <div style={{ width: "64px", height: "5px", backgroundColor: "var(--secondary)", borderRadius: "999px", margin: "0 auto" }} />
          </div>

          {/* Seiteninhalt */}
          <div ref={contentRef} className="reveal">
            {/* Inhalt hier */}
          </div>

        </div>
      </section>
    </SiteLayout>
  );
}
```

### 3. Nav-Link in SiteLayout ergänzen (falls neue Seite im Menü erscheinen soll)

Datei: `src/components/SiteLayout.tsx`

Im `navLinks`-Array einen neuen Eintrag hinzufügen:
```tsx
{ href: "/meinseite", label: "Meine Seite", key: "meinkey" },
```

Und im Sidebar-Array dasselbe:
```tsx
{ href: "/meinseite", label: "🔑 Meine Seite" },
```

### 4. Reveal-Klassen

| Klasse | Effekt |
|--------|--------|
| `reveal` | Von unten aufpoppen |
| `reveal reveal-left` | Von links reinschieben |
| `reveal reveal-right` | Von rechts reinschieben |
| `reveal reveal-scale` | Aus Mitte skalieren |

Element wird sichtbar sobald es in den Viewport scrollt, und ausgeblendet wenn es wieder rausscrollt.

### 5. Globale CSS-Klassen nutzen (kein Tailwind!)

| Klasse | Bedeutung |
|--------|-----------|
| `.container` | Zentrierter Wrapper, max 1200px |
| `.card` | Weißer/surface Block mit Schatten |
| `.btn .btn-primary` | Blauer Button |
| `.btn .btn-secondary` | Schwarzer Button |
| `.input` | Einheitliches Formularfeld |
| `.label` | Formular-Label |
| `.desktop-nav` | Automatisch responsive (sichtbar ab 768px) |

---

## Wichtige Regeln

> [!IMPORTANT]
> **Kein Tailwind!** Das Projekt hat kein Tailwind CSS installiert. Tailwind-Klassen wie `w-full`, `flex`, `hidden` funktionieren NICHT.
> Alle Layouts/Styles als **Inline-Styles** oder über **globals.css**-Klassen.

> [!IMPORTANT]
> **Immer `"use client"` am Anfang** wenn du `useEffect`, `useRef` oder `useState` verwendest.

> [!TIP]
> Für neue Farben/Varianten: CSS-Variablen in `globals.css` unter `:root` ergänzen.
