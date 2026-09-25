import { TCardBasket } from '../../types';
import { Card } from './Card';

interface ICardBasketActions {
    onDelete: () => void;
}

export class CardBasket extends Card<TCardBasket> {
    private indexElement: HTMLElement;
    private deleteButton: HTMLButtonElement;

    constructor(
        container: HTMLElement,
        actions: ICardBasketActions
    ) {
        super(container);

        const indexElement =
            container.querySelector<HTMLElement>('.basket__item-index');

        const deleteButton =
            container.querySelector<HTMLButtonElement>('.basket__item-delete');

        if (!indexElement || !deleteButton) {
            throw new Error('Карточка не найдена');
        }

        this.indexElement = indexElement;
        this.deleteButton = deleteButton;

        this.deleteButton.addEventListener('click', actions.onDelete);
    }

    set index(value: number) {
        this.indexElement.textContent = String(value);
    }
}