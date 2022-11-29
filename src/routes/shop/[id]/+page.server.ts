import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import generateProductJsonLd from '$lib/jsonld/product';
import type { IProductResponse } from '$lib/interfaces/ApiResponse';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
  const { id } = params;

  let url = `/api/product/${id}`;
  if (dev || env.API_HOST) {
    url = (env.API_HOST || 'http://localhost:30010').concat(url);
  }

  const res = await fetch(url);
  const productResponse: IProductResponse = await res.json();
  const jsonld = generateProductJsonLd(productResponse?.product);

  return {
    product: productResponse?.product,
    jsonld
  };
};
