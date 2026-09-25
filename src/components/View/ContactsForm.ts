import {
    IContactsFormActions,
    TContactsForm
} from '../../types';
import { Form } from './Form';
import { ensureElement } from '../../utils/utils';

export class ContactsForm extends Form<TContactsForm> {
    private emailInput: HTMLInputElement;
    private phoneInput: HTMLInputElement;

    constructor(
        container: HTMLFormElement,
        actions: IContactsFormActions
    ) {
        super(container, actions);

        this.emailInput = ensureElement<HTMLInputElement>(
            'input[name="email"]',
            container
        );

        this.phoneInput = ensureElement<HTMLInputElement>(
            'input[name="phone"]',
            container
        );

        this.emailInput.addEventListener('input', () => {
            actions.onInput('email', this.emailInput.value);
        });

        this.phoneInput.addEventListener('input', () => {
            actions.onInput('phone', this.phoneInput.value);
        });
    }

    set email(value: string) {
        this.emailInput.value = value;
    }

    set phone(value: string) {
        this.phoneInput.value = value;
    }
}