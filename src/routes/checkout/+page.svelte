<script lang="ts">
  import { goto } from '$app/navigation';
  import OrderSection from './OrderSection.svelte';
  import ExpressSection from './ExpressSection.svelte';
  import DeliverySection from './DeliverySection.svelte';
  import PageMeta from '$lib/components/PageMeta.svelte';
  import CheckoutButton from '$lib/components/Button.svelte';
  import StripeCard from '$lib/components/StripeCard.svelte';
  import ErrorStack from '$lib/components/ErrorStack.svelte';
  import { cart, subTotal } from '$lib/cartStore';
  import stripeApi from '$lib/stripe/index';
  import { OrderSubmitUnsuccessfullError } from '$lib/errors/OrderErrors';
  import Loading from '$lib/components/loading/index.svelte';
  import { addBadElement, removeBadElements } from './validation';
  import { buildApiUrl } from '$lib/utils/apiUrl';
  import type { StripeCardElement } from '@stripe/stripe-js/types';
  import type ICustomer from '$lib/interfaces/ICustomer';
  import type {
    IOrderCreateDTO,
    IOrderCreateResponse,
    IOrderCreateUnsuccessfullResponse
  } from '$lib/interfaces/ApiResponse';
  import type { PageData } from './$types';

  export let data: PageData;
  export let stripeApiKey: string = data.stripeApiKey;

  let card: StripeCardElement;
  let form: HTMLFormElement;
  let errors: string[] = [];
  let showExpressCheckout = false;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  let resolvePaymentPromise: (value: any) => void;
  let rejectPaymentPromise: (resason: any | null) => void;
  let paymentPromise: Promise<any>;
  /* eslint-enable @typescript-eslint/no-explicit-any */

  function startPaymentLoader() {
    paymentPromise = new Promise((resolve, reject) => {
      resolvePaymentPromise = resolve;
      rejectPaymentPromise = reject;
    });
  }

  function handleSubmitOrderError(error: IOrderCreateUnsuccessfullResponse) {
    console.log('got error from order api!', error, error?.validationErrors);
    const { validationErrors } = error;

    if (!validationErrors || validationErrors?.length == 0) {
      errors.push('Ukjent feil ved plassering av ordre.');
      return;
    }

    validationErrors.forEach((verror) => {
      errors.push(verror.message);

      const l = document.getElementById(String(verror.field));
      if (l) addBadElement(l, verror);
    });
  }

  function handleStripePaymentError(error: Error) {
    rejectPaymentPromise('error');
    errors = [...errors, 'Betalingsfeil fra stripe: ' + error.message];
  }

  function getCustomerFromFormData(formData: FormData): ICustomer {
    let zip_code: string | number = formData.get('zip_code') as string;
    if (!isNaN(parseInt(zip_code))) {
      zip_code = parseInt(zip_code);
    } else {
      zip_code = 0;
    }

    return {
      email: formData.get('email') as string,
      first_name: formData.get('first_name') as string,
      last_name: formData.get('last_name') as string,
      street_address: formData.get('street_address') as string,
      zip_code,
      city: formData.get('city') as string
    };
  }

  async function postOrder(event: SubmitEvent) {
    const formData = new FormData(event.target as HTMLFormElement);
    const customer = getCustomerFromFormData(formData);

    const orderData: IOrderCreateDTO = { customer, cart: $cart };
    const options = {
      method: 'POST',
      body: JSON.stringify(orderData),
      headers: { 'Content-Type': 'application/json' }
    };

    const url = buildApiUrl('/api/v1/order');

    // TODO catch error
    let orderResponse: IOrderCreateResponse;
    try {
      orderResponse = await fetch(url, options).then((resp) => resp.json());

      errors = [];
      removeBadElements();
      if (orderResponse?.success !== true) {
        throw new OrderSubmitUnsuccessfullError(orderResponse as IOrderCreateUnsuccessfullResponse);
      }
    } catch (error: any) {
      handleSubmitOrderError(error);
      return;
    }

    // TODO catch error
    startPaymentLoader();
    let stripePaymentResponse;
    try {
      const stripeClientSecret = await stripeApi.clientSecret(
        orderResponse?.order_id,
        orderResponse?.customer_no
      );

      stripePaymentResponse = await stripeApi.pay(stripeClientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: `${customer.first_name} ${customer.last_name}`
          }
        }
      });

      if (stripePaymentResponse) {
        resolvePaymentPromise(true);
        goto(`/receipt/${orderResponse?.order_id}`);
      }
    } catch (error: any) {
      return handleStripePaymentError(error);
    }
  }
