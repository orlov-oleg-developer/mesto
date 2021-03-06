// VARIABLES

// Profile variables

const profile = document.querySelector(selectors.profile);
const profileTitle = profile.querySelector(selectors.profileTitle);
const profileJob = profile.querySelector(selectors.profileJob);
const buttonEdit = profile.querySelector(selectors.buttonEdit);

const profilePopup = document.querySelector(selectors.profilePopup);
const buttonCloseProfilePopup = profilePopup.querySelector(selectors.buttonCloseProfilePopup);
const profileForm = profilePopup.querySelector(selectors.form);
const profileFormNameInput = profileForm.querySelector(selectors.profileFormNameInput);
const profileFormJobInput = profileForm.querySelector(selectors.profileFormJobInput);

// Cards variables

const buttonAddCard = profile.querySelector(selectors.buttonAddCard);
const popupAddCard = document.querySelector(selectors.popupAddCard);
const buttonCloseAddCardPopup = popupAddCard.querySelector(selectors.buttonCloseAddCardPopup);
const buttonPopupAddCard = popupAddCard.querySelector(selectors.submitButtonSelector);

const formAddCard = popupAddCard.querySelector(selectors.form);
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
  document.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

function openProfilePopup() {
  openPopup(profilePopup);
  profileFormNameInput.value = profileTitle.textContent;
  profileFormJobInput.value = profileJob.textContent;
}

function changeProfileInformation(event) {
  event.preventDefault();

  profileTitle.textContent = profileFormNameInput.value;
  profileJob.textContent = profileFormJobInput.value;

  closePopup(profilePopup);
}

function openFullScreen(event) {
  fullScreenImage.src = event.target.src;
  fullScreenImage.alt = event.target.alt;
  fullScreenDescription.textContent = event.target.alt;
  openPopup(fullScreenPopup);
}

function toggleLike (event) {
  event.target.classList.toggle('elements__element-heart_active');
}

function removeCard(event) {
  event.target.closest(selectors.cardsElement).remove();
}

function closeByEsc(evt) {
  if (evt.key === selectors.ESC_CODE) {
    const openedPopup = document.querySelector(selectors.opendePopup);
    closePopup(openedPopup);
  }
}

/* ???????? ?????????????? - ?????????????? ?????????? ?????? ?????????? ?????? ??????????.
???????????????????????? ?????????????? mousedown, ?? ???? click, ?????? ?????? ?????????? ???????????? ???????????????? ???? ???????????????????? ????????????????:
???????????????????????? ?????????? ???????????????? ???????????? ?????????????????? ???????? ?? ???????????????? ???????? ?????? ?????????? - ?????????? ??????????????????. */
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

buttonCloseProfilePopup.addEventListener('click', () => {closePopup (profilePopup)});

closePopupByOverlayClick(profilePopup, () => {closePopup (profilePopup)});

profileForm.addEventListener('submit', changeProfileInformation);

// Add new cards

buttonAddCard.addEventListener('click', () => {openPopup (popupAddCard)});

buttonCloseAddCardPopup.addEventListener('click', () => {closePopup (popupAddCard)});

closePopupByOverlayClick(popupAddCard, () => {closePopup (popupAddCard)});


formAddCard.addEventListener('submit', function (event) {
  event.preventDefault();
  addCard({name: formImageInput.value, link: formLinkInput.value}, cardsContainer);

  formImageInput.value = '';
  formLinkInput.value = '';

  toggleButtonState([formImageInput, formLinkInput], buttonPopupAddCard, selectors);

  closePopup(popupAddCard);
});

// Full screen logic

buttonCloseFullScreenPopup.addEventListener('click', () => {closePopup (fullScreenPopup)});

closePopupByOverlayClick(fullScreenPopup, () => {closePopup (fullScreenPopup)});

