import AdminLayout from "@/components/AdminLayout";
import prisma from "@/lib/prisma";
import { createPost, deletePost } from "@/app/actions/blog";

export const dynamic = "force-dynamic";

export default async function BlogAdminPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" }});

  return (
    <AdminLayout title="Blog / News verwalten">
      <div className="admin-grid">
        
        {/* CREATE FORM */}
        <div style={{ backgroundColor: "var(--surface)", padding: "2rem", borderRadius: "1.5rem", border: "1px solid var(--border)", alignSelf: "start", boxShadow: "var(--shadow-md)" }}>
          <h2 style={{ marginBottom: "1.5rem", fontSize: "1.2rem" }}>Neuen Beitrag verfassen</h2>
          <form action={createPost} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <input name="title" placeholder="Titel des Beitrags" required style={{ padding: "0.9rem", borderRadius: "0.75rem", border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)", outline: "none", fontSize: "1rem" }} />
            <input type="file" name="image" accept="image/*" style={{ padding: "0.9rem", borderRadius: "0.75rem", border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)", outline: "none", fontSize: "1rem" }} />
            <textarea name="content" required placeholder="Nachricht / Text des Artikels..." rows={10} style={{ padding: "0.9rem", borderRadius: "0.75rem", border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)", resize: "vertical", outline: "none", fontSize: "1rem", fontFamily: "inherit" }} />
            <button type="submit" style={{ padding: "1rem", borderRadius: "0.75rem", border: "none", background: "var(--primary)", color: "white", fontWeight: "bold", cursor: "pointer", marginTop: "0.5rem" }}>Veröffentlichen</button>
          </form>
        </div>

        {/* LIST POSTS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {posts.map((post: any) => (
            <div key={post.id} style={{ backgroundColor: "var(--surface)", padding: "2rem", borderRadius: "1.5rem", border: "1px solid var(--border)", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.4rem", color: "var(--foreground)", marginBottom: "0.5rem" }}>{post.title}</h3>
                  <small style={{ color: "var(--text-muted)", fontWeight: 500 }}>{new Date(post.createdAt).toLocaleDateString("de-DE")} - {new Date(post.createdAt).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })} Uhr</small>
                </div>
                <form action={async () => { "use server"; await deletePost(post.id); }}>
                  <button type="submit" style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#ef4444", cursor: "pointer", fontWeight: "bold", padding: "0.5rem 1rem", borderRadius: "0.5rem" }}>Beitrag Löschen</button>
                </form>
              </div>
              {post.imageUrl && (
                <div style={{ width: "100%", backgroundColor: "rgba(0,0,0,0.05)", borderRadius: "1rem", marginTop: "1rem", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <img src={post.imageUrl} alt={post.title} style={{ maxWidth: "100%", maxHeight: "500px", objectFit: "contain", display: "block" }} />
                </div>
              )}
              <div style={{ whiteSpace: "pre-wrap", color: "var(--text-muted)", lineHeight: 1.7, marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border)" }}>
                {post.content}
              </div>
            </div>
          ))}
          {posts.length === 0 && <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", fontStyle: "italic" }}>Noch keine Beiträge vorhanden. Erstelle den ersten Beitrag links!</p>}
        </div>

      </div>
    </AdminLayout>
  );
}
