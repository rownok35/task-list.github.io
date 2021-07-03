// Define UI element

let form = document.querySelector('#task_form');
let taskInput = document.querySelector('#new_task');
let tasklist = document.querySelector('ul');
let clearBtn = document.querySelector('#clear_task_btn');
let filter = document.querySelector('#task_filter');

//Define Event Listeners

form.addEventListener('submit', addtask);
tasklist.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTask);
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTasks);


//Define Functions
//add_task
function addtask(e) {
    e.preventDefault(); //prevents disappearing the li items

    if (taskInput.value === '') {
        alert('Add a task!');
    } else {
        // Create Li element
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + " "));


        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = ('x');
        li.appendChild(link);

        tasklist.appendChild(li);
        storeTaskInLocalStorage(taskInput.value);
        taskInput.value = '';



    }

}

//Remove Task

function removeTask(e) {
    if (e.target.hasAttribute("href")) {
        if (confirm("Are you sure?")) {
            let ele = e.target.parentElement;
            ele.remove();
            removeFromLS(ele);
        }

    }

}

//Clear Task

function clearTask(e) {
    // tasklist.innerHTML = '';

    //Faster
    while (tasklist.firstChild) {
        tasklist.removeChild(tasklist.firstChild);
    }
    localStorage.clear();
}

// Filter Task

function filterTask(e) {
    let text = e.target.value.toLowerCase();

    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

// Store in local storage

function storeTaskInLocalStorage(task) {

    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// function for retriving items from local storage

function getTasks(e) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task => {

        // Create Li element
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + " "));


        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = ('x');
        li.appendChild(link);

        tasklist.appendChild(li);

    });

}

// Remove From Local Storage

function removeFromLS(ele) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let li = ele;
    li.removeChild(li.lastChild); // <a>...</a>

    tasks.forEach((task, index) => {
        if (li.textContent.trim() === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}