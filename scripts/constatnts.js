const selectors = {
  profile: '.profile',
  profileTitle: '.profile__title',
  profileJob: '.profile__subtitle',
  buttonEdit: '.profile__edit-button',

  profilePopup: '.popup_purpose_profile',
  buttonCloseProfilePopup: '.popup__close-button',

  form: '.popup__form',
  profileFormNameInput: '#name-input',
  profileFormJobInput: '#description-input',

  buttonAddCard: '.profile__add-button',
  popupAddCard: '.popup_purpose_add-cards',
  buttonCloseAddCardPopup: '.popup__close-button',

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

  ESC_CODE: 'Escape',
  opendePopup: '.popup_opened',

  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
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
