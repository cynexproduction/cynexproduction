/**
 * Rewrites every tracked YouTube embed in public/site (per database.json)
 * to cycle through video IDs listed in channel-videos.json.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as cheerio from "cheerio";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const SITE_DIR = path.join(root, "public", "site");

function inferFormat(url) {
  if (!url || typeof url !== "string") return "watch";
  if (url.includes("youtu.be/")) return "short";
  if (url.includes("/embed/")) return "embed";
  return "watch";
}

function urlFor(format, id) {
  if (format === "short") return `https://youtu.be/${id}`;
  if (format === "embed") return `https://www.youtube.com/embed/${id}`;
  return `https://www.youtube.com/watch?v=${id}`;
}

function patchSettingsObject(settings, oldId, newId) {
  let changed = false;
  for (const key of Object.keys(settings)) {
    const v = settings[key];
    if (typeof v === "string" && v.includes(oldId)) {
      const fmt = inferFormat(v);
      settings[key] = urlFor(fmt, newId);
      changed = true;
    }
  }
  return changed;
}

function applyVideoReplace($, video, oldId, newId) {
  const patchIframe = ($root) => {
    $root.find("iframe").each((_i, iframe) => {
      const src = $(iframe).attr("src") || "";
      if (!src.includes(oldId)) return;
      const fmt = inferFormat(src);
      $(iframe).attr("src", urlFor(fmt, newId));
    });
  };

  if (video.is_elementor && video.elementor_id) {
    const widget = $(`[data-id="${video.elementor_id}"]`);
    if (!widget.length) return;
    const settingsStr = widget.attr("data-settings");
    if (settingsStr) {
      try {
        const decoded = settingsStr.replace(/&quot;/g, '"');
        const settings = JSON.parse(decoded);
        if (patchSettingsObject(settings, oldId, newId)) {
          widget.attr("data-settings", JSON.stringify(settings).replace(/"/g, "&quot;"));
        }
      } catch {
        /* ignore */
      }
    }
    patchIframe(widget);
    return;
  }

  $("iframe").each((_i, iframe) => {
    const src = $(iframe).attr("src") || "";
    if (!src.includes(oldId)) return;
    const fmt = inferFormat(src);
    $(iframe).attr("src", urlFor(fmt, newId));
  });
}

const channel = JSON.parse(fs.readFileSync(path.join(root, "channel-videos.json"), "utf8"));
const ids = channel.videos.map((v) => v.id);
if (!ids.length) {
  console.error("channel-videos.json has no videos");
  process.exit(1);
}

const dbPath = path.join(root, "database.json");
const db = JSON.parse(fs.readFileSync(dbPath, "utf8"));

const byPage = new Map();
let i = 0;
for (const video of db.videos) {
  const newId = ids[i % ids.length];
  i++;
  const page = video.page;
  if (!byPage.has(page)) byPage.set(page, []);
  byPage.get(page).push({ video, oldId: video.original_id, newId });
}

for (const [relPage, ops] of byPage) {
  const filePath = path.join(SITE_DIR, relPage);
  if (!fs.existsSync(filePath)) {
    console.warn("skip missing file:", relPage);
    continue;
  }
  const html = fs.readFileSync(filePath, "utf8");
  const $ = cheerio.load(html);
  for (const { video, oldId, newId } of ops) {
    if (oldId === newId) continue;
    applyVideoReplace($, video, oldId, newId);
    const primaryFmt = inferFormat(video.original_url);
    video.original_url = urlFor(primaryFmt, newId);
    video.original_id = newId;
    video.override_url = null;
  }
  fs.writeFileSync(filePath, $.html());
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log(`Updated ${db.videos.length} database rows across ${byPage.size} HTML files.`);
