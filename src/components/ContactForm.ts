import { IActionInput, IActions, IContactForm } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { WebLarekApi } from './WebLarekApi';

export class ContactForm implements IContactForm {
	contactFormContent: HTMLElement;
	inputEmail: HTMLInputElement;
	inputPhone: HTMLInputElement;
	buttonPay: HTMLButtonElement;
	error: HTMLElement;
	webLarekApi: WebLarekApi;

	constructor(
		contactFormTemplate: HTMLTemplateElement,
		actionPay: IActions,
		trackInput: IActionInput,
		webLarekApi: WebLarekApi
	) {
		this.webLarekApi = webLarekApi;
		this.contactFormContent = cloneTemplate(contactFormTemplate);
		this.inputEmail = this.contactFormContent.querySelector(
			'input[name="email"]'
		) as HTMLInputElement;
		this.inputPhone = this.contactFormContent.querySelector(
			'input[name="phone"]'
		) as HTMLInputElement;
		this.buttonPay = ensureElement<HTMLButtonElement>(
			'.button',
			this.contactFormContent
		);
		this.buttonPay.addEventListener('click', actionPay.onClick);
		this.inputEmail.addEventListener('input', trackInput.onInput);
		this.inputPhone.addEventListener('input', trackInput.onInput);
		this.error = ensureElement('.form__errors', this.contactFormContent);
	}

	addPhoneMask(): void {
		this.inputPhone.value = this.inputPhone.value.replace(/\D/gi, '');

		if (this.inputPhone.value.length > 0) {
			let maskedValue = '+7 (' + this.inputPhone.value.substring(1, 4) + ')';

			if (this.inputPhone.value.length > 3) {
				maskedValue += ' ' + this.inputPhone.value.substring(4, 7);
			}
			if (this.inputPhone.value.length > 6) {
				maskedValue += '-' + this.inputPhone.value.substring(7, 9);
			}
			if (this.inputPhone.value.length > 8) {
				maskedValue += '-' + this.inputPhone.value.substring(9, 11);
			}

			this.inputPhone.value = maskedValue;
		}
	}

	toggleButtonActivity(): void {
		const emailRegex = /\w+@\w+\.\w+/i;
		const phoneRegex = /\+7\s\(\d{3}\)\s\d{3}\-\d{2}\-\d{2}/i;
		if (
			emailRegex.test(this.inputEmail.value) &&
			phoneRegex.test(this.inputPhone.value)
		) {
			this.buttonPay.removeAttribute('disabled');
			this.error.textContent = '';
		} else {
			this.buttonPay.setAttribute('disabled', 'true');
			this.error.textContent = 'Необходимо ввести корректные данные';
		}
	}

	learContactForms(): void {
		this.inputEmail.value = '';
		this.inputPhone.value = '';
	}

	addToOrder(): void {
		this.webLarekApi.order.email = this.inputEmail.value;
		this.webLarekApi.order.phone = this.inputPhone.value;
	}
}
