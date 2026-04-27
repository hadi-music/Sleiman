import fs from 'fs';

async function fetchCsv(gid) {
  const SHEET_ID = '1aoUuS2f8zMb5M3tAR-U2QZl2-M0tlYb76tXSlt_N5SE';
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${gid}`;
  const response = await fetch(url);
  const text = await response.text();
  console.log(`--- GID: ${gid} ---`);
  console.log(text);
}

await fetchCsv('813739601'); // PRESS
