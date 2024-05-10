import { IActions, IContentModal } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { Component } from './base/components';
import { Modal } from './common/Modal';

// надо наследовать component
export class ContentModal extends Modal implements IContentModal {
	content: HTMLElement;
	modalContent: HTMLElement;
	button: HTMLButtonElement;

	constructor(modalContainer: HTMLElement, actions?: IActions) {
		super(modalContainer, actions);
		this.modalContent = ensureElement('.modal__content', modalContainer);
	}

	show(): void {
		this.modalContent.append(this.content);
		super.show();
	}

	setContent(content: HTMLElement): void {
		this.content = content;
	}

	setButton(button: HTMLButtonElement, actions: IActions): void {
		this.button = button;
		this.button.addEventListener('click', actions.onClick);
	}

	clearModalContent(): void {
		if (this.content && this.modalContent.contains(this.content)) {
			this.modalContent.removeChild(this.content);
		}
		this.content = null;
	}
}