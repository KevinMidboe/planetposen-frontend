<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import ShipmentProgress from '$lib/components/ShipmentProgress.svelte';
  import { buildApiUrl } from '$lib/utils/apiUrl';
  import type { IShipmentResponse, ICourier } from '$lib/interfaces/IShipping';

  export let shipping: IShipmentResponse;
  export let orderId: string;

  function fetchCouriers() {
    if (couriers?.length > 0) return couriers;

    const url = buildApiUrl('/api/v1/shipment/couriers');
    fetch(url)
      .then((resp) => resp.json())
      .then((response) => (couriers = response?.couriers || []));
  }

  function updateShipment() {
    const url = buildApiUrl(`/api/v1/shipment/${shipping.shipment_id}`);
    const options = {
      method: 'PUT',
      body: JSON.stringify({
        tracking_code: trackingCode,
        tracking_link: trackingLink,
        courier_id: selectedCourier
      }),
      headers: { 'Content-Type': 'application/json' }
    };

    fetch(url, options)
      .then((resp) => resp.json())
      .then((response) => (shipping = response?.shipment || shipping));
  }

  function addShipment() {
    const url = buildApiUrl(`/api/v1/shipment/${orderId}`);
    fetch(url, { method: 'POST' })
      .then((resp) => resp.json())
      .then((response) => {
        shipping = response?.shipment;
        toggleEdit();
      });
  }

  function toggleEdit() {
    edit = !edit;
    if (edit) fetchCouriers();
    else updateShipment();
  }

  let edit = false;
  let trackingCode: string = shipping?.tracking_code;
  let trackingLink: string = shipping?.tracking_link;
  let selectedCourier: any = shipping?.courier_id;
  let couriers: ICourier[];
</script>

<section>
  <h2>Tracking</h2>

  {#if shipping}
    <ul class="property-list">
      <li>
        <label class="label" for="courier">Tracking company</label>
        {#if !edit}
          <span>{shipping.courier}</span>
        {:else if couriers?.length > 0}
          <select bind:value="{selectedCourier}" name="couriers" id="courier">
            <option value="">--Please choose an option--</option>
            {#each couriers as courier}
              <option value="{courier.courier_id}">{courier.name}</option>
            {/each}
          </select>
        {/if}
      </li>

      <li>
        <span class="label">Tracking code</span>
        {#if !edit}
          <span>{shipping.tracking_code}</span>
        {:else}
          <input bind:value="{trackingCode}" />
        {/if}
      </li>

      <li>
        <span class="label">Link</span>
        {#if !edit}
          <a href="{shipping.tracking_link}" class="link" target="_blank" rel="noopener noreferrer">
            {shipping.tracking_link}
          </a>
        {:else}
          <input style="margin-bottom: 0" class="wide" bind:value="{trackingLink}" />
        {/if}
      </li>
    </ul>

    <div class="button-container">
      <Button text="{!edit ? 'Edit' : 'Save'}" on:click="{toggleEdit}" />
    </div>

    {#if shipping?.tracking_code && shipping?.has_api}
      {#key shipping.tracking_code}
        <ShipmentProgress shipment="{shipping}" />
      {/key}
    {/if}
  {/if}

  {#if !shipping}
    <div class="button-container">
      <Button text="Add" on:click="{addShipment}" />
    </div>
  {/if}
</section>

<style lang="scss">
  @import './styles-order-page.scss';

  a {
    max-width: 60%;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  select {
    margin: -1px 0;
  }

  input {
    margin: -2px 0 -2px -2px;
    padding: 0;

    &.wide {
      width: -webkit-fill-available;
    }
  }
</style>
