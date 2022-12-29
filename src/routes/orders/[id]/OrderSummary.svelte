<script lang="ts">
  import Badge from '$lib/components/Badge.svelte';
  import Time from '$lib/components/Time.svelte';
  import type { IOrder } from '$lib/interfaces/IOrder';

  export let order: IOrder;
</script>

<ul class="summary-list">
  <li>
    <span class="label">Status</span>
    <Badge title="{order.status}" />
  </li>

  <li>
    <span class="label">Last update</span>
    <Time time="{order.updated}" />
  </li>

  <li>
    <span class="label">Created</span>
    <Time time="{order.created}" />
  </li>

  <li>
    <span class="label">Customer</span>
    <span class="name">{order.customer.first_name} {order.customer.last_name}</span>
  </li>

  <li>
    <span class="label">Receipt</span>
    <a href="/receipt/{order.orderid}" class="link">{order.orderid}</a>
  </li>

  <li>
    <span class="label">Payment method</span>
    <span style="text-transform: capitalize;">{order?.payment?.type}</span>
  </li>
</ul>

<style lang="scss">
  .label {
    color: grey;
  }

  span.name {
    text-transform: capitalize;
  }

  ul {
    width: 100%;
    list-style: none;
    padding-left: 0;
    margin-top: 0;
  }

  li {
    padding: 0.4rem 0;
    display: inline-flex;
    align-items: flex-start;
    flex-direction: column;
    white-space: pre;

    &:not(:last-of-type) {
      margin-right: 3rem;
    }

    span:first-of-type {
      margin-bottom: 0.5rem;
    }
  }
</style>
