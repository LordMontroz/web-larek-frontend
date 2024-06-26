import { Form } from './common/Form';
import { IOrderContacts } from '../types';
import { IEvents } from './base/Events';

export class OrderContacts extends Form<IOrderContacts> {
	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
	}

	set phone(value: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value =
			value;
	}

	set email(value: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value =
			value;
	}
}
