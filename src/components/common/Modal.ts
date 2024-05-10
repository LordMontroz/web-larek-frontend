import { IActions, IModal } from '../../types';
import { ensureElement } from '../../utils/utils';

export abstract class Modal implements IModal {
    container: HTMLElement;
	closeButton: HTMLElement;
	actions: IActions;

	constructor(container: HTMLElement, actions?: IActions) {
		this.container = container;
		this.closeButton = ensureElement('.modal__close', container);
		this.actions = actions;
		this.closeButton.addEventListener('click', this.actions.onClick);
	}

	show(): void {
		this.container.classList.add('modal_active');
	}
	close(): void {
		this.container.classList.remove('modal_active');
	}
}