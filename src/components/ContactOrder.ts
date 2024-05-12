import { IContactForm, IContactFormHandlers } from '../types';
import { REGULAR_EMAIL, REGULAR_PHONE } from '../utils/constants';
import { cloneTemplate, ensureElement } from '../utils/utils';

export class ContactForm implements IContactForm {
	contactFormContent: HTMLElement;
	inputEmail: HTMLInputElement;
	inputPhone: HTMLInputElement;
	buttonPay: HTMLButtonElement;
	error: HTMLElement;

	constructor(
		contactFormTemplate: HTMLTemplateElement,
		handlers: IContactFormHandlers
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
		this.contactFormContent.addEventListener(
			'submit',
			handlers.handleSuccessOpen
		);
		this.inputEmail.addEventListener(
			'input',
			handlers.handleToggleButtonActivity
		);
		this.inputPhone.addEventListener(
			'input',
			handlers.handleToggleButtonActivity
		);
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
		const emailRegex = REGULAR_EMAIL;
		const phoneRegex = REGULAR_PHONE;
		if (
			emailRegex.test(this.inputEmail.value) &&
			phoneRegex.test(this.inputPhone.value)
		) {
			this.buttonPay.removeAttribute('disabled');
			this.error.textContent = '';
		} else {
			this.buttonPay.setAttribute('disabled', 'true');
			this.error.textContent = 'Необходимо указать корректный телефон и email';
		}
	}

	clearContactForms(): void {
		this.inputEmail.value = '';
		this.inputPhone.value = '';
		this.toggleButtonActivity();
		this.error.textContent = '';
	}

	getInputEmailValue(): string {
		return this.inputEmail.value;
	}

	getInputPhoneValue(): string {
		return this.inputPhone.value;
	}
}
