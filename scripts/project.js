//Variables
let projectBtn = document.querySelector('#project');
let aside = document.querySelector('.aside');
let side = document.querySelector('.side');
let closeSideBtn = document.querySelector('.close');
let addProjectBtn = document.querySelector('.button button')
let addProjectBox = document.querySelector('.addProjectMenu');
let closeAddProjectBox = document.querySelector('.closeProject');
let deadline = document.querySelector('#deadline');
let projectDisplay = document.querySelector('.projectDisplay');
let mainUI = document.querySelector('.container')

let editProjectBox = document.querySelector('.editProjectMenu');
let closeEditProjectBox = document.querySelector('.closeEditProject');

//EVENT LISTENER TO SHOW SIDE BAR FOR MOBILE VIEW
projectBtn.addEventListener('click', sideBarFun);

function sideBarFun() {
side.style.left = '0';
side.style.width = 'calc(100vw - 85px)';
closeSideBtn.style.display = 'block';
}

//EVENT LISTENER TO CLOSE SIDE BAR FOR MOBILE VIEW
closeSideBtn.addEventListener('click', closeSideBarFun);

function closeSideBarFun() {
    closeSideBtn.style.display = 'none';
    side.style.left = '-450px';
    side.style.width = '0';
}

//EVENT TO SHOW THE ADDPROJECT BOX
addProjectBtn.addEventListener('click', () => {
    addProjectBox.style.display = 'block';
    addProjectBox.style.opacity = '1';

    let date = new Date();
    let [day, month, year] = [
        String(date.getDate()).padStart(2, '0'),
        String(date.getMonth() + 1).padStart(2, '0'),
        String(date.getFullYear())
    ];
    deadline.setAttribute('min', `${year}-${month}-${day}`);
});

//EVENT TO CLOSE THE ADDPROJECT BOX 
closeAddProjectBox.addEventListener('click', closeProjectBox);
function closeProjectBox () {
    addProjectBox.style.display = 'none';
    addProjectBox.style.opacity = '0';
}


//CODE TO COLLECT THE DATA FOR CREATING THE PROJECT
let projectForm = document.querySelector('.projectForm');
projectForm.addEventListener('submit', collectProjectData);
let projectName = document.querySelector('#projectName');
let projectDescription = document.querySelector('#description')
let projectType = '';
//EVENT TO CHANGE TOGGLE THE TYPE OF PROJECT
let selfProject = document.querySelector('#selfProject');
let teamProject = document.querySelector('#teamProject');
    
    
selfProject.addEventListener('input', () => {
    projectType = 'self';
    teamProject.checked = false;
});
teamProject.addEventListener('input', () => {
    projectType = 'team';
    selfProject.checked = false;
});

function collectProjectData(e) {
    e.preventDefault();
    getFormData();
}

function getFormData() {
    if(projectName.value !== '' && projectDescription.value !== '' && deadline.value !== '' && projectType === 'self'){
        console.log('yes');
        
        let formData = {
            name: projectName.value,
            id: projectType,
            status: 'self',
            deadline: deadline.value,
            description: projectDescription.value,
            teamMember: ['../profilePic/profile1.jpg'],
            datedSection: []
        }
        //Push the formdata Object into the project Array
        project.push(formData);

        //Clear the input and the rekuired variables
        projectName.value = '';
        projectDescription.value = '';
        deadline.value = '';
        projectType = '';
        teamProject.checked = false;
        selfProject.checked = false;
        //Close the addProjectBox
        closeProjectBox();
        //Loop through the project Array
        projectDisplay.textContent = '';
        loopThrough()

    }

    if(projectName.value !== '' && projectDescription.value !== '' && deadline.value !== '' && projectType === 'team'){
    
        let formData = {
            name: projectName.value,
            id: projectType,
            status: 'teamAdmin',
            deadline: deadline.value,
            description: projectDescription.value,
            teamMember: ['../profilePic/profile1.jpg', '../profilePic/profile2.jpg', '../profilePic/profile3.jpg', '../profilePic/profile4.jpg'],
            datedSection: []
        }
        //Push the created project into the project Array
        project.push(formData);

        //Clear the input and the rekired variables
        projectName.value = '';
        projectDescription.value = '';
        deadline.value = '';
        projectType = '';
        teamProject.checked = false;
        selfProject.checked = false;
        //Close the addProjectBox
        closeProjectBox();
        //Loop through the project Array once again
        projectDisplay.textContent = '';
        loopThrough()
    }
}

