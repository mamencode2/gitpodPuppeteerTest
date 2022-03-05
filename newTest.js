const fs = require('fs');
const puppeteer = require('puppeteer');
let contents = [];
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
        let title ="Null";
        let price = "Null";
        let img = "Null";
        let proffesion = "Null";
        let subjects = "Null"
        let distance = "Null"
        try {
            title = await page.evaluate((el) => el.querySelector("div.name-details > div").textContent, producthandle)
            
        } catch (error) {
            console.log(error)
        }
        try {
            distance = await page.evaluate((el) => el.querySelector("div.distance").textContent, producthandle)
        } catch (error) {

        }
        try {
            price = await page.evaluate((el) => el.querySelector("div.amount > span:nth-child(2)").textContent, producthandle)
        } catch (error) {

        }
        try {
            subjects = await page.evaluate((el) => {
                return Array.from(el.querySelectorAll("div.subjects")).map(x => x.textContent)
            }, producthandle)

        } catch (error) {

        }
        try {
            img = await page.evaluate((el) => el.querySelector(" ion-row > ion-col.ion-text-center.md.hydrated > a > img").getAttribute("src").split("?")[0], producthandle)
        } catch (error) {
            console.log(error)
        }

        try {
            proffesion = await page.evaluate((el) => el.querySelector("div.profession").textContent, producthandle)
        } catch (error) {
            console.log(error)
        }
        const dataContent = {
            title, price, img, proffesion, subjects, distance
        }
        if (title !== "Null") {
            contents.push({title, price, subjects, distance,  proffesion, img})
       
            fs.writeFile("./dataSets.json", JSON.stringify(contents), err=> err? console.log(err): null)
        }
    }
    await browser.close();
})()