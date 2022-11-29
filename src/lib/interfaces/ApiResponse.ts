import type IProduct from './IProduct';
import type { IOrder, IOrderSummary } from './IOrder';

export interface IProductResponse {
  success: boolean;
  products: Array<IProduct>;
}

export interface IOrderResponse {
  success: boolean;
  order: IOrder;
}

export interface IOrderSummaryResponse {
  success: boolean;
  order: IOrderSummary;
}

export interface IProductResponse {
  success: boolean;
  product: IProduct;
}

export interface IProductsResponse {
  success: boolean;
  products: Array<IProduct>;
}
