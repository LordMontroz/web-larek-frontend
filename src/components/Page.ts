import { IPage } from '../types';
import { ensureElement } from '../utils/utils';

export class Page implements IPage {
	counter: HTMLElement;
	catalog: HTMLElement;
	pageWrapper: HTMLElement;

	constructor() {
		this.counter = ensureElement('.header__basket-counter ');
		this.catalog = ensureElement('.gallery');
		this.pageWrapper = ensureElement('.page__wrapper');
	}

	updateCounter(): void {
		let currentValue: number = parseInt(this.counter.textContent);
		currentValue++;
		this.counter.textContent = currentValue.toString();
		console.log(this.counter);
	}

	setCatalog(items: HTMLElement[]): void {
		items.forEach((item) => {
			this.catalog.append(item);
		});
	}

	lockPage(): void {
		this.pageWrapper.classList.add('page__wrapper_locked');
	}

	unlockPage(): void {
		this.pageWrapper.classList.remove('page__wrapper_locked');
	}
}