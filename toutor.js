const puppeteer = require('puppeteer');
//const fs = require("fs/promises")

(async ()=> {
const browser = await puppeteer.launch()
const page = await browser.newPage()
const context = browser.defaultBrowserContext()
await context.overridePermissions("https://app.tutoraround.com/tutors-near-me", ['geolocation'])
await page.setGeolocation({latitude:90, longitude:20})
    //set the location
await page.goto("https://app.tutoraround.com/tutors-near-me", {
    waitUntil: "networkidle0"
})

//await page.click("body > app-root > ion-app > ion-router-outlet > app-inital-tour > ion-content > div > a")
await page.screenshot({path: "tscreenfull.png", fullPage: true})

await browser.close()
})()