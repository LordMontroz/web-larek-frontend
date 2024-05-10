import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { CatalogModel } from './components/CatalogModel';
import { WebLarekApi } from './components/WebLarekApi';
import { BasketModel } from './components/BasketModel';
import { Card } from './components/Card';
import { Page } from './components/Page';
import { cloneTemplate, ensureElement } from './utils/utils';
import { EventEmitter } from './components/base/events';
import { ContentModal } from './components/ContentModal';
import { ProductItem } from './types';
import { Basket } from './components/Basket';

// Шаблоны и константы
const catalogCardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const previewCardTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');

const modal = ensureElement<HTMLDivElement>('#modal-container');
const basketContent = cloneTemplate(basketTemplate);
const orderContent = cloneTemplate(orderTemplate);

// Экземпляры классов
const webLarekApi = new WebLarekApi(CDN_URL, API_URL);
const catalogModel = new CatalogModel();
const basketModel = new BasketModel();
const page = new Page({
	onClick: () => {
		eventEmitter.emit('Basket:open');
	},
});
const eventEmitter = new EventEmitter();

const contentModal = new ContentModal(modal, {
	onClick: () => eventEmitter.emit('Modal:close'),
});

// Действие открытия модального окна с формой доставки.
eventEmitter.on('DeliveryForm:open', () => {
	console.log('что-то');
	contentModal.clearModalContent();
	contentModal.setContent(orderContent);
});

// Действие удаления карточки в корзине по клику.
eventEmitter.on('Card:delete', () => {
	console.log('удалил'); // доделать, клик проходит. Мб сюда как-то айди карточки передавать по которой клик прошел
});

const basket = new Basket(
	basketTemplate,
	basketModel,
	{ onClick: () => eventEmitter.emit('DeliveryForm:open') },
	eventEmitter
);

// Действие при нажатии на корзину
eventEmitter.on('Basket:open', () => {
	const basketList = basketContent.querySelector('.basket__list');
	console.log(basket.cardsBasket);
	console.log(basket.basketList);
	basketList.append(basket.basketList);
	contentModal.setContent(basketContent);
	contentModal.show();
});

//Действие при закрытии модального окна
eventEmitter.on('Modal:close', () => {
	contentModal.close();
	page.unlockPage();
	contentModal.clearModalContent();
});

// Действие при нажатии на кнопку "В корзину"
eventEmitter.on('Basket:addItem', (card: ProductItem) => {
	basketModel.addToBasket(card);
	basket.updateBasket();
	page.updateCounter();
	contentModal.close();
	page.unlockPage();
	contentModal.clearModalContent();
	basket.counterTotalCost(); // не работает, но при этом подсчёт в консоли идёт, но на странице это число не отображается
	basket.total = basketModel.getTotalCost();
});

// Действие при открытии карточки
eventEmitter.on('Card:open', (card: ProductItem) => {
	const previewCard = new Card(previewCardTemplate);
	contentModal.clearModalContent();
	const renderedPreviewCard = previewCard.render(card);
	contentModal.setContent(renderedPreviewCard);
	const buttonAddToBasket = ensureElement<HTMLButtonElement>(
		'.card__button',
		renderedPreviewCard
	);
	contentModal.setButton(buttonAddToBasket, {
		onClick: () => eventEmitter.emit('Basket:addItem', card),
	});
	contentModal.show();
	page.lockPage();
});

// Отображение всех карточек на странице
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