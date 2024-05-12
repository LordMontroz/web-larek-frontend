import { IBasket, IBasketHandler } from '../types';
import { cloneTemplate, createElement, ensureElement } from '../utils/utils';
import { BasketModel } from './BasketModel';
import { Component } from './base/Components';

export class Basket extends Component<HTMLElement> implements IBasket {
	basket: HTMLElement;
	basketPrice: HTMLElement;
	cardBasketTemplate: HTMLTemplateElement;
	cardsBasket: HTMLElement[] = [];
	basketList: HTMLElement;
	basketButton: HTMLElement;
	basketModel: BasketModel;

	constructor(
		basketTemplate: HTMLTemplateElement,
		basketModel: BasketModel,
		handler: IBasketHandler
	) {
		super(cloneTemplate(basketTemplate));
		this.cardBasketTemplate =
			ensureElement<HTMLTemplateElement>('#card-basket');
		this.basketModel = basketModel;
		this.basket = cloneTemplate(basketTemplate);
		this.basketPrice = ensureElement('.basket__price', this.basket);
		this.basketList = ensureElement('.basket__list', this.basket);
		this.basketButton = ensureElement('.basket__button', this.basket);
		if (this.basket) {
			this.basketButton.addEventListener(
				'click',
				handler.handleOpenDeliveryForm
			);
		}
		this.setDisabled(this.basketButton, true);
		this.basketList.replaceChildren(
			createElement<HTMLParagraphElement>('p', {
				textContent: 'Корзина пуста',
			})
		);

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
		this.setCards();
		this.counterTotalCost();
		this.changeButtonActivity();
	}

	counterTotalCost(): number {
		let totalCost = 0;
		this.basketModel.basketItems.forEach((item) => {
			totalCost += item.price;
		});
		this.setText(this.basketPrice, `${totalCost} синапсов`);
		return totalCost;
	}

	private changeButtonActivity(): void {
		if (this.cardsBasket.length) {
			this.basketList.replaceChildren(...this.cardsBasket);
			this.setDisabled(this.basketButton, false);
		} else {
			this.basketList.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
			this.setDisabled(this.basketButton, true);
	}
}
}
