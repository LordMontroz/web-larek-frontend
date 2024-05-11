import { Basket } from '../components/Basket';
import { BasketModel } from '../components/BasketModel';
import { ContactForm } from '../components/ContactForm';
import { ContentModal } from '../components/ContentModal';
import { DeliveryForm } from '../components/DeliveryForm';
import { Page } from '../components/Page';
import { Success } from '../components/Success';

export type ProductItem = {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
};

export type ApiListResponse<Type> = {
	total: number;
	items: Type[];
};

export type OrderDetails = {
	payment: string;
	email: string;
	phone: string;
	address: string;
};

export interface IActions {
	onClick(evt: MouseEvent): void;
}

export interface IActionInput {
	onInput(evt: Event): void;
}

export interface IWebLarekApi {
	cdn: string;
	order: ApiListResponse<string> & OrderDetails;
	contactForm: ContactForm;
	deliveryForm: DeliveryForm;
	basket: Basket;
	basketModel: BasketModel;
	success: Success;
	getCardList(): Promise<ProductItem[]>;
	orderPurchase(): void;
}

export interface IBasketModel {
	basketItems: ProductItem[];
	basket: Basket;
	page: Page;
	contentModal: ContentModal;
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
	index?: HTMLElement;
	render(data: ProductItem): HTMLElement;
}

export interface IModal {
	container: HTMLElement;
	closeButton: HTMLElement;
	show(content: HTMLElement): void;
	close(): void;
}

export interface IContentModal {
	content: HTMLElement;
	modalContent: HTMLElement;
	button: HTMLButtonElement;
	page: Page;
	show(content: HTMLElement): void;
	close(): void;
	setButton(button: HTMLButtonElement, actions: IActions): void;
}

export interface IBasket {
	basket: HTMLElement;
	basketPrice: HTMLElement;
	cardBasketTemplate: HTMLTemplateElement;
	cardsBasket: HTMLElement[];
	basketList: HTMLElement;
	basketModel: BasketModel;
	counterTotalCost(): number;
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
	error: HTMLElement;
	toggleButtonActivity(): void;
	addToOrder(): void;
	addPhoneMask(): void;
}

export interface IDeliveryForm {
	deliveryFormContent: HTMLElement;
	inputAddress: HTMLInputElement;
	buttonCard: HTMLButtonElement;
	buttonCash: HTMLButtonElement;
	buttonNext: HTMLButtonElement;
	error: HTMLElement;
	toggleButtonActivity(): void;
	toggleButtonCardActivity(): void;
	toggleButtonCashActivity(): void;
	addToOrder(): void;
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
	setCatalog(items: HTMLElement[]): void;
	lockPage(): void;
	unlockPage(): void;
}
