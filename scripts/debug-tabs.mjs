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

const tabs = data.contents?.twoColumnBrowseResultsRenderer?.tabs || [];
for (let i = 0; i < tabs.length; i++) {
  const tab = tabs[i];
  const keys = Object.keys(tab);
  const tr = tab.tabRenderer || tab.expandableTabRenderer;
  const title = tr?.title?.runs?.[0]?.text || tr?.title?.simpleText || "?";
  const contentKeys = tr?.content ? Object.keys(tr.content) : [];
  console.log(
    `Tab ${i}: wrapper=${keys.join(",")} title="${title}" contentKeys=${JSON.stringify(contentKeys)}`,
  );
  if (tr?.content?.richGridRenderer) {
    const rg = tr.content.richGridRenderer;
    console.log("  richGrid keys:", Object.keys(rg), "contents len", rg.contents?.length);
  }
}
