import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";

const placesList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupImageCaption = document.querySelector(".popup__caption");
const popupImagePicture = document.querySelector(".popup__image");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupAddNewCard = document.querySelector(".popup_type_new-card");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileCloseButton = document.querySelector(".popup__close");
const buttonCloseFormAddCard = document.querySelector(
  ".popup_type_new-card .popup__close"
);
const buttonCloseModalImage = document.querySelector(
  ".popup_type_image .popup__close"
);

const formEditProfile = document.forms["edit-profile"];
const nameInput = formEditProfile["name"];
const jobInput = formEditProfile["description"];

const formNewPlace = document.forms["new-place"];
const placeNameInput = formNewPlace["place-name"];
const linkInput = formNewPlace["link"];

initialCards.forEach(function (item) {
  placesList.append(
    createCard(item.link, item.name, deleteCard, likeCard, openModalImage)
  );
});

function handleEditProfileSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupTypeEdit);
}

formEditProfile.addEventListener("submit", handleEditProfileSubmit);

function handlePlaceSubmit(event) {
  event.preventDefault();
  placesList.prepend(
    createCard(
      linkInput.value,
      placeNameInput.value,
      deleteCard,
      likeCard,
      openModalImage
    )
  );
  formNewPlace.reset();

  closeModal(popupAddNewCard);
}

formNewPlace.addEventListener("submit", handlePlaceSubmit);

function openModalImage(event) {
  popupImageCaption.textContent =
    event.target.closest(".places__item").textContent;
  popupImagePicture.alt = event.target.textContent;
  popupImagePicture.src = event.target.src;

  openModal(popupTypeImage);
}

profileEditButton.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupTypeEdit);
});

profileAddButton.addEventListener("click", function () {
  openModal(popupAddNewCard);
});

profileCloseButton.addEventListener("click", function () {
  closeModal(popupTypeEdit);
});

buttonCloseFormAddCard.addEventListener("click", function () {
  closeModal(popupAddNewCard);
});

buttonCloseModalImage.addEventListener("click", function () {
  closeModal(popupTypeImage);
});
