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

        // Configure the navigation timeout
        await page.setDefaultNavigationTimeout(0);

        await page.goto("https://www.linkedin.com/login/",  {waitUntil:'load', timeout: 0})

        //fill the username field
        page.type("#username", this.email)
        //wait 5 secondes
        await new Promise(resolve => setTimeout(resolve, 5000));
        //fill the password field
        page.type("#password", this.pwd)
        //wait 5 secondes
        await new Promise(resolve => setTimeout(resolve, 5000));

        //click the button and wait for the new page to load
        await Promise.all([page.click(".btn__primary--large"), page.waitForNavigation()])
        
        return [browser, page]
    }
}

module.exports = Account

const acc = new Account("patdenzoungany@gmail.com", "Bermanpatnew18")
acc.connected()