import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const orderId = data.get('order-id');
    const email = data.get('order-email');

    const receiptUrl = `/receipt/${orderId}?email=${email}`;
    throw redirect(303, receiptUrl);
  }
};

// could we have order-id and send email to matching
// the order.
// user enters their email and return invalid or not,
// should have some aggressive rate-limiting
