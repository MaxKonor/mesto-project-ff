export { createCard, deleteCard, likeCard };

const cardTemplate = document.querySelector("#card-template").content;

function createCard(
  link,
  name,
  deleteCardCallback,
  likeCardCallBack,
  showCardCallBack
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__title").textContent = name;
  cardImage.alt = name;
  cardImage.src = link;

  deleteButton.addEventListener("click", deleteCardCallback);
  likeButton.addEventListener("click", likeCardCallBack);
  cardImage.addEventListener("click", showCardCallBack);

  return cardElement;
}

function deleteCard(event) {
  event.target.closest(".card").remove();
}

function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}