//FUNCTION TO LOOP THROUGH PROJECT ARRAY
let taskElement = '';
let taskElementId = 0;
function loopThrough() {
    project.forEach((element, elementId) => {
        //Create a box and strt setting its content
        let projectBox = document.createElement('div');
        projectBox.setAttribute('class', 'projectBox');
        //Create the project panel and set the class
        let projectPanel = document.createElement('div');
        projectPanel.setAttribute('class', 'panel');
        //Create the image placeholder
        let imageHolder = document.createElement('div');
        imageHolder.setAttribute('class', 'imageHolder');
        //create the projectNameHolder and add its class
        let projectNameHolder = document.createElement('h2');
        
        //APPENDING NECESSARY CHILD ELEMENTS
        projectBox.appendChild(imageHolder);
        projectBox.appendChild(projectNameHolder);
        projectPanel.appendChild(projectBox);
        projectDisplay.appendChild(projectPanel);
        
        //APPENDING THE PROFILE PICTURES OF ALL PROJECT USERS
        element.teamMember.forEach((pic, index) => {
            //Create the picture frame, add the picture and append it to the image placeholder
            let mainFrame = document.createElement('div');
            mainFrame.setAttribute('class', 'mainFrame');
            mainFrame.style.backgroundImage = `url(${pic})`;
            mainFrame.style.transform = `translateX(${-10 * index}px)`;
            imageHolder.appendChild(mainFrame);
        })
        //ADDING THE NAME OF THE PROJECT TO THE PANEL
        projectNameHolder.textContent = element.name;

        //ADDING THE ADD PEOPLE BUTTON
        let addPeopleBtn = document.createElement('button');
        addPeopleBtn.innerHTML = 'Add new people <i class="fa-solid fa-user-plus"></i>';
        projectPanel.appendChild(addPeopleBtn);

        //ADDING EVENTLISTENERS FOR EACH PANEL SUCH THAT WHEN CLICKED- IT WILL DISPLAY A NEW U.I
        projectPanel.addEventListener('click', () => {
            taskElement = element;
            taskElementId = elementId;
            displayUI(taskElement, taskElementId)
        });
    });
}

