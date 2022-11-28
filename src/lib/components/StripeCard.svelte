<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { loadStripe } from '@stripe/stripe-js/pure';
  import type { Stripe } from '@stripe/stripe-js';
  import { cart } from '../cartStore';

  function mountCard() {
    const elements = stripe.elements();

    const options = {
      hidePostalCode: true,
      style: {
        base: {
          color: '#32325d',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '18px',
          '::placeholder': {
            color: '#aab7c4'
          }
        }
      }
    };

    card = elements.create('card', options);

    card.mount(cardElement);
  }

  // function makeIntent() {
  //   let url = "/api/payment/stripe";
  //   if (window.location.href.includes("localhost"))
  //     url = "http://localhost:30010".concat(url);

  //   fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       cart: $cart
  //     })
  //   })
  //     .then((resp) => resp.json())
  //     .then((data) => (clientSecret = data.paymentIntent.clientSecret));
  // }

  function pay() {
    stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: 'Kevin Testost'
          }
        }
      })
      .then((result) => {
        if (result.error) {
          confirmDiag.innerText = result.error.message || 'Unexpected payment ERROR!';
        } else {
          if (result.paymentIntent.status === 'succeeded') {
            confirmDiag.innerText = 'Confirmed transaction!';
          }
        }
      });
  }

  async function initStripe() {
    window.addEventListener('submit-stripe-payment', pay, false);

    loadStripe.setLoadParameters({ advancedFraudSignals: false });
    stripe = await loadStripe('pk_test_YiU5HewgBoClZCwHdhXhTxUn');
    mountCard();
    // makeIntent();
  }

  onMount(() => initStripe());
  // onDestroy(() => window.removeEventListener('submit-stripe-payment', null))

  let stripe: Stripe;
  let card;
  let cardElement: HTMLElement;
  let clientSecret: string;
  let confirmDiag: HTMLElement;
</script>

<div class="card">
  <div bind:this="{cardElement}"></div>
</div>

<div class="stripe-feedback" bind:this="{confirmDiag}"></div>

<style lang="scss" module="scoped">
  @import '../../styles/media-queries.scss';

  .card {
    // padding: 1rem;
    margin: 0 0.5rem;
    border: 2px solid black;

    @include desktop {
      max-width: 75%;
    }
  }

  .stripe-feedback {
    margin: 0.5rem;
  }

  :global(.card .StripeElement) {
    padding: 0.5rem;
  }
</style>
