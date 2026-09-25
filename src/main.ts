import './scss/styles.scss';

import { Api } from './components/base/Api';
import { EventEmitter } from './components/base/Events';
import { API_URL } from './utils/constants';
import { ApiRequest } from './components/ApiRequest';
import { IOrderRequest, TPayment } from './types';

import { Products } from './components/Models/Products';
import { Basket } from './components/Models/Basket';
import { Buyer } from './components/Models/Buyer';

import { Header } from './components/View/Header';
import { Gallery } from './components/View/Gallery';
import { CardCatalog } from './components/View/CardCatalog';
import { CardPreview } from './components/View/CardPreview';
import { BasketView } from './components/View/BasketView';
import { CardBasket } from './components/View/CardBasket';
import { Modal } from './components/View/Modal';
import { OrderForm } from './components/View/OrderForm';
import { ContactsForm } from './components/View/ContactsForm';
import { Success } from './components/View/Success';



const events = new EventEmitter();
const products = new Products(events);
const basket = new Basket(events);
const buyer = new Buyer(events);
const apiRequest = new ApiRequest(new Api(API_URL));

const modal = new Modal(
    getElement<HTMLElement>('#modal-container'),
    { onClose: events.trigger('modal:close') }
);

const header = new Header(document.body, {
    onBasketClick: events.trigger('basket:open')
});

const gallery = new Gallery(getElement<HTMLElement>('.gallery'));

const basketView = new BasketView(
    cloneTemplate<HTMLElement>('#basket'),
    { onClick: events.trigger('order:open') }
);

const orderForm = new OrderForm(
    cloneTemplate<HTMLFormElement>('#order'),
    {
        onPayment: (value) =>
            events.emit('form:change', {
                field: 'payment',
                value
            }),
        onInput: (value) =>
            events.emit('form:change', {
                field: 'address',
                value
            }),
        onSubmit: events.trigger('order:submit')
    }
);

const contactsForm = new ContactsForm(
    cloneTemplate<HTMLFormElement>('#contacts'),
    {
        onInput: (field, value) =>
            events.emit('form:change', { field, value }),
        onSubmit: events.trigger('contacts:submit')
    }
);

const success = new Success(
    cloneTemplate<HTMLElement>('#success'),
    { onClose: events.trigger('success:close') }
);

function getElement<T extends Element>(selector: string): T {
    const element = document.querySelector<T>(selector);

    if (!element) {
        throw new Error(`Не найден элемент ${selector}`);
    }

    return element;
}

function cloneTemplate<T extends Element>(selector: string): T {
    const template = getElement<HTMLTemplateElement>(selector);
    const element = template.content.firstElementChild?.cloneNode(true);

    if (!(element instanceof Element)) {
        throw new Error(`Шаблон не найден ${selector}`);
    }

    return element as T;
}

events.on('products:changed', () => {
    gallery.render({
        catalog: products.getItems().map((product) => {
            const card = new CardCatalog(
                cloneTemplate<HTMLElement>('#card-catalog'),
                {
                    onClick: events.trigger(
                        'card:select',
                        { id: product.id }
                    )
                }
            );

            return card.render(product);
        })
    });
});

events.on('product:selected', () => {
    const product = products.getSelectedItem();

    if (!product) {
        return;
    }

    const unavailable = product.price === null;

    let buttonText = 'Купить';

    if (unavailable) {
        buttonText = 'Недоступно';
    } else if (basket.hasItem(product.id)) {
        buttonText = 'Удалить из корзины';
    }

    const card = new CardPreview(
        cloneTemplate<HTMLElement>('#card-preview'),
        {
            onClick: events.trigger(
                'product:toggle',
                { id: product.id }
            )
        }
    );

    modal.render({
        content: card.render({
            ...product,
            buttonText,
            buttonDisabled: unavailable
        })
    });

    modal.open();
});

events.on('basket:changed', () => {
    const items = basket.getItems();
    basketView.render({
        items: items.map((product, index) => {
            const card = new CardBasket(
                cloneTemplate<HTMLElement>('#card-basket'),
                {
                    onDelete: events.trigger(
                        'basket:remove',
                        { id: product.id }
                    )
                }
            );
            return card.render({
                ...product,
                index: index + 1
            });
        }),
        total: basket.getTotal(),
        buttonDisabled: items.length === 0
    });
    header.render({ counter: basket.getCount() });
});

events.on('buyer:changed', () => {
    const data = buyer.getData();
    const errors = buyer.validate();
    orderForm.render({
        payment: data.payment,
        address: data.address,
        valid: !errors.payment && !errors.address,
        errors: [errors.payment, errors.address]
            .filter(Boolean)
            .join('; ')
    });
    contactsForm.render({
        email: data.email,
        phone: data.phone,
        valid: !errors.email && !errors.phone,
        errors: [errors.email, errors.phone]
            .filter(Boolean)
            .join('; ')
    });
});

events.on<{ id: string }>('card:select', ({ id }) => {
    const product = products.getItem(id);

    if (product) {
        products.setSelectedItem(product);
    }
});

events.on<{ id: string }>('product:toggle', ({ id }) => {
    const product = products.getItem(id);
    if (!product || product.price === null) {
        return;
    }
    if (basket.hasItem(id)) {
        basket.removeItem(product);
    } else {
        basket.addItem(product);
    }
    modal.close();
});

events.on<{ id: string }>('basket:remove', ({ id }) => {
    const product = basket.getItems().find(
        (item) => item.id === id
    );

    if (product) {
        basket.removeItem(product);
    }
});

events.on('basket:open', () => {
    modal.render({ content: basketView.render() });
    modal.open();
});

events.on('order:open', () => {
    modal.render({ content: orderForm.render() });
});

events.on('order:submit', () => {
    const errors = buyer.validate();

    if (!errors.payment && !errors.address) {
        modal.render({ content: contactsForm.render() });
    }
});

events.on<{
    field: 'payment' | 'address' | 'email' | 'phone';
    value: string;
}>('form:change', ({ field, value }) => {
    if (field === 'payment') {
        buyer.setData({ payment: value as TPayment });
    }

    if (field === 'address') {
        buyer.setData({ address: value });
    }

    if (field === 'email') {
        buyer.setData({ email: value });
    }

    if (field === 'phone') {
        buyer.setData({ phone: value });
    }
});

events.on('contacts:submit', async () => {
    const data = buyer.getData();
    const errors = buyer.validate();

    if (
        errors.payment ||
        errors.address ||
        errors.email ||
        errors.phone ||
        !data.payment
    ) {
        return;
    }

    const order: IOrderRequest = {
        payment: data.payment,
        email: data.email,
        phone: data.phone,
        address: data.address,
        total: basket.getTotal(),
        items: basket.getItems().map((item) => item.id)
    };

    try {
        const result = await apiRequest.createOrder(order);

        basket.clear();
        buyer.clear();

        modal.render({
            content: success.render({ total: result.total })
        });

        modal.open();
    } catch (error) {
        console.error('Ошибка оформления заказа:', error);
    }
});

events.on('modal:close', () => modal.close());
events.on('success:close', () => modal.close());

apiRequest.getProducts()
    .then((data) => {
        products.setItems(data.items);
    })
    .catch((error) => {
        console.error('Ошибка загрузки товаров:', error);
    });
