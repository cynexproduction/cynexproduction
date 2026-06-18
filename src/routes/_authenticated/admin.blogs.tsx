import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useCallback, useRef } from "react";
import Underline from "@tiptap/extension-underline";
import { db } from "@/integrations/firebase/client";
import { collection, query, orderBy, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp } from "firebase/firestore";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";

type Blog = {
  id: string; title: string; slug: string; content: string;
  excerpt: string | null; published: boolean; created_at: string; updated_at: string;
};

export const Route = createFileRoute("/_authenticated/admin/blogs")({
  component: BlogsAdmin,
});

function BlogsAdmin() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Blog | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const load = async () => {
    setLoading(true);
    const q = query(collection(db, "blogs"), orderBy("created_at", "desc"));
    const snapshot = await getDocs(q);
    const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Blog));
    setBlogs(list);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  if (editing) {
    return <BlogEditor blog={editing} onSave={async (b) => {
      setSaving(true); setMsg("");
      const now = Timestamp.now().toDate().toISOString();
      const data = { title: b.title, slug: b.slug, content: b.content, excerpt: b.excerpt, published: b.published, updated_at: now };
      try {
        if (b.id) {
          await updateDoc(doc(db, "blogs", b.id), data);
        } else {
          await addDoc(collection(db, "blogs"), { ...data, created_at: now });
        }
        setMsg("Saved!"); setSaving(false); setEditing(null); load();
        setTimeout(() => setMsg(""), 2500);
      } catch (err: any) {
        setMsg("Error: " + (err.message || "Unknown"));
        setSaving(false);
      }
    }} onCancel={() => setEditing(null)} saving={saving} msg={msg} />;
  }

  const createNew = () => {
    setEditing({ id: "", title: "", slug: "", content: "<p></p>", excerpt: "", published: false, created_at: "", updated_at: "" });
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    await deleteDoc(doc(db, "blogs", id));
    load();
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>Blogs</h1>
        <button onClick={createNew} style={btnPrimary}>+ New Blog</button>
      </div>
      {loading ? <p>Loading…</p> : (
        <div style={{ display: "grid", gap: 10 }}>
          {blogs.map((b) => (
            <div key={b.id} style={{ border: "1px solid #222", borderRadius: 6, padding: 14, background: "#111", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 15, color: b.published ? "#fff" : "#666" }}>{b.title || "(untitled)"}</div>
                <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>/{b.slug} · {b.published ? <span style={{ color: "#4c4" }}>Published</span> : <span style={{ color: "#aa4" }}>Draft</span>} · {new Date(b.created_at).toLocaleDateString()}</div>
              </div>
              <button onClick={() => setEditing(b)} style={btnGhost}>Edit</button>
              <button onClick={() => remove(b.id)} style={{ ...btnGhost, color: "#e88", borderColor: "#533" }}>Delete</button>
            </div>
          ))}
          {blogs.length === 0 && <p style={{ color: "#666" }}>No blogs yet.</p>}
        </div>
      )}
    </div>
  );
}

const FONTS = ["Arial", "Helvetica", "Times New Roman", "Georgia", "Courier New", "Verdana", "Trebuchet MS", "Impact", "Comic Sans MS", "monospace"];

