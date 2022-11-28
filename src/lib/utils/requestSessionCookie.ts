import { dev } from '$app/environment';

export default async function requestSessionCookie() {
  let url = '/api';
  if (dev) {
    url = 'http://localhost:30010'.concat(url);
  }

  await fetch(url);
  return true;
}
