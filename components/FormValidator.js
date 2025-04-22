class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formEl = formEl;
    this._inputList = settings.inputList;
  }

  _showInputError() {
    const errorElementId = `#${this._formEl.id}-error`;
    const errorElement = this._errorClass.querySelector(errorElementId);
    this._inputElements.classList.add(errorElementId);
    errorElement.textContent = inputElement.validationMessage;
    this._inputErrorClass.classList.add(settings._errorClass);
  }

  _hideInputError() {
    errorElement.classList.remove(errorElementId);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError();
    } else {
      _hideInputError();
    }
  }

  _hasInvalidInput = () => {
    return this._inputElements.some((inputSelector) => {
      return !inputSelector.validity.valid;
    });
  };

  _toggleButtonState(inputSelector, _buttonElement) {
    if (this._hasInvalidInput(inputSelector)) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputElements = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );

    this._toggleButtonState(this._inputElements);

    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        toggleButtonState(inputSelector, buttonElement, settings);
      });
    });
  }

  resetValidation() {
    this._formEl.reset();
    this._toggleButtonState();
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._setEventListeners();
    });
    this._setEventListeners();
    this._toggleButtonState();
  }
}

export default FormValidator;
