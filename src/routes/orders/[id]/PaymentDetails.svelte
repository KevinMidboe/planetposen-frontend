<script lang="ts">
  import Badge from '$lib/components/Badge.svelte';
  import Time from '$lib/components/Time.svelte';
  import type { IStripePayment } from '$lib/interfaces/IOrder';

  export let payment: IStripePayment;
  const initiatedAmount = payment?.amount ? payment.amount / 100 : 0;
  const capturedAmount = payment?.amount_captured ? payment.amount_captured / 100 : 0;
  const refundedAmount = payment?.amount_refunded ? payment.amount_refunded / 100 : 0;

  function calculateApproximateFee() {
    if (!payment?.amount_captured) return null;

    const percentCut = 0.024;
    const fixedCut = 2;

    return capturedAmount * percentCut + fixedCut;
  }

  function round(num: number) {
    return Math.round(num * 100) / 100;
  }

  let stripeDashboardUrl = `https://dashboard.stripe.com/test/payments/${payment?.stripe_transaction_id}`;
  const fee = calculateApproximateFee();
  const net = fee ? capturedAmount - fee - refundedAmount : null;
</script>

<section>
  <h2>Payment details</h2>
  <ul class="property-list">
    <li>
      <span class="label">Stripe link</span>
      {#if payment?.stripe_transaction_id}
        <a href="{stripeDashboardUrl}" class="link" target="_blank" rel="noreferrer">
          <span>{payment?.stripe_transaction_id}</span>
        </a>
      {:else}
        <span>(No payment found)</span>
      {/if}
    </li>

    <li>
      <span class="label">Amount requested</span>
      <span>{initiatedAmount}.00 kr</span>
    </li>

    <li>
      <span class="label">Amount charged</span>
      <span>{capturedAmount}.00 kr</span>
    </li>

    {#if payment?.amount_refunded > 0}
      <li>
        <span class="label">Refunded</span>
        <span>{payment?.amount_refunded / 100}.00 kr</span>
      </li>
    {/if}

    <li>
      <span class="label">Fee (approx)</span>
      <span>{fee === null ? '-' : round(fee) + ' kr'}</span>
    </li>

    <li>
      <span class="label">Net</span>
      <span>{net === null ? '-' : round(net) + ' kr'}</span>
    </li>

    <li>
      <span class="label">Status</span>
      <Badge title="{payment?.stripe_status}" />
    </li>

    <li>
      <span class="label">Created</span>
      <Time time="{payment?.created}" />
    </li>

    <li>
      <span class="label">Updated</span>
      <Time time="{payment?.updated}" />
    </li>
  </ul>
</section>

<style lang="scss">
  @import './styles-order-page.scss';

  a.link {
    max-width: 60%;
    overflow-x: hidden;
  }
</style>
