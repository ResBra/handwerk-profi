"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { getThemeSettings, updateThemeSettings } from "@/app/actions/theme";

export default function ThemeAdminPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);

  const [gradientStart, setGradientStart] = useState("#2eb64a");
  const [gradientEnd, setGradientEnd] = useState("#1e7536");
  const [gradientStartDark, setGradientStartDark] = useState("#2eb64a");
  const [gradientEndDark, setGradientEndDark] = useState("#1e7536");

  const [sidebarBgLight, setSidebarBgLight] = useState("#ffffff");
  const [sidebarBgDark, setSidebarBgDark] = useState("#1e293b");

  useEffect(() => {
    getThemeSettings().then(data => {
      if (data) {
        setGradientStart(data.gradientStart || "#2eb64a");
        setGradientEnd(data.gradientEnd || "#1e7536");
        setGradientStartDark(data.gradientStartDark || "#2eb64a");
        setGradientEndDark(data.gradientEndDark || "#1e7536");
        setSidebarBgLight(data.sidebarBgLight || "#ffffff");
        setSidebarBgDark(data.sidebarBgDark || "#1e293b");
      }
      setLoading(false);
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const result = await updateThemeSettings({
      gradientStart,
      gradientEnd,
      gradientStartDark,
      gradientEndDark,
      sidebarBgLight,
      sidebarBgDark,
    });

    if (result.success) {
      setMessage({ type: "success", text: "Farben gespeichert! Prüfe das Resultat auf der Startseite." });
    } else {
      setMessage({ type: "error", text: "Fehler beim Speichern der Farben." });
    }
    setSaving(false);
  };

  const ColorPicker = ({ label, value, onChange, desc }: { label: string, value: string, onChange: (v: string) => void, desc?: string }) => {
    const [tempColor, setTempColor] = useState(value);

    // Sync temp color if external value changes (e.g. on load)
    useEffect(() => {
      setTempColor(value);
    }, [value]);

    const hasChanged = tempColor.toLowerCase() !== value.toLowerCase();

    return (
      <div style={{ marginBottom: "1.5rem" }}>
        <label style={{ display: "block", fontWeight: 700, marginBottom: "0.5rem", fontSize: "0.95rem" }}>{label}</label>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "0.5rem", backgroundColor: "var(--background)", padding: "0.25rem 0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)" }}>
            <input 
              type="color" 
              value={tempColor} 
              onChange={e => setTempColor(e.target.value)} 
              disabled={saving} 
              style={{ width: "34px", height: "34px", padding: 0, border: "none", cursor: "pointer", borderRadius: "4px", backgroundColor: "transparent" }} 
            />
            <span style={{ fontFamily: "monospace", fontSize: "0.9rem", fontWeight: 600 }}>{tempColor.toUpperCase()}</span>
          </div>

          {hasChanged && (
            <button 
              type="button"
              onClick={() => onChange(tempColor)}
              style={{
                padding: "0.4rem 0.8rem", borderRadius: "0.4rem", backgroundColor: "var(--primary)",
                color: "white", border: "none", cursor: "pointer", fontWeight: 700, fontSize: "0.85rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)", transition: "transform 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              ✅ OK
            </button>
          )}
        </div>
        {desc && <p style={{ margin: "0.4rem 0 0", fontSize: "0.8rem", color: "var(--text-muted)" }}>{desc}</p>}
      </div>
    );
  };

  if (loading) return <AdminLayout title="Lade Daten..."><div /></AdminLayout>;

  return (
    <AdminLayout title="Farben & Theme Konfigurator">
      <div style={{ maxWidth: "1000px", display: "flex", flexDirection: "column", gap: "2rem" }}>
        
        <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.6 }}>
          Passe hier die globalen Design-Farben für das Helle Design (Sonne) und das Dunkle Design (Mond) separat an. Die Schriftfarben werden automatisch auf optimale Lesbarkeit eingestellt.
        </p>

        {message && (
          <div style={{ padding: "1rem 1.5rem", borderRadius: "0.5rem", fontWeight: 600, backgroundColor: message.type === "success" ? "#dcfce7" : "#fee2e2", color: message.type === "success" ? "#166534" : "#991b1b", border: `1px solid ${message.type === "success" ? "#bbf7d0" : "#fecaca"}` }}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "2rem" }}>
            
            {/* Box: Helles Design */}
            <div style={{ backgroundColor: "#f8fafc", color: "#091321", padding: "2rem", borderRadius: "1.5rem", border: "1px solid #e2e8f0", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>☀️ Helles Design</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <ColorPicker label="Designfarbe Start" value={gradientStart} onChange={setGradientStart} />
                <ColorPicker label="Designfarbe Ende" value={gradientEnd} onChange={setGradientEnd} />
              </div>
              <ColorPicker label="Sidebar Hintergrund" desc="Hintergrund des seitlichen Menüs" value={sidebarBgLight} onChange={setSidebarBgLight} />
            </div>

            {/* Box: Dunkles Design */}
            <div style={{ backgroundColor: "#0f172a", color: "#f8fafc", padding: "2rem", borderRadius: "1.5rem", border: "1px solid #334155", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>🌙 Dunkles Design</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <ColorPicker label="Designfarbe Start" value={gradientStartDark} onChange={setGradientStartDark} />
                <ColorPicker label="Designfarbe Ende" value={gradientEndDark} onChange={setGradientEndDark} />
              </div>
              <ColorPicker label="Sidebar Hintergrund" desc="Hintergrund des seitlichen Menüs" value={sidebarBgDark} onChange={setSidebarBgDark} />
            </div>

          </div>

          <button type="submit" disabled={saving} style={{ padding: "1.2rem 2.5rem", borderRadius: "0.75rem", backgroundColor: "var(--primary)", color: "white", fontWeight: 800, border: "none", cursor: "pointer", fontSize: "1.15rem", opacity: saving ? 0.7 : 1, transition: "transform 0.2s, background 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--primary-light)"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "var(--primary)"}>
            {saving ? "Wird gespeichert..." : "Alle Design-Änderungen anwenden"}
          </button>

        </form>
      </div>
    </AdminLayout>
  );
}
