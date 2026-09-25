import { TCardPreview, ICardPreviewActions } from '../../types';
import { CardProduct } from './CardProduct';
import { ensureElement } from '../../utils/utils';

export class CardPreview extends CardProduct<TCardPreview> {
    private descriptionElement: HTMLElement;
    private buttonElement: HTMLButtonElement;

    constructor(
        container: HTMLElement,
        actions: ICardPreviewActions
    ) {
        super(container);

        this.descriptionElement = ensureElement<HTMLElement>(
            '.card__text',
            container
        );

        this.buttonElement = ensureElement<HTMLButtonElement>(
            '.card__button',
            container
        );

        this.buttonElement.addEventListener('click', actions.onClick);
    }

    set description(value: string) {
        this.descriptionElement.textContent = value;
    }

    set buttonText(value: string) {
        this.buttonElement.textContent = value;
    }

    set buttonDisabled(value: boolean) {
        this.buttonElement.disabled = value;
    }
}