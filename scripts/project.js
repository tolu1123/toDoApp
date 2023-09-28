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
            datedSection: [],
            sharedFiles: []
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
        if (window.innerWidth < 429){
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
            datedSection: [],
            sharedFiles: []
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
        //if the width of the browser is less than 429px close the sidebar
        if (window.innerWidth < 429){
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
            //if the width of the browser is less than 429px close the side bar 
            if (window.innerWidth < 429){
                closeSideBarFun();
            }
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

    //Also display the ATTACHED FILE SECTION
    attachFileHtml(); 

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

        createTask(element, elementId, data, dataId, ulList, dayBody);
        
    })
}
//CREATE TASK LIST
function createTask(element, elementId, data, dataId, ulList, dayBody) {
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
        //the function that changes that indicates the label is being clicked 
        //by changing the color and displaying the tick mark
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
        //indicates the tick mark when the page initially runs
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

        function assigneePic() {
            //ADDING THE FUNCTIONALITY FOR THE ASSIGNEE'S PROFILE PIC THAT APPEARS NEXT TO THE TASK
            //IF THE PROJECT IS A SELF PROJECT
            profileEle.innerHTML = '';
            if (element.status === 'self') {
                const assigneeProfilePic = document.createElement('div');
                assigneeProfilePic.setAttribute('class', 'assigneeProfilePic');
                assigneeProfilePic.style.backgroundImage = `url(${task.assignorPic})`;
                assigneeProfilePic.style.transform = `translateY(-50%)`;
                profileEle.appendChild(assigneeProfilePic);

            } else {
                //IF IT IS A TEAM PROJECT
                if(task.assignee.indexOf(userId) !== -1 && task.assignee.length === 1) {
                    //IF THE TASKS'S ASSIGNEE IS ONLY THE TEAM ADMIN-PUT THE PROFILEPIC OF THE ADMIN
                    const assigneeProfilePic = document.createElement('div');
                    assigneeProfilePic.setAttribute('class', 'assigneeProfilePic');
                    assigneeProfilePic.style.backgroundImage = `url(${task.assignorPic})`;
                    assigneeProfilePic.style.transform = `translateY(-50%)`;
                    profileEle.appendChild(assigneeProfilePic);
                } else if (task.assignee.indexOf(userId) !== -1 && task.assignee.length > 1) {
                    //IF THE TASK'S ASSIGNEE CONTAINS TEAM ADMIN AND OTHERS
                    task.assignee.forEach((eachPic, index) => {
                        if(eachPic === userId) {
                            const assigneeProfilePic = document.createElement('div');
                            assigneeProfilePic.setAttribute('class', 'assigneeProfilePic');
                            assigneeProfilePic.style.backgroundImage = `url(${task.assignorPic})`;
                            assigneeProfilePic.style.transform = `translate(${index * -14}px, -50%)`;
                            assigneeProfilePic.style.zIndex = `${20 - index}`;
                            profileEle.appendChild(assigneeProfilePic);
                        } else {
                            const assigneeProfilePic = document.createElement('div');
                            assigneeProfilePic.setAttribute('class', 'assigneeProfilePic');
                            assigneeProfilePic.style.backgroundImage = `url(${task.profilePic[index % 3]})`;
                            assigneeProfilePic.style.transform = `translate(${index * -14}px, -50%)`;
                            assigneeProfilePic.style.zIndex = `${20 - index}`;
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
                        assigneeProfilePic.style.transform = `translate(${index * -14}px, -50%)`;
                        assigneeProfilePic.style.zIndex = `${20 - index}`;
                        profileEle.appendChild(assigneeProfilePic);
                    })
                }
            }
        }
        assigneePic();
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
            
            //the extend deadline event listener
            deadlineInput.addEventListener('change', () => {
                task.deadline = deadlineInput.value.trim();
            })
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
                          let doesNotFindPerson = assigneeList.every(assignee => !(assignee.toLowerCase().startsWith(inputAssignee.value.toLowerCase())))
                        if ((doesNotFindPerson)){
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
                    assigneePic();
                    attachFile();
                }
            })
    


        }
        //Create the Parent Element the houses the List of Assignees
        let listOfAssignee = document.createElement('div');
        listOfAssignee.setAttribute('class', 'listOfAssignee');
        extraDisplay.appendChild(listOfAssignee);


        function createAssigneeList() {
            //If i am the admin i will be able to remove an assignee from the task
            //But if i am the team member all i will be able to see is the list of Assignee
            if(element.status === 'teamAdmin' || element.status === 'teamMember') {
                let listOfAssignee = extraDisplay.querySelector(`.listOfAssignee`);
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
                        removeAssigneeBtn.setAttribute('class', 'removeAssigneeBtn');
                        removeAssigneeBtn.textContent = 'Remove';
                        li.appendChild(removeAssigneeBtn);

                        removeAssigneeBtn.addEventListener('click', (e) => {
                            list.removeChild(e.currentTarget.parentElement);
                            task.assignee.splice(task.assignee.indexOf(assignee), 1);
                            assigneeList.push(assignee);
                            filterAssignee();
                            createAssigneeList();
                            assigneePic();
                            attachFile();
                        })
                    }
                })
            }
        }
        //Create the list of assignees
        createAssigneeList();

        //The attach file functionality
        let attachFileDiv = document.createElement('div');
        attachFileDiv.setAttribute('class', 'attachFileDiv');
        extraDisplay.appendChild(attachFileDiv);

        function attachFile() {
            //CREATE THE "attach File" FUNCTIONALITY
            //Create the parent Div that houses the attach file functonality
            if (task.assignee.includes(userId) && element.id === 'team') {
                //clear the contents of the attachFileDiv element and give it a display block
                attachFileDiv.innerHTML = '';
                attachFileDiv.style.display = 'block';
                

                //create the input element with "TYPE" file
                let file = document.createElement('input');
                file.setAttribute('class', 'inputFile');
                file.type = 'file';
                file.style.display = 'none';
                attachFileDiv.appendChild(file);

                //Create the element that houses the attachFileBtn and the attach file button
                let attachFileHouse = document.createElement('div');
                attachFileHouse.setAttribute('class', 'attachFileHouse');
                attachFileDiv.appendChild(attachFileHouse);

                let attachFileBtn = document.createElement('div');
                attachFileBtn.setAttribute('class', 'attachFileBtn');
                attachFileBtn.innerHTML = '<i class="fa-light fa-paperclip-vertical"></i>';
                attachFileHouse.appendChild(attachFileBtn);

                //also create the instruction that helps the users to understand
                // what the attach file button is used for
                let attachInstruction = document.createElement('span');
                attachInstruction.setAttribute('class', 'attachInstruction');
                attachInstruction.textContent = 'Submit file to complete Task.';
                attachFileHouse.appendChild(attachInstruction);

                //Add event listeners that adds the file to the task and prevent the user from attaching another file 
                //if the user had already attached a file until the user deletes it
                attachFileBtn.addEventListener('click', () => {
                    if(!task.submittedFile.some(file => file.fileSubmitter === userId)) {
                        file.click();
                    }
                });

                //Get the date or the time i added the file depending on the arguement provided when calling the function
                function getDate() {
                    let date = new Date();
                    //if the giveDate arguement is provided in the function call and giveTime is not
                    //return only the date
                    let year = date.getFullYear();
                    let rawMonth = date.getMonth();
                    let day = date.getDate();

                    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
                    let month = months[rawMonth];
                    return `${month} ${day}, ${year}`;

                }
                function getTime(){
                    //return only the 'Time in AM/PM'
                    let date = new Date();
                    let time = date.getHours();
                    return time === 0? `12am`: time > 0 && time <= 11 ? `${time}am`: time === 12? `12pm`: time > 12 ? `${time % 12}pm`: null;
                    
                }

                //Function to get the file type of the file that is being shared
                //we are going to use different method/attempts to accertain the type
                function fileType(obj) {
                    //attempt 1
                    let fileName = obj.name
                    let fileType = fileName.substring(((fileName.lastIndexOf('.') - 1) >>> 0) + 1);
                    
                    //if the algorithm is able to detect an extension return the value of the extension
                    //OR ELSE return the string 'notFound'
                    if (fileType !== '') {
                        return fileType;
                    } else {
                        return 'notFound';
                    }
                }
                
    
                //The hover effect for attaching Files-
                attachFileBtn.addEventListener('mouseenter', () => { 
                    //if the user has already attached a file; and show different cursors to indicate behaviour
                    //Using SOME (an Array method) to check if there is the user has added a file and wants to do so again
                    //if yes do not let him add
                    if(task.submittedFile.some(file => file.fileSubmitter === userId)) {
                        attachFileBtn.style.cursor = 'not-allowed';
                    }else {
                        attachFileBtn.style.cursor = 'default';
                    }
                });

                file.addEventListener('change', attachSelected)
                //The event listener for attachng files
                function attachSelected(e) {
                    //The user can only add a file if he wants to add another file he has to remove the file he added previously
                    if(!task.submittedFile.some(file => file.fileSubmitter === userId)) {
                        //create an object that contains today's date as key
                        //and a key that contains the type of file
                        let fileData = {
                            file: file.files[0],
                            fileName: function() {
                                return this.file.name;
                            },
                            fileSubmitter: userId,
                            daySubmitted: function () {
                                return getDate();
                            },
                            timeSubmitted: function () {
                                return getTime();
                            },
                            fileType: function () {
                                let fileName = this.file;
                                return fileType(fileName);
                            },
                            fileTag: function () {
                                let fileName = this.fileName().toUpperCase();
                                return fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2);
                            },
                            fileSize: function () {
                                //Data storage unit measurement
                                let kb = 1024;
                                let mb = 1024 * 1024;
                                let gb = 1024 * 1024 * 1024;
                                let tb = 1024 * 1024 * 1024 * 1024;
                                //if the file size is greater than or equals to 1kb and less than 1mb
                                if(this.file.size >= kb && this.file.size < mb) {
                                    return `${(this.file.size / kb).toFixed(1)}kb`;
                                } else if(this.file.size >= mb && this.file.size < gb) {
                                    //if the file size is greater than than or equals to 1mb and less than 1gb
                                    return `${(this.file.size / mb).toFixed(1)}mb`;
                                } else if (this.file.size >= gb && this.file.size < tb) {
                                    //if the file size is greater than than or equals to 1mb and less than 1tb
                                    return `${(this.file.size / gb).toFixed(1)}gb`;
                                } else if (this.file.size >= tb) {
                                    //if the file size is greater than than or equals to 1mb and less than 1gb
                                    return `${(this.file.size / tb).toFixed(1)}`;
                                } else {
                                    return `${this.file.size}mb`;
                                }
                                
                            }, 
                            filePic: function () {
                                //The functon that returns the icon based on the type of the extension
                                //getExtensionPic()
                                function getExtPic(ext) {
                                    //if ext parameter is not equals to notFound
                                    if(ext !== 'notFound') {
                                        //The possible extensions for the type of mime possible
                                        const fileExtensionGroup = {
                                            video: ['.mp4', '.m4v', '.f4v', '.f4p', '.webm', '.ogv', '.ogg', '.mov', '.qt', '.avi', '.flv', '.mkv', '.wmv', '.asf', '.mpeg', '.mpg', '.mpe', '.msv', '.vfw', '.3gp', '.3gpp', '.3g2', '.3gpp2'],
                                            audio: ['.mp3', '.wav', '.ogg', '.oga', '.aiff', '.aif', '.flac', '.midi', '.mid', '.wma', '.wax', '.ra', '.ram', '.rpm', '.amr'],
                                            image: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp', '.svg', '.ico', '.jfif', '.pjpeg', '.pjp', '.apng', '.avif', '.heic', '.heif', '.pdf', '.eps', '.raw', '.cr2', '.nef', '.orf', '.sr2', '.arw', '.dng', '.raf', '.rw2', '.psd', '.ai', '.cdr', '.indd', '.epsf', '.epsi', '.wmf', '.emf', '.ico', '.jfif', '.pjpeg', '.pjp', '.svgz', '.sketch', '.ai', '.eps', '.pdf', '.raw', '.ico', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp', '.tiff', '.jfif', '.pjpeg', '.pjp', '.avif', '.heic', '.heif', '.figma'],
                                            font: ['.otf', '.ttf', '.woff', '.woff2', '.eot', '.otf'],
                                            text: ['.txt', '.html', '.htm', '.css', '.js', '.json', '.xml', '.md', '.markdown', '.csv', '.tsv', '.log', '.yaml', '.yml', '.ini', '.cfg', '.conf', '.bat', '.sh', '.c', '.cpp', '.h', '.java', '.py', '.php', '.rb', '.perl', '.pl', '.sql', '.ps1', '.vbs', '.xml', '.svg', '.rss', '.atom', '.jsx', '.ts', '.tsx', '.less', '.scss', '.sass', '.cs', '.as', '.htaccess', '.gitignore', '.dockerignore', '.htpasswd', '.babelrc', '.eslintrc', '.editorconfig', '.gitattributes', '.npmrc'],
                                            application: ['.pdf', '.zip', '.rar', '.7z', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.exe', '.bin', '.apk', '.dmg', '.tar', '.gz', '.bz2', '.json', '.xml', '.yaml', '.yml', '.ini', '.cfg', '.conf', '.bat', '.sh', '.app', '.iso', '.sql']
                                        }

                                        //Get the key of the extension Found
                                        function getKey(ext) {
                                            //loop through the key and its values and return the key
                                            for(const [key, value] of Object.entries(fileExtensionGroup)) {
                                                if(value.includes(ext)) {
                                                    return key;
                                                }
                                            }
                                            return 'notFound';
                                        }

                                        //get the extensions key from the getKey()
                                        // let key = getKey(ext);
                                        // return key;
                                        //The conditional that returns the appropriate icon for the extension that has been provided in the parameter of the getExtPic()
                                        switch(getKey(ext)) {
                                            case 'video':
                                            return '<i class="fa-sharp fa-light fa-circle-video"></i>';
                                            break;

                                            case 'audio':
                                            return '<i class="fa-sharp fa-light fa-circle-microphone"></i>';
                                            break;
                                                
                                            case 'image':
                                            return '<i class="fa-light fa-image"></i>';
                                            break;

                                            case 'font':
                                            return '<i class="fa-sharp fa-light fa-font-case"></i>';
                                            break;

                                            case 'text':
                                            return '<i class="fa-sharp fa-light fa-file-lines"></i>';
                                            break;

                                            case 'application':
                                            return '<i class="fa-brands fa-android"></i>';
                                            break;


                                            default:
                                            return '<i class="fa-sharp fa-light fa-file"></i>';
                                        }

                                    } else {
                                        //return the default value if the extension format is not recognised by the algorithm
                                        return '<i class="fa-sharp fa-light fa-file"></i>';
                                    }
                                }
                                //get the extension from the file name by run the fileType() method 
                                //and run the getExtPic() wth the value gotten.
                                return getExtPic(this.fileType());
                            }

                        }
                        task.submittedFile.push(fileData);

                        // Save the shared file into the pool of other files
                        element.sharedFiles.push(fileData);

                        // Run the function to display the file that has been attached
                        displayAttached();

                        // Run the function that dsplays the files in the ATTACHED FILE SECTION
                        displayFiles();
                    }
                }
                
            } else {
                //if the user is not part of the assignee to the task- do not show a place to attach file
                attachFileDiv.innerHTML = '';
                attachFileDiv.style.display = 'none';  
            }
        }
        attachFile()
        //add the multple file submission if there are multiple assignees

        //The UI that shows the details of the file uploaded
        let attachUi = document.createElement('div');
        attachUi.setAttribute('class', 'attachUi');
        extraDisplay.appendChild(attachUi);

        if(task.submittedFile.length >= 1) {
            displayAttached();
        }
        function displayAttached() {
            attachUi.innerHTML = '';
            task.submittedFile.forEach((ele, index) => {
                //the card for the file uploaded
                let submittedDoc = document.createElement('div');
                submittedDoc.setAttribute('class', 'submittedDoc');
                attachUi.appendChild(submittedDoc);

                //the icon div that indicates the fileType
                let iconDiv = document.createElement('div');
                iconDiv.setAttribute('class', 'iconDiv');
                submittedDoc.appendChild(iconDiv);
                //set the icon from the element
                iconDiv.innerHTML = ele.filePic();
 
                //the DIV that encompasses the name of the file and the date shared
                let nameDateDiv = document.createElement('div');
                nameDateDiv.setAttribute('class', 'nameDateDiv');
                submittedDoc.appendChild(nameDateDiv);

                let namePlaceholder = document.createElement('div');
                namePlaceholder.setAttribute('class', 'namePlaceholder');
                nameDateDiv.appendChild(namePlaceholder);
                //set the name content of the namePlaceholder
                namePlaceholder.innerHTML = ele.fileName();

                let dateTimePlaceholder = document.createElement('div');
                dateTimePlaceholder.setAttribute('class', 'dateTimePlaceholder');
                nameDateDiv.appendChild(dateTimePlaceholder);
                //set the date and time content of the dateTimePlaceholder
                let date = ele.daySubmitted();
                let time = ele.timeSubmitted();
                dateTimePlaceholder.innerHTML = `${date}-${time}`;
                
                
                //the fileSize Div
                let fileSizeDiv = document.createElement('div');
                fileSizeDiv.setAttribute('class', 'fileSizeDiv');
                submittedDoc.appendChild(fileSizeDiv);
                //set the contents of the fileSize Div
                fileSizeDiv.innerHTML = ele.fileSize();

                //The delete button for the user who uploaded 
                //OR the download button for the other co-users
                if(ele.fileSubmitter === userId) {
                    let deleteFileBtn = document.createElement('div');
                    deleteFileBtn.setAttribute('class', 'deleteFileBtn');
                    submittedDoc.appendChild(deleteFileBtn);
                    //set the delete icon of the deleteFileBtn element
                    deleteFileBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
                    
                    //adding the deleteFileBtn's addEventListeners
                    deleteFileBtn.addEventListener('click', () => {

                        //use the index to delete the file
                        task.submittedFile.splice(index, 1);
                        extraDisplay.querySelector('.inputFile').value = '';

                        // Remove the file from the pool of other files by first locating the file
                        let fileLocation = element.sharedFiles.indexOf(ele);
                        element.sharedFiles.splice(fileLocation, 1);

                        //Run the function to display the rest of the attached files
                        displayAttached();

                        // Run the function that dsplays the files in the ATTACHED FILE SECTION
                        displayFiles(); 

                    })
                }else {
                    let downloadBtn = document.createElement('div');
                    downloadBtn.setAttribute('class', 'downloadBtn');
                    submittedDoc.appendChild(downloadBtn);

                    //create the download circular progress bar
                    let downloadProgressBar = document.createElement('div');
                    downloadProgressBar.setAttribute('class', 'downloadProgressBar');
                    downloadBtn.appendChild(downloadProgressBar);

                    //create the element that houses the download icon
                    let downloadElement = document.createElement('a');
                    downloadElement.setAttribute('class', 'downloadElement'); 
                    downloadProgressBar.appendChild(downloadElement);
                    
                    //create the element that houses the cancel button 
                    let cancelElement = document.createElement('a')
                    cancelElement.setAttribute('class', 'cancelElement');
                    cancelElement.style.display = 'none';
                    downloadProgressBar.appendChild(cancelElement);

                    downloadElement.innerHTML = '<i class="fa-sharp fa-light fa-arrow-down-to-line"></i>';
                    cancelElement.innerHTML = '<i class="fa-sharp fa-regular fa-xmark"></i>';

                    //setting the download event
                    let downloadingFile = false;
                    
                    //declare the controller
                    let controller;

                    //the bloburl
                    let blobUrl = null;

                    cancelElement.addEventListener('click', () => {
                        //only cancel the download if i am already downloading the file
                        if(downloadingFile === true) {
                            controller.abort();
                            
                            //clear the download progress bar
                            downloadProgressBar.style.backgroundImage = ``;

                            // Revoke the Object URL if it was created
                            if (blobUrl) {
                                URL.revokeObjectURL(blobUrl);
                                blobUrl = null;
                            }
                            console.log('ttried to cancel the download');
                            downloadingFile = false;

                            cancelElement.style.display = 'none';
                            downloadElement.style.display = 'flex';
                        }
                    })
                    downloadElement.addEventListener('click', (e) => {

                        cancelElement.style.display = 'flex';
                        downloadElement.style.display = 'none';

                        if(downloadingFile === false) {
                            //add the controller for aborting the fetch if the user cancels the download
                            controller = new AbortController();
                            e.preventDefault();

                            let data = URL.createObjectURL(ele.file);

                        
                        
                            const signal = controller.signal;
 
                            //set the downloading status FLAG to false 
                            downloadingFile = true;

                            fetch(data, { signal }).then(response => {
                                if(!response.ok) {
                                    throw new Error('The response was not okay')
                                }
                                let response2 = response.clone();
                                let downloadSize = response.headers.get('content-length');
                                let fileToDownload = response.body.getReader();
                                let loaded = 0;
                                //update the circular progress bar using the downloadStatus function
                                function downloadStatus(object) {
                                    downloadProgressBar.style.backgroundImage = `conic-gradient(rgb(43, 106, 241) 0deg ${object.status * 360}deg, transparent ${object.status * 360}deg ${(1 - object.status) * 360}deg)`;
                                }

                                function keepReadingDownload({done, value}) {
                                    if(done) { 
                                        URL.revokeObjectURL(data);
                                        //if download is done then return the download file as a blob
                                        return response2.blob();
                                    } else {
                                    //keep getting the amount that has been downloaded
                                    loaded += value.length;
                                    //run the function that keeps uploading the download progress bar
                                    downloadStatus({status: (loaded/downloadSize)});
                                    //keep reading the download until the downloading is done
                                    return fileToDownload.read().then(keepReadingDownload);
                                    }
                                }
                                console.log(downloadingFile);
                                return fileToDownload.read().then(keepReadingDownload);
                                
                            }).then(blob => {
                                //create an instantaneous anchorElement that will be deleted after use
                                //it will be used for the download
                                let url = URL.createObjectURL(blob);
                                blobUrl = url;
                                console.log(url);
                                let anchorElement = document.createElement('a');
                                anchorElement.href = url;
                                anchorElement.download = ele.fileName();
                                submittedDoc.appendChild(anchorElement);
                                anchorElement.style.display = 'none';
                                anchorElement.click();
                                anchorElement.remove();
                                URL.revokeObjectURL(url);
                                downloadProgressBar.style.backgroundImage = ``;
 
                            }).catch(error => {
                                console.error('Error:', error);
                            })
                         
                        }
                    })
                }
            })
        }



        if(element.status === 'teamAdmin') {
            //CREATE THE BUTTON THAT DELETES THE TASK WHEN CLICKED
            let deleteTaskButton = document.createElement('button');
            deleteTaskButton.textContent = 'Delete TASK';
            deleteTaskButton.setAttribute('class', 'deleteTaskButton');
            extraDisplay.appendChild(deleteTaskButton);

            deleteTaskButton.addEventListener('click', (e) => {
                let theTaskPanel = e.currentTarget.parentNode.parentNode;
                if (theTaskPanel.parentNode.children.length === 1) {
                    dayBody.remove();
                    //Remove the whole datedSection
                    project[elementId].datedSection.splice(dataId, 1);
                } else {
                    theTaskPanel.remove();
                    //Remove the task from the datedSection
                    project[elementId].datedSection[dataId].task.splice(taskNo, 1)
                }
            });
        }


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
                submittedFile: [],
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
                    submittedFile: [],
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
let month = months[Number(rawMonth - 1)];

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
    mainUI.innerHTML = '';
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



