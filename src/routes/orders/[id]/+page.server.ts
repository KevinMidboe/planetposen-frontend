import { error } from '@sveltejs/kit';
import type { IOrderDTO } from '$lib/interfaces/ApiResponse';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
  const { id } = params;

  const res = await fetch(`/api/v1/order/${id}`);
  const orderResponse = await res.json();

  if (orderResponse?.success == false || orderResponse?.order === undefined) {
    console.log('throwing error', orderResponse);

    throw error(404, {
      apiResponse: orderResponse,
      message: 'Something went wrong! Unable to get order'
    });
  }

  return { order: orderResponse?.order };
};
