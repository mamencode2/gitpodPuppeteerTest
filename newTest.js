const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    const context = browser.defaultBrowserContext()
    await context.overridePermissions("https://app.tutoraround.com/tutors-near-me", ['geolocation'])
    await page.setGeolocation({ latitude: 90, longitude: 20 })

    await page.goto("https://app.tutoraround.com/tutors-near-me", {
        waitUntil: "networkidle0"
    })
    const productsHandles = await page.$$(" div.tutor-cards > div")

    for (const producthandle of productsHandles) {
        let title = "Null";
        let price = "Null";
        let img = "Null";
        let proffesion = "Null";
        let subjects = "Null"
        try {
            title = await page.evaluate((el) => el.querySelector("div.name-details > div").textContent, producthandle)
        } catch (error) {
            console.log(error)
        }
        try {
            subjects = await page.evaluate((el) => {
                return Array.from(el.querySelectorAll("div.subjects")).map(x => x.textContent)
            }, producthandle)

        } catch (error) {

        }
        try {
            img = await page.evaluate((el) => el.querySelector(" ion-row > ion-col.ion-text-center.md.hydrated > a > img").getAttribute("src"), producthandle)
        } catch (error) {
            console.log(error)
        }

        try {
            proffesion = await page.evaluate((el) => el.querySelector("div.profession").textContent, producthandle)
        } catch (error) {
            console.log(error)
        }

        console.log(subjects)
    }
    await browser.close();
})()