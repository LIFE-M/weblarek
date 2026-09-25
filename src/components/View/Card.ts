import { IProduct } from '../../types';
import { Component } from '../base/Component';

export abstract class Card<T extends IProduct = IProduct> extends Component<T> {
    protected titleElement: HTMLElement;
    protected priceElement: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);

        const titleElement = container.querySelector<HTMLElement>('.card__title');
        const priceElement = container.querySelector<HTMLElement>('.card__price');

        if (!titleElement || !priceElement) {
            throw new Error('Карточка не найдена');
        }

        this.titleElement = titleElement;
        this.priceElement = priceElement;
    }

    set title(value: string) {
        this.titleElement.textContent = value;
    }

    set price(value: number | null) {
        this.priceElement.textContent =
            value === null ? '' : `${value} синапсов`;
    }
}