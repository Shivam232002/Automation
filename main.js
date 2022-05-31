const puppeteer = require('puppeteer')

let email ="woven15250@roxoas.com"
let password = "pepcoding123"

let page = ""

const codefile = require('./code.js')

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
    page =newTab
    let websiteOpenPromise = page.goto(hackerLink);
    return websiteOpenPromise 
}).then(function(){
    let emailTyped =page.type("input[id='input-1']",email,{delay :100})
    return emailTyped
}).then(function(){
    let passwordTyped =page.type("input[id='input-2']",password)
    return passwordTyped
}).then(function(){
    let loginbutton =page.click('button[data-analytics="LoginPassword"]',{delay :50})

    return loginbutton
}).then(function(){
    let algosection =waitandClick('.topic-card a[data-attr1="algorithms"]',page)

    return algosection
}).then(function (){
    let ClickWarmUp = waitandClick("input[value='warmup']", page)
    return ClickWarmUp
}).then(function(){
    let allChanges =page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled' ,{delay :50})
    return allChanges;
}).then(function (questions){
    // console.log('No. of questions ', questions.length);

    let solved = questionsolver(page ,questions[0],codefile.answers[0]) 
    return solved;

})


function questionsolver(page , questionIdx,answer){
    return new Promise(function(reslove,reject){
        let questionWillbeClicked = questionIdx.click()
        questionWillbeClicked.then(function(){
            let selecetEditorPromise = waitandClick('.monaco-editor.no-user-select.vs',page)
            return selecetEditorPromise
        }).then(function(){
            return waitandClick('.checkbox-input',page);
        }).then(function(){
            return page.type(' .text-area.custominput ',answer , {delay :20 })
        }).then(function(){
            let ctrlHold= page.keyboard.down('Control',{delay : 20})
            return ctrlHold
        }).then(function(){
            let aPressed = page.keyboard.press('A',{delay : 20})
            return aPressed
        }).then(function(){
            let aPressed = page.keyboard.press('X',{delay : 20})
            return aPressed
        }).then(function(){
            let ctrlReleased= page.keyboard.up('Control',{delay : 20})
            return ctrlReleased
        }).then (function(){
            let mainEditor= waitandClick('.monaco-editor.no-user-select.vs',page)
            return mainEditor
        }).then(function(){
            let ctrlHold=page.keyboard.down('Control',{dealy : 50})
            return ctrlHold
        }).then(function(){
            let AisPressed=page.keyboard.press('A',{dealy : 50})
            return AisPressed
        }).then(function(){
            let VisPressed=page.keyboard.press('V',{dealy : 50})
            return VisPressed
        }).then(function(){
            let ctrlReleased= page.keyboard.up('Control',{delay : 20})
            return ctrlReleased
        }).then(function(){
            return page.click('.hr-monaco__run-code',{delay : 20})
        })

    })

}

function waitandClick(selector,cpage){
    return new Promise(function(resolve,reject){
        let waitforPage =cpage.waitForSelector(selector);

        waitforPage.then(function(){
            let clickthePage = cpage.click(selector);
            return clickthePage
        }).then(function(){
            resolve()
        }).catch(function(){
            reject()
        })
    })
}





