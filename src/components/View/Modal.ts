import { IModalData, IModalActions } from '../../types';
import { Component } from '../base/Component';

export class Modal extends Component<IModalData> {
    private contentElement: HTMLElement;
    private closeButton: HTMLButtonElement;

    constructor(
        container: HTMLElement,
        actions: IModalActions
    ) {
        super(container);

        const contentElement =
            container.querySelector<HTMLElement>('.modal__content');

        const closeButton =
            container.querySelector<HTMLButtonElement>('.modal__close');

        if (!contentElement || !closeButton) {
            throw new Error('Модалка не найдена');
        }

        this.contentElement = contentElement;
        this.closeButton = closeButton;

        this.closeButton.addEventListener('click', actions.onClose);

        this.container.addEventListener('click', (event) => {
            if (event.target === this.container) {
                actions.onClose();
            }
        });
    }

    set content(value: HTMLElement) {
        this.contentElement.replaceChildren(value);
    }

    open(): void {
        this.container.classList.add('modal_active');
    }

    close(): void {
        this.container.classList.remove('modal_active');
    }
}