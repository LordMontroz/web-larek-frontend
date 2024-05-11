import { IWebLarekApi } from '../types/index';
import { ProductItem } from '../types/index';
import { Api, ApiListResponse } from '../components/base/api';

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

	orderPurchase(order: ApiListResponse<string>): void {
		this.post('/order', order);
	}
}