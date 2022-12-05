import generateProductJsonLd from '$lib/jsonld/product';
import type { IProductDTO } from '$lib/interfaces/ApiResponse';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
  const { id } = params;

  const res = await fetch(`/api/product/${id}`);
  const productResponse: IProductDTO = await res.json();
  const jsonld = generateProductJsonLd(productResponse?.product);

  return {
    product: productResponse?.product,
    jsonld
  };
};
