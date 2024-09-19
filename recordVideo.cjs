// recordVideo.js
const puppeteer = require('puppeteer');
// const path = require('path');
const fs = require('fs');

const clipLengthInSeconds = 10;
const captions = [
  { startTime: 0, endTime: 2, words: ["Born", "and", "raised", "in", "the", "charming", "south,"] },
  { startTime: 2, endTime: 4, words: ["I", "can", "add", "a", "touch", "of", "sweet", "southern"] },
  { startTime: 4, endTime: 6, words: ["hospitality", "to", "your", "audiobooks", "and"] },
  { startTime: 6, endTime: 8, words: ["podcasts.", "Born", "and", "raised"] },
  { startTime: 8, endTime: 10, words: ["in", "the", "charming", "south,", "I", "can", "add", "a"] },
  { startTime: 10, endTime: 12, words: ["touch", "of", "sweet", "southern", "hospitality", "to", "your"] },
  { startTime: 12, endTime: 14, words: ["audiobooks", "and", "podcasts."] },
  { startTime: 14, endTime: 16, words: ["Born", "and", "raised", "in", "the", "charming"] },
  { startTime: 16, endTime: 18, words: ["south,", "I", "can", "add", "a", "touch", "of", "sweet"] },
  { startTime: 18, endTime: 20, words: ["southern", "hospitality", "to", "your", "audiobooks", "and"] },
  { startTime: 20, endTime: 22, words: ["podcasts.", "Born", "and"] },
  { startTime: 22, endTime: 24, words: ["raised", "in", "the", "charming", "south,", "I", "can", "add", "a"] },
  { startTime: 24, endTime: 26, words: ["touch", "of", "sweet", "southern", "hospitality", "to", "your"] },
  { startTime: 26, endTime: 28, words: ["audiobooks", "and", "podcasts."] }
];

// Define the mobile device you want to emulate, e.g., iPhone 12.
const device = {
  name: 'iPhone 15',
  viewport: {
    width: 390,
    height: 844,
    isMobile: true,
    hasTouch: true,
    isLandscape: false,
  },
  userAgent:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
};

const Config = {
  followNewTab: true,
  fps: 25,
  ffmpeg_Path: null,
  videoFrame: {
    width: 390 * 2,
    height: 844 * 2,
  },
  videoCrf: 18,
  videoCodec: 'libx264',
  videoPreset: 'ultrafast',
  videoBitrate: 1000,
  aspectRatio: '4:3',
};

const baseUrl = 'http://localhost:8080/';

async function waitFor(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function recordMobileVideo(url, recordingLengthInSeconds) {
  // Launch Puppeteer browser
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: '/usr/bin/google-chrome-stable',
  });
  const context = await browser.createBrowserContext();
  const page = await context.newPage();

  // Emulate mobile device
  await page.emulate(device);

  // Navigate to the provided URL
  await page.goto(url);

  const savePath = './demo.gif';
  const recorder = await page.screencast({ path: savePath });

  // Set up video recording (Placeholder, Puppeteer doesn't support this directly)
  // You will need to use external tools or libraries to handle video recording if needed.

  // Simulate recording length
  await waitFor((recordingLengthInSeconds + 1) * 1000);

  // Close page and browser
  await recorder.stop();
  await page.close();
  await browser.close();

  if (!fs.existsSync(savePath)) {
    throw new Error('Video recording failed.');
  }

  console.log(
    `Video recorded for ${recordingLengthInSeconds} seconds and saved to ${savePath}`,
  );

  return savePath;
}

async function record(captions) {
  const encodedCaptions = encodeURIComponent(JSON.stringify(captions));
  const url = `${baseUrl}?clipLengthInSeconds=${clipLengthInSeconds}&captions=${encodedCaptions}`;
  return await recordMobileVideo(url, clipLengthInSeconds);
}

(async ()=>{
    await record(captions);
})()

