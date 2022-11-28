export default interface IProductVariation {
  sku_id: number | null;
  price: number;
  size: string | null;
  stock: number;
  default_price: boolean;
  updated?: Date;
  created?: Date;
}
