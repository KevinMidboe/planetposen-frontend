<script lang="ts">
  import { page } from '$app/stores';
  import CircleCheckmark from '$lib/components/loading/CircleCheckmark.svelte';
  import CircleError from '$lib/components/loading/CircleError.svelte';
  import OrderSection from '../../checkout/OrderSection.svelte';

  import type { IOrder } from '$lib/interfaces/IOrder';
  import CircleWarning from '$lib/components/loading/CircleWarning.svelte';

  let id: string;
  let email: string;
  let order: IOrder;

  const { data } = $page;
  if (data) {
    id = data.id as string;
    email = data.email || (data?.order?.customer?.email as string);
    order = data.order as IOrder;
  }

  $: subTotal = Math.round((order?.payment?.amount || 1) / 100);
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
    <div class="receipt-box">
      <OrderSection lineItems="{order?.lineItems}" subTotal="{subTotal}" } />
    </div>
  </div>
</section>

<style lang="scss">
  @import './styles-receipt-page.scss';

  .order-description .underline {
    text-decoration: underline;
  }

  .order-receipt {
    --receipt_color: #f7f7f7;
    --tearOffHeight: 8px;
    background-color: var(--receipt_color);
    max-width: 800px;
    width: calc(100% - 4rem);
    font-family: monospace;
    position: relative;

    /* Paper background effect */
    .receipt-box {
      height: auto;
      overflow: hidden;
      padding: 1rem;
      box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);

      &::after {
        content: '';
        height: var(--tearOffHeight);
        position: absolute;
        left: 0;
        right: 0;
        bottom: calc(var(--tearOffHeight) * -1);
        background-color: var(--receipt_color);
        clip-path: polygon(
          0% 0%,
          5% 100%,
          10% 0%,
          15% 100%,
          20% 0%,
          25% 100%,
          30% 0%,
          35% 100%,
          40% 0%,
          45% 100%,
          50% 0%,
          55% 100%,
          60% 0%,
          65% 100%,
          70% 0%,
          75% 100%,
          80% 0%,
          85% 100%,
          90% 0%,
          95% 100%,
          100% 0%
        );
      }
    }
  }
</style>
