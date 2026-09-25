import { ISuccess, ISuccessActions } from '../../types';
import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';

export class Success extends Component<ISuccess> {
    private descriptionElement: HTMLElement;
    private closeButton: HTMLButtonElement;

    constructor(
        container: HTMLElement,
        actions: ISuccessActions
    ) {
        super(container);

        this.descriptionElement = ensureElement<HTMLElement>(
            '.order-success__description',
            container
        );

        this.closeButton = ensureElement<HTMLButtonElement>(
            '.order-success__close',
            container
        );

        this.closeButton.addEventListener('click', actions.onClose);
    }

    set total(value: number) {
        this.descriptionElement.textContent =
            `Списано ${value} синапсов`;
    }
}