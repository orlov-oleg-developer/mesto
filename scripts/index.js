// VARIABLES

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
  openPopup(profilePopup);
  profileFormNameInput.value = profileTitle.textContent;
  profileFormJobInput.value = profileJob.textContent;

  document.addEventListener('keydown', closeProfilePopupByTouchEscape)
}

function closeProfilePopup() {
  closePopup(profilePopup);
  document.removeEventListener('keydown', closeProfilePopupByTouchEscape);
}

function closeProfilePopupByTouchEscape (event) {
  if(event.key === 'Escape') closeProfilePopup();
}

function changeProfileInformation(event) {
  event.preventDefault();

  profileTitle.textContent = profileFormNameInput.value;
  profileJob.textContent = profileFormJobInput.value;

  closeProfilePopup();
}

function openAddCardPopup() {
  openPopup(popupAddCard);

  document.addEventListener('keydown', closeAddCardPopupByTouchEscape)
}

function closeAddCardPopup() {
  closePopup(popupAddCard);

  document.removeEventListener('keydown', closeAddCardPopupByTouchEscape)
}

function closeAddCardPopupByTouchEscape (event) {
  if(event.key === 'Escape') closeAddCardPopup();
}

function openFullScreen(event) {
  fullScreenImage.src = event.target.src;
  fullScreenImage.alt = event.target.alt;
  fullScreenDescription.textContent = event.target.alt;
  openPopup(fullScreenPopup);

  document.addEventListener('keydown', closeFullScreenPopupByTouchEscape)
}

function closeFullScreen() {
  closePopup(fullScreenPopup);

  document.removeEventListener('keydown', closeFullScreenPopupByTouchEscape)
}

function closeFullScreenPopupByTouchEscape (event) {
  if(event.key === 'Escape') closeFullScreen();
}

function toggleLike (event) {
  event.target.classList.toggle('elements__element-heart_active');
}

function removeCard(event) {
  event.target.closest(selectors.cardsElement).remove();
}

/* Цель функции - закрыть попап при клике вне формы.
Используется событие mousedown, а не click, так как такой подход защищает от следующего сценария:
пользователь начал выделять мышкой текстовое поле и отпустил мышь вне формы - форма закрылась. */
function closePopupByOverlayClick (popup, closeFunction) {
  popup.addEventListener('mousedown', function(event) {
    if (event.target !== event.currentTarget) {
      return;
    }
    closeFunction();
  })
}

// MAIN LOGIC

// Cards creation

initialCards.forEach(function (item) {
  addCard({name: item.name,link: item.link}, cardsContainer);
});

// Profile

buttonEdit.addEventListener('click', openProfilePopup);

buttonCloseProfilePopup.addEventListener('click', closeProfilePopup);

closePopupByOverlayClick(profilePopup, closeProfilePopup);

profileForm.addEventListener('submit', changeProfileInformation);

// Add new cards

buttonAddCard.addEventListener('click', openAddCardPopup);

buttonCloseAddCardPopup.addEventListener('click', closeAddCardPopup);

closePopupByOverlayClick(popupAddCard, closeAddCardPopup);


formAddCard.addEventListener('submit', function (event) {
  event.preventDefault();
  addCard({name: formImageInput.value, link: formLinkInput.value}, cardsContainer);
  closeAddCardPopup();
});

// Full screen logic

buttonCloseFullScreenPopup.addEventListener('click', closeFullScreen);

closePopupByOverlayClick(fullScreenPopup, closeFullScreen);

