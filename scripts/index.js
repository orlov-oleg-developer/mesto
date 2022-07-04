const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopupButton = popup.querySelector('.popup__close-button');

const profile = document.querySelector('.profile');
let profileTitle = profile.querySelector('.profile__title');
let profileJob = profile.querySelector('.profile__subtitle');

const formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__text-input_type_name');
let jobInput = formElement.querySelector('.popup__text-input_type_description');

const cardsContainer = document.querySelector('.elements__list');

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

addCards(initialCards);

editButton.addEventListener('click', openPopup);

closePopupButton.addEventListener('click', closePopup)

popup.addEventListener('mousedown', function(event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup();
})

formElement.addEventListener('submit', changeProfileInformation);

function addCards(initialCards) {
  const cardsTemplate = document.querySelector('.cards-template').content;

  initialCards.forEach(function (item) {
    const cardsElement = cardsTemplate.querySelector('.elements__element').cloneNode(true);
    cardsElement.querySelector('.elements__element-image').src = item.link;
    cardsElement.querySelector('.elements__element-title').textContent = item.name;

    cardsContainer.prepend(cardsElement);
  });
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
