import { buildApiUrl } from './apiUrl';

export default async function requestSessionCookie() {
  const url = buildApiUrl('/api/v1');
  await fetch(url);
  return true;
}
