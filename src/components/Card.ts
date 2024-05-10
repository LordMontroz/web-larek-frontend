import { IActions, ICard } from '../types/index';
import { Component } from '../components/base/components';
import { ProductItem } from '../types/index';
import { ensureElement, cloneTemplate } from '../utils/utils';
import { EventEmitter } from './base/events';

export class Card extends Component<ProductItem> implements ICard {
	container: HTMLElement;
	title: HTMLHeadingElement;
	description?: HTMLParagraphElement;
	image?: HTMLImageElement;
	category: HTMLSpanElement;
	price: HTMLSpanElement;
	button?: HTMLButtonElement;
	actions: IActions;

	constructor(container: HTMLTemplateElement, actions?: IActions) {
		super(container);
        this.actions = actions;
		this.container = cloneTemplate(container);
		this.title = ensureElement<HTMLHeadingElement>(
			'.card__title',
			this.container
		);
		this.description = this.container.querySelector('.card__text');
		this.image = this.container.querySelector('.card__image');
		this.category = ensureElement<HTMLSpanElement>(
			'.card__category',
			this.container
		);
		this.price = ensureElement<HTMLSpanElement>('.card__price', this.container);
        this.button = this.container.querySelector('.gallery__item'); // поменять потом
	}

	render(data: ProductItem): HTMLElement {
		this.setText(this.title, data.title);
		this.setText(this.category, data.category);
		this.setText(this.price, `${data.price} синапсов`);
		if (this.image) {
			this.image.src = data.image;
			this.image.alt = data.title;
		}
		if (this.description) {
			this.setText(this.description, data.description);
		}
		if (this.actions?.onClick) {
			if (this.container) {
				this.container.addEventListener('click', this.actions.onClick);
			}
		}
		return this.container;
	}
}