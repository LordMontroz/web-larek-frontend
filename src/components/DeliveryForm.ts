import { IActionInput, IActions, IDeliveryForm } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { WebLarekApi } from './WebLarekApi';

export class DeliveryForm implements IDeliveryForm {
	deliveryFormContent: HTMLElement;
	inputAddress: HTMLInputElement;
	buttonCard: HTMLButtonElement;
	buttonCash: HTMLButtonElement;
	buttonNext: HTMLButtonElement;
	error: HTMLElement;
	webLarekApi: WebLarekApi;

	constructor(
		deliveryFormTemplate: HTMLTemplateElement,
		actionButtonCard: IActions,
		actionButtonCash: IActions,
		actionToggleButton: IActionInput,
		actionNext: IActions,
		webLarekApi: WebLarekApi
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
		this.webLarekApi = webLarekApi;
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

	clearDeliveryForm(): void {
		this.inputAddress.value = '';
	}

	addToOrder(): void {
		this.webLarekApi.order.address = this.inputAddress.value;

		if (this.buttonCard.classList.contains('button_alt-active')) {
			this.webLarekApi.order.payment = this.buttonCard.textContent;
		} else {
			this.webLarekApi.order.payment = this.buttonCash.textContent;
		}
	}
}
