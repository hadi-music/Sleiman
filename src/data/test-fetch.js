import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DataService } from './DataService.js';
import { studioContent, studioData } from './studio-data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const homeLocal = JSON.parse(fs.readFileSync(path.join(__dirname, 'home.json'), 'utf8'));
const pressLocal = JSON.parse(fs.readFileSync(path.join(__dirname, 'press.json'), 'utf8'));
const formLocal = JSON.parse(fs.readFileSync(path.join(__dirname, 'form.json'), 'utf8'));
const numbersLocal = JSON.parse(fs.readFileSync(path.join(__dirname, 'numbers.json'), 'utf8'));

async function test() {
  console.log("--- HOME ---");
  const home = await DataService.getHomeData(homeLocal);
  console.log(JSON.stringify(home, null, 2));
  
  console.log("\n--- NUMBERS ---");
  const numbers = await DataService.getNumbersData(numbersLocal);
  console.log("Title:", numbers.title);
  console.log("Streams:", numbers.streams);
  console.log("Platforms Length:", numbers.platforms?.length);
  console.log("Platforms[0]:", JSON.stringify(numbers.platforms?.[0], null, 2));
  
  console.log("\n--- PRESS ---");
  const press = await DataService.getPressData(pressLocal);
  console.log("Press Length:", press?.length);
  console.log("Press[0]:", JSON.stringify(press?.[0], null, 2));
  
  console.log("\n--- STUDIO ---");
  const studio = await DataService.getStudioData(studioContent, studioData);
  console.log("Content:", studio.studioContent);
  console.log("Images Length:", studio.studioData?.length);
  console.log("Images[0]:", JSON.stringify(studio.studioData?.[0], null, 2));
  
  console.log("\n--- FORM ---");
  const form = await DataService.getFormData(formLocal);
  console.log("Contact Email:", form.contact?.email);
  console.log("Location City:", form.location?.city);
  console.log("Socials Length:", form.social_media?.length);
  console.log("Social[0]:", JSON.stringify(form.social_media?.[0], null, 2));
}

test().catch(console.error);