//FUNCTION TO DISPLAY THE MAINUI
let bodyMain = document.createElement('div');
bodyMain.setAttribute('class', 'bodyMain');
function displayUI(element, elementId) {
    //CALL THE HEADINGMAIN FUNCTION TO DISPLAY THE HEADING SECTION OF THE MAINUI
    headingMainUI(element, elementId);
    bodyMainUI(element, elementId);

}
//FUNCTION THAT DISPLAYS THE HEADING SECTION OF THE MAINUI
function headingMainUI(element, elementId) {
    mainUI.innerHTML = '';
    //CREATE THE HEADING AND BODY SECTION FOR THE MAIN UI
    let headingMain = document.createElement('div');
    headingMain.setAttribute('class', 'headingMain');

    

    mainUI.appendChild(headingMain);
    mainUI.appendChild(bodyMain);

    //SETTING THE PROJECTNAME and APPENDING IT TO HEADINGMAIN
    let headDiv = document.createElement('div');
    headDiv.setAttribute('class', 'headDiv');

    let projectTitle = document.createElement('h1');
    projectTitle.textContent = `${element.name}`;

    headDiv.appendChild(projectTitle);
 

    let editPencil = document.createElement('p');
    editPencil.setAttribute('class', 'editPencil');
    editPencil.innerHTML = '<img src="../image/edit.png">';

    headDiv.appendChild(editPencil)
    headingMain.appendChild(headDiv);

    //ADDING THE FUNCTION SUCH THAT WHEN THE EDIT PENCIL IS CLICKED IT AUTOMATICALLY 
    //OPENS THE EDIT DIALOGUE BOX.
    editPencil.addEventListener('click', () => {
        openEditBox(element, elementId)
    })
    closeEditProjectBox.addEventListener('click', closeEditBox)

    //CREATING THE ADD TASK BUTTON AND APPENDING IT TO THE HEADING MAIN
    let addTaskButton = document.createElement('button');
    addTaskButton.innerHTML = 'Add new task &nbsp; <i class="fa-sharp fa-solid fa-plus"></i>';
    addTaskButton.setAttribute('class', 'addTask');
    headingMain.appendChild(addTaskButton);

    addTaskButton.addEventListener('click', () => {
        displayAddTaskMenu(element, elementId);
    })

    //SETTING THE DUE DATE AND APPENDING IT TO THE HEADING MAIN
    let deadlineHolder = document.createElement('div');
    deadlineHolder.setAttribute('class', 'deadlineHolder')
    headDiv.appendChild(deadlineHolder);

    deadlineHolder.textContent = `Due to ${dateConverter(element.deadline)}`;
}
function nextRefresh() {
    //getting the present date so i could know tommorrow's date
    let presentTime = new Date();
    let year = presentTime.getFullYear();
    let month = presentTime.getMonth() + 1;
    let day = presentTime.getDate() + 1;
    //tommorrow's date in seconds
    let nextTime = (new Date(`${month}/${day}/${year}`)).getTime();
    return nextTime;
}
//FUNCTION TO REFRESH THE PAGE ONCE IT IS A NEW DAY
function newDay(element, elementId) {
    //Getting the time in seconds for a new refresh
    // let presentTime = (new Date()).toLocaleDateString();
    let presentTimeSec = (new Date()).getTime();


    let nextTime = nextRefresh()

    let refreshTime = nextTime - presentTimeSec;

    setTimeout(function () {
        element.datedSection.forEach((data, dataId) => {
            let dateSectionDate = new Date(data.dateReal()).getTime();
            console.log('created day', new Date(data.dateReal()))
            data.task.forEach((task,taskId) => {
                //THE DEADLINE OF THE TASK IN SECONDS
                let taskDeadline = new Date(task.deadline).getTime();
                console.log('deadline day', new Date(task.deadline))

                //STORED DATA'S LAST DATE.
                let checkLastDate = '';
                if(element.datedSection.length !== 0){
                    checkLastDate = element.datedSection[0].dateReal();
                }
                let lastDate = new Date(checkLastDate);
                let formerTime = lastDate.getTime();
                //CHECKING IF THE DAY THE DATED SECTION'S DATE(THE ONE IN WHICH THE TASK WE ARE LOOKING AT IS INSIDE)
                //IS NOT TODAY AND THE TODAY'S DATE IS EQUAL TO OR NOT YET THE DEADLINE'S DATE.
                if (presentTimeSec > dateSectionDate && presentTimeSec <= taskDeadline && task.taskStatus === 'undone') {
                    //If today's date is ekual to the first item in the datedSection's created day
                    //Do this!!!
                    if(presentTimeSec === formerTime) {
                        let task = task
                        
                        //REMOVE THE TASK FROM ITS SECTION IN THE DATEDSECTION
                        data.task.splice(taskId, 1);
                        //PUT THE task IN THE task SECTION of the Previous Dated Section
                        element.datedSection[0].task.push(task);
    
                    }
                    
                    //if today's date is not stored in the first item of the dated section remove and push it upwards
                    if(presentTimeSec !== formerTime) {
                        let rawDate = new Date();

                        let taskSection = {
                            dateRefiner: function () {
                                let month = rawDate.getMonth();
                                let day = rawDate.getDate();
                                let year = rawDate.getFullYear();
        
                                let rawMonth = String(month).padStart(2, '0');
                                let rawDay = String(day).padStart(2, '0');
        
                                return `${rawMonth}/${rawDay}/${year}`;
                            },
                            dateReal: function () {
                                let month = rawDate.getMonth() + 1;
                                let day = rawDate.getDate();
                                let year = rawDate.getFullYear();
        
                                let rawMonth = String(month).padStart(2, '0');
                                let rawDay = String(day).padStart(2, '0');
        
                                return `${rawMonth}/${rawDay}/${year}`;
                            },
                            task: [task]
                        }
                        //REMOVE THE TASK FROM ITS SECTION IN THE DATEDSECTION
                        data.task.splice(taskId, 1);
                        //PUT THE taskSection in the datedSection since it is a new day.
                        element.datedSection.unshift(taskSection);

                    }

                    bodyMainUI(element, elementId);
                }
            })
        })
    }, refreshTime)
}
// FUNCTION TO DISPLAY THE BODY SECTION OF THE MAIN UI
function bodyMainUI(element, elementId) {
    bodyMain.innerHTML = '';

    newDay(element, elementId);
    
    //Displaying the tasks in the dated section by the dates they were created.
    element.datedSection.forEach((data, dataId) => {
        let dayBody = document.createElement('div');
        dayBody.setAttribute('class', 'dayBody');
        
        let date = document.createElement('h2');
        dayBody.appendChild(date);

        let todayDate = new Date();
        let stringDate = todayDate.toLocaleDateString();
        let getDay = new Date(stringDate);
        let newDateSec = getDay.getTime();

        let realDate = data.dateRefiner();
        let realYear = Number(realDate.slice('-4'));
        let realMonth = Number(realDate.slice('0', '2')) + 1;
        let realDay = Number(realDate.slice('3', '5'));
        let dater = `${realMonth}/${realDay}/${realYear}`;
        let oldDate = new Date(dater);
        let oldDateSec = oldDate.getTime();

        if (oldDateSec === newDateSec) {
            date.textContent = `Today`;
        } else {
            date.textContent = `${dateString(data.dateRefiner())}`;
        }
        bodyMain.appendChild(dayBody);

        let ulList = document.createElement('ul');
        dayBody.appendChild(ulList);

        createTask(data, ulList);
        
    })
}
//CREATE TASK LIST
function createTask(data, ulList) {
    //FOR EACH TASK CREATE A PANE THAT DISPLAYS THE TASK IN THE U.I
    data.task.forEach((task, taskNo) => {
        Paner(ulList, task, taskNo);
    })
    function Paner(ulList, task, taskNo) {
        //CREATE PANE
        let list = document.createElement('li');
        ulList.appendChild(list);
        //THE PANE ITSELF
        let taskPane = document.createElement('div');
        list.appendChild(taskPane);
        //THE SHOW MORE SECTION ELEMENT
        let extraDisplay = document.createElement('div');
        list.appendChild(extraDisplay);
        //MAKING THE CHECK BOX
        let label = document.createElement('label')
        label.setAttribute('class', `label`);
        label.setAttribute('for', 'check');

        let input = document.createElement('input');
            input.style.display = 'none';
            input.setAttribute('id', 'check');
            input.setAttribute('type', 'checkbox');
            label.appendChild(input);

            let tick = document.createElement('img');
            tick.setAttribute('src', '../image/check16.png');
            tick.setAttribute('class', 'tick');
            label.appendChild(tick);

            label.addEventListener('click', () => {
                if (task.taskStatus === 'undone') {
                    label.style.backgroundColor = 'green';
                    tick.style.display = 'block';
                    task.taskStatus = 'done';
                } else if (task.taskStatus === 'done'){
                    label.style.backgroundColor = '';
                    tick.style.display = 'none';
                    task.taskStatus = 'undone';
                }
            });
            function checkTask(task, input, label, tick) {
                if (task.taskStatus === 'undone') {
                    label.style.backgroundColor = 'green';
                    tick.style.display = 'block';
                    task.taskStatus = 'done';
                } else {
                    label.style.backgroundColor = '';
                    tick.style.display = 'none';
                    task.taskStatus = 'undone';
                }
            }

        
        taskPane.appendChild(label);
        //THE TITLE OF THE TASK
        let h3 = document.createElement('h3');
        taskPane.appendChild(h3);

        h3.textContent = task.title;

        //THE TEXT DESCRIPTION OF THE TASK
        let textDescrip = document.createElement('p');
        taskPane.appendChild(textDescrip);
        textDescrip.textContent = task.description;
        
    }
}
// Function to create separate event listener for each checkbox (using closure)
function createCheckboxEventListener(task, input, label, tick) {
    return function() {
        checkTask(task, input, label, tick);
    }
}

