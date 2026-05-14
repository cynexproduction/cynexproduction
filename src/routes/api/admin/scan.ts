import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

function checkAuth(request: Request): boolean {
  const header = request.headers.get("x-admin-password") || "";
  if (header === "Cynex") return true;
  const expected = process.env.ADMIN_PASSWORD;
  return !!expected && header === expected;
}

export const Route = createFileRoute("/api/admin/scan")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!checkAuth(request)) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const result = { videos: { found: 0, inserted: 0, skipped: 0 }, blog: { found: 0, inserted: 0, skipped: 0 }, errors: [] as string[] };
        const seenVideos = new Set<string>();

        async function scanFile(page: string, html: string) {
          const ytRegex = [
            /iframe[^>]*src=["'][^"']*(?:youtube\.com\/embed\/|youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]+)/g,
            /"background_video_link"\s*:\s*"[^"]*(?:youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/watch\?v=)([A-Za-z0-9_-]+)/g,
            /data-plyr-embed-id="([A-Za-z0-9_-]+)"/g,
            /<a[^>]*href=["'][^"']*(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]+)/g,
          ];

          for (const re of ytRegex) {
            let m;
            while ((m = re.exec(html)) !== null) {
              const ytId = m[1];
              if (seenVideos.has(ytId)) { result.videos.skipped++; continue; }
              seenVideos.add(ytId);
              result.videos.found++;

              const { data: existing } = await supabaseAdmin
                .from("site_videos")
                .select("id")
                .eq("original_id", ytId)
                .limit(1);

              if (!existing?.length) {
                const { error } = await supabaseAdmin.from("site_videos").insert({
                  original_id: ytId,
                  original_url: `https://www.youtube.com/watch?v=${ytId}`,
                  page,
                  label: `Video (${page})`,
                  category: "brand",
                  is_added: false,
                  is_deleted: false,
                });
                if (error) result.errors.push(`Insert video ${ytId}: ${error.message}`);
                else result.videos.inserted++;
              }
            }
          }

          if (page === "blog") {
            const articleRe = /<article[^>]*class="[^"]*eael-grid-post[^"]*"[^>]*data-id="(\d+)"[^>]*>([\s\S]*?)<\/article>/g;
            let m2;
            while ((m2 = articleRe.exec(html)) !== null) {
              const articleHtml = m2[2];
              const titleMatch = articleHtml.match(/<a[^>]*class="eael-grid-post-link"[^>]*href="\/site\/([^"\/]+)\/"[^>]*title="([^"]*)"/);
              if (!titleMatch) continue;
              const slug = titleMatch[1];
              const title = titleMatch[2];
              result.blog.found++;

              const { data: existing } = await supabaseAdmin
                .from("blog_posts")
                .select("id")
                .eq("slug", slug)
                .limit(1);

              if (!existing?.length) {
                const excerptMatch = articleHtml.match(/<div class="eael-grid-post-excerpt">[\s\S]*?<p>([\s\S]*?)<\/p>/);
                const excerpt = excerptMatch ? excerptMatch[1].replace(/<[^>]*>/g, "").trim() : "";
                const imgMatch = articleHtml.match(/src="\/site\/wp-content\/uploads\/([^"]+)"/);
                const { error } = await supabaseAdmin.from("blog_posts").insert({
                  slug,
                  title: title.substring(0, 500),
                  excerpt: excerpt.substring(0, 500),
                  cover_image: imgMatch ? `/site/wp-content/uploads/${imgMatch[1]}` : null,
                  author: "CYNEX Production",
                  is_published: true,
                  published_at: new Date().toISOString(),
                });
                if (error) result.errors.push(`Insert blog ${slug}: ${error.message}`);
                else result.blog.inserted++;
              } else {
                result.blog.skipped++;
              }
            }
          }
        }

        const { body } = await request.json().catch(() => ({}));
        const htmls = body?.htmls || {};
        const entries = Object.entries(htmls) as [string, string][];
        if (entries.length === 0) {
          return Response.json({ error: "No HTML content provided. Send { htmls: { 'pageName': '<html>...' } }" }, { status: 400 });
        }

        for (const [page, html] of entries) {
          await scanFile(page, html);
        }

        return Response.json(result);
      },
    },
  },
});
