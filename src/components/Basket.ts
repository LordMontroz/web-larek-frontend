import { IActions, IBasket, ProductItem } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { BasketModel } from './BasketModel';
import { Card } from './Card';
import { WebLarekApi } from './WebLarekApi';
import { Component } from './base/components';
import { EventEmitter } from './base/events';

export class Basket extends Component<HTMLElement> implements IBasket {
	basket: HTMLElement;
	basketPrice: HTMLElement;
	cardBasketTemplate: HTMLTemplateElement;
	cardsBasket: HTMLElement[] = [];
	basketList: HTMLElement;
	basketModel: BasketModel;
	basketButton: HTMLElement;
	eventEmitter: EventEmitter;
	webLarekApi: WebLarekApi;

	constructor(
		basketTemplate: HTMLTemplateElement,
		basketModel: BasketModel,
		webLarekApi: WebLarekApi,
		actions: IActions,
		eventEmitter: EventEmitter
	) {
		super(cloneTemplate(basketTemplate));
		this.cardBasketTemplate =
			ensureElement<HTMLTemplateElement>('#card-basket');
		this.eventEmitter = eventEmitter;
		this.basketModel = basketModel;
		this.webLarekApi = webLarekApi;
		this.basket = cloneTemplate(basketTemplate);
		this.basketPrice = ensureElement('.basket__price', this.basket);
		this.basketList = ensureElement('.basket__list', this.basket);
		this.basketButton = ensureElement('.basket__button', this.basket);
		if (this.basket) {
			this.basketButton.addEventListener('click', actions.onClick);
		}
	}

	setCards(): void {
		if (this.basketList.lastChild) {
			this.basketList.textContent = '';
		}
		this.cardsBasket.forEach((item) => {
			this.basketList.append(item);
		});
	}

	updateBasket(): void {
		this.cardsBasket = [];
		this.cardsBasket = this.basketModel.basketItems.map((item: ProductItem) => {
			const basketCard = new Card(this.cardBasketTemplate, undefined, {
				onClick: () => this.eventEmitter.emit('Card:delete', item),
			});
			basketCard.basketModel = this.basketModel;
			return basketCard.render(item);
		});
		this.setCards();
		this.counterTotalCost();
	}

	counterTotalCost(): number {
		let totalCost = 0;
		this.basketModel.basketItems.forEach((item) => {
			totalCost += item.price;
		});
		this.basketPrice.textContent = `${totalCost} синапсов`;
		return totalCost;
	}

	changeButtonActivity(): void {
		if (this.cardsBasket.length === 0) {
			this.basketButton.setAttribute('disabled', 'true');
		} else {
			this.basketButton.removeAttribute('disabled');
		}
	}
}
