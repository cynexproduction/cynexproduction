import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import https from "node:https";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const LIVE_ORIGIN = "https://www.avatarstudios.in";
const SITE_DIR = path.resolve(__dirname, "public/site");

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    {
      name: "api-middleware",
      configureServer(server) {
        // Simple built-in JSON API
        server.middlewares.use((req, res, next) => {
          if (!req.url?.startsWith("/api/")) return next();

          const dbPath = path.resolve(__dirname, "database.json");

          if (req.url === "/api/public/videos" && req.method === "GET") {
            try {
              const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
              // Return only items that have overrides or are explicitly tracked
              const items = db.videos || [];
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ items }));
            } catch (e) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: "Database error" }));
            }
            return;
          }

          if (req.url === "/api/admin/login" && req.method === "POST") {
            let body = "";
            req.on("data", (chunk) => (body += chunk.toString()));
            req.on("end", () => {
              try {
                const { password } = JSON.parse(body);
                const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
                if (password === db.admin_password) {
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({ success: true }));
                } else {
                  res.statusCode = 401;
                  res.end(JSON.stringify({ success: false, error: "Invalid password" }));
                }
              } catch (e) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: "Invalid request" }));
              }
            });
            return;
          }

          if (req.url === "/api/admin/videos" && req.method === "GET") {
            try {
              const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(db));
            } catch (e) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: "Database error" }));
            }
            return;
          }

          if (req.url === "/api/admin/videos" && req.method === "POST") {
            let body = "";
            req.on("data", (chunk) => (body += chunk.toString()));
            req.on("end", async () => {
              try {
                const update = JSON.parse(body);
                const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
                const video = db.videos.find((v: any) => v.id === update.id);

                if (!video) {
                  res.statusCode = 404;
                  return res.end(JSON.stringify({ error: "Video not found" }));
                }

                if (update.permanent_delete) {
                  // Permanently delete from HTML file
                  const cheerio = await import("cheerio");
                  const filePath = path.join(SITE_DIR, video.page);
                  if (fs.existsSync(filePath)) {
                    const html = fs.readFileSync(filePath, "utf-8");
                    const $ = cheerio.load(html);

                    if (video.is_elementor && video.elementor_id) {
                      // Remove Elementor widget completely
                      $(`[data-id="${video.elementor_id}"]`).remove();
                    } else if (video.original_id) {
                      // Remove standard iframe
                      $("iframe").each((i, el) => {
                        const src = $(el).attr("src") || "";
                        if (src.includes(video.original_id)) {
                          $(el).closest("figure, .wp-block-embed, p, div").remove();
                        }
                      });
                    }

                    fs.writeFileSync(filePath, $.html());
                  }

                  // Remove from DB
                  db.videos = db.videos.filter((v: any) => v.id !== video.id);
                  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

                  res.setHeader("Content-Type", "application/json");
                  return res.end(JSON.stringify({ success: true, deleted: true }));
                }

                if (update.permanent_save) {
                  // Permanently save to HTML file
                  const cheerio = await import("cheerio");
                  const filePath = path.join(SITE_DIR, video.page);
                  if (fs.existsSync(filePath)) {
                    const html = fs.readFileSync(filePath, "utf-8");
                    const $ = cheerio.load(html);
                    const newUrl = update.override_url || video.original_url;

                    if (video.is_elementor && video.elementor_id) {
                      const el = $(`[data-id="${video.elementor_id}"]`);
                      let settingsStr = el.attr("data-settings") || "{}";
                      try {
                        const decoded = settingsStr.replace(/&quot;/g, '"');
                        const settings = JSON.parse(decoded);
                        if (settings.youtube_url) settings.youtube_url = newUrl;
                        if (settings.url) settings.url = newUrl;
                        if (settings.video_link) settings.video_link = newUrl;
                        el.attr("data-settings", JSON.stringify(settings).replace(/"/g, "&quot;"));
                      } catch (e) {}
                    } else if (video.original_id) {
                      $("iframe").each((i, el) => {
                        const src = $(el).attr("src") || "";
                        if (src.includes(video.original_id)) {
                          $(el).attr("src", newUrl);
                        }
                      });
                    }
                    fs.writeFileSync(filePath, $.html());
                    video.original_url = newUrl; // Update original in DB too
                  }
                }

                // Normal update (always sync DB)
                video.override_url = update.override_url;
                video.is_deleted = update.is_deleted;
                fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ success: true, video }));
              } catch (e) {
                console.error(e);
                res.statusCode = 500;
                res.end(JSON.stringify({ error: "Invalid request" }));
              }
            });
            return;
          }

          next();
        });
      },
    },
    {
      name: "site-rewrite-and-proxy",
      configureServer(server) {
        // 1. Rewrite root-level requests to /site/* so files are served
        //    without the /site prefix.
        //    e.g.  /index.html                → /site/index.html
        //          /ad-films-maker-in-bangalore.html → /site/ad-films-maker-in-bangalore.html
        //          /some-directory/            → /site/some-directory/index.html
        //    Requests that already start with /site/ are left alone.
        //    Asset paths (/wp-content/, /wp-includes/) are also left alone.
        server.middlewares.use((req, _res, next) => {
          const url = req.url ?? "/";

          const skip =
            url.startsWith("/site/") ||
            url.startsWith("/wp-content/") ||
            url.startsWith("/wp-includes/") ||
            url.startsWith("/@") || // Vite internals
            url.startsWith("/__") || // Vite internals
            url.startsWith("/api/") || // API routes
            url.startsWith("/cynex-runtime.js");

          if (skip) return next();

          // Map root path to /site/index.html
          if (url === "/" || url === "/index.html") {
            req.url = "/site/index.html";
            return next();
          }

          // Map /<something>.html or /<dir>/ → /site/<something>
          // Only if the file actually exists under SITE_DIR
          const stripped = url.split("?")[0]; // drop query string
          const candidate = path.join(SITE_DIR, stripped);
          const candidateHtml = path.join(SITE_DIR, stripped.replace(/\/?$/, "/index.html"));

          if (fs.existsSync(candidate) || fs.existsSync(candidateHtml)) {
            req.url = "/site" + url;
          }

          next();
        });

        // 2. Inject cynex-runtime.js into HTML responses
        server.middlewares.use((req, res, next) => {
          const url = req.url ?? "/";
          if (url.startsWith("/site/") && (url.endsWith(".html") || url.endsWith("/"))) {
            // Calculate actual file path relative to SITE_DIR
            // url starts with /site/, so we strip it.
            const relativePath = url.slice(6);
            const filePath = path.join(
              SITE_DIR,
              relativePath.endsWith("/") ? relativePath + "index.html" : relativePath,
            );

            if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
              try {
                let html = fs.readFileSync(filePath, "utf-8");
                if (html.includes("</body>")) {
                  html = html.replace(
                    "</body>",
                    '<script src="/cynex-runtime.js"></script></body>',
                  );
                } else {
                  html += '<script src="/cynex-runtime.js"></script>';
                }
                res.setHeader("Content-Type", "text/html");
                res.end(html);
                return;
              } catch (e) {
                console.error("Error serving HTML:", e);
              }
            }
          }
          next();
        });

        // 3. Fallback proxy — if a /site/wp-* asset is missing locally,
        //    fetch it transparently from the live site.
        server.middlewares.use((req, res, next) => {
          const url = req.url ?? "/";
          const isAsset = /^\/(site\/)?(wp-(?:content|includes))\//.test(url);
          if (!isAsset) return next();

          // Build upstream path: strip /site prefix if present
          const upstreamPath = url.replace(/^\/site\//, "/");
          const target = new URL(upstreamPath, LIVE_ORIGIN);

          const fetcher = target.protocol === "https:" ? https : http;
          fetcher
            .get(target.href, { headers: { "User-Agent": "Mozilla/5.0" } }, (upstream) => {
              if (!upstream.statusCode || upstream.statusCode >= 400) {
                return next();
              }
              res.statusCode = upstream.statusCode;
              const ct = upstream.headers["content-type"];
              if (ct) res.setHeader("Content-Type", ct);
              res.setHeader("Access-Control-Allow-Origin", "*");
              res.setHeader("Cache-Control", "public, max-age=86400");
              upstream.pipe(res);
            })
            .on("error", () => next());
        });
      },
    },
  ],
  server: {
    port: 8080,
    host: "::",
  },
});
