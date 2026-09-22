import { IBuyer, TBuyerErrors } from '../../../types';

export class Buyer {
    private data: Partial<IBuyer> = {};

    setData(data: Partial<IBuyer>): void {
        this.data = {
            ...this.data,
            ...data
        };
    }

    getData(): IBuyer {
        return this.data as IBuyer;
    }

    clear(): void {
        this.data = {};
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