function BlogEditor({ blog, onSave, onCancel, saving, msg }: {
  blog: Blog; onSave: (b: Blog) => void; onCancel: () => void; saving: boolean; msg: string;
}) {
  const [title, setTitle] = useState(blog.title);
  const [slug, setSlug] = useState(blog.slug);
  const [excerpt, setExcerpt] = useState(blog.excerpt || "");
  const [published, setPublished] = useState(blog.published);
  const [showPreview, setShowPreview] = useState(false);
  const [showHtml, setShowHtml] = useState(false);
  const [htmlCode, setHtmlCode] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      TextStyle, Color,
      FontFamily.configure({ types: ["textStyle"] }),
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
        codeBlock: { HTMLAttributes: { class: "blog-code-block" } },
        link: { openOnClick: false, HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" } },
      }),
      Underline,
      ImageExtension.configure({ inline: false, allowBase64: true }),
      Placeholder.configure({ placeholder: "Start writing…" }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight.configure({ multicolor: true }),
      Table.configure({ resizable: true }), TableRow, TableCell, TableHeader,
    ],
    content: "<p></p>",
    editorProps: {
      attributes: { style: "outline: none; min-height: 480px; padding: 20px; line-height: 1.8; font-size: 16px; color: #f5f5f5; background: #0a0a0a;" },
    },
  });

  useEffect(() => {
    if (!editor) return;
    const dom = editor.view.dom;
    const handler = (e: Event) => {
      const ev = e as ClipboardEvent;
      const html = ev.clipboardData?.getData("text/html");
      const text = ev.clipboardData?.getData("text/plain");
      if (!html && !text) return;
      ev.preventDefault();
      if (html) {
        const cleaned = html
          .replace(/<script[\s\S]*?<\/script>/gi, "")
          .replace(/<style[\s\S]*?<\/style>/gi, "")
          .replace(/<link[\s\S]*?>/gi, "")
          .replace(/<meta[\s\S]*?>/gi, "")
          .replace(/o:p[\s\S]*?<\/o:p>/gi, "")
          .replace(/xml[^>]*>/gi, "")
          .replace(/<\/?xml[^>]*>/gi, "");
        document.execCommand("insertHTML", false, cleaned);
      } else {
        document.execCommand("insertText", false, text);
      }
    };
    dom.addEventListener("paste", handler);
    return () => dom.removeEventListener("paste", handler);
  }, [editor]);

  useEffect(() => {
    if (editor && blog.content && !editor.view.dom.innerHTML.includes(blog.content.slice(0, 50))) {
      editor.view.dom.innerHTML = blog.content;
    }
  }, [editor]);

  const insertImage = useCallback(() => {
    const url = prompt("Image URL:");
    if (url && editor) editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  const insertVideo = useCallback(() => {
    const url = prompt("Video URL (YouTube/Vimeo embed or direct mp4):");
    if (!url || !editor) return;
    if (url.includes("youtube") || url.includes("youtu.be")) {
      const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
      if (m) { editor.chain().focus().insertContent(`<iframe width="100%" height="400" src="https://www.youtube.com/embed/${m[1]}" frameborder="0" allowfullscreen style="max-width:100%;border-radius:6px;"></iframe>`).run(); return; }
    }
    if (url.includes("vimeo")) {
      const m = url.match(/vimeo\.com\/(\d+)/);
      if (m) { editor.chain().focus().insertContent(`<iframe width="100%" height="400" src="https://player.vimeo.com/video/${m[1]}" frameborder="0" allowfullscreen style="max-width:100%;border-radius:6px;"></iframe>`).run(); return; }
    }
    editor.chain().focus().insertContent(`<video controls style="max-width:100%;border-radius:6px;"><source src="${url}"></video>`).run();
  }, [editor]);

  const insertLink = useCallback(() => {
    const url = prompt("Link URL:");
    if (url && editor) {
      const selected = editor.state.selection.empty;
      if (selected) { const text = prompt("Link text:") || url; editor.chain().focus().insertContent(`<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`).run(); }
      else { editor.chain().focus().setLink({ href: url }).run(); }
    }
  }, [editor]);

  const insertTable = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }, [editor]);

  const toggleHtmlView = useCallback(() => {
    if (!editor) return;
    if (showHtml) { editor.commands.setContent(htmlCode); setShowHtml(false); }
    else { setHtmlCode(editor.getHTML()); setShowHtml(true); }
  }, [editor, showHtml, htmlCode]);

  const handleSave = () => {
    if (showHtml) editor?.commands.setContent(htmlCode);
    const content = editor?.view.dom.innerHTML || "";
    if (!content || content === "<p></p>") { alert("Content is empty."); return; }
    if (!title.trim()) { alert("Title is required."); return; }
    const finalSlug = slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    onSave({ ...blog, title, slug: finalSlug, content, excerpt, published });
  };

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    const reader = new FileReader();
    reader.onload = (ev) => { editor.chain().focus().setImage({ src: ev.target?.result as string }).run(); };
    reader.readAsDataURL(file);
    e.target.value = "";
  }, [editor]);

  const setColor = useCallback((color: string) => { editor?.chain().focus().setColor(color).run(); }, [editor]);
  const setHighlight = useCallback((color: string) => { if (color === "none") editor?.chain().focus().unsetHighlight().run(); else editor?.chain().focus().toggleHighlight({ color }).run(); }, [editor]);
  const setFont = useCallback((font: string) => { editor?.chain().focus().setFontFamily(font).run(); }, [editor]);

  const contentStyle: React.CSSProperties = { maxWidth: 820, margin: "0 auto", padding: "0 12px" };

  if (!editor) return null;

  const ToolBtn = ({ onClick, label, isActive, title: t }: { onClick: () => void; label: string; isActive?: boolean; title?: string }) => (
    <button onClick={onClick} title={t || label} style={{ padding: "5px 10px", background: isActive ? "#444" : "transparent", color: "#fff", border: isActive ? "1px solid #666" : "1px solid #444", borderRadius: 3, cursor: "pointer", fontSize: 12, lineHeight: 1, whiteSpace: "nowrap" }}>{label}</button>
  );

  return (
    <div>
      {msg && <div style={{ padding: 10, background: "#193", borderRadius: 4, marginBottom: 12, textAlign: "center" }}>{msg}</div>}
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Blog title" style={{ ...input, flex: 1, fontSize: 20, fontWeight: 600, padding: "10px 12px" }} />
          <label style={{ display: "flex", alignItems: "center", gap: 6, color: "#aaa", fontSize: 13, whiteSpace: "nowrap" }}>
            <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} /> Published
          </label>
        </div>
        <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "#888", whiteSpace: "nowrap" }}>Slug:</span>
          <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="my-blog-post" style={{ ...input, flex: 1, minWidth: 150 }} />
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} style={{ display: "none" }} />
          <button onClick={() => fileInputRef.current?.click()} style={btnGhostSmall}>Upload Image</button>
        </div>
        <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Short excerpt / summary…" style={{ ...input, width: "100%", minHeight: 56, marginBottom: 12, resize: "vertical", fontFamily: "inherit" }} />
        <div style={{ border: "1px solid #333", borderRadius: 6, overflow: "hidden", marginBottom: 12, background: "#0a0a0a" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 3, padding: "6px 8px", borderBottom: "1px solid #333", background: "#151515" }}>
            <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} label="B" isActive={editor.isActive("bold")} title="Bold" />
            <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} label="I" isActive={editor.isActive("italic")} title="Italic" />
            <ToolBtn onClick={() => editor.chain().focus().toggleUnderline().run()} label="U" isActive={editor.isActive("underline")} title="Underline" />
            <ToolBtn onClick={() => editor.chain().focus().toggleStrike().run()} label="S" isActive={editor.isActive("strike")} title="Strike" />
            <span style={{ width: 1, background: "#333", margin: "0 3px" }} />
            <select onChange={(e) => { const v = e.target.value; if (v === "p") editor.chain().focus().setParagraph().run(); else editor.chain().focus().toggleHeading({ level: Number(v) as 1|2|3|4 }).run(); }} style={selectStyle} value={editor.isActive("heading", { level: 1 }) ? "1" : editor.isActive("heading", { level: 2 }) ? "2" : editor.isActive("heading", { level: 3 }) ? "3" : editor.isActive("heading", { level: 4 }) ? "4" : "p"}>
              <option value="p">Paragraph</option>
              <option value="1">H1</option><option value="2">H2</option><option value="3">H3</option><option value="4">H4</option>
            </select>
            <select onChange={(e) => setFont(e.target.value)} style={selectStyle} defaultValue=""><option value="" disabled>Font</option>{FONTS.map((f) => <option key={f} value={f}>{f}</option>)}</select>
            <input type="color" onChange={(e) => setColor(e.target.value)} title="Text color" style={{ width: 26, height: 24, padding: 0, border: "1px solid #444", borderRadius: 3, cursor: "pointer", background: "transparent" }} />
            <input type="color" onChange={(e) => setHighlight(e.target.value)} title="Highlight color" style={{ width: 26, height: 24, padding: 0, border: "1px solid #444", borderRadius: 3, cursor: "pointer", background: "transparent" }} />
            <span style={{ width: 1, background: "#333", margin: "0 3px" }} />
            <ToolBtn onClick={() => editor.chain().focus().setTextAlign("left").run()} label="←" isActive={editor.isActive({ textAlign: "left" })} title="Align left" />
            <ToolBtn onClick={() => editor.chain().focus().setTextAlign("center").run()} label="↔" isActive={editor.isActive({ textAlign: "center" })} title="Center" />
            <ToolBtn onClick={() => editor.chain().focus().setTextAlign("right").run()} label="→" isActive={editor.isActive({ textAlign: "right" })} title="Align right" />
            <ToolBtn onClick={() => editor.chain().focus().setTextAlign("justify").run()} label="↔↔" isActive={editor.isActive({ textAlign: "justify" })} title="Justify" />
            <span style={{ width: 1, background: "#333", margin: "0 3px" }} />
            <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} label="•" isActive={editor.isActive("bulletList")} title="Bullet list" />
            <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} label="1." isActive={editor.isActive("orderedList")} title="Numbered list" />
            <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} label="❝" isActive={editor.isActive("blockquote")} title="Quote" />
            <ToolBtn onClick={() => editor.chain().focus().toggleCode().run()} label="<>" isActive={editor.isActive("code")} title="Inline code" />
            <ToolBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} label="{ }" isActive={editor.isActive("codeBlock")} title="Code block" />
            <ToolBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} label="—" title="Horizontal rule" />
            <ToolBtn onClick={() => editor.chain().focus().setHardBreak().run()} label="↵" title="Line break" />
            <span style={{ width: 1, background: "#333", margin: "0 3px" }} />
            <ToolBtn onClick={insertTable} label="⊞" isActive={editor.isActive("table")} title="Insert table" />
            <ToolBtn onClick={() => editor.chain().focus().addRowAfter().run()} label="R+" title="Add row" />
            <ToolBtn onClick={() => editor.chain().focus().addColumnAfter().run()} label="C+" title="Add column" />
            <ToolBtn onClick={() => editor.chain().focus().deleteRow().run()} label="R−" title="Delete row" />
            <ToolBtn onClick={() => editor.chain().focus().deleteColumn().run()} label="C−" title="Delete column" />
            <ToolBtn onClick={() => editor.chain().focus().deleteTable().run()} label="⊞−" title="Delete table" />
            <ToolBtn onClick={() => editor.chain().focus().toggleHeaderRow().run()} label="Hdr" isActive={editor.isActive("headerRow")} title="Toggle header row" />
            <span style={{ width: 1, background: "#333", margin: "0 3px" }} />
            <ToolBtn onClick={insertImage} label="🖼" title="Image from URL" />
            <ToolBtn onClick={insertVideo} label="▶" title="Video embed" />
            <ToolBtn onClick={insertLink} label="🔗" isActive={editor.isActive("link")} title="Insert link" />
            <ToolBtn onClick={() => editor.chain().focus().unsetLink().run()} label="🔗−" title="Remove link" />
            <div style={{ marginLeft: "auto", display: "flex", gap: 3 }}>
              <button onClick={() => { editor.chain().focus().undo().run(); }} style={btnGhostSmall} title="Undo">↩</button>
              <button onClick={() => { editor.chain().focus().redo().run(); }} style={btnGhostSmall} title="Redo">↪</button>
              <button onClick={() => setShowPreview(!showPreview)} style={{ ...btnGhostSmall, background: showPreview ? "#333" : "transparent" }}>{showPreview ? "✎" : "👁"}</button>
              <button onClick={toggleHtmlView} style={{ ...btnGhostSmall, background: showHtml ? "#333" : "transparent" }} title="HTML">{showHtml ? "✎" : "&lt;/&gt;"}</button>
            </div>
          </div>
          {showHtml ? (
            <textarea value={htmlCode} onChange={(e) => setHtmlCode(e.target.value)} style={{ width: "100%", minHeight: 480, padding: 16, background: "#0a0a0a", color: "#0f0", border: "none", fontFamily: "monospace", fontSize: 13, lineHeight: 1.5, resize: "vertical" }} />
          ) : showPreview ? (
            <div style={{ padding: 20, minHeight: 480, background: "#0a0a0a", color: "#f5f5f5", lineHeight: 1.8, fontSize: 16, overflow: "auto" }}>
              <div className="blog-content" style={contentStyle} dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />
            </div>
          ) : (
            <EditorContent editor={editor} />
          )}
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onCancel} style={btnGhost}>Cancel</button>
          <button onClick={handleSave} disabled={saving} style={btnPrimary}>{saving ? "Saving…" : "Save Blog"}</button>
        </div>
      </div>
    </div>
  );
}

const selectStyle: React.CSSProperties = { padding: "4px 6px", background: "#222", color: "#fff", border: "1px solid #444", borderRadius: 3, fontSize: 12, cursor: "pointer", maxWidth: 120 };
const input: React.CSSProperties = { padding: "8px 10px", background: "#0a0a0a", color: "#fff", border: "1px solid #333", borderRadius: 4 };
const btnPrimary: React.CSSProperties = { background: "#e50914", color: "#fff", border: 0, padding: "8px 16px", borderRadius: 4, cursor: "pointer", fontWeight: 600 };
const btnGhost: React.CSSProperties = { background: "transparent", color: "#fff", border: "1px solid #444", padding: "6px 14px", borderRadius: 4, cursor: "pointer", fontWeight: 500 };
const btnGhostSmall: React.CSSProperties = { background: "transparent", color: "#fff", border: "1px solid #444", padding: "4px 8px", borderRadius: 3, cursor: "pointer", fontSize: 12, lineHeight: 1 };
