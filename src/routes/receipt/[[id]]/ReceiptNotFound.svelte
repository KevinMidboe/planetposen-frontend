<script lang="ts">
  import Input from '$lib/components/Input.svelte';
  import PlanetButton from '$lib/components/Button.svelte';
  import CircleWarning from '$lib/components/loading/CircleWarning.svelte';

  export let id: string;

  let searchOrderNumber: string;
  let searchOrderEmail: string;
</script>

<section class="order-confirmation">
  <CircleWarning />

  <h1>Fant ikke din bestilling!</h1>

  {#if id?.length}
    <div class="order-description">
      <p>Bestilling med id: <span class="underline">{id}</span> er ikke funnet i systemet vårt.</p>
    </div>
  {/if}

  <form class="order-search" method="POST">
    <span>Du kan forsøke søke opp din ordre her:</span>

    <Input name="order-id" label="Ordre id " bind:value="{searchOrderNumber}" />
    <br />
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

  .underline {
    text-decoration: underline;
  }

  :global(.order-search button) {
    margin-top: 1rem;
  }
</style>
