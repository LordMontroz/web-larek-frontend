import { IOrder, IWebLarekApi } from '../types/index';
import { ProductItem } from '../types/index';
import { Api } from './base/Api';
import { ApiListResponse } from '../types/index';

export class WebLarekApi extends Api implements IWebLarekApi {
	cdn: string;

	constructor(cdn: string, baseUrl: string, options: RequestInit = {}) {
		super(baseUrl, options);
		this.cdn = cdn;
	}
	getCardList(): Promise<ProductItem[]> {
		return this.get('/product').then((data: ApiListResponse<ProductItem>) =>
			data.items.map((item) => ({ ...item, image: this.cdn + item.image }))
		);
	}

	orderPurchase(order: IOrder): Promise<ApiListResponse<string>> {
		return this.post('/order', order).then(
			(data: ApiListResponse<string>) => data
		);
	}
}
