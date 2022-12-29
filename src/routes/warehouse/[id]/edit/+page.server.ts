import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
  const { id } = params;

  const res = await fetch(`/api/v1/warehouse/${id}`);
  const product = await res.json();
  return product;
};
