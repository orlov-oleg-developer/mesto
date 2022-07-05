const profile = document.querySelector('.profile');
let profileTitle = profile.querySelector('.profile__title');
let profileJob = profile.querySelector('.profile__subtitle');

const popup = document.querySelector('.popup');
const closePopupButton = popup.querySelector('.popup__close-button');
const editButton = profile.querySelector('.profile__edit-button');

const formElement = popup.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__text-input_type_name');
let jobInput = formElement.querySelector('.popup__text-input_type_description');

const cardsContainer = document.querySelector('.elements__list');

const addCardButton = profile.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_purpose_add-cards');
const closeCardPopupButton = addCardPopup.querySelector('.popup__close-button');

const addCardForm = addCardPopup.querySelector('.popup__form');
let imageInput = addCardPopup.querySelector('.popup__text-input_type_image-name');
let linkInput = addCardPopup.querySelector('.popup__text-input_type_link');

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
  addCard(item.name, item.link);
});

editButton.addEventListener('click', openPopup);

closePopupButton.addEventListener('click', closePopup);

popup.addEventListener('mousedown', function(event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup();
})

formElement.addEventListener('submit', changeProfileInformation);

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
  addCard(imageInput.value, linkInput.value)
  closeAddCardPopup();
});

function addCard(name, link) {
  const cardsTemplate = document.querySelector('.cards-template').content;
  const cardsElement = cardsTemplate.querySelector('.elements__element').cloneNode(true);

  cardsElement.querySelector('.elements__element-image').src = link;
  cardsElement.querySelector('.elements__element-title').textContent = name;
  cardsElement.querySelector('.elements__element-heart').addEventListener('click', function (event) {
      event.target.classList.toggle('elements__element-heart_active'); });

  cardsContainer.prepend(cardsElement);
}

function openPopup() {
  popup.classList.add('popup_opened');

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function changeProfileInformation(event) {
  event.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup();
}

function openAddCardPopup() {
  addCardPopup.classList.add('popup_opened');
}

function closeAddCardPopup() {
  addCardPopup.classList.remove('popup_opened');
}


