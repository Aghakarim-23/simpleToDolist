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
            <li class="w-full flex border rounded-r-lg overflow-hidden h-[3rem]">
                <p class="w-[70%] pl-2 h-full flex items-center">${task.text}</p>
                <button onclick="completeTask(${task.id})" class="w-[15%] flex justify-center items-center h-full hover:cursor-pointer border-l">
                    <i class="fa-solid fa-circle-check text-gray-500 hover:cursor-pointer"></i>
                </button>
                <button onclick="deleteTask(${task.id})" class="w-[15%] flex justify-center items-center bg-red-500 h-full hover:cursor-pointer text-[14px] border-l">Delete</button>
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
               
                <button onclick="deleteCompletedTask(${task.id})" class="w-[30%] flex justify-center items-center bg-red-500 h-full hover:cursor-pointer text-[14px] border-l">Delete</button>
            </li>
            `

            /* burada delete add buttonunu sildim ona gore ki, eger user sildiyi taski yeniden yerine qaytaramaq istese elave ederem
             <button onclick="completeTask(${task.id})" class="w-[15%] flex justify-center items-center h-full hover:cursor-pointer border-l">
                    <i class="fa-solid fa-circle-check text-green-500 hover:cursor-pointer"></i>
                </button>
            */
      )
      .join("");
      
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("completedTasksArray", JSON.stringify(completedTasksArray));
    renderTask();
    // localStorage.clear("tasks")
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
        console.log(completedTaskDeleteItem);

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
               
                <button onclick="deleteCompletedTask(${task.id})" class="w-[30%] flex justify-center items-center bg-red-500 h-full hover:cursor-pointer text-[14px] border-l">Delete</button>
            </li>
            `
      )
      .join("");


      /* 
      
         <button onclick="completeTask(${task.id})" class="w-[15%] flex justify-center items-center h-full hover:cursor-pointer border-l">
                    <i class="fa-solid fa-circle-check text-green-500 hover:cursor-pointer"></i>
                </button>
      */
        
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


