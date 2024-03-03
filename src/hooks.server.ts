import { env } from '$env/dynamic/private';
import type { HandleFetch } from '@sveltejs/kit';

export const handleFetch: HandleFetch = async ({ request, fetch }) => {
  const { origin } = new URL(request.url);
  const host = env?.API_HOST || 'http://localhost:30010';

  if (request.url.startsWith(`${origin}/api`)) {
    // clone the original request, but change the URL
    request = new Request(request.url.replace(origin, host), request);
  }

  return fetch(request);
};