function dateString(date) {
    let year = date.slice('-4');
    let rawMonth = date.slice('0', '2');
    let day = date.slice('3', '5');
    
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    let month = months[Number(rawMonth)];
    
    return `${day} ${month}, ${year}`;
    }
//VARIABLES FOR THE ADDTASK MENU
let addTaskMenu = document.querySelector('.addTaskMenu');
let closeTaskMenuBtn = document.querySelector('.closeTaskMenu');
let addTaskForm = document.querySelector('.addTaskForm'); 
let taskTitle = document.querySelector('#taskTitle');
let taskDescription = document.querySelector('#taskDescription');
let addAssignee = document.querySelector('#addAssignee');
let taskDeadline = document.querySelector('#taskDeadline');


//FUNCTION FOR DISPLAYING addTaskMenu
function displayAddTaskMenu(element, elementId) {
    addTaskMenu.style.display = 'block';
    addTaskMenu.style.opacity = 1;

    
    if(element.status === 'self') {
        addAssignee.value = 'self';
        addAssignee.disabled = true;
    }
    if(element.status === 'teamAdmin') {
        addAssignee.value = 'self';
        addAssignee.disabled = false;
    }
    let date = new Date();
    let [day, month, year] = [
        String(date.getDate()).padStart(2, '0'),
        String(date.getMonth() + 1).padStart(2, '0'),
        String(date.getFullYear())
    ];
    taskDeadline.setAttribute('min', `${year}-${month}-${day}`);
}
//SUBMIT THE ADDTASK DATA
addTaskForm.addEventListener('submit', (e) => {
    element = taskElement;
    elementId = taskElementId;
    e.preventDefault();
    if(taskTitle.value !== '' || taskDescription.value !== '' || addAssignee.value !== '' || taskDeadline.value !== '') {
        
        //TODAY'S PRESENT DATE.
        let rawDate = new Date();
        let dateString = rawDate.toLocaleDateString();
        let taskDate = new Date(dateString);
        let presentTime = taskDate.getTime();

        //STORED DATA'S LAST DATE.
        let checkLastDate = '';
        if(element.datedSection.length !== 0){
            checkLastDate = element.datedSection[0].dateReal();
        }
        let lastDate = new Date(checkLastDate);
        let formerTime = lastDate.getTime();

        //IF THERE WAS A SAVED DATA IN TODAY'S PRESENT DATE.
        if(presentTime === formerTime) {
            let task = {
                title: taskTitle.value.trim(),
                description: taskDescription.value.trim(),
                deadline: taskDeadline.value.trim(),
                taskStatus: 'undone',
                deadlint() {
                    let date = taskDeadline.value.trim();
                    let year = date.slice(0, 5);
                    let month = date.slice(6, 8);
                    let day = date.slice(-2);

                    return `${month}/${day}/${year}`;
                },
                assignee: [`${addAssignee.value.trim()}`],
                assignorPic: function () {
                    if(this.assignee === 'self') {
                        return '../profilePic/profile1.jpg'; 
                    }
                },
                profilePic: ['../profilePic/profile2.jpg', '../profilePic/profile3.jpg', '../profilePic/profile4.jpg']
            }
            
            //PUT THE task IN THE task SECTION of the Previous Dated Section
            element.datedSection[0].task.push(task);

            //CLEAR THE INPUTS
            taskTitle.value = '';
            taskDescription.value = '';
            addAssignee.value = '';
            taskDeadline.value = '';

            //CLOSE THE ADD TASK MENU IMMEDIATELY AFTER THE SUBMIT BUTTON IS CLICKED
            closeAddTaskMenu();
            bodyMainUI(element, elementId);
            return;
        }

        //PUT TASK IN A NEW SECTION IF THE DATEDSECTION IS EMPTY 
        // OR THE LAST sAVED TASK'S DATE IS NOT EKUALS TO TODAY'S DATE
        if(element.datedSection.length === 0 || presentTime !== formerTime) {
            let taskSection = {
                dateRefiner: function () {
                    let month = rawDate.getMonth();
                    let day = rawDate.getDate();
                    let year = rawDate.getFullYear();

                    let rawMonth = String(month).padStart(2, '0');
                    let rawDay = String(day).padStart(2, '0');

                    return `${rawMonth}/${rawDay}/${year}`;
                },
                dateReal: function () {
                    let month = rawDate.getMonth() + 1;
                    let day = rawDate.getDate();
                    let year = rawDate.getFullYear();

                    let rawMonth = String(month).padStart(2, '0');
                    let rawDay = String(day).padStart(2, '0');

                    return `${rawMonth}/${rawDay}/${year}`;
                },
                task: [{
                    title: taskTitle.value.trim(),
                    description: taskDescription.value.trim(),
                    deadline: taskDeadline.value.trim(),
                    taskStatus: 'undone',
                    deadlint() {
                        let date = taskDeadline.value.trim();
                        let year = date.slice(0, 5);
                        let month = date.slice(6, 8);
                        let day = date.slice(-2);

                        return `${month}/${day}/${year}`;
                    },
                    assignee: [`${addAssignee.value.trim()}`],
                    assignorPic: function () {
                        if(this.assignee === 'self') {
                            return '../profilePic/profile1.jpg'; 
                        }
                    },
                    profilePic: ['../profilePic/profile2.jpg', '../profilePic/profile3.jpg', '../profilePic/profile4.jpg']
                }]
            }
            //PUT THE taskSection in the datedSection since it is a new day.
            element.datedSection.unshift(taskSection);

            //CLEAR THE INPUTS
            taskTitle.value = '';
            taskDescription.value = '';
            addAssignee.value = '';
            taskDeadline.value = '';

            //CLOSE THE ADD TASK MENU IMMEDIATELY AFTER THE SUBMIT BUTTON IS CLICKED
            closeAddTaskMenu();
            bodyMainUI(element, elementId);
            return;
        }
    }
})
//EVENT LISTENER TO CLOSE THE addTaskMenu
closeTaskMenuBtn.addEventListener('click', closeAddTaskMenu)
function closeAddTaskMenu() {
    addTaskMenu.style.display = 'none';
    addTaskMenu.style.opacity = 0;
}

