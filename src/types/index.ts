import { BasketModel } from '../components/BasketModel';
import { ApiListResponse } from '../components/base/api';

export type ProductItem = {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
};

export interface IActions {
	onClick(evt: MouseEvent): void;
}

export interface IActionInput {
	onInput(evt: Event): void;
}

export interface IWebLarekApi {
	getCardList(): Promise<ProductItem[]>;
	orderPurchase(order: ApiListResponse<string>): void;
}

export interface IBasketModel {
	basket: ProductItem[];
	addToBasket(item: ProductItem): void;
	removeFromBasket(item: ProductItem): void;
	clearBasket(): void;
}

export interface ICatalogModel {
	catalog: ProductItem[];
	addToCatalog(items: ProductItem[]): void;
}

export interface ICard {
	actions: IActions;
	container: HTMLElement;
	title: HTMLHeadingElement;
	description?: HTMLParagraphElement;
	image?: HTMLImageElement;
	category: HTMLSpanElement;
	price: HTMLSpanElement;
	button?: HTMLButtonElement;
	render(data: ProductItem): HTMLElement;
}

export interface IModal {
	container: HTMLElement;
	closeButton: HTMLElement;
	show(): void;
	close(): void;
}

export interface IContentModal {
	content: HTMLElement;
	modalContent: HTMLElement;
	button: HTMLButtonElement;
	setContent(content: HTMLElement): void;
	setButton(button: HTMLButtonElement, actions: IActions): void;
	clearModalContent(): void;
}

export interface IBasket {
	basket: HTMLElement;
	basketPrice: HTMLElement;
	cardBasketTemplate: HTMLTemplateElement;
	cardsBasket: HTMLElement[];
	basketList: HTMLElement;
	basketModel: BasketModel;
	counterTotalCost(cardPrice: number): void;
	updateBasket(): void;
	setCards(items: HTMLElement[]): void;
	changeButtonActivity(): void;
}

export interface IForm {
	validate(): void;
	sumbit(): void;
}

export interface IContactForm {
	contactFormContent: HTMLElement;
	inputEmail: HTMLInputElement;
	inputPhone: HTMLInputElement;
	buttonPay: HTMLButtonElement;
	toggleButtonActivity(): void;
}

export interface IDeliveryForm {
	deliveryFormContent: HTMLElement;
	inputAddress: HTMLInputElement;
	buttonCard: HTMLButtonElement;
	buttonCash: HTMLButtonElement;
	buttonNext: HTMLButtonElement;
	toggleButtonActivity(): void;
}

export interface ISuccess {
	successContent: HTMLElement;
	button: HTMLButtonElement;
	orderSuccessDescription: HTMLParagraphElement;
	setOrderDescription(sum: HTMLElement): void;
}

export interface IPage {
	counter: HTMLElement;
	catalog: HTMLElement;
	pageWrapper: HTMLElement;
	basketButton: HTMLButtonElement;
	updateCounter(): void;
	clearCounter(): void;
	setCatalog(items: HTMLElement[]): void;
	lockPage(): void;
	unlockPage(): void;
}