/************************* CREATE THE FUNCTIONS AND EVENT LISTENERS THAT WILL DISPLAY THE FILES 
                                                 IN GRID OR IN LISTS AND ALSO DYNAMICALLY ADD THE HTML****************************/
// Create the flags
let gridView = false;
let listView = true;


function displayFiles() {
    let container = document.querySelector('.fileListContainer');
    container.innerHTML = '';
    displayTags(elementSpace);
    if(listView) {
        displayFilesList();
    } else if(gridView) {
        displayFilesGrid();
    }
}

// Function to display tags
function displayTags(elementSpace) {
    // get the tags fromm each of the sharedFiles 
    return tags = project[elementSpace].sharedFiles.reduce((accumulator, ele) => { 
        if(ele !== '') {
            return [...accumulator, ele.fileTag()];
        }
    }, [])
}

// Function to display files in list format
function displayFilesList() {
    console.log('Shown as a list');
    let container = document.querySelector('.fileListContainer');
    if(project[elementSpace].sharedFiles.length !== 0) {
        project[elementSpace].sharedFiles.forEach((ele) => {
             //the card for the file uploaded
             let fileCard = document.createElement('div');
             fileCard.setAttribute('class', 'fileCard');
             container.appendChild(fileCard);

             //the icon div that indicates the fileType
             let iconDiv = document.createElement('div');
             iconDiv.setAttribute('class', 'iconDiv');
             fileCard.appendChild(iconDiv);
             //set the icon from the element
             iconDiv.innerHTML = ele.filePic();

             //the DIV that encompasses the name of the file and the date shared
             let nameDateDiv = document.createElement('div');
             nameDateDiv.setAttribute('class', 'nameDateDiv');
             fileCard.appendChild(nameDateDiv);

             let namePlaceholder = document.createElement('div');
             namePlaceholder.setAttribute('class', 'namePlaceholder');
             nameDateDiv.appendChild(namePlaceholder);
             //set the name content of the namePlaceholder
             namePlaceholder.innerHTML = ele.fileName();

             let dateTimePlaceholder = document.createElement('div');
             dateTimePlaceholder.setAttribute('class', 'dateTimePlaceholder');
             nameDateDiv.appendChild(dateTimePlaceholder);
             //set the date and time content of the dateTimePlaceholder
             let date = ele.daySubmitted();
             let time = ele.timeSubmitted();
             dateTimePlaceholder.innerHTML = `${date}-${time}`;
             
             
             //the fileSize Div
             let fileSizeDiv = document.createElement('div');
             fileSizeDiv.setAttribute('class', 'fileSizeDiv');
             fileCard.appendChild(fileSizeDiv);
             //set the contents of the fileSize Div
             fileSizeDiv.innerHTML = ele.fileSize();
        })
    }
}

