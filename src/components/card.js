export { createCard, deleteCard, likeCard };

import { removeCard, putLike, deleteLike } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;

function createCard(
  item,
  userId,
  deleteCardCallback,
  likeCardCallBack,
  showCardCallBack
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeCounter = cardElement.querySelector(".card__like-counter");

  cardTitle.textContent = item.name;
  cardImage.alt = item.name;
  cardImage.src = item.link;

  if (item.owner._id === userId) {
    deleteButton.addEventListener("click", () =>
      deleteCardCallback(deleteButton, item._id)
    );
  } else {
    deleteButton.classList.remove("card__delete-button_visible");
  }

  cardImage.addEventListener("click", () => showCardCallBack(item));

  cardLikeCounter.textContent = item.likes.length;
  const liked = item.likes.some((likes) => likes._id === userId);
  if (liked) {
    likeButton.classList.add("card__like-button_is-active");
  }
  likeButton.addEventListener("click", () =>
    likeCardCallBack(likeButton, item._id, cardLikeCounter, item)
  );

  return cardElement;
}

function deleteCard(dump, cardId) {
  const cardItem = dump.closest(".card");
  removeCard(cardId)
    .then(() => {
      cardItem.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

function likeCard(button, cardId, likeCounter) {
  if (button.classList.contains("card__like-button_is-active")) {
    deleteLike(cardId)
      .then((card) => {
        likeCounter.textContent = card.likes.length;
        button.classList.remove("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    putLike(cardId)
      .then((card) => {
        likeCounter.textContent = card.likes.length;
        button.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
