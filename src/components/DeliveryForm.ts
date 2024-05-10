import { IActions, IDeliveryForm } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';

export class DeliveryForm {
	deliveryFormContent: HTMLElement;
	formAddress: HTMLInputElement;
	buttonCard: HTMLButtonElement;
	buttonCash: HTMLButtonElement;
	buttonNext: HTMLButtonElement;

	constructor(
		deliveryFormTemplate: HTMLTemplateElement,
		actions: IActions,
		actionNext: IActions
	) {
		this.deliveryFormContent = cloneTemplate(deliveryFormTemplate);
		this.formAddress = this.deliveryFormContent.querySelector(
			'input[name="address"]'
		) as HTMLInputElement;
		this.buttonCard = this.deliveryFormContent.querySelector(
			'button[name="card"]'
		) as HTMLButtonElement;
		this.buttonCash = this.deliveryFormContent.querySelector(
			'button[name="cash"]'
		) as HTMLButtonElement;
		this.buttonNext = ensureElement<HTMLButtonElement>(
			'.order__button',
			this.deliveryFormContent
		);
		this.buttonCard.addEventListener('click', actions.onClick);
		this.buttonCash.addEventListener('click', actions.onClick);
		this.buttonNext.addEventListener('click', actionNext.onClick);
	}
}