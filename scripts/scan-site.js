import { createClient } from "@supabase/supabase-js";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SITE_DIR = path.join(ROOT, "public/site");

const supabase = createClient(
  process.env.SUPABASE_URL || "https://bazbplwmmncegjgkyrhf.supabase.co",
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY,
);

function getPageName(filePath) {
  const rel = path.relative(SITE_DIR, filePath).replace(/\\/g, "/");
  if (rel === "index.html") return "home";
  if (rel.endsWith("/index.html")) return rel.replace(/\/index\.html$/, "");
  if (rel.endsWith(".html")) return rel.replace(/\.html$/, "");
  return rel;
}

function extractYouTubeIds(html) {
  const ids = new Set();
  let m;

  const re1 = /iframe[^>]*src=["'][^"']*(?:youtube\.com\/embed\/|youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]+)/g;
  while ((m = re1.exec(html)) !== null) ids.add(m[1]);

  const re2 = /"background_video_link"\s*:\s*"[^"]*(?:youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/watch\?v=)([A-Za-z0-9_-]+)/g;
  while ((m = re2.exec(html)) !== null) ids.add(m[1]);

  const re3 = /data-plyr-embed-id="([A-Za-z0-9_-]+)"/g;
  while ((m = re3.exec(html)) !== null) ids.add(m[1]);

  const re4 = /<a[^>]*href=["'][^"']*(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]+)/g;
  while ((m = re4.exec(html)) !== null) ids.add(m[1]);

  const re5 = /data-settings="([^"]*)"/g;
  while ((m = re5.exec(html)) !== null) {
    try {
      const decoded = m[1].replace(/&quot;/g, '"');
      const settings = JSON.parse(decoded);
      for (const key of ["youtube_url", "video_link", "url"]) {
        if (settings[key]) {
          const urlMatch = settings[key].match(/(?:youtube\.com\/embed\/|youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]+)/);
          if (urlMatch) ids.add(urlMatch[1]);
        }
      }
    } catch (e) {}
  }

  return Array.from(ids);
}

async function scanVideos() {
  console.log("\n=== Scanning Videos ===");
  let found = 0, inserted = 0;

  function scanDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory() && !entry.name.startsWith(".")) {
        scanDir(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(".html") && !fullPath.includes("\\admin\\") && !fullPath.includes("/admin/")) {
        try {
          const html = fs.readFileSync(fullPath, "utf-8");
          const ids = extractYouTubeIds(html);
          const page = getPageName(fullPath);
          for (const ytId of ids) {
            found++;
            console.log(`  Found video: ${ytId} on page: ${page}`);
          }
        } catch (e) {
          console.error(`  Error reading ${fullPath}: ${e.message}`);
        }
      }
    }
  }

  scanDir(SITE_DIR);
  console.log(`\nTotal unique video IDs found across all pages: ${found}\n`);

  return { found, inserted };
}

async function scanBlogPosts() {
  console.log("\n=== Scanning Blog Posts ===");
  const blogHtmlPath = path.join(SITE_DIR, "blog.html");
  if (!fs.existsSync(blogHtmlPath)) {
    console.log("  blog.html not found, skipping");
    return { found: 0, inserted: 0 };
  }

  const html = fs.readFileSync(blogHtmlPath, "utf-8");
  const posts = [];
  const articleRe = /<article[^>]*class="[^"]*eael-grid-post[^"]*"[^>]*data-id="(\d+)"[^>]*>([\s\S]*?)<\/article>/g;
  let m;

  while ((m = articleRe.exec(html)) !== null) {
    const articleHtml = m[2];
    const wpId = m[1];

    const titleMatch = articleHtml.match(/<a[^>]*class="eael-grid-post-link"[^>]*href="\/site\/([^"\/]+)\/"[^>]*title="([^"]*)"/);
    if (!titleMatch) continue;
    const slug = titleMatch[1];
    const title = titleMatch[2];

    const excerptMatch = articleHtml.match(/<div class="eael-grid-post-excerpt">[\s\S]*?<p>([\s\S]*?)<\/p>/);
    const excerpt = excerptMatch ? excerptMatch[1].replace(/<[^>]*>/g, "").trim() : "";

    const imgMatch = articleHtml.match(/src="\/site\/wp-content\/uploads\/([^"]+)"/);
    const coverImage = imgMatch ? `/site/wp-content/uploads/${imgMatch[1]}` : null;

    posts.push({ wpId, slug, title, excerpt, coverImage });
  }

  console.log(`  Found ${posts.length} blog posts in blog.html`);
  for (const p of posts) {
    console.log(`  Blog: "${p.title}" -> /site/${p.slug}/`);
  }

  return posts;
}

