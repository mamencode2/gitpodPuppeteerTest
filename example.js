const puppeteer = require('puppeteer');
const iPhone = puppeteer.devices['iPhone 6'];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.emulate(iPhone);
  await page.goto('https://app.tutoraround.com/tutors-near-me');
  await page.setDefaultTimeout(0)
  await page.screenshot({ path: 'screenshot.png' });
  await browser.close();
})();


//https://app.tutoraround.com/tutors-near-me