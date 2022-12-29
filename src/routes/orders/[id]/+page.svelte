<script lang="ts">
  import OrderSummary from './OrderSummary.svelte';
  import OrderProducts from './OrderProducts.svelte';
  import PaymentDetails from './PaymentDetails.svelte';
  import CustomerDetails from './CustomerDetails.svelte';
  import TrackingDetails from './TrackingDetails.svelte';
  import ShipmentProgress from '$lib/components/ShipmentProgress.svelte';
  import type { IOrder } from '$lib/interfaces/IOrder';
  import type { PageServerData } from './$types';

  export let data: PageServerData;
  let order = data.order as IOrder;

  function orderSubTotal() {
    if (!order || order?.lineItems?.length === 0) return;

    let sum = 0;
    order.lineItems.forEach((lineItem) => (sum = sum + lineItem.quantity * lineItem.price));

    return sum;
  }
</script>

<h1>Order id: {order?.orderid}</h1>
<div class="order">
  <h2 class="price"><span class="amount">{orderSubTotal()}.00</span> Nok</h2>

  <OrderSummary order="{order}" />
  <OrderProducts lineItems="{order?.lineItems}" />

  <PaymentDetails payment="{order?.payment}" />
  <CustomerDetails customer="{order?.customer}" />
  <TrackingDetails shipping="{order?.shipping}" orderId="{order?.orderid}" />
</div>

<style lang="scss">
  @import '../../../styles/media-queries.scss';

  h2.price {
    font-size: 1.5rem;
    color: grey;
    border-bottom: unset;

    .amount {
      font-weight: bold;
      font-size: 2.5rem;
      color: var(--color-text);
    }
  }

  .order {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
</style>
