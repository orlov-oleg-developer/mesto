const selectors = {
  profile: '.profile',
  profileTitle: '.profile__title',
  profileJob: '.profile__subtitle',
  editButton: '.profile__edit-button',

  profilePopup: '.popup_purpose_profile',
  closeProfilePopupButton: '.popup__close-button',

  profileForm: '.popup__form',
  profileNameInput: '.popup__text-input_type_name',
  profileJobInput: '.popup__text-input_type_description',

  addCardButton: '.profile__add-button',
  addCardPopup: '.popup_purpose_add-cards',
  closeCardPopupButton: '.popup__close-button',

  addCardForm: '.popup__form',
  imageInput:'.popup__text-input_type_image-name',
  linkInput: '.popup__text-input_type_link',

  cardsTemplate: '.cards-template',
  cardsContainer: '.elements__list',
  cardsElement: '.elements__element',
  cardImage: '.elements__element-image',
  cardTitle: '.elements__element-title',
  cardHeart: '.elements__element-heart',
  cardTrash: '.elements__trash',

  fullScreenPopup: '.full-screen',
  closeFullScreenPopupButton: '.full-screen__close-button',
  fullScreenImage: '.full-screen__image',
  fullScreenDescription: '.full-screen__description',
}

// Profile variables

const profile = document.querySelector(selectors.profile);
let profileTitle = profile.querySelector(selectors.profileTitle);
let profileJob = profile.querySelector(selectors.profileJob);
const editButton = profile.querySelector(selectors.editButton);

const profilePopup = document.querySelector(selectors.profilePopup);
const closeProfilePopupButton = profilePopup.querySelector(selectors.closeProfilePopupButton);
const profileForm = profilePopup.querySelector(selectors.profileForm);
let profileNameInput = profileForm.querySelector(selectors.profileNameInput);
let profileJobInput = profileForm.querySelector(selectors.profileJobInput);

// Cards variables

const addCardButton = profile.querySelector(selectors.addCardButton);
const addCardPopup = document.querySelector(selectors.addCardPopup);
const closeCardPopupButton = addCardPopup.querySelector(selectors.closeCardPopupButton);

const addCardForm = addCardPopup.querySelector(selectors.addCardForm);
let imageInput = addCardPopup.querySelector(selectors.imageInput);
let linkInput = addCardPopup.querySelector(selectors.linkInput);

const cardsContainer = document.querySelector(selectors.cardsContainer);

// Full screen variables

const fullScreenPopup = document.querySelector(selectors.fullScreenPopup);
const closeFullScreenPopupButton = fullScreenPopup.querySelector(selectors.closeFullScreenPopupButton);
const fullScreenImage = fullScreenPopup.querySelector(selectors.fullScreenImage);
const fullScreenDescription = fullScreenPopup.querySelector(selectors.fullScreenDescription);

// MAIN LOGIC

// Cards creation

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

initialCards.forEach(function (item) {
  addCard({name: item.name,link: item.link}, cardsContainer);
});

// Profile

editButton.addEventListener('click', openProfilePopup);

closeProfilePopupButton.addEventListener('click', closeProfilePopup);

profilePopup.addEventListener('mousedown', function(event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closeProfilePopup();
})

profileForm.addEventListener('submit', changeProfileInformation);

// Add new cards

addCardButton.addEventListener('click', openAddCardPopup);

closeCardPopupButton.addEventListener('click', closeAddCardPopup);

addCardPopup.addEventListener('mousedown', function(event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closeAddCardPopup();
})

addCardForm.addEventListener('submit', function (event) {
  event.preventDefault();
  addCard({name: imageInput.value, link: linkInput.value}, cardsContainer);
  closeAddCardPopup();
});

// Full screen logic

closeFullScreenPopupButton.addEventListener('click', closeFullScreen);

// FUNCTIONS

function createCard(data) {
  const cardTemplate = document.querySelector(selectors.cardsTemplate).content;
  const cardElement = cardTemplate.querySelector(selectors.cardsElement).cloneNode(true);

  cardElement.querySelector(selectors.cardImage).src = data.link;
  cardElement.querySelector(selectors.cardImage).alt = data.name;
  cardElement.querySelector(selectors.cardTitle).textContent = data.name;
  cardElement.querySelector(selectors.cardHeart).addEventListener('click', toggleLike);

  cardElement.querySelector(selectors.cardTrash).addEventListener('click', removeCard);

  cardElement.querySelector(selectors.cardImage).addEventListener('click', openFullScreen);

  return cardElement;
}

function addCard(data, cardsContainer) {
  const card = createCard(data);
  cardsContainer.prepend(card);
}

function openProfilePopup() {
  profilePopup.classList.add('popup_opened');

  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileJob.textContent;
}

function closeProfilePopup() {
  profilePopup.classList.remove('popup_opened');
}

function changeProfileInformation(event) {
  event.preventDefault();

  profileTitle.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;

  closeProfilePopup();
}

function openAddCardPopup() {
  addCardPopup.classList.add('popup_opened');
}

function closeAddCardPopup() {
  addCardPopup.classList.remove('popup_opened');
}

function openFullScreen(event) {
  fullScreenImage.src = event.target.src;
  fullScreenImage.alt = event.target.nextElementSibling.textContent;
  fullScreenDescription.textContent = event.target.nextElementSibling.textContent;
  fullScreenPopup.classList.add('full-screen_opened');
}

function closeFullScreen() {
  fullScreenPopup.classList.remove('full-screen_opened');
}

function toggleLike (event) {
  event.target.classList.toggle('elements__element-heart_active');
}

function removeCard(event) {
  event.target.closest(selectors.cardsElement).remove();
}



