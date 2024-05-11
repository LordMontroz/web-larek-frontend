import { IActionInput, IActions, IDeliveryForm } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';

export class DeliveryForm implements IDeliveryForm {
	deliveryFormContent: HTMLElement;
	inputAddress: HTMLInputElement;
	buttonCard: HTMLButtonElement;
	buttonCash: HTMLButtonElement;
	buttonNext: HTMLButtonElement;

	constructor(
		deliveryFormTemplate: HTMLTemplateElement,
		actionButtonCard: IActions,
		actionButtonCash: IActions,
		actionToggleButton: IActionInput,
		actionNext: IActions
	) {
		this.deliveryFormContent = cloneTemplate(deliveryFormTemplate);
		this.inputAddress = this.deliveryFormContent.querySelector(
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
		this.buttonCard.addEventListener('click', actionButtonCard.onClick);
		this.buttonCash.addEventListener('click', actionButtonCash.onClick);
		this.buttonNext.addEventListener('click', actionNext.onClick);
		this.inputAddress.addEventListener('input', actionToggleButton.onInput);
	}

	toggleButtonActivity(): void {
		if (
			(this.buttonCard.classList.contains('button_alt-active') ||
				this.buttonCash.classList.contains('button_alt-active')) &&
			this.inputAddress.value.length > 0
		) {
			this.buttonNext.removeAttribute('disabled');
		} else {
			this.buttonNext.setAttribute('disabled', 'true');
		}
	}
}