import { BasketModel } from '../components/BasketModel';

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

export interface IContactOrder {
	email: string;
	phone: string;
}

export interface IDeliveryOrder {
	payment: string;
	address: string;
}

export interface IOrder extends IContactOrder, IDeliveryOrder {
	total: number;
	items: string[];
}

export type OrderDetails = {
	payment: string;
	email: string;
	phone: string;
	address: string;
};

export interface IDeliveryFormHandlers {
	handleButtonCard: () => void;
	handleButtonCash: () => void;
	handleToggleButton: () => void;
	handleNext: () => void;
}

export interface IContactFormHandlers {
	handleSuccessOpen: (evt: SubmitEvent) => void;
	handleToggleButtonActivity: () => void;
}

export interface IPageHandler {
	handleBasketOpen: () => void;
}

export interface IModalHandler {
	handleModalClose: () => void;
}

export interface IContentModalHandler {
	handleAddItemToBasket: () => void;
}

export interface IBasketHandler {
	handleOpenDeliveryForm: () => void;
}

export interface ISuccessHandler {
	handleSuccessClose: () => void;
}

export interface ICatalogCardHandler {
	handleCardOpen: () => void;
}

export interface IBasketCardHandler {
	handleCardDelete: () => void;
}

export interface IBasketModelHandler {
	handleUpdateBasket: () => void;
}

export interface IWebLarekApi {
	cdn: string;
	getCardList(): Promise<ProductItem[]>;
	orderPurchase(order: ApiListResponse<string> & OrderDetails): void;
}

export interface IBasketModel {
	order: ApiListResponse<string> & OrderDetails;
	basketItems: ProductItem[];
	addToBasket(item: ProductItem): void;
	removeFromBasket(item: ProductItem): void;
	getBasketItemsLength(): string;
	clearBasket(): void;
	getCardIndex(item: ProductItem): string;
}

export interface ICatalogModel {
	catalog: ProductItem[];
	addToCatalog(items: ProductItem[]): void;
}

export interface ICard {
	handleCardOpen: ICatalogCardHandler;
	container: HTMLElement;
	title: HTMLHeadingElement;
	description?: HTMLParagraphElement;
	image?: HTMLImageElement;
	category: HTMLSpanElement;
	price: HTMLSpanElement;
	button?: HTMLButtonElement;
	buttonAddToBasket?: HTMLButtonElement;
	index?: HTMLElement;
	render(data: ProductItem): HTMLElement;
	updateAddToCardButton(
		isProductInBasket: ProductItem,
		isPreviewCardForCurrentProduct: boolean,
		isProductNotPriceless: boolean
	): void;
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
	show(content: HTMLElement): void;
	close(): void;
	setButton(button: HTMLButtonElement, handler: IContentModalHandler): void;
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
	getInputEmailValue(): string;
	getInputPhoneValue(): string;
	toggleButtonActivity(): void;
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
	clearDeliveryForm(): void;
	getInputAddressValue(): string;
	getButtonTextContent(): string;
}

export interface ISuccess {
	successContent: HTMLElement;
	button: HTMLButtonElement;
	orderSuccessDescription: HTMLParagraphElement;
	setOrderDescription(sum: number): void;
}

export interface IPage {
	counter: HTMLElement;
	catalog: HTMLElement;
	pageWrapper: HTMLElement;
	basketButton: HTMLButtonElement;
	updateCounter(basketLength: string): void;
	setCatalog(items: HTMLElement[]): void;
	lockPage(): void;
	unlockPage(): void;
}
