import { IFormActions, IFormState } from '../../types';
import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';

export abstract class Form<T extends IFormState> extends Component<T> {
    protected submitButton: HTMLButtonElement;
    protected errorsElement: HTMLElement;

    constructor(
        container: HTMLFormElement,
        actions: IFormActions
    ) {
        super(container);

        this.submitButton = ensureElement<HTMLButtonElement>(
            'button[type="submit"]',
            container
        );

        this.errorsElement = ensureElement<HTMLElement>(
            '.form__errors',
            container
        );
        container.addEventListener('submit', (event) => {
        event.preventDefault();
        actions.onSubmit();
        });
    }

    set valid(value: boolean) {
        this.submitButton.disabled = !value;
    }

    set errors(value: string) {
        this.errorsElement.textContent = value;
    }
}