<script lang="ts">
  import Input from '$lib/components/Input.svelte';
  import PlanetButton from '$lib/components/Button.svelte';
  import CircleError from '$lib/icons/CircleError.svelte';
  import CircleWarning from '$lib/icons/CircleWarning.svelte';

  const CircleComponent = Math.random() > 0.5 ? CircleWarning : CircleError;

  export let id: string;

  // async function handleSubmit(event) {
  //   const data = new FormData(this);
  //   console.log('formdata::', data);

  //   const orderId = data.get('order-id');
  //   const orderEmail = data.get('order-email');

  //   console.log('orderId:', orderId)
  //   console.log('orderEmail:', orderEmail)

  //   const url = `/receipt/${orderId}?email=${orderEmail}`;
  //   goto(url);
  // }

  let searchOrderNumber: string;
  let searchOrderEmail: string;
</script>

<section class="order-confirmation">
  <svelte:component this="{CircleComponent}" />

  <h1>Fant ikke din bestilling!</h1>

  {#if id?.length}
    <div class="order-description">
      <p>Bestilling med id: <span class="underline">{id}</span> er ikke funnet i systemet vårt.</p>
    </div>
  {/if}

  <form class="order-search" method="POST">
    <span>Du kan forsøke søke opp din ordre her:</span>

    <Input name="order-id" label="Ordre id (hex)" bind:value="{searchOrderNumber}" />
    <Input name="order-email" label="Epost adresse" bind:value="{searchOrderEmail}" />

    <PlanetButton text="Søk" />
  </form>
</section>

<style lang="scss">
  @import './styles-receipt-page.scss';

  .order-search {
    width: 100%;
    max-width: 400px;
    margin-top: 2rem;

    span {
      display: block;
      padding-bottom: 1rem;
      font-size: 1.2rem;
    }
  }

  :global(.order-search button) {
    margin-top: 1rem;
  }
</style>
