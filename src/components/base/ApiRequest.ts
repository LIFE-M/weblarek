import {
    IApi,
    IOrderRequest,
    IOrderResponse,
    IProductsResponse
} from '../../types';

export class ApiRequest {
    constructor(private api: IApi) {}

    getProducts(): Promise<IProductsResponse> {
        return this.api.get<IProductsResponse>('/product/');
    }

    createOrder(order: IOrderRequest): Promise<IOrderResponse> {
        return this.api.post<IOrderResponse>('/order', order);
    }
}