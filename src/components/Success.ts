import { IActions, ISuccess } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';

export class Success implements ISuccess {
	successContent: HTMLElement;
	button: HTMLButtonElement;
	orderSuccessDescription: HTMLParagraphElement;
	orderDescription: HTMLParagraphElement;

	constructor(successTemplate: HTMLTemplateElement, actions: IActions) {
		this.successContent = cloneTemplate(successTemplate);
		this.button = ensureElement<HTMLButtonElement>(
			'.order-success__close',
			this.successContent
		);
		this.orderSuccessDescription = ensureElement<HTMLParagraphElement>(
			'.order-success__description',
			this.successContent
		);
		this.button.addEventListener('click', actions.onClick);
	}

	setOrderDescription(sum: HTMLElement): void {
		this.orderSuccessDescription.textContent = `Списано ${sum.textContent}`;
	}
}