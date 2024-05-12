import { BasketModel } from '../components/base/BasketModel';

export type ProductItem = {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
};

export enum Category {
	'софт-скил',
	'другое',
	'дополнительное',
	'кнопка',
	'хард-скил',
}

export interface ICardItem {
	id: string;
	title: string;
	description?: string;
	image?: string;
	category?: Category;
	price: number | null;
	buttonName?: string;
}

export interface ICardList {
	total: number;
	items: ICardItem[];
}

export interface IOrderContacts {
	email: string;
	phone: string;
}

export interface IOrderPayments {
	payment: string;
	address: string;
}

export interface IOrder extends IOrderContacts, IOrderPayments {
	total: number;
	items: string[];
}

export interface IOrderResult {
	id: string;
	total: number;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface IAppState {
	basket: ICardItem[];
	catalog: ICardItem[];
	preview: string | null;
	order: IOrder | null;
}
