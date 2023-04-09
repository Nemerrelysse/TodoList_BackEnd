'use strict';

const homeIcon = document.querySelector('.home__icon');

const main = document.querySelector('.main');

const sidebar = document.querySelector('.sidebar');
const sidebarOpenBtn = document.querySelector('.sidebar__open__icon');
const sidebarCloseIcon = document.querySelector('.sidebar__close__icon');

const taskList = document.querySelector('.task__list');
const taskListNav = document.querySelector('.task__list__nav');

const settings = document.querySelector('.settings');
const settingsBtn = document.querySelector('.settings__btn');

const editArea = document.querySelector('.edit__area');
const editAreaCloseIcon = document.querySelector('.edit__area__close__icon');
const cancelBtn = document.querySelector('.cancel__btn');

const openModalBtn = document.querySelector('.open__modal__btn');
const closeModalBtn = document.querySelector('.close__modal__btn');
const overlay = document.querySelector('.overlay');

// hard-coded data
let tasks = [
  {
    id: '1672220153628',
    title: 'Créer un repository sur github',
    status: false,
    deadline: 'aujourd’hui',
    steps: '1 sur 2',
    note: '',
  },
  {
    id: '1672220153629',
    title: 'Créer un repository sur github',
    status: true,
    deadline: '',
    steps: '',
    note: '',
  },
  {
    id: '1672220153630',
    title: 'Créer un repository sur github',
    status: false,
    deadline: '',
    steps: '',
    note: '',
  },
  {
    id: '1672220153631',
    title: 'Créer un repository sur github',
    status: true,
    deadline: '',
    steps: '',
    note: '',
  },
];

// add new task function
function addNewTask(taskTitle) {
  if (!taskTitle) return;
  tasks.push({
    id: String(Date.now()),
    title: taskTitle,
    status: false,
    deadline: '',
    steps: '',
    note: '',
  });
  updateTaskList(tasks);
}

// update task status function
function updateTaskStatus(taskId) {
  tasks.forEach((task) => {
    if (task.id === taskId) {
      task.status = !task.status;
    }
  });
  updateTaskList(tasks);
}

// delete task function
function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  updateTaskList(tasks);
}

function setAllEventListeners() {
  const taskTitles = document.querySelectorAll('.task__title');
  const checkboxes = document.querySelectorAll('.checkbox');
  const deleteButtons = document.querySelectorAll('.delete__task__icon');
  const addTaskInput = document.querySelector('.add__task__input');
  const addTaskIcon = document.querySelector('.add__task__icon');

  taskTitles.forEach((taskTitle) => {
    taskTitle.addEventListener('click', function () {
      main.classList.add('edit__area__open');
      editArea.classList.add('open');
    });
  });

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', function () {
      const task = this.closest('.task');
      updateTaskStatus(task.dataset.id);
    });
  });

  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener('click', function () {
      const task = this.closest('.task');
      deleteTask(task.dataset.id);
    });
  });

  addTaskIcon.addEventListener('click', function () {
    addNewTask(addTaskInput.value);
  });

  addTaskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') addNewTask(addTaskInput.value);
  });
}

function displayTaskDetails(task) {
  if (task.steps || task.deadline || task.note) {
    return `<ul class="task__details">
    <li class="task__steps">${task.steps}</li>
    <li class="task__deadline">Echéance : ${task.deadline}</li>
    <li class="task__note">Note</li>
  </ul>`;
  }
  return '';
}

function updateTaskList(tasks) {
  taskListNav.innerHTML = '';

  let html = '';

  tasks.forEach((task) => {
    html += `
    <li class="task" data-id="${task.id}" >
      <label class="checkbox__container">
        <input class="checkbox" type="checkbox" ${task.status ? 'checked' : null}/>
        <span class="checkmark"></span>
      </label>
      <div class="task__body">
      ${task.status ? `<s class="task__title">${task.title}</s>` : `<h3 class="task__title">${task.title}</h3>`}
      ${displayTaskDetails(task)}
      </div>
      <img src="src/icons/delete.svg" alt="trash can" class="delete__task__icon" />
    </li>`;
  });

  html += `
  <li class="add__task">
    <input type="text" placeholder="Ajouter une tâche..." class="add__task__input" />
    <img src="src/icons/plus-dark.svg" alt="trash can" class="add__task__icon" />
  </li>`;

  taskListNav.insertAdjacentHTML('beforeend', html);

  setAllEventListeners();
}

updateTaskList(tasks);

// close edit area
editAreaCloseIcon.addEventListener('click', function () {
  main.classList.remove('edit__area__open');
  editArea.classList.remove('open');
});

// close edit area
cancelBtn.addEventListener('click', function () {
  main.classList.remove('edit__area__open');
  editArea.classList.remove('open');
});

// open settings
settingsBtn.addEventListener('click', function () {
  taskList.classList.add('close');
  settings.classList.remove('close');
});

// open task list
homeIcon.addEventListener('click', function () {
  taskList.classList.remove('close');
  settings.classList.add('close');
});

// open sidebar
sidebarOpenBtn.addEventListener('click', function () {
  sidebar.classList.add('open');
});

// close sidebar
sidebarCloseIcon.addEventListener('click', function () {
  sidebar.classList.remove('open');
});

// open modal
openModalBtn.addEventListener('click', () => {
  overlay.classList.toggle('hidden');
});

// close modal
closeModalBtn.addEventListener('click', () => {
  overlay.classList.toggle('hidden');
});
