import { IBasketView, IBasketViewActions } from '../../types';
import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';

export class BasketView extends Component<IBasketView> {
    private listElement: HTMLElement;
    private priceElement: HTMLElement;
    private buttonElement: HTMLButtonElement;

    constructor(
        container: HTMLElement,
        actions: IBasketViewActions
    ) {
        super(container);

        this.listElement = ensureElement<HTMLElement>(
            '.basket__list',
            container
        );

        this.priceElement = ensureElement<HTMLElement>(
            '.basket__price',
            container
        );

        this.buttonElement = ensureElement<HTMLButtonElement>(
            '.basket__button',
            container
        );

        this.buttonElement.addEventListener('click', actions.onClick);
    }

    set items(value: HTMLElement[]) {
        this.listElement.replaceChildren(...value);
    }

    set total(value: number) {
        this.priceElement.textContent = `${value} синапсов`;
    }

    set buttonDisabled(value: boolean) {
        this.buttonElement.disabled = value;
    }
}