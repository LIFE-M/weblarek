import { IBasketView } from '../../types';
import { Component } from '../base/Component';

interface IBasketViewActions {
    onClick: () => void;
}

export class BasketView extends Component<IBasketView> {
    private listElement: HTMLElement;
    private priceElement: HTMLElement;
    private buttonElement: HTMLButtonElement;

    constructor(
        container: HTMLElement,
        actions: IBasketViewActions
    ) {
        super(container);

        const listElement =
            container.querySelector<HTMLElement>('.basket__list');

        const priceElement =
            container.querySelector<HTMLElement>('.basket__price');

        const buttonElement =
            container.querySelector<HTMLButtonElement>('.basket__button');

        if (!listElement || !priceElement || !buttonElement) {
            throw new Error('Корзина не найдена');
        }

        this.listElement = listElement;
        this.priceElement = priceElement;
        this.buttonElement = buttonElement;

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