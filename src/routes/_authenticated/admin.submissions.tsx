import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { db } from "@/integrations/firebase/client";
import { collection, query, orderBy, getDocs, deleteDoc, doc, limit } from "firebase/firestore";

type Submission = {
  id: string; form_type: string; name: string | null; email: string | null;
  phone: string | null; subject: string | null; message: string | null;
  page_url: string | null; created_at: string;
};

export const Route = createFileRoute("/_authenticated/admin/submissions")({
  component: SubmissionsAdmin,
});

function SubmissionsAdmin() {
  const [rows, setRows] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  const load = async () => {
    setLoading(true);
    const docsSnap = await query(collection(db, "form_submissions"), orderBy("created_at", "desc"), limit(500));
    const snapshot = await getDocs(docsSnap);
    setRows(snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Submission)));
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const del = async (id: string) => {
    if (!confirm("Delete this submission?")) return;
    await deleteDoc(doc(db, "form_submissions", id));
    load();
  };

  const filtered = rows.filter((r) => {
    if (!q.trim()) return true;
    const s = q.toLowerCase();
    return [r.name, r.email, r.phone, r.subject, r.message, r.form_type, r.page_url]
      .some((v) => v?.toLowerCase().includes(s));
  });

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Form submissions ({rows.length})</h1>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" style={{ padding: "8px 10px", background: "#0a0a0a", color: "#fff", border: "1px solid #333", borderRadius: 4, width: 280, marginBottom: 12 }} />
      {loading ? <p>Loading…</p> : (
        <div style={{ display: "grid", gap: 10 }}>
          {filtered.map((r) => (
            <div key={r.id} style={{ border: "1px solid #222", borderRadius: 6, padding: 14, background: "#111" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#888", fontSize: 12, marginBottom: 6 }}>
                <span><strong style={{ color: "#fff" }}>{r.form_type}</strong> · {new Date(r.created_at).toLocaleString()}</span>
                <button onClick={() => del(r.id)} style={{ background: "transparent", color: "#e88", border: "1px solid #533", padding: "2px 8px", borderRadius: 3, cursor: "pointer" }}>Delete</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 8, fontSize: 14 }}>
                {r.name && <div><span style={tag}>Name</span> {r.name}</div>}
                {r.email && <div><span style={tag}>Email</span> {r.email}</div>}
                {r.phone && <div><span style={tag}>Phone</span> {r.phone}</div>}
                {r.subject && <div><span style={tag}>Subject</span> {r.subject}</div>}
                {r.page_url && <div><span style={tag}>Page</span> {r.page_url}</div>}
              </div>
              {r.message && <p style={{ marginTop: 10, marginBottom: 0, whiteSpace: "pre-wrap" }}>{r.message}</p>}
            </div>
          ))}
          {filtered.length === 0 && <p style={{ color: "#666" }}>No submissions.</p>}
        </div>
      )}
    </div>
  );
}

const tag: React.CSSProperties = { display: "inline-block", background: "#222", color: "#aaa", padding: "1px 6px", borderRadius: 3, fontSize: 11, marginRight: 6 };