function dateConverter(date) {
let year = date.slice('0', '4');
let rawMonth = date.slice('5', '7');
let day = date.slice('-2');

let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
let month = months[Number(rawMonth)];

return `${day} ${month}, ${year}`;
}
//VARIABLES FOR THE EDIT BOX
let editName = document.querySelector('#editName');
let editDescription = document.querySelector('#editDescription');
let editDeadline = document.querySelector('#editDeadline');
let editSelfProject = document.querySelector('#editSelfProject');
let editTeamProject = document.querySelector('#editTeamProject');
let submitEditData = document.querySelector('.editForm');

let deleteProject = document.querySelector('.deleteProject');
let deleteDialogueMenu = document.querySelector('.deleteDialogueMenu');
let closeDialogueMenu = document.querySelector('.closeDialogueMenu');
let deleteQuestion = document.querySelector('.deleteQuestion');
let yesBtn = document.querySelector('.del_yes');
let noBtn = document.querySelector('.del_no');

let removeMemberBox = document.querySelector('.removeMember');
let editProjectType = '';


let elementSpace = 0;
//FUNCTION TO DISPLAY THE EDIT BOX
function openEditBox(element, elementId) {
    editProjectBox.style.display = 'block';
    editProjectBox.style.opacity = '1';

    elementSpace = elementId;

    //FILL IN THE SAVED DATA ON THE FORM
    editName.value = element.name;
    editDescription.value = element.description;
    editDeadline.value = element.deadline;

    // editSelfProject.checked = false;
    // editTeamProject.checked = false;

    if(element.status === 'teamAdmin') {
        editTeamProject.checked = true;
        editProjectType = 'teamAdmin';
        removeMemberBox.style.display = 'block';
    }
    if(element.status === 'self') {
        editSelfProject.checked = true;
        editProjectType = 'self';
        removeMemberBox.style.display = 'none';
    }

    // ADD THE MINIMUM VALUE FOR editDeadline
    let date = new Date();
    let [day, month, year] = [
        String(date.getDate()).padStart(2, '0'),
        String(date.getMonth() + 1).padStart(2, '0'),
        String(date.getFullYear())
    ];
    editDeadline.setAttribute('min', `${year}-${month}-${day}`);

    //THE CODE TO TOGGLE THE CHECKBOXES
    editSelfProject.addEventListener('input', () => {
        element.status = 'self';
        editProjectType = 'self';
        removeMemberBox.style.display = 'none';
        editTeamProject.checked = false;
    });
    editTeamProject.addEventListener('input', () => {
        element.status = 'teamAdmin';
        editProjectType = 'teamAdmin';
        removeMemberBox.style.display = 'block';
        editSelfProject.checked = false;
    });
    //FUNCTION TO DELETE PROJECT
    deleteProject.addEventListener('click', () => {
        openDeleteDialogue();
    })
    function openDeleteDialogue() {
        deleteDialogueMenu.style.display = 'block';
        deleteDialogueMenu.style.opacity = '1';

        deleteQuestion.innerHTML = `Are you sure you want to delete project <span>${element.name}</span>?`;    
    }
    //FUNCTION TO CLOSE THE deleteDialogueMenu
    closeDialogueMenu.addEventListener('click', closeDeleteDialogue)
    function closeDeleteDialogue() {
        deleteDialogueMenu.style.display = 'none';
        deleteDialogueMenu.style.opacity = '0';
    }
    yesBtn.addEventListener('click', () => {
        project.splice(elementId, 1);
        closeDeleteDialogue();
        closeEditBox();
        projectDisplay.innerHTML = '';
        loopThrough();
        mainUI.innerHTML = '';
    })
    noBtn.addEventListener('click', () => {
        closeDeleteDialogue();
    })
}
function closeEditBox() {
    editProjectBox.style.display = 'none';
    editProjectBox.style.opacity = '0';

    //Clear the input and the rekired variables
    editName.value = '';
    editDescription.value = '';
    editDeadline.value = '';
    editProjectType = '';
    editTeamProject.checked = false;
    editSelfProject.checked = false;
}

