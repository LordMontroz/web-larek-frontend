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
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');

// Экземпляры классов.
const webLarekApi = new WebLarekApi(CDN_URL, API_URL);
const catalogModel = new CatalogModel();
const page = new Page({
	handleBasketOpen: () => {
		eventEmitter.emit('Basket:open');
	},
});
const eventEmitter = new EventEmitter();
const contentModal = new ContentModal(modal, {
	handleModalClose: () => eventEmitter.emit('Modal:close'),
});
const deliveryForm = new DeliveryForm(orderTemplate, {
	handleButtonCard: () => eventEmitter.emit('Button-card:active'),
	handleButtonCash: () => eventEmitter.emit('Button-cash:active'),
	handleToggleButton: () => eventEmitter.emit('Input:change'),
	handleNext: () => eventEmitter.emit('ContactForm:open'),
});
const contactForm = new ContactForm(contactsTemplate, {
	handleSuccessOpen: () => eventEmitter.emit('Success:open'),
	handleToggleButtonActivity: () => eventEmitter.emit('Input:triggered'),
});
const success = new Success(successTemplate, {
	handleSuccessClose: () => eventEmitter.emit('Success:close'),
});
const basketModel: BasketModel = new BasketModel({
	handleUpdateBasket: () =>
		eventEmitter.emit('Basket:update', basketModel.basketItems),
});

const basket = new Basket(
	basketTemplate,
	basketModel,
	{ handleOpenDeliveryForm: () => eventEmitter.emit('DeliveryForm:open') },
	eventEmitter
);

// Отображение всех карточек на странице.
webLarekApi
	.getCardList()
	.then((cards) => {
		catalogModel.addToCatalog(cards);

		const renderedCards = catalogModel.catalog.map((card) => {
			const catalogCard = new Card(catalogCardTemplate, {
				handleCardOpen: () => eventEmitter.emit('Card:open', card),
			});

			return catalogCard.render(card);
		});

		page.setCatalog(renderedCards);
	})
	.catch((error) => {
		console.log(`Произошла ошибка: ${error}`);
	});

// Действие при открытии карточки.
eventEmitter.on('Card:open', (card: ProductItem) => {
	const previewCard = new Card(previewCardTemplate);
	const renderedPreviewCard = previewCard.render(card);
	contentModal.setButton(previewCard.buttonAddToBasket, {
		handleAddItemToBasket: () => eventEmitter.emit('Basket:addItem', card),
	});

	const isProductInBasket = basketModel.basketItems.find(
		(item) => item.id === card.id
	);
	const isPreviewCardForCurrentProduct =
		previewCard.title.textContent === card.title;
	const isProductNotPriceless = previewCard.price.textContent !== 'Бесценно';

	previewCard.updateAddToCardButton(
		isProductInBasket,
		isPreviewCardForCurrentProduct,
		isProductNotPriceless
	);
	contentModal.show(renderedPreviewCard);
	page.lockPage();
});

//Действие при закрытии модального окна.
eventEmitter.on('Modal:close', () => {
	contentModal.close();
	page.unlockPage();
});

/// Действие обновления карточек корзины
eventEmitter.on('Basket:update', (basketItems: ProductItem[]) => {
	basket.cardsBasket = basketItems.map((item: ProductItem) => {
		const basketCard = new Card(cardBasketTemplate, undefined, {
			handleCardDelete: () => eventEmitter.emit('Card:delete', item),
		});
		return basketCard.render(item, basketModel.getCardIndex(item));
	});
});

// Действие при нажатии на кнопку "В корзину".
eventEmitter.on('Basket:addItem', (card: ProductItem) => {
	basketModel.addToBasket(card);
	basket.updateBasket();
	page.updateCounter(basketModel.getBasketItemsLength());
	contentModal.close();
	page.unlockPage();
});

// Действие при нажатии на корзину.
eventEmitter.on('Basket:open', () => {
	contentModal.show(basket.basket);
	page.lockPage();
});

// Действие удаления карточки в корзине по клику.
eventEmitter.on('Card:delete', (item: ProductItem) => {
	basketModel.removeFromBasket(item);
	basket.updateBasket();
	page.updateCounter(basketModel.getBasketItemsLength());
});

// Действие открытия модального окна с формой доставки.
eventEmitter.on('DeliveryForm:open', () => {
	basketModel.order.total = basket.counterTotalCost();
	contentModal.show(deliveryForm.deliveryFormContent);
	page.lockPage();
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
	basketModel.order.payment = deliveryForm.getButtonTextContent();
	basketModel.order.address = deliveryForm.getInputAddressValue();
	contentModal.show(contactForm.contactFormContent);
	page.lockPage();
});

// Действие при изменении полей ввода почты и телефона.
eventEmitter.on('Input:triggered', () => {
	contactForm.addPhoneMask();
	contactForm.toggleButtonActivity();
});

// Действие открытия модального окна с успешной покупкой.
eventEmitter.on('Success:open', () => {
	basketModel.order.email = contactForm.getInputEmailValue();
	basketModel.order.phone = contactForm.getInputPhoneValue();
	webLarekApi.orderPurchase(basketModel.order);
	success.setOrderDescription(basket.basketPrice);
	basketModel.clearBasket();
	basket.updateBasket();
	page.updateCounter(basketModel.getBasketItemsLength());
	contactForm.ClearContactForms();
	deliveryForm.clearDeliveryForm();
	contentModal.show(success.successContent);
	page.lockPage();
});

// Действие закрытия модального окна с успешной покупкой.
eventEmitter.on('Success:close', () => {
	contentModal.close();
	page.unlockPage();
});
