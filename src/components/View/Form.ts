import { IFormState } from '../../types';
import { Component } from '../base/Component';

export abstract class Form<T extends IFormState> extends Component<T> {
    protected submitButton: HTMLButtonElement;
    protected errorsElement: HTMLElement;

    constructor(container: HTMLFormElement) {
        super(container);

        const submitButton =
            container.querySelector<HTMLButtonElement>('button[type="submit"]');

        const errorsElement =
            container.querySelector<HTMLElement>('.form__errors');

        if (!submitButton || !errorsElement) {
            throw new Error('Форма не найдена');
        }

        this.submitButton = submitButton;
        this.errorsElement = errorsElement;
    }

    set valid(value: boolean) {
        this.submitButton.disabled = !value;
    }

    set errors(value: string) {
        this.errorsElement.textContent = value;
    }
}