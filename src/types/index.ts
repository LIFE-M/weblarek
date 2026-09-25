export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export type TPayment = 'card' | 'cash';

export type TBuyerErrors = Partial<Record<keyof IBuyer, string>>;

export type TCardPreview = IProduct & {
    buttonText: string;
    buttonDisabled: boolean;
};

export type TCardBasket = IProduct & {
    index: number;
};

export type TOrderForm = IFormState & {
    payment: TPayment | null;
    address: string;
};

export type TContactsForm = IFormState & {
    email: string;
    phone: string;
};

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(
        uri: string,
        data: object,
        method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export interface IBuyer {
    payment: TPayment | null;
    email: string;
    phone: string;
    address: string;
}

export interface IProductsResponse {
    total: number;
    items: IProduct[];
}

export interface IOrderRequest {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}

export interface IOrderResponse {
    id: string;
    total: number;
}

export interface IBasketView {
    items: HTMLElement[];
    total: number;
    buttonDisabled: boolean;
}

export interface IModalData {
    content: HTMLElement;
}

export interface IFormState {
    valid: boolean;
    errors: string;
}

export interface IFormActions {
    onSubmit: () => void;
}

export interface IOrderFormActions extends IFormActions {
    onPayment: (payment: TPayment) => void;
    onInput: (address: string) => void;
}

export interface IContactsFormActions extends IFormActions {
    onInput: (field: 'email' | 'phone', value: string) => void;
}

export interface IFormChangeEvent {
    field: keyof IBuyer;
    value: string;
}

export interface IProductEvent {
    id: string;
}

export interface ISuccess {
    total: number;
}

export interface ISuccessActions {
    onClose: () => void;
}

export interface IHeader {
    counter: number;
}

export interface IHeaderActions {
    onBasketClick: () => void;
}

export interface IGallery {
    catalog: HTMLElement[];
}

export interface ICardCatalogActions {
    onClick: () => void;
}

export interface ICardPreviewActions {
    onClick: () => void;
}

export interface ICardBasketActions {
    onDelete: () => void;
}

export interface IBasketViewActions {
    onClick: () => void;
}