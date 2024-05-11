import { IModal, IModalHandler } from '../../types';
import { ensureElement } from '../../utils/utils';

export abstract class Modal implements IModal {
    container: HTMLElement;
	closeButton: HTMLElement;

	constructor(container: HTMLElement, handler?: IModalHandler) {
		this.container = container;
		this.closeButton = ensureElement('.modal__close', container);
		this.closeButton.addEventListener('click', handler.handleModalClose);
	}

	show(content: HTMLElement): void {
		this.container.classList.add('modal_active');
	}
	close(): void {
		this.container.classList.remove('modal_active');
	}
}