<script lang="ts">
  import CircleCheckmark from '$lib/icons/CircleCheckmark.svelte';

  import { mockProducts } from '$lib/utils/mock';
  import type { PageServerData } from './$types';
  import type { IProduct } from '$lib/interfaces/IProduct';

  function subTotal(products: Array<IProduct>) {
    let total = 0;
    products.forEach((product) => (total = total + product.price * product.quantity));
    return total;
  }

  export let data: PageServerData;
  const id = data.id as string;
  const email = data.email as string;
  // export let currentRoute;
  // const id = currentRoute?.namedParams?.id;
  // const email = currentRoute?.queryParams?.email;

  const products = mockProducts(Math.floor(Math.random() * 8) + 1);
</script>

<section class="order-confirmation">
  <CircleCheckmark />

  <h1>Takk for din bestilling!</h1>

  <div class="order-description">
    <p>
      A payment to PLANETPOSEN, AS will appear on your statement with order number:
      <span class="underline">{id}</span>.
    </p>
    <p>Order receipt has been email to: <span class="underline">{email}</span></p>
  </div>

  <div class="order-receipt">
    {#each products as product}
      <p>
        <code>{product.name} x{product.quantity}</code>
        <code>{product.currency} {product.price * product.quantity}</code>
      </p>
    {/each}
    <p>
      <code>Shipping</code>
      <code>NOK 79</code>
    </p>

    <p>
      <code>Total</code>
      <code>NOK {subTotal(products)}</code>
    </p>
  </div>
</section>

<style lang="scss">
  @import './styles-receipt-page.scss';

  .order-receipt {
    background-color: #f7f7f7;
    max-width: 500px;
    width: calc(100% - 4rem);
    padding: 2rem;
    font-family: monospace;

    p {
      margin: 0.8rem 0;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid lightgrey;

      &:last-of-type {
        padding-top: 1.5rem;
        border-width: 2px;
      }
    }

    code {
      opacity: 0.4;
      font-size: 1rem;

      &:first-of-type {
        font-weight: 600;
      }
    }
  }
</style>
