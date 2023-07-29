let password = document.querySelector('#password');
let instructions = document.querySelector('.instructions');
let secondInstruction = document.querySelector('.instruction');
let firstLight = document.querySelector('.firstLight');
let secondLight = document.querySelector('.secondLight');
let thirdLight = document.querySelector('.thirdLight');
let fourthLight = document.querySelector('.fourthLight');
let fifthLight = document.querySelector('.fifthLight');
let form = document.querySelector('form');
let username = document.querySelector('#username');
let email = document.querySelector('#email')

//THE ADD EVENT LISTENER FOR THE PASSWORD
password.addEventListener('input', passwordFunction)

let capital = false;
let lower = false;
let special = false;
let length = false
let number = false;

function passwordFunction() {
    let passwordValue = password.value;
    instro = [];
    parameters = ['uppercase letters', 'lowercase letters', 'special characters', 'numbers'];
    capital = false;
    lower = false;
    special = false;
    length = false
    number = false;
    let text = '';

    //CHECKING IF AN UPPERCASE LETTER EXIST IN THE PASSWORD VALUE; IF IT DOES- DO THE BELOW
    if (/[A-Z]/.test(passwordValue) && (instro.indexOf('capital') === -1)) {
        instro.push('capital');
        capital = true;
        parameters.splice(parameters.indexOf('uppercase letters'), 1);
        //IF IT DOES NOT EXIST; DO THIS
    }else if (!(/[A-Z]/.test(passwordValue)) && instro.indexOf('capital') !== -1){
        instro.splice('capital', 1);
        capital = false;
    }

    //CHECKING IF A LOWERCASE LETTER EXISTS IN THE PASSWORD VALUE; IF IT DOES- DO THE BELOW
    if (/[a-z]/.test(passwordValue) && (instro.indexOf('lower') === -1)) {
        instro.push('lower');
        lower = true;
        parameters.splice(parameters.indexOf('lowercase letters'), 1);
        //IF IT DOES NOT EXIST; DO THIS
    }else if (!(/[a-z]/.test(passwordValue)) && instro.indexOf('lower') !== -1){
        instro.splice('lower', 1);
        lower = false;
    }
    
    //CHECKING IF A SPECIAL CHARACTER EXISTS IN THE PASSWORD VALUE; IF IT DOES- DO THE BELOW
    if (/[!@#$%^&*(),.?":{}|<>]/.test(passwordValue) && (instro.indexOf('special') === -1)) {
        instro.push('special');
        special = true;
        parameters.splice(parameters.indexOf('special characters'), 1);
        //IF IT DOES NOT EXIST; DO THIS
    } else if (!(/[^\w\s]/.test(passwordValue)) && instro.indexOf('special') !== -1){
        instro.splice('special', 1);
        special = false;
    }

    //CHECKING IF A NUMBER EXISTS IN THE PASSWORD VALUE; IF IT DOES- DO THE BELOW
    if (/\d/.test(passwordValue) && (instro.indexOf('number') === -1)) {
        instro.push('number');
        number = true;
        parameters.splice(parameters.indexOf('numbers'), 1);
        //IF IT DOES NOT EXIST; DO THE BELOW
    } else if (!(/\d/.test(passwordValue)) && instro.indexOf('number') !== -1){
        instro.splice('number', 1);
        number = false;
    }
    
    //CHECKING IF THE PASSWORD VALUE IS LONGER THAN EIGHT; IF IT DOES- DO THE BELOW
    if((passwordValue.length >= 8) && (instro.indexOf('length') === -1)) {
        instro.push('length');
        length= true;
        //IF IT DOES NOT EXIST; DO THE BELOW
    } else if (!(passwordValue.length >= 8) && instro.indexOf('length') !== -1) {
        instro.splice('length', 1);
        length = false;
    }

    //DYNAMIC INSTRUCTION TEXTCONTENT FOR THE div.instructions
    if (parameters.length === 0) {
        instructions.textContent = '';
    }else if (parameters.length === 1) {
        instructions.textContent = `Password must contain ${parameters[0]}.`;
    } else if (parameters.length === 2) {
        instructions.textContent = `Password must contain ${parameters[0]} and ${parameters[1]}.`;
    } else if (parameters.length >= 3) {
        for(let i = 0; i < parameters.length; i++) {
            if(i === 0) {
                text = ``
                instructions.textContent = `Password must contain ${parameters[i]}, `;
            }else if (i === (parameters.length - 2)) {
                instructions.textContent += `${parameters[i]} and `;
            } else if (i === (parameters.length - 1)) {
                instructions.textContent += `${parameters[i]}.`;
            } else if (i > 0){
                instructions.textContent += `${parameters[i]}, `;
            }
        }
    }

    if (length) {
        secondInstruction.textContent = ``;
    } else {
        secondInstruction.textContent = `Password length must also be longer than eight`;
    }

    //CODE TO SIGNAL THE PASSWORD STRENGTH
    firstLight.style.backgroundColor = '';
    secondLight.style.backgroundColor = '';
    thirdLight.style.backgroundColor = '';
    fourthLight.style.backgroundColor = '';
    fifthLight.style.backgroundColor = '';

    switch(instro.length) {
        case 1:
        firstLight.style.backgroundColor = 'rgb(241, 158, 32)';
        break;
    
        case 2:
        firstLight.style.backgroundColor = 'rgb(241, 158, 32)';
        secondLight.style.backgroundColor = 'rgb(241, 158, 32)';
        break;

        case 3:
        firstLight.style.backgroundColor = 'rgb(241, 158, 32)';
        secondLight.style.backgroundColor = 'rgb(241, 158, 32)';
        thirdLight.style.backgroundColor = 'rgb(241, 158, 32)';
        break;

        case 4:
        firstLight.style.backgroundColor = 'rgb(241, 158, 32)';
        secondLight.style.backgroundColor = 'rgb(241, 158, 32)';
        thirdLight.style.backgroundColor = 'rgb(241, 158, 32)';
        fourthLight.style.backgroundColor = 'rgb(241, 158, 32)';
        break;

        case 5:
        firstLight.style.backgroundColor = 'rgb(241, 158, 32)';
        secondLight.style.backgroundColor = 'rgb(241, 158, 32)';
        thirdLight.style.backgroundColor = 'rgb(241, 158, 32)';
        fourthLight.style.backgroundColor = 'rgb(241, 158, 32)';
        fifthLight.style.backgroundColor = 'rgb(241, 158, 32)';
        break;
    }
}

form.addEventListener('submit', function submit(e) {
    if(email.value === '' || username.value === '' || !capital || !lower || !special || !length || !number) {
        e.preventDefault();
    }
});