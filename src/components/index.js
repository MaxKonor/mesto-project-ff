import "../pages/index.css";
import { createCard, deleteCard, likeCard } from "./card.js";
import { openModal, closeModal, closeModalByOverlay } from "./modal.js";
import { enableValidation, clearValidation, settings } from "./validate.js";
import {
  getInitialInfo,
  updateProfile,
  uploadCard,
  uploadAvatar,
  renderLoading,
} from "./api.js";

const placesList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupImageCaption = document.querySelector(".popup__caption");
const popupImagePicture = document.querySelector(".popup__image");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupAvatar = document.querySelector(".popup_type_avatar");
const jobInput = document.querySelector(".popup__input_type_description");
const nameInput = document.querySelector(".popup__input_type_name");
const popupAddNewCard = document.querySelector(".popup_type_new-card");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const avatarBtn = document.querySelector(".profile__avatar-container");
const profileAvatar = document.querySelector(".profile__avatar");
const profileCloseButton = document.querySelectorAll(".popup__close");

const formEditProfile = document.forms["edit-profile"];
const formNewPlace = document.forms["new-place"];
const formAvatar = document.forms["new-avatar"];

let userId;

function openModalImage(item) {
  popupImagePicture.src = item.link;
  popupImagePicture.alt = item.name;
  popupImageCaption.textContent = item.name;
  openModal(popupTypeImage);
}

function addCard(item, userId, place = "end") {
  const card = createCard(item, userId, deleteCard, likeCard, openModalImage);

  if (place === "end") {
    placesList.append(card);
  } else {
    placesList.prepend(card);
  }
}

function renderCards(initialCards, userId) {
  initialCards.forEach(function (elem) {
    addCard(elem, userId);
  });
}

profileCloseButton.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closeModal(popup));

  popup.addEventListener("mousedown", closeModalByOverlay);
});

function fillProfile(user) {
  profileTitle.textContent = user.name;
  profileDescription.textContent = user.about;
}

profileEditButton.addEventListener("click", function () {
  clearValidation(popupTypeEdit, settings);
  jobInput.value = profileDescription.textContent;
  nameInput.value = profileTitle.textContent;
  openModal(popupTypeEdit);
});

profileAddButton.addEventListener("click", function () {
  openModal(popupAddNewCard);
});

avatarBtn.addEventListener("click", function () {
  openModal(popupAvatar);
});

function handleEditProfileSubmit(event) {
  event.preventDefault();
  renderLoading(true, event.submitter);

  updateProfile({
    name: formEditProfile.name.value,
    about: formEditProfile.description.value,
  })
    .then((updatedProfile) => {
      fillProfile(updatedProfile);
      closeModal(popupTypeEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, event.submitter);
    });
}

formEditProfile.addEventListener("submit", handleEditProfileSubmit);

function handlePlaceSubmit(event) {
  event.preventDefault();
  renderLoading(true, event.submitter);

  uploadCard({
    name: formNewPlace.elements["place-name"].value,
    link: formNewPlace.link.value,
  })
    .then((uploadedCard) => {
      addCard(uploadedCard, userId, true);
      closeModal(popupAddNewCard);
      clearValidation(event.target, settings);
      event.target.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, event.submitter);
    });
}

popupAddNewCard.addEventListener("submit", handlePlaceSubmit);

function uploadNewAvatar(user) {
  profileAvatar.src = user.avatar;
}

function handleAvatarFormSubmit(event) {
  event.preventDefault();
  renderLoading(true, event.submitter);

  uploadAvatar({
    avatar: formAvatar.link.value,
  })
    .then((uploadedAvatar) => {
      uploadNewAvatar(uploadedAvatar);
      closeModal(popupAvatar);
      clearValidation(event.target, settings);
      event.target.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, event.submitter);
    });
}

formAvatar.addEventListener("submit", handleAvatarFormSubmit);

enableValidation(settings);

getInitialInfo()
  .then((result) => {
    const userInfo = result[0];
    const initialCards = result[1];
    userId = userInfo._id;
    fillProfile(userInfo);
    renderCards(initialCards, userId);
    uploadNewAvatar(userInfo);
  })
  .catch((err) => {
    console.log(err);
  });
