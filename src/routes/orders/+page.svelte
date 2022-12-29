<script lang="ts">
  import OrdersTable from './OrdersTable.svelte';
  import BadgeType from '$lib/interfaces/BadgeType';
  import PageMeta from '$lib/components/PageMeta.svelte';
  import type { PageData } from './$types';
  import type { IOrderSummary } from '$lib/interfaces/IOrder';

  export let data: PageData;
  const orders = data.orders as Array<IOrderSummary>;

  const successfulOrders = orders.filter((el) => el.status === 'CONFIRMED');
  const incompleteOrders = orders.filter(
    (el) => el.status === BadgeType.INFO || el.status === 'INITIATED'
  );
  const inTransitOrders = orders.filter((el) => el.status === BadgeType.PENDING);
  const attentionOrders = orders.filter((el) => el.status === BadgeType.WARNING);
  const otherOrders = orders.filter(
    (el) =>
      el.status !== BadgeType.PENDING &&
      el.status !== BadgeType.INFO &&
      el.status !== 'INITIATED' &&
      el.status !== 'CONFIRMED' &&
      el.status !== BadgeType.WARNING
  );

  const deliveredOrders: Array<IOrderSummary> = [];
</script>

<PageMeta title="Orders" description="View all webshop orders" />
<div class="page">
  <h1>Orders</h1>
  <section class="content">
    {#if attentionOrders?.length}
      <OrdersTable title="⚠️ orders needing attention" orders="{attentionOrders}" />
    {/if}

    <OrdersTable title="📬 purchased orders" orders="{successfulOrders}" />
    <OrdersTable title="📦 in transit" orders="{inTransitOrders}" />
    <OrdersTable title="🙅‍♀️ cancelled/returns" orders="{otherOrders}" />
    <OrdersTable title="💤 incomplete orders" orders="{incompleteOrders}" />
    <OrdersTable title="🎁🏠 delivered orders" orders="{deliveredOrders}" />
  </section>
</div>
