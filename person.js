const puppeteer = require("puppeteer")
const Account = require("./account")

class Person{

    constructor(needed){
        this.page = needed
    }

    search_by_account_link = async (link) =>{
        //naviguate to the link
        this.page.goto(link, {waitUntil:'load', timeout: 0})

    }

    
}


test = async ()=>{
    try{ 
        const acc = new Account("patdenzoungany@gmail.com", "Bermanpatnew18")
        const needed = await acc.connected()

        const person = new Person(needed)
        person.search_by_account_link("https://www.linkedin.com/in/martin-thierry-atangana-259499187/")
        
    }catch(err){
        console.log(err)
    }
}

test()

module.exports = Person