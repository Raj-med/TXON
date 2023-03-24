const todoList = document.getElementById("todo-list");
const todoInput = document.getElementById("todo-input");
const addTodoBtn = document.getElementById("add-todo");
const filterButtons = document.querySelectorAll(".filter-button");

let todos = [];

addTodoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", handleTodoClick);
filterButtons.forEach(button => button.addEventListener("click", filterTodos));

function addTodo() {
  const todoText = todoInput.value.trim();
  if (!todoText) {
    return;
  }
  const todo = {
    id: Date.now(),
    text: todoText,
    completed: false
  };
  todos.push(todo);
  renderTodos();
  todoInput.value = "";
}

function handleTodoClick(e) {
  if (e.target.tagName === "BUTTON") {
    const button = e.target;
    const id = Number(button.parentElement.dataset.id);
    const action = button.dataset.action;
    if (action === "delete") {
      deleteTodoById(id);
    } else if (action === "edit") {
      editTodoById(id);
    } else if (action === "toggle") {
      toggleTodoById(id);
    }
  }
}

function deleteTodoById(id) {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
}

function editTodoById(id) {
  const todoText = prompt("Update your todo");
  if (!todoText) {
    return;
  }
  const todo = todos.find(todo => todo.id === id);
  todo.text = todoText;
  renderTodos();
}

function toggleTodoById(id) {
  const todo = todos.find(todo => todo.id === id);
  todo.completed = !todo.completed;
  renderTodos();
}

function filterTodos(e) {
  const filter = e.target.dataset.filter;
  filterButtons.forEach(button => {
    button.classList.toggle("active", button === e.target);
  });
  renderTodos(filter);
}

function renderTodos(filter) {
  let filteredTodos = todos;
  if (filter === "active") {
    filteredTodos = todos.filter(todo => !todo.completed);
  } else if (filter === "completed") {
    filteredTodos = todos.filter(todo => todo.completed);
  }
  todoList.innerHTML = "";
  filteredTodos.forEach(todo => {
    const li = document.createElement("li");
    li.dataset.id = todo.id;
    li.classList.toggle("completed", todo.completed);
    li.innerHTML = `
      <span>${todo.text}</span>
      <button class="edit-button" data-action="edit">Edit</button>
      <button data-action="delete">Delete</button>
      <button data-action="toggle">${todo.completed ? "Undo" : "Complete"}</button>
    `;
    todoList.appendChild(li);
  });
}
