import { ICatalogModel } from '../types/index';
import { ProductItem } from '../types/index';

export class CatalogModel implements ICatalogModel {
	catalog: ProductItem[] = [];

	addToCatalog(items: ProductItem[]): void {
		items.forEach((item) => {
			this.catalog.push(item);
		});
	}
}
