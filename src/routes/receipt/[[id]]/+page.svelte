<script lang="ts">
  import { page } from '$app/stores';
  import CircleCheckmark from '$lib/components/loading/CircleCheckmark.svelte';
  import CircleError from '$lib/components/loading/CircleError.svelte';

  import type { PageServerData } from './$types';
  import type { ILineItem, IOrder } from '$lib/interfaces/IOrder';
  import CircleWarning from '$lib/components/loading/CircleWarning.svelte';

  function subTotal(lineItems: Array<ILineItem> = []) {
    let total = 0;
    lineItems.forEach((lineItem) => (total = total + lineItem.price * lineItem.quantity));
    return total;
  }

  let id: string;
  let email: string;
  let order: IOrder;

  const { data } = $page;
  if (data) {
    id = data.id as string;
    email = data.email || (data?.order?.customer?.email as string);
    order = data.order as IOrder;
  }
</script>

<section class="order-confirmation">
  {#if order.status === 'SUCCESS' || order.status === 'CONFIRMED'}
    <CircleCheckmark />
  {:else if order.status === 'CANCELLED' || order.status === 'REJECTED'}
    <CircleError />
  {:else}
    <CircleWarning />
  {/if}

  {#if order.status === 'SUCCESS' || order.status === 'CONFIRMED'}
    <h1>Takk for din bestilling!</h1>
  {:else}
    <h1>Bestilling ikke gjennomført!</h1>
  {/if}

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
      <code>NOK 75</code>
    </p>

    <p>
      <code>Total</code>
      <code>NOK {subTotal(order?.lineItems)}</code>
    </p>
  </div>
</section>

<style lang="scss">
  @import './styles-receipt-page.scss';

  .order-description .underline {
    text-decoration: underline;
  }

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
