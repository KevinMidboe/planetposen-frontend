<script lang="ts">
  import OrderSection from './OrderSection.svelte';
  import DeliverySection from './DeliverySection.svelte';
  import CheckoutButton from '$lib/components/Button.svelte';
  import StripeCard from '$lib/components/StripeCard.svelte';
  import ApplePayButton from '$lib/components/ApplePayButton.svelte';
  import VippsHurtigkasse from '$lib/components/VippsHurtigkasse.svelte';
  import { cart } from '$lib/cartStore';

  import type IProduct from '$lib/interfaces/IProduct';

  function postOrder(event: any) {
    const formData = new FormData(event.target);

    const customerJson = {};
    formData.forEach((value, key) => (customerJson[key] = value));

    const options = {
      method: 'POST',
      body: JSON.stringify({
        customer: customerJson,
        cart: $cart
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    let url = '/api/order';
    if (window?.location?.href.includes('localhost')) {
      url = 'http://localhost:30010'.concat(url);
    }

    fetch(url, options);
  }
</script>

<h1>Checkout</h1>
<form class="checkout" on:submit|preventDefault="{postOrder}">
  <section id="delivery">
    <h2>Leveringsaddresse</h2>
    <DeliverySection />
  </section>

  <section id="order">
    <h2>Din ordre</h2>
    <OrderSection>
      <div class="navigation-buttons" slot="button">
        <ApplePayButton />
        <VippsHurtigkasse />
      </div>
    </OrderSection>
  </section>

  <section id="payment">
    <h2>Betalingsinformasjon</h2>
    <StripeCard />

    <div class="pay">
      <CheckoutButton type="submit" text="Betal" />
    </div>
  </section>
</form>

<style lang="scss" module="scoped">
  @import '../../styles/media-queries.scss';

  form.checkout {
    // display: flex;
    // flex-wrap: wrap;

    display: grid;
    grid-template-areas:
      'delivery order'
      'payment  order';

    grid-gap: 2rem;
    grid-template-columns: 1fr 1fr;
    // grid-auto-flow: column;

    @include mobile {
      grid-template-columns: minmax(0, 1fr);
      grid-template-areas:
        'order'
        'delivery'
        'payment';
    }
  }

  .pay {
    margin: 2rem 0;
  }

  .navigation-buttons {
    display: flex;
    justify-content: flex-start;
    margin-top: 2rem;
    flex-wrap: wrap;
  }

  :global(.navigation-buttons > *) {
    margin-right: 1rem;
    margin-bottom: 1rem;
  }

  #delivery {
    grid-area: delivery;
  }
  #order {
    grid-area: order;
  }
  #payment {
    grid-area: payment;
  }

  section {
    margin: 0 auto;
    position: relative;
    width: 100%;

    h2 {
      padding-left: 4px;
      text-transform: none;
      font-size: 2.3rem;
      padding: 12px 10px 12px 12px !important;
      font-weight: 500;
      color: #231f20;
      line-height: 1.1;
    }
  }
</style>
