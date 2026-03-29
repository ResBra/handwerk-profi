"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logoutAction } from "@/app/actions/auth";

export default function AdminLayout({ children, title }: { children: React.ReactNode; title: string }) {
  const pathname = usePathname();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: "📊" },
    { name: "Anfragen", href: "/admin/inquiries", icon: "✉️" },
    { name: "Blog / News", href: "/admin/blog", icon: "📝" },
    { name: "Leistungen", href: "/admin/services", icon: "🔧" },
    { name: "Farben & Theme", href: "/admin/theme", icon: "🎨" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--background)", color: "var(--foreground)", position: "relative", overflow: "hidden" }}>
      
      {/* ── MAIN CONTENT (Left) ── */}
      <main style={{ flex: 1, padding: "2rem 3rem", overflowY: "auto", position: "relative" }}>
        {/* Header with Title only */}
        <div style={{ marginBottom: "3rem" }}>
          <h1 style={{ margin: 0, fontSize: "2rem", color: "var(--foreground)" }}>{title}</h1>
        </div>
        {children}
      </main>

      {/* ── SIDEBAR CONTAINER (Right) ── */}
      <div style={{ 
        position: "relative", 
        width: isSidebarVisible ? "260px" : "0", 
        transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 100 
      }}>
        
        {/* FLOATING TOGGLE BUTTON ("TAB") - NOW VIEWPORT FIXED */}
        <button 
          onClick={() => setIsSidebarVisible(!isSidebarVisible)}
          style={{
            position: "fixed",
            right: isSidebarVisible ? "260px" : "0",
            top: "30vh", 
            width: "38px",
            height: "100px",
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            borderRight: "none",
            borderRadius: "40px 0 0 40px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: isSidebarVisible ? "none" : "-8px 0 24px rgba(0,0,0,0.15)",
            fontSize: "1.8rem",
            color: "var(--primary)",
            zIndex: 1000,
            transition: "right 0.4s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s, background-color 0.2s"
          }}
          aria-label={isSidebarVisible ? "Menü schließen" : "Menü öffnen"}
          onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--background)";
              e.currentTarget.style.color = "var(--primary-light)";
          }}
          onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--surface)";
              e.currentTarget.style.color = "var(--primary)";
          }}
        >
          {isSidebarVisible ? "›" : "‹"}
        </button>

        {/* ── ADMIN SIDEBAR ── */}
        <aside style={{ 
            width: "260px",
            height: "100%",
            opacity: isSidebarVisible ? 1 : 0,
            backgroundColor: "var(--surface)", 
            borderLeft: "1px solid var(--border)", 
            display: "flex", 
            flexDirection: "column",
            transition: "opacity 0.4s ease",
            overflow: "hidden",
          }}>
          <div style={{ padding: "2rem", whiteSpace: "nowrap" }}>
            <h2 style={{ color: "var(--primary)", margin: 0, fontSize: "1.5rem" }}>HM-Profi</h2>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600, letterSpacing: "1px" }}>ADMIN PANEL</span>
          </div>

          <nav style={{ flex: 1, padding: "0 1rem", display: "flex", flexDirection: "column", gap: "0.5rem", minWidth: "260px" }}>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href} style={{
                  display: "flex", alignItems: "center", gap: "1rem", padding: "0.85rem 1rem",
                  borderRadius: "0.5rem", textDecoration: "none",
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "white" : "var(--foreground)",
                  backgroundColor: isActive ? "var(--primary)" : "transparent",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap"
                }}>
                  <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div style={{ padding: "2rem 1rem", borderTop: "1px solid var(--border)", minWidth: "260px" }}>
            <form action={logoutAction}>
              <button type="submit" style={{
                width: "100%", padding: "0.75rem", borderRadius: "0.5rem",
                border: "1px solid var(--border)", background: "transparent",
                color: "var(--foreground)", fontWeight: 600, cursor: "pointer",
                display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem",
                transition: "background 0.2s"
              }}>
                🚪 Abmelden
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
}
