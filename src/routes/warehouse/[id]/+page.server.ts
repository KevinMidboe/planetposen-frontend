import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
  const { id } = params;

  const productRes = await fetch(`/api/v1/warehouse/${id}`);
  const { product } = await productRes.json();

  const auditRes = await fetch(`/api/v1/warehouse/${id}/audit`);
  const { logs } = await auditRes.json();

  return {
    product,
    logs
  };
};
