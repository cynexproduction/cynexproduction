import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { db } from "@/integrations/firebase/client";
import { collection, query, orderBy, getDocs, updateDoc, addDoc, doc, Timestamp } from "firebase/firestore";
import { PAGES } from "@/lib/pages";

type Slot = { id: string; slot_key: string; title: string | null; youtube_url: string | null };

export const Route = createFileRoute("/_authenticated/admin/videos")({
  component: VideosAdmin,
});

function VideosAdmin() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [msg, setMsg] = useState<string>("");
  const [selectedPage, setSelectedPage] = useState("");

  const load = async () => {
    setLoading(true);
    const docsSnap = await getDocs(query(collection(db, "video_slots"), orderBy("slot_key")));
    setSlots(docsSnap.docs.map((d) => ({ id: d.id, ...d.data() } as Slot)));
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const save = async (slot: Slot) => {
    setSavingId(slot.id); setMsg("");
    try {
      const data: Record<string, unknown> = {
        youtube_url: slot.youtube_url,
        title: slot.title,
        updated_at: Timestamp.now().toDate().toISOString(),
      };
      if (slot.slot_key && !slot.id.includes("new")) {
        data.slot_key = slot.slot_key;
      }
      await updateDoc(doc(db, "video_slots", slot.id), data);
      setMsg(`Saved ${slot.slot_key}`);
    } catch (err: any) {
      setMsg(`Error: ${err.message}`);
    }
    setSavingId(null);
    setTimeout(() => setMsg(""), 2500);
  };

  const addSlot = async () => {
    if (!selectedPage) { alert("Select a page first"); return; }
    const pageLabel = PAGES.find((p) => p.path === selectedPage)?.label || selectedPage;
    try {
      await addDoc(collection(db, "video_slots"), { slot_key: selectedPage, title: pageLabel, youtube_url: "" });
      setSelectedPage("");
      load();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>Video slots</h1>
      </div>
      <p style={{ color: "#aaa", marginTop: 0 }}>Paste a YouTube URL (any format). Leave empty to hide the video on the site.</p>
      {msg && <div style={{ padding: 10, background: "#193", borderRadius: 4, marginBottom: 12 }}>{msg}</div>}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "flex-end" }}>
        <label style={lbl}>
          <span style={lblText}>Add video for page</span>
          <select value={selectedPage} onChange={(e) => setSelectedPage(e.target.value)} style={input}>
            <option value="">-- Select page --</option>
            {PAGES.map((p) => (
              <option key={p.path} value={p.path}>{p.label} ({p.path})</option>
            ))}
          </select>
        </label>
        <button onClick={addSlot} style={btnPrimary} disabled={!selectedPage}>+ Add</button>
      </div>
      {loading ? <p>Loading...</p> : (
        <div style={{ display: "grid", gap: 12 }}>
          {slots.map((s, i) => {
            const page = PAGES.find((p) => p.path === s.slot_key);
            return (
              <div key={s.id} style={{ border: "1px solid #222", borderRadius: 6, padding: 16, background: "#111" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12, alignItems: "end" }}>
                  <label style={lbl}>
                    <span style={lblText}>Page</span>
                    <select
                      value={s.slot_key}
                      onChange={(e) => { const ns = [...slots]; ns[i] = { ...s, slot_key: e.target.value }; setSlots(ns); }}
                      onBlur={() => save(slots[i])}
                      style={input}
                    >
                      {PAGES.map((p) => (
                        <option key={p.path} value={p.path}>{p.label} ({p.path})</option>
                      ))}
                    </select>
                  </label>
                  <button onClick={() => save(slots[i])} disabled={savingId === s.id} style={btnPrimary}>{savingId === s.id ? "Saving..." : "Save"}</button>
                </div>
                <label style={{ ...lbl, marginTop: 10 }}>
                  <span style={lblText}>YouTube URL</span>
                  <input value={s.youtube_url ?? ""} onChange={(e) => { const ns = [...slots]; ns[i] = { ...s, youtube_url: e.target.value }; setSlots(ns); }} onBlur={() => save(slots[i])} placeholder="https://www.youtube.com/watch?v=..." style={input} />
                </label>
              </div>
            );
          })}
          {slots.length === 0 && <p style={{ color: "#666" }}>No video slots yet. Select a page above and add one.</p>}
        </div>
      )}
    </div>
  );
}

const input: React.CSSProperties = { padding: "8px 10px", background: "#0a0a0a", color: "#fff", border: "1px solid #333", borderRadius: 4, width: "100%" };
const lbl: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 4 };
const lblText: React.CSSProperties = { fontSize: 12, color: "#888" };
const btnPrimary: React.CSSProperties = { background: "#e50914", color: "#fff", border: 0, padding: "8px 16px", borderRadius: 4, cursor: "pointer", fontWeight: 600 };
