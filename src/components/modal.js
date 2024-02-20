export { openModal, closeModal };

function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalByEscape);
  document.addEventListener("click", closeModalByOverlay);
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalByEscape);
  document.removeEventListener("click", closeModalByOverlay);
}

function closeModalByOverlay(event) {
  if (event.target.classList.contains("popup_is-opened")) {
    closeModal(event.target);
  }
}

function closeModalByEscape(event) {
  if (event.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}
