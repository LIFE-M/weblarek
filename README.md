### https://github.com/LIFE-M/weblarek

# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Vite

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/main.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run dev
```

или

```
yarn
yarn dev
```
## Сборка

```
npm run build
```

или

```
yarn build
```
# Интернет-магазин «Web-Larёk»
«Web-Larёk» — это интернет-магазин с товарами для веб-разработчиков, где пользователи могут просматривать товары, добавлять их в корзину и оформлять заказы. Сайт предоставляет удобный интерфейс с модальными окнами для просмотра деталей товаров, управления корзиной и выбора способа оплаты, обеспечивая полный цикл покупки с отправкой заказов на сервер.

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP (Model-View-Presenter), которая обеспечивает четкое разделение ответственности между классами слоев Model и View. Каждый слой несет свой смысл и ответственность:

Model - слой данных, отвечает за хранение и изменение данных.  
View - слой представления, отвечает за отображение данных на странице.  
Presenter - презентер содержит основную логику приложения и  отвечает за связь представления и данных.

Взаимодействие между классами обеспечивается использованием событийно-ориентированного подхода. Модели и Представления генерируют события при изменении данных или взаимодействии пользователя с приложением, а Презентер обрабатывает эти события используя методы как Моделей, так и Представлений.

### Базовый код

#### Класс Component
Является базовым классом для всех компонентов интерфейса.
Класс является дженериком и принимает в переменной `T` тип данных, которые могут быть переданы в метод `render` для отображения.

Конструктор:  
`constructor(container: HTMLElement)` - принимает ссылку на DOM элемент за отображение, которого он отвечает.

Поля класса:  
`container: HTMLElement` - поле для хранения корневого DOM элемента компонента.

Методы класса:  
`render(data?: Partial<T>): HTMLElement` - Главный метод класса. Он принимает данные, которые необходимо отобразить в интерфейсе, записывает эти данные в поля класса и возвращает ссылку на DOM-элемент. Предполагается, что в классах, которые будут наследоваться от `Component` будут реализованы сеттеры для полей с данными, которые будут вызываться в момент вызова `render` и записывать данные в необходимые DOM элементы.  
`setImage(element: HTMLImageElement, src: string, alt?: string): void` - утилитарный метод для модификации DOM-элементов `<img>`


#### Класс Api
Содержит в себе базовую логику отправки запросов.

Конструктор:  
`constructor(baseUrl: string, options: RequestInit = {})` - В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.

Поля класса:  
`baseUrl: string` - базовый адрес сервера  
`options: RequestInit` - объект с заголовками, которые будут использованы для запросов.

Методы:  
`get(uri: string): Promise<object>` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер  
`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.  
`handleResponse(response: Response): Promise<object>` - защищенный метод проверяющий ответ сервера на корректность и возвращающий объект с данными полученный от сервера или отклоненный промис, в случае некорректных данных.

#### Класс EventEmitter
Брокер событий реализует паттерн "Наблюдатель", позволяющий отправлять события и подписываться на события, происходящие в системе. Класс используется для связи слоя данных и представления.

Конструктор класса не принимает параметров.

Поля класса:  
`_events: Map<string | RegExp, Set<Function>>)` -  хранит коллекцию подписок на события. Ключи коллекции - названия событий или регулярное выражение, значения - коллекция функций обработчиков, которые будут вызваны при срабатывании события.

