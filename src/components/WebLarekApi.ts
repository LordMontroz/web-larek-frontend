import { Api } from './base/Api';
import { IOrder, IOrderResult, ICardItem, ApiListResponse } from '../types';

interface IWebLarekApi {
	getCardList: () => Promise<ICardItem[]>;
	orderProducts: (order: IOrder) => Promise<IOrderResult>;
}

export class WebLarekApi extends Api implements IWebLarekApi {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getCardList(): Promise<ICardItem[]> {
		return this.get('/product').then((data: ApiListResponse<ICardItem>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	orderProducts(order: IOrder): Promise<IOrderResult> {
		return this.post('/order', order).then((data: IOrderResult) => data);
	}
}
