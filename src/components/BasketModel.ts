import { IBasketModel } from '../types/index';
import { ProductItem } from '../types/index';
import { Basket } from './Basket';
import { ContentModal } from './ContentModal';
import { Page } from './Page';

export class BasketModel implements IBasketModel {
	basketItems: ProductItem[] = [];
	basket: Basket;
	page: Page;
	contentModal: ContentModal;

	constructor(page: Page, contentModal: ContentModal) {
		this.page = page;
		this.contentModal = contentModal;
	}

	addToBasket(item: ProductItem): void {
		if (!this.basketItems.find((BasketItem) => BasketItem.id === item.id)) {
			this.basketItems.push(item);
		}
		this.basket.updateBasket();
		this.page.updateCounter();
		this.contentModal.close();
	}

	removeFromBasket(item: ProductItem): void {
		this.basketItems = this.basketItems.filter((card) => card.id !== item.id);
		this.basket.updateBasket();
		this.basket.changeButtonActivity();
		this.page.updateCounter();
	}

	getTotalCost(): number {
		return this.basketItems.reduce((total, amount) => {
			return total + amount.price;
		}, 0);
	}

	clearBasket(): void {
		this.basketItems = [];
		this.basket.updateBasket();
		this.page.updateCounter();
	}
}
