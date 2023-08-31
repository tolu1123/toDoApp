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

//The search input box variable
let search = document.querySelector('#search');

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
    console.log('closed');
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
function closeProjectBox() {
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
        let formData = {
            name: projectName.value,
            id: projectType,
            status: 'self',
            deadline: deadline.value,
            description: projectDescription.value,
            projectMembers: [userId],
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
        //if the width of the browser is less than 991px we want to close the sideBar automatically.
        if (window.innerWidth < 991){
            closeSideBarFun();
        }

    }

    if(projectName.value !== '' && projectDescription.value !== '' && deadline.value !== '' && projectType === 'team'){
    
        let formData = {
            name: projectName.value,
            id: projectType,
            status: 'teamAdmin',
            deadline: deadline.value,
            description: projectDescription.value,
            projectMembers: [userId, 'dramaticKoder', 'codeNinja', 'pythania', 'tasker101', 'renewedSon'],
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
        //if the width of the browser is less than 991px
        if (window.innerWidth < 991){
            closeSideBarFun();
        }
    }
}
let panel = ''
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
        panel = projectPanel;
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

        //CLEAR THE MAINUI
        mainUI.innerHTML = '';
        //ADDING EVENTLISTENERS FOR EACH PANEL SUCH THAT WHEN CLICKED- IT WILL DISPLAY A NEW U.I
        projectPanel.addEventListener('click', () => {
            panelist(element, elementId, projectPanel);
        });

        if(project.length - 1 === elementId) { 
            panelist(element, elementId, projectPanel);
        }
    });
    
}
//FUNCTION TO DISPLAY THE PANEL WHEN CLICKED OR CREATED.
function panelist(element, elementId, projectPanel) {
    taskElement = element;
    taskElementId = elementId;
    let panels = document.querySelectorAll('.panel');
    panels.forEach(panel => {
        panel.style.backgroundColor = '#fff';
    })
    projectPanel.style.backgroundColor = '#f0f0f0';
    displayUI(taskElement, taskElementId)
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

    //Append the heading section to the mainUI
    mainUI.appendChild(headingMain);
    //Append the body section to the mainUI
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
    //getting today's date at exactly 12:00 AM so i could know tommorrow's date
    let todayat12am = new Date(new Date().toLocaleDateString()).getTime();
    //tommorrow's date in seconds
    let tommorrowat12am = todayat12am + (24 * 3600 * 1000);
    return tommorrowat12am;
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

        createTask(element, data, ulList);
        
    })
}
//CREATE TASK LIST
function createTask(element, data, ulList) {
    //FOR EACH TASK In the datedSECTION CREATE A PANE THAT DISPLAYS THE TASK IN THE U.I
    data.task.forEach((task, taskNo) => {
        createTaskList(element, ulList, task, taskNo);
    })
     

    function createTaskList(element, ulList, task, taskNo) {
        console.log('createdTasks!')
        //CREATE PANE
        let list = document.createElement('li');
        ulList.appendChild(list);
        //THE PANE ITSELF
        let taskPane = document.createElement('div');
        list.appendChild(taskPane);
        //THE SHOW MORE SECTION ELEMENT
        let extraDisplay = document.createElement('div');
        extraDisplay.style.display = 'none';
        // extraDisplay.textContent = 'LOREM IPSUM DOLOR I DO NOT KNOW WHAT I AM MEELING BUT SURELY I HAVE BEEN ABLE TO UNDERSTAND IT WELL.';
        
        list.appendChild(extraDisplay);

        //MAKING THE CHECK BOX
        let label = document.createElement('label')
        label.setAttribute('class', `label`);
        label.setAttribute('for', 'check');
        //SET THE DYNAMIC ID FOR THE LABEL ATTRIBUTE
        label.setAttribute('id', `data_${data.dateReal().replace(/[\\/]/g, '_')}_${taskNo}`);

        let input = document.createElement('input');
        input.style.display = 'none';
        input.setAttribute('id', 'check');
        input.setAttribute('type', 'checkbox');
        // label.appendChild(input);

        let tick = document.createElement('img');
        tick.setAttribute('src', '../image/check16.png');
        tick.setAttribute('class', 'tick');
        label.appendChild(tick);

        
        
        taskPane.appendChild(label);
        //THE TITLE OF THE TASK
        let h3 = document.createElement('h3');
        taskPane.appendChild(h3);

        h3.textContent = task.title;

        //THE TEXT DESCRIPTION OF THE TASK
        let textDescrip = document.createElement('p');
        taskPane.appendChild(textDescrip);
        textDescrip.textContent = task.description;

        label.addEventListener('click', () => {
            if(element.status === 'self' || element.status === 'teamAdmin'){
            checkTask(task, label, tick);
            }
        });

        function checkTask(task, label, tick) {
            if (task.taskStatus === 'undone') {
                label.style.backgroundColor = 'mediumseagreen';
                tick.style.display = 'block';
                task.taskStatus = 'done';
                textDescrip.style.textDecoration = 'line-through';
            } else {
                label.style.backgroundColor = '';
                tick.style.display = 'none';
                task.taskStatus = 'undone';
                textDescrip.style.textDecoration = 'none';
            }
        }
        if (task.taskStatus === 'done') {
            label.style.backgroundColor = 'mediumseagreen';
            tick.style.display = 'block';
            task.taskStatus = 'done';
            textDescrip.style.textDecoration = 'line-through';
        } else {
            label.style.backgroundColor = '';
            tick.style.display = 'none';
            task.taskStatus = 'undone';
            textDescrip.style.textDecoration = 'none';
        }

        let profileShowBtnElement = document.createElement('div');
        profileShowBtnElement.setAttribute('class', 'profileShowBtnElement');
        taskPane.appendChild(profileShowBtnElement);
        let profileEle = document.createElement('div');
        profileEle.setAttribute('class', 'profileEle');
        profileShowBtnElement.appendChild(profileEle);

        //ADDING THE FUNCTIONALITY FOR THE ASSIGNEE'S PROFILE PIC THAT APPEARS NEXT TO THE TASK
        //IF THE PROJECT IS A SELF PROJECT
        if (element.status === 'self') {
            const assigneeProfilePic = document.createElement('div');
            assigneeProfilePic.setAttribute('class', 'assigneeProfilePic');
            assigneeProfilePic.style.backgroundImage = `url(${task.assignorPic})`;
            profileEle.appendChild(assigneeProfilePic);

        } else {
            //IF IT IS A TEAM PROJECT
            if(task.assignee.indexOf(userId) !== -1 && task.assignee.length === 1) {
                //IF THE TASKS'S ASSIGNEE IS ONLY THE TEAM ADMIN-PUT THE PROFILEPIC OF THE ADMIN
                const assigneeProfilePic = document.createElement('div');
                assigneeProfilePic.setAttribute('class', 'assigneeProfilePic');
                assigneeProfilePic.style.backgroundImage = `url(${task.assignorPic})`;
                profileEle.appendChild(assigneeProfilePic);
            } else if (task.assignee.indexOf(userId) !== -1 && task.assignee.length > 1) {
                //IF THE TASK'S ASSIGNEE CONTAINS TEAM ADMIN AND OTHERS
                task.assignee.forEach((eachPic, index) => {
                    if(eachPic === 'self') {
                        const assigneeProfilePic = document.createElement('div');
                        assigneeProfilePic.setAttribute('class', 'assigneeProfilePic');
                        assigneeProfilePic.style.backgroundImage = `url(${task.assignorPic})`;
                        assigneeProfilePic.style.transform = `translate(${index * -10}px)`;
                        profileEle.appendChild(assigneeProfilePic);
                    } else {
                        const assigneeProfilePic = document.createElement('div');
                        assigneeProfilePic.setAttribute('class', 'assigneeProfilePic');
                        assigneeProfilePic.style.backgroundImage = `url(${task.profilePic[index % 3]})`;
                        assigneeProfilePic.style.transform = `translate(${index * -10}px)`;
                        profileEle.appendChild(assigneeProfilePic);
                    }
                })
            } else if (task.assignee.indexOf(userId) === -1) {
                //IF THE TASK'S ASSIGNEE DOES NOT CONTAIN THE TEAMADMIN
                task.assignee.forEach((eachPic, index) => {
                    const assigneeProfilePic = document.createElement('div');
                    assigneeProfilePic.setAttribute('class', 'assigneeProfilePic');
                    //The line below is a simple trick used to assign profile picture
                    assigneeProfilePic.style.backgroundImage = `url(${task.profilePic[index % 3]})`;
                    assigneeProfilePic.style.transform = `translate(${index * -10}px)`;
                    profileEle.appendChild(assigneeProfilePic);
                })
            }
        }

        let showMoreIcon = document.createElement('div');
        showMoreIcon.setAttribute('class', 'showMoreIcon');
        showMoreIcon.innerHTML = '<i class="fa-sharp fa-regular fa-angle-down"></i>';
        profileShowBtnElement.appendChild(showMoreIcon);

        //THE ADDEVENT LISTENER TO DISPLAY THE EXTRA DISPLAY.
        showMoreIcon.addEventListener('click', () => {
            if(task.taskVisible === 'closed') {
                showMoreIcon.style.transform = 'rotate(-180deg)';
                showMoreIcon.style.position = 'relative';
                showMoreIcon.style.bottom = '4px';
                task.taskVisible = 'opened';
                extraDisplay.style.display = 'block';
            } else {
                showMoreIcon.style.transform = `rotate(0deg)`;
                task.taskVisible = 'closed';
                showMoreIcon.style.position = 'relative';
                showMoreIcon.style.bottom = '0';
                extraDisplay.style.display = 'none';
            }
        })

        //APPENDING THE CONTENTS OF THE EXTRA DISPLAY INFORMATION
        let taskTitle = document.createElement('h2');
        taskTitle.textContent = task.title;
        //The div that houses the description input and button
        let taskDescripDiv = document.createElement('div');
        taskDescripDiv.setAttribute('class', 'taskDescripDiv');
        
        //THE textarea for the description;
        let taskDescriptionContent = document.createElement('textarea');
        taskDescriptionContent.setAttribute('class', 'disabledTaskDescrip');
        taskDescriptionContent.disabled = true;
        taskDescriptionContent.value = task.description;
        taskDescripDiv.appendChild(taskDescriptionContent);
        extraDisplay.appendChild(taskTitle);
        extraDisplay.appendChild(taskDescripDiv);
        //if i am the admin or a self user then do this.
        if(element.status === 'teamAdmin' || element.status === 'self') {
            /*ADD AN EDIT BUTTON TO EDIT THE DESCRIPTION OF THE TASK IF ONLY ONE IS AN ADMIN OR
             A LONE USER*/
            let editDescriptionBtn = document.createElement('button');
            editDescriptionBtn.setAttribute('class', 'editDescriptionBtn');
            //THE CONDITIONAL THAT ENSURES THE BUTTON INSTRUCTION BASED ON USER'S SCREEN
            if (window.innerWidth < 991) {
                editDescriptionBtn.textContent = 'Edit';
            } else {
                editDescriptionBtn.textContent = 'Edit description';
            }
            taskDescripDiv.appendChild(editDescriptionBtn);
            
            let y = 'edit';
            //THIS EVENT LISTENER IS USED TO EDIT AND SAVE THE DESCRIPTION INPUTED IN
            editDescriptionBtn.addEventListener('click', () => {
                if (y === 'edit') {
                    y = 'save';
                    taskDescriptionContent.disabled = false;
                    taskDescriptionContent.setAttribute('class', 'enableTaskDescrip');
                    editDescriptionBtn.textContent = 'Save';
                } else if (y === 'save') {
                    y = 'edit';
                    task.description = taskDescriptionContent.value;
                    taskDescriptionContent.disabled = true;
                    taskDescriptionContent.setAttribute('class', 'disabledTaskDescrip');
                    //THE CONDITIONAL THAT ENSURES THE BUTTON'S TEXTCONTENT BASED ON USER'S SCREEN
                    if (window.innerWidth < 991) {
                        editDescriptionBtn.textContent = 'Edit';
                    } else {
                        editDescriptionBtn.textContent = 'Edit description';
                    }
                    textDescrip.textContent = task.description;
                }
            })

            //CREATING THE DIV THAT HOUSES THE DEADLINE BUTTON AND THE INVISIBLE DATE INPUT
            let deadlineDiv = document.createElement('div');
            deadlineDiv.setAttribute('class', 'deadlineDiv');
            extraDisplay.appendChild(deadlineDiv);
            // Create Extend Deadline Button and append it to the deadlineDiv element
            let extendDeadlineBtn = document.createElement('button');
            //Setting the textContent, set the class of the deadline Button and append it.
            extendDeadlineBtn.textContent = 'Extend deadline';
            extendDeadlineBtn.setAttribute('class', 'extendDeadlineBtn');
            deadlineDiv.appendChild(extendDeadlineBtn);
            //Creating the input box
            let deadlineInput = document.createElement('input');
            deadlineInput.setAttribute('class', 'deadlineInput');
            deadlineInput.type = 'date';
            deadlineDiv.appendChild(deadlineInput);
            setMinimumDate(deadlineInput);

        }
        
        
        let assigneeList = [...element.projectMembers];

        function filterAssignee() {
        //Get the names of the assignee that can be added.(means the name of the task assignee cannot be added again unless removed)
        assigneeList = assigneeList.filter((assignee) => task.assignee.indexOf(assignee) === -1)
        }

        //if i am the admin i have the privledge of adding assignee to a task or removing an assignee
        if(element.status === 'teamAdmin') {
            //CREATING THE ADD MORE ASSIGNEE OR REMOVE ASSIGNEE FUNCTIONALITY

            //Creating the box that generally houses the add more assignee functionality
            let addAssigneeBox = document.createElement('div');
            addAssigneeBox.setAttribute('class', 'addAssigneeBox');
            extraDisplay.appendChild(addAssigneeBox);

            //The label for the inputAssignee(element) input
            let inputAssigneeLabel = document.createElement('label');
            inputAssigneeLabel.setAttribute('class', 'inputAssigneeLabel')
            inputAssigneeLabel.setAttribute('for', 'inputAssignee')
            inputAssigneeLabel.textContent = 'Add assignee:';
            addAssigneeBox.appendChild(inputAssigneeLabel);

            //**create the box that will house the input that collects the name to be added
            //and will also also house the suggestionList
            let addRemoveBox = document.createElement('div');
            addRemoveBox.setAttribute('class', 'addRemoveBox');
            addAssigneeBox.appendChild(addRemoveBox);

            //create the button to save the added Assignee
            let saveAssignee = document.createElement('button');
            saveAssignee.textContent = 'Add';
            addAssigneeBox.appendChild(saveAssignee);

            //Get the available assignees
            filterAssignee();

            //Create the input for taking down names.AND put it inside the parent 'addRemoveBox'
            let inputAssignee = document.createElement('input');
            addRemoveBox.appendChild(inputAssignee);
            inputAssignee.setAttribute('class', 'inputAssignee');
            inputAssignee.setAttribute('id', 'inputAssignee');
            //Create the error message box that will show the suggestion error if any is found
            let errorSuggestionBox = document.createElement('div');
            errorSuggestionBox.setAttribute('class', 'errorSuggestionBox');
            addRemoveBox.appendChild(errorSuggestionBox);
            //Display the suggestion list based on if the value in the inputAssignee is also inside the available assigneeList
            //Create the suggestion list
            let assigneeSuggestion = document.createElement('ul');
            assigneeSuggestion.setAttribute('class', 'assigneeSuggestion');
            addRemoveBox.appendChild(assigneeSuggestion);
            let foundSuggestions = [];

            //Flag for the error suggeston
            let alreadyAnAssignee = false;
            
            inputAssignee.addEventListener('input', addMoreAssignee);
            function addMoreAssignee() {
                //clear the foundSuggestons array on input again.
                foundSuggestions = [];
                
                //clear the flag
                alreadyAnAssignee = false;

                //clear the contents of the errorBox
                errorSuggestionBox.textContent = '';
                if(inputAssignee.value !== '') {
                    assigneeList.forEach((assignee) => {
                        //When the input value is equals to any of the other available assignees
                        //do this
                        if(assignee.toLowerCase().startsWith(inputAssignee.value.toLowerCase())) {
                            //Add found names to the suggestion list
                            foundSuggestions.push(assignee); 
                            //If the value does not start with what is inside the assigneeList
                        } else {
                            assigneeSuggestion.style.display = 'none';
                        }
                    })


                    //ERROR HANDLER FOR THE SUGGESTION LIST
                    if(task.assignee.includes(inputAssignee.value)) {
                        errorSuggestionBox.textContent = 'You cannot add an already assigned assignee to the same task.';
                        errorSuggestionBox.style.display = 'block';
                        alreadyAnAssignee = true;
                        return;
                    } 

                    assigneeList.forEach((assignee) => {
                          //If the value does not start with what any of the projectMember inside 
                          //the assigneeList--- The value is not a projectMember
                        if (!(assignee.toLowerCase().startsWith(inputAssignee.value.toLowerCase()))){
                            errorSuggestionBox.textContent = `"${inputAssignee.value.trim()}" is not a Project member.`;
                            errorSuggestionBox.style.display = 'block';
                        }
                    });
                    //This conditonal block creates the suggestions list and displays it.
                    if (foundSuggestions.length !== 0) {
                        function createList() {
                            assigneeSuggestion.innerHTML = '';
                            foundSuggestions.forEach((foundName) => {
                                let list = document.createElement('li');
                                list.setAttribute('class', 'list');
                                assigneeSuggestion.appendChild(list);
                                list.innerHTML = `<p>${foundName}</p> <i class="fa-solid fa-user"></i>`;
                                assigneeSuggestion.style.display = 'block';
                                //Add an eventListener such that when a list is clicked, the input gets 
                                //the value of the list that was clicked
                                list.addEventListener('click', () => {
                                    inputAssignee.value = foundName;
                                    addMoreAssignee();
                                    assigneeSuggestion.style.display = 'none';
                                })

                                //Set the width of the of the suggestion list
                                assigneeSuggestion.style.width = `${addRemoveBox.clientWidth}px`;

                            })
                            errorSuggestionBox.style.display = 'none';
                        }

                        createList();
                    }
                //If the input box is empty do not display the box
                } else {
                    assigneeSuggestion.style.display = 'none';
                    errorSuggestionBox.style.display = 'none';
                }
            }
            //Add an eventListener such that when the saveAssginee button is clicked
            saveAssignee.addEventListener('click', () => {
                if(alreadyAnAssignee){
                
                }else if(assigneeList.includes(inputAssignee.value.trim()) && (!task.assignee.includes(inputAssignee.value.trim()))) {
                    //If the value exists in any of the available assignee and is not already an assignee
                    task.assignee.push(inputAssignee.value.trim());
                    filterAssignee();
                    inputAssignee.value = '';
                    createAssigneeList();
                }
            })
    


        }
        //Create the Parent Element the houses the List of Assignees
        let listOfAssignee = document.createElement('div');
        listOfAssignee.setAttribute('class', 'listOfAssignee');
        extraDisplay.appendChild(listOfAssignee);

        function createAssigneeList() {
            //If i am the admin i will be able to remove an assignee from the task
            //But if i am the team member all  will be able to see is the list of Assignee
            if(element.status === 'teamAdmin' || element.status === 'teamMember') {
                let listOfAssignee = document.querySelector('.listOfAssignee');
                listOfAssignee.innerHTML = '';
                
                let listTitle = document.createElement('h4');
                listTitle.textContent = 'List of Task Assignees:';
                listOfAssignee.appendChild(listTitle);

                let list = document.createElement('ol');
                listOfAssignee.appendChild(list);
                task.assignee.forEach((assignee) => {
                    let li = document.createElement('li');
                    list.appendChild(li);

                    let para = document.createElement('p');
                    li.appendChild(para);
                    para.textContent = `${assignee}`;

                    if(element.status === 'teamAdmin' && task.assignee.length > 1){
                        let removeAssigneeBtn = document.createElement('button');
                        removeAssigneeBtn.textContent = 'Remove';
                        li.appendChild(removeAssigneeBtn);

                        removeAssigneeBtn.addEventListener('click', (e) => {
                            list.removeChild(e.currentTarget.parentElement);
                            task.assignee.splice(task.assignee.indexOf(assignee), 1);
                            assigneeList.push(assignee);
                            filterAssignee();
                            createAssigneeList();
                            console.log(assigneeList);
                            console.log(task.assignee);
                        })
                    }
                })
            }
        }
        //Create the list of assignees
        createAssigneeList();
    }
}
//THIS IS THE DATE STRING FUNCTION THAT GETS THE DATE IN A SPECIFIC FORMAT(LIKE "MM/DD/YY" )
//AND TURNS IT INTO A HUMAN READABLE TIME
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
        //Clear the contents of the select element before adding option elements
        addAssignee.innerHTML = '';
        //Loop through the member list of the project and 
        //create a select element that can be used to pick the assignee to the task.
        element.projectMembers.forEach((member, memberId) => {
            let optionElement = document.createElement('option');
            if (member === userId) {
                optionElement.selected = true;
            }
            optionElement.textContent = member;
            addAssignee.appendChild(optionElement);
        })
        addAssignee.disabled = true;
    }
    if(element.status === 'teamAdmin') {
        //Clear the contents of the select element before adding option elements
        addAssignee.innerHTML = '';
        //Loop through the member list of the project and 
        //create a select element that can be used to pick the assignee to the task.
        element.projectMembers.forEach((member, memberId) => {
            let optionElement = document.createElement('option');
            if (member === userId) {
                optionElement.selected = true;
            }
            optionElement.textContent = member;
            addAssignee.appendChild(optionElement);
        })
        addAssignee.disabled = false;
    }
    setMinimumDate(taskDeadline);
}
//Automatically set minimum acceptable date
function setMinimumDate(taskDeadline) {
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
        //meaning if today's task list has an entry..
        if(presentTime === formerTime) {
            let task = {
                title: taskTitle.value.trim(),
                description: taskDescription.value.trim(),
                deadline: taskDeadline.value.trim(),
                taskStatus: 'undone',
                taskVisible: 'closed',
                deadlint() {
                    let date = taskDeadline.value.trim();
                    let year = date.slice(0, 5);
                    let month = date.slice(6, 8);
                    let day = date.slice(-2);

                    return `${month}/${day}/${year}`;
                },
                assignee: [addAssignee.value],
                assignorPic: '../profilePic/profile1.jpg',
                profilePic: ['../profilePic/profile2.jpg', '../profilePic/profile3.jpg', '../profilePic/profile4.jpg']
            }
            
            //PUT THE task IN THE task SECTION of the Previous Dated Section
            element.datedSection[0].task.push(task);

            //CLEAR THE INPUTS
            taskTitle.value = '';
            taskDescription.value = '';
            // addAssignee.value = '';
            taskDeadline.value = '';

            //CLOSE THE ADD TASK MENU IMMEDIATELY AFTER THE SUBMIT BUTTON IS CLICKED
            closeAddTaskMenu();
            bodyMainUI(element, elementId);
            return;
        }

        //PUT TASK IN A NEW SECTION IF THE DATEDSECTION IS EMPTY 
        // OR THE LAST sAVED TASK'S DATE IS NOT EKUALS TO TODAY'S DATE
        //either way what it means is if there has been no entries today.
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
                    taskVisible: 'closed',
                    deadlint() {
                        let date = taskDeadline.value.trim();
                        let year = date.slice(0, 5);
                        let month = date.slice(6, 8);
                        let day = date.slice(-2);

                        return `${month}/${day}/${year}`;
                    },
                    assignee: [addAssignee.value],
                    assignorPic: '../profilePic/profile1.jpg',
                    profilePic: ['../profilePic/profile2.jpg', '../profilePic/profile3.jpg', '../profilePic/profile4.jpg']
                }]
            }
            //PUT THE taskSection in the datedSection since it is a new day.
            element.datedSection.unshift(taskSection);

            //CLEAR THE INPUTS
            taskTitle.value = '';
            taskDescription.value = '';
            // addAssignee.value = '';
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

    noBtn.addEventListener('click', () => {
        closeDeleteDialogue();
    })
}
//addEventListener and FUNCTION TO CLOSE THE deleteDialogueMenu
closeDialogueMenu.addEventListener('click', closeDeleteDialogue)
function closeDeleteDialogue() {
    deleteDialogueMenu.style.display = 'none';
    deleteDialogueMenu.style.opacity = '0';
}
//if the "yes" button of the deleteDialogueMenu is clicked, delete the present project,
//close both the deleteDialogueMenu and the editBox  and then loopThrough() the entire project.
yesBtn.addEventListener('click', () => {
    let deletedElement = project.splice(elementSpace, 1);
    closeDeleteDialogue();
    closeEditBox();
    projectDisplay.innerHTML = '';
    loopThrough();
})
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
            projectMembers: [userId],
            teamMember: ['../profilePic/profile1.jpg'],
            datedSection: project[elementSpace].datedSection
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
        markSelectedPanel(elementSpace);
        displayUI(formData, elementSpace);
    }

    if(editName.value !== '' && editDescription.value !== '' && editDeadline.value !== '' && editProjectType === 'teamAdmin'){
        let formData = {
            name: editName.value,
            id: editProjectType,
            status: 'teamAdmin',
            deadline: editDeadline.value,
            description: editDescription.value,
            projectMembers: [userId, 'dramaticKoder', 'codeNinja', 'pythania', 'tasker101', 'renewedSon'],
            teamMember: ['../profilePic/profile1.jpg', '../profilePic/profile2.jpg', '../profilePic/profile3.jpg', '../profilePic/profile4.jpg'],
            datedSection: project[elementSpace].datedSection
        }

        //REMOVE THE PRESENT OBJECT AND REPLACE WITH THE EDITED PROJECT and 
        //Push the created project into the project Array
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
        markSelectedPanel(elementSpace);
        displayUI(formData, elementSpace);
    }
}

//AUTOMATICALLY GET THE PROJECT WE ARE WORKING ON SO WE COULD COLOUR THE PANEL
function markSelectedPanel(elementSpace) {
    let element = project[elementSpace];
    let panels = document.querySelectorAll('.panel');
    panels.forEach((panel, index) => {
        if(index === elementSpace) {
            panelist(element, elementSpace, panel);
        }
    })
}
unaccountedFor = false;
//THE RESIXE EVENT LISTENER TO RESIXE THE WINDOW WHEN IT IS MOBILE VIEW OR DESKTOP VIEW=>
//Resize the side bar or close it based on the screen size
window.addEventListener('resize', () => {
    if(window.innerWidth > 991){
        side.style.width = 'inherit';
        closeSideBtn.style.display = 'none';
    }else if(window.innerWidth < 991 && unaccountedFor !== true){
        side.style.left = '-255px';
        side.style.width = '0';
        unaccountedFor = !unaccountedFor;
    }
});
//But if the input search button does receive focus do not close the side bar(it was an unintended bug that was fixed)
search.addEventListener('focus', () => {
    //Setting the variable for the close functionality.
    let unaccountedFor = true;
})
 