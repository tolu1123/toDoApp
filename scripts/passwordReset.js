let inputOne = document.querySelector('#inputOne');
let inputTwo = document.querySelector('#inputTwo');
let inputThree = document.querySelector('#inputThree');
let inputFour = document.querySelector('#inputFour');

inputOne.focus();
inputTwo.disabled = true;
inputThree.disabled = true;
inputFour.disabled = true;
inputOne.addEventListener('input', () => {  
    if (inputOne.value) {
        inputOne.setAttribute('class', 'selected');
        inputTwo.disabled = false;
        inputTwo.focus();
    }
})

inputTwo.addEventListener('input', () => {  
    if(inputTwo.value) {
        inputTwo.setAttribute('class', 'selected');
        inputThree.disabled = false;
        inputThree.focus();
    }
})

inputThree.addEventListener('input', () => {  
    if (inputThree.value) {
        inputThree.setAttribute('class', 'selected');
        inputFour.disabled = false;
        inputFour.focus();
    }
})

inputFour.addEventListener('input', () => {
    if(inputFour.value) {
        inputFour.setAttribute('class', 'selected')
    }
})

inputTwo.addEventListener('keydown', (e) => {
if((!inputTwo.value) && e.code === 'Backspace') {
    inputOne.focus();
    inputTwo.disabled = true;
    inputTwo.removeAttribute('class');
    inputThree.disabled = true;
    inputThree.removeAttribute('class');
    inputFour.disabled = true;
    inputFour.removeAttribute('class');
}
})

inputThree.addEventListener('keydown', (e) => {
    if((!inputThree.value) && e.code === 'Backspace') {
        inputTwo.focus();
        inputThree.disabled = true;
        inputThree.removeAttribute('class');
        inputFour.disabled = true;
        inputFour.removeAttribute('class');
    }
})

inputFour.addEventListener('keydown', (e) => {
    if((!inputFour.value) && e.code === 'Backspace') {
        inputThree.focus();
        inputFour.disabled = true;
        inputFour.removeAttribute('class');
    }
})