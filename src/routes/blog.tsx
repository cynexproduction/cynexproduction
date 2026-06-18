import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { db } from "@/integrations/firebase/client";
import { collection, query, where, orderBy, getDocs, limit } from "firebase/firestore";
import { Header, Footer } from "@/components/Layout";
import { VideoSection } from "@/components/VideoSection";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  created_at: string;
};

export const Route = createFileRoute("/blog")({
  component: BlogPage,
  head: () => ({
    meta: [
      { title: "Blog — CYNEX Production" },
      { name: "description", content: "Insights on video production, brand storytelling, animation, and creative strategy from CYNEX Production." },
    ],
    links: [{ rel: "canonical", href: '/blog' }],
  }),
});

function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "blogs"),
      where("published", "==", true),
      orderBy("created_at", "desc"),
      limit(20),
    );
    getDocs(q).then((snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as BlogPost)));
      setLoading(false);
    }).catch((err) => {
      console.error("Blog fetch error:", err);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-[Poppins,sans-serif]">
      <Header />

      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-[70px]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black z-10" />
        <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Our <span className="text-primary">Blog</span>
          </h1>
          <p className="text-lg md:text-xl text-[#999] mb-8 max-w-2xl mx-auto">
            Insights, guides, and stories from the world of video production, brand storytelling, and creative strategy.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="px-4">
          <div className="max-w-4xl mx-auto">
            {loading ? (
              <div className="text-center text-[#999] py-12">Loading posts…</div>
            ) : posts.length === 0 ? (
              <div className="text-center text-[#999] py-12">
                <h2 className="text-[34px] leading-[45px] font-semibold text-[#101010] mb-4">No Posts Yet</h2>
                <p className="text-[#7A7A7A]">Check back soon for new articles and insights.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="block bg-white border border-[#ddd] rounded-lg p-6 hover:border-primary transition-colors group"
                  >
                    <div className="text-xs text-[#999] uppercase tracking-wider mb-2">
                      {new Date(post.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </div>
                    <h2 className="text-xl font-semibold text-[#101010] group-hover:text-primary transition-colors mb-2">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm text-[#666]">{post.excerpt}</p>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <VideoSection page="/blog" />
      <Footer />
    </div>
  );
}
