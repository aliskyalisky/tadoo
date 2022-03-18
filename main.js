const menuButton = document.querySelector('.menubtn');
const addButton = document.querySelector('.addbtn');
const dueButton = document.querySelector('.duebtn');
const addTasksBtn = document.querySelector('.moretasks');
const nightModeSwitch = document.querySelector('.nightmodebtn');
const submitProjectBtn = document.querySelector('.submit');
let projects = [];
let nightModeOn = false;

function projectDoneCheck (e) {
    let project = e.target.parentNode.parentNode.parentNode;
    let tasks = project.querySelectorAll('.taskcheckbtn');
    let doneTasks = project.querySelectorAll('.taskdone');
    let doneText = project.querySelector('.donetxt');

    if (tasks.length === doneTasks.length) {
        project.classList.add('projectdone');
        doneText.classList.add('projectdone');
    }

    if (!(tasks.length === doneTasks.length) && project.classList.contains('projectdone')) {
        project.classList.remove('projectdone');
        doneText.classList.remove('projectdone');
    }
}

function taskCheck (e) {
    let button = e.target;
    if (button.textContent === 'x' && button.classList.contains('taskdone')) {
        button.textContent = '';
        button.classList.remove('taskdone');
        projectDoneCheck(e);
        return;
    }

    if (button.textContent === '' && !(button.classList.contains('taskdone'))) {
        button.textContent = 'x';
        button.classList.add('taskdone');
    }

    projectDoneCheck(e);
}

function displayProject (project) {
    let opTable = document.querySelector('.optable');

    let projectCard = document.createElement('div');
    projectCard.classList.add('projectcard');

    // Top of the card
    let cardTop = document.createElement('div');
    cardTop.classList.add('cardtop');

    let title = document.createElement('h4');
    title.textContent = `${project.title}`

    let due = document.createElement('p');
    due.textContent = `Due ${project.due}`;

    cardTop.appendChild(title);
    cardTop.appendChild(due);
    projectCard.appendChild(cardTop);

    // Bottom of the card
    let cardBot = document.createElement('div');
    cardBot.classList.add('cardbot');

    let doneText = document.createElement('h2');
    doneText.classList.add('donetxt');
    doneText.textContent = 'Done!';
    cardBot.appendChild(doneText);

    for (let i = 0; i < project.tasks.length; i++) {
        let taskDiv = document.createElement('div');
        taskDiv.classList.add('cardtask');

        let taskDoneCheck = document.createElement('button')
        taskDoneCheck.type = 'button'
        taskDoneCheck.classList.add('taskcheckbtn')
        taskDoneCheck.textContent = '';
        taskDoneCheck.onclick = taskCheck;

        let taskName = document.createElement('p')
        taskName.textContent = `${project.tasks[i]}`;

        taskDiv.appendChild(taskDoneCheck);
        taskDiv.appendChild(taskName);
        cardBot.appendChild(taskDiv);
    }

    if (nightModeOn) {
        cardBot.classList.add('nmon');
        projectCard.classList.add('nmon');
    }

    projectCard.appendChild(cardBot);
    opTable.appendChild(projectCard);
}

function updateTable () {
    let opTable = document.querySelector('.optable');
    opTable.innerHTML = '';

    for (let i = 0; i < projects.length; i++) {
        displayProject(projects[i]);
    }
}

function toggleMenu () {
    const sideBar = document.querySelector('.sidebar');
    const iconLine1 = document.querySelector('.line1');
    const iconLine2 = document.querySelector('.line2');
    const sbp = document.querySelectorAll('.sbp');
    const sbbtn = document.querySelectorAll('.sbbtn');
    const dueBox = document.querySelector('.duebox')

    
    iconLine1.classList.toggle('closed');
    iconLine2.classList.toggle('closed');
    dueBox.classList.toggle('sidebarleft');
    sideBar.classList.toggle('closed');
    for (let i = 0; i < sbp.length; i++) {
        sbp[i].classList.toggle('closed');
    }
    for (let i = 0; i < sbbtn.length; i++) {
        sbbtn[i].classList.toggle('closed');
    }
}

