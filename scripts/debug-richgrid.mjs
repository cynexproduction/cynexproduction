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
const rg = tabs[0]?.tabRenderer?.content?.richGridRenderer;
const contents = rg?.contents || [];
console.log("items:", contents.length);
for (let i = 0; i < contents.length; i++) {
  console.log(JSON.stringify(Object.keys(contents[i]), null, 2));
  console.log(JSON.stringify(contents[i], null, 2).slice(0, 2000));
}
