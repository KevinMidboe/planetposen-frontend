<script lang="ts">
  import CircleCheckmark from '$lib/icons/CircleCheckmark.svelte';

  import type { PageServerData } from './$types';
  import type { ILineItem, IOrder } from '$lib/interfaces/IOrder';

  function subTotal(lineItems: Array<ILineItem> = []) {
    let total = 0;
    lineItems.forEach((lineItem) => (total = total + lineItem.price * lineItem.quantity));
    return total;
  }

  export let data: PageServerData;
  const id = data.id as string;
  const email = data.email as string;
  const order = data.order as IOrder;

  // export let currentRoute;
  // const id = currentRoute?.namedParams?.id;
  // const email = currentRoute?.queryParams?.email;
</script>

<section class="order-confirmation">
  <CircleCheckmark />

  <h1>Takk for din bestilling!</h1>

  <div class="order-description">
    <p>
      A payment to PLANETPOSEN, AS will appear on your statement with order number:
      <span class="underline">{id}</span>.
    </p>
    <p>En ordrebekreftelse er sent til: <span class="underline">{email}</span></p>
  </div>

  <div class="order-receipt">
    {#each order?.lineItems as lineItem}
      <p>
        <code>{lineItem.name} x{lineItem.quantity}</code>
        <code>NOK {lineItem.price * lineItem.quantity}</code>
      </p>
    {/each}
    <p>
      <code>Shipping</code>
      <code>NOK 79</code>
    </p>

    <p>
      <code>Total</code>
      <code>NOK {subTotal(order?.lineItems)}</code>
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
