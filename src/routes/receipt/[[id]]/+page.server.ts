import { redirect } from '@sveltejs/kit';
import validOrderId from '$lib/utils/validOrderId';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params, url }) => {
  const { id } = params;
  const email = url.searchParams.get('email');

  return {
    id,
    email
  };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const orderId = data.get('order-id');
    const email = data.get('order-email');

    // TODO replace with posting form (json) to backend to check??
    // also return statusCode from the backend directly.
    if (validOrderId(String(orderId)) && email) {
      const receiptUrl = `/receipt/${orderId}?email=${email}`;
      throw redirect(303, receiptUrl);
    }

    return { success: false };
  }
};

// could we have order-id and send email to matching
// the order.
// user enters their email and return invalid or not,
// should have some aggressive rate-limiting
