import { createFileRoute, Link, useParams, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { db } from "@/integrations/firebase/client";
import { collection, query, where, getDocs } from "firebase/firestore";
import { SiteHeader, SiteFooter } from "@/components/SiteLayout";
import { VideoSection } from "@/components/VideoSection";

type Blog = {
  id: string; title: string; slug: string; content: string;
  excerpt: string | null; featured_image: string | null; published: boolean; created_at: string; updated_at: string;
};

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPostPage,
});

function BlogPostPage() {
  const { slug } = useParams({ from: "/blog/$slug" });
  const router = useRouter();
  const [post, setPost] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    const q = query(collection(db, "blogs"), where("slug", "==", slug));
    getDocs(q).then((snapshot) => {
      const match = snapshot.docs.find((d) => d.data().published === true);
      if (!match) {
        setLoading(false);
        return;
      }
      setPost({ id: match.id, ...match.data() } as Blog);
      setLoading(false);
    }).catch((err) => {
      console.error("Blog post fetch error:", err);
      setError(err.message || "Failed to load post");
      setLoading(false);
    });
  }, [slug]);

  useEffect(() => {
    if (post) document.title = `${post.title} — CYNEX Production`;
  }, [post]);

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", color: "#666", fontSize: 18 }}>Loading…</div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: 60, color: "#e50914" }}>
        <p style={{ fontSize: 18 }}>Failed to load post.</p>
        <p style={{ fontSize: 14, color: "#888", marginTop: 8 }}>{error}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#f5f5f5" }}>
        <SiteHeader />
        <div style={{ textAlign: "center", padding: "80px 20px" }}>
          <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 12 }}>Post not found</h1>
          <p style={{ color: "#999", marginBottom: 24 }}>This blog post may have been removed or is no longer available.</p>
          <Link to="/blog" style={{ color: "#e50914", textDecoration: "none", fontWeight: 600 }}>← Back to Blog</Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#f5f5f5" }}>
      <SiteHeader />
      <div style={{ padding: "40px 20px 20px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ fontSize: 14, color: "#999", marginBottom: 16 }}>
          <Link to="/" style={{ color: "#999", textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 8px", color: "#555" }}>›</span>
          <Link to="/blog" style={{ color: "#999", textDecoration: "none" }}>Blog</Link>
          <span style={{ margin: "0 8px", color: "#555" }}>›</span>
          <span style={{ color: "#fff" }}>{post.title}</span>
        </div>
        <div style={{ fontSize: 13, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>
          {new Date(post.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </div>
        {post.featured_image && (
          <div style={{ margin: "0 0 24px", borderRadius: 8, overflow: "hidden", maxHeight: 480 }}>
            <img src={post.featured_image} alt="" style={{ width: "100%", height: "auto", maxHeight: 480, objectFit: "cover", display: "block" }} />
          </div>
        )}
        <h1 style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.3, margin: "0 0 16px", letterSpacing: "-0.5px" }}>
          {post.title}
        </h1>
        <div style={{ width: 60, height: 3, background: "#e50914" }} />
      </div>

      <div style={{ padding: "40px 20px 80px", maxWidth: 900, margin: "0 auto" }}>
        <div
          className="blog-content"
          style={{
            fontSize: 16,
            lineHeight: 1.8,
            color: "#d0d0d0",
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      <div style={{ borderTop: "1px solid #333", padding: "40px 20px", textAlign: "center" }}>
        <Link to="/blog" style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          color: "#e50914", textDecoration: "none", fontWeight: 600, fontSize: 15,
        }}>
          ← Back to Blog
        </Link>
      </div>
      <VideoSection page="/blog" />
      <SiteFooter />
    </div>
  );
}
