import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { CatalogModel } from './components/CatalogModel';
import { WebLarekApi } from './components/WebLarekApi';
import { BasketModel } from './components/BasketModel';
import { Card } from './components/Card';
import { Page } from './components/Page';
import { ensureElement } from './utils/utils';
import { EventEmitter } from './components/base/events';
import { ContentModal } from './components/ContentModal';
import { ProductItem } from './types';
import { Basket } from './components/Basket';
import { DeliveryForm } from './components/DeliveryForm';
import { ContactForm } from './components/ContactForm';
import { Success } from './components/Success';

// Шаблоны и константы.
const catalogCardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const previewCardTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const modal = ensureElement<HTMLDivElement>('#modal-container');

// Экземпляры классов.
const webLarekApi = new WebLarekApi(CDN_URL, API_URL);
const catalogModel = new CatalogModel();
const page = new Page({
	onClick: () => {
		eventEmitter.emit('Basket:open');
	},
});
const eventEmitter = new EventEmitter();
const contentModal = new ContentModal(modal, page, {
	onClick: () => eventEmitter.emit('Modal:close'),
});
const deliveryForm = new DeliveryForm(
	orderTemplate,
	{ onClick: () => eventEmitter.emit('Button-card:active') },
	{ onClick: () => eventEmitter.emit('Button-cash:active') },
	{ onInput: () => eventEmitter.emit('Input:change') },
	{ onClick: () => eventEmitter.emit('ContactForm:open') }
);
const contactForm = new ContactForm(
	contactsTemplate,
	{
		onClick: () => eventEmitter.emit('Success:open'),
	},
	{
		onInput: () => eventEmitter.emit('Input:triggered'),
	}
);
const success = new Success(successTemplate, {
	onClick: () => eventEmitter.emit('Success:close'),
});
const basketModel = new BasketModel(page, contentModal);
page.basketModel = basketModel;

const basket = new Basket(
	basketTemplate,
	basketModel,
	{ onClick: () => eventEmitter.emit('DeliveryForm:open') },
	eventEmitter
);

basketModel.basket = basket;

// Отображение всех карточек на странице.
webLarekApi.getCardList().then((cards) => {
	catalogModel.addToCatalog(cards);

	const renderedCards = catalogModel.catalog.map((card) => {
		const catalogCard = new Card(catalogCardTemplate, {
			onClick: () => eventEmitter.emit('Card:open', card),
		});
		return catalogCard.render(card);
	});
	page.setCatalog(renderedCards);
});

// Действие при открытии карточки.
eventEmitter.on('Card:open', (card: ProductItem) => {
	const previewCard = new Card(previewCardTemplate);
	const renderedPreviewCard = previewCard.render(card);

	const buttonAddToBasket = ensureElement<HTMLButtonElement>(
		'.card__button',
		renderedPreviewCard
	);
	contentModal.setButton(buttonAddToBasket, {
		onClick: () => eventEmitter.emit('Basket:addItem', card),
	});

	contentModal.show(renderedPreviewCard);
});

//Действие при закрытии модального окна.
eventEmitter.on('Modal:close', () => {
	contentModal.close();
});

// Действие при нажатии на кнопку "В корзину".
eventEmitter.on('Basket:addItem', (card: ProductItem) => {
	basketModel.addToBasket(card);
});

// Действие при нажатии на корзину.
eventEmitter.on('Basket:open', () => {
	basket.changeButtonActivity();
	contentModal.show(basket.basket);
});

// Действие удаления карточки в корзине по клику.
eventEmitter.on('Card:delete', (item: ProductItem) => {
	basketModel.removeFromBasket(item);
});

// Действие открытия модального окна с формой доставки.
eventEmitter.on('DeliveryForm:open', () => {
	deliveryForm.buttonCard.classList.toggle('button_alt-active');
	contentModal.show(deliveryForm.deliveryFormContent);
});

// Действие добавления 'класса активности' кнопке buttonCard.
eventEmitter.on('Button-card:active', () => {
	deliveryForm.toggleButtonCardActivity();
	deliveryForm.toggleButtonActivity();
});

// Действие добавления 'класса активности' кнопке buttonCash.
eventEmitter.on('Button-cash:active', () => {
	deliveryForm.toggleButtonCashActivity();
	deliveryForm.toggleButtonActivity();
});

// Действие при изменении поля ввода доставки.
eventEmitter.on('Input:change', () => {
	deliveryForm.toggleButtonActivity();
});

// Действие открытия модального окна с формой контактов.
eventEmitter.on('ContactForm:open', () => {
	contentModal.show(contactForm.contactFormContent);
});

// Действие при изменении полей ввода почты и телефона.
eventEmitter.on('Input:triggered', () => {
	contactForm.toggleButtonActivity();
});

// Действие открытия модального окна с успешной покупкой.
eventEmitter.on('Success:open', () => {
	success.setOrderDescription(basket.basketPrice);
	contentModal.show(success.successContent);
});

// Действие закрытия модального окна с успешной покупкой.
eventEmitter.on('Success:close', () => {
	contentModal.close();
	basketModel.clearBasket();
});
