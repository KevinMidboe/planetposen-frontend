import type { IProduct } from './IProduct';
import type { IOrder, IOrderSummary } from './IOrder';
import type ICustomer from './ICustomer';
import type ICart from './ICart';
import type IOrderValidationError from './IOrderValidationError';

export interface IProductResponse {
  success: boolean;
  products: Array<IProduct>;
}

export interface IOrderDTO {
  success: boolean;
  order: IOrder;
}

export interface IOrderCreateDTO {
  customer: ICustomer;
  cart: ICart[];
}

export interface IOrderSummaryResponse {
  success: boolean;
  order: IOrderSummary;
}

export interface IProductDTO {
  success: boolean;
  product: IProduct;
}

export interface IProductsDTO {
  success: boolean;
  products: Array<IProduct>;
}

export interface ICartDTO {
  cart: ICart[];
  success: boolean;
}

export interface IOrderCreateUnsuccessfullResponse {
  success: boolean;
  validationErrors: IOrderValidationError[];
}

export interface IOrderCreateResponse {
  success: boolean;
  customer_no: string;
  order_id: string;
  validationErrors?: IOrderValidationError[];
}
