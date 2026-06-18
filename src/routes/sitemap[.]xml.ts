import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "";

const PATHS = [
  "/",
  "/about",
  "/contact",
  "/enquiry",
  "/studio-rental",
  "/blog",
  "/ad-films-maker",
  "/animation-videos",
  "/brand-video-production-services",
  "/documentary-film-maker",
  "/explainer-video-production",
  "/music-video-production-services",
  "/video-production-company",
  "/corporate-films",
  "/motion-graphics",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = PATHS.map(
          (p) =>
            `  <url>\n    <loc>${BASE_URL}${p}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`,
        ).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