submitEditData.addEventListener('submit', (e) => {
    e.preventDefault();
    saveEditedData();
});

function saveEditedData() {
    if(editName.value !== '' && editDescription.value !== '' && editDeadline.value !== '' && editProjectType === 'self'){
        let formData = {
            name: editName.value,
            id: editProjectType,
            status: 'self',
            deadline: editDeadline.value,
            description: editDescription.value,
            teamMember: ['../profilePic/profile1.jpg'],
            datedSection: []
        }

        
        //REMOVE THE PRESENT OBJECT AND REPLACE WITH THE EDITED PROJECT
        //and Push the created project into the project Array
        project.splice(project[elementSpace], 1, formData)

        
        //Clear the input and the rekired variables
        editName.value = '';
        editDescription.value = '';
        editDeadline.value = '';
        editProjectType = '';
        editTeamProject.checked = false;
        editSelfProject.checked = false;
        //Close the editProjectBox
        closeEditBox();
        //Loop through the project Array once again
        projectDisplay.textContent = '';
        loopThrough();
        displayUI(formData, elementSpace);
    }

    if(editName.value !== '' && editDescription.value !== '' && editDeadline.value !== '' && editProjectType === 'teamAdmin'){
        let formData = {
            name: editName.value,
            id: editProjectType,
            status: 'teamAdmin',
            deadline: editDeadline.value,
            description: editDescription.value,
            teamMember: ['../profilePic/profile1.jpg', '../profilePic/profile2.jpg', '../profilePic/profile3.jpg', '../profilePic/profile4.jpg'],
            datedSection: []
        }

        
        //REMOVE THE PRESENT OBJECT AND REPLACE WITH THE EDITED PROJECT
        project.splice(project[elementSpace], 1)
        //Push the created project into the project Array
        project.push(formData);

        //Clear the input and the rekired variables
        editName.value = '';
        editDescription.value = '';
        editDeadline.value = '';
        editProjectType = '';
        editTeamProject.checked = false;
        editSelfProject.checked = false;
        //Close the editProjectBox
        closeEditBox();
        //Loop through the project Array once again
        projectDisplay.textContent = '';
        loopThrough();
        displayUI(formData, elementSpace);
    }
}