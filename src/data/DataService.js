/**
 * DataService.js
 * Headless CMS architecture for fetching live data from Google Sheets
 * while preserving the original JSON schema as a fallback.
 */

const SHEET_ID = import.meta.env.VITE_SHEET_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_SHEET_API_KEY;

export const GIDS = {
  HOME: 'HOME',
  MUSIC_INFO: 'MUSIC INFO',
  MUSIC_PLATFORMS: 'MUSIC PLATFORMS',
  PRESS: 'PRESS',
  STUDIO_INFO: 'STUDIO INFO',
  STUDIO_IMAGES: 'STUDIO IMAGES',
  CONTACT_INFO: 'CONTACT INFO',
  SOCIALS: 'SOCIALS',
  ADDRESS: 'ADDRESS'
};

/**
 * Fetches data from a specific Google Sheet tab using the JSON API.
 */
async function fetchSheetData(sheetName) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(sheetName)}?key=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      console.error(`DataService API Error:`, errorData);
      return null;
    }
    const data = await response.json();
    return data.values || [];
  } catch (error) {
    console.error(`DataService: Failed to fetch sheet "${sheetName}"`, error);
    return null;
  }
}

/**
 * Converts a 2D array from Google Sheets into an array of JavaScript objects.
 */
function rowsToObjects(rows) {
  if (!rows || rows.length < 2) return [];

  const headers = rows[0];
  const data = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      const header = headers[j];
      if (header) {
        const val = row[j];
        obj[header.trim()] = val ? val.trim() : '';
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
  'streams_label': 'streams.label',

  // Studio Info
  'studio_title': 'title',
  'studio_text': 'text',
  'studio_notation': 'notation',
  'Title': 'title',
  'Text': 'text',
  'Notation': 'notation',
  'notation': 'notation',

  // Contact Info
  'email': 'contact.email',
  'Email': 'contact.email',
  'website': 'contact.website',
  'Website': 'contact.website',
  'Heading': 'heading',
  'heading': 'heading',
  'orange_box_bg': 'theme.orange_box_bg',
  'orange_box_text': 'theme.orange_box_text',
  'blue_box_bg': 'theme.blue_box_bg',
  'blue_box_text': 'theme.blue_box_text',
  'white_box_bg': 'theme.white_box_bg',
  'white_box_text': 'theme.white_box_text',
  'button_bg': 'theme.button_bg',
  'button_text': 'theme.button_text',

  // Address
  'Company': 'company',
  'Building': 'building',
  'Street': 'street',
  'Area': 'area',
  'City': 'city',
  'MAP': 'map_url',
  'Map': 'map_url'
};

/**
 * Core Hybrid Mapping Logic: Merges local JSON with fetched Google Sheet data.
 * Override Rule: Sheet overwrites JSON if key exists.
 * Fallback Rule: Empty cell or fetch failure -> keep localJson value.
 */
export async function getLiveLinkedData(localJson, sheetName, isArray = false) {
  const rows = await fetchSheetData(sheetName);
  
  if (!rows || rows.length === 0) {
    if (localJson) return deepClone(localJson);
    return isArray ? [] : {};
  }

  const objects = rowsToObjects(rows);
  const result = localJson ? deepClone(localJson) : (isArray ? [] : {});

  if (isArray) {
    const baseArray = Array.isArray(result) ? result : [];
    const finalArray = objects.map((item, index) => {
      const mergedObj = baseArray[index] || {};
      for (const key in item) {
        if (item[key] !== '') {
          const jsonKey = HEADER_MAP[key.trim()] || key.trim();
          setDeepValue(mergedObj, jsonKey, item[key]);
        }
      }
      return mergedObj;
    });
    return finalArray;
  } else {
    // Detect if Sheet uses Key/Value format
    const headers = rows[0].map(h => h.toLowerCase());
    const isKeyValue = headers.some(h => h.includes('key') || h.includes('field')) && 
                       headers.some(h => h.includes('value') || h.includes('content'));
    
    if (isKeyValue) {
      const keyIdx = headers.findIndex(h => h.includes('key') || h.includes('field'));
      const valIdx = headers.findIndex(h => h.includes('value') || h.includes('content'));
      
      // Skip headers
      for (let i = 1; i < rows.length; i++) {
        const k = rows[i][keyIdx];
        const v = rows[i][valIdx];
        if (k && v !== '') {
          const jsonKey = HEADER_MAP[k.trim()] || k.trim();
          setDeepValue(result, jsonKey, v);
        }
      }
    } else {
      // Row format: First data object contains values mapping to Header keys
      const dataObj = objects[0];
      for (const key in dataObj) {
        if (dataObj[key] !== '') {
          const jsonKey = HEADER_MAP[key.trim()] || key.trim();
          setDeepValue(result, jsonKey, dataObj[key]);
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
    
    // Merge Socials
    const socialsLocal = mergedData.social_media || [];
    const mergedSocials = await getLiveLinkedData(socialsLocal, GIDS.SOCIALS, true);
    mergedData.social_media = mergedSocials;

    // Merge Address
    const locationLocal = mergedData.location || {};
    const mergedLocation = await getLiveLinkedData(locationLocal, GIDS.ADDRESS, false);
    mergedData.location = mergedLocation;

    return mergedData;
  }
};
