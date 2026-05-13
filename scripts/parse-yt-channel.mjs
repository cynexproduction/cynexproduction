import fs from "node:fs";
import path from "node:path";

const htmlPath = path.resolve(import.meta.dirname, "..", ".yt-channel.html");
const html = fs.readFileSync(htmlPath, "utf8");

function extractBalancedJson(html, needle) {
  const i = html.indexOf(needle);
  if (i < 0) return null;
  let start = html.indexOf("{", i + needle.length);
  if (start < 0) return null;
  let depth = 0;
  let inStr = false;
  let esc = false;
  let q = "";
  for (let p = start; p < html.length; p++) {
    const c = html[p];
    if (inStr) {
      if (esc) esc = false;
      else if (c === "\\") esc = true;
      else if (c === q) inStr = false;
      continue;
    }
    if (c === '"' || c === "'") {
      inStr = true;
      q = c;
      continue;
    }
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) return html.slice(start, p + 1);
    }
  }
  return null;
}

const raw =
  extractBalancedJson(html, "ytInitialData = ") ||
  extractBalancedJson(html, "var ytInitialData = ");
if (!raw) {
  console.error("Could not find ytInitialData JSON");
  process.exit(1);
}

let data;
try {
  data = JSON.parse(raw);
} catch (e) {
  console.error("JSON parse failed", e.message);
  process.exit(1);
}

function walk(obj, depth = 0) {
  if (depth > 40 || obj == null) return;
  if (typeof obj !== "object") return;
  if (Array.isArray(obj)) {
    for (const x of obj) walk(x, depth + 1);
    return;
  }
  if (obj.videoId && typeof obj.videoId === "string" && obj.videoId.length === 11) {
    videos.push({
      id: obj.videoId,
      title: obj.title?.runs?.[0]?.text || obj.title?.simpleText || "",
    });
  }
  for (const k of Object.keys(obj)) walk(obj[k], depth + 1);
}

const videos = [];
walk(data);

// Dedupe by id, preserve order
const seen = new Set();
const unique = [];
for (const v of videos) {
  if (seen.has(v.id)) continue;
  seen.add(v.id);
  unique.push(v);
}

const ch =
  html.match(/"channelId":"(UC[\w-]{22})"/)?.[1] || html.match(/browseId":"(UC[\w-]{22})"/)?.[1];

console.log(
  JSON.stringify({ channelId: ch || null, videoCount: unique.length, videos: unique }, null, 2),
);
