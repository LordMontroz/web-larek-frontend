export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const categoryMap = new Map([
	['софт-скил', 'card__category_soft'],
	['дополнительное', 'card__category_additional'],
	['кнопка', 'card__category_button'],
	['хард-скил', 'card__category_hard'],
	['другое', 'card__category_other'],
]);

export const REGULAR_EMAIL = /\w+@\w+\.\w+/i;
export const REGULAR_PHONE = /\+7\s\(\d{3}\)\s\d{3}\-\d{2}\-\d{2}/i;

export const settings = {};
