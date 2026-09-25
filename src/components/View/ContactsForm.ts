import {
    IContactsFormActions,
    TContactsForm
} from '../../types';
import { Form } from './Form';

export class ContactsForm extends Form<TContactsForm> {
    private emailInput: HTMLInputElement;
    private phoneInput: HTMLInputElement;

    constructor(
        container: HTMLFormElement,
        actions: IContactsFormActions
    ) {
        super(container);

        const emailInput =
            container.querySelector<HTMLInputElement>('input[name="email"]');

        const phoneInput =
            container.querySelector<HTMLInputElement>('input[name="phone"]');

        if (!emailInput || !phoneInput) {
            throw new Error('Контакты не найдены');
        }

        this.emailInput = emailInput;
        this.phoneInput = phoneInput;

        this.emailInput.addEventListener('input', () => {
            actions.onInput('email', this.emailInput.value);
        });

        this.phoneInput.addEventListener('input', () => {
            actions.onInput('phone', this.phoneInput.value);
        });

        container.addEventListener('submit', (event) => {
            event.preventDefault();
            actions.onSubmit();
        });
    }

    set email(value: string) {
        this.emailInput.value = value;
    }

    set phone(value: string) {
        this.phoneInput.value = value;
    }
}