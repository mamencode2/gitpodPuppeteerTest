const fs = require('fs');
const puppeteer = require('puppeteer');
//const iPhone = puppeteer.devices['iPhone 6'];
//const fs = require("fs/promises")

(async () => {







    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    const context = browser.defaultBrowserContext()
    await context.overridePermissions("https://app.tutoraround.com/tutors-near-me", ['geolocation'])
    await page.setGeolocation({ latitude: 90, longitude: 20 })
    //set the location
    await page.goto("https://app.tutoraround.com/tutors-near-me", {
        waitUntil: "networkidle0"
    })


    const photos = await page.$$eval(".profile-image ", imgs => {
        return imgs.map(x => x.src)
    })

    //console.log(...photos)
    const lsp = photos.map((index, photo) => {
        return {
            id: photo,
            imgUrl: index.split("?")[0]
        }
    })
    console.log(lsp)
    fs.writeFile('./datas.json', JSON.stringify(lsp), err => err ? console.log(err) : null);

    //console.log(photos[0].split("?")[0])

    const contents = await page.$$eval("ion-grid", nodes => {
        return nodes.map(node => {
            const nameI = node.querySelector("name-details")
        })

        return { nameI }
    })

    //console.log(contents)


    await browser.close();
})();