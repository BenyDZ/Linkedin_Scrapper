const puppeteer = require("puppeteer")
const Account = require("./account")
const fs = require('fs/promises')

class Person{

    constructor(needed){
        this.page = needed
    }

    search_by_account_link = async (link) =>{
        //naviguate to the link
        await Promise.all([this.page.goto(link, {waitUntil:'load', timeout: 0}),this.page.waitForNavigation()])
        // this.page.goto(link, {waitUntil:'load', timeout: 0})
        // await this.page.screenshot({path:"tste.png", fullPage: true})
    }

    get_full_page_code = async(link) =>{
        // const page_content = await this.page.content()
        // await fs.writeFile("test.txt", page_content)
        // await this.page.screenshot({path:"tst.png", fullPage: true})
    }

    get_experiences = async () =>{
        try{
            await this.page.waitForXPath("//section[@id='profileCard-ACoAACwINyUBdjdx8tfjEGn34voJ3d7aVQQun-8-EXPERIENCE-fr-FR']")
            await this.page.screenshot({path:"tst.png", fullPage: true})
            // const job_titles = await this.page.$x("//section[@id='profileCard-ACoAACwINyUBdjdx8tfjEGn34voJ3d7aVQQun-8-EXPERIENCE-fr-FR']/div[@class='pvs-list__outer-container']/ul/li/div[@class='display-flex']/div[@class='display-flex']/div[@class='display-flex']/div[@class='display-flex']/span/span")
            const job_titles = await this.page.$x("//section[@id='profileCard-ACoAACwINyUBdjdx8tfjEGn34voJ3d7aVQQun-8-EXPERIENCE-fr-FR']/div[@class='pvs-list__outer-container']/ul/li/div/div[@class='display-flex flex-column full-width align-self-center']/div[@class='display-flex flex-row justify-space-between']/div[@class='display-flex flex-column full-width']/div[@class='display-flex align-items-center']/span/span")
            var url_list_arr = [];
            for(var i = 0; i < job_titles.length; i++)
            {
                url_list_arr.push(await this.page.evaluate(el => el.textContent, job_titles[i]));
            }
            console.log(url_list_arr)
            
        }catch(err){
            console.log(err)
        }
        
    } 
    
}


test = async ()=>{
    try{ 
        const acc = new Account("patdenzoungany@gmail.com", "Bermanpatnew18")
        const needed = await acc.connected()

        const person = new Person(needed)
        person.search_by_account_link("https://www.linkedin.com/in/martin-thierry-atangana-259499187/")
        try{
            person.get_experiences()
        }catch(err){
            console.log(err)
        }
        
    }catch(err){
        console.log(err)
    }
}

test()

module.exports = Person