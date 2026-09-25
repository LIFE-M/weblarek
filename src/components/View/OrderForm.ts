import {
    IOrderFormActions, TOrderForm, TPayment
} from '../../types';
import { Form } from './Form';

export class OrderForm extends Form<TOrderForm> {
    private paymentButtons: HTMLButtonElement[];
    private addressInput: HTMLInputElement;

    constructor(
        container: HTMLFormElement,
        actions: IOrderFormActions
    ) {
        super(container);

        this.paymentButtons = Array.from(
            container.querySelectorAll<HTMLButtonElement>('.button_alt')
        );

        const addressInput =
            container.querySelector<HTMLInputElement>('input[name="address"]');

        if (!addressInput) {
            throw new Error('Адрес не найден');
        }

        this.addressInput = addressInput;

        this.paymentButtons.forEach(button => {
            button.addEventListener('click', () => {
                actions.onPayment(button.name as TPayment);
            });
        });

        this.addressInput.addEventListener('input', () => {
            actions.onInput(this.addressInput.value);
        });

        container.addEventListener('submit', (event) => {
            event.preventDefault();
            actions.onSubmit();
        });
    }

    set payment(value: TPayment | null) {
        this.paymentButtons.forEach(button => {
            button.classList.toggle(
                'button_alt-active',
                button.name === value
            );
        });
    }

    set address(value: string) {
        this.addressInput.value = value;
    }
}