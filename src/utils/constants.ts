export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const CATEGORY_COLORS = <Record<string, string>>{
	дополнительное: 'additional',
	'софт-скил': 'soft',
	кнопка: 'button',
	'хард-скил': 'hard',
	другое: 'other',
};

export const REGULAR_EMAIL = /\w+@\w+\.\w+/i;
export const REGULAR_PHONE = /\+7\s\(\d{3}\)\s\d{3}\-\d{2}\-\d{2}/i;

export const settings = {};
