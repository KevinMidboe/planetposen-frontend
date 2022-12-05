import type { IProductsDTO } from '$lib/interfaces/ApiResponse';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  const res = await fetch('/api/products');
  const products: IProductsDTO = await res.json();

  return products;
};
