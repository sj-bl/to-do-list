// document selector
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterSelect = document.querySelector("select");
// event listner
window.addEventListener("load", displayLocalStorageItems);

todoButton.addEventListener("click", () => {
  if (todoInput.value !== "") {
    additem;
  }
});
document.addEventListener("keypress", (e) => {
  if (e.keyCode === 13 && todoInput.value !== "") {
    additem();
  }
});
todoList.addEventListener("click", deleteChecked);
filterSelect.addEventListener("click", filter);
// function add item
function additem(event) {
  // event.preventDefault();

  const div = document.createElement("div");
  div.classList.add("todo");
  todoList.appendChild(div);
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  div.appendChild(newTodo);
  const checked = document.createElement("button");
  checked.classList.add("checked-btn");
  checked.innerHTML = `<i class="fas fa-check"></i>`;
  div.appendChild(checked);
  const trash = document.createElement("button");
  trash.classList.add("trash-btn");
  trash.innerHTML = `<i class="fas fa-trash"></i>`;
  div.appendChild(trash);
  saveTOLocalStorage(todoInput.value);
  // clear input
  todoInput.value = "";
}
// function to delete or mark checked
function deleteChecked(e) {
  const item = e.target;

  const todoparent = item.parentElement;
  if (item.classList[0] === "trash-btn") {
    todoparent.classList.add("getout");
    todoparent.addEventListener("animationend", function () {
      deleteItemFromLocalStorage(todoparent);
      todoparent.remove();
    });
  } else if (item.classList[0] === "checked-btn") {
    todoparent.classList.toggle("complete");
  }
}
// filter function
function filter() {
  const toDo = todoList.childNodes;
  toDo.forEach(function (e) {
    switch (filterSelect.value) {
      case "all":
        e.style.display = "flex";
        break;
      case "complete":
        // console.log(e.classList.contains("complete"));
        if (e.classList.contains("complete")) {
          e.style.display = "flex";
        } else {
          e.style.display = "none";
        }
        break;
      case "uncomplete":
        // console.log(e.classList.contains("complete"));
        if (!e.classList.contains("complete")) {
          e.style.display = "flex";
        } else {
          e.style.display = "none";
        }
        break;
    }
  });
}

// locAL STORAGE
function saveTOLocalStorage(todo) {
  let arrayOfTodo;
  if (localStorage.getItem("arrayOfTodo") === null) {
    arrayOfTodo = [];
  } else {
    arrayOfTodo = JSON.parse(localStorage.getItem("arrayOfTodo"));
  }
  arrayOfTodo.push(todo);
  localStorage.setItem("arrayOfTodo", JSON.stringify(arrayOfTodo));
}
function displayLocalStorageItems() {
  let arrayOfTodo;
  if (localStorage.getItem("arrayOfTodo") === null) {
    arrayOfTodo = [];
  } else {
    arrayOfTodo = JSON.parse(localStorage.getItem("arrayOfTodo"));
  }
  arrayOfTodo.forEach(function (e) {
    const div = document.createElement("div");
    div.classList.add("todo");
    todoList.appendChild(div);
    const newTodo = document.createElement("li");
    newTodo.innerText = e;
    newTodo.classList.add("todo-item");
    div.appendChild(newTodo);
    const checked = document.createElement("button");
    checked.classList.add("checked-btn");
    checked.innerHTML = `<i class="fas fa-check"></i>`;
    div.appendChild(checked);
    const trash = document.createElement("button");
    trash.classList.add("trash-btn");
    trash.innerHTML = `<i class="fas fa-trash"></i>`;
    div.appendChild(trash);
  });
}
// delete fromm local storage
function deleteItemFromLocalStorage(todo) {
  const toDo = todo.children[0].innerText;
  let arrayOfTodo;
  if (localStorage.getItem("arrayOfTodo") === null) {
    arrayOfTodo = [];
  } else {
    arrayOfTodo = JSON.parse(localStorage.getItem("arrayOfTodo"));
  }
  arrayOfTodo.splice(arrayOfTodo.indexOf(toDo), 1);
  localStorage.setItem("arrayOfTodo", JSON.stringify(arrayOfTodo));
}
