// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Functions
const addTodo = function (e) {
  e.preventDefault();

  // TODO DIV
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  // Create LI
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);

  // Add TODO to localStorage
  saveLocalTodos(todoInput.value);

  // Check Mark Button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<li class="fas fa-check"></li>';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);

  // Trash Button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<li class="fas fa-trash"></li>';
  trashButton.classList.add('trash-btn');
  todoDiv.appendChild(trashButton);

  // Append to LIST
  todoList.appendChild(todoDiv);

  // Clear TODO input value
  todoInput.value = '';
};

const deleteCheck = function (e) {
  const item = e.target;

  // DELETE TODO
  if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;
    // Animation
    todo.classList.add('fall');
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', function () {
      todo.remove();
    });
  }

  // CHECK MARK
  if (item.classList.contains('complete-btn')) {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
};

const filterTodo = function (e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      default:
        todo.style.display = 'flex';
    }
  });
};

// Event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// SAVING THE TODO LIST INSIDE LOCALHOST
function saveLocalTodos(todo) {
  let todos;
  // CHECK---HEY, Do I already have things in there?
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  let todos;
  // CHECK---HEY, Do I already have things in there?
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach(function (todo) {
    // TODO DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<li class="fas fa-check"></li>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    // Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<li class="fas fa-trash"></li>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    // Append to LIST
    todoList.appendChild(todoDiv);

    // Clear TODO input value
    todoInput.value = '';
  });
}

function removeLocalTodos(todo) {
  let todos;
  // CHECK---HEY, Do I already have things in there?
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}
