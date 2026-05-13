/**
 * Replace any YouTube video IDs embedded in public/site HTML with IDs from
 * channel-videos.json (leaves segments that already use those IDs unchanged).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const SITE_DIR = path.join(root, "public", "site");

const channel = JSON.parse(fs.readFileSync(path.join(root, "channel-videos.json"), "utf8"));
const CHANNEL_IDS = channel.videos.map((v) => v.id);
const CHANNEL_SET = new Set(CHANNEL_IDS);

const VID = "[a-zA-Z0-9_-]{11}";

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

function sweepHtml(html, nextId) {
  let out = html;

  const rep2 = (re, fmt) => {
    out = out.replace(re, (full, pfx, id) => {
      if (CHANNEL_SET.has(id)) return full;
      return fmt(pfx, nextId());
    });
  };

  rep2(new RegExp(`(youtube\\.com\\/watch\\?v=)(${VID})`, "g"), (pfx, nid) => `${pfx}${nid}`);
  rep2(new RegExp(`(youtube\\.com\\/embed\\/)(${VID})`, "g"), (pfx, nid) => `${pfx}${nid}`);
  rep2(new RegExp(`(youtu\\.be\\/)(${VID})`, "g"), (pfx, nid) => `${pfx}${nid}`);
  out = out.replace(new RegExp(`(data-plyr-embed-id=")(${VID})(")`, "g"), (full, a, id, c) => {
    if (CHANNEL_SET.has(id)) return full;
    return `${a}${nextId()}${c}`;
  });
  out = out.replace(new RegExp(`(i\\.ytimg\\.com\\/vi\\/)(${VID})(/)`, "g"), (full, a, id, c) => {
    if (CHANNEL_SET.has(id)) return full;
    return `${a}${nextId()}${c}`;
  });

  return out;
}

let changedFiles = 0;
const files = walk(SITE_DIR);

for (const file of files) {
  let i = 0;
  const nextId = () => CHANNEL_IDS[i++ % CHANNEL_IDS.length];

  const before = fs.readFileSync(file, "utf8");
  const after = sweepHtml(before, nextId);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changedFiles++;
  }
}

console.log(`Updated ${changedFiles} HTML files (remaining YouTube embeds → channel IDs).`);
