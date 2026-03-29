"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
      router.refresh();
    } else {
      setError("Falsche Zugangsdaten (Zutritt nur für Administratoren).");
      setLoading(false);
    }
  };

  return (
    <SiteLayout activePage="login">
      <div className="container" style={{ paddingBottom: "100px" }}>
        <div style={{ maxWidth: "400px", margin: "40px auto", padding: "2.5rem", backgroundColor: "var(--surface)", borderRadius: "1.5rem", boxShadow: "0 10px 40px rgba(0,0,0,0.1)", border: "1px solid var(--border)" }}>
          <h1 style={{ textAlign: "center", marginBottom: "2rem", color: "var(--foreground)" }}>🔒 Admin-Bereich</h1>
          
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <input
              type="email"
              placeholder="Admin E-Mail Adresse"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: "0.9rem 1rem", borderRadius: "0.75rem", border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)", outline: "none", fontSize: "1rem" }}
              required
            />
            <input
              type="password"
              placeholder="Master-Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: "0.9rem 1rem", borderRadius: "0.75rem", border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)", outline: "none", fontSize: "1rem" }}
              required
            />
            {error && <div style={{ color: "var(--primary)", fontSize: "0.9rem", textAlign: "center", fontWeight: 500 }}>{error}</div>}
            
            <button 
              type="submit" 
              disabled={loading}
              style={{ padding: "0.9rem", borderRadius: "0.75rem", border: "none", background: "var(--primary)", color: "white", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer", marginTop: "0.5rem", opacity: loading ? 0.7 : 1, transition: "opacity 0.2s" }}
            >
              {loading ? "Wird verifiziert..." : "Sicher anmelden"}
            </button>
          </form>
          
          <div style={{ textAlign: "center", marginTop: "2.5rem", borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
            <Link href="/" style={{ color: "var(--text-muted)", fontSize: "0.9rem", textDecoration: "none" }}>← Zurück zur Startseite</Link>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
