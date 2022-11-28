<script lang="ts">
  import OrdersTable from './OrdersTable.svelte';
  import BadgeType from '$lib/interfaces/BadgeType';
  import type { PageData } from './$types';
  import type { IOrder } from '$lib/interfaces/IOrder';

  export let data: PageData;
  const orders = data.orders as Array<IOrder>;

  const pendingOrders = orders.filter(
    (el) => el.status === BadgeType.INFO || el.status === 'INITIATED'
  );
  const inTransitOrders = orders.filter((el) => el.status === BadgeType.PENDING);
  const attentionOrders = orders.filter((el) => el.status === BadgeType.WARNING);
  const otherOrders = orders.filter(
    (el) =>
      el.status !== BadgeType.PENDING &&
      el.status !== BadgeType.INFO &&
      el.status !== 'INITIATED' &&
      el.status !== BadgeType.WARNING
  );

  const deliveredOrders: Array<IOrder> = [];
</script>

<div class="page">
  <h1>Orders</h1>
  <section class="content">
    {#if attentionOrders?.length}
      <h2>⚠️ orders needing attention</h2>

      <OrdersTable orders="{attentionOrders}" />
    {/if}

    <h2>📬 pending orders</h2>
    <OrdersTable orders="{pendingOrders}" />

    <h2>📦 in transit</h2>
    <OrdersTable orders="{inTransitOrders}" />

    <h2>🙅‍♀️ cancelled/returns</h2>
    <OrdersTable orders="{otherOrders}" />

    <h2>🏠🎁 delivered orders</h2>
    <OrdersTable orders="{deliveredOrders}" />
  </section>
</div>

<style lang="scss" module="scoped">
  section.content h2 {
    // text-decoration: underline;
    font-size: 1.2rem;
  }
</style>
