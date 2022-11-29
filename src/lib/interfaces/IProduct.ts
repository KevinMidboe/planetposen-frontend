export interface IProduct {
  product_no: number;
  name: string;
  subtext?: string;
  description?: string;
  image: string;
  primary_color?: string;

  variation_count?: string;
  sum_stock?: number;

  updated?: Date;
  created?: Date;
  variations?: IVariation[];
}

export interface IVariation {
  sku_id: number;
  price: number;
  size: string;
  stock: number;
  default_price: boolean;
  updated?: Date;
  created?: Date;
}
