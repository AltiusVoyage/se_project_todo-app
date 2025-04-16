class Todo {
  constructor(data, selector) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = todoElement.querySelector(".todo__name");
    const todoCheckboxEl = todoElement.querySelector(".todo__completed");
    const todoLabel = todoElement.querySelector(".todo__label");
    const todoDate = todoElement.querySelector(".todo__date");
    const todoDeleteBtn = todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textcontent = this._data.name;
    todoCheckboxEl.checked = this._data.completed;

    todoCheckboxEl.id = `todo-${this._data.id}`;
    todoLabel.setAttribute("for", `todo-${this._data.id}`);

    return todoElement;
  }
}

export default Todo;
