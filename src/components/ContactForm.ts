import { IActionInput, IActions, IContactForm } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';

export class ContactForm implements IContactForm {
	contactFormContent: HTMLElement;
	inputEmail: HTMLInputElement;
	inputPhone: HTMLInputElement;
	buttonPay: HTMLButtonElement;

	constructor(
		contactFormTemplate: HTMLTemplateElement,
		actionPay: IActions,
		trackInput: IActionInput
	) {
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
	}

	toggleButtonActivity(): void {
		const emailRegex = /\w+@\w+\.\w+/i;
		const phoneRegex = /\+\d\s\(\d{3}\)\s\d{3}\-\d{2}\-\d{2}/i;
		if (
			emailRegex.test(this.inputEmail.value) &&
			phoneRegex.test(this.inputPhone.value)
		) {
			this.buttonPay.removeAttribute('disabled');
		} else {
			this.buttonPay.setAttribute('disabled', 'true');
		}
	}
}