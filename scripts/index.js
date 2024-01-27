// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

const cardsInfo = initialCards.forEach(function (cardDate) {
  showCard(cardDate, deleteCard);
});

function deleteCard() {
  const listItem = this.closest(".places__item");
  listItem.remove();
}

function showCard(cardData, deleteCard) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement.querySelector(".card__image").src = cardData.link;

  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", deleteCard);

  placesList.append(cardElement);

  return cardElement;
}
