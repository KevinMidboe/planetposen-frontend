import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  const res = await fetch('/api/warehouse');
  const warehouse = await res.json();

  return {
    products: warehouse?.warehouse
  };
};
