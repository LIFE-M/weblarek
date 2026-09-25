import { TCardPreview, ICardPreviewActions } from '../../types';
import { CDN_URL, categoryMap } from '../../utils/constants';
import { Card } from './Card';

export class CardPreview extends Card<TCardPreview> {
    private categoryElement: HTMLElement;
    private imageElement: HTMLImageElement;
    private descriptionElement: HTMLElement;
    private buttonElement: HTMLButtonElement;

    constructor(
        container: HTMLElement,
        actions: ICardPreviewActions
    ) {
        super(container);

        const categoryElement =
            container.querySelector<HTMLElement>('.card__category');

        const imageElement =
            container.querySelector<HTMLImageElement>('.card__image');

        const descriptionElement =
            container.querySelector<HTMLElement>('.card__text');

        const buttonElement =
            container.querySelector<HTMLButtonElement>('.card__button');

        if (
            !categoryElement ||
            !imageElement ||
            !descriptionElement ||
            !buttonElement
        ) {
            throw new Error('Карточка не найдена');
        }

        this.categoryElement = categoryElement;
        this.imageElement = imageElement;
        this.descriptionElement = descriptionElement;
        this.buttonElement = buttonElement;

        this.buttonElement.addEventListener('click', actions.onClick);
    }

    set category(value: string) {
        this.categoryElement.textContent = value;

        Object.values(categoryMap).forEach(className => {
            this.categoryElement.classList.remove(className);
        });

        const categoryClass =
            categoryMap[value as keyof typeof categoryMap];

        if (categoryClass) {
            this.categoryElement.classList.add(categoryClass);
        }
    }

    set image(value: string) {
        this.setImage(this.imageElement, `${CDN_URL}${value}`);
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