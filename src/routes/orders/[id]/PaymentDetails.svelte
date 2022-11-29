<script lang="ts">
  import Badge from '$lib/components/Badge.svelte';
  // import type BadgeType from '$lib/interfaces/BadgeType';
  import type { IOrder } from '$lib/interfaces/IOrder';

  export let order: IOrder;
</script>

<section>
  <h2>Payment details</h2>
  <ul class="property-list">
    <li>
      <span class="label">Amount</span>
      <span>{order?.payment?.amount}.10 kr</span>
    </li>

    <li>
      <span class="label">Fee</span>
      <span>2.25 kr</span>
    </li>

    <li>
      <span class="label">Net</span>
      <span>7.85 kr</span>
    </li>

    <li>
      <span class="label">Status</span>
      <Badge title="{order?.status?.text || order.status}" type="{order.status.type}" />
    </li>
  </ul>
</section>

<style lang="scss">
  @import './styles-order-page.scss';
</style>
