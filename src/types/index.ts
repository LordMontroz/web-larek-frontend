export type productItem = {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
};

export interface IWebLarekApi {
	getCardList(): productItem[];
	getCardById(id: string): productItem;
}

export interface IBasketModel {
	basket: productItem[];
	addToBasket(item: productItem): void;
	removeFromBasket(item: productItem): void;
	clearBasket(): void;
}

export interface ICatalogModel {
	catalog: productItem[];
	addToCatalog(items: productItem[]): void;
}

export interface ICard {
	template: HTMLElement;
	title: string;
	description?: string;
	image?: string;
	category: string;
	price: number;
	button?: string;
	index?: number;
	setTitle(value: string): void;
	setImage(value: string): void;
	setPrice(value: number): void;
	setDescription(value: string): void;
	setCategory(value: string): void;
	setButton(value: string): void;
	setIndex(value: number): void;
}

export interface IModal {
	closeButton: HTMLElement;
	show(): void;
	close(): void;
}

export interface IContentModal {
	template: HTMLElement;
}

export interface IBasket {
	cardInstance: Card;
	template: HTMLElement;
	totalCost: string;
	counterTotalCost(): string;
}

export interface IForm {
	validate(): void;
	sumbit(): void;
}

export interface IContactForm {
	template: HTMLElement;
	setPhone(value: string): void;
	setEmail(value: string): void;
}

export interface IDeliveryForm {
	template: HTMLElement;
	buttonCard: HTMLButtonElement;
	buttonCash: HTMLButtonElement;
	toggleButton(): void;
	setAddress(value: string): void;
}

export interface ISuccess {
	template: HTMLElement;
	totalCost: string;
	buttonNext: HTMLButtonElement;
	close(): void;
	counterTotalCost(): string;
}

export interface IPage {
	counter: HTMLElement;
	catalog: HTMLElement;
	updateCounter(value: number): void;
	setCatalog(items: productItem[]): void;
}