// Function to display files in grid format
function displayFilesGrid() {
    console.log('Shown as a grid');
    let container = document.querySelector('.fileListContainer');
    if(project[elementSpace].sharedFiles.length !== 0) {
        project[elementSpace].sharedFiles.forEach((ele) => {
             //the card for the file uploaded
             let fileCard = document.createElement('div');
             fileCard.setAttribute('class', 'fileCardGrid');
             container.appendChild(fileCard);

             //the icon div that indicates the fileType
             let iconDiv = document.createElement('div');
             iconDiv.setAttribute('class', 'iconDiv');
             fileCard.appendChild(iconDiv);
             //set the icon from the element
             iconDiv.innerHTML = ele.filePic();

             //the DIV that encompasses the name of the file and the date shared
             let nameDateDiv = document.createElement('div');
             nameDateDiv.setAttribute('class', 'nameDateDiv');
             fileCard.appendChild(nameDateDiv);

             let namePlaceholder = document.createElement('div');
             namePlaceholder.setAttribute('class', 'namePlaceholder');
             nameDateDiv.appendChild(namePlaceholder);
             //set the name content of the namePlaceholder
             namePlaceholder.innerHTML = ele.fileName();

             let dateTimePlaceholder = document.createElement('div');
             dateTimePlaceholder.setAttribute('class', 'dateTimePlaceholder');
             nameDateDiv.appendChild(dateTimePlaceholder);
             //set the date and time content of the dateTimePlaceholder
             let date = ele.daySubmitted();
             let time = ele.timeSubmitted();
             dateTimePlaceholder.innerHTML = `${date}-${time}`;
             
             
             //the fileSize Div
             let fileSizeDiv = document.createElement('div');
             fileSizeDiv.setAttribute('class', 'fileSizeDiv');
             fileCard.appendChild(fileSizeDiv);
             //set the contents of the fileSize Div
             fileSizeDiv.innerHTML = ele.fileSize();
        })
    }
}

