import validOrderId from '$lib/utils/validOrderId';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
  const { id } = params;
  return {
    id,
    isValidReceipt: validOrderId(id)
  };
};
