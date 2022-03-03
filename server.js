const express = require('express');
const puppeteer = require('puppeteer')

const app = express();

const port = process.env.port || 5000;

app.get('/', (req,res)=>{
    res.send();
})

app.listen(port, ()=> {
    console.log("port running ");
});


/*



*/
(async function () {
    const browser = await puppeteer.launch({
        headless: true,
        args: [ // Disable Chromium's unnecessary SUID sandbox.
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ]
    });
    const page = await browser.newPage(); // Create a new page instance
    
    await page.goto('https://www.google.com/'); // Wait for 5 seconds to see the beautiful site
    const data = await page.evaluate(() => {
        const elements = document.body.getElementsByTagName("*");
    
        return [...elements].map(element => {
          element.focus();
          return window.getComputedStyle(element).getPropertyValue("font-family");
        });
      });
    
      console.log(data);
    
    await browser.close(); // Close the browser
})();