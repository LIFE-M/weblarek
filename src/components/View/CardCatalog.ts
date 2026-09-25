import { IProduct, ICardCatalogActions } from '../../types';
import { CardProduct } from './CardProduct';

export class CardCatalog extends CardProduct<IProduct> {
    constructor(
        container: HTMLElement,
        actions: ICardCatalogActions
    ) {
        super(container);

        this.container.addEventListener('click', actions.onClick);
    }
}