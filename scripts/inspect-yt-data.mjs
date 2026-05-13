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
const data = JSON.parse(raw);

function summarize(obj, depth = 0, maxDepth = 4) {
  if (depth > maxDepth) return "...";
  if (obj == null) return obj;
  if (typeof obj !== "object") return typeof obj;
  if (Array.isArray(obj)) return `[array len=${obj.length}]`;
  const keys = Object.keys(obj);
  const out = {};
  for (const k of keys.slice(0, 25)) {
    const v = obj[k];
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const ck = Object.keys(v).slice(0, 8);
      out[k] = `{${ck.join(", ")}}`;
    } else if (Array.isArray(v)) {
      out[k] = `[len ${v.length}]`;
    } else {
      out[k] = v;
    }
  }
  return out;
}

console.log("top keys:", Object.keys(data));
console.log("contents:", summarize(data.contents));
