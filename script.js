const input = document.querySelector("input");
const taskList = document.getElementById("taskList");
let tasks = [];

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
  input.value = "";

  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTask();
}

function renderTask() {
  if (tasks.length === 0) {
    taskList.innerHTML = `<p class="text-center text-red-400 mt-4">You haven't add task yet</p>`;
  } else {
    taskList.innerHTML = tasks
      .map(
        (task) => `
            <li class="w-full flex border rounded-r-lg overflow-hidden h-[3rem]">
                <p class="w-[70%] pl-2 h-full flex items-center">${task.text}</p>
                <button onclick="deleteTask(${task.id})" class="w-[30%] flex justify-center items-center bg-red-500 h-full hover:cursor-pointer border-l">Delete</button>
            </li>
            `
      )
      .join("");
  }
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTask();
}

document.addEventListener("DOMContentLoaded", () => {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
  renderTask();
});
