// VARIABLES

const selectors = {
  profile: '.profile',
  profileTitle: '.profile__title',
  profileJob: '.profile__subtitle',
  buttonEdit: '.profile__edit-button',

  profilePopup: '.popup_purpose_profile',
  buttonCloseProfilePopup: '.popup__close-button',

  profileForm: '.popup__form',
  profileFormNameInput: '#name-input',
  profileFormJobInput: '#description-input',

  buttonAddCard: '.profile__add-button',
  popupAddCard: '.popup_purpose_add-cards',
  buttonCloseAddCardPopup: '.popup__close-button',

  formAddCard: '.popup__form',
  formImageInput:'#image-name-input',
  formLinkInput: '#link-input',

  cardsTemplate: '#cards-template',
  cardsContainer: '.elements__list',
  cardsElement: '.elements__element',
  cardImage: '.elements__element-image',
  cardTitle: '.elements__element-title',
  cardHeart: '.elements__element-heart',
  cardTrash: '.elements__trash',

  fullScreenPopup: '.popup_purpose_full-screen',
  buttonCloseFullScreenPopup: '.full-screen__close-button',
  fullScreenImage: '.full-screen__image',
  fullScreenDescription: '.full-screen__description',
}

const initialCards = [
  {
    name: 'Мост',
    link: './images/bridge.jpg'
  },
  {
    name: 'Кофе',
    link: './images/coffee.jpg'
  },
  {
    name: 'Work',
    link: './images/work.jpg'
  },
  {
    name: 'Водопад',
    link: './images/waterflow.jpg'
  },
  {
    name: 'Рыбак',
    link: './images/water.jpg'
  },
  {
    name: 'Заснеженные вершины гор',
    link: './images/mountains.jpg'
  }
];

// Profile variables

const profile = document.querySelector(selectors.profile);
const profileTitle = profile.querySelector(selectors.profileTitle);
const profileJob = profile.querySelector(selectors.profileJob);
const buttonEdit = profile.querySelector(selectors.buttonEdit);

const profilePopup = document.querySelector(selectors.profilePopup);
const buttonCloseProfilePopup = profilePopup.querySelector(selectors.buttonCloseProfilePopup);
const profileForm = profilePopup.querySelector(selectors.profileForm);
const profileFormNameInput = profileForm.querySelector(selectors.profileFormNameInput);
const profileFormJobInput = profileForm.querySelector(selectors.profileFormJobInput);

// Cards variables

const buttonAddCard = profile.querySelector(selectors.buttonAddCard);
const popupAddCard = document.querySelector(selectors.popupAddCard);
const buttonCloseAddCardPopup = popupAddCard.querySelector(selectors.buttonCloseAddCardPopup);

const formAddCard = popupAddCard.querySelector(selectors.formAddCard);
const formImageInput = popupAddCard.querySelector(selectors.formImageInput);
const formLinkInput = popupAddCard.querySelector(selectors.formLinkInput);

const cardsContainer = document.querySelector(selectors.cardsContainer);

// Full screen variables

const fullScreenPopup = document.querySelector(selectors.fullScreenPopup);
const buttonCloseFullScreenPopup = fullScreenPopup.querySelector(selectors.buttonCloseFullScreenPopup);
const fullScreenImage = fullScreenPopup.querySelector(selectors.fullScreenImage);
const fullScreenDescription = fullScreenPopup.querySelector(selectors.fullScreenDescription);

// FUNCTIONS

function createCard(data) {
  const cardTemplate = document.querySelector(selectors.cardsTemplate).content;
  const cardElement = cardTemplate.querySelector(selectors.cardsElement).cloneNode(true);
  const cardImage = cardElement.querySelector(selectors.cardImage);
  const nameForCard = data.name;

  cardImage.src = data.link;
  cardImage.alt = nameForCard;
  cardElement.querySelector(selectors.cardTitle).textContent = nameForCard;
  cardElement.querySelector(selectors.cardHeart).addEventListener('click', toggleLike);

  cardElement.querySelector(selectors.cardTrash).addEventListener('click', removeCard);

  cardImage.addEventListener('click', openFullScreen);

  return cardElement;
}

function addCard(data, cardsContainer) {
  const card = createCard(data);
  cardsContainer.prepend(card);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openProfilePopup() {
  openPopup(profilePopup)
  profileFormNameInput.value = profileTitle.textContent;
  profileFormJobInput.value = profileJob.textContent;
}

function closeProfilePopup() {
  closePopup(profilePopup);
}

function changeProfileInformation(event) {
  event.preventDefault();

  profileTitle.textContent = profileFormNameInput.value;
  profileJob.textContent = profileFormJobInput.value;

  closeProfilePopup();
}

function openAddCardPopup() {
  openPopup(popupAddCard);
}

function closeAddCardPopup() {
  closePopup(popupAddCard);
}

function openFullScreen(event) {
  fullScreenImage.src = event.target.src;
  fullScreenImage.alt = event.target.alt;
  fullScreenDescription.textContent = event.target.alt;
  openPopup(fullScreenPopup);
}

function closeFullScreen() {
  closePopup(fullScreenPopup);
}

function toggleLike (event) {
  event.target.classList.toggle('elements__element-heart_active');
}

function removeCard(event) {
  event.target.closest(selectors.cardsElement).remove();
}

// MAIN LOGIC

// Cards creation

initialCards.forEach(function (item) {
  addCard({name: item.name,link: item.link}, cardsContainer);
});

// Profile

buttonEdit.addEventListener('click', openProfilePopup);

buttonCloseProfilePopup.addEventListener('click', closeProfilePopup);

/* Цель обработчика - закрыть попап при клике вне формы.
Используется событие mousedown, а не click, так как такой подход защищает от следующего сценария:
пользователь начал выделять мышкой текстовое поле и отпустил мышь вне формы - форма закрылась. */
profilePopup.addEventListener('mousedown', function(event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closeProfilePopup();
})

profileForm.addEventListener('submit', changeProfileInformation);

// Add new cards

buttonAddCard.addEventListener('click', openAddCardPopup);

buttonCloseAddCardPopup.addEventListener('click', closeAddCardPopup);

popupAddCard.addEventListener('mousedown', function(event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closeAddCardPopup();
})

formAddCard.addEventListener('submit', function (event) {
  event.preventDefault();
  addCard({name: formImageInput.value, link: formLinkInput.value}, cardsContainer);
  closeAddCardPopup();
});

// Full screen logic

buttonCloseFullScreenPopup.addEventListener('click', closeFullScreen);
