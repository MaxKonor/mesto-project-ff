// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function createCard(cardData, { deleteCard }) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  cardElement.querySelector(".card__title").textContent = cardData.name;
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", function () {
    deleteCard(cardElement);
  });

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function showCards(cards) {
  cards.forEach((element) => {
    const cardElement = createCard(element, { deleteCard });
    placesList.append(cardElement);
  });
}

showCards(initialCards);
