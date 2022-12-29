import { dev } from '$app/environment';
import { cart as cartStore } from './cartStore';
import type { ICartDTO } from './interfaces/ApiResponse';

const WS_HOST = '127.0.0.1';
const WS_PORT = 30010;
let ws: WebSocket;
let wsReconnectTimeout: ReturnType<typeof setTimeout> | undefined;

function getCookie(key: string) {
  const name = key + '=';
  const decodedCookie = decodeURIComponent(document?.cookie || '');
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

export function getCart() {
  sendPayload({ command: 'cart' });
}

export function addProductToCart(product_no: number, product_sku_no: number, quantity: number) {
  sendPayload({ command: 'add', product_no, product_sku_no, quantity });
}

export function removeProductFromCart(lineitem_id: number) {
  sendPayload({ command: 'rm', lineitem_id });
}

export function decrementProductInCart(lineitem_id: number) {
  sendPayload({ command: 'decrement', lineitem_id });
}

export function incrementProductInCart(lineitem_id: number) {
  sendPayload({ command: 'increment', lineitem_id });
}

function sendPayload(payload: object) {
  ws.send(JSON.stringify(payload));
}

// websocket.onmessage
function receivePayload(event: MessageEvent) {
  try {
    const json = JSON.parse(event?.data || {});
    const { success, cart } = json as ICartDTO;
    if (success && cart) cartStore.set(cart);
  } catch {
    console.debug('Non parsable message from server: ', event?.data);
  }
}

// Called by routes/+layout.svelte on every navigation,
// if ws is closed we try reconnect
export function reconnectIfCartWSClosed() {
  const closed = ws?.readyState === 3;
  if (!closed) return;
  connectToCart();
}

function heartbeat() {
  if (!ws) return;
  if (ws.readyState !== 1) return;
  ws.send('heartbeat');
  setTimeout(heartbeat, 40000);
}

export function connectToCart(attempts = 0, maxAttempts = 6) {
  attempts = attempts + 1;
  clearTimeout(wsReconnectTimeout);
  wsReconnectTimeout = undefined;

  if (attempts >= maxAttempts) {
    console.debug('Max retries, waiting for explicit reconnect function call.');
    return;
  }

  // TODO user feedback when max retries to reconnect, should refresh
  // increasing timeout by a factor
  const planet_id = getCookie('planet_id');
  if (!planet_id) {
    const seconds = attempts ** 2;
    console.debug(`no cookie. Reconnect will be attempted in ${seconds} seconds.`);
    wsReconnectTimeout = setTimeout(() => connectToCart(attempts, maxAttempts), seconds * 1000);
  }

  let url = `wss://${window.location.hostname}/ws/cart`;
  if (dev) {
    url = `ws://${WS_HOST}:${WS_PORT}/ws/cart?planet_id=${planet_id}`;
  }

  ws = new WebSocket(url);

  ws.onopen = () => {
    console.debug('Websocket connection for cart established');
    getCart();
    heartbeat();
  };

  ws.onmessage = (event) => receivePayload(event);

  ws.onclose = () => {
    const seconds = attempts ** 2;
    console.debug(`Socket is closed. Reconnect will be attempted in ${seconds} seconds.`);
    wsReconnectTimeout = setTimeout(() => connectToCart(attempts, maxAttempts), seconds * 1000);
  };

  ws.onerror = (err: Event) => {
    console.error('Unexpected websocket error:', err);
    ws.close();
  };
}
