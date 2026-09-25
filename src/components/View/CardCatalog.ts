import { CDN_URL, categoryMap } from '../../utils/constants';
import { Card } from './Card';

interface ICardCatalogActions {
    onClick: () => void;
}

export class CardCatalog extends Card {
    protected categoryElement: HTMLElement;
    protected imageElement: HTMLImageElement;

    constructor(
        container: HTMLElement,
        actions: ICardCatalogActions
    ) {
        super(container);

        const categoryElement =
            container.querySelector<HTMLElement>('.card__category');

        const imageElement =
            container.querySelector<HTMLImageElement>('.card__image');

        if (!categoryElement || !imageElement) {
            throw new Error('Карточка не найдена');
        }

        this.categoryElement = categoryElement;
        this.imageElement = imageElement;

        container.addEventListener('click', actions.onClick);
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
}