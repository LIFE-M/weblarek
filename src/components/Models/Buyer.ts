import { IBuyer, TBuyerErrors } from '../../types';
import { IEvents } from '../base/Events';

export class Buyer {
    private data: IBuyer = {
        payment: null,
        email: '',
        phone: '',
        address: ''
    };

    constructor(private events: IEvents) {}

    setData(data: Partial<IBuyer>): void {
        this.data = {
            ...this.data,
            ...data
        };

        this.events.emit('buyer:changed');
    }

    getData(): IBuyer {
        return this.data;
    }

    clear(): void {
        this.data = {
            payment: null,
            email: '',
            phone: '',
            address: ''
        };

        this.events.emit('buyer:changed');
    }

    validate(): TBuyerErrors {
        const errors: TBuyerErrors = {};

        if (!this.data.payment) {
            errors.payment = 'Выберите способ оплаты';
        }

        if (!this.data.address) {
            errors.address = 'Введите адрес доставки';
        }

        if (!this.data.email) {
            errors.email = 'Введите email';
        }

        if (!this.data.phone) {
            errors.phone = 'Введите телефон';
        }

        return errors;
    }
}