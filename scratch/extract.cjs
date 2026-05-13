const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('.yt-channel.html', 'utf-8');
const $ = cheerio.load(html);
const videos = [];
const seen = new Set();

// Find video links
$('a[href*="/watch?v="]').each((i, el) => {
  const href = $(el).attr('href');
  const title = $(el).attr('title') || $(el).text().trim();
  const match = href.match(/v=([a-zA-Z0-9_-]+)/);
  if (match) {
    const id = match[1];
    if (id && title && !seen.has(id)) {
      videos.push({ title, id });
      seen.add(id);
    }
  }
});

// If nothing, let's try finding javascript ytInitialData
if (videos.length === 0) {
  const scriptWithData = $('script').filter((i, el) => {
    return $(el).text().includes('ytInitialData = ');
  }).html();
  if (scriptWithData) {
    console.log("Found ytInitialData, trying to parse...");
    const dataStrMatch = scriptWithData.match(/ytInitialData = (\{.*?\});/);
    if (dataStrMatch) {
      try {
        const data = JSON.parse(dataStrMatch[1]);
        // VERY rudimentary extraction of videoIds and titles from the JSON dump
        const jsonStr = JSON.stringify(data);
        const regex = /"videoId":"([a-zA-Z0-9_-]{11})"(.*?)"title":\{"runs":\[\{"text":"(.*?)"\}\]/g;
        let m;
        while ((m = regex.exec(jsonStr)) !== null) {
          if (!seen.has(m[1])) {
             videos.push({id: m[1], title: m[3]});
             seen.add(m[1]);
          }
        }
      } catch (e) {
        console.error("Error parsing ytInitialData", e);
      }
    }
  }
}

console.log(JSON.stringify(videos, null, 2));
