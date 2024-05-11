import { IActions, IContentModal } from '../types';
import { ensureElement } from '../utils/utils';
import { Page } from './Page';
import { Modal } from './common/Modal';

export class ContentModal extends Modal implements IContentModal {
	content: HTMLElement;
	modalContent: HTMLElement;
	button: HTMLButtonElement;
	page: Page;

	constructor(modalContainer: HTMLElement, page: Page, actions?: IActions) {
		super(modalContainer, actions);
		this.modalContent = ensureElement('.modal__content', modalContainer);
		this.page = page;
	}

	show(content: HTMLElement): void {
		this.clearModalContent();
		this.setContent(content);
		this.modalContent.append(this.content);
		super.show(content);
		this.page.lockPage();
	}

	close(): void {
		super.close();
		this.page.unlockPage();
		this.clearModalContent();
	}

	private setContent(content: HTMLElement): void {
		this.content = content;
	}

	setButton(button: HTMLButtonElement, actions: IActions): void {
		this.button = button;
		this.button.addEventListener('click', actions.onClick);
	}

	private clearModalContent(): void {
		if (this.content && this.modalContent.contains(this.content)) {
			this.modalContent.removeChild(this.content);
		}
		this.content = null;
	}
}