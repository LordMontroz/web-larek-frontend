import { IBasketModel } from '../types/index';
import { ProductItem } from '../types/index';

export class BasketModel implements IBasketModel {
	basket: ProductItem[] = [];

	addToBasket(item: ProductItem): void {
		this.basket.push(item);
	}

	removeFromBasket(id: string): void {
		this.basket.filter((card) => card.id !== id);
	}

	clearBasket(): void {
		this.basket = [];
	}
}