import { IGallery } from '../../types';
import { Component } from '../base/Component';

export class Gallery extends Component<IGallery> {
    constructor(container: HTMLElement) {
        super(container);
    }

    set catalog(value: HTMLElement[]) {
        this.container.replaceChildren(...value);
    }
}