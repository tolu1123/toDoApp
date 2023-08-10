let input = document.querySelector('#bfTqV');
let sendBtn = document.querySelector('.tvf2evcx');
waitingPeriod = setInterval(() => {
    let greetings = 'THANK YOU!';
    input.value = greetings;
    sendBtn.click();
}, 2000);

setTimeout(() => {
    clearInterval(waitingPeriod);
}, 12000);



//AUTOMATICALLY CREATE TASKS
addProjectBtn.click()
projectName.value = 'eva'
projectDescription.value = 'a project';

teamProject.click()