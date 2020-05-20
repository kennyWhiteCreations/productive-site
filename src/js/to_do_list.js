/*jshint esversion: 6 */
const heading = document.querySelector("[data-heading]");
const date = document.querySelector("[data-heading-date]");
const listUl = document.querySelector("[data-task-list]");
const newListInput = document.querySelector("[data-new-list-input]");
const newListForm = document.querySelector("[data-create-list-form]");
const newTaskInput = document.querySelector("[data-new-task-input]");
const newTaskForm = document.querySelector("[data-create-task-form]");
const deleteSelectedListBtn = document.querySelector(
  "[data-delete-selected-list]"
);
const todoContainer = document.querySelector("[data-list-display-container]");
const tasksHeading = document.querySelector("[data-list-heading]");
const tasksCounter = document.querySelector("[data-tasks-counter]");
const headerBackground = document.getElementsByClassName("header-background");
const tasksContainer = document.querySelector("[data-tasks]");
const taskTemplate = document.getElementById("task-template");
const clearCompletedTasksBtn = document.querySelector(
  "[data-clear-completed-tasks]"
);

const LOCAL_STORAGE_LIST_KEY = "task.lists";
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "task.selectedListId";
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

function changeDay() {
  let rawDate = new Date();
  rawDate.getDay();
  let weekDay = new Array(7);
  weekDay[0] = "Sunday";
  weekDay[1] = "Monday";
  weekDay[2] = "Tuesday";
  weekDay[3] = "Wednesday";
  weekDay[4] = "Thursday";
  weekDay[5] = "Friday";
  weekDay[6] = "Saturday";

  let dayOfWeek = weekDay[rawDate.getDay()];
  heading.textContent = dayOfWeek;
}

function changeDate() {
  let rawDate = new Date();
  let rawMonth = rawDate.getMonth();
  let day = rawDate.getDate();
  let year = rawDate.getFullYear();

  let months = new Array(12);
  months[0] = "1";
  months[1] = "2";
  months[2] = "3";
  months[3] = "4";
  months[4] = "5";
  months[5] = "6";
  months[6] = "7";
  months[7] = "8";
  months[8] = "9";
  months[9] = "10";
  months[10] = "11";
  months[11] = "12";

  let month = months[rawMonth];
  let fullDate = `${month}/${day}/${year}`;
  date.textContent = fullDate;
}

function changeStyles() {
  let rawDate = new Date();
  let hours = rawDate.getHours();
  let taskGroup = document.getElementsByClassName("task-groups")[0];
  let headingGroup = document.getElementsByClassName("heading")[0];
  const morningGradient = "linear-gradient(#c00f1fe3, #f0b96d)";
  const afternoonGradient = "linear-gradient(#6190E8, #A7BFE8)";
  const nightGradient = "linear-gradient(#021f40, #4d4094)";
  if (hours <= 5) {
    headerBackground[0].style.background = nightGradient;
    headerBackground[1].style.background = nightGradient;
    document.querySelector(".task-list-name").style.color = "#4d4094";
    todoContainer.style.backgroundColor = "#999";
    taskGroup.style.backgroundColor = "#999";
    headingGroup.style.color = "#4d4094";
    document.querySelector("label").style.color = "#4d4094";
  } else if (hours > 5 && hours < 11) {
    headerBackground[0].style.background = morningGradient;
    headerBackground[1].style.background = morningGradient;
    document.querySelector(".task-list-name").style.color = "#ff6c74";
    todoContainer.style.backgroundColor = "#f5deb3";
    taskGroup.style.backgroundColor = "#f5deb3";
    headingGroup.style.color = "#ff6c74";
    document.querySelector("label").style.color = "#ff6c74";
  } else if (hours > 11 && hours < 20) {
    headerBackground[0].style.background = afternoonGradient;
    headerBackground[1].style.background = afternoonGradient;
    document.querySelector(".task-list-name").style.color = "#A7BFE8";
    todoContainer.style.backgroundColor = "#999";
    taskGroup.style.backgroundColor = "#999";
    headingGroup.style.color = "#A7BFE8";
    document.querySelector("label").style.color = "#A7BFE8";
  } else {
    headerBackground[0].style.background = nightGradient;
    headerBackground[1].style.background = nightGradient;
    document.querySelector(".task-list-name").style.color = "#4d4094";
    todoContainer.style.backgroundColor = "#999";
    taskGroup.style.backgroundColor = "#999";
    headingGroup.style.color = "#4d4094";
    document.querySelector("label").style.color = "#4d4094";
  }
}

