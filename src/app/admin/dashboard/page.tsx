import AdminLayout from "@/components/AdminLayout";
import prisma from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const inquiryCount = await prisma.contactRequest.count();
  const blogCount = await prisma.blogPost.count();
  const newInquiries = await prisma.contactRequest.count({ where: { status: "NEU" }});

  return (
    <AdminLayout title="Dashboard">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
        
        <div style={{ padding: "1.5rem", borderRadius: "1rem", backgroundColor: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-md)" }}>
          <div style={{ fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 600, marginBottom: "0.5rem", textTransform: "uppercase" }}>Neue Kontaktanfragen</div>
          <div style={{ fontSize: "3rem", fontWeight: 800, color: "var(--primary)" }}>{newInquiries}</div>
        </div>

        <div style={{ padding: "1.5rem", borderRadius: "1rem", backgroundColor: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-md)" }}>
          <div style={{ fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 600, marginBottom: "0.5rem", textTransform: "uppercase" }}>Anfragen Gesamt</div>
          <div style={{ fontSize: "3rem", fontWeight: 800, color: "var(--foreground)" }}>{inquiryCount}</div>
        </div>

        <div style={{ padding: "1.5rem", borderRadius: "1rem", backgroundColor: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-md)" }}>
          <div style={{ fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 600, marginBottom: "0.5rem", textTransform: "uppercase" }}>Blog Beiträge</div>
          <div style={{ fontSize: "3rem", fontWeight: 800, color: "var(--foreground)" }}>{blogCount}</div>
        </div>

      </div>
    </AdminLayout>
  );
}
