/**
 * DataService.js
 * Headless CMS architecture for fetching live data from Google Sheets
 * while preserving the original JSON schema as a fallback.
 */

const SHEET_ID = '1aoUuS2f8zMb5M3tAR-U2QZl2-M0tlYb76tXSlt_N5SE';

export const GIDS = {
  HOME: '0',
  MUSIC_INFO: '1232542601',
  MUSIC_PLATFORMS: '662625773',
  PRESS: '813739601',
  STUDIO_INFO: '2117350794',
  STUDIO_IMAGES: '1120622488',
  CONTACT_INFO: '1701404797',
  SOCIALS: '1379701036'
};

/**
 * Fetches the CSV export of a specific Google Sheet tab.
 */
async function fetchCsv(gid) {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${gid}`;
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    return await response.text();
  } catch (error) {
    console.error(`DataService: Failed to fetch GID ${gid}`, error);
    return null;
  }
}

/**
 * Lightweight parser to convert CSV rows into an array of JavaScript objects.
 */
function parseCSV(csvText) {
  const rows = [];
  let row = [];
  let curr = '';
  let inQuotes = false;
  
  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];
    
    if (char === '"' && inQuotes && nextChar === '"') {
      curr += '"'; // Handle escaped quotes
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      row.push(curr);
      curr = '';
    } else if (char === '\n' && !inQuotes) {
      if (curr.endsWith('\r')) curr = curr.slice(0, -1);
      row.push(curr);
      rows.push(row);
      row = [];
      curr = '';
    } else {
      curr += char;
    }
  }
  
  // Push the very last cell and row if it didn't end with a newline
  if (curr.endsWith('\r')) curr = curr.slice(0, -1);
  row.push(curr);
  if (row.length > 0 && row.some(cell => cell !== '')) {
    rows.push(row);
  }
  
  if (rows.length < 2) return [];

  const headers = rows[0];
  const data = [];
  for (let i = 1; i < rows.length; i++) {
    if (rows[i].length === 1 && rows[i][0] === '') continue; // Skip completely empty rows
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      if (headers[j]) {
        const val = rows[i][j];
        obj[headers[j].trim()] = val ? val.trim() : '';
      }
    }
    data.push(obj);
  }
  return data;
}

/**
 * Helper to deep clone an object to prevent mutating original static data.
 */
function deepClone(obj) {
  if (obj === undefined || obj === null) return obj;
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Helper to set nested properties via string paths (e.g., 'streams.value')
 */
function setDeepValue(obj, path, value) {
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) current[keys[i]] = {};
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
}

/**
 * Maps Google Sheet Column Headers to JSON object keys.
 */
const HEADER_MAP = {
  // Press
  'Publication': 'publication',
  'Article Title': 'title',
  'Year': 'year',
  'Excerpt': 'excerpt',
  'Article Link': 'link',
  'Logo Path': 'logo',
  'Brand Color': 'color',
  'IMAGE': 'image',
  'Image': 'image',
  'image': 'image',
  
  // Studio Images
  'ID': 'id',
  'Title': 'title',
  'Meta Information': 'meta',
  'Description': 'desc',
  'Image Path (WebP)': 'images.webp',

  // Music Platforms
  'Platform Name': 'name',
  'Playlist Name': 'playlistName',
  'CTA': 'cta',
  'Icon Path': 'icon',
  'CSS Class': 'class',
  'BG Color': 'colors.bg',
  'Text Color': 'colors.text',
  'Button Color': 'colors.button',
  'Accent Color': 'colors.accent',

  // Socials
  'Platform': 'platform',
  'Handle': 'handle',

  // Shared
  'URL': 'url',

  // Music Info
  'streams_value': 'streams.value',
  'streams_label': 'streams.label'
};

/**
 * Core Hybrid Mapping Logic: Merges local JSON with fetched Google Sheet data.
 * Override Rule: Sheet overwrites JSON if key exists.
 * Fallback Rule: Empty cell or fetch failure -> keep localJson value.
 */
export async function getLiveLinkedData(localJson, gid, isArray = false) {
  const csvText = await fetchCsv(gid);
  if (!csvText) return deepClone(localJson);

  const rows = parseCSV(csvText);
  if (!rows || rows.length === 0) return deepClone(localJson);

  const result = deepClone(localJson);

  if (isArray) {
    const baseArray = Array.isArray(result) ? result : [];
    return rows.map((row, index) => {
      const mergedObj = baseArray[index] || {};
      for (const sheetHeader in row) {
        if (row[sheetHeader] !== '') {
          // Check if we have a mapping for this human-readable header
          const jsonKey = HEADER_MAP[sheetHeader.trim()] || sheetHeader.trim();
          setDeepValue(mergedObj, jsonKey, row[sheetHeader]);
        }
      }
      return mergedObj;
    });
  } else {
    // Detect if Sheet uses Key/Value format (e.g. Field Name, Content / Value)
    const headers = Object.keys(rows[0]);
    const isKeyValue = headers.some(h => h.toLowerCase().includes('key') || h.toLowerCase().includes('field')) && 
                       headers.some(h => h.toLowerCase().includes('value') || h.toLowerCase().includes('content'));
    
    if (isKeyValue) {
      const keyCol = headers.find(h => h.toLowerCase().includes('key') || h.toLowerCase().includes('field'));
      const valCol = headers.find(h => h.toLowerCase().includes('value') || h.toLowerCase().includes('content'));
      rows.forEach(row => {
        const k = row[keyCol];
        const v = row[valCol];
        if (k && v !== '') {
          const jsonKey = HEADER_MAP[k.trim()] || k.trim();
          setDeepValue(result, jsonKey, v);
        }
      });
    } else {
      // Row format: First row contains values mapping to Header keys
      const dataRow = rows[0];
      for (const sheetHeader in dataRow) {
        if (dataRow[sheetHeader] !== '') {
          const jsonKey = HEADER_MAP[sheetHeader.trim()] || sheetHeader.trim();
          setDeepValue(result, jsonKey, dataRow[sheetHeader]);
        }
      }
    }
    return result;
  }
}

// ---------------------------------------------------------
// FILE-SPECIFIC HELPER FUNCTIONS
// ---------------------------------------------------------

export const DataService = {
  /**
   * 1. HOME
   */
  async getHomeData(localData) {
    return await getLiveLinkedData(localData, GIDS.HOME, false);
  },

  /**
   * 2. NUMBERS (Music Info + Music Platforms)
   */
  async getNumbersData(localData) {
    let mergedData = await getLiveLinkedData(localData, GIDS.MUSIC_INFO, false);
    
    // Arrays need special handling to fall back to the nested keys
    const platformsLocal = mergedData.platforms || [];
    const mergedPlatforms = await getLiveLinkedData(platformsLocal, GIDS.MUSIC_PLATFORMS, true);
    
    mergedData.platforms = mergedPlatforms;
    return mergedData;
  },

  /**
   * 3. PRESS
   */
  async getPressData(localData) {
    return await getLiveLinkedData(localData, GIDS.PRESS, true);
  },

  /**
   * 4. STUDIO DATA (Content + Images)
   */
  async getStudioData(localContent, localImages) {
    const mergedContent = await getLiveLinkedData(localContent, GIDS.STUDIO_INFO, false);
    const mergedImages = await getLiveLinkedData(localImages, GIDS.STUDIO_IMAGES, true);
    
    return {
      studioContent: mergedContent,
      studioData: mergedImages
    };
  },

  /**
   * 5. FORM (Contact Info + Socials)
   */
  async getFormData(localData) {
    let mergedData = await getLiveLinkedData(localData, GIDS.CONTACT_INFO, false);
    
    const socialsLocal = mergedData.social_media || [];
    const mergedSocials = await getLiveLinkedData(socialsLocal, GIDS.SOCIALS, true);
    
    mergedData.social_media = mergedSocials;
    return mergedData;
  }
};
