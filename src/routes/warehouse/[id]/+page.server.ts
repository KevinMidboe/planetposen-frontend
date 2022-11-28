import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
  const { id } = params;

  // let url = `/api/warehouse/product/${id}`;
  let url = `/api/warehouse/${id}`;
  if (dev || env.API_HOST) {
    url = (env.API_HOST || 'http://localhost:30010').concat(url);
  }

  const res = await fetch(url);
  const product = await res.json();
  console.log('product::', product);
  return product;
};
