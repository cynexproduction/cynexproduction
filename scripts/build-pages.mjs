// Generates a TSX route per kept page that iframes the original static HTML,
// extracting <title>/<meta name=description> for proper head() metadata.
// Visuals are 100% identical (same HTML, CSS, JS served from /public/site).
import fs from "node:fs";
import path from "node:path";

const ROUTES = [
  { route: "/", file: "index.html" },
  { route: "/about", file: "about.html" },
  { route: "/contact", file: "contact.html" },
  { route: "/enquiry", file: "enquiry.html" },
  { route: "/blog", file: "blog.html" },
  { route: "/career", file: "career/index.html" },
  { route: "/brand-videos", file: "brand-video-production-services-in-bangalore/index.html" },
  { route: "/ad-films", file: "ad-films-maker-in-bangalore/index.html" },
  { route: "/corporate", file: "avatar-corporate-films/index.html" },
  { route: "/animation", file: "avatar-motion-graphics/index.html" },
  { route: "/documentary", file: "documentary-film-maker-in-bangalore/index.html" },
  { route: "/explainer-videos", file: "explainer-video-production-in-bangalore/index.html" },
  { route: "/music-videos", file: "music-video-production-services-in-bangalore.html" },
  { route: "/video-production", file: "video-production/index.html" },
  { route: "/creative-agency", file: "creative-agency-and-digital-agency/index.html" },
  { route: "/privacy-policy", file: "privacy-policy/index.html" },
  { route: "/terms", file: "terms-and-conditions/index.html" },
  { route: "/refund-policy", file: "refund-policy/index.html" },
  { route: "/cookie-policy", file: "cookie-policy/index.html" },
];

function esc(s) {
  return String(s || "")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, " ")
    .trim();
}

function extractMeta(html) {
  const t = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const d = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
  return {
    title: t ? t[1].replace(/\s+/g, " ").trim() : "CYNEX Production",
    description: d
      ? d[1].trim()
      : "CYNEX Production - Video production company in Rajkot & Ahmedabad.",
  };
}

function routeFileName(route) {
  if (route === "/") return "index.tsx";
  return route.replace(/^\//, "").replace(/\//g, ".") + ".tsx";
}

const tpl = ({ route, src, title, description }) => `import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("${route}")({
  component: Page,
  head: () => ({
    meta: [
      { title: "${esc(title)}" },
      { name: "description", content: "${esc(description)}" },
      { property: "og:title", content: "${esc(title)}" },
      { property: "og:description", content: "${esc(description)}" },
    ],
  }),
});

function Page() {
  return (
    <iframe
      src="${src}"
      title="${esc(title)}"
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", border: 0 }}
    />
  );
}
`;

const outDir = "src/routes";
for (const r of ROUTES) {
  const html = fs.readFileSync(path.join("public/site", r.file), "utf8");
  const meta = extractMeta(html);
  const src = "/site/" + r.file;
  const code = tpl({ route: r.route, src, title: meta.title, description: meta.description });
  const out = path.join(outDir, routeFileName(r.route));
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, code);
  console.log("wrote", out);
}
