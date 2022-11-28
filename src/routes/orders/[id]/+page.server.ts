import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import type { IOrderResponse } from '$lib/interfaces/ApiResponse';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
  const { id } = params;

  let url = `/api/order/${id}`;
  if (dev || env.API_HOST) {
    url = (env.API_HOST || 'http://localhost:30010').concat(url);
  }

  const res = await fetch(url);
  const orderResponse: IOrderResponse = await res.json();

  if (orderResponse?.success == false || orderResponse?.order === undefined) {
    throw Error(':(');
  }

  return { order: orderResponse.order };
};
