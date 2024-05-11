import { IActionInput, IActions, IDeliveryForm } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';

export class DeliveryForm implements IDeliveryForm {
	deliveryFormContent: HTMLElement;
	inputAddress: HTMLInputElement;
	buttonCard: HTMLButtonElement;
	buttonCash: HTMLButtonElement;
	buttonNext: HTMLButtonElement;
	error: HTMLElement;

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
		this.error = ensureElement('.form__errors', this.deliveryFormContent);
	}

	toggleButtonCardActivity(): void {
		if (this.buttonCash.classList.contains('button_alt-active')) {
			this.buttonCard.classList.toggle('button_alt-active');
			this.buttonCash.classList.toggle('button_alt-active');
		}
	}

	toggleButtonCashActivity(): void {
		if (this.buttonCard.classList.contains('button_alt-active')) {
			this.buttonCard.classList.toggle('button_alt-active');
			this.buttonCash.classList.toggle('button_alt-active');
		}
	}

	toggleButtonActivity(): void {
		if (
			(this.buttonCard.classList.contains('button_alt-active') ||
				this.buttonCash.classList.contains('button_alt-active')) &&
			this.inputAddress.value.length > 0
		) {
			this.buttonNext.removeAttribute('disabled');
			this.error.textContent = '';
		} else {
			this.buttonNext.setAttribute('disabled', 'true');
            this.error.textContent = 'Необходимо ввести корректные данные';
		}
	}
}
