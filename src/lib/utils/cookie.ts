export function getCookie(name: string): string | object {
  if (!document) return;

  const cookies = document.cookie.split(';').reduce((acc, cookieString) => {
    const [key, value] = cookieString.split('=').map((s) => s.trim());
    if (key && value) {
      acc[key] = decodeURIComponent(value);
    }
    return acc;
  }, {});

  return name ? cookies[name] || '' : cookies;
}

export function setCookie(name: string, value: string, options = {}) {
  if (!document) return;

  document.cookie = `${name}=${encodeURIComponent(value)}${Object.keys(options).reduce(
    (acc, key) => {
      return acc + `;${key.replace(/([A-Z])/g, ($1) => '-' + $1.toLowerCase())}=${options[key]}`;
    },
    ''
  )}`;
}
