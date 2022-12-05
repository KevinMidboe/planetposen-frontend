<script lang="ts">
  import type { IOrder } from '$lib/interfaces/IOrder';

  export let order: IOrder;
  let paymentMethod: string = Math.random() > 0.5 ? 'Stripe' : 'ApplePay';
</script>

<ul class="summary-list">
  <li>
    <span class="label">Last update</span>
    <span>{order.updated}</span>
  </li>

  <li>
    <span class="label">Customer</span>
    <span class="name">{order.customer.first_name} {order.customer.last_name}</span>
  </li>

  <li>
    <span class="label">Receipt</span>
    <span><a href="/receipt/{order.orderid}">{order.orderid}</a></span>
  </li>

  <li>
    <span class="label">Payment method</span>
    <span>{paymentMethod}</span>
  </li>
</ul>

<style lang="scss">
  @import './styles-order-page.scss';

  ul {
    width: 100%;
  }

  li {
    display: inline-flex;
    align-items: flex-start;
    flex-direction: column;

    &:not(:last-of-type) {
      margin-right: 3rem;
    }

    span:first-of-type {
      margin-bottom: 0.5rem;
    }
  }
</style>
