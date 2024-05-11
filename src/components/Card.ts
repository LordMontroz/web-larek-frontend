import { IBasketCardHandler, ICard, ICatalogCardHandler } from '../types/index';
import { Component } from '../components/base/components';
import { ProductItem } from '../types/index';
import { ensureElement, cloneTemplate } from '../utils/utils';

export class Card extends Component<ProductItem> implements ICard {
	container: HTMLElement;
	title: HTMLHeadingElement;
	description?: HTMLParagraphElement;
	image?: HTMLImageElement;
	category: HTMLSpanElement;
	price: HTMLSpanElement;
	button?: HTMLButtonElement;
	buttonAddToBasket?: HTMLButtonElement;
	index?: HTMLElement;
	handleCardOpen: ICatalogCardHandler;

	constructor(
		container: HTMLTemplateElement,
		handleCardOpen?: ICatalogCardHandler,
		handleCardDelete?: IBasketCardHandler
	) {
		super(container);
		this.handleCardOpen = handleCardOpen;
		this.container = cloneTemplate(container);
		this.title = ensureElement<HTMLHeadingElement>(
			'.card__title',
			this.container
		);
		this.description = this.container.querySelector('.card__text');
		this.image = this.container.querySelector('.card__image');
		this.category = this.container.querySelector('.card__category');
		this.price = ensureElement<HTMLSpanElement>('.card__price', this.container);
		this.button = this.container.querySelector('.basket__item-delete');
		if (this.button) {
			this.button.addEventListener('click', handleCardDelete.handleCardDelete);
		}
		this.index = this.container.querySelector('.basket__item-index');
		this.buttonAddToBasket = this.container.querySelector('.card__button');
	}

	updateAddToCardButton(
		isProductInBasket: ProductItem,
		isPreviewCardForCurrentProduct: boolean,
		isProductNotPriceless: boolean
	): void {
		if (isPreviewCardForCurrentProduct) {
			if (isProductInBasket) {
				this.buttonAddToBasket.setAttribute('disabled', 'true');
				this.buttonAddToBasket.textContent = 'Данный продукт купить нельзя';
			} else if (isProductNotPriceless) {
				this.buttonAddToBasket.removeAttribute('disabled');
				this.buttonAddToBasket.textContent = 'В корзину';
			}
		}
	}

	render(data: ProductItem, index?: string): HTMLElement {
		this.setText(this.title, data.title);
		this.setText(this.category, data.category);

		if (this.category) {
			if (this.category.textContent === 'другое') {
				this.category.classList.add('card__category_other');
			} else if (this.category.textContent === 'хард-скил') {
				this.category.classList.add('card__category_hard');
			} else if (this.category.textContent === 'софт-скил') {
				this.category.classList.add('card__category_soft');
			} else if (this.category.textContent === 'кнопка') {
				this.category.classList.add('card__category_button');
			} else if (this.category.textContent === 'дополнительное') {
				this.category.classList.add('card__category_additional');
			}
		}

		this.setText(this.price, `${data.price} синапсов`);

		if (this.title.textContent === 'Мамка-таймер') {
			this.setText(this.price, 'Бесценно');
			if (this.buttonAddToBasket) {
				this.buttonAddToBasket.setAttribute('disabled', 'true');
				this.buttonAddToBasket.textContent = 'Данный продукт купить нельзя';
			}
		}

		if (this.image) {
			this.image.src = data.image;
			this.image.alt = data.title;
		}

		if (this.description) {
			this.setText(this.description, data.description);
		}

		if (this.index) {
			this.index.textContent = index;
		}

		if (this.handleCardOpen?.handleCardOpen) {
			if (this.container) {
				this.container.addEventListener(
					'click',
					this.handleCardOpen.handleCardOpen
				);
			}
		}
		return this.container;
	}
}
