import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();
  return todoElement;
};

const renderTodo = (item) => {
  const todo = generateTodo(item);
  section.addItem(todo);
};

const section = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list",
});

section.renderItems();
addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
}

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (values) => {
    const date = new Date(values.date);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const todoData = { name: values.name, date, id, completed: false };

    renderTodo(todoData);
    todoCounter.updateTotal(true);
    addTodoPopup.close();
    newTodoValidator.resetValidation();
  },
});

addTodoPopup.setEventListeners();

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