function toggleAdd () {
    const projectInput = document.querySelector('.projectinput');

    addButton.classList.toggle('addclicked');
    projectInput.classList.toggle('closed');
}

function toggleNotifications () {
    const dueBox = document.querySelector('.duebox')
    dueBox.classList.toggle('closed')
}

function checkTaskAmount (inputBox) {
    taskInputs = inputBox.querySelectorAll('input');
   
    if (taskInputs.length < 8) {
        return;
    } else if (taskInputs.length >= 8) {
        addTasksBtn.classList.add('closed');
    }
}

function addTaskInput () {
    const inputBox = document.querySelector('.taskinput')
    const newTaskInput = document.createElement('input')
    newTaskInput.id = 'task'
                .type = 'text'
                .name = 'task'
                .maxlength = '25';
    inputBox.appendChild(newTaskInput); 
    
    checkTaskAmount(inputBox);
}

function toggleNightMode () {
    const switchBall = document.querySelector('.nightmodeball');
    const sideBar = document.querySelector('.sidebar');
    const opTable = document.querySelector('.optable')
    const cardBottom = document.querySelectorAll('.cardbot')
    const fullCard = document.querySelectorAll('.projectcard')
    const projectInput = document.querySelector('.projectinput')

    switchBall.classList.toggle('nmon');
    nightModeSwitch.classList.toggle('nmon');
    sideBar.classList.toggle('nmon');
    opTable.classList.toggle('nmon');
    addButton.classList.toggle('nmon');
    projectInput.classList.toggle('nmon');

    for (let i = 0; i < fullCard.length; i++) {
        cardBottom[i].classList.toggle('nmon');
        fullCard[i].classList.toggle('nmon');
    }


    nightModeOn = !nightModeOn;
}

function getProject () {
    let tasks = [];

    let taskInputsContainer = document.querySelector('.taskinput');
    let titleInput = document.querySelector('#projecttitle');
    let dueInput = document.querySelector('#dueinput');
    let taskInputs = taskInputsContainer.querySelectorAll('input')

    for (let i = 0; i < taskInputs.length; i++) {
        tasks.push(taskInputs[i].value);
    }

    let due = dueInput.value;
    let title = titleInput.value;

    return [title, due, tasks];
}

function Project (title, due, tasks) {
    this.title = title;
    this.due = due;
    this.tasks = tasks;
}

function resetInput () {
    let taskInputs = document.querySelector('.taskinput')
    let titleInput = document.querySelector('#projecttitle')
    let dueInput = document.querySelector('#dueinput')
    taskInputs.innerHTML = '';
    titleInput.value = '';
    dueInput.value = '';

    let label = document.createElement('label');
    label.for = 'task';
    label.textContent = 'Tasks'
    taskInputs.appendChild(label);

    for (let i = 0; i < 3; i++) {
        let taskInput = document.createElement('input');
        taskInput.type = 'text';
        taskInput.id = 'task';
        taskInput.name = 'task'
        taskInput.maxlength = '25';

        taskInputs.appendChild(taskInput);
    }
}

function addProject () {
    if (document.querySelector('#projecttitle').value === '' || document.querySelector('#dueinput').value === '') {
        document.querySelector('.requirealert').textContent = 'Please add a title and a duedate!';
        return;
    }

    let input = getProject();
    let newProject = new Project(input[0], input[1], input[2]);
    projects.push(newProject);
    resetInput();
    toggleAdd();
    updateTable();
    document.querySelector('.requirealert').textContent = '';
}



addTasksBtn.onclick = addTaskInput;
menuButton.onclick = toggleMenu;
addButton.onclick = toggleAdd;
dueButton.onclick = toggleNotifications;
nightModeSwitch.onclick = toggleNightMode;
submitProjectBtn.onclick = addProject;

