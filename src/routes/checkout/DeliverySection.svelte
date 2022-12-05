<script lang="ts">
  import Input from '$lib/components/Input.svelte';

  let email: string;
  let address: string;
  let firstName: string;
  let lastName: string;
  let zipCode: string;
  let city: string;
</script>

<div class="personalia">
  <Input id="email" bind:value="{email}" label="E-postaddresse" autocomplete="email" />
  <Input id="first_name" bind:value="{firstName}" label="Fornavn" autocomplete="given-name" />
  <Input id="last_name" bind:value="{lastName}" label="Etternavn" autocomplete="family-name" />

  <Input
    id="street_address"
    bind:value="{address}"
    label="Gateadresse"
    autocomplete="address-line1"
  />
  <Input id="zip_code" bind:value="{zipCode}" label="Postnummer" autocomplete="postal-code" />
  <Input id="city" bind:value="{city}" label="By" autocomplete="address-level2" />

  <div id="personalia-submit-button">
    <slot name="button" />
  </div>
</div>

<style lang="scss" module="scoped">
  div.personalia {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;

    :global(#address) {
      grid-column: span 2;
    }
    :global(#email) {
      grid-column: span 2;
    }
    :global(#personalia-submit-button) {
      grid-column: span 2;
    }
  }
</style>
