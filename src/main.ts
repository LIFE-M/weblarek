import './scss/styles.scss';
import { Products } from './components/Models/Products';
import { Basket } from './components/Models/Basket';
import { Buyer } from './components/Models/Buyer';
import { Api } from './components/Api';
import { ApiRequest } from './components/ApiRequest';

import { apiProducts } from './utils/data';
import { API_URL } from './utils/constants';

const products = new Products();
const basket = new Basket();
const buyer = new Buyer();

products.setItems(apiProducts.items);
console.log('Массив товаров из каталога:', products.getItems());

const selectedProduct = products.getItem(apiProducts.items[0].id);
console.log('Товар по идентификатору:', selectedProduct);

products.setSelectedItem(apiProducts.items[0]);
console.log('Выбранный товар:', products.getSelectedItem());

basket.addItem(apiProducts.items[0]);
basket.addItem(apiProducts.items[1]);
basket.addItem(apiProducts.items[2]);

console.log('Корзина после добавления товаров:', basket.getItems());
console.log('Есть ли товар в корзине:', basket.hasItem(apiProducts.items[0].id));
console.log('Количество товаров в корзине:', basket.getCount());
console.log('Стоимость товаров в корзине:', basket.getTotal());

basket.removeItem(apiProducts.items[0]);
console.log('Корзина после удаления товара:', basket.getItems());

basket.clear();
console.log('Корзина после очистки:', basket.getItems());

console.log('Ошибки пустой формы:', buyer.validate());

buyer.setData({
    payment: 'card',
    email: 'example@example.ru',
    phone: '+1 234 567 89 55',
    address: 'ул. Облачная'
});

console.log('Данные покупателя:', buyer.getData());
console.log('Ошибки в данных покупателя:', buyer.validate());

buyer.clear();
console.log('Данные покупателя после очистки:', buyer.getData());
console.log('Ошибки после очистки:', buyer.validate());


const api = new Api(API_URL);
const apiRequest = new ApiRequest(api);

apiRequest.getProducts()
    .then(data => {
        products.setItems(data.items);
        console.log('Каталог после запроса:', products.getItems());
    })
    .catch(error => {
        console.error('Ошибка загрузки товаров:', error);
    });