class Popup {
  constructor({ popupSelector }) {
    this._popupEl = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popupEl.querySelector(".popup__close");
  }

  open() {
    this._popupEl.classList.add("popup_visible");
    document.addEventListener("keydown", this._handleEscapeClose);
  }

  close() {
    this._popupEl.classList.remove("popup_visible");
    document.removeEventListener("keydown", this._handleEscapeClose);
  }

  _handleEscapeClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._popupEl.addEventListener("mousedown", (evt) => {
      if (this._popupEl === evt.target || evt.target === this._popupCloseBtn) {
        this.close();
      }
    });
  }
}

export default Popup;
