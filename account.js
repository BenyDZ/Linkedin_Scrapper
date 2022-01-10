const puppeteer = require("puppeteer")

class Account{
    constructor(email, pwd){
        this.email = email
        this.pwd = pwd
    }

    connected = async function(){

        //launch the browser
        const browser = await puppeteer.launch({headless: false})
        //initialize the new page
        const page = await browser.newPage()
        //force the browser to not load images and css
        await page.setRequestInterception(true);
        page.on('request', (req) => {
        if(req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image'){
        req.abort();
        }
        else {
        req.continue();
        }
        });

        await page.goto("https://www.linkedin.com/login/",  {waitUntil:'load', timeout: 0})

        //fill the username field
        page.type("#username", this.email)
        //wait 5 secondes
        await new Promise(resolve => setTimeout(resolve, 5000));
        //fill the password field
        page.type("#password", this.pwd)
        //wait 5 secondes
        await new Promise(resolve => setTimeout(resolve, 2000));

        //click the button and wait for the new page to load
        await Promise.all([page.click(".btn__primary--large"), page.waitForNavigation()])
        
        return page
    }
}

module.exports = Account