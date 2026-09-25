import { CDN_URL, categoryMap } from '../../utils/constants';
import { Card } from './Card';
import { IProduct } from '../../types';
import { ensureElement } from '../../utils/utils';


export class CardProduct<T extends IProduct> extends Card<T> {
    protected categoryElement: HTMLElement;
    protected imageElement: HTMLImageElement;

    constructor(container: HTMLElement) {
        super(container);

        this.categoryElement = ensureElement<HTMLElement>(
            '.card__category',
            container
        );

        this.imageElement = ensureElement<HTMLImageElement>(
            '.card__image',
            container
        );
    }

    set category(value: string) {
        this.categoryElement.textContent = value;

        const categoryClass = categoryMap[value as keyof typeof categoryMap];

        Object.values(categoryMap).forEach((className) => {
            this.categoryElement.classList.toggle(className, className === categoryClass);
        });
    }

    set image(value: string) {
        this.setImage(this.imageElement, `${CDN_URL}${value}`);
    }
}