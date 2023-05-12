var greetingEl = document.createElement('div')
greetingEl.setAttribute('id','greeting-div')
greetingEl.setAttribute('style','padding: 20px; display: flex; align-items: center; margin-top: 200px; border: 2px solid; border-radius: 25px; flex-direction: column;')
var messageEl = document.createElement('p')
messageEl.textContent = 'Hello! Welcome to the budgeting tool I have created, I hope that it helps you achieve your goals! Please keep in mind that it is in development and you may experience bugs. You can reach out to the team with any issues from the developer section on the homepage.'
var greetingBtn = document.createElement('button')
greetingBtn.setAttribute('id','greeting-btn')
greetingBtn.textContent = 'Get Started'
var returnHomeBtn = document.createElement('a')
returnHomeBtn.textContent = 'Home'
returnHomeBtn.setAttribute('style','margin-top:5px; height: 25px; width: auto; background-color: #f9049a; border: 5px solid; border-radius: 25px; padding: 5px; font-style: normal;')
returnHomeBtn.setAttribute('href','./index.html')




document.body.appendChild(greetingEl)
greetingEl.appendChild(messageEl)
greetingEl.appendChild(greetingBtn)
greetingEl.appendChild(returnHomeBtn)


greetingBtn.addEventListener ('click', function () {
    greetingEl.remove();
})
