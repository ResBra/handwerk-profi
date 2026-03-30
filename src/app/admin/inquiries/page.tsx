import AdminLayout from "@/components/AdminLayout";
import prisma from "@/lib/prisma";
import { deleteInquiry } from "@/app/actions/inquiries";

export const dynamic = "force-dynamic";

export default async function InquiriesPage() {
  const inquiries = await prisma.contactRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminLayout title="Kontaktanfragen">
      <div style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "1rem", overflow: "hidden", overflowX: "auto" }}>
        <table style={{ width: "100%", minWidth: "900px", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ backgroundColor: "rgba(0,0,0,0.05)", borderBottom: "1px solid var(--border)" }}>
              <th style={{ padding: "1rem", color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase" }}>Datum</th>
              <th style={{ padding: "1rem", color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase" }}>Name</th>
              <th style={{ padding: "1rem", color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase" }}>E-Mail</th>
              <th style={{ padding: "1rem", color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase" }}>Status</th>
              <th style={{ padding: "1rem", color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase" }}>Nachricht</th>
              <th style={{ padding: "1rem", color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase" }}>Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inv: any) => (
              <tr key={inv.id} style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "1.5rem 1rem", verticalAlign: "top" }}>{new Date(inv.createdAt).toLocaleDateString("de-DE")}</td>
                <td style={{ padding: "1.5rem 1rem", verticalAlign: "top", fontWeight: 600 }}>{inv.name}</td>
                <td style={{ padding: "1.5rem 1rem", verticalAlign: "top" }}><a href={`mailto:${inv.email}`} style={{ color: "var(--primary)", textDecoration: "none" }}>{inv.email}</a></td>
                <td style={{ padding: "1.5rem 1rem", verticalAlign: "top" }}>
                  <span style={{ padding: "0.35rem 0.75rem", borderRadius: "999px", fontSize: "0.75rem", fontWeight: "bold", backgroundColor: inv.status === "NEU" ? "#eab308" : "var(--primary)", color: "white" }}>
                    {inv.status}
                  </span>
                </td>
                <td style={{ padding: "1.5rem 1rem", verticalAlign: "top", maxWidth: "400px", whiteSpace: "pre-wrap", color: "var(--text-muted)", fontSize: "0.95rem" }}>
                  {inv.message}
                </td>
                <td style={{ padding: "1.5rem 1rem", verticalAlign: "top" }}>
                  <form action={async () => { "use server"; await deleteInquiry(inv.id); }}>
                    <button type="submit" style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#ef4444", cursor: "pointer", fontWeight: "bold", padding: "0.5rem 1rem", borderRadius: "0.5rem", fontSize: "0.85rem" }}>Löschen</button>
                  </form>
                </td>
              </tr>
            ))}
            {inquiries.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}>Keine Anfragen gefunden.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
