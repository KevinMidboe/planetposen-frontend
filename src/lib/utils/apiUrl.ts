import { dev, browser } from '$app/environment';

const LOCALHOST_API = 'http://localhost:30010';

export function buildApiUrl(path: string) {
  let localhostApi = false;

  if (dev) localhostApi = true;
  if (browser && window?.location?.href.includes('localhost')) {
    localhostApi = true;
  }

  return localhostApi ? LOCALHOST_API.concat(path) : path;
}
