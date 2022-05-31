const puppeteer = require('puppeteer')


const hackerLink =("https://www.hackerrank.com/auth/login")
let browserWillbeOpenedPromise = puppeteer.launch({
    headless:false,
    defaultViewport:null,
    args : ['--start-maximized']
  
})

browserWillbeOpenedPromise.then(function(browserInstance){

    let newTabPromise = browserInstance.newPage() 
    return newTabPromise

}).then(function(newTab){
    let websiteOpenPromise = newTab.goto(hackerLink);

    return websiteOpenPromise 
}).then(function(){
    console.log('Website Opened')
})