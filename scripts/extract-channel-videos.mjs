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

const videos = [];

function collectFromRichGrid(contents) {
  if (!contents) return;
  for (const item of contents) {
    const rich = item.richItemRenderer?.content?.videoRenderer;
    const reel = item.richItemRenderer?.content?.reelItemRenderer;
    const vr = item.videoRenderer || rich;
    if (vr?.videoId) {
      const title = vr.title?.runs?.map((r) => r.text).join("") || vr.title?.simpleText || "";
      videos.push({ id: vr.videoId, title });
    }
    const continuation = item.continuationItemRenderer;
    if (continuation) {
      /* pagination token exists — would need another request */
    }
  }
}

function collectFromGrid(contents) {
  if (!contents) return;
  for (const item of contents) {
    const grid = item.gridRenderer?.items;
    if (grid) {
      for (const cell of grid) {
        const vr = cell.gridVideoRenderer;
        if (vr?.videoId) {
          const title = vr.title?.runs?.map((r) => r.text).join("") || vr.title?.simpleText || "";
          videos.push({ id: vr.videoId, title });
        }
      }
    }
    const shelf = item.itemSectionRenderer?.contents;
    if (shelf) collectFromRichGrid(shelf);
  }
}

for (const tab of tabs) {
  const tr = tab.tabRenderer || tab.expandableTabRenderer;
  if (!tr) continue;
  const title = tr.title?.runs?.[0]?.text || tr.title?.simpleText || "";
  const content = tr.content;
  const richGrid = content?.richGridRenderer?.contents;
  if (richGrid) {
    collectFromRichGrid(richGrid);
  }
  const sectionList = content?.sectionListRenderer?.contents;
  if (sectionList) {
    collectFromGrid(sectionList);
  }
}

const seen = new Set();
const unique = [];
for (const v of videos) {
  if (seen.has(v.id)) continue;
  seen.add(v.id);
  unique.push(v);
}

const ch =
  html.match(/"channelId":"(UC[\w-]{22})"/)?.[1] ||
  data.metadata?.channelMetadataRenderer?.externalId;

console.log(
  JSON.stringify(
    {
      channelId: ch || null,
      tabCount: tabs.length,
      videoCount: unique.length,
      videos: unique,
    },
    null,
    2,
  ),
);
