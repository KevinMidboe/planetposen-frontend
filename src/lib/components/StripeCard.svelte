<script lang="ts">
  import { onMount } from 'svelte';
  import stripeApi from '$lib/stripe/index';
  import type { StripeCardElement } from '@stripe/stripe-js/types';

  export let card: StripeCardElement;
  export let stripeApiKey: string;

  async function mountCard() {
    let stripe = await stripeApi.load(stripeApiKey);
    const elements = stripe?.elements();
    if (!elements) return;

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

  onMount(() => mountCard());

  let cardElement: HTMLElement;
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