// Create a function that will display the HTML in THE ATTACHED FILE section
let attachedFileSec = document.querySelector('.file');

function attachFileHtml() {
    //clear the contents of the attachedFileSec
    attachedFileSec.innerHTML = ''; 
    //SET THE HEADER ELEMENT AND ITS CONTENT
    let fileHeader = document.createElement('div');
    fileHeader.setAttribute('class', 'fileHeader');
    attachedFileSec.appendChild(fileHeader);

        // create the title div
        let titleDiv = document.createElement('div');
        titleDiv.setAttribute('class', 'title');
        fileHeader.appendChild(titleDiv)

            // create the contents for the title div
            let h2 = document.createElement('h2');
            h2.textContent = "Attached files";
            titleDiv.appendChild(h2);

            //create an element that houses the file view button
            let fileView = document.createElement('div');
            fileView.setAttribute('class', 'fileView');
            titleDiv.appendChild(fileView);

                //set the two span buttons of the fileView element
                let gridBtn = document.createElement('span');
                let listBtn = document.createElement('span');
                gridBtn.setAttribute('class', '');
                listBtn.setAttribute('class', 'super');
                gridBtn.innerHTML = '<ion-icon class="grid" name="grid-outline"></ion-icon>';
                listBtn.innerHTML = '<ion-icon class="outline" name="list-outline"></ion-icon>'
                fileView.appendChild(gridBtn);
                fileView.appendChild(listBtn);

                    // Set the eventListener for the gridBtn and the listBtn
                    gridBtn.addEventListener('click', () => {

                        //set the gridView flag
                        gridView = true;
                        listView = !gridView; /*Set list view to false while grid view is in a true state */

                        //add the super class to the gridBtn and remove from the listBtn
                        gridBtn.classList.add('super');
                        listBtn.classList.remove('super');

                        // Run the displayFiles function
                        displayFiles();
                    })

                    listBtn.addEventListener('click', () => {

                        //set the gridView flag
                        listView = true;
                        gridView = !listView; /* Set gridView to false while listView is in a true state*/

                        //add the super class to the gridBtn and remove from the listBtn
                        listBtn.classList.add('super');
                        gridBtn.classList.remove('super');

                        // Run the displayFiles function
                        displayFiles();
                    })

        //Create the fileSearch Div
        let fileSearch = document.createElement('div');
        fileSearch.setAttribute('class', 'fileSearch');
        fileHeader.appendChild(fileSearch);

            //create the search div that houses the searchFileInput
            let search = document.createElement('div');
            search.setAttribute('class', 'search');
            fileSearch.appendChild(search);

                // Create the input Element of type search
                let input = document.createElement('input');
                input.type = 'search';
                input.placeholder = 'Search any files...';
                search.appendChild(input);

            // Create the tag div that contains tags of files to be searched
            let tags = document.createElement('div');
            tags.setAttribute('class', 'tags');
            fileSearch.appendChild(tags);

    //Create THE fileList ELEMENT
    let fileList = document.createElement('div');
    fileList.setAttribute('class', 'fileList');
    attachedFileSec.appendChild(fileList);

        // Create the title of the fileList element
        let fileListTitle = document.createElement('h3');
        fileList.appendChild(fileListTitle);
        fileListTitle.setAttribute('class' ,'fileListTitle');
        fileListTitle.textContent = 'Files';

        // Create the container to show the file
        let fileListContainer = document.createElement('div');
        fileListContainer.setAttribute('class', 'fileListContainer');
        fileList.appendChild(fileListContainer);

    // Create the fileSearch ELEMENT
    let searchResultEle = document.createElement('div');
    searchResultEle.setAttribute('class', 'searchResultEle');
    attachedFileSec.appendChild(searchResultEle);

        // Create the title of the fileList element
        let fileSearchTitle = document.createElement('h3');
        searchResultEle.appendChild(fileSearchTitle);
        fileSearchTitle.setAttribute('class' ,'fileSearchTitle');
        fileSearchTitle.textContent = 'Files search results';


}









unaccountedFor = false;
//THE RESIXE EVENT LISTENER TO RESIXE THE WINDOW WHEN IT IS MOBILE VIEW OR DESKTOP VIEW=>
//Resize the side bar or close it based on the screen size
window.addEventListener('resize', () => {
    if(window.innerWidth >= 430){
        side.style.width = '100%';
        closeSideBtn.style.display = 'none';
    } else if(window.innerWidth <= 429 && unaccountedFor !== true){
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
 

// //Function to check if the project is empty and display a smokeScreen if empty
// function fileScreen() {
//     let fileSection = document.querySelector('.file');
//     let smokeScreen = document.querySelector('.fileSmokeScreen');
//     if(project.length === 0) {
//         smokeScreen.style.position = 'absolute';
//         smokeScreen.style.top = '0';
//         smokeScreen.style.width = fileSection.clientWidth + 'px';
//         smokeScreen.style.height = 'inherit';
//     }
// }
// fileScreen();