async function pushToSupabase(videos, posts) {
  console.log("\n=== Pushing to Supabase ===");

  if (videos.length > 0) {
    console.log(`\n  Inserting ${videos.length} videos...`);
    for (const v of videos) {
      const { data: existing } = await supabase
        .from("site_videos")
        .select("id")
        .eq("original_id", v.original_id)
        .limit(1);
      if (!existing || existing.length === 0) {
        const { error } = await supabase.from("site_videos").insert({
          original_id: v.original_id,
          original_url: `https://www.youtube.com/watch?v=${v.original_id}`,
          page: v.page,
          label: v.label,
          category: v.category || "brand",
          is_added: false,
          is_deleted: false,
        });
        if (error) console.error(`    Error inserting video ${v.original_id}: ${error.message}`);
        else console.log(`    + Inserted video: ${v.original_id} (${v.page})`);
      } else {
        console.log(`    = Already exists: ${v.original_id}`);
      }
    }
  }

  if (posts.length > 0) {
    console.log(`\n  Inserting ${posts.length} blog posts...`);
    for (const p of posts) {
      const { data: existing } = await supabase
        .from("blog_posts")
        .select("id")
        .eq("slug", p.slug)
        .limit(1);
      if (!existing || existing.length === 0) {
        const { error } = await supabase.from("blog_posts").insert({
          slug: p.slug,
          title: p.title.substring(0, 500),
          excerpt: p.excerpt.substring(0, 500),
          cover_image: p.coverImage,
          author: "CYNEX Production",
          is_published: true,
          published_at: new Date().toISOString(),
        });
        if (error) console.error(`    Error inserting blog ${p.slug}: ${error.message}`);
        else console.log(`    + Inserted blog: "${p.title}"`);
      } else {
        console.log(`    = Already exists: "${p.title}"`);
      }
    }
  }

  console.log("\n=== Done ===");
}

async function main() {
  const action = process.argv[2] || "all";
  const allVideos = [];
  const allPosts = [];

  const { found } = await scanVideos();

  if (action === "videos" || action === "all") {
    function scanDirForVideos(dir) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory() && !entry.name.startsWith(".") && entry.name !== "admin") {
          scanDirForVideos(fullPath);
        } else if (entry.isFile() && entry.name.endsWith(".html") && !fullPath.includes("\\admin\\") && !fullPath.includes("/admin/")) {
          try {
            const html = fs.readFileSync(fullPath, "utf-8");
            const ids = extractYouTubeIds(html);
            const page = getPageName(fullPath);
            for (const ytId of ids) {
              if (!allVideos.find(v => v.original_id === ytId)) {
                allVideos.push({ original_id: ytId, page, label: `Video (${page})`, category: "brand" });
              }
            }
          } catch (e) {}
        }
      }
    }
    scanDirForVideos(SITE_DIR);
  }

  if (action === "blog" || action === "all") {
    const posts = await scanBlogPosts();
    allPosts.push(...posts);
  }

  if (action === "all" || action === "push") {
    await pushToSupabase(allVideos, allPosts);
  }

  console.log(`\nSummary: ${allVideos.length} unique videos, ${allPosts.length} blog posts found.`);
}

main().catch(console.error);
