import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  const res = await fetch('/api/v1/orders');
  const response = await res.json();

  return {
    orders: response?.orders || []
  };
};
