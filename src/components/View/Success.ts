import { ISuccess, ISuccessActions } from '../../types';
import { Component } from '../base/Component';

export class Success extends Component<ISuccess> {
    private descriptionElement: HTMLElement;
    private closeButton: HTMLButtonElement;

    constructor(
        container: HTMLElement,
        actions: ISuccessActions
    ) {
        super(container);

        const descriptionElement =
            container.querySelector<HTMLElement>('.order-success__description');

        const closeButton =
            container.querySelector<HTMLButtonElement>('.order-success__close');

        if (!descriptionElement || !closeButton) {
            throw new Error('Окно не найдено');
        }

        this.descriptionElement = descriptionElement;
        this.closeButton = closeButton;

        this.closeButton.addEventListener('click', actions.onClose);
    }

    set total(value: number) {
        this.descriptionElement.textContent =
            `Списано ${value} синапсов`;
    }
}