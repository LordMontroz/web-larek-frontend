import { IWebLarekApi } from '../types/index';
import { ProductItem } from '../types/index';
import { Api } from '../components/base/api';
import { ApiListResponse } from '../types/index';
import { OrderDetails } from '../types/index';
import { ContactForm } from './ContactForm';
import { DeliveryForm } from './DeliveryForm';
import { Basket } from './Basket';
import { BasketModel } from './BasketModel';
import { Success } from './Success';

export class WebLarekApi extends Api implements IWebLarekApi {
	cdn: string;
	order: ApiListResponse<string> & OrderDetails = {
		payment: '',
		email: '',
		phone: '',
		address: '',
		total: 0,
		items: [],
	};
	contactForm: ContactForm;
	deliveryForm: DeliveryForm;
	basket: Basket;
	basketModel: BasketModel;
	success: Success;

	constructor(cdn: string, baseUrl: string, options: RequestInit = {}) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getCardList(): Promise<ProductItem[]> {
		return this.get('/product').then((data: ApiListResponse<ProductItem>) =>
			data.items.map((item) => ({ ...item, image: this.cdn + item.image }))
		);
	}

	orderPurchase(): void {
		this.order.items = this.basketModel.basketItems.map((item) => item.id);
		this.contactForm.addToOrder();
		this.deliveryForm.addToOrder();
		this.order.total = this.basket.counterTotalCost();
		this.post('/order', this.order);
		this.success.setOrderDescription(this.basket.basketPrice);
		this.basketModel.clearBasket();
	}
}
