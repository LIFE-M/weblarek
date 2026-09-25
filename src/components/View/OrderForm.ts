import {
    IOrderFormActions, TOrderForm, TPayment
} from '../../types';
import { Form } from './Form';
import {
    ensureAllElements,
    ensureElement
} from '../../utils/utils';

export class OrderForm extends Form<TOrderForm> {
    private paymentButtons: HTMLButtonElement[];
    private addressInput: HTMLInputElement;

    constructor(
        container: HTMLFormElement,
        actions: IOrderFormActions
    ) {
        super(container, actions);

        this.paymentButtons = ensureAllElements<HTMLButtonElement>(
            '.button_alt',
            container
        );

        this.addressInput = ensureElement<HTMLInputElement>(
            'input[name="address"]',
            container
        );

        this.paymentButtons.forEach((button) => {
            button.addEventListener('click', () => {
                actions.onPayment(button.name as TPayment);
            });
        });

        this.addressInput.addEventListener('input', () => {
            actions.onInput(this.addressInput.value);
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