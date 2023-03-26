<script lang="ts">
  import Vipps from '$lib/icons/Vipps.svelte';
  import ShopPay from '$lib/icons/ShopPay.svelte';
  import ApplePay from '$lib/icons/ApplePay.svelte';
  import PayPal from '$lib/icons/PayPal.svelte';
  import GooglePay from '$lib/icons/GooglePay.svelte';
</script>

<ul>
  <li class="button" tabindex="0"><Vipps /></li>
  <li class="button" tabindex="0"><ApplePay /></li>
  <li class="button" tabindex="0"><PayPal /></li>
  <li class="button" tabindex="0"><GooglePay /></li>
</ul>

<style lang="scss">
  ul {
    width: 100%;
    display: flex;
    padding-left: 0;
    list-style: none;

    @media (max-width: 750px) {
      flex-wrap: wrap;
      justify-content: space-around;
    }
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.5rem;
    width: 8em;
    height: 42px;
    border-radius: 4px;
    background-color: black;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      scale: 1.05;
    }

    &:nth-of-type(1) {
      background-color: #ff5b24;
    }

    &:nth-of-type(3) {
      background-color: #ffc439;
    }

    @media (max-width: 999px) {
      width: 10em;
      margin: 0.5rem 0.2rem;
    }
  }
</style>