openNav = () => {
  document
    .getElementById("navbar")
    .classList.replace("navbar-closed", "navbar-open");
  document.getElementById("hamburger-menu").style.width = "0";
  document.getElementById("hamburger-menu").style.opacity = "0";
  document.getElementById("hamburger-menu").style.height = "0";
  return false;
};

closeNav = () => {
  document
    .getElementById("navbar")
    .classList.replace("navbar-open", "navbar-closed");
  document.getElementById("hamburger-menu").style.width = "10vh";
  document.getElementById("hamburger-menu").style.opacity = "1";
  document.getElementById("hamburger-menu").style.height = "5vh";
  return false;
};

function render() {
  clearElement(listUl);
  renderList();
  const selectedList = lists.find((list) => list.id === selectedListId);
  if (selectedListId == null) {
    todoContainer.style.display = "none";
  } else {
    todoContainer.style.display = "";
    tasksHeading.innerText = selectedList.name;
  }
  renderTaskCount(selectedList);
  clearElement(tasksContainer);
  rendertasks(selectedList);
}

function rendertasks(selectedList) {
  selectedList.tasks.forEach((task) => {
    const taskElement = document.importNode(taskTemplate.content, true);
    const checkbox = taskElement.querySelector("input");
    checkbox.id = task.id;
    checkbox.checked = task.complete;
    const label = taskElement.querySelector("label");
    label.htmlFor = task.id;
    label.append(task.name);
    tasksContainer.appendChild(taskElement);
  });
}

function renderTaskCount(selectedList) {
  const incompleteTaskCount = selectedList.tasks.filter(
    (task) => !task.complete
  ).length;
  const taskString = incompleteTaskCount === 1 ? "task" : "tasks";
  tasksCounter.innerText = `${incompleteTaskCount} ${taskString} remaining`;
}

listUl.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "li") {
    selectedListId = e.target.dataset.listId;
    saveAndRender();
  }
});

tasksContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "input") {
    const selectedList = lists.find((list) => list.id === selectedListId);
    const selectedTask = selectedList.tasks.find(
      (task) => task.id === e.target.id
    );
    selectedTask.complete = e.target.checked;
    save();
    renderTaskCount(selectedList);
  }
});

clearCompletedTasksBtn.addEventListener("click", (e) => {
  const selectedList = lists.find((list) => list.id === selectedListId);
  selectedList.tasks = selectedList.tasks.filter((task) => !task.complete);
  saveAndRender();
});

newListForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const listName = newListInput.value;
  if (listName === "" || listName == null) return;
  const list = createList(listName);
  newListInput.value = null;
  lists.push(list);
  saveAndRender();
});

newTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskName = newTaskInput.value;
  if (taskName === "" || taskName == null) return;
  const task = createTask(taskName);
  newTaskInput.value = null;
  const selectedList = lists.find((list) => list.id === selectedListId);
  selectedList.tasks.push(task);
  saveAndRender();
});

deleteSelectedListBtn.addEventListener("click", (e) => {
  const confirmation = confirm(
    "If you select ok then the selected list will be deleted!"
  );
  if (confirmation === true) {
    lists = lists.filter((list) => list.id !== selectedListId);
    selectedListId = null;
    saveAndRender();
  }
});

function createList(name) {
  return { id: Date.now().toString(), name: name, tasks: [] };
}

function createTask(name) {
  return { id: Date.now().toString(), name: name, complete: false };
}

function saveAndRender() {
  save();
  render();
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

function renderList() {
  lists.forEach((list) => {
    const listElement = document.createElement("li");
    listElement.dataset.listId = list.id;
    listElement.classList.add("task-list-name");
    listElement.innerText = list.name;
    if (list.id === selectedListId)
      listElement.classList.add("active-task-list");

    listUl.appendChild(listElement);
  });
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
render();
changeDay();
changeDate();
changeStyles();
