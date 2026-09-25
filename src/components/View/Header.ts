import { IHeader, IHeaderActions } from '../../types';
import { Component } from '../base/Component';

export class Header extends Component<IHeader> {
    private counterElement: HTMLElement;
    private basketButton: HTMLButtonElement;

    constructor(
        container: HTMLElement,
        actions: IHeaderActions
    ) {
        super(container);

        const counterElement =
            container.querySelector<HTMLElement>('.header__basket-counter');

        const basketButton =
            container.querySelector<HTMLButtonElement>('.header__basket');

        if (!counterElement || !basketButton) {
            throw new Error('Шапка не найдена');
        }

        this.counterElement = counterElement;
        this.basketButton = basketButton;

        this.basketButton.addEventListener('click', actions.onBasketClick);
    }

    set counter(value: number) {
        this.counterElement.textContent = String(value);
    }
}