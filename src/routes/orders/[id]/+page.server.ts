import type { IOrderDTO } from '$lib/interfaces/ApiResponse';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
  const { id } = params;

  const res = await fetch(`/api/order/${id}`);
  const orderResponse: IOrderDTO = await res.json();

  if (orderResponse?.success == false || orderResponse?.order === undefined) {
    throw Error(':(');
  }

  return { order: orderResponse.order };
};
