import type IProductVariation from './IProductVariation';

export default interface IProduct {
  product_no: number;
  name: string;
  subtext?: string;
  description?: string;
  image: string;
  currency: string;
  variations?: IProductVariation[];
  primary_color?: string;
  variation_count?: string;
  sum_stock?: number;
  updated?: Date;
  created?: Date;
}