</script>

<PageMeta
  title="Kasse"
  description="Kasse for bestilling og betaling av produkter i handlekurven"
/>

<h1>Kassen</h1>

<form class="checkout" bind:this="{form}" on:submit|preventDefault="{postOrder}">
  <div class="main">
    {#if showExpressCheckout}
      <section class="express-checkout" style="display: block;">
        <h2>Hurtigkasse</h2>

        <ExpressSection />

        <p style="margin: 0 0 -0.5rem 0.5rem; text-align: left; color: rgba(0,0,0,0.5);">eller</p>
      </section>
    {/if}

    <section id="delivery">
      <h2>Leveringsaddresse</h2>
      <DeliverySection />
    </section>

    <section id="payment">
      <h2>Betalingsinformasjon</h2>
      <StripeCard bind:card="{card}" stripeApiKey="{stripeApiKey}" />

      <div class="pay">
        <CheckoutButton type="submit" text="Betal" />
        <div class="payment-state-animation">
          {#if paymentPromise}
            <Loading promise="{paymentPromise}" />
          {/if}
        </div>
      </div>
    </section>
  </div>

  <aside class="sidebar">
    <section id="order">
      <h2>Din ordre</h2>
      <OrderSection lineItems="{$cart}" subTotal="{$subTotal}" />
    </section>
  </aside>
</form>

<ErrorStack bind:errors="{errors}" />

<style lang="scss" module="scoped">
  @import '../../styles/media-queries.scss';

  form.checkout {
    display: flex;
    flex: 1 0 auto;
    margin: 0 auto;
    max-width: 40em;
    zoom: 1;
    position: relative;
    flex-direction: column-reverse;

    @media (min-width: 1000px) {
      padding: 0 5%;
      width: 90%;
      max-width: 78em;
      flex-direction: row;
    }
  }

  .pay {
    margin: 2rem 0;
    display: flex;
  }

  :global(.pay .payment-state-animation svg) {
    margin-left: 1.5rem;
    width: 34px;
  }

  .main {
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;

    @media (min-width: 750px) {
      padding-top: 1.5em;
    }

    @media (min-width: 1000px) {
      width: 52%;
      padding-right: 6%;
      float: left;
      border-right: 1px solid rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 999px) {
      width: 100%;
    }
  }

  aside.sidebar {
    position: relative;
    display: block;
    color: #515151;

    @media (min-width: 1000px) {
      position: sticky;
      align-self: flex-start;
      top: 0;
      width: 38%;
      padding-left: 4%;
      background-position: left top;
      float: right;
      padding-top: 4em;
    }
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
      padding: 12px 10px 12px 0;
      font-weight: 500;
      color: #231f20;
      line-height: 1.1;
      position: relative;

      &::after {
        content: '';
        width: 100%;
        height: 2px;
        background-color: rgba(0, 0, 0, 0.2);
        position: absolute;
        bottom: 0.15em;
        left: 0;
      }
    }
  }

  :global(.bad-msg) {
    position: absolute;
    left: 0;
    margin-top: -2.3rem;
    padding: 0.5rem;
    background-color: #ff3333;
    color: white;
  }

  :global(.bad-form) {
    // border: 2px solid var(--color-theme-1);
    background-color: rgba(255, 0, 0, 0.1);
    color: var(--color-theme-1);
    font-size: 1.1rem;
    padding: 0.5rem;
    margin: -0.5rem;
    position: relative;
    border-color: rgba(255, 0, 0, 0.1);
  }
</style>
