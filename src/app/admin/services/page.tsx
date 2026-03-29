import AdminLayout from "@/components/AdminLayout";
import prisma from "@/lib/prisma";
import { createService, deleteService } from "@/app/actions/service";

export default async function ServicesAdminPage() {
  const services = await prisma.serviceListing.findMany({ orderBy: { createdAt: "desc" }});

  return (
    <AdminLayout title="Serviceleistungen verwalten">
      <div className="admin-grid">
        
        {/* CREATE FORM */}
        <div style={{ backgroundColor: "var(--surface)", padding: "2rem", borderRadius: "1.5rem", border: "1px solid var(--border)", alignSelf: "start", boxShadow: "var(--shadow-md)" }}>
          <h2 style={{ marginBottom: "1.5rem", fontSize: "1.2rem", fontWeight: 800 }}>Neue Leistung anlegen</h2>
          <form action={createService} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <input name="title" placeholder="Titel der Leistung (z.B. HAUSMEISTERSERVICE)" required style={{ padding: "0.9rem", borderRadius: "0.75rem", border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)", outline: "none", fontSize: "1rem" }} />
            
            <label style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginBottom: "-0.5rem" }}>Hintergrundbild</label>
            <input type="file" name="image" accept="image/*" required style={{ padding: "0.9rem", borderRadius: "0.75rem", border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)", outline: "none", fontSize: "1rem" }} />
            
            <textarea name="description" required placeholder="Ausführliche Beschreibung für das Popup Modal..." rows={8} style={{ padding: "0.9rem", borderRadius: "0.75rem", border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)", resize: "vertical", outline: "none", fontSize: "1rem", fontFamily: "inherit" }} />
            
            <button type="submit" style={{ padding: "1rem", borderRadius: "0.75rem", border: "none", background: "var(--primary)", color: "white", fontWeight: "bold", cursor: "pointer", marginTop: "0.5rem" }}>Speichern</button>
          </form>
        </div>

        {/* LIST SERVICES */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {services.map((service: any) => (
            <div key={service.id} style={{ backgroundColor: "var(--surface)", padding: "2rem", borderRadius: "1.5rem", border: "1px solid var(--border)", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }} className="md:grid-cols-[150px_1fr]">
              
              {/* IMAGE THUMBNAIL */}
              <div style={{ width: "100%", maxWidth: "150px", aspectRatio: "1/1", backgroundColor: "var(--background)", borderRadius: "1rem", overflow: "hidden" }}>
                {service.imageUrl ? (
                  <img src={service.imageUrl} alt={service.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontSize: "0.8rem" }}>Kein Bild</div>
                )}
              </div>

              {/* DETAILS */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                  <h3 style={{ margin: 0, fontSize: "1.4rem", color: "var(--foreground)" }}>{service.title}</h3>
                  <form action={async () => { "use server"; await deleteService(service.id); }}>
                    <button type="submit" style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#ef4444", cursor: "pointer", fontWeight: "bold", padding: "0.5rem 1rem", borderRadius: "0.5rem" }}>Löschen</button>
                  </form>
                </div>
                
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>
                  {service.description}
                </p>
                <div style={{ marginTop: "auto", fontSize: "0.85rem", color: "var(--text-muted)", opacity: 0.7 }}>
                  Angelegt: {new Date(service.createdAt).toLocaleDateString("de-DE")}
                </div>
              </div>
            </div>
          ))}
          {services.length === 0 && <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", fontStyle: "italic" }}>Noch keine Leistungen eingetragen.</p>}
        </div>

      </div>
    </AdminLayout>
  );
}
