import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
  return {
    stripeApiKey: env.STRIPE_API_KEY || ''
  };
};
