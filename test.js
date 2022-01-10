const puppeteer = require("puppeteer")
const Account = require("./account")
const Person = require("./person")

acc = new Account("patdenzoungany@gmail.com", "Bermanpatnew18")
needed = acc.connected()

person = new Person(needed)
person.search_by_account_link("https://www.linkedin.com/in/martin-thierry-atangana-259499187/")