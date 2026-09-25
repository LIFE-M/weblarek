import { IHeader, IHeaderActions } from '../../types';
import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';

export class Header extends Component<IHeader> {
    private counterElement: HTMLElement;
    private basketButton: HTMLButtonElement;

    constructor(
        container: HTMLElement,
        actions: IHeaderActions
    ) {
        super(container);

        this.counterElement = ensureElement<HTMLElement>(
            '.header__basket-counter',
            container
        );

        this.basketButton = ensureElement<HTMLButtonElement>(
            '.header__basket',
            container
        );

        this.basketButton.addEventListener(
            'click',
            actions.onBasketClick
        );
    }

    set counter(value: number) {
        this.counterElement.textContent = String(value);
    }
}