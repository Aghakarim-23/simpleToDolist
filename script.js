const input = document.querySelector("input");
const taskList = document.getElementById("taskList");
const completedTaskList = document.getElementById("completedTaskList");

let tasks = [];
let completedTasksArray = [];

let unCompletedTasks = document.getElementById("unCompletedTasks");
let completedTasks = document.getElementById("completedTasks");
const lengthUnCompletedTasks = tasks.length;
const lengthCompletedTasks = completedTasksArray.length;

function addTask() {
  let inputValue = input.value;

  const newTask = {
    id: Date.now(),
    text: inputValue,
  };

  if (inputValue.trim() === "") {
    alert("You must add a task");
    return;
  }

  tasks.push(newTask);
//   input.value = "";

  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTask();
}

function renderTask() {
  if (tasks.length === 0) {
    taskList.innerHTML = `<p class="text-center text-red-400 mt-4">You haven't add a task yet</p>`;
  } else {
    taskList.innerHTML = tasks
      .map(
        (task) => `
            <li class="w-full flex border rounded-r-lg overflow-hidden h-[3rem]" contenteditable="true">
                <p class="w-[70%] pl-2 h-full flex items-center">${task.text}</p>
                <button onclick="completeTask(${task.id})" class="w-[15%]  flex justify-center items-center h-full hover:cursor-pointer border-l group">
                    <i class="fa-solid fa-circle-check text-gray-500 hover:cursor-pointer group-hover:text-green-600"></i>
                </button>
                <button onclick="deleteTask(${task.id})" class="w-[15%] text-white border-black flex justify-center items-center bg-red-500 h-full hover:cursor-pointer text-[14px] border-l">Delete</button>
            </li>
            `
      )
      .join("");
  }
  unCompletedTasks.textContent = `Uncompleted tasks: ${tasks.length}`;
  completedTasks.textContent = `Completed tasks: ${completedTasksArray.length}`;

}

function completeTask(id) {
  let completedTask = tasks.find((item) => item.id === id);

  if (completedTask) {
    completedTasksArray.push(completedTask);

    tasks = tasks.filter((item) => item.id !== id);

    completedTaskList.innerHTML = completedTasksArray
      .map(
        (task) => `
            <li class="w-full flex border rounded-r-lg overflow-hidden h-[3rem]">
                <p class="w-[70%] pl-2 h-full flex items-center line-through text-gray-400">${task.text}</p>
                <button onclick="restoreCompletedTask(${task.id})" class="w-[15%] flex justify-center items-center h-full hover:cursor-pointer border-l group">
                    <i class="fas fa-trash-restore text-blue-300 group-hover:text-blue-500 "></i>                   
                </button>
               
                <button onclick="deleteCompletedTask(${task.id})" class="w-[30%] flex justify-center items-center bg-red-500 h-full hover:cursor-pointer text-[14px] border-black border-l text-white">Delete</button>
            </li>
            `
      )
      .join("");
      
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("completedTasksArray", JSON.stringify(completedTasksArray));
    renderTask();
  }
  
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTask();
}

function deleteCompletedTask (id) {
    const completedTaskDeleteItem = completedTasksArray.find((item => item.id === id))
    if(completedTaskDeleteItem) {
        completedTasksArray = completedTasksArray.filter(item => item.id !== id)
    }

    localStorage.setItem("completedTasksArray", JSON.stringify(completedTasksArray))
    renderTask()
    renderCompletedTask()    
}


function renderCompletedTask () {
    completedTaskList.innerHTML = completedTasksArray.map(task => 
            `
            <li class="w-full flex border rounded-r-lg overflow-hidden h-[3rem]">
                <p class="w-[70%] pl-2 h-full flex items-center line-through text-gray-400">${task.text}</p>
                <button onclick="restoreCompletedTask(${task.id})" class="w-[15%] flex justify-center items-center h-full hover:cursor-pointer border-l group">
                    <i class="fas fa-trash-restore text-blue-300 group-hover:text-blue-500"></i>                   
                </button>
                <button onclick="deleteCompletedTask(${task.id})" class="w-[30%] text-white flex justify-center items-center bg-red-500 h-full hover:cursor-pointer text-[14px] border-black border-l">Delete</button>
            </li>
            `
      )
      .join("");

}

function restoreCompletedTask (id) {

const checkIt = completedTasksArray.find(item => item.id === id);

if(checkIt) {
    completedTasksArray = completedTasksArray.filter(item => item.id !== id)
    tasks.push(checkIt)
    console.log(id);
}

localStorage.setItem("tasks", JSON.stringify(tasks));
localStorage.setItem("completedTasksArray", JSON.stringify(completedTasksArray));


renderCompletedTask()
renderTask()
}
 
document.addEventListener("DOMContentLoaded", () => {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }

  const completedTasks = localStorage.getItem("completedTasksArray"); 
  if (completedTasks) {
    completedTasksArray = JSON.parse(completedTasks);
}

renderTask();
renderCompletedTask()
});


