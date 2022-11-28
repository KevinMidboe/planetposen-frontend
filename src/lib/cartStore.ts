import { writable, get, derived } from 'svelte/store';
import type { Writable, Readable } from 'svelte/store';

export const cart: Writable<any> = writable([]);
export const isOpen: Writable<boolean> = writable(false);

export const count: Readable<number> = derived(cart, ($cart) => $cart.length || 0);

export const subTotal: Readable<number> = derived(cart, ($cart) => {
  let total = 0;
  $cart.forEach((cartItem) => (total += cartItem.price * cartItem.quantity));
  return total;
});

export function toggleCart() {
  isOpen.update((state) => !state);
}

export function closeCart() {
  isOpen.set(false);
}
