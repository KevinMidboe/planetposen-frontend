import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import type { IProductsResponse } from '$lib/interfaces/ApiResponse';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  let url = '/api/products';
  if (dev || env.API_HOST) {
    url = (env.API_HOST || 'http://localhost:30010').concat(url);
  }

  const res = await fetch(url);
  const products: IProductsResponse = await res.json();

  return products;
};
