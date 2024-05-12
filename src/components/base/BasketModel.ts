import {
	ApiListResponse,
	IBasketModel,
	IBasketModelHandler,
	OrderDetails,
} from '../../types/index';
import { ProductItem } from '../../types/index';

export class BasketModel implements IBasketModel {
	basketItems: ProductItem[] = [];
	handler: IBasketModelHandler;

	order: ApiListResponse<string> & OrderDetails = {
		payment: '',
		email: '',
		phone: '',
		address: '',
		total: 0,
		items: [],
	};

	constructor(handler: IBasketModelHandler) {
		this.handler = handler;
	}

	addToBasket(item: ProductItem): void {
		if (!this.basketItems.find((BasketItem) => BasketItem.id === item.id)) {
			this.basketItems.push(item);
		}
		this.addCardIdToOrder(item);
		this.updateBasketCards();
	}

	removeFromBasket(item: ProductItem): void {
		this.basketItems = this.basketItems.filter((card) => card.id !== item.id);
		this.removeCardIdFromOrder(item);
		this.updateBasketCards();
	}

	getBasketItemsLength(): string {
		return this.basketItems.length.toString();
	}

	getCardIndex(item: ProductItem): string {
		return (this.basketItems.indexOf(item) + 1).toString();
	}

	private addCardIdToOrder(item: ProductItem): void {
		this.order.items.push(item.id);
	}

	private removeCardIdFromOrder(item: ProductItem): void {
		this.order.items = this.order.items.filter((id) => id !== item.id);
	}

	private updateBasketCards(): void {
		this.handler.handleUpdateBasket();
	}

	clearBasket(): void {
		this.basketItems = [];
		this.clearOrder();
	}

	private clearOrder(): void {
		this.order = {
			payment: '',
			email: '',
			phone: '',
			address: '',
			total: 0,
			items: [],
		};
	}
}
