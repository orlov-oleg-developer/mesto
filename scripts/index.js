const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopupButton = popup.querySelector('.popup__close-button');

const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector('.profile__title');
const profileJob = profile.querySelector('.profile__subtitle');

const formElement = document.querySelector('.popup__form');


editButton.addEventListener('click', function() {
  popup.classList.add('popup_opened');
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

  profileTitle.textContent = formElement.querySelector('#nameInput').value;
  profileJob.textContent = formElement.querySelector('#jobInput').value;

  popup.classList.remove('popup_opened');
});
