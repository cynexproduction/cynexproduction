import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_DIR = path.join(__dirname, 'public', 'site');
const DB_FILE = path.join(__dirname, 'database.json');

function scanDirectory(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      scanDirectory(filePath, fileList);
    } else if (filePath.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

function scanVideos() {
  const htmlFiles = scanDirectory(SITE_DIR);
  const videos = [];
  let videoIdCounter = 1;

  for (const file of htmlFiles) {
    const relativePath = path.relative(SITE_DIR, file).replace(/\\/g, '/');
    const content = fs.readFileSync(file, 'utf-8');
    const $ = cheerio.load(content);

    // Helper to extract section context
    const getSection = (el) => {
      let section = 'Unknown Section';
      const parentSection = $(el).closest('section, div[id], div[class*="section"], .elementor-section');
      if (parentSection.length > 0) {
        const heading = parentSection.find('h1, h2, h3, .elementor-heading-title').first().text().trim();
        if (heading) {
          section = heading;
        } else if (parentSection.attr('id')) {
          section = '#' + parentSection.attr('id');
        } else if (parentSection.attr('data-id')) {
          section = 'Elementor Section ' + parentSection.attr('data-id');
        }
      }
      return section;
    };

    // 1. Standard iframes
    $('iframe').each((i, el) => {
      const src = $(el).attr('src');
      if (src && (src.includes('youtube.com') || src.includes('youtu.be') || src.includes('vimeo.com'))) {
        
        let original_id = null;
        const ytMatch = src.match(/(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([A-Za-z0-9_-]+)/);
        if (ytMatch) original_id = ytMatch[1];

        videos.push({
          id: videoIdCounter++,
          page: relativePath,
          section: getSection(el),
          original_url: src,
          original_id: original_id,
          override_url: null,
          is_deleted: false
        });
      }
    });

    // 2. Elementor data-settings videos
    $('[data-settings]').each((i, el) => {
      const settingsStr = $(el).attr('data-settings');
      if (settingsStr && settingsStr.includes('youtube.com')) {
        try {
          // data-settings is usually html-entity encoded JSON
          const decoded = settingsStr.replace(/&quot;/g, '"');
          const settings = JSON.parse(decoded);
          
          if (settings.youtube_url || settings.url || settings.video_link) {
            const url = settings.youtube_url || settings.url || settings.video_link;
            
            // It could be a background video or a standard video widget
            if (typeof url === 'string' && (url.includes('youtube.com') || url.includes('youtu.be'))) {
              
              let original_id = null;
              // Handle URL encoded json payload (https:\/\/www.youtube.com\/...)
              const cleanUrl = url.replace(/\\\//g, '/');
              const ytMatch = cleanUrl.match(/(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([A-Za-z0-9_-]+)/);
              if (ytMatch) original_id = ytMatch[1];

              videos.push({
                id: videoIdCounter++,
                page: relativePath,
                section: getSection(el),
                original_url: cleanUrl,
                original_id: original_id,
                override_url: null,
                is_deleted: false,
                is_elementor: true,
                elementor_id: $(el).attr('data-id') || null
              });
            }
          }
        } catch (e) {
          // ignore parsing errors
        }
      }
    });
  }

  // Filter out duplicates (same original_id on same page)
  const uniqueVideos = [];
  const seen = new Set();
  for (const v of videos) {
    if (!v.original_id) continue; // Skip bad ones
    const key = v.page + '|' + v.original_id;
    if (!seen.has(key)) {
      seen.add(key);
      uniqueVideos.push(v);
    }
  }

  // Load existing DB to preserve overrides
  let existingDb = { videos: [] };
  if (fs.existsSync(DB_FILE)) {
    try { existingDb = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8')); } catch(e) {}
  }

  const existingVideosByOriginal = new Map();
  for (const ev of existingDb.videos || []) {
    if (ev.original_id) {
      existingVideosByOriginal.set(ev.page + '|' + ev.original_id, ev);
    }
  }

  const finalVideos = uniqueVideos.map(v => {
    const existing = existingVideosByOriginal.get(v.page + '|' + v.original_id);
    if (existing) {
      return { 
        ...v, 
        override_url: existing.override_url, 
        is_deleted: existing.is_deleted, 
        id: existing.id 
      };
    }
    return v;
  });

  // Ensure unique IDs for new items
  let maxId = Math.max(0, ...finalVideos.map(v => v.id));
  for (const v of finalVideos) {
    if (!v.id) v.id = ++maxId;
  }

  fs.writeFileSync(DB_FILE, JSON.stringify({ videos: finalVideos }, null, 2));
  console.log(`Scanned ${htmlFiles.length} HTML files. Found ${finalVideos.length} videos.`);
}

scanVideos();
