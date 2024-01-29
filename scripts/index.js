// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function createCard(cardDate) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  cardElement.querySelector(".card__title").textContent = cardDate.name;
  cardElement.querySelector(".card__image").src = cardDate.link;
  cardElement.querySelector(".card__image").alt = cardDate.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", function () {
    deleteCard(cardElement);
  });

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function showCards(cardData) {
  cardData.forEach((element) => {
    const cardElement = createCard(element);
    placesList.append(cardElement);
  });
}

showCards(initialCards);
