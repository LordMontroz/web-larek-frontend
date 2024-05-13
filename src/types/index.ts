export enum Category {
	'софт-скил',
	'другое',
	'дополнительное',
	'кнопка',
	'хард-скил',
}

export type ApiListResponse<Type> = {
	total: number;
	items: Type[];
};

export interface ICardItem {
	id: string;
	title: string;
	description?: string;
	image?: string;
	category?: Category;
	price: number | null;
	buttonName?: string;
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
