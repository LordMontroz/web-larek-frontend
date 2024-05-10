import { IActions, IContactForm } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';

export class ContactForm {
	contactFormContent: HTMLElement;
	inputEmail: HTMLInputElement;
	inputPhone: HTMLInputElement;
	buttonPay: HTMLButtonElement;

	constructor(contactFormTemplate: HTMLTemplateElement, actionPay: IActions) {
		this.contactFormContent = cloneTemplate(contactFormTemplate);
		this.inputEmail = this.contactFormContent.querySelector(
			'button[name="cash"]'
		) as HTMLInputElement;
		this.inputPhone = this.contactFormContent.querySelector(
			'button[name="cash"]'
		) as HTMLInputElement;
		this.buttonPay = ensureElement<HTMLButtonElement>(
			'.button',
			this.contactFormContent
		);
		this.buttonPay.addEventListener('click', actionPay.onClick);
	}
}