const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopupButton = popup.querySelector('.popup__close-button');

const profile = document.querySelector('.profile');
let profileTitle = profile.querySelector('.profile__title');
let profileJob = profile.querySelector('.profile__subtitle');

const formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__text-input_type_name');
let jobInput = formElement.querySelector('.popup__text-input_type_description');

editButton.addEventListener('click', openPopup);

closePopupButton.addEventListener('click', closePopup)

popup.addEventListener('mousedown', function(event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup();
})

formElement.addEventListener('submit', changeProfileInformation);

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
