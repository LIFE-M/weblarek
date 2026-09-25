import { TCardBasket, ICardBasketActions } from '../../types';
import { Card } from './Card';
import { ensureElement } from '../../utils/utils';

export class CardBasket extends Card<TCardBasket> {
    private indexElement: HTMLElement;
    private deleteButton: HTMLButtonElement;

    constructor(
        container: HTMLElement,
        actions: ICardBasketActions
    ) {
        super(container);

        this.indexElement = ensureElement<HTMLElement>(
            '.basket__item-index',
            container
        );

        this.deleteButton = ensureElement<HTMLButtonElement>(
            '.basket__item-delete',
            container
        );

        this.deleteButton.addEventListener('click', actions.onDelete);
    }

    set index(value: number) {
        this.indexElement.textContent = String(value);
    }
}