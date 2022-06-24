const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopupButton = popup.querySelector('.popup__close-button');

const profile = document.querySelector('.profile');
let profileTitle = profile.querySelector('.profile__title');
let profileJob = profile.querySelector('.profile__subtitle');

const formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('#nameInput');
let jobInput = formElement.querySelector('#jobInput');

editButton.addEventListener('click', function() {
  popup.classList.add('popup_opened');

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
})

closePopupButton.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
})

popup.addEventListener('mousedown', function(event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  popup.classList.remove('popup_opened');
})

formElement.addEventListener('submit', function(event) {
  event.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  popup.classList.remove('popup_opened');
});

