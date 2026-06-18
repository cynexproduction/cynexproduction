import { useEffect, useState } from "react";
import { db } from "@/integrations/firebase/client";
import { collection, query, where, getDocs } from "firebase/firestore";

type VideoSlot = { title: string | null; video_id: string };

export function VideoSection({ page }: { page: string }) {
  const [videos, setVideos] = useState<VideoSlot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const q = query(collection(db, "video_slots"), where("slot_key", "==", page));
    getDocs(q)
      .then((snapshot) => {
        if (cancelled) return;
        const result: VideoSlot[] = [];
        snapshot.docs.forEach((d) => {
          const data = d.data();
          const url: string = data.youtube_url || "";
          const id = extractYoutubeId(url);
          if (id) {
            result.push({ title: data.title || null, video_id: id });
          }
        });
        setVideos(result);
        setLoading(false);
      })
      .catch((err) => {
        console.error("VideoSection error:", err);
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [page]);

  if (loading || videos.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        {videos.length === 1 ? (
          <div className="text-center">
            {videos[0].title && (
              <h2 className="text-[34px] leading-[45px] font-semibold text-white mb-8">{videos[0].title}</h2>
            )}
            <div className="relative w-full max-w-5xl mx-auto" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={`https://www.youtube.com/embed/${videos[0].video_id}`}
                title={videos[0].title || "YouTube video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full rounded-lg"
                style={{ border: "none" }}
              />
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {videos.map((v, i) => (
              <div key={i} className="text-center">
                {v.title && (
                  <h3 className="text-xl font-semibold text-white mb-4">{v.title}</h3>
                )}
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${v.video_id}`}
                    title={v.title || "YouTube video"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full rounded-lg"
                    style={{ border: "none" }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function extractYoutubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/,
    /youtube\.com\/embed\/([\w-]+)/,
    /youtube\.com\/shorts\/([\w-]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}
