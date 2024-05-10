import { IActions, IBasket } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { BasketModel } from './BasketModel';
import { Card } from './Card';
import { Component } from './base/components';
import { EventEmitter } from './base/events';

export class Basket extends Component<HTMLElement> {
	basket: HTMLElement;
	basketPrice: HTMLElement;
	cardBasketTemplate: HTMLTemplateElement;
	cardsBasket: HTMLElement[] = [];
	basketList: HTMLElement;
	basketModel: BasketModel;
	basketButton: HTMLElement;
	eventEmitter: EventEmitter;

	constructor(
		basketTemplate: HTMLTemplateElement,
		basketModel: BasketModel,
		actions: IActions,
		eventEmitter: EventEmitter
	) {
		super(cloneTemplate(basketTemplate));
		this.cardBasketTemplate =
			ensureElement<HTMLTemplateElement>('#card-basket');
		this.eventEmitter = eventEmitter;
		this.basketModel = basketModel;
		this.basket = cloneTemplate(basketTemplate);
		this.basketPrice = ensureElement('.basket__price', this.basket);
		this.basketList = ensureElement('.basket__list', this.basket);
		this.basketButton = ensureElement('.basket__button', this.basket);
		console.log(this.basketButton);
		if (this.basket) {
			this.basketButton.addEventListener(
				'click',
				this.handleButtonClick.bind(this)
			);
		}
		console.log(this.basketButton.onclick);
	}

	handleButtonClick() {
		console.log('click');
	}

	setCards(): void {
		if (this.basketList.lastChild) {
			this.basketList.removeChild(this.basketList.lastChild);
		}
		console.log(`список карточек ${this.cardsBasket}`)
		this.cardsBasket.forEach((item) => {
			this.basketList.append(item);
		});
	}

	updateBasket(): void {
		this.cardsBasket = [];
		this.cardsBasket = this.basketModel.basket.map((item) => {
			const basketCard = new Card(this.cardBasketTemplate, undefined, {
				onClick: () => this.eventEmitter.emit('Card:delete'),
			});
			return basketCard.render(item);
		});
		this.setCards();
	}

	counterTotalCost(): void {
		let totalCost = 0;
		this.basketModel.basket.forEach((item) => {
			totalCost += item.price;
		});
		this.basketPrice.textContent = `${totalCost} синапсов`;
		console.log(this.basketPrice);
	}

	set total(total: number) {
		this.setText(this.basketPrice, total + ' синапсов');
	}
}