Методы класса:  
`on<T extends object>(event: EventName, callback: (data: T) => void): void` - подписка на событие, принимает название события и функцию обработчик.  
`emit<T extends object>(event: string, data?: T): void` - инициализация события. При вызове события в метод передается название события и объект с данными, который будет использован как аргумент для вызова обработчика.  
`trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие с передачей в него данных из второго параметра.

### Данные

В приложении используются две основные сущности, описывающие данные : товар и покупатель.

Интерфейс IProduct описывает данные товара, который отображается в каталоге.

interface IProduct {
  id: string; идентификатор товара.
  description: string; описание товара.
  image: string; ссылка на изображение товара.
  title: string; название товара.
  category: string; категория товара.
  price: number | null; цена товара.
}

Интерфейс IBuyer описывает данные покупателя, необходимые для оформления заказа.

interface IBuyer {
  payment: TPayment | null; способ оплаты.
  email: string; электронная почта покупателя.
  phone: string; номер телефона покупателя.
  address: string; адрес доставки.
}


### Модели данных

#### Класс Products

Хранит доступные товары и товар выбранный для отображения.

Конструктор принимает IEvents.

Поля

private items: IProduct[] - Хранит массив всех товаров каталога.
private selectedItem: IProduct | null - Хранит товар, выбранный для отображения.

Методы

setItems(items: IProduct[]): void - Сохраняет переданный массив товаров в каталоге.
getItems(): IProduct[] - Возвращает массив товаров.
getItem(id: string): IProduct | undefined - находит товар по его идентификатору.
setSelectedItem(item: IProduct): void - хранит товар, выбранный для просмотра.
getSelectedItem(): IProduct | null - Возвращает товар, выбранный для просмотра.


#### Класс Basket

Хранит товары, выбранные покупателем для покупки.

Конструктор принимает IEvents.

Поля

private items: IProduct[] - Хранит массив товаров, выбранных покупателем.

Методы

getItems(): IProduct[] - Возвращает массив товаров, находящихся в корзине.
addItem(item: IProduct): void - Добавляет товар в корзину.
removeItem(item: IProduct): void - Удаляет товар из корзины.
clear(): void - Очищает корзину.
getTotal(): number - Рассчитывает общую стоимость всех товаров в корзине.
getCount(): number - Возвращает количество товаров в корзине.
hasItem(id: string): boolean - Проверяет наличие товара в корзине по его идентификатору.


#### Класс Buyer

Хранит данные покупателя для оформления заказа.

Конструктор принимает IEvents.

Поля

private data: IBuyer - Хранит данные покупателя.

Методы

setData(data: Partial<IBuyer>): void - Сохраняет переданные данные покупателя.
getData(): IBuyer - Возвращает все данные покупателя.
clear(): void - Очищает все данные покупателя.
validate(): TBuyerErrors - Проверяет данные покупателя.


### Слой коммуникации

Класс ApiRequest

Предоставляет методы для получения каталога товаров и отправки данных заказа.

Конструктор

constructor(api: IApi)

Поля

private api: IApi - Хранит экземпляр API.

Методы

getProducts(): Promise<IProductsResponse> - Выполняет get запрос.
createOrder(order: IOrderRequest): Promise<IOrderResponse> - Выполняет post запрос и передает данные о покупателе и заказе.


### Слой Представления

Слой представления отвечает за отображение данных и обработку действий пользователя.


#### Класс Header

Отвечает за отображение шапки сайта, счётчика товаров и кнопку открытия корзины.

Конструктор принимает HTMLElement и IHeaderActions.

Поля

private counterElement: HTMLElement - Отображает количество товаров.
private basketButton: HTMLButtonElement - Кнопка открытия корзины.

Методы

set counter(value: number): void - Устанавливает значение счётчика.

#### Класс Gallery

Управляет отображением каталога товаров.

Конструктор принимает HTMLElement.

Методы

set catalog(value: HTMLElement[]): void - Заменяет содержимое галереи массивом карточек товаров.


#### Класс Card

Базовый класс для карточек товаров. Содержит общую логику отображения названия и цены.

Конструктор принимает HTMLElement.

Поля

protected titleElement: HTMLElement - Элемент с названием товара.
protected priceElement: HTMLElement - Элемент с ценой товара.

Методы

set title(value: string): void - Устанавливает название товара.
set price(value: number | null): void - Устанавливает цену товара.


#### Класс CardCatalog

Отображает карточку товара в каталоге. Наследуется от Card.

Конструктор принимает HTMLElement и ICardCatalogActions.

Поля

protected categoryElement: HTMLElement - Категория товара.
protected imageElement: HTMLImageElement - Изображение товара.

Методы

set category(value: string): void - Устанавливает категорию товара.
set image(value: string): void - Устанавливает изображение товара.


#### Класс CardPreview

Отображает подробную информацию о товаре. Наследуется от Card.

Конструктор принимает HTMLElement и ICardPreviewActions.

Поля

private categoryElement: HTMLElement - Категория товара.
private imageElement: HTMLImageElement - Изображение товара.
private descriptionElement: HTMLElement - Описание товара.
private buttonElement: HTMLButtonElement - Кнопка действия.

Методы

set category(value: string): void - Устанавливает категорию товара.
set image(value: string): void - Устанавливает изображение товара.
set description(value: string): void - Устанавливает описание товара.
set buttonText(value: string): void - Устанавливает текст кнопки.
set buttonDisabled(value: boolean): void - Блокирует кнопку.


#### Класс CardBasket

Отображает товар в корзине и позволяет удалить его. Наследуется от Card.

Конструктор принимает HTMLElement и ICardBasketActions.

Поля

private indexElement: HTMLElement - Номер товара.
private deleteButton: HTMLButtonElement - Кнопка удаления товара.

Методы

set index(value: number): void - Устанавливает номер товара.


#### Класс BasketView

Отображает содержимое корзины, общую стоимость и кнопку оформления заказа.

Конструктор принимает HTMLElement и IBasketViewActions.

Поля

private listElement: HTMLElement - Список товаров в корзине.
private priceElement: HTMLElement - Отображает общую стоимость.
private buttonElement: HTMLButtonElement - Кнопка оформления заказа.

Методы

set items(value: HTMLElement[]): void - Отображает карточки товаров в корзине.
set total(value: number): void - Устанавливает общую стоимость товаров.
set buttonDisabled(value: boolean): void - Блокирует кнопку оформления заказа.


#### Класс Modal

Отвечает за отображение модального окна.

Конструктор принимает HTMLElement и IModalActions.

Поля

private contentElement: HTMLElement - Содержимое модального окна.
private closeButton: HTMLButtonElement - Кнопка закрытия модального окна.

Методы

set content(value: HTMLElement): void - Устанавливает содержимое модального окна.
open(): void - Открывает модальное окно.
close(): void - Закрывает модальное окно.


#### Класс Form

Базовый класс для форм. Управляет состоянием кнопки отправки и отображением ошибок.

Конструктор принимает HTMLFormElement.

Поля

protected submitButton: HTMLButtonElement - Кнопка отправки формы.
protected errorsElement: HTMLElement - Поле отображения ошибок.

Методы

set valid(value: boolean): void - Активирует или блокирует кнопку отправки формы.
set errors(value: string): void - Устанавливает текст ошибок.


#### Класс OrderForm

Отображает форму выбора способа оплаты и ввода адреса доставки. Наследуется от Form.

Конструктор принимает HTMLFormElement и IOrderFormActions.

Поля

private paymentButtons: HTMLButtonElement[] - Кнопки выбора способа оплаты.
private addressInput: HTMLInputElement - Поле ввода адреса.

Методы

set payment(value: TPayment | null): void - Отмечает выбранный способ оплаты.
set address(value: string): void - Устанавливает адрес.


#### Класс ContactsForm

Отображает форму ввода электронной почты и телефона. Наследуется от Form.

Конструктор принимает HTMLFormElement и IContactsFormActions.

Поля

private emailInput: HTMLInputElement - Поле электронной почты.
private phoneInput: HTMLInputElement - Поле телефона.

Методы

set email(value: string): void - Устанавливает электронную почту.
set phone(value: string): void - Устанавливает телефон.


#### Класс Success

Отображает сообщение об успешном оформлении заказа и итоговую сумму.

Конструктор принимает HTMLElement и ISuccessActions.

Поля

private descriptionElement: HTMLElement - Отображает итоговую сумму.
private closeButton: HTMLButtonElement - Кнопка закрытия.

Методы

set total(value: number): void - Выводит итоговую сумму заказа.


### События

products:changed - Изменение каталога товаров.
product:selected - Выбор товара для подробного просмотра.
basket:changed - Изменение содержимого корзины.
buyer:changed - Изменение данных покупателя.

card:select - Выбор карточки товара в каталоге.
product:toggle - Добавление товара в корзину или удаление товара из корзины из окна просмотра.
basket:remove - Удаление товара из корзины.
basket:open - Открытие корзины.
order:open - Открытие формы оформления заказа.
order:submit - Переход к форме контактных данных.
form:change - Изменение данных в формах.
contacts:submit - Отправка заказа на сервер.
modal:close - Закрытие модального окна.
success:close - Закрытие окна успешного заказа.