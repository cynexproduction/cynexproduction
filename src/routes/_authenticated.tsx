import { createFileRoute, Outlet, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <div style={{ position: "fixed", inset: 0, background: "#0a0a0a", color: "#f5f5f5", overflow: "auto" }}>
      <header style={{ borderBottom: "1px solid #222", padding: "16px 24px", display: "flex", gap: 24, alignItems: "center" }}>
        <strong>Admin</strong>
        <nav style={{ display: "flex", gap: 16 }}>
          <Link to="/admin/blogs" style={{ color: "#fff" }}>Blogs</Link>
          <Link to="/admin/videos" style={{ color: "#fff" }}>Videos</Link>
          <Link to="/admin/submissions" style={{ color: "#fff" }}>Submissions</Link>
        </nav>
      </header>
      <main style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
        <Outlet />
      </main>
    </div>
  );
}
