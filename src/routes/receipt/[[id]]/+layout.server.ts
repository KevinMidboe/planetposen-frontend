import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params, url }) => {
  const { id } = params;
  const email = url.searchParams.get('email');

  let order = null;

  try {
    const res = await fetch(`/api/v1/order/${id}`);
    if (res?.status === 404) {
      return {
        id,
        email,
        order: null
      };
    }
    const orderResponse = await res.json();

    if (orderResponse?.order && orderResponse?.order?.lineItems?.length > 0) {
      order = orderResponse?.order;
    }
  } catch (error) {
    console.error('unable to parse order response');
    throw error;
  }

  return {
    id,
    email,
    order
  };
};
