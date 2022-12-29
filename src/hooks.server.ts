import type { HandleFetch } from '@sveltejs/kit';

export const handleFetch: HandleFetch = async ({ request, fetch }) => {
  const { origin } = new URL(request.url);

  if (request.url.startsWith(`${origin}/api`)) {
    // clone the original request, but change the URL
    request = new Request(request.url.replace(origin, 'http://localhost:30010'), request);
  }

  return fetch(request);
};
