import { IBasketModel } from '../types/index';
import { ProductItem } from '../types/index';

export class BasketModel implements IBasketModel {
	basket: ProductItem[] = [];

	addToBasket(item: ProductItem): void {
		if (!this.basket.find((BasketItem) => BasketItem.id === item.id)) {
			this.basket.push(item);
		}
	}

	removeFromBasket(item: ProductItem): void {
		this.basket = this.basket.filter((card) => card.id !== item.id);
	}

	getTotalCost(): number {
		return this.basket.reduce((total, amount) => {
			return total + amount.price;
		}, 0);
	}

	clearBasket(): void {
		this.basket = [];
	}
}